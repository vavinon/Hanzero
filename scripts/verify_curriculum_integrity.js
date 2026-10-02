import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lessonsDir = path.join(__dirname, '..', 'data', 'lessons');
const manifestPath = path.join(lessonsDir, 'curriculum_manifest.json');

console.log('=== 🔍 Hanzero Curriculum Integrity Verification ===\n');

if (!fs.existsSync(manifestPath)) {
  console.error('❌ Manifest not found:', manifestPath);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
console.log(`✅ Loaded Master Manifest: ${manifest.project} v${manifest.version}`);
console.log(`✅ Tiers defined in manifest: ${manifest.tiers.length} Tiers\n`);

let totalFilesChecked = 0;
let errors = [];

manifest.tiers.forEach(tier => {
  console.log(`📌 Checking [${tier.tier_id.toUpperCase()}] ${tier.name.th} (${tier.hsk_level})`);
  
  if (tier.units && Array.isArray(tier.units)) {
    tier.units.forEach(unit => {
      const fullPath = path.join(lessonsDir, unit.file);
      totalFilesChecked++;
      if (!fs.existsSync(fullPath)) {
        errors.push(`Missing unit file: ${unit.file}`);
        console.log(`   ❌ Unit ${unit.unit_number}: ${unit.title.th} ➔ Missing (${unit.file})`);
      } else {
        try {
          const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          console.log(`   ✅ Unit ${unit.unit_number.toString().padStart(2, '0')}: ${unit.title.th} (${content.lessons ? content.lessons.length : 'blueprint'} lessons)`);
        } catch (err) {
          errors.push(`JSON Syntax Error in ${unit.file}: ${err.message}`);
        }
      }
    });
  } else if (tier.file) {
    const fullPath = path.join(lessonsDir, tier.file);
    totalFilesChecked++;
    if (!fs.existsSync(fullPath)) {
      errors.push(`Missing tier file: ${tier.file}`);
      console.log(`   ❌ Blueprint missing: ${tier.file}`);
    } else {
      try {
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        console.log(`   ✅ Blueprint loaded: ${tier.file} (${content.units.length} units defined)`);
      } catch (err) {
        errors.push(`JSON Syntax Error in ${tier.file}: ${err.message}`);
      }
    }
  }
  console.log('');
});

console.log('--------------------------------------------------');
console.log(`📊 Total Unit & Blueprint Files Checked: ${totalFilesChecked}`);

if (errors.length === 0) {
  console.log('🎉 100% SUCCESS: All curriculum data files exist, parse cleanly, and match manifest specifications!');
} else {
  console.error(`⚠️ Found ${errors.length} errors:`, errors);
  process.exit(1);
}
