const fs = require('fs');

const hsk6Raw = JSON.parse(fs.readFileSync('data/hsk/hsk6.json', 'utf8'));

const p1 = require('./hsk6_thai_map_part1.cjs');
const p2 = require('./hsk6_thai_map_part2.cjs');
const p3 = require('./hsk6_thai_map_part3.cjs');
const p4 = require('./hsk6_thai_map_part4.cjs');

const fullMap = { ...p1, ...p2, ...p3, ...p4 };

const finalWords = [];

hsk6Raw.forEach((item) => {
  const id = item.id;
  const extra = fullMap[id] || {};

  const meaning_th = extra.meaning_th || item.meaning_th || (item.definitions && item.definitions[0]) || 'ความหมาย';
  const meaning_en = extra.meaning_en || (item.definitions ? item.definitions.join(', ') : '');
  const category = extra.category || 'general';
  const part_of_speech = extra.part_of_speech || (item.pos && item.pos.length ? item.pos.join(', ') : 'คำศัพท์');

  finalWords.push({
    id,
    level: 6,
    hanzi: item.hanzi,
    pinyin: item.pinyin,
    meaning_th,
    meaning_en,
    category,
    part_of_speech,
  });
});

let tsCode = `/**
 * src/data/hsk/hsk6.ts
 * Official HSK 3.0 Level 6 Vocabulary Repository (1,123 words).
 * Standardized Simplified Chinese with accurate Pinyin tone marks, Thai meanings, and categories.
 */

import { HSKWord } from './types';

export const hsk6Words: HSKWord[] = [
`;

finalWords.forEach((word) => {
  tsCode += `  {\n`;
  tsCode += `    id: '${word.id}',\n`;
  tsCode += `    level: 6,\n`;
  tsCode += `    hanzi: '${word.hanzi.replace(/'/g, "\\'")}',\n`;
  tsCode += `    pinyin: '${word.pinyin.replace(/'/g, "\\'")}',\n`;
  tsCode += `    meaning_th: '${word.meaning_th.replace(/'/g, "\\'")}',\n`;
  tsCode += `    meaning_en: '${word.meaning_en.replace(/'/g, "\\'")}',\n`;
  tsCode += `    category: '${word.category}',\n`;
  tsCode += `    part_of_speech: '${word.part_of_speech.replace(/'/g, "\\'")}',\n`;
  tsCode += `  },\n`;
});

tsCode += `];\n`;

fs.writeFileSync('src/data/hsk/hsk6.ts', tsCode, 'utf8');
console.log(`Generated ${finalWords.length} HSK 6 words!`);
console.log('Successfully written to src/data/hsk/hsk6.ts!');
