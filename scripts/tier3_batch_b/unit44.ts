import { UnitLessonData } from '../../src/types/lesson';

export const unit44Data: UnitLessonData = {
  unit_id: 'tier3_u44',
  tier: 3,
  unit_number: 44,
  title: {
    zh: '跨文化交流与误解',
    th: 'การสื่อสารข้ามวัฒนธรรมและการเปิดใจกว้าง',
    en: 'Cross-Cultural Communication & Open-Mindedness'
  },
  description: 'เรียนรู้ทักษะการขจัดอคติทางวัฒนธรรม การแสวงจุดร่วมสงวนจุดต่าง และสำนวน 胸怀大度',
  lessons: [
    {
      lesson_id: 't3_u44_l01',
      lesson_number: 1,
      title: {
        zh: '破除刻板印象与偏见',
        th: 'การทำลายภาพจำเหมารวมและอคติทางวัฒนธรรม',
        en: 'Breaking Stereotypes & Cultural Biases'
      },
      can_do: {
        th: 'อธิบายภาพจำเหมารวม (刻板印象), อคติ (偏见), ช่องว่างความเข้าใจ (隔阂) และการโอบรับความหลากหลาย (包容)',
        en: 'Explain stereotypes, cultural biases, estrangement (Gehe), and inclusive tolerance (Baorong)'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องการมองข้ามภาพจำเหมารวมและเปิดรับมุมมองระดับสากล!',
      vocabulary: [
        {
          id: 'hsk3_4401',
          hanzi: '刻板印象',
          pinyin: 'kèbǎnyìnxiàng',
          display_pinyin: 'kèbǎnyìnxiàng',
          pinyin_tone: 'ke4ban3yin4xiang4',
          meaning_th: 'ภาพจำเหมารวม / ทัศนคติแบบเหมารวมที่ตายตัว',
          meaning_en: 'stereotype / rigid perception',
          radical: '刂',
          radical_name_th: 'หมวดมีดข้าง (立刀旁)',
          stroke_count: 28,
          mnemonic: 'แกะสลักลงบนแผ่นไม้ (刻板) กลายเป็นภาพประทับตายตัว (印象) = ภาพจำเหมารวม',
          kid_mnemonic: 'แม่พิมพ์ปั๊มตรายางที่ปั๊มออกมาเหมือนกันทุกแผ่นไม่เปลี่ยน = 刻板印象',
          body_gesture: 'สองมือทำท่ากรอบสี่เหลี่ยมแข็งทื่อค้างไว้ตรงหน้า'
        },
        {
          id: 'hsk3_4402',
          hanzi: '偏见',
          pinyin: 'piānjiàn',
          display_pinyin: 'piānjiàn',
          pinyin_tone: 'pian1jian4',
          meaning_th: 'อคติ / ความคิดเห็นที่ลำเอียงไม่เป็นธรรม',
          meaning_en: 'prejudice / bias',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 15,
          mnemonic: 'มุมมอง (见) ที่เอียงไปข้างเดียวไม่เที่ยงตรง (偏) = อคติลำเอียง',
          kid_mnemonic: 'สวมแว่นตากันแดดสีชาข้างเดียวมองสิ่งรอบตัวไม่ชัด = 偏见',
          body_gesture: 'เอียงคอเอียงตัวไปข้างหนึ่งมองด้วยสายตาลำเอียง'
        },
        {
          id: 'hsk3_4403',
          hanzi: '隔阂',
          pinyin: 'géhé',
          display_pinyin: 'géhé',
          pinyin_tone: 'ge2he2',
          meaning_th: 'ช่องว่างความเข้าใจ / กำแพงกั้นความรู้สึกระหว่างคนต่างกลุ่ม',
          meaning_en: 'estrangement / misunderstanding barrier',
          radical: '阝',
          radical_name_th: 'หมวดเนินเขา (双耳旁)',
          stroke_count: 21,
          mnemonic: 'สิ่งกีดกั้น (隔) ปิดกั้นประตูใจ (阂) = ช่องว่างทางใจ',
          kid_mnemonic: 'กำแพงอิฐกั้นกลางระหว่างเพื่อนสองคนทำให้คุยกันไม่ได้ยิน = 隔阂',
          body_gesture: 'ยกฝ่ามือสองข้างตั้งขึ้นตรงหน้าดั่งกำแพงกั้น'
        },
        {
          id: 'hsk3_4404',
          hanzi: '包容',
          pinyin: 'bāoróng',
          display_pinyin: 'bāoróng',
          pinyin_tone: 'bao1rong2',
          meaning_th: 'การโอบรับความหลากหลาย / ใจกว้างเปิดรับความต่าง',
          meaning_en: 'inclusive / tolerate and embrace diversity',
          radical: '勹',
          radical_name_th: 'หมวดห่อหุ้ม (包字头)',
          stroke_count: 15,
          mnemonic: 'โอบกอดห่อหุ้ม (包) รองรับทุกสรรพสิ่งไว้ในอ้อมแขน (容) = โอบรับอย่างใจกว้าง',
          kid_mnemonic: 'กอดเพื่อนจากทุกประเทศมาร่วมร้องเพลงด้วยกันอย่างอบอุ่น = 包容',
          body_gesture: 'อ้าแขนสองข้างออกกว้างแล้ววาดเข้าหากันดั่งโอบกอดโลกทั้งใบ'
        },
        {
          id: 'hsk3_4405',
          hanzi: '多元',
          pinyin: 'duōyuán',
          display_pinyin: 'duōyuán',
          pinyin_tone: 'duo1yuan2',
          meaning_th: 'ความหลากหลาย / พหุวัฒนธรรมที่มีหลายมิติ',
          meaning_en: 'diverse / multicultural / pluralistic',
          radical: '夕',
          radical_name_th: 'หมวดพระจันทร์ยามค่ำ (夕字旁)',
          stroke_count: 10,
          mnemonic: 'มีองค์ประกอบ (元) หลากหลายชนิด (多) = พหุวัฒนธรรมหลากหลาย',
          kid_mnemonic: 'กล่องสีไม้ที่มีหลากหลายสีสันสวยงามระบายร่วมกัน = 多元',
          body_gesture: 'ผายสองมือหมุนวนดั่งวาดสีรุ้งหลากสีสันในอากาศ'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 刻板印象 (kèbǎnyìnxiàng) 4-3-4-4 จังหวะหนักแน่น',
        description_th: 'kè (เสียง 4) -> bǎn (เสียง 3 ทอดลงลึก) -> yìn (เสียง 4 เด็ดขาด) -> xiàng (เสียง 4 ลงมั่นคง)',
        example: '打破传统的刻板印象 (dǎpò chuántǒng de kèbǎnyìnxiàng)',
        fun_metaphor: 'เหมือนเสียงเคาะไม้แข็งสี่จังหวะเน้นย้ำความชัดเจน',
        reassurance: 'คำว่า 刻板印象 เป็นคำศัพท์ยอดฮิตในข้อสอบ HSK ระดับสูงและการอภิปรายสากล'
      },
      grammar_bite: {
        title: 'โครงสร้างการทลายกำแพงอคติ: 唯有放下偏见，才能消除...',
        explanation_th: 'ใช้เน้นว่าการเปิดใจวางอคติลงคือเงื่อนไขเดียวที่จะลบล้างความเข้าใจผิดได้',
        patterns: [
          {
            formula: '放下刻板印象，以包容的心态去理解...',
            zh: '跨文化交际需要放下刻板印象，以包容开放的心态去理解不同的文明。',
            pinyin: 'Kuà wénhuà jiāojì xūyào fàngxià kèbǎnyìnxiàng, yǐ bāoróng kāifàng de xīntài qù lǐjiě bùtóng de wénmíng.',
            th: 'การสื่อสารข้ามวัฒนธรรมจำเป็นต้องละวางภาพจำเหมารวม และเข้าใจอารยธรรมที่แตกต่างด้วยจิตใจที่โอบรับและเปิดกว้าง',
            en: 'Cross-cultural communication requires dropping stereotypes and understanding different civilizations with an open and inclusive mind.'
          },
          {
            formula: '加强深入交流，消除彼此间的隔阂',
            zh: '青年人应当通过文化互访加强交流，彻底消除彼此间的误解与隔阂。',
            pinyin: 'Qīngniánrén yīngdāng tōngguò wénhuà hùfǎng jiāqiáng jiāoliú, chèdǐ xiāochú bǐcǐ jiān de wùjiě yǔ géhé.',
            th: 'เยาวชนคนรุ่นใหม่ควรเสริมสร้างการแลกเปลี่ยนผ่านการเยือนทางวัฒนธรรม เพื่อขจัดความเข้าใจผิดและช่องว่างระหว่างกันอย่างสิ้นเชิง',
            en: 'Young people should strengthen exchanges through cultural visits to thoroughly eliminate mutual misunderstandings and estrangement.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'เดวิด (นักศึกษาแลกเปลี่ยน) 👱‍♂️',
          zh: '王老师，来中国留学之前，我和几位外国朋友坐高铁旅行，总以为中国城市都是古老传统的建筑，来了之后才发现自己被刻板印象误导了。',
          pinyin: 'Wáng lǎoshī, lái Zhōngguó liúxué zhīqián, wǒ hé jǐ wèi wàiguó péngyou zuò gāotiě lǚxíng, zǒng yǐwéi Zhōngguó chéngshì dōu shì gǔlǎo chuántǒng de jiànzhù, lái le zhīhòu cái fāxiàn zìjǐ bèi kèbǎnyìnxiàng wùdǎo le.',
          th: 'อาจารย์หวังครับ ก่อนมาเรียนต่อที่จีน ผมกับเพื่อนชาวต่างชาติหลายคนนั่งรถไฟความเร็วสูงท่องเที่ยว มักคิดว่าเมืองในจีนคงมีแต่อาคารโบราณดั้งเดิม มาถึงแล้วจึงพบว่าตนเองถูกภาพจำเหมารวมชี้นำผิดไปครับ',
          en: 'Teacher Wang, before studying in China, several foreign friends and I traveled by high-speed rail, always thinking Chinese cities only had old traditional architecture; after arriving I realized I was misled by stereotypes.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ที่ปรึกษา) 👨‍🏫',
          zh: '哈哈很正常！很多偏见和隔阂都源于缺乏直接了解。乘坐高铁、体验风土人情，亲身走进一个国家才能看清真实立体的面貌。',
          pinyin: 'Hāhā hěn zhèngcháng! Hěn duō piānjiàn hé géhé dōu yuányú quēfá zhíjiē liǎojiě. Chéngzuò gāotiě, tǐyàn fēngtǔrénqíng, qīnshēn zǒujìn yí ge guójiā cái néng kànqīng zhēnshí lìtǐ de miànmào.',
          th: 'ฮ่าๆ เป็นเรื่องปกติมากครับ! อคติและช่องว่างทางความเข้าใจจำนวนมากล้วนเกิดจากการขาดการสัมผัสตรง การได้นั่งรถไฟความเร็วสูง สัมผัสวิถีชีวิตผู้คน ก้าวเข้ามาสัมผัสด้วยตนเองจึงจะมองเห็นโฉมหน้าที่แท้จริงรอบด้านครับ',
          en: 'Haha very normal! Many biases and estrangements stem from lacking firsthand knowledge. Taking high-speed rail and experiencing local customs allows one to see the multifaceted reality.'
        },
        {
          speaker: 'A',
          speaker_name: 'เดวิด (นักศึกษาแลกเปลี่ยน) 👱‍♂️',
          zh: '中国既有飞速发展的现代高科技，出门用手机扫码非常方便，又完好保留着历史文化遗产，这种多元包容的格局太让人敬佩了！',
          pinyin: 'Zhōngguó jì yǒu fēisù fāzhǎn de xiàndài gāokējì, chūmén yòng shǒujī sǎomǎ fēicháng fāngbiàn, yòu wánhǎo bǎoliú zhe lìshǐ wénhuà yíchǎn, zhè zhǒng duōyuán bāoróng de gújú tài ràng rén jìngpèi le!',
          th: 'จีนมีทั้งเทคโนโลยีขั้นสูงที่พัฒนาเร็วรวด ออกจากบ้านใช้มือถือสแกนคิวอาร์โค้ดสะดวกสบายมาก และยังอนุรักษ์มรดกวัฒนธรรมประวัติศาสตร์ไว้อย่างสมบูรณ์ ความหลากหลายและโอบรับแบบนี้น่านับถือจริงๆ ครับ!',
          en: 'China has rapidly advancing modern technology where scanning QR codes with mobile phones is so convenient, while preserving historical heritage; this inclusive pattern is admirable!'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ที่ปรึกษา) 👨‍🏫',
          zh: '海纳百川，有容乃大。学会以平视和包容的眼光看待世界，适应新的生活节奏，你将收获更加开阔的人生格局。',
          pinyin: 'Hǎi nà bǎi chuān, yǒu róng nǎi dà. Xuéhuì yǐ píngshì hé bāoróng de yǎnguāng kàndài shìjiè, shìyìng xīn de shēnghuó jiézòu, nǐ jiāng shōuhuò gèngjiā kāikuò de rénshēng gújú.',
          th: 'ทะเลเปิดรับสายน้ำร้อยสายจึงยิ่งใหญ่ไพศาล เรียนรู้ที่จะมองโลกด้วยสายตาที่เท่าเทียมและโอบรับ ปรับตัวเข้ากับจังหวะชีวิตใหม่ คุณจะได้รับวิสัยทัศน์ชีวิตที่กว้างไกลยิ่งขึ้นครับ',
          en: 'The sea admits all rivers; tolerance brings greatness. Learning to view the world with an equal, inclusive perspective and adapting to new life rhythms grants you a broader mindset.'
        },
        {
          speaker: 'A',
          speaker_name: 'เดวิด (นักศึกษาแลกเปลี่ยน) 👱‍♂️',
          zh: '今天和老师认真交流，克服了思想上的顾虑，我心里非常高兴，太谢谢您的深刻点拨，明天见！',
          pinyin: 'Jīntiān hé lǎoshī rènzhēn jiāoliú, kèfúle sīxiǎng shàng de gùlǜ, wǒ xīnlǐ fēicháng gāoxìng, tài xièxie nín de shēnkè diǎnbō, míngtiān jiàn!',
          th: 'วันนี้ได้แลกเปลี่ยนกับอาจารย์อย่างจริงจัง ก้าวข้ามความกังวลในความคิด ในใจผมดีใจมาก ขอบพระคุณสำหรับคำชี้แนะอันลึกซึ้ง พรุ่งนี้พบกันครับ!',
          en: 'Earnestly discussing with you today overcame my mental misgivings, making me very happy; thank you so much for the profound guidance, see you tomorrow!'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ที่ปรึกษา) 👨‍🏫',
          zh: '不客气，明天早上我们去国际文化中心交流，大家一起学习，再见！',
          pinyin: 'Bú kèqi, míngtiān zǎoshang wǒmen qù guójì wénhuà zhōngxīn jiāoliú, dàjiā yìqǐ xuéxí, zàijiàn!',
          th: 'ยินดีครับ พรุ่งนี้เช้าพวกเราไปแลกเปลี่ยนที่ศูนย์วัฒนธรรมนานาชาติ ทุกคนเรียนรู้ไปด้วยกัน ลาก่อนครับ!',
          en: 'You are welcome, tomorrow morning we will exchange at the international culture center and learn together, goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '刻板印象' (kèbǎnyìnxiàng) มีความหมายตรงกับข้อใด?",
          options: [
            'ภาพจำเหมารวมหรือทัศนคติที่ตายตัวที่มีต่อกลุ่มคนหรือวัฒนธรรมใดวัฒนธรรมหนึ่ง (Stereotype)',
            'การพิมพ์ภาพถ่ายลงบนแผ่นไม้',
            'การประทับตราบนเอกสารราชการ',
            'การตัดต่อวิดีโอภาพยนตร์'
          ],
          correct_index: 0,
          explanation_th: "'刻板印象' (Stereotype) คือทัศนคติแบบเหมารวมที่เกิดจากความเคยชินหรือข้อมูลจำกัด ซึ่งอาจไม่ตรงกับความเป็นจริง",
          encouragement: 'ถูกต้องยอดเยี่ยม! เข้าใจคำศัพท์เชิงสังคมศาสตร์ได้อย่างลึกซึ้ง!'
        },
        {
          type: 'flash_recall',
          question_th: "แนวทางที่ดีที่สุดในการขจัดอคติ (消除偏见) ข้ามวัฒนธรรมคือข้อใด?",
          options: [
            'การเปิดใจกว้าง สื่อสารพูดคุยอย่างจริงใจ และสัมผัสความจริงด้วยตนเอง (Open mind & firsthand dialogue)',
            'การปฏิเสธที่จะพูดคุยกับคนต่างชาติ',
            'การยึดถือว่าวัฒนธรรมของตนเองเหนือกว่าเสมอ',
            'การหลีกเลี่ยงการเดินทางไปต่างประเทศ'
          ],
          correct_index: 0,
          explanation_th: "การเปิดใจกว้าง (包容), การสื่อสารโดยตรง (直接交流) และการเคารพซึ่งกันและกัน คือกุญแจสำคัญในการขจัดอคติ",
          encouragement: 'แม่นยำมาก! มีทัศนคติการเป็นพลเมืองโลกที่ยอดเยี่ยม!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "การสื่อสารข้ามวัฒนธรรมจำเป็นต้องละวางภาพจำเหมารวม"',
          tokens: ['需要放下刻板印象', '跨文化交际'],
          correct_sequence: ['跨文化交际', '需要放下刻板印象'],
          pinyin: 'Kuà wénhuà jiāojì xūyào fàngxià kèbǎnyìnxiàng.',
          meaning_th: 'การสื่อสารข้ามวัฒนธรรมจำเป็นต้องละวางภาพจำเหมารวม',
          explanation_th: 'ประธาน (跨文化交际) + กริยาวลี (需要放下刻板印象)',
          encouragement: 'ประกอบประโยคการสื่อสารระดับสากลได้อย่างลงตัว!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '偏见' ตัว '偏' (piān - เอียง/ลำเอียง) มีหมวดนำใดอยู่ด้านซ้าย?",
          options: [
            '亻 (หมวดคนยืน 单人旁)',
            '彳 (หมวดสองก้าว 双人旁)',
            '言 (หมวดคำพูด 言字旁)',
            '心 (หมวดหัวใจ 心字底)'
          ],
          correct_index: 0,
          explanation_th: "'偏' มีหมวด '亻' (คนยืน) ด้านซ้าย สื่อถึงพฤติกรรมและการมองของมนุษย์ที่มีความโน้มเอียงลำเอียง",
          encouragement: 'แยกแยะหมวดอักษรตัวบุคคลได้อย่างแม่นยำ!'
        }
      ]
    },
    {
      lesson_id: 't3_u44_l02',
      lesson_number: 2,
      title: {
        zh: '非语言沟通与社交礼节',
        th: 'อวัจนภาษาและมารยาททางสังคมสากล',
        en: 'Nonverbal Communication & Social Etiquette'
      },
      can_do: {
        th: 'อธิบายภาษากาย (肢体语言), การสบสายตา (眼神), ระยะห่างส่วนบุคคล (社交距离) และจารีตประเพณี (礼节)',
        en: 'Explain body language, eye contact, personal space/social distance, and social etiquette'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องความแตกต่างของภาษากายและมารยาทสากลอย่างมั่นใจ!',
      vocabulary: [
        {
          id: 'hsk3_4406',
          hanzi: '肢体语言',
          pinyin: 'zhītǐyǔyán',
          display_pinyin: 'zhītǐyǔyán',
          pinyin_tone: 'zhi1ti3yu3yan2',
          meaning_th: 'ภาษากาย / อวัจนภาษาที่สื่อสารผ่านท่าทาง',
          meaning_en: 'body language / nonverbal cues',
          radical: '月',
          radical_name_th: 'หมวดเนื้อ/อวัยวะ (月字旁)',
          stroke_count: 31,
          mnemonic: 'ภาษา (语言) ที่แสดงออกทางแขนขาและร่างกาย (肢体) = ภาษากาย',
          kid_mnemonic: 'โบกมือ ยิ้ม หรือผายมือต้อนรับเพื่อนโดยไม่ต้องพูดคำใด = 肢体语言',
          body_gesture: 'กางสองมือออกพร้อมพยักหน้าและยิ้มอย่างอบอุ่น'
        },
        {
          id: 'hsk3_4407',
          hanzi: '眼神',
          pinyin: 'yǎnshén',
          display_pinyin: 'yǎnshén',
          pinyin_tone: 'yan3shen2',
          meaning_th: 'แววตา / การสบสายตาเพื่อสื่อสารอารมณ์',
          meaning_en: 'eye contact / expression in one\'s eyes',
          radical: '目',
          radical_name_th: 'หมวดดวงตา (目字旁)',
          stroke_count: 20,
          mnemonic: 'จิตวิญญาณความรู้สึก (神) ที่ฉายผ่านดวงตา (眼) = แววตา',
          kid_mnemonic: 'สบตาเพื่อนอย่างจริงใจและเป็นมิตรขณะสนทนา = 眼神',
          body_gesture: 'ชี้นิ้วชี้ไปที่ดวงตาของตนเองอย่างสุภาพ'
        },
        {
          id: 'hsk3_4408',
          hanzi: '社交距离',
          pinyin: 'shèjiāojùlí',
          display_pinyin: 'shèjiāojùlí',
          pinyin_tone: 'she4jiao1ju4li2',
          meaning_th: 'ระยะห่างส่วนบุคคลทางสังคม / ขอบเขตพื้นที่ส่วนตัว',
          meaning_en: 'social distance / personal space in communication',
          radical: '礻',
          radical_name_th: 'หมวดสิ่งศักดิ์สิทธิ์ (示字旁)',
          stroke_count: 36,
          mnemonic: 'ระยะห่าง (距离) ที่เหมาะสมในการปฏิสัมพันธ์ทางสังคม (社交) = ระยะห่างทางสังคม',
          kid_mnemonic: 'ยืนคุยกับผู้ใหญ่โดยเว้นระยะห่างหนึ่งช่วงแขนอย่างสุภาพ = 社交距离',
          body_gesture: 'ยื่นฝ่ามือขวาไปข้างหน้าระดับเอวรักษาระยะห่างที่เหมาะสม'
        },
        {
          id: 'hsk3_4409',
          hanzi: '习俗',
          pinyin: 'xísú',
          display_pinyin: 'xísú',
          pinyin_tone: 'xi2su2',
          meaning_th: 'ประเพณีและขนบธรรมเนียมพื้นบ้าน',
          meaning_en: 'custom / tradition / local convention',
          radical: '习',
          radical_name_th: 'หมวดฝึกฝน (习字头)',
          stroke_count: 12,
          mnemonic: 'ความคุ้นเคยที่ปฏิบัติซ้ำๆ (习) ในสังคมชาวบ้าน (俗) = ประเพณี',
          kid_mnemonic: 'ประเพณีไหว้พระจันทร์กินขนมเปี๊ยะแสนอร่อยร่วมกันในครอบครัว = 习俗',
          body_gesture: 'สองมือทำท่าไหว้คารวะตามแบบแผนประเพณี'
        },
        {
          id: 'hsk3_4410',
          hanzi: '礼节',
          pinyin: 'lǐjié',
          display_pinyin: 'lǐjié',
          pinyin_tone: 'li3jie2',
          meaning_th: 'มารยาทและกาลเทศะ / จารีตพิธีการ',
          meaning_en: 'etiquette / protocol / decorum',
          radical: '礻',
          radical_name_th: 'หมวดสิ่งศักดิ์สิทธิ์ (示字旁)',
          stroke_count: 16,
          mnemonic: 'ข้อกำหนดจังหวะ (节) แห่งมารยาทความเคารพ (礼) = มารยาทกาลเทศะ',
          kid_mnemonic: 'ค้อมตัวคำนับรับมอบสิ่งของด้วยสองมืออย่างนอบน้อม = 礼节',
          body_gesture: 'สองมือประสานระดับอกค้อมศีรษะลง 30 องศาอย่างสง่างาม'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 社交距离 (shèjiāojùlí) 4-1-4-2 จังหวะสากล',
        description_th: 'shè (เสียง 4) -> jiāo (เสียง 1 สูงยาว) -> jù (เสียง 4 ทิ้งน้ำหนัก) -> lí (เสียง 2 ทอดเสียงขึ้น)',
        example: '保持合适的社交距离 (bǎochí héshì de shèjiāojùlí)',
        fun_metaphor: 'เหมือนก้าวถอยหนึ่งก้าวอย่างสุภาพแล้วยิ้มให้อย่างเป็นมิตร',
        reassurance: 'คำนี้ใช้บ่อยทั้งในบริบทมารยาทระหว่างบุคคลและมาตรฐานสาธารณสุขสากล'
      },
      grammar_bite: {
        title: 'โครงสร้างการเคารพความแตกต่าง: “入乡随俗”，尊重彼此的...',
        explanation_th: 'สุภาษิตคลาสสิกที่สอนว่าเข้าเมืองตาหลิ่วให้หลิ่วตาตาม และเคารพมารยาทของท้องถิ่น',
        patterns: [
          {
            formula: '俗话说“入乡随俗”，在交往中应当尊重...',
            zh: '俗话说“入乡随俗”，与不同文化背景的朋友交往应当尊重各地的社交礼节。',
            pinyin: 'Súhuà shuō “rùxiāngsuísú”, yǔ bùtóng wénhuà bèijǐng de péngyou jiāowǎng yīngdāng zūnzhòng gèdì de shèjiāo lǐjié.',
            th: 'สุภาษิตกล่าวว่า "เข้าเมืองตาหลิ่วต้องหลิ่วตาตาม" เมื่อคบหาสมาคมกับเพื่อนต่างวัฒนธรรมควรเคารพมารยาทของแต่ละท้องถิ่น',
            en: 'As the saying goes, "when in Rome do as the Romans do"; interacting with diverse friends requires respecting local etiquettes.'
          },
          {
            formula: '恰当的肢体语言能够拉近人与人之间的距离',
            zh: '真诚的微笑与恰当的肢体语言，往往能够迅速拉近彼此心灵的距离。',
            pinyin: 'Zhēnchéng de wēixiào yǔ qiàdàng de zhītǐyǔyán, wǎngwǎng nénggòu xùnsù lājìn bǐcǐ xīnlíng de jùlí.',
            th: 'รอยยิ้มที่จริงใจและภาษากายที่เหมาะสม มักสามารถดึงระยะห่างทางใจระหว่างกันให้ใกล้ชิดขึ้นได้อย่างรวดเร็ว',
            en: 'Sincere smiles and appropriate body language can often quickly shorten the emotional distance between people.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'เดวิด (นักศึกษาแลกเปลี่ยน) 👱‍♂️',
          zh: '王老师，在西方大家习惯眼神直视对方并保持一定社交距离，而在有些文化里长时间对视是不礼貌的对吧？',
          pinyin: 'Wáng lǎoshī, zài xīfāng dàjiā xíguàn yǎnshén zhíshì duìfāng bìng bǎochí yídìng shèjiāojùlí, ér zài yǒuxiē wénhuà lǐ cháng shíjiān duìshì shì bù lǐmào de duì ba?',
          th: 'อาจารย์หวังครับ ในชาติตะวันตกทุกคนเคยชินกับการสบสายตามองตรงและรักษาระยะห่าง แต่ในบางวัฒนธรรมการจ้องตานานๆ ถือว่าไม่สุภาพใช่ไหมครับ?',
          en: 'Teacher Wang, in the West people are used to direct eye contact and keeping social distance, while in some cultures prolonged staring is impolite, right?'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ที่ปรึกษา) 👨‍🏫',
          zh: '非常准确！肢体语言和眼神交流在不同文化中有完全不同的含义，面对面沟通需要细心体会微妙之处。',
          pinyin: 'Fēicháng zhǔnquè! Zhītǐyǔyán hé yǎnshén jiāoliú zài bùtóng wénhuà zhōng yǒu wánquán bùtóng de hányì, miànduìmiàn gōutōng xūyào xìxīn tǐhuì wēimiào zhī chù.',
          th: 'แม่นยำมากครับ! ภาษากายและการสบสายตามีความหมายแตกต่างกันอย่างสิ้นเชิงในแต่ละวัฒนธรรม การสื่อสารแบบเผชิญหน้าจำเป็นต้องใส่ใจสัมผัสความละเอียดอ่อนครับ',
          en: 'Very accurate! Body language and eye contact carry entirely different meanings; communicating face to face requires sensing subtleties.'
        },
        {
          speaker: 'A',
          speaker_name: 'เดวิด (นักศึกษาแลกเปลี่ยน) 👱‍♂️',
          zh: '比如在中国，去四合院做客买礼物表达心意，双手递茶杯或者名片，大家干杯招待非常热情，这让我感受到了深厚的礼仪文化。',
          pinyin: 'Bǐrú zài Zhōngguó, qù sìhéyuàn zuòkè mǎi lǐwù biǎodá xīnyì, shuāngshǒu dì chábēi huòzhě míngpiàn, dàjiā gānbēi zhāodài fēicháng rèqíng, zhè ràng wǒ gǎnshòu dào le shēnhòu de lǐyí wénhuà.',
          th: 'เช่นในประเทศจีน ไปเยี่ยมเยือนเรือนสี่ประสานซื้อของขวัญแสดงน้ำใจ ใช้สองมือยื่นถ้วยน้ำชาหรือนามบัตร ทุกคนชนแก้วต้อนรับอย่างอบอุ่น สิ่งนี้ทำให้ผมสัมผัสถึงวัฒนธรรมมารยาทอันลึกซึ้งครับ',
          en: 'For example in China, visiting a siheyuan with gifts, handing teacups with both hands, and toasting warmly let me feel profound etiquette.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ที่ปรึกษา) 👨‍🏫',
          zh: '中国自古是“礼仪之邦”，细节体现教养。入乡随俗，互相尊重习俗与生活习惯，友谊之花才会常开不败。',
          pinyin: 'Zhōngguó zìgǔ shì “lǐyízhībāng”, xìjié tǐxiàn jiàoyǎng. Rùxiāngsuísú, hùxiāng zūnzhòng xísú yǔ shēnghuó xíguàn, yǒuyì zhī huā cái huì cháng kāi bú bài.',
          th: 'จีนแต่โบราณเป็น "ดินแดนแห่งจารีตประเพณี" รายละเอียดสะท้อนถึงการอบรมบ่มเพาะ เข้าเมืองตาหลิ่วเคารพประเพณีและวิถีการใช้ชีวิตซึ่งกันและกัน ดอกไม้แห่งมิตรภาพจึงจะเบ่งบานไม่ร่วงโรยครับ',
          en: 'China has been a land of rites since antiquity; details reflect cultivation. Adapting to local customs and habits keeps friendship blossoming.'
        },
        {
          speaker: 'A',
          speaker_name: 'เดวิด (นักศึกษาแลกเปลี่ยน) 👱‍♂️',
          zh: '今天和老师认真交流，加深了互相理解，我心里非常高兴，太谢谢您的精彩讲解，明天见！',
          pinyin: 'Jīntiān hé lǎoshī rènzhēn jiāoliú, jiāshēn le hùxiāng lǐjiě, wǒ xīnlǐ fēicháng gāoxìng, tài xièxie nín de jīngcǎi jiǎngjiě, míngtiān jiàn!',
          th: 'วันนี้ได้แลกเปลี่ยนกับอาจารย์อย่างจริงจัง เพิ่มพูนความเข้าใจซึ่งกันและกัน ในใจผมดีใจมาก ขอบพระคุณสำหรับการบรรยายที่ยอดเยี่ยม พรุ่งนี้พบกันครับ!',
          en: 'Earnestly discussing with you today deepened mutual understanding, making me very happy; thank you for the brilliant explanation, see you tomorrow!'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ที่ปรึกษา) 👨‍🏫',
          zh: '不客气，明天早上我们去外交学院听讲座，祝你学习进步，再见！',
          pinyin: 'Bú kèqi, míngtiān zǎoshang wǒmen qù wàijiāo xuéyuàn tīng jiǎngzuò, zhù nǐ xuéxí jìnbù, zàijiàn!',
          th: 'ยินดีครับ พรุ่งนี้เช้าพวกเราไปฟังบรรยายที่วิทยาลัยการทูต ขอให้คุณมีความก้าวหน้าในการเรียน ลาก่อนครับ!',
          en: 'You are welcome, tomorrow morning we will attend a lecture at the diplomacy academy; wish you progress in study, goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ในมารยาททางธุรกิจและสังคมจีน การส่งมอบสิ่งของด้วย '双手' (สองมือ) สื่อถึงความรู้สึกใด?",
          options: [
            'การแสดงความเคารพและให้เกียรติผู้รับอย่างสูง (Respect and Courtesy)',
            'เพราะสิ่งของชิ้นนั้นมีน้ำหนักมากเกินไป',
            'เพื่อป้องกันไม่ให้ผู้อื่นแย่งของไป',
            'การเร่งรีบให้ผู้รับรีบหยิบไป'
          ],
          correct_index: 0,
          explanation_th: "การยื่นหรือรับสิ่งของด้วยสองมือ (เช่น นามบัตร จอกชา ของขวัญ) เป็นมารยาทพื้นฐานที่แสดงความเคารพและนอบน้อมในสังคมจีน",
          encouragement: 'ถูกต้องยอดเยี่ยม! เข้าใจมารยาทและภาษากายของสังคมตะวันออก!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '社交距离' (shèjiāojùlí) ในการปฏิสัมพันธ์ระหว่างบุคคลหมายถึงสิ่งใด?",
          options: [
            'ระยะห่างทางกายภาพที่เหมาะสมตามมารยาททางสังคมและระดับความคุ้นเคย (Personal Space / Social Distance)',
            'ระยะทางระหว่างเมืองหลวงกับชนบท',
            'ความเร็วในการพิมพ์ข้อความแชต',
            'การเดินข้ามทางม้าลาย'
          ],
          correct_index: 0,
          explanation_th: "'社交距离' หมายถึงระยะห่างทางสรีระที่เหมาะสมที่บุคคลรักษาระหว่างพูดคุย เพื่อไม่ให้อีกฝ่ายรู้สึกอึดอัดหรือถูกรุกล้ำพื้นที่ส่วนตัว",
          encouragement: 'แม่นยำมาก! นำทฤษฎีอวัจนภาษาไปใช้ได้อย่างมืออาชีพ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "รอยยิ้มที่จริงใจมักสามารถดึงระยะห่างระหว่างผู้คนให้ใกล้ชิดขึ้น"',
          tokens: ['往往能够拉近人与人之间的距离', '真诚的微笑'],
          correct_sequence: ['真诚的微笑', '往往能够拉近人与人之间的距离'],
          pinyin: 'Zhēnchéng de wēixiào wǎngwǎng nénggòu lājìn rén yǔ rén zhī jiān de jùlí.',
          meaning_th: 'รอยยิ้มที่จริงใจมักสามารถดึงระยะห่างระหว่างผู้คนให้ใกล้ชิดขึ้นได้',
          explanation_th: 'ประธาน (真诚的微笑) + ภาคแสดงและผลลัพธ์ (往往能够拉近人与人之间的距离)',
          encouragement: 'ประกอบประโยคภาษากายสากลได้อย่างงดงาม!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '肢体' (zhītǐ - ร่างกาย/แขนขา) ตัว '肢' มีหมวดนำใดอยู่ด้านซ้าย?",
          options: [
            '月 (หมวดเนื้อ/อวัยวะร่างกาย 月字旁)',
            '木 (หมวดไม้ 木字旁)',
            '扌 (หมวดมือ 提手旁)',
            '足 (หมวดเท้า 足字旁)'
          ],
          correct_index: 0,
          explanation_th: "'肢' มีหมวด '月' (เนื้อ/อวัยวะมนุษย์) ด้านซ้าย สื่อถึงแขนและขาของร่างกาย",
          encouragement: 'แม่นยำเรื่องอักษรหมวดอวัยวะและสรีระ!'
        }
      ]
    },
    {
      lesson_id: 't3_u44_l03',
      lesson_number: 3,
      title: {
        zh: '求同存异与胸怀大度',
        th: 'แสวงจุดร่วมสงวนจุดต่างและใจกว้างดุจมหาสมุทร (胸怀大度)',
        en: 'Seeking Common Ground & Magnanimity (Xiōnghuáidàdù)'
      },
      can_do: {
        th: 'อธิบายปรัชญาการทูต 求同存异 (แสวงจุดร่วมสงวนจุดต่าง), 和而不同 (กลมกลืนแต่คงเอกลักษณ์) และสำนวน 胸怀大度 (ใจกว้างดั่งมหาสมุทร)',
        en: 'Explain seeking common ground while reserving differences, harmony in diversity, and Xiōnghuáidàdù (magnanimous open-heartedness)'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องปรัชญาการอยู่ร่วมกันท่ามกลางความแตกต่าง และสุภาษิต 胸怀大度!',
      vocabulary: [
        {
          id: 'hsk3_4411',
          hanzi: '求同存异',
          pinyin: 'qiútóngcúnyì',
          display_pinyin: 'qiútóngcúnyì',
          pinyin_tone: 'qiu2tong2cun2yi4',
          meaning_th: 'แสวงจุดร่วม สงวนจุดต่าง / หาเป้าหมายร่วมกันโดยคงไว้ซึ่งความแตกต่าง',
          meaning_en: 'seek common ground while reserving differences',
          radical: '水',
          radical_name_th: 'หมวดน้ำ (水字旁)',
          stroke_count: 27,
          mnemonic: 'แสวงหาจุดเหมือน (求同) คงรักษาจุดต่าง (存异) = แสวงจุดร่วมสงวนจุดต่าง',
          kid_mnemonic: 'เพื่อนสองคนชอบกีฬาต่างกันแต่มาร่วมมือกันจัดงานเลี้ยงโรงเรียน = 求同存异',
          body_gesture: 'สองมือทำท่ากางออกแล้วประกบเข้าหากันตรงกลาง'
        },
        {
          id: 'hsk3_4412',
          hanzi: '和而不同',
          pinyin: 'hé’érbùtóng',
          display_pinyin: 'hé’érbùtóng',
          pinyin_tone: 'he2\'er2bu4tong2',
          meaning_th: 'กลมกลืนสมานฉันท์โดยไม่จำเป็นต้องเหมือนกัน / ความหลากหลายที่ลงตัว',
          meaning_en: 'harmony without uniformity / unity in diversity',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 25,
          mnemonic: 'กลมกลืนปรองดอง (和) แต่รักษาเอกลักษณ์เฉพาะตน (不同) = กลมกลืนแต่ไม่ซ้ำแบบ',
          kid_mnemonic: 'เครื่องดนตรีหลายชนิดเล่นพร้อมกันเป็นวงออร์เคสตราอันไพเราะ = 和而不同',
          body_gesture: 'กางสองมือทำท่ากำกับวงดนตรีประสานเสียงอย่างกลมกลืน'
        },
        {
          id: 'hsk3_4413',
          hanzi: '胸怀大度',
          pinyin: 'xiōnghuáidàdù',
          display_pinyin: 'xiōnghuáidàdù',
          pinyin_tone: 'xiong1huai2da4du4',
          meaning_th: 'จิตใจกว้างขวางโอบอ้อมอารี / มีใจกว้างดุจมหาสมุทรไมตรี',
          meaning_en: 'magnanimous / broad-minded / open-hearted',
          radical: '月',
          radical_name_th: 'หมวดเนื้อ/อวัยวะ (月字旁)',
          stroke_count: 36,
          mnemonic: 'หัวอกหัวใจ (胸怀) เปี่ยมด้วยขอบเขตความกว้างใหญ่ (大度) = ใจกว้างดั่งมหาสมุทร',
          kid_mnemonic: 'กัปตันเรือยืนกางสองแขนรับลมทะเลด้วยรอยยิ้มเมตตา = 胸怀大度',
          body_gesture: 'สองมือแตะที่หน้าอกแล้วผายออกไปข้างหน้าอย่างสง่างามเต็มที่'
        },
        {
          id: 'hsk3_4414',
          hanzi: '视野',
          pinyin: 'shìyě',
          display_pinyin: 'shìyě',
          pinyin_tone: 'shi4ye3',
          meaning_th: 'วิสัยทัศน์ / มุมมองและขอบเขตสายตาทางปัญญา',
          meaning_en: 'field of vision / horizon / global perspective',
          radical: '目',
          radical_name_th: 'หมวดตา (目字旁)',
          stroke_count: 16,
          mnemonic: 'สายตาที่มองเห็น (视) กว้างไกลทั่วท้องทุ่ง (野) = ขอบเขตสายตาและวิสัยทัศน์',
          kid_mnemonic: 'ยืนบนยอดเขาชมวิวทิวทัศน์ 360 องศาเห็นเมืองและขอบฟ้าไกล = 视野',
          body_gesture: 'เอามือป้องคิ้วมองกวาดสายตาจากซ้ายไปขวาระยะไกล'
        },
        {
          id: 'hsk3_4415',
          hanzi: '格局',
          pinyin: 'gújú',
          display_pinyin: 'gújú',
          pinyin_tone: 'ge2ju2',
          meaning_th: 'มิติความคิดและทัศนคติ / รูปแบบความยิ่งใหญ่ของจิตใจ',
          meaning_en: 'pattern / grand vision / breadth of mind',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 17,
          mnemonic: 'กรอบรูปแบบ (格) บนกระดานหมากรุก (局) = มิติความคิดอันกว้างใหญ่',
          kid_mnemonic: 'นักเดินหมากรุกมองกระดานเกมทั้งกระดานก่อนตัดสินใจเดิน = 格局',
          body_gesture: 'กางสองมือออกระดับอกทำท่ากำหนดกรอบภาพกว้างอย่างสุขุม'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 胸怀大度 (xiōnghuáidàdù) 1-2-4-4 จังหวะสง่างาม',
        description_th: 'xiōng (เสียง 1 สูงลอย) -> huái (เสียง 2 ทอดเสียงขึ้น) -> dà (เสียง 4 ลงหนัก) -> dù (เสียง 4 แน่นมั่นคง)',
        example: '为人处世胸怀大度 (wéirénchǔshì xiōnghuáidàdù)',
        fun_metaphor: 'เหมือนสูดลมหายใจเต็มปอดแล้วเปิดอกกว้างรับสายลมทะเล',
        reassurance: 'คำว่า 胸怀大度 เป็นคุณธรรมชั้นสูงของวิญญูชนจีนโบราณ'
      },
      grammar_bite: {
        title: 'โครงสร้างปรัชญาการอยู่ร่วมกัน: 秉持求同存异，做到和而不同',
        explanation_th: 'ใช้ชี้แนะแนวทางการดำเนินความสัมพันธ์ทางการทูตและสังคมอย่างสร้างสรรค์',
        patterns: [
          {
            formula: '秉持求同存异的原则，共同推进...',
            zh: '国际合作应当秉持求同存异的原则，共同推进全球经济与文明的发展。',
            pinyin: 'Guójì hézuò yīngdāng bǐngchí qiútóngcúnyì de yuánzé, gòngtóng tuījìn quánqiú jīngjì yǔ wénmíng de fāzhǎn.',
            th: 'ความร่วมมือระหว่างประเทศควรยึดมั่นในหลักการแสวงจุดร่วมสงวนจุดต่าง ร่วมกันขับเคลื่อนการพัฒนาเศรษฐกิจและอารยธรรมโลก',
            en: 'International cooperation should uphold seeking common ground while reserving differences, advancing global economy and civilization.'
          },
          {
            formula: '君子和而不同，胸怀大度才能成大事',
            zh: '古人常说“君子和而不同”，胸怀大度的人才能成就一番大事业。',
            pinyin: 'Gǔrén cháng shuō “jūnzǐ hé’érbùtóng”, xiōnghuáidàdù de rén cái néng chéngjiù yì fān dà shìyè.',
            th: 'คนโบราณมักกล่าวว่า "วิญญูชนกลมกลืนแต่คงเอกลักษณ์" ผู้ที่มีใจกว้างดุจมหาสมุทรจึงจะสามารถสร้างสรรค์กิจการอันยิ่งใหญ่ได้',
            en: 'Ancients often said "the gentleman aims at harmony, not at uniformity"; only magnanimous people can accomplish great undertakings.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'เดวิด (นักศึกษาแลกเปลี่ยน) 👱‍♂️',
          zh: '王老师，世界各国在历史、文化和制度上存在巨大差异，我们怎样才能实现和平共处呢？',
          pinyin: 'Wáng lǎoshī, shìjiè gè guó zài lìshǐ, wénhuà hé zhìdù shàng cúnzài jùdà chāyì, wǒmen zěnyàng cái néng shíxiàn hépíng gòngchǔ ne?',
          th: 'อาจารย์หวังครับ นานาประเทศทั่วโลกมีความแตกต่างอย่างมหาศาลทางประวัติศาสตร์ วัฒนธรรม และระบอบ พวกเราจะบรรลุการอยู่ร่วมกันอย่างสันติได้อย่างไรครับ?',
          en: 'Teacher Wang, nations worldwide have huge differences in history, culture, and systems; how can we achieve peaceful coexistence?'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ที่ปรึกษา) 👨‍🏫',
          zh: '中国先贤给出的智慧是“和而不同”与“求同存异”。差异不应成为冲突的借口，而应成为互鉴的源泉。',
          pinyin: 'Zhōngguó xiānxián gěi chū de zhìhuì shì “hé’érbùtóng” yǔ “qiútóngcúnyì”. Chāyì bù yīng chéngwéi chōngtū de jièkǒu, ér yīng chéngwéi hùjiàn de yuánquán.',
          th: 'ปราชญ์โบราณของจีนมอบปัญญาไว้ว่า "กลมกลืนแต่คงเอกลักษณ์" และ "แสวงจุดร่วมสงวนจุดต่าง" ความแตกต่างไม่ควรเป็นข้ออ้างของความขัดแย้ง แต่ควรเป็นบ่อเกิดแห่งการเรียนรู้ซึ่งกันและกันครับ',
          en: 'The wisdom of ancient Chinese sages is "harmony in diversity" and "seeking common ground." Differences should not fuel conflict, but inspire mutual learning.'
        },
        {
          speaker: 'A',
          speaker_name: 'เดวิด (นักศึกษาแลกเปลี่ยน) 👱‍♂️',
          zh: '这需要各国领导人和普通民众都拥有胸怀大度的格局与开阔的国际视野。',
          pinyin: 'Zhè xūyào gè guó lǐngdǎorén hé pǔtōng mínzhòng dōu yōngyǒu xiōnghuáidàdù de gújú yǔ kāikuò de guójì shìyě.',
          th: 'สิ่งนี้ต้องอาศัยทั้งผู้นำประเทศและประชาชนทั่วไปที่มีมิติจิตใจกว้างขวางดุจมหาสมุทร และวิสัยทัศน์สากลที่เปิดกว้างครับ',
          en: 'This requires both world leaders and ordinary people to possess a magnanimous mindset and broad international horizons.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ที่ปรึกษา) 👨‍🏫',
          zh: '没错。文明因交流而多彩，文明因互鉴而丰富。在会议室里讨论合作，求同存异，达成共识，世界才能走向互利共赢与持久和平。',
          pinyin: 'Méi cuò. Wénmíng yīn jiāoliú ér duōcǎi, wénmíng yīn hùjiàn ér fēngfù. Zài huìyìshì lǐ tǎolùn hézuò, qiútóngcúnyì, dáchéng gòngshí, shìjiè cái néng zǒuxiàng hùlì gòngyíng yǔ chǐjiǔ hépíng.',
          th: 'ถูกต้องครับ อารยธรรมงดงามหลากสีเพราะการแลกเปลี่ยน อารยธรรมสมบูรณ์พร้อมเพราะการเรียนรู้ซึ่งกันและกัน อภิปรายความร่วมมือในห้องประชุม แสวงจุดร่วมสงวนจุดต่าง บรรลุฉันทามติ โลกจึงจะมุ่งสู่วิน-วินร่วมกันและสันติภาพอันยั่งยืนครับ',
          en: 'Exactly. Civilizations flourish through exchange and mutual learning. Discussing cooperation in meeting rooms, seeking common ground, and reaching consensus leads the world to mutual win-win.'
        },
        {
          speaker: 'A',
          speaker_name: 'เดวิด (นักศึกษาแลกเปลี่ยน) 👱‍♂️',
          zh: '今天和老师认真讨论，脚踏实地顾全大局，我心里非常高兴，太谢谢您的精彩指点，明天见！',
          pinyin: 'Jīntiān hé lǎoshī rènzhēn tǎolùn, jiǎotàshídì gùquándàjú, wǒ xīnlǐ fēicháng gāoxìng, tài xièxie nín de jīngcǎi zhǐdiǎn, míngtiān jiàn!',
          th: 'วันนี้ได้หารือกับอาจารย์อย่างจริงจัง มีความมุ่งมั่นติดดินและคำนึงถึงส่วนรวม ในใจผมดีใจมาก ขอบพระคุณสำหรับคำชี้แนะที่ยอดเยี่ยม พรุ่งนี้พบกันครับ!',
          en: 'Earnestly discussing with you today, being down-to-earth and mindful of the big picture makes me very happy; thank you for the guidance, see you tomorrow!'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ที่ปรึกษา) 👨‍🏫',
          zh: '不客气，明天早上我们去模拟联合国峰会见，大家一起努力，再见！',
          pinyin: 'Bú kèqi, míngtiān zǎoshang wǒmen qù mónǐ Liánhéguó fēnghuì jiàn, dàjiā yìqǐ nǔlì, zàijiàn!',
          th: 'ยินดีครับ พรุ่งนี้เช้าพวกเราพบกันที่การประชุมจำลองสหประชาชาติ ทุกคนพยายามไปด้วยกัน ลาก่อนครับ!',
          en: 'You are welcome, see you tomorrow morning at the Model UN summit; let us strive together, goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "สำนวน '胸怀大度' (xiōnghuáidàdù) มีความหมายตรงกับข้อใด?",
          options: [
            'จิตใจกว้างขวางโอบอ้อมอารี เปิดรับความคิดเห็นที่แตกต่างดั่งมหาสมุทร (Magnanimous / Broad-minded)',
            'การใส่เสื้อผ้าขนาดใหญ่เกินตัว',
            'การเดินทางข้ามมหาสมุทรแปซิฟิก',
            'การมีเสียงหัวเราะดังลั่นห้อง'
          ],
          correct_index: 0,
          explanation_th: "'胸怀大度' สื่อถึงบุคคลที่มีจิตใจโอบอ้อมอารี ใจกว้าง เปิดรับและให้อภัย ไม่คิดเล็กคิดน้อย",
          encouragement: 'ถูกต้องยอดเยี่ยม! เข้าใจคุณธรรมชั้นสูงแห่งมิตรภาพสากล!'
        },
        {
          type: 'flash_recall',
          question_th: "หลักการทางการทูต '求同存异' (qiútóngcúnyì) เน้นย้ำแนวคิดใด?",
          options: [
            'การร่วมมือกันในเป้าหมายร่วม ขณะเดียวกันก็เคารพและยอมรับในความแตกต่าง (Seeking common ground while preserving differences)',
            'การบังคับให้ทุกคนต้องคิดเหมือนกัน 100%',
            'การยกเลิกความสัมพันธ์ทางการทูตเมื่อมีความคิดต่างกัน',
            'การแข่งขันกันสร้างอาวุธ'
          ],
          correct_index: 0,
          explanation_th: "'求同存异' คือหลักการสำคัญของการอยู่ร่วมกันอย่างสันติ โดยมุ่งเน้นจุดร่วมที่เป็นประโยชน์ และให้เกียรติจุดต่างทางวัฒนธรรม",
          encouragement: 'แม่นยำมาก! เข้าใจหลักการความสัมพันธ์ระหว่างประเทศชั้นนำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "วิญญูชนกลมกลืนแต่คงเอกลักษณ์ ผู้ใจกว้างจึงจะสำเร็จการใหญ่"',
          tokens: ['胸怀大度才能成大事', '君子和而不同'],
          correct_sequence: ['君子和而不同', '胸怀大度才能成大事'],
          pinyin: 'Jūnzǐ hé’érbùtóng, xiōnghuáidàdù cái néng chéng dàshì.',
          meaning_th: 'วิญญูชนกลมกลืนแต่คงเอกลักษณ์ ใจกว้างจึงจะสำเร็จการใหญ่ได้',
          explanation_th: 'สุภาษิตขงจื๊อ (君子和而不同) + คติธรรมสอนใจ (胸怀大度才能成大事)',
          encouragement: 'ประกอบประโยคปรัชญาตะวันออกได้อย่างงดงามหมดจด!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '胸怀' ตัว '胸' (xiōng - หน้าอก) มีหมวดนำใดอยู่ด้านซ้าย?",
          options: [
            '月 (หมวดเนื้อ/อวัยวะ 月字旁)',
            '心 (หมวดหัวใจ 心字底)',
            '口 (หมวดปาก 口字旁)',
            '手 (หมวดมือ 提手旁)'
          ],
          correct_index: 0,
          explanation_th: "'胸' มีหมวด '月' (เนื้อ/อวัยวะ) ด้านซ้าย สื่อถึงแผงอกและทรวงอกของมนุษย์",
          encouragement: 'เข้าใจลึกซึ้งถึงอักษรหมวดอวัยวะกายวิภาค!'
        }
      ]
    },
    {
      lesson_id: 't3_u44_l04',
      lesson_number: 4,
      title: {
        zh: '文明互鉴与文化使者',
        th: 'การเรียนรู้ซึ่งกันและกันและทูตวัฒนธรรมโลก',
        en: 'Mutual Learning Among Civilizations & Cultural Ambassadors'
      },
      can_do: {
        th: 'อธิบายบทบาทการเป็นสะพานเชื่อมทางวัฒนธรรม (文化桥梁), การแลกเปลี่ยนเรียนรู้ (互鉴) และการหลอมรวมทางอารยธรรม (融合)',
        en: 'Explain cultural bridges, mutual learning among civilizations, and harmonious fusion'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องบทบาททูตวัฒนธรรมสากล และพิชิต Boss Challenge นักการทูตวัฒนธรรมโลก!',
      vocabulary: [
        {
          id: 'hsk3_4416',
          hanzi: '使者',
          pinyin: 'shǐzhě',
          display_pinyin: 'shǐzhě',
          pinyin_tone: 'shi3zhe3',
          meaning_th: 'ทูต / ตัวแทนผู้ส่งสารเชื่อมสัมพันธ์ไมตรี',
          meaning_en: 'envoy / ambassador / messenger of peace',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 16,
          mnemonic: 'บุคคล (者) ที่ได้รับมอบหมายภารกิจ (使) = ทูตผู้ส่งสาร',
          kid_mnemonic: 'นกพิราบขาวคาบกิ่งมะกอกบินไปมอบมิตรภาพแด่ผู้คน = 使者',
          body_gesture: 'กางสองมือออกระดับอกเสมือนปีกนกพิราบแห่งสันติภาพ'
        },
        {
          id: 'hsk3_4417',
          hanzi: '桥梁',
          pinyin: 'qiáoliáng',
          display_pinyin: 'qiáoliáng',
          pinyin_tone: 'qiao2liang2',
          meaning_th: 'สะพานเชื่อม / สะพานเชื่อมความสัมพันธ์ข้ามพรมแดน',
          meaning_en: 'bridge / link / connecting medium',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 21,
          mnemonic: 'ท่อนไม้พาดข้ามสายน้ำ (桥梁) = สะพานเชื่อมสัมพันธ์',
          kid_mnemonic: 'สะพานสายรุ้งทอดข้ามแม่น้ำเชื่อมเมืองสองฝั่งเข้าด้วยกัน = 桥梁',
          body_gesture: 'ทำแขนสองข้างโค้งขึ้นมาประกบปลายนิ้วประสานกันเป็นทรงสะพาน'
        },
        {
          id: 'hsk3_4418',
          hanzi: '互鉴',
          pinyin: 'hùjiàn',
          display_pinyin: 'hùjiàn',
          pinyin_tone: 'hu4jian4',
          meaning_th: 'การเรียนรู้ซึ่งกันและกัน / ใช้ผู้อื่นเป็นกระจกส่องพัฒนาตนเอง',
          meaning_en: 'mutual learning / benchmarking each other',
          radical: '金',
          radical_name_th: 'หมวดโลหะ (金字旁)',
          stroke_count: 17,
          mnemonic: 'ส่องกระจกทองเหลือง (鉴) สะท้อนซึ่งกันและกัน (互) = การเรียนรู้ร่วมกัน',
          kid_mnemonic: 'เด็กสองคนส่องกระจกดูและแลกเปลี่ยนหนังสือเรียนกัน = 互鉴',
          body_gesture: 'ยกฝ่ามือสองข้างหงายขึ้นสลับกันไปมาดั่งการแลกเปลี่ยนปัญญา'
        },
        {
          id: 'hsk3_4419',
          hanzi: '融合',
          pinyin: 'rónghé',
          display_pinyin: 'rónghé',
          pinyin_tone: 'rong2he2',
          meaning_th: 'การหลอมรวมเข้าด้วยกันอย่างกลมกลืน / บูรณาการเป็นหนึ่งเดียว',
          meaning_en: 'fuse / integrate / blend together harmoniously',
          radical: '氵',
          radical_name_th: 'หมวดน้ำ (三点水)',
          stroke_count: 18,
          mnemonic: 'น้ำละลายหลอมเหลว (融) เข้าเป็นเนื้อเดียวกัน (合) = หลอมรวมกลมกลืน',
          kid_mnemonic: 'เทน้ำผลไม้สองสีลงในเหยือกเดียวกันเกิดเป็นรสชาติใหม่อร่อยเลิศ = 融合',
          body_gesture: 'สอดนิ้วมือสองข้างประสานเข้าหากันแน่นอย่างแนบเนียน'
        },
        {
          id: 'hsk3_4420',
          hanzi: '瑰宝',
          pinyin: 'guībǎo',
          display_pinyin: 'guībǎo',
          pinyin_tone: 'gui1bao3',
          meaning_th: 'สมบัติล้ำค่าอันหาที่เปรียบมิได้ / รัตนชาติแห่งอารยธรรม',
          meaning_en: 'rare treasure / gem of civilization',
          radical: '王',
          radical_name_th: 'หมวดหยก (王字旁)',
          stroke_count: 22,
          mnemonic: 'หยกวิเศษงดงาม (瑰) ที่เป็นสมบัติล้ำค่า (宝) = รัตนชาติล้ำค่า',
          kid_mnemonic: 'หีบสมบัติโบราณที่ส่องประกายแสงระยิบระยับ = 瑰宝',
          body_gesture: 'สองมือทำท่าประคองแก้วสารพัดนึกชูขึ้นระดับสายตา'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 瑰宝 (guībǎo) เสียง 1 ต่อด้วยเสียง 3',
        description_th: 'guī (เสียง 1 สูงใส) ตามด้วย bǎo (เสียง 3 ทอดลึกและหนักแน่น)',
        example: '人类文明的瑰宝 (rénlèi wénmíng de guībǎo)',
        fun_metaphor: 'เหมือนแสงหยกประกายวาววับสะท้อนผิวน้ำนิ่งสงบ',
        reassurance: 'คำว่า 瑰宝 เป็นคำนามเกียรติยศที่ใช้ยกย่องศิลปวัฒนธรรมชั้นยอดของโลก'
      },
      grammar_bite: {
        title: 'โครงสร้างพันธกิจทูตวัฒนธรรม: 争当文化使者，搭建友谊桥梁',
        explanation_th: 'ใช้แสดงความมุ่งมั่นในการเป็นสะพานเชื่อมมิตรภาพระหว่างผู้คนต่างเชื้อชาติ',
        patterns: [
          {
            formula: '争当文化交流的使者，架起中外友谊的桥梁',
            zh: '留学生应当争当文化交流的使者，在各国人民之间架起坚固的友谊桥梁。',
            pinyin: 'Liúxuéshēng yīngdāng zhēng dāng wénhuà jiāoliú de shǐzhě, zài gè guó rénmín zhī jiān jià qǐ jiāngù de yǒuyì qiáoliáng.',
            th: 'นักศึกษาต่างชาติควรแข่งขันกันเป็นทูตแห่งการแลกเปลี่ยนวัฒนธรรม ทอดสะพานมิตรภาพอันมั่นคงระหว่างประชาชนของนานาประเทศ',
            en: 'International students should strive to be cultural ambassadors, building solid bridges of friendship among world peoples.'
          },
          {
            formula: '推动不同文明在交流互鉴中融合发展',
            zh: '通过互访与对话，推动世界不同文明在交流互鉴中实现融合共赢。',
            pinyin: 'Tōngguò hùfǎng yǔ duìhuà, tuīdòng shìjiè bùtóng wénmíng zài jiāoliú hùjiàn zhōng shíxiàn rónghé gòngyíng.',
            th: 'ขับเคลื่อนให้อารยธรรมที่แตกต่างของโลกบรรลุการหลอมรวมและชัยชนะร่วมกันผ่านการแลกเปลี่ยนและเรียนรู้ซึ่งกันและกัน',
            en: 'Promoting different world civilizations to achieve integration and mutual benefit through exchange and mutual learning.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'เดวิด (นักศึกษาแลกเปลี่ยน) 👱‍♂️',
          zh: '王老师，在中国的学习生活让我深深爱上了东方文化，我希望毕业后能成为一名真正的文化使者。',
          pinyin: 'Wáng lǎoshī, zài Zhōngguó de xuéxí shēnghuó ràng wǒ shēnshēn ài shàng le dōngfāng wénhuà, wǒ xīwàng bìyè hòu néng chéngwéi yì míng zhēnzhèng de wénhuà shǐzhě.',
          th: 'อาจารย์หวังครับ การเรียนและการใช้ชีวิตในจีนทำให้ผมตกหลุมรักวัฒนธรรมตะวันออกอย่างลึกซึ้ง ผมหวังว่าเมื่อสำเร็จการศึกษาจะสามารถเป็นทูตวัฒนธรรมที่แท้จริงได้ครับ',
          en: 'Teacher Wang, studying and living in China made me fall in love with oriental culture; I hope to become a true cultural envoy after graduation.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ที่ปรึกษา) 👨‍🏫',
          zh: '太令人欣慰了！语言是沟通的钥匙，文化是心灵的桥梁。希望你把真实的中国故事带回你的祖国。',
          pinyin: 'Tài lìngrén xīnwèi le! Yǔyán shì gōutōng de yàoshi, wénhuà shì xīnlíng de qiáoliáng. Xīwàng nǐ bǎ zhēnshí de Zhōngguó gùshi dài huí nǐ de zǔguó.',
          th: 'น่ายินดีเป็นที่สุดครับ! ภาษาคือกุญแจแห่งการสื่อสาร วัฒนธรรมคือสะพานเชื่อมใจ หวังว่าคุณจะนำเรื่องราวที่แท้จริงของประเทศจีนกลับไปบอกเล่าที่บ้านเกิดของคุณครับ',
          en: 'So gratifying! Language is the key to communication, culture is the bridge to minds. Hope you take true China stories back to your homeland.'
        },
        {
          speaker: 'A',
          speaker_name: 'เดวิด (นักศึกษาแลกเปลี่ยน) 👱‍♂️',
          zh: '我一定会积极搭建友谊桥梁，促进两国青年在文化融合中共同成长。祝愿大家身体健康，生活幸福！',
          pinyin: 'Wǒ yídìng huì jījí dājiàn yǒuyì qiáoliáng, cùjìn liǎng guó qīngnián zài wénhuà rónghé zhōng gòngtóng chéngzhǎng. Zhùyuàn dàjiā shēntǐ jiànkāng, shēnghuó xìngfú!',
          th: 'ผมจะสร้างสะพานแห่งมิตรภาพอย่างกระตือรือร้นแน่นอน ส่งเสริมให้เยาวชนสองประเทศเติบโตไปด้วยกันในการหลอมรวมทางวัฒนธรรม ขออวยพรให้ทุกคนมีสุขภาพร่างกายแข็งแรงและชีวิตมีความสุขครับ!',
          en: 'I will definitely actively build bridges of friendship. Wish everyone good health and happy life!'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ที่ปรึกษา) 👨‍🏫',
          zh: '人类创造的每一种优秀文明都是全人类共同的瑰宝，胸怀大度、携手同行，世界未来定会更加美好！',
          pinyin: 'Rénlèi chuàngzào de měi yì zhǒng yōuxiù wénmíng dōu shì quán rénlèi gòngtóng de guībǎo, xiōnghuáidàdù, xiéshǒu tóngxíng, shìjiè wèilái dìng huì gèngjiā měihǎo!',
          th: 'อารยธรรมอันยอดเยี่ยมทุกแขนงที่มนุษยชาติสร้างสรรค์ล้วนเป็นสมบัติล้ำค่าร่วมกันของมนุษย์ทุกคน ใจกว้างดุจมหาสมุทร จับมือเดินไปด้วยกัน อนาคตของโลกย่อมงดงามยิ่งขึ้นครับ!',
          en: 'Every fine civilization created by humankind is a shared treasure; with magnanimity and walking hand in hand, the world\'s future will surely be brighter!'
        },
        {
          speaker: 'A',
          speaker_name: 'เดวิด (นักศึกษาแลกเปลี่ยน) 👱‍♂️',
          zh: '今天和老师认真交流，收获了真挚的友谊，我心里非常高兴，太谢谢您的深情勉励，明天见！',
          pinyin: 'Jīntiān hé lǎoshī rènzhēn jiāoliú, shōuhuòle zhēnzhì de yǒuyì, wǒ xīnlǐ fēicháng gāoxìng, tài xièxie nín de shēnqíng miǎnlì, míngtiān jiàn!',
          th: 'วันนี้ได้แลกเปลี่ยนกับอาจารย์อย่างจริงจัง เก็บเกี่ยวมิตรภาพอันจริงใจ ในใจผมดีใจมาก ขอบพระคุณสำหรับกำลังใจอันอบอุ่น พรุ่งนี้พบกันครับ!',
          en: 'Discussing with you today reaped sincere friendship, making me very happy; thank you so much for the warm encouragement, see you tomorrow!'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ที่ปรึกษา) 👨‍🏫',
          zh: '不客气，愿你顺利毕业，前程似锦，明天早上国际论坛见，再见！',
          pinyin: 'Bú kèqi, yuàn nǐ shùnlì bìyè, qiánchéngsìjǐn, míngtiān zǎoshang guójì lùntán jiàn, zàijiàn!',
          th: 'ยินดีครับ ขอให้คุณสำเร็จการศึกษาอย่างราบรื่น อนาคตรุ่งโรจน์ดุจแพรไหม พรุ่งนี้เช้าพบกันที่การประชุมนานาชาติ ลาก่อนครับ!',
          en: 'You are welcome, wish you smooth graduation and bright future; see you tomorrow morning at the international forum, goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "วลี '架起文化交流的桥梁' (jià qǐ wénhuà jiāoliú de qiáoliáng) หมายถึงการกระทำใด?",
          options: [
            'การทำหน้าที่เป็นสะพานเชื่อมสัมพันธ์และส่งเสริมการเข้าใจอันดีระหว่างสองวัฒนธรรม (Building cultural bridges)',
            'การก่อสร้างสะพานข้ามแม่น้ำด้วยคอนกรีต',
            'การเขียนหนังสือประวัติศาสตร์สะพานโบราณ',
            'การเปิดร้านค้าขายของที่ระลึกริมแม่น้ำ'
          ],
          correct_index: 0,
          explanation_th: "วลีนี้เป็นอุปมาเปรียบเทียบหมายถึงการเชื่อมโยงความผูกพันและสร้างความเข้าใจที่ราบรื่นระหว่างกลุ่มคนต่างวัฒนธรรม",
          encouragement: 'ถูกต้องยอดเยี่ยม! เข้าใจสำนวนอุปมาการทูตวัฒนธรรมสากล!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '瑰宝' (guībǎo) ในบริบท '人类文明的瑰宝' มีความหมายตรงกับข้อใด?",
          options: [
            'มรดกและสมบัติล้ำค่าทางอารยธรรมของมนุษยชาติที่ไม่อาจประเมินค่าได้ (Rare Treasure of Civilization)',
            'ก้อนหินริมชายหาด',
            'เครื่องประดับราคาถูก',
            'กล่องใส่ของทำจากพลาสติก'
          ],
          correct_index: 0,
          explanation_th: "'瑰宝' คือรัตนชาติล้ำค่าที่เปล่งประกาย นิยมใช้ยกย่องผลงานชิ้นเอกทางศิลปะ วัฒนธรรม และอารยธรรมของโลก",
          encouragement: 'แม่นยำมาก! นำศัพท์ชั้นสูงทางวัฒนธรรมไปใช้อย่างสง่างาม!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ภาษาคือกุญแจแห่งการสื่อสาร วัฒนธรรมคือสะพานเชื่อมใจ"',
          tokens: ['文化是心灵的桥梁', '语言是沟通的钥匙'],
          correct_sequence: ['语言是沟通的钥匙', '文化是心灵的桥梁'],
          pinyin: 'Yǔyán shì gōutōng de yàoshi, wénhuà shì xīnlíng de qiáoliáng.',
          meaning_th: 'ภาษาคือกุญแจแห่งการสื่อสาร วัฒนธรรมคือสะพานแห่งจิตใจ',
          explanation_th: 'ประโยคเปรียบเปรยคู่ขนาน (语言是沟通的钥匙) + (文化是心灵的桥梁)',
          encouragement: 'ประกอบประโยคสุภาษิตการสื่อสารสากลได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '瑰宝' ตัว '瑰' (guī - หยกงาม) มีหมวดนำใดอยู่ด้านซ้าย?",
          options: [
            '王 (หมวดหยก 王字旁 / 玉)',
            '金 (หมวดโลหะ 金字旁)',
            '石 (หมวดหิน 石字旁)',
            '贝 (หมวดทรัพย์สิน 贝字旁)'
          ],
          correct_index: 0,
          explanation_th: "'瑰' มีหมวด '王' (หยกแท้โบราณ) ด้านซ้าย สื่อถึงอัญมณีหยกชั้นเลิศที่ล้ำค่า",
          encouragement: 'วิเคราะห์โครงสร้างอักษรหมวดอัญมณีหยกได้อย่างเฉียบคม!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณได้รับเกียรติเป็นผู้แทนเยาวชนนานาชาติกล่าวสุนทรพจน์ในพิธีเปิด "เวทีเสวนาอารยธรรมโลกเพื่อการพัฒนาที่ยั่งยืน" จงเลือกประโยคสุนทรพจน์สรุปที่สะท้อนการแสวงจุดร่วมสงวนจุดต่าง จิตใจที่กว้างดั่งมหาสมุทร และบทบาททูตวัฒนธรรมได้อย่างทรงพลังที่สุด',
        dialogue_context: [
          {
            speaker: '大会秘书长',
            zh: '请问当代青年应当如何消除文明隔阂，在多元世界中共同开创人类更加美好的未来？'
          }
        ],
        options: [
          '秉持求同存异与和而不同，胸怀大度架起友谊桥梁；让我们争当文化使者，推动世界文明在互鉴融合中绽放光芒！',
          '全世界只能保留一种文化，其他语言文化都应该被淘汰。',
          '互不往来各过各的，完全不需要进行任何跨文化交流。',
          '只和想法完全一致的人做朋友，拒绝接触任何不同意见。'
        ],
        correct_index: 0,
        explanation_th: 'ตัวเลือกที่ 1 ครบถ้วนทั้งมิติปรัชญา (求同存异与和而不同) คุณธรรมความใจกว้าง (胸怀大度) บทบาททูตสะพานเชื่อม (文化使者与友谊桥梁) และการหลอมรวมอารยธรรม (互鉴融合)',
        cheer_message: 'ยอดเยี่ยมระดับปรมาจารย์! คุณพิชิตการเป็นทูตสันติภาพและวัฒนธรรมระดับโลกได้อย่างสง่างามที่สุด!'
      },
      cheer_trophy: {
        badge_id: 'badge_t3_u44_master',
        badge_name: 'ทูตสันติภาพวัฒนธรรมสากล (Global Cultural Ambassador Master)',
        message_th: 'ยินดีด้วย! คุณเข้าใจความลึกซึ้งของการสื่อสารข้ามวัฒนธรรม มีวิสัยทัศน์พหุวัฒนธรรมอันกว้างไกล และใช้สำนวน 胸怀大度 ได้อย่างทรงพลัง!',
        xp_reward: 200
      }
    }
  ]
};
