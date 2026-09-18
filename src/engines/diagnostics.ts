/**
 * Hanzero Diagnostics & Accessibility Engine (diagnostics.ts)
 * -----------------------------------------------------------
 * Pure TypeScript logic for WCAG 2.1 relative luminance and contrast ratio calculations,
 * Accessible Dual-Encoded Tone specifications, and Mandarin Tone Sandhi validators.
 *
 * Adheres strictly to AGENTS.md §4.2: Pure TypeScript, zero-UI, 100% testable.
 */

export interface WcagComplianceResult {
  ratio: number;
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  level: 'AAA' | 'AA' | 'AA Large' | 'FAIL';
}

export interface DualEncodedTone {
  tone: 1 | 2 | 3 | 4 | 0;
  nameZh: string;
  nameTh: string;
  pinyinMark: string;
  symbol: string;
  shapeDescription: string;
  color: string;
  contrastOnRicePaper: number;
  pitchContour: string;
  exampleChar: string;
  examplePinyin: string;
}

export interface ToneSandhiRule {
  id: string;
  ruleName: string;
  conditionTh: string;
  exampleWritten: string;
  exampleSpoken: string;
  explanation: string;
}

/**
 * Standard Rice Paper Background Token (Hanzero Canvas)
 */
export const RICE_PAPER_HEX = '#FBF9F5';

/**
 * Parses a standard 3 or 6 digit HEX color string to RGB channels [0..255].
 */
export function parseHexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (clean.length !== 6) {
    return [0, 0, 0];
  }
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/**
 * Calculates WCAG 2.1 relative luminance of an sRGB color.
 * Formula: L = 0.2126 * R_lin + 0.7152 * G_lin + 0.0722 * B_lin
 */
