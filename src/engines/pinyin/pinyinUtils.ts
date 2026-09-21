/**
 * src/engines/pinyin/pinyinUtils.ts
 * ---------------------------------------------------------------------------
 * Pure TypeScript Pinyin & Tone Sandhi Engine (Zero-UI, 100% Testable).
 *
 * Adheres strictly to AGENTS.md §4.2 and Master Curriculum specifications:
 * 1. Diacritic Mapping: Hanyu Pinyin vowel hierarchy (a > o > e > i/u/ü)
 * 2. Tone Number <-> Mark conversion (e.g. 'ni3 hao3' <-> 'nǐ hǎo')
 * 3. Standard Mandarin Tone Sandhi:
 *    - Third tone sandhi: 3 + 3 -> 2 + 3 (e.g. 你好 nǐ hǎo -> ní hǎo)
 *    - 不 (bù) sandhi: bú before Tone 4; neutral 'bu' in A-不-A
 *    - 一 (yī) sandhi: yí before Tone 4; yì before Tone 1/2/3; stays yī in ordinals/numerals
 */

// Tone mark lookup table for vowels
const TONE_MARKS: Record<string, [string, string, string, string]> = {
  a: ['ā', 'á', 'ǎ', 'à'],
  o: ['ō', 'ó', 'ǒ', 'ò'],
  e: ['ē', 'é', 'ě', 'è'],
  i: ['ī', 'í', 'ǐ', 'ì'],
  u: ['ū', 'ú', 'ǔ', 'ù'],
  v: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
};

// Reverse lookup for stripping accents while preserving ü
const ACCENT_MAP: Record<string, string> = {
  ā: 'a', á: 'a', ǎ: 'a', à: 'a',
  ō: 'o', ó: 'o', ǒ: 'o', ò: 'o',
  ē: 'e', é: 'e', ě: 'e', è: 'e',
  ī: 'i', í: 'i', ǐ: 'i', ì: 'i',
  ū: 'u', ú: 'u', ǔ: 'u', ù: 'u',
  ǖ: 'ü', ǘ: 'ü', ǚ: 'ü', ǜ: 'ü',
  Ā: 'A', Á: 'A', Ǎ: 'A', À: 'A',
  Ō: 'O', Ó: 'O', Ǒ: 'O', Ò: 'O',
  Ē: 'E', É: 'E', Ě: 'E', È: 'E',
  Ī: 'I', Í: 'I', Ǐ: 'I', Ì: 'I',
  Ū: 'U', Ú: 'U', Ǔ: 'U', Ù: 'U',
  Ǖ: 'Ü', Ǘ: 'Ü', Ǚ: 'Ü', Ǜ: 'Ü',
};

// Known characters by tone for sandhi determination
const TONE4_CHARS = new Set([
  '是', '要', '对', '客', '去', '会', '见', '快', '块', '定', '共', '次', '件', '万', '谢',
  '饭', '后', '话', '到', '叫', '看', '亮', '忘', '问', '进', '再', '下', '上', '用', '大', '太', '慢',
  '个', '错', '贵', '累', '站', '送', '换', '住', '便', '带', '算', '动', '爱', '辣', '半',
]);

const TONE123_CHARS = new Set([
  // Tone 1
  '吃', '高', '喝', '天', '杯', '些', '新', '生', '听', '说', '多', '知', '书', '张', '家', '只', '先', '车', '包', '边', '飞', '千',
  // Tone 2
  '行', '来', '年', '直', '条', '学', '常', '明', '昨', '难', '没', '同', '白', '旁', '瓶', '忙', '人', '茶', '钱', '房', '门',
  // Tone 3
  '好', '买', '起', '点', '碗', '本', '想', '你', '我', '请', '早', '晚', '小', '手', '老', '给', '可', '几', '走', '打', '找', '百',
]);

