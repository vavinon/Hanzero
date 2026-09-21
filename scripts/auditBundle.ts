/**
 * scripts/auditBundle.ts
 * Cross-platform Production Bundle Size Performance Budget Auditor for Hanzero.
 * Checks gzipped CSS and JS sizes in dist/assets against strict budgets.
 * 
 * Budgets:
 * - Total Gzipped CSS: <= 20 KB (20,480 bytes)
 * - Total Gzipped JS:  <= 300 KB (307,200 bytes)
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

const CSS_BUDGET_BYTES = 20 * 1024;    // 20,480 bytes (20 KB)
const JS_BUDGET_BYTES = 300 * 1024;   // 307,200 bytes (300 KB)

interface AssetStats {
  name: string;
  rawBytes: number;
  gzipBytes: number;
  type: 'css' | 'js' | 'other';
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(2)} KB`;
}

function audit(): void {
  const distDir = path.resolve(process.cwd(), 'dist');
  const assetsDir = path.join(distDir, 'assets');

  if (!fs.existsSync(assetsDir)) {
    console.error(`${RED}❌ Error: dist/assets directory not found. Please run 'npm run build' first.${RESET}`);
    process.exit(1);
  }

  const files = fs.readdirSync(assetsDir);
  const assets: AssetStats[] = [];

  let totalCssGzip = 0;
  let totalJsGzip = 0;

  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const rawBuffer = fs.readFileSync(filePath);
    const gzipBuffer = zlib.gzipSync(rawBuffer);
    const rawBytes = stat.size;
    const gzipBytes = gzipBuffer.length;

    let type: 'css' | 'js' | 'other' = 'other';
    if (file.endsWith('.css')) {
      type = 'css';
      totalCssGzip += gzipBytes;
    } else if (file.endsWith('.js')) {
      type = 'js';
      totalJsGzip += gzipBytes;
    }

    assets.push({ name: file, rawBytes, gzipBytes, type });
  }

  console.log(`\n${BOLD}${CYAN}📊 Hanzero Bundle Performance Budget Audit${RESET}`);
  console.log(`${GRAY}Directory: ${assetsDir}${RESET}\n`);

  console.log(`${BOLD}--- 📦 Asset Breakdown ---${RESET}`);
  assets.sort((a, b) => b.gzipBytes - a.gzipBytes);
  for (const asset of assets) {
    const typeIcon = asset.type === 'css' ? '🎨' : asset.type === 'js' ? '⚡' : '📄';
    console.log(
      `  ${typeIcon} ${asset.name.padEnd(36)} raw: ${formatBytes(asset.rawBytes).padStart(10)} │ gzip: ${formatBytes(asset.gzipBytes).padStart(10)}`
    );
  }

  console.log(`\n${BOLD}--- 🛡️ Budget Compliance Check ---${RESET}`);

  // Check CSS Budget
  const cssPct = ((totalCssGzip / CSS_BUDGET_BYTES) * 100).toFixed(1);
  const cssPassed = totalCssGzip <= CSS_BUDGET_BYTES;
  const cssStatus = cssPassed
    ? `${GREEN}✅ PASS${RESET} (${formatBytes(totalCssGzip)} / ${formatBytes(CSS_BUDGET_BYTES)} - ${cssPct}%)`
    : `${RED}❌ FAILED${RESET} (${formatBytes(totalCssGzip)} exceeds ${formatBytes(CSS_BUDGET_BYTES)})`;
  console.log(`• Total Gzipped CSS: ${cssStatus}`);

  // Check JS Budget
  const jsPct = ((totalJsGzip / JS_BUDGET_BYTES) * 100).toFixed(1);
  const jsPassed = totalJsGzip <= JS_BUDGET_BYTES;
  const jsStatus = jsPassed
    ? `${GREEN}✅ PASS${RESET} (${formatBytes(totalJsGzip)} / ${formatBytes(JS_BUDGET_BYTES)} - ${jsPct}%)`
    : `${RED}❌ FAILED${RESET} (${formatBytes(totalJsGzip)} exceeds ${formatBytes(JS_BUDGET_BYTES)})`;
  console.log(`• Total Gzipped JS:  ${jsStatus}`);

  if (cssPassed && jsPassed) {
    console.log(`\n${BOLD}${GREEN}🎉 ALL PERFORMANCE BUDGETS SATISFIED! Production bundle is lean and ready. 🚀${RESET}\n`);
    process.exit(0);
  } else {
    console.error(`\n${BOLD}${RED}🚨 PERFORMANCE BUDGET VIOLATION! Optimize chunking or tree-shaking before deploying.${RESET}\n`);
    process.exit(1);
  }
}

audit();
