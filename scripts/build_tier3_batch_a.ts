/**
 * scripts/build_tier3_batch_a.ts
 * Generates Tier 3 Batch A (Units 26, 27, 28, 29, 30, 31, 32, 33, 34, 35) JSON files following the Golden Template.
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

import * as fs from 'fs';
import * as path from 'path';

import { unit26 } from './tier3_batch_a/unit26.js';
import { unit27 } from './tier3_batch_a/unit27.js';
import { unit28 } from './tier3_batch_a/unit28.js';
import { unit29 } from './tier3_batch_a/unit29.js';
import { unit30 } from './tier3_batch_a/unit30.js';
import { unit31 } from './tier3_batch_a/unit31.js';
import { unit32 } from './tier3_batch_a/unit32.js';
import { unit33 } from './tier3_batch_a/unit33.js';
import { unit34 } from './tier3_batch_a/unit34.js';
import { unit35 } from './tier3_batch_a/unit35.js';

const srcTier3Dir = path.resolve('src/data/lessons/tier3');
const dataTier3Dir = path.resolve('data/lessons/tier3');

export function writeBatchAFiles() {
  const units = [
    { filename: 'unit26_workplace_communication.json', data: unit26 },
    { filename: 'unit27_business_negotiation.json', data: unit27 },
    { filename: 'unit28_ecommerce_ecosystem.json', data: unit28 },
    { filename: 'unit29_banquet_networking.json', data: unit29 },
    { filename: 'unit30_legal_contracts.json', data: unit30 },
    { filename: 'unit31_tech_innovation.json', data: unit31 },
    { filename: 'unit32_job_interview.json', data: unit32 },
    { filename: 'unit33_geography_dialects.json', data: unit33 },
    { filename: 'unit34_education_involution.json', data: unit34 },
    { filename: 'unit35_green_low_carbon.json', data: unit35 },
  ];

  if (!fs.existsSync(srcTier3Dir)) fs.mkdirSync(srcTier3Dir, { recursive: true });
  if (!fs.existsSync(dataTier3Dir)) fs.mkdirSync(dataTier3Dir, { recursive: true });

  console.log('🚀 Building Tier 3 Batch A Curriculum Files (Units 26 - 35)...');

  for (const { filename, data } of units) {
    const jsonStr = JSON.stringify(data, null, 2);
    const srcPath = path.join(srcTier3Dir, filename);
    const dataPath = path.join(dataTier3Dir, filename);

    fs.writeFileSync(srcPath, jsonStr, 'utf8');
    fs.writeFileSync(dataPath, jsonStr, 'utf8');

    const stat = fs.statSync(srcPath);
    console.log(`✅ Written ${filename}: ${stat.size} bytes (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  console.log('🎉 Successfully generated all 10 units for Tier 3 Batch A!');
}

writeBatchAFiles();
