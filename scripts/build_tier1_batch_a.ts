/**
 * scripts/build_tier1_batch_a.ts
 * Generates Tier 1 Batch A (Units 2, 3, 4) JSON files following the Golden Template.
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

import * as fs from 'fs';
import * as path from 'path';

const srcTier1Dir = path.resolve('src/data/lessons/tier1');
const dataTier1Dir = path.resolve('data/lessons/tier1');

// ============================================================================
// UNIT 2: Numbers, Dates & Time (tier1_u02)
// ============================================================================
const unit02 = {
  unit_id: 'tier1_u02',
  tier: 1,
  unit_number: 2,
  title: {
    zh: '数字、日历与时间',
    th: 'ตัวเลข วันที่ & เวลา',
    en: 'Numbers, Calendar & Time'
  },
  description: 'นับเลข 0-10 พร้อมภาษามือจีนมือเดียว ถามวันในสัปดาห์ อ่านปฏิทิน นัดหมายเวลาตามกฎลำดับเวลาจีน คล่องแคล่ว มั่นใจ ไร้สะดุด',
  lessons: [
    {
      lesson_id: 't1_u02_l01',
      lesson_number: 1,
      title: {
        zh: '零到十与数字手势',
        th: 'นับเลข 0-10 & ภาษามือจีน',
        en: 'Counting 0-10 & Hand Gestures'
      },
      can_do: {
        th: 'นับเลข 0-10 ทำภาษามือจีนมือเดียวได้ถูกต้อง และเข้าใจความต่างระหว่าง 二 กับ 两',
        en: 'Count numbers 0-10, use Chinese single-hand number gestures, and understand 二 vs 两'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นับเลข 1-10 ด้วยมือข้างเดียวแบบคนจีนได้สำเร็จ!',
      vocabulary: [
        {
          id: 'hsk1_0201',
          hanzi: '零',
          pinyin: 'líng',
          display_pinyin: 'líng',
          pinyin_tone: 'ling2',
          meaning_th: 'ศูนย์',
          meaning_en: 'zero',
          radical: '雨',
          radical_name_th: 'หมวดฝน (雨字头)',
          stroke_count: 13,
          mnemonic: 'ฝน (雨) ตกลงมาเป็นคำสั่ง (令) กลายเป็นหยดน้ำกลมๆ ว่างเปล่า = 0',
          kid_mnemonic: 'ฝนตกเปาะแปะ ปั้นหยดน้ำเป็นลูกโป่งกลมๆ แทนเลข 0 (零)',
          body_gesture: 'ทำมือขวาเป็นรูปตัว O กลมๆ ระดับอก'
        },
        {
          id: 'hsk1_0202',
          hanzi: '一',
          pinyin: 'yī',
          display_pinyin: 'yī',
          pinyin_tone: 'yi1',
          meaning_th: 'หนึ่ง',
          meaning_en: 'one',
          radical: '一',
          radical_name_th: 'หมวดเส้นขวาง (一部)',
          stroke_count: 1,
          mnemonic: 'ขีดแนวนอน 1 เส้นตรงบนกระดาน = 1',
          kid_mnemonic: 'นิ้ววิเศษ 1 นิ้วชี้ขีดเส้นตรงบนฟ้าชึ้บ! = เลข 1',
          body_gesture: 'ชูนิ้วชี้ข้างขวาขึ้น 1 นิ้ว'
        },
        {
          id: 'hsk1_0203',
          hanzi: '二',
          pinyin: 'èr',
          display_pinyin: 'èr',
          pinyin_tone: 'er4',
          meaning_th: 'สอง (นับเลข/ลำดับที่)',
          meaning_en: 'two (counting/ordinal)',
          radical: '二',
          radical_name_th: 'หมวดสอง (二字部)',
          stroke_count: 2,
          mnemonic: 'ขีดแนวนอน 2 เส้น ขนานกัน = 2',
          kid_mnemonic: 'ไม้ขีดสองก้านวางคู่กัน เป็นเลข 2 แสนง่าย',
          body_gesture: 'ชูนิ้วชี้และนิ้วกลางเป็นรูปตัว V ชัยชนะ'
        },
        {
          id: 'hsk1_0204',
          hanzi: '三',
          pinyin: 'sān',
          display_pinyin: 'sān',
          pinyin_tone: 'san1',
          meaning_th: 'สาม',
          meaning_en: 'three',
          radical: '一',
          radical_name_th: 'หมวดเส้นขวาง (一部)',
          stroke_count: 3,
          mnemonic: 'ขีดแนวนอน 3 เส้น แทนฟ้า คน และดิน = 3',
          kid_mnemonic: 'รางรถไฟ 3 ชั้น ปู้นๆ = เลข 3',
          body_gesture: 'ชูสามนิ้ว (นิ้วชี้ นิ้วกลาง นิ้วนาง)'
        },
        {
          id: 'hsk1_0205',
          hanzi: '四',
          pinyin: 'sì',
          display_pinyin: 'sì',
          pinyin_tone: 'si4',
          meaning_th: 'สี่',
          meaning_en: 'four',
          radical: '囗',
          radical_name_th: 'หมวดกรอบล้อม (大口框)',
          stroke_count: 5,
          mnemonic: 'กรอบหน้าต่างสี่เหลี่ยม (囗) มีผ้าม่านแหวกสองข้าง (儿) = 4',
          kid_mnemonic: 'หน้าต่างห้องนอน 4 มุม เปิดผ้าม่านรับลมเย็น = เลข 4',
          body_gesture: 'ชูสี่นิ้ว กางนิ้วชี้ กลาง นาง ก้อย (พับนิ้วโป้งเก็บในอุ้งมือ)'
        },
        {
          id: 'hsk1_0206',
          hanzi: '五',
          pinyin: 'wǔ',
          display_pinyin: 'wǔ',
          pinyin_tone: 'wu3',
          meaning_th: 'ห้า',
          meaning_en: 'five',
          radical: '二',
          radical_name_th: 'หมวดสอง (二字部)',
          stroke_count: 4,
          mnemonic: 'เชื่อมระหว่างฟ้า ดิน และเส้นกากบาทตรงกลาง = 5',
          kid_mnemonic: 'บันไดกระโดด 5 ขั้น ยืนรับลม = เลข 5 สดใส',
          body_gesture: 'แบฝ่ามือทั้ง 5 นิ้วออกกว้างๆ ยิ้มรับความสดชื่น'
        },
        {
          id: 'hsk1_0207',
          hanzi: '六',
          pinyin: 'liù',
          display_pinyin: 'liù',
          pinyin_tone: 'liu4',
          meaning_th: 'หก',
          meaning_en: 'six',
          radical: '八',
          radical_name_th: 'หมวดแปด (八字头)',
          stroke_count: 4,
          mnemonic: 'หลังคาเต็นท์มีเสาสองข้าง = 6',
          kid_mnemonic: 'ทรงผมมีจุกข้างบน มีขาสองข้างเต้นระบำ = เลข 6',
          body_gesture: 'ภาษามือจีนคาราบาว: กางนิ้วโป้งและนิ้วก้อย (พับสามนิ้วกลาง)'
        },
        {
          id: 'hsk1_0208',
          hanzi: '七',
          pinyin: 'qī',
          display_pinyin: 'qī',
          pinyin_tone: 'qi1',
          meaning_th: 'เจ็ด',
          meaning_en: 'seven',
          radical: '一',
          radical_name_th: 'หมวดเส้นขวาง (一部)',
          stroke_count: 2,
          mnemonic: 'รูปร่างเหมือนเลข 7 กลับหัว = 7',
          kid_mnemonic: 'ตะขอเกี่ยวขนมจิ๋ว เกี่ยวได้ 7 ห่อ = เลข 7',
          body_gesture: 'ภาษามือจีนจีบ: รวบนิ้วโป้ง นิ้วชี้ และนิ้วกลางเข้าหากันเหมือนหัวนก'
        },
        {
          id: 'hsk1_0209',
          hanzi: '八',
          pinyin: 'bā',
          display_pinyin: 'bā',
          pinyin_tone: 'ba1',
          meaning_th: 'แปด',
          meaning_en: 'eight',
          radical: '八',
          radical_name_th: 'หมวดแปด (八字旁)',
          stroke_count: 2,
          mnemonic: 'เส้นสองเส้นกางแยกออกจากกัน = 8',
          kid_mnemonic: 'ภูเขาเปิดทาง กว้างใหญ่รับโชค = เลข 8 ร่ำรวย',
          body_gesture: 'ภาษามือจีนรูปปืน: กางนิ้วโป้งและนิ้วชี้ออกตั้งฉาก'
        },
        {
          id: 'hsk1_0210',
          hanzi: '九',
          pinyin: 'jiǔ',
          display_pinyin: 'jiǔ',
          pinyin_tone: 'jiu3',
          meaning_th: 'เก้า',
          meaning_en: 'nine',
          radical: '丿',
          radical_name_th: 'หมวดเส้นตวัดซ้าย (撇部)',
          stroke_count: 2,
          mnemonic: 'แขนที่งอเกร็งกล้ามเนื้อ = 9',
          kid_mnemonic: 'หางไดโนเสาร์งอเป็นตะขอเกี่ยวดาวดวงที่ 9',
          body_gesture: 'ภาษามือจีนนิ้วงอ: พับงอนิ้วชี้เป็นตะขอ (กำนิ้วที่เหลือ)'
        },
        {
          id: 'hsk1_0211',
          hanzi: '十',
          pinyin: 'shí',
          display_pinyin: 'shí',
          pinyin_tone: 'shi2',
          meaning_th: 'สิบ',
          meaning_en: 'ten',
          radical: '十',
          radical_name_th: 'หมวดกากบาทสิบ (十字儿)',
          stroke_count: 2,
          mnemonic: 'เส้นตัดกันแนวตั้งและแนวนอน ครบถ้วนสมบูรณ์ = 10',
          kid_mnemonic: 'เครื่องหมายบวกพยาบาล ช่วยเหลือเพื่อนครบ 10 คน!',
          body_gesture: 'นำนิ้วชี้ทั้งสองข้างมาไขว้กันเป็นเครื่องหมายบวก 十'
        },
        {
          id: 'hsk1_0212',
          hanzi: '两',
          pinyin: 'liǎng',
          display_pinyin: 'liǎng',
          pinyin_tone: 'liang3',
          meaning_th: 'สอง (ใช้กับจำนวนนับและลักษณนาม)',
          meaning_en: 'two, a pair (for counting with measure words)',
          radical: '一',
          radical_name_th: 'หมวดเส้นขวาง (一部)',
          stroke_count: 7,
          mnemonic: 'คานชั่งน้ำหนักที่แขวนของสองข้างเท่ากัน = สอง (คู่)',
          kid_mnemonic: 'สองคน (人人) อยู่ใต้หลังคาเดียวกัน = เราสองคน (两)',
          body_gesture: 'ชูสองนิ้วระดับอกแล้วโยกไปมาเบาๆ'
        }
      ],
      tone_rule: {
        rule_name: 'กฎเสียงเดิมของ 一 (yī) เมื่อนับเลข',
        description_th: 'เมื่อนับเลขเดี่ยว 1, 2, 3 หรือเลขผสมท้ายแถว คำว่า 一 จะคงเสียงสูงระดับ 1 คือ yī เสมอ ไม่ผันเสียง',
        example: '一 (yī), 十一 (shíyī), 二十一 (èrshíyī)',
        fun_metaphor: 'น้องหนึ่งในการนับเลขเป็นคุณหนูยืนตรงบนยอดเขา ไม่ยอมก้มหัวเปลี่ยนเสียงให้ใคร!',
        reassurance: 'ไม่ต้องกังวลเรื่องการผันเสียงเลยนะจ๊ะ ในการนับเลขท่อง 一 (yī) เสียงสูงตรงยาวๆ ได้เลย!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้นับเลขจีน: 11-99 และจำนวนนับคน',
        explanation_th: 'ภาษาจีนนับเลขตรงไปตรงมาเหมือนต่อบล็อกเลโก้ สิบ+เอ็ด, ยี่สิบ, สามสิบ...',
        patterns: [
          {
            formula: '十 + [1-9] = 11 ถึง 19',
            zh: '十五',
            pinyin: 'Shíwǔ',
            th: 'สิบห้า (15)',
            en: 'Fifteen (15)'
          },
          {
            formula: '[2-9] + 十 = 20, 30, 40...',
            zh: '二十',
            pinyin: 'Èrshí',
            th: 'ยี่สิบ (20)',
            en: 'Twenty (20)'
          },
          {
            formula: '两 + 个 + 人 = คนสองคน',
            zh: '两个人',
            pinyin: 'Liǎng ge rén',
            th: 'คนสองคน (จำแม่นๆ: มีลักษณนามต้องใช้ 两 ห้ามใช้ 二)',
            en: 'Two people'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'น้องกระต่ายทู่ทู่ 🐰',
          zh: '你好！我是泰国人。',
          pinyin: 'Nǐ hǎo! Wǒ shì Tàiguó rén.',
          th: 'สวัสดีจ้า! ฉันเป็นคนไทยนะ',
          en: 'Hello! I am Thai.'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '你好！很高兴认识你！请问这是几？',
          pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ! Qǐngwèn zhè shì jǐ?',
          th: 'สวัสดีครับ! ยินดีที่ได้รู้จักครับ ขอถามหน่อย นี่คือเลขอะไรครับ?',
          en: 'Hello! Nice to meet you! Excuse me, what number is this?'
        },
        {
          speaker: 'A',
          speaker_name: 'น้องกระต่ายทู่ทู่ 🐰',
          zh: '这是八！',
          pinyin: 'Zhè shì bā!',
          th: 'นี่คือเลข 8 จ้า! (ภาษามือรูปปืน)',
          en: 'This is eight!'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '太棒了！我们有两个人！谢谢你！',
          pinyin: 'Tài bàng le! Wǒmen yǒu liǎng ge rén! Xièxie nǐ!',
          th: 'ยอดเยี่ยมครับ พวกเรามีสองคน ขอบคุณนะ!',
          en: 'Awesome! We have two people! Thank you!'
        },
        {
          speaker: 'A',
          speaker_name: 'น้องกระต่ายทู่ทู่ 🐰',
          zh: '不客气，再见！',
          pinyin: 'Bú kèqi, zàijiàn!',
          th: 'ไม่เป็นไรจ้า แล้วพบกันใหม่นะ!',
          en: "You're welcome, see you again!"
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ฟังเสียง 'liù' แล้วสังเกตว่าตรงกับภาษามือจีนแบบใด?",
          options: [
            'ภาษามือคาราบาว (กางนิ้วโป้งและนิ้วก้อย)',
            'ชู 6 นิ้วโดยใช้สองมือ',
            'ทำท่าจีบนิ้วสามนิ้วเหมือนหัวนก',
            'ชูกำปั้นไขว้กัน'
          ],
          correct_index: 0,
          explanation_th: 'คนจีนทำสัญลักษณ์เลข 6 (liù) มือเดียวด้วยการกางนิ้วโป้งและนิ้วก้อยเหมือนท่าคาราบาว!',
          encouragement: 'สุดยอดมาก! รู้ภาษามือจีนแล้วไปเที่ยวจีนไม่อดตายแน่นอน!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '四' (สี่) มีหมวดนำใดที่ล้อมกรอบตัวอักษรไว้?",
          options: [
            'หมวดกรอบล้อม (囗 大口框)',
            'หมวดดวงอาทิตย์ (日)',
            'หมวดปากเล็ก (口)',
            'หมวดสองขีด (二)'
          ],
          correct_index: 0,
          explanation_th: "ตัวอักษร 四 มีหมวดนำกรอบสี่เหลี่ยมล้อมรอบคือ '囗' (大口框) ล้อมผ้าม่านสองข้างไว้ด้านใน",
          encouragement: 'ตาไวมาก! สังเกตกรอบหน้าต่างห้องนอนได้เป๊ะสุดๆ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงบล็อกตัวเลขจีนให้ได้จำนวน "15" (สิบห้า):',
          tokens: ['五', '十'],
          correct_sequence: ['十', '五'],
          pinyin: 'Shíwǔ',
          meaning_th: 'สิบห้า (15)',
          explanation_th: 'สูตรนับเลข 11-19 คือ 十 + [1-9] ดังนั้น 15 จึงนำ 十 (10) วางหน้า 五 (5) = 十五',
          encouragement: 'ถูกต้องยอดเยี่ยม! ต่อบล็อกเลโก้ตัวเลขได้คล่องปร๋อ!'
        },
        {
          type: 'flash_recall',
          question_th: 'หากต้องการพูดว่า "คน 2 คน" ข้อใดถูกต้องตามหลักภาษาจีน?',
          options: [
            '两个人 (Liǎng ge rén)',
            '二个人 (Èr ge rén)',
            '二点人 (Èr diǎn rén)',
            '一两个人 (Yī liǎng ge rén)'
          ],
          correct_index: 0,
          explanation_th: 'เมื่อพูดถึงจำนวนนับที่มีลักษณนามตามหลัง ภาษาจีนต้องใช้ 两 (liǎng) เสมอ ห้ามพูด 二个人 เด็ดขาด!',
          encouragement: 'เก่งระดับเซียน! ไม่หลงกลกับดัก 二 vs 两 เลย!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณกำลังสั่งผลไม้ที่ตลาดเซี่ยงไฮ้ พ่อค้าทำภาษามือรูปปืน (กางนิ้วโป้งกับนิ้วชี้) พ่อค้ากำลังสื่อถึงจำนวนเท่าใด?',
        options: [
          '8 ชิ้น (八个)',
          '2 ชิ้น (二个)',
          '7 ชิ้น (七个)',
          '5 ชิ้น (五个)'
        ],
        correct_index: 0,
        explanation_th: 'ภาษามือจีนรูปปืนคือกางนิ้วโป้งและนิ้วชี้ออกตั้งฉาก หมายถึงเลข 8 (八) เพราะรูปร่างคล้ายตัวอักษร 八 นั่นเอง!',
        encouragement: 'ยินดีด้วย! คุณผ่านด่านภาษามือมังกรน้อยสำเร็จ!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u02_l01',
        badge_name: 'เซียนภาษามือมังกรน้อย 🖐️🐰',
        message_th: 'ยินดีด้วยนะคนเก่ง! วันนี้คุณนับเลข 0-10 และทำภาษามือจีนได้เป๊ะเหมือนเจ้าของภาษาแล้ว!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't1_u02_l02',
      lesson_number: 2,
      title: {
        zh: '今天明天星期几',
        th: 'วันนี้ พรุ่งนี้ วันอะไร?',
        en: 'Days of the Week & Dates'
      },
      can_do: {
        th: 'ถามและบอกวันในสัปดาห์ (จันทร์-อาทิตย์) วันที่ และเดือน พร้อมหลีกเลี่ยงกับดัก 星期两',
        en: 'Ask and state days of the week, dates, and months while avoiding the 星期两 trap'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พูดบอกเพื่อนชาวจีนได้ว่า "วันนี้วันจันทร์!" ได้อย่างมั่นใจ',
      vocabulary: [
        {
          id: 'hsk1_0213',
          hanzi: '今天',
          pinyin: 'jīntiān',
          display_pinyin: 'jīntiān',
          pinyin_tone: 'jin1tian1',
          meaning_th: 'วันนี้',
          meaning_en: 'today',
          radical: '人',
          radical_name_th: 'หมวดคน (人字头)',
          stroke_count: 8,
          mnemonic: 'คนกางร่มยืนรับแสงอาทิตย์บนท้องฟ้า (天) ในปัจจุบัน = วันนี้',
          kid_mnemonic: 'คนกางร่มยืนรับแสงอาทิตย์บนท้องฟ้า (天) = วันนี้ (今天)',
          body_gesture: 'ชี้นิ้วชี้สองข้างลงพื้นตรงหน้าพร้อมกัน สื่อถึง วันนี้'
        },
        {
          id: 'hsk1_0214',
          hanzi: '明天',
          pinyin: 'míngtiān',
          display_pinyin: 'míngtiān',
          pinyin_tone: 'ming2tian1',
          meaning_th: 'พรุ่งนี้',
          meaning_en: 'tomorrow',
          radical: '日',
          radical_name_th: 'หมวดดวงอาทิตย์ (日字旁)',
          stroke_count: 12,
          mnemonic: 'พระอาทิตย์ (日) กับพระจันทร์ (月) ส่องแสงสว่าง (明) สู่เช้าวันใหม่ = พรุ่งนี้',
          kid_mnemonic: 'พระอาทิตย์ (日) กับพระจันทร์ (月) ส่องแสงสว่าง (明) สู่ วันพรุ่งนี้ (明天)',
          body_gesture: 'ผายมือชี้ไปข้างหน้า สื่อถึงอนาคตวันพรุ่งนี้'
        },
        {
          id: 'hsk1_0215',
          hanzi: '昨天',
          pinyin: 'zuótiān',
          display_pinyin: 'zuótiān',
          pinyin_tone: 'zuo2tian1',
          meaning_th: 'เมื่อวานนี้',
          meaning_en: 'yesterday',
          radical: '日',
          radical_name_th: 'หมวดดวงอาทิตย์ (日字旁)',
          stroke_count: 13,
          mnemonic: 'พระอาทิตย์ (日) ของวันก่อนผ่านพ้นไปแล้ว = เมื่อวานนี้',
          kid_mnemonic: 'พระอาทิตย์ (日) ของเมื่อวาน ลอยลับขอบฟ้าไปแล้ว = เมื่อวานนี้',
          body_gesture: 'ชี้นิ้วโป้งข้ามไหล่ไปข้างหลัง สื่อถึงวันวานที่ผ่านมา'
        },
        {
          id: 'hsk1_0216',
          hanzi: '星期',
          pinyin: 'xīngqī',
          display_pinyin: 'xīngqī',
          pinyin_tone: 'xing1qi1',
          meaning_th: 'สัปดาห์',
          meaning_en: 'week',
          radical: '日',
          radical_name_th: 'หมวดดวงอาทิตย์ (日字旁)',
          stroke_count: 21,
          mnemonic: 'ดวงดาว (星) โคจรรอบดวงจันทร์ตามกำหนดเวลา (期) ครบ 7 วัน = 1 สัปดาห์',
          kid_mnemonic: 'ดวงดาว (星) โคจรรอบดวงจันทร์ตามกำหนดเวลา (期) ครบ 7 วัน = 1 สัปดาห์',
          body_gesture: 'หมุนนิ้วชี้เป็นวงกลม 1 รอบ สื่อถึงรอบสัปดาห์'
        },
        {
          id: 'hsk1_0217',
          hanzi: '几',
          pinyin: 'jǐ',
          display_pinyin: 'jǐ',
          pinyin_tone: 'ji3',
          meaning_th: 'กี่, เท่าไหร่',
          meaning_en: 'how many, which',
          radical: '几',
          radical_name_th: 'หมวดโต๊ะเตี้ย (几字部)',
          stroke_count: 2,
          mnemonic: 'โต๊ะตัวเตี้ยสองขา เอียงคอถามว่ามีของวางอยู่กี่ชิ้น?',
          kid_mnemonic: 'โต๊ะตัวเตี้ยสองขา เอียงคอถามว่ามีของวางอยู่ กี่ชิ้น (几)?',
          body_gesture: 'แบสองมือเอียงคอทำหน้าสงสัย'
        },
        {
          id: 'hsk1_0218',
          hanzi: '月',
          pinyin: 'yuè',
          display_pinyin: 'yuè',
          pinyin_tone: 'yue4',
          meaning_th: 'เดือน, พระจันทร์',
          meaning_en: 'month, moon',
          radical: '月',
          radical_name_th: 'หมวดพระจันทร์ (月字旁)',
          stroke_count: 4,
          mnemonic: 'พระจันทร์เสี้ยวส่องแสงนวล เปลี่ยนรูปร่างทุกๆ 1 เดือน = เดือน',
          kid_mnemonic: 'พระจันทร์เสี้ยวส่องแสงนวล เปลี่ยนรูปร่างทุกๆ 1 เดือน (月)',
          body_gesture: 'โค้งแขนเหนือศีรษะเลียนแบบพระจันทร์เสี้ยว'
        },
        {
          id: 'hsk1_0219',
          hanzi: '号',
          pinyin: 'hào',
          display_pinyin: 'hào',
          pinyin_tone: 'hao4',
          meaning_th: 'วันที่, หมายเลข',
          meaning_en: 'date, number',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 5,
          mnemonic: 'ปาก (口) ตะโกนขานหมายเลขประจำวัน = วันที่/หมายเลข',
          kid_mnemonic: 'ปาก (口) ตะโกนขานหมายเลข วันที่ (号) ประจำวัน',
          body_gesture: 'ชี้ที่ช่องปฏิทินในจินตนาการ'
        }
      ],
      tone_rule: {
        rule_name: 'กฎเสียงคงเดิมของ 星期一 (xīngqīyī)',
        description_th: 'คำว่า 星期一 (วันจันทร์) คำว่า 一 ทำหน้าที่เป็นลำดับวัน จึงคงเสียงเดิม yī เสมอ ไม่เปลี่ยนเสียง',
        example: '星期一 (xīngqīyī), 一月 (yīyuè), 一号 (yīhào)',
        fun_metaphor: 'วันจันทร์เป็นวันแรกของสัปดาห์ พี่หนึ่งเปิดตัวสง่างามด้วยเสียง yī สูงตรงชัดเจน!',
        reassurance: 'จำง่ายๆ เลยจ้า: ถ้าเกี่ยวกับชื่อวันและวันที่ 一 อ่านว่า yī เสมอ!'
      },
      grammar_bite: {
        title: 'สูตรถามวันและระบุวันที่ในภาษาจีน',
        explanation_th: 'คนจีนเริ่มนับวันแรกของสัปดาห์คือวันจันทร์ (星期一) และเรียงลำดับจากใหญ่ไปเล็ก: [เดือน] + 月 + [วันที่] + 号',
        patterns: [
          {
            formula: '今天 + 星期几？ = วันนี้วันอะไร?',
            zh: '今天星期几？',
            pinyin: 'Jīntiān xīngqī jǐ?',
            th: 'วันนี้วันอะไร?',
            en: 'What day is today?'
          },
          {
            formula: '今天 + 星期 + [一 ถึง 六 / 天] = วันนี้วัน...',
            zh: '今天星期一。',
            pinyin: 'Jīntiān xīngqīyī.',
            th: 'วันนี้วันจันทร์',
            en: 'Today is Monday.'
          },
          {
            formula: '[เดือน] + 月 + [วันที่] + 号 = วันที่...',
            zh: '五月八号',
            pinyin: 'Wǔ yuè bā hào',
            th: 'วันที่ 8 พฤษภาคม (คนจีนพูดเดือนก่อนวันที่)',
            en: 'May 8th'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: '你好สมชาย！今天星期几？',
          pinyin: 'Nǐ hǎo Somchai! Jīntiān xīngqī jǐ?',
          th: 'สวัสดีสมชาย! วันนี้วันอะไรเหรอ?',
          en: 'Hello Somchai! What day is today?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '你好หลี่หมิง！今天星期一，明天是星期二。',
          pinyin: "Nǐ hǎo Li Ming! Jīntiān xīngqīyī, míngtiān shì xīngqī'èr.",
          th: 'สวัสดีหลี่หมิง! วันนี้วันจันทร์ พรุ่งนี้คือวันอังคารครับ',
          en: 'Hello Li Ming! Today is Monday, tomorrow is Tuesday.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: '昨天是几号？',
          pinyin: 'Zuótiān shì jǐ hào?',
          th: 'เมื่อวานนี้วันที่เท่าไหร่เหรอ?',
          en: 'What date was yesterday?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '昨天是五号。谢谢你！再见！',
          pinyin: 'Zuótiān shì wǔ hào. Xièxie nǐ! Zàijiàn!',
          th: 'เมื่อวานนี้วันที่ 5 ครับ ขอบคุณนะ บ๊ายบาย!',
          en: 'Yesterday was the 5th. Thank you! Goodbye!'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: '再见！',
          pinyin: 'Zàijiàn!',
          th: 'ลาก่อนครับ!',
          en: 'Goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ฟังเสียง 'xīngqīyī' แล้วเลือกว่าตรงกับวันใด?",
          options: [
            'วันจันทร์',
            'วันอังคาร',
            'วันอาทิตย์',
            'วันศุกร์'
          ],
          correct_index: 0,
          explanation_th: 'คนจีนเริ่มวันแรกของสัปดาห์ด้วยวันจันทร์ ดังนั้น 星期一 (xīngqīyī) คือวันจันทร์!',
          encouragement: 'ยอดเยี่ยมมาก! จำวันแรกของสัปดาห์คนจีนได้แม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "หมวดนำ '日' (ดวงอาทิตย์) ปรากฏในคำใดที่แปลว่า 'เมื่อวานนี้'?",
          options: [
            '昨天 (zuótiān)',
            '今天 (jīntiān)',
            '几 (jǐ)',
            '月 (yuè)'
          ],
          correct_index: 0,
          explanation_th: 'คำว่า 昨天 (เมื่อวานนี้) มีหมวดนำ 日 (ดวงอาทิตย์) ด้านซ้าย สื่อถึงกาลเวลาและดวงตะวัน!',
          encouragement: 'นักสืบหมวดนำตาไวมาก ตอบได้ถูกต้อง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยคถามวัน: "วันนี้วันอะไร?"',
          tokens: ['几', '今天', '星期'],
          correct_sequence: ['今天', '星期', '几'],
          pinyin: 'Jīntiān xīngqī jǐ?',
          meaning_th: 'วันนี้วันอะไร?',
          explanation_th: 'โครงสร้างประโยคถามวันคือ: [ประธาน] 今天 + 星期 + 几? (วันนี้วันอะไร?)',
          encouragement: 'เก่งมากจ้า! สลับคำถามวันภาษาจีนได้คล่องแคล่ว!'
        },
        {
          type: 'flash_recall',
          question_th: 'คนจีนเรียก "วันอังคาร" ว่าอย่างไร? (ระวังกับดัก 二 vs 两 ให้ดี!)',
          options: [
            '星期二 (xīngqī\'èr)',
            '星期两 (xīngqīliǎng)',
            '星期七 (xīngqīqī)',
            '二星期 (èr xīngqī)'
          ],
          correct_index: 0,
          explanation_th: 'วันในสัปดาห์ถือเป็นการนับลำดับที่ (1, 2, 3...) จึงต้องใช้ 二 เท่านั้น คือ 星期二 (ห้ามพูด 星期两 เด็ดขาด!)',
          encouragement: 'สุดยอดดด! ปราบกับดักกลับด้านได้อยู่หมัด ไม่โดนข้อสอบหลอก!'
        }
      ],
      boss_challenge: {
        scenario_th: 'เพื่อนคนจีนถามคุณว่า "明天是星期几？" ถ้ารู้อยู่แล้วว่าวันนี้คือวันศุกร์ (星期五) คุณควรตอบอย่างไรให้ถูกต้อง?',
        options: [
          '明天是星期六。 (Míngtiān shì xīngqīliù.)',
          '明天是星期日。 (Míngtiān shì xīngqīrì.)',
          '明天是星期七。 (Míngtiān shì xīngqīqī.)',
          '明天是星期两。 (Míngtiān shì xīngqīliǎng.)'
        ],
        correct_index: 0,
        explanation_th: 'วันนี้วันศุกร์ (星期五) พรุ่งนี้ก็ต้องเป็นวันเสาร์คือ 星期六 (xīngqīliù)!',
        encouragement: 'ยินดีด้วย! คุณพิชิตปฏิทินจีนสำเร็จแล้ว!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u02_l02',
        badge_name: 'ผู้พิชิตปฏิทินจีน 📅🐰',
        message_th: 'ยินดีด้วยนะคนเก่ง! วันนี้คุณบอกวัน เดือน สัปดาห์ ภาษาจีนได้อย่างแม่นยำ ไร้ข้อผิดพลาด!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't1_u02_l03',
      lesson_number: 3,
      title: {
        zh: '现在几点与时间顺序',
        th: 'กี่โมงแล้ว & เวลานัดหมาย',
        en: 'Telling Time & Word Order'
      },
      can_do: {
        th: 'ถามและบอกเวลาเป็นนาฬิกาและนาที ออกเสียง Sandhi 两点 และเรียงประโยคตามกฎลำดับเวลาจีน',
        en: 'Tell the time, pronounce 两点 with 3+3 Sandhi, and arrange sentences with time order'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ดูนาฬิกาแล้วบอกเวลาภาษาจีนได้ถูกต้องทันที!',
      vocabulary: [
        {
          id: 'hsk1_0220',
          hanzi: '现在',
          pinyin: 'xiànzài',
          display_pinyin: 'xiànzài',
          pinyin_tone: 'xian4zai4',
          meaning_th: 'ตอนนี้, ขณะนี้',
          meaning_en: 'now, currently',
          radical: '王',
          radical_name_th: 'หมวดราชา/หยก (王字旁)',
          stroke_count: 8,
          mnemonic: 'ราชาหยก (王) ยืนมองนาฬิกาบอกว่า ตอนนี้ ต้องเริ่มงานแล้ว!',
          kid_mnemonic: 'ราชาหยก (王) ยืนมองนาฬิกาบอกว่า ตอนนี้ (现在) ต้องเริ่มงานแล้ว!',
          body_gesture: 'เคาะข้อมือตรงตำแหน่งนาฬิกาสองครั้ง'
        },
        {
          id: 'hsk1_0221',
          hanzi: '点',
          pinyin: 'diǎn',
          display_pinyin: 'diǎn',
          pinyin_tone: 'dian3',
          meaning_th: 'โมง, นาฬิกา, จุด',
          meaning_en: "o'clock, point, dot",
          radical: '灬',
          radical_name_th: 'หมวดไฟ/จุดสี่จุด (四点底)',
          stroke_count: 9,
          mnemonic: 'เตาไฟ 4 จุด (灬) อุ่นอาหารตามเวลาเข็ม โมง',
          kid_mnemonic: 'เตาไฟ 4 จุด (灬) อุ่นอาหารตามเวลาเข็ม โมง (点)',
          body_gesture: 'ชี้นิ้วชี้ปักลงเป็นจุดบอกตำแหน่งเวลา'
        },
        {
          id: 'hsk1_0222',
          hanzi: '分',
          pinyin: 'fēn',
          display_pinyin: 'fēn',
          pinyin_tone: 'fen1',
          meaning_th: 'นาที, แบ่ง',
          meaning_en: 'minute, divide',
          radical: '刀',
          radical_name_th: 'หมวดมีด (刀字底)',
          stroke_count: 4,
          mnemonic: 'มีด (刀) หั่นแปดส่วน (八) แบ่งเวลาออกเป็นหน่วย นาที',
          kid_mnemonic: 'มีด (刀) หั่นแปดส่วน (八) แบ่งเวลาออกเป็นหน่วย นาที (分)',
          body_gesture: 'สับฝ่ามือลงเบาๆ สื่อถึงการแบ่งส่วนย่อย'
        },
        {
          id: 'hsk1_0223',
          hanzi: '半',
          pinyin: 'bàn',
          display_pinyin: 'bàn',
          pinyin_tone: 'ban4',
          meaning_th: 'ครึ่ง (30 นาที)',
          meaning_en: 'half',
          radical: '十',
          radical_name_th: 'หมวดกากบาทสิบ (十字头)',
          stroke_count: 5,
          mnemonic: 'แตงโมผ่าตรงกลางแบ่งคนละ ครึ่ง ลูก',
          kid_mnemonic: 'แตงโมผ่าตรงกลางแบ่งคนละ ครึ่ง (半) ลูก',
          body_gesture: 'แบสองมือประกบกันแล้วผายแยกออกจากกันคนละครึ่ง'
        },
        {
          id: 'hsk1_0224',
          hanzi: '早上',
          pinyin: 'zǎoshang',
          display_pinyin: 'zǎoshang',
          pinyin_tone: 'zao3shang5',
          meaning_th: 'ตอนเช้า',
          meaning_en: 'early morning',
          radical: '日',
          radical_name_th: 'หมวดดวงอาทิตย์ (日字头)',
          stroke_count: 9,
          mnemonic: 'พระอาทิตย์ (日) โผล่พ้นกิ่งไม้ (十) ลอยขึ้นสูง (上) = ตอนเช้า',
          kid_mnemonic: 'พระอาทิตย์ (日) โผล่พ้นกิ่งไม้ (十) ลอยขึ้นสูง (上) = ตอนเช้า',
          body_gesture: 'วาดแขนสองข้างขึ้นช้าๆ เลียนแบบพระอาทิตย์ขึ้นยามเช้า'
        },
        {
          id: 'hsk1_0225',
          hanzi: '晚上',
          pinyin: 'wǎnshang',
          display_pinyin: 'wǎnshang',
          pinyin_tone: 'wan3shang5',
          meaning_th: 'ตอนเย็น, ตอนค่ำ',
          meaning_en: 'evening, night',
          radical: '日',
          radical_name_th: 'หมวดดวงอาทิตย์ (日字旁)',
          stroke_count: 14,
          mnemonic: 'ตะวัน (日) ลับฟ้า คลุมผ้าห่มพักผ่อน = ตอนค่ำ',
          kid_mnemonic: 'ตะวัน (日) ลับฟ้า คลุมผ้าห่มพักผ่อน = ตอนค่ำ',
          body_gesture: 'นำสองมือประกบแก้มเอียงคอเลียนแบบการนอนหลับ'
        }
      ],
      tone_rule: {
        rule_name: 'กฎ 3+3 Sandhi ของ 两点 (liáng diǎn) และ 几点 (jí diǎn)',
        description_th: 'คำว่า 两 (liǎng) และ 几 (jǐ) เป็นเสียง 3 เมื่ออยู่หน้า 点 (diǎn เสียง 3) จะผันเสียงเป็นเสียง 2 อัตโนมัติ',
        example: '两点 ➔ liáng diǎn, 几点 ➔ jí diǎn, 一点 ➔ yì diǎn',
        fun_metaphor: 'เสียง 3 สองตัวเจอกันตัวแรกจะกระโดดขึ้นบันไดเป็นเสียง 2 เพื่อให้ลิ้นไม่เมื่อย!',
        reassurance: 'พูด liáng diǎn ได้นุ่มนวลเป็นธรรมชาติ เจ้าของภาษาฟังแล้วชื่นชมแน่นอน!'
      },
      grammar_bite: {
        title: 'กฎเหล็กทองคำลำดับเวลาในภาษาจีน',
        explanation_th: 'จำสูตรแม่นๆ: [ประธาน] + [เวลา] + [กริยา] เช่น 我早上学习 (ฉันเรียนตอนเช้า) ห้ามพูด 我学习在早上 เด็ดขาด!',
        patterns: [
          {
            formula: '现在 + 几点？ = ตอนนี้กี่โมง?',
            zh: '现在几点？',
            pinyin: 'Xiànzài jí diǎn?',
            th: 'ตอนนี้กี่โมงแล้ว?',
            en: 'What time is it now?'
          },
          {
            formula: '[ช่วงเวลา] + [ตัวเลข] + 点 + (半) = เวลา...',
            zh: '早上八点半',
            pinyin: 'Zǎoshang bā diǎn bàn',
            th: 'แปดโมงครึ่งตอนเช้า',
            en: '8:30 AM'
          },
          {
            formula: '[ประธาน] + [เวลา] + [กริยา] = ประธานทำกริยาในเวลานั้น',
            zh: '我晚上七点去。',
            pinyin: 'Wǒ wǎnshang qī diǎn qù.',
            th: 'ฉันไปตอนหนึ่งทุ่ม (บอกเวลาก่อนการกระทำเสมอ)',
            en: 'I go at 7:00 PM.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '你好！请问现在几点？',
          pinyin: 'Nǐ hǎo! Qǐngwèn xiànzài jí diǎn?',
          th: 'สวัสดีครับ! ขอโทษนะครับ ตอนนี้กี่โมงแล้วครับ?',
          en: 'Hello! Excuse me, what time is it now?'
        },
        {
          speaker: 'B',
          speaker_name: 'น้องกระต่ายทู่ทู่ 🐰',
          zh: '现在是早上八点半。',
          pinyin: 'Xiànzài shì zǎoshang bā diǎn bàn.',
          th: 'ตอนนี้แปดโมงครึ่งตอนเช้าจ้า',
          en: 'Now it is 8:30 AM.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '你几点去中国？',
          pinyin: 'Nǐ jí diǎn qù Zhōngguó?',
          th: 'เธอไปประเทศจีนกี่โมงเหรอ?',
          en: 'What time are you going to China?'
        },
        {
          speaker: 'B',
          speaker_name: 'น้องกระต่ายทู่ทู่ 🐰',
          zh: '我晚上七点去！',
          pinyin: 'Wǒ wǎnshang qī diǎn qù!',
          th: 'ฉันไปตอนหนึ่งทุ่มตรงจ้า!',
          en: 'I am going at 7:00 PM!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '谢谢你！再见！',
          pinyin: 'Xièxie nǐ! Zàijiàn!',
          th: 'ขอบคุณนะ บ๊ายบาย!',
          en: 'Thank you! Goodbye!'
        },
        {
          speaker: 'B',
          speaker_name: 'น้องกระต่ายทู่ทู่ 🐰',
          zh: '不客气，再见！',
          pinyin: 'Bú kèqi, zàijiàn!',
          th: 'ไม่เป็นไรจ้า แล้วพบกันใหม่!',
          en: "You're welcome, see you!"
        }
      ],
      quizzes: [
        {
          type: 'tone_match',
          question_th: "คำว่า '几点' (jǐ + diǎn) อ่านออกเสียงจริงตามกฎ 3+3 Sandhi ว่าอย่างไร?",
          options: [
            'jí diǎn',
            'jǐ diǎn',
            'jì diǎn',
            'jī diǎn'
          ],
          correct_index: 0,
          explanation_th: 'เสียง 3 ชนเสียง 3 (jǐ + diǎn) คำหน้าผันเป็นเสียง 2 อ่านว่า jí diǎn!',
          encouragement: 'หูไวและออกเสียงแม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '点' (โมง) มีหมวดนำด้านล่างคืออะไร?",
          options: [
            'หมวดไฟ/จุดสี่จุด (灬 四点底)',
            'หมวดใหญ่ (大)',
            'หมวดปาก (口)',
            'หมวดดวงอาทิตย์ (日)'
          ],
          correct_index: 0,
          explanation_th: 'คำว่า 点 มีหมวดนำด้านล่างคือ 灬 (สี่จุดไฟ) สื่อถึงเปลวไฟเตาอุ่นอาหารตามเวลา!',
          encouragement: 'จำหมวดนำได้แม่นยำมากจ้า!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยคตามกฎลำดับเวลาจีน: "ฉันเรียนตอนเช้า"',
          tokens: ['早上', '我', '学习'],
          correct_sequence: ['我', '早上', '学习'],
          pinyin: 'Wǒ zǎoshang xuéxí',
          meaning_th: 'ฉันเรียนตอนเช้า',
          explanation_th: 'กฎเหล็กทองคำลำดับเวลา: [ประธาน] 我 + [เวลา] 早上 + [กริยา] 学习',
          encouragement: 'เก่งมาก! วางเวลาก่อนการกระทำได้ถูกต้อง 100%!'
        },
        {
          type: 'flash_recall',
          question_th: '"บ่าย 2 โมงตรง" ภาษาจีนต้องพูดว่าข้อใด?',
          options: [
            '两点 (liáng diǎn)',
            '二点 (èr diǎn)',
            '二个点 (èr ge diǎn)',
            '两分 (liǎng fēn)'
          ],
          correct_index: 0,
          explanation_th: 'เวลา 2 นาฬิกา ภาษาจีนบังคับใช้ 两点 (liáng diǎn) เสมอ ห้ามพูด 二点 เด็ดขาด!',
          encouragement: 'สุดยอดดด! ปราบกับดักคลาสสิกของคนไทยได้สำเร็จ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'หัวหน้างานคนจีนชี้ที่นาฬิกาแล้วถามว่า "现在几点？" เข็มสั้นชี้เลข 10 เข็มยาวชี้เลข 6 ในช่วงเช้า คุณควรตอบว่าอย่างไร?',
        options: [
          '早上十点半。 (Zǎoshang shí diǎn bàn.)',
          '早上十点二十分。 (Zǎoshang shí diǎn èrshí fēn.)',
          '晚上十点半。 (Wǎnshang shí diǎn bàn.)',
          '现在二点。 (Xiànzài èr diǎn.)'
        ],
        correct_index: 0,
        explanation_th: '10 โมงเช้า 30 นาที ภาษาจีนพูดว่า 早上十点半 (Zǎoshang shí diǎn bàn) โดย 半 แปลว่าครึ่ง (30 นาที)!',
        encouragement: 'ยอดเยี่ยมมาก! บอกเวลาได้เป๊ะเหมือนนาฬิกาเดินตรงเวลา!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u02_l03',
        badge_name: 'นายสถานีเวลารถไฟความเร็วสูง ⏱️🐰',
        message_th: 'ยินดีด้วยนะคนเก่ง! วันนี้คุณบอกเวลาและจัดเรียงประโยคเวลาภาษาจีนได้อย่างไร้ที่ติ!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't1_u02_l04',
      lesson_number: 4,
      title: {
        zh: '约朋友吃饭大通关',
        th: 'Boss Challenge: นัดกินข้าวกับเพื่อน',
        en: 'Boss Challenge: Dinner Appointment'
      },
      can_do: {
        th: 'บูรณาการคำศัพท์ Unit 1 และ Unit 2 เพื่อนัดหมายวัน เวลา และทักทายคนจีนได้อย่างคล่องแคล่ว',
        en: 'Integrate Unit 1 & 2 vocabulary to schedule lunch appointments and greet friends naturally'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พิชิตบอสใหญ่ Unit 2 สนทนานัดกินข้าวกับเพื่อนชาวจีนสำเร็จ 100%!',
      vocabulary: [
        {
          id: 'hsk1_0226',
          hanzi: '中午',
          pinyin: 'zhōngwǔ',
          display_pinyin: 'zhōngwǔ',
          pinyin_tone: 'zhong1wu3',
          meaning_th: 'ตอนเที่ยง, กลางวัน',
          meaning_en: 'noon, midday',
          radical: '丨',
          radical_name_th: 'หมวดเส้นดิ่ง (竖部)',
          stroke_count: 8,
          mnemonic: 'ศูนย์กลาง (中) ของวันยามพระอาทิตย์ตรงหัว = ตอนเที่ยง',
          kid_mnemonic: 'เข็มนาฬิกาชี้ตรงกลางแดดเปรี้ยง พักกินข้าวเที่ยง (中午) กันเถอะ!',
          body_gesture: 'ชี้มือตรงขึ้นฟ้าบอกเวลาเที่ยงวัน'
        },
        {
          id: 'hsk1_0227',
          hanzi: '见',
          pinyin: 'jiàn',
          display_pinyin: 'jiàn',
          pinyin_tone: 'jian4',
          meaning_th: 'พบ, เจอ',
          meaning_en: 'to see, to meet',
          radical: '见',
          radical_name_th: 'หมวดพบเห็น (见字旁)',
          stroke_count: 4,
          mnemonic: 'ดวงตากลมโตบนสองขา ก้าวไปพบเจอ',
          kid_mnemonic: 'ดวงตาส่งยิ้ม ขาสองข้างเดินไปเจอเพื่อนรัก เจอกันนะ (见)',
          body_gesture: 'ยกสองนิ้วแตะที่หางตาแล้วชี้นิ้วไปข้างหน้าสื่อถึงการพบกัน'
        }
      ],
      tone_rule: {
        rule_name: 'สูตรประโยคนัดหมาย: 我们 + [เวลา] + 见！',
        description_th: 'ใช้คำว่า 见 (พบ/เจอ) ต่อท้ายเวลา เพื่อบอกว่า "เจอกันเวลานั้นนะ!"',
        example: '我们明天中午十二点见！ (Wǒmen míngtiān zhōngwǔ shí\'èr diǎn jiàn!)',
        fun_metaphor: 'เหมือนจับมือทำสัญญามิตรภาพ ใส่เวลาก่อนแล้วปิดท้ายด้วย 见 (เจอกันนะ)!',
        reassurance: 'พูดประโยคนี้คนจีนฟังแล้วยิ้มรับทันที เป็นกันเองสุดๆ!'
      },
      grammar_bite: {
        title: 'สูตรสำเร็จรูปนัดหมายเวลา',
        explanation_th: 'วางเวลาไว้หน้าคำกริยา 见 (พบ/เจอ) ได้ทันที',
        patterns: [
          {
            formula: '我们 + [เวลา] + 见！ = เจอกันเวลานั้นนะ!',
            zh: '我们明天见！',
            pinyin: 'Wǒmen míngtiān jiàn!',
            th: 'พวกเราเจอกันพรุ่งนี้นะ!',
            en: 'See you tomorrow!'
          },
          {
            formula: '中午 + [ตัวเลข] + 点 = เที่ยง...โมง',
            zh: '中午十二点',
            pinyin: 'Zhōngwǔ shí\'èr diǎn',
            th: 'เที่ยงตรง (12:00 น.)',
            en: '12:00 PM (Noon)'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: '你好สมชาย！明天星期六，你有时间吗？',
          pinyin: 'Nǐ hǎo Somchai! Míngtiān xīngqīliù, nǐ yǒu shíjiān ma?',
          th: 'สวัสดีสมชาย! พรุ่งนี้วันเสาร์ นายมีเวลาไหม?',
          en: 'Hello Somchai! Tomorrow is Saturday, do you have time?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '你好หลี่หมิง！我有时间。明天几点？',
          pinyin: 'Nǐ hǎo Li Ming! Wǒ yǒu shíjiān. Míngtiān jí diǎn?',
          th: 'สวัสดีหลี่หมิง! ฉันมีเวลา พรุ่งนี้กี่โมงดี?',
          en: 'Hello Li Ming! I have time. What time tomorrow?'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: '中午十二点，我们一起吃饭，可以吗？',
          pinyin: 'Zhōngwǔ shí\'èr diǎn, wǒmen yìqǐ chīfàn, kéyǐ ma?',
          th: 'ตอนเที่ยง 12 โมง พวกเรากินข้าวด้วยกัน ได้ไหม?',
          en: '12:00 noon, we eat together, is that okay?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '太好了！明天中午十二点见！',
          pinyin: 'Tài hǎo le! Míngtiān zhōngwǔ shí\'èr diǎn jiàn!',
          th: 'เยี่ยมเลย! พรุ่งนี้เที่ยงเจอกัน!',
          en: 'Great! See you tomorrow at 12 noon!'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: '好的，明天见！',
          pinyin: 'Hǎode, míngtiān jiàn!',
          th: 'โอเค พรุ่งนี้เจอกันนะ!',
          en: 'Okay, see you tomorrow!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ฟังเสียง 'zhōngwǔ jiàn' แล้วเลือกว่าหมายถึงอะไร?",
          options: [
            'เจอกันตอนเที่ยง',
            'เจอกันตอนเย็น',
            'ไม่เจอกัน',
            'กินข้าวเช้า'
          ],
          correct_index: 0,
          explanation_th: 'zhōngwǔ แปลว่าตอนเที่ยง และ jiàn แปลว่าพบ/เจอ ดังนั้น zhōngwǔ jiàn คือเจอกันตอนเที่ยง!',
          encouragement: 'ฟังเสียงคำศัพท์ได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '见' (พบ/เห็น) มีรากศัพท์ดั้งเดิมมาจากอวัยวะใดของร่างกาย?",
          options: [
            'ดวงตากลมโตบนสองขา',
            'มือสองข้าง',
            'ปากที่กำลังพูด',
            'หัวใจ'
          ],
          correct_index: 0,
          explanation_th: 'ตัวอักษร 见 วิวัฒนาการมาจากรูปดวงตากลมโตและขาสองข้างที่ก้าวเดินไปพบเห็น!',
          encouragement: 'เข้าใจลึกซึ้งถึงรากศัพท์อักษรจีนเลยทีเดียว!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยคนัดพบ: "พวกเราเจอกันพรุ่งนี้เช้า 8 โมง"',
          tokens: ['早上八点', '我们', '明天', '见'],
          correct_sequence: ['我们', '明天', '早上八点', '见'],
          pinyin: 'Wǒmen míngtiān zǎoshang bā diǎn jiàn',
          meaning_th: 'พวกเราเจอกันพรุ่งนี้เช้าแปดโมงนะ',
          explanation_th: 'เรียงลำดับจากใหญ่ไปเล็ก: 我们 + 明天 + 早上八点 + 见！',
          encouragement: 'เก่งกาจมาก! สังเคราะห์ประโยคนัดหมายได้เป๊ะ 100%!'
        },
        {
          type: 'flash_recall',
          question_th: 'เมื่อเพื่อนนัดหมายเสร็จแล้วพูดขอบคุณว่า "谢谢！" เราควรตอบรับตามมารยาทอย่างไร? (ทบทวน Unit 1)',
          options: [
            '不客气！ (Bú kèqi!)',
            '再见！ (Zàijiàn!)',
            '我是泰国人。 (Wǒ shì Tàiguó rén.)',
            '不要！ (Bú yào!)'
          ],
          correct_index: 0,
          explanation_th: 'เมื่อมีคนพูด 谢谢 เราต้องตอบรับด้วยความสุภาพว่า 不客气 (Bú kèqi - ไม่เป็นไร/ไม่ต้องเกรงใจ)!',
          encouragement: 'มารยาทภาษาจีนงดงามมาก ตอบได้ถูกต้องทันใจ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'เพื่อนชาวปักกิ่งส่งแชต WeChat มาหาคุณว่า: "你好！明天是星期日，我们晚上六点见，好吗？" คุณต้องการตอบตกลงอย่างเป็นธรรมชาติและนัดหมายเวลาเดิม ต้องตอบว่าอย่างไร?',
        options: [
          '好！我们明天晚上六点见！谢谢！ (Hǎo! Wǒmen míngtiān wǎnshang liù diǎn jiàn! Xièxie!)',
          '不客气，再见！ (Bú kèqi, zàijiàn!)',
          '我是泰国人，星期七见。 (Wǒ shì Tàiguó rén, xīngqīqī jiàn.)',
          '现在晚上六点。 (Xiànzài wǎnshang liù diǎn.)'
        ],
        correct_index: 0,
        explanation_th: 'การตอบรับอย่างสุภาพและทวนเวลา "好！我们明天晚上六点见！谢谢！" คือคำตอบที่สมบูรณ์แบบและอบอุ่นที่สุด!',
        encouragement: '🎉 มหัศจรรย์มาก! คุณพิชิต Grand Boss Challenge ของ Unit 2 ได้อย่างสมบูรณ์แบบ!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u02_master',
        badge_name: 'เจ้าแห่งกาลเวลาและตัวเลข 🏆🐰',
        message_th: 'ขอปรบมือให้ดังๆ! คุณผ่านบทเรียนตัวเลข วันที่ และเวลาระดับ Tier 1 ครบทั้ง 4 บทย่อยแล้ว!',
        xp_reward: 200
      }
    }
  ]
};

// ============================================================================
// UNIT 3: Food & Drinks (tier1_u03)
// ============================================================================
const unit03 = {
  unit_id: 'tier1_u03',
  tier: 1,
  unit_number: 3,
  title: {
    zh: '餐饮点餐与美食',
    th: 'สั่งอาหาร & เครื่องดื่ม',
    en: 'Food & Street Bites'
  },
  description: 'สั่งบะหมี่ ข้าวสวย เกี๊ยว ซาลาเปา ชานม กาแฟ บอกระดับความเผ็ด และสั่งอาหารในร้านสตรีทฟู้ดจีนได้อย่างมั่นใจ ไร้กังวล',
  lessons: [
    {
      lesson_id: 't1_u03_l01',
      lesson_number: 1,
      title: {
        zh: '吃米饭还是面条',
        th: 'กินอะไรดี?',
        en: 'What to Eat: Rice or Noodles'
      },
      can_do: {
        th: 'สั่งอาหารจานหลัก (ข้าว บะหมี่ เกี๊ยว ซาลาเปา) และบอกสิ่งที่ตนเองทานหรือไม่ทานได้',
        en: 'Order main dishes (rice, noodles, dumplings, buns) and express food preferences'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ก้าวเข้าร้านอาหารแล้วสั่ง "ฉันกินบะหมี่" ได้อย่างคล่องปาก!',
      vocabulary: [
        {
          id: 'hsk1_0301',
          hanzi: '吃',
          pinyin: 'chī',
          display_pinyin: 'chī',
          pinyin_tone: 'chi1',
          meaning_th: 'กิน, ทาน',
          meaning_en: 'to eat',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 6,
          mnemonic: 'อ้าปาก (口) เคี้ยวอาหารแสนอร่อยอย่างเอร็ดอร่อย = กิน (吃)',
          kid_mnemonic: 'อ้าปาก (口) เคี้ยวอาหารแสนอร่อยอย่างเอร็ดอร่อย = กิน (吃)',
          body_gesture: 'ทำมือถือช้อนตักอาหารเข้าปาก'
        },
        {
          id: 'hsk1_0302',
          hanzi: '米饭',
          pinyin: 'mǐfàn',
          display_pinyin: 'mǐfàn',
          pinyin_tone: 'mi3fan4',
          meaning_th: 'ข้าวสวย',
          meaning_en: 'cooked rice',
          radical: '米',
          radical_name_th: 'หมวดข้าวสาร (米字旁)',
          stroke_count: 13,
          mnemonic: 'เมล็ดข้าวสารสีขาว (米) หุงสุกในชามข้าว (饭) หอมกรุ่น = ข้าวสวย',
          kid_mnemonic: 'เมล็ดข้าวสารสีขาว (米) หุงสุกในชามข้าว (饭) หอมกรุ่น = ข้าวสวย',
          body_gesture: 'สองมือทำรูปชามข้าวประคองไว้ระดับอก'
        },
        {
          id: 'hsk1_0303',
          hanzi: '面条',
          pinyin: 'miàntiáo',
          display_pinyin: 'miàntiáo',
          pinyin_tone: 'mian4tiao2',
          meaning_th: 'บะหมี่, ก๋วยเตี๋ยว',
          meaning_en: 'noodles',
          radical: '面',
          radical_name_th: 'หมวดใบหน้า/แป้ง (面字部)',
          stroke_count: 16,
          mnemonic: 'แป้งสาลีรีดเป็นเส้นยาวๆ (条) เหนียวนุ่ม = บะหมี่',
          kid_mnemonic: 'แป้งสาลีรีดเป็นเส้นยาวๆ (条) เหนียวนุ่ม = บะหมี่เส้นยาว',
          body_gesture: 'ทำท่าคีบตะเกียบสาวเส้นบะหมี่ขึ้นสูง'
        },
        {
          id: 'hsk1_0304',
          hanzi: '包子',
          pinyin: 'bāozi',
          display_pinyin: 'bāozi',
          pinyin_tone: 'bao1zi5',
          meaning_th: 'ซาลาเปา',
          meaning_en: 'steamed bun',
          radical: '勹',
          radical_name_th: 'หมวดห่อ (包字头)',
          stroke_count: 8,
          mnemonic: 'แป้งห่อ (勹) ไส้หมูสับข้างใน กลมๆ อุ่นๆ = ซาลาเปา',
          kid_mnemonic: 'แป้งห่อ (勹) ไส้หมูสับข้างใน กลมๆ อุ่นๆ = ซาลาเปา (包子)',
          body_gesture: 'สองมือกำหลวมๆ ประกบกันเป็นก้อนซาลาเปา'
        },
        {
          id: 'hsk1_0305',
          hanzi: '饺子',
          pinyin: 'jiǎozi',
          display_pinyin: 'jiǎozi',
          pinyin_tone: 'jiao3zi5',
          meaning_th: 'เกี๊ยวต้ม, เกี๊ยว',
          meaning_en: 'dumpling',
          radical: '饣',
          radical_name_th: 'หมวดอาหาร (食字旁)',
          stroke_count: 12,
          mnemonic: 'อาหาร (饣) ห่อพับริมจีบเหมือนเงินตำลึงทอง = เกี๊ยวต้ม',
          kid_mnemonic: 'อาหาร (饣) ห่อพับริมจีบเหมือนเงินตำลึงทอง = เกี๊ยว (饺子)',
          body_gesture: 'ประกบฝ่ามือทำมุมโค้งเลียนแบบเกี๊ยวต้ม'
        }
      ],
      tone_rule: {
        rule_name: 'กฎเสียงคงเดิมของ 不吃 (bù chī) และ Sandhi 水饺 (shuíjiǎo)',
        description_th: 'คำว่า 不 เมื่อนำหน้าพยางค์เสียง 1 (吃 chī) จะคงรูปเสียง 4 เดิมคือ bù ไม่ผันเสียง',
        example: '不吃 (bù chī), 水饺 (shuíjiǎo: 3+3 ➔ 2+3)',
        fun_metaphor: 'เสียง 4 สั่งห้ามกินแบบหนักแน่น bù chī! แต่เกี๊ยวน้ำลื่นคอเลยผันเป็น shuíjiǎo!',
        reassurance: 'ออกเสียง bù chī หนักแน่นชัดเจนได้เลย คนจีนเข้าใจ 100%!'
      },
      grammar_bite: {
        title: 'สูตรสั่งอาหารจานโปรด',
        explanation_th: 'ใช้คำกริยา 吃 (กิน) หรือปฏิเสธด้วย 不吃 (ไม่กิน)',
        patterns: [
          {
            formula: '我 + 吃 + [อาหาร] = ฉันกิน...',
            zh: '我吃面条。',
            pinyin: 'Wǒ chī miàntiáo.',
            th: 'ฉันกินบะหมี่',
            en: 'I eat noodles.'
          },
          {
            formula: '你 + 吃 + 什么？ = เธอทานอะไร?',
            zh: '你吃什么？',
            pinyin: 'Nǐ chī shénme?',
            th: 'เธอทานอะไร?',
            en: 'What do you eat?'
          },
          {
            formula: '我 + 不 + 吃 + [อาหาร] = ฉันไม่กิน...',
            zh: '我不吃米饭。',
            pinyin: 'Wǒ bù chī mǐfàn.',
            th: 'ฉันไม่กินข้าวสวย',
            en: 'I do not eat rice.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'บริกร 🧑‍🍳',
          zh: '您好！请问您是哪国人？',
          pinyin: 'Nín hǎo! Qǐngwèn nín shì nǎ guó rén?',
          th: 'สวัสดีครับ! ไม่ทราบว่าท่านเป็นคนชาติไหนครับ?',
          en: 'Hello! May I ask which country you are from?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '您好！我是泰国人。',
          pinyin: 'Nín hǎo! Wǒ shì Tàiguó rén.',
          th: 'สวัสดีครับ! ผมเป็นคนไทยครับ',
          en: 'Hello! I am Thai.'
        },
        {
          speaker: 'A',
          speaker_name: 'บริกร 🧑‍🍳',
          zh: '欢迎来到北京！您吃什么？',
          pinyin: 'Huānyíng lái dào Běijīng! Nín chī shénme?',
          th: 'ยินดีต้อนรับสู่ปักกิ่งครับ! ท่านทานอะไรดีครับ?',
          en: 'Welcome to Beijing! What would you like to eat?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '我吃面条和水饺。谢谢！',
          pinyin: 'Wǒ chī miàntiáo hé shuǐjiǎo. Xièxie!',
          th: 'ผมกินบะหมี่กับเกี๊ยวครับ ขอบคุณครับ!',
          en: 'I eat noodles and dumplings. Thank you!'
        },
        {
          speaker: 'A',
          speaker_name: 'บริกร 🧑‍🍳',
          zh: '好的，请稍等！',
          pinyin: 'Hǎode, qǐng shāoděng!',
          th: 'ได้ครับ กรุณารอสักครู่นะครับ!',
          en: 'Okay, please wait a moment!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ฟังเสียง 'chī miàntiáo' แล้วเลือกอาหารที่ตรงกับเสียง:",
          options: [
            'กินบะหมี่',
            'กินข้าวสวย',
            'กินซาลาเปา',
            'กินเกี๊ยวต้ม'
          ],
          correct_index: 0,
          explanation_th: 'chī แปลว่ากิน และ miàntiáo แปลว่าบะหมี่/ก๋วยเตี๋ยว ดังนั้น chī miàntiáo แปลว่ากินบะหมี่!',
          encouragement: 'ฟังออกชัดเจน เก่งมากเลย!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '吃' (กิน) มีหมวดนำที่เกี่ยวกับการใช้อวัยวะใด?",
          options: [
            'หมวดปาก (口 口字旁)',
            'หมวดมือ (扌)',
            'หมวดดวงตา (目)',
            'หมวดเท้า (足)'
          ],
          correct_index: 0,
          explanation_th: 'การกินต้องใช้อวัยวะปาก ดังนั้น 吃 จึงมีหมวดนำ 口 (ปาก) อยู่ด้านซ้าย!',
          encouragement: 'สายตานักสืบตัวอักษรเฉียบคมมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ฉันไม่กินข้าวสวย"',
          tokens: ['吃', '我', '米饭', '不'],
          correct_sequence: ['我', '不', '吃', '米饭'],
          pinyin: 'Wǒ bù chī mǐfàn',
          meaning_th: 'ฉันไม่กินข้าวสวย',
          explanation_th: 'เรียงลำดับ: [ประธาน] 我 + [ปฏิเสธ] 不 + [กริยา] 吃 + [กรรม] 米饭',
          encouragement: 'เรียงประโยคปฏิเสธได้แม่นยำมาก!'
        },
        {
          type: 'flash_recall',
          question_th: 'คำว่า "不吃" ออกเสียงพินอินที่ถูกต้องอย่างไร?',
          options: [
            'bù chī',
            'bú chī',
            'bǔ chī',
            'bù chí'
          ],
          correct_index: 0,
          explanation_th: '吃 เป็นพยางค์เสียงที่ 1 ดังนั้น 不 จึงคงเสียงที่ 4 เดิมคือ bù chī ไม่เปลี่ยนเสียง!',
          encouragement: 'จำกฎสัทศาสตร์ได้เป๊ะ ไม่โดนข้อสอบหลอก!'
        }
      ],
      boss_challenge: {
        scenario_th: 'บริกรในร้านอาหารที่เฉิงตูเดินมาถามคุณว่า "您好！今天有面条和米饭，您吃什么？" คุณต้องการกินบะหมี่ ต้องตอบอย่างไรให้ตรงประเด็นและสุภาพ?',
        options: [
          '您好，我吃面条，谢谢！ (Nín hǎo, wǒ chī miàntiáo, xièxie!)',
          '我不吃面条。 (Wǒ bù chī miàntiáo.)',
          '我叫สมชาย。 (Wǒ jiào Somchai.)',
          '再见！ (Zàijiàn!)'
        ],
        correct_index: 0,
        explanation_th: 'ตอบรับอย่างสุภาพและระบุเมนูที่ต้องการ: 您好，我吃面条，谢谢！ คือคำตอบที่สมบูรณ์แบบ!',
        encouragement: 'ยินดีด้วย! สั่งอาหารจานเด็ดสำเร็จแล้ว!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u03_l01',
        badge_name: 'นักชิมจานเด็ดแดนมังกร 🥢🐰',
        message_th: 'ยินดีด้วยนะคนเก่ง! วันนี้คุณสั่งข้าว บะหมี่ เกี๊ยว ซาลาเปา ภาษาจีนได้อย่างคล่องแคล่วแล้ว!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't1_u03_l02',
      lesson_number: 2,
      title: {
        zh: '喝水与茶',
        th: 'ดื่มอะไรดี & ลักษณนามแรกพบ',
        en: 'Drinks & Measure Word 杯'
      },
      can_do: {
        th: 'สั่งเครื่องดื่ม (น้ำเปล่า ชา กาแฟ น้ำอัดลม) พร้อมระบุจำนวนด้วยลักษณนาม 杯 (แก้ว) ได้ถูกต้อง',
        en: 'Order drinks using measure word 杯 (cup/glass) with accurate counting'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สั่ง "ขอกาแฟ 2 แก้ว" เป็นภาษาจีนได้อย่างถูกต้องไม่อายใคร!',
      vocabulary: [
        {
          id: 'hsk1_0306',
          hanzi: '喝',
          pinyin: 'hē',
          display_pinyin: 'hē',
          pinyin_tone: 'he1',
          meaning_th: 'ดื่ม',
          meaning_en: 'to drink',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 12,
          mnemonic: 'อ้าปาก (口) ดื่มน้ำใต้แสงแดด (日) อย่างชื่นใจ = ดื่ม',
          kid_mnemonic: 'อ้าปาก (口) ดื่มน้ำใต้แสงแดด (日) อย่างชื่นใจ = ดื่ม (喝)',
          body_gesture: 'ทำมือเหมือนถือแก้วน้ำยกดื่ม'
        },
        {
          id: 'hsk1_0307',
          hanzi: '水',
          pinyin: 'shuǐ',
          display_pinyin: 'shuǐ',
          pinyin_tone: 'shui3',
          meaning_th: 'น้ำ, น้ำเปล่า',
          meaning_en: 'water',
          radical: '水',
          radical_name_th: 'หมวดน้ำ (水部)',
          stroke_count: 4,
          mnemonic: 'ลำธารน้ำไหลผ่านโขดหิน มีหยดน้ำกระเซ็นสองฝั่ง = น้ำ',
          kid_mnemonic: 'ลำธารน้ำไหลผ่านโขดหิน มีหยดน้ำกระเซ็นสองฝั่ง = น้ำ (水)',
          body_gesture: 'ทำมือพลิ้วไหวเลียนแบบสายน้ำไหล'
        },
        {
          id: 'hsk1_0308',
          hanzi: '茶',
          pinyin: 'chá',
          display_pinyin: 'chá',
          pinyin_tone: 'cha2',
          meaning_th: 'ชา, น้ำชา',
          meaning_en: 'tea',
          radical: '艹',
          radical_name_th: 'หมวดหญ้า/พืช (草字头)',
          stroke_count: 9,
          mnemonic: 'ใบไม้บนยอดชา (艹) มีคน (人) เก็บในป่าไม้ (木) = ใบชา',
          kid_mnemonic: 'ใบไม้บนยอดชา (艹) มีคน (人) เก็บในป่าไม้ (木) = ใบชา (茶)',
          body_gesture: 'สองมือประคองถ้วยชาดมกลิ่นหอม'
        },
        {
          id: 'hsk1_0309',
          hanzi: '咖啡',
          pinyin: 'kāfēi',
          display_pinyin: 'kāfēi',
          pinyin_tone: 'ka1fei1',
          meaning_th: 'กาแฟ',
          meaning_en: 'coffee',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 16,
          mnemonic: 'ปากสองปาก (口口) จิบกาแฟคั่วหอมกรุ่น = กาแฟ',
          kid_mnemonic: 'ปากสองปาก (口口) จิบกาแฟคั่วหอมกรุ่น = กาแฟ (咖啡)',
          body_gesture: 'ทำท่าคนกาแฟในแก้ว'
        },
        {
          id: 'hsk1_0310',
          hanzi: '可乐',
          pinyin: 'kělè',
          display_pinyin: 'kělè',
          pinyin_tone: 'ke3le4',
          meaning_th: 'โคล่า, น้ำอัดลม',
          meaning_en: 'cola',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 10,
          mnemonic: 'ดื่มแล้วร่าเริงสดชื่น มีความสุข (乐) ซาบซ่า = โคล่า',
          kid_mnemonic: 'ดื่มแล้วร่าเริงสดชื่น มีความสุข (乐) ซาบซ่า = โคล่า (可乐)',
          body_gesture: 'ทำท่าเปิดฝากระป๋องน้ำอัดลม ชี่!'
        },
        {
          id: 'hsk1_0311',
          hanzi: '杯',
          pinyin: 'bēi',
          display_pinyin: 'bēi',
          pinyin_tone: 'bei1',
          meaning_th: 'แก้ว, ถ้วย (ลักษณนาม)',
          meaning_en: 'cup, glass (measure word)',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 8,
          mnemonic: 'ถ้วยน้ำทำจากไม้ (木) ไม่ (不) รั่วซึม = แก้ว/ถ้วย',
          kid_mnemonic: 'ถ้วยน้ำทำจากไม้ (木) ไม่ (不) รั่วซึม = แก้ว/ถ้วย (杯)',
          body_gesture: 'ทำมือเป็นรูปตัว C เลียนแบบหูแก้วน้ำ'
        }
      ],
      tone_rule: {
        rule_name: 'กฎการผันเสียงของ 一杯 (yì bēi) และการใช้ 两杯 (liǎng bēi)',
        description_th: 'คำว่า 一 เมื่ออยู่หน้าพยางค์เสียง 1 (杯 bēi) จะผันเสียงเป็นเสียง 4 คือ yì bēi และจำนวน 2 แก้วต้องใช้ 两杯',
        example: '一杯 (yì bēi), 两杯 (liǎng bēi)',
        fun_metaphor: 'สั่ง 1 แก้ว พี่หนึ่งผันเสียงกระแทกลง yì bēi! สั่ง 2 แก้ว น้องสองเปลี่ยนเป็น liǎng bēi ห้ามพูด èr bēi นะจ๊ะ!',
        reassurance: 'สั่งกาแฟที่คาเฟ่คนจีนพูด yì bēi, liǎng bēi ถูกต้องเป๊ะแน่นอน!'
      },
      grammar_bite: {
        title: 'สูตรสำเร็จรูปลักษณนามเครื่องดื่ม',
        explanation_th: 'จำสูตรบล็อกเลโก้: [จำนวน] + 杯 + [เครื่องดื่ม]',
        patterns: [
          {
            formula: '我要 + [จำนวน] + 杯 + [เครื่องดื่ม] = ฉันเอา...แก้ว',
            zh: '我要一杯水。',
            pinyin: 'Wǒ yào yì bēi shuǐ.',
            th: 'ฉันขอน้ำเปล่า 1 แก้ว',
            en: 'I would like a glass of water.'
          },
          {
            formula: '两 + 杯 + [เครื่องดื่ม] = ...สองแก้ว (ห้ามใช้ 二)',
            zh: '两杯咖啡',
            pinyin: 'Liǎng bēi kāfēi',
            th: 'กาแฟ 2 แก้ว',
            en: 'Two cups of coffee'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'บาริสต้า 🧑‍🍳',
          zh: '您好！请问您喝什么？',
          pinyin: 'Nín hǎo! Qǐngwèn nín hē shénme?',
          th: 'สวัสดีครับ! ไม่ทราบว่าท่านดื่มอะไรดีครับ?',
          en: 'Hello! What would you like to drink?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '你好！我要一杯水，两杯咖啡。',
          pinyin: 'Nǐ hǎo! Wǒ yào yì bēi shuǐ, liǎng bēi kāfēi.',
          th: 'สวัสดีครับ! ผมขอน้ำเปล่า 1 แก้ว และกาแฟ 2 แก้วครับ',
          en: 'Hello! I want one glass of water and two cups of coffee.'
        },
        {
          speaker: 'A',
          speaker_name: 'บาริสต้า 🧑‍🍳',
          zh: '好的，一共三杯。还要茶吗？',
          pinyin: 'Hǎode, yígòng sān bēi. Hái yào chá ma?',
          th: 'ได้ครับ ทั้งหมด 3 แก้ว รับชาเพิ่มด้วยไหมครับ?',
          en: 'Okay, three cups in total. Would you also like tea?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '不要了，谢谢你！',
          pinyin: 'Bú yào le, xièxie nǐ!',
          th: 'ไม่รับแล้วครับ ขอบคุณครับ!',
          en: 'No more, thank you!'
        },
        {
          speaker: 'A',
          speaker_name: 'บาริสต้า 🧑‍🍳',
          zh: '不客气！请稍等。',
          pinyin: 'Bú kèqi! Qǐng shāoděng.',
          th: 'ด้วยความยินดีครับ กรุณารอสักครู่นะครับ',
          en: "You're welcome! Please wait a moment."
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '一杯' (หนึ่งแก้ว) อ่านออกเสียงตามกฎ Tone Sandhi อย่างไร?",
          options: [
            'yì bēi',
            'yí bēi',
            'yī bēi',
            'yǐ bēi'
          ],
          correct_index: 0,
          explanation_th: '一 อยู่หน้าเสียง 1 (杯 bēi) ผันเสียงเป็นเสียง 4 คือ yì bēi!',
          encouragement: 'ฟังและแยกเสียงผันวรรณยุกต์ได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '茶' (ชา) มีชิ้นส่วนด้านบนสุดคือหมวดนำใด?",
          options: [
            'หมวดหญ้า/พืช (艹 草字头)',
            'หมวดไม้ (木)',
            'หมวดปาก (口)',
            'หมวดน้ำ (水)'
          ],
          correct_index: 0,
          explanation_th: 'ใบชาเป็นพืชพันธุ์ จึงมีหมวดนำ 艹 (草字头 หมวดหญ้า) อยู่บนสุด!',
          encouragement: 'จดจำรากศัพท์ยอดชาได้ยอดเยี่ยม!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยคสั่งเครื่องดื่ม: "ฉันเอากาแฟ 1 แก้ว"',
          tokens: ['咖啡', '我要', '一杯'],
          correct_sequence: ['我要', '一杯', '咖啡'],
          pinyin: 'Wǒ yào yì bēi kāfēi',
          meaning_th: 'ฉันเอากาแฟหนึ่งแก้ว',
          explanation_th: 'เรียงลำดับ: 我要 (ฉันจะเอา) + 一杯 (1 แก้ว) + 咖啡 (กาแฟ)',
          encouragement: 'เก่งมากจ้า! สั่งกาแฟได้เป๊ะเหมือนคนท้องถิ่น!'
        },
        {
          type: 'flash_recall',
          question_th: 'หากต้องการสั่งกาแฟ 2 แก้ว ข้อใดถูกต้องตามหลักภาษาจีน?',
          options: [
            '两杯咖啡 (Liǎng bēi kāfēi)',
            '二杯咖啡 (Èr bēi kāfēi)',
            '二点咖啡 (Èr diǎn kāfēi)',
            '两点咖啡 (Liáng diǎn kāfēi)'
          ],
          correct_index: 0,
          explanation_th: 'มีลักษณนาม 杯 ตามหลัง ต้องใช้ 两杯 (liǎng bēi) เสมอ ห้ามพูด 二杯 เด็ดขาด!',
          encouragement: 'สุดยอดดด! ไม่ตกหลุมพรางลักษณนามเลย!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณอยู่ที่ร้าน Luckin Coffee ในเซี่ยงไฮ้ ต้องการสั่ง "ชา 1 แก้ว และน้ำเปล่า 1 แก้ว" คุณต้องบอกพนักงานอย่างไร?',
        options: [
          '我要一杯茶，一杯水。 (Wǒ yào yì bēi chá, yì bēi shuǐ.)',
          '我要二杯茶，二杯水。 (Wǒ yào èr bēi chá, èr bēi shuǐ.)',
          '我吃一杯茶。 (Wǒ chī yì bēi chá.)',
          '不要茶，再见。 (Bú yào chá, zàijiàn.)'
        ],
        correct_index: 0,
        explanation_th: 'เครื่องดื่มต้องใช้คำว่า 杯 (แก้ว) และกริยา 喝/要: 我要一杯茶，一杯水。 คือคำตอบที่ถูกต้องที่สุด!',
        encouragement: 'ยินดีด้วย! บาริสต้าชงเครื่องดื่มให้คุณอย่างรวดเร็ว!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u03_l02',
        badge_name: 'บาริสต้าน้อยแก้วทอง ☕🐰',
        message_th: 'ยินดีด้วยนะคนเก่ง! วันนี้คุณสั่งน้ำ ชา กาแฟ และใช้ลักษณนาม 杯 ได้อย่างถูกต้องแม่นยำแล้ว!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't1_u03_l03',
      lesson_number: 3,
      title: {
        zh: '好吃与不辣',
        th: 'อร่อยมาก / เผ็ดไหม?',
        en: 'Taste: Delicious & Spicy'
      },
      can_do: {
        th: 'บอกรสชาติอาหาร ชมว่าอร่อย ระบุระดับความเผ็ด และออกเสียง Tone Sandhi 不辣 (bú là) ได้อย่างถูกต้อง',
        en: 'Express taste, compliment food and drinks, ask about spiciness, and pronounce 不辣 (bú là) correctly'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พูดชมคนทำอาหารว่า "อร่อยมาก!" และสั่ง "ไม่เอาเผ็ด" ได้อย่างมั่นใจ!',
      vocabulary: [
        {
          id: 'hsk1_0312',
          hanzi: '好吃',
          pinyin: 'hǎochī',
          display_pinyin: 'hǎochī',
          pinyin_tone: 'hao3chi1',
          meaning_th: 'อร่อย (อาหารเคี้ยวได้)',
          meaning_en: 'delicious, tasty (food)',
          radical: '女',
          radical_name_th: 'หมวดผู้หญิง (女字旁)',
          stroke_count: 12,
          mnemonic: 'ดี (好) ต่อการกิน (吃) = อร่อย',
          kid_mnemonic: 'ดี (好) ต่อการกิน (吃) = อร่อย (好吃)',
          body_gesture: 'ลูบท้องเป็นวงกลมแล้วยิ้มแป้น'
        },
        {
          id: 'hsk1_0313',
          hanzi: '好喝',
          pinyin: 'hǎohē',
          display_pinyin: 'hǎohē',
          pinyin_tone: 'hao3he1',
          meaning_th: 'อร่อย, ชื่นใจ (เครื่องดื่ม/ซุป)',
          meaning_en: 'delicious, refreshing (drinks/soup)',
          radical: '女',
          radical_name_th: 'หมวดผู้หญิง (女字旁)',
          stroke_count: 18,
          mnemonic: 'ดี (好) ต่อการดื่ม (喝) สดชื่น = ดื่มอร่อย/ชื่นใจ',
          kid_mnemonic: 'ดี (好) ต่อการดื่ม (喝) สดชื่น = อร่อย/ดื่มคล่องคอ (好喝)',
          body_gesture: 'ยกนิ้วโป้งเยี่ยมหลังจิบเครื่องดื่ม'
        },
        {
          id: 'hsk1_0314',
          hanzi: '很',
          pinyin: 'hěn',
          display_pinyin: 'hěn',
          pinyin_tone: 'hen3',
          meaning_th: 'มาก',
          meaning_en: 'very, quite',
          radical: '彳',
          radical_name_th: 'หมวดทางเดินคู่ (双人旁)',
          stroke_count: 9,
          mnemonic: 'ก้าวเดิน (彳) ไปข้างหน้าอย่างมุ่งมั่นมาก = มาก',
          kid_mnemonic: 'ก้าวเดิน (彳) ไปข้างหน้าอย่างมุ่งมั่นมาก (很) = มาก',
          body_gesture: 'กางสองแขนออกกว้างๆ แสดงความ มาก'
        },
        {
          id: 'hsk1_0315',
          hanzi: '辣',
          pinyin: 'là',
          display_pinyin: 'là',
          pinyin_tone: 'la4',
          meaning_th: 'เผ็ด',
          meaning_en: 'spicy, hot',
          radical: '辛',
          radical_name_th: 'หมวดรสเผ็ด (辛字旁)',
          stroke_count: 14,
          mnemonic: 'พริกเผ็ดร้อน (辛) สุมรวมกันจนเหงื่อแตกพลั่ก = เผ็ด',
          kid_mnemonic: 'พริกเผ็ดร้อน (辛) สุมรวมกันจนเหงื่อแตกพลั่ก = เผ็ด (辣)',
          body_gesture: 'ทำมือพัดหน้า พ่นลมออกจากปาก ฮ่า... เผ็ด!'
        },
        {
          id: 'hsk1_0316',
          hanzi: '太',
          pinyin: 'tài',
          display_pinyin: 'tài',
          pinyin_tone: 'tai4',
          meaning_th: 'เกินไป, เหลือเกิน (ในไวยากรณ์ 太...了)',
          meaning_en: 'too, extremely',
          radical: '大',
          radical_name_th: 'หมวดใหญ่ (大字部)',
          stroke_count: 4,
          mnemonic: 'คนตัวใหญ่ (大) มีจุดหยดเหงื่อตรงขา หนักเกินไปแล้ว = เกินไป',
          kid_mnemonic: 'คนตัวใหญ่ (大) มีจุดหยดเหงื่อตรงขา หนัก เกินไป (太) แล้ว!',
          body_gesture: 'ส่ายหน้าพร้อมยกมือห้าม'
        }
      ],
      tone_rule: {
        rule_name: 'กฎสัทศาสตร์ของ 不辣 (bú là) และ 很好 (hén hǎo)',
        description_th: 'พยางค์ 辣 (là) เป็นเสียงที่ 4 ดังนั้นคำว่า 不 จึงต้องผันขึ้นเป็นเสียงที่ 2 เสมอ คือ bú là (ห้ามอ่าน bù là เด็ดขาด)',
        example: '不辣 ➔ bú là (กฎ bu), 很好 ➔ hén hǎo (กฎ 3+3)',
        fun_metaphor: 'พริกเผ็ดร้อนจนเสียงกดดิ่งลง (เสียง 4 là) คำว่า 不 เลยต้องกระโดดหลบขึ้นฟ้าเป็นเสียง 2 (bú) กลายเป็น bú là!',
        reassurance: 'สั่ง bú là พ่อค้าแม่ค้าเสฉวนเข้าใจทันที ไม่ต้องกลัวเผ็ดพ่นไฟ!'
      },
      grammar_bite: {
        title: 'สูตรบอกรสชาติและระดับความเผ็ด',
        explanation_th: 'ภาษาจีนแยกชัดเจน: ของกินใช้ 好吃, เครื่องดื่มใช้ 好喝 และไวยากรณ์ 太...了 (เกินไปแล้ว)',
        patterns: [
          {
            formula: '[อาหาร] + 很好吃！ = อาหารอร่อยมาก!',
            zh: '饺子很好吃！',
            pinyin: 'Jiǎozi hén hǎochī!',
            th: 'เกี๊ยวต้มอร่อยมาก!',
            en: 'Dumplings are very delicious!'
          },
          {
            formula: '[เครื่องดื่ม] + 很好喝！ = เครื่องดื่มอร่อยมาก!',
            zh: '茶很好喝！',
            pinyin: 'Chá hén hǎohē!',
            th: 'ชาอร่อยชื่นใจมาก!',
            en: 'Tea is very delicious!'
          },
          {
            formula: '不辣 / 太辣了！ = ไม่เผ็ด / เผ็ดเกินไปแล้ว!',
            zh: '太辣了！',
            pinyin: 'Tài là le!',
            th: 'เผ็ดเกินไปแล้ว!',
            en: 'Too spicy!'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '你好ทู่ทู่，饺子好吃吗？',
          pinyin: 'Nǐ hǎo Tutu, jiǎozi hǎochī ma?',
          th: 'สวัสดีทู่ทู่ เกี๊ยวอร่อยไหม?',
          en: 'Hello Tutu, are dumplings delicious?'
        },
        {
          speaker: 'B',
          speaker_name: 'น้องกระต่ายทู่ทู่ 🐰',
          zh: '很好吃！面条辣不辣？',
          pinyin: 'Hén hǎochī! Miàntiáo là bu là?',
          th: 'อร่อยมากจ้า! แล้วบะหมี่เผ็ดไหม?',
          en: 'Very delicious! Are noodles spicy?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '不辣，很好吃！这杯水也很好喝。',
          pinyin: 'Bú là, hén hǎochī! Zhè bēi shuǐ yě hén hǎohē.',
          th: 'ไม่เผ็ดครับ อร่อยมาก! น้ำแก้วนี้ก็ชื่นใจมากครับ',
          en: 'Not spicy, very delicious! This cup of water is also very refreshing.'
        },
        {
          speaker: 'B',
          speaker_name: 'น้องกระต่ายทู่ทู่ 🐰',
          zh: '给你茶！太辣了可以喝茶。',
          pinyin: 'Géi nǐ chá! Tài là le kéyǐ hē chá.',
          th: 'ยื่นชาให้นะ! ถ้าเผ็ดเกินไปดื่มชาได้จ้า',
          en: 'Here is tea for you! If too spicy you can drink tea.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '谢谢你！再见！',
          pinyin: 'Xièxie nǐ! Zàijiàn!',
          th: 'ขอบคุณนะ บ๊ายบาย!',
          en: 'Thank you! Goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '不辣' (ไม่เผ็ด) ออกเสียงจริงตามกฎ Tone Sandhi ว่าอย่างไร?",
          options: [
            'bú là',
            'bù là',
            'bǔ là',
            'bū là'
          ],
          correct_index: 0,
          explanation_th: 'คำว่า 辣 (là) เป็นวรรณยุกต์เสียงที่ 4 ดังนั้นคำว่า 不 จึงต้องผันเป็นเสียงที่ 2 คือ bú là!',
          encouragement: 'ยอดเยี่ยมมาก! สัทศาสตร์เป๊ะระดับเจ้าของภาษา!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '辣' (เผ็ด) มีหมวดนำข้างหน้าคือหมวดใด?",
          options: [
            'หมวดรสเผ็ด/ความลำบาก (辛 辛字旁)',
            'หมวดอาหาร (饣)',
            'หมวดน้ำ (水)',
            'หมวดไฟ (灬)'
          ],
          correct_index: 0,
          explanation_th: 'คำว่า 辣 มีหมวดนำ 辛 (xīn) อยู่ด้านซ้าย ซึ่งสื่อถึงรสชาติเผ็ดร้อนหรือความลำบาก!',
          encouragement: 'ตาไวมองเห็นหมวดนำรสเผ็ดได้เป๊ะ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ไม่เผ็ด อร่อยมาก"',
          tokens: ['很好吃', '不辣'],
          correct_sequence: ['不辣', '很好吃'],
          pinyin: 'Bú là, hén hǎochī',
          meaning_th: 'ไม่เผ็ด อร่อยมาก',
          explanation_th: 'เรียงลำดับ: 不辣 (ไม่เผ็ด) + 很好吃 (อร่อยมาก)',
          encouragement: 'เรียงประโยคบอกรสชาติได้คล่องแคล่ว!'
        },
        {
          type: 'flash_recall',
          question_th: 'ข้อความใดผิดหลักภาษาจีนอย่างชัดเจน? (ระวังกับดัก 好吃 vs 好喝!)',
          options: [
            '这杯咖啡很好吃 (Zhè bēi kāfēi hěn hǎochī)',
            '面条很好吃 (Miàntiáo hěn hǎochī)',
            '茶很好喝 (Chá hěn hǎohē)',
            '饺子很好吃 (Jiǎozi hěn hǎochī)'
          ],
          correct_index: 0,
          explanation_th: 'ภาษาจีนแยกเด็ดขาด: กาแฟเป็นเครื่องดื่ม ต้องใช้ 好喝 (อร่อย/ชื่นใจ) ห้ามใช้ 好吃 (ของกินเคี้ยวได้) เด็ดขาด!',
          encouragement: 'สายตาระดับเทพ! ไม่หลงกลกับดักของกิน vs เครื่องดื่มเลย!'
        }
      ],
      boss_challenge: {
        scenario_th: 'พนักงานร้านบะหมี่เสฉวนถามคุณก่อนทำอาหารว่า "面条要辣吗？" (บะหมี่จะใส่เผ็ดไหมครับ?) คุณทานเผ็ดไม่ได้เลยแม้แต่นิดเดียว ต้องตอบอย่างไรให้ปลอดภัยที่สุด?',
        options: [
          '不要辣，谢谢！ (Bú yào là, xièxie!)',
          '太好吃了！ (Tài hǎochī le!)',
          '我要很多辣。 (Wǒ yào hěn duō là.)',
          '我不吃面条。 (Wǒ bù chī miàntiáo.)'
        ],
        correct_index: 0,
        explanation_th: 'บอกปฏิเสธความเผ็ดอย่างชัดเจนและสุภาพ: อย่าใส่เผ็ดนะ ขอบคุณครับ (不要辣，谢谢！)!',
        encouragement: 'ยินดีด้วย! ทานบะหมี่ได้อย่างเอร็ดอร่อย ปลอดภัยจากพริกเผ็ดพ่นไฟ!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u03_l03',
        badge_name: 'ยอดนักชิมลิ้นทองคำ 🌶️🐰',
        message_th: 'ยินดีด้วยนะคนเก่ง! วันนี้คุณบอกรสชาติ ชมอาหาร และสั่งอาหารไม่เผ็ดได้อย่างมั่นใจแล้ว!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't1_u03_l04',
      lesson_number: 4,
      title: {
        zh: '北京小吃店点餐通关',
        th: 'Boss Challenge: สั่งสตรีทฟู้ดปักกิ่ง',
        en: 'Boss Challenge: Street Food Ordering'
      },
      can_do: {
        th: 'สั่งอาหารจานหลัก เครื่องดื่ม กำชับเรื่องความเผ็ด และสนทนากับพนักงานได้อย่างมั่นใจ 100%',
        en: 'Order full meals, specify drinks and spice level, and interact with servers smoothly'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สวมบทบาทสั่งอาหารที่ร้านสตรีทฟู้ดปักกิ่งสำเร็จทุกขั้นตอน ไร้ข้อผิดพลาด!',
      vocabulary: [
        {
          id: 'hsk1_0317',
          hanzi: '碗',
          pinyin: 'wǎn',
          display_pinyin: 'wǎn',
          pinyin_tone: 'wan3',
          meaning_th: 'ชาม, ถ้วย (ลักษณนามอาหาร)',
          meaning_en: 'bowl (measure word)',
          radical: '石',
          radical_name_th: 'หมวดหิน (石字旁)',
          stroke_count: 13,
          mnemonic: 'ชามดินเผาแกร่งเหมือนหิน (石) ใส่บะหมี่ร้อนๆ = ชาม',
          kid_mnemonic: 'ชามกระเบื้องหินใส่อาหารร้อนๆ ตักกินอร่อยจัง! = ชาม (碗)',
          body_gesture: 'สองมือกอบเป็นรูปชามกลมๆ ประคองไว้ข้างหน้า'
        },
        {
          id: 'hsk1_0318',
          hanzi: '服务员',
          pinyin: 'fúwùyuán',
          display_pinyin: 'fúwùyuán',
          pinyin_tone: 'fu2wu4yuan2',
          meaning_th: 'บริกร, พนักงานเสิร์ฟ',
          meaning_en: 'waiter, waitress, service staff',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 24,
          mnemonic: 'คน (亻) ที่คอยให้บริการช่วยเหลือในร้านอาหาร = พนักงานบริการ',
          kid_mnemonic: 'พี่พนักงานใจดีส่งยิ้ม ยื่นเมนูอาหารให้พวกเรา',
          body_gesture: 'ยกมือขวาขึ้นระดับอกเพื่อเรียกพนักงานอย่างสุภาพ'
        }
      ],
      tone_rule: {
        rule_name: 'กฎ 3+3 Sandhi ของ 两碗 (liáng wǎn) และ 一碗 (yì wǎn)',
        description_th: 'คำว่า 两 (เสียง 3) เมื่ออยู่หน้า 碗 (เสียง 3) ผันเป็น liáng wǎn และ 一 หน้าเสียง 3 ผันเป็น yì wǎn',
        example: '一碗面条 (yì wǎn miàntiáo), 两碗米饭 (liáng wǎn mǐfàn)',
        fun_metaphor: 'สั่ง 2 ชาม ลิ้นกระโดดขึ้นบันไดเป็น liáng wǎn ออกเสียงพริ้วเหมือนสั่งบะหมี่ลื่นคอ!',
        reassurance: 'เรียกบริกรว่า 服务员 (Fúwùyuán) แล้วสั่งได้เลย สุภาพและเป็นกันเอง!'
      },
      grammar_bite: {
        title: 'สูตรสั่งอาหารชุดใหญ่ครบวงจร',
        explanation_th: 'โครงสร้าง: 服务员，我要 + [จำนวน+ลักษณนาม+อาหาร] + [จำนวน+ลักษณนาม+เครื่องดื่ม] + 不要辣',
        patterns: [
          {
            formula: '服务员，我要 + [อาหาร] = พี่ครับ/น้องครับ ผมขอเอา...',
            zh: '服务员，我要一碗面条。',
            pinyin: 'Fúwùyuán, wǒ yào yì wǎn miàntiáo.',
            th: 'บริกรครับ ผมขอบะหมี่ 1 ชาม',
            en: 'Waiter, I would like a bowl of noodles.'
          },
          {
            formula: '不要辣 = ไม่เอาเผ็ด',
            zh: '不要辣。',
            pinyin: 'Bú yào là.',
            th: 'ไม่เอาเผ็ดครับ/ค่ะ',
            en: 'No spicy please.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '服务员，你好！我是泰国人。',
          pinyin: 'Fúwùyuán, nǐ hǎo! Wǒ shì Tàiguó rén.',
          th: 'บริกรครับ สวัสดีครับ! ผมเป็นคนไทยครับ',
          en: 'Waiter, hello! I am Thai.'
        },
        {
          speaker: 'B',
          speaker_name: 'บริกร 🧑‍🍳',
          zh: '您好！欢迎！请问您要吃什么？',
          pinyin: 'Nín hǎo! Huānyíng! Qǐngwèn nín yào chī shénme?',
          th: 'สวัสดีครับ! ยินดีต้อนรับครับ! ไม่ทราบว่าท่านต้องการทานอะไรครับ?',
          en: 'Hello! Welcome! What would you like to eat?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '我要一碗面条，两杯茶，不要辣。',
          pinyin: 'Wǒ yào yì wǎn miàntiáo, liǎng bēi chá, bú yào là.',
          th: 'ผมขอเอาบะหมี่ 1 ชาม ชา 2 แก้ว ไม่เอาเผ็ดครับ',
          en: 'I want a bowl of noodles, two cups of tea, not spicy.'
        },
        {
          speaker: 'B',
          speaker_name: 'บริกร 🧑‍🍳',
          zh: '好的，一碗面条不辣，两杯茶。请稍等！',
          pinyin: 'Hǎode, yì wǎn miàntiáo bú là, liǎng bēi chá. Qǐng shāoděng!',
          th: 'ได้ครับ บะหมี่ 1 ชามไม่เผ็ด ชา 2 แก้ว กรุณารอสักครู่นะครับ!',
          en: 'Okay, one bowl of noodles not spicy, two cups of tea. Please wait a moment!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '谢谢！再见！',
          pinyin: 'Xièxie! Zàijiàn!',
          th: 'ขอบคุณครับ แล้วพบกันใหม่ครับ!',
          en: 'Thank you! See you again!'
        },
        {
          speaker: 'B',
          speaker_name: 'บริกร 🧑‍🍳',
          zh: '不客气！慢用！',
          pinyin: 'Bú kèqi! Màn yòng!',
          th: 'ด้วยความยินดีครับ ทานให้อร่อยนะครับ!',
          en: "You're welcome! Enjoy your meal!"
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '两碗' (สองชาม) ออกเสียงพินอินตามกฎ 3+3 Sandhi อย่างไร?",
          options: [
            'liáng wǎn',
            'liǎng wǎn',
            'èr wǎn',
            'liàng wǎn'
          ],
          correct_index: 0,
          explanation_th: 'เสียง 3 ชนเสียง 3 (liǎng + wǎn) คำหน้าผันเป็นเสียง 2 คือ liáng wǎn!',
          encouragement: 'ฟังออกชัดเจนและจำกฎผันเสียงได้แม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "หมวดนำ '石' (หิน) ในคำว่า '碗' (ชาม) สื่อถึงสิ่งใด?",
          options: [
            'ภาชนะที่ทำจากดินเผาหรือหิน',
            'มีดหั่นอาหาร',
            'สายน้ำไหล',
            'ใบไม้และพืช'
          ],
          correct_index: 0,
          explanation_th: 'ชามโบราณทำจากดินเผาหรือสลักจากหิน จึงมีหมวดนำ 石 (หิน) อยู่ด้านซ้าย!',
          encouragement: 'เข้าใจลึกซึ้งถึงวัฒนธรรมจีนโบราณ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยคสั่งอาหารครบสูตร: "บริกรครับ ผมขอบะหมี่ 1 ชาม ไม่เอาเผ็ด"',
          tokens: ['不要辣', '我要', '一碗面条', '服务员'],
          correct_sequence: ['服务员', '我要', '一碗面条', '不要辣'],
          pinyin: 'Fúwùyuán, wǒ yào yì wǎn miàntiáo, bú yào là',
          meaning_th: 'บริกรครับ ผมเอาบะหมี่ 1 ชาม ไม่เอาเผ็ด',
          explanation_th: 'เรียงลำดับ: 服务员 (เรียกบริกร) + 我要 (ฉันจะเอา) + 一碗面条 (บะหมี่ 1 ชาม) + 不要辣 (ไม่เอาเผ็ด)',
          encouragement: 'สุดยอดดด! เรียงประโยคสั่งอาหารได้เหมือนคนจีนแท้ๆ!'
        },
        {
          type: 'flash_recall',
          question_th: 'เมื่อพนักงานนำบะหมี่มาเสิร์ฟพร้อมพูดว่า "请慢用！" (ทานให้อร่อยครับ) เราควรตอบรับอย่างไร? (ทบทวน Unit 1)',
          options: [
            '谢谢！ (Xièxie!)',
            '再见！ (Zàijiàn!)',
            '不客气！ (Bú kèqi!)',
            '不要！ (Bú yào!)'
          ],
          correct_index: 0,
          explanation_th: 'เมื่อได้รับการบริการและคำอวยพรมื้ออาหาร เราควรกล่าวขอบคุณว่า 谢谢！ (Xièxie!) เสมอ!',
          encouragement: 'มารยาทบนโต๊ะอาหารยอดเยี่ยม ตอบได้ทันควัน!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณนั่งอยู่ในร้านอาหารหน้าสถานีรถไฟปักกิ่ง ต้องการเรียกพนักงาน สั่งบะหมี่ 1 ชาม ชาร้อน 1 แก้ว และกำชับว่าไม่เอาเผ็ด คุณควรพูดประโยคใด?',
        options: [
          '服务员，你好！我要一碗面条，一杯茶，不要辣，谢谢！ (Fúwùyuán, nǐ hǎo! Wǒ yào yì wǎn miàntiáo, yì bēi chá, bú yào là, xièxie!)',
          '服务员，我要二碗米饭，这杯茶很好吃。 (Fúwùyuán, wǒ yào èr wǎn mǐfàn, zhè bēi chá hěn hǎochī.)',
          '再见，我不吃。 (Zàijiàn, wǒ bù chī.)',
          '我是泰国人，不喝茶。 (Wǒ shì Tàiguó rén, bù hē chá.)'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคที่ถูกต้อง สุภาพ และแยกใช้ลักษณนาม 碗 (ชาม) และ 杯 (แก้ว) อย่างสมบูรณ์แบบคือตัวเลือกแรก!',
        encouragement: '🎉 ยอดเยี่ยมมาก! คุณพิชิต Grand Boss Challenge ของ Unit 3 ได้อย่างงดงาม!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u03_master',
        badge_name: 'จอมยุทธ์สั่งอาหารแห่งปักกิ่ง 🏆🐰',
        message_th: 'ขอแสดงความยินดีด้วย! คุณผ่านบทเรียนสั่งอาหารและเครื่องดื่มระดับ Tier 1 ครบทั้ง 4 บทย่อยแล้ว!',
        xp_reward: 200
      }
    }
  ]
};

// ============================================================================
// UNIT 4: Shopping & Money (tier1_u04)
// ============================================================================
const unit04 = {
  unit_id: 'tier1_u04',
  tier: 1,
  unit_number: 4,
  title: {
    zh: '购物与砍价技巧',
    th: 'ช็อปปิ้ง & ถามราคา',
    en: 'Shopping & Asking Price'
  },
  description: 'ถามราคาสินค้า ต่อรองราคาอย่างสุภาพ ชี้เลือกสิ่งของใกล้-ไกล แยกแยะ 要 กับ 想 และชำระเงินได้อย่างมั่นใจทุกตลาดในจีน',
  lessons: [
    {
      lesson_id: 't1_u04_l01',
      lesson_number: 1,
      title: {
        zh: '这个多少钱',
        th: 'อันนี้เท่าไหร่?',
        en: 'How Much Is This?'
      },
      can_do: {
        th: 'ถามราคาสินค้า ชี้ระบุสิ่งของใกล้-ไกล (อันนี้/อันนั้น) และเข้าใจหน่วยเงิน 块',
        en: 'Ask prices of items, indicate proximity (this/that), and understand colloquial currency 块'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ชี้ของที่ถูกใจในตลาดแล้วถามราคา "อันนี้เท่าไหร่?" ได้อย่างมั่นใจ!',
      vocabulary: [
        {
          id: 'hsk1_0401',
          hanzi: '这',
          pinyin: 'zhè',
          display_pinyin: 'zhè',
          pinyin_tone: 'zhe4',
          meaning_th: 'นี่, นี้',
          meaning_en: 'this',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之旁)',
          stroke_count: 7,
          mnemonic: 'เดิน (辶) มาถึงตรงนี้ ชี้บอกว่า นี่ (这)',
          kid_mnemonic: 'เดิน (辶) มาถึงตรงนี้ ชี้บอกว่า นี่ (这)',
          body_gesture: 'ชี้นิ้วลงใกล้ตัว'
        },
        {
          id: 'hsk1_0402',
          hanzi: '这个',
          pinyin: 'zhè ge',
          display_pinyin: 'zhè ge',
          pinyin_tone: 'zhe4 ge5',
          meaning_th: 'อันนี้, สิ่งนี้',
          meaning_en: 'this one',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之旁)',
          stroke_count: 10,
          mnemonic: 'ชี้จับสิ่งของที่อยู่ตรงหน้าใกล้ๆ = อันนี้',
          kid_mnemonic: 'ชี้จับสิ่งของที่อยู่ตรงหน้าใกล้ๆ = อันนี้ (这个)',
          body_gesture: 'หยิบจับสิ่งของตรงหน้าขึ้นมาดู'
        },
        {
          id: 'hsk1_0403',
          hanzi: '那',
          pinyin: 'nà',
          display_pinyin: 'nà',
          pinyin_tone: 'na4',
          meaning_th: 'นั่น, นั้น',
          meaning_en: 'that',
          radical: '阝',
          radical_name_th: 'หมวดเนินดิน/เมือง (右耳旁)',
          stroke_count: 6,
          mnemonic: 'ชี้ข้ามเนินดิน (阝) ไปที่ตรงโน้น = นั่น',
          kid_mnemonic: 'ชี้ข้ามเนินดิน (阝) ไปที่ตรงโน้น = นั่น (那)',
          body_gesture: 'ชี้เหยียดแขนไปข้างหน้า'
        },
        {
          id: 'hsk1_0404',
          hanzi: '那个',
          pinyin: 'nà ge',
          display_pinyin: 'nà ge',
          pinyin_tone: 'na4 ge5',
          meaning_th: 'อันนั้น, สิ่งนั้น',
          meaning_en: 'that one',
          radical: '阝',
          radical_name_th: 'หมวดเนินดิน/เมือง (右耳旁)',
          stroke_count: 9,
          mnemonic: 'ชี้มือไปที่ของวางอยู่บนชั้นไกลตัว = อันนั้น',
          kid_mnemonic: 'ชี้มือไปที่ของวางอยู่บนชั้นไกลตัว = อันนั้น (那个)',
          body_gesture: 'ชี้นิ้วไปที่ของไกลตัว'
        },
        {
          id: 'hsk1_0405',
          hanzi: '多少',
          pinyin: 'duōshao',
          display_pinyin: 'duōshao',
          pinyin_tone: 'duo1shao5',
          meaning_th: 'เท่าไหร่, เท่าใด',
          meaning_en: 'how much, how many',
          radical: '夕',
          radical_name_th: 'หมวดค่ำ (夕字旁)',
          stroke_count: 10,
          mnemonic: 'มาก (多) หรือ น้อย (少) ถามราคาว่า เท่าไหร่',
          kid_mnemonic: 'มาก (多) หรือ น้อย (少) ถามราคาว่า เท่าไหร่ (多少)',
          body_gesture: 'แบสองมือเอียงสลับขึ้นลงเหมือนตราชั่ง'
        },
        {
          id: 'hsk1_0406',
          hanzi: '钱',
          pinyin: 'qián',
          display_pinyin: 'qián',
          pinyin_tone: 'qian2',
          meaning_th: 'เงิน, เงินทอง',
          meaning_en: 'money',
          radical: '钅',
          radical_name_th: 'หมวดทองคำ/โลหะ (金字旁)',
          stroke_count: 10,
          mnemonic: 'โลหะมีค่า (钅) เหรียญเงินแวววาว = เงินทอง',
          kid_mnemonic: 'โลหะมีค่า (钅) เหรียญเงินแวววาว = เงินทอง (钱)',
          body_gesture: 'ถูนิ้วโป้งกับนิ้วชี้เป็นสัญลักษณ์เงินสากล'
        },
        {
          id: 'hsk1_0407',
          hanzi: '块',
          pinyin: 'kuài',
          display_pinyin: 'kuài',
          pinyin_tone: 'kuai4',
          meaning_th: 'หยวน (หน่วยเงินภาษาพูด), ก้อน/ชิ้น',
          meaning_en: 'kuai (yuan), piece',
          radical: '土',
          radical_name_th: 'หมวดดิน (提土旁)',
          stroke_count: 7,
          mnemonic: 'ก้อนดิน (土) สี่เหลี่ยม เหรียญเงิน 1 หยวน',
          kid_mnemonic: 'ก้อนดิน (土) สี่เหลี่ยม เหรียญเงิน 1 หยวน (块)',
          body_gesture: 'หงายฝ่ามือกำหลวมๆ รับเหรียญเงิน'
        }
      ],
      tone_rule: {
        rule_name: 'กฎการผันเสียงของ 一块 (yí kuài)',
        description_th: 'คำว่า 一 เมื่อนำหน้าพยางค์เสียงที่ 4 (块 kuài) จะผันเสียงเป็นเสียงที่ 2 คือ yí kuài',
        example: '一块 (yí kuài), 一块钱 (yí kuài qián)',
        fun_metaphor: 'เสียง 4 กดลงพื้นหนักแน่น พี่หนึ่งเลยต้องดีดตัวขึ้นเป็นเสียง 2 yí kuài สดใส!',
        reassurance: 'คนจีนพูดว่า kuài (ควาย) 99% ในชีวิตประจำวัน จำคำนี้คำเดียวช็อปปิ้งได้ทั่วประเทศ!'
      },
      grammar_bite: {
        title: 'สูตรสำเร็จรูปถามและบอกราคาสินค้า',
        explanation_th: 'ชี้สิ่งของแล้วตามด้วย 多少钱？ (เท่าไหร่?) และบอกราคาด้วย [ตัวเลข] + 块',
        patterns: [
          {
            formula: '[สิ่งของ] + 多少钱？ = สิ่งนี้ราคาเท่าไหร่?',
            zh: '这个多少钱？',
            pinyin: 'Zhè ge duōshao qián?',
            th: 'อันนี้เท่าไหร่?',
            en: 'How much is this?'
          },
          {
            formula: '[สิ่งของ] + [ตัวเลข] + 块 (钱) = ราคา...หยวน',
            zh: '这个十块钱。',
            pinyin: 'Zhè ge shí kuài qián.',
            th: 'อันนี้ 10 หยวน',
            en: 'This is 10 yuan.'
          },
          {
            formula: '那个 + 多少钱？ = อันนั้นราคาเท่าไหร่?',
            zh: '那个多少钱？',
            pinyin: 'Nà ge duōshao qián?',
            th: 'อันนั้นเท่าไหร่?',
            en: 'How much is that?'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '你好！请问这个多少钱？',
          pinyin: 'Nǐ hǎo! Qǐngwèn zhè ge duōshao qián?',
          th: 'สวัสดีครับ! ขอถามหน่อย อันนี้เท่าไหร่ครับ?',
          en: 'Hello! May I ask how much this is?'
        },
        {
          speaker: 'B',
          speaker_name: 'แม่ค้า 👩',
          zh: '你好！这个十块钱。',
          pinyin: 'Nǐ hǎo! Zhè ge shí kuài qián.',
          th: 'สวัสดีจ้า! อันนี้ 10 หยวนจ้า',
          en: 'Hello! This one is 10 yuan.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '那那个呢？',
          pinyin: 'Nà nà ge ne?',
          th: 'แล้วอันนั้นล่ะครับ?',
          en: 'Then what about that one?'
        },
        {
          speaker: 'B',
          speaker_name: 'แม่ค้า 👩',
          zh: '那个二十块。',
          pinyin: 'Nà ge èrshí kuài.',
          th: 'อันนั้น 20 หยวนจ้า',
          en: 'That one is 20 yuan.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '好的，谢谢你！再见！',
          pinyin: 'Hǎode, xièxie nǐ! Zàijiàn!',
          th: 'โอเคครับ ขอบคุณครับ บ๊ายบาย!',
          en: 'Okay, thank you! Goodbye!'
        },
        {
          speaker: 'B',
          speaker_name: 'แม่ค้า 👩',
          zh: '不客气，再见！',
          pinyin: 'Bú kèqi, zàijiàn!',
          th: 'ไม่เป็นไรจ้า แล้วพบกันใหม่นะ!',
          en: "You're welcome, see you!"
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '一块钱' (1 หยวน) ออกเสียงพินอินตามกฎ Tone Sandhi อย่างไร?",
          options: [
            'yí kuài qián',
            'yì kuài qián',
            'yī kuài qián',
            'yǐ kuài qián'
          ],
          correct_index: 0,
          explanation_th: '一 อยู่หน้าพยางค์เสียงที่ 4 (块 kuài) ผันเสียงขึ้นเป็นเสียง 2 คือ yí kuài qián!',
          encouragement: 'จับเสียงผันวรรณยุกต์ได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '钱' (เงิน) มีหมวดนำข้างซ้ายคือหมวดใด?",
          options: [
            'หมวดโลหะ/ทองคำ (钅 金字旁)',
            'หมวดกรอบล้อม (囗)',
            'หมวดไม้ (木)',
            'หมวดดิน (土)'
          ],
          correct_index: 0,
          explanation_th: 'เหรียญเงินโบราณหล่อจากโลหะมีค่า ดังนั้น 钱 จึงมีหมวดนำ 钅 (ทองคำ/โลหะ) อยู่ด้านซ้าย!',
          encouragement: 'มองเห็นรากเหรียญเงินทองได้เป๊ะสุดๆ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยคถามราคา: "อันนี้เท่าไหร่?"',
          tokens: ['多少钱', '这个'],
          correct_sequence: ['这个', '多少钱'],
          pinyin: 'Zhè ge duōshao qián?',
          meaning_th: 'อันนี้ราคาเท่าไหร่?',
          explanation_th: 'โครงสร้างประโยคถามราคา: [สิ่งของ] 这个 + 多少钱？',
          encouragement: 'เรียงประโยคถามราคาได้คล่องแคล่วมาก!'
        },
        {
          type: 'flash_recall',
          question_th: 'ในภาษาพูดประจำวัน คนจีนนิยมเรียกหน่วยเงินหยวนว่าอย่างไรมากที่สุด?',
          options: [
            '块 (kuài)',
            '元 (yuán)',
            '分 (fēn)',
            '角 (jiǎo)'
          ],
          correct_index: 0,
          explanation_th: 'ในชีวิตประจำวันคนจีนพูดคำว่า 块 (kuài) แทนคำว่า 元 เกือบ 100%!',
          encouragement: 'เข้าใจภาษาพูดของคนจีนในชีวิตจริงอย่างถ่องแท้!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณกำลังเดินในตลาดนัดถนนคนเดินที่ซีอาน สนใจพวงกุญแจตุ๊กตานักรบดินเผาที่วางอยู่ตรงหน้า คุณจะถามราคาแม่ค้าอย่างไรให้ถูกต้องและเป็นธรรมชาติ?',
        options: [
          '老板，这个多少钱？ (Lǎobǎn, zhè ge duōshao qián?)',
          '这个是哪国人？ (Zhè ge shì nǎ guó rén?)',
          '那个太好吃了。 (Nà ge tài hǎochī le.)',
          '我有八块钱。 (Wǒ yǒu bā kuài qián.)'
        ],
        correct_index: 0,
        explanation_th: 'ทักทายแม่ค้าอย่างเป็นมิตรด้วยคำว่า 老板 (เถ้าแก่/เจ๊) แล้วถามราคา 这个多少钱？ คือคำตอบที่ตรงประเด็นและเป็นธรรมชาติที่สุด!',
        encouragement: 'ยินดีด้วย! คุณพร้อมช็อปปิ้งในตลาดจีนแล้ว!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u04_l01',
        badge_name: 'นักสืบป้ายราคาตาไว 🏷️🐰',
        message_th: 'ยินดีด้วยนะคนเก่ง! วันนี้คุณถามราคาสินค้า ชี้อันนี้อันนั้น และเข้าใจเงิน 块 ได้อย่างแม่นยำแล้ว!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't1_u04_l02',
      lesson_number: 2,
      title: {
        zh: '太贵了便宜一点儿',
        th: 'แพงไปหน่อย ลดได้ไหม?',
        en: 'Bargaining & Politeness'
      },
      can_do: {
        th: 'ต่อรองราคาอย่างสุภาพ ออกเสียง Sandhi 可以 (kéyǐ) และใช้คำลงท้าย 吧 เพื่อความนุ่มนวล',
        en: 'Negotiate prices politely, pronounce 可以 (kéyǐ) with 3+3 Sandhi, and use particle 吧'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พูดประโยคทองคำ "แพงไปหน่อย ลดนิดนึงได้ไหมครับ" ได้คล่องแคล่ว!',
      vocabulary: [
        {
          id: 'hsk1_0408',
          hanzi: '贵',
          pinyin: 'guì',
          display_pinyin: 'guì',
          pinyin_tone: 'gui4',
          meaning_th: 'แพง, ล้ำค่า',
          meaning_en: 'expensive, costly',
          radical: '贝',
          radical_name_th: 'หมวดเปลือกหอย/สมบัติ (贝字底)',
          stroke_count: 9,
          mnemonic: 'เปลือกหอยโบราณมีค่า (贝) วางบนพานทอง = แพง/มีค่า',
          kid_mnemonic: 'เปลือกหอยโบราณมีค่า (贝) วางบนพานทอง = แพง/มีค่า (贵)',
          body_gesture: 'สองมือกุมแก้มทำตาโตตกใจในความแพง'
        },
        {
          id: 'hsk1_0409',
          hanzi: '便宜',
          pinyin: 'piányi',
          display_pinyin: 'piányi',
          pinyin_tone: 'pian2yi5',
          meaning_th: 'ถูก (ราคาถูก)',
          meaning_en: 'cheap, inexpensive',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 11,
          mnemonic: 'คน (亻) ได้รับความสะดวกสบาย ประหยัดเงิน = ราคาถูก',
          kid_mnemonic: 'คน (亻) ได้รับความสะดวกสบาย ประหยัดเงิน = ราคาถูก (便宜)',
          body_gesture: 'ยิ้มกว้างผายมืออย่างสบายใจ'
        },
        {
          id: 'hsk1_0410',
          hanzi: '一点儿',
          pinyin: 'yìdiǎnr',
          display_pinyin: 'yì diǎnr',
          pinyin_tone: 'yi4dianr5',
          sandhi_rule: 'yi',
          meaning_th: 'นิดหน่อย, สักนิด',
          meaning_en: 'a little bit',
          radical: '一',
          radical_name_th: 'หมวดเส้นขวาง (一部)',
          stroke_count: 12,
          mnemonic: 'ปลายนิ้วแตะหยดน้ำจิ๋ว สักนิดเดียว = นิดหน่อย',
          kid_mnemonic: 'ปลายนิ้วแตะหยดน้ำจิ๋ว นิดเดียว (一点儿)',
          body_gesture: 'จีบนิ้วโป้งกับนิ้วชี้เว้นช่องว่างแคบๆ เล็กน้อย'
        },
        {
          id: 'hsk1_0411',
          hanzi: '可以',
          pinyin: 'kěyǐ',
          display_pinyin: 'kéyǐ',
          pinyin_tone: 'ke3yi3',
          sandhi_rule: '3+3',
          meaning_th: 'ได้, สามารถ',
          meaning_en: 'can, may, okay',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 9,
          mnemonic: 'อ้าปาก (口) พูดว่า โอเค ทำได้เลย = ได้/สามารถ',
          kid_mnemonic: 'อ้าปาก (口) พูดว่า โอเค ทำได้เลย (可以)',
          body_gesture: 'พยักหน้าพร้อมทำมือโอเค 👌'
        },
        {
          id: 'hsk1_0412',
          hanzi: '吧',
          pinyin: 'ba',
          display_pinyin: 'ba',
          pinyin_tone: 'ba5',
          meaning_th: 'เถอะ, สิ, นะ (ลงท้ายชวน/ขอร้องนุ่มนวล)',
          meaning_en: 'modal particle (soft suggestion)',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 7,
          mnemonic: 'ปาก (口) พูดคำลงท้ายอ้อนวอนอย่างน่ารัก = เถอะ/นะ',
          kid_mnemonic: 'ปาก (口) พูดคำลงท้ายอ้อนวอนอย่างน่ารัก ลดหน่อยนะ (吧)',
          body_gesture: 'สองมือพนมกุมระดับอกเอียงคอยิ้มหวาน'
        }
      ],
      tone_rule: {
        rule_name: 'กฎ 3+3 Sandhi ของ 可以 (kéyǐ) และ 一点儿 (yì diǎnr)',
        description_th: 'คำว่า 可以 (kě + yǐ) เป็นเสียง 3 ติดกัน ผันเป็น kéyǐ และ 一 หน้าเสียง 3 ผันเป็น yì diǎnr',
        example: '可以 ➔ kéyǐ, 一点儿 ➔ yì diǎnr, 不贵 ➔ bú guì',
        fun_metaphor: 'เวลาขอร้องพ่อค้าเสียงนุ่มนวล kěyǐ สไลด์ขึ้นเป็น kéyǐ น่ารักน่าเอ็นดูจนพ่อค้ายอมลดให้!',
        reassurance: 'เติมคำว่า 吧 (ba) ท้ายประโยค ช่วยให้น้ำเสียงสุภาพขึ้น 300% เลยจ้า!'
      },
      grammar_bite: {
        title: 'สูตรประโยคต่อรองราคามืออาชีพ',
        explanation_th: 'จำสูตรประโยคต่อราคา: 太贵了，便宜一点儿吧！ (แพงเกินไป ลดให้หน่อยนะ)',
        patterns: [
          {
            formula: '太贵了，便宜一点儿吧！ = แพงไปหน่อย ลดหน่อยนะครับ!',
            zh: '太贵了，便宜一点儿吧！',
            pinyin: 'Tài guì le, piányi yì diǎnr ba!',
            th: 'แพงไปหน่อย ลดให้หน่อยสิครับ!',
            en: "It's too expensive, make it a bit cheaper please!"
          },
          {
            formula: '[ราคา] + 块可以吗？ = ...หยวนได้ไหมครับ?',
            zh: '三十块可以吗？',
            pinyin: 'Sānshí kuài kéyǐ ma?',
            th: '30 หยวนได้ไหมครับ?',
            en: 'Is 30 yuan okay?'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '你好老板！这个杯子多少钱？',
          pinyin: 'Nǐ hǎo lǎobǎn! Zhè ge bēizi duōshao qián?',
          th: 'สวัสดีครับเถ้าแก่! แก้วใบนี้เท่าไหร่ครับ?',
          en: 'Hello boss! How much is this cup?'
        },
        {
          speaker: 'B',
          speaker_name: 'พ่อค้า 🧑',
          zh: '五十块。',
          pinyin: 'Wǔshí kuài.',
          th: '50 หยวนครับ',
          en: '50 yuan.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '太贵了！便宜一点儿吧，三十块可以吗？',
          pinyin: 'Tài guì le! Piányi yì diǎnr ba, sānshí kuài kéyǐ ma?',
          th: 'แพงเกินไปแล้วครับ! ลดหน่อยนะครับ 30 หยวนได้ไหมครับ?',
          en: 'Too expensive! Cheaper please, is 30 yuan okay?'
        },
        {
          speaker: 'B',
          speaker_name: 'พ่อค้า 🧑',
          zh: '好吧，三十块给你！',
          pinyin: 'Hǎo ba, sānshí kuài gěi nǐ!',
          th: 'ก็ได้ครับ 30 หยวนให้คุณเลย!',
          en: 'Alright, 30 yuan for you!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '谢谢你！再见！',
          pinyin: 'Xièxie nǐ! Zàijiàn!',
          th: 'ขอบคุณครับ แล้วพบกันใหม่ครับ!',
          en: 'Thank you! Goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '可以' (ได้/สามารถ) ออกเสียงจริงตามกฎ Tone Sandhi 3+3 อย่างไร?",
          options: [
            'kéyǐ',
            'kěyǐ',
            'kèyǐ',
            'kēyī'
          ],
          correct_index: 0,
          explanation_th: 'คำว่า kě (เสียง 3) + yǐ (เสียง 3) ผันเสียงตามกฎ 3+3 เป็น kéyǐ!',
          encouragement: 'ฟังเสียงผันวรรณยุกต์ได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '贵' (แพง) มีส่วนประกอบด้านล่างเป็นรูปหอยเบี้ยโบราณคือหมวดนำใด?",
          options: [
            'หมวดทรัพย์สมบัติ/เปลือกหอย (贝 贝字底)',
            'หมวดพบเห็น (见)',
            'หมวดพระจันทร์ (月)',
            'หมวดดวงอาทิตย์ (日)'
          ],
          correct_index: 0,
          explanation_th: 'ในอดีตคนจีนใช้เปลือกหอย 贝 เป็นเงินตรา ดังนั้นคำว่า 贵 (แพง) จึงมีหมวดนำ 贝 อยู่ด้านล่าง!',
          encouragement: 'จำรากศัพท์เปลือกหอยมีค่าได้แม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยคต่อราคา: "แพงไปหน่อย ลดให้หน่อยสิครับ"',
          tokens: ['吧', '便宜', '太贵了', '一点儿'],
          correct_sequence: ['太贵了', '便宜', '一点儿', '吧'],
          pinyin: 'Tài guì le, piányi yì diǎnr ba',
          meaning_th: 'แพงไปหน่อย ลดนิดนึงนะ',
          explanation_th: 'เรียงตามลำดับ: 太贵了 (แพงเกินไป) + 便宜一点儿 (ถูกลงนิดหน่อย) + 吧 (เถอะ/นะ)',
          encouragement: 'ต่อราคามือโปรมาก เรียงได้ถูกต้อง 100%!'
        },
        {
          type: 'flash_recall',
          question_th: 'หากต้องการให้น้ำเสียงการต่อรองราคาฟังดูสุภาพ นุ่มนวล และเป็นมิตร ควรเติมคำลงท้ายประโยคคำใด?',
          options: [
            '吧 (ba)',
            '吗 (ma)',
            '呢 (ne)',
            '了 (le)'
          ],
          correct_index: 0,
          explanation_th: 'คำลงท้าย 吧 (ba) ใช้แสดงการเสนอแนะอย่างนุ่มนวลและเป็นมิตร ช่วยให้พ่อค้าใจอ่อนลดราคาให้!',
          encouragement: 'เข้าใจน้ำเสียงการสื่อสารภาษาจีนได้อย่างลึกซึ้ง!'
        }
      ],
      boss_challenge: {
        scenario_th: 'พ่อค้าในตลาดเมืองหังโจวบอกราคาเสื้อยืดตัวละ 80 หยวน (八十块) คุณคิดว่าแพงไป อยากขอให้ลดลงเหลือ 50 หยวน (五十块) อย่างสุภาพและน่ารัก ต้องพูดอย่างไร?',
        options: [
          '太贵了，便宜一点儿吧！五十块可以吗？ (Tài guì le, piányi yì diǎnr ba! Wǔshí kuài kéyǐ ma?)',
          '不要，太便宜了。 (Bú yào, tài piányi le.)',
          '不客气，再见。 (Bú kèqi, zàijiàn.)',
          '我不买面条。 (Wǒ bù mǎi miàntiáo.)'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคต่อรองราคาทองคำ: 太贵了，便宜一点儿吧！五十块可以吗？ ครบเครื่อง สุภาพ และได้ราคาถูกใจ!',
        encouragement: 'ยินดีด้วย! คุณต่อราคาเสื้อยืดสำเร็จ ประหยัดเงินไปได้ถึง 30 หยวน!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u04_l02',
        badge_name: 'เซียนต่อราคาคารมทอง 🤝🐰',
        message_th: 'ยินดีด้วยนะคนเก่ง! วันนี้คุณต่อรองราคาอย่างสุภาพและใช้คำลงท้าย 吧 ได้อย่างเป็นธรรมชาติแล้ว!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't1_u04_l03',
      lesson_number: 3,
      title: {
        zh: '要这个不要那个',
        th: 'เอาอันนี้ ไม่เอาอันนั้น',
        en: 'Making Decisions & Totals'
      },
      can_do: {
        th: 'ตัดสินใจเลือกซื้อ แยกแยะ 要 (จะเอา) กับ 想 (แค่อยากได้) สรุปจำนวนเงิน และจ่ายเงินได้อย่างมั่นใจ',
        en: 'Express purchasing decisions, distinguish 要 vs 想, ask total amount, and hand over money'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พูดสรุปกับคนขายได้ว่า "ฉันจะเอาอันนี้ ไม่เอาอันนั้น ทั้งหมดเท่าไหร่?" ได้อย่างมั่นใจ!',
      vocabulary: [
        {
          id: 'hsk1_0413',
          hanzi: '要',
          pinyin: 'yào',
          display_pinyin: 'yào',
          pinyin_tone: 'yao4',
          meaning_th: 'จะเอา, ต้องการซื้อแน่ (Action-oriented)',
          meaning_en: 'to want, to take, to buy',
          radical: '覀',
          radical_name_th: 'หมวดปิดคลุม (覀字头)',
          stroke_count: 9,
          mnemonic: 'ผู้หญิง (女) ตัดสินใจอย่างเด็ดขาดว่า จะเอา ของชิ้นนี้!',
          kid_mnemonic: 'ผู้หญิง (女) ตัดสินใจอย่างเด็ดขาดว่า จะเอา (要) ของชิ้นนี้!',
          body_gesture: 'พยักหน้าสองมือดึงเข้าหาตัว สื่อถึงการตัดสินใจเอาแน่'
        },
        {
          id: 'hsk1_0414',
          hanzi: '买',
          pinyin: 'mǎi',
          display_pinyin: 'mǎi',
          pinyin_tone: 'mai3',
          meaning_th: 'ซื้อ',
          meaning_en: 'to buy',
          radical: '乙',
          radical_name_th: 'หมวดเส้นตวัดสอง (乙字部)',
          stroke_count: 6,
          mnemonic: 'ควักเงินซื้อของใส่ตะกร้ากลับบ้าน = ซื้อ (买)',
          kid_mnemonic: 'ควักเงินซื้อของใส่ตะกร้ากลับบ้าน = ซื้อ (买)',
          body_gesture: 'ทำท่าหยิบสินค้าใส่ถุงช็อปปิ้ง'
        },
        {
          id: 'hsk1_0415',
          hanzi: '给',
          pinyin: 'gěi',
          display_pinyin: 'gěi',
          pinyin_tone: 'gei3',
          meaning_th: 'ให้, มอบให้',
          meaning_en: 'to give, to hand over',
          radical: '纟',
          radical_name_th: 'หมวดเส้นไหม (绞丝旁)',
          stroke_count: 9,
          mnemonic: 'ใช้เชือกไหม (纟) ผูกของขวัญร่วมกัน (合) เพื่อ มอบให้ = ให้',
          kid_mnemonic: 'ใช้เชือกไหม (纟) ผูกของขวัญร่วมกัน (合) เพื่อ มอบให้ (给)',
          body_gesture: 'สองมือยื่นของ/เงินไปข้างหน้าอย่างสุภาพ'
        },
        {
          id: 'hsk1_0416',
          hanzi: '想',
          pinyin: 'xiǎng',
          display_pinyin: 'xiǎng',
          pinyin_tone: 'xiang3',
          meaning_th: 'อยาก, คิดอยากได้ (Desire-oriented / ยังไม่ตัดสินใจซื้อแน่นอน)',
          meaning_en: 'would like to, want to, to think',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 13,
          mnemonic: 'ตาดูต้นไม้ (木) สังเกต (相) แล้วใช้หัวใจ (心) ใคร่ครวญ = อยาก/คิด',
          kid_mnemonic: 'เอาใจ (心) จดจ่อคิดฝันอยากได้ของเล่นชิ้นโปรด = อยาก (想)',
          body_gesture: 'เอาปลายนิ้วชี้แตะที่ขมับทำท่าครุ่นคิด'
        },
        {
          id: 'hsk1_0417',
          hanzi: '一共',
          pinyin: 'yígòng',
          display_pinyin: 'yí gòng',
          pinyin_tone: 'yi1gong4',
          sandhi_rule: 'yi',
          meaning_th: 'รวมทั้งหมด',
          meaning_en: 'in total, altogether',
          radical: '一',
          radical_name_th: 'หมวดเส้นขวาง (一部)',
          stroke_count: 7,
          mnemonic: 'รวมทุกอย่างเป็นหนึ่งเดียว (一) ทั้งหมด (共) = รวมทั้งหมด',
          kid_mnemonic: 'รวมทุกอย่างเป็นหนึ่งเดียว (一) ทั้งหมด (共) = รวมทั้งหมด (一共)',
          body_gesture: 'วาดแขนสองข้างโอบเข้ามารวมกันตรงกลาง'
        }
      ],
      tone_rule: {
        rule_name: 'กฎการผันเสียงของ 一共 (yí gòng) และ 不要 (bú yào)',
        description_th: 'คำว่า 一 และ 不 เมื่อนำหน้าพยางค์เสียงที่ 4 (共 gòng, 要 yào) จะผันเสียงเป็นเสียง 2 คือ yí gòng และ bú yào',
        example: '一共 ➔ yí gòng, 不要 ➔ bú yào, 给你 ➔ géi nǐ (3+3)',
        fun_metaphor: 'เจอคำเสียง 4 ทั้ง 一 และ 不 กระโดดเป็นเสียง 2 ทันที yí gòng และ bú yào จำง่ายมาก!',
        reassurance: 'ออกเสียง yí gòng และ bú yào ได้คล่องแคล่ว ฟังดูโปรสุดๆ!'
      },
      grammar_bite: {
        title: 'ความแตกต่างระหว่าง 要 (เอาแน่) กับ 想 (แค่อยาก)',
        explanation_th: '我要买 = ฉันจะซื้อแน่ (หยิบเงินแล้ว), 我想买 = ฉันอยากซื้อจัง (ยังไม่ได้ตัดสินใจซื้อทันที)',
        patterns: [
          {
            formula: '我 + 要 + [สิ่งของ] = ฉันจะเอาสิ่งนี้ (ตัดสินใจซื้อแล้ว)',
            zh: '我要这个。',
            pinyin: 'Wǒ yào zhè ge.',
            th: 'ฉันเอาอันนี้',
            en: 'I want this one.'
          },
          {
            formula: '我 + 不 + 要 + [สิ่งของ] = ฉันไม่เอาสิ่งนี้',
            zh: '我不要那个。',
            pinyin: 'Wǒ bú yào nà ge.',
            th: 'ฉันไม่เอาอันนั้น',
            en: 'I do not want that one.'
          },
          {
            formula: '一共 + 多少钱？ = รวมทั้งหมดเท่าไหร่?',
            zh: '一共多少钱？',
            pinyin: 'Yígòng duōshao qián?',
            th: 'รวมทั้งหมดเท่าไหร่ครับ?',
            en: 'How much in total?'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '你好！我想买这个，不要那个。',
          pinyin: 'Nǐ hǎo! Wǒ xiǎng mǎi zhè ge, bú yào nà ge.',
          th: 'สวัสดีครับ! ผมอยากซื้ออันนี้ ไม่เอาอันนั้นครับ',
          en: 'Hello! I want to buy this one, not that one.'
        },
        {
          speaker: 'B',
          speaker_name: 'พ่อค้า 🧑',
          zh: '好的。你要几个？',
          pinyin: 'Hǎode. Nǐ yào jǐ ge?',
          th: 'ได้ครับ คุณจะเอากี่ชิ้นครับ?',
          en: 'Okay. How many do you want?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '我要两个这个。一共多少钱？',
          pinyin: 'Wǒ yào liǎng ge zhè ge. Yí gòng duōshao qián?',
          th: 'ผมเอาอันนี้ 2 ชิ้นครับ รวมทั้งหมดเท่าไหร่ครับ?',
          en: 'I want two of this one. How much in total?'
        },
        {
          speaker: 'B',
          speaker_name: 'พ่อค้า 🧑',
          zh: '一共四十块。',
          pinyin: 'Yígòng sìshí kuài.',
          th: 'รวมทั้งหมด 40 หยวนครับ',
          en: 'Forty yuan in total.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '给你五十块。谢谢！',
          pinyin: 'Géi nǐ wǔshí kuài. Xièxie!',
          th: 'นี่ครับให้เงิน 50 หยวน ขอบคุณครับ!',
          en: 'Here is 50 yuan for you. Thank you!'
        },
        {
          speaker: 'B',
          speaker_name: 'พ่อค้า 🧑',
          zh: '找你十块。不客气，再见！',
          pinyin: 'Zhǎo nǐ shí kuài. Bú kèqi, zàijiàn!',
          th: 'ทอนให้ 10 หยวนครับ ไม่เป็นไร แล้วพบกันใหม่ครับ!',
          en: "Here is 10 yuan change. You're welcome, goodbye!"
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '一共' (รวมทั้งหมด) ออกเสียงพินอินตามกฎ Tone Sandhi อย่างไร?",
          options: [
            'yí gòng',
            'yì gòng',
            'yī gòng',
            'yǐ gòng'
          ],
          correct_index: 0,
          explanation_th: '一 อยู่หน้าพยางค์เสียงที่ 4 (共 gòng) ผันเสียงเป็นเสียงที่ 2 คือ yí gòng!',
          encouragement: 'ฟังออกชัดเจนและจำกฎผันเสียงได้แม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '想' (อยาก/คิด) มีหมวดนำบอกอารมณ์ความรู้สึกข้างล่างคือหมวดใด?",
          options: [
            'หมวดหัวใจ (心 心字底)',
            'หมวดไม้ (木)',
            'หมวดดวงตา (目)',
            'หมวดปาก (口)'
          ],
          correct_index: 0,
          explanation_th: 'ความอยากหรือความคิดเกิดจากหัวใจ ดังนั้น 想 จึงมีหมวดนำ 心 (หัวใจ) อยู่ด้านล่าง!',
          encouragement: 'จดจำรากศัพท์หมวดหัวใจได้ยอดเยี่ยม!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยคถามราคารวม: "รวมทั้งหมดเท่าไหร่?"',
          tokens: ['多少钱', '一共'],
          correct_sequence: ['一共', '多少钱'],
          pinyin: 'Yígòng duōshao qián?',
          meaning_th: 'รวมทั้งหมดเท่าไหร่?',
          explanation_th: 'โครงสร้างถามราคารวมคือ: 一共 (รวมทั้งหมด) + 多少钱？ (เท่าไหร่)',
          encouragement: 'เรียงประโยคสรุปยอดเงินได้คล่องแคล่ว!'
        },
        {
          type: 'flash_recall',
          question_th: 'หากคุณตัดสินใจจะควักเงินซื้อของชิ้นนี้แน่นอนแล้ว ควรพูดว่าอย่างไร?',
          options: [
            '我要买这个。 (Wǒ yào mǎi zhè ge.)',
            '我想买这个。 (Wǒ xiǎng mǎi zhè ge.)',
            '我给买这个。 (Wǒ gěi mǎi zhè ge.)',
            '我不要买这个。 (Wǒ bú yào mǎi zhè ge.)'
          ],
          correct_index: 0,
          explanation_th: '要 แสดงการตัดสินใจซื้ออย่างแน่วแน่แน่นอน (Action-oriented) จึงพูดว่า 我要买这个 (ส่วน 想 แสดงเพียงแค่ความอยากในใจ)!',
          encouragement: 'เข้าใจความลึกซึ้งของการเลือกใช้คำศัพท์จีนได้ยอดเยี่ยม!'
        }
      ],
      boss_challenge: {
        scenario_th: 'แคชเชียร์แจ้งยอดรวมว่า "一共六十块" (รวมทั้งหมด 60 หยวน) คุณถือแบงก์ 100 หยวนในมือ ต้องการยื่นให้พร้อมพูดอย่างสุภาพว่า "นี่ครับ ให้เงิน 100 หยวน" ต้องพูดอย่างไร?',
        options: [
          '给你一百块。 (Géi nǐ yì bǎi kuài.)',
          '我不要一百块。 (Wǒ bú yào yì bǎi kuài.)',
          '太贵了一百块。 (Tài guì le yì bǎi kuài.)',
          '我想一百块。 (Wǒ xiǎng yì bǎi kuài.)'
        ],
        correct_index: 0,
        explanation_th: 'การยื่นเงินให้ผู้รับอย่างสุภาพใช้คำว่า 给 (gěi - ให้/ยื่นให้): 给你一百块 (ให้คุณ 100 หยวนครับ)!',
        encouragement: 'ยินดีด้วย! คุณจ่ายเงินชำระค่าสินค้าได้อย่างถูกต้องและสุภาพ!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u04_l03',
        badge_name: 'เจ้าของกระเป๋าตังค์ใบโต 💳🐰',
        message_th: 'ยินดีด้วยนะคนเก่ง! วันนี้คุณเลือกซื้อ สรุปยอดเงิน และจ่ายเงินภาษาจีนได้อย่างมั่นใจแล้ว!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't1_u04_l04',
      lesson_number: 4,
      title: {
        zh: '城隍庙淘纪念品通关',
        th: 'Boss Challenge: ต่อราคาของฝากเฉินหวงเมี่ยว',
        en: 'Boss Challenge: Souvenir Bargaining'
      },
      can_do: {
        th: 'บูรณาการทักษะการถามราคา ต่อรองราคา สรุปยอด และจ่ายเงินในสถานการณ์ช็อปปิ้งจริงได้อย่างราบรื่น',
        en: 'Integrate bargaining, total calculation, and payment in real-world shopping scenarios'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สวมบทบาทต่อรองราคาของฝากในเซี่ยงไฮ้สำเร็จ จ่ายเงินเสร็จสรรพ ยิ้มรับของฝากกลับบ้าน!',
      vocabulary: [
        {
          id: 'hsk1_0418',
          hanzi: '老板',
          pinyin: 'lǎobǎn',
          display_pinyin: 'láobǎn',
          pinyin_tone: 'lao3ban3',
          sandhi_rule: '3+3',
          meaning_th: 'เถ้าแก่, เจ้าของร้าน',
          meaning_en: 'boss, shopkeeper',
          radical: '老',
          radical_name_th: 'หมวดคนแก่ (老字头)',
          stroke_count: 14,
          mnemonic: 'ผู้ใหญ่ (老) ผู้ถือแผ่นป้ายไม้ (板) ดูแลร้านค้า = เถ้าแก่',
          kid_mnemonic: 'คุณลุงเจ้าของร้านใจดี ยิ้มต้อนรับพวกเรา = เถ้าแก่ (老板)',
          body_gesture: 'ประสานสองมือกุมคารวะทักทายเถ้าแก่'
        },
        {
          id: 'hsk1_0419',
          hanzi: '东西',
          pinyin: 'dōngxi',
          display_pinyin: 'dōngxi',
          pinyin_tone: 'dong1xi5',
          meaning_th: 'สิ่งของ, ข้าวของ',
          meaning_en: 'thing, stuff',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 14,
          mnemonic: 'ทิศตะวันออก (东) ถึงทิศตะวันตก (西) มีสินค้าหลากหลาย = สิ่งของ',
          kid_mnemonic: 'ของฝากเต็มกระเป๋า หอบกลับบ้านกันเถอะ! = สิ่งของ (东西)',
          body_gesture: 'สองมือหอบสิ่งของเต็มอ้อมแขน'
        }
      ],
      tone_rule: {
        rule_name: 'กฎ 3+3 Sandhi ของ 老板 (láobǎn)',
        description_th: 'คำว่า 老 (lǎo เสียง 3) + 板 (bǎn เสียง 3) ผันเสียงคำหน้าเป็นเสียง 2 คือ láobǎn',
        example: '老板 ➔ láobǎn, 可以 ➔ kéyǐ, 给你 ➔ géi nǐ',
        fun_metaphor: 'ทักทายเถ้าแก่ด้วยเสียงสไลด์นุ่มนวล láobǎn เถ้าแก่ได้ยินแล้วอารมณ์ดียอมลดราคาให้ทันที!',
        reassurance: 'คำว่า 老板 เป็นคำเรียกพ่อค้าแม่ค้าที่นิยมใช้ที่สุดในประเทศจีน!'
      },
      grammar_bite: {
        title: 'สูตรช็อปปิ้งครบวงจรตั้งแต่ทักทายถึงบอกลา',
        explanation_th: 'ถามราคา ➔ ต่อรอง ➔ ระบุจำนวน ➔ ชำระเงิน ➔ ขอบคุณและบอกลา',
        patterns: [
          {
            formula: '老板，这个多少钱？ = เถ้าแก่ครับ อันนี้เท่าไหร่?',
            zh: '老板，这个多少钱？',
            pinyin: 'Láobǎn, zhè ge duōshao qián?',
            th: 'เถ้าแก่ครับ อันนี้เท่าไหร่ครับ?',
            en: 'Boss, how much is this?'
          },
          {
            formula: '太贵了，便宜一点儿吧！ = แพงไปหน่อย ลดให้หน่อยนะ!',
            zh: '太贵了，便宜一点儿吧！',
            pinyin: 'Tài guì le, piányi yì diǎnr ba!',
            th: 'แพงไปหน่อย ลดให้หน่อยสิครับ!',
            en: 'Too expensive, cheaper please!'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '老板，你好！',
          pinyin: 'Láobǎn, nǐ hǎo!',
          th: 'เถ้าแก่ครับ สวัสดีครับ!',
          en: 'Boss, hello!'
        },
        {
          speaker: 'B',
          speaker_name: 'เถ้าแก่ 🧑‍💼',
          zh: '你好！欢迎！你买什么东西？',
          pinyin: 'Nǐ hǎo! Huānyíng! Nǐ mǎi shénme dōngxi?',
          th: 'สวัสดีจ้า! ยินดีต้อนรับ! เธอจะซื้อของอะไรจ๊ะ?',
          en: 'Hello! Welcome! What stuff do you want to buy?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '这个茶杯多少钱？',
          pinyin: 'Zhè ge chábēi duōshao qián?',
          th: 'ถ้วยชาใบนี้เท่าไหร่ครับ?',
          en: 'How much is this teacup?'
        },
        {
          speaker: 'B',
          speaker_name: 'เถ้าแก่ 🧑‍💼',
          zh: '这个三十块钱一个。',
          pinyin: 'Zhè ge sānshí kuài qián yí ge.',
          th: 'ใบนี้ 30 หยวนต่อชิ้นจ้า',
          en: 'This is 30 yuan each.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '太贵了！我是泰国人，便宜一点儿吧！二十块可以吗？',
          pinyin: 'Tài guì le! Wǒ shì Tàiguó rén, piányi yì diǎnr ba! Èrshí kuài kéyǐ ma?',
          th: 'แพงไปหน่อยครับ! ผมเป็นคนไทย ลดให้นิดนึงนะครับ! 20 หยวนได้ไหมครับ?',
          en: 'Too expensive! I am Thai, make it a bit cheaper please! Is 20 yuan okay?'
        },
        {
          speaker: 'B',
          speaker_name: 'เถ้าแก่ 🧑‍💼',
          zh: '哈哈，泰国朋友！好，二十块可以！你要几个？',
          pinyin: 'Hāhā, Tàiguó péngyou! Hǎo, èrshí kuài kéyǐ! Nǐ yào jǐ ge?',
          th: 'ฮ่าๆ เพื่อนชาวไทย! โอเค 20 หยวนได้! เธอจะเอากี่ชิ้น?',
          en: 'Haha, Thai friend! Okay, 20 yuan is fine! How many do you want?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '我要两个！一共四十块。给你五十块。',
          pinyin: 'Wǒ yào liǎng ge! Yí gòng sìshí kuài. Géi nǐ wǔshí kuài.',
          th: 'ผมเอา 2 ชิ้นครับ! รวมทั้งหมด 40 หยวน นี่ครับให้เงิน 50 หยวนครับ',
          en: 'I want two! Total 40 yuan. Here is 50 yuan for you.'
        },
        {
          speaker: 'B',
          speaker_name: 'เถ้าแก่ 🧑‍💼',
          zh: '找你十块。谢谢，再见！',
          pinyin: 'Zhǎo nǐ shí kuài. Xièxie, zàijiàn!',
          th: 'ทอนให้ 10 หยวนจ้า ขอบคุณนะ แล้วพบกันใหม่!',
          en: "Here is 10 yuan change. Thank you, goodbye!"
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '谢谢老板，再见！',
          pinyin: 'Xièxie láobǎn, zàijiàn!',
          th: 'ขอบคุณครับเถ้าแก่ บ๊ายบายครับ!',
          en: 'Thank you boss, goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '老板' (เถ้าแก่) ออกเสียงพินอินตามกฎ Tone Sandhi 3+3 อย่างไร?",
          options: [
            'láobǎn',
            'lǎobǎn',
            'lǎobàn',
            'lāobǎn'
          ],
          correct_index: 0,
          explanation_th: 'lǎo (เสียง 3) + bǎn (เสียง 3) ผันเสียงคำหน้าเป็นเสียง 2 คือ láobǎn!',
          encouragement: 'ฟังเสียงคำศัพท์ได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '东' ใน '东西' (สิ่งของ) มีรากศัพท์มาจากหมวดนำใด?",
          options: [
            'หมวดไม้ (木)',
            'หมวดดวงอาทิตย์ (日)',
            'หมวดปาก (口)',
            'หมวดทองคำ (钅)'
          ],
          correct_index: 0,
          explanation_th: 'ตัวอักษร 东 มีหมวดนำคือ 木 (ไม้) ซ่อนอยู่ตรงกลาง สื่อถึงดวงอาทิตย์ขึ้นหลังดงไม้ทางทิศตะวันออก!',
          encouragement: 'จดจำรากศัพท์ได้ลึกซึ้งมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยคต่อราคาแบบมือโปร:',
          tokens: ['可以吗', '二十块', '便宜一点儿吧', '太贵了'],
          correct_sequence: ['太贵了', '便宜一点儿吧', '二十块', '可以吗'],
          pinyin: 'Tài guì le, piányi yì diǎnr ba, èrshí kuài kéyǐ ma?',
          meaning_th: 'แพงไปหน่อย ลดให้หน่อยนะครับ 20 หยวนได้ไหมครับ?',
          explanation_th: 'เรียงตามลำดับ: 太贵了 (แพงเกินไป) + 便宜一点儿吧 (ลดหน่อยนะ) + 二十块 (20 หยวน) + 可以吗 (ได้ไหม)',
          encouragement: 'สุดยอดดด! เรียงประโยคต่อราคาสมบูรณ์แบบ!'
        },
        {
          type: 'flash_recall',
          question_th: 'ตัวเลข "40 หยวน" ในภาษาจีนพูดว่าอย่างไร? (ทบทวน Unit 2)',
          options: [
            '四十块 (Sìshí kuài)',
            '十四块 (Shísì kuài)',
            '四块 (Sì kuài)',
            '四点块 (Sì diǎn kuài)'
          ],
          correct_index: 0,
          explanation_th: '40 คือ สี่สิบ = 四十 (Sìshí) ตามด้วยหน่วยเงิน 块 รวมเป็น 四十块 (Sìshí kuài)!',
          encouragement: 'บูรณาการตัวเลขจาก Unit 2 ได้อย่างแม่นยำ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณกำลังต่อรองราคาพัดจีนโบราณที่วัดเฉินหวงเมี่ยวเซี่ยงไฮ้ เถ้าแก่บอกราคา 40 หยวน (四十块) คุณต้องการต่อรองเหลือ 30 หยวนอย่างสุภาพ ซื้อจำนวน 2 ด้าม และขอบคุณเถ้าแก่ คุณควรพูดอย่างไร?',
        options: [
          '老板，太贵了，三十块可以吗？好，我要两个，一共六十块。给你钱，谢谢！ (Láobǎn, tài guì le, sānshí kuài kéyǐ ma? Hǎo, wǒ yào liǎng ge, yí gòng liùshí kuài. Géi nǐ qián, xièxie!)',
          '不要，我不是中国人。 (Bú yào, wǒ bú shì Zhōngguó rén.)',
          '六十块太便宜了，我买二个。 (Liùshí kuài tài piányi le, wǒ mǎi èr ge.)',
          '你好，现在几点？ (Nǐ hǎo, xiànzài jí diǎn?)'
        ],
        correct_index: 0,
        explanation_th: 'การต่อรองราคาครบวงจร ทั้งทักทาย ต่อรอง ระบุจำนวน และชำระเงินอย่างสุภาพคือตัวเลือกแรกที่สมบูรณ์แบบที่สุด!',
        encouragement: '🎉 มหัศจรรย์มาก! คุณพิชิต Grand Boss Challenge ของ Unit 4 และจบ Tier 1 Batch A อย่างสมเกียรติ!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u04_master',
        badge_name: 'จักรพรรดิแห่งการช็อปปิ้งเฉินหวงเมี่ยว 🏆🐰',
        message_th: 'ขอแสดงความยินดีด้วย! คุณผ่านบทเรียนช็อปปิ้งและถามราคาระดับ Tier 1 ครบทั้ง 4 บทย่อยแล้ว!',
        xp_reward: 200
      }
    }
  ]
};

// ============================================================================
// File Writing & Persistence
// ============================================================================
function writeJsonFiles() {
  const units = [
    { filename: 'unit02_numbers_time.json', data: unit02 },
    { filename: 'unit03_food_drinks.json', data: unit03 },
    { filename: 'unit04_shopping_money.json', data: unit04 },
  ];

  if (!fs.existsSync(srcTier1Dir)) fs.mkdirSync(srcTier1Dir, { recursive: true });
  if (!fs.existsSync(dataTier1Dir)) fs.mkdirSync(dataTier1Dir, { recursive: true });

  for (const { filename, data } of units) {
    const jsonStr = JSON.stringify(data, null, 2);
    const srcPath = path.join(srcTier1Dir, filename);
    const dataPath = path.join(dataTier1Dir, filename);

    fs.writeFileSync(srcPath, jsonStr, 'utf8');
    fs.writeFileSync(dataPath, jsonStr, 'utf8');

    const stat = fs.statSync(srcPath);
    console.log(`✅ Written ${filename}: ${stat.size} bytes (${(stat.size / 1024).toFixed(1)} KB)`);
  }
}

writeJsonFiles();
