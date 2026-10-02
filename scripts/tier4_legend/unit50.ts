/**
 * scripts/tier4_legend/unit50.ts
 * Unit 50: 宏观经济白皮书与政策解读 (Macroeconomics & Policy White Papers)
 * Tier 4 Legend - Unit 5 (L-05)
 * Strict typing, zero 'any', simplified Chinese only, tone sandhi compliant, interleaving >= 20%.
 */

export const unit50Data = {
  unit_id: 'tier4_u50',
  tier: 4,
  unit_number: 50,
  title: {
    zh: '宏观经济白皮书与政策解读',
    th: 'สมุดปกขาวเศรษฐกิจมหภาคและการตีความนโยบายรัฐ',
    en: 'Macroeconomics White Papers & Policy Interpretation'
  },
  description: 'เจาะลึกศัพท์เศรษฐศาสตร์มหภาค การอ่านรายงานสมุดปกขาวของรัฐบาล และการทำความเข้าใจทิศทางนโยบายการเงินและการคลังระดับชาติ',
  lessons: [
    {
      lesson_id: 't4_u50_l01',
      lesson_number: 1,
      title: {
        zh: '宏观调控：基本指标与政策定调',
        th: 'การควบคุมระดับมหภาค (宏观调控): ดัชนีพื้นฐานและการกำหนดทิศทางนโยบาย',
        en: 'Macro Regulation: Core Indicators & Policy Tone'
      },
      can_do: {
        th: 'อธิบายดัชนีชี้วัดเศรษฐกิจมหภาคและทิศทางนโยบาย เช่น 宏观, 调控, 稳中求进 ในการประชุมวิเคราะห์เศรษฐกิจได้',
        en: 'Explain macroeconomic indicators and policy directions like macro-control and making progress while maintaining stability'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ใช้คำว่า 宏观, 调控 และสำนวน 稳中求进 เพื่อวิเคราะห์แนวโน้มเศรษฐกิจ!',
      vocabulary: [
        {
          id: 'hsk4_5001',
          hanzi: '宏观',
          pinyin: 'hóngguān',
          display_pinyin: 'hóngguān',
          pinyin_tone: 'hong2guan1',
          meaning_th: 'มหภาค / ภาพรวมระดับใหญ่ (ตรงข้ามกับ 微观 - จุลภาค)',
          meaning_en: 'macro / macroscopic / macroeconomic',
          radical: '宀',
          radical_name_th: 'หมวดหลังคาเรือน (宝盖头)',
          stroke_count: 13,
          mnemonic: 'ใต้หลังคาอันยิ่งใหญ่ (宏) เฝ้าทอดสายตามองภาพกว้าง (观) = มหภาค',
          kid_mnemonic: 'ยืนบนยอดเขาสูงมองเห็นแผนที่เมืองทั้งเมือง = 宏观',
          body_gesture: 'ยกสองมือผายออกกว้างสุดแขนแสดงภาพรวมอันยิ่งใหญ่'
        },
        {
          id: 'hsk4_5002',
          hanzi: '调控',
          pinyin: 'tiáokòng',
          display_pinyin: 'tiáokòng',
          pinyin_tone: 'tiao2kong4',
          meaning_th: 'การกำกับดูแลและควบคุมปรับสมดุล (ย่อมาจาก 调节与控制)',
          meaning_en: 'regulate and control / macroeconomic regulation',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 18,
          mnemonic: 'ปรับแต่งด้วยวจี (调) แล้วยึดกุมควบคุมด้วยฝ่ามือ (控) = กำกับควบคุม',
          kid_mnemonic: 'หมุนพวงมาลัยปรับทิศทางเรือใบให้แล่นได้อย่างมั่นคง = 调控',
          body_gesture: 'สองมือทำท่าจับคันบังคับปรับจูนเครื่องยนต์อย่างแม่นยำ'
        },
        {
          id: 'hsk4_5003',
          hanzi: '通胀',
          pinyin: 'tōngzhàng',
          display_pinyin: 'tōngzhàng',
          pinyin_tone: 'tong1zhang4',
          meaning_th: 'ภาวะเงินเฟ้อ (ย่อมาจาก 通货膨胀)',
          meaning_en: 'inflation (short for 通货膨胀)',
          radical: '辶',
          radical_name_th: 'หมวดทางเดิน (走之底)',
          stroke_count: 20,
          mnemonic: 'เงินตราไหลเวียนสะพัดไปทั่ว (通) จนพองบวมเป่งขึ้น (胀) = เงินเฟ้อ',
          kid_mnemonic: 'เป่าลูกโป่งราคาของจนพองโตคับห้อง = 通胀',
          body_gesture: 'ทำสองมือประสานเป็นก้อนกลมแล้วค่อยๆ ขยายขนาดให้พองโต'
        },
        {
          id: 'hsk4_5004',
          hanzi: '增幅',
          pinyin: 'zēngfú',
          display_pinyin: 'zēngfú',
          pinyin_tone: 'zeng1fu2',
          meaning_th: 'อัตราการเติบโต / ช่วงกว้างของการเพิ่มขึ้น',
          meaning_en: 'growth rate / extent of increase / range of growth',
          radical: '土',
          radical_name_th: 'หมวดผืนดิน (提土旁)',
          stroke_count: 26,
          mnemonic: 'พูนดินเพิ่มขึ้นทวีคูณ (增) ขยายขอบเขตความกว้างของผืนผ้า (幅) = อัตราการเพิ่มขึ้น',
          kid_mnemonic: 'วาดกราฟเส้นทะยานสูงขึ้นจากพื้น = 增幅',
          body_gesture: 'ใช้ฝ่ามือวาดเส้นเฉียงขึ้นสู่ท้องฟ้า'
        },
        {
          id: 'hsk4_5005',
          hanzi: '稳中求进',
          pinyin: 'wěnzhōngqiújìn',
          display_pinyin: 'wěnzhōngqiújìn',
          pinyin_tone: 'wen3zhong1qiu2jin4',
          meaning_th: 'แสวงหาความก้าวหน้าบนพื้นฐานความมั่นคง (นโยบายเศรษฐกิจหลักของจีน)',
          meaning_en: 'seeking progress while maintaining stability',
          radical: '禾',
          radical_name_th: 'หมวดรวงข้าว (禾木旁)',
          stroke_count: 28,
          mnemonic: 'รวงข้าวหนักแน่นมั่นคง (稳) มุ่งแสวงหา (求) ก้าวหน้าไปข้างหน้า (进) = ก้าวหน้าอย่างมั่นคง',
          kid_mnemonic: 'เดินก้าวอย่างมั่นคงทีละขั้น ไม่หกล้ม และปีนขึ้นสู่จุดสูงสุด = 稳中求进',
          body_gesture: 'ก้าวเท้าหนักแน่นไปข้างหน้าหนึ่งก้าวพร้อมกำหมัดชูขึ้น'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 稳中求进 (wěnzhōngqiújìn)',
        description_th: 'wěn (เสียง 3) zhōng (เสียง 1) qiú (เสียง 2) jìn (เสียง 4)',
        example: '坚持稳中求进工作总基调 (Jiānchí wěnzhōngqiújìn gōngzuò zǒngjīdiào)',
        fun_metaphor: 'เหมือนจังหวะกลองรบที่เดินหน้าอย่างเป็นระเบียบและหนักแน่น',
        reassurance: 'เป็นคีย์เวิร์ดระดับชาติที่พบในรายงานการประชุมเศรษฐกิจทุกปี'
      },
      grammar_bite: {
        title: 'โครงสร้างนโยบายมหภาค: 坚持……总基调，加强宏观调控',
        formula: '坚持稳中求进工作总基调，加强宏观调控，保持经济平稳运行',
        explanation_th: 'ใช้ในการนำเสนอรายงานเศรษฐกิจและวิเคราะห์ทิศทางนโยบายของรัฐบาล',
        patterns: [
          {
            formula: '坚持稳中求进，有效遏制通胀。',
            zh: '我们必须坚持稳中求进，加强宏观调控，有效遏制通胀预期。',
            pinyin: 'Wǒmen bìxū jiānchí wěnzhōngqiújìn, jiāqiáng hóngguān tiáokòng, yǒuxiào èzhì tōngzhàng yùqī.',
            th: 'พวกเราต้องยึดมั่นในการแสวงหาความก้าวหน้าบนพื้นฐานความมั่นคง เสริมสร้างการกำกับดูแลระดับมหภาค และควบคุมการคาดการณ์เงินเฟ้ออย่างมีประสิทธิภาพ',
            en: 'We must adhere to seeking progress while maintaining stability, strengthen macro-control, and effectively curb inflation expectations.'
          },
          {
            formula: '保持平稳增幅，推动高质量发展。',
            zh: '今年前三季度国民经济保持合理增幅，展现了强大的发展韧性。',
            pinyin: 'Jīnnián qiánsān jìdù guómín jīngjì bǎochí hélǐ zēngfú, zhǎnxiàn le qiángdà de fāzhǎn rènxìng.',
            th: 'เศรษฐกิจของชาติในสามไตรมาสแรกของปีนี้รักษาอัตราการเติบโตอย่างสมเหตุสมผล สะท้อนถึงความยืดหยุ่นแข็งแกร่งในการพัฒนา',
            en: 'In the first three quarters of this year, the national economy maintained a reasonable growth rate, demonstrating strong developmental resilience.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '首席分析师 (Chief Analyst) 📊',
          zh: '张总，国家统计局刚发布了前三季度宏观经济数据，GDP增幅符合稳中求进的预期。',
          pinyin: 'Zhāng zǒng, guójiā tǒngjìjú gāng fābù le qiánsān jìdù hóngguān jīngjì shùjù, GDP zēngfú fúhé wěnzhōngqiújìn de yùqī.',
          th: 'คุณจางครับ สำนักงานสถิติแห่งชาติเพิ่งประกาศข้อมูลเศรษฐกิจมหภาคสามไตรมาสแรก อัตราการเติบโตของ GDP สอดคล้องกับความคาดหมายเรื่องการก้าวหน้าอย่างมั่นคงครับ',
          en: 'Director Zhang, the National Bureau of Statistics just released macroeconomic data for the first three quarters; GDP growth conforms to expectations of seeking progress while maintaining stability.',
          audio_trigger: 't4_u50_l01_d01'
        },
        {
          speaker: '张总 (Director Zhang) 👔',
          zh: '很好。当前全球通胀压力仍然较大，我们团队在经贸谈判与投资中必须权衡利弊。',
          pinyin: 'Hěn hǎo. Dāngqián quánqiú tōngzhàng yālì réngrán jiàodà, wǒmen tuánduì zài jīngmào tánpàn yǔ tóuzī zhōng bìxū quánhéng lìbì.',
          th: 'ดีมาก แรงกดดันเงินเฟ้อทั่วโลกในปัจจุบันยังคงค่อนข้างสูง ทีมงานของเราต้องชั่งน้ำหนักผลได้ผลเสียในการเจรจาการค้าและการลงทุน',
          en: 'Very good. Current global inflationary pressure remains significant; our team must weigh pros and cons during trade negotiations and investments.',
          audio_trigger: 't4_u50_l01_d02'
        },
        {
          speaker: '首席分析师 (Chief Analyst) 📊',
          zh: '是的，央行正在加大宏观调控力度，精准实施货币政策，确保市场流动性合理充裕。',
          pinyin: 'Shì de, yāngháng zhèngzài jiādà hóngguān tiáokòng lìdù, jīngzhǔn shíshī huòbì zhèngcè, quèbǎo shìchǎng liúdòngxìng hélǐ chōngyù.',
          th: 'ถูกต้องครับ ธนาคารกลางกำลังเพิ่มระดับการกำกับดูแลมหภาค ดำเนินนโยบายการเงินอย่างแม่นยำ เพื่อให้สภาพคล่องในตลาดมีความเพียงพอและสมเหตุสมผล',
          en: 'Yes, the central bank is intensifying macro-control and implementing targeted monetary policies to ensure reasonable and ample market liquidity.',
          audio_trigger: 't4_u50_l01_d03'
        },
        {
          speaker: '张总 (Director Zhang) 👔',
          zh: '我们要温故知新、实事求是，抓住产业转型的历史契机，实现低碳创新与互利共赢。',
          pinyin: 'Wǒmen yào wēngùzhīxīn, shíshìqiúshì, zhuāzhù chǎnyè zhuǎnxíng de lìshǐ qìjī, shíxiàn dītàn chuàngxīn yǔ hùlì gòngyíng.',
          th: 'พวกเราต้องทบทวนอดีตเพื่อสร้างสรรค์ใหม่ ยึดความจริงเป็นหลัก คว้าโอกาสทางประวัติศาสตร์แห่งการเปลี่ยนผ่านอุตสาหกรรม เพื่อบรรลุนวัตกรรมคาร์บอนต่ำและชัยชนะร่วมกัน',
          en: 'We should gain new insights by reviewing the past, seek truth from facts, seize historical opportunities of industrial transformation, and achieve low-carbon innovation and mutual win-win.',
          audio_trigger: 't4_u50_l01_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'สำนวนนโยบาย "稳中求进" (wěnzhōngqiújìn) มีความหมายแกนกลางว่าอย่างไร?',
          options: [
            'การรักษาเสถียรภาพความมั่นคงเป็นฐาน แล้วต่อยอดแสวงหาการพัฒนาที่ก้าวหน้า',
            'การเร่งขยายตัวทางเศรษฐกิจแบบก้าวกระโดดโดยไม่คำนึงถึงความเสี่ยง',
            'การหยุดนิ่งอยู่กับที่เพื่อรอให้วิกฤตเศรษฐกิจผ่านพ้นไปเอง',
            'การปิดประเทศไม่พึ่งพาการค้าต่างประเทศ'
          ],
          correct_index: 0,
          explanation_th: '"稳中求进" คือ การก้าวหน้าอย่างมั่นคง ไม่ใจร้อนวู่วาม แต่ไม่หยุดนิ่ง',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจแก่นนโยบายเศรษฐกิจระดับชาติ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "เสริมสร้างการกำกับดูแลมหภาค แสวงหาความก้าวหน้าอย่างมั่นคง"',
          tokens: ['坚持稳中求进', '加强宏观调控'],
          correct_sequence: ['加强宏观调控', '坚持稳中求进'],
          pinyin: 'Jiāqiáng hóngguān tiáokòng, jiānchí wěnzhōngqiújìn.',
          meaning_th: 'เสริมสร้างการกำกับดูแลมหภาค แสวงหาความก้าวหน้าอย่างมั่นคง',
          explanation_th: 'มาตรการ (加强宏观调控) + ทิศทางนโยบาย (坚持稳中求进)',
          encouragement: 'จัดประโยควิเคราะห์เศรษฐกิจได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "胀" (zhàng - พอง/เฟ้อ) ใน "通胀" มีหมวดนำ "月" (เนื้อ/ร่างกาย 肉) สื่อถึงอะไร?',
          options: [
            'การบวมพองขยายตัวขึ้นเหมือนผิวหนังหรือร่างกายที่บวมน้ำ',
            'แสงจันทร์ยามค่ำคืน',
            'เรือเดินสมุทร',
            'อาวุธสงครามโบราณ'
          ],
          correct_index: 0,
          explanation_th: '"月" (ในที่นี้คือหมวดเนื้อ 肉) สื่อถึงสิ่งที่ขยายตัวบวมพองขึ้นมา จึงใช้กับเงินเฟ้อ (通胀)',
          encouragement: 'จำความหมายรากศัพท์ได้อย่างลึกซึ้ง!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "宏观" (hóngguān) ในทางเศรษฐศาสตร์ตรงข้ามกับคำว่าอะไร?',
          options: [
            '微观 (wēiguān - จุลภาค)',
            '客观 (kèguān - ภววิสัย)',
            '悲观 (bēiguān - มองโลกในแง่ร้าย)',
            '乐观 (lèguān - มองโลกในแง่ดี)'
          ],
          correct_index: 0,
          explanation_th: '"宏观" (Macro) ตรงข้ามกับ "微观" (Micro)',
          encouragement: 'เข้าใจคู่คำศัพท์วิชาการได้อย่างแม่นยำ!'
        }
      ],
      boss_challenge: {
        question: 'ในบทบรรณาธิการเศรษฐกิจ ประโยคใดสรุปมาตรการควบคุมเงินเฟ้อได้อย่างถูกต้องตามแบบแผนสากล?',
        options: [
          '政府加强宏观调控，坚持稳中求进，有效应对全球通胀压力。',
          '公关团队鉴于形势权衡利弊，以便协调谈判与澄清。',
          '企业团队致力于创新低碳，在合同条款中达成共识。',
          '古为今用与和而不同相得益彰，知己知彼百战不殆。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "加强宏观调控", "稳中求进" และ "应对通胀" ได้อย่างถูกต้องตามหลักวิชาการเศรษฐศาสตร์'
      },
      cheer_trophy: {
        badge_name: 'นักวิเคราะห์มหภาค (Macroeconomic Analyst)',
        message_th: 'ยินดีด้วย! คุณเชี่ยวชาญคำศัพท์ 宏观, 调控 และ 稳中求进 พร้อมวิเคราะห์แนวโน้มเศรษฐกิจระดับชาติ!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u50_l02',
      lesson_number: 2,
      title: {
        zh: '货币与财政：流动性与金融工具',
        th: 'นโยบายการเงินและการคลัง: สภาพคล่องและเครื่องมือทางการเงิน',
        en: 'Monetary & Fiscal Policy: Liquidity & Financial Instruments'
      },
      can_do: {
        th: 'ใช้คำศัพท์เกี่ยวกับนโยบายการเงินและการคลัง เช่น 货币, 财政, 流动性, 利率, 逆周期 ในการเขียนบทความการเงินได้',
        en: 'Master fiscal and monetary terms: Currency/Monetary, Fiscal, Liquidity, Interest Rate, and Counter-cyclical'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำคำว่า 财政, 流动性 และ 逆周期 ไปใช้ในการอธิบายกลไกตลาดเงิน!',
      vocabulary: [
        {
          id: 'hsk4_5006',
          hanzi: '货币',
          pinyin: 'huòbì',
          display_pinyin: 'huòbì',
          pinyin_tone: 'huo4bi4',
          meaning_th: 'เงินตรา / นโยบายการเงิน (货币政策)',
          meaning_en: 'currency / money / monetary',
          radical: '贝',
          radical_name_th: 'หมวดหอยเบี้ย (贝字旁)',
          stroke_count: 12,
          mnemonic: 'แลกเปลี่ยนสินค้าด้วยเปลือกหอยเบี้ยโบราณ (货) ทำเป็นเหรียญเงินตรา (币) = เงินตรา',
          kid_mnemonic: 'หยอดเหรียญทองลงกระปุกออมสินรูปกระต่าย = 货币',
          body_gesture: 'ใช้นิ้วโป้งและนิ้วชี้ประกบกันเป็นวงกลมเหมือนเหรียญกษาปณ์'
        },
        {
          id: 'hsk4_5007',
          hanzi: '财政',
          pinyin: 'cáizhèng',
          display_pinyin: 'cáizhèng',
          pinyin_tone: 'cai2zheng4',
          meaning_th: 'การคลัง / การเงินของภาครัฐ (财政政策)',
          meaning_en: 'finance / public finance / fiscal',
          radical: '贝',
          radical_name_th: 'หมวดหอยเบี้ย (贝字旁)',
          stroke_count: 16,
          mnemonic: 'บริหารทรัพย์สินเงินทอง (财) ให้ดำเนินไปอย่างถูกต้องเป็นธรรม (政) = การคลัง',
          kid_mnemonic: 'คุณลุงคลังจังหวัดเปิดตู้เซฟจัดสรรงบประมาณสร้างโรงเรียน = 财政',
          body_gesture: 'สองมือทำท่าเปิดสมุดบัญชีตรวจตรางบประมาณ'
        },
        {
          id: 'hsk4_5008',
          hanzi: '流动性',
          pinyin: 'liúdòngxìng',
          display_pinyin: 'liúdòngxìng',
          pinyin_tone: 'liu2dong4xing4',
          meaning_th: 'สภาพคล่อง (ทางการเงิน / ในระบบธนาคาร)',
          meaning_en: 'liquidity (financial)',
          radical: '氵',
          radical_name_th: 'หมวดน้ำสามหยด (三点水)',
          stroke_count: 24,
          mnemonic: 'สายน้ำไหลเวียน (流) ขยับเขยื้อนอย่างคล่องตัว (动) มีคุณลักษณะยืดหยุ่น (性) = สภาพคล่อง',
          kid_mnemonic: 'แม่น้ำใสไหลหล่อเลี้ยงทุ่งนาให้ชุ่มชื้นไม่มีวันแห้งแล้ง = 流动性',
          body_gesture: 'สองมือทำท่าคลื่นน้ำไหลเอื่อยๆ ต่อเนื่อง'
        },
        {
          id: 'hsk4_5009',
          hanzi: '利率',
          pinyin: 'lìlǜ',
          display_pinyin: 'lìlǜ',
          pinyin_tone: 'li4lü4',
          meaning_th: 'อัตราดอกเบี้ย (เช่น 基准利率 - อัตราดอกเบี้ยนโยบาย)',
          meaning_en: 'interest rate',
          radical: '禾',
          radical_name_th: 'หมวดรวงข้าว (禾木旁)',
          stroke_count: 18,
          mnemonic: 'ผลประโยชน์งอกเงยจากต้นข้าว (利) วัดเป็นสัดส่วนร้อยละ (率) = อัตราดอกเบี้ย',
          kid_mnemonic: 'ต้นไม้งอกใบใหม่เพิ่มขึ้นตามเปอร์เซ็นต์ปุ๋ย = 利率',
          body_gesture: 'ชูนิ้วชี้ขึ้นแสดงอัตราตัวเลขที่ขยับขึ้นลง'
        },
        {
          id: 'hsk4_5010',
          hanzi: '逆周期',
          pinyin: 'nìzhōuqī',
          display_pinyin: 'nìzhōuqī',
          pinyin_tone: 'ni4zhou1qi1',
          meaning_th: 'การปรับตัวทวนวัฏจักรเศรษฐกิจ (Counter-cyclical / เช่น ลดดอกเบี้ยตอนเศรษฐกิจซบเซา)',
          meaning_en: 'counter-cyclical',
          radical: '辶',
          radical_name_th: 'หมวดทางเดิน (走之底)',
          stroke_count: 27,
          mnemonic: 'ก้าวทวนกระแสน้ำ (逆) ในวงรอบแห่งกาลเวลา (周期) = ทวนวัฏจักร',
          kid_mnemonic: 'ว่ายน้ำต้านคลื่นลมเพื่อช่วยพยุงเพื่อนให้ปลอดภัย = 逆周期',
          body_gesture: 'กางสองแขนผลักไปข้างหน้าต้านแรงลม'
        }
      ],
      tone_rule: {
        rule_name: 'การอ่าน 逆周期 (nìzhōuqī)',
        description_th: 'nì (เสียง 4) zhōu (เสียง 1) qī (เสียง 1)',
        example: '逆周期调节 (Nìzhōuqī tiáojié)',
        fun_metaphor: 'ทวนคลื่นลมแห่งวัฏจักรเศรษฐกิจเพื่อพยุงให้เรือแล่นนิ่ง',
        reassurance: 'คำว่า 逆 หมายถึง สวนทางหรือต้านแรง (Counter-) มักคู่กับ 调节'
      },
      grammar_bite: {
        title: 'โครงสร้างนโยบายการเงิน: 实施……政策，保持流动性充裕',
        formula: '精准有力实施稳健的货币政策，强化逆周期调节，保持流动性合理充裕',
        explanation_th: 'ใช้ในรายงานการประชุมของคณะกรรมการนโยบายการเงินและธนาคารกลาง',
        patterns: [
          {
            formula: '实施积极的财政政策，加大调控力度。',
            zh: '国家将继续实施积极的财政政策，支持实体经济恢复与发展。',
            pinyin: 'Guójiā jiāng jìxù shíshī jījí de cáizhèng zhèngcè, zhīchí shítǐ jīngjì huīfù yǔ fāzhǎn.',
            th: 'รัฐบาลจะยังคงดำเนินนโยบายการคลังเชิงรุก เพื่อสนับสนุนการฟื้นตัวและการพัฒนาของภาคเศรษฐกิจจริง',
            en: 'The state will continue to implement proactive fiscal policies to support the recovery and development of the real economy.'
          },
          {
            formula: '强化逆周期调节，稳定市场预期。',
            zh: '央行通过下调存款准备金率与基准利率，有效释放了中长期流动性。',
            pinyin: 'Yāngháng tōngguò xiàtiáo cúnkuǎn zhǔnbèijīn lǜ yǔ jīzhǔn lìlǜ, yǒuxiào shìfàng le zhōngchángqī liúdòngxìng.',
            th: 'ธนาคารกลางได้ปล่อยสภาพคล่องระยะปานกลางและระยะยาวอย่างมีประสิทธิภาพ ผ่านการปรับลดอัตราส่วนกันสำรองและอัตราดอกเบี้ยนโยบาย',
            en: 'The central bank effectively released medium-to-long-term liquidity by lowering the reserve requirement ratio and benchmark interest rates.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '投资总监 (CIO) 💼',
          zh: '大家请注意，央行宣布下调金融机构存款准备金率0.25个百分点，强化逆周期调节。',
          pinyin: 'Dàjiā qǐng zhùyì, yāngháng xuānbù xiàtiáo jīnróng jīgòu cúnkuǎn zhǔnbèijīn lǜ líng diǎn èrwǔ gè bǎifēndiǎn, qiánghuà nìzhōuqī tiáojié.',
          th: 'ทุกท่านโปรดสังเกต ธนาคารกลางประกาศลดอัตราส่วนเงินสำรองของสถาบันการเงินลง 0.25% เพื่อเสริมสร้างการปรับตัวทวนวัฏจักรครับ',
          en: 'Everyone please note, the central bank announced a 0.25 percentage point cut in the reserve requirement ratio for financial institutions to strengthen counter-cyclical adjustment.',
          audio_trigger: 't4_u50_l02_d01'
        },
        {
          speaker: '基金经理 (Fund Manager) 📈',
          zh: '这一举措向金融市场释放了充裕的流动性，对于降低实体企业融资成本至关重要。',
          pinyin: 'Zhè yī jǔcuò xiàng jīnróng shìchǎng shìfàng le chōngyù de liúdòngxìng, duìyú jiàngdī shítǐ qǐyè róngzī chéngběn zhìguān zhòngyào.',
          th: 'มาตรการนี้ปล่อยสภาพคล่องอย่างเพียงพอสู่ตลาดการเงิน ซึ่งมีความสำคัญอย่างยิ่งต่อการลดต้นทุนทางการเงินของภาคธุรกิจจริงครับ',
          en: 'This move released ample liquidity into the financial market, which is crucial for lowering financing costs for real economy enterprises.',
          audio_trigger: 't4_u50_l02_d02'
        },
        {
          speaker: '投资总监 (CIO) 💼',
          zh: '同时，积极的财政政策也在协同发力，专项债券发行提速，为基础设施投资保驾护航。',
          pinyin: 'Tóngshí, jījí de cáizhèng zhèngcè yě zài xiétóng fālì, zhuānxiàng zhàichuàn fāxíng tísù, wèi jīchǔ shèshī tóuzī bǎojià hùháng.',
          th: 'ในขณะเดียวกัน นโยบายการคลังเชิงรุกก็กำลังประสานพลัง การออกพันธบัตรเฉพาะกิจเร่งตัวขึ้น ช่วยคุ้มกันการลงทุนในโครงสร้างพื้นฐาน',
          en: 'Meanwhile, proactive fiscal policy is also exerting concerted efforts; the issuance of special bonds has accelerated, escorting infrastructure investment.',
          audio_trigger: 't4_u50_l02_d03'
        },
        {
          speaker: '基金经理 (Fund Manager) 📈',
          zh: '只要货币政策与财政政策紧密配合，我们对下半年的资本市场表现充满信心！',
          pinyin: 'Zhǐyào huòbì zhèngcè yǔ cáizhèng zhèngcè jǐnmì pèihé, wǒmen duì xiàbànnián de zīběn shìchǎng biǎoxiàn chōngmǎn xìnxīn!',
          th: 'ขอเพียงนโยบายการเงินและนโยบายการคลังสอดประสานกันอย่างใกล้ชิด พวกเราก็เต็มเปี่ยมไปด้วยความมั่นใจในตลาดทุนครึ่งปีหลังครับ!',
          en: 'As long as monetary policy and fiscal policy coordinate closely, we are full of confidence in the performance of the capital market in the second half of the year!',
          audio_trigger: 't4_u50_l02_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "逆周期调节" (Counter-cyclical regulation) มีเป้าหมายหลักเพื่ออะไร?',
          options: [
            'เพื่อลดความผันผวนของระบบเศรษฐกิจ โดยใช้มาตรการสวนทางกับภาวะขึ้นลงของตลาด',
            'เพื่อให้ราคาสินค้าปรับตัวแพงขึ้นเรื่อยๆ',
            'เพื่อยกเลิกการเก็บภาษีทุกประเภท',
            'เพื่อปิดตลาดหลักทรัพย์'
          ],
          correct_index: 0,
          explanation_th: '"逆周期调节" คือ การดำเนินนโยบายสวนทางกับวงจรร้อนแรงหรือซบเซาเพื่อรักษาเสถียรภาพ',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจกลไกการเงินชั้นสูงอย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ปล่อยสภาพคล่องในตลาด เสริมสร้างการปรับทวนวัฏจักร"',
          tokens: ['强化逆周期调节', '释放市场流动性'],
          correct_sequence: ['释放市场流动性', '强化逆周期调节'],
          pinyin: 'Shìfàng shìchǎng liúdòngxìng, qiánghuà nìzhōuqī tiáojié.',
          meaning_th: 'ปล่อยสภาพคล่องในตลาด เสริมสร้างการปรับทวนวัฏจักร',
          explanation_th: 'การปล่อยสภาพคล่อง (释放市场流动性) + เสริมการปรับสมดุล (强化逆周期调节)',
          encouragement: 'จัดประโยควิเคราะห์ตลาดเงินได้อย่างเฉียบคม!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "币" (bì - เงินตรา) ใน "货币" มีหมวดนำ "巾" (ผ้า) สื่อถึงประวัติศาสตร์การเงินอย่างไร?',
          options: [
            'ในยุคโบราณ ผ้าไหมและแพรพรรณเคยถูกใช้เป็นสิ่งของมีค่าในการแลกเปลี่ยนแทนเงินตรา',
            'ผ้าเช็ดหน้าทำความสะอาด',
            'ผ้าม่านในห้องนอน',
            'ผ้าพันแผลทหาร'
          ],
          correct_index: 0,
          explanation_th: '"巾" คือผ้าผืน ในอดีตผ้าไหมเคยเป็นสื่อกลางการแลกเปลี่ยนสินค้าที่มีค่าดั่งเงินตรา (币)',
          encouragement: 'จำประวัติศาสตร์วิวัฒนาการเงินตราได้อย่างน่าทึ่ง!'
        },
        {
          type: 'multiple_choice',
          question_th: 'หน่วยงานใดของจีนที่มีหน้าที่รับผิดชอบนโยบาย "货币政策" (Monetary Policy)?',
          options: [
            '中国人民银行 (PBOC - ธนาคารประชาชนแห่งประเทศจีน / แบงก์ชาติ)',
            '财政部 (กระทรวงการคลัง)',
            '商务部 (กระทรวงพาณิชย์)',
            '外交部 (กระทรวงการต่างประเทศ)'
          ],
          correct_index: 0,
          explanation_th: 'ธนาคารกลาง (中国人民银行) ดูแล "货币政策" (นโยบายการเงิน) ส่วนกระทรวงการคลังดูแล "财政政策" (นโยบายการคลัง)',
          encouragement: 'มีความรู้รอบตัวด้านโครงสร้างองค์กรเศรษฐกิจจีนอย่างแท้จริง!'
        }
      ],
      boss_challenge: {
        question: 'ในรายงานวิเคราะห์นโยบายของสถาบันวิจัยการเงิน ประโยคใดสื่อถึงการผสานนโยบายการเงินและการคลังได้อย่างถูกต้องสมบูรณ์?',
        options: [
          '积极的财政政策加力提效，稳健的货币政策精准有力，保持市场流动性合理充裕。',
          '双方团队在合同条款与仲裁谈判中权衡利弊，以便达成共识。',
          '公关发言人迅速响应媒体舆论，实事求是进行官方澄清。',
          '温故知新方能博大精深，知己知彼运筹帷幄。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกระบุทั้ง "财政政策加力提效" และ "货币政策精准有力" พร้อม "流动性合理充裕" ตามสูตรนโยบายรัฐบาลอย่างแม่นยำ'
      },
      cheer_trophy: {
        badge_name: 'ผู้เชี่ยวชาญนโยบายการเงิน (Monetary Policy Specialist)',
        message_th: 'ยอดเยี่ยม! คุณเข้าใจกลไก 货币, 财政, 流动性 และ 逆周期 อย่างลึกซึ้ง พร้อมวิเคราะห์รายงานการเงินระดับชาติ!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u50_l03',
      lesson_number: 3,
      title: {
        zh: '产业升级：供给侧与高质量发展',
        th: 'การยกระดับอุตสาหกรรม (产业升级): ด้านอุปทานและการพัฒนาคุณภาพสูง',
        en: 'Industrial Upgrading: Supply-Side & High-Quality Development'
      },
      can_do: {
        th: 'ใช้คำศัพท์ทางเศรษฐกิจอุตสาหกรรม เช่น 升级, 供给侧, 附加值, 实体经济, 新动能 ในการอภิปรายทิศทางธุรกิจได้',
        en: 'Discuss industrial strategies using terms: Upgrading, Supply-Side, Added Value, Real Economy, and New Drivers'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำคำว่า 供给侧, 附加值 และ 新动能 ไปใช้วิเคราะห์การเติบโตของอุตสาหกรรมใหม่!',
      vocabulary: [
        {
          id: 'hsk4_5011',
          hanzi: '升级',
          pinyin: 'shēngjí',
          display_pinyin: 'shēngjí',
          pinyin_tone: 'sheng1ji2',
          meaning_th: 'การยกระดับ / อัปเกรด (เช่น 产业升级 - การยกระดับอุตสาหกรรม)',
          meaning_en: 'upgrade / escalate / elevate to a higher level',
          radical: '十',
          radical_name_th: 'หมวดสิบ (十字儿)',
          stroke_count: 10,
          mnemonic: 'พระอาทิตย์ขึ้นสู่เบื้องบน (升) ขยับเลื่อนขึ้นสู่ระดับขั้นใหม่ (级) = ยกระดับ',
          kid_mnemonic: 'เลเวลในเกมอัปเกรดจากระดับบรอนซ์เป็นระดับโกลด์ = 升级',
          body_gesture: 'กำสองมือแล้วค่อยๆ ชูขึ้นเหนือศีรษะแสดงการก้าวขึ้นสู่ระดับสูง'
        },
        {
          id: 'hsk4_5012',
          hanzi: '供给侧',
          pinyin: 'gōngjǐcè',
          display_pinyin: 'gōngjǐcè',
          pinyin_tone: 'gong1ji3ce4',
          meaning_th: 'ด้านอุปทาน / ฝั่งการผลิตและบริการ (เช่น 供给侧结构性改革)',
          meaning_en: 'supply-side (as in supply-side structural reform)',
          radical: '亻',
          radical_name_th: 'หมวดคน (单人旁)',
          stroke_count: 26,
          mnemonic: 'คนมอบสิ่งของให้ (供) จัดหาข้าวของอย่างทั่วถึง (给) ด้านข้างโครงสร้าง (侧) = ด้านอุปทาน',
          kid_mnemonic: 'โรงงานผลิตสินค้าคุณภาพสูงส่งตรงถึงมือผู้บริโภค = 供给侧',
          body_gesture: 'สองมือทำท่ายื่นส่งสินค้าจากฝั่งผู้ผลิต'
        },
        {
          id: 'hsk4_5013',
          hanzi: '附加值',
          pinyin: 'fùjiāzhí',
          display_pinyin: 'fùjiāzhí',
          pinyin_tone: 'fu4jia1zhi2',
          meaning_th: 'มูลค่าเพิ่ม (Value-added / เช่น 高附加值产业 - อุตสาหกรรมมูลค่าเพิ่มสูง)',
          meaning_en: 'added value / value-added',
          radical: '阝',
          radical_name_th: 'หมวดหูซ้าย (左耳旁)',
          stroke_count: 23,
          mnemonic: 'แนบต่อเติมเสริม (附) เพิ่มพูนแรงพลัง (加) สร้างคุณค่าและราคา (值) = มูลค่าเพิ่ม',
          kid_mnemonic: 'เปลี่ยนก้อนดินเหนียวธรรมดาให้กลายเป็นแจกันลายครามราคาแพง = 附加值',
          body_gesture: 'สองมือทำท่าประคองสิ่งของล้ำค่าแสดงมูลค่ามหาศาล'
        },
        {
          id: 'hsk4_5014',
          hanzi: '实体经济',
          pinyin: 'shítǐjīngjì',
          display_pinyin: 'shítǐjīngjì',
          pinyin_tone: 'shi2ti3jing1ji4',
          meaning_th: 'เศรษฐกิจจริง / ภาคเศรษฐกิจที่ผลิตสินค้าและบริการจริง (ตรงข้ามกับ 虚拟经济 - เศรษฐกิจเสมือน/เก็งกำไร)',
          meaning_en: 'real economy (manufacturing, agriculture, and real services)',
          radical: '宀',
          radical_name_th: 'หมวดหลังคาเรือน (宝盖头)',
          stroke_count: 32,
          mnemonic: 'ความจริงแท้จับต้องได้ (实) เป็นรูปธรรมแห่งกาย (体) ขับเคลื่อนเศรษฐกิจ (经济) = เศรษฐกิจจริง',
          kid_mnemonic: 'โรงงานผลิตรถยนต์และทุ่งนาปลูกข้าวที่จับต้องได้จริง = 实体经济',
          body_gesture: 'กำสองหมัดเคาะลงบนโต๊ะแสดงความหนักแน่นจับต้องได้'
        },
        {
          id: 'hsk4_5015',
          hanzi: '新动能',
          pinyin: 'xīndòngnéng',
          display_pinyin: 'xīndòngnéng',
          pinyin_tone: 'xin1dong4neng2',
          meaning_th: 'พลังขับเคลื่อนใหม่ / เครื่องยนต์เศรษฐกิจตัวใหม่ (เช่น AI, พลังงานสีเขียว)',
          meaning_en: 'new growth drivers / new momentum',
          radical: '斤',
          radical_name_th: 'หมวดขวาน (斤字旁)',
          stroke_count: 29,
          mnemonic: 'สิ่งใหม่เอี่ยม (新) ก่อกำเนิดการเคลื่อนไหว (动) และพลังอำนาจมหาศาล (能) = พลังขับเคลื่อนใหม่',
          kid_mnemonic: 'จรวดติดเครื่องยนต์พลังงานไฮโดรเจนพุ่งทะยานสู่ท้องฟ้า = 新动能',
          body_gesture: 'กำหมัดขวาชูขึ้นฟ้าอย่างทรงพลัง'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 供给侧 (gōngjǐcè)',
        description_th: 'gōng (เสียง 1) jǐ (เสียง 3 ออกเสียง jǐ ไม่ใช่ gěi) cè (เสียง 4)',
        example: '供给侧结构性改革 (Gōngjǐcè jiégòuxìng gǎigé)',
        fun_metaphor: 'คำว่า 给 ในบริบทนี้ออกเสียง jǐ สื่อถึงการจัดส่งและป้อนอุปทาน',
        reassurance: 'ระวังคำว่า 给 ออกเสียง jǐ เมื่อแปลว่า อุปทาน/จัดส่ง (Supply)'
      },
      grammar_bite: {
        title: 'โครงสร้างการยกระดับอุตสาหกรรม: 以……为抓手，培育新动能',
        formula: '以供给侧结构性改革为主线，推动产业优化升级，提高产品附加值',
        explanation_th: 'ใช้ในการนำเสนอแผนยุทธศาสตร์อุตสาหกรรมและวิเคราะห์ทิศทางการพัฒนาธุรกิจ',
        patterns: [
          {
            formula: '加快产业升级，提高附加值。',
            zh: '制造业必须依靠科技创新加快产业升级，大幅提高产品附加值。',
            pinyin: 'Zhìzàoyè bìxū yīkào kējì chuàngxīn jiākuài chǎnyè shēngjí, dàfú tígāo chǎnpǐn fùjiāzhí.',
            th: 'ภาคการผลิตต้องพึ่งพานวัตกรรมเทคโนโลยีเพื่อเร่งยกระดับอุตสาหกรรม และเพิ่มมูลค่าเพิ่มของผลิตภัณฑ์อย่างก้าวกระโดด',
            en: 'Manufacturing must rely on technological innovation to accelerate industrial upgrading and significantly enhance product value-added.'
          },
          {
            formula: '壮大实体经济，培育经济新动能。',
            zh: '我们必须坚定不移做强做优实体经济，积极培育数字经济与绿色低碳新动能。',
            pinyin: 'Wǒmen bìxū jiāndìng bùyí zuò qiáng zuò yōu shítǐ jīngjì, jījí péiyù shùzì jīngjì yǔ lǜsè dītàn xīn dòngnéng.',
            th: 'พวกเราต้องเสริมสร้างความแข็งแกร่งและคุณภาพของภาคเศรษฐกิจจริงอย่างแน่วแน่ พร้อมทั้งบ่มเพาะพลังขับเคลื่อนใหม่ด้านเศรษฐกิจดิจิทัลและคาร์บอนต่ำสีเขียว',
            en: 'We must unswervingly strengthen and optimize the real economy, actively cultivating new growth drivers in the digital economy and green low-carbon sectors.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '产业规划局长 (Director of Industry) 🏭',
          zh: '各位企业家，当前推动高质量发展的关键，在于深化供给侧结构性改革。',
          pinyin: 'Gèwèi qǐyèjiā, dāngqián tuīdòng gāozhìliàng fāzhǎn de guānjiàn, zàiyú shēnhuà gōngjǐcè jiégòuxìng gǎigé.',
          th: 'ท่านผู้ประกอบการทุกท่าน หัวใจสำคัญของการขับเคลื่อนการพัฒนาคุณภาพสูงในปัจจุบัน อยู่ที่การกระชับการปฏิรูปเชิงโครงสร้างด้านอุปทานครับ',
          en: 'Entrepreneurs, the key to promoting high-quality development currently lies in deepening supply-side structural reform.',
          audio_trigger: 't4_u50_l03_d01'
        },
        {
          speaker: '智能制造总裁 (CEO) 🤖',
          zh: '局长说得对。我们企业正全力推动数字化改造与产业升级，淘汰落后产能。',
          pinyin: 'Júzhǎng shuō de duì. Wǒmen qǐyè zhèng quánlì tuīdòng shùzìhuà gǎizào yǔ chǎnyè shēngjí, táotài luòhòu chǎnnéng.',
          th: 'ท่านผู้อำนวยการกล่าวได้ถูกต้องครับ ภาคธุรกิจของเรากำลังทุ่มเทผลักดันการปรับเปลี่ยนสู่ดิจิทัลและการยกระดับอุตสาหกรรม โดยโละทิ้งกำลังการผลิตที่ล้าสมัย',
          en: 'Director, you are right. Our enterprise is going all out to promote digital transformation and industrial upgrading, phasing out backward production capacity.',
          audio_trigger: 't4_u50_l03_d02'
        },
        {
          speaker: '产业规划局长 (Director of Industry) 🏭',
          zh: '很好！我们要牢牢守住实体经济基本盘，向全球价值链中高端迈进，提升产品附加值。',
          pinyin: 'Hěn hǎo! Wǒmen yào láoláo shǒuzhù shítǐ jīngjì jīběnpán, xiàng quánqiú jiàzhíliàn zhōnggāoduān màijìn, tíshēng chǎnpǐn fùjiāzhí.',
          th: 'ดีมาก! พวกเราต้องรักษาฐานที่มั่นของภาคเศรษฐกิจจริงไว้อย่างเหนียวแน่น ก้าวสู่ระดับกลางและสูงของห่วงโซ่มูลค่าโลก และยกระดับมูลค่าเพิ่มของสินค้า',
          en: 'Very good! We must firmly guard the foundation of the real economy, advance towards the middle and high end of the global value chain, and elevate product value-added.',
          audio_trigger: 't4_u50_l03_d03'
        },
        {
          speaker: '智能制造总裁 (CEO) 🤖',
          zh: '新动能正在加速形成，人工智能与新能源产业将成为我们未来十年的核心增长极！',
          pinyin: 'Xīn dòngnéng zhèngzài jiāsù xíngchéng, réngōng zhìnéng yǔ xīn néngyuán chǎnyè jiāng chéngwéi wǒmen wèilái shí nián de héxīn zēngzhǎng jí!',
          th: 'พลังขับเคลื่อนใหม่กำลังก่อตัวขึ้นอย่างรวดเร็ว อุตสาหกรรม AI และพลังงานใหม่จะกลายเป็นแกนการเติบโตหลักของเราในอีกสิบปีข้างหน้าครับ!',
          en: 'New momentum is accelerating; AI and new energy industries will become our core growth poles for the next decade!',
          audio_trigger: 't4_u50_l03_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "附加值" (fùjiāzhí) สื่อถึงคุณลักษณะทางเศรษฐกิจใด?',
          options: [
            'มูลค่าและกำไรส่วนเพิ่มที่เกิดจากนวัตกรรม การออกแบบ แบรนด์ หรือเทคโนโลยีขั้นสูง',
            'ค่าปรับกรณีส่งสินค้าล่าช้า',
            'ส่วนลดราคาช่วงเทศกาล',
            'ค่าธรรมเนียมการโอนเงินธนาคาร'
          ],
          correct_index: 0,
          explanation_th: '"附加值" (Value-added) คือ มูลค่าที่เพิ่มขึ้นจากมันสมองและนวัตกรรม ทำให้สินค้าขายได้ราคาสูงขึ้น',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจกลยุทธ์สร้างมูลค่าธุรกิจยุคใหม่อย่างลึกซึ้ง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ยกระดับอุตสาหกรรม บ่มเพาะพลังขับเคลื่อนใหม่"',
          tokens: ['培育经济新动能', '推动产业升级'],
          correct_sequence: ['推动产业升级', '培育经济新动能'],
          pinyin: 'Tuīdòng chǎnyè shēngjí, péiyù jīngjì xīn dòngnéng.',
          meaning_th: 'ยกระดับอุตสาหกรรม บ่มเพาะพลังขับเคลื่อนใหม่',
          explanation_th: 'การยกระดับ (推动产业升级) + พลังขับเคลื่อนใหม่ (培育经济新动能)',
          encouragement: 'จัดประโยควิสัยทัศน์อุตสาหกรรมได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "供" (gōng - อุปทาน/จัดหา) ใน "供给侧" มีหมวดนำ "亻" (คน) สื่อถึงอะไร?',
          options: [
            'บทบาทของมนุษย์ในการจัดหา เสนอขาย และป้อนวัตถุดิบสินค้าเข้าสู่ตลาด',
            'การเดินทางท่องเที่ยวคนเดียว',
            'การนอนหลับพักผ่อน',
            'การฝึกศิลปะการต่อสู้'
          ],
          correct_index: 0,
          explanation_th: '"亻" คือมนุษย์และผู้ผลิตที่ร่วมกันจัดหา (供给) ทรัพยากรและผลิตภัณฑ์ให้สังคม',
          encouragement: 'จำรากศัพท์ได้อย่างแม่นยำ!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "实体经济" (Real Economy) ครอบคลุมภาคส่วนใดเป็นหลัก?',
          options: [
            'ภาคเกษตรกรรม อุตสาหกรรมการผลิต การก่อสร้าง และบริการที่จับต้องได้จริง',
            'การเก็งกำไรในบ่อนคาสิโน',
            'การขุดเหรียญคริปโตเก็งกำไร',
            'การเล่นเกมออนไลน์ชิงรางวัล'
          ],
          correct_index: 0,
          explanation_th: '"实体经济" คือ เศรษฐกิจจริงที่ผลิตสิ่งของ อาหาร ที่อยู่อาศัย และบริการพื้นฐานที่จำเป็นต่อชีวิตมนุษย์',
          encouragement: 'เข้าใจรากฐานของความมั่นคงทางเศรษฐกิจอย่างแท้จริง!'
        }
      ],
      boss_challenge: {
        question: 'ในแผนพัฒนาเศรษฐกิจ 5 ปีของรัฐบาล ข้อความใดสรุปยุทธศาสตร์การพัฒนาอุตสาหกรรมได้อย่างทรงพลังที่สุด?',
        options: [
          '坚持以供给侧结构性改革为主线，加快产业优化升级，培育壮大经济新动能，筑牢实体经济根基。',
          '鉴于国际局势复杂，各国团队应当致力于协调创新，推动低碳发展。',
          '公关发言人迅速响应媒体舆论，实事求是进行官方澄清。',
          '企业团队在合同谈判与仲裁条款中权衡利弊，以便达成共识。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "供给侧结构性改革", "产业优化升级", "培育新动能" และ "筑牢实体经济根基" ได้อย่างสมบูรณ์แบบตามภาษาราชการระดับสูง'
      },
      cheer_trophy: {
        badge_name: 'ผู้นำการปฏิรูปอุปทาน (Supply-Side Reform Pioneer)',
        message_th: 'ยินดีด้วย! คุณเข้าใจศัพท์ 升级, 供给侧, 附加值 และ 实体经济 อย่างทะลุปรุโปร่ง พร้อมก้าวสู่การวางแผนอุตสาหกรรมแห่งอนาคต!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u50_l04',
      lesson_number: 4,
      title: {
        zh: '白皮书解读：韧性潜力与未来展望',
        th: 'ถอดรหัสสมุดปกขาว: ความยืดหยุ่น ศักยภาพ และการมองไปข้างหน้า',
        en: 'White Paper Interpretation: Resilience, Potential & Future Outlook'
      },
      can_do: {
        th: 'อ่านและสรุปใจความสำคัญจากรายงานสมุดปกขาวเศรษฐกิจ โดยใช้คำศัพท์ เช่น 白皮书, 景气, 韧性, 驱动, 稳中向好 ได้อย่างคล่องแคล่ว',
        en: 'Read and synthesize economic white papers using vocabulary: White Paper, Prosperity/Climate, Resilience, Driven, and Steady Improvement'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ถอดรหัสสำนวน 稳中向好 และคำว่า 韧性 ในรายงานวิเคราะห์เศรษฐกิจระดับโลก!',
      vocabulary: [
        {
          id: 'hsk4_5016',
          hanzi: '白皮书',
          pinyin: 'báipíshū',
          display_pinyin: 'báipíshū',
          pinyin_tone: 'bai2pi2shu1',
          meaning_th: 'สมุดปกขาว (รายงานทางการของรัฐบาลที่แถลงนโยบายหรือข้อเท็จจริงระดับชาติ)',
          meaning_en: 'white paper (official government report or policy document)',
          radical: '白',
          radical_name_th: 'หมวดสีขาว (白字旁)',
          stroke_count: 20,
          mnemonic: 'หนังสือ (书) ปกสีขาวบริสุทธิ์ (白皮) แสดงข้อเท็จจริงโปร่งใสเป็นทางการ = สมุดปกขาว',
          kid_mnemonic: 'หยิบหนังสือเล่มหนาปกสีขาวเงาวับที่รัฐบาลมอบให้ประชาชนอ่าน = 白皮书',
          body_gesture: 'สองมือทำท่าถือหนังสือขนาดใหญ่เปิดอ่านต่อหน้าทุกคน'
        },
        {
          id: 'hsk4_5017',
          hanzi: '景气',
          pinyin: 'jǐngqì',
          display_pinyin: 'jǐngqì',
          pinyin_tone: 'jing3qi4',
          meaning_th: 'ความคึกคักทางธุรกิจ / ภาวะเศรษฐกิจเฟื่องฟู (เช่น 景气指数 - ดัชนีความเชื่อมั่นทางธุรกิจ)',
          meaning_en: 'boom / prosperous / economic climate / business sentiment',
          radical: '日',
          radical_name_th: 'หมวดดวงอาทิตย์ (日字旁)',
          stroke_count: 16,
          mnemonic: 'แสงแดดสดใสทิวทัศน์งดงาม (景) อบอวลไปด้วยพลังงานแห่งชีวิต (气) = สภาพธุรกิจคึกคัก',
          kid_mnemonic: 'ร้านค้าเปิดขายของหน้าร้าน คนเดินซื้อของเนืองแน่นด้วยรอยยิ้ม = 景气',
          body_gesture: 'สองมือแตะแก้มแล้วยิ้มแย้มแสดงความสดใสรุ่งเรือง'
        },
        {
          id: 'hsk4_5018',
          hanzi: '韧性',
          pinyin: 'rènxìng',
          display_pinyin: 'rènxìng',
          pinyin_tone: 'ren4xing4',
          meaning_th: 'ความยืดหยุ่นทนทาน / ฟื้นตัวได้เร็วเมื่อเจอมรสุม (Resilience)',
          meaning_en: 'resilience / elasticity / toughness',
          radical: '韦',
          radical_name_th: 'หมวดหนังฟอก (韦字旁)',
          stroke_count: 15,
          mnemonic: 'หนังสัตว์เหนียวนุ่มดัดโค้งได้ไม่ขาด (韧) มีคุณสมบัติคงทน (性) = ความยืดหยุ่นทนทาน',
          kid_mnemonic: 'ต้นไผ่ลู่ตามแรงลมพายุ แต่ไม่หักโค่นและดีดกลับมาตั้งตรงได้เสมอ = 韧性',
          body_gesture: 'ทำสองแขนดัดโค้งเป็นคันธนูแล้วดีดกลับมาตรงอย่างแข็งแกร่ง'
        },
        {
          id: 'hsk4_5019',
          hanzi: '驱动',
          pinyin: 'qūdòng',
          display_pinyin: 'qūdòng',
          pinyin_tone: 'qu1dong4',
          meaning_th: 'การขับเคลื่อน / ผลักดัน (เช่น 创新驱动 - ขับเคลื่อนด้วยนวัตกรรม)',
          meaning_en: 'drive / propel / driver',
          radical: '马',
          radical_name_th: 'หมวดม้า (马字旁)',
          stroke_count: 20,
          mnemonic: 'ควบขับม้าศึกให้วิ่งไปข้างหน้า (驱) ก่อให้เกิดการเคลื่อนที่ (动) = ขับเคลื่อน',
          kid_mnemonic: 'สตาร์ตเครื่องยนต์ขับเคลื่อนรถสปอร์ตพุ่งไปข้างหน้า = 驱动',
          body_gesture: 'กำสองมือทำท่าจับพวงมาลัยเร่งเครื่องไปข้างหน้า'
        },
        {
          id: 'hsk4_5020',
          hanzi: '稳中向好',
          pinyin: 'wěnzhōngxiànghǎo',
          display_pinyin: 'wěnzhōngxiànghǎo',
          pinyin_tone: 'wen3zhong1xiang4hao3',
          meaning_th: 'มั่นคงและมีแนวโน้มพัฒนาไปในทิศทางที่ดีขึ้น (Steady progress and improving)',
          meaning_en: 'stable with a positive momentum / steady progress towards better',
          radical: '禾',
          radical_name_th: 'หมวดรวงข้าว (禾木旁)',
          stroke_count: 27,
          mnemonic: 'หนักแน่นมั่นคง (稳) มุ่งหน้าสู่ทิศทาง (向) ที่ยอดเยี่ยมงดงาม (好) = มั่นคงและมีแนวโน้มดีขึ้น',
          kid_mnemonic: 'กราฟหุ้นค่อยๆ ขึ้นทีละนิดอย่างสม่ำเสมอจนพุ่งแตะเส้นชัย = 稳中向好',
          body_gesture: 'ทำมือขวาแตะไหล่ซ้ายอย่างมั่นคงแล้วค่อยๆ ชูนิ้วโป้งขึ้นฟ้า'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 稳中向好 (wěnzhōngxiànghǎo)',
        description_th: 'wěn (เสียง 3) zhōng (เสียง 1) xiàng (เสียง 4) hǎo (เสียง 3)',
        example: '经济呈现稳中向好态势 (Jīngjì chéngxiàn wěnzhōngxiànghǎo tàishì)',
        fun_metaphor: 'คู่แฝดของ 稳中求进 แต่เน้นย้ำถึงแนวโน้มปลายทางที่สดใสและดีงาม',
        reassurance: 'สำนวน 4 พยางค์ยอดฮิตที่ปรากฏในบทสรุปของผู้บริหารและนักเศรษฐศาสตร์'
      },
      grammar_bite: {
        title: 'โครงสร้างบทสรุปแนวโน้ม: 呈现……态势，展现强大韧性',
        formula: '国民经济总体保持稳中向好态势，发展韧性持续显现，长期向好的基本面没有改变',
        explanation_th: 'ใช้ในการสรุปภาพรวมในย่อหน้าสุดท้ายของรายงานสมุดปกขาวและบทวิเคราะห์เศรษฐกิจ',
        patterns: [
          {
            formula: '经济总体平稳，呈现稳中向好态势。',
            zh: '根据最新发布的白皮书，我国经济克服了多重风险挑战，呈现稳中向好态势。',
            pinyin: 'Gēnjù zuìxīn fābù de báipíshū, wǒguó jīngjì kèfú le duōchóng fēngxiǎn tiǎozhàn, chéngxiàn wěnzhōngxiànghǎo tàishì.',
            th: 'อ้างอิงจากสมุดปกขาวฉบับล่าสุด เศรษฐกิจของประเทศเราฟันฝ่าความเสี่ยงและความท้าทายรอบด้าน ปรากฏแนวโน้มพัฒนาไปในทิศทางที่ดีอย่างมั่นคง',
            en: 'According to the newly released white paper, our economy has overcome multiple risks and challenges, showing a stable and positive momentum.'
          },
          {
            formula: '坚持创新驱动，展现发展韧性。',
            zh: '我们将坚定实施创新驱动发展战略，不断增强经济发展的韧性与内在活力。',
            pinyin: 'Wǒmen jiāng jiāndìng shíshī chuàngxīn qūdòng fāzhǎn zhànlüè, bùduàn zēngqiáng jīngjì fāzhǎn de rènxìng yǔ nèizài huólì.',
            th: 'พวกเราจะดำเนินยุทธศาสตร์การพัฒนาที่ขับเคลื่อนด้วยนวัตกรรมอย่างแน่วแน่ เสริมสร้างความยืดหยุ่นและพลังชีวิตภายในของการพัฒนาเศรษฐกิจอย่างต่อเนื่อง',
            en: 'We will firmly implement the innovation-driven development strategy, continuously strengthening the resilience and intrinsic vitality of economic development.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '经济研究所长 (Dean of Institute) 📚',
          zh: '各位同仁，国务院新闻办今天正式发布了《中国高质量发展白皮书》，内容非常翔实。',
          pinyin: 'Gèwèi tóngrén, Guówùyuàn xīnwénbàn jīntiān zhèngshì fābù le "Zhōngguó Gāozhìliàng Fāzhǎn Báipíshū", nèiróng fēicháng xiángshí.',
          th: 'เพื่อนร่วมงานทุกท่าน สำนักงานสารนิเทศคณะรัฐมนตรีได้เผยแพร่ 《สมุดปกขาวการพัฒนาคุณภาพสูงของจีน》 อย่างเป็นทางการในวันนี้ เนื้อหาละเอียดครบถ้วนมากครับ',
          en: 'Colleagues, the State Council Information Office officially released the "White Paper on China\'s High-Quality Development" today; its content is very comprehensive.',
          audio_trigger: 't4_u50_l04_d01'
        },
        {
          speaker: '资深研究员 (Senior Fellow) 🖋️',
          zh: '白皮书重点强调，虽然外部环境复杂严峻，但中国经济具有超大规模市场优势与强大的抗压韧性。',
          pinyin: 'Báipíshū zhòngdiǎn qiángdiào, suīrán wàibù huánjìng fùzá yánjùn, dàn Zhōngguó jīngjì jùyǒu chāodà guīmó shìchǎng yōushì yǔ qiángdà de kàngyā rènxìng.',
          th: 'สมุดปกขาวเน้นย้ำเป็นพิเศษว่า แม้สภาพแวดล้อมภายนอกจะซับซ้อนและเข้มงวด แต่เศรษฐกิจจีนมีข้อได้เปรียบจากตลาดขนาดใหญ่พิเศษและความยืดหยุ่นในการต้านทานแรงกดดันที่แข็งแกร่งครับ',
          en: 'The white paper highlighted that although the external environment is complex and grim, the Chinese economy possesses super-large market advantages and robust resilience against pressure.',
          audio_trigger: 't4_u50_l04_d02'
        },
        {
          speaker: '经济研究所长 (Dean of Institute) 📚',
          zh: '从制造业景气指数和高技术产业投资来看，创新驱动成效显著，经济总体呈现稳中向好态势。',
          pinyin: 'Cóng zhìzàoyè jǐngqì zhǐshù yǔ gāojìshù chǎnyè tóuzī lái kàn, chuàngxīn qūdòng chéngxiào xiǎnzhù, jīngjì zǒngtǐ chéngxiàn wěnzhōngxiànghǎo tàishì.',
          th: 'เมื่อพิจารณาจากดัชนีความเชื่อมั่นภาคการผลิตและการลงทุนในอุตสาหกรรมไฮเทค การขับเคลื่อนด้วยนวัตกรรมสัมฤทธิผลชัดเจน ภาพรวมเศรษฐกิจส่งสัญญาณมั่นคงและดีขึ้นอย่างต่อเนื่อง',
          en: 'Looking at manufacturing sentiment indices and high-tech industry investments, innovation-driven results are remarkable, and the economy as a whole presents a steady and improving momentum.',
          audio_trigger: 't4_u50_l04_d03'
        },
        {
          speaker: '资深研究员 (Senior Fellow) 🖋️',
          zh: '这充分证明，只要保持战略定力，求同存异、互利共赢，任何外部打压都阻挡不了中国经济前行的步伐！',
          pinyin: 'Zhè chōngfèn zhèngmíng, zhǐyào bǎochí zhànlüè dìnglì, qiútóngcúnyì, hùlì gòngyíng, rènhé wàibù dǎyā dōu zǔdǎng bùliǎo Zhōngguó jīngjì qiánxíng de bùfá!',
          th: 'สิ่งนี้พิสูจน์ให้เห็นอย่างเต็มที่ว่า ขอเพียงรักษาความแน่วแน่ทางยุทธศาสตร์ แสวงจุดร่วมสงวนจุดต่าง ชัยชนะร่วมกัน แรงกดดันภายนอกใดๆ ก็ไม่อาจขัดขวางย่างก้าวการก้าวไปข้างหน้าของเศรษฐกิจจีนได้ครับ!',
          en: 'This fully proves that as long as we maintain strategic resolve, seek common ground while reserving differences, and pursue mutual win-win, no external suppression can hinder China\'s economic progress!',
          audio_trigger: 't4_u50_l04_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'เอกสารประเภท "白皮书" (White Paper) มีสถานะและบทบาทอย่างไรในระบบราชการสากล?',
          options: [
            'รายงานหรือเอกสารแถลงการณ์อย่างเป็นทางการของรัฐบาลเพื่อชี้แจงนโยบาย ข้อเท็จจริง หรือยุทธศาสตร์ระดับชาติ',
            'นวนิยายสืบสวนสอบสวน',
            'สมุดวาดเขียนของเด็กอนุบาล',
            'สูจิบัตรคอนเสิร์ตดนตรี'
          ],
          correct_index: 0,
          explanation_th: '"白皮书" คือ สมุดปกขาว เอกสารทางการระดับรัฐบาลที่ทรงคุณค่าและเป็นหลักฐานอ้างอิงสากล',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจเอกสารระดับนโยบายของชาติอย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ขับเคลื่อนด้วยนวัตกรรม มั่นคงและมีแนวโน้มดีขึ้น"',
          tokens: ['呈现稳中向好', '坚持创新驱动'],
          correct_sequence: ['坚持创新驱动', '呈现稳中向好'],
          pinyin: 'Jiānchí chuàngxīn qūdòng, chéngxiàn wěnzhōngxiànghǎo.',
          meaning_th: 'ขับเคลื่อนด้วยนวัตกรรม มั่นคงและมีแนวโน้มดีขึ้น',
          explanation_th: 'แรงขับเคลื่อน (坚持创新驱动) + แนวโน้ม (呈现稳中向好)',
          encouragement: 'จัดประโยคสรุปรายงานระดับชาติได้อย่างสง่างาม!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "景" (jǐng - ทิวทัศน์/บรรยากาศ) ใน "景气" มีหมวดนำ "日" (ดวงอาทิตย์) สื่อถึงอะไร?',
          options: [
            'แสงอาทิตย์ส่องสว่างเจิดจ้า สื่อถึงบรรยากาศธุรกิจที่สดใส รุ่งเรือง คึกคัก',
            'ดวงดาวระยิบระยับยามค่ำคืน',
            'ฝนตกฟ้าร้องพายุเข้า',
            'หมอกควันหนาทึบ'
          ],
          correct_index: 0,
          explanation_th: '"日" คือดวงอาทิตย์ แสงสว่างเจิดจ้าคือสัญลักษณ์ของความเฟื่องฟูทางเศรษฐกิจ (景气)',
          encouragement: 'เข้าใจอุปมานัยแห่งดวงตะวันอย่างลึกซึ้ง!'
        },
        {
          type: 'multiple_choice',
          question_th: 'สำนวน "稳中向好" (wěnzhōngxiànghǎo) สะท้อนถึงการประเมินสถานการณ์แบบใด?',
          options: [
            'ภาวะที่เศรษฐกิจมีเสถียรภาพมั่นคง และมีทิศทางขยับดีขึ้นอย่างต่อเนื่อง',
            'ภาวะที่เศรษฐกิจกำลังพังทลายอย่างรวดเร็ว',
            'ภาวะเงินเฟ้อรุนแรงจนคุมไม่อยู่',
            'ภาวะตลาดปิดทำการถาวร'
          ],
          correct_index: 0,
          explanation_th: '"稳中向好" คือ สภาพที่มั่นคง (稳) และมีทิศทางแนวโน้มไปสู่ความดียิ่งขึ้น (向好)',
          encouragement: 'เข้าใจศัพท์สรุปภาวะเศรษฐกิจได้อย่างเฉียบคม!'
        }
      ],
      boss_challenge: {
        question: 'ในบทสรุปปิดท้ายสมุดปกขาวเศรษฐกิจ ประโยคใดทรงเกียรติและถ่ายทอดความมั่นใจในอนาคตได้อย่างสมบูรณ์แบบที่สุด?',
        options: [
          '尽管面临多重外部挑战，中国经济韧性强、潜力大、活力足，长期稳中向好的基本面坚如磐石。',
          '各国应当秉持求同存异精神，展现大国担当，积极参与全球治理，携手构建人类命运共同体。',
          '企业团队致力于创新低碳，在合同谈判与仲裁条款中达成共识。',
          '温故知新实事求是，知己知彼百战不殆。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกระบุ "经济韧性强、潜力大、活力足" และ "长期稳中向好的基本面坚如磐石" ได้อย่างสง่างาม ทรงพลัง และสมบูรณ์ตามขนบการร่างเอกสารระดับรัฐ'
      },
      cheer_trophy: {
        badge_name: 'ปรมาจารย์ถอดรหัสสมุดปกขาว (White Paper Master Interpreter)',
        message_th: 'ขอแสดงความยินดีด้วยอย่างยิ่ง! คุณได้พิชิตหน่วยเรียนเศรษฐศาสตร์มหภาคและสมุดปกขาวระดับชาติอย่างสมบูรณ์แบบ ก้าวขึ้นเป็นผู้เชี่ยวชาญการวิเคราะห์นโยบายจีนระดับตำนาน!',
        xp_reward: 150
      }
    }
  ]
};
