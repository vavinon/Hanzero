/**
 * scripts/tier1_batch_bc/unit05.ts
 * Tier 1 Unit 5: Directions & Transit (tier1_u05)
 * Golden Template Compliant, Simplified Chinese 100%, Tone Sandhi Annotated.
 */

export const unit05 = {
  unit_id: 'tier1_u05',
  tier: 1,
  unit_number: 5,
  title: {
    zh: '问路与市内交通',
    th: 'การเดินทาง & ทิศทาง',
    en: 'Directions & Transit'
  },
  description: 'อยู่ที่ไหน เลี้ยวซ้าย เลี้ยวขวา ตรงไป นั่งรถไฟใต้ดิน และบอกคนขับแท็กซี่อย่างมั่นใจ',
  lessons: [
    {
      lesson_id: 't1_u05_l01',
      lesson_number: 1,
      title: {
        zh: '洗手间在哪儿与这里那里',
        th: 'อยู่ที่ไหน? & ห้องน้ำอยู่ที่นี่',
        en: 'Where is it? & Restroom is Here'
      },
      can_do: {
        th: 'ถามหาตำแหน่งสถานที่สำคัญ เช่น ห้องน้ำ และบอกตำแหน่งที่นี่/ที่นั่นได้ถูกต้อง',
        en: 'Ask for locations like restrooms and specify here or there correctly'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ถามหาห้องน้ำในห้างสรรพสินค้าจีนได้อย่างคล่องแคล่ว!',
      vocabulary: [
        {
          id: 'hsk1_0501',
          hanzi: '在',
          pinyin: 'zài',
          display_pinyin: 'zài',
          pinyin_tone: 'zai4',
          meaning_th: 'อยู่/อยู่ที่',
          meaning_en: 'at / in / located',
          radical: '土',
          radical_name_th: 'หมวดดิน (土字旁)',
          stroke_count: 6,
          mnemonic: 'คนยืนอยู่บนผืนดิน (土) สื่อถึงการตั้งอยู่ ณ ที่แห่งนั้น = อยู่ที่',
          kid_mnemonic: 'ปักธงลงบนดินแน่นๆ บอกว่าฉันอยู่ที่นี่นะ! = 在',
          body_gesture: 'ชี้นิ้วชี้ลงพื้นข้างหน้าอย่างมั่นใจ'
        },
        {
          id: 'hsk1_0502',
          hanzi: '哪儿',
          pinyin: 'nǎr',
          display_pinyin: 'nǎr',
          pinyin_tone: 'nar3',
          meaning_th: 'ที่ไหน',
          meaning_en: 'where',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 11,
          mnemonic: 'ใช้ปาก (口) ร้องถามหาเส้นทางว่าอยู่ที่ไหน = 哪儿',
          kid_mnemonic: 'เปิดปากร้องถาม ป้องตาซ้ายขวา เอ๊ะ อยู่ที่ไหนน้า = 哪儿',
          body_gesture: 'ยกสองมือผายออกระดับอก เอียงคอทำหน้าสงสัย'
        },
        {
          id: 'hsk1_0503',
          hanzi: '这儿',
          pinyin: 'zhèr',
          display_pinyin: 'zhèr',
          pinyin_tone: 'zher4',
          meaning_th: 'ที่นี่',
          meaning_en: 'here',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之底)',
          stroke_count: 9,
          mnemonic: 'ก้าวเดิน (辶) มาหยุด ณ จุดใกล้ตัว = ที่นี่ (这儿)',
          kid_mnemonic: 'เดินก้าวมาชี้จุดข้างเท้า นี่ไงที่นี่เลย = 这儿',
          body_gesture: 'กวักมือสองข้างเข้ามาหาตัว ชี้ลงใกล้ๆ'
        },
        {
          id: 'hsk1_0504',
          hanzi: '那儿',
          pinyin: 'nàr',
          display_pinyin: 'nàr',
          pinyin_tone: 'nar4',
          meaning_th: 'ที่นั่น',
          meaning_en: 'there',
          radical: '阝',
          radical_name_th: 'หมวดหูขวา/เนินดิน (右耳旁)',
          stroke_count: 8,
          mnemonic: 'ชี้ไปยังเนินดินที่อยู่ไกลสายตา = ที่นั่น (那儿)',
          kid_mnemonic: 'ยืดแขนชี้ไปไกลๆ โน่นไง ตรงที่นั่น = 那儿',
          body_gesture: 'ยื่นแขนขวาชี้ตรงไปข้างหน้าไกลตัว'
        },
        {
          id: 'hsk1_0505',
          hanzi: '洗手间',
          pinyin: 'xǐshǒujiān',
          display_pinyin: 'xíshǒujiān',
          pinyin_tone: 'xi3shou3jian1',
          meaning_th: 'ห้องน้ำ',
          meaning_en: 'restroom / washroom',
          radical: '氵',
          radical_name_th: 'หมวดสามหยดน้ำ (三点水)',
          stroke_count: 20,
          mnemonic: 'ห้อง (间) สำหรับล้าง (洗 - หมวดน้ำ) มือ (手) = ห้องน้ำ',
          kid_mnemonic: 'ล้างมือจ๋อมแจ๋มในห้องสะอาด = ห้องน้ำ (洗手间)',
          body_gesture: 'ทำท่าถูฝ่ามือสองข้างเหมือนกำลังล้างมือ',
          sandhi_rule: '3+3'
        }
      ],
      tone_rule: {
        rule_name: 'กฎเสียง 3 ชน 3 ในคำสามพยางค์ (洗手间: xíshǒujiān)',
        description_th: 'คำว่า 洗 (xǐ) และ 手 (shǒu) เป็นเสียง 3 ทั้งคู่ เมื่ออยู่ติดกัน พยางค์แรกจะผันเป็นเสียง 2 คือ xíshǒu แล้วตามด้วย jiān เสียง 1',
        example: '洗手间 (xǐshǒujiān -> xíshǒujiān)',
        fun_metaphor: 'น้องน้ำกับน้องมือนั่งติดกัน น้องน้ำเลยเขย่งขาขึ้นเป็นเสียง 2 เพื่อให้ลื่นไหล!',
        reassurance: 'จำแค่ง่ายๆ ว่าพูดคล่องปากเป็น xí-shǒu-jiān ฟังแล้วโปรเหมือนคนจีนแท้ๆ!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้ถามและบอกตำแหน่ง',
        explanation_th: 'ภาษาจีนถามหาตำแหน่งโดยนำ 在哪儿 ไว้ท้ายประโยค และตอบโดยใช้ 在 + สถานที่',
        patterns: [
          {
            formula: '[สิ่งของ/คน] + 在哪儿？ = ...อยู่ที่ไหน?',
            zh: '洗手间在哪儿？',
            pinyin: 'Xǐshǒujiān zài nǎr?',
            th: 'ห้องน้ำอยู่ที่ไหนครับ/ค่ะ?',
            en: 'Where is the restroom?'
          },
          {
            formula: '[สิ่งของ/คน] + 在 + [สถานที่/ทิศ] = ...อยู่ที่...',
            zh: '洗手间在这儿。',
            pinyin: 'Xǐshǒujiān zài zhèr.',
            th: 'ห้องน้ำอยู่ที่นี่ครับ/ค่ะ',
            en: 'The restroom is here.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '你好！请问洗手间在哪儿？',
          pinyin: 'Nǐ hǎo! Qǐngwèn xǐshǒujiān zài nǎr?',
          th: 'สวัสดีครับ ขอถามหน่อย ห้องน้ำอยู่ที่ไหนครับ?',
          en: 'Hello! Excuse me, where is the restroom?'
        },
        {
          speaker: 'B',
          speaker_name: 'พนักงานห้าง 👩',
          zh: '你好！洗手间在那儿。',
          pinyin: 'Nǐ hǎo! Xǐshǒujiān zài nàr.',
          th: 'สวัสดีค่ะ! ห้องน้ำอยู่ตรงโน้นค่ะ',
          en: 'Hello! The restroom is over there.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '是在前面吗？',
          pinyin: 'Shì zài qiánmiàn ma?',
          th: 'อยู่ด้านหน้าใช่ไหมครับ?',
          en: 'Is it in front?'
        },
        {
          speaker: 'B',
          speaker_name: 'พนักงานห้าง 👩',
          zh: '对，就在前面，不远。',
          pinyin: 'Duì, jiù zài qiánmiàn, bù yuǎn.',
          th: 'ใช่ค่ะ อยู่ด้านหน้าตรงนี้เอง ไม่ไกลค่ะ',
          en: 'Yes, right in front, not far.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '太好了，谢谢你！',
          pinyin: 'Tài hǎo le, xièxie nǐ!',
          th: 'เยี่ยมเลย ขอบคุณครับ!',
          en: 'Great, thank you!'
        },
        {
          speaker: 'B',
          speaker_name: 'พนักงานห้าง 👩',
          zh: '不客气！',
          pinyin: 'Bú kèqi!',
          th: 'ยินดีค่ะ/ไม่เป็นไรค่ะ!',
          en: "You're welcome!"
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ฟังเสียง 'xíshǒujiān zài nǎr' แล้วเลือกว่าหมายถึงข้อใด?",
          options: [
            'ห้องน้ำอยู่ที่ไหน?',
            'ร้านอาหารอยู่ที่นี่',
            'โรงแรมอยู่ข้างหน้า',
            'รถไฟใต้ดินไปทางไหน'
          ],
          correct_index: 0,
          explanation_th: 'xíshǒujiān คือ ห้องน้ำ และ zài nǎr คือ อยู่ที่ไหน รวมกันจึงแปลว่า ห้องน้ำอยู่ที่ไหน?',
          encouragement: 'ฟังเสียงและจับความหมายคำว่าห้องน้ำได้เป๊ะมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '洗' (ล้าง) ใน '洗手间' มีหมวดนำใดที่สื่อถึงน้ำ?",
          options: [
            'หมวดสามหยดน้ำ (氵 三点水)',
            'หมวดดิน (土)',
            'หมวดปาก (口)',
            'หมวดประตู (门)'
          ],
          correct_index: 0,
          explanation_th: "ตัวอักษร 洗 มีหมวดนำ '氵' (สามหยดน้ำ) สื่อถึงการใช้น้ำชำระล้างอย่างชัดเจน",
          encouragement: 'ยอดเยี่ยม! หมวดสามหยดน้ำเจอบ่อยมากในคำเกี่ยวกับน้ำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ห้องน้ำอยู่ที่นี่"',
          tokens: [
            '在这儿',
            '洗手间'
          ],
          correct_sequence: [
            '洗手间',
            '在这儿'
          ],
          pinyin: 'Xǐshǒujiān zài zhèr',
          meaning_th: 'ห้องน้ำอยู่ที่นี่',
          explanation_th: 'โครงสร้างบอกตำแหน่ง: สิ่งของ (洗手间) + 在 + ตำแหน่ง (这儿)',
          encouragement: 'เก่งมาก! วางประธานและตำแหน่งได้ถูกต้องเป๊ะ!'
        },
        {
          type: 'flash_recall',
          question_th: 'หากต้องการถามคนจีนว่า "อยู่ที่ไหน?" ต้องใช้คำถามว่าอย่างไร?',
          options: [
            '在哪儿？ (zài nǎr?)',
            '在这儿？ (zài zhèr?)',
            '在那儿？ (zài nàr?)',
            '多少钱？ (duōshao qián?)'
          ],
          correct_index: 0,
          explanation_th: '哪儿 (nǎr) แปลว่า ที่ไหน ดังนั้น 在哪儿 จึงแปลว่า อยู่ที่ไหน',
          encouragement: 'ตอบได้ทันใจ! คำนี้จำเป็นที่สุดเวลาหลงทาง!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณกำลังเดินอยู่ในห้างที่ปักกิ่งและต้องการเข้าห้องน้ำด่วน เดินเข้าไปถามเจ้าหน้าที่ประชาสัมพันธ์ว่าอย่างไรจึงจะสุภาพและถูกต้องที่สุด?',
        options: [
          '你好，请问洗手间在哪儿？ (Nǐ hǎo, qǐngwèn xǐshǒujiān zài nǎr?)',
          '洗手间在这儿，谢谢！ (Xǐshǒujiān zài zhèr, xièxie!)',
          '去哪儿洗手间？ (Qù nǎr xǐshǒujiān?)',
          '多少钱洗手间？ (Duōshao qián xǐshǒujiān?)'
        ],
        correct_index: 0,
        explanation_th: 'ใช้คำขึ้นต้นสุภาพ 請问 (ขอถามหน่อย) ตามด้วยคำว่า 洗手间在哪儿？ เป็นสำนวนที่สมบูรณ์แบบที่สุด!',
        encouragement: '🎉 สุภาพและเป๊ะเวอร์! เจ้าหน้าที่ห้างพร้อมชี้ทางให้ทันที!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u05_l01',
        badge_name: 'ผู้ค้นพบห้องน้ำฉับไว 🚻🐰',
        message_th: 'ยอดเยี่ยมมาก! คุณถามหาห้องน้ำและระบุพิกัดที่นี่-ที่นั่นได้คล่องตัวแล้ว!',
        xp_reward: 45
      }
    },
    {
      lesson_id: 't1_u05_l02',
      lesson_number: 2,
      title: {
        zh: '怎么走：向左向右',
        th: 'ไปอย่างไร เลี้ยวซ้ายเลี้ยวขวา',
        en: 'How to Get There: Left & Right'
      },
      can_do: {
        th: 'ถามเส้นทางเดินไปยังสถานที่ต่างๆ เข้าใจคำบอกทิศทางตรงไป เลี้ยวซ้าย เลี้ยวขวา',
        en: 'Ask how to get to places and comprehend directions like straight, turn left, turn right'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ฟังคนจีนบอกทางเลี้ยวซ้ายเลี้ยวขวาแล้วเดินไปถูกทาง!',
      vocabulary: [
        {
          id: 'hsk1_0506',
          hanzi: '去',
          pinyin: 'qù',
          display_pinyin: 'qù',
          pinyin_tone: 'qu4',
          meaning_th: 'ไป',
          meaning_en: 'go',
          radical: '厶',
          radical_name_th: 'หมวดเสี้ยว (厶字旁)',
          stroke_count: 5,
          mnemonic: 'คนกำลังก้าวขาออกจากบ้านมุ่งหน้าไปข้างหน้า = ไป (去)',
          kid_mnemonic: 'ใส่รองเท้าวิ่งกระโดด ก้าวไปข้างหน้า = 去',
          body_gesture: 'ก้าวเท้าข้างหนึ่งไปข้างหน้าพร้อมผายมือไปทางนั้น'
        },
        {
          id: 'hsk1_0507',
          hanzi: '怎么',
          pinyin: 'zěnme',
          display_pinyin: 'zěnme',
          pinyin_tone: 'zen3me',
          meaning_th: 'อย่างไร',
          meaning_en: 'how',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 9,
          mnemonic: 'ในหัวใจ (心) กำลังคิดสงสัยว่าจะทำสิ่งนี้อย่างไร = 怎么',
          kid_mnemonic: 'เอามือแตะอก คิดในใจว่าทำยังไงดีนะ = 怎么',
          body_gesture: 'ทำท่าคิด เอานิ้วชี้แตะคาง'
        },
        {
          id: 'hsk1_0508',
          hanzi: '走',
          pinyin: 'zǒu',
          display_pinyin: 'zǒu',
          pinyin_tone: 'zou3',
          meaning_th: 'เดิน/ไป',
          meaning_en: 'walk / go',
          radical: '走',
          radical_name_th: 'หมวดก้าววิ่งเดิน (走字旁)',
          stroke_count: 7,
          mnemonic: 'รูปคนกำลังแกว่งแขนก้าวขาเดินบนผืนดิน = 走',
          kid_mnemonic: 'เดินก้าวสลับขา ซ้าย ขวา ซ้าย = 走',
          body_gesture: 'ย่ำเท้าอยู่กับที่ทำท่าก้าวเดิน'
        },
        {
          id: 'hsk1_0509',
          hanzi: '往',
          pinyin: 'wǎng',
          display_pinyin: 'wǎng',
          pinyin_tone: 'wang3',
          meaning_th: 'ไปทาง/มุ่งหน้าสู่',
          meaning_en: 'towards / heading to',
          radical: '彳',
          radical_name_th: 'หมวดก้าวเท้าซ้าย (双人旁)',
          stroke_count: 8,
          mnemonic: 'ก้าวเท้า (彳) มุ่งหน้าไปตามทิศทางที่กำหนด = 往',
          kid_mnemonic: 'ลูกศรชี้บอกทาง มุ่งหน้าไปเลย = 往',
          body_gesture: 'ยื่นมือไปข้างหน้าเป็นทิศทาง'
        },
        {
          id: 'hsk1_0510',
          hanzi: '左',
          pinyin: 'zuǒ',
          display_pinyin: 'zuǒ',
          pinyin_tone: 'zuo3',
          meaning_th: 'ซ้าย',
          meaning_en: 'left',
          radical: '工',
          radical_name_th: 'หมวดช่าง (工字旁)',
          stroke_count: 5,
          mnemonic: 'มือซ้ายถือเครื่องมือช่าง (工) ทำงาน = ซ้าย (左)',
          kid_mnemonic: 'มือซ้ายหยิบของ ชี้ไปทางซ้าย = 左',
          body_gesture: 'ยกแขนซ้ายชี้ไปทางซ้ายอย่างชัดเจน'
        },
        {
          id: 'hsk1_0511',
          hanzi: '右',
          pinyin: 'yòu',
          display_pinyin: 'yòu',
          pinyin_tone: 'you4',
          meaning_th: 'ขวา',
          meaning_en: 'right',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 5,
          mnemonic: 'มือขวาหยิบอาหารเข้าปาก (口) = ขวา (右)',
          kid_mnemonic: 'มือขวาหยิบช้อนตักขนมเข้าปาก = 右',
          body_gesture: 'ยกแขนขวาชี้ไปทางขวาอย่างชัดเจน'
        },
        {
          id: 'hsk1_0512',
          hanzi: '前',
          pinyin: 'qián',
          display_pinyin: 'qián',
          pinyin_tone: 'qian2',
          meaning_th: 'หน้า/ด้านหน้า',
          meaning_en: 'front / ahead',
          radical: '刂',
          radical_name_th: 'หมวดมีดตั้ง (立刀旁)',
          stroke_count: 9,
          mnemonic: 'เรือก้าวข้ามผืนน้ำตัดผ่านไปข้างหน้า = หน้า (前)',
          kid_mnemonic: 'หน้าอกชี้ไปข้างหน้า เดินมุ่งหน้า = 前',
          body_gesture: 'ชูสองมือผลักตรงไปข้างหน้า'
        }
      ],
      tone_rule: {
        rule_name: 'กฎเสียง 3+3 ในคำบอกทิศทาง: 往左 (wáng zuǒ)',
        description_th: '往 (wǎng) เป็นเสียง 3 เมื่ออยู่หน้า 左 (zuǒ) ซึ่งเป็นเสียง 3 เช่นกัน คำว่า 往 จะผันเป็นเสียง 2 ออกเสียงว่า wáng zuǒ',
        example: '往左 (wǎng zuǒ -> wáng zuǒ)',
        fun_metaphor: 'เมื่อจะเลี้ยวซ้าย น้องหวั่งดีใจเลยกระโดดขึ้นเสียงสอง wáng zuǒ!',
        reassurance: 'ไม่ต้องกลัวลิ้นพันกัน พูดว่า wáng zuǒ นุ่มนวลและเป็นธรรมชาติสุดๆ!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้ถามทางและบอกเลี้ยวซ้ายเลี้ยวขวา',
        explanation_th: 'ถามวิธีไปสถานที่ใช้ 去 + สถานที่ + 怎么走？ และบอกทิศทางใช้ 往 + ทิศ + 走/拐 (ระบุทิศทางก่อนกริยาเสมอ)',
        patterns: [
          {
            formula: '去 + [สถานที่] + 怎么走？ = ไป...เดินไปอย่างไร?',
            zh: '去地铁站怎么走？',
            pinyin: 'Qù dìtiězhàn zěnme zǒu?',
            th: 'ไปสถานีรถไฟใต้ดินเดินไปอย่างไรครับ?',
            en: 'How do I get to the subway station?'
          },
          {
            formula: '往 + [ทิศ] + 走/拐 = [เดิน/เลี้ยว] ไปทาง [ทิศ]',
            zh: '往前走，往左拐。',
            pinyin: 'Wǎng qián zǒu, wǎng zuǒ guǎi.',
            th: 'ตรงไปข้างหน้า แล้วเลี้ยวซ้าย',
            en: 'Go straight ahead, then turn left.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '请问，去地铁站怎么走？',
          pinyin: 'Qǐngwèn, qù dìtiězhàn zěnme zǒu?',
          th: 'ขอโทษครับ ไปสถานีรถไฟใต้ดินไปอย่างไรครับ?',
          en: 'Excuse me, how do I get to the subway station?'
        },
        {
          speaker: 'B',
          speaker_name: 'คุณป้าใจดี 👵',
          zh: '你往前走，然后往右拐。',
          pinyin: 'Nǐ wǎng qián zǒu, ránhòu wǎng yòu guǎi.',
          th: 'เธอเดินตรงไปข้างหน้า แล้วเลี้ยวขวานะ',
          en: 'You go straight ahead, and then turn right.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '往右拐就到了吗？',
          pinyin: 'Wǎng yòu guǎi jiù dào le ma?',
          th: 'เลี้ยวขวาแล้วก็ถึงเลยใช่ไหมครับ?',
          en: 'Turn right and it is right there?'
        },
        {
          speaker: 'B',
          speaker_name: 'คุณป้าใจดี 👵',
          zh: '对，地铁站就在前面。',
          pinyin: 'Duì, dìtiězhàn jiù zài qiánmiàn.',
          th: 'ใช่แล้ว สถานีรถไฟใต้ดินอยู่ข้างหน้าเลยจ้ะ',
          en: 'Yes, the subway station is right in front.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '太感谢您了！',
          pinyin: 'Tài gǎnxiè nín le!',
          th: 'ขอบพระคุณคุณป้ามากครับ!',
          en: 'Thank you very much!'
        },
        {
          speaker: 'B',
          speaker_name: 'คุณป้าใจดี 👵',
          zh: '不客气，慢走！',
          pinyin: 'Bú kèqi, màn zǒu!',
          th: 'ไม่เป็นไร เดินดีๆ นะจ๊ะ!',
          en: "You're welcome, take care!"
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ได้ยินเสียง 'wǎng qián zǒu' หมายความว่าให้ทำอย่างไร?",
          options: [
            'เดินตรงไปข้างหน้า',
            'เลี้ยวซ้ายทันที',
            'เลี้ยวขวาตรงหัวมุม',
            'หยุดรอตรงนี้'
          ],
          correct_index: 0,
          explanation_th: 'wǎng qián แปลว่า ไปทางข้างหน้า และ zǒu แปลว่า เดิน รวมกันคือ เดินตรงไปข้างหน้า',
          encouragement: 'ฟังทิศทางแม่นยำมาก ไม่หลงทางแน่นอน!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '左' (ซ้าย) มีหมวดนำใดอยู่ด้านล่าง?",
          options: [
            'หมวดช่าง (工)',
            'หมวดปาก (口)',
            'หมวดดิน (土)',
            'หมวดดวงอาทิตย์ (日)'
          ],
          correct_index: 0,
          explanation_th: 'ตัวอักษร 左 มีหมวดนำ 工 (ช่าง) ด้านล่าง สื่อถึงมือซ้ายถืออุปกรณ์ช่าง',
          encouragement: 'สังเกตจุดต่างระหว่าง 左 (工) กับ 右 (口) ได้เฉียบคมมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยคภาษาจีน: "ไปสถานีรถไฟใต้ดินเดินไปอย่างไร"',
          tokens: [
            '去地铁站',
            '怎么走'
          ],
          correct_sequence: [
            '去地铁站',
            '怎么走'
          ],
          pinyin: 'Qù dìtiězhàn zěnme zǒu',
          meaning_th: 'ไปสถานีรถไฟใต้ดินเดินไปอย่างไร',
          explanation_th: 'สูตรถามทาง: 去 + สถานที่ (去地铁站) + 怎么走？',
          encouragement: 'ยอดเยี่ยมมาก! ถามทางได้เหมือนเจ้าของภาษาเป๊ะ!'
        },
        {
          type: 'flash_recall',
          question_th: 'คนไทยชอบพูด "เลี้ยวซ้าย" แต่ในภาษาจีนต้องเรียงคำอย่างไร?',
          options: [
            '往左拐 (wǎng zuǒ guǎi) - ระบุทิศทางก่อนกริยา',
            '拐左 (guǎi zuǒ)',
            '左拐往 (zuǒ guǎi wǎng)',
            '走左 (zǒu zuǒ)'
          ],
          correct_index: 0,
          explanation_th: 'ในภาษาจีนต้องวางทิศทางไว้หน้ากริยาเสมอ: 往左 (ไปทางซ้าย) + 拐 (เลี้ยว)',
          encouragement: 'ไม่ตกหลุมพรางไวยากรณ์! เก่งระดับเทพ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'มีนักท่องเที่ยวชาวต่างชาติเข้ามาถามทางคุณว่า "去地铁站怎么走？" คุณต้องการบอกเขาว่า "เดินตรงไป แล้วเลี้ยวซ้าย" ต้องพูดว่าอย่างไร?',
        options: [
          '往前走，往左拐。 (Wǎng qián zǒu, wǎng zuǒ guǎi.)',
          '拐左，走前。 (Guǎi zuǒ, zǒu qián.)',
          '洗手间在哪儿？ (Xǐshǒujiān zài nǎr?)',
          '坐出租车去吧。 (Zuò chūzūchē qù ba.)'
        ],
        correct_index: 0,
        explanation_th: 'โครงสร้างถูกต้อง 100% คือ 往前走 (ตรงไปข้างหน้า) ตามด้วย 往左拐 (เลี้ยวไปทางซ้าย)',
        encouragement: '🎉 สุดยอดผู้นำทาง! บอกทางได้อย่างมั่นใจและแม่นยำ!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u05_l02',
        badge_name: 'เข็มทิศทองคำบอกทาง 🧭🐰',
        message_th: 'สุดยอดมาก! คุณเข้าใจการบอกทิศทาง ตรงไป เลี้ยวซ้าย เลี้ยวขวาได้สมบูรณ์แบบ!',
        xp_reward: 45
      }
    },
    {
      lesson_id: 't1_u05_l03',
      lesson_number: 3,
      title: {
        zh: '坐地铁与打车',
        th: 'รถไฟใต้ดิน & แท็กซี่',
        en: 'Subway & Taxi'
      },
      can_do: {
        th: 'สื่อสารการเดินทางด้วยรถไฟใต้ดิน เรียกรถแท็กซี่ และบอกให้คนขับไปส่งยังจุดหมาย',
        en: 'Communicate transit by subway, hail taxis, and direct drivers to destinations'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นั่งแท็กซี่และรถไฟใต้ดินในปักกิ่งได้อย่างมั่นใจ!',
      vocabulary: [
        {
          id: 'hsk1_0513',
          hanzi: '坐',
          pinyin: 'zuò',
          display_pinyin: 'zuò',
          pinyin_tone: 'zuo4',
          meaning_th: 'นั่ง/โดยสาร',
          meaning_en: 'sit / ride / take (transport)',
          radical: '土',
          radical_name_th: 'หมวดดิน (土字底)',
          stroke_count: 7,
          mnemonic: 'คนสองคน (人人) นั่งลงบนผืนดิน (土) = นั่ง (坐)',
          kid_mnemonic: 'เพื่อนสองคนนั่งคุยกันบนพื้นดินอย่างสบายใจ = 坐',
          body_gesture: 'ย่อตัวลงทำท่านั่งลงบนเก้าอี้'
        },
        {
          id: 'hsk1_0514',
          hanzi: '地铁',
          pinyin: 'dìtiě',
          display_pinyin: 'dìtiě',
          pinyin_tone: 'di4tie3',
          meaning_th: 'รถไฟใต้ดิน',
          meaning_en: 'subway / metro',
          radical: '钅',
          radical_name_th: 'หมวดโลหะ (金字旁)',
          stroke_count: 16,
          mnemonic: 'รางเหล็ก (铁) ที่วิ่งอยู่ใต้แผ่นดิน (地) = รถไฟใต้ดิน (地铁)',
          kid_mnemonic: 'รถไฟเหล็กแล่นฉิวลอดใต้ดิน ปู้นๆ = 地铁',
          body_gesture: 'สองมือทำท่าสับรางรถไฟแล่นไปข้างหน้า'
        },
        {
          id: 'hsk1_0515',
          hanzi: '出租车',
          pinyin: 'chūzūchē',
          display_pinyin: 'chūzūchē',
          pinyin_tone: 'chu1zu1che1',
          meaning_th: 'แท็กซี่',
          meaning_en: 'taxi / cab',
          radical: '车',
          radical_name_th: 'หมวดรถ (车字旁)',
          stroke_count: 19,
          mnemonic: 'รถ (车) ที่ปล่อยออกไป (出) ให้เช่า (租) = แท็กซี่',
          kid_mnemonic: 'รถสีเหลืองวิ่งมารับ โบกมือเรียกแท็กซี่ = 出租车',
          body_gesture: 'ยกมือขวาขึ้นระดับไหล่ทำท่าโบกเรียกรถ'
        },
        {
          id: 'hsk1_0516',
          hanzi: '车站',
          pinyin: 'chēzhàn',
          display_pinyin: 'chēzhàn',
          pinyin_tone: 'che1zhan4',
          meaning_th: 'สถานี/ป้ายรถ',
          meaning_en: 'station / stop',
          radical: '立',
          radical_name_th: 'หมวดตั้งยืน (立字旁)',
          stroke_count: 9,
          mnemonic: 'จุดที่รถ (车) หยุดยืน (站) รับส่งคน = สถานีรถ (车站)',
          kid_mnemonic: 'ยืนรอรถที่ป้าย รอรถเมล์มาจอด = 车站',
          body_gesture: 'ยืนตรงทำท่ารอคอยอย่างใจเย็น'
        },
        {
          id: 'hsk1_0517',
          hanzi: '师傅',
          pinyin: 'shīfu',
          display_pinyin: 'shīfu',
          pinyin_tone: 'shi1fu',
          meaning_th: 'คนขับ/อาจารย์ช่าง (คำเรียกสุภาพ)',
          meaning_en: 'master / driver / polite title',
          radical: '巾',
          radical_name_th: 'หมวดผ้าเช็ดหน้า (巾字底)',
          stroke_count: 15,
          mnemonic: 'ผู้มีความเชี่ยวชาญชำนาญการในการขับขี่หรือฝีมือช่าง = 师傅',
          kid_mnemonic: 'คุณลุงคนขับแท็กซี่ใจดี ทักทายคุณลุง = 师傅',
          body_gesture: 'ประสานสองมือก้มศีรษะทักทายอย่างสุภาพ'
        },
        {
          id: 'hsk1_0518',
          hanzi: '到',
          pinyin: 'dào',
          display_pinyin: 'dào',
          pinyin_tone: 'dao4',
          meaning_th: 'ถึง/ไปถึง',
          meaning_en: 'arrive / reach / to',
          radical: '刂',
          radical_name_th: 'หมวดมีดตั้ง (立刀旁)',
          stroke_count: 8,
          mnemonic: 'ปลายทางที่ก้าวมาถึงจุดหมายอย่างแม่นยำ = 到',
          kid_mnemonic: 'วิ่งเข้าเส้นชัย ไชโยถึงที่หมายแล้ว = 到',
          body_gesture: 'ชูสองมือขึ้นแสดงความยินดีที่ถึงที่หมาย'
        }
      ],
      tone_rule: {
        rule_name: 'เสียงเบาในคำสรรพนามเรียกคน: 师傅 (shīfu)',
        description_th: 'คำว่า 傅 ปกติเป็นเสียง 4 แต่เมื่ออยู่ในคำว่า 师傅 จะออกเสียงเบาและสั้น เป็น shīfu',
        example: '师傅 (shīfu)',
        fun_metaphor: 'น้องฟู่เป็นคำลงท้ายสุภาพ เลยออกเสียงเบาๆ นุ่มนวลติดหู!',
        reassurance: 'เรียกคนขับแท็กซี่ว่า 师傅 (shīfu) รับรองคนขับยิ้มหวานบริการดีเยี่ยม!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้การเดินทางและกฎทองคำบอกสถานที่',
        explanation_th: 'บอกการโดยสารใช้ 坐 + ยานพาหนะ และจำกฎเหล็กจีน: ประธาน + 在 สถานที่ + กริยา (ทำอะไรที่ไหน ต้องบอกสถานที่ก่อนกริยา)',
        patterns: [
          {
            formula: '坐 + [พาหนะ] + 去 + [สถานที่] = นั่ง...ไป...',
            zh: '坐地铁去天安门。',
            pinyin: 'Zuò dìtiě qù Tiān\'ānmén.',
            th: 'นั่งรถไฟใต้ดินไปเทียนอันเหมิน',
            en: 'Take the subway to Tiananmen.'
          },
          {
            formula: '[ประธาน] + 在 [สถานที่] + [กริยา] = ...อยู่ที่...ทำอะไร',
            zh: '我在车站等你。',
            pinyin: 'Wǒ zài chēzhàn děng nǐ.',
            th: 'ฉันรอเธออยู่ที่สถานี (ห้ามพูด 我等你在车站 เด็ดขาด!)',
            en: 'I wait for you at the station.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '师傅，您好！去北京南站。',
          pinyin: 'Shīfu, nín hǎo! Qù Běijīng Nánzhàn.',
          th: 'คุณคนขับครับ สวัสดีครับ ไปสถานีรถไฟปักกิ่งใต้ครับ',
          en: 'Driver, hello! To Beijing South Railway Station.'
        },
        {
          speaker: 'B',
          speaker_name: 'คนขับแท็กซี่ 🚕',
          zh: '好的，请上车！系好安全带。',
          pinyin: 'Hǎode, qǐng shàng chē! Jì hǎo ānquándài.',
          th: 'ได้เลยครับ เชิญขึ้นรถ คาดเข็มขัดนิรภัยด้วยนะ',
          en: 'Okay, please get in! Fasten your seatbelt.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '请问，大概几点能到？',
          pinyin: 'Qǐngwèn, dàgài jǐ diǎn néng dào?',
          th: 'ขอถามหน่อยครับ น่าจะถึงประมาณกี่โมงครับ?',
          en: 'Excuse me, about what time will we arrive?'
        },
        {
          speaker: 'B',
          speaker_name: 'คนขับแท็กซี่ 🚕',
          zh: '二十分钟就到了，很快。',
          pinyin: 'Èrshí fēnzhōng jiù dào le, hěn kuài.',
          th: 'ยี่สิบนาทีก็ถึงแล้วจ้า เร็วมาก',
          en: 'Twenty minutes and we are there, very fast.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '好的，谢谢师傅！',
          pinyin: 'Hǎode, xièxie shīfu!',
          th: 'ขอบคุณครับคุณคนขับ!',
          en: 'Okay, thank you driver!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ฟังเสียง 'zuò dìtiě qù' หมายถึงเดินทางด้วยวิธีใด?",
          options: [
            'นั่งรถไฟใต้ดินไป',
            'นั่งรถแท็กซี่ไป',
            'เดินเท้าไป',
            'ขี่จักรยานไป'
          ],
          correct_index: 0,
          explanation_th: 'zuò คือ นั่ง/โดยสาร และ dìtiě คือ รถไฟใต้ดิน รวมกันคือ นั่งรถไฟใต้ดินไป',
          encouragement: 'ฟังคำศัพท์ยานพาหนะได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '铁' (เหล็ก) ใน '地铁' มีหมวดนำใด?",
          options: [
            'หมวดโลหะ (钅 金字旁)',
            'หมวดดิน (土)',
            'หมวดไม้ (木)',
            'หมวดน้ำ (氵)'
          ],
          correct_index: 0,
          explanation_th: '铁 (เหล็ก) มีหมวดนำ 钅 (โลหะ/ทองคำ) สื่อถึงวัสดุที่เป็นโลหะ',
          encouragement: 'จำหมวดนำโลหะ 钅 ได้แม่นยำมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ฉันรอคุณอยู่ที่สถานี"',
          tokens: [
            '等你',
            '我',
            '在车站'
          ],
          correct_sequence: [
            '我',
            '在车站',
            '等你'
          ],
          pinyin: 'Wǒ zài chēzhàn děng nǐ',
          meaning_th: 'ฉันรอเธออยู่ที่สถานี',
          explanation_th: 'กฎเหล็กภาษาจีน: ประธาน (我) + 在 สถานที่ (在车站) + กริยา (等你)',
          encouragement: 'สุดยอด! ไม่สับสนตามไวยากรณ์ไทย วางสถานที่ก่อนกริยาได้ถูกต้อง!'
        },
        {
          type: 'flash_recall',
          question_th: 'เมื่อขึ้นแท็กซี่ในจีน ควรเรียกคนขับอย่างสุภาพและเป็นมิตรว่าอย่างไร?',
          options: [
            '师傅 (shīfu)',
            '老师 (lǎoshī)',
            '学生 (xuésheng)',
            '老板 (lǎobǎn)'
          ],
          correct_index: 0,
          explanation_th: 'คนจีนนิยมเรียกคนขับรถและช่างฝีมือว่า 师傅 (shīfu) อย่างสุภาพที่สุด',
          encouragement: 'เข้าใจมารยาทและวัฒนธรรมการเดินทางของจีนอย่างแท้จริง!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณยืนรอแท็กซี่อยู่หน้าโรงแรม เมื่อแท็กซี่จอดเทียบ ต้องการบอกคนขับว่า "สวัสดีครับคุณคนขับ ไปสถานีรถไฟใต้ดินครับ" ต้องพูดว่าอย่างไร?',
        options: [
          '师傅，您好！去地铁站。 (Shīfu, nín hǎo! Qù dìtiězhàn.)',
          '我在车站等你。 (Wǒ zài chēzhàn děng nǐ.)',
          '多少钱洗手间？ (Duōshao qián xǐshǒujiān?)',
          '往前走，往右拐。 (Wǎng qián zǒu, wǎng yòu guǎi.)'
        ],
        correct_index: 0,
        explanation_th: 'การเรียก 师傅，您好！ พร้อมบอกจุดหมาย 去地铁站 เป็นประโยคขึ้นรถที่ถูกต้องและสุภาพ 100%!',
        encouragement: '🎉 สมบูรณ์แบบ! คนขับเหยียบคันเร่งมุ่งหน้าส่งคุณถึงสถานีทันที!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u05_l03',
        badge_name: 'เจ้าแห่งระบบรางและแท็กซี่ 🚇🚕',
        message_th: 'ยอดเยี่ยมมาก! คุณเรียกรถแท็กซี่และโดยสารรถไฟใต้ดินได้อย่างคล่องแคล่วแล้ว!',
        xp_reward: 45
      }
    },
    {
      lesson_id: 't1_u05_l04',
      lesson_number: 4,
      title: {
        zh: '师傅，去北京南站通关',
        th: 'Boss Challenge: ขึ้นแท็กซี่ไปสถานีรถไฟความเร็วสูง',
        en: 'Boss Challenge: Taxi to Beijing South Railway Station'
      },
      can_do: {
        th: 'บูรณาการทักษะการเดินทาง ถามราคา ทิศทาง และบอกจุดลงรถกับคนขับแท็กซี่ได้ครบวงจร',
        en: 'Integrate transit, pricing, directions, and destination communication with taxi drivers'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พิชิตบอสใหญ่ Unit 5 ขึ้นแท็กซี่ไปขึ้นรถไฟความเร็วสูงไร้อุปสรรค!',
      vocabulary: [
        {
          id: 'hsk1_0519',
          hanzi: '快',
          pinyin: 'kuài',
          display_pinyin: 'kuài',
          pinyin_tone: 'kuai4',
          meaning_th: 'เร็ว',
          meaning_en: 'fast / quick',
          radical: '忄',
          radical_name_th: 'หมวดหัวใจข้าง (竖心旁)',
          stroke_count: 7,
          mnemonic: 'จิตใจ (忄) กระตือรือร้น รวดเร็วว่องไว = 快',
          kid_mnemonic: 'วิ่งเร็วจี๋ ลมพัดปลิวฟิ้ว = 快',
          body_gesture: 'ทำแขนสองข้างวิ่งซอยเท้ารวดเร็ว'
        },
        {
          id: 'hsk1_0520',
          hanzi: '停',
          pinyin: 'tíng',
          display_pinyin: 'tíng',
          pinyin_tone: 'ting2',
          meaning_th: 'หยุด/จอด',
          meaning_en: 'stop / park',
          radical: '亻',
          radical_name_th: 'หมวดคนข้าง (单人旁)',
          stroke_count: 11,
          mnemonic: 'คน (亻) หยุดพักใต้ศาลา (亭) ริมทาง = หยุด/จอด (停)',
          kid_mnemonic: 'ยกมือขึ้น สัญญาณไฟแดงหยุดจอด = 停',
          body_gesture: 'ยกฝ่ามือขวาตั้งตรงไปข้างหน้าทำท่าสั่งหยุด'
        }
      ],
      tone_rule: {
        rule_name: 'การใช้คำว่า 快 (kuài) และการพูดบอกราคาแบบกระชับ',
        description_th: 'คำว่า 快 เป็นเสียง 4 สั้นกระชับ สื่อถึงความรวดเร็ว และใช้บอกจุดจอดรถได้ทันที',
        example: '很快 (hěn kuài), 停在前面 (tíng zài qiánmiàn)',
        fun_metaphor: 'น้องไคว่เสียง 4 ดังหนักแน่น เหมือนรถซิ่งแล่นฉิว!',
        reassurance: 'เมื่อจะลงรถ แค่บอกว่า 在前面停 (จอดข้างหน้า) คนขับก็เข้าใจทันที!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้บูรณาการบนแท็กซี่',
        explanation_th: 'รวมการบอกจุดหมาย การถามเวลา/ราคา และการบอกตำแหน่งจอดรถ',
        patterns: [
          {
            formula: '师傅，去 [สถานที่]，多少钱？ = คุณคนขับ ไป...เท่าไหร่ครับ?',
            zh: '师傅，去北京南站，多少钱？',
            pinyin: 'Shīfu, qù Běijīng Nánzhàn, duōshao qián?',
            th: 'คุณคนขับครับ ไปสถานีปักกิ่งใต้ เท่าไหร่ครับ?',
            en: 'Driver, to Beijing South Station, how much?'
          },
          {
            formula: '我在 [ตำแหน่ง] 下车 = ฉันลงรถที่...',
            zh: '我在前面下车，谢谢！',
            pinyin: 'Wǒ zài qiánmiàn xià chē, xièxie!',
            th: 'ฉันลงรถข้างหน้านี้ครับ ขอบคุณครับ!',
            en: 'I get off in front, thank you!'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '师傅，您好！去北京南站，大概多少钱？',
          pinyin: 'Shīfu, nín hǎo! Qù Běijīng Nánzhàn, dàgài duōshao qián?',
          th: 'คุณคนขับครับ สวัสดีครับ ไปสถานีปักกิ่งใต้ ประมาณเท่าไหร่ครับ?',
          en: 'Driver, hello! To Beijing South Station, about how much?'
        },
        {
          speaker: 'B',
          speaker_name: 'คนขับแท็กซี่ 🚕',
          zh: '打表大概五十块钱，半个小时能到。',
          pinyin: 'Dǎbiǎo dàgài wǔshí kuài qián, bàn ge xiǎoshí néng dào.',
          th: 'กดมิเตอร์ประมาณห้าสิบหยวน ครึ่งชั่วโมงถึงครับ',
          en: 'By meter about fifty yuan, arrive in half an hour.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '太好了！师傅，麻烦开快一点儿。',
          pinyin: 'Tài hǎo le! Shīfu, máfan kāi kuài yìdiǎnr.',
          th: 'เยี่ยมเลยครับคุณคนขับ รบกวนขับเร็วหน่อยนะครับ',
          en: 'Great! Driver, please drive a little faster.'
        },
        {
          speaker: 'B',
          speaker_name: 'คนขับแท็กซี่ 🚕',
          zh: '没问题！前面就到了。你在哪儿下车？',
          pinyin: 'Méi wèntí! Qiánmiàn jiù dào le. Nǐ zài nǎr xià chē?',
          th: 'ไม่มีปัญหา ข้างหน้านี้ก็ถึงแล้ว เธอลงรถตรงไหน?',
          en: 'No problem! Almost there ahead. Where do you get off?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '我在进站口前面停，给您六十块，不用找了！',
          pinyin: 'Wǒ zài jìnzhànkǒu qiánmiàn tíng, gěi nín liùshí kuài, búyòng zhǎo le!',
          th: 'จอดหน้าทางเข้าสถานีครับ ให้หกสิบหยวน ไม่ต้องทอนครับ!',
          en: 'Stop in front of the entrance, here is sixty yuan, keep the change!'
        },
        {
          speaker: 'B',
          speaker_name: 'คนขับแท็กซี่ 🚕',
          zh: '谢谢你啊小伙子，祝你一路平安！',
          pinyin: 'Xièxie nǐ a xiǎohuǒzi, zhù nǐ yílù píng\'ān!',
          th: 'ขอบใจนะพ่อหนุ่ม ขอให้เดินทางปลอดภัย!',
          en: 'Thank you young man, have a safe trip!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ได้ยินเสียง 'wǔshí kuài qián' หมายถึงราคาเท่าไหร่? (ทบทวน Unit 2 & 4)",
          options: [
            '50 หยวน',
            '15 หยวน',
            '5 หยวน',
            '500 หยวน'
          ],
          correct_index: 0,
          explanation_th: 'wǔshí แปลว่า 50 และ kuài qián แปลว่า หยวน (เงิน) รวมกันคือ 50 หยวน',
          encouragement: 'จำตัวเลขและเรื่องเงินได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '停' (หยุด/จอด) มีหมวดนำคนข้าง '亻' สื่อถึงอะไร?",
          options: [
            'คนกำลังหยุดพักที่ศาลาริมทาง',
            'มีดที่กำลังตัด',
            'น้ำที่กำลังไหล',
            'รถที่กำลังวิ่ง'
          ],
          correct_index: 0,
          explanation_th: 'หมวดนำ 亻 (คน) รวมกับ 亭 (ศาลา) หมายถึงคนที่หยุดพักผ่อน',
          encouragement: 'จำรากศัพท์อักษรจีนได้ลึกซึ้งมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ฉันลงรถที่ข้างหน้า"',
          tokens: [
            '下车',
            '我',
            '在前面'
          ],
          correct_sequence: [
            '我',
            '在前面',
            '下车'
          ],
          pinyin: 'Wǒ zài qiánmiàn xià chē',
          meaning_th: 'ฉันลงรถที่ด้านหน้า',
          explanation_th: 'เรียงตามกฎเหล็ก: ประธาน (我) + 在 สถานที่ (在前面) + กริยา (下车)',
          encouragement: 'เรียงลำดับประโยคบอกจุดลงรถได้อย่างไร้ที่ติ!'
        },
        {
          type: 'flash_recall',
          question_th: 'เมื่อต้องการบอกคนขับให้จอดรถข้างหน้า ควรพูดคำกริยาว่าอย่างไร?',
          options: [
            '停 (tíng) - หยุด/จอด',
            '走 (zǒu) - เดิน/ไป',
            '去 (qù) - ไป',
            '坐 (zuò) - นั่ง'
          ],
          correct_index: 0,
          explanation_th: '停 (tíng) แปลว่า หยุด หรือ จอดรถ',
          encouragement: 'จำคำศัพท์สำคัญได้รวดเร็วทันใจ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณอยู่บนแท็กซี่ใกล้ถึงสถานีรถไฟปักกิ่งใต้แล้ว คุณต้องการบอกคนขับว่า "คุณคนขับครับ จอดข้างหน้านี้ครับ ขอบคุณครับ!" ต้องพูดว่าอย่างไร?',
        options: [
          '师傅，在前面停，谢谢！ (Shīfu, zài qiánmiàn tíng, xièxie!)',
          '洗手间在哪儿？ (Xǐshǒujiān zài nǎr?)',
          '多少钱一碗面条？ (Duōshao qián yì wǎn miàntiáo?)',
          '我不去北京南站。 (Wǒ bú qù Běijīng Nánzhàn.)'
        ],
        correct_index: 0,
        explanation_th: 'ประโยค 师傅，在前面停，谢谢！ สุภาพ ตรงจุด และคนขับทุกคนเข้าใจทันที 100%!',
        encouragement: '🎉 ยินดีด้วย! คุณพิชิต Grand Boss Challenge ของ Unit 5 ได้สำเร็จอย่างงดงาม!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u05_master',
        badge_name: 'นักเดินทางทั่วมหานคร 🚇🐰',
        message_th: 'ขอปรบมือให้ดังๆ! คุณผ่านบทเรียนการเดินทางและทิศทางระดับ Tier 1 ครบทั้ง 4 บทย่อยแล้ว!',
        xp_reward: 200
      }
    }
  ]
};
