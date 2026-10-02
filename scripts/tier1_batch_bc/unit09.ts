/**
 * scripts/tier1_batch_bc/unit09.ts
 * Tier 1 Unit 9: Health & Body (tier1_u09)
 * Golden Template Compliant, Simplified Chinese 100%, Tone Sandhi Annotated.
 */

export const unit09 = {
  unit_id: 'tier1_u09',
  tier: 1,
  unit_number: 9,
  title: {
    zh: '身体不适与就医',
    th: 'ร่างกาย สุขภาพ & ไม่สบาย',
    en: 'Health & Body'
  },
  description: 'ปวดหัว ปวดท้อง เป็นไข้ หาหมอ ซื้อยาแก้ปวดที่ร้านขายยาในเซี่ยงไฮ้ รอดปลอดภัยเมื่อป่วย',
  lessons: [
    {
      lesson_id: 't1_u09_l01',
      lesson_number: 1,
      title: {
        zh: '我的身体与眼睛手脚',
        th: 'ส่วนต่างๆ ของร่างกาย',
        en: 'My Body: Head, Eyes, Hands & Feet'
      },
      can_do: {
        th: 'บอกส่วนต่างๆ ของร่างกาย ศีรษะ ดวงตา ท้อง มือ เท้า และถามไถ่สุขภาพร่างกายได้',
        en: 'Identify body parts: head, eyes, belly, hands, feet, and inquire about health'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ชี้บอกอวัยวะในร่างกายของตัวเองเป็นภาษาจีนได้อย่างแม่นยำ!',
      vocabulary: [
        {
          id: 'hsk1_0901',
          hanzi: '头',
          pinyin: 'tóu',
          display_pinyin: 'tóu',
          pinyin_tone: 'tou2',
          meaning_th: 'หัว/ศีรษะ',
          meaning_en: 'head',
          radical: '大',
          radical_name_th: 'หมวดใหญ่ (大字头)',
          stroke_count: 5,
          mnemonic: 'ศีรษะกลมโตที่มีเส้นผมสองเส้นบนยอด = หัว (头)',
          kid_mnemonic: 'เอามือแตะหัว โยกหัวไปมาดุ๊กดิ๊ก = 头',
          body_gesture: 'เอามือสองข้างแตะที่ศีรษะตัวเอง'
        },
        {
          id: 'hsk1_0902',
          hanzi: '肚子',
          pinyin: 'dùzi',
          display_pinyin: 'dùzi',
          pinyin_tone: 'du4zi',
          meaning_th: 'ท้อง',
          meaning_en: 'belly / stomach',
          radical: '月',
          radical_name_th: 'หมวดเนื้อ/ร่างกาย (肉月旁)',
          stroke_count: 10,
          mnemonic: 'เนื้อเยื่อร่างกาย (月) ส่วนหน้าท้องที่รองรับอาหาร (土) = ท้อง (肚子)',
          kid_mnemonic: 'ลูบท้องกลมๆ เวลาอิ่มหรือเวลาหิวข้าว = 肚子',
          body_gesture: 'เอามือขวาลูบวนที่หน้าท้องเบาๆ'
        },
        {
          id: 'hsk1_0903',
          hanzi: '眼睛',
          pinyin: 'yǎnjing',
          display_pinyin: 'yǎnjing',
          pinyin_tone: 'yan3jing',
          meaning_th: 'ตา/ดวงตา',
          meaning_en: 'eyes',
          radical: '目',
          radical_name_th: 'หมวดดวงตา (目字旁)',
          stroke_count: 16,
          mnemonic: 'ดวงตากลมใส (目) ที่มองเห็นประกายแสงรอบตัว = ดวงตา (眼睛)',
          kid_mnemonic: 'กะพริบตา ปิ๊งๆ มองเห็นโลกสดใส = 眼睛',
          body_gesture: 'ชี้นิ้วชี้สองข้างมาที่หางตาทั้งสองข้าง'
        },
        {
          id: 'hsk1_0904',
          hanzi: '手',
          pinyin: 'shǒu',
          display_pinyin: 'shǒu',
          pinyin_tone: 'shou3',
          meaning_th: 'มือ',
          meaning_en: 'hand',
          radical: '手',
          radical_name_th: 'หมวดมือ (手字部)',
          stroke_count: 4,
          mnemonic: 'รูปฝ่ามือที่มีนิ้วมือทั้งห้ากางออก = มือ (手)',
          kid_mnemonic: 'แบฝ่ามือโบกทักทาย ล้างมือสะอาด = 手',
          body_gesture: 'ชูสองมือขึ้นแบฝ่ามือระดับอก'
        },
        {
          id: 'hsk1_0905',
          hanzi: '脚',
          pinyin: 'jiǎo',
          display_pinyin: 'jiǎo',
          pinyin_tone: 'jiao3',
          meaning_th: 'เท้า',
          meaning_en: 'foot',
          radical: '月',
          radical_name_th: 'หมวดเนื้อ/ร่างกาย (肉月旁)',
          stroke_count: 11,
          mnemonic: 'เนื้อเยื่อร่างกาย (月) ส่วนล่างสุดที่ก้าวเดินบนผืนดิน = เท้า (脚)',
          kid_mnemonic: 'ย่ำเท้า ตึกๆ ก้าวเดินไปข้างหน้า = 脚',
          body_gesture: 'ก้มมองเท้าและย่ำเท้าเบาๆ'
        },
        {
          id: 'hsk1_0906',
          hanzi: '身体',
          pinyin: 'shēntǐ',
          display_pinyin: 'shēntǐ',
          pinyin_tone: 'shen1ti3',
          meaning_th: 'ร่างกาย/สุขภาพ',
          meaning_en: 'body / health',
          radical: '身',
          radical_name_th: 'หมวดร่างกาย (身字部)',
          stroke_count: 14,
          mnemonic: 'สรีระร่างกาย (身) และโครงสร้างอวัยวะทั้งหมด (体) = ร่างกาย/สุขภาพ (身体)',
          kid_mnemonic: 'ออกกำลังกาย แขนขาแข็งแรง ร่างกายสมบูรณ์ = 身体',
          body_gesture: 'สองมือแตะที่หน้าอกแล้วยืดตัวขึ้นอย่างแข็งแรง'
        }
      ],
      tone_rule: {
        rule_name: 'เสียงเบาในอวัยวะร่างกาย: 肚子 (dùzi) และ 眼睛 (yǎnjing)',
        description_th: 'คำว่า 子 ใน 肚子 และ 睛 ใน 眼睛 จะออกเสียงเบา (Neutral tone) สั้นและนุ่มนวล',
        example: 'dùzi (ท้อง), yǎnjing (ดวงตา)',
        fun_metaphor: 'พยางค์หลังออกเสียงเบาเหมือนหยดน้ำแตะผิวน้ำ dùzi, yǎnjing!',
        reassurance: 'ออกเสียงพยางค์หลังสั้นเบาจะฟังดูเป็นธรรมชาติเหมือนเจ้าของภาษาทันที!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้ถามไถ่สุขภาพและระบุอวัยวะ',
        explanation_th: 'ถามสุขภาพ: 你身体怎么样？ และตอบว่า 我身体很好 หรือระบุอวัยวะด้วย 我的 [อวัยวะ]',
        patterns: [
          {
            formula: '你身体怎么样？ = สุขภาพร่างกายของคุณเป็นอย่างไรบ้าง?',
            zh: '你身体怎么样？',
            pinyin: 'Nǐ shēntǐ zěnmeyàng?',
            th: 'สุขภาพร่างกายเธอเป็นอย่างไรบ้าง?',
            en: 'How is your health?'
          },
          {
            formula: '我的 [อวัยวะ] = ...ของฉัน',
            zh: '我的眼睛很累。',
            pinyin: 'Wǒ de yǎnjing hěn lèi.',
            th: 'ดวงตาของฉันล้ามาก',
            en: 'My eyes are very tired.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '王明，今天你身体怎么样？',
          pinyin: 'Wáng Míng, jīntiān nǐ shēntǐ zěnmeyàng?',
          th: 'หวังหมิง วันนี้สุขภาพร่างกายนายสบายดีไหม?',
          en: 'Wang Ming, how is your health today?'
        },
        {
          speaker: 'B',
          speaker_name: 'หวังหมิง 🧑',
          zh: '我身体很好，谢谢！就是今天电脑看多了，眼睛有点儿累。',
          pinyin: 'Wǒ shēntǐ hěn hǎo, xièxie! Jiùshì jīntiān diànnǎo kàn duō le, yǎnjing yǒudiǎnr lèi.',
          th: 'สุขภาพฉันแข็งแรงดี ขอบใจนะ! เพียงแต่วันนี้ดูคอมพิวเตอร์เยอะไปหน่อย ตาเลยล้านิดหน่อย',
          en: 'I am very well, thanks! Just looked at the computer too much, eyes are a bit tired.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '要多休息，洗洗手，揉揉眼睛。',
          pinyin: 'Yào duō xiūxi, xǐxishǒu, róurou yǎnjing.',
          th: 'ต้องพักผ่อนเยอะๆ นะ ล้างมือ พักสายตาบ้าง',
          en: 'Rest more, wash your hands, and rest your eyes.'
        },
        {
          speaker: 'B',
          speaker_name: 'หวังหมิง 🧑',
          zh: '好的，你每天运动，身体真棒！',
          pinyin: 'Hǎode, nǐ měitiān yùndòng, shēntǐ zhēn bàng!',
          th: 'โอเคเลย นายออกกำลังกายทุกวัน ร่างกายแข็งแรงสุดยอดจริงๆ!',
          en: 'Okay, you exercise every day, your health is really great!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ได้ยินเสียง 'nǐ shēntǐ zěnmeyàng' แปลว่าอะไร?",
          options: [
            'สุขภาพร่างกายของคุณเป็นอย่างไรบ้าง?',
            'คุณอายุเท่าไหร่?',
            'คุณอยู่ที่ไหน?',
            'ไปโรงพยาบาลอย่างไร?'
          ],
          correct_index: 0,
          explanation_th: 'shēntǐ แปลว่า สุขภาพร่างกาย และ zěnmeyàng แปลว่า เป็นอย่างไรบ้าง',
          encouragement: 'ฟังคำถามไถ่ถามสุขภาพได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "หมวดนำเนื้อเยื่อร่างกายในอักษร '肚' (ท้อง) และ '脚' (เท้า) คือหมวดนำใด?",
          options: [
            'หมวดเนื้อเยื่อ (月 肉月旁)',
            'หมวดดวงอาทิตย์ (日)',
            'หมวดดิน (土)',
            'หมวดมีด (刂)'
          ],
          correct_index: 0,
          explanation_th: '月 (肉月旁) ในอักษรเกี่ยวกับอวัยวะร่างกาย มาจากรูปเนื้อเยื่อ (肉)',
          encouragement: 'เข้าใจรากศัพท์อวัยวะร่างกาย 肉月旁 ได้ลึกซึ้งมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "สุขภาพของฉันแข็งแรงดีมาก ขอบคุณครับ"',
          tokens: [
            '谢谢',
            '我身体很好'
          ],
          correct_sequence: [
            '我身体很好',
            '谢谢'
          ],
          pinyin: 'Wǒ shēntǐ hěn hǎo, xièxie',
          meaning_th: 'สุขภาพของฉันแข็งแรงดีมาก ขอบคุณครับ',
          explanation_th: 'บอกสถานะสุขภาพ (我身体很好) + กล่าวขอบคุณ (谢谢)',
          encouragement: 'เรียงประโยคตอบรับได้อย่างสุภาพและเป็นธรรมชาติ!'
        },
        {
          type: 'flash_recall',
          question_th: 'คำว่า "ศีรษะ/หัว" ในภาษาจีนตรงกับคำใด?',
          options: [
            '头 (tóu)',
            '手 (shǒu)',
            '脚 (jiǎo)',
            '肚子 (dùzi)'
          ],
          correct_index: 0,
          explanation_th: '头 (tóu) แปลว่า หัว/ศีรษะ ส่วน 手 (shǒu) แปลว่า มือ',
          encouragement: 'จำคำศัพท์อวัยวะได้อย่างแม่นยำ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'เพื่อนชาวจีนถามคุณด้วยความห่วงใยว่า: "你身体怎么样？" คุณสุขภาพดีมากและต้องการตอบขอบคุณเพื่อน ต้องพูดว่าอย่างไร?',
        options: [
          '我身体很好，谢谢你的关心！ (Wǒ shēntǐ hěn hǎo, xièxie nǐ de guānxīn!)',
          '洗手间在哪儿？ (Xǐshǒujiān zài nǎr?)',
          '我有四口人。 (Wǒ yǒu sì kǒu rén.)',
          '多少钱一盒？ (Duōshao qián yì hé?)'
        ],
        correct_index: 0,
        explanation_th: '我身体很好，谢谢你的关心！ เป็นคำตอบที่สมบูรณ์แบบ ทั้งสุภาพ แสดงความแข็งแรง และตอบแทนความห่วงใย 100%!',
        encouragement: '🎉 สนทนาเรื่องสุขภาพได้อย่างอบอุ่นและเป็นมิตร!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u09_l01',
        badge_name: 'ผู้ดูแลสุขภาพร่างกาย 🧘🐰',
        message_th: 'ยอดเยี่ยมมาก! คุณบอกอวัยวะต่างๆ ในร่างกายและไต่ถามสุขภาพได้คล่องตัวแล้ว!',
        xp_reward: 45
      }
    },
    {
      lesson_id: 't1_u09_l02',
      lesson_number: 2,
      title: {
        zh: '头疼发烧与有点儿不舒服',
        th: 'ปวดหัว ไม่สบาย เป็นไข้',
        en: 'Headache, Fever & Feeling Unwell'
      },
      can_do: {
        th: 'บอกอาการเจ็บป่วย ปวดหัว ปวดท้อง เป็นไข้ เป็นหวัด และใช้ 有点儿 แสดงอาการได้ถูกต้อง',
        en: 'Express symptoms: headache, stomachache, fever, cold, and use 有点儿 correctly'
      },
      baby_step_goal: 'เป้าหมายวันนี้: บอกอาการเจ็บป่วยของตัวเองให้เพื่อนหรือหมอฟังได้อย่างชัดเจน!',
      vocabulary: [
        {
          id: 'hsk1_0907',
          hanzi: '疼',
          pinyin: 'téng',
          display_pinyin: 'téng',
          pinyin_tone: 'teng2',
          meaning_th: 'ปวด/เจ็บ',
          meaning_en: 'pain / ache / sore',
          radical: '疒',
          radical_name_th: 'หมวดโรคภัยไข้เจ็บ (病字头)',
          stroke_count: 10,
          mnemonic: 'คนนอนป่วยบนเตียงใต้หลังคาคลุม (疒) เจ็บปวดทรมาน = ปวด/เจ็บ (疼)',
          kid_mnemonic: 'เอามือกุมขมับ โอ๊ย ปวดจังเลย = 疼',
          body_gesture: 'เอามือกุมหน้าผากทำหน้าเจ็บปวด'
        },
        {
          id: 'hsk1_0908',
          hanzi: '不舒服',
          pinyin: 'bù shūfu',
          display_pinyin: 'bù shūfu',
          pinyin_tone: 'bu4 shu1fu',
          meaning_th: 'ไม่สบาย/ไม่ค่อยดี',
          meaning_en: 'unwell / uncomfortable',
          radical: '一',
          radical_name_th: 'หมวดเส้นขวาง (一部)',
          stroke_count: 19,
          mnemonic: 'ร่างกายไม่ (不) สบายและไม่ผ่อนคลาย (舒服) = ไม่สบาย (不舒服)',
          kid_mnemonic: 'นอนซมบนเตียง ไม่ค่อยสบายเลยจ้า = 不舒服',
          body_gesture: 'เอามือแตะหน้าอกแล้วส่ายหน้าเบาๆ',
          sandhi_rule: 'bu'
        },
        {
          id: 'hsk1_0909',
          hanzi: '发烧',
          pinyin: 'fāshāo',
          display_pinyin: 'fāshāo',
          pinyin_tone: 'fa1shao1',
          meaning_th: 'เป็นไข้/ตัวร้อน',
          meaning_en: 'have a fever',
          radical: '火',
          radical_name_th: 'หมวดไฟ (火字旁)',
          stroke_count: 15,
          mnemonic: 'เปลวไฟ (火) เผาผลาญความร้อนแผ่ออกมา (发) = เป็นไข้ตัวร้อน (发烧)',
          kid_mnemonic: 'หน้าผากร้อนจี๋ เอาแผ่นเจลมาแปะลดไข้ = 发烧',
          body_gesture: 'หลังมือข้างหนึ่งทาบที่หน้าผากตัวเองวัดไข้'
        },
        {
          id: 'hsk1_0910',
          hanzi: '感冒',
          pinyin: 'gǎnmào',
          display_pinyin: 'gǎnmào',
          pinyin_tone: 'gan3mao4',
          meaning_th: 'เป็นหวัด',
          meaning_en: 'catch a cold / cold',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 22,
          mnemonic: 'ร่างกายได้รับสัมผัส (感) ไอเย็นจนติดเชื้อ = เป็นหวัด (感冒)',
          kid_mnemonic: 'จาม ฮัดเชิ่ย! น้ำมูกไหล เป็นหวัดแล้ว = 感冒',
          body_gesture: 'เอามือป้องจมูกทำท่าจามเบาๆ'
        },
        {
          id: 'hsk1_0911',
          hanzi: '有点儿',
          pinyin: 'yǒudiǎnr',
          display_pinyin: 'yǒudiǎnr',
          pinyin_tone: 'you3dianr3',
          meaning_th: 'นิดหน่อย/ค่อนข้าง (แฝงความหมายเชิงลบ/ไม่ชอบ)',
          meaning_en: 'a little bit / slightly (negative connotation)',
          radical: '月',
          radical_name_th: 'หมวดดวงจันทร์ (月字旁)',
          stroke_count: 17,
          mnemonic: 'มีจุดความรู้สึกไม่พึงประสงค์อยู่บ้างเล็กน้อย = 有点儿',
          kid_mnemonic: 'ขมวดคิ้วเล็กน้อย รู้สึกไม่ค่อยดีนิดหน่อย = 有点儿',
          body_gesture: 'ทำนิ้วชี้กับนิ้วโป้งห่างกันเล็กน้อยแสดงความนิดหน่อย'
        }
      ],
      tone_rule: {
        rule_name: 'Tone ของ 不 ในคำว่า 不舒服 (bù shūfu)',
        description_th: 'คำว่า 不 อยู่หน้า 舒 (shū) ซึ่งเป็นเสียง 1 ดังนั้น 不 จะคงเสียง 4 เป็น bù shūfu เสมอ',
        example: '不舒服 (bù shūfu)',
        fun_metaphor: 'น้องปู้ยืนตรงมั่นคง bù shūfu เพราะอยู่หน้าเสียง 1!',
        reassurance: 'ออกเสียง bù shūfu หนักแน่นชัดเจน!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้บอกอาการเจ็บปวดและกับดัก 有点儿 vs 一点儿',
        explanation_th: 'บอกจุดปวด: [อวัยวะ] + 疼 (เช่น 头疼 ปวดหัว, 肚子疼 ปวดท้อง) และจำไว้ว่า 有点儿 วางหน้าคุณศัพท์เชิงลบ (เช่น 有点儿冷, 有点儿不舒服)',
        patterns: [
          {
            formula: '[อวัยวะ] + 疼 = ปวด...',
            zh: '我头疼，肚子也很疼。',
            pinyin: 'Wǒ tóu téng, dùzi yě hěn téng.',
            th: 'ฉันปวดหัว และก็ปวดท้องมากด้วย',
            en: 'My head aches, and my stomach hurts too.'
          },
          {
            formula: '我有点儿 + [อาการ] = ฉันค่อนข้าง/รู้สึกนิดหน่อย...',
            zh: '我有点儿不舒服，发烧了。',
            pinyin: 'Wǒ yǒudiǎnr bù shūfu, fāshāo le.',
            th: 'ฉันรู้สึกไม่ค่อยสบายนิดหน่อย ตัวร้อนเป็นไข้แล้ว',
            en: 'I feel a bit unwell, got a fever.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: 'สมชาย，你怎么了？脸色不太好。',
          pinyin: 'Somchai, nǐ zěnme le? Liǎnsè bú tài hǎo.',
          th: 'สมชาย นายเป็นอะไรไปเหรอ? หน้าตาดูไม่ค่อยดีเลย',
          en: 'Somchai, what happened to you? You look unwell.'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '我有点儿不舒服，头很疼，可能发烧了。',
          pinyin: 'Wǒ yǒudiǎnr bù shūfu, tóu hěn téng, kěnéng fāshāo le.',
          th: 'ฉันรู้สึกไม่ค่อยสบายนิดหน่อย ปวดหัวมาก น่าจะเป็นไข้แล้วล่ะ',
          en: 'I feel a bit unwell, bad headache, might have a fever.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: '量体温了吗？三十八度！确实发烧感冒了。',
          pinyin: 'Liáng tǐwēn le ma? Sānshíbā dù! Quèshí fāshāo gǎnmào le.',
          th: 'วัดอุณหภูมิหรือยัง? 38 องศา! เป็นไข้หวัดจริงๆ ด้วย',
          en: 'Did you take temperature? 38 degrees! Indeed a fever and cold.'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '今天我不能去上班了，要请假。',
          pinyin: 'Jīntiān wǒ bù néng qù shàngbān le, yào qǐngjià.',
          th: 'วันนี้ฉันไปทำงานไม่ไหวแล้ว ต้องขอลาหยุด',
          en: 'I cannot go to work today, need to take leave.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: '好，你安心休息，我去给你买药！',
          pinyin: 'Hǎo, nǐ ānxīn xiūxi, wǒ qù gěi nǐ mǎi yào!',
          th: 'ได้เลย นายพักผ่อนให้สบายนะ เดี๋ยวฉันไปซื้อยามาให้!',
          en: 'Okay, rest with ease, I will go buy medicine for you!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ได้ยินเสียง 'wǒ tóu téng, fāshāo le' หมายถึงมีอาการอย่างไร?",
          options: [
            'ปวดหัวและเป็นไข้แล้ว',
            'ปวดท้องและหิวข้าว',
            'เจ็บขาและเดินไม่ไหว',
            'สบายดีมาก'
          ],
          correct_index: 0,
          explanation_th: 'tóu téng คือ ปวดหัว และ fāshāo le คือ เป็นไข้แล้ว',
          encouragement: 'ฟังอาการเจ็บป่วยได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '疼' (ปวด) มีหมวดนำ '疒' สื่อถึงอะไร?",
          options: [
            'โรคภัยไข้เจ็บและความเจ็บป่วย',
            'บ้านและครอบครัว',
            'น้ำและของเหลว',
            'ต้นไม้'
          ],
          correct_index: 0,
          explanation_th: '疒 (病字头) คือหมวดโรคภัยไข้เจ็บ ปรากฏในคำว่า 病, 疼, 痛, 疯',
          encouragement: 'จดจำหมวดโรคภัยไข้เจ็บ 疒 ได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ฉันรู้สึกไม่ค่อยสบายนิดหน่อย"',
          tokens: [
            '不舒服',
            '我有点儿'
          ],
          correct_sequence: [
            '我有点儿',
            '不舒服'
          ],
          pinyin: 'Wǒ yǒudiǎnr bù shūfu',
          meaning_th: 'ฉันรู้สึกไม่ค่อยสบายนิดหน่อย',
          explanation_th: 'ประธาน (我) + รู้สึกนิดหน่อย (有点儿) + คุณศัพท์เชิงลบ (不舒服)',
          encouragement: 'วางตำแหน่ง 有点儿 ได้ถูกต้องเป๊ะ 100%!'
        },
        {
          type: 'flash_recall',
          question_th: 'คำว่า "เป็นไข้/ตัวร้อน" ในภาษาจีนคือคำใด?',
          options: [
            '发烧 (fāshāo)',
            '感冒 (gǎnmào)',
            '头疼 (tóuténg)',
            '舒服 (shūfu)'
          ],
          correct_index: 0,
          explanation_th: '发烧 (fāshāo) คือ เป็นไข้ตัวร้อน ส่วน 感冒 (gǎnmào) คือ เป็นหวัด',
          encouragement: 'แยกแยะเป็นไข้กับเป็นหวัดได้แม่นยำ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณรู้สึกตัวร้อนและปวดศีรษะอย่างมาก ต้องการโทรบอกหัวหน้างานว่า "ฉันปวดหัว เป็นไข้ วันนี้ไปทำงานไม่ได้" ต้องพูดว่าอย่างไร?',
        options: [
          '我头疼、发烧，今天不能去上班。 (Wǒ tóu téng, fāshāo, jīntiān bù néng qù shàngbān.)',
          '我喜欢看电影，不去上班。 (Wǒ xǐhuan kàn diànyǐng, bú qù shàngbān.)',
          '洗手间在车站。 (Xǐshǒujiān zài chēzhàn.)',
          '这是我哥哥。 (Zhè shì wǒ gēge.)'
        ],
        correct_index: 0,
        explanation_th: '我头疼、发烧，今天不能去上班。 สื่อสารอาการเจ็บป่วยและแจ้งลาหยุดได้อย่างชัดเจน ตรงประเด็น และไวยากรณ์เป๊ะ 100%!',
        encouragement: '🎉 สื่อสารในยามฉุกเฉินได้อย่างยอดเยี่ยมและมืออาชีพ!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u09_l02',
        badge_name: 'ผู้สื่อสารอาการเจ็บป่วย 🩺🐰',
        message_th: 'ยอดเยี่ยมมาก! คุณบอกอาการปวดหัว เป็นไข้ ไม่สบาย ได้อย่างแม่นยำ!',
        xp_reward: 45
      }
    },
    {
      lesson_id: 't1_u09_l03',
      lesson_number: 3,
      title: {
        zh: '去医院看病与吃药',
        th: 'ไปโรงพยาบาล & กินยา',
        en: 'Going to Hospital & Taking Medicine'
      },
      can_do: {
        th: 'สื่อสารการไปพบแพทย์ที่โรงพยาบาล ใช้คำว่า 吃药 (ห้าม 喝药) และให้คำแนะนำเรื่องน้ำอุ่น',
        en: 'Communicate visiting doctors, use 吃药 correctly, and give warm water advice'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สื่อสารการพบแพทย์และเข้าใจคำแนะนำวิธีทานยา!',
      vocabulary: [
        {
          id: 'hsk1_0912',
          hanzi: '医院',
          pinyin: 'yīyuàn',
          display_pinyin: 'yīyuàn',
          pinyin_tone: 'yi1yuan4',
          meaning_th: 'โรงพยาบาล',
          meaning_en: 'hospital',
          radical: '阝',
          radical_name_th: 'หมวดหูขวา/อาคาร (右耳旁)',
          stroke_count: 16,
          mnemonic: 'สถาบันอาคารสถานที่ (院) สำหรับการรักษาพยาบาล (医) = โรงพยาบาล (医院)',
          kid_mnemonic: 'อาคารมีเครื่องหมายบวกสีแดง หมอพยาบาลใจดี = 医院',
          body_gesture: 'ทำเครื่องหมายบวกด้วยนิ้วชี้สองข้างไขว้กัน'
        },
        {
          id: 'hsk1_0913',
          hanzi: '医生',
          pinyin: 'yīshēng',
          display_pinyin: 'yīshēng',
          pinyin_tone: 'yi1sheng1',
          meaning_th: 'คุณหมอ/แพทย์',
          meaning_en: 'doctor',
          radical: '生',
          radical_name_th: 'หมวดกำเนิดเกิด (生字部)',
          stroke_count: 12,
          mnemonic: 'ผู้รักษาชีวิต (生) ด้วยวิชาการแพทย์ (医) = คุณหมอ (医生)',
          kid_mnemonic: 'สวมเสื้อกาวน์สีขาว ถือหูฟังตรวจคนไข้ = 医生',
          body_gesture: 'ทำท่าใส่หูฟังตรวจคนไข้ที่หน้าอก'
        },
        {
          id: 'hsk1_0914',
          hanzi: '药',
          pinyin: 'yào',
          display_pinyin: 'yào',
          pinyin_tone: 'yao4',
          meaning_th: 'ยา',
          meaning_en: 'medicine / drug',
          radical: '艹',
          radical_name_th: 'หมวดหญ้าสมุนไพร (草字头)',
          stroke_count: 9,
          mnemonic: 'สมุนไพรพืชหญ้า (艹) ที่นำมารักษาให้สุขสบาย (约) = ยา (药)',
          kid_mnemonic: 'ยาเม็ดกลมๆ กินแล้วหายป่วยแข็งแรง = 药',
          body_gesture: 'ทำท่าหยิบเม็ดยาใส่ปาก'
        },
        {
          id: 'hsk1_0915',
          hanzi: '吃药',
          pinyin: 'chīyào',
          display_pinyin: 'chīyào',
          pinyin_tone: 'chi1yao4',
          meaning_th: 'กินยา (ห้ามใช้ 喝药 เด็ดขาด)',
          meaning_en: 'take medicine (strict: do not use 喝药)',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 15,
          mnemonic: 'กลืนเม็ดยาเข้าปาก (吃) พร้อมดื่มน้ำ = ทานยา (吃药)',
          kid_mnemonic: 'หยิบยาเม็ดเข้าปาก ดื่มน้ำตาม อึกๆ = 吃药',
          body_gesture: 'ทำท่าแตะยาที่ปากแล้วดื่มน้ำตาม'
        },
        {
          id: 'hsk1_0916',
          hanzi: '休息',
          pinyin: 'xiūxi',
          display_pinyin: 'xiūxi',
          pinyin_tone: 'xiu1xi',
          meaning_th: 'พักผ่อน',
          meaning_en: 'rest / take a break',
          radical: '亻',
          radical_name_th: 'หมวดคนข้าง (单人旁)',
          stroke_count: 16,
          mnemonic: 'คน (亻) พิงต้นไม้ (木) ปล่อยลมหายใจผ่อนคลาย (息) = พักผ่อน (休息)',
          kid_mnemonic: 'นั่งพิงเก้าอี้นุ่มๆ พักผ่อนสบายตัว = 休息',
          body_gesture: 'เอนหลังพิงเก้าอี้หลับตาพักผ่อน'
        },
        {
          id: 'hsk1_0917',
          hanzi: '多',
          pinyin: 'duō',
          display_pinyin: 'duō',
          pinyin_tone: 'duo1',
          meaning_th: 'เยอะๆ/มากๆ (ใช้นำหน้ากริยา)',
          meaning_en: 'more / much / often',
          radical: '夕',
          radical_name_th: 'หมวดดวงจันทร์พลบค่ำ (夕字旁)',
          stroke_count: 6,
          mnemonic: 'ดวงจันทร์สองดวง (夕夕) ซ้อนกัน แสดงความมากมาย = 多',
          kid_mnemonic: 'ขนมสองกองเยอะแยะเต็มไปหมดเลย = 多',
          body_gesture: 'กอบสองมือเข้าหาตัวแสดงความมากมาย'
        },
        {
          id: 'hsk1_0918',
          hanzi: '热水',
          pinyin: 'rèshuǐ',
          display_pinyin: 'rèshuǐ',
          pinyin_tone: 're4shui3',
          meaning_th: 'น้ำอุ่น/น้ำร้อน (วัฒนธรรมสุขภาพจีน)',
          meaning_en: 'warm water / hot water',
          radical: '水',
          radical_name_th: 'หมวดน้ำ (水字部)',
          stroke_count: 14,
          mnemonic: 'น้ำ (水) ที่ต้มด้วยความร้อน (热) เป็นยาวิเศษของชาวจีน = น้ำอุ่น (热水)',
          kid_mnemonic: 'ถือแก้วน้ำอุ่น ควันฉุยๆ ดื่มแล้วชุ่มคอ = 热水',
          body_gesture: 'สองมือประกบทำทรงแก้วน้ำอุ่นแล้วเป่าเบาๆ'
        }
      ],
      tone_rule: {
        rule_name: 'การใช้คำว่า 吃药 (chī yào) และกฎห้ามใช้ 喝药',
        description_th: 'ในภาษาจีน ยาเม็ดแผนปัจจุบันต้องใช้คำว่า 吃药 (chī yào) เท่านั้น ห้ามพูดว่า 喝药 (ซึ่งใช้กับยาต้มสมุนไพรจีนโบราณ)',
        example: '吃药 (chī yào)',
        fun_metaphor: 'ยาเม็ดต้องเคี้ยวกลืน 吃药 ห้ามซดเหมือนน้ำแกง!',
        reassurance: 'จำแม่นๆ 吃药 (chī yào) ถูกต้องตามหลักภาษาจีน 100%!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้หาหมอและสูตรความห่วงใยอันดับ 1 ของคนจีน',
        explanation_th: 'ไปหาหมอใช้ 去医院看医生 และให้คำแนะนำห่วงใยใช้ 多 + กริยา (เช่น 多喝热水，多休息！ ดื่มน้ำอุ่นเยอะๆ พักผ่อนเยอะๆ)',
        patterns: [
          {
            formula: '我要去医院看医生 = ฉันต้องไปโรงพยาบาลหาหมอ',
            zh: '我要去医院看医生。',
            pinyin: 'Wǒ yào qù yīyuàn kàn yīshēng.',
            th: 'ฉันต้องไปโรงพยาบาลพบคุณหมอ',
            en: 'I need to go to the hospital to see a doctor.'
          },
          {
            formula: '多 + [กริยา] = ...เยอะๆ นะ',
            zh: '多喝热水，多休息！',
            pinyin: 'Duō hē rèshuǐ, duō xiūxi!',
            th: 'ดื่มน้ำอุ่นเยอะๆ พักผ่อนเยอะๆ นะ!',
            en: 'Drink more warm water and rest more!'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'คุณหมอ 👨‍⚕️',
          zh: '你好！哪里不舒服？',
          pinyin: 'Nǐ hǎo! Nǎlǐ bù shūfu?',
          th: 'สวัสดีครับ ตรงไหนไม่สบายครับ?',
          en: 'Hello! Where does it feel uncomfortable?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '医生您好，我头疼、发烧，嗓子也很疼。',
          pinyin: 'Yīshēng nín hǎo, wǒ tóu téng, fāshāo, sǎngzi yě hěn téng.',
          th: 'คุณหมอสวัสดีครับ ผมปวดหัว เป็นไข้ และเจ็บคอมากด้วยครับ',
          en: 'Hello doctor, I have a headache, fever, and my throat hurts too.'
        },
        {
          speaker: 'A',
          speaker_name: 'คุณหมอ 👨‍⚕️',
          zh: '不用担心，是普通感冒。这是感冒药，一天吃三次，饭后吃。',
          pinyin: 'Búyòng dānxīn, shì pǔtōng gǎnmào. Zhè shì gǎnmàoyào, yì tiān chī sān cì, fànhòu chī.',
          th: 'ไม่ต้องกังวลนะ เป็นไข้หวัดธรรมดา นี่คือยาแก้หวัด ทานวันละ 3 ครั้ง หลังอาหารนะ',
          en: 'No worries, just a common cold. Here is cold medicine, take 3 times a day after meals.'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '好的，谢谢医生！',
          pinyin: 'Hǎode, xièxie yīshēng!',
          th: 'ขอบคุณครับคุณหมอ!',
          en: 'Okay, thank you doctor!'
        },
        {
          speaker: 'A',
          speaker_name: 'คุณหมอ 👨‍⚕️',
          zh: '记住，多喝热水，多休息，两天就好了！',
          pinyin: 'Jìzhu, duō hē rèshuǐ, duō xiūxi, liǎng tiān jiù hǎo le!',
          th: 'จำไว้นะ ดื่มน้ำอุ่นเยอะๆ พักผ่อนเยอะๆ สองวันก็หายดีแล้ว!',
          en: 'Remember, drink more warm water, rest more, all good in two days!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ได้ยินเสียง 'duō hē rèshuǐ, duō xiūxi' แปลว่าอะไร?",
          options: [
            'ดื่มน้ำอุ่นเยอะๆ พักผ่อนเยอะๆ',
            'กินข้าวเยอะๆ ไปทำงาน',
            'ไปซื้อของที่ห้าง',
            'นั่งรถไฟใต้ดินไปโรงพยาบาล'
          ],
          correct_index: 0,
          explanation_th: 'duō hē rèshuǐ คือ ดื่มน้ำอุ่นเยอะๆ และ duō xiūxi คือ พักผ่อนเยอะๆ',
          encouragement: 'เข้าใจสูตรความห่วงใยอันดับ 1 ของคนจีนได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '药' (ยา) มีหมวดนำหญ้า '艹' สื่อถึงอะไร?",
          options: [
            'สมุนไพรพืชพรรณที่นำมารักษาโรค',
            'ไฟที่เผาไหม้',
            'โลหะและเหล็ก',
            'น้ำฝน'
          ],
          correct_index: 0,
          explanation_th: '艹 (草字头) คือหมวดหญ้า สื่อถึงยาแผนจีนโบราณที่สกัดจากพืชสมุนไพร',
          encouragement: 'จำหมวดหญ้า 艹 ได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ฉันต้องไปโรงพยาบาลพบคุณหมอ"',
          tokens: [
            '去看医生',
            '我要去医院'
          ],
          correct_sequence: [
            '我要去医院',
            '去看医生'
          ],
          pinyin: 'Wǒ yào qù yīyuàn kàn yīshēng',
          meaning_th: 'ฉันต้องไปโรงพยาบาลพบคุณหมอ',
          explanation_th: 'ไปสถานที่ (我要去医院) + เพื่อทำกิจกรรม (去看医生)',
          encouragement: 'เรียงประโยคต่อเนื่องได้อย่างคล่องแคล่ว!'
        },
        {
          type: 'flash_recall',
          question_th: '🚨 จุดดักผิดภาษา: การทานยาเม็ดแผนปัจจุบันในภาษาจีนต้องใช้คำว่าอะไร?',
          options: [
            '吃药 (chī yào) - ทานยาเม็ด ถูกต้อง 100%',
            '喝药 (hē yào) - ห้ามใช้กับยาเม็ด',
            '看药 (kàn yào)',
            '买药水 (mǎi yàoshuǐ)'
          ],
          correct_index: 0,
          explanation_th: 'ยาเม็ดแผนปัจจุบันในภาษาจีนต้องใช้คำว่า 吃药 (chī yào) เสมอ!',
          encouragement: 'ไม่ตกหลุมพรางภาษา! ถูกต้องเป๊ะ 100%!'
        }
      ],
      boss_challenge: {
        scenario_th: 'เพื่อนคนจีนไม่สบายและไอหนัก คุณต้องการแสดงความห่วงใยตามวัฒนธรรมจีนว่า "ดื่มน้ำอุ่นเยอะๆ และพักผ่อนเยอะๆ นะ!" ต้องพูดว่าอย่างไร?',
        options: [
          '多喝热水，多休息！ (Duō hē rèshuǐ, duō xiūxi!)',
          '多吃米饭，不要走。 (Duō chī mǐfàn, bú yào zǒu.)',
          '洗手间在医院。 (Xǐshǒujiān zài yīyuàn.)',
          '这是三十块钱。 (Zhè shì sānshí kuài qián.)'
        ],
        correct_index: 0,
        explanation_th: '多喝热水，多休息！ เป็นวลีทองคำแห่งความห่วงใยอันดับ 1 ของคนจีน ถูกต้องทั้งภาษาและวัฒนธรรม 100%!',
        encouragement: '🎉 ความห่วงใยน่ารักและเป็นธรรมชาติมาก เพื่อนคนจีนซาบซึ้งใจแน่นอน!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u09_l03',
        badge_name: 'หมอประจำบ้านใจดี 🍵🐰',
        message_th: 'ยินดีด้วย! คุณสื่อสารการพบแพทย์และใช้คำแนะนำ ทานยา-ดื่มน้ำอุ่น ได้อย่างถูกต้อง!',
        xp_reward: 45
      }
    },
    {
      lesson_id: 't1_u09_l04',
      lesson_number: 4,
      title: {
        zh: '在上海药店买感冒药通关',
        th: 'Boss Challenge: ซื้อยาแก้หวัดที่ร้านขายยาในเซี่ยงไฮ้',
        en: 'Boss Challenge: Buy Cold Medicine at Shanghai Pharmacy'
      },
      can_do: {
        th: 'บูรณาการบอกอาการเจ็บป่วย ซื้อยาที่ร้านขายยา ถามราคา และเข้าใจวิธีรับประทานยาอย่างครบวงจร',
        en: 'Integrate symptom description, buying medicine at pharmacies, pricing, and dosage'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พิชิตบอสใหญ่ Unit 9 ซื้อยาแก้หวัดในร้านขายยาจีนได้สำเร็จ!',
      vocabulary: [
        {
          id: 'hsk1_0919',
          hanzi: '药店',
          pinyin: 'yàodiàn',
          display_pinyin: 'yàodiàn',
          pinyin_tone: 'yao4dian4',
          meaning_th: 'ร้านขายยา',
          meaning_en: 'pharmacy / drugstore',
          radical: '广',
          radical_name_th: 'หมวดเพิงร้านค้า (广字头)',
          stroke_count: 17,
          mnemonic: 'ร้านค้า (店) ที่จำหน่ายยาบำบัดรักษาโรค (药) = ร้านขายยา (药店)',
          kid_mnemonic: 'ร้านขายยามีตู้ยาเต็มไปหมด มีเภสัชกรคอยให้คำแนะนำ = 药店',
          body_gesture: 'ทำมือสองข้างผายออกหน้าร้านขายยา'
        },
        {
          id: 'hsk1_0920',
          hanzi: '盒',
          pinyin: 'hé',
          display_pinyin: 'hé',
          pinyin_tone: 'he2',
          meaning_th: 'กล่อง (ลักษณนามยา/สิ่งของ)',
          meaning_en: 'box (measure word for medicine)',
          radical: '皿',
          radical_name_th: 'หมวดภาชนะถ้วยชาม (皿字底)',
          stroke_count: 11,
          mnemonic: 'ภาชนะกล่องปิดมิดชิด (皿) สำหรับบรรจุสิ่งของ = กล่อง (盒)',
          kid_mnemonic: 'กล่องยากระดาษสี่เหลี่ยม ยาหนึ่งกล่อง = 一盒',
          body_gesture: 'ทำมือสองข้างประกอบเป็นกล่องสี่เหลี่ยม'
        }
      ],
      tone_rule: {
        rule_name: 'Tone Sandhi ในลักษณนามยา: 一盒 (yì hé)',
        description_th: 'คำว่า 一 เมื่ออยู่หน้าคำเสียง 2 (hé) จะผันเป็นเสียง 4 คือ yì hé',
        example: '一盒药 (yì hé yào)',
        fun_metaphor: 'น้องอีหน้าเสียงสอง ผันลงเสียงสี่ yì hé หนักแน่น!',
        reassurance: 'จำว่า yì hé yào (ยาหนึ่งกล่อง) ชัดเจนและมั่นใจ!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้เจรจาในร้านขายยา',
        explanation_th: 'บอกอาการ + ถามว่ามียาไหม: 我有点儿... 请问有...药吗？ และถามวิธีทาน: 一天吃几次？',
        patterns: [
          {
            formula: '请问有 + [ประเภทยา] + 吗？ = ขอถามหน่อย มียา...ไหมครับ?',
            zh: '请问有感冒药吗？',
            pinyin: 'Qǐngwèn yǒu gǎnmàoyào ma?',
            th: 'ขอโทษครับ มีพวกยาแก้หวัดไหมครับ?',
            en: 'Excuse me, do you have cold medicine?'
          },
          {
            formula: '一天吃 [จำนวน] 次，一次 [จำนวน] 片 = วันละ...ครั้ง ครั้งละ...เม็ด',
            zh: '一天吃三次，一次两片。',
            pinyin: 'Yì tiān chī sān cì, yí cì liǎng piàn.',
            th: 'วันละ 3 ครั้ง ครั้งละ 2 เม็ด',
            en: 'Take three times a day, two tablets each time.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '你好！我头疼、发烧，有点儿感冒。请问有感冒药吗？',
          pinyin: 'Nǐ hǎo! Wǒ tóu téng, fāshāo, yǒudiǎnr gǎnmào. Qǐngwèn yǒu gǎnmàoyào ma?',
          th: 'สวัสดีครับ ผมปวดหัว เป็นไข้ เป็นหวัดนิดหน่อย ขอถามหน่อยมียาแก้หวัดไหมครับ?',
          en: 'Hello! I have a headache, fever, caught a cold. Do you have cold medicine?'
        },
        {
          speaker: 'B',
          speaker_name: 'เภสัชกรหญิง 👩‍🔬',
          zh: '有的。这种感冒药效果很好，三十块钱一盒。',
          pinyin: 'Yǒu de. Zhè zhǒng gǎnmàoyào xiàoguǒ hěn hǎo, sānshí kuài qián yì hé.',
          th: 'มีค่ะ ยาแก้หวัดตัวนี้สรรพคุณดีมาก กล่องละ 30 หยวนค่ะ',
          en: 'Yes. This cold medicine works very well, 30 yuan a box.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '好，我要一盒。请问一天吃几次？',
          pinyin: 'Hǎo, wǒ yào yì hé. Qǐngwèn yì tiān chī jǐ cì?',
          th: 'ตกลงครับ เอาหนึ่งกล่อง ขอถามหน่อยทานวันละกี่ครั้งครับ?',
          en: 'Okay, I want one box. How many times a day should I take it?'
        },
        {
          speaker: 'B',
          speaker_name: 'เภสัชกรหญิง 👩‍🔬',
          zh: '一天吃两次，一次两片，饭后吃，记得多喝热水！',
          pinyin: 'Yì tiān chī liǎng cì, yí cì liǎng piàn, fànhòu chī, jìde duō hē rèshuǐ!',
          th: 'วันละ 2 ครั้ง ครั้งละ 2 เม็ด หลังอาหาร อย่าลืมดื่มน้ำอุ่นเยอะๆ นะคะ!',
          en: 'Twice a day, two tablets each time, after meals, remember to drink warm water!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '给您五十块钱。谢谢您！',
          pinyin: 'Gěi nín wǔshí kuài qián. Xièxie nín!',
          th: 'นี่ครับให้ 50 หยวน ขอบคุณมากครับ!',
          en: 'Here is fifty yuan. Thank you!'
        },
        {
          speaker: 'B',
          speaker_name: 'เภสัชกรหญิง 👩‍🔬',
          zh: '找您二十块。祝你早日康复！',
          pinyin: 'Zhǎo nín èrshí kuài. Zhù nǐ zǎorì kāngfù!',
          th: 'ทอน 20 หยวนค่ะ ขอให้หายป่วยไวๆ นะคะ!',
          en: 'Twenty yuan change. Wish you a speedy recovery!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ได้ยินเสียง 'sānshí kuài qián yì hé' หมายถึงราคายาเท่าไหร่? (ทบทวน Unit 4)",
          options: [
            'กล่องละ 30 หยวน',
            'กล่องละ 13 หยวน',
            'กล่องละ 3 หยวน',
            'สองกล่อง 30 หยวน'
          ],
          correct_index: 0,
          explanation_th: 'sānshí kuài คือ 30 หยวน และ yì hé คือ หนึ่งกล่อง',
          encouragement: 'จำตัวเลขและราคาได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '盒' (กล่อง) มีหมวดนำภาชนะ '皿' สื่อถึงอะไร?",
          options: [
            'ภาชนะบรรจุสิ่งของ',
            'เปลวไฟ',
            'น้ำฝน',
            'ก้อนหิน'
          ],
          correct_index: 0,
          explanation_th: '皿 (皿字底) คือหมวดภาชนะบรรจุ สื่อถึงกล่องหรือถ้วยชาม',
          encouragement: 'จดจำรากศัพท์หมวดภาชนะ 皿 ได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ยาแก้หวัดนี้กล่องละสามสิบหยวน"',
          tokens: [
            '三十块钱一盒',
            '这种感冒药'
          ],
          correct_sequence: [
            '这种感冒药',
            '三十块钱一盒'
          ],
          pinyin: 'Zhè zhǒng gǎnmàoyào sānshí kuài qián yì hé',
          meaning_th: 'ยาแก้หวัดนี้กล่องละสามสิบหยวน',
          explanation_th: 'ประธาน (这种感冒药) + ราคาและหน่วย (三十块钱一盒)',
          encouragement: 'เรียงประโยคบอกราคาต่อหน่วยได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'flash_recall',
          question_th: 'เมื่อเภสัชกรอธิบายว่า "一天吃两次" แปลว่าต้องรับประทานยาวันละกี่ครั้ง?',
          options: [
            'วันละ 2 ครั้ง',
            'วันละ 1 ครั้ง',
            'วันละ 3 ครั้ง',
            'สองวัน 1 ครั้ง'
          ],
          correct_index: 0,
          explanation_th: 'yì tiān คือ หนึ่งวัน และ liǎng cì คือ สองครั้ง รวมกันคือ วันละ 2 ครั้ง',
          encouragement: 'เข้าใจคำแนะนำการทานยาได้อย่างถูกต้อง ปลอดภัยไร้กังวล!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณเดินเข้าไปในร้านขายยาที่เซี่ยงไฮ้ ต้องการบอกเภสัชกรว่า "สวัสดีครับ ผมปวดหัว เป็นไข้ มียาแก้หวัดไหมครับ?" ต้องพูดว่าอย่างไร?',
        options: [
          '你好，我头疼、发烧，请问有感冒药吗？ (Nǐ hǎo, wǒ tóu téng, fāshāo, qǐngwèn yǒu gǎnmàoyào ma?)',
          '你好，我要两碗面条，不要辣。 (Nǐ hǎo, wǒ yào liǎng wǎn miàntiáo, bú yào là.)',
          '去地铁站怎么走？ (Qù dìtiězhàn zěnme zǒu?)',
          '这是我妈妈的照片。 (Zhè shì wǒ māma de zhàopiàn.)'
        ],
        correct_index: 0,
        explanation_th: '你好，我头疼、发烧，请问有感冒药吗？ บูรณาการทั้งคำทักทาย การบอกอาการ และการขอยาได้อย่างแม่นยำและสุภาพ 100%!',
        encouragement: '🎉 มหัศจรรย์มาก! คุณพิชิต Grand Boss Challenge ของ Unit 9 ได้อย่างงดงาม เอาชีวิตรอดเมื่อป่วยในจีนได้สบาย!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u09_master',
        badge_name: 'ผู้เชี่ยวชาญการดูแลสุขภาพ 💊🐰',
        message_th: 'ขอแสดงความยินดีด้วย! คุณผ่านบทเรียนร่างกาย สุขภาพ และการซื้อยาระดับ Tier 1 ครบทั้ง 4 บทย่อยแล้ว!',
        xp_reward: 200
      }
    }
  ]
};
