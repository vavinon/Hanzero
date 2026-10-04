const fs = require('fs');

const p1 = require('./hsk4_thai_map_part1.cjs');
const p2 = require('./hsk4_thai_map_part2.cjs');
const p3 = require('./hsk4_thai_map_part3.cjs');
const p4 = require('./hsk4_thai_map_part4.cjs');
const existingMap = JSON.parse(fs.readFileSync('temp_hsk4_existing_matched.json', 'utf8'));

// Load raw hsk4 words (972 words)
const hsk4Raw = JSON.parse(fs.readFileSync('data/hsk/hsk4.json', 'utf8'));

// Load existing hsk4 seed words to preserve rich example
const existingHsk4Seed = {};
if (fs.existsSync('src/data/hsk/hsk3_9.ts')) {
  const content = fs.readFileSync('src/data/hsk/hsk3_9.ts', 'utf8');
  const blocks = content.split(/\{\s*id\s*:\s*['"]hsk4_\d+['"]/);
  blocks.slice(1).forEach(block => {
    const hzMatch = block.match(/hanzi\s*:\s*['"]([^'"]+)['"]/);
    if (!hzMatch) return;
    const hz = hzMatch[1];
    const thMatch = block.match(/meaning_th\s*:\s*['"]([^'"]+)['"]/);
    const catMatch = block.match(/category\s*:\s*['"]([^'"]+)['"]/);
    const posMatch = block.match(/part_of_speech\s*:\s*['"]([^'"]+)['"]/);
    const mnemMatch = block.match(/mnemonic_th\s*:\s*['"]([^'"]+)['"]/);
    
    const exZhMatch = block.match(/zh\s*:\s*['"]([^'"]+)['"]/);
    const exPyMatch = block.match(/pinyin\s*:\s*['"]([^'"]+)['"]/);
    const exThMatch = block.match(/th\s*:\s*['"]([^'"]+)['"]/);
    const exEnMatch = block.match(/en\s*:\s*['"]([^'"]+)['"]/);

    existingHsk4Seed[hz] = {
      meaning_th: thMatch ? thMatch[1] : undefined,
      category: catMatch ? catMatch[1] : undefined,
      part_of_speech: posMatch ? posMatch[1] : undefined,
      mnemonic_th: mnemMatch ? mnemMatch[1] : undefined,
      example: exZhMatch ? {
        zh: exZhMatch[1],
        pinyin: exPyMatch ? exPyMatch[1] : '',
        th: exThMatch ? exThMatch[1] : '',
        en: exEnMatch ? exEnMatch[1] : '',
      } : undefined,
    };
  });
}

const finalWords = [];

hsk4Raw.forEach((item, index) => {
  const hz = item.hanzi;
  const id = `hsk4_${String(index + 1).padStart(4, '0')}`;
  
  const manual = p1[hz] || p2[hz] || p3[hz] || p4[hz];
  const existingSeed = existingHsk4Seed[hz];
  const existingLessonTh = existingMap[hz];

  const meaning_th = existingSeed?.meaning_th || manual?.th || existingLessonTh || item.definitions[0] || 'ความหมาย';
  const meaning_en = item.definitions.join(', ') || '';
  const category = existingSeed?.category || manual?.cat || 'general';
  const part_of_speech = existingSeed?.part_of_speech || manual?.pos || 'คำศัพท์';
  const example = existingSeed?.example || undefined;
  const mnemonic_th = existingSeed?.mnemonic_th || undefined;

  const wordObj = {
    id,
    level: 4,
    hanzi: hz,
    pinyin: item.pinyin,
    meaning_th,
    meaning_en,
    category,
    part_of_speech,
  };

  if (example) wordObj.example = example;
  if (mnemonic_th) wordObj.mnemonic_th = mnemonic_th;

  finalWords.push(wordObj);
});

console.log(`Generated ${finalWords.length} HSK 4 words!`);

// Generate TS File
let tsCode = `/**\n * src/data/hsk/hsk4.ts\n * Official HSK 3.0 Level 4 Vocabulary Repository (972 words).\n * Standardized Simplified Chinese with accurate Pinyin tone marks, Thai meanings, and categories.\n */\n\nimport { HSKWord } from './types';\n\nexport const hsk4Words: HSKWord[] = [\n`;

finalWords.forEach((word) => {
  tsCode += `  {\n`;
  tsCode += `    id: '${word.id}',\n`;
  tsCode += `    level: 4,\n`;
  tsCode += `    hanzi: '${word.hanzi}',\n`;
  tsCode += `    pinyin: '${word.pinyin}',\n`;
  tsCode += `    meaning_th: '${word.meaning_th.replace(/'/g, "\\'")}',\n`;
  tsCode += `    meaning_en: '${word.meaning_en.replace(/'/g, "\\'")}',\n`;
  tsCode += `    category: '${word.category}',\n`;
  tsCode += `    part_of_speech: '${word.part_of_speech}',\n`;
  if (word.example) {
    tsCode += `    example: {\n`;
    tsCode += `      zh: '${word.example.zh.replace(/'/g, "\\'")}',\n`;
    tsCode += `      pinyin: '${word.example.pinyin.replace(/'/g, "\\'")}',\n`;
    tsCode += `      th: '${word.example.th.replace(/'/g, "\\'")}',\n`;
    if (word.example.en) tsCode += `      en: '${word.example.en.replace(/'/g, "\\'")}',\n`;
    tsCode += `    },\n`;
  }
  if (word.mnemonic_th) {
    tsCode += `    mnemonic_th: '${word.mnemonic_th.replace(/'/g, "\\'")}',\n`;
  }
  tsCode += `  },\n`;
});

tsCode += `];\n`;

fs.writeFileSync('src/data/hsk/hsk4.ts', tsCode, 'utf8');
console.log('Successfully written to src/data/hsk/hsk4.ts!');
