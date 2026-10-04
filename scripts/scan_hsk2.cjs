const fs = require('fs');

const hsk2 = JSON.parse(fs.readFileSync('data/hsk/hsk2.json', 'utf8'));

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

['src/data/hsk/hsk1.ts', 'src/data/hsk/hsk2.ts'].forEach(scanFile);

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
hsk2.forEach((item, idx) => {
  if (existingMap[item.hanzi]) {
    matchedCount++;
  } else {
    missing.push({ idx, hanzi: item.hanzi, pinyin: item.pinyin, def: item.definitions.join(', ') });
  }
});

console.log('Total HSK 2:', hsk2.length);
console.log('Already in curriculum with Thai meaning:', matchedCount);
console.log('Missing Thai meaning:', missing.length);
fs.writeFileSync('temp_hsk2_missing.json', JSON.stringify(missing, null, 2));
fs.writeFileSync('temp_hsk2_existing_matched.json', JSON.stringify(existingMap, null, 2));