export const KNOWN_33_SANDHI_MAP: Record<string, { basePinyin: string; displayPinyin: string; explanation: string }> = {
  '你好': { basePinyin: 'nǐ hǎo', displayPinyin: 'ní hǎo', explanation: 'nǐ (3) + hǎo (3) -> ní hǎo (2+3)' },
  '可以': { basePinyin: 'kěyǐ', displayPinyin: 'kéyǐ', explanation: 'kě (3) + yǐ (3) -> kéyǐ (2+3)' },
  '手表': { basePinyin: 'shǒubiǎo', displayPinyin: 'shóubiǎo', explanation: 'shǒu (3) + biǎo (3) -> shóubiǎo (2+3)' },
  '给你': { basePinyin: 'gěi nǐ', displayPinyin: 'géi nǐ', explanation: 'gěi (3) + nǐ (3) -> géi nǐ (2+3)' },
  '哪里': { basePinyin: 'nǎlǐ', displayPinyin: 'nálǐ', explanation: 'nǎ (3) + lǐ (3) -> nálǐ (2+3)' },
  '洗手': { basePinyin: 'xǐshǒu', displayPinyin: 'xíshǒu', explanation: 'xǐ (3) + shǒu (3) -> xíshǒu (2+3)' },
  '洗手间': { basePinyin: 'xǐshǒujiān', displayPinyin: 'xíshǒujiān', explanation: 'xǐ (3) + shǒu (3) -> xíshǒujiān (2+3+1)' },
  '我也': { basePinyin: 'wǒ yě', displayPinyin: 'wó yě', explanation: 'wǒ (3) + yě (3) -> wó yě (2+3)' },
  '往左': { basePinyin: 'wǎng zuǒ', displayPinyin: 'wáng zuǒ', explanation: 'wǎng (3) + zuǒ (3) -> wáng zuǒ (2+3)' },
  '很好': { basePinyin: 'hěn hǎo', displayPinyin: 'hén hǎo', explanation: 'hěn (3) + hǎo (3) -> hén hǎo (2+3)' },
  '雨伞': { basePinyin: 'yǔsǎn', displayPinyin: 'yúsǎn', explanation: 'yǔ (3) + sǎn (3) -> yúsǎn (2+3)' },
  '水饺': { basePinyin: 'shuǐjiǎo', displayPinyin: 'shuíjiǎo', explanation: 'shuǐ (3) + jiǎo (3) -> shuíjiǎo (2+3)' },
  '米酒': { basePinyin: 'mǐjiǔ', displayPinyin: 'míjiǔ', explanation: 'mǐ (3) + jiǔ (3) -> míjiǔ (2+3)' },
  '两点': { basePinyin: 'liǎng diǎn', displayPinyin: 'liáng diǎn', explanation: 'liǎng (3) + diǎn (3) -> liáng diǎn (2+3)' },
  '几点': { basePinyin: 'jǐ diǎn', displayPinyin: 'jí diǎn', explanation: 'jǐ (3) + diǎn (3) -> jí diǎn (2+3)' },
  '五点': { basePinyin: 'wǔ diǎn', displayPinyin: 'wú diǎn', explanation: 'wǔ (3) + diǎn (3) -> wú diǎn (2+3)' },
  '九点': { basePinyin: 'jiǔ diǎn', displayPinyin: 'jiú diǎn', explanation: 'jiǔ (3) + diǎn (3) -> jiú diǎn (2+3)' },
  '两碗': { basePinyin: 'liǎng wǎn', displayPinyin: 'liáng wǎn', explanation: 'liǎng (3) + wǎn (3) -> liáng wǎn (2+3)' },
  '老板': { basePinyin: 'lǎobǎn', displayPinyin: 'láobǎn', explanation: 'lǎo (3) + bǎn (3) -> láobǎn (2+3)' },
};

/**
 * Strips tone accents to normalize pinyin into plain ASCII/Latin characters while preserving ü.
 */
export function stripToneMarks(pinyin: string): string {
  if (!pinyin) return '';
  return pinyin
    .split('')
    .map((ch) => ACCENT_MAP[ch] || ch)
    .join('');
}

/**
 * Detects the tone number (1-4) or 5 (neutral tone) of a pinyin syllable.
 */
export function getSyllableTone(syllable: string): 1 | 2 | 3 | 4 | 5 {
  if (!syllable) return 5;

  // Check numeric suffix first (e.g. hao3 -> 3)
  const numMatch = syllable.match(/[1-5]$/);
  if (numMatch) {
    const toneNum = parseInt(numMatch[0], 10);
    return toneNum >= 1 && toneNum <= 4 ? (toneNum as 1 | 2 | 3 | 4) : 5;
  }

  // Check diacritic characters
  if (/[āōēīūǖ]/.test(syllable)) return 1;
  if (/[áóéíúǘ]/.test(syllable)) return 2;
  if (/[ǎǒěǐǔǚ]/.test(syllable)) return 3;
  if (/[àòèìùǜ]/.test(syllable)) return 4;

  return 5;
}

