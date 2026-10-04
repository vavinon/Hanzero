const fs = require('fs');

const hsk5 = JSON.parse(fs.readFileSync('data/hsk/hsk5.json', 'utf8'));

const existingMap = {};
function scanFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const re = /['"]?hanzi['"]?\s*:\s*['"]([^'"]+)['"][\s\S]*?['"]?(?:meaning_th|th)['"]?\s*:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    const hz = match[1];
    const th = match[2];
    if (!existingMap[hz]) existingMap[hz] = th;
  }
}

['src/data/hsk/hsk1.ts', 'src/data/hsk/hsk2.ts', 'src/data/hsk/hsk3.ts', 'src/data/hsk/hsk4.ts'].forEach(scanFile);

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const full = dir + '/' + f;
    if (fs.statSync(full).isDirectory()) scanDir(full);
    else if (full.endsWith('.ts') || full.endsWith('.json')) {
      scanFile(full);
    }
  });
}
scanDir('src/data/lessons');

let matchedCount = 0;
let missing = [];
hsk5.forEach((item, idx) => {
  if (existingMap[item.hanzi]) {
    matchedCount++;
  } else {
    missing.push({ idx, hanzi: item.hanzi, pinyin: item.pinyin, def: item.definitions.join(', ') });
  }
});

console.log('Total HSK 5:', hsk5.length);
console.log('Already in curriculum with Thai meaning:', matchedCount);
console.log('Missing Thai meaning:', missing.length);
fs.writeFileSync('temp_hsk5_missing.json', JSON.stringify(missing, null, 2));
fs.writeFileSync('temp_hsk5_existing_matched.json', JSON.stringify(existingMap, null, 2));

// Split missing into 4 chunks (~260 words each)
const chunkSize = Math.ceil(missing.length / 4);
for (let i = 0; i < 4; i++) {
  const chunk = missing.slice(i * chunkSize, (i + 1) * chunkSize);
  fs.writeFileSync(`temp_hsk5_chunk_${i + 1}.json`, JSON.stringify(chunk, null, 2));
  console.log(`Chunk ${i + 1} size:`, chunk.length);
}
