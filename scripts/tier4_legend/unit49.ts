import { UnitLessonData } from '../../src/types/lesson';

export const unit49Data: UnitLessonData = {
  unit_id: 'tier4_u49',
  tier: 4,
  unit_number: 49,
  title: {
    zh: '中国外交修辞与声明文本',
    th: 'วาทศิลป์ทางการทูตและแถลงการณ์ระหว่างประเทศ',
    en: 'Chinese Diplomatic Rhetoric & Official Statements'
  },
  description: 'ศึกษาภาษาและวาทศิลป์ทางการทูตจีน (和平共处、互利共赢、求同存异、大国担当) รูปแบบแถลงการณ์ร่วม สุนทรพจน์ระดับพหุภาคี และสำนวนโฆษกกระทรวงการต่างประเทศ',
  lessons: [
    {
      lesson_id: 't4_u49_l01',
      lesson_number: 1,
      title: {
        zh: '和平共处：五项原则与睦邻友好',
        th: 'อยู่ร่วมกันอย่างสันติ (和平共处): หลัก 5 ประการและมิตรภาพเพื่อนบ้าน',
        en: 'Peaceful Coexistence: Five Principles & Good Neighborliness'
      },
      can_do: {
        th: 'อธิบายหลักการ 5 ประการแห่งการอยู่ร่วมกันอย่างสันติ และใช้คำศัพท์ทางการทูต เช่น 主权, 准则, 睦邻 ในการวิเคราะห์แถลงการณ์ได้',
        en: 'Explain Five Principles of Peaceful Coexistence and use diplomatic terminology like Sovereignty and Norms'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ถอดรหัสสำนวนทางการทูต 和平共处 และ 睦邻友好 ในข่าวระหว่างประเทศ!',
      vocabulary: [
        {
          id: 'hsk4_4901',
          hanzi: '外交',
          pinyin: 'wàijiāo',
          display_pinyin: 'wàijiāo',
          pinyin_tone: 'wai4jiao1',
          meaning_th: 'การทูต / กิจการความสัมพันธ์ระหว่างประเทศ',
          meaning_en: 'diplomacy / foreign affairs / diplomatic relations',
          radical: '夕',
          radical_name_th: 'หมวดดวงจันทร์ยามค่ำ (夕字旁)',
          stroke_count: 11,
          mnemonic: 'ก้าวออกไปนอกพรมแดน (外) เพื่อสานสัมพันธ์มิตรภาพ (交) = กิจการการทูต',
          kid_mnemonic: 'ทูตสองประเทศจับมือกันหน้าเสาธงชาติ = 外交',
          body_gesture: 'ยื่นมือขวาออกไปทำท่าจับมือทักทายอย่างสง่างาม'
        },
        {
          id: 'hsk4_4902',
          hanzi: '和平共处',
          pinyin: 'hépínggòngchǔ',
          display_pinyin: 'hépínggòngchǔ',
          pinyin_tone: 'he2ping2gong4chu3',
          meaning_th: 'อยู่ร่วมกันอย่างสันติ / การอยู่ร่วมกันอย่างสงบสุขไร้สงคราม',
          meaning_en: 'peaceful coexistence',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 28,
          mnemonic: 'สันติภาพสงบสุข (和平) อาศัยอยู่ร่วมกันอย่างกลมเกลียว (共处) = อยู่ร่วมกันอย่างสันติ',
          kid_mnemonic: 'นกพิราบขาวคาบกิ่งมะกอกบินข้ามพรมแดนสองประเทศ = 和平共处',
          body_gesture: 'สองมือทำท่าปีกนกพิราบบินอย่างสงบนิ่ง'
        },
        {
          id: 'hsk4_4903',
          hanzi: '睦邻',
          pinyin: 'mùlín',
          display_pinyin: 'mùlín',
          pinyin_tone: 'mu4lin2',
          meaning_th: 'ความสัมพันธ์ฉันมิตรกับประเทศเพื่อนบ้าน (睦邻友好)',
          meaning_en: 'good neighborliness / friendly relations with neighbors',
          radical: '目',
          radical_name_th: 'หมวดตา (目字旁)',
          stroke_count: 20,
          mnemonic: 'สายตาที่อบอุ่นเป็นมิตร (睦) มองไปยังเพื่อนบ้านข้างเคียง (邻) = ไมตรีจิตฉันเพื่อนบ้าน',
          kid_mnemonic: 'เปิดหน้าต่างส่งยิ้มและแบ่งขนมให้เพื่อนบ้าน = 睦邻',
          body_gesture: 'หงายมือผายไปด้านข้างพร้อมรอยยิ้มที่เป็นมิตร'
        },
        {
          id: 'hsk4_4904',
          hanzi: '主权',
          pinyin: 'zhǔquán',
          display_pinyin: 'zhǔquán',
          pinyin_tone: 'zhu3quan2',
          meaning_th: 'อธิปไตยแห่งรัฐ / สิทธิอำนาจสูงสุดในการปกครองตนเอง',
          meaning_en: 'sovereignty / sovereign rights',
          radical: '丶',
          radical_name_th: 'หมวดหยดน้ำ (点部)',
          stroke_count: 14,
          mnemonic: 'ความเป็นเจ้าของแผ่นดิน (主) ที่เปี่ยมด้วยอำนาจสิทธิธรรม (权) = อำนาจอธิปไตย',
          kid_mnemonic: 'ปักธงชาติอย่างมั่นคงบนยอดเขาแสดงเขตแดนประเทศ = 主权',
          body_gesture: 'กำหมัดขวาชูขึ้นระดับอกแสดงความมั่นคงในอำนาจ'
        },
        {
          id: 'hsk4_4905',
          hanzi: '准则',
          pinyin: 'zhǔnzé',
          display_pinyin: 'zhǔnzé',
          pinyin_tone: 'zhun3ze2',
          meaning_th: 'บรรทัดฐาน / ข้อพึงปฏิบัติ / หลักการมาตรฐานสากล',
          meaning_en: 'norm / standard / guiding principle / code of conduct',
          radical: '冫',
          radical_name_th: 'หมวดสองจุดน้ำแข็ง (冫字旁)',
          stroke_count: 16,
          mnemonic: 'ความแม่นยำเที่ยงตรง (准) ตามกฎกติกาแบบแผน (则) = บรรทัดฐานสากล',
          kid_mnemonic: 'เปิดหนังสือกฎกติกาสากลสีทองที่ทุกคนยอมรับร่วมกัน = 准则',
          body_gesture: 'สองมือทำเป็นกรอบสี่เหลี่ยมระดับอกแสดงบรรทัดฐาน'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำศัพท์ทางการทูต 和平共处 (hépínggòngchǔ)',
        description_th: 'hé (เสียง 2) píng (เสียง 2) gòng (เสียง 4) chǔ (เสียง 3 ออกเสียง chǔ กริยาพำนัก/อยู่ร่วม)',
        example: '和平共处五项原则 (Hépíng gòngchǔ wǔ xiàng yuánzé)',
        fun_metaphor: 'เหมือนเสียงเพลงชาติบรรเลงเปิดงานประชุมสุดยอดผู้นำระดับโลก',
        reassurance: 'คำว่า 处 ในที่นี้อ่านเสียง 3 (chǔ) เป็นข้อสอบคัดเลือกนักการทูตที่พบบ่อยมาก'
      },
      grammar_bite: {
        title: 'โครงสร้างหลักการทูตสากล: 在……原则基础上，坚持睦邻友好',
        formula: '在相互尊重[อธิปไตย/บูรณภาพแห่งดินแดน]的基础上，坚持和平共处，维护国际关系基本准则',
        explanation_th: 'ใช้ในการร่างแถลงการณ์ร่วมและการแถลงข่าวของกระทรวงการต่างประเทศ',
        patterns: [
          {
            formula: '坚持和平共处，恪守国际准则。',
            zh: '双方重申在和平共处五项原则基础上，恪守国际关系基本准则。',
            pinyin: 'Shuāngfāng chóngshēn zài hépíng gòngchǔ wǔ xiàng yuánzé jīchǔ shang, kèshǒu guójì guānxì jīběn zhǔnzé.',
            th: 'ทั้งสองฝ่ายกล่าวย้ำถึงการยึดมั่นในหลักการ 5 ประการแห่งการอยู่ร่วมกันอย่างสันติ และปฏิบัติตามบรรทัดฐานพื้นฐานของความสัมพันธ์ระหว่างประเทศอย่างเคร่งครัด',
            en: 'Both sides reaffirmed that on the basis of the Five Principles of Peaceful Coexistence, they strictly abide by basic norms of international relations.'
          },
          {
            formula: '深化睦邻友好，维护国家主权。',
            zh: '我们将坚定维护国家主权，同时不断深化与周边国家的睦邻友好关系。',
            pinyin: 'Wǒmen jiāng jiāndìng wéihù guójiā zhǔquán, tóngshí bùduàn shēnhuà yǔ zhōubiān guójiā de mùlín yǒuhǎo guānxì.',
            th: 'พวกเราจะพิทักษ์อธิปไตยแห่งรัฐอย่างแน่วแน่ พร้อมทั้งกระชับความสัมพันธ์ฉันมิตรกับประเทศเพื่อนบ้านโดยรอบอย่างต่อเนื่อง',
            en: 'We will firmly safeguard national sovereignty while constantly deepening good-neighborly and friendly relations with surrounding nations.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '发言人 (Spokesperson) 🎙️',
          zh: '欢迎各位记者朋友出席外交部例行记者会，今天我们非常高兴在这里回答大家关心的国际问题，请提问。',
          pinyin: 'Huānyíng gèwèi jìzhě péngyǒu chūxí wàijiāobù lìxíng jìzhěhuì, jīntiān wǒmen fēicháng gāoxìng zài zhèlǐ huídá dàjiā guānxīn de guójì wèntí, qǐng tíwèn.',
          th: 'ขอต้อนรับผู้สื่อข่าวทุกท่านสู่การแถลงข่าวประจำวันของกระทรวงการต่างประเทศ วันนี้เรายินดีเป็นอย่างยิ่งที่จะตอบคำถามระหว่างประเทศที่ทุกคนให้ความสนใจ ขอเชิญถามคำถามครับ',
          en: 'Welcome media friends to the routine press briefing of the Ministry of Foreign Affairs; today we are very pleased to answer international questions everyone cares about, please ask.',
          audio_trigger: 't4_u49_l01_d01'
        },
        {
          speaker: '记者 (Journalist) 📰',
          zh: '请问中方如何看待当前与东盟国家的睦邻友好合作？',
          pinyin: 'Qǐngwèn zhōngfāng rúhé kàndài dāngqián yǔ Dōngméng guójiā de mùlín yǒuhǎo hézuò?',
          th: 'ขอเรียนถามว่าฝ่ายจีนมีมุมมองอย่างไรต่อความร่วมมือฉันมิตรกับกลุ่มประเทศอาเซียนในปัจจุบันครับ?',
          en: 'How does China view its current good-neighborly and friendly cooperation with ASEAN countries?',
          audio_trigger: 't4_u49_l01_d02'
        },
        {
          speaker: '发言人 (Spokesperson) 🎙️',
          zh: '中国始终秉持睦邻友好方针，在相互尊重主权基础上深化全面经贸投资与人文交流合作。',
          pinyin: 'Zhōngguó shǐzhōng bǐngchí mùlín yǒuhǎo fāngzhēn, zài xiānghù zūnzhòng zhǔquán jīchǔ shang shēnhuà quánmiàn jīngmào tóuzī yǔ rénwén jiāoliú hézuò.',
          th: 'จีนยึดมั่นในนโยบายไมตรีจิตฉันเพื่อนบ้านมาโดยตลอด และกระชับความร่วมมือทางเศรษฐกิจการค้า การลงทุน และการแลกเปลี่ยนทางวัฒนธรรมอย่างรอบด้าน บนพื้นฐานของการเคารพอธิปไตยซึ่งกันและกัน',
          en: 'China has always adhered to good-neighborly policies, deepening comprehensive trade, investment, and cultural cooperation on the basis of mutual respect for sovereignty.',
          audio_trigger: 't4_u49_l01_d03'
        },
        {
          speaker: '记者 (Journalist) 📰',
          zh: '这是否体现了和平共处五项原则作为国际准则的时代价值，促进区域和平稳定与繁荣发展？',
          pinyin: 'Zhè shìfǒu tǐxiàn le hépíng gòngchǔ wǔ xiàng yuánzé zuòwéi guójì zhǔnzé de shídài jiàzhí, cùjìn qūyù hépíng wěndìng yǔ fánróng fāzhǎn?',
          th: 'สิ่งนี้สะท้อนถึงคุณค่าแห่งยุคสมัยของหลัก 5 ประการแห่งการอยู่ร่วมกันอย่างสันติในฐานะบรรทัดฐานสากล ซึ่งช่วยส่งเสริมสันติภาพ ความมั่นคง และการพัฒนาที่รุ่งเรืองของภูมิภาคใช่หรือไม่ครับ?',
          en: 'Does this reflect the contemporary value of the Five Principles of Peaceful Coexistence as international norms, promoting regional peace, stability, and prosperous development?',
          audio_trigger: 't4_u49_l01_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'หลักการ "和平共处五项原则" มีจุดเริ่มต้นสำคัญในประวัติศาสตร์การทูตอย่างไร?',
          options: [
            'เป็นหลักการความสัมพันธ์ระหว่างประเทศที่ริเริ่มโดยจีน อินเดีย และเมียนมาในปี ค.ศ. 1954 เพื่อเป็นบรรทัดฐานความสัมพันธ์ระหว่างประเทศ',
            'เป็นสนธิสัญญาสงครามโลกครั้งที่หนึ่ง',
            'เป็นกฎการแข่งขันกีฬาโอลิมปิก',
            'เป็นข้อบังคับทางการค้าของสหภาพยุโรป'
          ],
          correct_index: 0,
          explanation_th: '"和平共处五项原则" (Five Principles of Peaceful Coexistence) เสนอขึ้นในปี 1954 กลายเป็นเสาหลักของการทูตสากล',
          encouragement: 'ยอดเยี่ยมมาก! มีความรู้รอบตัวทางการทูตที่แม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ยึดมั่นในการอยู่ร่วมกันอย่างสันติ เคารพอธิปไตยซึ่งกันและกัน"',
          tokens: ['相互尊重主权', '坚持和平共处'],
          correct_sequence: ['坚持和平共处', '相互尊重主权'],
          pinyin: 'Jiānchí hépíng gòngchǔ, xiānghù zūnzhòng zhǔquán.',
          meaning_th: 'ยึดมั่นในการอยู่ร่วมกันอย่างสันติ เคารพอธิปไตยซึ่งกันและกัน',
          explanation_th: 'หลักสันติภาพ (坚持和平共处) + หลักอธิปไตย (相互尊重主权)',
          encouragement: 'เรียงแถลงการณ์ระหว่างประเทศได้อย่างเฉียบคม!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "睦" ใน "睦邻" (มิตรภาพเพื่อนบ้าน) มีหมวดนำ "目" (ดวงตา) สื่อถึงอะไร?',
          options: [
            'สายตาที่มองกันด้วยความเมตตา อบอุ่น และเป็นมิตร',
            'การสอดแนมจับตามองเพื่อนบ้าน',
            'อาการเจ็บตา',
            'การเพ่งมองเวลากลางคืน'
          ],
          correct_index: 0,
          explanation_th: '"目" คือดวงตา "睦" หมายถึงสายตาที่มองกันด้วยความสนิทสนม ปรองดอง ไร้ความหวาดระแวง',
          encouragement: 'จำรากศัพท์สัมพันธไมตรีได้อย่างลึกซึ้ง!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "准则" (zhǔnzé) มีความหมายตรงกับคำภาษาอังกฤษว่าอะไรในบริบทการทูต?',
          options: [
            'Norms / Code of Conduct (บรรทัดฐานและข้อพึงปฏิบัติ)',
            'Military Weapons (อาวุธสงคราม)',
            'Economic Currency (เงินตราสกุลหลัก)',
            'Travel Visa (วีซ่าท่องเที่ยว)'
          ],
          correct_index: 0,
          explanation_th: '"国际关系基本准则" แปลว่า Basic norms governing international relations',
          encouragement: 'เข้าใจคำศัพท์เฉพาะทางความสัมพันธ์ระหว่างประเทศอย่างแม่นยำ!'
        }
      ],
      boss_challenge: {
        question: 'ในร่างแถลงการณ์ร่วมของผู้นำสองประเทศ ประโยคใดสะท้อนหลักการทูตเพื่อนบ้านได้อย่างถูกต้องตามแบบแผนสากล?',
        options: [
          '双方愿在相互尊重主权的基础上，不断巩固睦邻友好，维护和平共处。',
          '团队鉴于形势权衡利弊，以便协调谈判与公关澄清。',
          '温故知新方能博大精深，古为今用促进团队创新。',
          '知己知彼百战不殆，赏罚分明运筹帷幄。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "相互尊重主权", "巩固睦邻友好" และ "维护和平共处" ได้อย่างสง่างาม ถูกต้องตามแบบแผนการทูต'
      },
      cheer_trophy: {
        badge_name: 'ทูตสันติภาพสากล (Ambassador of Peaceful Coexistence)',
        message_th: 'ยินดีด้วย! คุณเข้าใจหลักการทูต和平共处 และ 睦邻友好 อย่างลึกซึ้ง พร้อมวิเคราะห์แถลงการณ์ระดับชาติ!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u49_l02',
      lesson_number: 2,
      title: {
        zh: '互利共赢：战略伙伴与多边合作',
        th: 'ผลประโยชน์ร่วมกัน (互利共赢): หุ้นส่วนทางยุทธศาสตร์และความร่วมมือพหุภาคี',
        en: 'Mutual Benefit: Strategic Partnerships & Multilateral Cooperation'
      },
      can_do: {
        th: 'ใช้คำศัพท์เกี่ยวกับความร่วมมือระดับสูง เช่น 战略伙伴, 多边, 备忘录, 共识 ในการเขียนรายงานทางเศรษฐกิจการเมืองระหว่างประเทศได้',
        en: 'Master high-level partnership terminology: Strategic Partner, Multilateralism, MOU, and Consensus'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำคำว่า 战略伙伴 และ 备忘录 ไปใช้ในการอธิบายความร่วมมือระดับนานาชาติ!',
      vocabulary: [
        {
          id: 'hsk4_4906',
          hanzi: '战略伙伴',
          pinyin: 'zhànlüèhuǒbàn',
          display_pinyin: 'zhànlüèhuǒbàn',
          pinyin_tone: 'zhan4lüe4huo3ban4',
          meaning_th: 'หุ้นส่วนทางยุทธศาสตร์ / พันธมิตรความร่วมมือระยะยาวระดับชาติ',
          meaning_en: 'strategic partner / strategic partnership',
          radical: '戈',
          radical_name_th: 'หมวดหอกดาบ (戈字旁)',
          stroke_count: 28,
          mnemonic: 'จับมือเคียงบ่าเคียงไหล่ในแผนยุทธศาสตร์ใหญ่ (战略) ร่วมกับมิตรแท้ (伙伴) = หุ้นส่วนยุทธศาสตร์',
          kid_mnemonic: 'สองประเทศร่วมกันลงนามจับมือเป็นหุ้นส่วนพัฒนาพลังงานสะอาด = 战略伙伴',
          body_gesture: 'สองมือจับประสานกันแน่นระดับอกแสดงความเป็นพันธมิตร'
        },
        {
          id: 'hsk4_4907',
          hanzi: '多边',
          pinyin: 'duōbiān',
          display_pinyin: 'duōbiān',
          pinyin_tone: 'duo1bian1',
          meaning_th: 'พหุภาคี / หลายฝ่าย / หลายประเทศร่วมมือกัน (ตรงข้ามกับ 单边 - เอกภาคี)',
          meaning_en: 'multilateral / multilateralism',
          radical: '夕',
          radical_name_th: 'หมวดดวงจันทร์ยามค่ำ (夕字旁)',
          stroke_count: 11,
          mnemonic: 'หลากหลายมุมมองและทิศทาง (多) ร่วมกันล้อมรอบขอบเขต (边) = พหุภาคี',
          kid_mnemonic: 'ตัวแทนจากหลายสิบประเทศนั่งประชุมรอบโต๊ะกลมขนาดใหญ่ = 多边',
          body_gesture: 'กางสองแขนวาดเป็นวงกลมรอบตัวแสดงการมีส่วนร่วมของทุกฝ่าย'
        },
        {
          id: 'hsk4_4908',
          hanzi: '互利',
          pinyin: 'hùlì',
          display_pinyin: 'hùlì',
          pinyin_tone: 'hu4li4',
          meaning_th: 'ผลประโยชน์ซึ่งกันและกัน / เอื้อประโยชน์ต่อกันทั้งสองฝ่าย',
          meaning_en: 'mutual benefit / mutually beneficial',
          radical: '互',
          radical_name_th: 'หมวดสลับประสาน (互字部)',
          stroke_count: 11,
          mnemonic: 'สายใยสลับประสานกัน (互) นำมาซึ่งความงอกงามและผลตอบแทน (利) = ได้ประโยชน์ร่วมกัน',
          kid_mnemonic: 'แลกเปลี่ยนเมล็ดพันธุ์พืชกันแล้วทั้งสองสวนก็ออกผลดกงาม = 互利',
          body_gesture: 'สองมือทำท่ายื่นแลกเปลี่ยนสิ่งของให้กันด้วยความยินดี'
        },
        {
          id: 'hsk4_4909',
          hanzi: '共识',
          pinyin: 'gòngshí',
          display_pinyin: 'gòngshí',
          pinyin_tone: 'gong4shi2',
          meaning_th: 'ฉันทามติ / ข้อตกลงร่วมกัน / ความเห็นพ้องต้องกัน',
          meaning_en: 'consensus / common understanding',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 18,
          mnemonic: 'รับรู้และเข้าใจร่วมกัน (共) ผ่านสติปัญญาและวจี (识) = ฉันทามติ',
          kid_mnemonic: 'ทุกคนในที่ประชุมยกมือพร้อมกันเห็นชอบข้อตกลง = 共识',
          body_gesture: 'พยักหน้าพร้อมยกสองนิ้วโป้งแสดงความเห็นชอบร่วมกัน'
        },
        {
          id: 'hsk4_4910',
          hanzi: '备忘录',
          pinyin: 'bèiwànglù',
          display_pinyin: 'bèiwànglù',
          pinyin_tone: 'bei4wang4lu4',
          meaning_th: 'บันทึกความเข้าใจ (MOU) / บันทึกช่วยจำเพื่อเตือนความจำ',
          meaning_en: 'memorandum / MOU (Memorandum of Understanding)',
          radical: '攵',
          radical_name_th: 'หมวดเคาะเบาๆ (反文旁)',
          stroke_count: 27,
          mnemonic: 'เตรียมพร้อมไว้ (备) ป้องกันการหลงลืม (忘) โดยจดบันทึกลงสมุด (录) = บันทึกความเข้าใจ',
          kid_mnemonic: 'แฟ้มเอกสารปกหนังสีน้ำเงินประทับตราความร่วมมือสองฝ่าย = 备忘录',
          body_gesture: 'สองมือทำท่าเปิดแฟ้มเอกสารและจรดปากกาเซ็นชื่อ'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงวรรณยุกต์ในคำศัพท์ทางการ 战略伙伴 (zhànlüèhuǒbàn)',
        description_th: 'zhàn (เสียง 4) lüè (เสียง 4) huǒ (เสียง 3) bàn (เสียง 4) จังหวะหนักแน่นสามในสี่พยางค์ สื่อถึงความมั่นคงของความเป็นพันธมิตร',
        example: '全面战略伙伴关系 (Quánmiàn zhànlüè huǒbàn guānxì)',
        fun_metaphor: 'เหมือนการตอกเสาเข็มสี่ต้นค้ำจุนสะพานมิตรภาพข้ามแม่น้ำใหญ่',
        reassurance: 'คำว่า huǒbàn อ่าน huǒ เสียง 3 และ bàn เสียง 4 อย่างชัดเจน'
      },
      grammar_bite: {
        title: 'โครงสร้างการบรรลุข้อตกลงความร่วมมือ: 达成广泛共识，签署合作备忘录',
        formula: '双方经过友好协商，在[สาขาความร่วมมือ]领域达成广泛共识，正式签署[บันทึกข้อตกลง]',
        explanation_th: 'ใช้สรุปผลลัพธ์การประชุมสุดยอดผู้นำระดับทวิภาคีหรือพหุภาคี',
        patterns: [
          {
            formula: '坚持多边主义，深化互利合作。',
            zh: '双方一致同意坚定维护多边主义，在绿色经济领域深化互利共赢合作。',
            pinyin: 'Shuāngfāng yīzhì tóngyì jiāndìng wéihù duōbiānzhǔyì, zài lǜsè jīngjì lǐngyù shēnhuà hùlì gòngyíng hézuò.',
            th: 'ทั้งสองฝ่ายเห็นพ้องเป็นเอกฉันท์ในการพิทักษ์พหุภาคีนิยมอย่างแน่วแน่ และกระชับความร่วมมือเพื่อผลประโยชน์ร่วมกันในด้านเศรษฐกิจสีเขียว',
            en: 'Both sides unanimously agreed to firmly uphold multilateralism and deepen mutually beneficial win-win cooperation in green economy.'
          },
          {
            formula: '落实领导人共识，签署合作备忘录。',
            zh: '为切实落实两国领导人达成的共识，双方代表正式签署了经贸合作备忘录。',
            pinyin: 'Wèi qièshí luòshí liǎng guó lǐngdǎorén dáchéng de gòngshí, shuāngfāng dàibiǎo zhèngshì qiānshǔ le jīngmào hézuò bèiwànglù.',
            th: 'เพื่อนำฉันทามติที่ผู้นำของทั้งสองประเทศบรรลุไว้ไปสู่การปฏิบัติจริง ตัวแทนทั้งสองฝ่ายได้ลงนามในบันทึกความเข้าใจว่าด้วยความร่วมมือทางเศรษฐกิจและการค้าอย่างเป็นทางการ',
            en: 'To effectively implement the consensus reached by the leaders of both nations, representatives formally signed a memorandum on economic and trade cooperation.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '代表团长 (Head of Delegation) 🤝',
          zh: '经过数轮坦诚磋商与深入市场调研，我们今天非常高兴宣布，两国正式确立了全面战略伙伴关系。',
          pinyin: 'Jīngguò shù lún tǎnchéng cuōshāng yǔ shēnrù shìchǎng diàoyán, wǒmen jīntiān fēicháng gāoxìng xuānbù, liǎng guó zhèngshì quèlì le quánmiàn zhànlüè huǒbàn guānxì.',
          th: 'หลังจากการหารืออย่างจริงใจและการสำรวจวิจัยตลาดอย่างลึกซึ้งหลายรอบ วันนี้พวกเรายินดีเป็นอย่างยิ่งที่จะประกาศว่า ทั้งสองประเทศได้สถาปนาความสัมพันธ์หุ้นส่วนทางยุทธศาสตร์อย่างรอบด้านอย่างเป็นทางการ',
          en: 'After several rounds of candid consultations and in-depth market research, we are very pleased to announce today that our two nations have officially established a comprehensive strategic partnership.',
          audio_trigger: 't4_u49_l02_d01'
        },
        {
          speaker: '外长 (Foreign Minister) 🌐',
          zh: '这充分体现了双方在多边舞台上维护和平与繁荣的共同决心。',
          pinyin: 'Zhè chōngfèn tǐxiàn le shuāngfāng zài duōbiān wǔtái shang wéihù hépíng yǔ fánróng de gòngtóng juéxīn.',
          th: 'สิ่งนี้สะท้อนถึงความมุ่งมั่นร่วมกันของทั้งสองฝ่ายในการพิทักษ์สันติภาพและความเจริญรุ่งเรืองบนเวทีพหุภาคีอย่างเต็มเปี่ยมครับ',
          en: 'This fully reflects the joint resolve of both sides to safeguard peace and prosperity on the multilateral stage.',
          audio_trigger: 't4_u49_l02_d02'
        },
        {
          speaker: '代表团长 (Head of Delegation) 🤝',
          zh: '今天签署的经贸备忘录，将为两国科技创新、绿色发展与企业投资带来实实在在的互利成果。',
          pinyin: 'Jīntiān qiānshǔ de jīngmào bèiwànglù, jiāng wèi liǎng guó kējì chuàngxīn, lǜsè fāzhǎn yǔ qǐyè tóuzī dàilái shíshízàizài de hùlì chéngguǒ.',
          th: 'บันทึกความเข้าใจทางเศรษฐกิจและการค้าที่ลงนามในวันนี้ จะนำผลประโยชน์ร่วมกันที่เป็นรูปธรรมมาสู่การสร้างสรรค์นวัตกรรมเทคโนโลยี การพัฒนาสีเขียว และการลงทุนของภาคธุรกิจในทั้งสองประเทศ',
          en: 'The economic and trade memorandum signed today will bring tangible mutual benefits to technological innovation, green development, and corporate investment in both countries.',
          audio_trigger: 't4_u49_l02_d03'
        },
        {
          speaker: '外长 (Foreign Minister) 🌐',
          zh: '只要我们坚持这一共识，加强沟通交流与务实协作，双边合作的未来必将更加广阔！',
          pinyin: 'Zhǐyào wǒmen jiānchí zhè yī gòngshí, jiāqiáng gōutōng jiāoliú yǔ wùshí xiézuò, shuāngbiān hézuò de wèilái bìjiāng gèngjiā guǎngkuò!',
          th: 'ขอเพียงพวกเรายึดมั่นในฉันทามตินี้ เพิ่มพูนการสื่อสารแลกเปลี่ยนและการประสานงานอย่างเป็นรูปธรรม อนาคตแห่งความร่วมมือทวิภาคีย่อมจะกว้างไกลยิ่งขึ้นอย่างแน่นอนครับ!',
          en: 'As long as we adhere to this consensus, strengthening communication and pragmatic coordination, the future of bilateral cooperation will surely be even broader!',
          audio_trigger: 't4_u49_l02_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "备忘录" ในการทูตและธุรกิจสากล เทียบเท่ากับคำว่าอะไร?',
          options: [
            'MOU (Memorandum of Understanding / บันทึกความเข้าใจ)',
            'Passport (หนังสือเดินทาง)',
            'Commercial Invoice (ใบแจ้งหนี้การค้า)',
            'Court Subpoena (หมายศาล)'
          ],
          correct_index: 0,
          explanation_th: '"备忘录" (bèiwànglù) คือ Memorandum หรือ MOU บันทึกข้อตกลงกรอบความร่วมมือระหว่างองค์กรหรือประเทศ',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจเอกสารสำคัญทางการทูต!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ทั้งสองฝ่ายบรรลุฉันทามติกว้างขวาง ลงนามบันทึกความเข้าใจ"',
          tokens: ['签署备忘录', '达成广泛共识'],
          correct_sequence: ['达成广泛共识', '签署备忘录'],
          pinyin: 'Dáchéng guǎnfàn gòngshí, qiānshǔ bèiwànglù.',
          meaning_th: 'ทั้งสองฝ่ายบรรลุฉันทามติกว้างขวาง ลงนามบันทึกความเข้าใจ',
          explanation_th: 'บรรลุข้อตกลง (达成广泛共识) + ลงนามเอกสาร (签署备忘录)',
          encouragement: 'จัดประโยคพิธีการทูตได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "录" (lù - บันทึก) ใน "备忘录" มีหมวดนำ "彐" หรือ "氺/水" สื่อถึงการจารึกสิ่งใด?',
          options: [
            'การจดบันทึกรวบรวมข้อความสำคัญลงบนกระดาษหรือแผ่นไม้เพื่อไม่ให้สูญหาย',
            'การอัดเสียงเพลง',
            'การถ่ายภาพยนตร์',
            'การวาดภาพวิวทิวทัศน์'
          ],
          correct_index: 0,
          explanation_th: '"录" เดิมทีคือการสกัดกรองและคัดลอกบันทึกข้อความสำคัญเก็บไว้เป็นหลักฐาน',
          encouragement: 'จำความหมายรากศัพท์ได้อย่างแม่นยำ!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "多边主义" (Multilateralism) เน้นย้ำหลักการใดในกิจการระหว่างประเทศ?',
          options: [
            'การร่วมมือและปรึกษาหารือกันระหว่างหลายประเทศบนพื้นฐานของกฎหมายสากล ไม่ใช้การตัดสินใจฝ่ายเดียว',
            'ประเทศมหาอำนาจประเทศเดียวตัดสินใจแทนทุกประเทศ',
            'การปิดพรมแดนไม่ติดต่อค้าขายกับใคร',
            'การยกเลิกองค์การสหประชาชาติ'
          ],
          correct_index: 0,
          explanation_th: '"多边主义" (Multilateralism) คือ การร่วมมือกันของหลายประเทศในการแก้ไขปัญหาของโลกโดยยึดกฎเกณฑ์กติกาสากล',
          encouragement: 'เข้าใจแนวคิดความสัมพันธ์ระหว่างประเทศยุคใหม่อย่างลึกซึ้ง!'
        }
      ],
      boss_challenge: {
        question: 'ในข่าวแถลงผลการประชุมสุดยอดผู้นำ ประโยคใดรายงานความสำเร็จได้อย่างสมบูรณ์และเป็นทางการที่สุด?',
        options: [
          '两国领导人达成广泛共识，正式签署了绿色经贸合作备忘录。',
          '企业团队致力于创新低碳，在合同谈判与仲裁条款中达成共识。',
          '公关团队积极澄清舆论反馈，实事求是发布危机声明。',
          '双方顺其自然上善若水，和而不同秉持仁爱修身中庸。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกระบุ "达成广泛共识" และ "正式签署合作备忘录" ได้อย่างสมบูรณ์ตามหลักภาษาข่าวทางการทูต'
      },
      cheer_trophy: {
        badge_name: 'สถาปนิกแห่งความร่วมมือพหุภาคี (Multilateral Architect)',
        message_th: 'ยอดเยี่ยม! คุณสามารถใช้ศัพท์แสงทางการทูต 战略伙伴, 多边 และ 备忘录 ได้อย่างคล่องแคล่วและแม่นยำ!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u49_l03',
      lesson_number: 3,
      title: {
        zh: '严正立场：外交发言与原则底线',
        th: 'จุดยืนอันหนักแน่น (严正立场): การแถลงข่าวทางการทูตและเส้นแบ่งแห่งหลักการ',
        en: 'Principled Stance: Foreign Ministry Spokesperson Statements'
      },
      can_do: {
        th: 'เข้าใจและใช้วาทศิลป์ของโฆษกกระทรวงการต่างประเทศ (立场, 严正, 坚决, 底线, 交涉) ในการแสดงจุดยืนอย่างมีศิลปะ',
        en: 'Interpret and employ Foreign Ministry rhetoric (Stance, Stern Demarche, Resolute Opposition, Red Lines)'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ถอดรหัสแถลงการณ์แสดงจุดยืนของโฆษกกระทรวงการต่างประเทศได้อย่างแม่นยำ!',
      vocabulary: [
        {
          id: 'hsk4_49011',
          hanzi: '立场',
          pinyin: 'lìchǎng',
          display_pinyin: 'lìchǎng',
          pinyin_tone: 'li4chang3',
          meaning_th: 'จุดยืน / ทัศนคติและท่าทีทางการต่อประเด็นปัญหา',
          meaning_en: 'position / stance / ground',
          radical: '立',
          radical_name_th: 'หมวดตั้งตรง (立字旁)',
          stroke_count: 17,
          mnemonic: 'ยืนหยัดอย่างมั่นคง (立) ณ ลานแห่งหลักการ (场) = จุดยืนที่ไม่สั่นคลอน',
          kid_mnemonic: 'ยืนปักหลักอย่างมั่นคงไม่ยอมถอยหลังบนเวทีอภิปราย = 立场',
          body_gesture: 'ยืนตัวตรงสองเท้าวางมั่นคงบนพื้นอกผายผึ่ง'
        },
        {
          id: 'hsk4_49012',
          hanzi: '严正',
          pinyin: 'yánzhèng',
          display_pinyin: 'yánzhèng',
          pinyin_tone: 'yan2zheng4',
          meaning_th: 'อย่างจริงจัง เคร่งครัด และชอบธรรม (严正声明 / 严正交涉)',
          meaning_en: 'solemn and just / stern / serious and principled',
          radical: '一',
          radical_name_th: 'หมวดหนึ่ง (一部)',
          stroke_count: 12,
          mnemonic: 'เคร่งครัดรัดกุม (严) เที่ยงธรรมไร้เอียงเอน (正) = จริงจังและชอบธรรม',
          kid_mnemonic: 'โฆษกปรับไมโครโฟนทำสีหน้าจริงจังสงบนิ่งก่อนแถลงการณ์ = 严正',
          body_gesture: 'สีหน้าสงบนิ่งจริงจังประสานสองมือไว้บนโต๊ะแถลงข่าว'
        },
        {
          id: 'hsk4_49013',
          hanzi: '交涉',
          pinyin: 'jiāoshè',
          display_pinyin: 'jiāoshè',
          pinyin_tone: 'jiao1she4',
          meaning_th: 'การเจรจาประท้วง / การยื่นหนังสือแสดงความกังวลหรือคัดค้านทางการทูต',
          meaning_en: 'representation / make representations to / negotiate sternly',
          radical: '氵',
          radical_name_th: 'หมวดสามจุดน้ำ (三点水)',
          stroke_count: 16,
          mnemonic: 'สานสัมพันธ์ติดต่อ (交) ลุยข้ามสายน้ำเพื่อเจรจาคลี่คลาย (涉) = การเจรจาประท้วง',
          kid_mnemonic: 'นักการทูตยื่นแฟ้มหนังสือแถลงการณ์อย่างเป็นทางการต่อคู่เจรจา = 交涉',
          body_gesture: 'ยื่นสองมือส่งเอกสารไปข้างหน้าอย่างเด็ดเดี่ยว'
        },
        {
          id: 'hsk4_49014',
          hanzi: '坚决',
          pinyin: 'jiānjué',
          display_pinyin: 'jiānjué',
          pinyin_tone: 'jian1jue2',
          meaning_th: 'อย่างเด็ดเดี่ยวแน่วแน่ / อย่างไม่ประนีประนอมในหลักการ',
          meaning_en: 'firm / resolute / determined',
          radical: '土',
          radical_name_th: 'หมวดดิน (土字底)',
          stroke_count: 13,
          mnemonic: 'แข็งแกร่งดั่งหินผา (坚) ตัดสินใจเด็ดขาดไม่ลังเล (决) = เด็ดเดี่ยวแน่วแน่',
          kid_mnemonic: 'กำหมัดแน่นแล้วส่ายหน้าบอกปฏิเสธอย่างหนักแน่นว่าไม่ยอมเด็ดขาด = 坚决',
          body_gesture: 'กำหมัดแน่นแนบอกพร้อมพยักหน้าอย่างเด็ดขาด'
        },
        {
          id: 'hsk4_49015',
          hanzi: '底线',
          pinyin: 'dǐxiàn',
          display_pinyin: 'dǐxiàn',
          pinyin_tone: 'di3xian4',
          meaning_th: 'ขีดจำกัดล่างสุด / เส้นตาย / เส้นแบ่งที่ไม่อาจยอมให้ก้าวล้ำได้ (Red Line)',
          meaning_en: 'bottom line / red line / minimum acceptable threshold',
          radical: '广',
          radical_name_th: 'หมวดเพิงพัก (广字旁)',
          stroke_count: 16,
          mnemonic: 'จุดต่ำสุดใต้ฐานราก (底) ขีดเส้นแบ่งไว้อย่างชัดเจน (线) = เส้นแบ่งหลักการ',
          kid_mnemonic: 'ขีดเส้นสีแดงบนพื้นบอกว่านี่คือเส้นเขตแดนห้ามก้าวข้าม = 底线',
          body_gesture: 'ใช้นิ้วชี้ขีดเส้นตรงในอากาศขนานกับพื้นอย่างเด็ดขาด'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงน้ำเสียงหนักแน่นใน 坚决反对 (jiānjué fǎnduì)',
        description_th: 'jiān (เสียง 1) jué (เสียง 2) fǎn (เสียง 3) duì (เสียง 4) เสียง 4 ท้ายคำตัดจบอย่างเด็ดขาด ทรงพลังและสง่างาม',
        example: '中方对此表示坚决反对！',
        fun_metaphor: 'เหมือนเสียงเคาะโต๊ะแถลงข่าวด้วยความหนักแน่นของโฆษก',
        reassurance: 'สำนวนเอกลักษณ์ของโฆษกกระทรวงการต่างประเทศที่ได้ยินบ่อยที่สุดในข่าว'
      },
      grammar_bite: {
        title: 'โครงสร้างการแถลงจุดยืนทางการทูต: 表明严正立场，坚决反对……',
        formula: '中方在[ประเด็นปัญหา]上的立场是一贯的、明确的，对此提出严正交涉，坚决反对[พฤติกรรมละเมิด]',
        explanation_th: 'รูปแบบมาตรฐานของโฆษกกระทรวงการต่างประเทศในการพิทักษ์ผลประโยชน์แห่งชาติและเส้นแบ่งหลักการ',
        patterns: [
          {
            formula: '表明严正立场，坚决捍卫主权。',
            zh: '中方对此表明严正立场，坚决反对任何外部势力干涉内政。',
            pinyin: 'Zhōngfāng duì cǐ biǎomíng yánzhèng lìchǎng, jiānjué fǎnduì rènhé wàibù shìlì gānshè nèizhèng.',
            th: 'ฝ่ายจีนขอแสดงจุดยืนอันจริงจังและชอบธรรมต่อเรื่องนี้ และคัดค้านอย่างเด็ดเดี่ยวต่อการแทรกแซงกิจการภายในโดยกองกำลังภายนอกใดๆ',
            en: 'China states its solemn position on this, resolutely opposing any external interference in internal affairs.'
          },
          {
            formula: '严守原则底线，提出严正交涉。',
            zh: '我们必须坚守国家核心利益底线，已就相关事件向对方提出严正交涉。',
            pinyin: 'Wǒmen bìxū jiānshǒu guójiā héxīn lìyì dǐxiàn, yǐ jiù xiāngguān shìjiàn xiàng duìfāng tíchū yánzhèng jiāoshè.',
            th: 'พวกเราต้องยึดมั่นในเส้นแบ่งผลประโยชน์แกนกลางของชาติ และได้ยื่นหนังสือเจรจาประท้วงอย่างเคร่งครัดต่ออีกฝ่ายแล้ว',
            en: 'We must firmly guard the bottom line of national core interests, having made solemn representations to the other party.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '记者 (Journalist) 📰',
          zh: '发言人下午好！有报道称个别国家企图对中方实施贸易限制，请问中方对此有何评论与看法？',
          pinyin: 'Fāyánrén xiàwǔ hǎo! Yǒu bàodào chēng gèbié guójiā qǐtú duì zhōngfāng shíshī màoyì xiànzhì, qǐngwèn zhōngfāng duì cǐ yǒu hé pínglùn yǔ kànfǎ?',
          th: 'สวัสดีตอนบ่ายครับท่านโฆษก มีรายงานระบุว่าบางประเทศพยายามจะใช้มาตรการจำกัดทางการค้าต่อฝ่ายจีน ขอเรียนถามว่าฝ่ายจีนมีความเห็นและมุมมองต่อเรื่องนี้อย่างไรครับ?',
          en: 'Good afternoon spokesperson! Reports claim certain countries attempt to impose trade restrictions on China; what are China\'s comments and views on this?',
          audio_trigger: 't4_u49_l03_d01'
        },
        {
          speaker: '发言人 (Spokesperson) 🎙️',
          zh: '中方在此问题上的立场是一贯和明确的。贸易保护主义损人害己，不利于全球经济健康发展与供应链稳定。',
          pinyin: 'Zhōngfāng zài cǐ wèntí shang de lìchǎng shì yīguàn hé míngquè de. Màoyì bǎohùzhǔyì sǔnrén hàijǐ, bùlìyú quánqiú jīngjì jiànkāng fāzhǎn yǔ gōngyìngliàn wěndìng.',
          th: 'จุดยืนของฝ่ายจีนในประเด็นนี้มีความคงเส้นคงวาและชัดเจนมาโดยตลอด ลัทธิกีดกันทางการค้ามีแต่จะทำร้ายผู้อื่นและสร้างความเสียหายต่อตนเอง ไม่เป็นผลดีต่อการพัฒนาเศรษฐกิจโลกอย่างมั่นคงและความต่อเนื่องของห่วงโซ่อุปทานครับ',
          en: 'China\'s position on this issue is consistent and clear. Trade protectionism harms others without benefiting oneself, detrimental to global economic recovery and supply chain stability.',
          audio_trigger: 't4_u49_l03_d02'
        },
        {
          speaker: '记者 (Journalist) 📰',
          zh: '中方是否已经采取了外交行动？',
          pinyin: 'Zhōngfāng shìfǒu yǐjīng cǎiqǔ le wàijiāo xíngdòng?',
          th: 'ฝ่ายจีนได้ดำเนินมาตรการทางการทูตแล้วหรือยังครับ?',
          en: 'Has the Chinese side taken diplomatic action already?',
          audio_trigger: 't4_u49_l03_d03'
        },
        {
          speaker: '发言人 (Spokesperson) 🎙️',
          zh: '我们已向有关方面提出严正交涉。中方坚决捍卫自身企业合法权益与发展利益，国家原则底线绝不容践踏！',
          pinyin: 'Wǒmen yǐ xiàng yǒuguān fāngmiàn tíchū yánzhèng jiāoshè. Zhōngfāng jiānjué hànwèi zìshēn qǐyè héfǎ quányì yǔ fāzhǎn lìyì, guójiā yuánzé dǐxiàn jué bùróng jiàntà!',
          th: 'เราได้ยื่นหนังสือประท้วงอย่างเคร่งครัดต่อฝ่ายที่เกี่ยวข้องแล้ว ฝ่ายจีนจะพิทักษ์สิทธิและผลประโยชน์อันชอบธรรมของภาคธุรกิจและผลประโยชน์แห่งการพัฒนาอย่างเด็ดเดี่ยว เส้นตายของหลักการแห่งชาติไม่อาจยอมให้ผู้ใดย่ำยีได้!',
          en: 'We have made solemn representations to relevant parties. China resolutely safeguards the legitimate rights and developmental interests of its enterprises; national principle red lines cannot be trampled upon!',
          audio_trigger: 't4_u49_l04_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'ในภาษาการทูต การที่กระทรวงการต่างประเทศ "提出严正交涉" (tíchū yánzhèng jiāoshè) หมายถึงการกระทำใด?',
          options: [
            'การยื่นหนังสือประท้วงหรือแสดงความกังวลคัดค้านอย่างเป็นทางการต่อรัฐบาลอีกประเทศหนึ่ง',
            'การเชิญอีกฝ่ายมารับประทานอาหารค่ำ',
            'การให้เงินช่วยเหลือแบบให้เปล่า',
            'การประกาศยอมรับข้อเสนอทุกประการ'
          ],
          correct_index: 0,
          explanation_th: '"严正交涉" (Make solemn representations) คือ ขั้นตอนทางการทูตอย่างเป็นทางการเพื่อประท้วงหรือแสดงความคัดค้านอย่างหนักแน่น',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจกลไกการทูตระดับสากล!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "แสดงจุดยืนอันจริงจัง คัดค้านอย่างเด็ดเดี่ยว"',
          tokens: ['坚决反对', '表明严正立场'],
          correct_sequence: ['表明严正立场', '坚决反对'],
          pinyin: 'Biǎomíng yánzhèng lìchǎng, jiānjué fǎnduì.',
          meaning_th: 'แสดงจุดยืนอันจริงจัง คัดค้านอย่างเด็ดเดี่ยว',
          explanation_th: 'แสดงจุดยืน (表明严正立场) + ท่าทีคัดค้าน (坚决反对)',
          encouragement: 'จัดประโยคแถลงการณ์โฆษกได้อย่างทรงพลัง!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "坚" (jiān - มั่นคง/แข็งแกร่ง) ใน "坚决" มีหมวดนำ "土" (ดิน) ด้านล่าง สื่อถึงอะไร?',
          options: [
            'กำแพงดินและป้อมปราการที่สร้างขึ้นอย่างแข็งแกร่งมั่นคงไม่พังทลาย',
            'ฝุ่นละอองที่ปลิวตามลม',
            'ดินเหนียวสำหรับปั้นเครื่องเคลือบ',
            'การทำไร่ทำนา'
          ],
          correct_index: 0,
          explanation_th: '"土" คือผืนดินและป้อมปราการดินโบราณที่อัดแน่นจนแข็งแกร่งดั่งหินผา (坚)',
          encouragement: 'เข้าใจรากศัพท์แห่งความมั่นคงได้อย่างถ่องแท้!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "底线" (dǐxiàn) ในการเจรจาระหว่างประเทศเปรียบเทียบกับคำใด?',
          options: [
            'Red Line (เส้นตายหรือขีดจำกัดที่ไม่อาจประนีประนอมยอมถอยได้)',
            'Price Tag (ป้ายราคาขายสินค้า)',
            'Finish Line (เส้นชัยการแข่งขันกีฬา)',
            'Railway Line (รางรถไฟความเร็วสูง)'
          ],
          correct_index: 0,
          explanation_th: '"底线" คือ Bottom line หรือ Red line จุดยืนขั้นต่ำสุดที่ต้องปกป้อง ไม่สามารถยอมอ่อนข้อได้',
          encouragement: 'เข้าใจคำศัพท์ยุทธศาสตร์การเจรจาอย่างเฉียบคม!'
        }
      ],
      boss_challenge: {
        question: 'หากคุณเป็นโฆษกกระทรวงการต่างประเทศที่ต้องตอบโต้การละเมิดอธิปไตยทางพรมแดน ประโยคใดถูกต้องและมีพลังที่สุดตามธรรมเนียมการทูต?',
        options: [
          '中方对此提出严正交涉，坚定捍卫领土主权，绝不容许触碰底线！',
          '公关发言人迅速响应媒体舆论，实事求是进行官方澄清。',
          '双方团队在合同条款与仲裁谈判中权衡利弊，以便达成共识。',
          '兵贵神速知己知彼，运筹帷幄赏罚分明。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกใช้ "提出严正交涉", "捍卫领土主权", "绝不容许触碰底线" ได้อย่างทรงอำนาจและถูกต้องตามแบบแผนการทูตสากล'
      },
      cheer_trophy: {
        badge_name: 'โฆษกผู้พิทักษ์จุดยืนแห่งรัฐ (Spokesperson of Principled Stance)',
        message_th: 'ยินดีด้วย! คุณเข้าใจวาทศิลป์ทางการทูต 严正交涉, 坚决反对 และ 底线 อย่างลึกซึ้ง พร้อมเป็นกระบอกเสียงแห่งหลักการ!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u49_l04',
      lesson_number: 4,
      title: {
        zh: '和谐天下：大国担当与全球治理',
        th: 'สันติภาพใต้หล้า (和谐天下): ความรับผิดชอบของมหาอำนาจ (大国担当) และแสวงจุดร่วมสงวนจุดต่าง (求同存异)',
        en: 'Global Harmony: Major Country Responsibility & Global Governance'
      },
      can_do: {
        th: 'อธิบายแนวคิด 大国担当, 全球治理 และนำสำนวน 求同存异, 斡旋, 共同体 ไปใช้ในการวิเคราะห์สุนทรพจน์ระดับผู้นำโลกได้',
        en: 'Elucidate Major Power Responsibility, Global Governance, and idioms "Seek Common Ground" & "Community with Shared Future"'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำหลักการ 求同存异 และ 大国担当 มาสร้างวิสัยทัศน์สันติภาพโลก!',
      vocabulary: [
        {
          id: 'hsk4_49016',
          hanzi: '大国担当',
          pinyin: 'dàguódāndāng',
          display_pinyin: 'dàguódāndāng',
          pinyin_tone: 'da4guo2dan1dang1',
          meaning_th: 'ความรับผิดชอบและความกล้าหาญในการแบกรับภารกิจในฐานะประเทศมหาอำนาจ',
          meaning_en: 'responsibility of a major country / major power commitment',
          radical: '大',
          radical_name_th: 'หมวดใหญ่ (大字部)',
          stroke_count: 26,
          mnemonic: 'ประเทศใหญ่ (大国) ใช้บ่าแบกรับภาระเพื่อส่วนรวม (担当) = ความรับผิดชอบแห่งมหาอำนาจ',
          kid_mnemonic: 'พี่ยักษ์ใหญ่ใจดีช่วยแบกกระเป๋าหนักและกางร่มให้เพื่อนทุกคน = 大国担当',
          body_gesture: 'สองมือทำท่ายกของหนักขึ้นแตะบนสองบ่าอย่างองอาจ'
        },
        {
          id: 'hsk4_49017',
          hanzi: '求同存异',
          pinyin: 'qiútóngcúnyì',
          display_pinyin: 'qiútóngcúnyì',
          pinyin_tone: 'qiu2tong2cun2yi4',
          meaning_th: 'แสวงจุดร่วม สงวนจุดต่าง / ค้นหาผลประโยชน์ร่วมกันพร้อมเคารพในความแตกต่าง',
          meaning_en: 'seek common ground while reserving differences',
          radical: '氺',
          radical_name_th: 'หมวดน้ำ (氺字旁)',
          stroke_count: 27,
          mnemonic: 'แสวงหาสิ่งที่เหมือนและเป็นประโยชน์ร่วม (求同) พร้อมเก็บรักษาความแตกต่างเฉพาะตนไว้ (存异) = แสวงจุดร่วมสงวนจุดต่าง',
          kid_mnemonic: 'สองคนชอบสีไม่เหมือนกันแต่จับมือวาดรูปสายรุ้งด้วยกันอย่างมีความสุข = 求同存异',
          body_gesture: 'มือซ้ายและขวายื่นเข้าหากันประสานนิ้วอย่างเข้าใจ'
        },
        {
          id: 'hsk4_49018',
          hanzi: '斡旋',
          pinyin: 'wòxuán',
          display_pinyin: 'wòxuán',
          pinyin_tone: 'wo4xuan2',
          meaning_th: 'การทำหน้าที่คนกลางไกล่เกลี่ยข้อพิพาท / การประสานรอยร้าวทางการทูต',
          meaning_en: 'mediate / mediation / good offices',
          radical: '斗',
          radical_name_th: 'หมวดทัพพี/กระบวย (斗字旁)',
          stroke_count: 25,
          mnemonic: 'หมุนเวียนกระบวย (斡) หมุนวนปรับสมดุล (旋) = ประสานไกล่เกลี่ยข้อพิพาท',
          kid_mnemonic: 'คนกลางพาเพื่อนสองคนที่โกรธกันมานั่งดื่มน้ำชาปรับความเข้าใจ = 斡旋',
          body_gesture: 'สองมือวาดเป็นวงกลมสลับกันไปมาในอากาศเพื่อประสานรอยร้าว'
        },
        {
          id: 'hsk4_49019',
          hanzi: '治理',
          pinyin: 'zhìlǐ',
          display_pinyin: 'zhìlǐ',
          pinyin_tone: 'zhi4li3',
          meaning_th: 'ธรรมาภิบาล / การบริหารจัดการและกำกับดูแลระบบ (全球治理 - ธรรมาภิบาลโลก)',
          meaning_en: 'governance / administration / manage and regulate',
          radical: '氵',
          radical_name_th: 'หมวดสามจุดน้ำ (三点水)',
          stroke_count: 19,
          mnemonic: 'จัดการสายน้ำไม่ให้ท่วม (治) จัดระเบียบเส้นลายหยก (理) = การบริหารจัดการอย่างมีธรรมาภิบาล',
          kid_mnemonic: 'จัดโต๊ะเรียนและตู้หนังสือให้เป็นระเบียบเรียบร้อย = 治理',
          body_gesture: 'กางสองมือออกแล้วจัดระเบียบสิ่งของตรงหน้าให้เป็นระเบียบ'
        },
        {
          id: 'hsk4_49020',
          hanzi: '共同体',
          pinyin: 'gòngtóngtǐ',
          display_pinyin: 'gòngtóngtǐ',
          pinyin_tone: 'gong4tong2ti3',
          meaning_th: 'ประชาคม / องคาพยพหรือสังคมที่มีเป้าหมายและชะตากรรมร่วมกัน',
          meaning_en: 'community / collective entity (e.g. community with a shared future)',
          radical: '八',
          radical_name_th: 'หมวดแปด (八字部)',
          stroke_count: 20,
          mnemonic: 'มีส่วนร่วมและเท่าเทียมกัน (共同) หล่อหลอมเป็นร่างกายหนึ่งเดียว (体) = ประชาคมหนึ่งเดียว',
          kid_mnemonic: 'เด็กๆ จากทั่วโลกยืนล้อมรอบลูกโลกจับมือกันเป็นวงกลม = 共同体',
          body_gesture: 'สองแขนโอบรอบเป็นวงกลมใหญ่แนบอกแสดงความเป็นหนึ่งเดียว'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำศัพท์ประวัติศาสตร์การทูต 求同存异 (qiútóngcúnyì)',
        description_th: 'qiú (เสียง 2) tóng (เสียง 2) cún (เสียง 2) yì (เสียง 4) เสียงวรรณยุกต์ 2 ขึ้นสามพยางค์รวดแล้วจบด้วยเสียง 4 หนักแน่น',
        example: '周恩来总理提出“求同存异”方针。',
        fun_metaphor: 'เหมือนบันไดสามขั้นที่ทอดยาวขึ้นสู่ยอดเขาแล้วปักธงแห่งสันติภาพ',
        reassurance: 'คำกล่าวอันเป็นตำนานของนายกฯ โจวเอินไหล ในการประชุมบันดุงปี 1955'
      },
      grammar_bite: {
        title: 'โครงสร้างวิสัยทัศน์โลก: 秉持求同存异，推动构建人类命运共同体',
        formula: '在国际交往中，各国应当秉持[求同存异]精神，展现大国担当，积极参与全球治理',
        explanation_th: 'ใช้ในการกล่าวสุนทรพจน์ในการประชุมสหประชาชาติ (UN) หรือเวทีระดับพูหนำโลก',
        patterns: [
          {
            formula: '秉持求同存异，推动和平发展。',
            zh: '国际社会应当秉持求同存异的精神，超越分歧，共同推动世界和平与繁荣。',
            pinyin: 'Guójì shèhuì yīngdāng bǐngchí qiútóngcúnyì de jīngshén, chāoyuè fēnqí, gòngtóng tuīdòng shìjiè hépíng yǔ fánróng.',
            th: 'ประชาคมระหว่างประเทศพึงยึดมั่นในจิตวิญญาณแห่งการแสวงจุดร่วมสงวนจุดต่าง ก้าวข้ามความขัดแย้ง และร่วมกันขับเคลื่อนสันติภาพและความเจริญรุ่งเรืองของโลก',
            en: 'The international community should uphold the spirit of seeking common ground while reserving differences, transcending disagreements to jointly promote world peace and prosperity.'
          },
          {
            formula: '展现大国担当，参与全球治理。',
            zh: '中国积极参与全球治理体系变革，展现大国担当，为解决热点问题发挥建设性斡旋作用。',
            pinyin: 'Zhōngguó jījí cānyù quánqiú zhìlǐ tǐxì biàngé, zhǎnxiàn dàguó dāndāng, wèi jiějué rèdiǎn wèntí fāhuī jiànshèxìng wòxuán zuòyòng.',
            th: 'จีนมีส่วนร่วมอย่างแข็งขันในการปฏิรูประบบธรรมาภิบาลโลก แสดงความรับผิดชอบในฐานะประเทศใหญ่ และแสดงบทบาทการไกล่เกลี่ยอย่างสร้างสรรค์เพื่อแก้ไขปัญหาประเด็นร้อน',
            en: 'China actively participates in the reform of the global governance system, demonstrates major country responsibility, and plays a constructive mediating role in resolving hotspot issues.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '张教授 (Prof. Zhang) 👨‍🏫',
          zh: '各位同学好！今天我们大家在这里共同回顾现代外交历史，万隆会议上的“求同存异”对于解决国际争端有何深远意义？',
          pinyin: 'Gèwèi tóngxué hǎo! Jīntiān wǒmen dàjiā zài zhèlǐ gòngtóng huígù xiàndài wàijiāo lìshǐ, Wànlóng huìyì shang de "qiútóngcúnyì" duìyú jiějué guójì zhēngduān yǒu hé shēnyuǎn yìyì?',
          th: 'สวัสดีนักศึกษาทุกท่าน! วันนี้พวกเราทุกคนร่วมกันทบทวนประวัติศาสตร์การทูตสมัยใหม่ที่นี่ หลัก "แสวงจุดร่วมสงวนจุดต่าง" ในการประชุมบันดุงมีความหมายลึกซึ้งต่อการแก้ไขข้อพิพาทระหว่างประเทศอย่างไรครับ?',
          en: 'Hello students! Today we all review modern diplomatic history together here; what profound significance did "seeking common ground while reserving differences" at the Bandung Conference hold for resolving international disputes?',
          audio_trigger: 't4_u49_l04_d01'
        },
        {
          speaker: '王研究员 (Researcher Wang) 👨‍💼',
          zh: '它打破了意识形态对立，为不同社会制度的国家和平共处树立了光辉典范。',
          pinyin: 'Tā dǎpò le yìshíxíngtài duìlì, wèi bùtóng shèhuì zhìdù de guójiā hépíng gòngchǔ shùlì le guānghuī diǎnfàn.',
          th: 'มันช่วยทลายกำแพงความขัดแย้งทางอุดมการณ์ และสร้างแบบอย่างอันรุ่งโรจน์ให้แก่ประเทศที่มีระบอบสังคมแตกต่างกันได้อยู่ร่วมกันอย่างสันติครับ',
          en: 'It broke through ideological confrontation, setting a glorious model for peaceful coexistence among countries with different social systems.',
          audio_trigger: 't4_u49_l04_d02'
        },
        {
          speaker: '张教授 (Prof. Zhang) 👨‍🏫',
          zh: '很好。在当今复杂多变的地缘格局下，面对全球环境与经济危机，更需要大国担当与建设性斡旋，推动可持续发展。',
          pinyin: 'Hěn hǎo. Zài dāngjīn fùzá duōbiàn de dìyuán géjú xià, miànduì quánqiú huánjìng yǔ jīngjì wēijī, gèng xūyào dàguó dāndāng yǔ jiànshèxìng wòxuán, tuīdòng kěchíxù fāzhǎn.',
          th: 'ดีมาก ในสภาวการณ์ทางภูมิรัฐศาสตร์ที่ซับซ้อนและผันผวนในปัจจุบัน เมื่อต้องเผชิญกับวิกฤตสิ่งแวดล้อมและเศรษฐกิจระดับโลก ยิ่งต้องการความรับผิดชอบของมหาอำนาจและการไกล่เกลี่ยเชิงสร้างสรรค์ เพื่อขับเคลื่อนการพัฒนาที่ยั่งยืน',
          en: 'Very good. Under today\'s complex geopolitical landscape, facing global environmental and economic crises, major country responsibility and constructive mediation are even more needed to promote sustainable development.',
          audio_trigger: 't4_u49_l04_d03'
        },
        {
          speaker: '王研究员 (Researcher Wang) 👨‍💼',
          zh: '通过积极完善全球治理，各国加强沟通交流、深化科技创新合作，才能真正构建人类命运共同体。',
          pinyin: 'Tōngguò jījí wánshàn quánqiú zhìlǐ, gèguó jiāqiáng gōutōng jiāoliú, shēnhuà kējì chuàngxīn hézuò, cái néng zhēnzhèng gòujiàn rénlèi mìngyùn gòngtóngtǐ.',
          th: 'ด้วยการร่วมกันพัฒนาระบบธรรมาภิบาลโลกอย่างแข็งขัน ทุกประเทศเพิ่มพูนการสื่อสารแลกเปลี่ยนและกระชับความร่วมมือด้านนวัตกรรมเทคโนโลยี จึงจะสามารถสร้างประชาคมที่มีอนาคตร่วมกันของมวลมนุษยชาติได้อย่างแท้จริงครับ',
          en: 'By actively improving global governance, strengthening communication and exchanges, and deepening technological innovation cooperation, all nations can truly build a community with a shared future for mankind.',
          audio_trigger: 't4_u49_l04_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'สำนวน "求同存异" (qiútóngcúnyì) เสนอโดยใครในการประชุมบันดุง (Bandung Conference) ปี ค.ศ. 1955?',
          options: [
            'นายกรัฐมนตรี โจวเอินไหล (周恩来)',
            'ประธานาธิบดี เหมาเจ๋อตง (毛泽东)',
            'ขงจื๊อ (孔子)',
            'ซุนวู (孙子)'
          ],
          correct_index: 0,
          explanation_th: 'นายกฯ โจวเอินไหล เสนอหลักการ "求同存异" ในการประชุมเอเชีย-แอฟริกาที่บันดุง จนกลายเป็นเสาหลักการทูตที่โด่งดังไปทั่วโลก',
          encouragement: 'ยอดเยี่ยมมาก! มีความรู้ประวัติศาสตร์การทูตจีนที่แม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "แสวงจุดร่วมสงวนจุดต่าง ร่วมมือเพื่อชัยชนะร่วม"',
          tokens: ['互利共赢', '求同存异'],
          correct_sequence: ['求同存异', '互利共赢'],
          pinyin: 'Qiútóngcúnyì, hùlì gòngyíng.',
          meaning_th: 'แสวงจุดร่วมสงวนจุดต่าง ร่วมมือเพื่อชัยชนะร่วม',
          explanation_th: 'หลักการทูต (求同存异) + เป้าหมายผลประโยชน์ (互利共赢)',
          encouragement: 'จัดประโยควิสัยทัศน์โลกได้อย่างสง่างาม!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "同" (tóng - เหมือน/ร่วมกัน) ใน "求同存异" มีหมวดนำใดอยู่ด้านนอก?',
          options: [
            '冂 (หมวดกรอบล้อม 同字框)',
            '口 (หมวดปาก 口字旁)',
            '门 (หมวดประตู 门字旁)',
            '囗 (หมวดกรอบสี่เหลี่ยมรอบ 大口框)'
          ],
          correct_index: 0,
          explanation_th: '"同" มีกรอบด้านนอกคือหมวด "冂" (同字框 - ถงจื้อควง)',
          encouragement: 'จำหมวดอักษรจีนได้อย่างแม่นยำ!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "斡旋" (wòxuán) ในความสัมพันธ์ระหว่างประเทศหมายถึงบทบาทใด?',
          options: [
            'การทำหน้าที่เป็นคนกลางไกล่เกลี่ยข้อพิพาทและเจรจาสร้างสันติภาพระหว่างคู่ขัดแย้ง',
            'การส่งกำลังทหารเข้าร่วมสงคราม',
            'การปิดล้อมทางเศรษฐกิจ',
            'การตัดความสัมพันธ์ทางการทูต'
          ],
          correct_index: 0,
          explanation_th: '"斡旋" (Mediation / Good offices) คือบทบาทคนกลางทางการทูตที่เข้าไปช่วยเจรจาไกล่เกลี่ยเพื่อลดความตึงเครียดและสร้างสันติภาพ',
          encouragement: 'เข้าใจบทบาทการทูตเพื่อสันติภาพอย่างถ่องแท้!'
        }
      ],
      boss_challenge: {
        question: 'ในสุนทรพจน์เปิดการประชุมสมัชชาใหญ่แห่งสหประชาชาติ ประโยคใดสื่อถึงอุดมการณ์สันติภาพและธรรมาภิบาลโลกได้อย่างสมบูรณ์แบบที่สุด?',
        options: [
          '各国应当秉持求同存异精神，展现大国担当，积极参与全球治理，携手构建人类命运共同体。',
          '鉴于国际局势复杂，各国团队应当致力于协调创新，推动低碳发展。',
          '古为今用与和而不同相得益彰，仁爱修身与博大精深历久弥新。',
          '温故知新实事求是，上善若水中庸之道。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "求同存异", "大国担当", "全球治理" และ "人类命运共同体" ได้อย่างสมบูรณ์แบบ ไพเราะ และทรงเกียรติยศสูงสุด'
      },
      cheer_trophy: {
        badge_name: 'ผู้นำวิสัยทัศน์ประชาคมโลก (Global Visionary of Shared Future)',
        message_th: 'ขอแสดงความยินดีด้วยอย่างยิ่ง! คุณได้พิชิตหน่วยเรียนวาทศิลป์ทางการทูตจีนครบถ้วน ก้าวสู่จุดสูงสุดแห่งปราชญ์ภาษาและการทูตสากล!',
        xp_reward: 150
      }
    }
  ]
};
