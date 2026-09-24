/**
 * scripts/build_tier4_legend.ts
 * Generates Tier 4 Legend Curriculum JSON files following the Golden Template.
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

import * as fs from 'fs';
import * as path from 'path';

import { unit46Data } from './tier4_legend/unit46.js';
import { unit47Data } from './tier4_legend/unit47.js';
import { unit48Data } from './tier4_legend/unit48.js';
import { unit49Data } from './tier4_legend/unit49.js';

const srcTier4Dir = path.resolve('src/data/lessons/tier4');
const dataTier4Dir = path.resolve('data/lessons/tier4');

export function writeLegendFiles() {
  const units = [
    { filename: 'unit46_classical_particles.json', data: unit46Data },
    { filename: 'unit47_sun_tzu_business.json', data: unit47Data },
    { filename: 'unit48_ancient_philosophy.json', data: unit48Data },
    { filename: 'unit49_diplomatic_rhetoric.json', data: unit49Data },
  ];

  if (!fs.existsSync(srcTier4Dir)) fs.mkdirSync(srcTier4Dir, { recursive: true });
  if (!fs.existsSync(dataTier4Dir)) fs.mkdirSync(dataTier4Dir, { recursive: true });

  console.log('🚀 Building Tier 4 Legend Curriculum Files (Units 46 - 49)...');

  for (const { filename, data } of units) {
    const jsonStr = JSON.stringify(data, null, 2);
    const srcPath = path.join(srcTier4Dir, filename);
    const dataPath = path.join(dataTier4Dir, filename);

    fs.writeFileSync(srcPath, jsonStr, 'utf8');
    fs.writeFileSync(dataPath, jsonStr, 'utf8');

    const stat = fs.statSync(srcPath);
    console.log(`✅ Written ${filename}: ${stat.size} bytes (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  console.log('🎉 Successfully generated Units 46 to 49 for Tier 4 Legend!');
}

writeLegendFiles();
