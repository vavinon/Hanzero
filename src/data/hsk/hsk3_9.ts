import { HSKWord } from './types';

export const hsk7To9SeedWords: HSKWord[] = [
  // HSK 7-9 (Advanced / Higher Education / Professional)
  {
    id: 'hsk7_0001',
    level: 7,
    hanzi: '宏观',
    pinyin: 'hóngguān',
    meaning_th: 'มหภาค, ภาพรวมเชิงกว้าง',
    meaning_en: 'macroscopic, macro-level',
    category: 'work_business',
    part_of_speech: 'คำคุณศัพท์',
    example: {
      zh: '从宏观经济的角度来分析。',
      pinyin: 'Cóng hóngguān jīngjì de jiǎodù lái fēnxī.',
      th: 'วิเคราะห์จากมุมมองเศรษฐกิจมหภาค',
      en: 'Analyze from the macroeconomic perspective.',
    },
    mnemonic_th: 'ความยิ่งใหญ่กว้างขวาง (宏) ที่มองดูในมุมกว้าง (观)',
  },
  {
    id: 'hsk8_0001',
    level: 8,
    hanzi: '阐述',
    pinyin: 'chǎnshù',
    meaning_th: 'อรรถาธิบาย, บรรยายชี้แจงอย่างเป็นระบบ',
    meaning_en: 'to expound, elaborate',
    category: 'education',
    part_of_speech: 'คำกริยา',
    example: {
      zh: '作者在书中深刻阐述了这个理论。',
      pinyin: 'Zuòzhě zài shū zhōng shēnkè chǎnshù le zhè ge lǐlùn.',
      th: 'ผู้เขียนได้อรรถาธิบายทฤษฎีนี้ในหนังสืออย่างลึกซึ้ง',
      en: 'The author deeply expounded this theory in the book.',
    },
    mnemonic_th: 'ใช้คำพูดแจกแจงเปิดเผยให้เห็นกระจ่างชัด',
  },
  {
    id: 'hsk9_0001',
    level: 9,
    hanzi: '韬光养晦',
    pinyin: 'tāoguāng-yǎnghuì',
    meaning_th: 'ซ่อนคมเร้นประกาย, สั่งสมบารมีอย่างสุขุมไม่โอ้อวด',
    meaning_en: 'hide one’s light under a bushel, bide one’s time',
    category: 'general',
    part_of_speech: 'สำนวนสี่ตัว (成语)',
    example: {
      zh: '在时机成熟之前，应当韬光养晦。',
      pinyin: 'Zài shíjī chéngshú zhīqián, yīngdāng tāoguāng-yǎnghuì.',
      th: 'ก่อนที่โอกาสจะสุกงอม ควรเก็บคมเร้นประกายไว้ก่อน',
      en: 'Before the time is ripe, one should keep a low profile.',
    },
    mnemonic_th: 'เก็บซ่อนดาบไว้ในฝัก บำรุงพลังเงียบๆ รอเวลา',
  },
];
