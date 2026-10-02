/**
 * scripts/tier3_batch_b/unit37.ts
 * Tier 3 Unit 37: 中国传统艺术 (Chinese Traditional Arts)
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

export const unit37 = {
  unit_id: 'tier3_u37',
  tier: 3,
  unit_number: 37,
  title: {
    zh: '中国传统艺术',
    th: 'ศิลปวัฒนธรรมประเพณีจีน',
    en: 'Chinese Traditional Arts'
  },
  description: 'ดื่มด่ำกับมรดกภูมิปัญญาและสุนทรียศาสตร์คลาสสิกของจีน: งิ้วปักกิ่งและหน้ากากสัญลักษณ์ (国粹京剧), ภาพวาดพู่กันจีนและการเว้นพื้นที่ว่าง (水墨丹青与留白), ศิลปะตัดกระดาษและงานหัตถกรรม (非遗剪纸), และมนต์เสน่ห์เครื่องดนตรีโบราณ (古筝与琵琶)',
  lessons: [
    {
      lesson_id: 't3_u37_l01',
      lesson_number: 1,
      title: {
        zh: '国粹京剧与行当',
        th: 'งิ้วปักกิ่ง มรดกแห่งชาติและบทบาทตัวละคร',
        en: 'Peking Opera & Traditional Roles'
      },
      can_do: {
        th: 'อธิบายเอกลักษณ์ของงิ้วปักกิ่ง บทบาท生旦净丑 และลวดลายหน้ากาก脸谱',
        en: 'Explain Peking Opera features, role types (Sheng, Dan, Jing, Chou), and facial makeups'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องบทบาทและหน้ากากงิ้วปักกิ่งด้วยภาษาจีนอย่างผู้รู้จริง!',
      vocabulary: [
        {
          id: 'hsk3_3701',
          hanzi: '脸谱',
          pinyin: 'liǎnpǔ',
          display_pinyin: 'liǎnpǔ',
          pinyin_tone: 'lian3pu3',
          meaning_th: 'ลวดลายหน้ากากงิ้ว / แบบแผนการแต่งหน้างิ้ว',
          meaning_en: 'facial makeup in Peking opera',
          radical: '月',
          radical_name_th: 'หมวดเนื้อ/พระจันทร์ (月字旁)',
          stroke_count: 27,
          mnemonic: 'ใบหน้า (脸) ที่วาดตามสมุดบันทึกแบบแผนสีสัน (谱) = ลวดลายหน้ากากงิ้ว',
          kid_mnemonic: 'หน้ากากสีแดง-ดำ-ขาวที่วาดลวดลายดุดันแต่สวยงามวิจิตร = 脸谱',
          body_gesture: 'ยกฝ่ามือปาดผ่านใบหน้าเหมือนสวมหน้ากากงิ้ว'
        },
        {
          id: 'hsk3_3702',
          hanzi: '唱腔',
          pinyin: 'chàngqiāng',
          display_pinyin: 'chàngqiāng',
          pinyin_tone: 'chang4qiang1',
          meaning_th: 'ท่วงทำนองขับร้อง / ลีลาเสียงร้องงิ้ว',
          meaning_en: 'vocal music / singing style in opera',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 23,
          mnemonic: 'การร้องเพลง (唱) ออกมาจากโพรงอกและช่องปาก (腔) = ลีลาการขับร้อง',
          kid_mnemonic: 'โน้ตดนตรีลอยออกมาจากปากนักแสดงงิ้วที่เอื้อนเสียงสูง = 唱腔',
          body_gesture: 'แตะปลายนิ้วที่ลำคอแล้วผายมือขึ้นสูงเหมือนเอื้อนทำนอง'
        },
        {
          id: 'hsk3_3703',
          hanzi: '行当',
          pinyin: 'hángdang',
          display_pinyin: 'hángdang',
          pinyin_tone: 'hang2dang1',
          meaning_th: 'ประเภทบทบาทการแสดงงิ้ว / หมวดหมู่อาชีพเฉพาะทาง',
          meaning_en: 'role category in traditional theater',
          radical: '行',
          radical_name_th: 'หมวดหัง (行字旁)',
          stroke_count: 12,
          mnemonic: 'สายวิชาชีพ (行) ที่ทำหน้าที่รับบทบาทจริงจัง (当) = หมวดบทบาทตัวละคร',
          kid_mnemonic: 'ตู้เสื้อผ้า 4 ช่องที่มีชุดตัวพระ ตัวนาง ตัวหน้าลาย และตัวตลก = 行当',
          body_gesture: 'ผายมือชี้แยก 4 ทิศสื่อถึงการแบ่งหมวดหมู่บทบาท'
        },
        {
          id: 'hsk3_3704',
          hanzi: '生旦净丑',
          pinyin: 'shēng dàn jìng chǒu',
          display_pinyin: 'shēng dàn jìng chǒu',
          pinyin_tone: 'sheng1 dan4 jing4 chou3',
          meaning_th: 'เซิง ตั้น จิ้ง โฉ่ว (4 บทบาทหลัก: ตัวพระ, ตัวนาง, ตัวหน้าลาย, ตัวตลก)',
          meaning_en: 'the four main roles in Chinese opera (male, female, painted face, clown)',
          radical: '生',
          radical_name_th: 'หมวดเกิด (生字旁)',
          stroke_count: 24,
          mnemonic: 'ตัวพระ (生), ตัวนาง (旦), ชายชาตรีหน้าลาย (净), ตัวตลกผู้มีไหวพริบ (丑) = 4 บทบาทหลักงิ้ว',
          kid_mnemonic: 'ตัวละครการ์ตูน 4 ตัวยืนเรียงบนเวทีโบราณพร้อมท่าทางเฉพาะตัว = 生旦净丑',
          body_gesture: 'ทำท่าชี้ 4 นิ้วแล้วโบกสะบัดแขนเสื้อคลื่นลมงิ้ว'
        },
        {
          id: 'hsk3_3705',
          hanzi: '绝活',
          pinyin: 'juéhuó',
          display_pinyin: 'juéhuó',
          pinyin_tone: 'jue2huo2',
          meaning_th: 'ทักษะไม้ตาย / ฝีมือเฉพาะตัวอันยอดเยี่ยม',
          meaning_en: 'special stunt / master skill',
          radical: '纟',
          radical_name_th: 'หมวดเส้นไหม (绞丝旁)',
          stroke_count: 21,
          mnemonic: 'ฝีมือสุดยอดหาใครเปรียบมิได้ (绝) ที่นำมาแสดงจนมีชีวิตชีวา (活) = ทักษะไม้ตาย',
          kid_mnemonic: 'นักแสดงตีลังกากลางอากาศ 3 ตลบลงมายืนนิ่งสนิทเรียกเสียงปรบมือ = 绝活',
          body_gesture: 'ยกสองนิ้วโป้งขึ้นสูงพร้อมพยักหน้าชื่นชม'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 行当 (hángdang) พยางค์หลังเสียงเบา',
        description_th: 'คำว่า 当 ในบริบทนี้ออกเสียงเป็น dang (เสียงเบา) และ 行 ออกเป็น háng (เสียง 2) ไม่ใช่ xíng',
        example: '京剧的四大行当 (Jīngjù de sì dà hángdang: 4 บทบาทหลักของงิ้วปักกิ่ง)',
        fun_metaphor: 'เหมือนก้าวเท้าขึ้นบันได แล้วเคาะแป้นคีย์เบาๆ ตึก... ติ๊ก',
        reassurance: 'เมื่อจำเสียงเบาของ 当 ได้ จะทำให้ผู้ฟังเจ้าของภาษารู้ทันทีว่าคุณเข้าใจศัพท์นาฏศิลป์อย่างลึกซึ้ง!'
      },
      grammar_bite: {
        title: 'โครงสร้างการยกย่องมรดกทางวัฒนธรรม: 作为...，不仅蕴含着...更体现了...',
        explanation_th: 'ใช้ในการบรรยายคุณค่าทางศิลปวัฒนธรรมที่มีความลึกซึ้งทั้งในแง่ประวัติศาสตร์และความรู้สึก',
        patterns: [
          {
            formula: '作为 + [ชื่อศิลปะ/มรดก], 不仅蕴含着 + [คุณค่า], 更体现了 + [จิตวิญญาณ]',
            zh: '京剧作为中国国粹，不仅蕴含着深厚的历史，更体现了独特的东方美学。',
            pinyin: 'Jīngjù zuòwéi Zhōngguó guócuì, bùjǐn yùnhán zhe shēnhòu de lìshǐ, gèng tǐxiàn le dútè de dōngfāng měixué.',
            th: 'งิ้วปักกิ่งในฐานะมรดกประจำชาติ ไม่เพียงแฝงไว้ด้วยประวัติศาสตร์อันลึกซึ้ง หากแต่ยังสะท้อนถึงสุนทรียศาสตร์แบบตะวันออกอันเป็นเอกลักษณ์',
            en: 'As China\'s national essence, Peking Opera not only contains profound history but also embodies unique oriental aesthetics.'
          },
          {
            formula: '以...分门别类',
            zh: '京剧按角色特点划分为生旦净丑四大行当。',
            pinyin: 'Jīngjù àn juésè tèdiǎn huàfēn wéi shēng dàn jìng chǒu sì dà hángdang.',
            th: 'งิ้วปักกิ่งแบ่งประเภทตามลักษณะตัวละครออกเป็น 4 บทบาทหลัก ได้แก่ เซิง ตั้น จิ้ง โฉ่ว',
            en: 'Peking Opera is divided by character traits into four main role categories: Sheng, Dan, Jing, and Chou.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย (นักเดินทาง) 🧑‍💼',
          zh: '王老师，昨天我和同学去看京剧，那些历史故事太感人了，但脸谱很难看懂。',
          pinyin: 'Wáng lǎoshī, zuótiān wǒ hé tóngxué qù kàn Jīngjù, nàxiē lìshǐ gùshi tài gǎnrén le, dàn liǎnpǔ hěn nán kàndǒng.',
          th: 'อาจารย์หวังครับ เมื่อวานผมกับเพื่อนร่วมชั้นไปดูงิ้วปักกิ่ง เรื่องราวประวัติศาสตร์พวกนั้นซาบซึ้งใจมาก แต่หน้ากากดูเข้าใจยากจังครับ',
          en: 'Teacher Wang, yesterday my classmate and I watched Peking Opera; those historical stories were so moving, but the makeup was hard to understand.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ผู้เชี่ยวชาญงิ้ว) 👨‍🏫',
          zh: '其实很容易明白！京剧分为生旦净丑四大行当，不同颜色的脸谱代表着不同的性格。',
          pinyin: 'Qíshí hěn róngyì míngbai! Jīngjù fēnwéi shēng dàn jìng chǒu sì dà hángdang, bùtóng yánsè de liǎnpǔ dàibiǎo zhe bùtóng de xìnggé.',
          th: 'แท้จริงแล้วเข้าใจง่ายมากครับ! งิ้วปักกิ่งแบ่งเป็น 4 บทบาทหลักคือ เซิง ตั้น จิ้ง โฉ่ว หน้ากากแต่ละสีสื่อถึงอุปนิสัยที่แตกต่างกันครับ',
          en: 'Actually it is very easy to understand! Peking Opera is divided into four main roles: Sheng, Dan, Jing, and Chou; different facial makeup colors represent different personalities.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย (นักเดินทาง) 🧑‍💼',
          zh: '比如红脸代表忠义，黑脸代表正直对吧？武戏演员的绝活更是令人叹为观止。',
          pinyin: 'Bǐrú hóngliǎn dàibiǎo zhōngyì, hēiliǎn dàibiǎo zhèngzhí duì ba? Wǔxì yǎnyuán de juéhuó gèng shì lìngrén tànwéiguānzhǐ.',
          th: 'เช่น หน้าแดงสื่อถึงความภักดี หน้าดำสื่อถึงความเที่ยงธรรมใช่ไหมครับ? ทักษะไม้ตายของนักแสดงคิวบู๊ยิ่งน่าทึ่งจนต้องอุทาน',
          en: 'For example, red faces represent loyalty and black faces represent uprightness, right? The martial actors\' stunts are even more breathtaking.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ผู้เชี่ยวชาญงิ้ว) 👨‍🏫',
          zh: '你说得很准！台上一分钟，台下十年功，每一出戏都是艺人们心血的结晶。',
          pinyin: 'Nǐ shuō de hěn zhǔn! Tái shàng yì fēnzhōng, tái xià shí nián gōng, měi yì chū xì dōu shì yìmén xīnxuè de jiéjīng.',
          th: 'คุณพูดได้แม่นยำมาก! บนเวทีหนึ่งนาที ล่างเวทีสิบปีฝึกฝน ละครทุกเรื่องล้วนเป็นหยาดเหงื่อแรงใจของครูศิลปินทั้งสิ้นครับ',
          en: 'You said it very accurately! One minute on stage takes ten years of practice off stage; every play is the crystallization of the artists\' devotion.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย (นักเดินทาง) 🧑‍💼',
          zh: '我和朋友特别喜欢参加这种文化交流活动，既能学到丰富知识，又能提高审美水平！',
          pinyin: 'Wǒ hé péngyou tèbié xǐhuan cānjiā zhè zhǒng wénhuà jiāoliú huódòng, jì néng xuédào fēngfù zhīshi, yòu néng tígāo shěnměi shuǐpíng!',
          th: 'ผมกับเพื่อนชอบเข้าร่วมกิจกรรมแลกเปลี่ยนทางวัฒนธรรมแบบนี้เป็นพิเศษ ทั้งได้เรียนรู้ความรู้ที่หลากหลาย และได้ยกระดับรสนิยมความงามด้วยครับ!',
          en: 'My friend and I especially love attending such cultural exchange activities, both learning rich knowledge and raising aesthetic appreciation!'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ผู้เชี่ยวชาญงิ้ว) 👨‍🏫',
          zh: '欢迎经常来！我们很愿意向大家认真介绍，共同努力保护这些珍贵的非遗文化。',
          pinyin: 'Huānyíng jīngcháng lái! Wǒmen hěn yuànyì xiàng dàjiā rènzhēn jièshào, gòngtóng nǔlì bǎohù zhèxiē zhēnguì de fēiyí wénhuà.',
          th: 'ยินดีต้อนรับให้มาบ่อยๆ ครับ! พวกเรายินดีแนะนำอย่างจริงจังให้ทุกคน และร่วมกันพยายามปกป้องมรดกวัฒนธรรมล้ำค่าเหล่านี้ครับ',
          en: 'Welcome to visit often! We are very willing to earnestly introduce it to everyone and work together to protect these precious intangible heritage cultures.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ในงิ้วปักกิ่ง '生旦净丑' (shēng dàn jìng chǒu) คำว่า '旦' (dàn) หมายถึงตัวละครบทบาทใด?",
          options: [
            'ตัวละครหญิง / ตัวนาง',
            'ตัวละครชาย / ตัวพระ',
            'ตัวละครหน้าลายดุดัน',
            'ตัวตลกตลกขบขัน'
          ],
          correct_index: 0,
          explanation_th: "'旦' (dàn) ในงิ้วปักกิ่งหมายถึงตัวละครเพศหญิง (ตัวนาง) เช่น มู่หลาน หรือนางสนมเอก",
          encouragement: 'ถูกต้องยอดเยี่ยม! รู้ลึกถึงบทบาทนาฏศิลป์จีนโบราณ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '脸谱' (liǎnpǔ) ในงิ้วปักกิ่งหมายถึงสิ่งใด?",
          options: [
            'ลวดลายสีสันบนใบหน้างิ้วที่บอกอุปนิสัยตัวละคร',
            'บทพูดของละคร',
            'รองเท้าและเครื่องแต่งกาย',
            'ตั๋วเข้าชมนิทรรศการ'
          ],
          correct_index: 0,
          explanation_th: "'脸谱' คือศิลปะการแต่งแต้มสีสันบนใบหน้างิ้วเพื่อบ่งบอกบุคลิกและความซื่อสัตย์/คดโกงของตัวละคร",
          encouragement: 'แม่นยำมาก! เข้าใจสัญลักษณ์ศิลปะจีนชั้นสูง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "งิ้วปักกิ่งแบ่งออกเป็น 4 บทบาทหลัก ได้แก่ เซิง ตั้น จิ้ง โฉ่ว"',
          tokens: ['京剧', '四大行当', '划分为', '生旦净丑'],
          correct_sequence: ['京剧', '划分为', '生旦净丑', '四大行当'],
          pinyin: 'Jīngjù huàfēn wéi shēng dàn jìng chǒu sì dà hángdang.',
          meaning_th: 'งิ้วปักกิ่งแบ่งออกเป็น 4 บทบาทหลักคือ เซิง ตั้น จิ้ง โฉ่ว',
          explanation_th: 'ประธาน (京剧) + กริยา (划分为) + นามระบุเจาะจง (生旦净丑) + คำลักษณนาม/หมวดหมู่ (四大行当)',
          encouragement: 'เก่งมาก! ประกอบประโยคโครงสร้างวัฒนธรรมได้อย่างถูกต้อง!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '脸谱' ตัว '脸' (ใบหน้า) มีหมวดนำใด?",
          options: [
            '月 (หมวดเนื้อ 肉/月字旁)',
            '目 (หมวดตา 目字旁)',
            '口 (หมวดปาก 口字旁)',
            '手 (หมวดมือ 手字旁)'
          ],
          correct_index: 0,
          explanation_th: "'脸' มีหมวด '月' (ซึ่งแผลงมาจาก 肉 สื่อถึงอวัยวะและเนื้อเยื่อของร่างกายมนุษย์)",
          encouragement: 'รู้ลึกถึงวิวัฒนาการอักษรจีนเป็นเลิศ!'
        }
      ]
    },
    {
      lesson_id: 't3_u37_l02',
      lesson_number: 2,
      title: {
        zh: '水墨丹青与留白',
        th: 'จิตรกรรมพู่กันจีนและสุนทรียภาพแห่งความว่าง',
        en: 'Ink Wash Painting & Aesthetic Emptiness'
      },
      can_do: {
        th: 'อธิบายเทคนิคจิตรกรรมพู่กันจีน ปรัชญาการเว้นที่ว่าง (留白) และสุนทรียอารมณ์ (意境)',
        en: 'Discuss ink wash techniques, the philosophy of negative space (Liubai), and aesthetic mood (Yijing)'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องศิลปะภาพวาดพู่กันจีนและปรัชญาความว่างอย่างมีรสนิยม!',
      vocabulary: [
        {
          id: 'hsk3_3706',
          hanzi: '水墨',
          pinyin: 'shuǐmò',
          display_pinyin: 'shuǐmò',
          pinyin_tone: 'shui3mo4',
          meaning_th: 'ภาพวาดหมึกจีน / ศิลปะหมึกและน้ำ',
          meaning_en: 'ink and wash painting',
          radical: '氵',
          radical_name_th: 'หมวดน้ำ (三点水)',
          stroke_count: 19,
          mnemonic: 'น้ำสะอาด (水) ผสมผสานกับแท่งหมึกดำสนิท (墨) = ภาพวาดหมึกจีน',
          kid_mnemonic: 'หยดหมึกสีดำหยดลงในแก้วน้ำแล้วแผ่กระจายเป็นสายหมอก = 水墨',
          body_gesture: 'ทำมือจุ่มพู่กันแล้วปาดเส้นโค้งพลิ้วไหวในอากาศ'
        },
        {
          id: 'hsk3_3707',
          hanzi: '留白',
          pinyin: 'liúbái',
          display_pinyin: 'liúbái',
          pinyin_tone: 'liu2bai2',
          meaning_th: 'การเว้นพื้นที่ว่างในงานศิลปะเพื่อสร้างจินตนาการ',
          meaning_en: 'leaving blank space in art / negative space',
          radical: '田',
          radical_name_th: 'หมวดทุ่งนา (田字旁)',
          stroke_count: 15,
          mnemonic: 'คงเหลือเก็บไว้ (留) ให้เป็นผืนกระดาษสีขาวบริสุทธิ์ (白) = การเว้นที่ว่าง',
          kid_mnemonic: 'ภาพวาดภูเขาที่ด้านล่างปล่อยเป็นสีขาวเหมือนทะเลหมอกลอยอยู่ = 留白',
          body_gesture: 'กางสองมือออกทำท่าเว้นพื้นที่ว่างกว้างๆ ระหว่างสองมือ'
        },
        {
          id: 'hsk3_3708',
          hanzi: '意境',
          pinyin: 'yìjìng',
          display_pinyin: 'yìjìng',
          pinyin_tone: 'yi4jing4',
          meaning_th: 'สุนทรียอารมณ์ / ห้วงบรรยากาศทางศิลปะที่ลึกซึ้ง',
          meaning_en: 'artistic conception / aesthetic mood',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 24,
          mnemonic: 'ความหมายและเจตจำนงในใจ (意) บรรจบกับอาณาเขตพรมแดน (境) = สุนทรียอารมณ์',
          kid_mnemonic: 'ยืนมองยอดเขาในสายหมอกพร้อมเสียงพิณลอยมาให้ความรู้สึกลึกซึ้ง = 意境',
          body_gesture: 'หลับตาพริ้มแล้วเอามือแตะที่หน้าอกซึมซับบรรยากาศ'
        },
        {
          id: 'hsk3_3709',
          hanzi: '气韵',
          pinyin: 'qìyùn',
          display_pinyin: 'qìyùn',
          pinyin_tone: 'qi4yun4',
          meaning_th: 'จังหวะชีวิตชีวาและพลังแห่งเส้นสายพู่กัน (ชีอวิ้น)',
          meaning_en: 'vitality and charm in painting / spirit resonance',
          radical: '气',
          radical_name_th: 'หมวดลมปราณ (气字头)',
          stroke_count: 17,
          mnemonic: 'ลมปราณแห่งชีวิต (气) ผสานท่วงทำนองสัมผัสอันไพเราะ (韵) = พลังชีวิตชีวา',
          kid_mnemonic: 'สายลมสีฟ้าพัดผ่านยอดไผ่จนใบไหวเป็นคลื่นพลิ้วไหว = 气韵',
          body_gesture: 'วาดมือเป็นคลื่นลมปราณหมุนวนอย่างสง่างาม'
        },
        {
          id: 'hsk3_3710',
          hanzi: '丹青',
          pinyin: 'dānqīng',
          display_pinyin: 'dānqīng',
          pinyin_tone: 'dan1qing1',
          meaning_th: 'จิตรกรรม / สีชาดและสีคราม (คำโบราณเรียกศิลปะภาพวาด)',
          meaning_en: 'traditional painting / red and green colors',
          radical: '丿',
          radical_name_th: 'หมวดเส้นตวัดซ้าย (撇)',
          stroke_count: 12,
          mnemonic: 'สีชาดแดง (丹) และสีครามเขียวสด (青) สองสีหลักแห่งจิตรกรรมจีน = ภาพวาดศิลป์',
          kid_mnemonic: 'จานสีโบราณที่มีตลับสีแดงชาดและสีครามขัดมันวาว = 丹青',
          body_gesture: 'ทำท่าถือจานสีด้วยมือซ้ายและสะบัดพู่กันด้วยมือขวา'
        }
      ],
      tone_rule: {
        rule_name: 'การผันเสียง 留白 (liúbái) เสียง 2 คู่พลิ้วไหว',
        description_th: 'liú และ bái ล้วนเป็นเสียง 2 ให้ทอดเสียงขึ้นสูงอย่างนุ่มนวลเหมือนการตวัดปลายพู่กันขึ้นฟ้า',
        example: '巧妙留白 (qiǎomiào liúbái: การเว้นพื้นที่ว่างอย่างชาญฉลาด)',
        fun_metaphor: 'เหมือนปล่อยให้สายลมพัดระลอกคลื่นบนผิวน้ำ สองจังหวะเบาๆ',
        reassurance: 'ออกเสียง 2 ต่อกันได้อย่างลื่นไหลโดยไม่ต้องรีบร้อน'
      },
      grammar_bite: {
        title: 'โครงสร้างปรัชญาสุนทรียศาสตร์: 以...胜... / 所谓...，重在...',
        explanation_th: 'ใช้ในการอธิบายปรัชญาความงามของจีนที่เน้นจิตวิญญาณภายในมากกว่าความสมบูรณ์แบบภายนอก',
        patterns: [
          {
            formula: '以 + [ความเรียบง่าย/พื้นที่ว่าง] + 胜 + [ความหนาแน่น/ซับซ้อน]',
            zh: '中国画讲究“以无胜有，以少胜多”的留白艺术。',
            pinyin: 'Zhōngguó huà jiǎngjiu “yǐ wú shèng yǒu, yǐ shǎo shèng duō” de liúbái yìshù.',
            th: 'จิตรกรรมจีนพิถีพิถันกับศิลปะแห่งการเว้นที่ว่างที่ "ใช้ความว่างเอาชนะความมี ใช้ความน้อยเอาชนะความมาก"',
            en: 'Chinese painting values the art of negative space: "conquering fullness with emptiness, overcoming multiplicity with simplicity."'
          },
          {
            formula: '重在表现...的意境',
            zh: '水墨画不追求形似，重在表现深远的意境与气韵。',
            pinyin: 'Shuǐmòhuà bù zhuīqiú xíngsì, zhòng zài biǎoxiàn shēnyuǎn de yìjìng yǔ qìyùn.',
            th: 'ภาพวาดหมึกจีนไม่มุ่งเน้นความเหมือนจริงของรูปลักษณ์ หากแต่เน้นการถ่ายทอดสุนทรียอารมณ์และพลังชีวิตชีวาที่ลึกซึ้ง',
            en: 'Ink wash painting does not seek physical resemblance, focusing instead on expressing profound aesthetic mood and vitality.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลิน (ผู้เข้าชมนิทรรศการ) 👩‍💼',
          zh: '这幅山水画大面积都是空白，为什么被评为特等奖呢？',
          pinyin: 'Zhè fú shānshuǐhuà dà miànjī dōu shì kòngbái, wèishénme bèi píng wéi tèděngjiǎng ne?',
          th: 'ภาพวาดทิวทัศน์ภาพนี้พื้นที่ส่วนใหญ่เป็นสีขาวว่างเปล่า ทำไมถึงได้รับการตัดสินให้ได้รางวัลชนะเลิศพิเศษคะ?',
          en: 'This landscape painting has large areas of blank space, why was it awarded the grand prize?'
        },
        {
          speaker: 'B',
          speaker_name: 'จิตรกรเฉิน 👨‍🎨',
          zh: '这正是中国传统水墨画的精髓所在——“留白”。看似无物，实则给观者留足了想象空间。',
          pinyin: 'Zhè zhèng shì Zhōngguó chuántǒng shuǐmòhuà de jīngsuǐ suǒzài——“liúbái”. Kànsì wúwù, shízé gěi guānzhě liú zú le xiǎngxiàng kōngjiān.',
          th: 'นี่คือแก่นแท้ของภาพวาดพู่กันจีนโบราณเลยครับ นั่นคือ "การเว้นที่ว่าง" ดูเหมือนไม่มีสิ่งใด แต่แท้จริงแล้วเปิดพื้นที่จินตนาการให้ผู้ชมอย่างเต็มเปี่ยม',
          en: 'This is precisely the essence of traditional Chinese ink painting—"leaving blank space." Appearing empty, it actually leaves ample room for viewers\' imagination.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (ผู้เข้าชมนิทรรศการ) 👩‍💼',
          zh: '原来如此！难怪整幅画透着一种虚实相生、气韵生动的独特意境。',
          pinyin: 'Yuánlái rúcǐ! Nánguài zhěng fú huà tòu zhe yì zhǒng xūshí xiāngshēng, qìyùn shēngdòng de dútè yìjìng.',
          th: 'ที่แท้เป็นอย่างนี้นี่เอง! มิน่าล่ะทั้งภาพถึงสะท้อนสุนทรียอารมณ์อันโดดเด่นที่มีความจริงและความว่างเกื้อกูลกัน เต็มเปี่ยมด้วยชีวิตชีวา',
          en: 'So that is why! No wonder the entire painting radiates a unique aesthetic mood where void and solid coexist with vivid vitality.'
        },
        {
          speaker: 'B',
          speaker_name: 'จิตรกรเฉิน 👨‍🎨',
          zh: '丹青妙手，妙在通神。你已经真正领悟了东方艺术的美学密码！',
          pinyin: 'Dānqīng miàoshǒu, miào zài tōngshén. Nǐ yǐjīng zhēnzhèng lǐngwù le dōngfāng yìshù de měixué mìmǎ!',
          th: 'ยอดฝีมือแห่งพู่กันจีน ยอดเยี่ยมตรงการเข้าถึงจิตวิญญาณ คุณได้เข้าใจรหัสสุนทรียศาสตร์ของศิลปะตะวันออกอย่างแท้จริงแล้วครับ!',
          en: 'Master artists excel in capturing the divine spirit. You have truly comprehended the aesthetic code of oriental art!'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (ผู้เข้าชมนิทรรศการ) 👩‍💼',
          zh: '我买了好几本书，决定从今天开始认真学习水墨画，虽然有些难，但只要坚持练习一定能成功。',
          pinyin: 'Wǒ mǎi le hǎo jǐ běn shū, juédìng cóng jīntiān kāishǐ rènzhēn xuéxí shuǐmòhuà, suīrán yǒuxiē nán, dàn zhǐyào jiānchí liànxí yídìng néng chénggōng.',
          th: 'ฉันซื้อหนังสือมาหลายเล่ม ตัดสินใจเริ่มเรียนวาดภาพพู่กันจีนอย่างจริงจังตั้งแต่วันนี้ แม้จะค่อนข้างยาก แต่ขอเพียงมุ่งมั่นฝึกฝนย่อมประสบความสำเร็จแน่นอนค่ะ',
          en: 'I bought several books and decided to earnestly learn ink painting starting today; although a bit difficult, persisting in practice will surely bring success.'
        },
        {
          speaker: 'B',
          speaker_name: 'จิตรกรเฉิน 👨‍🎨',
          zh: '非常支持你！中国汉字书法和水墨画是相通的，遇到问题随时来找我，我们互相帮助，共同进步。',
          pinyin: 'Fēicháng zhīchí nǐ! Zhōngguó hànzì shūfǎ hé shuǐmòhuà shì xiāngtōng de, yùdào wèntí suíshí lái zhǎo wǒ, wǒmen hùxiāng bāngzhù, gòngtóng jìnbù.',
          th: 'สนับสนุนอย่างยิ่งครับ! การเขียนพู่กันจีนของอักษรจีนกับภาพวาดพู่กันจีนเชื่อมโยงถึงกัน พบปัญหามาหาผมได้ตลอดเวลา พวกเราช่วยเหลือซึ่งกันและกัน ก้าวหน้าไปด้วยกันครับ',
          en: 'I strongly support you! Chinese character calligraphy and ink painting are interconnected; whenever you have questions come find me, we help each other and progress together.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ในจิตรกรรมพู่กันจีน '留白' (liúbái) หมายถึงเทคนิคใด?",
          options: [
            'การจงใจเว้นพื้นที่ว่างในกระดาษเพื่อเปิดพื้นที่แห่งจินตนาการ',
            'การระบายสีขาวทับภาพทั้งหมด',
            'การลบภาพทิ้งเมื่อวาดผิดพลาด',
            'การเซ็นชื่อจิตรกรด้วยหมึกขาว'
          ],
          correct_index: 0,
          explanation_th: "'留白' คือปรัชญาและเทคนิคการจงใจเว้นพื้นที่ว่างในภาพวาดเพื่อให้เกิดสุนทรียอารมณ์ที่ลึกซึ้ง",
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจแก่นแท้ของศิลปะพู่กันจีนโบราณ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '意境' (yìjìng) ตรงกับแนวคิดข้อใดในงานศิลปะ?",
          options: [
            'สุนทรียอารมณ์และห้วงบรรยากาศทางศิลปะ (Artistic Conception / Aesthetic Mood)',
            'ราคาประมูลของภาพวาดในตลาด',
            'ขนาดความกว้างยาวของผืนผ้าใบ',
            'น้ำหนักของกรอบรูปไม้'
          ],
          correct_index: 0,
          explanation_th: "'意境' คือห้วงอารมณ์และบรรยากาศอันลึกซึ้งที่ผลงานศิลปะสร้างขึ้นในใจของผู้ชม",
          encouragement: 'จำศัพท์สุนทรียศาสตร์ได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ภาพวาดหมึกจีนมุ่งเน้นการแสดงออกซึ่งสุนทรียอารมณ์อันลึกซึ้ง"',
          tokens: ['深远的意境', '水墨画', '重在表现'],
          correct_sequence: ['水墨画', '重在表现', '深远的意境'],
          pinyin: 'Shuǐmòhuà zhòng zài biǎoxiàn shēnyuǎn de yìjìng.',
          meaning_th: 'ภาพวาดหมึกจีนมุ่งเน้นการแสดงออกซึ่งสุนทรียอารมณ์อันลึกซึ้ง',
          explanation_th: 'ประธาน (水墨画) + กริยาเน้นย้ำ (重在表现) + ส่วนขยายและกรรม (深远的意境)',
          encouragement: 'ประกอบประโยควิจารณ์ศิลปะได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '水墨' ตัว '墨' (หมึกดำ) มีส่วนประกอบด้านล่างเป็นอักษรใด?",
          options: [
            '土 (ดิน / ดำดั่งดินดำ 土字底)',
            '木 (ไม้ 木字底)',
            '金 (โลหะ 金字底)',
            '火 (ไฟ 四点底)'
          ],
          correct_index: 0,
          explanation_th: "'墨' ประกอบด้วย 黑 (สีดำ) ด้านบน และ 土 (ดิน) ด้านล่าง สื่อถึงเขม่าดำที่รวมตัวดั่งดินกลายเป็นแท่งหมึก",
          encouragement: 'วิเคราะห์โครงสร้างอักษรจีนได้ลึกซึ้งมาก!'
        }
      ]
    },
    {
      lesson_id: 't3_u37_l03',
      lesson_number: 3,
      title: {
        zh: '民间非遗剪纸与匠心',
        th: 'ศิลปะตัดกระดาษมรดกทางวัฒนธรรมและหัวใจช่างศิลป์',
        en: 'Folk Paper-Cutting & Craftsmanship'
      },
      can_do: {
        th: 'อธิบายศิลปะตัดกระดาษจีน การสืบทอดมรดกทางวัฒนธรรม (非遗) และใช้สำนวน 妙不可言',
        en: 'Explain paper-cutting, intangible heritage inheritance, and use the idiom 妙不可言'
      },
      baby_step_goal: 'เป้าหมายวันนี้: เล่าเรื่องศิลปะตัดกระดาษมงคลและใช้สำนวน 妙不可言 ชื่นชมความงดงาม!',
      vocabulary: [
        {
          id: 'hsk3_3711',
          hanzi: '剪纸',
          pinyin: 'jiǎnzhǐ',
          display_pinyin: 'jiǎnzhǐ',
          pinyin_tone: 'jian3zhi3',
          meaning_th: 'ศิลปะการตัดกระดาษจีน',
          meaning_en: 'paper-cutting art',
          radical: '刀',
          radical_name_th: 'หมวดมีด (刀字底)',
          stroke_count: 22,
          mnemonic: 'ใช้กรรไกรคม (剪) ตัดกระดาษสีแดงมงคล (纸) = ศิลปะตัดกระดาษ',
          kid_mnemonic: 'กรรไกรด้ามทองตัดกระดาษสีแดงออกมาเป็นรูปปลาหลี่ฮื้อกระโดดน้ำ = 剪纸',
          body_gesture: 'ทำนิ้วชี้กับนิ้วกลางขยับเป็นกรรไกรตัดฉับๆ ในอากาศ'
        },
        {
          id: 'hsk3_3712',
          hanzi: '雕刻',
          pinyin: 'diāokè',
          display_pinyin: 'diāokè',
          pinyin_tone: 'diao1ke4',
          meaning_th: 'แกะสลัก / สลักเสลาอย่างประณีต',
          meaning_en: 'to carve / to engrave',
          radical: '隹',
          radical_name_th: 'หมวดนกหางสั้น (隹字旁)',
          stroke_count: 24,
          mnemonic: 'ประณีตดั่งขนนก (雕) กรีดคมมีดสลักลงบนวัสดุ (刻) = แกะสลัก',
          kid_mnemonic: 'ช่างสลักกำลังใช้สิ่วแกะลายมังกรบนแผ่นไม้หอมอย่างตั้งใจ = 雕刻',
          body_gesture: 'ทำมือข้างหนึ่งจับสิ่ว อีกข้างเคาะค้อนเบาๆ'
        },
        {
          id: 'hsk3_3713',
          hanzi: '传承',
          pinyin: 'chuánchéng',
          display_pinyin: 'chuánchéng',
          pinyin_tone: 'chuan2cheng2',
          meaning_th: 'สืบทอด / การถ่ายทอดมรดกภูมิปัญญาจากรุ่นสู่รุ่น',
          meaning_en: 'to inherit / pass down from generation to generation',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 14,
          mnemonic: 'คนส่งต่อ (传) ให้คนรุ่นหลังรับช่วงต่อ (承) = สืบทอดมรดก',
          kid_mnemonic: 'คุณยายจับมือน้อยของหลานสาวสอนจับกรรไกรตัดกระดาษลายดอกโบตั๋น = 传承',
          body_gesture: 'สองมือยื่นออกไปรับของล้ำค่าจากด้านบนแล้วประคองไว้ที่อก'
        },
        {
          id: 'hsk3_3714',
          hanzi: '妙不可言',
          pinyin: 'miào bù kě yán',
          display_pinyin: 'miào bù kě yán',
          pinyin_tone: 'miao4 bu4 ke3 yan2',
          meaning_th: 'มหัศจรรย์ล้ำเลิศจนยากจะบรรยายเป็นคำพูด',
          meaning_en: 'too wonderful for words / beyond description',
          radical: '女',
          radical_name_th: 'หมวดผู้หญิง (女字旁)',
          stroke_count: 26,
          mnemonic: 'ความงดงามอัศจรรย์ (妙) มิอาจ (不可) ใช้คำพูดพรรณนาได้หมด (言) = มหัศจรรย์เกินบรรยาย',
          kid_mnemonic: 'หน้าต่างกระจกที่มีลายฉลุกระดาษสะท้อนแสงอาทิตย์วิบวับสวยจนทุกคนอ้าปากค้าง = 妙不可言',
          body_gesture: 'สองมือยกขึ้นระดับอกส่ายนิ้วระยิบระยับพร้อมส่ายหน้ายิ้มชื่นชม'
        },
        {
          id: 'hsk3_3715',
          hanzi: '手艺',
          pinyin: 'shǒuyì',
          display_pinyin: 'shǒuyì',
          pinyin_tone: 'shou3yi4',
          meaning_th: 'ฝีมือช่างหัตถกรรม / ทักษะงานฝีมือ',
          meaning_en: 'craftsmanship / handicraft skill',
          radical: '手',
          radical_name_th: 'หมวดมือ (手字旁)',
          stroke_count: 8,
          mnemonic: 'สองมือทำงาน (手) จนกลั่นเป็นศิลปวิทยาการชั้นสูง (艺) = ฝีมือช่างหัตถกรรม',
          kid_mnemonic: 'มือที่มีร่องรอยประสบการณ์กำลังปั้นและตัดผลงานอย่างคล่องแคล่ว = 手艺',
          body_gesture: 'กางสองมือพลิกดูฝ่ามือแล้วทำท่าสัมผัสงานศิลป์'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงสำนวน 妙不可言 (miào bù kě yán)',
        description_th: 'คำว่า 不 อยู่หน้า kě (เสียง 3) จึงออกเสียงเป็น bù (เสียง 4) ปกติ ให้เน้น miào หนักแน่นแล้วทอดเสียง yán ก้องกังวาน',
        example: '这门手艺真是妙不可言！',
        fun_metaphor: 'เหมือนเห็นดาวตกวูบหนึ่งแล้วอุทานจากใจ: ยอด... เยี่ยม... เกิน... บรรยาย!',
        reassurance: 'สำนวน 4 ตัวอักษรนี้ใช้ได้ในทุกสถานการณ์ที่ต้องการชื่นชมความงามระดับวิจิตรบรรจง'
      },
      grammar_bite: {
        title: 'โครงสร้างการสืบสานมรดกวัฒนธรรม: 世代相传 / 将...一代代传承下去',
        explanation_th: 'ใช้ในการพูดถึงความรับผิดชอบและการอนุรักษ์มรดกภูมิปัญญาทางวัฒนธรรม',
        patterns: [
          {
            formula: '把这门 + [ทักษะ/มรดก] + 一代代传承下去',
            zh: '民间艺人们坚守初心，把剪纸这门手艺一代代传承下去。',
            pinyin: 'Mínjiān yìmén jiānshǒu chūxīn, bǎ jiǎnzhǐ zhè mén shǒuyì yídàidài chuánchéng xiàqu.',
            th: 'ช่างศิลป์พื้นบ้านยังคงยึดมั่นในปณิธานแรก ถ่ายทอดงานฝีมือการตัดกระดาษนี้สืบต่อไปรุ่นสู่รุ่น',
            en: 'Folk artisans uphold their original aspiration, passing down the craft of paper-cutting from generation to generation.'
          },
          {
            formula: '其巧夺天工之处，令人感到妙不可言',
            zh: '这件非遗雕刻作品，其精巧之处真是妙不可言！',
            pinyin: 'Zhè jiàn fēiyí diāokè zuòpǐn, qí jīngqiǎo zhī chù zhēn shì miào bù kě yán!',
            th: 'ผลงานแกะสลักมรดกทางวัฒนธรรมชิ้นนี้ ความประณีตวิจิตรของมันช่างมหัศจรรย์จนยากจะบรรยาย!',
            en: 'This intangible heritage carving piece, its exquisiteness is truly beyond words!'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย (นักเดินทาง) 🧑‍💼',
          zh: '奶奶，您用一把普通的剪刀，几分钟就能剪出这么生动的喜鹊，太神奇了！',
          pinyin: 'Nǎinai, nín yòng yì bǎ pǔtōng de jiǎndāo, jǐ fēnzhōng jiù néng jiǎn chū zhème shēngdòng de xǐquè, tài shénqí le!',
          th: 'คุณยายครับ คุณยายใช้กรรไกรธรรมดาเล่มเดียว เพียงไม่กี่นาทีก็ตัดออกมาเป็นนกสาลิกาที่ดูมีชีวิตชีวาขนาดนี้ มหัศจรรย์มากเลยครับ!',
          en: 'Grandma, using an ordinary pair of scissors, you cut out such a vivid magpie in minutes, that is truly amazing!'
        },
        {
          speaker: 'B',
          speaker_name: 'ยายจาง (ช่างตัดกระดาษมรดกทางวัฒนธรรม) 👵',
          zh: '熟能生巧嘛。这剪纸手艺在我们村已经传承了上百年，全靠手感和心意。',
          pinyin: 'Shú néng shēng qiǎo ma. Zhè jiǎnzhǐ shǒuyì zài wǒmen cūn yǐjīng chuánchéng le shàng bǎi nián, quán kào shǒugǎn hé xīnyì.',
          th: 'การฝึกฝนจนชำนาญย่อมเกิดความคล่องแคล่วจ้ะ งานฝีมือตัดกระดาษนี้สืบทอดในหมู่บ้านเรามากว่าร้อยปีแล้ว อาศัยความรู้สึกของมือและความใส่ใจล้วนๆ',
          en: 'Practice makes perfect. This paper-cutting craft has been passed down in our village for over a century, relying entirely on touch and heart.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย (นักเดินทาง) 🧑‍💼',
          zh: '看那些镂空的花纹，线条细腻流畅，真是妙不可言！',
          pinyin: 'Kàn nàxiē lòukōng de huāwén, xiàntiáo xìnì liúchàng, zhēn shì miào bù kě yán!',
          th: 'ดูลวดลายฉลุโปร่งพวกนั้นสิครับ เส้นสายประณีตและลื่นไหล ช่างงดงามจนยากจะบรรยายจริงๆ ครับ!',
          en: 'Look at those hollowed patterns, the lines are delicate and flowing, truly wonderful beyond words!'
        },
        {
          speaker: 'B',
          speaker_name: 'ยายจาง (ช่างตัดกระดาษมรดกทางวัฒนธรรม) 👵',
          zh: '欢迎你来学习，年轻人愿意传承，我们这些老手艺才不会失传。',
          pinyin: 'Huānyíng nǐ lái xuéxí, niánqīngrén yuànyì chuánchéng, wǒmen zhèxiē lǎo shǒuyì cái bú huì shīchuán.',
          th: 'ยินดีให้เธอมาเรียนรู้นะ หากคนรุ่นใหม่ยินดีสืบทอด งานฝีมือโบราณของพวกเราก็จะไม่สูญหายไปตามกาลเวลาจ้ะ',
          en: 'Welcome to learn, as long as young people are willing to inherit, our old crafts will not be lost.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย (นักเดินทาง) 🧑‍💼',
          zh: '我一定向更多外国朋友推荐这门神奇的手艺，让大家都清楚了解中国传统文化！',
          pinyin: 'Wǒ yídìng xiàng gèng duō wàiguó péngyou tuījiàn zhè mén shénqí de shǒuyì, ràng dàjiā dōu qīngchu liǎojiě Zhōngguó chuántǒng wénhuà!',
          th: 'ผมจะแนะนำงานฝีมือมหัศจรรย์นี้ให้เพื่อนชาวต่างชาติอย่างแน่นอน เพื่อให้ทุกคนเข้าใจวัฒนธรรมประเพณีจีนอย่างแจ่มแจ้งครับ!',
          en: 'I will certainly recommend this magical craft to more foreign friends, letting everyone clearly understand traditional Chinese culture!'
        },
        {
          speaker: 'B',
          speaker_name: 'ยายจาง (ช่างตัดกระดาษมรดกทางวัฒนธรรม) 👵',
          zh: '太好了！大家齐心协力互相合作，这就是对民间手艺最好的支持。',
          pinyin: 'Tài hǎo le! Dàjiā qíxīnxiélì hùxiāng hézuò, zhè jiù shì duì mínjiān shǒuyì zuì hǎo de zhīchí.',
          th: 'ดีเหลือเกินจ้ะ! ทุกคนร่วมแรงร่วมใจช่วยเหลือร่วมมือกัน นี่คือการสนับสนุนงานฝีมือพื้นบ้านที่ดีที่สุดเลยจ้ะ',
          en: 'Wonderful! Everyone uniting efforts and cooperating with each other is the best support for folk crafts.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "สำนวน '妙不可言' (miào bù kě yán) มีความหมายตรงกับข้อใด?",
          options: [
            'งดงามล้ำเลิศจนยากจะหาคำใดมาบรรยายได้หมด',
            'ราคาแพงจนไม่มีใครกล้าซื้อ',
            'ส่งเสียงดังหนวกหูจนพูดคุยไม่รู้เรื่อง',
            'ข้อสอบยากจนทำไม่ทัน'
          ],
          correct_index: 0,
          explanation_th: "'妙不可言' หมายถึง สิ่งที่วิเศษ มหัศจรรย์ ล้ำลึกจนคำพูดไม่สามารถบรรยายได้ครบถ้วน",
          encouragement: 'ถูกต้องยอดเยี่ยม! จับความหมายสำนวนสุภาษิตจีนชั้นสูงได้เป๊ะมาก!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '非遗' ย่อมาจากคำเต็มว่าอะไรในภาษาจีน?",
          options: [
            '非物质文化遗产 (มรดกภูมิปัญญาทางวัฒนธรรมที่จับต้องไม่ได้)',
            '非常有意思的事物',
            '非买不可的商品',
            '非常漂亮的衣服'
          ],
          correct_index: 0,
          explanation_th: "'非遗' ย่อมาจาก '非物质文化遗产' (Intangible Cultural Heritage) เช่น งิ้วปักกิ่งและศิลปะตัดกระดาษ",
          encouragement: 'รอบรู้บริบทวัฒนธรรมจีนระดับสูงเป็นเลิศ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ช่างศิลป์ถ่ายทอดงานฝีมือตัดกระดาษนี้สืบต่อไปรุ่นสู่รุ่น"',
          tokens: ['把剪纸手艺', '一代代', '传承下去', '民间艺人们'],
          correct_sequence: ['民间艺人们', '把剪纸手艺', '一代代', '传承下去'],
          pinyin: 'Mínjiān yìmén bǎ jiǎnzhǐ shǒuyì yídàidài chuánchéng xiàqu.',
          meaning_th: 'ช่างศิลป์พื้นบ้านถ่ายทอดงานฝีมือตัดกระดาษนี้สืบต่อไปรุ่นสู่รุ่น',
          explanation_th: 'ประธาน (民间艺人们) + ประโยค 把 (把剪纸手艺) + ส่วนขยายลักษณะ (一代代) + กริยาทิศทาง (传承下去)',
          encouragement: 'เรียงประโยคโครงสร้าง 把 ได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '剪纸' ตัว '剪' (กรรไกร/ตัด) มีหมวดนำใดอยู่ด้านล่าง?",
          options: [
            '刀 (หมวดมีด 刀字底)',
            '力 (หมวดพลัง 力字底)',
            '十 (หมวดสิบ 十字底)',
            '口 (หมวดปาก 口字底)'
          ],
          correct_index: 0,
          explanation_th: "'剪' มี '刀' (มีด) ด้านล่าง สื่อถึงคมมีดคู่ของกรรไกรที่ใช้ตัดฉับสิ่งของ",
          encouragement: 'เข้าใจรากศัพท์เครื่องมือได้อย่างแม่นยำ!'
        }
      ]
    },
    {
      lesson_id: 't3_u37_l04',
      lesson_number: 4,
      title: {
        zh: '传统乐器古筝与琵琶',
        th: 'เครื่องดนตรีโบราณกู่เจิงและผีผา',
        en: 'Traditional Instruments: Guzheng & Pipa'
      },
      can_do: {
        th: 'อธิบายเสียงดนตรีเครื่องสายโบราณกู่เจิงและผีผา และคุณค่าในการขัดเกลาจิตใจ',
        en: 'Describe traditional string instruments Guzheng and Pipa, and their role in spiritual refinement'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องดนตรีคลาสสิกจีน และพิชิต Boss Challenge ภัณฑารักษ์นิทรรศการมรดกศิลป์!',
      vocabulary: [
        {
          id: 'hsk3_3716',
          hanzi: '古筝',
          pinyin: 'gǔzhēng',
          display_pinyin: 'gǔzhēng',
          pinyin_tone: 'gu3zheng1',
          meaning_th: 'กู่เจิง (พิณโบราณ 21 สายของจีน)',
          meaning_en: 'Guzheng / traditional Chinese zither',
          radical: '竹',
          radical_name_th: 'หมวดไม้ไผ่ (竹字头)',
          stroke_count: 19,
          mnemonic: 'เครื่องดนตรีโบราณ (古) ที่ทำจากไม้และเทียบเสียงดั่งไม้ไผ่กังวาน (筝) = กู่เจิง',
          kid_mnemonic: 'พิณไม้ยาวโบราณที่หย่องวางเรียงเป็นแถวเหมือนสะพานนกกระเรียน = 古筝',
          body_gesture: 'ทำนิ้วดีดสายพิณแนวนอนไปมาอย่างอ่อนช้อย'
        },
        {
          id: 'hsk3_3717',
          hanzi: '琵琶',
          pinyin: 'pípá',
          display_pinyin: 'pípá',
          pinyin_tone: 'pi2pa0',
          meaning_th: 'ผีผา (พิณ 4 สายรูปผลแพร์ของจีน)',
          meaning_en: 'Pipa / four-stringed Chinese lute',
          radical: '王',
          radical_name_th: 'หมวดหยก/กษัตริย์ (王字旁)',
          stroke_count: 24,
          mnemonic: 'กษัตริย์ดีดสายไปข้างหน้า (琵) และดีดสายกลับมาข้างหลัง (琶) = พิณผีผา',
          kid_mnemonic: 'นางฟ้าถือพิณรูปผลสาลี่แนบอกดีดเสียงดังกังวานใส = 琵琶',
          body_gesture: 'ทำท่าโอบกอดพิณแนวดิ่งแล้วรัวนิ้วดีดสาย'
        },
        {
          id: 'hsk3_3718',
          hanzi: '旋律',
          pinyin: 'xuánlǜ',
          display_pinyin: 'xuánlǜ',
          pinyin_tone: 'xuan2lu:4',
          meaning_th: 'ท่วงทำนองดนตรี (Melody)',
          meaning_en: 'melody / musical rhythm',
          radical: '方',
          radical_name_th: 'หมวดทิศทาง (方字旁)',
          stroke_count: 20,
          mnemonic: 'หมุนวนลอยละล่อง (旋) ตามกฎเกณฑ์เสียงดนตรี (律) = ท่วงทำนองดนตรี',
          kid_mnemonic: 'สายรุ้งโน้ตดนตรีลอยหมุนเป็นเกลียวคลื่นขึ้นสู่ท้องฟ้ายามค่ำคืน = 旋律',
          body_gesture: 'โบกมือซ้ายขวาเป็นคลื่นทำนองดนตรีนุ่มนวล'
        },
        {
          id: 'hsk3_3719',
          hanzi: '余音绕梁',
          pinyin: 'yú yīn rào liáng',
          display_pinyin: 'yú yīn rào liáng',
          pinyin_tone: 'yu2 yin1 rao4 liang2',
          meaning_th: 'เสียงดนตรีกังวานหวานซึ้งอ้อยอิ่งติดตรึงใจไม่รู้ลืม (ดุจลอยวนรอบขื่อหลังคา)',
          meaning_en: 'lingering sound echoing around the rafters / unforgettable music',
          radical: '人',
          radical_name_th: 'หมวดคน (人字头)',
          stroke_count: 38,
          mnemonic: 'เสียงที่ยังคงค้าง (余音) ลอยวนเวียนรอบ (绕) ขื่อคานบ้าน (梁) = เสียงไพเราะตรึงใจ',
          kid_mnemonic: 'บทเพลงที่เล่นจบไปแล้วแต่เสียงกริ๊งหวานยังคงลอยวนเวียนรอบตัวไม่จางหาย = 余音绕梁',
          body_gesture: 'ชี้นิ้วขึ้นเพดานแล้ววนนิ้วเป็นวงกลมช้าๆ สื่อถึงเสียงที่ลอยอ้อยอิ่ง'
        },
        {
          id: 'hsk3_3720',
          hanzi: '陶冶',
          pinyin: 'táoyě',
          display_pinyin: 'táoyě',
          pinyin_tone: 'tao2ye3',
          meaning_th: 'ขัดเกลาจิตใจและรสนิยม (ดั่งการเผาเครื่องปั้นดินเผาและหลอมโลหะ)',
          meaning_en: 'to cultivate / refine one\'s taste and mind',
          radical: '阝',
          radical_name_th: 'หมวดเนินดินซ้าย (左耳旁)',
          stroke_count: 20,
          mnemonic: 'ปั้นเผาเครื่องเคลือบ (陶) และหลอมโลหะบริสุทธิ์ (冶) = ขัดเกลารสนิยมและจิตใจ',
          kid_mnemonic: 'ดอกบัวในสระน้ำที่ค่อยๆ เบ่งบานรับแสงอรุณชโลมใจให้ผ่องใส = 陶冶',
          body_gesture: 'สองมือประกบที่หน้าอกหลับตายิ้มแสดงจิตใจที่สงบผ่องใส'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 琵琶 (pípa) พยางค์หลังเสียงเบา',
        description_th: 'คำว่า 琶 ในภาษาพูดมาตรฐานออกเป็นเสียงเบา (neutral tone: pa) ส่วน 琵 เป็นเสียง 2 (pí)',
        example: '弹琵琶 (tán pípa: ดีดพิณผีผา)',
        fun_metaphor: 'เหมือนดีดสายพิณดังกังวาน ปิ๊ง... แล้วปล่อยเสียงแผ่วเบา ป๊ะ',
        reassurance: 'เมื่อออกเสียงเบาได้อย่างถูกต้อง ผู้ฟังชาวจีนจะประทับใจในความเป็นธรรมชาติของคุณทันที!'
      },
      grammar_bite: {
        title: 'โครงสร้างการยกระดับจิตวิญญาณ: 能够陶冶情操，让内心获得...',
        explanation_th: 'ใช้ในการอธิบายประโยชน์ของการเสพงานศิลปะดนตรีในการฟื้นฟูและยกระดับจิตใจ',
        patterns: [
          {
            formula: '欣赏 + [ดนตรี/ศิลปะ], 能够陶冶情操，让内心获得 + [ความรู้สึก]',
            zh: '经常欣赏古筝曲，不仅能够陶冶情操，更能让内心获得久违的宁静。',
            pinyin: 'Jīngcháng xīnshǎng gǔzhēng qǔ, bùjǐn nénggòu táoyě qíngcāo, gèng néng ràng nèixīn huòdé jiǔwéi de níngjìng.',
            th: 'การฟังเพลงกู่เจิงเป็นประจำ ไม่เพียงช่วยขัดเกลาจิตใจ หากแต่ยังทำให้ภายในใจได้รับความสงบที่ห่างหายไปนาน',
            en: 'Regularly appreciating Guzheng music not only refines one\'s temperament but also brings long-lost inner peace.'
          },
          {
            formula: '曲调悠扬，真可谓余音绕梁',
            zh: '这首琵琶独奏曲调悠扬，演奏完毕真可谓余音绕梁，三日不绝。',
            pinyin: 'Zhè shǒu pípá dízòuqǔ qǔdiào yōuyáng, yǎnzòu wánbì zhēn kěwèi yú yīn rào liáng, sān rì bù jué.',
            th: 'เพลงเดี่ยวผีผาเพลงนี้ท่วงทำนองไพเราะพลิ้วไหว เมื่อบรรเลงจบช่างตราตรึงใจจนเสียงกังวานอ้อยอิ่งไม่รู้ลืม',
            en: 'This Pipa solo has a melodious tune, and after playing it truly lingers around the rafters, unforgettable.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลิน (ผู้ฟัง) 👩‍💼',
          zh: '刚才那段《高山流水》古筝演奏，旋律太动人了，仿佛把人带进了云雾仙境。',
          pinyin: 'Gāngcái nà duàn 《Gāoshān Liúshuǐ》 gǔzhēng yǎnzòu, xuánlǜ tài dòngrén le, fǎngfú bǎ rén dài jìn le yúnwù xiānjìng.',
          th: 'การบรรเลงกู่เจิงเพลง "ขุนเขาสายธาร" เมื่อสักครู่นี้ ท่วงทำนองช่างจับใจเหลือเกิน ราวกับพาผู้ฟังเข้าสู่แดนสวรรค์ในม่านเมฆเลยค่ะ',
          en: 'That Guzheng performance of "High Mountains and Flowing Water" just now was so moving, as if transporting one into a misty wonderland.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์จาง (นักดนตรี) 👨‍🎤',
          zh: '古筝音色清脆，琵琶金戈铁马，传统民乐重在以乐传情，陶冶听众的情操。',
          pinyin: 'Gǔzhēng yīnsè qīngcuì, pípá jīngētiěmǎ, chuántǒng mínyuè zhòng zài yǐ yuè chuán qíng, táoyě tīngzhòng de qíngcāo.',
          th: 'กู่เจิงมีสุ้มเสียงกังวานใส ผีผามีพลังดุดันดั่งทัพม้าศึก ดนตรีพื้นบ้านโบราณมุ่งเน้นการส่งผ่านความรู้สึกด้วยเสียงเพลงเพื่อขัดเกลาจิตใจผู้ฟังครับ',
          en: 'Guzheng has a crisp tone, while Pipa can evoke roaring battles; traditional music focuses on conveying emotion through sound to refine the listener\'s mind.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (ผู้ฟัง) 👩‍💼',
          zh: '一曲终了，依然令人感到余音绕梁，整个人彻底放松下来了。',
          pinyin: 'Yì qǔ zhōngliǎo, yīrán lìngrén gǎndào yú yīn rào liáng, zhěng ge rén chèdǐ fàngsōng xiàlai le.',
          th: 'บทเพลงจบลงแล้ว แต่ยังคงรู้สึกว่าเสียงกังวานอ้อยอิ่งตราตรึงใจ ทั้งร่างกายและจิตใจผ่อนคลายลงอย่างสิ้นเชิงเลยค่ะ',
          en: 'The song has ended, yet the music still lingers in the air, leaving the entire person completely relaxed.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์จาง (นักดนตรี) 👨‍🎤',
          zh: '这就是传统艺术的魅力，它能抚平现代人浮躁的内心。',
          pinyin: 'Zhè jiù shì chuántǒng yìshù de mèilì, tā néng fǔpíng xiàndàirén fúzào de nèixīn.',
          th: 'นี่คือเสน่ห์ของศิลปวัฒนธรรมโบราณครับ มันสามารถปลอบประโลมจิตใจที่กระวนกระวายของคนยุคใหม่ให้สงบนิ่งได้',
          en: 'This is the charm of traditional art; it soothes the restless minds of modern people.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (ผู้ฟัง) 👩‍💼',
          zh: '今天的音乐体验太满意了，不仅心情放松，更让我深深体会到了传统艺术的巨大价值。',
          pinyin: 'Jīntiān de yīnyuè tǐyàn tài mǎnyì le, bùjǐn xīnqíng fàngsōng, gèng ràng wǒ shēnshēn tǐhuì dào le chuántǒng yìshù de jùdà jiàzhí.',
          th: 'ประสบการณ์ดนตรีวันนี้ประทับใจพึงพอใจมากค่ะ ไม่เพียงอารมณ์ผ่อนคลาย หากแต่ยังทำให้ฉันสัมผัสถึงคุณค่าอันยิ่งใหญ่ของศิลปะดั้งเดิมอย่างลึกซึ้ง',
          en: 'Today\'s musical experience was so satisfying, not only relaxing my mind but also letting me deeply appreciate the great value of traditional arts.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์จาง (นักดนตรี) 👨‍🎤',
          zh: '能得到你的喜爱是我们最大的快乐，欢迎下次带更多朋友一起来听！',
          pinyin: 'Néng dédào nǐ de xǐ\'ài shì wǒmen zuì dà de kuàilè, huānyíng xià cì dài gèng duō péngyou yìqǐ lái tīng!',
          th: 'ได้รับความชื่นชอบจากคุณคือความสุขที่ยิ่งใหญ่ที่สุดของพวกเรา ยินดีต้อนรับให้พาเพื่อนๆ มาฟังด้วยกันในครั้งหน้านะครับ!',
          en: 'Gaining your love is our greatest joy; welcome to bring more friends together next time to listen!'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (ผู้ฟัง) 👩‍💼',
          zh: '太谢谢您了，认识您非常高兴，明天见！',
          pinyin: 'Tài xièxie nín le, rènshi nín fēicháng gāoxìng, míngtiān jiàn!',
          th: 'ขอบพระคุณมากค่ะ ดีใจมากที่ได้รู้จักคุณ ไว้พรุ่งนี้พบกันนะคะ!',
          en: 'Thank you so much, very glad to meet you, see you tomorrow!'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์จาง (นักดนตรี) 👨‍🎤',
          zh: '不客气，明天见，再见！',
          pinyin: 'Bú kèqi, míngtiān jiàn, zàijiàn!',
          th: 'ยินดีครับ พรุ่งนี้พบกัน ลาก่อนครับ!',
          en: 'You are welcome, see you tomorrow, goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "สำนวน '余音绕梁' (yú yīn rào liáng) ใช้พรรณนาถึงสิ่งใด?",
          options: [
            'เสียงดนตรีหรือเสียงร้องที่ไพเราะตราตรึงใจจนก้องกังวานอ้อยอิ่งไม่รู้ลืม',
            'เสียงฟ้าผ่าฟ้าร้องที่น่าสะพรึงกลัว',
            'เสียงเครื่องยนต์เสียที่ดังรบกวน',
            'เสียงคนทะเลาะกันในตลาด'
          ],
          correct_index: 0,
          explanation_th: "'余音绕梁' พรรณนาถึงเสียงดนตรีที่หวานซึ้งไพเราะจับใจ จนเสียงนั้นดูเหมือนลอยวนเวียนรอบขื่อหลังคาไม่ยอมจางหาย",
          encouragement: 'ถูกต้องยอดเยี่ยม! เข้าใจสำนวนดนตรีจีนคลาสสิกได้อย่างลึกซึ้ง!'
        },
        {
          type: 'flash_recall',
          question_th: "เครื่องดนตรีจีนโบราณ '琵琶' มีกี่สาย?",
          options: [
            '4 สาย',
            '2 สาย',
            '10 สาย',
            '21 สาย'
          ],
          correct_index: 0,
          explanation_th: "'琵琶' (ผีผา) มี 4 สายและมีรูปทรงคล้ายผลสาลี่ (ส่วนกู่เจิงมักมี 21 สาย)",
          encouragement: 'แม่นยำมาก! รู้รอบลึกซึ้งเรื่องเครื่องดนตรีจีน!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "การฟังเพลงกู่เจิงสามารถขัดเกลาจิตใจและสร้างความสงบภายใน"',
          tokens: ['获得内心的宁静', '欣赏古筝曲', '能够陶冶情操'],
          correct_sequence: ['欣赏古筝曲', '能够陶冶情操', '获得内心的宁静'],
          pinyin: 'Xīnshǎng gǔzhēng qǔ nénggòu táoyě qíngcāo huòdé nèixīn de níngjìng.',
          meaning_th: 'การฟังเพลงกู่เจิงสามารถขัดเกลาจิตใจและได้รับความสงบภายใน',
          explanation_th: 'ส่วนประธานกริยา (欣赏古筝曲) + กริยานุเคราะห์และผลลัพธ์ (能够陶冶情操) + ผลลัพธ์ต่อเนื่อง (获得内心的宁静)',
          encouragement: 'เรียงประโยคภาษาศิลปวัฒนธรรมได้อย่างงดงาม!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '古筝' ตัว '筝' (zhēng - กู่เจิง) มีหมวดนำใดอยู่ด้านบน?",
          options: [
            '竹 (หมวดไม้ไผ่ 竹字头)',
            '艸 (หมวดหญ้า 草字头)',
            '雨 (หมวดฝน 雨字头)',
            '宀 (หมวดหลังคา 宝盖头)'
          ],
          correct_index: 0,
          explanation_th: "'筝' มีหมวด '竹' (ไม้ไผ่) สื่อถึงเครื่องดนตรีโบราณที่ใช้วัสดุกระบอกไม้ไผ่เป็นส่วนประกอบในการสะท้อนเสียง",
          encouragement: 'สังเกตรากศัพท์เครื่องดนตรีได้อย่างเฉียบคม!'
        }
      ],
      boss_challenge: {
        scenario_th: 'ในฐานะภัณฑารักษ์นิทรรศการมรดกทางวัฒนธรรมจีน (Chinese Heritage Curator) คุณต้องกล่าวเปิดงานแนะนำคุณค่าของศิลปะดนตรี งิ้ว และภาพวาดพู่กันจีนต่อผู้เข้าชมนานาชาติ คุณควรกล่าวอย่างไรให้ทรงพลังและสะท้อนจิตวิญญาณตะวันออก?',
        options: [
          '中国传统艺术融合了京剧绝活、水墨留白与古乐陶冶，不仅技艺精湛妙不可言，更寄托着天人合一的东方美学，值得我们跨越国界一代代传承守护！ (Zhōngguó chuántǒng yìshù rónghé le Jīngjù juéhuó, shuǐmò liúbái yǔ gǔyuè táoyě, bùjǐn jìyì jīngzhàn miào bù kě yán, gèng jìtuō zhe tiānrén héyī de dōngfāng měixué, zhídé wǒmen kuàyuè guójiè yídàidài chuánchéng shǒuhù!)',
          '这些古老的东西已经过时了，大家随便拍几张照片发朋友圈就可以走了。 (Zhèxiē gǔlǎo de dōngxi yǐjīng guòshí le, dàjiā suíbiàn pāi jǐ zhāng zhàopiàn fā péngyǒuquān jiù kěyǐ zǒu le.)',
          '门票不能退换，请大家赶紧买纪念品。 (Ménpiào bù néng tuìhuàn, qǐng dàjiā gǎnjǐn mǎi jìniànpǐn.)',
          '今天天气太热了，我们还是回家吹空调吧。 (Jīntiān tiānqì tài rè le, wǒmen háishì huíjiā chuī kōngtiáo ba.)'
        ],
        correct_index: 0,
        explanation_th: "คำตอบ '中国传统艺术融合了京剧绝活、水墨留白与古乐陶冶...值得我们跨越国界一代代传承守护！' ร้อยเรียงมรดกทั้งสามด้านพร้อมสำนวน 妙不可言 และปรัชญาตะวันออกได้อย่างสมบูรณ์แบบที่สุด",
        encouragement: 'ยินดีด้วย! คุณพิชิต Boss Challenge ได้รับเสียงปรบมือกึกก้องจากผู้ฟังทั่วโลก!'
      },
      cheer_trophy: {
        badge_id: 'badge_t3_u37_master',
        badge_name: 'ปราชญ์สุนทรียศิลป์และมรดกวัฒนธรรมจีน 🎨🎭',
        message_th: 'สุดยอดมาก! คุณได้พิชิตบทเรียนยูนิตที่ 37 สำเร็จอย่างงดงาม เชี่ยวชาญศัพท์งิ้วปักกิ่ง ภาพพู่กันจีน ศิลปะตัดกระดาษ และเครื่องดนตรีคลาสสิกระดับ Master!',
        xp_reward: 300
      }
    }
  ]
};
