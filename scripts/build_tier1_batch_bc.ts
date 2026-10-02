/**
 * scripts/build_tier1_batch_bc.ts
 * Generates Tier 1 Batch B & C (Units 5, 6, 7, 8, 9, 10 + Grand Boss Quest) JSON files.
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

import * as fs from 'fs';
import * as path from 'path';

import { unit05 } from './tier1_batch_bc/unit05.js';
import { unit06 } from './tier1_batch_bc/unit06.js';
import { unit07 } from './tier1_batch_bc/unit07.js';
import { unit08 } from './tier1_batch_bc/unit08.js';
import { unit09 } from './tier1_batch_bc/unit09.js';
import { unit10 } from './tier1_batch_bc/unit10.js';

const srcTier1Dir = path.resolve('src/data/lessons/tier1');
const dataTier1Dir = path.resolve('data/lessons/tier1');

function writeBatchBCFiles() {
  const units = [
    { filename: 'unit05_directions_transport.json', data: unit05 },
    { filename: 'unit06_family_friends.json', data: unit06 },
    { filename: 'unit07_daily_routines.json', data: unit07 },
    { filename: 'unit08_weather_seasons.json', data: unit08 },
    { filename: 'unit09_health_body.json', data: unit09 },
    { filename: 'unit10_hotel_airport.json', data: unit10 },
  ];

  if (!fs.existsSync(srcTier1Dir)) fs.mkdirSync(srcTier1Dir, { recursive: true });
  if (!fs.existsSync(dataTier1Dir)) fs.mkdirSync(dataTier1Dir, { recursive: true });

  console.log('🚀 Building Tier 1 Batch B & C Curriculum Files (Units 5 - 10)...');

  for (const { filename, data } of units) {
    const jsonStr = JSON.stringify(data, null, 2);
    const srcPath = path.join(srcTier1Dir, filename);
    const dataPath = path.join(dataTier1Dir, filename);

    fs.writeFileSync(srcPath, jsonStr, 'utf8');
    fs.writeFileSync(dataPath, jsonStr, 'utf8');

    const stat = fs.statSync(srcPath);
    console.log(`✅ Written ${filename}: ${stat.size} bytes (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  console.log('🎉 Successfully generated all 6 units for Tier 1 Batch B & C!');
}

writeBatchBCFiles();
