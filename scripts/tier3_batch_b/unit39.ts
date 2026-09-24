/**
 * scripts/tier3_batch_b/unit39.ts
 * Tier 3 Unit 39: 投资与个人理财 (Investment & Wealth Management)
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

export const unit39 = {
  unit_id: 'tier3_u39',
  tier: 3,
  unit_number: 39,
  title: {
    zh: '投资与个人理财',
    th: 'การลงทุนและการบริหารการเงินส่วนบุคคล',
    en: 'Investment & Wealth Management'
  },
  description: 'ปูพื้นฐานและยกระดับทักษะการเงินระดับผู้เชี่ยวชาญ: การจัดสรรสินทรัพย์และการรับมือเงินเฟ้อ (资产配置与抗通胀), การควบคุมความเสี่ยงและพลังทวี (风险分散与杠杆控制), มนต์เสน่ห์ดอกเบี้ยทบต้นและการวางแผนเกษียณ (复利效应与未雨绸缪), และการสร้างกระแสเงินสดสู่อิสรภาพทางการเงิน (现金流与财富自由)',
  lessons: [
    {
      lesson_id: 't3_u39_l01',
      lesson_number: 1,
      title: {
        zh: '理财规划与资产配置',
        th: 'การวางแผนการเงินและจัดสรรสินทรัพย์',
        en: 'Financial Planning & Asset Allocation'
      },
      can_do: {
        th: 'อธิบายแนวคิดการจัดพอร์ตสินทรัพย์ ผลตอบแทน การเอาชนะเงินเฟ้อ และรักษาเงินต้น',
        en: 'Explain asset allocation, investment returns, beating inflation, and capital preservation'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องการจัดพอร์ตการเงินและวิธีปกป้องสินทรัพย์จากเงินเฟ้อ!',
      vocabulary: [
        {
          id: 'hsk3_3901',
          hanzi: '资产',
          pinyin: 'zīchǎn',
          display_pinyin: 'zīchǎn',
          pinyin_tone: 'zi1chan3',
          meaning_th: 'สินทรัพย์ / ทรัพย์สินที่มีมูลค่า',
          meaning_en: 'assets / capital resources',
          radical: '贝',
          radical_name_th: 'หมวดหอยเบี้ย/เงินตรา (贝字旁)',
          stroke_count: 17,
          mnemonic: 'เงินทุนสะสม (资) ที่งอกเงยเป็นผลผลิตทรัพย์สมบัติ (产) = สินทรัพย์',
          kid_mnemonic: 'หีบสมบัติทองคำและโฉนดที่ดินที่เพิ่มพูนมูลค่า = 资产',
          body_gesture: 'สองมือทำท่าประคองหีบสมบัติล้ำค่าข้างหน้า'
        },
        {
          id: 'hsk3_3902',
          hanzi: '收益',
          pinyin: 'shōuyì',
          display_pinyin: 'shōuyì',
          pinyin_tone: 'shou1yi4',
          meaning_th: 'ผลตอบแทน / ผลประโยชน์กำไร',
          meaning_en: 'income / yield / return',
          radical: '攵',
          radical_name_th: 'หมวดเคาะเบาๆ (反文旁)',
          stroke_count: 16,
          mnemonic: 'เก็บเกี่ยวเข้ากระเป๋า (收) ล้นพ้นจนเกิดดอกผลประโยชน์ (益) = ผลตอบแทน',
          kid_mnemonic: 'ต้นไม้เงินที่ผลิดอกออกผลเป็นเหรียญทองร่วงลงในตะกร้า = 收益',
          body_gesture: 'กวาดสองมือเข้าหาตัวเหมือนเก็บเกี่ยวผลตอบแทน'
        },
        {
          id: 'hsk3_3903',
          hanzi: '通货膨胀',
          pinyin: 'tōnghuò péngzhàng',
          display_pinyin: 'tōnghuò péngzhàng',
          pinyin_tone: 'tong1huo4 peng2zhang4',
          meaning_th: 'ภาวะเงินเฟ้อ (ข้าวของแพงขึ้น ค่าเงินลดลง)',
          meaning_en: 'inflation',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之底)',
          stroke_count: 36,
          mnemonic: 'เงินตราหมุนเวียน (通货) พองตัวโป่งพองจนมูลค่าลดลง (膨胀) = เงินเฟ้อ',
          kid_mnemonic: 'ลูกโป่งราคาของที่พองตัวใหญ่ขึ้นเรื่อยๆ จนต้องใช้เหรียญเงินซื้อมากขึ้น = 通货膨胀',
          body_gesture: 'ทำสองมือกางออกเป็นวงกลมขยายใหญ่พองลมขึ้นเรื่อยๆ'
        },
        {
          id: 'hsk3_3904',
          hanzi: '基金',
          pinyin: 'jījīn',
          display_pinyin: 'jījīn',
          pinyin_tone: 'ji1jin1',
          meaning_th: 'กองทุนรวม (Mutual fund)',
          meaning_en: 'fund / foundation fund',
          radical: '土',
          radical_name_th: 'หมวดดิน (土字旁)',
          stroke_count: 19,
          mnemonic: 'รากฐานที่มั่นคง (基) ระดมเงินทุนหมุนเวียน (金) = กองทุนรวม',
          kid_mnemonic: 'กระปุกออมสินยักษ์ของชุมชนที่มีผู้เชี่ยวชาญช่วยนำเงินไปลงทุน = 基金',
          body_gesture: 'กุมมือสองข้างเป็นฐานรากแสดงความมั่นคงของกองทุน'
        },
        {
          id: 'hsk3_3905',
          hanzi: '本金',
          pinyin: 'běnjīn',
          display_pinyin: 'běnjīn',
          pinyin_tone: 'ben3jin1',
          meaning_th: 'เงินต้น / ทุนเริ่มต้น',
          meaning_en: 'principal / initial capital',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 13,
          mnemonic: 'รากเหง้าดั้งเดิม (本) ของเงินทอง (金) = เงินต้น',
          kid_mnemonic: 'เมล็ดพันธุ์สีทองที่หว่านลงดินเพื่อรอวันผลิดอกออกผล = 本金',
          body_gesture: 'คว่ำฝ่ามือชี้ลงพื้นสื่อถึงฐานรากเงินต้นดั้งเดิม'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 通货膨胀 (tōnghuò péngzhàng)',
        description_th: 'tōng (เสียง 1), huò (เสียง 4), péng (เสียง 2), zhàng (เสียง 4) ให้ควบคุมจังหวะ สูง-ต่ำ-ขึ้น-ตก อย่างชัดเจน',
        example: '抵抗通货膨胀 (dǐkàng tōnghuò péngzhàng: ต้านทานภาวะเงินเฟ้อ)',
        fun_metaphor: 'เหมือนขับรถข้ามเนิน 4 ลูก: ทางเรียบ... ลงเนิน... ขึ้นเนิน... แล้วเบรกจึ้ก!',
        reassurance: 'เมื่อออกเสียงคำนี้ได้ชัดเจน คุณจะฟังเหมือนนักวิเคราะห์การเงินมืออาชีพทันที'
      },
      grammar_bite: {
        title: 'โครงสร้างการจัดสรรและกระจายสินทรัพย์: 通过合理配置...，以期实现...',
        explanation_th: 'ใช้ในการนำเสนอแผนการเงินและการลงทุนที่มุ่งเน้นผลตอบแทนระยะยาวอย่างรอบคอบ',
        patterns: [
          {
            formula: '通过合理配置 + [ประเภทสินทรัพย์], 以期实现 + [เป้าหมาย]',
            zh: '通过合理配置股票与债券基金，以期实现资产的稳健增值。',
            pinyin: 'Tōngguò hélǐ pèizhì gǔpiào yǔ zhàiquàn jījīn, yǐqī shíxiàn zīchǎn de wěnjiàn zēngzhí.',
            th: 'ผ่านการจัดสรรหุ้นและกองทุนพันธบัตรอย่างสมเหตุสมผล เพื่อมุ่งหวังให้สินทรัพย์เติบโตอย่างมั่นคง',
            en: 'Through reasonable allocation of stocks and bond funds, aiming to achieve steady appreciation of assets.'
          },
          {
            formula: '只有...才能跑赢通货膨胀',
            zh: '单靠银行活期存款，很难跑赢当前的通货膨胀率。',
            pinyin: 'Dān kào yínháng huóqī cúnkuǎn, hěn nán pǎoyíng dāngqián de tōnghuò péngzhàng lǜ.',
            th: 'พึ่งพาเพียงเงินฝากออมทรัพย์ธนาคารเพียงอย่างเดียว ยากมากที่จะเอาชนะอัตราเงินเฟ้อในปัจจุบันได้',
            en: 'Relying solely on bank current deposits makes it very difficult to outrun the current inflation rate.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'จาง (นักลงทุนมือใหม่) 🧑‍💼',
          zh: '王顾问，我手头有一笔闲置资金，一直存在银行，感觉购买力一直在缩水。',
          pinyin: 'Wáng gùwèn, wǒ shǒutóu yǒu yì bǐ xiánzhì zījīn, yìzhí cún zài yínháng, gǎnjué gòumǎilì yìzhí zài suōshuǐ.',
          th: 'ที่ปรึกษาหวังครับ ผมมีเงินเย็นอยู่ก้อนหนึ่ง ฝากธนาคารไว้ตลอด รู้สึกว่าอำนาจซื้อหดตัวลงเรื่อยๆ เลยครับ',
          en: 'Advisor Wang, I have some idle funds in hand kept in the bank; I feel its purchasing power shrinking constantly.'
        },
        {
          speaker: 'B',
          speaker_name: 'หวัง (ที่ปรึกษาการเงิน) 👩‍💼',
          zh: '是的，受通货膨胀影响，资金需要进行多元资产配置才能实现保值增值。',
          pinyin: 'Shì de, shòu tōnghuò péngzhàng yǐngxiǎng, zījīn xūyào jìnxíng duōyuán zīchǎn pèizhì cái néng shíxiàn bǎozhí zēngzhí.',
          th: 'ใช่แล้วค่ะ ได้รับผลกระทบจากเงินเฟ้อ เงินทุนจำเป็นต้องทำการจัดสรรสินทรัพย์ที่หลากหลาย จึงจะรักษามูลค่าและเติบโตได้',
          en: 'Yes, affected by inflation, funds need diversified asset allocation to preserve value and appreciate.'
        },
        {
          speaker: 'A',
          speaker_name: 'จาง (นักลงทุนมือใหม่) 🧑‍💼',
          zh: '我最看重本金安全，同时希望能获得比定期更高的年化收益。',
          pinyin: 'Wǒ zuì kànzhòng běnjīn ānquán, tóngshí xīwàng néng huòdé bǐ dìngqī gèng gāo de niánhuà shōuyì.',
          th: 'ผมให้ความสำคัญกับความปลอดภัยของเงินต้นเป็นอันดับแรก ในขณะเดียวกันก็หวังว่าจะได้ผลตอบแทนต่อปีที่สูงกว่าเงินฝากประจำครับ',
          en: 'I value principal safety the most, while hoping to achieve higher annualized returns than fixed deposits.'
        },
        {
          speaker: 'B',
          speaker_name: 'หวัง (ที่ปรึกษาการเงิน) 👩‍💼',
          zh: '建议您搭配稳健的债券基金与指数基金，在保障本金的同时获取合理收益。',
          pinyin: 'Jiànyì nín dāpèi wěnjiàn de zhàiquàn jījīn yǔ zhǐshù jījīn, zài bǎozhàng běnjīn de tóngshí huòqǔ hélǐ shōuyì.',
          th: 'ขอแนะนำให้คุณจัดคู่กองทุนพันธบัตรที่มั่นคงกับกองทุนดัชนี เพื่อปกป้องเงินต้นไปพร้อมกับรับผลตอบแทนที่สมเหตุสมผลค่ะ',
          en: 'I suggest pairing steady bond funds with index funds to safeguard principal while earning reasonable yields.'
        },
        {
          speaker: 'A',
          speaker_name: 'จาง (นักลงทุนมือใหม่) 🧑‍💼',
          zh: '我也常和公司同事们交流，大家都觉得必须认真学习理财知识，不能只图简单方便。',
          pinyin: 'Wǒ yě cháng hé gōngsī tóngshì men jiāoliú, dàjiā dōu juéde bìxū rènzhēn xuéxí lǐcái zhīshi, bù néng zhǐ tú jiǎndān fāngbiàn.',
          th: 'ผมเองก็แลกเปลี่ยนกับเพื่อนร่วมงานที่บริษัทบ่อยๆ ทุกคนต่างรู้สึกว่าต้องเรียนรู้ความรู้การบริหารเงินอย่างจริงจัง ไม่อาจหวังเพียงความง่ายดายและสะดวกสบายเฉพาะหน้า',
          en: 'I also often discuss with company colleagues; everyone feels we must earnestly learn wealth management knowledge, not just seeking simplicity and convenience.'
        },
        {
          speaker: 'B',
          speaker_name: 'หวัง (ที่ปรึกษาการเงิน) 👩‍💼',
          zh: '非常正确的认识！做好准备，定期总结经验，投资之路才会越走越宽广。',
          pinyin: 'Fēicháng zhèngquè de rènshi! Zuò hǎo zhǔnbèi, dìngqī zǒngjié jīngyàn, tóuzī zhī lù cái huì yuè zǒu yuè kuānguǎng.',
          th: 'เป็นความเข้าใจที่ถูกต้องยิ่งค่ะ! เตรียมตัวให้พร้อม สรุปบทเรียนประสบการณ์สม่ำเสมอ เส้นทางการลงทุนจึงจะยิ่งเดินยิ่งกว้างไกล',
          en: 'Very correct understanding! Prepare well, regularly summarize experience, and your investment path will grow broader and broader.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '本金' (běnjīn) มีความหมายตรงกับข้อใดในการลงทุน?",
          options: [
            'เงินต้น / เงินลงทุนเริ่มแรกก่อนคิดดอกเบี้ยและกำไร',
            'ดอกเบี้ยที่ได้รับจากธนาคาร',
            'ค่าธรรมเนียมการโอนเงินระหว่างประเทศ',
            'ภาษีหัก ณ ที่จ่าย'
          ],
          correct_index: 0,
          explanation_th: "'本金' (Principal) หมายถึง เงินต้นหรือมูลค่าเงินลงทุนเริ่มต้นที่ใช้ไป",
          encouragement: 'ถูกต้องยอดเยี่ยม! เข้าใจคำศัพท์แกนหลักทางการเงินเป๊ะมาก!'
        },
        {
          type: 'flash_recall',
          question_th: "วลี '跑赢通货膨胀' หมายถึงอะไร?",
          options: [
            'การสร้างผลตอบแทนจากการลงทุนที่สูงกว่าอัตราเงินเฟ้อ เพื่อรักษาอำนาจซื้อ',
            'การวิ่งแข่งมาราธอนชนะคู่แข่ง',
            'การกู้เงินซื้อรถยนต์คันใหม่',
            'การแลกเปลี่ยนเงินตราต่างประเทศ'
          ],
          correct_index: 0,
          explanation_th: "'跑赢通胀' (Beating inflation) คือการลงทุนให้ได้ผลตอบแทนชนะเงินเฟ้อเพื่อไม่ให้อำนาจซื้อลดลง",
          encouragement: 'แม่นยำมาก! ใช้ภาษาการเงินระดับมืออาชีพได้อย่างคล่องแคล่ว!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "การจัดสรรสินทรัพย์อย่างสมเหตุสมผล สามารถรักษามูลค่าและงอกเงย"',
          tokens: ['保值增值', '合理配置资产', '能够实现'],
          correct_sequence: ['合理配置资产', '能够实现', '保值增值'],
          pinyin: 'Hélǐ pèizhì zīchǎn nénggòu shíxiàn bǎozhí zēngzhí.',
          meaning_th: 'การจัดสรรสินทรัพย์อย่างสมเหตุสมผล สามารถบรรลุการรักษามูลค่าและเติบโต',
          explanation_th: 'ประธานกริยา (合理配置资产) + กริยานุเคราะห์ (能够实现) + ผลลัพธ์ทางการเงิน (保值增值)',
          encouragement: 'เรียงประโยคกลยุทธ์การเงินได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '资产' ตัว '资' (เงินทุน/สินทรัพย์) มีหมวดนำใดอยู่ด้านล่าง?",
          options: [
            '贝 (หมวดหอยเบี้ยเงินตรา 贝字底)',
            '金 (หมวดทองคำ 金字底)',
            '木 (หมวดไม้ 木字底)',
            '日 (หมวดดวงอาทิตย์ 日字底)'
          ],
          correct_index: 0,
          explanation_th: "'资' มีหมวด '贝' (หอยเบี้ย) ด้านล่าง ซึ่งในสมัยจีนโบราณใช้เปลือกหอยเบี้ยเป็นเบี้ยเงินตราแทนค่าเงิน",
          encouragement: 'เข้าใจประวัติศาสตร์และรากเหง้าอักษรเงินตราจีนอย่างลึกซึ้ง!'
        }
      ]
    },
    {
      lesson_id: 't3_u39_l02',
      lesson_number: 2,
      title: {
        zh: '风险防范与对冲',
        th: 'การบริหารความเสี่ยงและการป้องกันการขาดทุน',
        en: 'Risk Management & Hedging'
      },
      can_do: {
        th: 'อธิบายการกระจายความเสี่ยง การใช้เลเวอเรจอย่างระมัดระวัง และการตั้งจุดตัดขาดทุน (止损)',
        en: 'Explain risk diversification, leverage control, market volatility, and stop-loss discipline'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องการควบคุมความเสี่ยงและกฎการตัดขาดทุนอย่างมีวินัย!',
      vocabulary: [
        {
          id: 'hsk3_3906',
          hanzi: '风险',
          pinyin: 'fēngxiǎn',
          display_pinyin: 'fēngxiǎn',
          pinyin_tone: 'feng1xian3',
          meaning_th: 'ความเสี่ยง / ความไม่แน่นอนที่อาจสูญเสีย',
          meaning_en: 'risk / hazard',
          radical: '风',
          radical_name_th: 'หมวดลม (风字旁)',
          stroke_count: 17,
          mnemonic: 'สายลมแรงพัดผ่าน (风) ชายขอบหน้าผาชันอันตราย (险) = ความเสี่ยง',
          kid_mnemonic: 'ป้ายเตือนสามเหลี่ยมสีส้มริมหน้าผาสูงชันที่มีลมพัดแรง = 风险',
          body_gesture: 'สองมือทำท่ายกกันระวังตัวพลางมองซ้ายขวา'
        },
        {
          id: 'hsk3_3907',
          hanzi: '分散',
          pinyin: 'fēnsàn',
          display_pinyin: 'fēnsàn',
          pinyin_tone: 'fen1san4',
          meaning_th: 'กระจาย / ไม่รวมกระจุกตัวอยู่ที่เดียว',
          meaning_en: 'to diversify / to scatter',
          radical: '八',
          radical_name_th: 'หมวดแปด (八字头)',
          stroke_count: 16,
          mnemonic: 'แบ่งซอยออกเป็นส่วนๆ (分) กระจัดกระจายไม่ให้อยู่ก้อนเดียว (散) = กระจายความเสี่ยง',
          kid_mnemonic: 'อย่าใส่ไข่ทั้งหมดไว้ในตะกร้าใบเดียว แต่แบ่งใส่ 3 ตะกร้า = 分散',
          body_gesture: 'สองมือกวาดแบออกด้านข้างสื่อถึงการกระจายไข่ลงหลายตะกร้า'
        },
        {
          id: 'hsk3_3908',
          hanzi: '杠杆',
          pinyin: 'gànggǎn',
          display_pinyin: 'gànggǎn',
          pinyin_tone: 'gang4gan3',
          meaning_th: 'เลเวอเรจ (Leverage) / พลังทวีคานงัดทางการเงิน',
          meaning_en: 'leverage / financial gearing',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 15,
          mnemonic: 'ท่อนไม้คาน (杠) แท่งยาวสำหรับงัดก้อนหินหนัก (杆) = พลังทวี เลเวอเรจ',
          kid_mnemonic: 'ไม้กระดานหกที่คนตัวเล็กสามารถยกก้อนหินยักษ์ให้ลอยขึ้นได้ = 杠杆',
          body_gesture: 'ทำท่ากดคานงัดลงเพื่อยกสิ่งของหนักขึ้น'
        },
        {
          id: 'hsk3_3909',
          hanzi: '波动',
          pinyin: 'bōdòng',
          display_pinyin: 'bōdòng',
          pinyin_tone: 'bo1dong4',
          meaning_th: 'ความผันผวน / ขึ้นๆ ลงๆ ดั่งระลอกคลื่น',
          meaning_en: 'volatility / fluctuation',
          radical: '氵',
          radical_name_th: 'หมวดน้ำ (三点水)',
          stroke_count: 14,
          mnemonic: 'ระลอกคลื่นน้ำซัดสาด (波) ขยับเขยื้อนไม่หยุดนิ่ง (动) = ความผันผวน',
          kid_mnemonic: 'กราฟราคาหุ้นขึ้นๆ ลงๆ เป็นลูกคลื่นบนหน้าจอคอมพิวเตอร์ = 波动',
          body_gesture: 'วาดมือขวาเป็นลูกคลื่นขึ้นลงในอากาศ'
        },
        {
          id: 'hsk3_3910',
          hanzi: '止损',
          pinyin: 'zhǐsǔn',
          display_pinyin: 'zhǐsǔn',
          pinyin_tone: 'zhi3sun3',
          meaning_th: 'ตัดขาดทุน (Stop-loss) / ยุติความเสียหาย',
          meaning_en: 'stop-loss / cut losses',
          radical: '止',
          radical_name_th: 'หมวดหยุด (止字旁)',
          stroke_count: 14,
          mnemonic: 'สั่งหยุดทันที (止) ไม่ให้ความสูญเสียลุกลาม (损) = ตัดขาดทุน',
          kid_mnemonic: 'ดึงเบรกมือรถกะทันหันก่อนที่หน้ารถจะชนขอบทาง = 止损',
          body_gesture: 'ยกฝ่ามือขึ้นตั้งฉากข้างหน้าเป็นสัญญาณบอกหยุดเด็ดขาด'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 杠杆 (gànggǎn) เสียง 4 ต่อด้วยเสียง 3',
        description_th: 'gàng เป็นเสียง 4 หนักสั้น ตามด้วย gǎn เสียง 3 ทอดต่ำแล้วสะบัดขึ้นเล็กน้อย',
        example: '加杠杆 (jiā gànggǎn: เพิ่มอัตราทดเลเวอเรจ)',
        fun_metaphor: 'เหมือนสับสวิตช์ลง ตึ้ก! แล้วยกคานค้างไว้ ฮึ่ม...',
        reassurance: 'ออกเสียงชัดเจนเพื่อเตือนสติตนเองเรื่องการควบคุมความเสี่ยงในการลงทุน'
      },
      grammar_bite: {
        title: 'โครงสร้างการเตือนเรื่องการเก็งกำไร: 切忌...，必须严格遵守...',
        explanation_th: 'ใช้ในการเน้นย้ำวินัยการลงทุนอย่างเข้มงวดเพื่อป้องกันหายนะทางการเงิน',
        patterns: [
          {
            formula: '投资时切忌 + [พฤติกรรมเสี่ยงสูง เช่น 加杠杆], 必须严格遵守 + [วินัย]',
            zh: '投资理财切忌盲目加杠杆，必须严格遵守止损纪律。',
            pinyin: 'Tóuzī lǐcái qièjì mángmù jiā gànggǎn, bìxū yángé zūnshǒu zhǐsǔn jìlǜ.',
            th: 'การลงทุนบริหารการเงินต้องหลีกเลี่ยงการใช้เลเวอเรจอย่างมืดบอด และต้องปฏิบัติตามวินัยตัดขาดทุนอย่างเคร่งครัด',
            en: 'In investment, avoid blindly adding leverage; one must strictly observe stop-loss discipline.'
          },
          {
            formula: '面对市场剧烈波动，分散投资是...',
            zh: '面对市场剧烈波动，分散投资是防范风险的最佳手段。',
            pinyin: 'Miànduì shìchǎng jùliè bōdòng, fēnsàn tóuzī shì fángfàn fēngxiǎn de zuì jiā shǒuduàn.',
            th: 'เมื่อเผชิญกับความผันผวนรุนแรงของตลาด การกระจายการลงทุนคือเครื่องมือที่ดีที่สุดในการป้องกันความเสี่ยง',
            en: 'Facing severe market fluctuations, diversification is the best means of risk prevention.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลิน (นักลงทุน) 👩‍💼',
          zh: '最近股市波动非常剧烈，我有些朋友盲目加杠杆，结果亏损惨重。',
          pinyin: 'Zuìjìn gǔshì bōdòng fēicháng jùliè, wǒ yǒuxiē péngyou mángmù jiā gànggǎn, jiéguǒ kuīsǔn cǎnzhòng.',
          th: 'ช่วงนี้ตลาดหุ้นผันผวนรุนแรงมาก เพื่อนของฉันบางคนใช้เลเวอเรจอย่างขาดสติ ผลลัพธ์คือขาดทุนย่อยยับเลยค่ะ',
          en: 'Recently the stock market fluctuated violently, some of my friends blindly added leverage, resulting in heavy losses.'
        },
        {
          speaker: 'B',
          speaker_name: 'ผู้จัดการเฉิน (ผู้จัดการกองทุน) 👨‍💼',
          zh: '杠杆是一把双刃剑，既能放大收益，更能放大风险。没有严格的止损策略千万不能碰。',
          pinyin: 'Gànggǎn shì yì bǎ shuāngrènjiàn, jì néng fàngdà shōuyì, gèng néng fàngdà fēngxiǎn. Méiyǒu yángé de zhǐsǔn cèlüè qiānwàn bù néng pèng.',
          th: 'เลเวอเรจเป็นดาบสองคม ทั้งสามารถขยายผลกำไร และยิ่งขยายความเสี่ยงให้ทวีคูณ หากไม่มีกลยุทธ์ตัดขาดทุนที่เข้มงวดอย่าแตะต้องเด็ดขาดครับ',
          en: 'Leverage is a double-edged sword, magnifying returns while magnifying risks even more. Never touch it without strict stop-loss rules.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (นักลงทุน) 👩‍💼',
          zh: '您常说的“不要把鸡蛋放在同一个篮子里”，其实就是分散风险对吧？',
          pinyin: 'Nín cháng shuō de “bú yào bǎ jīdàn fàng zài tóng yí ge lánzi lǐ”, qíshí jiù shì fēnsàn fēngxiǎn duì ba?',
          th: 'ที่คุณมักกล่าวว่า "อย่าใส่ไข่ไว้ในตะกร้าใบเดียวกัน" แท้จริงแล้วก็คือการกระจายความเสี่ยงใช่ไหมคะ?',
          en: 'What you often say, "don\'t put all eggs in one basket," actually means diversifying risk, right?'
        },
        {
          speaker: 'B',
          speaker_name: 'ผู้จัดการเฉิน (ผู้จัดการกองทุน) 👨‍💼',
          zh: '正是如此。分散配置不同类别的优质资产，才能在市场风浪中立于不败之地。',
          pinyin: 'Zhèng shì rúcǐ. Fēnsàn pèizhì bùtóng lèibié de yōuzhì zīchǎn, cái néng zài shìchǎng fēnglàng zhōng lìyúbúbàizhīdì.',
          th: 'ถูกต้องอย่างยิ่งครับ กระจายจัดสรรสินทรัพย์คุณภาพในหมวดหมู่ที่แตกต่าง จึงจะสามารถยืนหยัดอย่างมั่นคงท่ามกลางคลื่นลมของตลาดได้ครับ',
          en: 'Precisely so. Diversifying into different categories of quality assets is the only way to remain invincible amidst market storms.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (นักลงทุน) 👩‍💼',
          zh: '这次经历让我清楚认识到，任何时候都不能抱有侥幸心理，必须认真解决风险问题。',
          pinyin: 'Zhè cì jīnglì ràng wǒ qīngchu rènshi dào, rènhé shíhou dōu bù néng bào yǒu jiǎoxìng xīnlǐ, bìxū rènzhēn jiějué fēngxiǎn wèntí.',
          th: 'ประสบการณ์ครั้งนี้ทำให้ฉันตระหนักรู้อย่างชัดเจนว่า ไม่ว่าเมื่อใดก็ไม่อาจหวังพึ่งโชคช่วย ต้องแก้ไขปัญหาความเสี่ยงอย่างจริงจัง',
          en: 'This experience made me clearly realize that at no time should one rely on luck; risk problems must be resolved earnestly.'
        },
        {
          speaker: 'B',
          speaker_name: 'ผู้จัดการเฉิน (ผู้จัดการกองทุน) 👨‍💼',
          zh: '是的，无论在电脑还是手机上看盘，都要严格遵守纪律，才能帮助我们在市场上获得满意的结果。',
          pinyin: 'Shì de, wúlùn zài diànnǎo háishì shǒujī shàng kànpán, dōu yào yángé zūnshǒu jìlǜ, cái néng bāngzhù wǒmen zài shìchǎng shàng huòdé mǎnyì de jiéguǒ.',
          th: 'ใช่แล้วครับ ไม่ว่าจะดูพอร์ตในคอมพิวเตอร์หรือโทรศัพท์มือถือ ก็ต้องปฏิบัติตามวินัยอย่างเคร่งครัด จึงจะช่วยให้พวกเราได้รับผลลัพธ์ที่น่าพึงพอใจในตลาดครับ',
          en: 'Yes, whether watching the market on a computer or mobile phone, one must strictly observe discipline to achieve satisfying results.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '止损' (zhǐsǔn) หมายถึงการกระทำใดในการซื้อขายหลักทรัพย์?",
          options: [
            'การขายตัดขาดทุนตามราคาที่กำหนดไว้ล่วงหน้าเพื่อจำกัดความเสียหาย',
            'การซื้อหุ้นเพิ่มเป็นสองเท่าเมื่อราคาตก',
            'การกู้ยืมเงินนอกระบบมาลงทุนต่อ',
            'การลบแอปพลิเคชันทิ้งเพื่อไม่ดูราคา'
          ],
          correct_index: 0,
          explanation_th: "'止损' (Stop-loss) คือวินัยการตัดขาดทุนทันทีเมื่อราคาแตะขอบเขตที่ตั้งไว้ เพื่อป้องกันไม่ให้พอร์ตเสียหายรุนแรง",
          encouragement: 'ถูกต้องยอดเยี่ยม! มีวินัยการลงทุนระดับมืออาชีพ!'
        },
        {
          type: 'flash_recall',
          question_th: "วลี '杠杆是一把双刃剑' หมายถึงอะไร?",
          options: [
            'เลเวอเรจเป็นดาบสองคมที่ขยายได้ทั้งผลตอบแทนและความเสี่ยง',
            'เลเวอเรจใช้ซื้อดาบโบราณสะสม',
            'เลเวอเรจมีแต่ข้อดีไม่มีข้อเสีย',
            'เลเวอเรจทำให้ทุกคนรวยได้ในข้ามคืน'
          ],
          correct_index: 0,
          explanation_th: "'双刃剑' (ดาบสองคม) เปรียบเทียบว่าเลเวอเรจสามารถเพิ่มผลกำไรได้มหาศาล แต่หากผิดทางก็ขาดทุนทวีคูณเช่นกัน",
          encouragement: 'แม่นยำมาก! เข้าใจการเปรียบเทียบทางการเงินอย่างถ่องแท้!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "การกระจายการลงทุนเป็นวิธีที่ดีที่สุดในการป้องกันความเสี่ยง"',
          tokens: ['最佳手段', '分散投资是', '防范风险的'],
          correct_sequence: ['分散投资是', '防范风险的', '最佳手段'],
          pinyin: 'Fēnsàn tóuzī shì fángfàn fēngxiǎn de zuì jiā shǒuduàn.',
          meaning_th: 'การกระจายการลงทุนคือวิธีที่ดีที่สุดในการป้องกันความเสี่ยง',
          explanation_th: 'ประธาน (分散投资) + กริยาเชื่อม (是) + ส่วนขยายและกรรม (防范风险的最佳手段)',
          encouragement: 'เรียงประโยคกฎทองแห่งการลงทุนได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '杠杆' (คานงัด/เลเวอเรจ) ทั้งสองตัวอักษรใช้หมวดนำใด?",
          options: [
            '木 (หมวดไม้ 木字旁)',
            '金 (หมวดโลหะ 金字旁)',
            '水 (หมวดน้ำ 水字旁)',
            '土 (หมวดดิน 土字旁)'
          ],
          correct_index: 0,
          explanation_th: "'杠' และ '杆' ล้วนมีหมวด '木' (ไม้) สื่อถึงคานไม้และท่อนไม้ที่ใช้เป็นกลไกคานงัดงัดของหนัก",
          encouragement: 'วิเคราะห์โครงสร้างอักษรคู่ได้อย่างยอดเยี่ยม!'
        }
      ]
    },
    {
      lesson_id: 't3_u39_l03',
      lesson_number: 3,
      title: {
        zh: '养老规划与稳健收益',
        th: 'การวางแผนเกษียณและผลตอบแทนมั่นคง',
        en: 'Retirement Planning & Compound Interest'
      },
      can_do: {
        th: 'อธิบายพลังของดอกเบี้ยทบต้น (复利), การสำรองเงินเกษียณ และใช้สำนวน 未雨绸缪',
        en: 'Explain compound interest, retirement reserves, and apply the idiom 未雨绸缪'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ใช้สำนวน 未雨绸缪 ในการวางแผนชีวิตและการเงินระยะยาว!',
      vocabulary: [
        {
          id: 'hsk3_3911',
          hanzi: '养老',
          pinyin: 'yǎnglǎo',
          display_pinyin: 'yǎnglǎo',
          pinyin_tone: 'yang3lao3',
          meaning_th: 'การเกษียณอายุ / เลี้ยงดูยามชรา',
          meaning_en: 'retirement / providing for the aged',
          radical: '羊',
          radical_name_th: 'หมวดแกะ (羊字头)',
          stroke_count: 15,
          mnemonic: 'เลี้ยงดูค้ำจุน (养) ผู้สูงวัยในครอบครัวและตนเองยามชรา (老) = วางแผนเกษียณ',
          kid_mnemonic: 'บ้านพักตากอากาศริมทะเลที่มีคุณตาคุณยายรดน้ำต้นไม้อย่างมีความสุข = 养老',
          body_gesture: 'สองมือทำท่าประคองไม้เท้าจำลองด้วยรอยยิ้มอบอุ่น'
        },
        {
          id: 'hsk3_3912',
          hanzi: '复利',
          pinyin: 'fùlì',
          display_pinyin: 'fùlì',
          pinyin_tone: 'fu4li4',
          meaning_th: 'ดอกเบี้ยทบต้น (Compound interest)',
          meaning_en: 'compound interest',
          radical: '夂',
          radical_name_th: 'หมวดก้าวตามช้าๆ (夂字旁)',
          stroke_count: 16,
          mnemonic: 'ทบซ้ำแล้วซ้ำอีก (复) บนดอกผลกำไร (利) = ดอกเบี้ยทบต้น',
          kid_mnemonic: 'ลูกบอลหิมะเล็กๆ กลิ้งลงจากภูเขาแล้วพอกตัวใหญ่ขึ้นเป็นภูเขาหิมะ = 复利',
          body_gesture: 'หมุนสองมือวนเป็นเกลียวขยายใหญ่ขึ้นเรื่อยๆ'
        },
        {
          id: 'hsk3_3913',
          hanzi: '储备',
          pinyin: 'chǔbèi',
          display_pinyin: 'chǔbèi',
          pinyin_tone: 'chu3bei4',
          meaning_th: 'เงินสำรอง / การตระเตรียมเสบียงล่วงหน้า',
          meaning_en: 'reserves / to store up',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 20,
          mnemonic: 'เก็บสะสมไว้ (储) จัดเตรียมพร้อมสรรพรับมือทุกสถานการณ์ (备) = เงินสำรอง',
          kid_mnemonic: 'กระรอกน้อยสะสมผลวอลนัตเต็มโพรงไม้ไว้กินตลอดฤดูหนาว = 储备',
          body_gesture: 'กอบสองมือรวบสิ่งของเข้าหาตัวเก็บในกระเป๋าเสื้อ'
        },
        {
          id: 'hsk3_3914',
          hanzi: '未雨绸缪',
          pinyin: 'wèi yǔ chóu móu',
          display_pinyin: 'wèi yǔ chóu móu',
          pinyin_tone: 'wei4 yu3 chou2 mou2',
          meaning_th: 'ซ่อมแซมรังก่อนฝนตก / เตรียมพร้อมรับมือก่อนเกิดเหตุวิกฤต',
          meaning_en: 'repair the house before it rains / prepare in advance',
          radical: '一',
          radical_name_th: 'หมวดหนึ่ง (一字旁)',
          stroke_count: 38,
          mnemonic: 'ก่อนที่ (未) ฝนจะตก (雨) ให้สานซ่อมรังให้แน่นหนา (绸缪) = เตรียมพร้อมล่วงหน้า',
          kid_mnemonic: 'นกน้อยคาบกิ่งไม้มาซ่อมหลังคารังให้แข็งแรงก่อนเมฆฝนดำจะพัดมา = 未雨绸缪',
          body_gesture: 'ทำมือข้างหนึ่งเป็นหลังคารัง อีกข้างสานแต่งกิ่งไม้ให้แข็งแรง'
        },
        {
          id: 'hsk3_3915',
          hanzi: '稳健',
          pinyin: 'wěnjiàn',
          display_pinyin: 'wěnjiàn',
          pinyin_tone: 'wen3jian4',
          meaning_th: 'มั่นคงและปลอดภัย / สม่ำเสมอไม่ผันผวนสูง',
          meaning_en: 'prudent / steady and robust',
          radical: '禾',
          radical_name_th: 'หมวดรวงข้าว (禾木旁)',
          stroke_count: 25,
          mnemonic: 'หนักแน่นดั่งยุ้งฉางข้าว (稳) มีสุขภาพแข็งแกร่งยั่งยืน (健) = มั่นคงปลอดภัย',
          kid_mnemonic: 'สะพานหินศิลาที่แข็งแกร่งทนทานต่อคลื่นลมมาหลายร้อยปี = 稳健',
          body_gesture: 'ก้าวเท้ายืนมั่นคงสองมือท้าวสะเอวแสดงความหนักแน่น'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงสำนวน 未雨绸缪 (wèi yǔ chóu móu)',
        description_th: 'wèi (เสียง 4), yǔ (เสียง 3), chóu (เสียง 2), móu (เสียง 2) ให้เน้นเสียง 4 หนักสั้น แล้วทอดเสียง 2 คู่พลิ้วไหว',
        example: '为了养老未雨绸缪！',
        fun_metaphor: 'เหมือนเสียงเคาะระฆังเตือนสติ แล้วปล่อยเสียงนกพิราบบินกรูขึ้นฟ้าสองระลอก',
        reassurance: 'สำนวน 4 ตัวอักษรนี้เป็นสุภาษิตชั้นยอดที่พบได้ในทุกบทวิเคราะห์นโยบายและการเงิน'
      },
      grammar_bite: {
        title: 'โครงสร้างการเตรียมพร้อมล่วงหน้า: 宁可未雨绸缪，也不可...',
        explanation_th: 'ใช้ในการชี้แนะว่าควรยอมเหนื่อยเตรียมตัวไว้ก่อน ดีกว่ารอให้วิกฤตมาถึงแล้วแก้ไขไม่ทัน',
        patterns: [
          {
            formula: '宁可未雨绸缪，也不可 + [พฤติกรรมประมาท]',
            zh: '面对未来的养老生活，宁可未雨绸缪早做准备，也不可临渴掘井。',
            pinyin: 'Miànduì wèilái de yǎnglǎo shēnghuó, nìngkě wèiyǔchóumóu zǎo zuò zhǔnbèi, yě bù kě línkějuéjǐng.',
            th: 'เมื่อเผชิญกับชีวิตเกษียณในอนาคต ยอมเตรียมพร้อมไว้ก่อนดีกว่ารอให้กระหายน้ำแล้วค่อยขุดบ่อ',
            en: 'Facing future retirement, it is better to prepare in advance rather than digging a well when thirsty.'
          },
          {
            formula: '借助复利的力量，实现...',
            zh: '年轻时定期定额投资，借助复利效应积攒充足的养老储备。',
            pinyin: 'Niánqīng shí dìngqī dìng’é tóuzī, jièzhù fùlì xiàoyì jīzǎn chōngzú de yǎnglǎo chǔbèi.',
            th: 'ตอนยังอายุน้อยให้ลงทุนแบบถัวเฉลี่ยสม่ำเสมอ (DCA) อาศัยพลังดอกเบี้ยทบต้นสะสมเงินสำรองเกษียณให้เต็มเปี่ยม',
            en: 'Investing fixed amounts regularly when young uses compound interest to accumulate ample retirement reserves.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'เสี่ยวเฉิน (คนหนุ่มสาว) 🧑‍💼',
          zh: '王老师，我现在才三十岁，现在开始考虑养老投资会不会太早了？',
          pinyin: 'Wáng lǎoshī, wǒ xiànzài cái sānshí suì, xiànzài kāishǐ kǎolǜ yǎnglǎo tóuzī huì bú huì tài zǎo le?',
          th: 'อาจารย์หวังครับ ตอนนี้ผมเพิ่งอายุสามสิบ เริ่มคิดเรื่องลงทุนเพื่อการเกษียณตอนนี้จะเร็วเกินไปไหมครับ?',
          en: 'Teacher Wang, I am only thirty now, is it too early to consider retirement investing?'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ผู้เชี่ยวชาญการวางแผนการเงิน) 👨‍🏫',
          zh: '一点都不早！爱因斯坦说“复利是世界第八大奇迹”。时间越长，复利创造的价值越惊人。',
          pinyin: 'Yìdiǎn dōu bù zǎo! Àiyīnsītǎn shuō “fùlì shì shìjiè dì bā dà qíjì”. Shíjiān yuè cháng, fùlì chuàngzào de jiàzhí yuè jīngrén.',
          th: 'ไม่เร็วไปเลยครับ! ไอน์สไตน์กล่าวว่า "ดอกเบี้ยทบต้นคือสิ่งมหัศจรรย์อันดับแปดของโลก" ยิ่งเวลานานเท่าใด คุณค่าที่ดอกเบี้ยทบต้นสร้างยิ่งน่าทึ่งครับ',
          en: 'Not early at all! Einstein said "compound interest is the eighth wonder of the world." The longer the time, the more astonishing the value created by compound interest.'
        },
        {
          speaker: 'A',
          speaker_name: 'เสี่ยวเฉิน (คนหนุ่มสาว) 🧑‍💼',
          zh: '所谓“未雨绸缪”，早一点储备资金，将来的生活才能更加从容稳健。',
          pinyin: 'Suǒwèi “wèiyǔchóumóu”, zǎo yìdiǎn chǔbèi zījīn, jiānglái de shēnghuó cái néng gèngjiā cóngróng wěnjiàn.',
          th: 'ดั่งคำที่ว่า "ซ่อมรังก่อนฝนตก" สำรองเงินทุนเร็วขึ้นสักหน่อย ชีวิตในอนาคตจึงจะสุขุมและมั่นคงยิ่งขึ้น',
          en: 'As the saying goes, "prepare before it rains"; accumulating reserves earlier allows future life to be more leisurely and secure.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ผู้เชี่ยวชาญการวางแผนการเงิน) 👨‍🏫',
          zh: '说得好！每月坚持定投稳健型基金，三十年后你一定会感谢今天未雨绸缪的自己。',
          pinyin: 'Shuō de hǎo! Měi yuè jiānchí dìngtóu wěnjiàn xíng jījīn, sānshí nián hòu nǐ yídìng huì gǎnxiè jīntiān wèiyǔchóumóu de zìjǐ.',
          th: 'พูดได้ดีมากครับ! อดทนลงทุนสม่ำเสมอในกองทุนที่มั่นคงทุกเดือน สามสิบปีข้างหน้าคุณจะต้องขอบคุณตัวเองในวันนี้ที่เตรียมพร้อมไว้ก่อนอย่างแน่นอนครับ',
          en: 'Well said! Persisting in dollar-cost averaging into prudent funds monthly, thirty years later you will surely thank yourself today for preparing ahead.'
        },
        {
          speaker: 'A',
          speaker_name: 'เสี่ยวเฉิน (คนหนุ่มสาว) 🧑‍💼',
          zh: '听了您的建议，我打算向身边的年轻朋友们积极推荐这种科学的理财方法！',
          pinyin: 'Tīng le nín de jiànyì, wǒ dǎsuàn xiàng shēnbiān de niánqīng péngyou men jījí tuījiàn zhè zhǒng kēxué de lǐcái fāngfǎ!',
          th: 'ฟังคำแนะนำของคุณแล้ว ผมตั้งใจจะแนะนำวิธีการบริหารเงินเชิงวิทยาศาสตร์แบบนี้ให้เพื่อนๆ วัยรุ่นรอบตัวอย่างกระตือรือร้นครับ!',
          en: 'Hearing your advice, I plan to actively recommend this scientific wealth management method to young friends around me!'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์หวัง (ผู้เชี่ยวชาญการวางแผนการเงิน) 👨‍🏫',
          zh: '非常好！互相鼓励、共同进步，大家都能早日实现自己的人生目标。',
          pinyin: 'Fēicháng hǎo! Hùxiāng gǔlì, gòngtóng jìnbù, dàjiā dōu néng zǎorì shíxiàn zìjǐ de rénshēng mùbiāo.',
          th: 'ยอดเยี่ยมมากครับ! ให้กำลังใจซึ่งกันและกัน ก้าวหน้าไปด้วยกัน ทุกคนก็สามารถบรรลุเป้าหมายชีวิตของตนเองได้เร็วยิ่งขึ้นครับ',
          en: 'Very good! Encouraging each other and progressing together, everyone can achieve their life goals sooner.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "สำนวน '未雨绸缪' (wèi yǔ chóu móu) มีความหมายตรงกับข้อใด?",
          options: [
            'การตระเตรียมการล่วงหน้าให้พร้อมสรรพก่อนที่ปัญหาหรือภัยพิบัติจะเกิดขึ้น',
            'การรอให้ฝนตกหนักแล้วค่อยออกไปซื้อร่ม',
            'การยกเลิกการเดินทางเพราะสภาพอากาศแย่',
            'การเล่นน้ำฝนอย่างสนุกสนาน'
          ],
          correct_index: 0,
          explanation_th: "'未雨绸缪' หมายถึง การซ่อมแซมรังนกให้แน่นหนาก่อนฝนจะตก หรือการตระเตรียมพร้อมรับมือก่อนเกิดเหตุวิกฤต",
          encouragement: 'ถูกต้องยอดเยี่ยม! เข้าใจสำนวนสุภาษิตการวางแผนชีวิตได้อย่างลึกซึ้ง!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '复利' (fùlì) หมายถึงแนวคิดทางการเงินใด?",
          options: [
            'Compound Interest (ดอกเบี้ยทบต้น)',
            'Simple Interest (ดอกเบี้ยเชิงเดี่ยว)',
            'Tax Refund (การขอคืนภาษี)',
            'Bank Bankruptcy (การล้มละลายของธนาคาร)'
          ],
          correct_index: 0,
          explanation_th: "'复利' คือพลังของดอกเบี้ยทบต้น (Compound Interest) ที่เงินต้นและดอกเบี้ยเดิมทบกันเพื่อสร้างผลตอบแทนใหม่",
          encouragement: 'แม่นยำมาก! จำคำศัพท์คณิตศาสตร์การเงินระดับโลกได้เป๊ะ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ยอมเตรียมพร้อมไว้ก่อน ดีกว่ารอให้กระหายน้ำแล้วค่อยขุดบ่อ"',
          tokens: ['临渴掘井', '宁可未雨绸缪', '也不可'],
          correct_sequence: ['宁可未雨绸缪', '也不可', '临渴掘井'],
          pinyin: 'Nìngkě wèiyǔchóumóu, yě bù kě línkějuéjǐng.',
          meaning_th: 'ยอมเตรียมพร้อมรับมือก่อน ดีกว่ารอให้กระหายน้ำแล้วค่อยขุดบ่อ',
          explanation_th: 'โครงสร้าง 宁可 A, 也不可 B (ยอมทำ A ดีกว่าทำ B ที่เป็นอันตราย)',
          encouragement: 'เรียงประโยคคติพจน์โบราณคู่แฝดได้อย่างงดงาม!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '未雨绸缪' ตัว '雨' (yǔ - ฝน) สื่อถึงสภาพแวดล้อมใด?",
          options: [
            'หยาดฝนฟ้าที่ตกลงมาจากก้อนเมฆบนท้องฟ้า',
            'สายลมพัดในทุ่งหญ้า',
            'เปลวไฟในเตาผิง',
            'ก้อนหินบนภูเขา'
          ],
          correct_index: 0,
          explanation_th: "'雨' เป็นอักษรภาพแสดงเมฆฝนและหยดน้ำฝนที่ร่วงหล่นลงมาสู่ผืนดิน สื่อถึงลมฝนพายุที่กำลังจะมาถึง",
          encouragement: 'มองทะลุอักษรภาพธรรมชาติได้อย่างเฉียบคม!'
        }
      ]
    },
    {
      lesson_id: 't3_u39_l04',
      lesson_number: 4,
      title: {
        zh: '财富自由与长远眼光',
        th: 'อิสรภาพทางการเงินและวิสัยทัศน์ระยะยาว',
        en: 'Financial Freedom & Long-term Vision'
      },
      can_do: {
        th: 'อธิบายแนวคิดอิสรภาพทางการเงิน การบริหารกระแสเงินสด และการประเมินผลตอบแทน (ROI)',
        en: 'Explain financial freedom, cash flow management, and return on investment (ROI)'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องกระแสเงินสด และพิชิต Boss Challenge เสนอพอร์ตการเงินลูกค้ามหาเศรษฐี!',
      vocabulary: [
        {
          id: 'hsk3_3916',
          hanzi: '财富',
          pinyin: 'cáifù',
          display_pinyin: 'cáifù',
          pinyin_tone: 'cai2fu4',
          meaning_th: 'ความมั่งคั่ง / ทรัพย์สมบัติ',
          meaning_en: 'wealth / riches',
          radical: '贝',
          radical_name_th: 'หมวดหอยเบี้ย/เงินตรา (贝字旁)',
          stroke_count: 16,
          mnemonic: 'ทรัพย์เงินทอง (财) อันมั่งคั่งอุดมสมบูรณ์ (富) = ความมั่งคั่ง',
          kid_mnemonic: 'ถุงผ้าไหมสีแดงที่บรรจุเหรียญทองคำเปล่งประกายวิบวับ = 财富',
          body_gesture: 'สองมือทำท่าประคองสิ่งของขนาดใหญ่แสดงความมั่งคั่งพรั่งพร้อม'
        },
        {
          id: 'hsk3_3917',
          hanzi: '现金流',
          pinyin: 'xiànjīnliú',
          display_pinyin: 'xiànjīnliú',
          pinyin_tone: 'xian4jin1liu2',
          meaning_th: 'กระแสเงินสด (Cash flow)',
          meaning_en: 'cash flow',
          radical: '王',
          radical_name_th: 'หมวดหยก/ราชา (王字旁)',
          stroke_count: 26,
          mnemonic: 'เงินสดที่มีอยู่จริง (现金) ไหลเวียนดั่งสายธาร (流) = กระแสเงินสด',
          kid_mnemonic: 'แม่น้ำสีเขียวมรกตที่พัดพาเหรียญทองคำไหลเข้ามาอย่างต่อเนื่อง = 现金流',
          body_gesture: 'กวาดมือขวาเป็นคลื่นน้ำไหลเข้าหาตัวแสดงกระแสเงินสดไหลเข้า'
        },
        {
          id: 'hsk3_3918',
          hanzi: '规划',
          pinyin: 'guīhuà',
          display_pinyin: 'guīhuà',
          pinyin_tone: 'gui1hua4',
          meaning_th: 'การวางแผนระยะยาว / แผนแม่บทเชิงกลยุทธ์',
          meaning_en: 'planning / long-term scheme',
          radical: '见',
          radical_name_th: 'หมวดพบเห็น (见字旁)',
          stroke_count: 16,
          mnemonic: 'กฎเกณฑ์แบบแผน (规) วาดเส้นทางสู่อนาคต (划) = แผนแม่บทระยะยาว',
          kid_mnemonic: 'พิมพ์เขียวแผนที่เกาะมหาสมบัติที่มีเส้นประนำทางอย่างชัดเจน = 规划',
          body_gesture: 'สองมือคลี่กระดาษพิมพ์เขียวแผนที่กางออกกว้างๆ'
        },
        {
          id: 'hsk3_3919',
          hanzi: '敏锐',
          pinyin: 'mǐnruì',
          display_pinyin: 'mǐnruì',
          pinyin_tone: 'min3rui4',
          meaning_th: 'เฉียบคม / ไวต่อโอกาสและความเปลี่ยนแปลง',
          meaning_en: 'keen / sharp / perceptive',
          radical: '攵',
          radical_name_th: 'หมวดเคาะเบาๆ (反文旁)',
          stroke_count: 23,
          mnemonic: 'ว่องไวรวดเร็ว (敏) คมกริบดั่งปลายกระบี่ (锐) = เฉียบคม ไวต่อโอกาส',
          kid_mnemonic: 'นกอินทรีที่มีสายตาคมกริบมองเห็นปลาใต้ผิวน้ำจากเวหา = 敏锐',
          body_gesture: 'ชี้นิ้วชี้แตะหางตาชี้ตรงไปข้างหน้าแสดงสายตาที่เฉียบคม'
        },
        {
          id: 'hsk3_3920',
          hanzi: '投资回报',
          pinyin: 'tóuzī huíbào',
          display_pinyin: 'tóuzī huíbào',
          pinyin_tone: 'tou2zi1 hui2bao4',
          meaning_th: 'ผลตอบแทนจากการลงทุน (ROI: Return on Investment)',
          meaning_en: 'return on investment (ROI)',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 28,
          mnemonic: 'การลงเงินทุนไป (投资) ย้อนตอบแทนกลับคืนมาเป็นกำไร (回报) = ผลตอบแทนลงทุน',
          kid_mnemonic: 'ปลูกต้นกล้า 1 ต้น ได้ผลไม้สีทองกลับมาเต็มต้น = 投资回报',
          body_gesture: 'ยื่นมือไปข้างหน้าแล้วดึงกลับมาพร้อมกำหมัดรับผลตอบแทน'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 现金流 (xiànjīnliú) เสียง 4-1-2',
        description_th: 'xiàn เป็นเสียง 4 หนักสั้น, jīn เป็นเสียง 1 สูงเรียบ, liú เป็นเสียง 2 ทอดเสียงขึ้นนุ่มนวล',
        example: '充裕的现金流 (chōngyù de xiànjīnliú: กระแสเงินสดอันคล่องตัวและเหลือเฟือ)',
        fun_metaphor: 'เหมือนก้าวลงบันได ตึ้ก! เดินเรียบบนพื้น... แล้วกระโดดขึ้นเรือลอยน้ำ ฮึบ!',
        reassurance: 'คำว่า 现金流 เป็นศัพท์ทางการเงินที่ผู้บริหารและนักธุรกิจพูดถึงทุกวัน'
      },
      grammar_bite: {
        title: 'โครงสร้างการบรรลุอิสรภาพทางการเงิน: 建立持续正向的现金流，从而实现...',
        explanation_th: 'ใช้ในการนำเสนอเป้าหมายสูงสุดของการบริหารการเงินส่วนบุคคลและองค์กร',
        patterns: [
          {
            formula: '建立持续的现金流，从而逐步实现 + [เป้าหมาย]',
            zh: '通过多元化配置建立持续的现金流，从而逐步实现财富自由。',
            pinyin: 'Tōngguò duōyuánhuà pèizhì jiànlì chíxù de xiànjīnliú, cóng’ér zhúbù shíxiàn cáifù zìyóu.',
            th: 'สร้างกระแสเงินสดที่ต่อเนื่องผ่านการจัดสรรที่หลากหลาย เพื่อค่อยๆ ก้าวสู่อิสรภาพทางการเงิน',
            en: 'Building continuous cash flow through diversification to gradually achieve financial freedom.'
          },
          {
            formula: '凭借敏锐的市场眼光，追求合理的投资回报',
            zh: '投资者需要凭借敏锐的市场眼光，理性追求长期的投资回报。',
            pinyin: 'Tóuzīzhě xūyào píngjiè mǐnruì de shìchǎng yǎnguāng, lǐxìng zhuīqiú chángqī de tóuzī huíbào.',
            th: 'นักลงทุนจำเป็นต้องอาศัยสายตาที่เฉียบคมต่อตลาด มุ่งแสวงหาผลตอบแทนจากการลงทุนระยะยาวอย่างมีเหตุผล',
            en: 'Investors need to rely on keen market insight to rationally pursue long-term return on investment.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลี่ (พนักงาน) 🧑‍💼',
          zh: '王顾问，我和几位大学同学都在追求所谓的“财富自由”，到底怎样的标准才算真正实现了呢？',
          pinyin: 'Wáng gùwèn, wǒ hé jǐ wèi dàxué tóngxué dōu zài zhuīqiú suǒwèi de “cáifù zìyóu”, dàodǐ zěnyàng de biāozhǔn cái suàn zhēnzhèng shíxiàn le ne?',
          th: 'ที่ปรึกษาหวังครับ ผมกับเพื่อนร่วมชั้นมหาวิทยาลัยหลายคนต่างแสวงหาสิ่งที่เรียกว่า "อิสรภาพทางการเงิน" แท้จริงแล้วมาตรฐานแบบใดจึงจะถือว่าบรรลุได้จริงๆ ครับ?',
          en: 'Advisor Wang, several of my college classmates and I are pursuing so-called "financial freedom," what standard truly defines its achievement?'
        },
        {
          speaker: 'B',
          speaker_name: 'หวัง (ที่ปรึกษาการเงิน) 👩‍💼',
          zh: '真正的财富自由，是指你的资产产生的被动现金流，能够完全覆盖日常的所有开支。',
          pinyin: 'Zhēnzhèng de cáifù zìyóu, shì zhǐ nǐ de zīchǎn chǎnshēng de bèidòng xiànjīnliú, nénggòu wánquán fùgài rìcháng de suǒyǒu kāizhī.',
          th: 'อิสรภาพทางการเงินที่แท้จริง หมายถึงกระแสเงินสดแบบพาสซีฟที่สร้างจากสินทรัพย์ของคุณ สามารถครอบคลุมรายจ่ายประจำวันทั้งหมดได้อย่างสมบูรณ์ค่ะ',
          en: 'True financial freedom means that passive cash flow generated by your assets can completely cover all daily living expenses.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่ (พนักงาน) 🧑‍💼',
          zh: '这需要非常严密的财务规划与极其敏锐的投资眼光啊！',
          pinyin: 'Zhè xūyào fēicháng yánmì de cáiwù guīhuà yǔ jíqí mǐnruì de tóuzī yǎnguāng a!',
          th: 'สิ่งนี้ต้องอาศัยการวางแผนทางการเงินที่รัดกุมมาก และสายตาการลงทุนที่เฉียบคมอย่างยิ่งเลยนะครับ!',
          en: 'This requires very rigorous financial planning and extremely keen investment foresight!'
        },
        {
          speaker: 'B',
          speaker_name: 'หวัง (ที่ปรึกษาการเงิน) 👩‍💼',
          zh: '是的，不要只盯着短期的暴利，注重长期稳定的投资回报，每个人都能拥有从容的人生。',
          pinyin: 'Shì de, bú yào zhǐ dīng zhe duǎnqī de bàolì, zhùzhòng chángqī wěndìng de tóuzī huíbào, měi ge rén dōu néng yōngyǒu cóngróng de rénshēng.',
          th: 'ใช่ค่ะ อย่าจ้องมองแต่ผลกำไรเกินจริงระยะสั้น ให้ความสำคัญกับผลตอบแทนการลงทุนที่มั่นคงในระยะยาว ทุกคนก็สามารถมีชีวิตที่สุขุมมั่นคงได้ค่ะ',
          en: 'Yes, do not merely fixate on short-term windfalls; prioritize long-term stable investment returns, and everyone can lead a calm and dignified life.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่ (พนักงาน) 🧑‍💼',
          zh: '在努力追求财富的同时，合理安排工作与生活的时间，照顾好身体与家庭，才能拥有真正幸福的人生。',
          pinyin: 'Zài nǔlì zhuīqiú cáifù de tóngshí, hélǐ ānpái gōngzuò yǔ shēnghuó de shíjiān, zhàogù hǎo shēntǐ yǔ jiātíng, cái néng yōngyǒu zhēnzhèng xìngfú de rénshēng.',
          th: 'ในขณะที่พยายามแสวงหาความมั่งคั่ง การจัดสรรเวลาการทำงานและการใช้ชีวิตอย่างสมเหตุสมผล ดูแลสุขภาพร่างกายและครอบครัวให้ดี จึงจะสามารถมีชีวิตที่มีความสุขอย่างแท้จริง',
          en: 'While striving to pursue wealth, reasonably arranging work and life time, caring for health and family is the only way to have a truly happy life.'
        },
        {
          speaker: 'B',
          speaker_name: 'หวัง (ที่ปรึกษาการเงิน) 👩‍💼',
          zh: '没错，身体健康是最大的本钱，财富只是实现理想的工具，内心的充实与快乐才是最终的目标。',
          pinyin: 'Méi cuò, shēntǐ jiànkāng shì zuì dà de běnqián, cáifù zhǐshì shíxiàn lǐxiǎng de gōngjù, nèixīn de chōngshí yǔ kuàilè cái shì zuìzhōng de mùbiāo.',
          th: 'ถูกต้องค่ะ สุขภาพร่างกายที่แข็งแรงคือต้นทุนที่ใหญ่ที่สุด ความมั่งคั่งเป็นเพียงเครื่องมือในการบรรลุอุดมการณ์ ความเต็มอิ่มและความสุขภายในใจต่างหากคือเป้าหมายสูงสุด',
          en: 'Exactly, physical health is the greatest capital; wealth is merely a tool to fulfill ideals; inner fulfillment and happiness are the ultimate goal.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่ (พนักงาน) 🧑‍💼',
          zh: '太谢谢王顾问了，今天真的很高兴，明天我就开始认真做财务规划！',
          pinyin: 'Tài xièxie Wáng gùwèn le, jīntiān zhēn de hěn gāoxìng, míngtiān wǒ jiù kāishǐ rènzhēn zuò cáiwù guīhuà!',
          th: 'ขอบคุณที่ปรึกษาหวังมากครับ วันนี้ดีใจมากจริงๆ พรุ่งนี้ผมจะเริ่มวางแผนการเงินอย่างจริงจังเลยครับ!',
          en: 'Thank you so much Advisor Wang, truly very happy today, tomorrow I will start seriously doing financial planning!'
        },
        {
          speaker: 'B',
          speaker_name: 'หวัง (ที่ปรึกษาการเงิน) 👩‍💼',
          zh: '不客气，祝你投资顺利，再见！',
          pinyin: 'Bú kèqi, zhù nǐ tóuzī shùnlì, zàijiàn!',
          th: 'ยินดีค่ะ ขอให้คุณลงทุนอย่างราบรื่น ลาก่อนนะคะ!',
          en: 'You are welcome, wish you smooth investing, goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "วลี '财富自由' (cáifù zìyóu) ในโลกการเงินหมายถึงสภาวะใด?",
          options: [
            'สภาวะที่รายได้จากกระแสเงินสดของสินทรัพย์มากกว่ารายจ่าย ทำให้ไม่ต้องทำงานเพื่อหาเงินเลี้ยงชีพ (Financial Freedom)',
            'การได้รับแจกเงินรางวัลลอตเตอรี่ก้อนโต',
            'การใช้จ่ายเงินจนหมดบัญชีโดยไม่ต้องคิดมาก',
            'การกู้เงินซื้อบ้านหรูริมทะเล'
          ],
          correct_index: 0,
          explanation_th: "'财富自由' (Financial Freedom) คือสภาวะที่มี Passive Income หรือกระแสเงินสดจากสินทรัพย์เพียงพอต่อการใช้ชีวิตอย่างอิสระ",
          encouragement: 'ถูกต้องยอดเยี่ยม! เข้าใจเป้าหมายสูงสุดของการบริหารการเงิน!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '现金流' สอดคล้องกับคำศัพท์ภาษาอังกฤษข้อใด?",
          options: [
            'Cash Flow',
            'Stock Dividend',
            'Credit Rating',
            'Tax Deduction'
          ],
          correct_index: 0,
          explanation_th: "'现金流' แปลว่า กระแสเงินสด (Cash Flow) ซึ่งเป็นชีพจรชี้ขาดความมั่นคงทางการเงิน",
          encouragement: 'แม่นยำมาก! จำคำศัพท์วิชาชีพการเงินสากลได้เป๊ะ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "สร้างกระแสเงินสดที่ต่อเนื่อง เพื่อค่อยๆ ก้าวสู่อิสรภาพทางการเงิน"',
          tokens: ['财富自由', '建立持续现金流', '从而逐步实现'],
          correct_sequence: ['建立持续现金流', '从而逐步实现', '财富自由'],
          pinyin: 'Jiànlì chíxù xiànjīnliú, cóng’ér zhúbù shíxiàn cáifù zìyóu.',
          meaning_th: 'สร้างกระแสเงินสดที่ต่อเนื่อง เพื่อค่อยๆ บรรลุอิสรภาพทางการเงิน',
          explanation_th: 'วิธีการปฏิบัติ (建立持续现金流) + คำเชื่อมและผลลัพธ์ (从而逐步实现) + เป้าหมาย (财富自由)',
          encouragement: 'เรียงประโยคพิมพ์เขียวการเงินได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '财富' ตัว '富' (ความมั่งคั่ง/อุดมสมบูรณ์) มีหมวดนำใดอยู่ด้านบน?",
          options: [
            '宀 (หมวดหลังคาบ้าน 宝盖头)',
            '穴 (หมวดถ้ำ 穴宝盖)',
            '广 (หมวดอาคาร 广字旁)',
            '户 (หมวดประตู 户字头)'
          ],
          correct_index: 0,
          explanation_th: "'富' มีหมวด '宀' (หลังคาบ้าน) และมี 一 口 田 (ผืนนาและปากท้อง) ด้านล่าง สื่อถึงใต้หลังคาเรือนมีที่ดินและเสบียงสมบูรณ์",
          encouragement: 'เข้าใจลึกซึ้งถึงสัญลักษณ์แห่งความอุดมสมบูรณ์ในอักษรจีน!'
        }
      ],
      boss_challenge: {
        scenario_th: 'ในฐานะที่ปรึกษาการเงินอาวุโส (Private Wealth Advisor) คุณกำลังนำเสนอพอร์ตการลงทุนแก่ลูกค้ามหาเศรษฐีที่กังวลเรื่องเงินเฟ้อและความผันผวนของตลาด คุณควรสรุปกลยุทธ์การจัดสรรอย่างไรให้ได้รับความไว้วางใจสูงสุด?',
        options: [
          '投资必须兼顾本金安全与长期收益，我们要坚持未雨绸缪，通过合理资产配置与严格止损防范波动，借助复利与稳健现金流实现财富的长久保值与代际传承！ (Tóuzī bìxū jiāngù běnjīn ānquán yǔ chángqī shōuyì, wǒmen yào jiānchí wèiyǔchóumóu, tōngguò hélǐ zīchǎn pèizhì yǔ yángé zhǐsǔn fángfàn bōdòng, jièzhù fùlì yǔ wěnjiàn xiànjīnliú shíxiàn cáifù de chángjiǔ bǎozhí yǔ dàijì chuánchéng!)',
          '把全部资金借给我炒短线，保证一个月翻三倍！ (Bǎ quánbù zījīn jiè gěi wǒ chǎo duǎnxiàn, bǎozhèng yí ge yuè fān sān bèi!)',
          '投资太危险了，把现金全藏在家里的床底下最安全。 (Tóuzī tài wēixiǎn le, bǎ xiànjīn quán cáng zài jiā lǐ de chuáng dǐxià zuì ānquán.)',
          '请问你们公司的保险箱密码是多少？ (Qǐngwèn nǐmen gōngsī de bǎoxiǎnxiāng mìmǎ shì duōshao?)'
        ],
        correct_index: 0,
        explanation_th: "คำตอบ '投资必须兼顾本金安全与长期收益...实现财富的长久保值与代际传承！' ผสานความปลอดภัยของเงินต้น, สำนวน 未雨绸缪, การคุมความเสี่ยงและจุดตัดขาดทุน (止损), ดอกเบี้ยทบต้น (复利), และการส่งต่อความมั่งคั่งข้ามรุ่นได้อย่างยอดเยี่ยมที่สุด",
        encouragement: 'ยินดีด้วย! คุณพิชิต Boss Challenge ได้รับมอบหมายให้บริหารพอร์ตการเงินระดับหมื่นล้าน!'
      },
      cheer_trophy: {
        badge_id: 'badge_t3_u39_master',
        badge_name: 'กุนซือกลยุทธ์การเงินและความมั่งคั่งยั่งยืน 💰📈',
        message_th: 'สุดยอดมาก! คุณได้พิชิตบทเรียนยูนิตที่ 39 สำเร็จอย่างงดงาม เชี่ยวชาญศัพท์การจัดสรรสินทรัพย์ การจัดการความเสี่ยง ดอกเบี้ยทบต้น และอิสรภาพทางการเงินระดับ Master!',
        xp_reward: 300
      }
    }
  ]
};
