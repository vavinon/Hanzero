import { UnitLessonData } from '../../src/types/lesson';

export const unit41Data: UnitLessonData = {
  unit_id: 'tier3_u41',
  tier: 3,
  unit_number: 41,
  title: {
    zh: '网络热梗与流行语',
    th: 'ศัพท์ฮิตโซเชียลและวัฒนธรรมป๊อปจีน',
    en: 'Internet Memes & Pop Culture Buzzwords'
  },
  description: 'เรียนรู้ภาษาจีนร่วมสมัย ศัพท์สแลงบนโลกออนไลน์ ยุคดิจิทัล และสำนวน 半途而废 เพื่อความเข้าใจในสังคมยุคใหม่',
  lessons: [
    {
      lesson_id: 't3_u41_l01',
      lesson_number: 1,
      title: {
        zh: '当代年轻人的情绪表达',
        th: 'การแสดงอารมณ์ของคนรุ่นใหม่ในโลกออนไลน์',
        en: 'Youth Emotional Expression Online'
      },
      can_do: {
        th: 'ใช้คำสแลงยอดนิยม เช่น 破防 (สะเทือนใจ/ใจพัง), 绝绝子 (เริ่ดที่สุด/ปังมาก) และ 躺平 (นอนราบ/ไม่ดิ้นรน)',
        en: 'Use popular online buzzwords like Pofang (break through defenses), Juejuezi (superb), and Tangping (lying flat)'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาคำสแลงอารมณ์ยอดฮิตบนอินเทอร์เน็ตจีนได้อย่างเป็นธรรมชาติ!',
      vocabulary: [
        {
          id: 'hsk3_4101',
          hanzi: '破防',
          pinyin: 'pòfáng',
          display_pinyin: 'pòfáng',
          pinyin_tone: 'po4fang2',
          meaning_th: 'สะเทือนใจอย่างรุนแรง / ซึ้งจนน้ำตาไหล / เกราะกำแพงในใจพังทลาย',
          meaning_en: 'break through defense / emotionally overwhelmed / deeply moved',
          radical: '石',
          radical_name_th: 'หมวดหิน (石字旁)',
          stroke_count: 16,
          mnemonic: 'ทำลาย (破) กำแพงป้องกัน (防) = จิตใจถูกกระแทกจนสะเทือนใจ',
          kid_mnemonic: 'กำแพงหัวใจพังทลายเมื่อดูฉากซึ้งในภาพยนตร์ = 破防',
          body_gesture: 'สองมือกุมหน้าอกพร้อมทำหน้าซาบซึ้งใจ'
        },
        {
          id: 'hsk3_4102',
          hanzi: '绝绝子',
          pinyin: 'juéjuézi',
          display_pinyin: 'juéjuézi',
          pinyin_tone: 'jue2jue2zi',
          meaning_th: 'ปังมาก / เริ่ดที่สุด / ยอดเยี่ยมเกินบรรยาย (ศัพท์สแลงสไตล์วัยรุ่น)',
          meaning_en: 'absolutely amazing / top tier / superb (slang)',
          radical: '纟',
          radical_name_th: 'หมวดไหม (绞丝旁)',
          stroke_count: 21,
          mnemonic: 'สุดยอดไร้คู่แข่ง (绝) สองเท่า = ปังที่สุดในสามโลก',
          kid_mnemonic: 'ยกสองนิ้วโป้งร้องชมอาหารอร่อยจนแสงออกปาก = 绝绝子',
          body_gesture: 'ยกนิ้วโป้งสองข้างขึ้นพร้อมกันแล้วโยกตัวเบาๆ'
        },
        {
          id: 'hsk3_4103',
          hanzi: '躺平',
          pinyin: 'tǎngxíng',
          display_pinyin: 'tǎngpíng',
          pinyin_tone: 'tang3ping2',
          meaning_th: 'นอนราบ / ปล่อยวางไม่ดิ้นรนแข่งขัน / ขอพักความกดดัน',
          meaning_en: 'lie flat / opting out of the rat race',
          radical: '身',
          radical_name_th: 'หมวดร่างกาย (身字旁)',
          stroke_count: 20,
          mnemonic: 'เอนตัวนอนลง (躺) ราบเรียบกับพื้น (平) = นอนราบ ไม่แก่งแย่ง',
          kid_mnemonic: 'นอนกางแขนกางขาพักผ่อนบนสนามหญ้าเขียวขจี = 躺平',
          body_gesture: 'กางแขนสองข้างออกด้านข้างทำท่านอนผ่อนคลาย'
        },
        {
          id: 'hsk3_4104',
          hanzi: '摆烂',
          pinyin: 'bǎilàn',
          display_pinyin: 'bǎilàn',
          pinyin_tone: 'bai3lan4',
          meaning_th: 'ปล่อยเบลอ / ยอมแพ้ทิ้งไว้แบบนั้น / ปล่อยให้พังไปเลย',
          meaning_en: 'let it rot / give up trying / play bad on purpose',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 20,
          mnemonic: 'วางทิ้งไว้ (摆) ให้เน่าเสีย (烂) = ปล่อยให้แย่ไปเลย ไม่แก้แล้ว',
          kid_mnemonic: 'เล่นเกมไม่ทันแล้วปล่อยจอยวางมือถือ = 摆烂',
          body_gesture: 'หงายมือสองข้างยักไหล่ทำท่าไม่สนอะไรแล้ว'
        },
        {
          id: 'hsk3_4105',
          hanzi: '内卷',
          pinyin: 'nèijuǎn',
          display_pinyin: 'nèijuǎn',
          pinyin_tone: 'nei4juan3',
          meaning_th: 'การแข่งขันที่ดุเดือดไร้ประโยชน์ / การแก่งแย่งอย่างเหนื่อยล้า',
          meaning_en: 'involution / hyper-competition without progress',
          radical: '冂',
          radical_name_th: 'หมวดกรอบล้อม (同字框)',
          stroke_count: 12,
          mnemonic: 'ม้วนตัวเข้าไปข้างใน (内卷) แย่งชิงทรัพยากรเดิม = การแข่งขันดุเดือด',
          kid_mnemonic: 'ทุกคนในห้องก้มหน้าอ่านหนังสือดึกดื่นแข่งกันไม่ออกจากห้อง = 内卷',
          body_gesture: 'ทำมือหมุนวนเข้าหาตัวเป็นวงกลมเร็วๆ'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำสแลงซ้ำเสียง 绝绝子 (juéjuézi)',
        description_th: 'jué เป็นเสียง 2 ผันขึ้นสองครั้ง แล้วลงท้ายด้วย zi เสียงเบาเพื่อเพิ่มความน่ารักและอารมณ์ขัน',
        example: '这道菜简直是绝绝子！(Zhè dào cài jiǎnzhí shì juéjuézi!)',
        fun_metaphor: 'เหมือนเสียงกระโดดสองจังหวะดึ๋งๆ แล้วแตะพื้นนุ่มนิ่ม',
        reassurance: 'คำสแลงวัยรุ่นมักเติม 子 ท้ายคำเพื่อสร้างโทนสนทนาที่ผ่อนคลายและเป็นกันเอง'
      },
      grammar_bite: {
        title: 'โครงสร้างสะเทือนอารมณ์: 看完...瞬间破防，让人感到...',
        explanation_th: 'ใช้บรรยายสิ่งที่สะเทือนใจหรือประทับใจจนทำลายเกราะความรู้สึกที่เข้มแข็งลงทันที',
        patterns: [
          {
            formula: '看到/听到 + [เรื่องราว], 瞬间破防了',
            zh: '看到消防员舍己救人的新闻，无数网友瞬间破防了。',
            pinyin: 'Kàndào xiāofángyuán shějǐ jiùrén de xīnwén, wúshù wǎngyǒu shùnjiān pòfáng le.',
            th: 'เมื่อเห็นข่าวนักดับเพลิงสละชีวิตช่วยเหลือผู้อื่น ชาวเน็ตนับไม่ถ้วนต่างสะเทือนใจซึ้งจนน้ำตาไหลทันที',
            en: 'Seeing news of firefighters sacrificing themselves to save others, countless netizens were instantly overwhelmed with emotion.'
          },
          {
            formula: '这味道/景色简直是绝绝子！',
            zh: '这家老字号小吃店的汤包，口感简直是绝绝子！',
            pinyin: 'Zhè jiā lǎozìhào xiǎochīdiàn de tāngbāo, kǒugǎn jiǎnzhí shì juéjuézi!',
            th: 'ซาลาเปาน้ำของร้านเก่าแก่ร้านนี้ รสสัมผัสบอกได้คำเดียวว่าปังที่สุดในสามโลก!',
            en: 'The soup dumplings of this time-honored snack shop have a texture that is simply out of this world!'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลิน (คนทำงานรุ่นใหม่) 👩‍💼',
          zh: '小王，听说你们部门最近连续加班两周，大家都还好吧？',
          pinyin: 'Xiǎo Wáng, tīngshuō nǐmen bùmén zuìjìn liánxù jiābān liǎng zhōu, dàjiā dōu hái hǎo ba?',
          th: 'เสี่ยวหวัง ได้ยินว่าแผนกพวกคุณทำงานล่วงเวลาติดต่อกันสองสัปดาห์ ทุกคนยังโอเคไหมคะ?',
          en: 'Xiao Wang, I heard your department has been doing overtime for two consecutive weeks, is everyone doing okay?'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวหวัง (เพื่อนร่วมงาน) 🧑‍💼',
          zh: '行业内卷太严重了，大家虽然嘴上喊着想躺平或者摆烂，但实际工作中依然在全力以赴。',
          pinyin: 'Hángyè nèijuǎn tài yánzhòng le, dàjiā suīrán zuǐ shàng hǎn zhe xiǎng tǎngxíng huòzhě bǎilàn, dàn shíjì gōngzuò zhōng yīrán zài quánlìyǐfù.',
          th: 'การแข่งขันในวงการดุเดือดเกินไปครับ ทุกคนแม้ปากจะบ่นว่าอยากนอนราบหรือปล่อยจอย แต่ในการทำงานจริงก็ยังคงทุ่มเทเต็มที่ครับ',
          en: 'Industry involution is too severe; although everyone verbally complains about lying flat or giving up, in actual work they still go all out.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (คนทำงานรุ่นใหม่) 👩‍💼',
          zh: '昨晚看了一部关于普通打工人的短片，真实得让人瞬间破防，深有同感。',
          pinyin: 'Zuówǎn kàn le yí bù guānyú pǔtōng dǎgōngrén de duǎnpiàn, zhēnshí de ràng rén shùnjiān pòfáng, shēn yǒu tónggǎn.',
          th: 'เมื่อคืนดูคลิปสั้นเกี่ยวกับคนทำงานหาเช้ากินค่ำทั่วไปเรื่องหนึ่ง สมจริงจนสะเทือนใจทันที รู้สึกเข้าใจอย่างลึกซึ้งเลยค่ะ',
          en: 'Last night I watched a short film about ordinary wage earners; it was so realistic that my defenses were shattered instantly, feeling deep empathy.'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวหวัง (เพื่อนร่วมงาน) 🧑‍💼',
          zh: '那部短片的配乐简直是绝绝子，把当代年轻人的奋斗与温情展现得淋漓尽致。',
          pinyin: 'Nà bù duǎnpiàn de pèiyuè jiǎnzhí shì juéjuézi, bǎ dāngdài niánqīngrén de fèndòu yǔ wēnqíng zhǎnxiàn de línlíjìnzhì.',
          th: 'เพลงประกอบของคลิปนั้นปังมากครับ ถ่ายทอดการต่อสู้และความอบอุ่นของคนหนุ่มสาวยุคนี้ได้อย่างหมดจดงดงาม',
          en: 'The soundtrack of that short film was absolutely top tier, vividly expressing the struggle and warmth of contemporary youth.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (คนทำงานรุ่นใหม่) 👩‍💼',
          zh: '我们下班后一起去吃火锅放松一下吧，明天还要继续努力！',
          pinyin: 'Wǒmen xiàbān hòu yìqǐ qù chī huǒguō fàngsōng yíxià ba, míngtiān hái yào jìxù nǔlì!',
          th: 'เลิกงานแล้วพวกเราไปกินหม้อไฟผ่อนคลายด้วยกันเถอะค่ะ พรุ่งนี้ต้องสู้ต่อไป!',
          en: 'Let\'s go eat hotpot together to relax after work; tomorrow we will keep striving!'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวหวัง (เพื่อนร่วมงาน) 🧑‍💼',
          zh: '太好了，太谢谢你的邀请，今天认识新朋友真高兴，明天见！',
          pinyin: 'Tài hǎo le, tài xièxie nǐ de yāoqǐng, jīntiān rènshi xīn péngyou zhēn gāoxìng, míngtiān jiàn!',
          th: 'ดีจังเลยครับ ขอบคุณสำหรับคำเชิญมากๆ วันนี้รู้จักเพื่อนใหม่ดีใจจริงๆ พรุ่งนี้พบกันครับ!',
          en: 'Awesome, thank you so much for the invitation; very happy to meet new friends today, see you tomorrow!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำสแลง '破防' (pòfáng) บนอินเทอร์เน็ตจีน หมายถึงความรู้สึกใด?",
          options: [
            'จิตใจสะเทือนใจอย่างรุนแรง ซาบซึ้งจนน้ำตาซึม (Emotionally Overwhelmed)',
            'การเล่นเกมแพ้คู่แข่ง',
            'การเดินหกล้มบนถนน',
            'การถูกปรับเงินจากการขับรถเร็ว'
          ],
          correct_index: 0,
          explanation_th: "'破防' เดิมมาจากศัพท์เกมที่หมายถึงเกราะแตก แต่ในภาษาเน็ตหมายถึงความรู้สึกสะเทือนใจหรือซึ้งใจจนกลั้นน้ำตาไว้ไม่อยู่",
          encouragement: 'ถูกต้องยอดเยี่ยม! เข้าใจสแลงอารมณ์วัยรุ่นจีนได้อย่างแม่นยำ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '躺平' (tǎngxíng) สะท้อนถึงทัศนคติอย่างไรของคนรุ่นใหม่?",
          options: [
            'การลดความกดดัน ไม่เข้าร่วมการแก่งแย่งแข่งขันที่เหนื่อยล้าเกินไป',
            'การชอบนอนหลับกลางวันนานเกินไป',
            'การไปซื้อเตียงนอนใหม่',
            'การออกกำลังกายด้วยการวิดพื้น'
          ],
          correct_index: 0,
          explanation_th: "'躺平' (นอนราบ) หมายถึงการเลือกที่จะไม่กระโจนเข้าสู่การแข่งขันที่ดุเดือดเกินไป เพื่อรักษาสมดุลและความสงบในใจ",
          encouragement: 'แม่นยำมาก! เข้าใจปรากฏการณ์สังคมร่วมสมัยของจีน!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "เมื่อเห็นข่าวนักดับเพลิง ชาวเน็ตจำนวนมากสะเทือนใจทันที"',
          tokens: ['瞬间破防了', '看到消防员的新闻', '无数网友'],
          correct_sequence: ['看到消防员的新闻', '无数网友', '瞬间破防了'],
          pinyin: 'Kàndào xiāofángyuán de xīnwén, wúshù wǎngyǒu shùnjiān pòfáng le.',
          meaning_th: 'เมื่อเห็นข่าวนักดับเพลิง ชาวเน็ตนับไม่ถ้วนต่างสะเทือนใจทันที',
          explanation_th: 'ประโยคบอกเหตุการณ์ (看到消防员的新闻) + ประธาน (无数网友) + ภาคแสดงสแลง (瞬间破防了)',
          encouragement: 'ประกอบประโยคสแลงอารมณ์ได้อย่างคล่องแคล่ว!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '破防' ตัว '破' (pò - พัง/แตก) มีหมวดนำใด?",
          options: [
            '石 (หมวดหิน 石字旁)',
            '木 (หมวดไม้ 木字旁)',
            '火 (หมวดไฟ 火字旁)',
            '金 (หมวดโลหะ 金字旁)'
          ],
          correct_index: 0,
          explanation_th: "'破' ประกอบด้วย '石' (หิน) และ '皮' (หนังสัตว์) สื่อถึงการใช้หินกระแทกสิ่งของจนแตกหัก",
          encouragement: 'วิเคราะห์โครงสร้างอักษรได้อย่างลึกซึ้งเฉียบคม!'
        }
      ]
    },
    {
      lesson_id: 't3_u41_l02',
      lesson_number: 2,
      title: {
        zh: '社交平台的互动狂欢',
        th: 'การมีปฏิสัมพันธ์บนแพลตฟอร์มโซเชียลมีเดีย',
        en: 'Social Media Engagement Buzzwords'
      },
      can_do: {
        th: 'ใช้คำกริยาโซเชียลมีเดีย เช่น 吐槽 (บ่น/จิกกัด), 种草 (ป้ายยา), 拔草 (ถอนพิษป้ายยา) และ 打卡 (เช็กอิน)',
        en: 'Use social buzzwords like Tucao (roast/complain), Zhongcao (plant grass/recommend), Bacao (remove desire/pull weed), and Daka (check in)'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องการป้ายยา เช็กอิน และรีวิวบนโซเชียลจีนได้อย่างคล่องแคล่ว!',
      vocabulary: [
        {
          id: 'hsk3_4106',
          hanzi: '吐槽',
          pinyin: 'tùcáo',
          display_pinyin: 'tùcáo',
          pinyin_tone: 'tu4cao2',
          meaning_th: 'บ่น / จิกกัดอย่างมีอารมณ์ขัน / แซวข้อบกพร่อง',
          meaning_en: 'roast / complain / tease jokingly',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 19,
          mnemonic: 'พ่นคำพูดออกจากปาก (吐) ลงสู่รางน้ำ (槽) = บ่นระบายออกมา',
          kid_mnemonic: 'เพื่อนสองคนกินขนมแล้วบ่นแซวละครตลกในทีวี = 吐槽',
          body_gesture: 'ผายสองมือทำหน้าบ่นกระปอดกระแปดอย่างอารมณ์ดี'
        },
        {
          id: 'hsk3_4107',
          hanzi: '种草',
          pinyin: 'zhòngcǎo',
          display_pinyin: 'zhòngcǎo',
          pinyin_tone: 'zhong4cao3',
          meaning_th: 'ป้ายยา / ปลูกความอยากได้ในใจ / แนะนำสินค้าจนน่าซื้อ',
          meaning_en: 'plant grass / recommend a product / create craving to buy',
          radical: '禾',
          radical_name_th: 'หมวดต้นกล้า (禾木旁)',
          stroke_count: 18,
          mnemonic: 'เพาะปลูก (种) ต้นหญ้าแห่งความอยาก (草) ในใจ = ป้ายยา',
          kid_mnemonic: 'เพื่อนชี้โทรศัพท์เครื่องสวยให้ดูจนอยากได้ตาม = 种草',
          body_gesture: 'สองมือทำท่าหยอดเมล็ดพันธุ์ลงดินแล้วยิ้มตาโต'
        },
        {
          id: 'hsk3_4108',
          hanzi: '拔草',
          pinyin: 'bácǎo',
          display_pinyin: 'bácǎo',
          pinyin_tone: 'ba2cao3',
          meaning_th: 'ถอนหญ้า / ตัดใจไม่ซื้อแล้ว หรือ ซื้อสมใจอยากเพื่อถอนความกระหาย',
          meaning_en: 'pull grass / buy what one craved or remove desire to buy',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 18,
          mnemonic: 'ดึงถอน (拔) ต้นหญ้าความอยาก (草) ออกไป = ตัดใจหรือซื้อตัดจบ',
          kid_mnemonic: 'ถอนต้นหญ้าหน้าบ้านทิ้งเพื่อปลูกดอกไม้ใหม่ = 拔草',
          body_gesture: 'สองมือทำท่าดึงถอนต้นไม้ขึ้นจากพื้นอย่างมุ่งมั่น'
        },
        {
          id: 'hsk3_4109',
          hanzi: '打卡',
          pinyin: 'dǎkǎ',
          display_pinyin: 'dǎkǎ',
          pinyin_tone: 'da3ka3',
          meaning_th: 'เช็กอิน / บันทึกการมาเยือนสถานที่ยอดนิยม / ปฏิบัติภารกิจประจำวัน',
          meaning_en: 'check in / visit trendy spots / log daily routine',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 10,
          mnemonic: 'ตีการ์ด (打卡) ลงเวลา = เช็กอินสถานที่ฮิต',
          kid_mnemonic: 'ยืนถ่ายรูปคู่กับอนุสาวรีย์แลนด์มาร์กแล้วกดโพสต์ลงโซเชียล = 打卡',
          body_gesture: 'ยกสองมือทำท่าถือกล้องกดถ่ายรูปแล้วยกนิ้วสัญลักษณ์ V'
        },
        {
          id: 'hsk3_4110',
          hanzi: '蹭热度',
          pinyin: 'cèngrèdù',
          display_pinyin: 'cèngrèdù',
          pinyin_tone: 'ceng4re4du4',
          meaning_th: 'เกาะกระแส / โหนกระแสดัง / หาประโยชน์จากเรื่องที่กำลังฮิต',
          meaning_en: 'ride on the hype / piggyback on trending topics',
          radical: '足',
          radical_name_th: 'หมวดเท้า (足字旁)',
          stroke_count: 31,
          mnemonic: 'เบียดเสียดสัมผัส (蹭) ความร้อนแรง (热度) = เกาะกระแส',
          kid_mnemonic: 'นักข่าววิ่งตามดาราชื่อดังเพื่อให้ได้ภาพข่าว = 蹭热度',
          body_gesture: 'ทำมือสับไปข้างหน้าตามกระแสลมอย่างรวดเร็ว'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 打卡 (dǎkǎ) เสียง 3 ต่อด้วยเสียง 3 (Tone Sandhi)',
        description_th: 'dǎ (เสียง 3) นำหน้า kǎ (เสียง 3) ต้องผัน dǎ เป็นเสียง 2 (dákǎ)',
        example: '去网红书店打卡 (qù wǎnghóng shūdiàn dákǎ)',
        fun_metaphor: 'เหมือนกดชัตเตอร์ชึ้บ-ฉับ สองจังหวะสดใส',
        reassurance: 'คำว่า 打卡 ใช้บ่อยมากทั้งในความหมายตอกบัตรทำงานและเช็กอินสถานที่เที่ยว'
      },
      grammar_bite: {
        title: 'โครงสร้างการป้ายยา: 被好友疯狂种草，终于忍不住去拔草',
        explanation_th: 'ใช้อธิบายกระบวนการตั้งแต่ถูกแนะนำจนอยากได้ แล้วไปซื้อเพื่อสนองความต้องการ',
        patterns: [
          {
            formula: '被 + [คน/รีวิว] + 种草，打算 + [ทำอะไร]',
            zh: '我被同事疯狂种草了这款降噪耳机，打算周末就买。',
            pinyin: 'Wǒ bèi tóngshì fēngkuáng zhòngcǎo le zhè kuǎn jiàngzào ěrjī, dǎsuàn zhōumò jiù mǎi.',
            th: 'ฉันโดนเพื่อนร่วมงานป้ายยาหูฟังตัดเสียงรบกวนรุ่นนี้อย่างหนัก ตั้งใจว่าสุดสัปดาห์นี้จะซื้อเลยค่ะ',
            en: 'I was frantically sold on these noise-canceling headphones by a colleague and plan to buy them this weekend.'
          },
          {
            formula: '去网红景点打卡拍照',
            zh: '很多年轻人周末喜欢去历史古城打卡拍照，感受传统文化。',
            pinyin: 'Hěn duō niánqīngrén zhōumò xǐhuan qù lìshǐ gǔchéng dǎkǎ pāizhào, gǎnshòu chuántǒng wénhuà.',
            th: 'คนหนุ่มสาวจำนวนมากชอบไปเช็กอินถ่ายรูปที่เมืองโบราณทางประวัติศาสตร์ในวันหยุดเพื่อสัมผัสวัฒนธรรมดั้งเดิม',
            en: 'Many young people like to check in and take photos at historic ancient cities on weekends to experience traditional culture.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลิน (นักรีวิว) 👩‍💼',
          zh: '张老师，你看网上最新推荐的这家文化咖啡馆，去打卡的人可真多！',
          pinyin: 'Zhāng lǎoshī, nǐ kàn wǎngshàng zuìxīn tuījiàn de zhè jiā wénhuà kāfēiguǎn, qù dǎkǎ de rén kě zhēn duō!',
          th: 'อาจารย์จางคะ ดูคาเฟ่วัฒนธรรมที่ชาวเน็ตเพิ่งแนะนำร้านนี้สิคะ คนไปเช็กอินเยอะมากจริงๆ ค่ะ!',
          en: 'Teacher Zhang, look at this cultural cafe recently recommended online, so many people are going there to check in!'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์จาง (ผู้เชี่ยวชาญ) 👨‍🏫',
          zh: '我也被朋友种草好久了，据说那里的装潢非常雅致，明天我们一起去拔草吧。',
          pinyin: 'Wǒ yě bèi péngyou zhòngcǎo hǎo jiǔ le, jùshuō nàlǐ de zhuānghuáng fēicháng yǎzhì, míngtiān wǒmen yìqǐ qù bácǎo ba.',
          th: 'ผมเองก็โดนเพื่อนป้ายยามานานแล้ว ได้ยินว่าการตกแต่งที่นั่นประณีตงดงามมาก พรุ่งนี้พวกเราไปถอนหญ้าสมใจอยากกันเถอะครับ',
          en: 'I have also been tempted by friends for a long time; supposedly the decoration is very elegant, let us go check it out tomorrow.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (นักรีวิว) 👩‍💼',
          zh: '有些博主为了蹭热度故意夸大其词，但真实口碑好的店才真正值得去。',
          pinyin: 'Yǒuxiē bózhǔ wèile cèngrèdù gùyì kuādàqící, dàn zhēnshí kǒubēi hǎo de diàn cái zhēnzhèng zhíde qù.',
          th: 'บล็อกเกอร์บางคนจงใจพูดเกินจริงเพื่อโหนกระแส แต่ร้านที่มีเสียงชื่นชมจริงใจเท่านั้นจึงจะคุ้มค่าแก่การไปจริงๆ ค่ะ',
          en: 'Some bloggers deliberately exaggerate to ride on the hype, but only shops with genuine good word-of-mouth are truly worth visiting.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์จาง (ผู้เชี่ยวชาญ) 👨‍🏫',
          zh: '没错，面对网络信息要有分辨能力，不盲从、不乱吐槽，才能发现真正的生活之美。',
          pinyin: 'Méi cuò, miànduì wǎngluò xìnxī yào yǒu fēnbiàn nénglì, bù mángcóng, bú luàn tùcáo, cái néng fāxiàn zhēnzhèng de shēnghuó zhī měi.',
          th: 'ถูกต้องครับ เมื่อเผชิญกับข้อมูลออนไลน์ต้องมีวิจารณญาณ ไม่ตามกระแสอย่างไร้สติ ไม่เที่ยวบ่นจิกกัดเรื่อยเปื่อย จึงจะค้นพบความงามที่แท้จริงของชีวิตครับ',
          en: 'Exactly, one needs discernment when facing online info, neither blindly following nor randomly complaining, to discover life\'s true beauty.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (นักรีวิว) 👩‍💼',
          zh: '太谢谢老师的指点，今天能和您认真交流，我心里非常高兴，明天见！',
          pinyin: 'Tài xièxie lǎoshī de zhǐdiǎn, jīntiān néng hé nín rènzhēn jiāoliú, wǒ xīnlǐ fēicháng gāoxìng, míngtiān jiàn!',
          th: 'ขอบพระคุณคำชี้แนะของอาจารย์มากค่ะ วันนี้ได้แลกเปลี่ยนกับคุณอย่างจริงจัง ในใจดิฉันดีใจมาก แล้วพรุ่งนี้พบกันนะคะ!',
          en: 'Thank you so much for your guidance, Teacher; having an earnest discussion with you makes me very happy, see you tomorrow!'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์จาง (ผู้เชี่ยวชาญ) 👨‍🏫',
          zh: '不客气，明天早上我们在咖啡馆见，再见！',
          pinyin: 'Bú kèqi, míngtiān zǎoshang wǒmen zài kāfēiguǎn jiàn, zàijiàn!',
          th: 'ยินดีครับ พรุ่งนี้เช้าพวกเราเจอกันที่ร้านกาแฟ ลาก่อนครับ!',
          en: 'You are welcome, see you tomorrow morning at the cafe, goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อมีคนพูดว่า '被朋友种草了' (bèi péngyou zhòngcǎo le) หมายถึงเหตุการณ์ใด?",
          options: [
            'ถูกเพื่อนป้ายยาจนเกิดความอยากได้สินค้านั้นอย่างยิ่ง (Influenced/Tempted to buy)',
            'ถูกเพื่อนชวนไปทำสวนปลูกหญ้า',
            'ถูกเพื่อนยืมเงินซื้อของ',
            'ถูกเพื่อนตำหนิเรื่องงาน'
          ],
          correct_index: 0,
          explanation_th: "'种草' (ปลูกหญ้า) เป็นสแลงหมายถึงการป้ายยาหรือแนะนำสินค้าจนผู้ฟังเกิดกิเลสอยากได้ตาม",
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจสแลงโซเชียลมีเดียได้อย่างเฉียบคม!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '打卡' (dǎkǎ) ในบริบทการท่องเที่ยวหมายถึงข้อใด?",
          options: [
            'การเดินทางไปเช็กอิน ถ่ายรูป และสัมผัสแลนด์มาร์กยอดนิยม (Checking in at trendy spots)',
            'การเล่นไพ่กับคนแปลกหน้า',
            'การจ่ายเงินค่าบัตรผ่านประตู',
            'การทำบัตรประจำตัวประชาชนหาย'
          ],
          correct_index: 0,
          explanation_th: "'打卡' ในบริบทเที่ยวหมายถึงการแวะไปเช็กอินถ่ายรูป ณ สถานที่ฮิตตามรอยโซเชียล",
          encouragement: 'แม่นยำมาก! ใช้ภาษาการท่องเที่ยวของคนรุ่นใหม่ได้อย่างคล่องแคล่ว!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "คนหนุ่มสาวจำนวนมากชอบไปเช็กอินถ่ายรูปที่เมืองโบราณ"',
          tokens: ['喜欢去历史古城打卡', '很多年轻人', '周末'],
          correct_sequence: ['很多年轻人', '周末', '喜欢去历史古城打卡'],
          pinyin: 'Hěn duō niánqīngrén zhōumò xǐhuan qù lìshǐ gǔchéng dǎkǎ.',
          meaning_th: 'คนหนุ่มสาวจำนวนมากชอบไปเช็กอินที่เมืองประวัติศาสตร์ในวันหยุด',
          explanation_th: 'ประธาน (很多年轻人) + เวลา (周末) + กริยาวลี (喜欢去历史古城打卡)',
          encouragement: 'เรียงลำดับประโยคไลฟ์สไตล์ได้เป๊ะมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '种草' ตัว '种' (zhòng - ปลูก) มีหมวดนำใดอยู่ด้านซ้าย?",
          options: [
            '禾 (หมวดต้นกล้า/รวงข้าว 禾木旁)',
            '木 (หมวดไม้ 木字旁)',
            '艹 (หมวดหญ้า 草字头)',
            '土 (หมวดดิน 提土旁)'
          ],
          correct_index: 0,
          explanation_th: "'种' มีหมวด '禾' (รวงข้าว/พืชผล) อยู่ด้านซ้าย สื่อถึงการเพาะปลูกพืชพันธุ์",
          encouragement: 'แม่นยำเรื่องโครงสร้างอักษรหมวดพืชผลเกษตร!'
        }
      ]
    },
    {
      lesson_id: 't3_u41_l03',
      lesson_number: 3,
      title: {
        zh: '二次元与圈层文化',
        th: 'วัฒนธรรมย่อยและการสื่อสารแบบดิจิทัล',
        en: 'Subcultures & Digital Sub-communities'
      },
      can_do: {
        th: 'เข้าใจคำศัพท์ชุมชนดิจิทัล เช่น 表情包 (มีมสติกเกอร์), 弹幕 (ข้อความลอยบนคลิป), 社恐 (กลัวการเข้าสังคม) และ 社牛 (เซียนเข้าสังคม)',
        en: 'Understand digital subculture terms like Biaoqingbao (memes/stickers), Danmu (bullet comments), Shekong (social anxiety), and Sheniu (social butterfly)'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องมีม สติกเกอร์ และการสื่อสารในคอมมูนิตี้คนรุ่นใหม่อย่างสนุกสนาน!',
      vocabulary: [
        {
          id: 'hsk3_4111',
          hanzi: '表情包',
          pinyin: 'biǎoqíngbāo',
          display_pinyin: 'biǎoqíngbāo',
          pinyin_tone: 'biao3qing2bao1',
          meaning_th: 'ชุดสติกเกอร์มีม / มีมรูปภาพแสดงอารมณ์',
          meaning_en: 'meme sticker pack / emoji meme',
          radical: '衣',
          radical_name_th: 'หมวดเสื้อผ้า (衣字底)',
          stroke_count: 24,
          mnemonic: 'รวมห่อ (包) อารมณ์ความรู้สึกบนใบหน้า (表情) = สติกเกอร์มีม',
          kid_mnemonic: 'ส่งรูปแพนด้าทำหน้าตลกแกล้งเพื่อนในแชต = 表情包',
          body_gesture: 'ทำหน้าตาตลกเลียนแบบมีมพร้อมกางสองมือออก'
        },
        {
          id: 'hsk3_4112',
          hanzi: '弹幕',
          pinyin: 'dànmù',
          display_pinyin: 'dànmù',
          pinyin_tone: 'dan4mu4',
          meaning_th: 'ดันมาคุ / คอมเมนต์ลอยข้ามหน้าจอวิดีโอแบบสดๆ',
          meaning_en: 'bullet comments / scrolling live comments on video',
          radical: '弓',
          radical_name_th: 'หมวดธนู (弓字旁)',
          stroke_count: 26,
          mnemonic: 'ข้อความวิ่งเร็วเหมือนกระสุนปืน (弹) เต็มม่านจอ (幕) = ดันมาคุ',
          kid_mnemonic: 'ตัวหนังสือคอมเมนต์วิ่งข้ามหน้าจอเต็มไปหมดตอนดูการ์ตูน = 弹幕',
          body_gesture: 'สะบัดนิ้วจากขวาไปซ้ายเลียนแบบข้อความวิ่งบนจอ'
        },
        {
          id: 'hsk3_4113',
          hanzi: '刷屏',
          pinyin: 'shuāpíng',
          display_pinyin: 'shuāpíng',
          pinyin_tone: 'shua1ping2',
          meaning_th: 'ฟลัดจอ / ข้อความหรือโพสต์ไหลท่วมฟีดอย่างล้นหลาม',
          meaning_en: 'flood the screen / spam comments / go viral all over feed',
          radical: '刂',
          radical_name_th: 'หมวดมีดข้าง (立刀旁)',
          stroke_count: 20,
          mnemonic: 'แปรงกวาด (刷) ทั่วหน้าจอ (屏) = ฟลัดจอจนเต็มหน้า',
          kid_mnemonic: 'ทุกคนกดส่งหัวใจรัวๆ จนหน้าจอมือถือกลายเป็นสีแดงเต็มฟีด = 刷屏',
          body_gesture: 'สองมือทำท่าปัดหน้าจอขึ้นลงอย่างรวดเร็วต่อเนื่อง'
        },
        {
          id: 'hsk3_4114',
          hanzi: '社恐',
          pinyin: 'shèkǒng',
          display_pinyin: 'shèkǒng',
          pinyin_tone: 'she4kong3',
          meaning_th: 'โรคกลัวสังคม / คนประหม่าไม่ชอบพบปะผู้คนแปลกหน้า',
          meaning_en: 'social anxiety / socially awkward person',
          radical: '礻',
          radical_name_th: 'หมวดสิ่งศักดิ์สิทธิ์ (示字旁)',
          stroke_count: 17,
          mnemonic: 'หวาดกลัว (恐) งานสังคมและการพบปะผู้คน (社) = กลัวสังคม',
          kid_mnemonic: 'เด็กน้อยขี้อายแอบอยู่หลังเสาเวลาคนแปลกหน้ามาทัก = 社恐',
          body_gesture: 'สองมือกอดอกหดตัวทำท่าประหม่าเขินอาย'
        },
        {
          id: 'hsk3_4115',
          hanzi: '社牛',
          pinyin: 'shèniú',
          display_pinyin: 'shèniú',
          pinyin_tone: 'she4niu2',
          meaning_th: 'เซียนเข้าสังคม / คนกล้าพูดคุยกับทุกคนไม่กลัวเก้อเขิน',
          meaning_en: 'social butterfly / outgoing and unabashed person',
          radical: '礻',
          radical_name_th: 'หมวดสิ่งศักดิ์สิทธิ์ (示字旁)',
          stroke_count: 12,
          mnemonic: 'เก่งกาจดั่งวัวกระทิง (牛) ในการเข้าสังคม (社) = มนุษย์สังคมตัวพ่อตัวแม่',
          kid_mnemonic: 'เดินเข้าไปจับมือทักทายทุกคนในงานปาร์ตี้อย่างมั่นใจ = 社牛',
          body_gesture: 'ยืนอกผายไหล่ผึ่งแล้วกางมือทักทายรอบทิศด้วยรอยยิ้มกว้าง'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 弹幕 (dànmù) ตัว 弹 เป็นอักษรหลายเสียง (多音字)',
        description_th: '弹 ในคำว่า 弹幕 ออกเสียง 4 (dàn) แปลว่ากระสุน (ไม่ใช่ tán ที่แปลว่าดีดพิณ)',
        example: '满屏的弹幕 (mǎnpíng de dànmù: ดันมาคุเต็มจอ)',
        fun_metaphor: 'เหมือนกระสุนข้อความยิงผ่านตาฟิ้วๆ',
        reassurance: 'คำว่า 弹 ให้ออกเสียง dàn เมื่อสื่อถึงลูกกระสุน เช่น 子弹, 弹幕'
      },
      grammar_bite: {
        title: 'โครงสร้างการเปรียบเทียบบุคลิกภาพ: 表面上是社恐，网络上却是...',
        explanation_th: 'ใช้เปรียบเทียบความแตกต่างระหว่างตัวตนในชีวิตจริงกับตัวตนในโลกออนไลน์',
        patterns: [
          {
            formula: '现实中是社恐，网络上却成了社牛',
            zh: '他在现实生活中是个社恐，但在网络直播间里却成了无话不谈的社牛。',
            pinyin: 'Tā zài xiànshí shēnghuó zhōng shì ge shèkǒng, dàn zài wǎngluò zhībōjiān lǐ què chéng le wúhuàbùtán de shèniú.',
            th: 'เขาเป็นคนประหม่ากลัวสังคมในชีวิตจริง แต่ในห้องไลฟ์สดกลับกลายเป็นเซียนเข้าสังคมที่คุยได้ทุกเรื่อง',
            en: 'In real life he is socially anxious, but in the live-stream room he becomes an unabashed social butterfly chatting about everything.'
          },
          {
            formula: '用生动的表情包打破尴尬气氛',
            zh: '聊天时发一个搞笑的表情包，能够轻松化解初次见面的尴尬。',
            pinyin: 'Liáotiān shí fā yí ge gǎoxiào de biǎoqíngbāo, nénggòu qīngsōng huàjiě chūcì jiànmiàn de gāngà.',
            th: 'ส่งสติกเกอร์มีมตลกๆ ระหว่างคุยแชต สามารถคลี่คลายความเก้อเขินในการพบกันครั้งแรกได้อย่างง่ายดาย',
            en: 'Sending a hilarious meme sticker during chat can easily break the awkwardness of meeting for the first time.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลิน (คนทำงานรุ่นใหม่) 👩‍💼',
          zh: '昨天公司聚餐，你一个人坐在角落，是不是有点社恐啊？',
          pinyin: 'Zuótiān gōngsī jùcān, nǐ yí ge rén zuò zài jiǎoluò, shì bú shì yǒudiǎn shèkǒng a?',
          th: 'เมื่อวานงานเลี้ยงบริษัท เธอนั่งคนเดียวอยู่ตรงมุมห้อง ค่อนข้างประหม่ากลัวสังคมใช่ไหมคะ?',
          en: 'Yesterday at the company dinner, you sat in the corner alone, were you feeling a bit socially anxious?'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวหวัง (เพื่อนร่วมงาน) 🧑‍💼',
          zh: '哈哈被你发现了！我面对陌生人确实是社恐，但在网上发表情包我可是顶级社牛！',
          pinyin: 'Hāhā bèi nǐ fāxiàn le! Wǒ miànduì mòshēngrén quèshí shì shèkǒng, dàn zài wǎngshàng fā biǎoqíngbāo wǒ kě shì dǐngjí shèniú!',
          th: 'ฮ่าๆ โดนเธอจับได้ซะแล้ว! ฉันเวลาเจอคนแปลกหน้ากลัวสังคมจริงๆ ครับ แต่เวลาส่งสติกเกอร์มีมในเน็ตนี่เซียนเข้าสังคมตัวท็อปเลยนะ!',
          en: 'Haha you found me out! I am indeed socially awkward with strangers, but when sending memes online I am a top-tier social butterfly!'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (คนทำงานรุ่นใหม่) 👩‍💼',
          zh: '难怪你看视频时发弹幕那么活跃，满屏都是你的幽默留言。',
          pinyin: 'Nánguài nǐ kàn shìpín shí fā dànmù nàme huóyuè, mǎnpíng dōu shì nǐ de yōumò liúyán.',
          th: 'มิน่าล่ะเวลาเธอดูวิดีโอส่งดันมาคุคึกคักขนาดนั้น ข้อความขำขันของเธอวิ่งเต็มหน้าจอเลย',
          en: 'No wonder you are so active sending bullet comments when watching videos, the whole screen is filled with your humorous notes.'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวหวัง (เพื่อนร่วมงาน) 🧑‍💼',
          zh: '互联网给了每个人展示自我的舞台，只要真诚友善，社恐也能找到属于自己的快乐。',
          pinyin: 'Hùliánwǎng gěi le měi ge rén zhǎnshì zìwǒ de wǔtái, zhǐyào zhēnchéng yǒushàn, shèkǒng yě néng zhǎodào shǔyú zìjǐ de kuàilè.',
          th: 'อินเทอร์เน็ตมอบเวทีแสดงตัวตนให้ทุกคน ขอเพียงจริงใจและเป็นมิตร คนขี้อายก็สามารถค้นพบความสุขในแบบของตนเองได้ครับ',
          en: 'The internet provides a stage for everyone; as long as one is sincere and friendly, even shy people can find their own joy.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (คนทำงานรุ่นใหม่) 👩‍💼',
          zh: '说的太好了！今天认识你这个幽默的朋友真高兴，太谢谢你的分享，明天见！',
          pinyin: 'Shuō de tài hǎo le! Jīntiān rènshi nǐ zhè ge yōumò de péngyou zhēn gāoxìng, tài xièxie nǐ de fēnxiǎng, míngtiān jiàn!',
          th: 'พูดได้ดีมากเลยค่ะ! วันนี้ได้รู้จักเพื่อนที่อารมณ์ดีอย่างเธอดีใจจริงๆ ขอบคุณสำหรับการแบ่งปันมากๆ พรุ่งนี้พบกันนะคะ!',
          en: 'Well said! Very glad to know such a humorous friend today, thank you so much for sharing, see you tomorrow!'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวหวัง (เพื่อนร่วมงาน) 🧑‍💼',
          zh: '不客气，明天我们一起努力工作，再见！',
          pinyin: 'Bú kèqi, míngtiān wǒmen yìqǐ nǔlì gōngzuò, zàijiàn!',
          th: 'ยินดีครับ พรุ่งนี้พวกเราตั้งใจทำงานด้วยกัน ลาก่อนครับ!',
          en: 'You are welcome, let us work hard together tomorrow, goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '弹幕' (dànmù) ในแพลตฟอร์มวิดีโอออนไลน์หมายถึงสิ่งใด?",
          options: [
            'ข้อความความคิดเห็นของผู้ชมที่วิ่งลอยข้ามหน้าจอแบบเรียลไทม์ (Bullet Comments)',
            'เสียงเพลงประกอบตอนจบของภาพยนตร์',
            'ปุ่มกดข้ามโฆษณา',
            'คำบรรยายใต้ภาพสำหรับคนหูหนวก'
          ],
          correct_index: 0,
          explanation_th: "'弹幕' คือข้อความคอมเมนต์สดของผู้ชมที่วิ่งผ่านหน้าจอประดุจห่ากระสุนปืน",
          encouragement: 'ถูกต้องยอดเยี่ยม! เข้าใจวัฒนธรรมการดูวิดีโอของวัยรุ่นจีน!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '社牛' (shèniú) ใช้เรียกบุคคลที่มีลักษณะนิสัยแบบใด?",
          options: [
            'คนที่เข้าสังคมเก่งมาก มั่นใจ ไม่เขินอายเมื่ออยู่ต่อหน้าคนแปลกหน้า (Social Butterfly)',
            'คนชอบนอนตื่นสาย',
            'คนที่เลี้ยงวัวในชนบท',
            'คนที่ชอบทานเนื้อวัวเป็นประจำ'
          ],
          correct_index: 0,
          explanation_th: "'社牛' เป็นสแลงตรงข้ามกับ '社恐' หมายถึงผู้ที่มีทักษะการเข้าสังคมยอดเยี่ยมและเป็นกันเองกับทุกคนอย่างมั่นใจ",
          encouragement: 'แม่นยำมาก! แยกแยะคำศัพท์บุคลิกภาพยุคใหม่ได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "เขาเป็นคนกลัวสังคมในชีวิตจริง แต่ในเน็ตกลับเป็นเซียนเข้าสังคม"',
          tokens: ['网络上却是社牛', '他在现实中是社恐'],
          correct_sequence: ['他在现实中是社恐', '网络上却是社牛'],
          pinyin: 'Tā zài xiànshí zhōng shì shèkǒng, wǎngluò shàng què shì shèniú.',
          meaning_th: 'เขาในชีวิตจริงเป็นคนขี้อาย แต่ในอินเทอร์เน็ตกลับเป็นคนเข้าสังคมเก่ง',
          explanation_th: 'ประโยคหลัก (他在现实中是社恐) + ประโยคหักมุม (网络上却是社牛)',
          encouragement: 'ประกอบประโยคเปรียบเทียบบุคลิกภาพได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '社恐' ตัว '恐' (kǒng - หวาดกลัว) มีหมวดนำใดอยู่ด้านล่าง?",
          options: [
            '心 (หมวดหัวใจ 心字底)',
            '口 (หมวดปาก 口字旁)',
            '手 (หมวดมือ 提手旁)',
            '目 (หมวดตา 目字旁)'
          ],
          correct_index: 0,
          explanation_th: "'恐' มีหมวด '心' (หัวใจ) ด้านล่าง สื่อถึงความรู้สึกหวาดกลัวหรือวิตกกังวลที่เกิดขึ้นในจิตใจ",
          encouragement: 'แม่นยำเรื่องอักษรหมวดสภาวะจิตใจ!'
        }
      ]
    },
    {
      lesson_id: 't3_u41_l04',
      lesson_number: 4,
      title: {
        zh: '网络素养与半途而废',
        th: 'มารยาททางไซเบอร์และการไม่ล้มเลิกกลางคัน (半途而废)',
        en: 'Digital Literacy & Perseverance (Bàntú\'érfèi)'
      },
      can_do: {
        th: 'อธิบายการท่องโลกไซเบอร์อย่างมีสติ การรู้เท่าทันสื่อ และสุภาษิตเตือนใจ 半途而废 (ล้มเลิกกลางคัน)',
        en: 'Explain digital literacy, rational internet surfing, and the idiom Bàntú\'érfèi (giving up halfway)'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องสุขภาวะดิจิทัล และพิชิต Boss Challenge ทูตสื่อสารออนไลน์สร้างสรรค์!',
      vocabulary: [
        {
          id: 'hsk3_4116',
          hanzi: '半途而废',
          pinyin: 'bàntú’érfèi',
          display_pinyin: 'bàntú’érfèi',
          pinyin_tone: 'ban4tu2\'er2fei4',
          meaning_th: 'ล้มเลิกกลางคัน / ละทิ้งความตั้งใจไปกลางทาง',
          meaning_en: 'give up halfway / leave unfinished',
          radical: '广',
          radical_name_th: 'หมวดเพิงพัก (广字旁)',
          stroke_count: 24,
          mnemonic: 'เดินไปได้ครึ่งทาง (半途) แล้วยอมแพ้ทอดทิ้ง (废) = ล้มเลิกกลางคัน',
          kid_mnemonic: 'วิ่งแข่งมาราธอนเหนื่อยแล้วหยุดนั่งใต้ต้นไม้ข้างทางไม่วิ่งต่อ = 半途而废',
          body_gesture: 'กางสองมือออกข้างลำตัวแล้วทิ้งแขนลงอย่างหมดแรง'
        },
        {
          id: 'hsk3_4117',
          hanzi: '素养',
          pinyin: 'sùyǎng',
          display_pinyin: 'sùyǎng',
          pinyin_tone: 'su4yang3',
          meaning_th: 'วุฒิภาวะ / คุณธรรมความรู้ / มารยาทและความตระหนักรู้',
          meaning_en: 'literacy / cultivation / accomplishment',
          radical: '糸',
          radical_name_th: 'หมวดเส้นไหม (糸字底)',
          stroke_count: 19,
          mnemonic: 'พื้นฐานเดิม (素) ที่ได้รับการอบรมบ่มเพาะ (养) = ความรู้และวุฒิภาวะ',
          kid_mnemonic: 'อ่านหนังสือและปฏิบัติตนอย่างมีมารยาทสุภาพ = 素养',
          body_gesture: 'สองมือถือหนังสือระดับสายตาด้วยท่าทีสุขุมเรียบร้อย'
        },
        {
          id: 'hsk3_4118',
          hanzi: '谣言',
          pinyin: 'yáoyán',
          display_pinyin: 'yáoyán',
          pinyin_tone: 'yao2yan2',
          meaning_th: 'ข่าวลือ / ข้อมูลเท็จที่แพร่สะพัด',
          meaning_en: 'rumor / misinformation',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 19,
          mnemonic: 'คำพูดที่แกว่งไกวไร้มูลความจริง (谣) เผยแพร่ออกไป (言) = ข่าวลือ',
          kid_mnemonic: 'กระซิบส่งต่อเรื่องไม่จริงจนคนอื่นเข้าใจผิด = 谣言',
          body_gesture: 'เอามือป้องปากกระซิบกระซาบด้วยสีหน้ามีพิรุธ'
        },
        {
          id: 'hsk3_4119',
          hanzi: '辨别',
          pinyin: 'biànbié',
          display_pinyin: 'biànbié',
          pinyin_tone: 'bian4bie2',
          meaning_th: 'แยกแยะ / จำแนกความจริงความเท็จ',
          meaning_en: 'distinguish / differentiate',
          radical: '辛',
          radical_name_th: 'หมวดเผ็ดร้อน (辛字旁)',
          stroke_count: 23,
          mnemonic: 'ผ่าแยกสิ่งสองสิ่ง (辨) เพื่อบอกความแตกต่าง (别) = แยกแยะ',
          kid_mnemonic: 'ถือแว่นขยายส่องดูเพชรแท้กับเพชรปลอม = 辨别',
          body_gesture: 'สองมือทำท่าส่องแว่นขยายเพ่งมองอย่างพินิจพิเคราะห์'
        },
        {
          id: 'hsk3_4120',
          hanzi: '沉迷',
          pinyin: 'chénmí',
          display_pinyin: 'chénmí',
          pinyin_tone: 'chen2mi2',
          meaning_th: 'หมกมุ่น / หลงใหลจนถอนตัวไม่ขึ้น / ติดจนเสียงาน',
          meaning_en: 'indulge in / be addicted to',
          radical: '氵',
          radical_name_th: 'หมวดน้ำ (三点水)',
          stroke_count: 16,
          mnemonic: 'จมดิ่งลงใต้น้ำ (沉) หลงทางในหมอกควัน (迷) = หมกมุ่นมัวเมา',
          kid_mnemonic: 'นั่งจ้องเล่นเกมมือถือไม่ยอมวางจนดึกดื่น = 沉迷',
          body_gesture: 'ก้มหน้าเพ่งมองหน้าจอมือถือไม่ละสายตา'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 半途而废 (bàntú’érfèi) 4-2-2-4 จังหวะสมดุล',
        description_th: 'bàn (เสียง 4 หนักแน่น) -> tú (เสียง 2 พุ่งขึ้น) -> ér (เสียง 2 ลอยตัว) -> fèi (เสียง 4 ลงลึกเด็ดขาด)',
        example: '坚持到底，绝不半途而废！(Jiānchí dàodǐ, jué bù bàntú’érfèi!)',
        fun_metaphor: 'เหมือนขึ้นรถไฟเหาะแล้วดิ่งลงมาเต็มกำลัง',
        reassurance: 'สุภาษิตนี้ใช้คู่กับ 坚持到底 (มุ่งมั่นถึงที่สุด) เป็นประจำ'
      },
      grammar_bite: {
        title: 'โครงสร้างคติเตือนใจ: 无论学习还是做事，都不能半途而废',
        explanation_th: 'ใช้เตือนสติว่าไม่ว่าจะทำสิ่งใดต้องมีวินัยความเพียร อย่าละทิ้งกลางคัน',
        patterns: [
          {
            formula: '无论 + [ทำอะไร], 都不可半途而废',
            zh: '无论学习中文还是健身运动，都必须持之以恒，绝不可半途而废。',
            pinyin: 'Wúlùn xuéxí Zhōngwén háishì jiànshēn yùndòng, dōu bìxū chízhīyǐhéng, jué bù kě bàntú’érfèi.',
            th: 'ไม่ว่าจะเรียนภาษาจีนหรือออกกำลังกายฟิตเนส ล้วนต้องสม่ำเสมอ ไม่อาจล้มเลิกกลางคันเป็นอันขาด',
            en: 'Whether learning Chinese or working out, one must persevere and never give up halfway.'
          },
          {
            formula: '提高网络素养，学会辨别谣言',
            zh: '现代人应当提高网络素养，学会冷静辨别各种网络谣言。',
            pinyin: 'Xiàndàirén yīngdāng tígāo wǎngluò sùyǎng, xuéhuì lěngjìng biànbié gè zhǒng wǎngluò yáoyán.',
            th: 'คนยุคใหม่ควรยกระดับวุฒิภาวะทางไซเบอร์ เรียนรู้ที่จะแยกแยะข่าวลือในโลกออนไลน์อย่างใจเย็น',
            en: 'Modern people should enhance digital literacy and learn to calmly identify various online rumors.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลิน (คนทำงานรุ่นใหม่) 👩‍💼',
          zh: '张老师，现在网络上热梗更新太快了，很多年轻人沉迷刷手机，学习计划都耽误了。',
          pinyin: 'Zhāng lǎoshī, xiànzài wǎngluò shàng règěng gēngxīn tài kuài le, hěn duō niánqīngrén chénmí shuā shǒujī, xuéxí jìhuà dōu dānwu le.',
          th: 'อาจารย์จางคะ ตอนนี้ศัพท์ฮิตบนเน็ตอัปเดตเร็วเหลือเกิน วัยรุ่นหลายคนหมกมุ่นไถมือถือจนแผนการเรียนสะดุดไปหมดเลยค่ะ',
          en: 'Teacher Zhang, internet memes are updating so quickly now; many young people are addicted to scrolling phones, disrupting study plans.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์จาง (ผู้เชี่ยวชาญ) 👨‍🏫',
          zh: '流行语是语言发展的镜子，了解它很有趣，但千万不能沉迷其中而半途而废。',
          pinyin: 'Liúxíngyǔ shì yǔyán fāzhǎn de jìngzi, liǎojiě tā hěn yǒuqù, dàn qiānwàn bù néng chénmí qízhōng ér bàntú’érfèi.',
          th: 'ภาษาฮิตเป็นกระจกสะท้อนพัฒนาการของภาษา การเรียนรู้มันน่าสนใจมาก แต่ต้องไม่หมกมุ่นจนล้มเลิกเป้าหมายหลักกลางคันครับ',
          en: 'Buzzwords mirror language development; learning them is fun, but one must never get addicted and give up goals halfway.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (คนทำงานรุ่นใหม่) 👩‍💼',
          zh: '是的，网络世界信息杂乱，提高数字素养、准确辨别谣言才是最核心的技能。',
          pinyin: 'Shì de, wǎngluò shìjiè xìnxī záluàn, tígāo shùzì sùyǎng, zhǔnquè biànbié yáoyán cái shì zuì héxīn de jìnéng.',
          th: 'ใช่ค่ะ ข้อมูลในโลกอินเทอร์เน็ตสับสนปนเป การยกระดับวุฒิภาวะดิจิทัลและแยกแยะข่าวลืออย่างแม่นยำจึงเป็นทักษะแกนหลักที่สำคัญที่สุด',
          en: 'Yes, online information is chaotic; improving digital literacy and accurately distinguishing rumors are the core skills.'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์จาง (ผู้เชี่ยวชาญ) 👨‍🏫',
          zh: '保持清醒独立思考，善用网络工具而不被其奴役，人生才能行稳致远。',
          pinyin: 'Bǎochí qīngxǐng dúlì sīkǎo, shànyòng wǎngluò gōngjù ér bú bèi qí núyì, rénshēng cái néng xíngwěnzhìyuǎn.',
          th: 'รักษาความมีสติคิดวิเคราะห์อย่างเป็นอิสระ ใช้เครื่องมือเน็ตให้เกิดประโยชน์โดยไม่ตกเป็นทาสของมัน ชีวิตจึงจะก้าวไปได้มั่นคงและยาวไกลครับ',
          en: 'Maintaining clear independent thinking and utilizing web tools without being enslaved by them is how life progresses stably and far.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (คนทำงานรุ่นใหม่) 👩‍💼',
          zh: '太谢谢老师的深刻教诲了！认识您真的很受启发，明天我一定认真坚持学习！',
          pinyin: 'Tài xièxie lǎoshī de shēnkè jiàohuì le! Rènshi nín zhēn de hěn shòu qǐfā, míngtiān wǒ yídìng rènzhēn jiānchí xuéxí!',
          th: 'ขอบพระคุณคำสั่งสอนที่ลึกซึ้งของอาจารย์มากค่ะ! ได้รู้จักคุณได้รับแรงบันดาลใจมากจริงๆ พรุ่งนี้ฉันจะตั้งใจอดทนเรียนรู้อย่างแน่นอนค่ะ!',
          en: 'Thank you so much for your profound teachings! Knowing you is truly inspiring; tomorrow I will definitely persist in studying!'
        },
        {
          speaker: 'B',
          speaker_name: 'อาจารย์จาง (ผู้เชี่ยวชาญ) 👨‍🏫',
          zh: '不客气，持之以恒定能成功，明天见，再见！',
          pinyin: 'Bú kèqi, chízhīyǐhéng dìng néng chénggōng, míngtiān jiàn, zàijiàn!',
          th: 'ยินดีครับ ความพยายามสม่ำเสมอย่อมนำมาซึ่งความสำเร็จ พรุ่งนี้พบกัน ลาก่อนครับ!',
          en: 'You are welcome, perseverance surely brings success; see you tomorrow, goodbye!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "สำนวน '半途而废' (bàntú’érfèi) มีความหมายตรงกับข้อใด?",
          options: [
            'การล้มเลิกความตั้งใจไปกลางทาง ทำสิ่งใดไม่ตลอดรอดฝั่ง (Giving up halfway)',
            'การเดินทางท่องเที่ยวรอบโลก',
            'การซื้อตั๋วรถไฟครึ่งราคา',
            'การวิ่งแข่งเข้าเส้นชัยเป็นคนแรก'
          ],
          correct_index: 0,
          explanation_th: "'半途而废' หมายถึง เดินไปได้ครึ่งทางแล้วทอดทิ้งความพยายาม คือการล้มเลิกกลางคัน",
          encouragement: 'ถูกต้องยอดเยี่ยม! จำสำนวนเตือนใจเรื่องความเพียรได้อย่างแม่นยำ!'
        },
        {
          type: 'flash_recall',
          question_th: "วลี '辨别网络谣言' หมายถึงอะไร?",
          options: [
            'การตรวจสอบและแยกแยะข่าวลือหรือข้อมูลเท็จในโลกออนไลน์ (Distinguishing online rumors)',
            'การแต่งเรื่องโกหกเล่าให้เพื่อนฟัง',
            'การส่งต่อข้อความลูกโซ่',
            'การลบบัญชีโซเชียลมีเดียทิ้ง'
          ],
          correct_index: 0,
          explanation_th: "'辨别谣言' คือการใช้สติและวิจารณญาณตรวจสอบข้อเท็จจริงเพื่อแยกแยะข่าวลือที่ไม่เป็นความจริง",
          encouragement: 'แม่นยำมาก! มีทักษะการรู้เท่าทันสื่อดิจิทัลระดับมืออาชีพ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ไม่ว่าเรียนหรือทำงาน ล้วนไม่อาจล้มเลิกกลางคัน"',
          tokens: ['绝不可半途而废', '无论学习还是做事', '都必须坚持到底'],
          correct_sequence: ['无论学习还是做事', '都必须坚持到底', '绝不可半途而废'],
          pinyin: 'Wúlùn xuéxí háishì zuòshì, dōu bìxū jiānchí dàodǐ, jué bù kě bàntú’érfèi.',
          meaning_th: 'ไม่ว่าเรียนหรือทำงาน ล้วนต้องมุ่งมั่นถึงที่สุด ไม่อาจล้มเลิกกลางคัน',
          explanation_th: 'เงื่อนไขครอบคลุม (无论学习还是做事) + ข้อพึงปฏิบัติ (都必须坚持到底) + ข้อห้ามเด็ดขาด (绝不可半途而废)',
          encouragement: 'ประกอบประโยคคติพจน์สอนใจได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '谣言' (yáoyán - ข่าวลือ) ตัว '谣' มีหมวดนำใดอยู่ด้านซ้าย?",
          options: [
            '讠 (หมวดคำพูด 言字旁)',
            '口 (หมวดปาก 口字旁)',
            '耳 (หมวดหู 耳字旁)',
            '目 (หมวดตา 目字旁)'
          ],
          correct_index: 0,
          explanation_th: "'谣' มีหมวด '讠' (คำพูด) ด้านซ้าย สื่อถึงคำพูดหรือเรื่องเล่าที่บอกต่อกันไปปากต่อปาก",
          encouragement: 'วิเคราะห์โครงสร้างอักษรหมวดวจีกรรมได้อย่างแม่นยำ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณได้รับเชิญเป็นวิทยากรบรรยายในหัวข้อ "การใช้อินเทอร์เน็ตอย่างมีสติและการสร้างสรรค์คอนเทนต์เชิงบวก" ให้แก่นักศึกษานานาชาติ จงเลือกประโยคสรุปข้อคิดที่ดีที่สุดเพื่อเตือนใจผู้ฟัง',
        dialogue_context: [
          {
            speaker: '主持人',
            zh: '请问对于当代经常在网上冲浪的年轻人，您有什么关于网络素养的核心建议？'
          }
        ],
        options: [
          '理性冲浪辨别谣言，拒绝沉迷；对待梦想持之以恒，绝不半途而废！',
          '天天躺平摆烂，完全不需要任何学习和努力。',
          '看到任何热闹都要去蹭热度，不用在乎信息真假。',
          '把所有时间都用来刷手机看表情包，不用去上班。'
        ],
        correct_index: 0,
        explanation_th: 'ตัวเลือกที่ 1 ครบถ้วนทั้งมิติการรู้เท่าทันสื่อ (理性冲浪辨别谣言) การไม่หมกมุ่น (拒绝沉迷) และการมีความเพียรไม่ล้มเลิกกลางคัน (持之以恒，绝不半途而废)',
        cheer_message: 'ยอดเยี่ยมระดับปรมาจารย์! คุณพิชิตการเป็นทูตวัฒนธรรมดิจิทัลสร้างสรรค์ได้อย่างสง่างาม!'
      },
      cheer_trophy: {
        badge_id: 'badge_t3_u41_master',
        badge_name: 'ปรมาจารย์เน็ตคัลเจอร์ (Digital Literacy Master)',
        message_th: 'ยินดีด้วย! คุณเชี่ยวชาญศัพท์สแลงร่วมสมัย เข้าใจปรากฏการณ์โซเชียลมีเดียจีน และมีภูมิคุ้มกันทางดิจิทัลอันยอดเยี่ยม!',
        xp_reward: 200
      }
    }
  ]
};
