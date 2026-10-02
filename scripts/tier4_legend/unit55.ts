/**
 * scripts/tier4_legend/unit55.ts
 * Unit 55: 高层商务谈判与危机公关斡旋 (High-Level Business Negotiations & Crisis Mediation)
 * Tier 4 Legend - Unit 10 (L-10)
 * Strict typing, zero 'any', simplified Chinese only, tone sandhi compliant, interleaving >= 20%.
 */

export const unit55Data = {
  unit_id: 'tier4_u55',
  tier: 4,
  unit_number: 55,
  title: {
    zh: '高层商务谈判与危机公关斡旋',
    th: 'การเจรจาธุรกิจระดับสูงและการไกล่เกลี่ยวิกฤตประชาสัมพันธ์',
    en: 'High-Level Business Negotiations & Crisis Mediation'
  },
  description: 'เจาะลึกศิลปะการเจรจาการค้าระดับพันล้าน การบริหารแต้มต่อและการรักษาเส้นตาย การทลายทางตัน และการกอบกู้วิกฤตภาพลักษณ์ระดับโลก',
  lessons: [
    {
      lesson_id: 't4_u55_l01',
      lesson_number: 1,
      title: {
        zh: '战略博弈：谈判筹码与底线把控',
        th: 'หมากกลยุทธ์: แต้มต่อการเจรจาและการคุมเส้นตายขั้นต่ำ',
        en: 'Strategic Game: Bargaining Chips & Bottom Lines'
      },
      can_do: {
        th: 'ใช้คำศัพท์ทางยุทธศาสตร์การเจรจา เช่น 筹码, 博弈, 底线, 试探, 权衡 ในการประชุมวางแผนดีลธุรกิจระดับสูงได้',
        en: 'Master negotiation terms: Bargaining Chips, Game Theory, Bottom Line, Probing, and Weighing'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ใช้คำว่า 筹码 และ 底线 ในการวิเคราะห์แต้มต่อบนโต๊ะเจรจา!',
      vocabulary: [
        {
          id: 'hsk4_5501',
          hanzi: '筹码',
          pinyin: 'chóumǎ',
          display_pinyin: 'chóumǎ',
          pinyin_tone: 'chou2ma3',
          meaning_th: 'แต้มต่อในการเจรจา / ไพ่ต่อรอง (Bargaining chip / Leverage)',
          meaning_en: 'bargaining chip / counter / leverage',
          radical: '⺮',
          radical_name_th: 'หมวดไม้ไผ่ (竹字头)',
          stroke_count: 21,
          mnemonic: 'ติ้วไม้ไผ่วางแผนกลยุทธ์ (筹) ชั่งน้ำหนักชิ้นหมาก (码) = แต้มต่อการเจรจา',
          kid_mnemonic: 'หยิบเหรียญชิปทองคำวางบนโต๊ะเจรจาเพื่อแลกเปลี่ยนของรางวัลใหญ่ = 筹码',
          body_gesture: 'ใช้นิ้วโป้งและนิ้วชี้หยิบชิปทองคำวางลงบนโต๊ะอย่างมั่นใจ'
        },
        {
          id: 'hsk4_5502',
          hanzi: '博弈',
          pinyin: 'bóyì',
          display_pinyin: 'bóyì',
          pinyin_tone: 'bo2yi4',
          meaning_th: 'การเดินหมากประลองยุทธศาสตร์ / ทฤษฎีเกม (Game Theory / Strategic gaming)',
          meaning_en: 'game / strategic confrontation / gaming',
          radical: '十',
          radical_name_th: 'หมวดสิบ (十字儿)',
          stroke_count: 22,
          mnemonic: 'ประลองวิชาความรู้กว้างขวาง (博) เดินหมากรุกชิงชัย (弈) = การประลองกลยุทธ์',
          kid_mnemonic: 'นั่งจ้องกระดานหมากล้อมขยับเม็ดหมากขาวดำอย่างสุขุม = 博弈',
          body_gesture: 'ใช้นิ้วชี้และนิ้วกลางคีบตัวหมากวางลงบนกระดานอย่างหนักแน่น'
        },
        {
          id: 'hsk4_5503',
          hanzi: '底线',
          pinyin: 'dǐxiàn',
          display_pinyin: 'dǐxiàn',
          pinyin_tone: 'di3xian4',
          meaning_th: 'เส้นตายขั้นต่ำที่ยอมรับได้ / เงื่อนไขสุดท้ายที่ไม่อาจประนีประนอม (Bottom line / Red line)',
          meaning_en: 'bottom line / walk-away point / red line',
          radical: '广',
          radical_name_th: 'หมวดเพิงเรือน (广字旁)',
          stroke_count: 16,
          mnemonic: 'ฐานรากใต้ก้นบึ้ง (底) ขีดเส้นแดงชัดเจน (线) = เส้นตายขั้นต่ำ',
          kid_mnemonic: 'ขีดเส้นสีแดงหนาเตอะบนกระดาษว่าจุดนี้ห้ามล้ำเด็ดขาด = 底线',
          body_gesture: 'ใช้สันมือขวาสับลงบนโต๊ะทำเป็นเส้นตรงหนักแน่น'
        },
        {
          id: 'hsk4_5504',
          hanzi: '试探',
          pinyin: 'shìtàn',
          display_pinyin: 'shìtàn',
          pinyin_tone: 'shi4tan4',
          meaning_th: 'การหยั่งเชิง / การโยนหินถามทางเพื่อดูท่าทีอีกฝ่าย (Probe / Sound out)',
          meaning_en: 'probe / sound out / test the waters',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 19,
          mnemonic: 'ทดลองด้วยวาจา (试) เอื้อมมือคลำสำรวจทิศทาง (探) = หยั่งเชิงสำรวจ',
          kid_mnemonic: 'เอาปลายเท้าแตะผิวน้ำเบาๆ เพื่อตรวจดูว่าน้ำเย็นหรืออุ่น = 试探',
          body_gesture: 'ยื่นมือไปข้างหน้าอย่างระมัดระวังคลำหาทิศทาง'
        },
        {
          id: 'hsk4_5505',
          hanzi: '权衡',
          pinyin: 'quánhéng',
          display_pinyin: 'quánhéng',
          pinyin_tone: 'quan2heng2',
          meaning_th: 'การชั่งน้ำหนักเปรียบเทียบผลได้ผลเสีย (Weigh / Balance pros and cons)',
          meaning_en: 'weigh / balance / evaluate pros and cons',
          radical: '木',
          radical_name_th: 'หมวดต้นไม้ (木字旁)',
          stroke_count: 22,
          mnemonic: 'ลูกตุ้มตาชั่ง (权) คานตาชั่งที่ต้องรักษาระดับสมดุล (衡) = ชั่งน้ำหนักเปรียบเทียบ',
          kid_mnemonic: 'ตาชั่งสองแขนกำลังชั่งน้ำหนักเหรียญทองคำกับความเสี่ยง = 权衡',
          body_gesture: 'กางสองมือออกระดับอกทำท่าตาชั่งโยกขึ้นลงชั่งน้ำหนัก'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 筹码 (chóumǎ)',
        description_th: 'chóu (เสียง 2) mǎ (เสียง 3)',
        example: '增加谈判的重要筹码 (Zēngjiā tánpàn de zhòngyào chóumǎ)',
        fun_metaphor: 'คำว่า chóu mǎ มีพลังแห่งการควบคุมกระดานหมากในกำมือ',
        reassurance: 'คำศัพท์ที่ต้องใช้ในการเจรจาควบรวมกิจการ (M&A) และการค้าเสรี'
      },
      grammar_bite: {
        title: 'โครงสร้างการวิเคราะห์แต้มต่อ: 手握关键筹码，牢牢守住底线',
        formula: '在多方高层博弈中，精准试探对方意图，手握核心技术筹码，牢牢守住商业底线',
        explanation_th: 'ใช้ในการเตรียมความพร้อมก่อนเข้าสู่ห้องเจรจาการค้าระดับพันล้าน',
        patterns: [
          {
            formula: '手握核心筹码，牢守合作底线。',
            zh: '我们必须在谈判桌上手握自主研发的核心专利筹码，坚决捍卫企业的利益底线。',
            pinyin: 'Wǒmen bìxū zài tánpànzhuō shang shǒuwò zìzhǔ yánfā de héxīn zhuānlì chóumǎ, jiānjué hànwèi qǐyè de lìyì dǐxiàn.',
            th: 'พวกเราต้องกุมแต้มต่อสิทธิบัตรหลักที่วิจัยพัฒนาเองไว้บนโต๊ะเจรจา และพิทักษ์เส้นตายแห่งผลประโยชน์ขององค์กรอย่างเด็ดเดี่ยว',
            en: 'We must hold core self-developed patent chips at the negotiation table, resolutely defending our enterprise\'s interest bottom line.'
          },
          {
            formula: '全面权衡利弊，反复试探摸底。',
            zh: '在启动跨国并购前，团队通过非正式渠道深入试探对方底牌，反复权衡投资回报与法律风险。',
            pinyin: 'Zài qǐdòng kuàguó bìnggòu qián, tuánduì tōngguò fēizhèngshì qúdào shēnrù shìtàn duìfāng dǐpái, fǎnfù quánhéng tóuzī huíbào yǔ fǎlǜ fēngxiǎn.',
            th: 'ก่อนเริ่มการควบรวมกิจการข้ามชาติ ทีมงานได้หยั่งเชิงตรวจดูไพ่ตายของอีกฝ่ายผ่านช่องทางไม่เป็นทางการ และชั่งน้ำหนักผลตอบแทนการลงทุนกับความเสี่ยงทางกฎหมายอย่างรอบคอบ',
            en: 'Before launching the cross-border M&A, the team deeply probed the other side\'s hand through informal channels, repeatedly weighing ROI against legal risks.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '首席谈判代表 (Chief Negotiator) 👔',
          zh: '各位团队成员，明天我们将与跨国巨头展开最终轮合并谈判，大家务必保持高度专注。',
          pinyin: 'Gèwèi tuánduì chéngyuán, míngtiān wǒmen jiāng yǔ kuàguó jùtóu zhǎnkāi zuìzhōng lún hébìng tánpàn, dàjiā wùbì bǎochí gāodù zhuānzhù.',
          th: 'สมาชิกในทีมทุกท่าน พรุ่งนี้เราจะเปิดการเจรจาควบรวมกิจการรอบสุดท้ายกับบริษัทยักษ์ใหญ่ข้ามชาติ ทุกคนต้องรักษาสมาธิอย่างสูงที่สุดครับ',
          en: 'Team members, tomorrow we will start the final round of merger negotiations with the multinational giant; everyone must maintain high focus.',
          audio_trigger: 't4_u55_l01_d01'
        },
        {
          speaker: '战略副总裁 (VP of Strategy) 📊',
          zh: '经过前几轮的反复试探，我们已经摸清了对方的核心诉求，我们的全球供应链网络是最大的谈判筹码。',
          pinyin: 'Jīngguò qián jǐ lún de fǎnfù shìtàn, wǒmen yǐjīng mōqīng le duìfāng de héxīn sùqiú, wǒmen de quánqiú gōngyìngliàn wǎngluò shì zuìdà de tánpàn chóumǎ.',
          th: 'หลังผ่านการหยั่งเชิงหลายรอบ เราจับความต้องการหลักของอีกฝ่ายได้ชัดเจนแล้ว เครือข่ายห่วงโซ่อุปทานระดับโลกของเราคือแต้มต่อการเจรจาที่ใหญ่ที่สุดครับ',
          en: 'Through repeated probing in earlier rounds, we mapped out their core demands; our global supply chain network is our biggest bargaining chip.',
          audio_trigger: 't4_u55_l01_d02'
        },
        {
          speaker: '首席谈判代表 (Chief Negotiator) 👔',
          zh: '很好！知己知彼百战不殆。但必须明确，核心技术控股权是我们的绝对底线，决不允许任何让步！',
          pinyin: 'Hěn hǎo! Zhījǐzhībǐ bǎizhànbùdài. Dàn bìxū míngquè, héxīn jìshù kònggǔquán shì wǒmen de juéduì dǐxiàn, jué bù yǔnxǔ rènhé ràngbù!',
          th: 'ดีมาก! รู้เขารู้รบร้อยครั้งมิพ่าย แต่ต้องชี้ชัดว่า อำนาจการถือหุ้นควบคุมเทคโนโลยีหลักคือเส้นตายเด็ดขาดของเรา ไม่อนุญาตให้มีการยอมถอยใดๆ ทั้งสิ้น!',
          en: 'Very good! Know yourself and know your enemy. But clarify: controlling stake in core technology is our absolute bottom line, allowing no concession whatsoever!',
          audio_trigger: 't4_u55_l01_d03'
        },
        {
          speaker: '战略副总裁 (VP of Strategy) 📊',
          zh: '请总指挥放心！我们已经权衡好各种博弈预案，只要坚持战略定力，胜利必将属于我们！',
          pinyin: 'Qǐng zǒngzhǐhuī fàngxīn! Wǒmen yǐjīng quánhéng hǎo gèzhǒng bóyì yù\'àn, zhǐyào jiānchí zhànlüè dìnglì, shènglì bìjiāng shǔyú wǒmen!',
          th: 'ขอให้ท่านผู้นำสบายใจได้ครับ! เราได้ชั่งน้ำหนักแผนรับมือการประลองยุทธศาสตร์ทุกรูปแบบไว้เรียบร้อยแล้ว ขอเพียงรักษาความแน่วแน่ ชัยชนะย่อมเป็นของเราแน่นอนครับ!',
          en: 'Rest assured, commander! We weighed contingency plans across gaming scenarios; as long as we hold strategic resolve, victory will surely belong to us!',
          audio_trigger: 't4_u55_l01_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "底线" (dǐxiàn) ในการเจรจาธุรกิจระดับสูงมีความหมายว่าอย่างไร?',
          options: [
            'เงื่อนไขขั้นต่ำสุดหรือจุดถอนตัว (Walk-away point) ที่ไม่สามารถยอมอ่อนข้อหรือถอยร่นได้อีก',
            'ราคาขายสูงสุดของสินค้า',
            'เวลาเลิกงานของพนักงาน',
            'เส้นขอบกระดาษสัญญา'
          ],
          correct_index: 0,
          explanation_th: '"底线" (Bottom line) คือ ขีดจำกัดขั้นต่ำสุดที่ต้องปกป้อง หากอีกฝ่ายกดดันเกินเส้นนี้ การเจรจาต้องยุติลง',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจกลยุทธ์การเจรจาระดับสูงอย่างเฉียบคม!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "กุมแต้มต่อสำคัญ รักษาเส้นตายแห่งผลประโยชน์"',
          tokens: ['守住利益底线', '手握关键筹码'],
          correct_sequence: ['手握关键筹码', '守住利益底线'],
          pinyin: 'Shǒuwò guānjiàn chóumǎ, shǒuzhù lìyì dǐxiàn.',
          meaning_th: 'กุมแต้มต่อสำคัญ รักษาเส้นตายแห่งผลประโยชน์',
          explanation_th: 'การกุมความได้เปรียบ (手握关键筹码) + การปกป้องผลประโยชน์ (守住利益底线)',
          encouragement: 'จัดประโยคกลยุทธ์การเจรจาได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "筹" (chóu - วางแผน/คำนวณ) ใน "筹码" มีหมวดนำ "⺮" (ไม้ไผ่) สื่อถึงอะไร?',
          options: [
            'แท่งติ้วไม้ไผ่โบราณที่แม่ทัพและนักคณิตศาสตร์ใช้ในการนับคำนวณและวางแผนกลยุทธ์การรบ',
            'กระบอกใส่น้ำดื่ม',
            'คันเบ็ดตกปลา',
            'บันไดไม้ไผ่'
          ],
          correct_index: 0,
          explanation_th: '"⺮" คือติ้วไม้ไผ่โบราณที่ใช้ในการนับคำนวณและวางแผนกลยุทธ์ (筹划/统筹/筹码)',
          encouragement: 'จำประวัติศาสตร์การวางแผนการรบโบราณได้อย่างลึกซึ้ง!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "博弈" (bóyì) มีรากศัพท์มาจากการแข่งขันประเภทใดในวัฒนธรรมจีนโบราณ?',
          options: [
            'การเล่นหมากรุกและหมากล้อมเพื่อประลองไหวพริบสติปัญญา',
            'การวิ่งแข่งมาราธอน',
            'การพายเรือมังกร',
            'การยิงธนูบนหลังม้า'
          ],
          correct_index: 0,
          explanation_th: '"博弈" มีที่มาจากการเล่นหมากรุกและหมากล้อมโบราณ เปรียบเสมือนการเดินหมากประลองยุทธศาสตร์ในชีวิตจริง',
          encouragement: 'เข้าใจรากศัพท์ทางวัฒนธรรมได้อย่างแม่นยำ!'
        }
      ],
      boss_challenge: {
        question: 'ในคู่มือแนวทางการเจรจาต่อรองของประธานเจ้าหน้าที่บริหาร ประโยคใดสรุปหลักการบริหารแต้มต่อและเส้นตายได้อย่างสมบูรณ์แบบที่สุด?',
        options: [
          '在高层商务谈判博弈中，善于精准试探对方底牌，手握核心技术与市场筹码，全面权衡利弊，坚决守牢企业发展底线。',
          '弘扬丝路精神，深化全方位互联互通，依托欧亚物流枢纽共建繁荣经济走廊。',
          '国家加强宏观调控，坚持稳中求进，有效应对通胀与利率风险。',
          '白皮书强调中国经济韧性强、潜力大，总体呈现稳中向好态势。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "高层商务谈判博弈", "试探底牌", "手握筹码", "权衡利弊" และ "守牢底线" ได้อย่างสมบูรณ์แบบตามมาตรฐานตำราพิชัยสงครามธุรกิจชั้นสูง'
      },
      cheer_trophy: {
        badge_name: 'จอมยุทธบนโต๊ะเจรจา (Master Strategic Negotiator)',
        message_th: 'ยินดีด้วย! คุณเชี่ยวชาญคำศัพท์ 筹码, 博弈, 底线, 试探, 权衡 พร้อมเป็นผู้นำการปิดดีลประวัติศาสตร์ระดับโลก!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u55_l02',
      lesson_number: 2,
      title: {
        zh: '僵局破局：斡旋调解与妥协艺术',
        th: 'ทลายทางตัน (僵局破局): การไกล่เกลี่ยคนกลางและศิลปะแห่งการประนีประนอม',
        en: 'Breaking Deadlocks: Mediation & The Art of Compromise'
      },
      can_do: {
        th: 'อธิบายเทคนิคการคลี่คลายข้อพิพาท เช่น 僵局, 破局, 妥协, 让步, 破冰 ในสถานการณ์ที่การเจรจาติดหล่มได้',
        en: 'Master deadlock-breaking terms: Deadlock, Breakthrough, Compromise, Concession, and Ice-breaking'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำคำว่า 破局 และ 妥协 ไปใช้ในการสร้างข้อเสนอใหม่เพื่อคลี่คลายทางตัน!',
      vocabulary: [
        {
          id: 'hsk4_5506',
          hanzi: '僵局',
          pinyin: 'jiāngjú',
          display_pinyin: 'jiāngjú',
          pinyin_tone: 'jiang1ju2',
          meaning_th: 'ทางตัน / สภาวะชะงักงันที่ทั้งสองฝ่ายไม่ยอมก้าวหน้า (Deadlock / Impasse / Stalemate)',
          meaning_en: 'deadlock / impasse / stalemate',
          radical: '亻',
          radical_name_th: 'หมวดคน (单人旁)',
          stroke_count: 22,
          mnemonic: 'คนแข็งทื่อไม่ยอมขยับ (僵) ติดหล่มอยู่กลางกระดานหมาก (局) = ทางตันชะงักงัน',
          kid_mnemonic: 'รถสองคันขับมาเจอกันในซอยแคบ ต่างคนต่างไม่ยอมถอยหลังจนไปไหนไม่ได้ = 僵局',
          body_gesture: 'กำสองหมัดดันเข้าหากันแน่นแสดงสภาวะชะงักงันติดหล่ม'
        },
        {
          id: 'hsk4_5507',
          hanzi: '破局',
          pinyin: 'pòjú',
          display_pinyin: 'pòjú',
          pinyin_tone: 'po4ju2',
          meaning_th: 'การทลายทางตัน / การค้นพบทางออกใหม่เพื่อทะลวงกรอบอุปสรรค (Breakthrough)',
          meaning_en: 'break the impasse / breakthrough / disrupt the stalemate',
          radical: '石',
          radical_name_th: 'หมวดก้อนหิน (石字旁)',
          stroke_count: 17,
          mnemonic: 'ก้อนหินทุบทะลวง (破) กรอบกระดานหมากที่ติดหล่ม (局) = ทลายทางตัน',
          kid_mnemonic: 'ใช้กุญแจทองไขเปิดประตูลับนำทางทุกคนออกจากเขาวงกต = 破局',
          body_gesture: 'กำหมัดขวาต่อยทะลุผ่าฝ่ามือซ้ายแสดงการพังทลายทางตัน'
        },
        {
          id: 'hsk4_5508',
          hanzi: '妥协',
          pinyin: 'tuǒxié',
          display_pinyin: 'tuǒxié',
          pinyin_tone: 'tuo3xie2',
          meaning_th: 'การประนีประนอม / การยอมถอยเพื่อบรรลุข้อตกลงร่วมกัน (Compromise)',
          meaning_en: 'compromise / reach an accommodation',
          radical: '爫',
          radical_name_th: 'หมวดกรงเล็บ (爪字头)',
          stroke_count: 18,
          mnemonic: 'จัดวางอย่างเหมาะสมปลอดภัย (妥) ร่วมแรงร่วมใจประสานสิบทิศ (协) = ประนีประนอม',
          kid_mnemonic: 'แบ่งเค้กให้เพื่อนคนละครึ่งชิ้นเท่าๆ กันแล้วยิ้มให้กัน = 妥协',
          body_gesture: 'สองมือแตะประสานกันระดับอกแสดงความประนีประนอม'
        },
        {
          id: 'hsk4_5509',
          hanzi: '让步',
          pinyin: 'ràngbù',
          display_pinyin: 'ràngbù',
          pinyin_tone: 'rang4bu4',
          meaning_th: 'การยอมถอยหนึ่งก้าว / การผ่อนปรนข้อเรียกร้อง (Concession / Make a concession)',
          meaning_en: 'concession / yield / give in a step',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 12,
          mnemonic: 'พูดจาเสียสละยินยอม (让) ถอยหลังหนึ่งก้าวย่าง (步) = ถอยหนึ่งก้าวผ่อนปรน',
          kid_mnemonic: 'ถอยหลังหนึ่งก้าวให้ทางคนอื่นเดินผ่านไปก่อน = 让步',
          body_gesture: 'ก้าวถอยหลังหนึ่งก้าวอย่างสุภาพพร้อมผายมือเชิญ'
        },
        {
          id: 'hsk4_5510',
          hanzi: '破冰',
          pinyin: 'pòbīng',
          display_pinyin: 'pòbīng',
          pinyin_tone: 'po4bing1',
          meaning_th: 'การละลายพฤติกรรม / การทลายกำแพงน้ำแข็งเพื่อรื้อฟื้นการเจรจา (Ice-breaking)',
          meaning_en: 'break the ice / break through cold relations',
          radical: '石',
          radical_name_th: 'หมวดก้อนหิน (石字旁)',
          stroke_count: 16,
          mnemonic: 'กระแทกทุบให้แตก (破) ผืนน้ำแข็งเย็นยะเยือก (冰) = ละลายน้ำแข็งฟื้นฟูมิตรภาพ',
          kid_mnemonic: 'เรือตัดน้ำแข็งแล่นผ่าแผ่นน้ำแข็งเปิดเส้นทางให้เรือทุกลำแล่นผ่าน = 破冰',
          body_gesture: 'สองมือทำท่าสับผ่าลงตรงกลางดั่งการทุบน้ำแข็ง'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 妥协 (tuǒxié)',
        description_th: 'tuǒ (เสียง 3) xié (เสียง 2)',
        example: '在非核心利益上做出适当妥协 (Zài fēi héxīn lìyì shang zuòchū shìdàng tuǒxié)',
        fun_metaphor: 'การประนีประนอมคือศิลปะแห่งการถอยหนึ่งก้าวเพื่อเปิดกว้างทะเลกว้างและท้องฟ้าสดใส',
        reassurance: 'คำว่า 妥协 ในทางธุรกิจคือทักษะชั้นสูง มิใช่ความพ่ายแพ้'
      },
      grammar_bite: {
        title: 'โครงสร้างการทลายทางตัน: 打破谈判僵局，各退一步实现破局',
        formula: '在关键节点主动破冰，通过各让一步达成建设性妥协，成功打破僵局实现破局',
        explanation_th: 'ใช้ในการรายงานความคืบหน้าการเจรจาที่ติดขัดและการเสนอแพ็กเกจใหม่',
        patterns: [
          {
            formula: '积极斡旋调停，打破谈判僵局。',
            zh: '当双方在收购估值上陷入严重僵局时，独立第三方顾问积极斡旋，提出了具有创造性的破局方案。',
            pinyin: 'Dāng shuāngfāng zài shōugòu gūzhí shang xiànrù yánzhòng jiāngjú shí, dúlì dì-sān fāng gùwèn jījí wòxuán, tíchū le jùyǒu chuàngzàoxìng de pòjú fāng\'àn.',
            th: 'เมื่อทั้งสองฝ่ายติดหล่มอย่างหนักเรื่องราคาประเมินการเข้าซื้อกิจการ ที่ปรึกษาอิสระได้เข้ามาไกล่เกลี่ยอย่างแข็งขัน และเสนอแผนทลายทางตันอันสร้างสรรค์',
            en: 'When both sides fell into a severe deadlock over acquisition valuation, the independent third-party advisor actively mediated, proposing a creative breakthrough package.'
          },
          {
            formula: '适当让步妥协，换取长期利益。',
            zh: '我们在付款周期上做出适当让步，成功换取了对方在知识产权授权与核心代码上的全面妥协。',
            pinyin: 'Wǒmen zài fùkuǎn zhōuqī shang zuòchū shìdàng ràngbù, chénggōng huànqǔ le duìfāng zài zhīshichǎnquán shòuquán yǔ héxīn dàimǎ shang de quánmiàn tuǒxié.',
            th: 'พวกเรายอมผ่อนปรนเรื่องระยะเวลาการชำระเงิน จึงสามารถแลกกับการที่อีกฝ่ายยอมประนีประนอมเรื่องการอนุญาตใช้ทรัพย์สินทางปัญญาและซอร์สโค้ดหลักได้สำเร็จ',
            en: 'We made appropriate concessions on payment terms, successfully securing their comprehensive compromise on IP licensing and core source code.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '首席执行官 (CEO) 💼',
          zh: '各位，关于合资公司的股权架构，双方已经在51%与49%的问题上僵持了三天，谈判陷入了严重僵局。',
          pinyin: 'Gèwèi, guānyú hézī gōngsī de gǔquán jiàgòu, shuāngfāng yǐjīng zài bǎifēnzhī wǔshíyī yǔ bǎifēnzhī sìshíjiǔ de wèntí shang jiāngchí le sān tiān, tánpàn xiànrù le yánzhòng jiāngjú.',
          th: 'ทุกท่านครับ เกี่ยวกับโครงสร้างผู้ถือหุ้นของบริษัทร่วมทุน ทั้งสองฝ่ายติดหล่มเรื่อง 51% กับ 49% มาสามวันแล้ว การเจรจาตกอยู่ในภาวะทางตันอย่างรุนแรงครับ',
          en: 'Everyone, regarding the joint venture\'s equity structure, both sides have been deadlocked over 51% vs 49% for three days; negotiations have hit a severe impasse.',
          audio_trigger: 't4_u55_l02_d01'
        },
        {
          speaker: '资深战略顾问 (Strategic Advisor) 💡',
          zh: '如果继续硬碰硬只会两败俱伤。我们需要换位思考，通过非正式宴请打破坚冰，探寻破局方案。',
          pinyin: 'Rúguǒ jìxù yìngpèngyìng zhǐ huì liǎngbàijùshāng. Wǒmen xūyào huànwèisīkǎo, tōngguò fēizhèngshì yànqǐng dǎpò jiānbīng, tànxún pòjú fāng\'àn.',
          th: 'หากยังชนกันตรงๆ รังแต่จะพังพินาศทั้งสองฝ่าย เราต้องเอาใจเขามาใส่ใจเรา จัดเลี้ยงอย่างไม่เป็นทางการเพื่อละลายน้ำแข็ง และค้นหาทางออกเพื่อทลายทางตันครับ',
          en: 'If we continue head-on confrontation, it will only result in mutual destruction. We need empathy, breaking the ice through informal dining to explore breakthrough solutions.',
          audio_trigger: 't4_u55_l02_d02'
        },
        {
          speaker: '首席执行官 (CEO) 💼',
          zh: '好主意！我们可以在董事会席位上做出适当让步，换取董事长提名权与重大事项一票否决权。',
          pinyin: 'Hǎo zhǔyi! Wǒmen kěyǐ zài dǒngshìhuì xíwèi shang zuòchū shìdàng ràngbù, huànqǔ dǒngshìzhǎng tímíngquán yǔ zhòngdà shìxiàng yī piào fǒujuéquán.',
          th: 'ความคิดเยี่ยม! เราสามารถยอมถอยเรื่องที่นั่งในบอร์ดบริหาร แลกกับสิทธิเสนอชื่อประธานบอร์ดและสิทธิยับยั้งวีโต้ในวาระสำคัญครับ',
          en: 'Great idea! We can make appropriate concessions on board seats in exchange for chairman nomination rights and veto power over major matters.',
          audio_trigger: 't4_u55_l02_d03'
        },
        {
          speaker: '资深战略顾问 (Strategic Advisor) 💡',
          zh: '退一步海阔天空！妥协不是投降，而是为了实现更高维度的战略共赢。我马上去促成这次破冰斡旋！',
          pinyin: 'Tuì yībù hǎikuòtiānkōng! Tuǒxié búshì tóuxiáng, ér shì wèile shíxiàn gèng gāo wéidù de zhànlüè gòngyíng. Wǒ mǎshàng qù cùchéng zhè cì pòbīng wòxuán!',
          th: 'ถอยหนึ่งก้าวทะเลกว้างฟ้าใส! การประนีประนอมไม่ใช่การยอมจำนน แต่คือการบรรลุชัยชนะร่วมกันในมิติที่สูงกว่า ผมจะรีบไปประสานการไกล่เกลี่ยละลายพฤติกรรมทันทีครับ!',
          en: 'A step back yields vast seas and skies! Compromise is not surrender, but realizing higher-dimensional win-win. I will facilitate this ice-breaking mediation immediately!',
          audio_trigger: 't4_u55_l02_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'สำนวน "退一步海阔天空" (Tuì yībù hǎikuòtiānkōng) ในการเจรจาธุรกิจแฝงปรัชญาใด?',
          options: [
            'การยอมถอยหนึ่งก้าวด้วยความยืดหยุ่น จะช่วยเปิดพื้นที่ทางเลือกใหม่ๆ ที่กว้างขวางและนำไปสู่ทางออกที่ดีกว่า',
            'การยอมแพ้และยกเลิกโครงการ',
            'การกระโดดลงไปว่ายน้ำในทะเล',
            'การซื้อตั๋วเครื่องบินไปพักร้อน'
          ],
          correct_index: 0,
          explanation_th: '"退一步海阔天空" สื่อถึงศิลปะแห่งการประนีประนอมอย่างชาญฉลาด การถอยหนึ่งก้าวช่วยปลดล็อกทางตัน',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจภูมิปัญญาการคลี่คลายข้อพิพาทอย่างลึกซึ้ง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ละลายกำแพงน้ำแข็ง ทลายสภาวะทางตัน"',
          tokens: ['打破谈判僵局', '主动破冰沟通'],
          correct_sequence: ['主动破冰沟通', '打破谈判僵局'],
          pinyin: 'Zhǔdòng pòbīng gōutōng, dǎpò tánpàn jiāngjú.',
          meaning_th: 'ละลายกำแพงน้ำแข็ง ทลายสภาวะทางตัน',
          explanation_th: 'การเปิดใจสื่อสาร (主动破冰沟通) + การทลายทางตัน (打破谈判僵局)',
          encouragement: 'จัดประโยคการเจรจาระดับสูงได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "僵" (jiāng - แข็งทื่อ/ชะงักงัน) ใน "僵局" มีหมวดนำ "亻" (คน) สื่อถึงอาการใด?',
          options: [
            'คนที่ยืนแข็งทื่อดั่งหิน ไม่ยอมขยับเขยื้อน เปรียบประดุจการเจรจาที่ติดหล่มไปต่อไม่ได้',
            'คนที่กำลังวิ่งแข่ง 100 เมตร',
            'คนที่กำลังกระโดดน้ำ',
            'คนที่กำลังนอนหลับสบาย'
          ],
          correct_index: 0,
          explanation_th: '"僵" คืออาการที่ร่างกายแข็งทื่อ เปรียบเทียบกับสถานการณ์ที่ติดขัดจนไม่สามารถขยับขับเคลื่อน (僵局)',
          encouragement: 'จำรากศัพท์ได้อย่างแม่นยำ!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "破冰" (pòbīng - Ice-breaking) ในบริบทความสัมพันธ์ระหว่างประเทศหมายถึงอะไร?',
          options: [
            'การเริ่มต้นฟื้นฟูการติดต่อสื่อสารและรื้อฟื้นความสัมพันธ์ที่เย็นชาให้กลับมาอบอุ่น',
            'การทำไอศกรีมกินในฤดูร้อน',
            'การเก็บน้ำแข็งใส่ตู้เย็น',
            'การเล่นสเกตน้ำแข็ง'
          ],
          correct_index: 0,
          explanation_th: '"破冰" (Ice-breaking) คือ การทลายบรรยากาศอันเย็นชาเพื่อเปิดประตูสู่มิตรภาพและการเจรจารอบใหม่',
          encouragement: 'เข้าใจคำเปรียบเปรยทางการทูตอย่างแท้จริง!'
        }
      ],
      boss_challenge: {
        question: 'ในบทวิเคราะห์กรณีศึกษาการเจรจาควบรวมกิจการระดับโลก ประโยคใดสรุปบทเรียนการทลายทางตันได้อย่างสมบูรณ์แบบที่สุด?',
        options: [
          '谈判团队在僵局时刻主动破冰，以高超的斡旋艺术促成双方互谅互让与建设性妥协，最终成功实现世纪交易的历史性破局。',
          '弘扬丝路精神，深化全方位互联互通，依托欧亚物流枢纽共建繁荣经济走廊。',
          '国家加强宏观调控，坚持稳中求进，有效应对通胀与利率风险。',
          '白皮书强调中国经济韧性强、潜力大，总体呈现稳中向好态势。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "僵局时刻主动破冰", "斡旋艺术", "建设性妥协" และ "历史性破局" ได้อย่างสมบูรณ์แบบตามมาตรฐานบทวิเคราะห์ระดับฮาร์วาร์ด'
      },
      cheer_trophy: {
        badge_name: 'ปรมาจารย์แห่งการทลายทางตัน (Master of Deadlock Breakthrough)',
        message_th: 'ยินดีด้วย! คุณเข้าใจศิลปะแห่ง 僵局, 破局, 妥协, 让步, 破冰 พร้อมเปลี่ยนวิกฤตให้เป็นโอกาสในทุกสถานการณ์!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u55_l03',
      lesson_number: 3,
      title: {
        zh: '危机公关：舆论应对与品牌重塑',
        th: 'การบริหารวิกฤตประชาสัมพันธ์ (危机公关): การรับมือกระแสสังคมและการฟื้นฟูแบรนด์',
        en: 'Crisis PR: Public Opinion & Brand Restoration'
      },
      can_do: {
        th: 'ใช้คำศัพท์ทางวิกฤตประชาสัมพันธ์ เช่น 声明, 澄清, 舆论, 溯源, 逆风翻盘 ในการแถลงข่าวและฟื้นฟูชื่อเสียงองค์กรได้',
        en: 'Master crisis PR terms: Statement, Clarification, Public Opinion, Traceability, and Turning the Tide'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำคำว่า 舆论, 澄清 และ 逆风翻盘 ไปใช้ในการร่างแผนกอบกู้วิกฤตภาพลักษณ์!',
      vocabulary: [
        {
          id: 'hsk4_5511',
          hanzi: '声明',
          pinyin: 'shēngmíng',
          display_pinyin: 'shēngmíng',
          pinyin_tone: 'sheng1ming2',
          meaning_th: 'แถลงการณ์อย่างเป็นทางการ / การประกาศจุดยืน (Official statement / Declaration)',
          meaning_en: 'statement / declaration / declare',
          radical: '耳',
          radical_name_th: 'หมวดหู (耳字旁)',
          stroke_count: 15,
          mnemonic: 'เปล่งสุรเสียงก้องกังวาน (声) ส่องสว่างกระจ่างแจ้ง (明) = แถลงการณ์อย่างเปิดเผย',
          kid_mnemonic: 'โฆษกยืนหน้าโพเดียมอ่านแถลงการณ์ต่อหน้ากล้องถ่ายทอดสด = 声明',
          body_gesture: 'สองมือถือเอกสารแถลงการณ์อ่านด้วยน้ำเสียงหนักแน่นชัดเจน'
        },
        {
          id: 'hsk4_5512',
          hanzi: '澄清',
          pinyin: 'chéngqīng',
          display_pinyin: 'chéngqīng',
          pinyin_tone: 'cheng2qing1',
          meaning_th: 'การชี้แจงความจริงให้กระจ่าง / การแก้ข่าวลือ (Clarify / Set the record straight)',
          meaning_en: 'clarify / clear up / vindicate',
          radical: '氵',
          radical_name_th: 'หมวดน้ำสามหยด (三点水)',
          stroke_count: 26,
          mnemonic: 'ตะกอนนอนก้นน้ำใส (澄) บริสุทธิ์แจ่มชัดไร้สิ่งเจือปน (清) = ชี้แจงให้กระจ่างใส',
          kid_mnemonic: 'หยดสารกรองน้ำลงในน้ำขุ่นจนกลายเป็นน้ำดื่มใสสะอาด = 澄清',
          body_gesture: 'ใช้สองมือทำท่ากรองความใสสะอาดระดับสายตา'
        },
        {
          id: 'hsk4_5513',
          hanzi: '舆论',
          pinyin: 'yúlùn',
          display_pinyin: 'yúlùn',
          pinyin_tone: 'yu2lun4',
          meaning_th: 'มติมหาชน / กระแสสังคม / เสียงวิพากษ์วิจารณ์ของสาธารณะ (Public opinion)',
          meaning_en: 'public opinion / media consensus / social sentiment',
          radical: '臼',
          radical_name_th: 'หมวดครก (臼字底)',
          stroke_count: 20,
          mnemonic: 'แบกหามความรู้สึกของปวงชน (舆) ถกเถียงอภิปรายด้วยวจี (论) = มติมหาชน',
          kid_mnemonic: 'หนังสือพิมพ์ โทรทัศน์ และอินเทอร์เน็ตที่รายงานข่าวพร้อมกัน = 舆论',
          body_gesture: 'สองมือแตะที่ใบหูทั้งสองข้างสดับรับฟังเสียงสะท้อนสังคม'
        },
        {
          id: 'hsk4_5514',
          hanzi: '溯源',
          pinyin: 'sùyuán',
          display_pinyin: 'sùyuán',
          pinyin_tone: 'su4yuan2',
          meaning_th: 'การสืบสาวค้นหาต้นตอของปัญหา (Trace back to the source / Root cause analysis)',
          meaning_en: 'trace to the source / find root cause',
          radical: '氵',
          radical_name_th: 'หมวดน้ำสามหยด (三点水)',
          stroke_count: 26,
          mnemonic: 'พายเรือทวนสายน้ำขึ้นไป (溯) สู่ตาน้ำต้นกำเนิดลำธาร (源) = สืบหาต้นตอ',
          kid_mnemonic: 'เดินตามรอยเท้าของลูกแมวไปจนเจอรังที่ซ่อนอยู่ใต้ต้นไม้ = 溯源',
          body_gesture: 'ก้าวเดินไปข้างหน้าพร้อมชี้นิ้วค้นหาจุดกำเนิด'
        },
        {
          id: 'hsk4_5515',
          hanzi: '逆风翻盘',
          pinyin: 'nìfēng fānpán',
          display_pinyin: 'nìfēng fānpán',
          pinyin_tone: 'ni4feng1 fan1pan2',
          meaning_th: 'พลิกสถานการณ์จากเสียเปรียบกลับมาชนะ / พลิกวิกฤตเป็นโอกาส (Turn the tables / Comeback)',
          meaning_en: 'turn the tables against the wind / epic comeback amid adversity',
          radical: '辶',
          radical_name_th: 'หมวดทางเดิน (走之底)',
          stroke_count: 36,
          mnemonic: 'ทวนกระแสลมพายุ (逆风) พลิกกระดานหมากกลับมาชนะอย่างงดงาม (翻盘) = พลิกเกมชนะ',
          kid_mnemonic: 'ตามหลังคู่แข่ง 0-3 ประตู แต่ฮึดยิงแซง 4-3 ในนาทีสุดท้าย = 逆风翻盘',
          body_gesture: 'กำสองมือแล้วพลิกคว่ำหงายหมุนสลับอย่างทรงพลัง'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 逆风翻盘 (nìfēng fānpán)',
        description_th: 'nì (เสียง 4) fēng (เสียง 1) fān (เสียง 1) pán (เสียง 2)',
        example: '在公关危机中实现逆风翻盘 (Zài gōngguān wēijī zhōng shíxiàn nìfēng fānpán)',
        fun_metaphor: 'คำสแลงและสำนวนยุคใหม่ที่นิยมที่สุดในวงการสตาร์ตอัปและการกู้วิกฤตองค์กร',
        reassurance: 'คำว่า 盘 ในที่นี้คือ กระดานหมาก (Chessboard)'
      },
      grammar_bite: {
        title: 'โครงสร้างการแถลงข่าววิกฤต: 第一时间发布声明，全面澄清事实',
        formula: '在危机发生后黄金四小时内第一时间发布澄清声明，深入技术溯源，平息舆论风波，实现逆风翻盘',
        explanation_th: 'ใช้ในคู่มือรับมือวิกฤตฉุกเฉิน (Crisis Response Playbook) ของบริษัทมหาชน',
        patterns: [
          {
            formula: '快速发布声明，主动回应舆论。',
            zh: '面对网络谣言与不实指责，公关团队第一时间召开新闻发布会发布权威声明，全面澄清事实真相。',
            pinyin: 'Miànduì wǎngluò yáoyán yǔ bùshí zhǐzé, gōngguān tuánduì dì-yī shíjiān zhàokāi xīnwén fābùhuì fābù quánwēi shēngmíng, quánmiàn chéngqīng shìshí zhēnxiàng.',
            th: 'เมื่อเผชิญกับข่าวลือบนอินเทอร์เน็ตและข้อกล่าวหาอันเป็นเท็จ ทีมประชาสัมพันธ์ได้จัดแถลงข่าวออกแถลงการณ์อย่างเป็นทางการในทันที เพื่อชี้แจงความจริงรอบด้านให้กระจ่าง',
            en: 'Facing online rumors and false accusations, the PR team immediately held a press conference to release an authoritative statement, comprehensively clarifying the truth.'
          },
          {
            formula: '严格技术溯源，实现逆风翻盘。',
            zh: '企业通过公开透明的数据溯源与第三方独立检测，不仅消除了公众疑虑，更重塑了品牌信誉，实现了逆风翻盘。',
            pinyin: 'Qǐyè tōngguò gōngkāi tòumíng de shùjù sùyuán yǔ dì-sān fāng dúlì jiǎncè, bùjǐn xiāochú le gōngzhòng yílǜ, gèng chóngsù le pǐnpái xìnyù, shíxiàn le nìfēng fānpán.',
            th: 'ด้วยการสืบสาวข้อมูลอย่างเปิดเผยโปร่งใสและการตรวจสอบโดยหน่วยงานอิสระ องค์กรมิเพียงขจัดข้อสงสัยของสาธารณชน แต่ยังฟื้นฟูความเชื่อมั่นของแบรนด์และพลิกสถานการณ์กลับมาชนะได้อย่างสง่างาม',
            en: 'Through transparent data tracing and independent testing, the enterprise not only eliminated public doubts, but also restored brand reputation, achieving an epic turnaround.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '公关总监 (PR Director) 📢',
          zh: '各位领导，昨晚社交媒体上突然出现大量针对我们旗舰产品的恶意造谣与舆论抹黑，热搜迅速发酵。',
          pinyin: 'Gèwèi lǐngdǎo, zuówǎn shèjiāo méitǐ shang tūrán chūxiàn dàliàng zhēnduì wǒmen qíjiàn chǎnpǐn de èyì zàoyáo yǔ yúlùn mǒhēi, rèsōu xùnsù fājiào.',
          th: 'ท่านผู้บริหารครับ เมื่อคืนนี้บนโซเชียลมีเดียมีข่าวลือมุ่งร้ายและกระแสโจมตีป้ายสีสินค้าเรือธงของเราอย่างกะทันหัน หัวข้อข่าวติดเทรนด์อย่างรวดเร็วครับ',
          en: 'Leaders, last night malicious rumors and smear campaigns targeting our flagship product suddenly erupted on social media, rapidly fermenting trending topics.',
          audio_trigger: 't4_u55_l03_d01'
        },
        {
          speaker: '集团董事长 (Chairman) 👔',
          zh: '不要慌乱！越是风浪险恶，越要从容镇定。研发部门立即进行全流程溯源，固定底层技术证据！',
          pinyin: 'Búyào huāngluàn! Yuè shì fēnglàng xiǎn\'è, yuè yào cóngróng zhèndìng. Yánfā bùmén lìjí jìnxíng quán liúchéng sùyuán, gùdìng dǐcéng jìshù zhèngjù!',
          th: 'อย่าตื่นตระหนก! ยิ่งคลื่นลมเชี่ยวกราก ยิ่งต้องสุขุมเยือกเย็น ฝ่ายวิจัยรีบสืบสาวต้นตอตลอดกระบวนการทันที และรวบรวมหลักฐานเทคโนโลยีชั้นฐานให้แน่นหนา!',
          en: 'Do not panic! The more treacherous the storm, the more calm we must be. R&D must trace the entire process immediately and secure underlying technical evidence!',
          audio_trigger: 't4_u55_l03_d02'
        },
        {
          speaker: '公关总监 (PR Director) 📢',
          zh: '明白！我们已起草严正官方声明，公开第三方权威检测报告，逐条澄清不实谣言，并向造谣者发出律师函。',
          pinyin: 'Míngbai! Wǒmen yǐ qǐcǎo yánzhèng guānfāng shēngmíng, gōngkāi dì-sān fāng quánwēi jiǎncè bàogào, zhútiáo chéngqīng bùshí yáoyán, bìng xiàng zàoyáozhě fāchū lǜshīhán.',
          th: 'รับทราบครับ! เราได้ร่างแถลงการณ์ทางการอย่างเข้มงวด เปิดเผยรายงานตรวจสอบจากหน่วยงานอิสระ ชี้แจงข้อเท็จจริงแก้ข่าวลือทีละข้อ และส่งจดหมายทนายความดำเนินคดีกับผู้กุข่าวแล้วครับ',
          en: 'Understood! We drafted an authoritative statement, publicizing independent testing reports, clarifying false rumors item by item, and sending attorney letters to rumormongers.',
          audio_trigger: 't4_u55_l03_d03'
        },
        {
          speaker: '集团董事长 (Chairman) 👔',
          zh: '很好！实事求是、真金不怕火炼！只要我们坦诚面对公众、坚守品质底线，这次危机终将成为我们逆风翻盘的契机！',
          pinyin: 'Hěn hǎo! Shíshìqiúshì, zhēnjīn bùpà huǒ liàn! Zhǐyào wǒmen tǎnchéng miànduì gōngzhòng, jiānshǒu pǐnzhì dǐxiàn, zhè cì wēijī zhōng jiāng chéngwéi wǒmen nìfēng fānpán de qìjī!',
          th: 'ดีมาก! ยึดความจริงเป็นหลัก ทองแท้ย่อมไม่กลัวไฟลน! ขอเพียงเราจริงใจต่อสาธารณชน ยึดมั่นในเส้นตายแห่งคุณภาพ วิกฤตครั้งนี้จะกลายเป็นโอกาสในการพลิกสถานการณ์กลับมาชนะอย่างแน่นอน!',
          en: 'Very good! Seek truth from facts; true gold fears no fire! As long as we face the public with sincerity and guard quality bottom lines, this crisis will become our springboard to turn the tables!',
          audio_trigger: 't4_u55_l03_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'ในวิชาการบริหารวิกฤตประชาสัมพันธ์ (Crisis PR) "กฎทอง 4 ชั่วโมง" (Golden 4 Hours) หมายถึงอะไร?',
          options: [
            'การต้องตอบสนอง ชี้แจงข้อเท็จจริง และออกแถลงการณ์อย่างเป็นทางการภายใน 4 ชั่วโมงแรกหลังเกิดเหตุ เพื่อสกัดกั้นข่าวลือ',
            'การให้ผู้บริหารนอนหลับพักผ่อน 4 ชั่วโมงก่อนค่อยตื่นมาทำงาน',
            'การปิดบริษัท 4 ชั่วโมงเพื่อทำความสะอาด',
            'การงดใช้โทรศัพท์มือถือ 4 ชั่วโมง'
          ],
          correct_index: 0,
          explanation_th: '"黄金四小时" คือ ช่วงเวลาทองที่ต้องสื่อสารข้อเท็จจริงอย่างรวดเร็วและจริงใจเพื่อควบคุมกระแสสังคมไม่ให้ลุกลาม',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจหลักการกู้วิกฤตระดับสากลอย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ชี้แจงความจริงให้กระจ่าง พลิกวิกฤตกลับมาชนะ"',
          tokens: ['实现逆风翻盘', '全面澄清事实'],
          correct_sequence: ['全面澄清事实', '实现逆风翻盘'],
          pinyin: 'Quánmiàn chéngqīng shìshí, shíxiàn nìfēng fānpán.',
          meaning_th: 'ชี้แจงความจริงให้กระจ่าง พลิกวิกฤตกลับมาชนะ',
          explanation_th: 'การชี้แจงความจริง (全面澄清事实) + ผลลัพธ์พลิกเกมชนะ (实现逆风翻盘)',
          encouragement: 'จัดประโยคกลยุทธ์กู้วิกฤตได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "澄" (chéng - ใสบริสุทธิ์) ใน "澄清" มีหมวดนำ "氵" (น้ำ) สื่อถึงอะไร?',
          options: [
            'สายน้ำที่ตกตะกอนจนใสสะอาด สื่อถึงข้อเท็จจริงที่ได้รับการชำระจนกระจ่างชัดแจ้ง',
            'น้ำร้อนเดือดพล่าน',
            'คลื่นยักษ์ในทะเล',
            'น้ำฝนที่ตกหนัก'
          ],
          correct_index: 0,
          explanation_th: '"氵" คือสายน้ำใสไร้สิ่งเจือปน สื่อถึงการชี้แจงจนปราศจากข้อกังขา (澄清事实)',
          encouragement: 'เข้าใจรากศัพท์แห่งความโปร่งใสได้อย่างลึกซึ้ง!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "逆风翻盘" (nìfēng fānpán) สื่อถึงจิตวิญญาณแบบใดขององค์กร?',
          options: [
            'การไม่ยอมแพ้ต่ออุปสรรคและมรสุม พร้อมฮึดสู้และพลิกสถานการณ์จากเป็นรองกลับมาคว้าชัยชนะอย่างยิ่งใหญ่',
            'การยอมยกธงขาวเมื่อเจอลมแรง',
            'การเปลี่ยนชื่อบริษัทหนีหนี้',
            'การเลิกกิจการทันที'
          ],
          correct_index: 0,
          explanation_th: '"逆风翻盘" สะท้อนถึงความมุ่งมั่นทุ่มเท ความยืดหยุ่นทนทาน (Resilience) และการพลิกวิกฤตเป็นโอกาส',
          encouragement: 'เข้าใจจิตวิญญาณแห่งชัยชนะได้อย่างแท้จริง!'
        }
      ],
      boss_challenge: {
        question: 'ในบทสัมภาษณ์พิเศษของผู้บริหารหลังวิกฤตคลี่คลาย ประโยคใดสรุปบทเรียนและชัยชนะขององค์กรได้อย่างทรงเกียรติที่สุด?',
        options: [
          '面对突如其来的舆论风波，我们以最快速度发布权威澄清声明，深入技术溯源，坚守品质底线，最终实现了逆风翻盘与品牌重塑！',
          '弘扬丝路精神，深化全方位互联互通，依托欧亚物流枢纽共建繁荣经济走廊。',
          '国家加强宏观调控，坚持稳中求进，有效应对通胀与利率风险。',
          '白皮书强调中国经济韧性强、潜力大，总体呈现稳中向好态势。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "舆论风波", "权威澄清声明", "技术溯源", "坚守品质底线" และ "逆风翻盘与品牌重塑" ได้อย่างสมบูรณ์แบบตามมาตรฐานการบริหารแบรนด์ระดับโลก'
      },
      cheer_trophy: {
        badge_name: 'ผู้นำกอบกู้วิกฤตภาพลักษณ์ (Master of Crisis PR Turnaround)',
        message_th: 'ยินดีด้วย! คุณเข้าใจกลไก 声明, 澄清, 舆论, 溯源, 逆风翻盘 อย่างถ่องแท้ พร้อมพาทีมพลิกวิกฤตสู่ความสำเร็จอันยิ่งใหญ่!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u55_l04',
      lesson_number: 4,
      title: {
        zh: '巅峰闭环：协议签署与长远共赢',
        th: 'ปิดดีลจุดสูงสุด (巅峰闭环): พิธีลงนามสัญญาและชัยชนะร่วมกันระยะยาว',
        en: 'The Pinnacle Close: Agreement Signing & Long-Term Win-Win'
      },
      can_do: {
        th: 'อธิบายกระบวนการปิดดีลระดับประวัติศาสตร์ เช่น 签字仪式, 闭环, 战略协同, 赋能, 基业长青 ในพิธีลงนามความร่วมมือได้',
        en: 'Master deal-closing vocabulary: Signing Ceremony, Closed Loop, Strategic Synergy, Empowerment, and Everlasting Foundation'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำคำว่า 战略协同 และ 基业长青 ไปใช้ในสุนทรพจน์พิธีลงนามสัญญา!',
      vocabulary: [
        {
          id: 'hsk4_5516',
          hanzi: '签字仪式',
          pinyin: 'qiānzì yíshì',
          display_pinyin: 'qiānzì yíshì',
          pinyin_tone: 'qian1zi4 yi2shi4',
          meaning_th: 'พิธีลงนามในสัญญาหรือข้อตกลงอย่างเป็นทางการ (Signing Ceremony)',
          meaning_en: 'signing ceremony / formal contract signing',
          radical: '竹',
          radical_name_th: 'หมวดไม้ไผ่ (竹字头)',
          stroke_count: 24,
          mnemonic: 'จรดปากกาลงนาม (签字) ในพิธีการอันทรงเกียรติสง่างาม (仪式) = พิธีลงนามสัญญา',
          kid_mnemonic: 'ผู้นำสองประเทศนั่งเคียงข้างกันจรดปากกาหมึกซึมสีทองลงบนสมุดสัญญา = 签字仪式',
          body_gesture: 'ทำท่าจรดปากกาเซ็นชื่อบนเอกสารแล้วลุกขึ้นจับมือกัน'
        },
        {
          id: 'hsk4_5517',
          hanzi: '闭环',
          pinyin: 'bìhuán',
          display_pinyin: 'bìhuán',
          pinyin_tone: 'bi4huan2',
          meaning_th: 'วงจรปิดที่สมบูรณ์แบบครบวงจร (Closed loop / End-to-end execution)',
          meaning_en: 'closed loop / complete cycle / end-to-end execution',
          radical: '门',
          radical_name_th: 'หมวดประตู (门字框)',
          stroke_count: 17,
          mnemonic: 'ปิดประตูลงกลอนสมบูรณ์ (闭) เป็นวงแหวนหยกกลมไร้รอยต่อ (环) = วงจรปิดสมบูรณ์',
          kid_mnemonic: 'ต่อรางรถไฟวนเป็นวงกลมครบรอบพอดี รถไฟวิ่งได้ไม่มีสะดุด = 闭环',
          body_gesture: 'สองมือวาดเป็นวงกลมประกบกันรอบหน้าอก'
        },
        {
          id: 'hsk4_5518',
          hanzi: '战略协同',
          pinyin: 'zhànlüè xiétóng',
          display_pinyin: 'zhànlüè xiétóng',
          pinyin_tone: 'zhan4lüe4 xie2tong2',
          meaning_th: 'การสอดประสานพลังทางยุทธศาสตร์ (Strategic synergy - 1+1 > 2)',
          meaning_en: 'strategic synergy / coordinated strategic alignment',
          radical: '戈',
          radical_name_th: 'หมวดหอกดาบ (戈字旁)',
          stroke_count: 28,
          mnemonic: 'แผนยุทธศาสตร์ใหญ่ (战略) ประสานพลังสิบทิศก้าวไปในทิศทางเดียวกัน (协同) = การประสานพลังยุทธศาสตร์',
          kid_mnemonic: 'สองมือกำแน่นดึงเชือกไปในทิศทางเดียวกันเพื่อยกของหนัก = 战略协同',
          body_gesture: 'ประสานสองมือเข้าหากันแน่นแล้วผลักไปข้างหน้าพร้อมกัน'
        },
        {
          id: 'hsk4_5519',
          hanzi: '赋能',
          pinyin: 'fùnéng',
          display_pinyin: 'fùnéng',
          pinyin_tone: 'fu4neng2',
          meaning_th: 'การเพิ่มขีดความสามารถ / การส่งต่อพลังและเครื่องมือให้เติบโต (Empower / Enablement)',
          meaning_en: 'empower / enablement / empower with capabilities',
          radical: '贝',
          radical_name_th: 'หมวดหอยเบี้ย (贝字旁)',
          stroke_count: 22,
          mnemonic: 'มอบทรัพย์สินและของขวัญ (赋) มอบพลังอำนาจและศักยภาพ (能) = มอบพลังเพิ่มขีดความสามารถ',
          kid_mnemonic: 'ติดปีกวิเศษให้เพื่อนทำให้เพื่อนสามารถบินขึ้นสู่ท้องฟ้าได้ = 赋能',
          body_gesture: 'ยื่นสองมือไปข้างหน้าแบฝ่ามือขึ้นดั่งการมอบพลังพิเศษ'
        },
        {
          id: 'hsk4_5520',
          hanzi: '基业长青',
          pinyin: 'jīyè chángqīng',
          display_pinyin: 'jīyè chángqīng',
          pinyin_tone: 'ji1ye4 chang2qing1',
          meaning_th: 'กิจการธุรกิจรุ่งเรืองมั่นคงถาวรชั่วกาลนาน (Built to last / Everlasting enterprise)',
          meaning_en: 'built to last / evergreen enterprise / enduring prosperity',
          radical: '土',
          radical_name_th: 'หมวดผืนดิน (提土旁)',
          stroke_count: 36,
          mnemonic: 'รากฐานแห่งกิจการงาน (基业) สดเขียวชอุ่มยืนต้นมั่นคงยาวนาน (长青) = กิจการรุ่งเรืองมั่นคงถาวร',
          kid_mnemonic: 'ต้นสนยักษ์พันปีที่แผ่กิ่งก้านเขียวชอุ่มตลอดสี่ฤดู = 基业长青',
          body_gesture: 'กางสองแขนขึ้นดั่งต้นไม้ใหญ่ที่แผ่กิ่งก้านสาขาอย่างมั่นคงถาวร'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 基业长青 (jīyè chángqīng)',
        description_th: 'jī (เสียง 1) yè (เสียง 4) cháng (เสียง 2) qīng (เสียง 1)',
        example: '祝愿双方企业精诚合作、基业长青 (Zhùyuàn shuāngfāng qǐyè jīngchéng hézuò, jīyè chángqīng)',
        fun_metaphor: 'คำอวยพรปิดท้ายอันเป็นมงคลสูงสุดในพิธีลงนามสัญญาทางธุรกิจ',
        reassurance: 'คำว่า 长 ในที่นี้ออกเสียง cháng (ยาวนาน)'
      },
      grammar_bite: {
        title: 'โครงสร้างการเฉลิมฉลองปิดดีล: 举行签字仪式，深化战略协同，祝愿基业长青',
        formula: '在各方共同见证下隆重举行协议签字仪式，实现全面战略协同与多维赋能，谱写基业长青新篇章',
        explanation_th: 'ใช้ในการกล่าวสุนทรพจน์ในงานเลี้ยงฉลองการลงนามสัญญา (Closing Dinner)',
        patterns: [
          {
            formula: '隆重举行签字仪式，开启崭新篇章。',
            zh: '双方代表正式签署全面战略合作协议，这标志着这场历时半年的世纪并购成功实现圆满闭环。',
            pinyin: 'Shuāngfāng dàibiǎo zhèngshì qiānshǔ quánmiàn zhànlüè hézuò xiéyì, zhè biāozhì zhe zhè chǎng lìshí bàn nián de shìjì bìnggòu chénggōng shíxiàn yuánmǎn bìhuán.',
            th: 'ตัวแทนทั้งสองฝ่ายได้ลงนามในข้อตกลงความร่วมมือทางยุทธศาสตร์อย่างเป็นทางการ ซึ่งเป็นสัญลักษณ์ว่าการควบรวมกิจการแห่งศตวรรษที่กินเวลานานครึ่งปี ได้ปิดดีลอย่างสมบูรณ์แบบ',
            en: 'Representatives officially signed the comprehensive strategic partnership agreement, marking the successful closed-loop culmination of this historic merger.'
          },
          {
            formula: '深化全面战略协同，实现基业长青。',
            zh: '我们将以科技创新为双方深度赋能，充分发挥战略协同效应，携手迈向互利共赢、基业长青的宏伟未来。',
            pinyin: 'Wǒmen jiāng yǐ kējì chuàngxīn wèi shuāngfāng shēndù fùnéng, chōngfèn fāhuī zhànlüè xiétóng xiàoyìng, xiéshǒu màixiàng hùlì gòngyíng, jīyè chángqīng de hóngwěi wèilái.',
            th: 'พวกเราจะนำนวัตกรรมเทคโนโลยีมาช่วยเสริมสร้างขีดความสามารถของทั้งสองฝ่ายอย่างลึกซึ้ง แสดงพลังแห่งการสอดประสานทางยุทธศาสตร์อย่างเต็มที่ เพื่อก้าวสู่อนาคตอันยิ่งใหญ่แห่งผลประโยชน์ร่วมกันและความรุ่งเรืองถาวร',
            en: 'We will deeply empower both parties through technological innovation, fully unleashing strategic synergies to march towards a grand future of mutual win-win and enduring prosperity.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '双方联合主持人 (Joint Host) 🎙️',
          zh: '女士们、先生们，欢迎出席跨国战略合作协议签字仪式，让我们共同见证这一历史性的荣耀时刻！',
          pinyin: 'Nǚshìmen, xiānshengmen, huānyíng chūxí kuàguó zhànlüè hézuò xiéyì qiānzì yíshì, ràng wǒmen gòngtóng jiànzhèng zhè yī lìshǐxìng de róngyào shíkè!',
          th: 'สุภาพสตรีและสุภาพบุรุษทุกท่าน ขอต้อนรับสู่พิธีลงนามข้อตกลงความร่วมมือทางยุทธศาสตร์ข้ามชาติ ขอเชิญทุกท่านร่วมเป็นสักขีพยานในช่วงเวลาแห่งเกียรติยศทางประวัติศาสตร์นี้ครับ!',
          en: 'Ladies and gentlemen, welcome to the multinational strategic partnership signing ceremony; let us jointly witness this historic and glorious moment!',
          audio_trigger: 't4_u55_l04_d01'
        },
        {
          speaker: 'A集团董事长 (Chairman Group A) 🤝',
          zh: '历经无数轮艰难的战略博弈与彼此妥协，今天我们终于达成了最完美的合作闭环。',
          pinyin: 'Lìjīng wúshù lún jiānnán de zhànlüè bóyì yǔ bǐcǐ tuǒxié, jīntiān wǒmen zhōngyú dáchéng le zuì wánměi de hézuò bìhuán.',
          th: 'หลังผ่านการประลองยุทธศาสตร์อันยากลำบากนับครั้งไม่ถ้วนและการประนีประนอมซึ่งกันและกัน วันนี้พวกเราได้บรรลุวงจรความร่วมมือที่สมบูรณ์แบบที่สุดในที่สุดครับ',
          en: 'Through countless rounds of arduous strategic gaming and mutual compromises, today we have finally reached the most perfect cooperative closed loop.',
          audio_trigger: 't4_u55_l04_d02'
        },
        {
          speaker: 'B集团首席执行官 (CEO Group B) 🥂',
          zh: '是的！这不仅是资产的重组，更是优势的互补与生态的相互赋能，我们将释放强大的战略协同效应。',
          pinyin: 'Shì de! Zhè bùjǐn shì zīchǎn de chóngzǔ, gèng shì yōushì de hùbǔ yǔ shēngtài de xiānghù fùnéng, wǒmen jiāng shìfàng qiángdà de zhànlüè xiétóng xiàoyìng.',
          th: 'ใช่ครับ! นี่มิใช่เพียงการปรับโครงสร้างสินทรัพย์ แต่คือการเติมเต็มจุดแข็งซึ่งกันและกันและการส่งต่อพลังในระบบนิเวศ เราจะปลดปล่อยพลังการสอดประสานทางยุทธศาสตร์อันมหาศาลครับ',
          en: 'Yes! This is not merely an asset restructuring, but mutual complement of strengths and ecosystem empowerment; we will unleash powerful strategic synergies.',
          audio_trigger: 't4_u55_l04_d03'
        },
        {
          speaker: 'A集团董事长 (Chairman Group A) 🤝',
          zh: '祝愿我们的合作精诚团结、互利共赢、基业长青，携手开创全球商业文明的崭新辉煌！干杯！',
          pinyin: 'Zhùyuàn wǒmen de hézuò jīngchéng tuánjié, hùlì gòngyíng, jīyè chángqīng, xiéshǒu kāichuàng quánqiú shāngyè wénmíng de zhǎnxīn huīhuáng! Gānbēi!',
          th: 'ขออวยพรให้ความร่วมมือของเราเปี่ยมด้วยความจริงใจ สามัคคี ชัยชนะร่วมกัน กิจการรุ่งเรืองมั่นคงถาวร และร่วมสร้างความรุ่งโรจน์ใหม่ให้แก่อารยธรรมธุรกิจโลก! ชนแก้ว!',
          en: 'Wishing our cooperation sincere unity, mutual win-win, and enduring prosperity, jointly pioneering a new splendor in global commercial civilization! Cheers!',
          audio_trigger: 't4_u55_l04_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "战略协同" (Strategic Synergy) มักถูกสรุปด้วยสมการคณิตศาสตร์เปรียบเทียบใด?',
          options: [
            '1 + 1 > 2 (การผสานพลังร่วมกันทำให้เกิดผลลัพธ์ที่ยิ่งใหญ่กว่าการทำงานแยกกัน)',
            '1 + 1 = 0',
            '1 - 1 = 0',
            '2 / 2 = 1'
          ],
          correct_index: 0,
          explanation_th: '"战略协同效应" (Synergy effect) คือ ปรากฏการณ์ที่การรวมพลังสร้างมูลค่าและประสิทธิภาพที่มากกว่าผลรวมของแต่ละส่วนเดี่ยวๆ (1+1 > 2)',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจแก่นแท้แห่งการผสานพลังทางธุรกิจ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "สอดประสานพลังยุทธศาสตร์ มุ่งสู่ความเจริญมั่นคงถาวร"',
          tokens: ['迈向基业长青', '深化战略协同'],
          correct_sequence: ['深化战略协同', '迈向基业长青'],
          pinyin: 'Shēnhuà zhànlüè xiétóng, màixiàng jīyè chángqīng.',
          meaning_th: 'สอดประสานพลังยุทธศาสตร์ มุ่งสู่ความเจริญมั่นคงถาวร',
          explanation_th: 'การผสานพลัง (深化战略协同) + วิสัยทัศน์ความรุ่งเรืองถาวร (迈向基业长青)',
          encouragement: 'จัดประโยคพิธีลงนามได้อย่างสง่างาม!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "青" (qīng - สีเขียวขจี) ใน "基业长青" สื่อถึงความหมายมงคลใด?',
          options: [
            'ต้นไม้ใหญ่ที่เขียวชอุ่มตลอดกาล ไม่ร่วงโรยไปตามฤดูกาล เปรียบดั่งกิจการที่มั่นคงยั่งยืนถาวร',
            'ผลไม้ที่ยังไม่สุก',
            'กบสีเขียว',
            'หินหยกแตกร้าว'
          ],
          correct_index: 0,
          explanation_th: '"长青" คือต้นสนที่เขียวชอุ่มตลอดกาล สื่อถึงความรุ่งเรืองมั่นคงถาวรชั่วลูกชั่วหลาน (基业长青)',
          encouragement: 'จำความหมายอันเป็นมงคลแห่งความยั่งยืนได้อย่างลึกซึ้ง!'
        },
        {
          type: 'multiple_choice',
          question_th: 'ในพิธีลงนามสัญญาทางธุรกิจระดับสูง กิจกรรมใดมักเกิดขึ้นเป็นสัญลักษณ์ปิดท้ายการบรรลุข้อตกลง?',
          options: [
            '签字仪式与共同祝酒庆贺 (พิธีลงนามและร่วมดื่มอวยพรเฉลิมฉลอง)',
            'การประมูลของเก่า',
            'การเล่นกีฬาชิงแชมป์',
            'การสวดมนต์เงียบๆ คนเดียว'
          ],
          correct_index: 0,
          explanation_th: 'พิธีลงนาม (签字仪式) ตามด้วยการจับมือและการดื่มฉลอง (祝酒) เป็นธรรมเนียมสากลของการปิดดีล',
          encouragement: 'เข้าใจมารยาทและพิธีการทางธุรกิจระดับโลกอย่างถ่องแท้!'
        }
      ],
      boss_challenge: {
        question: 'ในสุนทรพจน์เฉลิมฉลองปิดการควบรวมกิจการระดับโลก ประโยคใดสรุปความสำเร็จและอวยพรความร่วมมือได้อย่างสมบูรณ์แบบที่สุด?',
        options: [
          '今天我们共同见证战略合作协议的成功签署与完美闭环，未来我们将充分发挥战略协同优势，彼此深度赋能，携手迈向互利共赢、基业长青的辉煌明天！',
          '弘扬丝路精神，深化全方位互联互通，依托欧亚物流枢纽共建繁荣经济走廊。',
          '国家加强宏观调控，坚持稳中求进，有效应对通胀与利率风险。',
          '白皮书强调中国经济韧性强、潜力大，总体呈现稳中向好态势。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "协议签署与完美闭环", "战略协同优势", "深度赋能", "互利共赢" และ "基业长青" ได้อย่างสมบูรณ์แบบ ไพเราะ และเหมาะสมกับพิธีการระดับสูงสุด'
      },
      cheer_trophy: {
        badge_name: 'ผู้นำแห่งการปิดดีลประวัติศาสตร์ (Legendary Deal Closer)',
        message_th: 'ขอแสดงความยินดีด้วยอย่างยิ่ง! คุณได้พิชิตหน่วยเรียนการเจรจาธุรกิจระดับสูงและการปิดดีลครบถ้วน ก้าวสู่จุดสูงสุดแห่งยอดนักเจรจาระดับตำนาน!',
        xp_reward: 150
      }
    }
  ]
};
