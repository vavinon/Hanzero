/**
 * scripts/tier2_batch_a/unit12.ts
 * Tier 2 Unit 12: 外卖与快递 (Delivery & Express Courier)
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

export const unit12 = {
  unit_id: 'tier2_u12',
  tier: 2,
  unit_number: 12,
  title: {
    zh: '外卖与快递',
    th: 'เดลิเวอรี่ & รับพัสดุด่วน',
    en: 'Delivery & Express Courier'
  },
  description: 'สั่งอาหารผ่าน Meituan/Eleme ใส่ที่อยู่และบ้านเลขที่อย่างแม่นยำ สื่อสารกับไรเดอร์ และไปรับพัสดุที่ตู้ล็อกเกอร์อัจฉริยะ Cainiao',
  lessons: [
    {
      lesson_id: 't2_u12_l01',
      lesson_number: 1,
      title: {
        zh: '点外卖与填地址',
        th: 'สั่งเดลิเวอรี่ & ระบุที่อยู่จัดส่ง',
        en: 'Food Delivery Order & Address'
      },
      can_do: {
        th: 'กดสั่งอาหารในแอปเดลิเวอรี่ ระบุที่อยู่ บ้านเลขที่ และเขียนหมายเหตุพิเศษถึงร้านค้าได้ถูกต้อง',
        en: 'Order food via delivery apps, input precise addresses/room numbers, and write special merchant notes'
      },
      baby_step_goal: 'เป้าหมายวันนี้: กรอกที่อยู่และระบุหมายเหตุ "วางไว้ที่หน้าประตู" เป็นภาษาจีนได้สำเร็จ!',
      vocabulary: [
        {
          id: 'hsk2_1201',
          hanzi: '外卖',
          pinyin: 'wàimài',
          display_pinyin: 'wàimài',
          pinyin_tone: 'wai4mai4',
          meaning_th: 'เดลิเวอรี่ / อาหารสั่งกลับบ้าน',
          meaning_en: 'food delivery / takeout',
          radical: '夕',
          radical_name_th: 'หมวดดวงจันทร์ยามค่ำ (夕字旁)',
          stroke_count: 10,
          mnemonic: 'สั่งอาหารจากภายนอก (外) ส่งขาย (卖) มาถึงหน้าประตู = เดลิเวอรี่',
          kid_mnemonic: 'กล่องอาหารสีเหลืองมีปีก บินมาส่งถึงบ้าน = 外卖',
          body_gesture: 'ทำท่าสองมือประคองกล่องอาหารยื่นส่งให้เพื่อน'
        },
        {
          id: 'hsk2_1202',
          hanzi: '菜单',
          pinyin: 'càidān',
          display_pinyin: 'càidān',
          pinyin_tone: 'cai4dan1',
          meaning_th: 'เมนูอาหาร',
          meaning_en: 'menu',
          radical: '艹',
          radical_name_th: 'หมวดหญ้า (草字头)',
          stroke_count: 19,
          mnemonic: 'รายการอาหารและผักหญ้า (菜) ที่เขียนเป็นใบรายการ (单) = เมนูอาหาร',
          kid_mnemonic: 'กางสมุดเมนูเล่มโต ชี้เลือกจานอร่อย = 菜单',
          body_gesture: 'กางสองมือเหมือนเปิดสมุดเมนูอ่าน'
        },
        {
          id: 'hsk2_1203',
          hanzi: '地址',
          pinyin: 'dìzhǐ',
          display_pinyin: 'dìzhǐ',
          pinyin_tone: 'di4zhi3',
          meaning_th: 'ที่อยู่ / พิกัดสถานที่',
          meaning_en: 'address',
          radical: '土',
          radical_name_th: 'หมวดดิน (土字旁)',
          stroke_count: 11,
          mnemonic: 'ผืนดิน (地) ที่ตั้งหลักปักฐาน (址) อยู่อาศัย = ที่อยู่',
          kid_mnemonic: 'ปักหมุดสีแดงลงบนแผนที่บอกตำแหน่งบ้าน = 地址',
          body_gesture: 'ใช้นิ้วชี้จิ้มลงบนฝ่ามือเหมือนปักหมุดแผนที่'
        },
        {
          id: 'hsk2_1204',
          hanzi: '门牌号',
          pinyin: 'ménpáihào',
          display_pinyin: 'ménpáihào',
          pinyin_tone: 'men2pai2hao4',
          meaning_th: 'บ้านเลขที่ / หมายเลขห้อง',
          meaning_en: 'house / room number',
          radical: '门',
          radical_name_th: 'หมวดประตู (门字框)',
          stroke_count: 20,
          mnemonic: 'ป้ายตัวเลข (牌号) ที่ติดอยู่บนบานประตู (门) = บ้านเลขที่',
          kid_mnemonic: 'ป้ายตัวเลขหน้าห้องพัก 808 สีทอง = 门牌号',
          body_gesture: 'ทำมือนิ้วชี้เคาะประตูสามครั้ง'
        },
        {
          id: 'hsk2_1205',
          hanzi: '备注',
          pinyin: 'bèizhù',
          display_pinyin: 'bèizhù',
          pinyin_tone: 'bei4zhu4',
          meaning_th: 'หมายเหตุพิเศษ / กำชับร้าน',
          meaning_en: 'remarks / notes',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 15,
          mnemonic: 'เตรียมพร้อมไว้ (备) โดยเขียนบันทึกกำชับ (注) = หมายเหตุ',
          kid_mnemonic: 'กระดาษโน้ตแผ่นเล็กแปะหน้ากล่องอาหาร = 备注',
          body_gesture: 'ทำท่าเขียนปากกาลงบนฝ่ามือยิกๆ'
        },
        {
          id: 'hsk2_1206',
          hanzi: '放在',
          pinyin: 'fàngzài',
          display_pinyin: 'fàngzài',
          pinyin_tone: 'fang4zai4',
          meaning_th: 'วางไว้ที่',
          meaning_en: 'put at / place on',
          radical: '攵',
          radical_name_th: 'หมวดเคาะเบาๆ (反文旁)',
          stroke_count: 14,
          mnemonic: 'วางปล่อยลงเบาๆ (放) ณ ตำแหน่งสถานที่แห่งนั้น (在) = วางไว้ที่',
          kid_mnemonic: 'วางกล่องของขวัญลงหน้าประตูห้อง = 放在',
          body_gesture: 'สองมือถือกล่องค่อยๆ ย่อตัววางลงบนโต๊ะ'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำว่า 门牌号 (ménpáihào) ให้มีจังหวะธรรมชาติ',
        description_th: 'คำว่า 门 (mén เสียง 2) + 牌 (pái เสียง 2) ขึ้นคู่กันสองพยางค์ แล้วลงท้ายด้วย 号 (hào เสียง 4) หนักแน่น',
        example: '门牌号 (ménpáihào), 房间号 (fángjiānhào)',
        fun_metaphor: 'เหมือนขึ้นสะพานโค้งสองตอน ↗️ ↗️ แล้วทิ้งดิ่งลงสไลเดอร์ ↘️ ชัดเจนทรงพลัง!',
        reassurance: 'ออกเสียง mén-pái-hào ไม่ต้องรีบร้อน ไรเดอร์จะฟังเลขที่ห้องได้ชัดเจน 100%!'
      },
      grammar_bite: {
        title: 'โครงสร้างการระบุหมายเหตุ: 请在备注里写... และ 放在...',
        explanation_th: 'ใช้คำว่า 请在备注里写... เพื่อระบุความต้องการ เช่น ไม่ใส่เผ็ด หรือให้วางอาหารไว้หน้าประตู',
        patterns: [
          {
            formula: '请 + 放在 + [สถานที่] + 就好',
            zh: '请放在门口就好。',
            pinyin: 'Qǐng fàngzài ménkǒu jiù hǎo.',
            th: 'กรุณาวางไว้ที่หน้าประตูได้เลยครับ',
            en: 'Please just leave it at the door.'
          },
          {
            formula: '请在备注里写 + [ข้อความกำชับ]',
            zh: '请在备注里写：不要辣。',
            pinyin: 'Qǐng zài bèizhù lǐ xiě: bú yào là.',
            th: 'กรุณาเขียนในหมายเหตุว่า: ไม่ใส่เผ็ด',
            en: 'Please write in remarks: not spicy.'
          },
          {
            formula: '请问 + [สถานที่] + 门牌号是多少？',
            zh: '请问您的门牌号是多少？',
            pinyin: 'Qǐngwèn nín de ménpáihào shì duōshao?',
            th: 'ขอเรียนถามว่าบ้านเลขที่/เลขห้องของท่านคือเท่าใดครับ?',
            en: 'May I ask what your room number is?'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'เพื่อนคนจีน เสี่ยวหลง 👦',
          zh: '今天下雨，我们点外卖吃吧！你想吃什么？',
          pinyin: 'Jīntiān xià yǔ, wǒmen diǎn wàimài chī ba! Nǐ xiǎng chī shénme?',
          th: 'วันนี้ฝนตก พวกเราสั่งเดลิเวอรี่มากินกันเถอะ! นายอยากกินอะไร?',
          en: 'It rains today, let us order delivery! What do you want to eat?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '好啊！我想吃牛肉面。打开菜单看看吧。',
          pinyin: 'Hǎo a! Wǒ xiǎng chī niúròumiàn. Dǎkāi càidān kànkan ba.',
          th: 'ดีเลย! ฉันอยากกินบะหมี่เนื้อ เปิดดูเมนูกันเถอะ',
          en: 'Great! I want beef noodles. Let us check the menu.'
        },
        {
          speaker: 'A',
          speaker_name: 'เพื่อนคนจีน เสี่ยวหลง 👦',
          zh: '选好了！地址写我们公寓的门牌号602，备注写什么？',
          pinyin: 'Xuǎn hǎo le! Dìzhǐ xiě wǒmen gōngyù de ménpáihào liù líng èr, bèizhù xiě shénme?',
          th: 'เลือกเสร็จแล้ว! ที่อยู่ใส่เลขห้อง 602 ของอพาร์ตเมนต์เรา แล้วหมายเหตุจะเขียนว่าอะไรดี?',
          en: 'Chosen! Address is room 602 of our apartment, what should we write in remarks?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '备注写：请放在门口就好，不用敲门，谢谢骑手！',
          pinyin: 'Bèizhù xiě: qǐng fàngzài ménkǒu jiù hǎo, bú yòng qiāo mén, xièxie qíshǒu!',
          th: 'เขียนหมายเหตุว่า: กรุณาวางไว้หน้าประตูได้เลย ไม่ต้องเคาะประตู ขอบคุณไรเดอร์ครับ!',
          en: 'Write: please leave at door, no need to knock, thank you rider!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อต้องการให้ไรเดอร์วางอาหารไว้ที่หน้าประตูห้อง ควรระบุประโยคใดในหมายเหตุ?",
          options: [
            '请放在门口就好。',
            '请进房间一起吃。',
            '不要放辣椒。',
            '我要退款。'
          ],
          correct_index: 0,
          explanation_th: "'请放在门口就好' แปลว่า กรุณาวางไว้ที่หน้าประตูได้เลย เป็นสำนวนยอดนิยมในการสั่งเดลิเวอรี่",
          encouragement: 'ถูกต้องยอดเยี่ยม! สะดวก ปลอดภัย ไม่ต้องรบกวนเปิดประตู!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "กรุณาวางไว้ที่หน้าประตูได้เลย"',
          tokens: ['门口', '请', '就好', '放在'],
          correct_sequence: ['请', '放在', '门口', '就好'],
          pinyin: 'Qǐng fàngzài ménkǒu jiù hǎo',
          meaning_th: 'กรุณาวางไว้ที่หน้าประตูได้เลย',
          explanation_th: 'โครงสร้าง: 请 (กรุณา) + 放在 (วางไว้ที่) + 门口 (หน้าประตู) + 就好 (ได้เลย)',
          encouragement: 'แม่นยำมาก! เขียนหมายเหตุเดลิเวอรี่ได้เหมือนคนจีนแท้ๆ!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '门' ในคำว่า '门牌号' มีรูปร่างจำลองมาจากสิ่งใด?",
          options: [
            'บานประตูสองบานเปิดคู่กัน',
            'หน้าต่างบานเกล็ด',
            'กำแพงหินสูงใหญ่',
            'หลังคาเต็นท์'
          ],
          correct_index: 0,
          explanation_th: "'门' มีวิวัฒนาการมาจากภาพวาดของบานประตูคู่โบราณ",
          encouragement: 'เข้าใจลึกซึ้งถึงรากศัพท์อักษรจีน!'
        },
        {
          type: 'flash_recall',
          question_th: "ช่องสำหรับใส่ 'หมายเหตุพิเศษ' ในแอปสั่งอาหารจีน เรียกว่าอะไร?",
          options: [
            '备注 (bèizhù)',
            '地址 (dìzhǐ)',
            '密码 (mìmǎ)',
            '发票 (fāpiào)'
          ],
          correct_index: 0,
          explanation_th: "'备注' คือ หมายเหตุพิเศษ เช่น ขอช้อนส้อม หรือแจ้งให้วางไว้หน้าห้อง",
          encouragement: 'เป๊ะมาก! หาปุ่มกดในแอปได้ไม่หลงทางแน่นอน!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณสั่งชานมไข่มุกในแอป Meituan ต้องการกำชับร้านค้าว่า "หวานน้อย และกรุณาวางไว้ที่หน้าประตูห้อง 501" ควรพิมพ์ข้อความใดในช่อง 备注 (หมายเหตุ)?',
        options: [
          '少糖，请放在501门口就好，谢谢！ (Shǎo táng, qǐng fàngzài wǔ líng yī ménkǒu jiù hǎo, xièxie!)',
          '多少钱一杯？能不能打折？ (Duōshao qián yì bēi? Néng bu néng dǎzhé?)',
          '我想去高铁站。 (Wǒ xiǎng qù gāotiě zhàn.)',
          '对不起，我不是骑手。 (Duìbuqǐ, wǒ bú shì qíshǒu.)'
        ],
        correct_index: 0,
        explanation_th: "ประโยค '少糖，请放在501门口就好，谢谢！' ระบุทั้งรสชาติ (少糖 หวานน้อย) และสถานที่วาง (501门口 หน้าห้อง 501) ได้ครบถ้วนชัดเจน",
        encouragement: 'ว้าว! สั่งชานมไข่มุกในจีนได้เป๊ะสมใจอยากแล้ว!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u12_l01',
        badge_name: 'เซียนสั่งเดลิเวอรี่ 🛵🥡',
        message_th: 'ยินดีด้วยนะคนเก่ง! คุณสามารถใส่ที่อยู่และเขียนหมายเหตุเดลิเวอรี่ภาษาจีนได้อย่างสมบูรณ์แบบ!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't2_u12_l02',
      lesson_number: 2,
      title: {
        zh: '骑手配送中',
        th: 'ไรเดอร์กำลังจัดส่ง & คำเสริมบอกทิศทาง',
        en: 'Rider In-Transit & Directional Complements'
      },
      can_do: {
        th: 'รับสายโทรศัพท์จากไรเดอร์ เข้าใจคำเสริมบอกทิศทาง (送过来 / 拿上去) และติดตามสถานะอาหารได้',
        en: 'Answer phone calls from delivery riders, understand directional complements (送过来 / 拿上去), and track orders'
      },
      baby_step_goal: 'เป้าหมายวันนี้: คุยโทรศัพท์กับไรเดอร์รู้เรื่องและบอกว่า "ช่วยส่งขึ้นมาข้างบนได้ไหม" ได้!',
      vocabulary: [
        {
          id: 'hsk2_1207',
          hanzi: '骑手',
          pinyin: 'qíshǒu',
          display_pinyin: 'qíshǒu',
          sandhi_rule: '3+3',
          pinyin_tone: 'qi2shou3',
          meaning_th: 'ไรเดอร์ส่งอาหาร / ผู้ขับขี่มอเตอร์ไซค์ส่งของ',
          meaning_en: 'delivery rider',
          radical: '马',
          radical_name_th: 'หมวดม้า (马字旁)',
          stroke_count: 15,
          mnemonic: 'ขี่ม้าเร็ว (骑) ด้วยฝีมืออันชำนาญ (手) = ไรเดอร์ส่งอาหาร',
          kid_mnemonic: 'พี่ม้าเร็วใส่หมวกกันน็อกสีเหลืองขับมอเตอร์ไซค์ = 骑手',
          body_gesture: 'ทำมือจับแฮนด์มอเตอร์ไซค์แล้วบิดคันเร่ง บรึ้นๆ'
        },
        {
          id: 'hsk2_1208',
          hanzi: '送餐',
          pinyin: 'sòngcān',
          display_pinyin: 'sòngcān',
          pinyin_tone: 'song4can1',
          meaning_th: 'ส่งอาหาร',
          meaning_en: 'deliver meal',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之底)',
          stroke_count: 25,
          mnemonic: 'ก้าวเดินทาง (辶) นำอาหารมื้ออร่อย (餐) ไปส่งมอบ = ส่งอาหาร',
          kid_mnemonic: 'เดินหิ้วถุงอาหารร้อนๆ ไปส่งเพื่อน = 送餐',
          body_gesture: 'ยื่นสองมือส่งถุงอาหารให้คู่สนทนา'
        },
        {
          id: 'hsk2_1209',
          hanzi: '配送费',
          pinyin: 'pèisòngfèi',
          display_pinyin: 'pèisòngfèi',
          pinyin_tone: 'pei4song4fei4',
          meaning_th: 'ค่าจัดส่งเดลิเวอรี่',
          meaning_en: 'delivery fee',
          radical: '酉',
          radical_name_th: 'หมวดไหเหล้า/จัดสรร (酉字旁)',
          stroke_count: 28,
          mnemonic: 'ค่าใช้จ่าย (费) สำหรับการจัดสรรและส่งอาหาร (配送) = ค่าจัดส่ง',
          kid_mnemonic: 'ค่าบริการเล็กๆ น้อยๆ ให้พี่ไรเดอร์ขี่รถ = 配送费',
          body_gesture: 'หยิบเหรียญหย่อนลงกระเป๋าเสื้อ'
        },
        {
          id: 'hsk2_1210',
          hanzi: '超时',
          pinyin: 'chāoshí',
          display_pinyin: 'chāoshí',
          pinyin_tone: 'chao1shi2',
          meaning_th: 'เกินเวลา / ล่าช้ากว่ากำหนด',
          meaning_en: 'overdue / overtime',
          radical: '走',
          radical_name_th: 'หมวดวิ่ง/เดิน (走字旁)',
          stroke_count: 22,
          mnemonic: 'วิ่งข้ามเลย (超) ช่วงเวลาที่กำหนด (时) = เกินเวลา',
          kid_mnemonic: 'เข็มนาฬิกาวิ่งเลยเส้นชัยสีแดง = 超时',
          body_gesture: 'ชี้ที่ข้อมือทำท่ามองนาฬิกาอย่างเป็นกังวล'
        },
        {
          id: 'hsk2_1211',
          hanzi: '催单',
          pinyin: 'cuīdān',
          display_pinyin: 'cuīdān',
          pinyin_tone: 'cui1dan1',
          meaning_th: 'เร่งออเดอร์ / ตามอาหาร',
          meaning_en: 'urge order / expedite',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 21,
          mnemonic: 'คน (亻) รีบเร่ง (催) ตรวจสอบใบออเดอร์ (单) = เร่งออเดอร์',
          kid_mnemonic: 'กดปุ่มกระดิ่งกริ๊งๆ พี่ไรเดอร์ถึงไหนแล้วจ๊ะ = 催单',
          body_gesture: 'ใช้นิ้วชี้จิ้มอากาศรัวๆ เหมือนกดปุ่มเร่งในแอป'
        },
        {
          id: 'hsk2_1212',
          hanzi: '马上',
          pinyin: 'mǎshàng',
          display_pinyin: 'mǎshàng',
          pinyin_tone: 'ma3shang4',
          meaning_th: 'ทันที / เดี๋ยวนี้ / ในไม่ช้า',
          meaning_en: 'immediately / right away',
          radical: '马',
          radical_name_th: 'หมวดม้า (马字旁)',
          stroke_count: 6,
          mnemonic: 'กระโดดขึ้นหลังม้า (马) ทันที (上) เพื่อออกเดินทางอย่างรวดเร็ว = ทันที',
          kid_mnemonic: 'กระโดดขึ้นหลังม้าวิ่งฉิวทันใจ = 马上',
          body_gesture: 'ดีดนิ้วเป๊าะหนึ่งทีแสดงถึงความรวดเร็วทันใจ'
        }
      ],
      tone_rule: {
        rule_name: 'การผันเสียงของคำว่า 马上 (mǎshàng)',
        description_th: 'คำว่า 马 (mǎ) เป็นเสียงที่ 3 ต่ำ ส่วน 上 (shàng) เป็นเสียงที่ 4 หนัก เมื่อรวมกันคำว่า mǎ จะออกเป็นเสียงครึ่งเสียงสามอย่างกระชับ ไม่ต้องทอดเสียงยาว',
        example: '马上 (mǎshàng), 马上到 (mǎshàng dào)',
        fun_metaphor: 'ดีดนิ้วปุ๊บ ออกเสียงม้าปั๊บ สั้น กระชับ ฉับไว!',
        reassurance: 'ออกเสียง mǎ-shàng สั้นๆ ได้เลย ไรเดอร์ชอบใช้คำนี้มากแปลว่า "ถึงเดี๋ยวนี้แล้ว!"'
      },
      grammar_bite: {
        title: 'คำเสริมบอกทิศทาง: 送过来 (ส่งมาทางนี้) vs 拿上去 (ถือขึ้นไป)',
        explanation_th: 'ใช้คำกริยา + 来 (มาทางผู้พูด) หรือ 去 (ไปทางอื่น) เพื่อระบุทิศทางการเคลื่อนที่ของสิ่งของ',
        patterns: [
          {
            formula: '送 + 过来 = ส่งมาหาผู้พูด',
            zh: '骑手把外卖送过来了。',
            pinyin: 'Qíshǒu bǎ wàimài sòng guòlai le.',
            th: 'ไรเดอร์ส่งอาหารมาถึงแล้ว',
            en: 'The rider has delivered the food over here.'
          },
          {
            formula: '拿 + 上去 = ถือขึ้นไปข้างบน',
            zh: '我下楼把外卖拿上去。',
            pinyin: 'Wǒ xià lóu bǎ wàimài ná shàngqu.',
            th: 'ฉันลงไปข้างล่างเพื่อหยิบอาหารขึ้นมาข้างบน',
            en: 'I go downstairs to bring the takeout upstairs.'
          },
          {
            formula: '能不能 + 帮忙 + 送到...？',
            zh: '能不能帮忙送到门口？',
            pinyin: 'Néng bu néng bāngmáng sòng dào ménkǒu?',
            th: 'ช่วยส่งมาถึงหน้าประตูห้องได้ไหมครับ?',
            en: 'Could you please help deliver it to the door?'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'พี่ไรเดอร์ส่งอาหาร 🛵',
          zh: '喂，您好！我是美团骑手，您的外卖送过来了，我现在在楼下！',
          pinyin: 'Wèi, nǐn hǎo! Wǒ shì Měituán qíshǒu, nín de wàimài sòng guòlai le, wǒ xiànzài zài lóuxià!',
          th: 'ฮัลโหล สวัสดีครับ! ผมเป็นไรเดอร์เหม่ยถวน อาหารส่งมาถึงแล้ว ตอนนี้ผมอยู่ชั้นล่างครับ!',
          en: 'Hello! I am the Meituan rider, your food is delivered, I am downstairs now!'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '师傅您好！辛苦了！能不能帮忙拿上去，放在602门口？',
          pinyin: 'Shīfu nín hǎo! Xīnkǔ le! Néng bu néng bāngmáng ná shàngqu, fàngzài liù líng èr ménkǒu?',
          th: 'สวัสดีครับพี่คนขับ! ขอบคุณที่เหนื่อยครับ ช่วยถือขึ้นมาข้างบน วางหน้าห้อง 602 ได้ไหมครับ?',
          en: 'Hello master! Thank you for the hard work! Can you help bring it upstairs and leave at 602 door?'
        },
        {
          speaker: 'A',
          speaker_name: 'พี่ไรเดอร์ส่งอาหาร 🛵',
          zh: '好的，楼下单元门有密码吗？',
          pinyin: 'Hǎo de, lóuxià dānyuánmén yǒu mìmǎ ma?',
          th: 'ได้ครับ ประตูอาคารชั้นล่างมีรหัสผ่านไหมครับ?',
          en: 'Sure, does the downstairs entrance door have a password?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '密码是1234，我马上在手机上给您开门，谢谢您！',
          pinyin: 'Mìmǎ shì yāo èr sān sì, wǒ mǎshàng zài shǒujī shang gěi nín kāimén, xièxie nín!',
          th: 'รหัสคือ 1234 ครับ ผมจะกดเปิดประตูในมือถือให้พี่เดี๋ยวนี้ครับ ขอบคุณมากครับ!',
          en: 'The code is 1234, I will open the door on my phone right away, thank you!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อไรเดอร์โทรมาบอกว่า '您的外卖送过来了，在楼下' หมายถึงข้อใด?",
          options: [
            'อาหารของคุณส่งมาถึงแล้ว ตอนนี้อยู่ชั้นล่าง',
            'ร้านอาหารยังทำอาหารไม่เสร็จ',
            'ขอเก็บเงินค่าส่งเพิ่ม',
            'ให้คุณไปรับอาหารที่ร้าน'
          ],
          correct_index: 0,
          explanation_th: "'送过来了' แปลว่า ส่งมาถึงแล้ว และ '在楼下' คือ อยู่ชั้นล่าง",
          encouragement: 'ฟังไรเดอร์คุยโทรศัพท์ได้เข้าใจทันที เก่งมากๆ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ช่วยถือขึ้นมาข้างบนได้ไหม?"',
          tokens: ['拿上去', '能不能', '帮忙'],
          correct_sequence: ['能不能', '帮忙', '拿上去'],
          pinyin: 'Néng bu néng bāngmáng ná shàngqu',
          meaning_th: 'ช่วยถือขึ้นมาข้างบนได้ไหม?',
          explanation_th: 'โครงสร้าง: 能不能 (ได้ไหม) + 帮忙 (ช่วยเหลือ) + 拿上去 (ถือขึ้นไป)',
          encouragement: 'ถูกต้องยอดเยี่ยม! ทิศทาง 拿上去 ใช้อย่างคล่องแคล่ว!'
        },
        {
          type: 'flash_recall',
          question_th: "คำสรรพนามที่สุภาพและเป็นมิตรที่สุดในการเรียกคนขับหรือช่างในจีนคือคำใด?",
          options: [
            '师傅 (shīfu)',
            '老师 (lǎoshī)',
            '学生 (xuésheng)',
            '医生 (yīshēng)'
          ],
          correct_index: 0,
          explanation_th: "คนจีนนิยมเรียกคนขับรถ ไรเดอร์ หรือช่างฝีมือด้วยความเคารพว่า '师傅' (shīfu)",
          encouragement: 'เข้าใจมารยาทและวัฒนธรรมจีนลึกซึ้งมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '骑' (ขี่) ในคำว่า '骑手' มีหมวดนำใด?",
          options: [
            '马 (หมวดม้า 马字旁)',
            '车 (หมวดรถ 车字旁)',
            '足 (หมวดเท้า 足字旁)',
            '舟 (หมวดเรือ 舟字旁)'
          ],
          correct_index: 0,
          explanation_th: "'骑' มาจากหมวดม้า '马' เพราะแต่เดิมการขี่คือการขี่ม้า",
          encouragement: 'ตาไวเฉียบคมมาก!'
        }
      ],
      boss_challenge: {
        scenario_th: 'โทรศัพท์ของคุณดังขึ้น ไรเดอร์พูดเร็วมากว่า "您好！外卖到了，下雨天进不去大门，麻烦下楼拿一下！" คุณกำลังติดสายประชุมสำคัญ ต้องการขอร้องให้ไรเดอร์รอสัก 2 นาที ควรตอบอย่างไร?',
        options: [
          '师傅不好意思，我在开会，请稍等我两分钟，我马上下来！ (Shīfu bù hǎoyìsi, wǒ zài kāihuì, qǐng shāoděng wǒ liǎng fēnzhōng, wǒ mǎshàng xiàlai!)',
          '你叫什么名字？ (Nǐ jiào shénme míngzi?)',
          '我不是骑手，再见。 (Wǒ bú shì qíshǒu, zàijiàn.)',
          '多少钱一碗面？ (Duōshao qián yì wǎn miàn?)'
        ],
        correct_index: 0,
        explanation_th: "ประโยค '师傅不好意思，我在开会，请稍等我两分钟，我马上下来！' ขอโทษอย่างสุภาพ แจ้งเหตุผล และระบุเวลาที่แน่นอน ทำให้ไรเดอร์เข้าใจและยินดีรอ",
        encouragement: 'สุดยอดการสื่อสาร! แก้ไขปัญหาเฉพาะหน้าได้คะแนนเต็มร้อย!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u12_l02',
        badge_name: 'ทูตสื่อสารสายด่วนไรเดอร์ 📞🛵',
        message_th: 'ยินดีด้วยนะคนเก่ง! คุณสามารถคุยโทรศัพท์กับไรเดอร์จีนและใช้คำเสริมบอกทิศทางได้อย่างคล่องแคล่วแล้ว!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't2_u12_l03',
      lesson_number: 3,
      title: {
        zh: '菜鸟驿站取快递',
        th: 'รับพัสดุที่จุดบริการ Cainiao & ตู้ล็อกเกอร์',
        en: 'Cainiao Station & Smart Express Locker'
      },
      can_do: {
        th: 'ค้นหารหัสรับพัสดุ (取件码) เดินไปรับพัสดุที่จุดบริการ Cainiao หรือกดเปิดตู้ล็อกเกอร์อัจฉริยะ',
        en: 'Locate pickup codes, retrieve parcels at Cainiao stations, or operate smart express lockers'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ยื่นมือถือโชว์รหัสรับพัสดุที่จุดบริการ Cainiao แล้วรับของกลับห้องได้!',
      vocabulary: [
        {
          id: 'hsk2_1213',
          hanzi: '快递',
          pinyin: 'kuàidì',
          display_pinyin: 'kuàidì',
          pinyin_tone: 'kuai4di4',
          meaning_th: 'พัสดุด่วน / พัสดุไปรษณีย์',
          meaning_en: 'express delivery / parcel',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之底)',
          stroke_count: 14,
          mnemonic: 'ก้าวเดินทางอย่างรวดเร็ว (快) เพื่อส่งต่อพัสดุ (递) = พัสดุด่วน',
          kid_mnemonic: 'กล่องพัสดุผูกโบสีน้ำตาลมีล้อวิ่งเร็วปรู๊ด = 快递',
          body_gesture: 'กอดกล่องพัสดุจำลองแนบอกอย่างหวงแหน'
        },
        {
          id: 'hsk2_1214',
          hanzi: '菜鸟驿站',
          pinyin: 'Càiniǎo yìzhàn',
          display_pinyin: 'Càiniǎo yìzhàn',
          pinyin_tone: 'cai4niao3yi4zhan4',
          meaning_th: 'จุดบริการรับส่งพัสดุไช่เหนียว (Cainiao Post)',
          meaning_en: 'Cainiao pickup station',
          radical: '艹',
          radical_name_th: 'หมวดหญ้า (草字头)',
          stroke_count: 36,
          mnemonic: 'นกตัวน้อย (菜鸟) บินมาพักที่สถานีม้าด่วน (驿站) = จุดรับพัสดุไช่เหนียว',
          kid_mnemonic: 'สถานีนกน้อยสีฟ้าที่คอยเก็บกล่องพัสดุให้เรา = 菜鸟驿站',
          body_gesture: 'กระพือสองมือเหมือนปีกนกน้อยบินไปที่สถานี'
        },
        {
          id: 'hsk2_1215',
          hanzi: '快递柜',
          pinyin: 'kuàidìguì',
          display_pinyin: 'kuàidìguì',
          pinyin_tone: 'kuai4di4gui4',
          meaning_th: 'ตู้ล็อกเกอร์พัสดุอัจฉริยะ',
          meaning_en: 'smart parcel locker',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 26,
          mnemonic: 'ตู้ไม้และเหล็ก (柜) สำหรับจัดเก็บพัสดุด่วน (快递) = ตู้ล็อกเกอร์พัสดุ',
          kid_mnemonic: 'ตู้สีส้มมีช่องเล็กๆ เยอะแยะ ประตูเด้งเปิดเอง = 快递柜',
          body_gesture: 'สองมือทำท่าแตะหน้าจอกดรหัสแล้วประตูเด้งผาง'
        },
        {
          id: 'hsk2_1216',
          hanzi: '取件码',
          pinyin: 'qǔjiànmǎ',
          display_pinyin: 'qǔjiànmǎ',
          pinyin_tone: 'qu3jian4ma3',
          meaning_th: 'รหัสรับพัสดุ (เลขชั้น-ช่องวาง)',
          meaning_en: 'parcel pickup code',
          radical: '又',
          radical_name_th: 'หมวดมือขวา/อีกครั้ง (又字旁)',
          stroke_count: 22,
          mnemonic: 'ยื่นมือไปหยิบ (取) สิ่งของ (件) ตามรหัสตัวเลข (码) = รหัสรับพัสดุ',
          kid_mnemonic: 'รหัสตัวเลข 3 ตัว เช่น 2-1-402 เดินไปหยิบของได้ทันที = 取件码',
          body_gesture: 'ทำมือนิ้วชี้หยิบกล่องพัสดุขึ้นมาจากชั้นวาง'
        },
        {
          id: 'hsk2_1217',
          hanzi: '寄存',
          pinyin: 'jìcún',
          display_pinyin: 'jìcún',
          pinyin_tone: 'ji4cun2',
          meaning_th: 'ฝากของ / รับฝากไว้ชั่วคราว',
          meaning_en: 'to deposit / store temporarily',
          radical: '宀',
          radical_name_th: 'หมวดหลังคาบ้าน (宝盖头)',
          stroke_count: 17,
          mnemonic: 'นำของมาไว้ใต้หลังคา (寄) เพื่อเก็บรักษาคงอยู่ (存) = รับฝากของ',
          kid_mnemonic: 'วางกระเป๋าไว้ที่เคาน์เตอร์ฝากของ = 寄存',
          body_gesture: 'สองมือประคองของยื่นฝากไว้กับพนักงาน'
        },
        {
          id: 'hsk2_1218',
          hanzi: '柜子',
          pinyin: 'guìzi',
          display_pinyin: 'guìzi',
          pinyin_tone: 'gui4zi',
          meaning_th: 'ตู้ / ตู้ล็อกเกอร์',
          meaning_en: 'cabinet / locker',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 15,
          mnemonic: 'ทำจากท่อนไม้ (木) บรรจุสิ่งของมีค่า = ตู้',
          kid_mnemonic: 'ตู้เก็บของมีฝาปิดเปิด = 柜子',
          body_gesture: 'สองมือดึงบานเปิดตู้ล็อกเกอร์'
        }
      ],
      tone_rule: {
        rule_name: 'การทอดเสียงต่ำในคำว่า 取件码 (qǔjiànmǎ)',
        description_th: 'คำว่า 取 (qǔ) เป็นเสียงที่ 3 อยู่หน้า 件 (jiàn เสียงที่ 4) คำว่า 取 จะออกเป็นเสียงครึ่งเสียงสาม (Half-Third Tone) โดยกดเสียงลงต่ำที่ระดับ 21 ไม่ต้องตวัดขึ้น',
        example: '取件码 (qǔjiànmǎ), 取快递 (qǔ kuàidì)',
        fun_metaphor: 'กดเสียงลงต่ำนิ่งๆ เหมือนก้มตัวลงไปหยิบของที่พื้น!',
        reassurance: 'ออกเสียง qǔ ทุ้มๆ ต่ำๆ ชัดเจน พนักงานสถานีจะเข้าใจทันที!'
      },
      grammar_bite: {
        title: 'สูตรบอกการมารับพัสดุ: 我来取快递，取件码是...',
        explanation_th: 'เมื่อเดินเข้าสถานีบริการพัสดุ ให้ทักทายพนักงานแล้วบอกรหัสรับพัสดุ หรือกดรหัสที่หน้าจอตู้ล็อกเกอร์',
        patterns: [
          {
            formula: '我来 + 取快递，取件码是 + [ตัวเลข]',
            zh: '你好！我来取快递，取件码是3-2-501。',
            pinyin: 'Nǐ hǎo! Wǒ lái qǔ kuàidì, qǔjiànmǎ shì sān èr wǔ líng yī.',
            th: 'สวัสดีครับ! ผมมารับพัสดุ รหัสรับของคือ 3-2-501 ครับ',
            en: 'Hello! I am here to pick up a parcel, the code is 3-2-501.'
          },
          {
            formula: '快递 + 已经 + 放在 + [สถานที่] + 了',
            zh: '快递已经放在菜鸟驿站了。',
            pinyin: 'Kuàidì yǐjīng fàngzài Càiniǎo yìzhàn le.',
            th: 'พัสดุถูกนำไปวางไว้ที่สถานี Cainiao เรียบร้อยแล้ว',
            en: 'The parcel has been placed at the Cainiao station.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '你好！我收到短信，我来取快递。',
          pinyin: 'Nǐ hǎo! Wǒ shōudào duǎnxìn, wǒ lái qǔ kuàidì.',
          th: 'สวัสดีครับ! ผมได้รับ SMS แจ้งเตือน ผมมารับพัสดุครับ',
          en: 'Hello! I received an SMS, I am here to pick up my parcel.'
        },
        {
          speaker: 'B',
          speaker_name: 'พี่พนักงานสถานีไช่เหนียว 👩‍🦰',
          zh: '好的，请问你的取件码是多少？',
          pinyin: 'Hǎo de, qǐngwèn nǐ de qǔjiànmǎ shì duōshao?',
          th: 'ได้จ้า ขอถามหน่อยรหัสรับพัสดุของเธอคือเลขอะไรจ๊ะ?',
          en: 'Sure, what is your pickup code?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '取件码是6-1-402，手机尾号是8888。',
          pinyin: 'Qǔjiànmǎ shì liù yāo sì líng èr, shǒujī wěihào shì bābābābā.',
          th: 'รหัสคือ 6-1-402 ครับ และเลขท้ายเบอร์มือถือคือ 8888 ครับ',
          en: 'Code is 6-1-402, and the last 4 digits of my phone are 8888.'
        },
        {
          speaker: 'B',
          speaker_name: 'พี่พนักงานสถานีไช่เหนียว 👩‍🦰',
          zh: '找到了，这是你的大包裹，在这儿扫码出库就可以拿走了！',
          pinyin: 'Zhǎodào le, zhè shì nǐ de dà bāoguǒ, zài zhèr sǎomǎ chūkù jiù kěyǐ ná zǒu le!',
          th: 'เจอแล้วจ้า นี่คือพัสดุกล่องใหญ่ของเธอ สแกนโค้ดนำออกจากคลังตรงนี้ก็เอาไปได้เลย!',
          en: 'Found it, here is your big parcel, scan code here to check out and you can take it!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อคุณได้รับข้อความ SMS มีตัวเลข '3-1-205' พร้อมชื่อ '菜鸟驿站' หมายถึงสิ่งใด?",
          options: [
            'มีพัสดุมาส่ง ให้ไปรับที่สถานี Cainiao โดยใช้รหัส 3-1-205',
            'คุณต้องจ่ายเงิน 312 หยวน',
            'เบอร์โทรศัพท์ใหม่ของเพื่อนคือ 31205',
            'อาหารเดลิเวอรี่ของคุณถูกยกเลิก'
          ],
          correct_index: 0,
          explanation_th: "รหัสรูปแบบตัวเลข เช่น 3-1-205 จาก 菜鸟驿站 คือ รหัสรับพัสดุ (取件码) เพื่อไปรับของที่ชั้นวาง",
          encouragement: 'เข้าใจระบบพัสดุจีนลึกซึ้งยอดเยี่ยมมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ผมมารับพัสดุ รหัสรับของคือ 6-1-402"',
          tokens: ['取件码是', '取快递', '我来', '6-1-402'],
          correct_sequence: ['我来', '取快递', '取件码是', '6-1-402'],
          pinyin: 'Wǒ lái qǔ kuàidì, qǔjiànmǎ shì liù yāo sì líng èr',
          meaning_th: 'ผมมารับพัสดุ รหัสรับของคือ 6-1-402',
          explanation_th: 'โครงสร้าง: 我来取快递 (ผมมารับพัสดุ) + 取件码是 (รหัสรับของคือ...)',
          encouragement: 'เรียงประโยครับพัสดุได้คล่องแคล่วเป๊ะเวอร์!'
        },
        {
          type: 'flash_recall',
          question_th: "ตู้ล็อกเกอร์สีส้มอัจฉริยะสำหรับรับฝากพัสดุในชุมชนจีน เรียกว่าอะไร?",
          options: [
            '快递柜 (kuàidìguì)',
            '自动售货机 (zìdòng shòuhuòjī)',
            '电梯 (diàntī)',
            '行李架 (xínglijà)'
          ],
          correct_index: 0,
          explanation_th: "'快递柜' คือ ตู้ล็อกเกอร์พัสดุอัจฉริยะที่เปิดด้วยการกดรหัสหรือสแกนคิวอาร์โค้ด",
          encouragement: 'จำศัพท์สถานที่และสิ่งอำนวยความสะดวกได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '柜' (ตู้) ในคำว่า '快递柜' มีหมวดนำใด?",
          options: [
            '木 (หมวดไม้ 木字旁)',
            '金 (หมวดโลหะ 金字旁)',
            '门 (หมวดประตู 门字框)',
            '土 (หมวดดิน 土字旁)'
          ],
          correct_index: 0,
          explanation_th: "หมวด '木' หมายถึง ไม้ เพราะตู้ในอดีตสร้างขึ้นจากไม้",
          encouragement: 'ตาไวมาก! สังเกตหมวดนำได้ถูกต้อง!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณสั่งของออนไลน์จาก Taobao คนส่งนำพัสดุไปฝากไว้ในตู้ล็อกเกอร์อัจฉริยะ (快递柜) คุณเดินไปถึงหน้าตู้ เห็นหน้าจอดิจิทัล คุณควรทำตามขั้นตอนใดเพื่อเปิดตู้รับของ?',
        options: [
          'แตะหน้าจอกดเลือกเมนู 取件 (รับของ) แล้วพิมพ์รหัสตัวเลข 取件码 ที่ได้รับจาก SMS ประตูช่องจะเด้งเปิดออกเอง',
          'ใช้กุญแจไขตู้ทุกช่องจนกว่าจะเจอ',
          'โทรแจ้งตำรวจว่าตู้ไม่ยอมเปิด',
          'ยืนรอให้ไรเดอร์เดินมาเปิดให้'
        ],
        correct_index: 0,
        explanation_th: "ตู้ล็อกเกอร์อัจฉริยะของจีนทำงานอัตโนมัติ เพียงกดปุ่ม 取件 บนหน้าจอ แล้วพิมพ์รหัส 取件码 ประตูช่องที่ใส่ของจะปลดล็อกและเด้งเปิดทันที",
        encouragement: 'ฉลาดล้ำสมัย! ใช้เทคโนโลยีตู้พัสดุดิจิทัลของจีนได้อย่างคล่องแคล่ว!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u12_l03',
        badge_name: 'ผู้พิชิตตู้พัสดุอัจฉริยะ 📦🔓',
        message_th: 'ยินดีด้วยนะคนเก่ง! คุณสามารถรับพัสดุที่สถานี Cainiao และใช้งานตู้ล็อกเกอร์อัจฉริยะได้อย่างมืออาชีพ!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't2_u12_l04',
      lesson_number: 4,
      title: {
        zh: '奶茶外卖大作战',
        th: 'บอสชาเลนจ์: ภารกิจสั่งชานมไข่มุกถึงคอนโด',
        en: 'Boss Challenge: Condo Bubble Tea Delivery'
      },
      can_do: {
        th: 'บูรณาการการสั่งอาหารออนไลน์ การบอกรหัสผ่านประตูอาคาร และการประสานงานกับไรเดอร์ได้อย่างราบรื่น 100%',
        en: 'Integrate online food ordering, communicating building entrance passcodes, and coordinating with riders seamlessly'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พิชิตบอสใหญ่ สั่งชานมไข่มุกมาส่งถึงคอนโดและบอกรหัสผ่านประตูหน้าให้ไรเดอร์สำเร็จ!',
      vocabulary: [
        {
          id: 'hsk2_1219',
          hanzi: '密码',
          pinyin: 'mìmǎ',
          display_pinyin: 'mìmǎ',
          pinyin_tone: 'mi4ma3',
          meaning_th: 'รหัสผ่าน',
          meaning_en: 'password / passcode',
          radical: '宀',
          radical_name_th: 'หมวดหลังคาบ้าน (宝盖头)',
          stroke_count: 22,
          mnemonic: 'ความลับที่ซ่อนอยู่ในห้องมิดชิด (密) แทนด้วยตัวเลข (码) = รหัสผ่าน',
          kid_mnemonic: 'ตัวเลขลับสี่หลักที่กดแล้วประตูดัง ติ๊ด-เปิดออก = 密码',
          body_gesture: 'เอานิ้วชี้แตะริมฝีปากทำท่าชู่ววว เป็นความลับ'
        },
        {
          id: 'hsk2_1220',
          hanzi: '楼下',
          pinyin: 'lóuxià',
          display_pinyin: 'lóuxià',
          pinyin_tone: 'lou2xia4',
          meaning_th: 'ชั้นล่าง / ด้านล่างตึก',
          meaning_en: 'downstairs',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 16,
          mnemonic: 'อาคารตึกสูง (楼) ฝั่งด้านล่าง (下) = ชั้นล่าง',
          kid_mnemonic: 'เดินลงบันไดมาชั้นล่างสุด = 楼下',
          body_gesture: 'ชี้นิ้วลงข้างล่างตึก'
        },
        {
          id: 'hsk2_1221',
          hanzi: '单元门',
          pinyin: 'dānyuánmén',
          display_pinyin: 'dānyuánmén',
          pinyin_tone: 'dan1yuan2men2',
          meaning_th: 'ประตูทางเข้าอาคาร / ประตูคีย์การ์ดหน้าตึก',
          meaning_en: 'building entrance door',
          radical: '门',
          radical_name_th: 'หมวดประตู (门字框)',
          stroke_count: 11,
          mnemonic: 'ประตูใหญ่ (门) สำหรับแต่ละยูนิตอาคาร (单元) = ประตูทางเข้าอาคาร',
          kid_mnemonic: 'ประตูกระจกบานใหญ่หน้าตึกคอนโด มีแป้นกดตัวเลข = 单元门',
          body_gesture: 'สองมือกางออกกว้างๆ ทำท่าผลักประตูกระจกบานใหญ่'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงตัวเลข 1 เป็น yāo เมื่อบอกรหัสผ่าน',
        description_th: 'ในการบอกรหัสผ่าน เบอร์โทรศัพท์ หรือเลขห้องในประเทศจีน เลข 1 มักนิยมอ่านออกเสียงว่า yāo (เยา) แทน yī เพื่อไม่ให้สับสนกับเลข 7 (qī)',
        example: '密码是1234 ➔ Mìmǎ shì yāo èr sān sì',
        fun_metaphor: 'เลขหนึ่งแปลงร่างเป็นนกน้อยร้อง "เยา เยา" ให้ฟังชัดเจนไม่มีวันสับสนกับเลขเจ็ด!',
        reassurance: 'ลองพูด yāo èr sān sì ดูสิ คนจีนจะทึ่งว่าคุณรู้เคล็ดลับท้องถิ่นนี้ด้วย!'
      },
      grammar_bite: {
        title: 'สูตรบอกรหัสผ่านประตูหน้าตึก: 单元门的密码是...',
        explanation_th: 'ใช้โครงสร้าง [สถานที่] + 的 + 密码是 + [ตัวเลข] เพื่อบอกรหัสผ่านแก่ผู้ส่งของ',
        patterns: [
          {
            formula: '单元门的密码是 + [รหัสตัวเลข]',
            zh: '单元门的密码是1234。',
            pinyin: 'Dānyuánmén de mìmǎ shì yāo èr sān sì.',
            th: 'รหัสผ่านประตูทางเข้าอาคารคือ 1234',
            en: 'The building entrance code is 1234.'
          },
          {
            formula: '外卖到了，麻烦 + 送上来',
            zh: '外卖到了，麻烦帮忙送上来，谢谢！',
            pinyin: 'Wàimài dào le, máfan bāngmáng sòng shànglai, xièxie!',
            th: 'อาหารมาถึงแล้ว รบกวนช่วยส่งขึ้นมาข้างบนด้วยนะครับ ขอบคุณครับ!',
            en: 'The food has arrived, please help bring it upstairs, thanks!'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'ไรเดอร์ส่งชานม 🛵',
          zh: '您好！您的三杯珍珠奶茶到了！我在公寓楼下，单元门锁着进不去。',
          pinyin: 'Nǐn hǎo! Nín de sān bēi zhēnzhū nǎichá dào le! Wǒ zài gōngyù lóuxià, dānyuánmén suǒzhe jìn bu qù.',
          th: 'สวัสดีครับ! ชานมไข่มุกสามแก้วของคุณมาถึงแล้วครับ! ผมอยู่ชั้นล่างคอนโด ประตูทางเข้าล็อกอยู่เข้าไม่ได้ครับ',
          en: 'Hello! Your three cups of bubble tea are here! I am downstairs, the entrance door is locked.'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '师傅辛苦了！单元门的密码是8866，按井号键确认，坐电梯上8楼。',
          pinyin: 'Shīfu xīnkǔ le! Dānyuánmén de mìmǎ shì bābāliùliù, àn jǐnghàojiàn quèrèn, zuò diàntī shàng bā lóu.',
          th: 'ขอบคุณที่เหนื่อยครับพี่! รหัสประตูหน้าตึกคือ 8866 แล้วกดเครื่องหมายสี่เหลี่ยมยืนยัน ขึ้นลิฟต์มาชั้น 8 ได้เลยครับ',
          en: 'Thanks for your hard work! The entrance code is 8866, press hash key to confirm, take elevator to 8th floor.'
        },
        {
          speaker: 'A',
          speaker_name: 'ไรเดอร์ส่งชานม 🛵',
          zh: '门开了！奶茶给您放在802门口了，请慢用！',
          pinyin: 'Mén kāi le! Nǎichá gěi nín fàngzài bābālíng\'èr ménkǒu le, qǐng mànyòng!',
          th: 'ประตูเปิดแล้วครับ! ชานมวางไว้ให้ที่หน้าห้อง 802 เรียบร้อยแล้ว ขอให้อร่อยนะครับ!',
          en: 'Door opened! Bubble tea is placed at door 802, enjoy your drink!'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '太感谢了！给您五星好评！祝您一路平安！',
          pinyin: 'Tài gǎnxiè le! Gěi nín wǔxīng hǎopíng! Zhù nín yílù píng\'ān!',
          th: 'ขอบคุณมากๆ ครับ! ให้คะแนนห้าดาวแน่นอน ขอให้ขับขี่ปลอดภัยตลอดเส้นทางครับ!',
          en: 'Thank you so much! Giving you a 5-star review! Wish you a safe trip!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อไรเดอร์บอกว่า '单元门锁着进不去' หมายถึงสิ่งใด?",
          options: [
            'ประตูกระจกทางเข้าอาคารชั้นล่างล็อกอยู่ เข้าไม่ได้',
            'ห้องพักของคุณถูกล็อก',
            'ลิฟต์เสียใช้งานไม่ได้',
            'อาหารในกล่องหกเลอะเทอะ'
          ],
          correct_index: 0,
          explanation_th: "'单元门' คือ ประตูทางเข้าอาคาร และ '锁着进不去' คือ ล็อกอยู่เข้าไม่ได้",
          encouragement: 'เข้าใจภาษาพูดของไรเดอร์ได้แม่นยำมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "รหัสผ่านประตูหน้าอาคารคือ 8866"',
          tokens: ['8866', '单元门的', '密码是'],
          correct_sequence: ['单元门的', '密码是', '8866'],
          pinyin: 'Dānyuánmén de mìmǎ shì bābāliùliù',
          meaning_th: 'รหัสผ่านประตูหน้าอาคารคือ 8866',
          explanation_th: 'โครงสร้าง: 单元门的 (ของประตูหน้าอาคาร) + 密码是 (รหัสผ่านคือ) + ตัวเลข (8866)',
          encouragement: 'ต่อบล็อกบอกรหัสผ่านได้เป๊ะปัง!'
        },
        {
          type: 'flash_recall',
          question_th: "ในการบอกรหัสผ่านหรือเบอร์โทรศัพท์ในภาษาจีน นิยมอ่านเลข '1' ว่าอย่างไร?",
          options: [
            'yāo (เยา)',
            'yī (อี)',
            'èr (เอ้อร์)',
            'qī (ชี)'
          ],
          correct_index: 0,
          explanation_th: "เลข 1 ในรหัสหรือเบอร์โทรนิยมอ่านว่า 'yāo' เพื่อป้องกันการสับสนกับเสียง qī (7)",
          encouragement: 'สุดยอดความรู้ลึก! เหมือนเจ้าของภาษาตัวจริง!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '密' ในคำว่า '密码' มีหมวดนำหลังคาบ้าน '宀' สื่อถึงสิ่งใด?",
          options: [
            'สิ่งที่เป็นความลับเก็บซ่อนอยู่ภายในห้องอย่างมิดชิด',
            'การต้อนรับแขกเปิดเผย',
            'แสงสว่างจ้าภายนอก',
            'ถนนหนทางกว้างใหญ่'
          ],
          correct_index: 0,
          explanation_th: "หมวด '宀' (宝盖头) หมายถึง หลังคาหรือภายในบ้าน สื่อถึงการเก็บรักษาความลับไว้ภายในห้อง",
          encouragement: 'เข้าใจลึกซึ้งถึงความหมายเชิงอักษรศาสตร์!'
        }
      ],
      boss_challenge: {
        scenario_th: 'ไรเดอร์ส่งอาหารโทรมาบอกว่ายืนอยู่หน้าคอนโด แต่ประตูทางเข้าชั้นล่างล็อกอยู่ คุณต้องการบอกไรเดอร์ว่า "รหัสผ่านคือ 1234 แล้ววางไว้ที่หน้าห้อง 802 ได้เลย" ควรพูดว่าอย่างไร?',
        options: [
          '师傅，单元门的密码是1234，麻烦拿上来放在802门口就好，非常感谢！ (Shīfu, dānyuánmén de mìmǎ shì yāo èr sān sì, máfan ná shànglai fàngzài bā líng èr ménkǒu jiù hǎo, fēicháng gǎnxiè!)',
          '不要送了，我不要了。 (Bú yào sòng le, wǒ bú yào le.)',
          '请问洗手间在哪儿？ (Qǐngwèn xǐshǒujiān zài nǎr?)',
          '你是中国人还是泰国人？ (Nǐ shì Zhōngguó rén háishi Tàiguó rén?)'
        ],
        correct_index: 0,
        explanation_th: "ประโยค '师傅，单元门的密码是1234，麻烦拿上来放在802门口就好，非常感谢！' ครบถ้วนทั้งรหัสประตู ทิศทาง (拿上来) เลขที่ห้อง และคำขอบคุณอย่างสุภาพ",
        encouragement: 'ยินดีด้วย! คุณพิชิตบอสใหญ่ สั่งชานมไข่มุกมาส่งถึงห้องพักสำเร็จ 100%!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u12_master',
        badge_name: 'เจ้าแห่งวงการเดลิเวอรี่และพัสดุจีน 🏆🛵',
        message_th: 'ยินดีด้วยอย่างยิ่ง! คุณผ่าน Unit 12 สมบูรณ์แบบ สั่งเดลิเวอรี่ คุยกับไรเดอร์ และรับพัสดุในจีนได้อย่างคล่องแคล่วไร้กังวล!',
        xp_reward: 200
      }
    }
  ]
};
