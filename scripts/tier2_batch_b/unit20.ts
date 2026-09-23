/**
 * scripts/tier2_batch_b/unit20.ts
 * Tier 2 Unit 20: 求助与意外处理 (Emergencies & Police Assistance)
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

export const unit20 = {
  unit_id: 'tier2_u20',
  tier: 2,
  unit_number: 20,
  title: {
    zh: '求助与意外处理',
    th: 'แจ้งเหตุฉุกเฉิน & ของสูญหาย',
    en: 'Emergencies & Police Assistance'
  },
  description: 'รับมือเหตุไม่คาดฝันในแดนมังกรได้อย่างปลอดภัย แจ้งความของหายที่สถานีตำรวจด้วย 连...都... และ 竟然, แจ้งเคลมประกันอุบัติเหตุด้วยประโยค 被, และติดต่อสถานทูตไทยเพื่อขอเอกสารเดินทางฉุกเฉิน',
  lessons: [
    {
      lesson_id: 't2_u20_l01',
      lesson_number: 1,
      title: {
        zh: '物品遗失与报警',
        th: 'ของสูญหาย & การแจ้งความ',
        en: 'Lost Property & Police Report'
      },
      can_do: {
        th: 'โทรแจ้งความ 110 หรือติดต่อสถานีตำรวจ ระบุของหายด้วยโครงสร้าง 连...都... และใช้ 竟然 / 果然 แสดงความรู้สึก',
        en: 'Call 110 or visit police station, report lost items using 连...都..., and express surprises with 竟然 / 果然'
      },
      baby_step_goal: 'เป้าหมายวันนี้: เดินเข้าสถานีตำรวจ แจ้งความว่า "กระเป๋าเป้หาย และแม้กระทั่งพาสปอร์ตก็หายไปด้วย" ได้อย่างชัดเจน!',
      vocabulary: [
        {
          id: 'hsk2_2001',
          hanzi: '报警',
          pinyin: 'bàojǐng',
          display_pinyin: 'bàojǐng',
          pinyin_tone: 'bao4jing3',
          meaning_th: 'แจ้งความ / โทรแจ้งตำรวจ (เบอร์ 110)',
          meaning_en: 'to report to police / call the police',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 20,
          mnemonic: 'ยื่นมือทำรายงานส่งข่าว (报) เพื่อเตือนภัยให้ตำรวจช่วยระงับเหตุ (警) = แจ้งความ',
          kid_mnemonic: 'กดเบอร์ 110 โทรแจ้งคุณตำรวจอย่างเร่งด่วน = 报警',
          body_gesture: 'ยกโทรศัพท์แนบหูแล้วทำหน้าตื่นตระหนกแจ้งเหตุ'
        },
        {
          id: 'hsk2_2002',
          hanzi: '警察',
          pinyin: 'jǐngchá',
          display_pinyin: 'jǐngchá',
          pinyin_tone: 'jing3cha2',
          meaning_th: 'ตำรวจ',
          meaning_en: 'police officer / police',
          radical: '言',
          radical_name_th: 'หมวดคำพูด (言字底)',
          stroke_count: 28,
          mnemonic: 'ผู้พิทักษ์สันติราษฎร์คอยตักเตือนระวังภัย (警) และสืบสวนสอบสวนข้อเท็จจริง (察) = ตำรวจ',
          kid_mnemonic: 'คุณตำรวจสวมหมวก สวมเครื่องแบบสีน้ำเงินเข้ม เท่และพึ่งพาได้ = 警察',
          body_gesture: 'ทำท่าวันทยหัตถ์ตะเบ๊ะทำความเคารพแบบตำรวจ'
        },
        {
          id: 'hsk2_2003',
          hanzi: '遗失',
          pinyin: 'yíshī',
          display_pinyin: 'yíshī',
          pinyin_tone: 'yi2shi1',
          meaning_th: 'สูญหาย / ทำตกหล่นหาย',
          meaning_en: 'to lose / lost property',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之底)',
          stroke_count: 17,
          mnemonic: 'สิ่งของตกหล่นทิ้งไว้ระหว่างก้าวเดิน (遗) จนสูญพลัดพรากไป (失) = สูญหาย',
          kid_mnemonic: 'กระเป๋าหล่นหายไปไหนไม่รู้ หันไปดูไม่มีแล้ว = 遗失',
          body_gesture: 'ล้วงกระเป๋าสองข้างแล้วทำหน้าตกใจเมื่อพบว่าว่างเปล่า'
        },
        {
          id: 'hsk2_2004',
          hanzi: '竟然',
          pinyin: 'jìngrán',
          display_pinyin: 'jìngrán',
          pinyin_tone: 'jing4ran2',
          meaning_th: 'นึกไม่ถึงว่า... / ไม่น่าเชื่อเลยว่า...',
          meaning_en: 'unexpectedly / to one’s surprise',
          radical: '立',
          radical_name_th: 'หมวดตั้งตรง (立字旁)',
          stroke_count: 23,
          mnemonic: 'ในที่สุดผลลัพธ์กลับกลายเป็นเช่นนี้ (竟) อย่างไม่น่าเชื่อ (然) = นึกไม่ถึงเลยว่า',
          kid_mnemonic: 'อ้าปากค้าง ตาโต นึกไม่ถึงเลยว่าจะเกิดเรื่องแบบนี้ = 竟然',
          body_gesture: 'เอามือทาบแก้มสองข้างทำตาโตตกใจ'
        },
        {
          id: 'hsk2_2005',
          hanzi: '果然',
          pinyin: 'guǒrán',
          display_pinyin: 'guǒrán',
          pinyin_tone: 'guo3ran2',
          meaning_th: 'เป็นไปตามคาด / จริงๆ ด้วย',
          meaning_en: 'as expected / sure enough',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 20,
          mnemonic: 'ผลลัพธ์ดอกผลที่ออกมา (果) ตรงตามที่คาดการณ์ไว้แต่แรก (然) = เป็นไปตามคาด',
          kid_mnemonic: 'ดีดนิ้วเป๊าะ นั่นไง! เป็นไปตามที่คิดไว้จริงๆ ด้วย = 果然',
          body_gesture: 'ดีดนิ้วเป๊าะแล้วพยักหน้ามั่นใจ'
        },
        {
          id: 'hsk2_2006',
          hanzi: '连',
          pinyin: 'lián',
          display_pinyin: 'lián',
          pinyin_tone: 'lian2',
          meaning_th: 'แม้กระทั่ง... (โครงสร้าง 连...都...)',
          meaning_en: 'even (grammar: 连...都...)',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之底)',
          stroke_count: 7,
          mnemonic: 'รถม้าและขบวนสิ่งของเชื่อมโยงติดต่อกัน (连) ขยายผลถึงขีดสุด = แม้กระทั่ง',
          kid_mnemonic: 'แม้กระทั่งของสำคัญที่สุดก็ยังลืมเอามา = 连',
          body_gesture: 'ชูสองแขนขึ้นข้างบนเน้นระดับขีดสุด'
        }
      ],
      tone_rule: {
        rule_name: 'ไวยากรณ์เน้นขีดสุด: 连...都/也... (Even...)',
        description_th: 'วาง 连 หน้าสิ่งสำคัญที่สุดหรือสิ่งที่คาดไม่ถึงที่สุด และต้องมี 都 หรือ 也 วางไว้หน้ากริยาเสมอ คนไทยมักลืมใส่ 都',
        example: '我连护照都丢了！ (Wǒ lián hùzhào dōu diū le! - แม้กระทั่งพาสปอร์ตผมก็ทำหายไปด้วย!)',
        fun_metaphor: 'เหมือนมีบอดี้การ์ดสองคน! คนหน้าชื่อ 连 คนหลังชื่อ 都 เดินประกบของสำคัญ!',
        reassurance: 'คำว่า 竟然 (jìngrán) คำว่า 竟 เป็นเสียง 4 ไม่ใช่เสียง 3'
      },
      grammar_bite: {
        title: 'สูตรเลโก้เน้นขีดสุดและอารมณ์: 连...都... และ 竟然 / 果然',
        explanation_th: 'ใช้ 连...都... เพื่อบอกว่าแม้แต่สิ่งนี้ก็โดนด้วย และใช้ 竟然 เพื่อบอกความประหลาดใจ',
        patterns: [
          {
            formula: '连 + [สิ่งของสำคัญ] + 都 + [กริยา] + 了',
            zh: '我连护照都丢了！',
            pinyin: 'Wǒ lián hùzhào dōu diū le!',
            th: 'ผมแม้กระทั่งพาสปอร์ตก็ทำหายไปด้วยครับ!',
            en: 'I even lost my passport!'
          },
          {
            formula: '背包 + 竟然 + [ผลลัพธ์ไม่คาดคิด]',
            zh: '背包竟然被别人拿走了。',
            pinyin: 'Bèibāo jìngrán bèi biérén ná zǒu le.',
            th: 'นึกไม่ถึงเลยว่ากระเป๋าเป้จะถูกคนอื่นหยิบไปแล้ว',
            en: 'Unexpectedly, the backpack was taken by someone else.'
          },
          {
            formula: '去派出所 + 报警',
            zh: '我要去派出所报警。',
            pinyin: 'Wǒ yào qù pàichūsuǒ bàojǐng.',
            th: 'ผมต้องไปแจ้งความที่สถานีตำรวจครับ',
            en: 'I need to go to the police station to make a report.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '警察同志您好！我要报警，我的背包在出租车上遗失了，连护照和钱包都在里面！',
          pinyin: 'Jǐngchá tóngzhì nín hǎo! Wǒ yào bàojǐng, wǒ de bèibāo zài chūzūchē shang yíshī le, lián hùzhào hé qiánbāo dōu zài lǐmiàn!',
          th: 'สวัสดีครับคุณตำรวจ! ผมต้องการแจ้งความ กระเป๋าเป้ของผมลืมทำหล่นหายไว้บนแท็กซี่ แม้กระทั่งพาสปอร์ตและกระเป๋าเงินก็อยู่ในนั้นด้วยครับ!',
          en: 'Hello police officer! I need to report a loss, my backpack was left in a taxi, even my passport and wallet are inside!'
        },
        {
          speaker: 'B',
          speaker_name: 'เจ้าหน้าที่ตำรวจ 👮‍♂️',
          zh: '别着急，请坐下慢慢说。你记得车牌号吗？发票拿了吗？',
          pinyin: 'Bié zháojí, qǐng zuòxià mànmàn shuō. Nǐ jìde chēpáihào ma? Fāpiào ná le ma?',
          th: 'ไม่ต้องร้อนใจไปครับ นั่งลงค่อยๆ เล่า จำเลขทะเบียนรถได้ไหมครับ? ได้เอาใบเสร็จมาไหม?',
          en: 'Don’t panic, please sit down and tell me slowly. Do you remember the license plate? Did you get a taxi receipt?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '我下车时竟然忘了拿发票！不过我是用微信支付付款的，上面有司机的车牌信息。',
          pinyin: 'Wǒ xià chē shí jìngrán wàng le ná fāpiào! Búguò wǒ shì yòng Wēixìn zhīfù fùkuǎn de, shàngmiàn yǒu sījī de chēpái xìnxī.',
          th: 'ตอนลงรถผมนึกไม่ถึงเลยว่าจะลืมหยิบใบเสร็จมา! แต่ว่าผมจ่ายเงินผ่าน WeChat Pay บนนั้นมีข้อมูลทะเบียนรถของคนขับครับ',
          en: 'When getting off I unexpectedly forgot the receipt! But I paid via WeChat Pay, which has the driver’s plate info.'
        },
        {
          speaker: 'B',
          speaker_name: 'เจ้าหน้าที่ตำรวจ 👮‍♂️',
          zh: '太好了！我们马上通过车牌联系出租车公司，果然很快就查到了司机的电话！',
          pinyin: 'Tài hǎo le! Wǒmen mǎshàng tōngguò chēpái liánxì chūzūchē gōngsī, guǒrán hěn kuài jiù chádào le sījī de diànhuà!',
          th: 'ดีมากครับ! เดี๋ยวพวกเราติดต่อบริษัทแท็กซี่ผ่านเลขทะเบียน เป็นไปตามคาดจริงๆ หาเบอร์โทรคนขับเจออย่างรวดเร็วเลยครับ!',
          en: 'Great! We will contact the taxi company via plate number immediately, sure enough we found the driver’s phone quickly!'
        }
      ],
      quizzes: [
        {
          type: 'meaning_match',
          question_th: "เมื่อเกิดเหตุฉุกเฉินหรือของสูญหายในประเทศจีน เบอร์โทรศัพท์แจ้งตำรวจคือเบอร์ใด?",
          options: [
            '110 (报警电话)',
            '120 (急救电话)',
            '119 (火警电话)',
            '122 (交通事故)'
          ],
          correct_index: 0,
          explanation_th: "ในประเทศจีน '110' คือ เบอร์โทรแจ้งความเหตุร้ายและตำรวจ (120 คือ รถพยาบาล, 119 คือ ดับเพลิง)",
          encouragement: 'จำเบอร์โทรฉุกเฉินสำคัญในจีนได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '竟' ในคำว่า '竟然' (นึกไม่ถึงว่า) มีหมวดนำใด?",
          options: [
            '立 (หมวดตั้งตรง 立字旁)',
            '口 (หมวดปาก 口字旁)',
            '日 (หมวดดวงอาทิตย์ 日字旁)',
            '心 (หมวดหัวใจ 心字底)'
          ],
          correct_index: 0,
          explanation_th: "'竟' มีหมวดนำ '立' สื่อถึงการยืนหยัดปรากฏผลลัพธ์ที่ไม่คาดคิด",
          encouragement: 'จำรากศัพท์หมวดตั้งตรง 立 ได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "แม้กระทั่งพาสปอร์ตก็ทำหายไปด้วย"',
          tokens: ['都丢了', '连护照'],
          correct_sequence: ['连护照', '都丢了'],
          pinyin: 'Lián hùzhào dōu diū le',
          meaning_th: 'แม้กระทั่งพาสปอร์ตก็ทำหายไปด้วย',
          explanation_th: 'ส่วนเน้นขีดสุด (连护照) + กริยาเน้นย้ำ (都丢了)',
          encouragement: 'ต่อบล็อกเลโก้ 连...都... ได้อย่างแม่นยำไร้ที่ติ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '竟然' (jìngrán) มีความหมายตรงกับข้อใด?",
          options: [
            'นึกไม่ถึงเลยว่า / ไม่น่าเชื่อว่า',
            'แน่นอนที่สุด',
            'เป็นไปตามที่คิดไว้',
            'ไม่เคยเกิดขึ้น'
          ],
          correct_index: 0,
          explanation_th: "'竟然' สื่อถึงความประหลาดใจ คาดไม่ถึงว่าสิ่งนั้นจะเกิดขึ้น",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์อารมณ์ความรู้สึกแม่นยำสุดๆ!'
        }
      ]
    },
    {
      lesson_id: 't2_u20_l02',
      lesson_number: 2,
      title: {
        zh: '交通事故与理赔',
        th: 'อุบัติเหตุ & การเคลมประกัน',
        en: 'Traffic Incidents & Claims'
      },
      can_do: {
        th: 'แจ้งเหตุอุบัติเหตุจราจร อธิบายความเสียหายด้วยประโยค 被 และติดต่อเคลมประกันภัย',
        en: 'Report traffic accidents, describe damage with 被 sentences, and handle insurance claims'
      },
      baby_step_goal: 'เป้าหมายวันนี้: เล่าเหตุการณ์รถเฉี่ยวชนด้วยประโยค 被 ว่า "ตัวรถถูกชนเป็นรอย โชคดีที่คนไม่เป็นอะไร" ได้อย่างมั่นใจ!',
      vocabulary: [
        {
          id: 'hsk2_2007',
          hanzi: '意外',
          pinyin: 'yìwài',
          display_pinyin: 'yìwài',
          pinyin_tone: 'yi4wai4',
          meaning_th: 'อุบัติเหตุ / เรื่องไม่คาดฝัน',
          meaning_en: 'accident / unexpected event',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 18,
          mnemonic: 'เหตุการณ์ที่อยู่นอกเหนือ (外) ความคิดและความคาดหวังในใจ (意) = อุบัติเหตุ',
          kid_mnemonic: 'เรื่องไม่คาดคิดเกิดขึ้น ตกใจเบรกเอี๊ยด! = 意外',
          body_gesture: 'สองมือแตะหน้าอกแล้วผายออกด้วยความตกใจ'
        },
        {
          id: 'hsk2_2008',
          hanzi: '撞',
          pinyin: 'zhuàng',
          display_pinyin: 'zhuàng',
          pinyin_tone: 'zhuang4',
          meaning_th: 'ชน / กระแทก',
          meaning_en: 'to collide / hit / bump into',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 15,
          mnemonic: 'พลังมือแรงกระแทก (扌) วิ่งพุ่งเข้าชนอย่างแรง (童) = ชน / กระแทก',
          kid_mnemonic: 'รถของเล่นวิ่งชนกัน ตู้ม! = 撞',
          body_gesture: 'เอาสองกำปั้นชนปะทะกันเสียงดังปั๊ก'
        },
        {
          id: 'hsk2_2009',
          hanzi: '救护车',
          pinyin: 'jiùhùchē',
          display_pinyin: 'jiùhùchē',
          pinyin_tone: 'jiu4hu4che1',
          meaning_th: 'รถพยาบาลฉุกเฉิน (เบอร์ 120)',
          meaning_en: 'ambulance',
          radical: '攵',
          radical_name_th: 'หมวดเคาะตี/กระทำ (反文旁)',
          stroke_count: 24,
          mnemonic: 'รถยนต์ (车) ที่วิ่งกู้ชีพช่วยเหลือชีวิต (救) และพิทักษ์คุ้มครอง (护) = รถพยาบาล',
          kid_mnemonic: 'รถพยาบาลสีขาวมีกากบาทสีแดง เปิดหวอ วี้หว่อๆ = 救护车',
          body_gesture: 'ทำมือเปิดไฟไซเรนหมุนเหนือศีรษะ'
        },
        {
          id: 'hsk2_2010',
          hanzi: '保险',
          pinyin: 'bǎoxiǎn',
          display_pinyin: 'bǎoxiǎn',
          pinyin_tone: 'bao3xian3',
          meaning_th: 'ประกันภัย / ประกันอุบัติเหตุ',
          meaning_en: 'insurance',
          radical: '亻',
          radical_name_th: 'หมวดคน (单人旁)',
          stroke_count: 18,
          mnemonic: 'มีบุคคลคอยคุ้มครองปกป้อง (保) จากภยันตรายและความเสี่ยง (险) = ประกันภัย',
          kid_mnemonic: 'มีโล่ป้องกันตัว ป่วยหรือรถชนก็มีคนจ่ายให้ = 保险',
          body_gesture: 'ทำสองแขนไขว้กันเป็นโล่คุ้มภัยที่หน้าอก'
        },
        {
          id: 'hsk2_2011',
          hanzi: '理赔',
          pinyin: 'lǐpéi',
          display_pinyin: 'lǐpéi',
          pinyin_tone: 'li3pei2',
          meaning_th: 'เคลมประกัน / ชดเชยค่าสินไหม',
          meaning_en: 'to settle a claim / insurance compensation',
          radical: '王',
          radical_name_th: 'หมวดหยก (王字旁)',
          stroke_count: 26,
          mnemonic: 'สะสางปัญหาตามหลักการ (理) และชดเชยจ่ายเงินชดใช้ให้ (赔) = เคลมประกัน',
          kid_mnemonic: 'บริษัทประกันโอนเงินชดเชยค่าซ่อมรถให้ = 理赔',
          body_gesture: 'ยื่นเอกสารเคลมแล้วทำท่ารับเงินชดเชย'
        },
        {
          id: 'hsk2_2012',
          hanzi: '幸好',
          pinyin: 'xìnghǎo',
          display_pinyin: 'xìnghǎo',
          pinyin_tone: 'xing4hao3',
          meaning_th: 'โชคดีที่... / เคราะห์ดีที่...',
          meaning_en: 'fortunately / luckily',
          radical: '干',
          radical_name_th: 'หมวดโล่/ก้าน (干字旁)',
          stroke_count: 14,
          mnemonic: 'ความโชคดีหลุดพ้นจากภัย (幸) ทำให้ผลลัพธ์ยังคงดีงามปลอดภัย (好) = โชคดีที่',
          kid_mnemonic: 'เอามือทาบอก ปาดเหงื่อ เฮ้อ! โชคดีนะที่ไม่เจ็บ = 幸好',
          body_gesture: 'เอามือทาบอกแล้วถอนหายใจโล่งอก'
        }
      ],
      tone_rule: {
        rule_name: 'Tone Sandhi: 幸好 (xìnghǎo ➔ xìnghǎo)',
        description_th: 'คำว่า 幸 (เสียง 4) นำหน้า 好 (เสียง 3) ออกเสียงตามวรรณยุกต์เดิมชัดเจน',
        example: '幸好人没事 (Xìnghǎo rén méi shì - โชคดีที่คนไม่เป็นอะไร)',
        fun_metaphor: '幸好 เหมือนร่มชูชีพที่กางออกทันเวลา ทำให้ทุกคนปลอดภัย!',
        reassurance: 'คำว่า 车身被撞了一下 ใช้ประโยค 被 เล่าถึงสิ่งของที่ถูกชนได้อย่างเป็นธรรมชาติ'
      },
      grammar_bite: {
        title: 'สูตรเลโก้อุบัติเหตุและเคลมประกัน: 被...撞了一下 และ 幸好...',
        explanation_th: 'อธิบายการชนด้วยประโยค 被 และปลอบใจด้วย 幸好人没事',
        patterns: [
          {
            formula: '车身 + 被 + 撞了一下',
            zh: '车身被后面的车撞了一下。',
            pinyin: 'Chēshēn bèi hòumiàn de chē zhuàng le yíxià.',
            th: 'ตัวถังรถถูกรถคันหลังชนกระแทกเข้าหนึ่งทีครับ',
            en: 'The car body was bumped by the car behind.'
          },
          {
            formula: '幸好 + 人没事',
            zh: '幸好人没事，大家都没有受伤。',
            pinyin: 'Xìnghǎo rén méi shì, dàjiā dōu méiyǒu shòushāng.',
            th: 'โชคดีที่คนไม่เป็นอะไร ทุกคนไม่ได้รับบาดเจ็บครับ',
            en: 'Fortunately no one was hurt, everyone is uninjured.'
          },
          {
            formula: '联系 + 保险公司 + 办理理赔',
            zh: '马上联系保险公司办理理赔手续。',
            pinyin: 'Mǎshàng liánxì bǎoxiǎn gōngsī bànlǐ lǐpéi shǒuxù.',
            th: 'รีบติดต่อบริษัทประกันภัยเพื่อทำเรื่องเคลมประกันทันที',
            en: 'Contact the insurance company immediately to process claim procedures.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '交警同志您好！刚才我们在十字路口发生了一起意外，车身被右侧变道的车撞了一下！',
          pinyin: 'Jiāojǐng tóngzhì nín hǎo! Gāngcái wǒmen zài shízì lùkǒu fāshēng le yì qǐ yìwài, chēshēn bèi yòucè biàndào de chē zhuàng le yíxià!',
          th: 'สวัสดีครับคุณตำรวจจราจร! เมื่อสักครู่พวกเราเกิดอุบัติเหตุที่สี่แยก ตัวถังรถถูกรถที่เปลี่ยนเลนทางขวาชนเข้าหนึ่งทีครับ!',
          en: 'Hello traffic police! We just had an accident at the intersection, our car body was bumped by a car changing lanes from the right!'
        },
        {
          speaker: 'B',
          speaker_name: 'ตำรวจจราจร 👮‍♂️',
          zh: '有没有人受伤？需要叫救护车吗？',
          pinyin: 'Yǒu méiyǒu rén shòushāng? Xūyào jiào jiùhùchē ma?',
          th: 'มีใครได้รับบาดเจ็บบ้างไหมครับ? จำเป็นต้องเรียกรถพยาบาลไหม?',
          en: 'Is anyone injured? Do we need to call an ambulance?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '幸好人没事，大家都系了安全带，只是车门刮花凹陷了。',
          pinyin: 'Xìnghǎo rén méi shì, dàjiā dōu jì le ānquándài, zhǐshì chēmén guāhuā āoxiàn le.',
          th: 'โชคดีที่คนไม่เป็นอะไรครับ ทุกคนคาดเข็มขัดนิรภัย มีเพียงประตูรถที่เป็นรอยขูดและบุบครับ',
          en: 'Fortunately no one was hurt, everyone wore seatbelts, only the car door is scratched and dented.'
        },
        {
          speaker: 'B',
          speaker_name: 'ตำรวจจราจร 👮‍♂️',
          zh: '好的，我已经拍照取证，认定了事故责任。你们可以拍照上传交管12123，并联系保险公司办理理赔。',
          pinyin: 'Hǎo de, wǒ yǐjīng pāizhào qǔzhèng, rèndìng le shìgù zérèn. Nǐmen kěyǐ pāizhào shàngchuán jiāoguǎn 12123, bìng liánxì bǎoxiǎn gōngsī bànlǐ lǐpéi.',
          th: 'ดีครับ ผมถ่ายรูปเก็บหลักฐานและระบุความรับผิดชอบเรียบร้อยแล้ว พวกคุณถ่ายรูปอัปโหลดแอปจราจร และติดต่อบริษัทประกันเพื่อเคลมค่าเสียหายได้เลยครับ',
          en: 'Okay, I took photos for evidence and determined liability. You can upload photos via traffic app and contact insurance for claims.'
        }
      ],
      quizzes: [
        {
          type: 'meaning_match',
          question_th: "เมื่อเกิดอุบัติเหตุทางรถยนต์ แต่ไม่มีใครบาดเจ็บ ควรพูดประโยคใดเพื่อแสดงความโล่งใจ?",
          options: [
            '幸好人没事！',
            '太好吃了！',
            '打八折太便宜了！',
            '请出示发票！'
          ],
          correct_index: 0,
          explanation_th: "'幸好人没事！' แปลว่า โชคดีที่คนไม่เป็นอะไร เป็นประโยคยอดนิยมแสดงความโล่งใจเมื่อเกิดอุบัติเหตุ",
          encouragement: 'เข้าใจสำนวนความปลอดภัยในชีวิตประจำวันได้อย่างถูกต้อง!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '撞' (ชน/กระแทก) มีหมวดนำมือ '扌' สื่อถึงสิ่งใด?",
          options: [
            'แรงปะทะกระแทกทางกายภาพ',
            'การดื่มน้ำชา',
            'การนอนหลับพักผ่อน',
            'การร้องเพลง'
          ],
          correct_index: 0,
          explanation_th: "หมวด '扌' (提手旁) สื่อถึงการออกแรงทางกายภาพ ปะทะ ชน หรือกระแทก",
          encouragement: 'จำรากศัพท์หมวดมือ 扌 ได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ตัวถังรถถูกชนเข้าหนึ่งที"',
          tokens: ['被撞了一下', '车身'],
          correct_sequence: ['车身', '被撞了一下'],
          pinyin: 'Chēshēn bèi zhuàng le yíxià',
          meaning_th: 'ตัวถังรถถูกชนเข้าหนึ่งที',
          explanation_th: 'กรรม (车身) + โครงสร้างถูกกระทำ (被) + กริยาและผลลัพธ์ (撞了一下)',
          encouragement: 'ต่อบล็อกเลโก้ประโยค 被 ได้อย่างคล่องแคล่ว!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '理赔' (lǐpéi) มีความหมายตรงกับข้อใด?",
          options: [
            'เคลมประกัน / ชดเชยค่าสินไหม',
            'ซื้อประกันภัยฉบับใหม่',
            'เรียกรถพยาบาล',
            'ซ่อมรถยนต์ด้วยตัวเอง'
          ],
          correct_index: 0,
          explanation_th: "'理赔' แปลว่า การเคลมประกันหรือจ่ายค่าชดเชยสินไหม (理 = จัดการ, 赔 = ชดใช้)",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์ประกันภัยแม่นยำสุดๆ!'
        }
      ]
    },
    {
      lesson_id: 't2_u20_l03',
      lesson_number: 3,
      title: {
        zh: '使领馆求助与证件',
        th: 'ประสานงานสถานทูต & เอกสารฉุกเฉิน',
        en: 'Embassy Assistance & Travel Docs'
      },
      can_do: {
        th: 'ติดต่อสถานทูตไทย แจ้งขอออกเอกสารเดินทางฉุกเฉิน (紧急旅行证) และขอใบแจ้งความจากตำรวจ',
        en: 'Contact Thai Embassy, request Emergency Travel Certificates, and obtain police loss certificates'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ติดต่อสถานทูตไทย ณ กรุงปักกิ่งหรือเซี่ยงไฮ้ แจ้งขอทำเอกสารเดินทางฉุกเฉินได้อย่างถูกต้อง!',
      vocabulary: [
        {
          id: 'hsk2_2013',
          hanzi: '大使馆',
          pinyin: 'dàshǐguǎn',
          display_pinyin: 'dàshǐguǎn',
          pinyin_tone: 'da4shi3guan3',
          meaning_th: 'สถานเอกอัครราชทูต',
          meaning_en: 'embassy',
          radical: '饣',
          radical_name_th: 'หมวดอาหาร (食字旁)',
          stroke_count: 27,
          mnemonic: 'อาคารที่ทำการ (馆) ของทูตตัวแทนประเทศ (大使) = สถานทูต',
          kid_mnemonic: 'ตึกสถานทูตมีธงชาติไทยโบกสะบัด คอยดูแลคนไทยในจีน = 大使馆',
          body_gesture: 'ยืนตัวตรงชูมือทำท่าชักธงชาติ'
        },
        {
          id: 'hsk2_2014',
          hanzi: '旅行证',
          pinyin: 'lǚxíngzhèng',
          display_pinyin: 'lǚxíngzhèng',
          pinyin_tone: 'lv3xing2zheng4',
          meaning_th: 'เอกสารเดินทางฉุกเฉิน / หนังสือเดินทางชั่วคราว',
          meaning_en: 'travel certificate / emergency travel document',
          radical: '方',
          radical_name_th: 'หมวดทิศทาง (方字旁)',
          stroke_count: 24,
          mnemonic: 'เอกสารรับรองสิทธิ์ (证) สำหรับเดินทางกลับประเทศ (旅行) เมื่อพาสปอร์ตหาย = เอกสารเดินทางฉุกเฉิน',
          kid_mnemonic: 'เล่มกระดาษสีน้ำเงินเข้ม ใช้แทนพาสปอร์ตขึ้นเครื่องบินกลับบ้าน = 旅行证',
          body_gesture: 'ชูสมุดเล่มเล็กขึ้นมาระดับสายตา'
        },
        {
          id: 'hsk2_2015',
          hanzi: '证明',
          pinyin: 'zhèngmíng',
          display_pinyin: 'zhèngmíng',
          pinyin_tone: 'zheng4ming2',
          meaning_th: 'ใบรับรอง / เอกสารหลักฐานยืนยัน',
          meaning_en: 'certificate / proof / to prove',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 15,
          mnemonic: 'คำพูดรับรอง (讠) เพื่อให้ข้อเท็จจริงกระจ่างแจ้งชัดเจน (明) = เอกสารยืนยัน / ใบรับรอง',
          kid_mnemonic: 'กระดาษมีตราประทับสีแดง ยืนยันว่าแจ้งความแล้ว = 证明',
          body_gesture: 'ทำท่าประทับตราสีแดงลงบนเอกสาร'
        },
        {
          id: 'hsk2_2016',
          hanzi: '挂失',
          pinyin: 'guàshī',
          display_pinyin: 'guàshī',
          pinyin_tone: 'gua4shi1',
          meaning_th: 'แจ้งอายัดบัตร / แจ้งความของหายอย่างเป็นทางการ',
          meaning_en: 'to report the loss (of card/passport)',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 14,
          mnemonic: 'ขึ้นทะเบียนแขวนป้ายระงับ (挂) สิ่งของที่พลัดพรากสูญหาย (失) = แจ้งอายัด',
          kid_mnemonic: 'โทรหาธนาคาร ล็อกบัตรทันทีไม่ให้ใครเอาไปรูด = 挂失',
          body_gesture: 'ทำสองมือไขว้กันกากบาทล็อกไม่ให้ใช้งาน'
        },
        {
          id: 'hsk2_2017',
          hanzi: '协助',
          pinyin: 'xiézhù',
          display_pinyin: 'xiézhù',
          pinyin_tone: 'xie2zhu4',
          meaning_th: 'ให้ความช่วยเหลือ / ประสานงานช่วยเหลือ',
          meaning_en: 'to assist / help / provide assistance',
          radical: '十',
          radical_name_th: 'หมวดสิบ (十字旁)',
          stroke_count: 13,
          mnemonic: 'ร่วมแรงร่วมใจสามัคคีกัน (协) เพื่อช่วยเหลือผู้อื่น (助) = ประสานงานช่วยเหลือ',
          kid_mnemonic: 'เจ้าหน้าที่จับมือพาไปทำเรื่องอย่างอบอุ่น = 协助',
          body_gesture: 'ยื่นสองมือออกไปจับมือประสานความช่วยเหลือ'
        },
        {
          id: 'hsk2_2018',
          hanzi: '补办',
          pinyin: 'bǔbàn',
          display_pinyin: 'bǔbàn',
          pinyin_tone: 'bu3ban4',
          meaning_th: 'ทำเรื่องออกเอกสารใหม่ทดแทนของเดิม',
          meaning_en: 'to reapply / get a replacement (document)',
          radical: '衤',
          radical_name_th: 'หมวดเสื้อผ้า (衣字旁)',
          stroke_count: 16,
          mnemonic: 'ปะชดเชยส่วนที่ขาดหาย (补) โดยการดำเนินการจัดการใหม่ (办) = ทำเอกสารทดแทน',
          kid_mnemonic: 'ได้เล่มพาสปอร์ตใหม่เอี่ยมกลับมาอยู่ในมือ = 补办',
          body_gesture: 'ตบหลังมือตัวเองเบาๆ โล่งใจที่ได้บัตรใหม่'
        }
      ],
      tone_rule: {
        rule_name: 'Tone Sandhi: 大使馆 (dàshǐguǎn ➔ dàshíguǎn)',
        description_th: 'คำว่า 使 (เสียง 3) นำหน้า 馆 (เสียง 3) เข้ากฎ 3+3 Sandhi คำว่า 使 จะผันเป็นเสียง 2 (shí)',
        example: '泰国驻华大使馆 (Tàiguó zhù Huá dàshíguǎn - สถานทูตไทยประจำประเทศจีน)',
        fun_metaphor: 'เสียงสามสองตัวติดกัน ตัวหน้าเด้งขึ้นเป็น shí อย่างนุ่มนวล!',
        reassurance: 'คำว่า 补办 (bǔbàn) ออกเสียง 半三声 ชัดเจน'
      },
      grammar_bite: {
        title: 'สูตรเลโก้ขอความช่วยเหลือจากสถานทูต: 请协助我... และ 申请补办...',
        explanation_th: 'ขอความช่วยเหลือทางการทูต และขอออกเอกสารเดินทางชั่วคราว',
        patterns: [
          {
            formula: '请协助我 + 办理 + [เอกสาร]',
            zh: '请协助我办理紧急旅行证。',
            pinyin: 'Qǐng xiézhù wǒ bànlǐ jǐnjí lǚxíngzhèng.',
            th: 'กรุณาช่วยประสานงานออกเอกสารเดินทางฉุกเฉินให้ผมด้วยครับ',
            en: 'Please assist me in processing an emergency travel certificate.'
          },
          {
            formula: '持 + 派出所开具的 + 报警证明',
            zh: '持派出所开具的报警证明去使馆。',
            pinyin: 'Chí pàichūsuǒ kāijù de bàojǐng zhèngmíng qù shǐguǎn.',
            th: 'ถือใบแจ้งความที่ออกโดยสถานีตำรวจไปสถานทูต',
            en: 'Take the police report certificate issued by the station to the embassy.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '泰国大使馆领事部吗？您好！我的护照在北京意外遗失了，三天后要赶飞机回曼谷，请协助我办理紧急旅行证！',
          pinyin: 'Tàiguó Dàshǐguǎn lǐngshìbù ma? Nín hǎo! Wǒ de hùzhào zài Běijīng yìwài yíshī le, sān tiān hòu yào gǎn fēijī huí Màngǔ, qǐng xiézhù wǒ bànlǐ jǐnjí lǚxíngzhèng!',
          th: 'แผนกกงสุลสถานทูตไทยใช่ไหมครับ? สวัสดีครับ! พาสปอร์ตของผมทำหล่นหายที่ปักกิ่ง อีก 3 วันต้องรีบขึ้นเครื่องบินกลับกรุงเทพฯ กรุณาช่วยประสานงานออกเอกสารเดินทางฉุกเฉินให้ผมด้วยครับ!',
          en: 'Is this the Thai Embassy consular section? Hello! I lost my passport in Beijing, I need to catch a flight back to Bangkok in 3 days, please assist me in applying for an emergency travel certificate!'
        },
        {
          speaker: 'B',
          speaker_name: 'เจ้าหน้าที่สถานทูตไทย 👩‍💼',
          zh: '您好！请不要慌张。您先去当地派出所报案挂失，拿到《护照遗失报警证明》和两寸白底证件照片，然后马上来使馆。',
          pinyin: 'Nín hǎo! Qǐng bú yào huāngzhāng. Nín xiān qù dāngdì pàichūsuǒ bào’àn guàshī, nádào “Hùzhào Yíshī Bàojǐng Zhèngmíng” hé liǎng cùn bái dǐ zhèngjiàn zhàopiàn, ránhòu mǎshàng lái shǐguǎn.',
          th: 'สวัสดีค่ะ! ไม่ต้องตื่นตระหนกนะคะ คุณไปแจ้งความอายัดที่สถานีตำรวจในท้องที่ก่อน นำใบแจ้งความพาสปอร์ตหายและรูปถ่าย 2 นิ้วพื้นขาว แล้วรีบมาที่สถานทูตได้เลยค่ะ',
          en: 'Hello! Please do not panic. First go to the local police station to report the loss, obtain the Loss Certificate and 2-inch white-background photos, then come to the embassy immediately.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '好的，报警证明我已经拿到了，请问补办紧急旅行证需要多长时间？',
          pinyin: 'Hǎo de, bàojǐng zhèngmíng wǒ yǐjīng nádào le, qǐngwèn bǔbàn jǐnjí lǚxíngzhèng xūyào duō cháng shíjiān?',
          th: 'ได้ครับ ใบแจ้งความผมได้รับเรียบร้อยแล้ว ขอถามหน่อยการออกเอกสารเดินทางฉุกเฉินใช้เวลานานเท่าไหร่ครับ?',
          en: 'Okay, I already got the police report certificate, may I ask how long it takes to issue an emergency travel certificate?'
        },
        {
          speaker: 'B',
          speaker_name: 'เจ้าหน้าที่สถานทูตไทย 👩‍💼',
          zh: '紧急情况下一到两个工作日即可核发，我们会全力协助您顺利回国！',
          pinyin: 'Jǐnjí qíngkuàng xià yí dào liǎng ge gōngzuòrì jíkě héfā, wǒmen huì quánlì xiézhù nín shùnlì huíguó!',
          th: 'ในกรณีฉุกเฉิน 1-2 วันทำการก็สามารถอนุมัติออกเอกสารได้ค่ะ พวกเราจะช่วยเหลืออย่างเต็มที่เพื่อให้คุณเดินทางกลับประเทศได้อย่างราบรื่นค่ะ!',
          en: 'In emergencies it can be issued in 1-2 business days, we will fully assist you in returning home smoothly!'
        }
      ],
      quizzes: [
        {
          type: 'meaning_match',
          question_th: "เมื่อทำพาสปอร์ตหายในต่างประเทศ เอกสารเดินทางฉุกเฉินที่สถานทูตออกให้ชั่วคราวเรียกว่าข้อใด?",
          options: [
            '紧急旅行证 (Emergency Travel Certificate)',
            '驾驶证 (Driving License)',
            '工作证 (Work Permit)',
            '结婚证 (Marriage Certificate)'
          ],
          correct_index: 0,
          explanation_th: "'旅行证' (Emergency Travel Certificate) คือ เอกสารใช้แทนพาสปอร์ตชั่วคราวสำหรับเดินทางกลับประเทศ",
          encouragement: 'จำเอกสารกงสุลฉุกเฉินที่สำคัญที่สุดได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '馆' ในคำว่า '大使馆' (สถานทูต) มีหมวดนำอาหาร '饣' สื่อถึงสิ่งใด?",
          options: [
            'สถานที่พักรับรองและจัดเลี้ยงแขกบ้านแขกเมือง',
            'เครื่องมือช่าง',
            'ทุ่งหญ้าเลี้ยงสัตว์',
            'ท้องทะเลลึก'
          ],
          correct_index: 0,
          explanation_th: "'馆' ดั้งเดิมหมายถึง โรงเตี๊ยมหรือเรือนรับรองแขกบ้านแขกเมืองที่มีอาหารเลี้ยงรับรอง",
          encouragement: 'เข้าใจที่มาทางประวัติศาสตร์ของอักษร 馆 ได้อย่างลึกซึ้ง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "กรุณาช่วยออกเอกสารเดินทางฉุกเฉินให้ผม"',
          tokens: ['办理紧急旅行证', '请协助我'],
          correct_sequence: ['请协助我', '办理紧急旅行证'],
          pinyin: 'Qǐng xiézhù wǒ bànlǐ jǐnjí lǚxíngzhèng',
          meaning_th: 'กรุณาช่วยออกเอกสารเดินทางฉุกเฉินให้ผม',
          explanation_th: 'คำขอร้อง (请协助我) + ภารกิจธุรกรรม (办理紧急旅行证)',
          encouragement: 'ต่อบล็อกเลโก้กงสุลสถานทูตได้อย่างคล่องแคล่ว!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '证明' (zhèngmíng) มีความหมายตรงกับข้อใด?",
          options: [
            'ใบรับรอง / เอกสารยืนยันหลักฐาน',
            'ตั๋วเครื่องบิน',
            'กระเป๋าเดินทาง',
            'บัตรเครดิต'
          ],
          correct_index: 0,
          explanation_th: "'证明' แปลว่า ใบรับรอง หรือหลักฐานยืนยัน (证 = หลักฐาน, 明 = ชัดแจ้ง)",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์สำคัญจำได้แม่นยำ!'
        }
      ]
    },
    {
      lesson_id: 't2_u20_l04',
      lesson_number: 4,
      title: {
        zh: '警局报案与使馆求助终极挑战',
        th: 'ภารกิจพิชิตสถานีตำรวจ & ประสานสถานทูต',
        en: 'Grand Emergency Quest'
      },
      can_do: {
        th: 'แจ้งความของหายที่สถานีตำรวจอย่างเป็นระบบ ขอใบรับรองคดี (报警回执) และประสานสถานทูตไทยออกเอกสารเดินทางได้อย่างสมบูรณ์แบบ',
        en: 'Report lost property systematically, obtain police loss receipts, and coordinate embassy emergency documents'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พิชิตบอสใหญ่เหตุฉุกเฉิน แจ้งความพาสปอร์ตหาย ขอใบแจ้งความ และติดต่อสถานทูตไทยสำเร็จ 100%!',
      vocabulary: [
        {
          id: 'hsk2_2019',
          hanzi: '回执',
          pinyin: 'huízhí',
          display_pinyin: 'huízhí',
          pinyin_tone: 'hui2zhi2',
          meaning_th: 'ใบตอบรับ / สลิปหลักฐานการรับเรื่อง',
          meaning_en: 'acknowledgement receipt / confirmation slip',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 14,
          mnemonic: 'ยื่นมือกุมหลักฐาน (执) ที่ส่งตอบกลับมาให้ (回) = ใบตอบรับการแจ้งความ',
          kid_mnemonic: 'กระดาษหลักฐานจากตำรวจ มีตราปั๊ม ใช้ไปยื่นสถานทูต = 回执',
          body_gesture: 'ยื่นสองมือรับแผ่นกระดาษใบแจ้งความมาประคองไว้'
        },
        {
          id: 'hsk2_2020',
          hanzi: '核发',
          pinyin: 'héfā',
          display_pinyin: 'héfā',
          pinyin_tone: 'he2fa1',
          meaning_th: 'ตรวจสอบอนุมัติและออกเอกสาร',
          meaning_en: 'to verify and issue (documents)',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 15,
          mnemonic: 'ตรวจเช็กเมล็ดพันธุ์ความถูกต้อง (核) แล้วจึงส่งจ่ายออกไป (发) = ตรวจสอบและอนุมัติออกเอกสาร',
          kid_mnemonic: 'เจ้าหน้าที่ตรวจรูปถ่ายแล้วเซ็นอนุมัติส่งเล่มให้ = 核发',
          body_gesture: 'ทำท่าตรวจเอกสารแล้วประทับตราอนุมัติ'
        },
        {
          id: 'hsk2_2021',
          hanzi: '领事',
          pinyin: 'lǐngshì',
          display_pinyin: 'lǐngshì',
          pinyin_tone: 'ling3shi4',
          meaning_th: 'เจ้าหน้าที่กงสุล / งานกงสุล',
          meaning_en: 'consul / consular affairs',
          radical: '页',
          radical_name_th: 'หมวดศีรษะ/หน้า (页字旁)',
          stroke_count: 19,
          mnemonic: 'ผู้นำดูแลปกป้องคุ้มครองประชาชน (领) ในเรื่องราวกิจการต่างแดน (事) = เจ้าหน้าที่กงสุล',
          kid_mnemonic: 'คุณน้าเจ้าหน้าที่สถานทูตคอยคุ้มครองคนไทยในต่างแดน = 领事',
          body_gesture: 'โค้งคำนับแสดงความเคารพเจ้าหน้าที่กงสุล'
        },
        {
          id: 'hsk2_2022',
          hanzi: '安全',
          pinyin: 'ānquán',
          display_pinyin: 'ānquán',
          pinyin_tone: 'an1quan2',
          meaning_th: 'ปลอดภัย / ความปลอดภัย',
          meaning_en: 'safe / safety',
          radical: '宀',
          radical_name_th: 'หมวดหลังคาเรือน (宝盖头)',
          stroke_count: 12,
          mnemonic: 'ผู้หญิงอยู่ใต้หลังคาบ้านอันอบอุ่น (安) อย่างครบถ้วนสมบูรณ์ไร้รอยขีดข่วน (全) = ปลอดภัย',
          kid_mnemonic: 'ยกสองนิ้วโป้ง ยิ้มกว้าง ทุกอย่างเรียบร้อย ปลอดภัยดีแล้ว = 安全',
          body_gesture: 'ยกสองนิ้วโป้งระดับอกแล้วยิ้มโล่งใจ'
        }
      ],
      tone_rule: {
        rule_name: 'Tone Sandhi: 安全 (ānquán ➔ ānquán)',
        description_th: 'คำว่า 安 (เสียง 1) ตามด้วย 全 (เสียง 2) ออกเสียงตามวรรณยุกต์เดิมชัดเจน',
        example: '注意安全 (zhùyì ānquán - ระวังความปลอดภัย)',
        fun_metaphor: 'คำว่า 安全 คือพรวิเศษและเป้าหมายสูงสุดของการเดินทางท่องเที่ยว!',
        reassurance: 'คำว่า 报警回执 คือใบแจ้งความที่ต้องใช้ยื่นสถานทูตเสมอ!'
      },
      grammar_bite: {
        title: 'สรุปการสื่อสารในภาวะวิกฤต (Emergency Grand Playbook)',
        explanation_th: 'รวมประโยค: แจ้งความของหายด้วย 连...都..., นึกไม่ถึงด้วย 竟然, และขอออกเอกสารฉุกเฉิน',
        patterns: [
          {
            formula: '我的护照遗失了，连 + [สิ่งสำคัญ] + 都丢了',
            zh: '我的背包遗失了，连护照都丢了。',
            pinyin: 'Wǒ de bèibāo yíshī le, lián hùzhào dōu diū le.',
            th: 'กระเป๋าเป้ของผมหาย แม้กระทั่งพาสปอร์ตก็หายไปด้วยครับ',
            en: 'My backpack is lost, even my passport is lost.'
          },
          {
            formula: '请给我开具一份 + 报警回执证明',
            zh: '请给我开具一份报警回执证明。',
            pinyin: 'Qǐng gěi wǒ kāijù yí fèn bàojǐng huízhí zhèngmíng.',
            th: 'กรุณาออกใบแจ้งความตอบรับให้ผมหนึ่งฉบับด้วยครับ',
            en: 'Please issue me a police report acknowledgement certificate.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '朝阳派出所民警同志，我要报警。我的黑色背包遗失了，连护照都丢了！我三天后要回国，请给我开具报警回执证明！',
          pinyin: 'Cháoyáng pàichūsuǒ mínjǐng tóngzhì, wǒ yào bàojǐng. Wǒ de hēisè bèibāo yíshī le, lián hùzhào dōu diū le! Wǒ sān tiān hòu yào huíguó, qǐng gěi wǒ kāijù bàojǐng huízhí zhèngmíng!',
          th: 'คุณตำรวจสถานีเฉายางครับ ผมต้องการแจ้งความ กระเป๋าเป้สีดำของผมหาย แม้กระทั่งพาสปอร์ตก็หายไปด้วย! อีก 3 วันผมต้องเดินทางกลับประเทศ กรุณาออกใบแจ้งความให้ผมด้วยครับ!',
          en: 'Officer at Chaoyang station, I need to report a loss. My black backpack is lost, even my passport is gone! I return home in 3 days, please issue a police report certificate!'
        },
        {
          speaker: 'B',
          speaker_name: 'ตำรวจสถานีเฉายาง 👮‍♂️',
          zh: '好的，登记好了。这是《报警回执单》，上面盖了派出所公章，你持这个去泰国大使馆申请旅行证。',
          pinyin: 'Hǎo de, dēngjì hǎo le. Zhè shì “Bàojǐng Huízhí Dān”, shàngmiàn gài le pàichūsuǒ gōngzhāng, nǐ chí zhè ge qù Tàiguó Dàshǐguǎn shēnqǐng lǚxíngzhèng.',
          th: 'ได้ครับ ลงบันทึกเรียบร้อยแล้ว นี่คือ "ใบแจ้งความ" ด้านบนประทับตราทางการของสถานีตำรวจแล้ว คุณถือใบนี้ไปยื่นขอเอกสารเดินทางที่สถานทูตไทยได้เลยครับ',
          en: 'Okay, registered. This is the "Police Report Receipt", stamped with the official seal. Take this to the Thai Embassy to apply for a travel certificate.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '领事部老师您好！我拿到警局回执了，申请补办紧急旅行证，请协助我加急核发！',
          pinyin: 'Lǐngshìbù lǎoshī nín hǎo! Wǒ nádào jǐngjú huízhí le, shēnqǐng bǔbàn jǐnjí lǚxíngzhèng, qǐng xiézhù wǒ jiājí héfā!',
          th: 'สวัสดีครับอาจารย์แผนกกงสุล! ผมได้รับใบแจ้งความจากตำรวจแล้ว มายื่นขอทำเอกสารเดินทางฉุกเฉิน กรุณาช่วยดำเนินการอนุมัติด่วนให้ด้วยครับ!',
          en: 'Hello Consular officer! I got the police receipt, applying for emergency travel certificate, please assist in expedited issuance!'
        },
        {
          speaker: 'B',
          speaker_name: 'เจ้าหน้าที่กงสุลไทย 👩‍💼',
          zh: '材料齐全，没问题！我们明天下午核发旅行证给您，祝您一路平安，安全回国！',
          pinyin: 'Cáiliào qíquán, méi wèntí! Wǒmen míngtiān xiàwǔ héfā lǚxíngzhèng gěi nín, zhù nín yílù píng’ān, ānquán huíguó!',
          th: 'เอกสารครบถ้วน ไม่มีปัญหาค่ะ! พรุ่งนี้บ่ายทางเราจะอนุมัติออกเอกสารเดินทางให้คุณ ขอให้เดินทางราบรื่น ปลอดภัยกลับสู่ประเทศไทยนะคะ!',
          en: 'Documents complete, no problem! We will issue your travel certificate tomorrow afternoon, wishing you a safe journey home!'
        }
      ],
      quizzes: [
        {
          type: 'meaning_match',
          question_th: "เมื่อแจ้งความที่สถานีตำรวจจีน เอกสารสำคัญที่ต้องขอเพื่อนำไปยื่นสถานทูตคือข้อใด?",
          options: [
            '报警回执 (ใบตอบรับการแจ้งความ / Loss Report Receipt)',
            '发票 (ใบกำกับภาษี)',
            '电影票 (ตั๋วชมภาพยนตร์)',
            '外卖单 (ใบเสร็จเดลิเวอรี่)'
          ],
          correct_index: 0,
          explanation_th: "'报警回执' คือ ใบแจ้งความอย่างเป็นทางการที่มีตราประทับของตำรวจ ใช้เป็นหลักฐานยื่นสถานทูต",
          encouragement: 'จำเอกสารหลักฐานสำคัญที่สุดในการขอความช่วยเหลือต่างแดนได้แม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '安' ในคำว่า '安全' (ปลอดภัย) มีหมวดนำหลังคา '宀' สื่อถึงสิ่งใด?",
          options: [
            'ความปลอดภัยสงบสุขใต้ร่มเงาบ้านเรือน',
            'การผจญภัยในป่าลึก',
            'การขึ้นเครื่องบิน',
            'การขับรถแข่ง'
          ],
          correct_index: 0,
          explanation_th: "'宀' (宝盖头) สื่อถึงหลังคาบ้าน มีผู้หญิงอยู่ข้างใน สื่อถึงความสงบสุข ปลอดภัย",
          encouragement: 'เข้าใจรากศัพท์หมวดหลังคา 宀 ได้อย่างลึกซึ้ง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ขอให้เดินทางปลอดภัย"',
          tokens: ['安全回国', '祝您'],
          correct_sequence: ['祝您', '安全回国'],
          pinyin: 'Zhù nín ānquán huíguó',
          meaning_th: 'ขอให้เดินทางกลับประเทศอย่างปลอดภัย',
          explanation_th: 'คำอวยพร (祝您) + กริยาเป้าหมาย (安全回国)',
          encouragement: 'ต่อบล็อกเลโก้อวยพรความปลอดภัยได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '核发' (héfā) มีความหมายตรงกับข้อใด?",
          options: [
            'ตรวจสอบอนุมัติและออกเอกสาร',
            'ยกเลิกเอกสาร',
            'ยึดเอกสารคืน',
            'ทำเอกสารหาย'
          ],
          correct_index: 0,
          explanation_th: "'核发' แปลว่า ตรวจสอบและอนุมัติออกเอกสาร (核 = ตรวจสอบ, 发 = แจกจ่าย/ออกให้)",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์สำคัญจำได้แม่นยำ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณทำกระเป๋าเป้หายในกรุงปักกิ่งและพบว่าพาสปอร์ตก็หายไปด้วย (连护照都丢了) อีก 3 วันต้องขึ้นเครื่องบินกลับประเทศไทย คุณเดินทางไปสถานีตำรวจเฉายางเพื่อแจ้งความ ขอใบแจ้งความ (报警回执) แล้วติดต่อสถานทูตไทยเพื่อขอออกเอกสารเดินทางฉุกเฉิน (紧急旅行证) คุณควรสื่อสารขั้นตอนทั้งหมดอย่างไรให้กระชับ ชัดเจน และได้ความช่วยเหลือเร็วที่สุด?',
        options: [
          '警察同志您好！我的背包遗失了，连护照都丢了，请给我开具报警回执证明，我需要去泰国大使馆办理紧急旅行证加急核发，安全回国！ (Jǐngchá tóngzhì nín hǎo! Wǒ de bèibāo yíshī le, lián hùzhào dōu diū le, qǐng gěi wǒ kāijù bàojǐng huízhí zhèngmíng, wǒ xūyào qù Tàiguó Dàshǐguǎn bànlǐ jǐnjí lǚxíngzhèng jiājí héfā, ānquán huíguó!)',
          '阿姨过年好！这是新鲜水果，一点儿心意请收下！ (Āyí guònián hǎo! Zhè shì xīnxiān shuǐguǒ, yìdiǎnr xīnyì qǐng shōuxià!)',
          '这件衣服有点儿肥，我想换成M码并退还差价。 (Zhè jiàn yīfu yǒudiǎnr féi, wǒ xiǎng huàn chéng M mǎ bìng tuìhuán chājià.)',
          '我想办一张三十G流量的手机卡，多少钱？ (Wǒ xiǎng bàn yì zhāng sānshí G liúliàng de shǒujīkǎ, duōshao qián?)'
        ],
        correct_index: 0,
        explanation_th: "ตัวเลือกแรกสื่อสารครบถ้วนสมบูรณ์แบบที่สุด: แจ้งความของหายด้วยโครงสร้าง 连...都... (连护照都丢了) ขอเอกสารสำคัญ (开具报警回执证明) ระบุปลายทางสถานทูตไทย (泰国大使馆) และขอเอกสารเดินทางฉุกเฉิน (紧急旅行证加急核发) เพื่อเดินทางกลับประเทศอย่างปลอดภัย (安全回国)",
        encouragement: 'ยินดีด้วยอย่างยิ่ง! คุณพิชิต Grand Boss Challenge เหตุฉุกเฉินและกงสุลสถานทูต ได้รับเอกสารเดินทางและกลับบ้านอย่างปลอดภัย 100%!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u20_master',
        badge_name: 'ผู้พิทักษ์ความปลอดภัยไร้พรมแดน 🛡️🇨🇳',
        message_th: 'ขอแสดงความยินดีอย่างสูงสุด! คุณพิชิต Unit 20 และสำเร็จหลักสูตร Tier 2 Batch B ครบทั้ง 5 ยูนิตอย่างงดงาม พร้อมเดินทางท่องเที่ยวและใช้ชีวิตในประเทศจีนได้อย่างปลอดภัย มั่นใจ ไร้กังวล!',
        xp_reward: 200
      }
    }
  ]
};