/**
 * Places the appropriate tone mark on a single pinyin syllable string.
 */
export function convertSyllableNumberToMark(syllableWithNum: string): string {
  const match = syllableWithNum.match(/^([a-zA-ZüÜvV]+)([1-5]?)$/);
  if (!match) return syllableWithNum;

  const rawSyllable = match[1].replace(/v/g, 'ü').replace(/V/g, 'Ü');
  const tone = match[2] ? parseInt(match[2], 10) : 5;

  if (tone === 5 || tone < 1 || tone > 4) {
    return rawSyllable;
  }

  const toneIndex = (tone - 1) as 0 | 1 | 2 | 3;
  const lower = rawSyllable.toLowerCase();

  // Rule 1: 'a' or 'e' always gets the mark
  if (lower.includes('a')) {
    const isUpper = rawSyllable[lower.indexOf('a')] === 'A';
    const mark = TONE_MARKS.a[toneIndex];
    return rawSyllable.replace(/a/i, isUpper ? mark.toUpperCase() : mark);
  }
  if (lower.includes('e')) {
    const isUpper = rawSyllable[lower.indexOf('e')] === 'E';
    const mark = TONE_MARKS.e[toneIndex];
    return rawSyllable.replace(/e/i, isUpper ? mark.toUpperCase() : mark);
  }

  // Rule 2: 'ou' gets the mark on 'o'
  if (lower.includes('ou')) {
    const isUpper = rawSyllable[lower.indexOf('o')] === 'O';
    const mark = TONE_MARKS.o[toneIndex];
    return rawSyllable.replace(/o/i, isUpper ? mark.toUpperCase() : mark);
  }

  // Rule 3: Otherwise mark the last vowel (e.g. 'iu' -> 'u', 'ui' -> 'i')
  const vowels = ['a', 'o', 'e', 'i', 'u', 'ü'];
  let lastVowelIndex = -1;
  for (let i = rawSyllable.length - 1; i >= 0; i--) {
    if (vowels.includes(rawSyllable[i].toLowerCase())) {
      lastVowelIndex = i;
      break;
    }
  }

  if (lastVowelIndex !== -1) {
    const v = rawSyllable[lastVowelIndex].toLowerCase();
    const isUpper = rawSyllable[lastVowelIndex] === rawSyllable[lastVowelIndex].toUpperCase();
    const markList = TONE_MARKS[v];
    if (markList) {
      const mark = markList[toneIndex];
      return (
        rawSyllable.substring(0, lastVowelIndex) +
        (isUpper ? mark.toUpperCase() : mark) +
        rawSyllable.substring(lastVowelIndex + 1)
      );
    }
  }

  return rawSyllable;
}

/**
 * Converts a string with tone numbers to pinyin with standard unicode tone marks.
 * e.g. "ni3 hao3" -> "nǐ hǎo", "lv4" -> "lǜ"
 */
export function toneNumberToMark(pinyinWithNumbers: string): string {
  if (!pinyinWithNumbers) return '';
  return pinyinWithNumbers
    .split(/\s+/)
    .map((word) => convertSyllableNumberToMark(word))
    .join(' ');
}

/**
 * Result structure returned by applyToneSandhi
 */
export interface ToneSandhiResult {
  displayPinyin: string;
  ruleApplied?: '3+3' | 'bu_before_4' | 'bu_neutral' | 'yi_before_4' | 'yi_before_123' | 'yi_neutral';
  explanationTh?: string;
}

/**
 * Helper to replace a pinyin word safely without relying on ASCII \b regex boundaries
 */
