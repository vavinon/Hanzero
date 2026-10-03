const fs = require('fs');

const words = JSON.parse(fs.readFileSync('temp_all_506_simple.json', 'utf8'));

// Scan existing files safely
const dict = {};

function scanFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  // Match object-like structures
  const re = /hanzi\s*:\s*['"]([^'"]+)['"][\s\S]*?meaning_th\s*:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    const hz = match[1];
    const th = match[2];
    if (!dict[hz]) {
      dict[hz] = { th };
    }
  }
}

['src/data/hsk/hsk1.ts', 'src/data/hsk/hsk2.ts', 'src/data/hsk/seed_hsk3_9.ts'].forEach(scanFile);

// Scan lessons
function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const full = dir + '/' + f;
    if (fs.statSync(full).isDirectory()) scanDir(full);
    else if (full.endsWith('.ts') || full.endsWith('.json')) {
      const content = fs.readFileSync(full, 'utf8');
      const re = /['"]?hanzi['"]?\s*:\s*['"]([^'"]+)['"][\s\S]*?['"]?(?:meaning_th|th)['"]?\s*:\s*['"]([^'"]+)['"]/g;
      let match;
      while ((match = re.exec(content)) !== null) {
        const hz = match[1];
        const th = match[2];
        if (!dict[hz]) {
          dict[hz] = { th };
        }
      }
    }
  });
}
scanDir('src/data/lessons');

console.log('Total dict entries extracted:', Object.keys(dict).length);

let matched = 0;
const unmatched = [];
words.forEach(w => {
  if (dict[w.hz]) {
    matched++;
  } else {
    unmatched.push(w);
  }
});

console.log('Matched:', matched, 'Unmatched:', unmatched.length);
fs.writeFileSync('temp_unmatched.json', JSON.stringify(unmatched, null, 2), 'utf8');
