import { UnitLessonData } from '../../src/types/lesson';

export const unit47Data: UnitLessonData = {
  unit_id: 'tier4_u47',
  tier: 4,
  unit_number: 47,
  title: {
    zh: '《孙子兵法》与商业谋略',
    th: 'พิชัยสงครามซุนวูกับกลยุทธ์ธุรกิจสมัยใหม่',
    en: 'Sun Tzu\'s Art of War & Business Strategies'
  },
  description: 'ศึกษาหลักพิชัยสงคราม 13 บทของซุนวู (知己知彼、出其不意、兵贵神速、运筹帷幄) ประยุกต์ใช้ในการวิเคราะห์คู่แข่งและการวางกลยุทธ์ธุรกิจระดับสูง',
  lessons: [
    {
      lesson_id: 't4_u47_l01',
      lesson_number: 1,
      title: {
        zh: '始计篇：知己知彼与市场调研',
        th: 'บทเริ่มวางแผน: รู้เขารู้เรา (知己知彼) และการวิจัยตลาด',
        en: 'Laying Plans: Know Yourself & Competitive Intelligence'
      },
      can_do: {
        th: 'อธิบายหลักการประเมินสถานการณ์ (始计) และนำสำนวน 知己知彼 ไปใช้ในการวิเคราะห์จุดแข็งจุดอ่อนของธุรกิจได้',
        en: 'Apply Sun Tzu\'s laying plans principles and idiom "Know Yourself and the Enemy" to business intelligence'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ใช้สำนวน 知己知彼 และวิเคราะห์ 胜算 ในการวางแผนกลยุทธ์การตลาด!',
      vocabulary: [
        {
          id: 'hsk4_4701',
          hanzi: '兵法',
          pinyin: 'bīngfǎ',
          display_pinyin: 'bīngfǎ',
          pinyin_tone: 'bing1fa3',
          meaning_th: 'ตำราพิชัยสงคราม / ยุทธศาสตร์การทหารและการบริหาร',
          meaning_en: 'art of war / military strategy / tactical doctrine',
          radical: '八',
          radical_name_th: 'หมวดแปด (八字底)',
          stroke_count: 15,
          mnemonic: 'นักรบถืออาวุธสองมือ (兵) ปฏิบัติตามกฎเกณฑ์แห่งน้ำ (法) = ตำราพิชัยสงคราม',
          kid_mnemonic: 'แม่ทัพเปิดม้วนคัมภีร์ไม้ไผ่โบราณศึกษากลศึก = 兵法',
          body_gesture: 'สองมือคลี่ม้วนกระดาษออกอ่านอย่างสง่างาม'
        },
        {
          id: 'hsk4_4702',
          hanzi: '谋略',
          pinyin: 'móulüè',
          display_pinyin: 'móulüè',
          pinyin_tone: 'mou2lüe4',
          meaning_th: 'กลยุทธ์ / ยุทธวิธี / แผนการแยบยลเพื่อชัยชนะ',
          meaning_en: 'strategy / tactics / strategic scheme',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 22,
          mnemonic: 'คำพูดที่ผ่านการไตร่ตรองลึกซึ้ง (谋) วางกรอบเขตแดน (略) = แผนยุทธศาสตร์',
          kid_mnemonic: 'กระต่ายวางหมากรุกตัวสำคัญบนกระดานไม้ = 谋略',
          body_gesture: 'ใช้นิ้วชี้หยิบตัวหมากรุกขยับไปข้างหน้าอย่างมั่นใจ'
        },
        {
          id: 'hsk4_4703',
          hanzi: '知己知彼',
          pinyin: 'zhījǐzhībǐ',
          display_pinyin: 'zhījǐzhībǐ',
          pinyin_tone: 'zhi1ji3zhi1bi3',
          meaning_th: 'รู้เขารู้เรา / เข้าใจจุดแข็งจุดอ่อนทั้งของตนเองและคู่ต่อสู้',
          meaning_en: 'know oneself and know the enemy',
          radical: '矢',
          radical_name_th: 'หมวดลูกศร (矢字旁)',
          stroke_count: 26,
          mnemonic: 'รู้แจ้งในตนเอง (知己) และเข้าใจลึกซึ้งในผู้อื่น (知彼) = รู้เขารู้เรา',
          kid_mnemonic: 'ส่องกระจกดูตัวเองแล้วมองกล้องส่องทางไกลดูคู่แข่ง = 知己知彼',
          body_gesture: 'มือซ้ายแตะที่อกตนเอง มือขวาป้องสายตามองไปข้างหน้า'
        },
        {
          id: 'hsk4_4704',
          hanzi: '调研',
          pinyin: 'diàoyán',
          display_pinyin: 'diàoyán',
          pinyin_tone: 'diao4yan2',
          meaning_th: 'การสำรวจวิจัยข้อมูล / การลงพื้นที่เก็บข้อมูลภาคสนาม',
          meaning_en: 'investigation and research / field survey',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 19,
          mnemonic: 'ซักถามพูดคุย (调) และขัดสีหินจนขึ้นเงาคมชัด (研) = สำรวจวิจัยอย่างประณีต',
          kid_mnemonic: 'ถือกระดานสัมภาษณ์ผู้คนในเมืองเพื่อเก็บข้อมูลสถิติ = 调研',
          body_gesture: 'มือซ้ายถือกดาน มือขวาทำท่าจดบันทึกสัมภาษณ์'
        },
        {
          id: 'hsk4_4705',
          hanzi: '胜算',
          pinyin: 'shèngsuàn',
          display_pinyin: 'shèngsuàn',
          pinyin_tone: 'sheng4suan4',
          meaning_th: 'โอกาสแห่งชัยชนะ / แต้มต่อและความน่าจะเป็นที่จะชนะ',
          meaning_en: 'odds of success / calculated chance of victory',
          radical: '月',
          radical_name_th: 'หมวดเนื้อ/ดวงจันทร์ (月字旁)',
          stroke_count: 23,
          mnemonic: 'ความสำเร็จชัยชนะ (胜) ผ่านการคำนวณลูกคิดอย่างถี่ถ้วน (算) = โอกาสชนะ',
          kid_mnemonic: 'ดีดลูกคิดคำนวณแต้มคะแนนแล้วชูนิ้วบอกว่าชนะแน่นอน = 胜算',
          body_gesture: 'ทำท่านิ้วดีดลูกคิดเร็วๆ แล้วยกนิ้วโป้งแสดงความมั่นใจ'
        }
      ],
      tone_rule: {
        rule_name: 'การรักษาจังหวะสมมาตร 4 พยางค์ 知己知彼 (zhījǐzhībǐ)',
        description_th: 'zhī (เสียง 1) jǐ (เสียง 3) และ zhī (เสียง 1) bǐ (เสียง 3) เป็นคู่คำสลับเสียงสูง-ต่ำที่สมดุลและทรงพลัง',
        example: '知己知彼，百战不殆。',
        fun_metaphor: 'เหมือนการก้าวเท้าซ้ายและขวาอย่างมั่นคงและสง่างาม',
        reassurance: 'สำนวนยอดนิยมที่สุดของซุนวู ควรออกเสียงวรรณยุกต์ 3 ให้ทุ้มลึกและเต็มเสียง'
      },
      grammar_bite: {
        title: 'โครงสร้างการวางแผนก่อนลงมือ: 基于知己知彼，唯有……才能……',
        formula: '在[การแข่งขัน/การทำธุรกิจ]中，必须做到知己知彼，唯有[เงื่อนไขสำคัญ]，才能[บรรลุชัยชนะ]',
        explanation_th: 'ใช้ในการนำเสนอแผนยุทธศาสตร์เพื่อแสดงความสุขุมรอบคอบและการตัดสินใจบนฐานข้อมูลจริง',
        patterns: [
          {
            formula: '知己知彼，才能把握胜算。',
            zh: '在激烈的市场竞争中，企业只有做到知己知彼，才能牢牢把握胜算。',
            pinyin: 'Zài jīliè de shìchǎng jìngzhēng zhōng, qǐyè zhǐyǒu zuò dào zhījǐzhībǐ, cái néng láoláo bǎwò shèngsuàn.',
            th: 'ในการแข่งขันทางการตลาดที่ดุเดือด มีเพียงการรู้เขารู้เราเท่านั้น องค์กรจึงจะกุมโอกาสแห่งชัยชนะไว้ได้อย่างมั่นคง',
            en: 'In fierce market competition, only by knowing oneself and knowing the competitor can an enterprise firmly seize the odds of victory.'
          },
          {
            formula: '通过深入调研，制定合理谋略。',
            zh: '我们必须通过全面的市场调研，制定出切实可行的商业谋略。',
            pinyin: 'Wǒmen bìxū tōngguò quánmiàn de shìchǎng diàoyán, zhìdìng chū qièshí kěxíng de shāngyè móulüè.',
            th: 'พวกเราต้องอาศัยการสำรวจตลาดอย่างรอบด้าน เพื่อกำหนดแผนกลยุทธ์ทางธุรกิจที่ปฏิบัติได้จริง',
            en: 'We must conduct comprehensive market research to formulate practical and feasible business strategies.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '陈总 (Director Chen) 👔',
          zh: '关于下季度进军海外市场，大家的调研进展如何？',
          pinyin: 'Guānyú xià jǐdù jìnjūn hǎiwài shìchǎng, dàjiā de diàoyán jìnzhǎn rúhé?',
          th: 'เกี่ยวกับการรุกเข้าสู่ตลาดต่างประเทศในไตรมาสหน้า การสำรวจวิจัยของทุกคนคืบหน้าอย่างไรบ้างครับ?',
          en: 'Regarding entering overseas markets next quarter, how is the progress of our market research?',
          audio_trigger: 't4_u47_l01_d01'
        },
        {
          speaker: '林总监 (Director Lin) 👩‍💼',
          zh: '《孙子兵法》强调知己知彼，我们已完成对主要竞品的深度分析。',
          pinyin: '"Sūnzǐ Bīngfǎ" qiángdiào zhījǐzhībǐ, wǒmen yǐ wánchéng duì zhǔyào jìngpǐn de shēndù fēnxī.',
          th: 'พิชัยสงครามซุนวูเน้นย้ำเรื่องรู้เขารู้เรา ทางเราได้วิเคราะห์คู่แข่งหลักอย่างลึกซึ้งเรียบร้อยแล้วค่ะ',
          en: 'Sun Tzu\'s Art of War emphasizes knowing oneself and knowing the enemy; we have completed in-depth analysis of major competitors.',
          audio_trigger: 't4_u47_l01_d02'
        },
        {
          speaker: '陈总 (Director Chen) 👔',
          zh: '很好，知己知彼才能百战不殆，我们目前的胜算有多大？',
          pinyin: 'Hěn hǎo, zhījǐzhībǐ cái néng bǎizhànbùdài, wǒmen mùqián de shèngsuàn yǒu duō dà?',
          th: 'ดีมาก รู้เขารู้เราจึงจะรบร้อยครั้งไม่พ่าย โอกาสชนะของพวกเราในตอนนี้มีมากน้อยเพียงใด?',
          en: 'Very good, knowing oneself and the enemy leads to invincible success; what are our calculated odds of victory right now?',
          audio_trigger: 't4_u47_l01_d03'
        },
        {
          speaker: '林总监 (Director Lin) 👩‍💼',
          zh: '只要结合我们的技术优势，制定精准商业谋略，胜算在八成以上。',
          pinyin: 'Zhǐyào jiéhé wǒmen de jìshù yōushì, zhìdìng jīngzhǔn shāngyè móulüè, shèngsuàn zài bā chéng yǐshàng.',
          th: 'ขอเพียงผสานข้อได้เปรียบทางเทคโนโลยีของเราเข้ากับกลยุทธ์ธุรกิจที่แม่นยำ โอกาสชนะมีมากกว่าแปดสิบเปอร์เซ็นต์ค่ะ',
          en: 'As long as we combine our technological edge with targeted business strategy, our odds of victory exceed eighty percent.',
          audio_trigger: 't4_u47_l01_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'สำนวน "知己知彼" ในทางการบริหารธุรกิจหมายถึงอะไร?',
          options: [
            'การประเมินศักยภาพขององค์กรตนเองควบคู่กับการวิเคราะห์คู่แข่งและสภาพตลาด',
            'การรู้จักเฉพาะเพื่อนสนิทในบริษัท',
            'การเลียนแบบสินค้าของคู่แข่งทุกประการ',
            'การหลีกเลี่ยงการแข่งขันทุกรูปแบบ'
          ],
          correct_index: 0,
          explanation_th: '"知己知彼" ในเชิงธุรกิจคือ Competitive Intelligence การรู้จุดแข็งจุดอ่อนตนเองและเข้าใจกลยุทธ์คู่แข่ง',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจกลยุทธ์การบริหารระดับสากล!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "รู้เขารู้เรา จึงจะกุมโอกาสแห่งชัยชนะไว้ได้"',
          tokens: ['才能把握胜算', '知己知彼'],
          correct_sequence: ['知己知彼', '才能把握胜算'],
          pinyin: 'Zhījǐzhībǐ, cái néng bǎwò shèngsuàn.',
          meaning_th: 'รู้เขารู้เรา จึงจะกุมโอกาสแห่งชัยชนะไว้ได้',
          explanation_th: 'เงื่อนไขยุทธศาสตร์ (知己知彼) + ผลลัพธ์ (才能把握胜算)',
          encouragement: 'เรียงประโยคกลยุทธ์ซุนวูได้อย่างเฉียบคม!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "知" (zhī) ใน "知己知彼" มีหมวดนำลูกศร (矢) สื่อถึงอะไร?',
          options: [
            'การยิงลูกศรแม่นยำตรงเป้าหมาย เปรียบดั่งการรู้แจ้งเห็นจริงอย่างรวดเร็วและตรงประเด็น',
            'การทำสงครามยิงธนู',
            'ความเจ็บปวดจากบาดแผล',
            'การละเล่นยิงเป้าโบราณ'
          ],
          correct_index: 0,
          explanation_th: 'หมวด "矢" (ลูกศร) + "口" (ปาก) สื่อถึงคำพูดที่ตรงประเด็นและแม่นยำดั่งลูกศรพุ่งเข้าเป้า = รู้แจ้ง (知)',
          encouragement: 'วิเคราะห์โครงสร้างอักษรได้อย่างลึกซึ้ง!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "胜算" (shèngsuàn) แปลว่าอะไร?',
          options: [
            'โอกาสหรือความน่าจะเป็นที่จะประสบความสำเร็จ/ชัยชนะ',
            'การคำนวณกำไรขาดทุนทางบัญชี',
            'การเสียเปรียบคู่แข่ง',
            'การยอมจำนนต่ออุปสรรค'
          ],
          correct_index: 0,
          explanation_th: '"胜算" หมายถึง การคำนวณประเมินแต้มต่อและโอกาสที่จะได้รับชัยชนะก่อนเปิดฉากแข่งขัน',
          encouragement: 'จำคำศัพท์ยุทธศาสตร์ได้อย่างแม่นยำ!'
        }
      ],
      boss_challenge: {
        question: 'ในการประชุมบอร์ดบริหาร หากต้องการกล่าวว่า "พวกเราต้องทำการวิจัยตลาดอย่างรอบคอบเพื่อเพิ่มโอกาสชนะ" ควรเลือกใช้ประโยคใด?',
        options: [
          '我们必须进行深入调研，以此提高商业胜算。',
          '我们不需要调研，只要出乎意料即可。',
          '我们对市场敬而远之，胜算自然增加。',
          '我们半途而废，才能知己知彼。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "深入调研" (วิจัยลึกซึ้ง) และ "提高商业胜算" (เพิ่มโอกาสชนะทางธุรกิจ) ได้อย่างถูกต้องตรงตามมาตรฐาน'
      },
      cheer_trophy: {
        badge_name: 'เสนาธิการวางแผนยุทธศาสตร์ (Sun Tzu Strategist)',
        message_th: 'ยอดเยี่ยม! คุณสามารถนำหลักการ始计และ知己知彼ของซุนวูมาประยุกต์ใช้ในกลยุทธ์ธุรกิจได้อย่างมืออาชีพ!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u47_l02',
      lesson_number: 2,
      title: {
        zh: '虚实篇：出其不意与蓝海战略',
        th: 'บทจริงเท็จ: เหนือความคาดหมาย (出其不意) และกลยุทธ์น่านน้ำสีคราม',
        en: 'Weak Points & Strong: Surprise Tactics & Blue Ocean'
      },
      can_do: {
        th: 'อธิบายกลยุทธ์ 虚实 (จุดแข็งจุดอ่อน/จริงเท็จ) และใช้สำนวน 出其不意 และ 避实击虚 ในการวางแผนเจาะตลาดใหม่',
        en: 'Explain tactical illusions (Xu-Shi) and use idioms "Catch Unawares" and "Avoid Strength, Strike Weakness"'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำหลักการ 避实击虚 ไปสร้างกลยุทธ์น่านน้ำสีคราม (蓝海) ที่ไร้คู่แข่ง!',
      vocabulary: [
        {
          id: 'hsk4_4706',
          hanzi: '虚实',
          pinyin: 'xūshí',
          display_pinyin: 'xūshí',
          pinyin_tone: 'xu1shi2',
          meaning_th: 'จริงเท็จหลอกล่อ / สภาพความเป็นจริงและภาพลวงตา / จุดอ่อนและจุดแข็ง',
          meaning_en: 'actual situation / weaknesses and strengths / true state of affairs',
          radical: '虍',
          radical_name_th: 'หมวดลายเสือ (虎字头)',
          stroke_count: 19,
          mnemonic: 'ความว่างเปล่าลวงตา (虚) สลับกับแก่นสารแท้จริง (实) = กลอุบายจริงเท็จ',
          kid_mnemonic: 'นักมายากลสลับกล่องเปล่ากับกล่องมีของเพื่อหลอกสายตา = 虚实',
          body_gesture: 'สองมือสลับพลิกหงายและคว่ำมือสลับกันไปมา'
        },
        {
          id: 'hsk4_4707',
          hanzi: '出其不意',
          pinyin: 'chūqíbùyì',
          display_pinyin: 'chūqíbùyì',
          pinyin_tone: 'chu1qi2bu4yi4',
          meaning_th: 'จู่โจมในจังหวะที่คาดไม่ถึง / เหนือความคาดหมายของคู่แข่ง',
          meaning_en: 'take sb by surprise / catch unawares',
          radical: '凵',
          radical_name_th: 'หมวดอ่างเปิด (凵字框)',
          stroke_count: 24,
          mnemonic: 'ปรากฏตัวขึ้นมา (出) ในจุดที่ศัตรู (其) ไม่ทันได้คาดคิด (不意) = จู่โจมไม่ทันตั้งตัว',
          kid_mnemonic: 'กระต่ายกระโดดออกจากกล่องมายากลเซอร์ไพรส์ทุกคน = 出其不意',
          body_gesture: 'ทำท่าซ่อนตัวแล้วก้าวออกมาเปิดตัวอย่างฉับพลัน'
        },
        {
          id: 'hsk4_4708',
          hanzi: '避实击虚',
          pinyin: 'bìshíjīxū',
          display_pinyin: 'bìshíjīxū',
          pinyin_tone: 'bi4shi2ji1xu1',
          meaning_th: 'หลบเลี่ยงจุดแข็งของคู่แข่ง แล้วเข้าตีจุดอ่อนที่ไร้การป้องกัน',
          meaning_en: 'avoid the enemy\'s strength and strike their weakness',
          radical: '辶',
          radical_name_th: 'หมวดการเดิน (走之旁)',
          stroke_count: 36,
          mnemonic: 'หลีกเลี่ยง (避) จุดแข็งแกร่ง (实) แล้วเข้าโจมตี (击) จุดว่างเปล่า (虚) = เลี่ยงจุดแข็งตีจุดอ่อน',
          kid_mnemonic: 'ไม่วิ่งชนกำแพงหนาแต่เลี้ยวไปเปิดประตูบานที่ไม่ได้ล็อก = 避实击虚',
          body_gesture: 'เบี่ยงตัวหลบไปทางซ้ายแล้วยื่นหมัดตรงไปทางขวาอย่างรวดเร็ว'
        },
        {
          id: 'hsk4_4709',
          hanzi: '蓝海',
          pinyin: 'lánhǎi',
          display_pinyin: 'lánhǎi',
          pinyin_tone: 'lan2hai3',
          meaning_th: 'น่านน้ำสีคราม / ตลาดใหม่ที่ยังไม่มีคู่แข่งและมีโอกาสเติบโตสูง',
          meaning_en: 'blue ocean / uncontested market space',
          radical: '艹',
          radical_name_th: 'หมวดหญ้า (草字头)',
          stroke_count: 23,
          mnemonic: 'มหาสมุทรสีครามกว้างใหญ่ (蓝海) ที่คลื่นลมสงบและไร้การแย่งชิงนองเลือด = น่านน้ำสีคราม',
          kid_mnemonic: 'แล่นเรือใบสีขาวไปในทะเลสีฟ้าใสไร้เรือลำอื่นแย่งจับปลา = 蓝海',
          body_gesture: 'กางสองแขนวาดเป็นคลื่นทะเลสีฟ้ากว้างใหญ่'
        },
        {
          id: 'hsk4_4710',
          hanzi: '攻势',
          pinyin: 'gōngshì',
          display_pinyin: 'gōngshì',
          pinyin_tone: 'gong1shi4',
          meaning_th: 'การเปิดเกมรุก / แรงผลักดันในการบุกโจมตีหรือขยายตลาด',
          meaning_en: 'offensive / attack momentum / aggressive push',
          radical: '攵',
          radical_name_th: 'หมวดเคาะเบาๆ (反文旁)',
          stroke_count: 16,
          mnemonic: 'จู่โจมเปิดฉาก (攻) ด้วยพลังอำนาจและจังหวะ (势) = เกมรุกที่ทรงพลัง',
          kid_mnemonic: 'ทีมฟุตบอลบุกประชิดประตูฝ่ายตรงข้ามอย่างต่อเนื่อง = 攻势',
          body_gesture: 'ดันสองฝ่ามือไปข้างหน้าพร้อมโน้มตัวเหมือนส่งพลังบุก'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงกฎเกณฑ์เปลี่ยนเสียง 不 ใน 出其不意 (chūqíbùyì)',
        description_th: 'คำว่า 不 (bù) เมื่อตามด้วย yì (เสียง 4) จะผันเป็นเสียง 2 คือ búyì เพื่อความลื่นไหลในการพูด',
        example: '出其不意，攻其不备 (chūqíbúyì, gōngqíbúbèi)',
        fun_metaphor: 'เหมือนสปริงที่ยุบตัวแล้วดีดขึ้นอย่างรวดเร็วฉับไว',
        reassurance: 'สำนวนนี้มักพูดคู่กับ 攻其不备 ออกเสียง bú ชัดเจนตามกฎสากล'
      },
      grammar_bite: {
        title: 'โครงสร้างกลยุทธ์การเจาะตลาด: 避实击虚，出其不意开拓蓝海',
        formula: '企业应当避开[จุดแข็งคู่แข่ง]，坚持避实击虚，以出其不意之势[บรรลุเป้าหมาย]',
        explanation_th: 'ใช้ในการนำเสนอวิสัยทัศน์ที่ไม่เน้นการตัดราคาแข่งขันแบบเดิม (Red Ocean) แต่มุ่งสร้างนวัตกรรมใหม่ (Blue Ocean)',
        patterns: [
          {
            formula: '避实击虚，开辟全新的蓝海市场。',
            zh: '我们必须采取避实击虚的策略，出其不意地开辟出全新的蓝海市场。',
            pinyin: 'Wǒmen bìxū cǎiqǔ bìshíjīxū de cèlüè, chūqíbùyì de kāipì chū quánxīn de lánhǎi shìchǎng.',
            th: 'พวกเราต้องดำเนินกลยุทธ์หลบเลี่ยงจุดแข็งตีจุดอ่อน เปิดตัวตลาดน่านน้ำสีครามแห่งใหม่อย่างเหนือความคาดหมาย',
            en: 'We must adopt the strategy of avoiding strengths and striking weaknesses to unexpectedly open up brand new blue ocean markets.'
          },
          {
            formula: '看清虚实，展开有力的商业攻势。',
            zh: '只有看清竞争对手的虚实，我们才能发起精准有效的市场攻势。',
            pinyin: 'Zhǐyǒu kànqīng jìngzhēng duìshǒu de xūshí, wǒmen cái néng fāqǐ jīngzhǔn yǒuxiào de shìchǎng gōngshì.',
            th: 'มีเพียงการมองทะลุจุดแข็งจุดอ่อนจริงเท็จของคู่แข่งเท่านั้น พวกเราจึงจะเปิดเกมรุกทางการตลาดได้อย่างแม่นยำและมีประสิทธิภาพ',
            en: 'Only by clearly seeing the competitor\'s true strengths and weaknesses can we launch an accurate and effective market offensive.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '林总监 (Director Lin) 👩‍💼',
          zh: '陈总，巨头企业在传统赛道实力雄厚，我们如何破局？',
          pinyin: 'Chén zǒng, jùtóu qǐyè zài chuántǒng sàidào shílì xiónghòu, wǒmen rúhé pòjú?',
          th: 'คุณเฉินคะ บริษัทคู่แข่งรายใหญ่มีกำลังแข็งแกร่งมากในตลาดดั้งเดิม เราจะหาทางทะลวงทางตันอย่างไรดีคะ?',
          en: 'Director Chen, giant enterprises have immense strength in traditional arenas; how do we break through the deadlock?',
          audio_trigger: 't4_u47_l02_d01'
        },
        {
          speaker: '陈总 (Director Chen) 👔',
          zh: '《兵法》讲“避实击虚”，我们绝不能在他们的优势领域硬拼。',
          pinyin: '"Bīngfǎ" jiǎng "bìshíjīxū", wǒmen jué bù néng zài tāmen de yōushì lǐngyù yìngpīn.',
          th: 'พิชัยสงครามสอนว่า "เลี่ยงจุดแข็งตีจุดอ่อน" พวกเราต้องไม่ไปปะทะหักด่านในพื้นที่ที่พวกเขาได้เปรียบเด็ดขาดครับ',
          en: 'The Art of War says "avoid the strong and strike the weak"; we must never confront them head-on in their area of strength.',
          audio_trigger: 't4_u47_l02_d02'
        },
        {
          speaker: '林总监 (Director Lin) 👩‍💼',
          zh: '明白了，我们可以出其不意推出智能新品，开辟细分蓝海。',
          pinyin: 'Míngbái le, wǒmen kěyǐ chūqíbùyì tuīchū zhìnéng xīnpǐn, kāipì xìfēn lánhǎi.',
          th: 'เข้าใจแล้วค่ะ เราสามารถเปิดตัวสินค้าอัจฉริยะรุ่นใหม่ที่คาดไม่ถึง เพื่อบุกเบิกตลาดน่านน้ำสีครามเฉพาะกลุ่ม',
          en: 'Understood, we can unexpectedly launch innovative smart products to open up a specialized blue ocean niche.',
          audio_trigger: 't4_u47_l02_d03'
        },
        {
          speaker: '陈总 (Director Chen) 👔',
          zh: '对！摸清对手虚实之后，发动闪电攻势，一举树立品牌地位。',
          pinyin: 'Duì! Mōqīng duìshǒu xūshí zhīhòu, fādòng shǎndiàn gōngshì, yījǔ shùlì pǐnpái dìwèi.',
          th: 'ถูกต้องครับ! หลังจากหยั่งรู้จุดแข็งจุดอ่อนของคู่แข่งแล้ว ค่อยเปิดฉากเกมรุกสายฟ้าแลบ สถาปนาสถานะแบรนด์ได้ในคราวเดียว',
          en: 'Exactly! Once we assess the competitor\'s true strengths and weaknesses, we launch a lightning offensive to establish our brand position in one move.',
          audio_trigger: 't4_u47_l02_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'หลักการ "避实击虚" (bìshíjīxū) สอดคล้องกับแนวคิดทางธุรกิจใดมากที่สุด?',
          options: [
            'การหลีกเลี่ยงการแข่งขันทางราคาในตลาดอิ่มตัว และหันไปเจาะตลาดเฉพาะกลุ่มที่มีความต้องการแต่ยังไม่มีคู่แข่ง',
            'การทุ่มเงินโฆษณาแข่งกับบริษัทอันดับหนึ่งในตลาดเดิม',
            'การลดคุณภาพสินค้าเพื่อลดต้นทุน',
            'การปิดบริษัทเมื่อพบเจอคู่แข่งที่แข็งแกร่ง'
          ],
          correct_index: 0,
          explanation_th: '"避实击虚" คือการหลบหลีกจุดแข็งและมุ่งโจมตีจุดว่างเปล่า ตรงกับกลยุทธ์น่านน้ำสีคราม (Blue Ocean Strategy)',
          encouragement: 'ยอดเยี่ยมมาก! ผสานยุทธศาสตร์โบราณกับธุรกิจสมัยใหม่ได้อย่างไร้รอยต่อ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "พวกเราควรดำเนินกลยุทธ์หลบเลี่ยงจุดแข็งตีจุดอ่อน"',
          tokens: ['采取避实击虚的策略', '我们应当'],
          correct_sequence: ['我们应当', '采取避实击虚的策略'],
          pinyin: 'Wǒmen yīngdāng cǎiqǔ bìshíjīxū de cèlüè.',
          meaning_th: 'พวกเราควรดำเนินกลยุทธ์หลบเลี่ยงจุดแข็งตีจุดอ่อน',
          explanation_th: 'ประธาน (我们应当) + กริยาวลีกลยุทธ์ (采取避实击虚的策略)',
          encouragement: 'จัดประโยคยุทธวิธีได้อย่างเด็ดขาด!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "避" ใน "避实击虚" มีหมวดนำการเดิน (辶 - 走之旁) สื่อถึงอะไร?',
          options: [
            'การก้าวเท้าเคลื่อนที่หลบหลีกอันตรายอย่างคล่องแคล่ว',
            'การหยุดนิ่งอยู่กับที่',
            'การขุดหลุมหลบภัย',
            'การสร้างกำแพงกั้น'
          ],
          correct_index: 0,
          explanation_th: '"辶" (การก้าวเดิน) สื่อถึงการเคลื่อนที่อย่างว่องไวเพื่อหลบหลีกการปะทะโดยตรง',
          encouragement: 'จำหมวดนำแห่งการเคลื่อนไหวได้อย่างแม่นยำ!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "蓝海" (Blue Ocean) ในทางเศรษฐศาสตร์หมายถึงอะไร?',
          options: [
            'พื้นที่ตลาดใหม่ที่ไร้คู่แข่งและสร้างอุปสงค์ขึ้นมาใหม่',
            'การทำประมงในมหาสมุทรน้ำลึก',
            'ตลาดที่มีการแข่งขันตัดราคาอย่างรุนแรงจนนองเลือด',
            'ตลาดที่รัฐบาลสั่งห้ามทำการค้า'
          ],
          correct_index: 0,
          explanation_th: '"蓝海" คือ ตลาดใหม่ที่ยังไม่มีผู้เล่นมาก่อน ตรงข้ามกับ "红海" (Red Ocean) ที่มีการแข่งขันตัดราคาอย่างดุเดือด',
          encouragement: 'เข้าใจศัพท์เศรษฐศาสตร์และการตลาดชั้นสูง!'
        }
      ],
      boss_challenge: {
        question: 'ในฐานะที่ปรึกษาธุรกิจ หากคุณต้องการแนะนำซีอีโอให้เจาะตลาดใหม่ที่คู่แข่งไม่ทันระวังตัว ควรเขียนข้อเสนอแนะอย่างไร?',
        options: [
          '建议企业坚持避实击虚，出其不意进军细分蓝海领域。',
          '建议企业与行业巨头在成熟红海中硬拼价格。',
          '建议企业半途而废，放弃所有研发与调研。',
          '建议企业敬而远之，完全退出商业竞争。'
        ],
        correct_index: 0,
        explanation_th: 'ข้อแรกใช้ "避实击虚" และ "出其不意" เพื่อเข้าสู่ "细分蓝海" ได้อย่างคมคายและถูกต้องตามหลักยุทธศาสตร์'
      },
      cheer_trophy: {
        badge_name: 'จอมยุทธ์ผู้พิชิตน่านน้ำสีคราม (Blue Ocean Conqueror)',
        message_th: 'ยินดีด้วย! คุณสามารถควบคุมกลศึก 虚实 และ 出其不意 เพื่อเปิดน่านน้ำธุรกิจใหม่อย่างชาญฉลาด!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u47_l03',
      lesson_number: 3,
      title: {
        zh: '军争篇：兵贵神速与敏捷决策',
        th: 'บทชิงชัย: ความเร็วคือหัวใจ (兵贵神速) และการตัดสินใจแบบเอไจล์',
        en: 'Maneuvering: Speed in Strategy & Agile Decision Making'
      },
      can_do: {
        th: 'อธิบายหลักความรวดเร็วในการช่วงชิงโอกาส (兵贵神速) และใช้สำนวน 势如破竹 ในการขยายธุรกิจได้อย่างมีพลัง',
        en: 'Articulate speed supremacy in competition (Speed is Essence) and utilize idiom "Like Splitting Bamboo"'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำหลักการ 兵贵神速 และ 敏捷决策 ไปปรับใช้ในสภาพแวดล้อมที่เปลี่ยนแปลงเร็ว!',
      vocabulary: [
        {
          id: 'hsk4_47011',
          hanzi: '兵贵神速',
          pinyin: 'bīngguìshénsù',
          display_pinyin: 'bīngguìshénsù',
          pinyin_tone: 'bing1gui4shen2su4',
          meaning_th: 'การศึกยึดความรวดเร็วดั่งเทพ / ความรวดเร็วฉับไวคือหัวใจสำคัญของชัยชนะ',
          meaning_en: 'speed is the vital factor in military operations / swiftness is precious',
          radical: '八',
          radical_name_th: 'หมวดแปด (八字底)',
          stroke_count: 36,
          mnemonic: 'การเคลื่อนกำลัง (兵) มีค่ายิ่ง (贵) เมื่อรวดเร็วดั่งเทพบันดาล (神速) = ความเร็วคือหัวใจ',
          kid_mnemonic: 'กระต่ายติดจรวดทะยานแซงเต่าในพริบตาเดียว = 兵贵神速',
          body_gesture: 'สองมือทำท่าทะยานพุ่งไปข้างหน้าอย่างรวดเร็ว'
        },
        {
          id: 'hsk4_47012',
          hanzi: '敏捷',
          pinyin: 'mǐnjié',
          display_pinyin: 'mǐnjié',
          pinyin_tone: 'min3jie2',
          meaning_th: 'คล่องแคล่วว่องไว / ปราดเปรียว / การทำงานแบบเอไจล์ (Agile)',
          meaning_en: 'agile / nimble / quick and resourceful',
          radical: '攵',
          radical_name_th: 'หมวดเคาะเบาๆ (反文旁)',
          stroke_count: 22,
          mnemonic: 'สติปัญญาปราดเปรียว (敏) ผสานการลงมือทำฉับไว (捷) = คล่องแคล่วว่องไว',
          kid_mnemonic: 'กระรอกน้อยกระโดดข้ามกิ่งไม้ได้อย่างคล่องแคล่ว = 敏捷',
          body_gesture: 'กระโดดสลับเท้าซ้ายขวาอย่างแคล่วคล่องว่องไว'
        },
        {
          id: 'hsk4_47013',
          hanzi: '势如破竹',
          pinyin: 'shìrúpòzhú',
          display_pinyin: 'shìrúpòzhú',
          pinyin_tone: 'shi4ru2po4zhu2',
          meaning_th: 'พลังเชี่ยวกรากประดุจผ่าลำไผ่ / ได้เปรียบอย่างราบคาบไร้สิ่งกีดขวาง',
          meaning_en: 'like splitting bamboo / irresistible force / sweeping advance',
          radical: '力',
          radical_name_th: 'หมวดพลังแรง (力字旁)',
          stroke_count: 30,
          mnemonic: 'แรงส่ง (势) ประดุจคมมีดผ่าต้นไผ่ (如破竹) ขาดสะบั้นราบคาบ = พลังเชี่ยวกรากไร้ต้านทาน',
          kid_mnemonic: 'สับมีดลงบนกระบอกไม้ไผ่แล้วแยกออกอย่างง่ายดาย = 势如破竹',
          body_gesture: 'ยกฝ่ามือขึ้นสูงแล้วฟันเฉียงลงมาอย่างทรงพลัง'
        },
        {
          id: 'hsk4_47014',
          hanzi: '决断',
          pinyin: 'juéduàn',
          display_pinyin: 'juéduàn',
          pinyin_tone: 'jue2duan4',
          meaning_th: 'การตัดสินใจอย่างเด็ดขาด / ความเด็ดเดี่ยวในการวินิจฉัย',
          meaning_en: 'make a firm decision / resolution / decisive judgment',
          radical: '氵',
          radical_name_th: 'หมวดสามจุดน้ำ (三点水)',
          stroke_count: 15,
          mnemonic: 'สายน้ำเชี่ยวไหลผ่าน (决) ถูกตัดขาดในพริบตา (断) = การตัดสินใจเด็ดขาด',
          kid_mnemonic: 'เคาะค้อนตุลาการลงบนแท่นตัดสินว่าเคาะจบแล้ว = 决断',
          body_gesture: 'สับมือลงตรงๆ บนฝ่ามืออีกข้างหนึ่งอย่างหนักแน่น'
        },
        {
          id: 'hsk4_47015',
          hanzi: '契机',
          pinyin: 'qìjī',
          display_pinyin: 'qìjī',
          pinyin_tone: 'qi4ji1',
          meaning_th: 'โอกาสสำคัญ / จุดเปลี่ยนแห่งความสำเร็จ / จังหวะอันเหมาะสม',
          meaning_en: 'opportunity / turning point / critical juncture',
          radical: '大',
          radical_name_th: 'หมวดใหญ่ (大字底)',
          stroke_count: 22,
          mnemonic: 'ข้อตกลงจารึกสลักไว้ (契) สอดคล้องกับกลไกแห่งจังหวะเวลา (机) = จุดเปลี่ยนโอกาสทอง',
          kid_mnemonic: 'เปิดประตูลับแล้วเห็นแสงทองส่องเข้ามา = 契机',
          body_gesture: 'สองมือทำท่าเปิดประตูสู่โลกใหม่ที่สว่างไสว'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงหนักแน่นใน 势如破竹 (shìrúpòzhú)',
        description_th: 'shì (เสียง 4 หนักแน่น) rú (เสียง 2 นุ่มนวล) pò (เสียง 4 กระแทกสั้น) zhú (เสียง 2 สะบัดขึ้น) แสดงจังหวะคมชัดของคมดาบ',
        example: '我军势如破竹，势不可挡。',
        fun_metaphor: 'เหมือนเสียงฟันดาบผ่าปล้องไผ่ดัง โพะ! อย่างสะใจ',
        reassurance: 'เน้นเสียง 4 ที่พยางค์ pò เพื่อให้ความรู้สึกของการทะลุทะลวงอุปสรรค'
      },
      grammar_bite: {
        title: 'โครงสร้างการช่วงชิงโอกาสทอง: 抓住……契机，以兵贵神速之势……',
        formula: '面对市场机遇，企业必须抓住[โอกาสสำคัญ]，以兵贵神速之势，[ขยายผล/ยึดครอง]',
        explanation_th: 'ใช้ในการสั่งการหรือกระตุ้นทีมงานให้ตัดสินใจอย่างรวดเร็วและเด็ดขาดในภาวะแข่งขัน',
        patterns: [
          {
            formula: '兵贵神速，绝不能错失良机。',
            zh: '商场如战场，兵贵神速，我们绝不能错失技术迭代的关键契机。',
            pinyin: 'Shāngchǎng rú zhànchǎng, bīngguìshénsù, wǒmen jué bù néng cuòshī jìshù diédài de guānjiàn qìjī.',
            th: 'สมรภูมิธุรกิจประดุจสมรภูมิรบ ความเร็วคือหัวใจ เราต้องไม่ปล่อยให้โอกาสสำคัญในการยกระดับเทคโนโลยีหลุดลอยไปเด็ดขาด',
            en: 'The marketplace is like a battlefield where speed is vital; we must never miss the critical opportunity of technological iteration.'
          },
          {
            formula: '敏捷决断，以势如破竹之势扩张。',
            zh: '管理层必须敏捷决断，带领团队以势如破竹之势迅速占领新市场。',
            pinyin: 'Guǎnlǐcéng bìxū mǐnjié juéduàn, dàilǐng tuánduì yǐ shìrúpòzhú zhī shì xùnsù zhànlǐng xīn shìchǎng.',
            th: 'ฝ่ายบริหารต้องตัดสินใจอย่างคล่องแคล่วเด็ดขาด นำพาทีมงานรุกคืบยึดครองตลาดใหม่อย่างราบคาบไร้ต้านทาน',
            en: 'Management must make agile decisions, leading the team to swiftly capture new markets with irresistible force.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '陈总 (Director Chen) 👔',
          zh: '技术团队的新算法测试通过了吗？',
          pinyin: 'Jìshù tuánduì de xīn suànfǎ cèshì tōngguò le ma?',
          th: 'การทดสอบอัลกอริทึมใหม่ของทีมเทคโนโลยีผ่านเรียบร้อยแล้วหรือยังครับ?',
          en: 'Has the technical team passed the test for the new algorithm?',
          audio_trigger: 't4_u47_l03_d01'
        },
        {
          speaker: '林总监 (Director Lin) 👩‍💼',
          zh: '报告陈总，刚刚全面通过，指标远超行业平均水平！',
          pinyin: 'Bàogào Chén zǒng, gānggāng quánmiàn tōngguò, zhǐbiāo yuǎn chāo hángyè píngjūn shuǐpíng!',
          th: 'รายงานคุณเฉิน เพิ่งผ่านการทดสอบรอบด้านสดๆ ร้อนๆ ดัชนีชี้วัดเหนือกว่าค่าเฉลี่ยของอุตสาหกรรมมากค่ะ!',
          en: 'Reporting Director Chen, it just passed completely; all indicators far exceed the industry average!',
          audio_trigger: 't4_u47_l03_d02'
        },
        {
          speaker: '陈总 (Director Chen) 👔',
          zh: '好！兵贵神速，必须敏捷决断，抢在竞争对手之前发布。',
          pinyin: 'Hǎo! Bīngguìshénsù, bìxū mǐnjié juéduàn, qiǎng zài jìngzhēng duìshǒu zhīqián fābù.',
          th: 'ยอดเยี่ยม! ความเร็วคือหัวใจ ต้องตัดสินใจอย่างเด็ดขาดฉับไว รีบเปิดตัวก่อนคู่แข่งให้ได้ครับ',
          en: 'Great! Speed is of the essence; we must make an agile decision to release it before competitors do.',
          audio_trigger: 't4_u47_l03_d03'
        },
        {
          speaker: '林总监 (Director Lin) 👩‍💼',
          zh: '抓住这个转型契机，我们的新品推广必定势如破竹！',
          pinyin: 'Zhuāzhù zhège zhuǎnxíng qìjī, wǒmen de xīnpǐn tuīguǎng bìdìng shìrúpòzhú!',
          th: 'คว้าจังหวะการเปลี่ยนผ่านในครั้งนี้ไว้ การโปรโมตผลิตภัณฑ์ใหม่ของเราจะต้องพุ่งทะยานราบคาบไร้สิ่งกีดขวางแน่นอนค่ะ!',
          en: 'Seizing this transformation opportunity, the launch of our new product is bound to advance with irresistible momentum!',
          audio_trigger: 't4_u47_l03_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'สำนวน "兵贵神速" เตือนใจผู้นำธุรกิจในเรื่องใด?',
          options: [
            'การตัดสินใจและลงมือปฏิบัติอย่างรวดเร็วเพื่อไม่ให้สูญเสียโอกาสทอง',
            'การใช้จ่ายเงินงบประมาณให้หมดโดยเร็ว',
            'การลดความเร็วในการขับขี่',
            'การทำงานโดยไม่ต้องวางแผน'
          ],
          correct_index: 0,
          explanation_th: '"兵贵神速" หมายถึง ในการแข่งขัน ความเร็วและความฉับไวเป็นหัวใจสำคัญสูงสุด',
          encouragement: 'แม่นยำมาก! เข้าใจหลักการรบและธุรกิจระดับสากล!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "การแข่งขันทางธุรกิจ ความเร็วคือหัวใจสำคัญ"',
          tokens: ['兵贵神速', '商业竞争'],
          correct_sequence: ['商业竞争', '兵贵神速'],
          pinyin: 'Shāngyè jìngzhēng, bīngguìshénsù.',
          meaning_th: 'การแข่งขันทางธุรกิจ ความเร็วคือหัวใจสำคัญ',
          explanation_th: 'บริบท (商业竞争) + คำสอนยุทธศาสตร์ (兵贵神速)',
          encouragement: 'จัดประโยคฉับไวและแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "势" ใน "势如破竹" มีหมวดนำ "力" (พลัง/แรง) ด้านล่าง สื่อถึงอะไร?',
          options: [
            'แรงส่ง กำลัง และโมเมนตัมที่ผลักดันให้ก้าวไปข้างหน้าอย่างทรงพลัง',
            'การใช้แรงงานหนัก',
            'ความเหนื่อยล้าหมดแรง',
            'การยกของหนัก'
          ],
          correct_index: 0,
          explanation_th: '"势" (shì) คือ แนวโน้ม โมเมนตัม และแรงส่ง ซึ่งมีหมวด "力" เป็นรากฐานสำคัญ',
          encouragement: 'มองทะลุโครงสร้างอักษรจีนอย่างลึกซึ้ง!'
        },
        {
          type: 'multiple_choice',
          question_th: 'สำนวน "势如破竹" บรรยายถึงสถานการณ์ใด?',
          options: [
            'การรุกคืบหรือการเติบโตที่ทรงพลัง ราบรื่นไร้สิ่งกีดขวาง',
            'ต้นไผ่ที่หักโค่นในพายุ',
            'การทำงานที่ติดขัดมีอุปสรรคมากมาย',
            'ความพ่ายแพ้อย่างย่อยยับ'
          ],
          correct_index: 0,
          explanation_th: '"势如破竹" เปรียบเหมือนการผ่ากระบอกไม้ไผ่ที่รอยแรกเปิดแล้วที่เหลือจะแยกออกโดยง่าย สื่อถึงความสำเร็จอย่างราบคาบต่อเนื่อง',
          encouragement: 'เข้าใจสำนวนโบราณระดับสูงอย่างถ่องแท้!'
        }
      ],
      boss_challenge: {
        question: 'ในรายงานสรุปผลงานประจำปี หากต้องการเขียนบรรยายว่า "ทีมงานคว้าโอกาสสำคัญ และขยายส่วนแบ่งตลาดอย่างราบคาบไร้สิ่งกีดขวาง" ควรใช้ข้อใด?',
        options: [
          '团队抓住发展契机，以势如破竹之势迅速扩大市场份额。',
          '团队敬而远之，以半途而废之势面对竞争。',
          '团队之所以失败，是因为兵贵神速。',
          '团队出乎意料，放弃了所有决断与契机。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "抓住发展契机" และ "势如破竹" ได้อย่างถูกต้อง สละสลวย และทรงพลัง'
      },
      cheer_trophy: {
        badge_name: 'ผู้นำตัดสินใจฉับไว (Agile Commander)',
        message_th: 'ยอดเยี่ยม! คุณเข้าใจการผสานหลัก 兵贵神速 และ 势如破竹 เข้ากับการบริหารงานยุคดิจิทัลได้อย่างสมบูรณ์แบบ!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u47_l04',
      lesson_number: 4,
      title: {
        zh: '谋攻篇：不战而屈人之兵与共赢博弈',
        th: 'บทรุกด้วยปัญญา: สยบศัตรูโดยมิต้องรบ (百战不殆) และทฤษฎีเกมแห่งชัยชนะร่วม',
        en: 'Strategic Attack: Win Without Fighting & Win-Win Game Theory'
      },
      can_do: {
        th: 'อธิบายมโนทัศน์ขั้นสูงสุดของซุนวู "不战而屈人之兵" และใช้สำนวน 百战不殆, 运筹帷幄 ในการเจรจาสร้างความร่วมมือ',
        en: 'Explain Sun Tzu\'s supreme art "Subduing Enemy Without Fighting" and use idioms "Invincible in 100 Battles" and "Mastermind in the Tent"'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำหลักการ 运筹帷幄 และ 百战不殆 มาสร้างข้อตกลงทางธุรกิจแบบ 共赢!',
      vocabulary: [
        {
          id: 'hsk4_47016',
          hanzi: '百战不殆',
          pinyin: 'bǎizhànbùdài',
          display_pinyin: 'bǎizhànbùdài',
          pinyin_tone: 'bai3zhan4bu4dai4',
          meaning_th: 'รบร้อยครั้งไม่พ่ายแพ้ / ปลอดภัยไร้อันตรายในทุกสมรภูมิ',
          meaning_en: 'invincible in a hundred battles / never in peril',
          radical: '白',
          radical_name_th: 'หมวดสีขาว (白字头)',
          stroke_count: 27,
          mnemonic: 'สู้ศึกนับร้อยครา (百战) แต่ไม่เคยตกอยู่ในอันตรายพ่ายแพ้ (不殆) = รบร้อยครั้งปลอดภัยร้อยครา',
          kid_mnemonic: 'ยอดขุนพลสวมเกราะทองยืนเด่นเป็นสง่าไม่เคยแพ้ใคร = 百战不殆',
          body_gesture: 'ยืนตัวตรงอกผายผึ่งประสานสองมือไว้ด้านหลังอย่างอาจหาญ'
        },
        {
          id: 'hsk4_47017',
          hanzi: '运筹帷幄',
          pinyin: 'yùnchóuwéiwò',
          display_pinyin: 'yùnchóuwéiwò',
          pinyin_tone: 'yun4chou2wei2wo4',
          meaning_th: 'วางแผนกลยุทธ์ในกระโจมบัญชาการ / บัญชาการศึกหยั่งรู้ชัยชนะพันลี้',
          meaning_en: 'devise strategies in a command tent / mastermind operations',
          radical: '辶',
          radical_name_th: 'หมวดการเดิน (走之旁)',
          stroke_count: 43,
          mnemonic: 'หมุนเวียนไม้คำนวณ (运筹) ภายในม่านกระโจมทัพ (帷幄) = บัญชาการศึกแยบยล',
          kid_mnemonic: 'ขงเบ้งโบกพัดขนนกนั่งวางหมากกลยุทธ์ในกระโจม = 运筹帷幄',
          body_gesture: 'มือหนึ่งทำท่าโบกพัดขนนกช้าๆ อย่างสุขุมลุ่มลึก'
        },
        {
          id: 'hsk4_47018',
          hanzi: '不战而胜',
          pinyin: 'bùzhàn\'érshèng',
          display_pinyin: 'bùzhàn\'érshèng',
          pinyin_tone: 'bu4zhan4\'er2sheng4',
          meaning_th: 'ชนะโดยมิต้องทำสงคราม / บรรลุชัยชนะด้วยสติปัญญาและวาทศิลป์',
          meaning_en: 'win without fighting / victory without battle',
          radical: '戈',
          radical_name_th: 'หมวดหอกดาบ (戈字旁)',
          stroke_count: 22,
          mnemonic: 'ไม่ต้องใช้อาวุธรบพุ่ง (不战) แต่กลับได้รับชัยชนะสมบูรณ์ (而胜) = สยบคู่ต่อสู้ด้วยปัญญา',
          kid_mnemonic: 'ยื่นรอยยิ้มและไมตรีจับมือกับคู่แข่งจนกลายมาเป็นเพื่อนรัก = 不战而胜',
          body_gesture: 'ยื่นสองมือออกไปทำท่าจับมือเจรจาอย่างอบอุ่น'
        },
        {
          id: 'hsk4_47019',
          hanzi: '博弈',
          pinyin: 'bóyì',
          display_pinyin: 'bóyì',
          pinyin_tone: 'bo2yi4',
          meaning_th: 'ทฤษฎีเกม / การขับเคี่ยวทางกลยุทธ์และไหวพริบ / การประลองปัญญา',
          meaning_en: 'game theory / strategic gaming / contest of wits',
          radical: '十',
          radical_name_th: 'หมวดสิบ (十字部)',
          stroke_count: 22,
          mnemonic: 'เล่นเกมการพนันขันต่อ (博) และประลองหมากล้อม (弈) = การขับเคี่ยวทางกลยุทธ์',
          kid_mnemonic: 'ผู้เล่นสองคนนั่งจ้องกระดานหมากล้อมคิดกลยุทธ์ = 博弈',
          body_gesture: 'เอานิ้วคีบหมากแล้ววางลงบนกระดานด้วยความสุขุม'
        },
        {
          id: 'hsk4_47020',
          hanzi: '共赢',
          pinyin: 'gòngyíng',
          display_pinyin: 'gòngyíng',
          pinyin_tone: 'gong4ying2',
          meaning_th: 'ชนะร่วมกัน / วิน-วินทั้งสองฝ่าย / ผลประโยชน์ร่วมกัน',
          meaning_en: 'win-win / mutual benefit',
          radical: '贝',
          radical_name_th: 'หมวดหอยเบี้ย/ทรัพย์ (贝字旁)',
          stroke_count: 23,
          mnemonic: 'ร่วมมือร่วมใจ (共) นำมาซึ่งผลกำไรและความสำเร็จ (赢) = ชัยชนะร่วมกัน',
          kid_mnemonic: 'เด็กสองคนช่วยกันต่อเลโก้จนเสร็จแล้วปรบมือดีใจด้วยกัน = 共赢',
          body_gesture: 'ยกสองมือขึ้นประสานกันเหนือศีรษะแสดงความยินดีร่วม'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงสระประสมพิเศษใน 运筹帷幄 (yùnchóuwéiwò)',
        description_th: 'yùn (เสียง 4) chóu (เสียง 2) wéi (เสียง 2) wò (เสียง 4) เสียงวรรณยุกต์ 4 ตกต้นและท้าย สร้างความหนักแน่นโอ่อ่า',
        example: '运筹帷幄之中，决胜千里之外。',
        fun_metaphor: 'เหมือนเสาหินสองต้นค้ำจุนหลังคาพระราชวังโบราณ',
        reassurance: 'สำนวนประวัติศาสตร์ชื่อดังจากราชวงศ์ฮั่น ใช้ชมเชยผู้บริหารระดับสูงที่มีวิสัยทัศน์กว้างไกล'
      },
      grammar_bite: {
        title: 'โครงสร้างระดับปรัชญาสูงสุด: 运筹帷幄，实现互利共赢',
        formula: '在商业博弈中，最高境界是善于运筹帷幄，做到不战而胜，实现[ชัยชนะร่วมกัน]',
        explanation_th: 'ใช้ในการปิดการเจรจาระดับสูง เพื่อเปลี่ยนจากการแข่งขันแบบห้ำหั่น (Zero-sum game) มาเป็นการร่วมมือสร้างสรรค์ (Positive-sum win-win)',
        patterns: [
          {
            formula: '运筹帷幄，才能决胜千里。',
            zh: '领导者只有善于运筹帷幄，才能在激烈的商业博弈中立于不败之地。',
            pinyin: 'Lǐngdǎozhě zhǐyǒu shànyú yùnchóuwéiwò, cái néng zài jīliè de shāngyè bóyì zhōng lì yú bùbài zhī dì.',
            th: 'ผู้นำมีเพียงการเชี่ยวชาญการวางแผนในกระโจมบัญชาการเท่านั้น จึงจะยืนหยัดอย่างไม่พ่ายแพ้ในการประลองไหวพริบทางธุรกิจ',
            en: 'Only by being adept at devising strategies can leaders remain invincible in fierce business gaming.'
          },
          {
            formula: '超越对抗，达成互利共赢。',
            zh: '现代商业追求的不是零和博弈，而是携手合作，实现互利共赢。',
            pinyin: 'Xiàndài shāngyè zhuīqiú de bùshì línghé bóyì, shì xiéshǒu hézuò, shíxiàn hùlì gòngyíng.',
            th: 'สิ่งที่ธุรกิจสมัยใหม่แสวงหาไม่ใช่เกมที่ต้องมีผู้แพ้ผู้ชนะ (Zero-sum) หากแต่คือการจับมือร่วมมือกันเพื่อบรรลุผลประโยชน์ร่วมกัน',
            en: 'Modern business seeks not zero-sum games, but joining hands in cooperation to achieve mutual win-win benefits.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '陈总 (Director Chen) 👔',
          zh: '跨国谈判即将开始，林总监对这次博弈有何预案？',
          pinyin: 'Kuàguó tánpàn jíjiāng kāishǐ, Lín zǒngjiān duì zhè cì bóyì yǒu hé yù\'àn?',
          th: 'การเจรจาข้ามชาติกำลังจะเริ่มต้นแล้ว คุณหลินมีแผนรับมือสำหรับการประลองปัญญาครั้งนี้อย่างไรบ้าง?',
          en: 'The transnational negotiation is about to begin; Director Lin, what contingency plan do you have for this strategic game?',
          audio_trigger: 't4_u47_l04_d01'
        },
        {
          speaker: '林总监 (Director Lin) 👩‍💼',
          zh: '陈总放心，我们团队运筹帷幄，准备了三套互利共赢的合作模型。',
          pinyin: 'Chén zǒng fàngxīn, wǒmen tuánduì yùnchóuwéiwò, zhǔnbèi le sān tào hùlì gòngyíng de hézuò móxíng.',
          th: 'คุณเฉินวางใจได้ค่ะ ทีมของเราวางแผนกลยุทธ์อย่างรอบคอบ เตรียมโมเดลความร่วมมือแบบวิน-วินไว้ถึงสามชุดค่ะ',
          en: 'Rest assured, Director Chen; our team has masterminded the strategy and prepared three win-win cooperation models.',
          audio_trigger: 't4_u47_l04_d02'
        },
        {
          speaker: '陈总 (Director Chen) 👔',
          zh: '善战者不战而屈人之兵，我们要用诚意和实力赢得伙伴信任。',
          pinyin: 'Shànzhànzhě bùzhàn\'érqūrénzhībīng, wǒmen yào yòng chéngyì yǔ shílì yíngdé huǒbàn xìnrèn.',
          th: 'ผู้เชี่ยวชาญการศึกย่อมสยบศัตรูโดยมิต้องรบ พวกเราต้องใช้ความจริงใจและศักยภาพที่แท้จริงเพื่อชนะใจพันธมิตร',
          en: 'Skillful leaders conquer the enemy without fighting; we must use sincerity and capability to win our partners\' trust.',
          audio_trigger: 't4_u47_l04_d03'
        },
        {
          speaker: '林总监 (Director Lin) 👩‍💼',
          zh: '知己知彼则百战不殆，相信这次合作一定能达成完美的共赢局面！',
          pinyin: 'Zhījǐzhībǐ zé bǎizhànbùdài, xiāngxìn zhè cì hézuò yīdìng néng dáchéng wánměi de gòngyíng júmiàn!',
          th: 'รู้เขารู้เราย่อมรบร้อยครั้งไม่พ่าย มั่นใจว่าความร่วมมือครั้งนี้จะต้องบรรลุผลสำเร็จแบบวิน-วินอย่างสมบูรณ์แบบค่ะ!',
          en: 'Knowing ourselves and others ensures invincibility in 100 battles; I believe this cooperation will achieve a perfect win-win outcome!',
          audio_trigger: 't4_u47_l04_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'คำสอนสูงสุดของซุนวู "不战而屈人之兵，善之善者也" หมายถึงอะไร?',
          options: [
            'การสยบคู่ต่อสู้และบรรลุเป้าหมายโดยไม่ต้องใช้กำลังทำสงคราม คือยอดแห่งความยอดเยี่ยม',
            'การหนีทหารเป็นกลยุทธ์ที่ดีที่สุด',
            'การทำสงครามให้ยาวนานที่สุด',
            'การสังหารศัตรูให้หมดสิ้น'
          ],
          correct_index: 0,
          explanation_th: '"不战而屈人之兵" สื่อถึง การใช้สติปัญญา วาทศิลป์ และกลยุทธ์เพื่อคลี่คลายความขัดแย้งโดยไม่ต้องหลั่งเลือด ถือเป็นระดับสูงสุดของพิชัยสงคราม',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจแก่นปรัชญาสูงสุดของซุนวู!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "วางแผนกลยุทธ์ในกระโจม ชนะการรบไกลพันลี้"',
          tokens: ['决胜千里之外', '运筹帷幄之中'],
          correct_sequence: ['运筹帷幄之中', '决胜千里之外'],
          pinyin: 'Yùnchóuwéiwò zhī zhōng, juéshèng qiānlǐ zhī wài.',
          meaning_th: 'วางแผนกลยุทธ์ในกระโจม ชนะการรบไกลพันลี้',
          explanation_th: 'ต้นประโยค (运筹帷幄之中) + ผลลัพธ์ (决胜千里之外)',
          encouragement: 'จัดประโยคสำนวนมหาเสนาบดีได้อย่างสง่างาม!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "赢" (yíng - ชนะ/กำไร) ใน "共赢" มีหมวด "贝" (หอยเบี้ย) อยู่ตรงกลางด้านล่าง สื่อถึงอะไร?',
          options: [
            'ทรัพย์สิน เงินทอง และผลตอบแทนที่มีค่า',
            'เปลือกหอยริมชายหาด',
            'อาหารทะเลเลิศรส',
            'เรือเดินสมุทร'
          ],
          correct_index: 0,
          explanation_th: 'ในอดีต หอยเบี้ย "贝" ใช้แทนเงินตรา จึงสื่อถึงผลตอบแทน กำไร และมูลค่าทรัพย์สิน',
          encouragement: 'จำรากศัพท์เงินตราโบราณได้อย่างแม่นยำ!'
        },
        {
          type: 'multiple_choice',
          question_th: 'แนวคิด "共赢" (Win-Win) แตกต่างจาก "零和博弈" (Zero-sum game) อย่างไร?',
          options: [
            '共赢 เน้นสร้างคุณค่าเพิ่มและผลประโยชน์ร่วมกันทุกฝ่าย ส่วน 零和博弈 ชัยชนะของฝ่ายหนึ่งคือความสูญเสียของอีกฝ่าย',
            '共赢 คือการให้ฝ่ายหนึ่งยอมแพ้ทั้งหมด',
            '零和博弈 คือการแบ่งปันผลกำไรเท่ากัน',
            'ทั้งสองแนวคิดเหมือนกันทุกประการ'
          ],
          correct_index: 0,
          explanation_th: '"共赢" (Positive-sum) คือ ทุกฝ่ายเติบโตไปด้วยกัน ตรงข้ามกับ Zero-sum ที่ผลรวมได้เสียเท่ากับศูนย์',
          encouragement: 'เข้าใจทฤษฎีเกมและกลยุทธ์ความร่วมมือระดับสูง!'
        }
      ],
      boss_challenge: {
        question: 'ในแถลงการณ์ปิดการประชุมความร่วมมือระหว่างประเทศ ประโยคใดสื่อถึงจิตวิญญาณแห่งความร่วมมือแบบซุนวูได้อย่างสมบูรณ์แบบที่สุด?',
        options: [
          '双方善于运筹帷幄，摒弃零和博弈思维，携手实现互利共赢。',
          '双方应当半途而废，避免任何商业合作。',
          '双方敬而远之，出乎意料进行价格战。',
          '双方之所以合作，是为了让对方百战不殆而失败。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "运筹帷幄", "摒弃零和博弈" และ "互利共赢" ได้อย่างสมบูรณ์แบบตามมาตรฐานภาษาเขียนทางการชั้นสูง'
      },
      cheer_trophy: {
        badge_name: 'มหาเสนาธิการผู้หยั่งรู้ชัยชนะ (Mastermind of Strategic Victory)',
        message_th: 'ขอแสดงความยินดีด้วยอย่างยิ่ง! คุณได้พิชิตหน่วยเรียน《孙子兵法》ครบทั้ง 4 ด้าน ตั้งแต่始计 จนถึง 谋攻 ก้าวสู่สุดยอดนักยุทธศาสตร์!',
        xp_reward: 150
      }
    }
  ]
};
