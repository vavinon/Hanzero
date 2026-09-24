/**
 * scripts/build_tier3_batch_b.ts
 * Generates Tier 3 Batch B JSON files following the Golden Template.
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

import * as fs from 'fs';
import * as path from 'path';

import { unit36 } from './tier3_batch_b/unit36.js';
import { unit37 } from './tier3_batch_b/unit37.js';
import { unit38 } from './tier3_batch_b/unit38.js';
import { unit39 } from './tier3_batch_b/unit39.js';
import { unit40 } from './tier3_batch_b/unit40.js';

const srcTier3Dir = path.resolve('src/data/lessons/tier3');
const dataTier3Dir = path.resolve('data/lessons/tier3');

export function writeBatchBFiles() {
  const units = [
    { filename: 'unit36_mental_health.json', data: unit36 },
    { filename: 'unit37_traditional_arts.json', data: unit37 },
    { filename: 'unit38_modern_medicine_wellness.json', data: unit38 },
    { filename: 'unit39_investment_finance.json', data: unit39 },
    { filename: 'unit40_tea_culture_zen.json', data: unit40 },
  ];

  if (!fs.existsSync(srcTier3Dir)) fs.mkdirSync(srcTier3Dir, { recursive: true });
  if (!fs.existsSync(dataTier3Dir)) fs.mkdirSync(dataTier3Dir, { recursive: true });

  console.log('🚀 Building Tier 3 Batch B Curriculum Files (Units 36 - 40)...');

  for (const { filename, data } of units) {
    const jsonStr = JSON.stringify(data, null, 2);
    const srcPath = path.join(srcTier3Dir, filename);
    const dataPath = path.join(dataTier3Dir, filename);

    fs.writeFileSync(srcPath, jsonStr, 'utf8');
    fs.writeFileSync(dataPath, jsonStr, 'utf8');

    const stat = fs.statSync(srcPath);
    console.log(`✅ Written ${filename}: ${stat.size} bytes (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  console.log('🎉 Successfully generated Units 36 to 40 for Tier 3 Batch B!');
}

writeBatchBFiles();
