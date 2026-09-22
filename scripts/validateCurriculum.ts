/**
 * scripts/validateCurriculum.ts
 * CLI Runner for Hanzero Automated Curriculum Validator & Linter.
 * Usage: npx tsx scripts/validateCurriculum.ts [options]
 *
 * Options:
 *   --tier <0|1|all>   Target tier (default: all)
 *   --unit <id>        Target specific unit_id (e.g. tier1_u01)
 *   --strict           Treat warnings as fatal errors
 *   --verbose          Display detailed checks per lesson and vocab
 *   --json             Output results as raw JSON for CI telemetry
 */

import { CurriculumEngine, ValidationOptions } from './lib/curriculumEngine.js';

// --- ANSI Colors ---
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const GRAY = '\x1b[90m';

function parseArgs(args: string[]): ValidationOptions & { json?: boolean } {
  const options: ValidationOptions & { json?: boolean } = {
    tier: 'all',
    strict: false,
    verbose: false,
    json: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--tier' && i + 1 < args.length) {
      const val = args[++i];
      if (val === '0' || val === '1' || val === '2' || val === 'all') {
        options.tier = val;
      }
    } else if (arg === '--unit' && i + 1 < args.length) {
      options.unitId = args[++i];
    } else if (arg === '--strict') {
      options.strict = true;
    } else if (arg === '--verbose') {
      options.verbose = true;
    } else if (arg === '--json') {
      options.json = true;
    }
  }

  return options;
}

function determineExitCode(summary: { success: boolean; errors: Array<{ stage: number; rule: string }>; warnings: Array<{ stage: number; rule: string }> }): number {
  if (summary.success) return 0;
  const hasSchemaOrStructuralError = summary.errors.some(
    (e) => e.stage === 1 || e.stage === 2 || e.stage === 3 || e.rule === 'SIMPLIFIED_CHINESE' || e.rule === 'UNIT_NOT_FOUND'
  );
  if (hasSchemaOrStructuralError) {
    return 1;
  }
  const allIssues = [...summary.errors, ...summary.warnings];
  const hasSandhiOrInterleavingError = allIssues.some(
    (e) => e.rule.startsWith('SANDHI_') || e.rule === 'INTERLEAVING_MINIMUM'
  );
  if (hasSandhiOrInterleavingError) {
    return 2;
  }
  return 1;
}

async function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  const engine = new CurriculumEngine();
  const summary = await engine.validate(options);
  const exitCode = determineExitCode(summary);

  if (options.json) {
    console.log(JSON.stringify(summary, null, 2));
    process.exit(exitCode);
  }

  // --- Pretty Console Output ---
  console.log(`\n${BOLD}${CYAN}🐰 Hanzero Curriculum Validator & Quality Linter${RESET}`);
  console.log(`${GRAY}Target Tier: ${options.tier || 'all'} | Strict: ${options.strict ? 'YES' : 'NO'} | Target Unit: ${options.unitId || 'ALL'}${RESET}\n`);

  console.log(`${BOLD}--- 🛡️ 5-Stage Validation Pipeline Summary ---${RESET}`);
  console.log(`• Total Units Checked:   ${summary.totalUnitsChecked}`);
  console.log(`• Total Lessons Checked: ${summary.totalLessonsChecked}`);
  console.log(`• Total Vocab Checked:   ${summary.totalVocabChecked}`);
  console.log(`• Execution Time:        ${summary.durationMs}ms`);

  if (options.verbose) {
    console.log(`\n${BOLD}🔍 Verbose Diagnostics:${RESET}`);
    console.log(`  • Stage 1 (File Discovery): Completed`);
    console.log(`  • Stage 2 (Schema Guards): Completed`);
    console.log(`  • Stage 3 (Global ID & Index Bounds): Completed`);
    console.log(`  • Stage 4 (Tone Sandhi & Grammar): Completed`);
    console.log(`  • Stage 5 (FMM Interleaving Retention): Completed`);
  }

  // Report Interleaving
  const interleavingKeys = Object.keys(summary.interleavingStats);
  if (interleavingKeys.length > 0) {
    console.log(`\n${BOLD}📊 Interleaving Retention (FMM Tokenizer):${RESET}`);
    for (const key of interleavingKeys) {
      const stat = summary.interleavingStats[key];
      const color = stat.rate >= 20 ? GREEN : YELLOW;
      console.log(`  ${color}• [${stat.unitId}] Retention Rate: ${stat.rate.toFixed(1)}% (${stat.priorWordsMatched.length} recycled words in ${stat.totalTokens} unique tokens)${RESET}`);
      if (options.verbose && stat.priorWordsMatched.length > 0) {
        console.log(`    ${GRAY}Recycled words matched: ${stat.priorWordsMatched.join(', ')}${RESET}`);
      }
    }
  }

  // Report Warnings
  if (summary.warnings.length > 0) {
    console.log(`\n${YELLOW}${BOLD}⚠️ Warnings (${summary.warnings.length}):${RESET}`);
    for (const w of summary.warnings) {
      const location = w.vocabId ? `[${w.unitId} > ${w.lessonId || ''} > ${w.vocabId}]` : `[${w.unitId}]`;
      console.log(`  ${YELLOW}Stage ${w.stage} (${w.rule}): ${location} ${w.message}${RESET}`);
    }
  }

  // Report Errors
  if (summary.errors.length > 0) {
    console.log(`\n${RED}${BOLD}❌ Validation Errors (${summary.errors.length}):${RESET}`);
    for (const e of summary.errors) {
      const location = e.vocabId ? `[${e.unitId} > ${e.lessonId || ''} > ${e.vocabId}]` : `[${e.unitId}]`;
      console.log(`  ${RED}Stage ${e.stage} (${e.rule}): ${location} ${e.message}${RESET}`);
    }
  }

  console.log('\n--------------------------------------------------');
  if (summary.success) {
    console.log(`${GREEN}${BOLD}🎉 SUCCESS: 100% Pass! All curriculum units satisfy schema, tone sandhi, and interleaving standards.${RESET}\n`);
    process.exit(0);
  } else {
    console.log(`${RED}${BOLD}💥 FAILED: Curriculum validation did not satisfy quality requirements (Exit Code: ${exitCode}).${RESET}\n`);
    process.exit(exitCode);
  }
}

main().catch((err) => {
  console.error('Fatal CLI Error:', err);
  process.exit(1);
});
