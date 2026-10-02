/**
 * scripts/tier2_batch_c/unit21.ts
 * Tier 2 Unit 21: 文娱与观影 (Entertainment, Cinema & Palace Museum)
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

export const unit21 = {
  unit_id: 'tier2_u21',
  tier: 2,
  unit_number: 21,
  title: {
    zh: '文娱与观影',
    th: 'สันทนาการ & ชมภาพยนตร์',
    en: 'Entertainment & Cinema'
  },
  description: 'เพลิดเพลินกับกิจกรรมบันเทิงในเมืองจีน ซื้อตั๋วหนัง เลือกที่นั่งแถวโปรด สั่งป๊อปคอร์น จองตั๋วชมนิทรรศการพิเศษพระราชวังโบราณกู้กงผ่านมินิโปรแกรม และแลกเปลี่ยนรีวิวภาพยนตร์อย่างออกรส',
  lessons: [
    {
      lesson_id: 't2_u21_l01',
      lesson_number: 1,
      title: {
        zh: '电影院选座与观影',
        th: 'โรงภาพยนตร์ & การเลือกที่นั่ง',
        en: 'Cinema & Seat Selection'
      },
      can_do: {
        th: 'ซื้อตั๋วภาพยนตร์ที่เคาน์เตอร์หรือตู้จำหน่ายอัตโนมัติ เลือกที่นั่ง และเปรียบเทียบโรงภาพยนตร์ด้วยโครงสร้าง A 没有 B 那么...',
        en: 'Purchase movie tickets, select preferred seats, and compare theaters using A 没有 B 那么...'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ซื้อตั๋วหนังรอบค่ำ เลือกที่นั่งตรงกลางแถวที่ 8 พร้อมสั่งป๊อปคอร์นรสคาราเมลได้อย่างคล่องแคล่ว!',
      vocabulary: [
        {
          id: 'hsk2_2101',
          hanzi: '电影院',
          pinyin: 'diànyǐngyuàn',
          display_pinyin: 'diànyǐngyuàn',
          pinyin_tone: 'dian4ying3yuan4',
          meaning_th: 'โรงภาพยนตร์ / โรงหนัง',
          meaning_en: 'cinema / movie theater',
          radical: '阝',
          radical_name_th: 'หมวดเนินเขาขวา (双耳旁)',
          stroke_count: 22,
          mnemonic: 'สถานที่กว้างใหญ่ (院) สำหรับฉายภาพเงาไฟฟ้า (电影) = โรงภาพยนตร์',
          kid_mnemonic: 'เดินเข้าตึกใหญ่ มีป้ายไฟระยิบระยับฉายหนังจอใหญ่ = 电影院',
          body_gesture: 'ทำมือสี่เหลี่ยมเป็นจอหนังแล้วมองเข้าไปตาโต'
        },
        {
          id: 'hsk2_2102',
          hanzi: '选座',
          pinyin: 'xuǎnzuò',
          display_pinyin: 'xuǎnzuò',
          pinyin_tone: 'xuan3zuo4',
          meaning_th: 'เลือกที่นั่ง',
          meaning_en: 'to select seats',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之底)',
          stroke_count: 16,
          mnemonic: 'เดินก้าวเลือกดู (选) เพื่อหาที่นั่งที่สบายที่สุด (座) = เลือกที่นั่ง',
          kid_mnemonic: 'เอานิ้วจิ้มหน้าจอเลือกล็อกที่นั่งตรงกลางโรง = 选座',
          body_gesture: 'ชี้นิ้วจิ้มบนอากาศเหมือนเลือกที่นั่งบนหน้าจอสัมผัส'
        },
        {
          id: 'hsk2_2103',
          hanzi: '爆米花',
          pinyin: 'bàomǐhuā',
          display_pinyin: 'bàomǐhuā',
          pinyin_tone: 'bao4mi3hua1',
          meaning_th: 'ป๊อปคอร์น / ข้าวโพดคั่ว',
          meaning_en: 'popcorn',
          radical: '火',
          radical_name_th: 'หมวดไฟ (火字旁)',
          stroke_count: 23,
          mnemonic: 'เมล็ดข้าวโพดโดนไฟประทุแตก (爆) ออกมาเป็นดอกไม้สีขาวหอมกรุ่น (米花) = ป๊อปคอร์น',
          kid_mnemonic: 'ข้าวโพดระเบิดป๊อป แตกเป็นดอกไม้สีขาวกรอบอร่อย = 爆米花',
          body_gesture: 'กางนิ้วมือสองข้างพร้อมกันทำท่าแตกกระจายเหมือนข้าวโพดคั่ว'
        },
        {
          id: 'hsk2_2104',
          hanzi: '屏幕',
          pinyin: 'píngmù',
          display_pinyin: 'píngmù',
          pinyin_tone: 'ping2mu4',
          meaning_th: 'หน้าจอ / จอภาพยนตร์',
          meaning_en: 'screen',
          radical: '巾',
          radical_name_th: 'หมวดผ้า (巾字底)',
          stroke_count: 23,
          mnemonic: 'ฉากผืนผ้าใบขนาดใหญ่ (幕) กั้นเป็นแผ่นแบนสะท้อนแสง (屏) = จอภาพยนตร์',
          kid_mnemonic: 'จอผ้าใบยักษ์สว่างวาบ ภาพยนตร์เริ่มฉายแล้ว = 屏幕',
          body_gesture: 'กางแขนออกกว้างทั้งสองข้างวาดเป็นสี่เหลี่ยมผืนผ้าขนาดใหญ่'
        },
        {
          id: 'hsk2_2105',
          hanzi: '字幕',
          pinyin: 'zìmù',
          display_pinyin: 'zìmù',
          pinyin_tone: 'zi4mu4',
          meaning_th: 'คำบรรยาย / ซับไตเติล',
          meaning_en: 'subtitles / captions',
          radical: '宀',
          radical_name_th: 'หมวดหลังคาเรือน (宝盖头)',
          stroke_count: 19,
          mnemonic: 'ตัวอักษรวิ่งอยู่บนผืนผ้าจอ (幕) ช่วยให้อ่านเข้าใจง่าย = คำบรรยาย',
          kid_mnemonic: 'ตัวหนังสือสีขาวตัวเล็กๆ วิ่งอยู่ด้านล่างจอ = 字幕',
          body_gesture: 'ชี้นิ้วเลื่อนไปมาระดับสายตาเหมือนอ่านซับไตเติล'
        },
        {
          id: 'hsk2_2106',
          hanzi: '场次',
          pinyin: 'chǎngcì',
          display_pinyin: 'chǎngcì',
          pinyin_tone: 'chang3ci4',
          meaning_th: 'รอบฉาย / รอบการแสดง',
          meaning_en: 'screening session / showtime',
          radical: '土',
          radical_name_th: 'หมวดดิน (提土旁)',
          stroke_count: 12,
          mnemonic: 'ลำดับครั้ง (次) ในการจัดแสดง ณ ลานโรงมหรสพ (场) = รอบฉาย',
          kid_mnemonic: 'ดูตารางเวลาเลือกรอบทุ่มครึ่ง = 场次',
          body_gesture: 'ยกข้อมือดูนาฬิกาแล้วชี้นิ้วบนตารางรอบฉาย'
        }
      ],
      tone_rule: {
        rule_name: 'ไวยากรณ์เปรียบเทียบเชิงลบ: A 没有 B 那么 / 这么...',
        description_th: 'ใช้ปฏิเสธการเปรียบเทียบว่า A ไม่ได้...เท่ากับ B (เช่น 普通厅没有IMAX那么清晰 = โรงธรรมดาไม่คมชัดเท่า IMAX)',
        example: '这家电影院没有那家那么大 (Zhè jiā diànyǐngyuàn méiyǒu nà jiā nàme dà)',
        fun_metaphor: 'ไม่มีคำว่า "ไม่ดี" แต่บอกว่า "ยังไม่ถึงขั้นนั้น" เพื่อการปฏิเสธอย่างสุภาพ!',
        reassurance: 'โครงสร้างนี้สุภาพและนิยมใช้ในภาษาพูดมากกว่า 不如'
      },
      grammar_bite: {
        title: 'สูตรเลโก้เปรียบเทียบความรู้สึก: A + 没有 + B + 那么 + [คุณศัพท์]',
        explanation_th: 'ใช้เปรียบเทียบคุณภาพ ความสบาย หรือราคาของสถานที่สองแห่งได้อย่างเป็นธรรมชาติ',
        patterns: [
          {
            formula: '普通厅 + 没有 + IMAX厅 + 那么 + [คุณศัพท์]',
            zh: '普通厅的屏幕没有IMAX厅那么大。',
            pinyin: 'Pǔtōngtīng de píngmù méiyǒu IMAX tīng nàme dà.',
            th: 'หน้าจอของโรงธรรมดาไม่ใหญ่เท่ากับโรง IMAX ครับ',
            en: 'The standard theater screen is not as big as the IMAX theater.'
          },
          {
            formula: '我买的场次 + 没有 + 晚上的场次 + 那么 + 贵',
            zh: '下午的场次没有晚上的场次那么贵。',
            pinyin: 'Xiàwǔ de chǎngcì méiyǒu wǎnshang de chǎngcì nàme guì.',
            th: 'รอบฉายช่วงบ่ายไม่แพงเท่ากับรอบฉายช่วงค่ำครับ',
            en: 'The afternoon session is not as expensive as the evening session.'
          },
          {
            formula: '请帮我们选 + [แถว] + [ที่นั่ง] + 的位置',
            zh: '请帮我们选第八排中间的位置。',
            pinyin: 'Qǐng bāng wǒmen xuǎn dì-bā pái zhōngjiān de wèizhi.',
            th: 'ช่วยเลือกที่นั่งตรงกลางแถวที่ 8 ให้พวกเราหน่อยนะครับ',
            en: 'Please help us choose the seats in the middle of row 8.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'พนักงานโรงหนัง 👩‍💼',
          zh: '您好！欢迎光临，请问您想看哪部电影？哪个场次？',
          pinyin: 'Nín hǎo! Huānyíng guānglín, qǐngwèn nín xiǎng kàn nǎ bù diànyǐng? Nǎge chǎngcì?',
          th: 'สวัสดีค่ะ! ยินดีต้อนรับ ไม่ทราบว่าอยากชมภาพยนตร์เรื่องไหนและรอบกี่โมงคะ?',
          en: 'Hello! Welcome, which movie and showtime would you like to watch?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '我想看晚上七点半的科幻电影，请问有中英双语字幕吗？',
          pinyin: 'Wǒ xiǎng kàn wǎnshang qī diǎn bàn de kēhuàn diànyǐng, qǐngwèn yǒu zhōng-yīng shuāngyǔ zìmù ma?',
          th: 'ผมอยากดูหนังไซไฟรอบ 19:30 น. ครับ ขอถามหน่อยมีซับไตเติลภาษาจีน-อังกฤษคู่กันไหมครับ?',
          en: 'I would like to watch the 7:30 PM sci-fi movie. Does it have Chinese-English bilingual subtitles?'
        },
        {
          speaker: 'A',
          speaker_name: 'พนักงานโรงหนัง 👩‍💼',
          zh: '有的！这是巨幕厅，屏幕特别大。您可以在屏幕上自主选座。',
          pinyin: 'Yǒu de! Zhè shì jùmù tīng, píngmù tèbié dà. Nín kěyǐ zài píngmù shàng zìzhǔ xuǎnzuò.',
          th: 'มีค่ะ! นี่เป็นโรงจอยักษ์ หน้าจอใหญ่เป็นพิเศษ คุณสามารถเลือกที่นั่งด้วยตัวเองบนหน้าจอได้เลยค่ะ',
          en: 'Yes, we do! This is a giant screen hall. You can self-select seats on the screen.'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '好的，我选八排六号和七号。另外再加一份焦糖爆米花和两杯可乐，可以用微信扫码支付吗？',
          pinyin: 'Hǎo de, wǒ xuǎn bā pái liù hào hé qī hào. Lìngwài zài jiā yí fèn jiāotáng bàomǐhuā hé liǎng bēi kělè, kěyǐ yòng Wēixìn sǎomǎ zhīfù ma?',
          th: 'ตกลงครับ ผมเลือกแถว 8 เบอร์ 6 และ 7 ครับ นอกจากนี้ขอเพิ่มป๊อปคอร์นคาราเมล 1 ชุดและโค้ก 2 แก้ว สแกนจ่ายด้วย WeChat ได้ไหมครับ?',
          en: 'Alright, I choose row 8 seats 6 and 7. In addition, please add one caramel popcorn and two cokes. Can I scan with WeChat to pay?'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อต้องการขนมยอดฮิตในโรงหนังอย่าง 'ป๊อปคอร์น' ควรพูดว่าอย่างไร?",
          options: [
            '爆米花 (bàomǐhuā)',
            '矿泉水 (kuàngquánshuǐ)',
            '烤鸭 (kǎoyā)',
            '冰淇淋 (bīngqílín)'
          ],
          correct_index: 0,
          explanation_th: "'爆米花' (bàomǐhuā) แปลว่า ป๊อปคอร์น / ข้าวโพดคั่ว",
          encouragement: 'จำศัพท์ขนมโรงหนังได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '幕' ในคำว่า '屏幕' (หน้าจอ) และ '字幕' (ซับไตเติล) มีหมวดนำใดที่ด้านล่าง?",
          options: [
            '巾 (หมวดผ้า 巾字底)',
            '口 (หมวดปาก 口字旁)',
            '日 (หมวดดวงอาทิตย์ 日字旁)',
            '木 (หมวดไม้ 木字旁)'
          ],
          correct_index: 0,
          explanation_th: "'幕' มีหมวดนำ '巾' (ผ้า) อยู่ด้านล่าง สื่อถึงผืนผ้าใบจอขนาดใหญ่",
          encouragement: 'สังเกตรากศัพท์ผ้า 巾 ได้เฉียบคม!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "หน้าจอของโรงธรรมดาไม่ใหญ่เท่ากับโรง IMAX"',
          tokens: ['没有IMAX厅那么大', '普通厅的屏幕'],
          correct_sequence: ['普通厅的屏幕', '没有IMAX厅那么大'],
          pinyin: 'Pǔtōngtīng de píngmù méiyǒu IMAX tīng nàme dà',
          meaning_th: 'หน้าจอของโรงธรรมดาไม่ใหญ่เท่ากับโรง IMAX',
          explanation_th: 'ประธาน A (普通厅的屏幕) + 没有 + กรรม B (IMAX厅) + 那么大',
          encouragement: 'ต่อบล็อกเลโก้ประโยค A 没有 B 那么... ได้คล่องแคล่ว!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '选座' (xuǎnzuò) มีความหมายตรงกับข้อใด?",
          options: [
            'เลือกที่นั่ง',
            'คืนตั๋วรถไฟ',
            'จองห้องพัก',
            'สั่งอาหารกลับบ้าน'
          ],
          correct_index: 0,
          explanation_th: "'选座' ประกอบด้วย 选 (เลือก) + 座 (ที่นั่ง) แปลว่า เลือกที่นั่ง",
          encouragement: 'จำศัพท์ฟังก์ชันโรงหนังได้แม่นยำมาก!'
        }
      ]
    },
    {
      lesson_id: 't2_u21_l02',
      lesson_number: 2,
      title: {
        zh: '博物馆与展览',
        th: 'พิพิธภัณฑ์ & นิทรรศการ',
        en: 'Museums & Exhibitions'
      },
      can_do: {
        th: 'ซื้อบัตรเข้าชมพิพิธภัณฑ์ ยืมเครื่องบรรยายเสียงนำชม และเข้าใจป้ายกฎระเบียบเช่น 禁止拍照 และ 请勿大声喧哗',
        en: 'Buy museum tickets, rent audio guides, and understand rules like no photography and keep quiet'
      },
      baby_step_goal: 'เป้าหมายวันนี้: เดินเข้าพิพิธภัณฑ์แห่งชาติจีน ยืมเครื่องบรรยายภาษาอังกฤษ และเข้าใจป้ายห้ามใช้แฟลชได้อย่างถูกต้อง!',
      vocabulary: [
        {
          id: 'hsk2_2107',
          hanzi: '博物馆',
          pinyin: 'bówùguǎn',
          display_pinyin: 'bówùguǎn',
          pinyin_tone: 'bo2wu4guan3',
          meaning_th: 'พิพิธภัณฑ์',
          meaning_en: 'museum',
          radical: '饣',
          radical_name_th: 'หมวดอาหาร (食字旁)',
          stroke_count: 26,
          mnemonic: 'สถานที่โอ่อ่า (馆) รวบรวมสรรพสิ่งกว้างใหญ่และลึกซึ้ง (博) หลากหลายชนิด (物) = พิพิธภัณฑ์',
          kid_mnemonic: 'อาคารทรงโบราณ รวบรวมโบราณวัตถุของล้ำค่าพันปี = 博物馆',
          body_gesture: 'สองมือทำท่ากุมอกแล้วค่อยๆ เงยหน้าชื่นชมสถาปัตยกรรม'
        },
        {
          id: 'hsk2_2108',
          hanzi: '展览',
          pinyin: 'zhǎnlǎn',
          display_pinyin: 'zhánlǎn',
          sandhi_rule: '3+3',
          pinyin_tone: 'zhan3lan3',
          meaning_th: 'นิทรรศการ / การจัดแสดง',
          meaning_en: 'exhibition / display',
          radical: '尸',
          radical_name_th: 'หมวดร่างคน (尸字头)',
          stroke_count: 21,
          mnemonic: 'กางแผ่ออกมาให้ประจักษ์ (展) เพื่อให้สายตาผู้คนเข้าชมอย่างทั่วถึง (览) = นิทรรศการ',
          kid_mnemonic: 'ตู้กระจกใสโชว์แจกันโบราณ มีคนเดินมุงดูชื่นชม = 展览',
          body_gesture: 'กางสองมือผายออกด้านข้างเหมือนแนะนำนิทรรศการ'
        },
        {
          id: 'hsk2_2109',
          hanzi: '门票',
          pinyin: 'ménpiào',
          display_pinyin: 'ménpiào',
          pinyin_tone: 'men2piao4',
          meaning_th: 'บัตรผ่านประตู / ตั๋วเข้าชม',
          meaning_en: 'entrance ticket / admission ticket',
          radical: '门',
          radical_name_th: 'หมวดประตู (门字框)',
          stroke_count: 14,
          mnemonic: 'ตั๋วกระดาษ (票) สำหรับผ่านเข้าสู่ซุ้มประตูสถานที่ (门) = ตั๋วเข้าชม',
          kid_mnemonic: 'ยื่นตั๋วให้พนักงานตรวจที่หน้าประตูใหญ่ = 门票',
          body_gesture: 'ยื่นแผ่นกระดาษในมือให้เจ้าหน้าที่สแกน'
        },
        {
          id: 'hsk2_2110',
          hanzi: '讲解器',
          pinyin: 'jiǎngjiěqì',
          display_pinyin: 'jiángjiěqì',
          sandhi_rule: '3+3',
          pinyin_tone: 'jiang3jie3qi4',
          meaning_th: 'เครื่องบรรยายเสียงนำชมอัตโนมัติ',
          meaning_en: 'audio guide device',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 25,
          mnemonic: 'อุปกรณ์เครื่องใช้ (器) ที่คอยเอ่ยปากอธิบาย (讲解) ข้อมูลโบราณสถาน = เครื่องบรรยายเสียง',
          kid_mnemonic: 'หูฟังไร้สาย กดปุ่มแล้วมีเสียงเล่าประวัติศาสตร์ให้ฟัง = 讲解器',
          body_gesture: 'เอามือแนบหูเหมือนกำลังตั้งใจฟังหูฟังนำชม'
        },
        {
          id: 'hsk2_2111',
          hanzi: '禁止',
          pinyin: 'jìnzhǐ',
          display_pinyin: 'jìnzhǐ',
          pinyin_tone: 'jin4zhi3',
          meaning_th: 'ห้าม / ข้อห้าม',
          meaning_en: 'to prohibit / to forbid',
          radical: '礻',
          radical_name_th: 'หมวดบูชาเทวดา (示字旁)',
          stroke_count: 17,
          mnemonic: 'มีบัญชาศักดิ์สิทธิ์ (禁) สั่งให้หยุดการกระทำทันที (止) = ห้ามเด็ดขาด',
          kid_mnemonic: 'ป้ายวงกลมขีดเส้นสีแดง ห้ามทำสิ่งนี้ = 禁止',
          body_gesture: 'ยกสองมือทำเครื่องหมายกากบาทหน้าร่างกาย'
        },
        {
          id: 'hsk2_2112',
          hanzi: '拍照',
          pinyin: 'pāizhào',
          display_pinyin: 'pāizhào',
          pinyin_tone: 'pai1zhao4',
          meaning_th: 'ถ่ายรูป / ถ่ายภาพ',
          meaning_en: 'to take photos',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 21,
          mnemonic: 'ใช้มือตบกดชัตเตอร์ (拍) สะท้อนแสงไฟส่องประกาย (照) = ถ่ายรูป',
          kid_mnemonic: 'ยกกล้องขึ้นเล็ง กดชัตเตอร์แชะ = 拍照',
          body_gesture: 'ทำสองมือถือกล้องขึ้นมาระดับสายตาแล้วกดนิ้วชี้'
        }
      ],
      tone_rule: {
        rule_name: 'Tone Sandhi: 展览 (zhánlǎn) และ 讲解器 (jiángjiěqì)',
        description_th: 'คำว่า 展 (3) + 览 (3) ผันเป็น 2+3 อ่านว่า zhánlǎn และ 讲 (3) + 解 (3) ผันเป็น jiángjiě ก่อนตามด้วย เสียง 4 器 (qì)',
        example: '观看展览 (guānkàn zhánlǎn), 租借讲解器 (zūjiè jiángjiěqì)',
        fun_metaphor: 'เสียงสามสองตัวเจอกัน ตัวหน้าเด้งขึ้นเป็นเสียงสองทันทีเพื่อความนุ่มหู!',
        reassurance: 'แม้พินอินพื้นฐานเขียนว่า zhǎnlǎn แต่เวลาพูดจริงให้ออกเสียง zhánlǎn อย่างมั่นใจ'
      },
      grammar_bite: {
        title: 'สูตรเลโก้ป้ายระเบียบและข้อห้าม: 禁止 / 请勿 + [กริยา]',
        explanation_th: 'ใช้ 禁止 (jìnzhǐ) และ 请勿 (qǐngwù) เพื่อแสดงข้อห้ามในที่สาธารณะอย่างเป็นทางการ',
        patterns: [
          {
            formula: '展厅内 + 禁止 + [拍照 / 吸烟 / 触摸]',
            zh: '特别展厅内禁止拍照。',
            pinyin: 'Tèbié zhǎntīng nèi jìnzhǐ pāizhào.',
            th: 'ภายในห้องนิทรรศการพิเศษห้ามถ่ายภาพครับ',
            en: 'Photography is prohibited inside the special exhibition hall.'
          },
          {
            formula: '参观时 + 请勿 + [大声喧哗 / 奔跑]',
            zh: '参观时请勿大声喧哗。',
            pinyin: 'Cānguān shí qǐngwù dàshēng xuānhuá.',
            th: 'ขณะเข้าชมกรุณาอย่าส่งเสียงดังรบกวนครับ',
            en: 'Please do not make loud noises during the visit.'
          },
          {
            formula: '请问在哪里 + 租借 + [สิ่งของ]？',
            zh: '请问在哪里可以租借英文讲解器？',
            pinyin: 'Qǐngwèn zài nǎlǐ kěyǐ zūjiè yīngwén jiángjiěqì?',
            th: 'ขอถามหน่อยสามารถเช่ายืมเครื่องบรรยายเสียงภาษาอังกฤษได้ที่ไหนครับ?',
            en: 'Excuse me, where can I rent an English audio guide?'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '您好！我们已经预约了今天的门票，请问可以在服务台租借讲解器吗？',
          pinyin: 'Nín hǎo! Wǒmen yǐjīng yùyuē le jīntiān de ménpiào, qǐngwèn kěyǐ zài fúwùtái zūjiè jiángjiěqì ma?',
          th: 'สวัสดีครับ! พวกเราจองตั๋วเข้าชมของวันนี้ไว้แล้ว ขอถามหน่อยสามารถเช่ายืมเครื่องบรรยายเสียงที่เคาน์เตอร์บริการได้ไหมครับ?',
          en: 'Hello! We have already booked today tickets. Can we rent audio guides at the service desk?'
        },
        {
          speaker: 'B',
          speaker_name: 'เจ้าหน้าที่พิพิธภัณฑ์ 👨‍💼',
          zh: '可以的，押金一百块或者出示有效证件，支持泰语和英语讲解。',
          pinyin: 'Kěyǐ de, yājīn yìbǎi kuài huòzhě chūshì yǒuxiào zhèngjiàn, zhīchí tàiyǔ hé yīngyǔ jiǎngjiě.',
          th: 'ได้เลยครับ วางเงินมัดจำ 100 หยวนหรือแสดงบัตรประจำตัวที่ถูกต้อง มีรองรับเสียงบรรยายภาษาไทยและภาษาอังกฤษครับ',
          en: 'Yes! Deposit is 100 yuan or show valid ID. It supports Thai and English audio guides.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '太棒了！请问二楼的古代书画展览允许拍照吗？',
          pinyin: 'Tài bàng le! Qǐngwèn èr lóu de gǔdài shūhuà zhánlǎn yǔnxǔ pāizhào ma?',
          th: 'ยอดเยี่ยมมากครับ! ขอถามหน่อยนิทรรศการภาพเขียนโบราณชั้นสองอนุญาตให้ถ่ายรูปไหมครับ?',
          en: 'Awesome! Is photography allowed in the ancient calligraphy and painting exhibition on the second floor?'
        },
        {
          speaker: 'B',
          speaker_name: 'เจ้าหน้าที่พิพิธภัณฑ์ 👨‍💼',
          zh: '可以拍照，但是为了保护古代文物，馆内全程禁止开启闪光灯，请勿大声喧哗。',
          pinyin: 'Kěyǐ pāizhào, dànshì wèile bǎohù gǔdài wénwù, guǎn nèi quánchéng jìnzhǐ kāiqǐ shǎnguāngdēng, qǐngwù dàshēng xuānhuá.',
          th: 'ถ่ายรูปได้ครับ แต่เพื่อปกป้องโบราณวัตถุ ภายในอาคารห้ามเปิดไฟแฟลชตลอดเส้นทาง และกรุณาอย่าส่งเสียงดังครับ',
          en: 'You can take photos, but to protect ancient relics, flash is prohibited throughout the hall, and please keep quiet.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อเห็นป้าย '禁止拍照' ในพิพิธภัณฑ์ หมายถึงข้อใด?",
          options: [
            'ห้ามถ่ายรูป',
            'ห้ามรับประทานอาหาร',
            'ห้ามวิ่งเล่น',
            'ห้ามสูบบุหรี่'
          ],
          correct_index: 0,
          explanation_th: "'禁止' (jìnzhǐ = ห้าม) + '拍照' (pāizhào = ถ่ายรูป) รวมกันแปลว่า ห้ามถ่ายรูป",
          encouragement: 'เข้าใจป้ายสัญลักษณ์สากลในจีนได้อย่างถูกต้อง!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '拍' ในคำว่า '拍照' (ถ่ายรูป) มีหมวดนำใด?",
          options: [
            '扌 (หมวดมือ 提手旁)',
            '口 (หมวดปาก 口字旁)',
            '亻 (หมวดคน 单人旁)',
            '目 (หมวดตา 目字旁)'
          ],
          correct_index: 0,
          explanation_th: "'拍' ใช้หมวดนำมือ '扌' สื่อถึงการใช้มือกดชัตเตอร์กล้องถ่ายรูป",
          encouragement: 'จำรากศัพท์หมวดมือ 扌 ได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ภายในห้องนิทรรศการพิเศษห้ามถ่ายภาพ"',
          tokens: ['禁止拍照', '特别展厅内'],
          correct_sequence: ['特别展厅内', '禁止拍照'],
          pinyin: 'Tèbié zhǎntīng nèi jìnzhǐ pāizhào',
          meaning_th: 'ภายในห้องนิทรรศการพิเศษห้ามถ่ายภาพ',
          explanation_th: 'สถานที่ (特别展厅内) + ข้อห้าม (禁止拍照)',
          encouragement: 'ต่อบล็อกป้ายประกาศกฎระเบียบได้ถูกต้องสมบูรณ์!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '讲解器' (jiángjiěqì) มีความหมายตรงกับข้อใด?",
          options: [
            'เครื่องบรรยายเสียงนำชมอัตโนมัติ',
            'กล้องส่องทางไกล',
            'ตู้ล็อกเกอร์ฝากกระเป๋า',
            'เครื่องปรับอากาศ'
          ],
          correct_index: 0,
          explanation_th: "'讲解器' คือ เครื่องบรรยายเสียงนำชมในพิพิธภัณฑ์ (讲解 = บรรยาย, 器 = อุปกรณ์)",
          encouragement: 'จำคำศัพท์อุปกรณ์ท่องเที่ยวได้ยอดเยี่ยม!'
        }
      ]
    },
    {
      lesson_id: 't2_u21_l03',
      lesson_number: 3,
      title: {
        zh: '评论剧情与推荐',
        th: 'วิจารณ์เนื้อเรื่อง & การบอกต่อ',
        en: 'Film Reviews & Recommendations'
      },
      can_do: {
        th: 'พูดคุยแลกเปลี่ยนความคิดเห็นเกี่ยวกับภาพยนตร์ วิจารณ์เนื้อเรื่อง และใช้โครงสร้าง 值得 + กริยา เพื่อแนะนำให้เพื่อนไปชม',
        en: 'Discuss movie plots, share film critiques, and use 值得 + verb to recommend films to friends'
      },
      baby_step_goal: 'เป้าหมายวันนี้: คุยกับเพื่อนหลังดูหนังจบได้ว่า "พล็อตสนุกมาก การแสดงยอดเยี่ยม คุ้มค่าแก่การดูซ้ำรอบสอง!"',
      vocabulary: [
        {
          id: 'hsk2_2113',
          hanzi: '精彩',
          pinyin: 'jīngcǎi',
          display_pinyin: 'jīngcǎi',
          pinyin_tone: 'jing1cai3',
          meaning_th: 'ยอดเยี่ยม / น่าประทับใจ',
          meaning_en: 'brilliant / wonderful / splendid',
          radical: '米',
          radical_name_th: 'หมวดข้าว (米字旁)',
          stroke_count: 26,
          mnemonic: 'ผ่านการคัดสรรอย่างประณีตราวกับเมล็ดข้าวบริสุทธิ์ (精) หลากสีสันสวยงาม (彩) = ยอดเยี่ยมไร้ที่ติ',
          kid_mnemonic: 'ปรบมือรัวๆ หลังดูการแสดงจบ สวยงามตระการตา = 精彩',
          body_gesture: 'ยกสองมือปรบมืออย่างตื่นเต้นพร้อมพยักหน้าชื่นชม'
        },
        {
          id: 'hsk2_2114',
          hanzi: '剧情',
          pinyin: 'jùqíng',
          display_pinyin: 'jùqíng',
          pinyin_tone: 'ju4qing2',
          meaning_th: 'เนื้อเรื่อง / พล็อตเรื่อง',
          meaning_en: 'plot / storyline',
          radical: '刂',
          radical_name_th: 'หมวดมีดขวา (立刀旁)',
          stroke_count: 25,
          mnemonic: 'บทละครการแสดง (剧) ที่ถ่ายทอดอารมณ์ความรู้สึกอันลึกซึ้ง (情) = เนื้อเรื่อง',
          kid_mnemonic: 'เรื่องราวของตัวละคร ลุ้นจนนั่งไม่ติดเก้าอี้ = 剧情',
          body_gesture: 'เอามือข้างหนึ่งทาบอกอีกข้างหนึ่งผายออกข้างหน้า'
        },
        {
          id: 'hsk2_2115',
          hanzi: '导演',
          pinyin: 'dǎoyǎn',
          display_pinyin: 'dáoyǎn',
          sandhi_rule: '3+3',
          pinyin_tone: 'dao3yan3',
          meaning_th: 'ผู้กำกับภาพยนตร์ / กำกับการแสดง',
          meaning_en: 'director / to direct',
          radical: '寸',
          radical_name_th: 'หมวดนิ้วฟุต (寸字旁)',
          stroke_count: 17,
          mnemonic: 'ผู้นำทางชี้นิ้วสั่งการ (导) ให้เหล่านักแสดงสวมบทบาทอย่างสมจริง (演) = ผู้กำกับ',
          kid_mnemonic: 'ผู้กำกับนั่งเก้าอี้ ถือโทรโข่งสั่ง "แอ็กชัน!" = 导演',
          body_gesture: 'ทำท่าสับสเลทคัทฉาก "แอ็กชัน!"'
        },
        {
          id: 'hsk2_2116',
          hanzi: '演员',
          pinyin: 'yǎnyuán',
          display_pinyin: 'yǎnyuán',
          pinyin_tone: 'yan3yuan2',
          meaning_th: 'นักแสดง',
          meaning_en: 'actor / actress',
          radical: '氵',
          radical_name_th: 'หมวดน้ำ (三点水)',
          stroke_count: 23,
          mnemonic: 'บุคคล (员) ผู้ร่ายรำแสดงทักษะศิลปะหลากอารมณ์ดั่งสายน้ำ (演) = นักแสดง',
          kid_mnemonic: 'ดาราดังเดินพรมแดง ยิ้มโบกมือให้แฟนคลับ = 演员',
          body_gesture: 'โค้งคำนับอย่างสง่างามหลังจบการแสดง'
        },
        {
          id: 'hsk2_2117',
          hanzi: '推荐',
          pinyin: 'tuījiàn',
          display_pinyin: 'tuījiàn',
          pinyin_tone: 'tui1jian4',
          meaning_th: 'แนะนำ / บอกต่อ',
          meaning_en: 'to recommend',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 25,
          mnemonic: 'ยื่นมือผลักดันส่งต่อ (推) นำเสนอสิ่งดีงามให้ผู้อื่น (荐) = แนะนำ',
          kid_mnemonic: 'ยื่นแผ่นซีดีให้เพื่อน บอกว่า "เรื่องนี้ห้ามพลาดนะ!" = 推荐',
          body_gesture: 'ยื่นสองมือไปข้างหน้าเหมือนกำลังส่งมอบของขวัญแนะนำ'
        },
        {
          id: 'hsk2_2118',
          hanzi: '打分',
          pinyin: 'dǎfēn',
          display_pinyin: 'dǎfēn',
          pinyin_tone: 'da3fen1',
          meaning_th: 'ให้คะแนน / ประเมินเรตติ้ง',
          meaning_en: 'to give a score / to rate',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 9,
          mnemonic: 'ลงมือแตะตี (打) ตัวเลขคะแนนการประเมิน (分) = ให้คะแนน',
          kid_mnemonic: 'กดให้ 5 ดาวในแอปพลิเคชันรีวิวหนัง = 打分',
          body_gesture: 'ชูห้านิ้วบอกคะแนนเต็มห้าดาว'
        }
      ],
      tone_rule: {
        rule_name: 'Tone Sandhi: 导演 (dáoyǎn) กฎเสียง 3+3',
        description_th: 'คำว่า 导 (dǎo, เสียง 3) + 演 (yǎn, เสียง 3) ผันตัวหน้าเป็นเสียง 2 อ่านออกเสียงจริงว่า dáoyǎn ส่วน 演员 (yǎnyuán, 3+2) ไม่อยู่ในกฎ 3+3 คงเสียงเดิม',
        example: '知名导演 (zhīmíng dáoyǎn), 优秀演员 (yōuxiù yǎnyuán)',
        fun_metaphor: 'สังเกตง่ายๆ: ผู้กำกับ (导演) เด้งเสียง 2+3 ส่วนนักแสดง (演员) ไต่บันได 3+2!',
        reassurance: 'การออกเสียง 3+3 เป็นธรรมชาติจะทำให้คุณพูดจีนเหมือนเจ้าของภาษา'
      },
      grammar_bite: {
        title: 'สูตรเลโก้แนะนำภาพยนตร์: 值得 + [กริยา] และ 像...一样',
        explanation_th: 'ใช้ 值得 (zhíde = คุ้มค่าแก่การ...) ตามด้วยคำกริยา เช่น 值得一看 (คุ้มค่าน่าชม), 值得二刷 (คุ้มค่าน่าดูซ้ำรอบสอง)',
        patterns: [
          {
            formula: '这部电影 + 特别 + 精彩，非常值得 + [กริยา]',
            zh: '这部电影剧情特别精彩，非常值得二刷！',
            pinyin: 'Zhè bù diànyǐng jùqíng tèbié jīngcǎi, fēicháng zhídé èrshuā!',
            th: 'เนื้อเรื่องของหนังเรื่องนี้ยอดเยี่ยมมาก คุ้มค่าแก่การดูซ้ำรอบสองจริงๆ ครับ!',
            en: 'The plot of this movie is wonderful, totally worth watching a second time!'
          },
          {
            formula: '演员的演技 + 像 + [คำนาม] + 一样自然',
            zh: '演员的表演像生活一样自然。',
            pinyin: 'Yǎnyuán de biǎoyǎn xiàng shēnghuó yíyàng zìrán.',
            th: 'การแสดงของนักแสดงดูเป็นธรรมชาติราวกับชีวิตจริงเลยครับ',
            en: 'The actors performance is as natural as real life.'
          },
          {
            formula: '如果让我打分，我愿意给 + [คะแนน]',
            zh: '如果让我打分，我愿意给满分十分。',
            pinyin: 'Rúguǒ ràng wǒ dǎfēn, wǒ yuànyì gěi mǎnfēn shí fēn.',
            th: 'ถ้าให้ผมให้คะแนน ผมยินดีให้คะแนนเต็มสิบเลยครับ',
            en: 'If you ask me to rate it, I would gladly give a full score of ten.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: '小柴，刚看完这部电影，你觉得剧情怎么样？',
          pinyin: 'Xiǎo Chái, gāng kàn wán zhè bù diànyǐng, nǐ juéde jùqíng zěnmeyàng?',
          th: 'เสี่ยวชาย เพิ่งดูหนังเรื่องนี้จบ คุณคิดว่าเนื้อเรื่องเป็นยังไงบ้าง?',
          en: 'Xiao Chai, we just finished watching this movie, what did you think of the plot?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '太震撼了！导演的镜头非常漂亮，演员的表演也很感人，完全超出我的预期！',
          pinyin: 'Tài zhènhàn le! Dáoyǎn de jìngtóu fēicháng piàoliang, yǎnyuán de biǎoyǎn yě hěn gǎnrén, wánquán chāochū wǒ de yùqī!',
          th: 'สุดยอดมากเลยครับ! มุมกล้องของผู้กำกับสวยงามมาก การแสดงของนักแสดงก็น่าประทับใจ เกินความคาดหมายของผมไปไกลเลย!',
          en: 'So breathtaking! The director cinematography was stunning, and the acting was deeply touching, way beyond my expectations!'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: '那在豆瓣电影上，你会给这部电影打几分？值得推荐给其他朋友吗？',
          pinyin: 'Nà zài Dòubàn diànyǐng shàng, nǐ huì gěi zhè bù diànyǐng dǎ jǐ fēn? Zhídé tuījiàn gěi qítā péngyou ma?',
          th: 'ถ้างั้นในแอปโต้วปั้น คุณจะให้คะแนนหนังเรื่องนี้กี่คะแนน? คุ้มค่าน่าแนะนำให้เพื่อนๆ ไหม?',
          en: 'Then on Douban Movies, how many stars would you give? Is it worth recommending to friends?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '我毫不犹豫打九分！非常值得推荐，甚至值得去电影院二刷！',
          pinyin: 'Wǒ háobù yóuyù dǎ jiǔ fēn! Fēicháng zhídé tuījiàn, shènzhì zhídé qù diànyǐngyuàn èrshuā!',
          th: 'ผมไม่ลังเลเลยที่จะให้ 9 คะแนนครับ! คุ้มค่าน่าบอกต่อมาก หรือแม้กระทั่งคุ้มที่จะไปดูซ้ำรอบสองในโรงหนังเลยครับ!',
          en: 'Without hesitation I would give it 9 points! Highly recommended, definitely worth a second watch in the cinema!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อต้องการบอกว่า 'คุ้มค่าที่จะดูซ้ำรอบสอง' ภาษาจีนพูดว่าอย่างไร?",
          options: [
            '值得二刷 (zhídé èrshuā)',
            '太难吃了 (tài nánchī le)',
            '快点退票 (kuài diǎn tuìpiào)',
            '找不到路 (zhǎobudào lù)'
          ],
          correct_index: 0,
          explanation_th: "'值得二刷' (zhídé èrshuā) เป็นสแลงยอดฮิต แปลว่า คุ้มค่าที่จะดูซ้ำรอบสอง",
          encouragement: 'เข้าใจสำนวนภาพยนตร์ยุคใหม่ได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '推' ในคำว่า '推荐' (แนะนำ) มีหมวดนำใด?",
          options: [
            '扌 (หมวดมือ 提手旁)',
            '木 (หมวดไม้ 木字旁)',
            '氵 (หมวดน้ำ 三点水)',
            '讠 (หมวดคำพูด 言字旁)'
          ],
          correct_index: 0,
          explanation_th: "'推' ใช้หมวดนำมือ '扌' สื่อถึงการยื่นมือผลักดันส่งเสริมสิ่งดีๆ",
          encouragement: 'จำรากศัพท์หมวดมือ 扌 ได้แม่นยำมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "หนังเรื่องนี้เนื้อเรื่องยอดเยี่ยมมาก คุ้มค่าน่าชม"',
          tokens: ['非常值得一看', '这部电影剧情特别精彩'],
          correct_sequence: ['这部电影剧情特别精彩', '非常值得一看'],
          pinyin: 'Zhè bù diànyǐng jùqíng tèbié jīngcǎi, fēicháng zhídé yí kàn',
          meaning_th: 'หนังเรื่องนี้เนื้อเรื่องยอดเยี่ยมมาก คุ้มค่าน่าชม',
          explanation_th: 'บทวิจารณ์ (这部电影剧情特别精彩) + ข้อสรุปคำแนะนำ (非常值得一看)',
          encouragement: 'ต่อบล็อกเลโก้วิจารณ์ภาพยนตร์ได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '精彩' (jīngcǎi) มีความหมายตรงกับข้อใด?",
          options: [
            'ยอดเยี่ยม / น่าประทับใจ',
            'น่าเบื่อหน่าย',
            'แพงหูฉี่',
            'ฝนตกหนัก'
          ],
          correct_index: 0,
          explanation_th: "'精彩' แปลว่า ยอดเยี่ยม / น่าประทับใจเป็นพิเศษ",
          encouragement: 'จำศัพท์บอกความรู้สึกเชิงบวกได้อย่างยอดเยี่ยม!'
        }
      ]
    },
    {
      lesson_id: 't2_u21_l04',
      lesson_number: 4,
      title: {
        zh: '故宫约票与通关',
        th: 'จองตั๋วกู้กง & ผ่านด่านบอส',
        en: 'Palace Museum Booking & Boss Challenge'
      },
      can_do: {
        th: 'จองบัตรเข้าชมพระราชวังโบราณกู้กงผ่านมินิโปรแกรม ยืนยันตัวตนด้วยระบบชื่อจริง และผ่านด่าน Boss Challenge สันทนาการ',
        en: 'Book Palace Museum tickets via mini-programs, use real-name verification, and conquer the Entertainment Boss Challenge'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พิชิต Boss Challenge จองตั๋วกู้กงผ่าน WeChat เลือกรอบเช้า และเข้าชมได้อย่างราบรื่น 100%!',
      vocabulary: [
        {
          id: 'hsk2_2119',
          hanzi: '故宫',
          pinyin: 'Gùgōng',
          display_pinyin: 'Gùgōng',
          pinyin_tone: 'Gu4gong1',
          meaning_th: 'พระราชวังโบราณกู้กง (พระราชวังต้องห้าม)',
          meaning_en: 'The Palace Museum / Forbidden City',
          radical: '攵',
          radical_name_th: 'หมวดเคาะตี (反文旁)',
          stroke_count: 18,
          mnemonic: 'พระราชวังอันโอ่อ่า (宫) แห่งประวัติศาสตร์แต่กาลเก่า (故) = พระราชวังโบราณกู้กง',
          kid_mnemonic: 'กำแพงสีแดง หลังคาสีทอง พระราชวังต้องห้ามในปักกิ่ง = 故宫',
          body_gesture: 'สองมือทำท่าหลังคาจั่วจีนโบราณเหนือศีรษะ'
        },
        {
          id: 'hsk2_2120',
          hanzi: '小程序',
          pinyin: 'xiǎochéngxù',
          display_pinyin: 'xiǎochéngxù',
          pinyin_tone: 'xiao3cheng2xu4',
          meaning_th: 'มินิโปรแกรม (ใน WeChat/Alipay)',
          meaning_en: 'mini-program',
          radical: '小',
          radical_name_th: 'หมวดเล็ก (小字头)',
          stroke_count: 18,
          mnemonic: 'ชุดคำสั่งโปรแกรมคอมพิวเตอร์ (程序) ขนาดเล็กกะทัดรัด (小) ใช้งานในแอป = มินิโปรแกรม',
          kid_mnemonic: 'ไอคอนแอปจิ๋วใน WeChat แตะปุ๊บเปิดจองตั๋วปั๊บ = 小程序',
          body_gesture: 'ใช้นิ้วชี้และนิ้วโป้งทำช่องว่างเล็กๆ แสดงความจิ๋ว'
        },
        {
          id: 'hsk2_2121',
          hanzi: '实名制',
          pinyin: 'shímíngzhì',
          display_pinyin: 'shímíngzhì',
          pinyin_tone: 'shi2ming2zhi4',
          meaning_th: 'ระบบยืนยันตัวตนด้วยชื่อจริง',
          meaning_en: 'real-name registration system',
          radical: '宀',
          radical_name_th: 'หมวดหลังคาเรือน (宝盖头)',
          stroke_count: 22,
          mnemonic: 'ระบบกฎเกณฑ์ (制) ที่ต้องใช้ชื่อจริง (实名) ตามพาสปอร์ต = ระบบยืนยันชื่อจริง',
          kid_mnemonic: 'เปิดหน้าพาสปอร์ตเทียบตัวสะกดชื่อ-นามสกุลจริง = 实名制',
          body_gesture: 'ชูบัตรพาสปอร์ตแล้วชี้ที่ชื่อตัวเอง'
        },
        {
          id: 'hsk2_2122',
          hanzi: '预约',
          pinyin: 'yùyuē',
          display_pinyin: 'yùyuē',
          pinyin_tone: 'yu4yue1',
          meaning_th: 'นัดหมาย / จองล่วงหน้า',
          meaning_en: 'to make an appointment / to book in advance',
          radical: '页',
          radical_name_th: 'หมวดใบหน้า (页字旁)',
          stroke_count: 14,
          mnemonic: 'ทำข้อตกลงนัดหมาย (约) ล่วงหน้าก่อนถึงเวลาจริง (预) = จองล่วงหน้า',
          kid_mnemonic: 'กดปุ่มจองวันเวลาล่วงหน้า 7 วัน = 预约',
          body_gesture: 'ทำท่ายกปากกาเขียนลงบนสมุดปฏิทินนัดหมาย'
        }
      ],
      tone_rule: {
        rule_name: 'คำศัพท์วัฒนธรรมดิจิทัล: 预约 (yùyuē) และ 小程序 (xiǎochéngxù)',
        description_th: 'คำว่า 预 (4) + 约 (1) ท่องเที่ยวในจีนยุคปัจจุบันสถานที่ท่องเที่ยวยอดนิยมแทบทุกแห่งต้อง 预约 ผ่าน 小程序 ล่วงหน้า 7 วัน',
        example: '实名制预约 (shímíngzhì yùyuē), 微信小程序 (Wēixìn xiǎochéngxù)',
        fun_metaphor: 'ในจีนยุคนี้ ไม่มีคำว่าเดินดุ่มๆ ไปซื้อตั๋วหน้างาน! กฎเหล็กคือ "提前预约" เสมอ!',
        reassurance: 'เมื่อจำคำว่า 预约 ได้ คุณจะจองตั๋วได้ทุกสถานที่ท่องเที่ยวทั่วประเทศจีน'
      },
      grammar_bite: {
        title: 'สูตรเลโก้การจองตั๋วสถานที่ท่องเที่ยว: 必须提前 + [เวลา] + 通过小程序预约',
        explanation_th: 'บอกเงื่อนไขการจองตั๋วอย่างเป็นทางการด้วย 必须提前 (ต้องล่วงหน้า...) และ 实名制 (ระบบชื่อจริง)',
        patterns: [
          {
            formula: '参观故宫 + 必须提前七天 + 通过小程序 + 预约',
            zh: '参观故宫博物院必须提前七天通过小程序预约。',
            pinyin: 'Cānguān Gùgōng bówùguǎn bìxū tíqián qī tiān tōngguò xiǎochéngxù yùyuē.',
            th: 'การเข้าชมพิพิธภัณฑ์พระราชวังโบราณกู้กงต้องจองล่วงหน้า 7 วันผ่านมินิโปรแกรมครับ',
            en: 'Visiting the Palace Museum requires booking 7 days in advance via mini-program.'
          },
          {
            formula: '入馆时请出示 + 护照原件 + 进行实名制核验',
            zh: '入馆时请出示护照原件进行实名制核验。',
            pinyin: 'Rùguǎn shí qǐng chūshì hùzhào yuánjiàn jìnxíng shímíngzhì héyàn.',
            th: 'ตอนเข้าอาคารกรุณาแสดงพาสปอร์ตตัวจริงเพื่อตรวจยืนยันชื่อจริงครับ',
            en: 'Please present your original passport for real-name verification upon entry.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '请问一下，我们外国游客想参观故宫，可以通过微信小程序直接预约门票吗？',
          pinyin: 'Qǐngwèn yíxià, wǒmen wàiguó yóukè xiǎng cānguān Gùgōng, kěyǐ tōngguò Wēixìn xiǎochéngxù zhíjiē yùyuē ménpiào ma?',
          th: 'ขอถามหน่อยครับ พวกเรานักท่องเที่ยวต่างชาติต้องการเข้าชมกู้กง สามารถจองตั๋วผ่านมินิโปรแกรม WeChat โดยตรงได้ไหมครับ?',
          en: 'Excuse me, as foreign tourists wanting to visit the Palace Museum, can we book tickets directly via the WeChat mini-program?'
        },
        {
          speaker: 'B',
          speaker_name: 'เจ้าหน้าที่ศูนย์บริการนักท่องเที่ยว 👩‍💼',
          zh: '完全可以！搜索“故宫博物院”官方小程序，选择“海外游客预约”，输入护照号码实行实名制购票。',
          pinyin: 'Wánquán kěyǐ! Sōusuǒ "Gùgōng Bówùguǎn" guānfāng xiǎochéngxù, xuǎnzé "hǎiwài yóukè yùyuē", shūrù hùzhào hàomǎ shíxíng shímíngzhì gòupiào.',
          th: 'ได้แน่นอนค่ะ! ค้นหามินิโปรแกรมทางการ "故宫博物院" เลือก "จองสำหรับนักท่องเที่ยวต่างชาติ" กรอกหมายเลขพาสปอร์ตเพื่อซื้อตั๋วตามระบบชื่อจริงได้เลยค่ะ',
          en: 'Absolutely! Search for the official Palace Museum mini-program, select overseas visitor booking, and enter your passport number for real-name ticketing.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '太好了，请问上午场和下午场有什么区别？门票包含珍宝馆吗？',
          pinyin: 'Tài hǎo le, qǐngwèn shàngwǔ chǎng hé xiàwǔ chǎng yǒu shénme qūbié? Ménpiào bāohán zhēnbǎoguǎn ma?',
          th: 'ดีจังเลยครับ ขอถามหน่อยรอบเช้ากับรอบบ่ายต่างกันอย่างไรครับ? แล้วตั๋วรวมหอสมบัติล้ำค่าด้วยไหมครับ?',
          en: 'Great! What is the difference between morning and afternoon sessions? Does the ticket include the Treasure Gallery?'
        },
        {
          speaker: 'B',
          speaker_name: 'เจ้าหน้าที่ศูนย์บริการนักท่องเที่ยว 👩‍💼',
          zh: '上午场需要在中午十二点前检票进馆，下午场从十一点开始进馆。珍宝馆需要单独加购十块钱，强烈推荐参观！',
          pinyin: 'Shàngwǔ chǎng xūyào zài zhōngwǔ shí-èr diǎn qián jiǎnpiào jìn guǎn, xiàwǔ chǎng cóng shí-yī diǎn kāishǐ jìn guǎn. Zhēnbǎoguǎn xūyào dāndú jiāgòu shí kuài qián, qiángliè tuījiàn cānguān!',
          th: 'รอบเช้าต้องตรวจตั๋วเข้าอาคารก่อนเที่ยง 12:00 น. ค่ะ ส่วนรอบบ่ายเข้าได้ตั้งแต่ 11:00 น. เป็นต้นไป ส่วนหอสมบัติล้ำค่าเพิ่มเงินเพียง 10 หยวน แนะนำให้เข้าชมเป็นอย่างยิ่งค่ะ!',
          en: 'Morning session requires ticket check before 12:00 PM; afternoon session allows entry starting from 11:00 AM. The Treasure Gallery requires an extra 10 yuan, highly recommended!'
        }
      ],
      quizzes: [
        {
          type: 'meaning_match',
          question_th: "ระบบ '实名制' (shímíngzhì) ในการซื้อตั๋วสถานที่ท่องเที่ยวในจีนหมายถึงข้อใด?",
          options: [
            'ระบบต้องใช้ชื่อจริงและเลขพาสปอร์ตในการลงทะเบียนซื้อตั๋ว',
            'ระบบซื้อตั๋วแบบไม่ระบุที่นั่ง',
            'ระบบรับเฉพาะเงินสดเท่านั้น',
            'ระบบซื้อตั๋วเป็นกลุ่มมากกว่าสิบคน'
          ],
          correct_index: 0,
          explanation_th: "'实名制' คือ ระบบยืนยันตัวตนด้วยชื่อและเลขบัตรประจำตัว/พาสปอร์ตจริง เพื่อความปลอดภัยและป้องกันการเก็งกำไรตั๋ว",
          encouragement: 'รู้ลึกรู้จริงเรื่องระบบดิจิทัลและการท่องเที่ยวในจีน!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '约' ในคำว่า '预约' (จองล่วงหน้า) มีหมวดนำใด?",
          options: [
            '纟 (หมวดเส้นไหม 绞丝旁)',
            '讠 (หมวดคำพูด 言字旁)',
            '彳 (หมวดก้าวเดิน 双人旁)',
            '口 (หมวดปาก 口字旁)'
          ],
          correct_index: 0,
          explanation_th: "'约' มีหมวดนำ '纟' สื่อถึงการผูกมัดหรือร้อยเรียงข้อตกลงร่วมกัน",
          encouragement: 'จำรากศัพท์หมวดเส้นไหม 纟 ได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "เข้าชมพระราชวังโบราณกู้กงต้องจองล่วงหน้าผ่านมินิโปรแกรม"',
          tokens: ['通过小程序预约', '参观故宫必须提前'],
          correct_sequence: ['参观故宫必须提前', '通过小程序预约'],
          pinyin: 'Cānguān Gùgōng bìxū tíqián tōngguò xiǎochéngxù yùyuē',
          meaning_th: 'เข้าชมพระราชวังโบราณกู้กงต้องจองล่วงหน้าผ่านมินิโปรแกรม',
          explanation_th: 'เงื่อนไข (参观故宫必须提前) + วิธีการ (通过小程序预约)',
          encouragement: 'ต่อบล็อกเลโก้กฎการจองตั๋วท่องเที่ยวได้อย่างแม่นยำ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '小程序' (xiǎochéngxù) ในแอป WeChat หมายถึงอะไร?",
          options: [
            'มินิโปรแกรมสำหรับบริการต่างๆ เช่น จองตั๋ว สั่งอาหาร',
            'เกมกดขนาดพกพา',
            'ข้อความสั้น SMS',
            'คลิปวิดีโอสั้น'
          ],
          correct_index: 0,
          explanation_th: "'小程序' คือ มินิโปรแกรมย่อยที่รันอยู่บนแอป WeChat / Alipay โดยไม่ต้องติดตั้งแยก",
          encouragement: 'เข้าใจไลฟ์สไตล์ดิจิทัลของจีนได้อย่างถ่องแท้!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณเดินทางมาถึงปักกิ่งและต้องการพาเพื่อนต่างชาติเข้าชมพระราชวังโบราณกู้กง (故宫博物院) ในวันศุกร์นี้ คุณเปิดมินิโปรแกรม WeChat แต่พบว่ารอบเช้าเต็ม จึงต้องเลือกรอบบ่าย (下午场) และต้องการเพิ่มตั๋วหอสมบัติ (珍宝馆) พร้อมทั้งยืมเครื่องบรรยายเสียงภาษาอังกฤษ (讲解器) โดยชำระเงินผ่าน WeChat Pay คุณควรสื่อสารกับเจ้าหน้าที่จุดบริการหน้าประตูด้านใต้ (午门) อย่างไรเพื่อยืนยันการเข้าชมอย่างถูกต้อง?',
        options: [
          '您好！我们已经通过小程序实名制预约了今天下午场的门票和珍宝馆，这是我们的护照原件。请问在哪里可以核验进馆并租借英文讲解器？ (Nín hǎo! Wǒmen yǐjīng tōngguò xiǎochéngxù shímíngzhì yùyuē le jīntiān xiàwǔ chǎng de ménpiào hé zhēnbǎoguǎn, zhè shì wǒmen de hùzhào yuánjiàn. Qǐngwèn zài nǎlǐ kěyǐ héyàn jìn guǎn bìng zūjiè yīngwén jiángjiěqì?)',
          '服务员，我要买五斤苹果，请问可以送货上门吗？ (Fúwùyuán, wǒ yào mǎi wǔ jīn píngguǒ, qǐngwèn kěyǐ sònghuò shàngmén ma?)',
          '警察叔叔，我的钱包在地铁站被偷了，快帮我找找！ (Jǐngchá shūshu, wǒ de qiánbāo zài dìtiězhàn bèi tōu le, kuài bāng wǒ zhǎozhao!)',
          '我想退票，这趟高铁晚点了两个小时，退还我差价！ (Wǒ xiǎng tuìpiào, zhè tàng gāotiě wǎndiǎn le liǎng ge xiǎoshí, tuìhuán wǒ chājià!)'
        ],
        correct_index: 0,
        explanation_th: "ตัวเลือกแรกถูกต้องและครบถ้วนที่สุด: กล่าวทักทายอย่างสุภาพ ระบุว่าจองผ่านมินิโปรแกรมระบบชื่อจริงแล้ว (通过小程序实名制预约) เลือกรอบบ่ายและหอสมบัติ (下午场门票和珍宝馆) ยื่นพาสปอร์ตตัวจริง (护照原件) และถามจุดตรวจตั๋วพร้อมเช่ายืมเครื่องบรรยายเสียง (核验进馆并租借讲解器)",
        encouragement: 'ยินดีด้วยอย่างยิ่ง! คุณพิชิต Boss Challenge สันทนาการและวัฒนธรรม จองตั๋วกู้กงและเข้าชมพระราชวังต้องห้ามได้อย่างสง่างาม 100%!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u21_master',
        badge_name: 'ผู้เชี่ยวชาญการท่องโลกสันทนาการและชมภาพยนตร์ 🎬🏛️',
        message_th: 'ยอดเยี่ยมมาก! คุณสำเร็จ Unit 21 แล้ว พร้อมลุยโรงหนัง IMAX จองตั๋วพิพิธภัณฑ์กู้กงผ่านมินิโปรแกรม และแลกเปลี่ยนรีวิวภาพยนตร์ได้อย่างคล่องแคล่ว!',
        xp_reward: 200
      }
    }
  ]
};
