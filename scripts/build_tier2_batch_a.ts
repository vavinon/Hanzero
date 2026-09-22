/**
 * scripts/build_tier2_batch_a.ts
 * Generates Tier 2 Batch A (Units 11, 12, 13, 14, 15) JSON files following the Golden Template.
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

import * as fs from 'fs';
import * as path from 'path';

import { unit11 } from './tier2_batch_a/unit11.js';
import { unit12 } from './tier2_batch_a/unit12.js';
import { unit13 } from './tier2_batch_a/unit13.js';
import { unit14 } from './tier2_batch_a/unit14.js';
import { unit15 } from './tier2_batch_a/unit15.js';

const srcTier2Dir = path.resolve('src/data/lessons/tier2');
const dataTier2Dir = path.resolve('data/lessons/tier2');

export function writeBatchAFiles() {
  const units = [
    { filename: 'unit11_scan_pay.json', data: unit11 },
    { filename: 'unit12_delivery_courier.json', data: unit12 },
    { filename: 'unit13_hsr_travel.json', data: unit13 },
    { filename: 'unit14_renting_utilities.json', data: unit14 },
    { filename: 'unit15_advanced_dining.json', data: unit15 },
  ];

  if (!fs.existsSync(srcTier2Dir)) fs.mkdirSync(srcTier2Dir, { recursive: true });
  if (!fs.existsSync(dataTier2Dir)) fs.mkdirSync(dataTier2Dir, { recursive: true });

  console.log('🚀 Building Tier 2 Batch A Curriculum Files (Units 11 - 15)...');

  for (const { filename, data } of units) {
    const jsonStr = JSON.stringify(data, null, 2);
    const srcPath = path.join(srcTier2Dir, filename);
    const dataPath = path.join(dataTier2Dir, filename);

    fs.writeFileSync(srcPath, jsonStr, 'utf8');
    fs.writeFileSync(dataPath, jsonStr, 'utf8');

    const stat = fs.statSync(srcPath);
    console.log(`✅ Written ${filename}: ${stat.size} bytes (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  console.log('🎉 Successfully generated all 5 units for Tier 2 Batch A!');
}

writeBatchAFiles();
