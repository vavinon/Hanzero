import { describe, it, expect } from 'vitest';
import {
  getRoleColorClass,
  calculateSlotAccuracy,
  evaluateSlotArrangement,
  diagnoseGrammarError,
  GrammarSlotProblem,
} from './grammarSlotEngine';

describe('grammarSlotEngine (Pure Logic)', () => {
  // Mock Problem 1: Ba-Sentence with Directional Complement (Unit 11/12)
  // "请把手机拿出来" (Qǐng bǎ shǒujī ná chūlai)
  const mockBaProblem: GrammarSlotProblem = {
    id: 'prob_ba_phone',
    category: 'ba_sentence',
    titleTh: 'ประโยค 把: หยิบโทรศัพท์มือถือออกมา',
    explanationTh: 'โครงสร้าง: [ประธาน/คำขอร้อง] + 把 + [กรรม] + [กริยา] + [ทิศทาง]',
    canonicalSentence: {
      zh: '请把手机拿出来',
      pinyin: 'Qǐng bǎ shǒujī ná chūlai',
      th: 'กรุณาหยิบโทรศัพท์มือถือออกมา',
    },
    tokens: [
      { id: 't_qing', zh: '请', pinyin: 'qǐng', th: 'กรุณา', role: 'modal' },
      { id: 't_ba', zh: '把', pinyin: 'bǎ', th: 'นำ/เอา', role: 'operator' },
      { id: 't_shouji', zh: '手机', pinyin: 'shǒujī', th: 'โทรศัพท์มือถือ', role: 'object' },
      { id: 't_na', zh: '拿', pinyin: 'ná', th: 'หยิบ/ถือ', role: 'verb' },
      { id: 't_chulai', zh: '出来', pinyin: 'chūlai', th: 'ออกมา', role: 'complement' },
    ],
    validSequences: [
      ['t_qing', 't_ba', 't_shouji', 't_na', 't_chulai'],
    ],
    formula: '[Modal] + 把 + [Object] + [Verb] + [Direction]',
    hintTh: 'วาง 把 ก่อนสิ่งของ แล้วตามด้วยกริยาและการเคลื่อนไหว',
  };

  // Mock Problem 2: Ba-Sentence with Time Adverbial (Alternative Valid Orders)
  // "今天我把空调修好了" vs "我今天把空调修好了"
  const mockBaTimeProblem: GrammarSlotProblem = {
    id: 'prob_ba_repair_time',
    category: 'ba_sentence',
    titleTh: 'ประโยค 把: ซ่อมแอร์เสร็จแล้ววันนี้',
    explanationTh: 'คำบอกเวลา (今天) สามารถวางหน้าประธานหรือหลังประธานได้',
    canonicalSentence: {
      zh: '今天我把空调修好了',
      pinyin: 'Jīntiān wǒ bǎ kōngtiáo xiū hǎo le',
      th: 'วันนี้ฉันซ่อมแอร์เสร็จเรียบร้อยแล้ว',
    },
    tokens: [
      { id: 't_jintian', zh: '今天', pinyin: 'jīntiān', th: 'วันนี้', role: 'time_adverbial' },
      { id: 't_wo', zh: '我', pinyin: 'wǒ', th: 'ฉัน', role: 'subject' },
      { id: 't_ba', zh: '把', pinyin: 'bǎ', th: 'เอา/นำ', role: 'operator' },
      { id: 't_kongtiao', zh: '空调', pinyin: 'kōngtiáo', th: 'แอร์', role: 'object' },
      { id: 't_xiu', zh: '修', pinyin: 'xiū', th: 'ซ่อม', role: 'verb' },
      { id: 't_haole', zh: '好了', pinyin: 'hǎo le', th: 'เสร็จเรียบร้อยแล้ว', role: 'complement' },
    ],
    validSequences: [
      ['t_jintian', 't_wo', 't_ba', 't_kongtiao', 't_xiu', 't_haole'], // Order A: Time + Subject
      ['t_wo', 't_jintian', 't_ba', 't_kongtiao', 't_xiu', 't_haole'], // Order B: Subject + Time
    ],
    formula: '[Time/S] + 把 + [Object] + [Verb] + [Result]',
  };

  // Mock Problem 3: Bei-Sentence (Passive - Unit 14)
  // "遥控器被弄坏了" (Yáokòngqì bèi nòng huài le)
  const mockBeiProblem: GrammarSlotProblem = {
    id: 'prob_bei_remote',
    category: 'bei_sentence',
    titleTh: 'ประโยค ถูกกระทำ (被): รีโมตถูกทำพังแล้ว',
    explanationTh: 'โครงสร้าง: [ผู้ถูกกระทำ] + 被 + [กริยา] + [ผลลัพธ์]',
    canonicalSentence: {
      zh: '遥控器被弄坏了',
      pinyin: 'Yáokòngqì bèi nòng huài le',
      th: 'รีโมตถูกทำพังแล้ว',
    },
    tokens: [
      { id: 't_remote', zh: '遥控器', pinyin: 'yáokòngqì', th: 'รีโมต', role: 'object' },
      { id: 't_bei', zh: '被', pinyin: 'bèi', th: 'ถูก', role: 'operator' },
      { id: 't_nong', zh: '弄', pinyin: 'nòng', th: 'ทำ', role: 'verb' },
      { id: 't_huaile', zh: '坏了', pinyin: 'huài le', th: 'พังแล้ว', role: 'complement' },
    ],
    validSequences: [
      ['t_remote', 't_bei', 't_nong', 't_huaile'],
    ],
    formula: '[Patient] + 被 + [Verb] + [Result]',
  };

  // Mock Problem 4: Potential Complement (Unit 15)
  // "这份菜我吃不下" (Zhè fèn cài wǒ chī bu xià)
  const mockPotentialProblem: GrammarSlotProblem = {
    id: 'prob_potential_eat',
    category: 'potential_complement',
    titleTh: 'คำเสริมความเป็นไปได้: จานนี้ฉันกินไม่ลง',
    explanationTh: 'โครงสร้าง: [กรรม/หัวเรื่อง] + [ประธาน] + [กริยา] + 不 + [ทิศทาง/ผลลัพธ์]',
    canonicalSentence: {
      zh: '我吃不下',
      pinyin: 'wǒ chī bu xià',
      th: 'ฉันกินไม่ลง',
    },
    tokens: [
      { id: 't_wo', zh: '我', pinyin: 'wǒ', th: 'ฉัน', role: 'subject' },
      { id: 't_chi', zh: '吃', pinyin: 'chī', th: 'กิน', role: 'verb' },
      { id: 't_buxia', zh: '不下', pinyin: 'bu xià', th: 'ไม่ลง/ไม่ไหว', role: 'complement' },
    ],
    validSequences: [
      ['t_wo', 't_chi', 't_buxia'],
    ],
    formula: '[S] + [V] + 不下',
  };

  describe('1. getRoleColorClass', () => {
    it('returns valid styling classes and Thai role names for all roles', () => {
      const subjectMeta = getRoleColorClass('subject');
      expect(subjectMeta.nameTh).toBe('ประธาน');
      expect(subjectMeta.bg).toContain('blue');

      const operatorMeta = getRoleColorClass('operator');
      expect(operatorMeta.nameTh).toContain('把/被');
      expect(operatorMeta.border).toContain('amber');

      const verbMeta = getRoleColorClass('verb');
      expect(verbMeta.nameTh).toBe('กริยาหลัก');
      expect(verbMeta.bg).toContain('emerald');

      const complementMeta = getRoleColorClass('complement');
      expect(complementMeta.nameTh).toContain('ส่วนเสริม');
      expect(complementMeta.bg).toContain('rose');
    });
  });

  describe('2. calculateSlotAccuracy', () => {
    it('calculates deterministic accuracy percentages correctly', () => {
      const target = ['a', 'b', 'c', 'd'];
      expect(calculateSlotAccuracy(['a', 'b', 'c', 'd'], target)).toBe(100);
      expect(calculateSlotAccuracy(['a', 'b', 'x', 'y'], target)).toBe(50);
      expect(calculateSlotAccuracy(['x', 'y', 'z', 'w'], target)).toBe(0);
      expect(calculateSlotAccuracy([], target)).toBe(0);
      expect(calculateSlotAccuracy(['a'], [])).toBe(0);
    });
  });

  describe('3. evaluateSlotArrangement - Ba Sentences', () => {
    it('evaluates canonical ba-sentence arrangement as 100% correct', () => {
      const placed = ['t_qing', 't_ba', 't_shouji', 't_na', 't_chulai'];
      const result = evaluateSlotArrangement(mockBaProblem, placed);

      expect(result.isComplete).toBe(true);
      expect(result.isCorrect).toBe(true);
      expect(result.accuracyScore).toBe(100);
      expect(result.matchedSequenceIndex).toBe(0);
      expect(result.diagnosticHint).toBeUndefined();
    });

    it('supports alternative valid orders (Time word before and after subject)', () => {
      // Order A: Time + Subject
      const orderA = ['t_jintian', 't_wo', 't_ba', 't_kongtiao', 't_xiu', 't_haole'];
      const resA = evaluateSlotArrangement(mockBaTimeProblem, orderA);
      expect(resA.isCorrect).toBe(true);
      expect(resA.matchedSequenceIndex).toBe(0);

      // Order B: Subject + Time
      const orderB = ['t_wo', 't_jintian', 't_ba', 't_kongtiao', 't_xiu', 't_haole'];
      const resB = evaluateSlotArrangement(mockBaTimeProblem, orderB);
      expect(resB.isCorrect).toBe(true);
      expect(resB.matchedSequenceIndex).toBe(1);
    });

    it('detects bare verb in ba-sentence without complement and returns Tutu hint', () => {
      // User placed verb without complement at the end
      const incompleteBa = ['t_qing', 't_ba', 't_shouji', 't_na'];
      const result = evaluateSlotArrangement(mockBaProblem, incompleteBa);

      expect(result.isComplete).toBe(false);
      expect(result.isCorrect).toBe(false);
      expect(result.diagnosticHint).toContain('ส่วนเสริมผลลัพธ์/ทิศทาง');
    });

    it('detects verb placed before 把 and returns disposal syntax hint', () => {
      // User placed verb before 把
      const wrongOrder = ['t_qing', 't_na', 't_ba', 't_shouji', 't_chulai'];
      const result = evaluateSlotArrangement(mockBaProblem, wrongOrder);

      expect(result.isCorrect).toBe(false);
      expect(result.diagnosticHint).toContain('คว้าสิ่งของ');
    });
  });

  describe('4. evaluateSlotArrangement - Bei Sentences & Complements', () => {
    it('evaluates bei-sentence correctly and detects inverted patient errors', () => {
      // Canonical
      const canonicalBei = ['t_remote', 't_bei', 't_nong', 't_huaile'];
      const resCanonical = evaluateSlotArrangement(mockBeiProblem, canonicalBei);
      expect(resCanonical.isCorrect).toBe(true);

      // Inverted: operator placed first
      const invertedBei = ['t_bei', 't_remote', 't_nong', 't_huaile'];
      const resInverted = evaluateSlotArrangement(mockBeiProblem, invertedBei);
      expect(resInverted.isCorrect).toBe(false);
      expect(resInverted.diagnosticHint).toContain('สิ่งของ/คนที่น่าสงสารโดนกระทำ');
    });

    it('evaluates potential complements and detects misplaced complement before verb', () => {
      // Canonical
      const canonical = ['t_wo', 't_chi', 't_buxia'];
      const resCanonical = evaluateSlotArrangement(mockPotentialProblem, canonical);
      expect(resCanonical.isCorrect).toBe(true);

      // Complement placed before verb
      const wrong = ['t_wo', 't_buxia', 't_chi'];
      const resWrong = evaluateSlotArrangement(mockPotentialProblem, wrong);
      expect(resWrong.isCorrect).toBe(false);
      expect(resWrong.diagnosticHint).toContain('เอากริยาขึ้นก่อน');
    });
  });

  describe('5. diagnoseGrammarError edge cases', () => {
    it('returns undefined when placed tokens are empty', () => {
      expect(diagnoseGrammarError(mockBaProblem, [])).toBeUndefined();
    });
  });
});