function replacePinyinWord(text: string, fromWord: string, toWord: string): string {
  // Matches fromWord at string start or after whitespace/punctuation, and before string end or whitespace/punctuation
  const escaped = fromWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(^|[\\s,!?。！，])` + escaped + `(?=[\\s,!?。！，]|$)`, 'g');
  return text.replace(regex, `$1${toWord}`);
}

/**
 * Applies standard Mandarin Tone Sandhi rules to a Hanzi word and its dictionary Pinyin.
 */
export function applyToneSandhi(hanzi: string, basePinyin: string): ToneSandhiResult {
  if (!hanzi || !basePinyin) {
    return { displayPinyin: basePinyin || '' };
  }

  const cleanHanzi = hanzi.replace(/[？?！!。，,\s]+$/, '');

  // 1. Check known 3+3 Sandhi dictionary words
  if (KNOWN_33_SANDHI_MAP[cleanHanzi]) {
    const info = KNOWN_33_SANDHI_MAP[cleanHanzi];
    return {
      displayPinyin: info.displayPinyin,
      ruleApplied: '3+3',
      explanationTh: `เสียง 3 สองตัวติดกัน: คำหน้าผันเป็นเสียง 2 (${info.displayPinyin})`,
    };
  }

  // 2. Check 不 (bù) Sandhi
  if (cleanHanzi.includes('不')) {
    // A-不-A pattern: e.g. 好不好, 是不是 -> neutral tone
    if (/^([\u4e00-\u9fa5])不\1$/.test(cleanHanzi)) {
      const display = replacePinyinWord(replacePinyinWord(basePinyin, 'bù', 'bu'), 'bú', 'bu');
      return {
        displayPinyin: display,
        ruleApplied: 'bu_neutral',
        explanationTh: "โครงสร้าง A-不-A: คำว่า '不' ออกเป็นเสียงเบา (bu)",
      };
    }

    // Check 不 followed by Tone 4
    for (let i = 0; i < cleanHanzi.length - 1; i++) {
      if (cleanHanzi[i] === '不') {
        const nextChar = cleanHanzi[i + 1];
        if (TONE4_CHARS.has(nextChar)) {
          let display = replacePinyinWord(basePinyin, 'bù', 'bú');
          display = replacePinyinWord(display, 'Bù', 'Bú');
          return {
            displayPinyin: display,
            ruleApplied: 'bu_before_4',
            explanationTh: "คำว่า '不' อยู่หน้าพยางค์เสียง 4 ผันเป็นเสียง 2 (bú)",
          };
        }
      }
    }
  }

  // 3. Check 一 (yī) Sandhi
  if (cleanHanzi.includes('一')) {
    // Standalone numeral, ordinal, dates
    const isOrdinal = /^第[一二三四五六七八九十百千万0-9]+/.test(cleanHanzi);
    const isCalendarDate = /^(?:星期一|周一|礼拜一|一月|十一月|十二月|一号|一日)$/.test(cleanHanzi);
    const isPureOne = cleanHanzi === '一' || /^(?:十一|二十一|三十一|五十一)$/.test(cleanHanzi);
    const isRoomOrPhone = cleanHanzi.includes('101') || cleanHanzi.includes('房间') || cleanHanzi.includes('电话');

    if (isOrdinal || isCalendarDate || isPureOne || isRoomOrPhone) {
      return {
        displayPinyin: basePinyin,
        explanationTh: "คำว่า '一' ในการนับเลข ลำดับที่ วันที่ หรือเบอร์ห้อง คงเสียง 1 เดิม (yī)",
      };
    }

    // A-一-A reduplication: e.g. 看一看 -> neutral tone
    if (/(.)一\1/.test(cleanHanzi)) {
      const display = replacePinyinWord(basePinyin, 'yī', 'yi');
      return {
        displayPinyin: display,
        ruleApplied: 'yi_neutral',
        explanationTh: "กริยาซ้ำ A-一-A: คำว่า '一' ออกเป็นเสียงเบา (yi)",
      };
    }

    // Check 一 followed by Tone 4 -> yí
    for (let i = 0; i < cleanHanzi.length - 1; i++) {
      if (cleanHanzi[i] === '一') {
        const nextChar = cleanHanzi[i + 1];
        if (TONE4_CHARS.has(nextChar)) {
          let display = replacePinyinWord(basePinyin, 'yī', 'yí');
          display = replacePinyinWord(display, 'Yī', 'Yí');
          return {
            displayPinyin: display,
            ruleApplied: 'yi_before_4',
            explanationTh: "คำว่า '一' อยู่หน้าพยางค์เสียง 4 ผันเป็นเสียง 2 (yí)",
          };
        } else if (TONE123_CHARS.has(nextChar)) {
          let display = replacePinyinWord(basePinyin, 'yī', 'yì');
          display = replacePinyinWord(display, 'Yī', 'Yì');
          return {
            displayPinyin: display,
            ruleApplied: 'yi_before_123',
            explanationTh: "คำว่า '一' อยู่หน้าพยางค์เสียง 1, 2, 3 ผันเป็นเสียง 4 (yì)",
          };
        }
      }
    }
  }

  return { displayPinyin: basePinyin };
}
