/**
 * scripts/build_tier2_batch_b.ts
 * Generates Tier 2 Batch B (Units 16, 17, 18, 19, 20) JSON files following the Golden Template.
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

import * as fs from 'fs';
import * as path from 'path';

import { unit16 } from './tier2_batch_b/unit16.js';
import { unit17 } from './tier2_batch_b/unit17.js';
import { unit18 } from './tier2_batch_b/unit18.js';
import { unit19 } from './tier2_batch_b/unit19.js';
import { unit20 } from './tier2_batch_b/unit20.js';

const srcTier2Dir = path.resolve('src/data/lessons/tier2');
const dataTier2Dir = path.resolve('data/lessons/tier2');

export function writeBatchBFiles() {
  const units = [
    { filename: 'unit16_shopping_returns.json', data: unit16 },
    { filename: 'unit17_advanced_clinic.json', data: unit17 },
    { filename: 'unit18_bank_telecom.json', data: unit18 },
    { filename: 'unit19_festivals_visits.json', data: unit19 },
    { filename: 'unit20_emergencies.json', data: unit20 },
  ];

  if (!fs.existsSync(srcTier2Dir)) fs.mkdirSync(srcTier2Dir, { recursive: true });
  if (!fs.existsSync(dataTier2Dir)) fs.mkdirSync(dataTier2Dir, { recursive: true });

  console.log('🚀 Building Tier 2 Batch B Curriculum Files (Units 16 - 20)...');

  for (const { filename, data } of units) {
    const jsonStr = JSON.stringify(data, null, 2);
    const srcPath = path.join(srcTier2Dir, filename);
    const dataPath = path.join(dataTier2Dir, filename);

    fs.writeFileSync(srcPath, jsonStr, 'utf8');
    fs.writeFileSync(dataPath, jsonStr, 'utf8');

    const stat = fs.statSync(srcPath);
    console.log(`✅ Written ${filename}: ${stat.size} bytes (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  console.log('🎉 Successfully generated all 5 units for Tier 2 Batch B!');
}

writeBatchBFiles();