export function calculateRelativeLuminance(hex: string): number {
  const [r, g, b] = parseHexToRgb(hex);

  const linearize = (channel: number): number => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const rLin = linearize(r);
  const gLin = linearize(g);
  const bLin = linearize(b);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

/**
 * Computes the WCAG 2.1 contrast ratio between two hex colors.
 * Formula: (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter color.
 */
export function calculateContrastRatio(hex1: string, hex2: string): number {
  const lum1 = calculateRelativeLuminance(hex1);
  const lum2 = calculateRelativeLuminance(hex2);

  const l1 = Math.max(lum1, lum2);
  const l2 = Math.min(lum1, lum2);

  const ratio = (l1 + 0.05) / (l2 + 0.05);
  return Math.round(ratio * 100) / 100;
}

/**
 * Returns WCAG AA / AAA compliance assessment for a given contrast ratio.
 */
export function getWcagCompliance(ratio: number): WcagComplianceResult {
  const aaa = ratio >= 7.0;
  const aa = ratio >= 4.5;
  const aaLarge = ratio >= 3.0;

  let level: WcagComplianceResult['level'] = 'FAIL';
  if (aaa) level = 'AAA';
  else if (aa) level = 'AA';
  else if (aaLarge) level = 'AA Large';

  return { ratio, aa, aaLarge, aaa, level };
}

/**
 * Hanzero Modern Oriental Color Palette Tokens with Precomputed Rice Paper Contrast
 */
export const HANZERO_PALETTE_TOKENS = [
  { name: 'Pine Soot Ink (Text Primary)', hex: '#1C1E21', purpose: 'ข้อความหลัก & พินอิน' },
  { name: 'Medium Ink (Text Secondary)', hex: '#525866', purpose: 'คำแปลไทย & ข้อความรอง' },
  { name: 'Text-Safe Dark Jade', hex: '#047857', purpose: 'ไอคอน/ข้อความหยกเข้ม (WCAG AA)' },
  { name: 'Primary Jade Accent', hex: '#059669', purpose: 'ปุ่มดำเนินการหลัก & แบดจ์' },
  { name: 'Text-Safe Dark Ochre', hex: '#B45309', purpose: 'ข้อความวรรณยุกต์เสียง 3 & Streak' },
  { name: 'Warm Ochre Surface Accent', hex: '#D97706', purpose: 'ส้มทองคำสำหรับไฮไลต์' },
  { name: 'Vermilion Red', hex: '#DC2626', purpose: 'หัวใจ & วรรณยุกต์เสียง 4' },
  { name: 'Electric Royal Blue', hex: '#2563EB', purpose: 'วรรณยุกต์เสียง 1' },
];

/**
 * Accessible Dual-Encoded Tones (Color + Geometric Shape + Tone Number)
 * Guarantees 100% color-blindness legibility (Deuteranopia, Protanopia, Tritanopia).
 */
export const DUAL_ENCODED_TONES: DualEncodedTone[] = [
  {
    tone: 1,
    nameZh: '阴平 (55)',
    nameTh: 'เสียง 1 (สูง-ราบ)',
    pinyinMark: 'ā',
    symbol: '—',
    shapeDescription: 'แถบระนาบแนวนอน',
    color: '#2563EB',
    contrastOnRicePaper: calculateContrastRatio('#2563EB', RICE_PAPER_HEX),
    pitchContour: '440Hz -> 440Hz (สูงคงที่)',
    exampleChar: '八',
    examplePinyin: 'bā',
  },
  {
    tone: 2,
    nameZh: '阳平 (35)',
    nameTh: 'เสียง 2 (ทะยานขึ้น)',
    pinyinMark: 'á',
    symbol: '▲',
    shapeDescription: 'สามเหลี่ยมชี้ขึ้น',
    color: '#047857',
    contrastOnRicePaper: calculateContrastRatio('#047857', RICE_PAPER_HEX),
    pitchContour: '330Hz -> 440Hz (ทะยานขึ้น)',
    exampleChar: '拔',
    examplePinyin: 'bá',
  },
  {
    tone: 3,
    nameZh: '上声 (214)',
    nameTh: 'เสียง 3 (ทอดต่ำวกขึ้น)',
    pinyinMark: 'ǎ',
    symbol: '◆',
    shapeDescription: 'สี่เหลี่ยมข้าวหลามตัด',
    color: '#B45309',
    contrastOnRicePaper: calculateContrastRatio('#B45309', RICE_PAPER_HEX),
    pitchContour: '300Hz -> 220Hz -> 370Hz (จุดต่ำสุด)',
    exampleChar: '把',
    examplePinyin: 'bǎ',
  },
  {
    tone: 4,
    nameZh: '去声 (51)',
    nameTh: 'เสียง 4 (ตกลึกหนักแน่น)',
    pinyinMark: 'à',
    symbol: '▼',
    shapeDescription: 'สามเหลี่ยมชี้ลง',
    color: '#DC2626',
    contrastOnRicePaper: calculateContrastRatio('#DC2626', RICE_PAPER_HEX),
    pitchContour: '440Hz -> 220Hz (ตก 1 คู่แปด)',
    exampleChar: '爸',
    examplePinyin: 'bà',
  },
  {
    tone: 0,
    nameZh: '轻声 (0)',
    nameTh: 'เสียงเบา (สั้นผ่อนคลาย)',
    pinyinMark: 'a',
    symbol: '●',
    shapeDescription: 'วงกลมทึบ',
    color: '#525866',
    contrastOnRicePaper: calculateContrastRatio('#525866', RICE_PAPER_HEX),
    pitchContour: 'สั้น นุ่มนวล ไม่เน้นน้ำหนัก',
    exampleChar: '吗',
    examplePinyin: 'ma',
  },
];

/**
 * Mandarin Tone Sandhi Validation Catalog
 */
export const TONE_SANDHI_RULES: ToneSandhiRule[] = [
  {
    id: 'sandhi-3-3',
    ruleName: 'กฎ 3 + 3 ➔ 2 + 3 (เสียงสามติดกัน)',
    conditionTh: 'เมื่อเสียง 3 สองพยางค์อยู่ติดกัน พยางค์แรกจะผันเป็นเสียง 2 เสมอ',
    exampleWritten: 'nǐ hǎo (你好)',
    exampleSpoken: 'ní hǎo',
    explanation: 'เขียน nǐ hǎo แต่ออกเสียงจริงเป็น ní hǎo เพื่อความลื่นไหลของสายเสียง',
  },
  {
    id: 'sandhi-bu',
    ruleName: 'กฎการเปลี่ยนเสียงของ 不 (bù)',
    conditionTh: 'ไม่ (不 bù) นำหน้าพยางค์เสียง 4 จะเปลี่ยนเป็นเสียง 2 (bú)',
    exampleWritten: 'bù shì (不是) / bù kèqi (不客气)',
    exampleSpoken: 'bú shì / bú kèqi',
    explanation: 'นำหน้าเสียง 4 เปลี่ยนเป็น bú นำหน้าเสียง 1, 2, 3 คงเป็น bù (เช่น bù gāo, bù lái, bù hǎo)',
  },
  {
    id: 'sandhi-yi',
    ruleName: 'กฎการเปลี่ยนเสียงของ 一 (yī)',
    conditionTh: 'หนึ่ง (一 yī) นำหน้าเสียง 4 เปลี่ยนเป็น yí / นำหน้าเสียง 1, 2, 3 เปลี่ยนเป็น yì',
    exampleWritten: 'yī yàng (一样) / yī tiān (一天)',
    exampleSpoken: 'yí yàng / yì tiān',
    explanation: 'นับเลขเป็น yī, นำหน้าเสียง 4 เป็น yí (yí yàng), นำหน้าเสียง 1/2/3 เป็น yì (yì tiān, yì qǐ)',
  },
];
