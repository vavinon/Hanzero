/**
 * scripts/auditBundle.ts
 * Cross-platform Production Bundle Size Performance Budget Auditor for Hanzero.
 * Checks gzipped CSS and JS sizes in dist against strict performance budgets.
 * 
 * Budgets (aligned with AGENTS.md §5.3):
 * - Initial Entry CSS Gzipped: <= 20 KB (20,480 bytes)
 * - Initial Entry JS Gzipped:  <= 100 KB (102,400 bytes)
 * - Max Single Lazy Chunk:     <= 250 KB (256,000 bytes)
 * - Total Multi-Tier Footprint:<= 750 KB (768,000 bytes)
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const GRAY = '\x1b[90m';

const ENTRY_CSS_BUDGET_BYTES = 20 * 1024;    // 20 KB (AGENTS.md §5.3)
const ENTRY_JS_BUDGET_BYTES = 100 * 1024;    // 100 KB (AGENTS.md §5.3)
const CHUNK_MAX_BUDGET_BYTES = 250 * 1024;   // 250 KB max per lazy chunk
const TOTAL_JS_BUDGET_BYTES = 750 * 1024;    // 750 KB total across all 35+ units

interface AssetStats {
  name: string;
  rawBytes: number;
  gzipBytes: number;
  type: 'css' | 'js' | 'other';
  isEntry: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(2)} KB`;
}

function audit(): void {
  const distDir = path.resolve(process.cwd(), 'dist');
  const assetsDir = path.join(distDir, 'assets');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(assetsDir) || !fs.existsSync(indexHtmlPath)) {
    console.error(`${RED}❌ Error: dist directory or index.html not found. Please run 'npm run build' first.${RESET}`);
    process.exit(1);
  }

  // Parse entry scripts and preloads from index.html
  const htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
  const entryMatches = Array.from(htmlContent.matchAll(/src=["'][^"']*\/assets\/([^"']+)["']|href=["'][^"']*\/assets\/([^"']+)["']/g));
  const entryFilenames = new Set<string>();
  for (const match of entryMatches) {
    const filename = match[1] || match[2];
    if (filename) entryFilenames.add(filename);
  }

  const files = fs.readdirSync(assetsDir);
  const assets: AssetStats[] = [];

  let entryCssGzip = 0;
  let entryJsGzip = 0;
  let totalJsGzip = 0;
  let totalCssGzip = 0;
  let largestChunk: AssetStats | null = null;

  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const rawBuffer = fs.readFileSync(filePath);
    const gzipBuffer = zlib.gzipSync(rawBuffer);
    const rawBytes = stat.size;
    const gzipBytes = gzipBuffer.length;
    const isEntry = entryFilenames.has(file);

    let type: 'css' | 'js' | 'other' = 'other';
    if (file.endsWith('.css')) {
      type = 'css';
      totalCssGzip += gzipBytes;
      if (isEntry) entryCssGzip += gzipBytes;
    } else if (file.endsWith('.js')) {
      type = 'js';
      totalJsGzip += gzipBytes;
      if (isEntry) entryJsGzip += gzipBytes;
      if (!largestChunk || gzipBytes > largestChunk.gzipBytes) {
        largestChunk = { name: file, rawBytes, gzipBytes, type, isEntry };
      }
    }

    assets.push({ name: file, rawBytes, gzipBytes, type, isEntry });
  }

  console.log(`\n${BOLD}${CYAN}📊 Hanzero Production Bundle Performance Budget Audit${RESET}`);
  console.log(`${GRAY}Directory: ${assetsDir}${RESET}\n`);

  console.log(`${BOLD}--- 📦 Asset Breakdown ---${RESET}`);
  assets.sort((a, b) => b.gzipBytes - a.gzipBytes);
  for (const asset of assets) {
    const typeIcon = asset.type === 'css' ? '🎨' : asset.type === 'js' ? '⚡' : '📄';
    const entryTag = asset.isEntry ? ` ${GREEN}[INITIAL ENTRY]${RESET}` : `${GRAY} [lazy]${RESET}`;
    console.log(
      `  ${typeIcon} ${asset.name.padEnd(36)} raw: ${formatBytes(asset.rawBytes).padStart(10)} │ gzip: ${formatBytes(asset.gzipBytes).padStart(10)}${entryTag}`
    );
  }

  console.log(`\n${BOLD}--- 🛡️ Budget Compliance Check (AGENTS.md Standards) ---${RESET}`);

  // 1. Check Initial Entry CSS Budget
  const cssPct = ((entryCssGzip / ENTRY_CSS_BUDGET_BYTES) * 100).toFixed(1);
  const cssPassed = entryCssGzip <= ENTRY_CSS_BUDGET_BYTES;
  const cssStatus = cssPassed
    ? `${GREEN}✅ PASS${RESET} (${formatBytes(entryCssGzip)} / ${formatBytes(ENTRY_CSS_BUDGET_BYTES)} - ${cssPct}%)`
    : `${RED}❌ FAILED${RESET} (${formatBytes(entryCssGzip)} exceeds ${formatBytes(ENTRY_CSS_BUDGET_BYTES)})`;
  console.log(`• Initial Entry CSS (FCP): ${cssStatus}`);

  // 2. Check Initial Entry JS Budget (AGENTS.md <= 100 KB)
  const entryJsPct = ((entryJsGzip / ENTRY_JS_BUDGET_BYTES) * 100).toFixed(1);
  const entryJsPassed = entryJsGzip <= ENTRY_JS_BUDGET_BYTES;
  const entryJsStatus = entryJsPassed
    ? `${GREEN}✅ PASS${RESET} (${formatBytes(entryJsGzip)} / ${formatBytes(ENTRY_JS_BUDGET_BYTES)} - ${entryJsPct}%)`
    : `${RED}❌ FAILED${RESET} (${formatBytes(entryJsGzip)} exceeds ${formatBytes(ENTRY_JS_BUDGET_BYTES)})`;
  console.log(`• Initial Entry JS (FCP):  ${entryJsStatus}`);

  // 3. Check Largest Individual Chunk (<= 250 KB)
  const largestChunkBytes = largestChunk?.gzipBytes || 0;
  const chunkPassed = largestChunkBytes <= CHUNK_MAX_BUDGET_BYTES;
  const chunkPct = ((largestChunkBytes / CHUNK_MAX_BUDGET_BYTES) * 100).toFixed(1);
  const chunkStatus = chunkPassed
    ? `${GREEN}✅ PASS${RESET} (${formatBytes(largestChunkBytes)} [${largestChunk?.name}] <= ${formatBytes(CHUNK_MAX_BUDGET_BYTES)} - ${chunkPct}%)`
    : `${RED}❌ FAILED${RESET} (${formatBytes(largestChunkBytes)} [${largestChunk?.name}] exceeds ${formatBytes(CHUNK_MAX_BUDGET_BYTES)})`;
  console.log(`• Max Single Lazy Chunk:   ${chunkStatus}`);

  // 4. Check Total Multi-Tier Footprint (<= 750 KB)
  const totalJsPassed = totalJsGzip <= TOTAL_JS_BUDGET_BYTES;
  const totalJsPct = ((totalJsGzip / TOTAL_JS_BUDGET_BYTES) * 100).toFixed(1);
  const totalJsStatus = totalJsPassed
    ? `${GREEN}✅ PASS${RESET} (${formatBytes(totalJsGzip)} / ${formatBytes(TOTAL_JS_BUDGET_BYTES)} - ${totalJsPct}%)`
    : `${RED}❌ FAILED${RESET} (${formatBytes(totalJsGzip)} exceeds ${formatBytes(TOTAL_JS_BUDGET_BYTES)})`;
  console.log(`• Total Multi-Tier JS:     ${totalJsStatus}`);

  const allPassed = cssPassed && entryJsPassed && chunkPassed && totalJsPassed;

  if (allPassed) {
    console.log(`\n${BOLD}${GREEN}🎉 ALL PERFORMANCE BUDGETS SATISFIED! Production bundle is lean, ultra-fast and ready. 🚀${RESET}\n`);
    process.exit(0);
  } else {
    console.error(`\n${BOLD}${RED}🚨 PERFORMANCE BUDGET VIOLATION! Optimize chunking or tree-shaking before deploying.${RESET}\n`);
    process.exit(1);
  }
}

audit();
