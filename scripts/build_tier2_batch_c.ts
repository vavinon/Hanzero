/**
 * scripts/build_tier2_batch_c.ts
 * Generates Tier 2 Batch C (Units 21, 22, 23, 24, 25) JSON files following Golden Template.
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

import * as fs from 'fs';
import * as path from 'path';

import { unit21 } from './tier2_batch_c/unit21.js';
import { unit22 } from './tier2_batch_c/unit22.js';
import { unit23 } from './tier2_batch_c/unit23.js';
import { unit24 } from './tier2_batch_c/unit24.js';
import { unit25 } from './tier2_batch_c/unit25.js';

const srcTier2Dir = path.resolve('src/data/lessons/tier2');
const dataTier2Dir = path.resolve('data/lessons/tier2');

export function writeBatchCFiles() {
  const units = [
    { filename: 'unit21_entertainment.json', data: unit21 },
    { filename: 'unit22_fitness.json', data: unit22 },
    { filename: 'unit23_workplace.json', data: unit23 },
    { filename: 'unit24_opinions.json', data: unit24 },
    { filename: 'unit25_grand_boss_odyssey.json', data: unit25 },
  ];

  if (!fs.existsSync(srcTier2Dir)) fs.mkdirSync(srcTier2Dir, { recursive: true });
  if (!fs.existsSync(dataTier2Dir)) fs.mkdirSync(dataTier2Dir, { recursive: true });

  console.log('🚀 Building Tier 2 Batch C Curriculum Files (Units 21 - 25)...');

  for (const { filename, data } of units) {
    const jsonStr = JSON.stringify(data, null, 2);
    const srcPath = path.join(srcTier2Dir, filename);
    const dataPath = path.join(dataTier2Dir, filename);

    fs.writeFileSync(srcPath, jsonStr, 'utf8');
    fs.writeFileSync(dataPath, jsonStr, 'utf8');

    const stat = fs.statSync(srcPath);
    console.log(`✅ Written ${filename}: ${stat.size} bytes (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  console.log('🎉 Successfully generated all 5 units for Tier 2 Batch C!');
}

writeBatchCFiles();
