const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'data', 'lessons', 'tier1');

const tier1Units = [
  // UNIT 2: Numbers & Time
  {
    unit_id: "tier1_u02",
    tier: 1,
    unit_number: 2,
    title: {
      zh: "数字、日历与时间",
      th: "ตัวเลข วันที่ & เวลา (Numbers, Calendar & Time)",
      en: "Numbers, Calendar & Time"
    },
    description: "นับเลข 0-10 ท่ามือจีน วันนี้ พรุ่งนี้ กี่โมง และนัดหมายเวลากินข้าวได้อย่างเป็นธรรมชาติ",
    lessons: [
      {
        lesson_id: "t1_u02_l01",
        lesson_number: 1,
        title: { zh: "数字0-10与中国手势", th: "นับเลข 0-10 & มหัศจรรย์ภาษามือจีน", en: "Numbers 0-10 & Chinese Hand Gestures" },
        can_do: { th: "นับเลข 1-10 และทำภาษามือคนจีนด้วยมือเดียวได้คล่องแคล่ว", en: "Count 1-10 and use one-handed Chinese gestures" },
        baby_step_goal: "จำเลข 1-10 และทำท่ายิงปืน 8 (bā) กับโทรศัพท์ 6 (liù) ด้วยมือเดียว!",
        vocabulary: [
          { id: "hsk1_0001", hanzi: "一", pinyin: "yī", pinyin_tone: "yi1", meaning_th: "หนึ่ง", meaning_en: "one", radical: "一", radical_name_th: "หมวดเส้นนอน", stroke_count: 1, kid_mnemonic: "เส้นตรงนอนหนึ่งเส้น = 1", body_gesture: "ชูนิ้วชี้ 1 นิ้ว" },
          { id: "hsk1_0002", hanzi: "二", pinyin: "èr", pinyin_tone: "er4", meaning_th: "สอง", meaning_en: "two", radical: "二", radical_name_th: "หมวดสองเส้น", stroke_count: 2, kid_mnemonic: "เส้นนอนสองเส้นคู่กัน = 2", body_gesture: "ชูนิ้วชี้และนิ้วกลาง (สู้ๆ)" },
          { id: "hsk1_0003", hanzi: "三", pinyin: "sān", pinyin_tone: "san1", meaning_th: "สาม", meaning_en: "three", radical: "一", radical_name_th: "หมวดเส้นนอน", stroke_count: 3, kid_mnemonic: "เส้นนอนสามเส้นเรียงกัน = 3", body_gesture: "ชูสามนิ้ว" },
          { id: "hsk1_0004", hanzi: "四", pinyin: "sì", pinyin_tone: "si4", meaning_th: "สี่", meaning_en: "four", radical: "囗", radical_name_th: "หมวดกล่องล้อม", stroke_count: 5, kid_mnemonic: "กล่องสี่เหลี่ยมมีผ้าม่านสองข้าง = 4", body_gesture: "ชูสี่นิ้วหุบนิ้วโป้ง" },
          { id: "hsk1_0005", hanzi: "五", pinyin: "wǔ", pinyin_tone: "wu3", meaning_th: "ห้า", meaning_en: "five", radical: "二", radical_name_th: "หมวดสองเส้น", stroke_count: 4, kid_mnemonic: "เส้นคดไปมา นับได้ 5 มุม", body_gesture: "แบมือทั้ง 5 นิ้วร่าเริง" },
          { id: "hsk1_0006", hanzi: "六", pinyin: "liù", pinyin_tone: "liu4", meaning_th: "หก", meaning_en: "six", radical: "八", radical_name_th: "หมวดแปด", stroke_count: 4, kid_mnemonic: "คนกางแขนขาเต้นอย่างมีความสุข", body_gesture: "ชูนิ้วโป้งกับนิ้วก้อย (ท่าฮัลโหลโทรศัพท์)" },
          { id: "hsk1_0007", hanzi: "七", pinyin: "qī", pinyin_tone: "qi1", meaning_th: "เจ็ด", meaning_en: "seven", radical: "一", radical_name_th: "หมวดเส้นนอน", stroke_count: 2, kid_mnemonic: "เลข 7 กลับหัวเหมือนจอบขุดดิน", body_gesture: "จีบนิ้วโป้ง นิ้วชี้ นิ้วกลาง รวมกัน" },
          { id: "hsk1_0008", hanzi: "八", pinyin: "bā", pinyin_tone: "ba1", meaning_th: "แปด", meaning_en: "eight", radical: "八", radical_name_th: "หมวดแปด", stroke_count: 2, kid_mnemonic: "หนวดมังกรสองข้างอ้าออก รับความมั่งคั่ง", body_gesture: "กางนิ้วโป้งและนิ้วชี้เป็นรูปปืน (เล็งเป้า 8)" },
          { id: "hsk1_0009", hanzi: "九", pinyin: "jiǔ", pinyin_tone: "jiu3", meaning_th: "เก้า", meaning_en: "nine", radical: "乙", radical_name_th: "หมวดตะขอ", stroke_count: 2, kid_mnemonic: "คนคุกเข่าอธิษฐานขอพรอายุยืนยาว", body_gesture: "งอนิ้วชี้เป็นรูปตะขอเบ็ด" },
          { id: "hsk1_0010", hanzi: "十", pinyin: "shí", pinyin_tone: "shi2", meaning_th: "สิบ", meaning_en: "ten", radical: "十", radical_name_th: "หมวดกากบาท", stroke_count: 2, kid_mnemonic: "เครื่องหมายบวก รวมครบ 10 ประการ", body_gesture: "กำปั้นแน่น หรือทำนิ้วชี้สองข้างไขว้กันเป็นกากบาท" }
        ],
        grammar_bite: {
          title: "สูตรเลขผสม 11 - 99: ง่ายที่สุดในโลก!",
          explanation_th: "ภาษาจีนนับเลขเหมือนคณิตศาสตร์ตรงไปตรงมา: สิบ-เอ็ด (十 + 一 = 十一), ยี่สิบ (二 + 十 = 二十)",
          patterns: [
            { formula: "11 = 十 + 一 (shí-yī)", th: "สิบเอ็ด" },
            { formula: "20 = 二 + 十 (èr-shí)", th: "ยี่สิบ" },
            { formula: "25 = 二 + 十 + 五 (èr-shí-wǔ)", th: "ยี่สิบห้า" }
          ]
        },
        dialogue: [
          { speaker_name: "แพนด้าเป่าเปา 🐼", zh: "你要几个？", pinyin: "Nǐ yào jǐ ge?", th: "เธอเอาผลไม้กี่ลูกจ๊ะ?" },
          { speaker_name: "สมชาย 🧒", zh: "我要八个，谢谢！", pinyin: "Wǒ yào bā ge, xièxie!", th: "ผมเอา 8 ลูกครับ ขอบคุณครับ!" },
          { speaker_name: "แพนด้าเป่าเปา 🐼", zh: "给你八个，再见！", pinyin: "Gěi nǐ bā ge, zàijiàn!", th: "ให้หนู 8 ลูกจ้า บ๊ายบาย!" }
        ],
        quizzes: [
          {
            type: "hand_gesture_match",
            question_th: "คนจีนทำมือเป็นรูป 'ปืน' (กางนิ้วโป้งกับนิ้วชี้) หมายถึงเลขใด?",
            options: ["เลข 2", "เลข 5", "เลข 8 (八 - bā)", "เลข 10"],
            correct_index: 2,
            explanation_th: "นิ้วโป้งกับนิ้วชี้กางออกดูเหมือนตัว '八' (แปด)",
            encouragement: "ยอดเยี่ยมมาก! ภาษามือคนจีนเก่งระดับโปรแล้ว!"
          },
          {
            type: "math_chinese",
            question_th: "เลข 15 ในภาษาจีนเขียนและอ่านอย่างไร?",
            options: ["五十一 (wǔshíyī)", "十五 (shíwǔ)", "一五 (yīwǔ)", "十 (shí)"],
            correct_index: 1,
            explanation_th: "15 = 十 (สิบ) + 五 (ห้า) รวมกันเป็น 十五 (shíwǔ)",
            encouragement: "คิดเลขจีนไวดั่งสายฟ้าฟาด!"
          }
        ],
        boss_challenge: {
          scenario_th: "แม่ค้าผลไม้ในตลาดปักกิ่งถามว่า '几斤？' (เอากี่ชั่ง?) คุณต้องการซื้อ 6 ชั่ง แต่รอบข้างเสียงดังมาก คุณควรทำภาษามือแบบไหนให้แม่ค้าเข้าใจทันที?",
          options: ["ชูนิ้วก้อยนิ้วเดียว", "ทำมือรูปโทรศัพท์ ชูนิ้วโป้งและนิ้วก้อย (เลข 6)", "ชู 6 นิ้วโดยใช้สองมือ", "แบมือ 5 นิ้ว"],
          correct_index: 1,
          explanation_th: "การชูนิ้วโป้งและนิ้วก้อยด้วยมือเดียวคือเลข 6 (liù) สากลของคนจีน!",
          encouragement: "ว้าว! แม่ค้ายิ้มแฉ่งหยิบผลไม้ 6 ชั่งส่งให้ทันที!"
        },
        cheer_trophy: { badge_name: "ปรมาจารย์ตัวเลข & ภาษามือจีน 🔢", xp_reward: 60 }
      }
    ]
  },

  // UNIT 3: Food & Street Bites
  {
    unit_id: "tier1_u03",
    tier: 1,
    unit_number: 3,
    title: {
      zh: "点餐与街头美食",
      th: "สั่งอาหาร & เครื่องดื่ม (Food & Street Bites)",
      en: "Food & Street Bites"
    },
    description: "สั่งบะหมี่ เกี๊ยว ชานมไข่มุก บอกรสชาติ เผ็ด-ไม่เผ็ด และสั่งอาหารแบบไม่เก้อเขิน",
    lessons: [
      {
        lesson_id: "t1_u03_l01",
        lesson_number: 1,
        title: { zh: "我要吃米饭和面条", th: "อยากกินข้าวหรือบะหมี่? สั่งอาหารจานโปรด", en: "Rice or Noodles? Ordering Food" },
        can_do: { th: "ใช้ประโยค '我要...' (ฉันเอา/ฉันจะกิน...) สั่งอาหารและเครื่องดื่มในร้านได้", en: "Order food and drinks using 我要 (Wǒ yào...)" },
        baby_step_goal: "จำคำว่า 吃 (กิน) กับ 喝 (ดื่ม) มีปาก '口' นำหน้าทั้งคู่!",
        vocabulary: [
          { id: "hsk1_0020", hanzi: "吃", pinyin: "chī", pinyin_tone: "chi1", meaning_th: "กิน", meaning_en: "to eat", radical: "口", radical_name_th: "หมวดปาก", stroke_count: 6, kid_mnemonic: "มีปาก (口) อ้ากว้างงับช้อนกินข้าว", body_gesture: "ทำท่าหยิบช้อนตักอาหารเข้าปาก" },
          { id: "hsk1_0021", hanzi: "喝", pinyin: "hē", pinyin_tone: "he1", meaning_th: "ดื่ม", meaning_en: "to drink", radical: "口", radical_name_th: "หมวดปาก", stroke_count: 12, kid_mnemonic: "มีปาก (口) ดื่มน้ำใต้แสงแดด (日)", body_gesture: "ทำมือยกแก้วน้ำขึ้นดื่มชื่นใจ" },
          { id: "hsk1_0022", hanzi: "米饭", pinyin: "mǐfàn", pinyin_tone: "mi3fan4", meaning_th: "ข้าวสวย", meaning_en: "cooked rice", radical: "米", radical_name_th: "หมวดเมล็ดข้าว", stroke_count: 13, kid_mnemonic: "เมล็ดข้าว (米) เอามาหุงเป็นข้าวสวยร้อนๆ", body_gesture: "ถือถ้วยข้าวดมกลิ่นหอม" },
          { id: "hsk1_0023", hanzi: "面条", pinyin: "miàntiáo", pinyin_tone: "mian4tiao2", meaning_th: "บะหมี่, ก๋วยเตี๋ยว", meaning_en: "noodles", radical: "麦 / 木", radical_name_th: "หมวดข้าวสาลี", stroke_count: 16, kid_mnemonic: "เส้นบะหมี่ยาวๆ นุ่มเหนียว", body_gesture: "ทำท่าคีบตะเกียบซู้ดเส้นบะหมี่" },
          { id: "hsk1_0024", hanzi: "水", pinyin: "shuǐ", pinyin_tone: "shui3", meaning_th: "น้ำเปล่า", meaning_en: "water", radical: "水", radical_name_th: "หมวดน้ำ", stroke_count: 4, kid_mnemonic: "สายน้ำไหลผ่านแกนกลาง แตกละอองสองข้าง", body_gesture: "ทำมือพลิ้วไหวเหมือนสายน้ำ" },
          { id: "hsk1_0025", hanzi: "好吃", pinyin: "hǎochī", pinyin_tone: "hao3chi1", meaning_th: "อร่อย", meaning_en: "delicious", radical: "女 / 口", radical_name_th: "ดี + กิน", stroke_count: 12, kid_mnemonic: "ดี (好) + กิน (吃) = กินแล้วดีงาม อร่อยจัง!", body_gesture: "ลูบท้องวนๆ แล้วยกนิ้วโป้งชม" }
        ],
        grammar_bite: {
          title: "สูตรสั่งอาหาร: 我要 + [ชื่ออาหาร]",
          explanation_th: "我要 (Wǒ yào) แปลว่า 'ฉันต้องการ/ฉันเอา...' ใช้ได้กับทุกเมนู ชี้รูปแล้วพูดได้เลย!",
          patterns: [
            { formula: "我要米饭。", pinyin: "Wǒ yào mǐfàn.", th: "ฉันเอาข้าวสวยครับ/ค่ะ" },
            { formula: "我要面条，谢谢！", pinyin: "Wǒ yào miàntiáo, xièxie!", th: "ฉันเอาบะหมี่ครับ ขอบคุณครับ!" }
          ]
        },
        dialogue: [
          { speaker_name: "พนักงานเสิร์ฟ 👨‍🍳", zh: "你好！你要吃什么？", pinyin: "Nǐ hǎo! Nǐ yào chī shénme?", th: "สวัสดีครับ คุณต้องการรับประทานอะไรดีครับ?" },
          { speaker_name: "สมชาย 🧒", zh: "你好！我要面条和水。", pinyin: "Nǐ hǎo! Wǒ yào miàntiáo hé shuǐ.", th: "สวัสดีครับ ผมเอาบะหมี่กับน้ำเปล่าครับ" },
          { speaker_name: "พนักงานเสิร์ฟ 👨‍🍳", zh: "好的，请稍等！", pinyin: "Hǎo de, qǐng shāoděng!", th: "ได้เลยครับ รอสักครู่นะครับ!" }
        ],
        quizzes: [
          {
            type: "vocab_match",
            question_th: "หากต้องการบอกว่าอาหารจานนี้ 'อร่อยมาก' ต้องพูดคำว่าอะไร?",
            options: ["好 (hǎo)", "好吃 (hǎochī)", "喝 (hē)", "不 (bù)"],
            correct_index: 1,
            explanation_th: "好吃 (hǎochī) แปลว่า 'อร่อย' (ดีที่จะกิน)",
            encouragement: "เก่งมาก! อร่อยจนต้องขอเบิ้ลเลย!"
          },
          {
            type: "sentence_scramble",
            question_th: "เรียงประโยคสั่งน้ำเปล่า: (ฉันเอาน้ำเปล่า)",
            tokens: ["水", "我要"],
            correct_sequence: ["我要", "水"],
            pinyin: "Wǒ yào shuǐ.",
            meaning_th: "ฉันเอาน้ำเปล่า"
          }
        ],
        boss_challenge: {
          scenario_th: "คุณเดินเข้าร้านอาหารในเฉิงตู พนักงานนำบะหมี่มาเสิร์ฟ กลิ่นหอมฟุ้ง คุณตักกินคำแรกแล้วอร่อยถูกใจมาก อยากเอ่ยปากชมพ่อครัว จะพูดว่าอย่างไร?",
          options: ["再见！", "不好！", "很好吃！谢谢！ (Hěn hǎochī! Xièxie!)", "不客气"],
          correct_index: 2,
          explanation_th: "กล่าวชมว่า '很好吃！谢谢！' (อร่อยมากครับ ขอบคุณครับ) พ่อครัวจะยิ้มแก้มปริ!",
          encouragement: "เยี่ยมยอด! พ่อครัวแถมเกี๊ยวให้คุณชิมฟรีอีกจานเลย!"
        },
        cheer_trophy: { badge_name: "นักชิมสตรีทฟู้ดตัวยง 🥟🍜", xp_reward: 60 }
      }
    ]
  },

  // UNIT 4: Shopping & Bargaining
  {
    unit_id: "tier1_u04",
    tier: 1,
    unit_number: 4,
    title: {
      zh: "购物与砍价技巧",
      th: "ช็อปปิ้ง & ถามราคา (Shopping & Bargaining)",
      en: "Shopping & Bargaining"
    },
    description: "อันนี้เท่าไหร่? แพงเกินไป ลดได้ไหม? ซื้อของฝากสนุกทุกตลาด",
    lessons: [
      {
        lesson_id: "t1_u04_l01",
        lesson_number: 1,
        title: { zh: "这个多少钱？", th: "อันนี้เท่าไหร่? ถามราคาคล่องปาก", en: "How Much is This?" },
        can_do: { th: "ชี้สิ่งของแล้วถามราคา '这个多少钱？' ได้อย่างมั่นใจ", en: "Ask the price of items using 这个多少钱？" },
        baby_step_goal: "จำสูตรชี้ของ: 这个 (อันนี้) + 多少钱 (เท่าไหร่)",
        vocabulary: [
          { id: "hsk1_0030", hanzi: "这 / 这个", pinyin: "zhè / zhège", pinyin_tone: "zhe4 / zhe4ge5", meaning_th: "นี้ / อันนี้", meaning_en: "this / this one", radical: "辶", radical_name_th: "หมวดการเดิน", stroke_count: 7, kid_mnemonic: "เดิน (辶) มาชี้สิ่งนี้ตรงหน้า", body_gesture: "ใช้นิ้วชี้จิ้มลงไปใกล้ๆ ตัว" },
          { id: "hsk1_0031", hanzi: "那 / 那个", pinyin: "nà / nàge", pinyin_tone: "na4 / na4ge5", meaning_th: "นั้น / อันนั้น", meaning_en: "that / that one", radical: "阝", radical_name_th: "หมวดหูขวา", stroke_count: 6, kid_mnemonic: "ยืนมองไกลๆ ชี้อันนั้นอยู่ตรงโน้น", body_gesture: "ชี้นิ้วไปไกลๆ ข้างหน้า" },
          { id: "hsk1_0032", hanzi: "多少", pinyin: "duōshao", pinyin_tone: "duo1shao5", meaning_th: "เท่าไหร่ (มากหรือน้อย)", meaning_en: "how much / how many", radical: "夕 / 小", radical_name_th: "มาก + น้อย", stroke_count: 10, kid_mnemonic: "มาก (多) + น้อย (少) = เท่าไหร่กันนะ?", body_gesture: "หงายสองมือขึ้นทำท่าชั่งน้ำหนัก" },
          { id: "hsk1_0033", hanzi: "钱", pinyin: "qián", pinyin_tone: "qian2", meaning_th: "เงิน", meaning_en: "money", radical: "钅", radical_name_th: "หมวดโลหะทอง", stroke_count: 10, kid_mnemonic: "โลหะมีค่า (钅) = เหรียญเงินทอง", body_gesture: "ถูกปลายนิ้วโป้งกับนิ้วชี้ (ท่านับตังค์)" },
          { id: "hsk1_0034", hanzi: "块", pinyin: "kuài", pinyin_tone: "kuai4", meaning_th: "หยวน (ภาษาพูด)", meaning_en: "yuan / kuai (spoken)", radical: "土", radical_name_th: "หมวดดิน", stroke_count: 7, kid_mnemonic: "ก้อนเงินดินเผาสมัยก่อน = 1 ก้อน (1 หยวน)", body_gesture: "กำมือเป็นก้อนสี่เหลี่ยม" }
        ],
        grammar_bite: {
          title: "สูตรถามราคา: 这个 / 那个 + 多少钱？",
          explanation_th: "ชี้ของที่อยากได้ แล้วพูดว่า 多少钱 (ตัวเส่าเฉียน?) แม่ค้าจะบอกราคาเป็นตัวเลข + 块 (ไขว้)",
          patterns: [
            { formula: "这个多少钱？", pinyin: "Zhè ge duōshao qián?", th: "อันนี้เท่าไหร่ครับ/ค่ะ?" },
            { formula: "五块。 / 十块。", pinyin: "Wǔ kuài. / Shí kuài.", th: "5 หยวน / 10 หยวน" }
          ]
        },
        dialogue: [
          { speaker_name: "สมชาย 🧒", zh: "你好！这个多少钱？", pinyin: "Nǐ hǎo! Zhè ge duōshao qián?", th: "สวัสดีครับ อันนี้ราคาเท่าไหร่ครับ?" },
          { speaker_name: "แม่ค้า 👩‍💼", zh: "你好！这个十块。", pinyin: "Nǐ hǎo! Zhè ge shí kuài.", th: "สวัสดีจ้า อันนี้ 10 หยวนจ้ะ" },
          { speaker_name: "สมชาย 🧒", zh: "我要这个，谢谢！", pinyin: "Wǒ yào zhè ge, xièxie!", th: "ผมเอาอันนี้ครับ ขอบคุณครับ!" }
        ],
        quizzes: [
          {
            type: "flash_recall",
            question_th: "ประโยค '这个多少钱？' แปลว่าอะไร?",
            options: ["อันนี้กินได้ไหม?", "อันนี้ราคาเท่าไหร่?", "อันนี้อยู่ที่ไหน?", "อันนี้ของใคร?"],
            correct_index: 1,
            explanation_th: "这个 (อันนี้) + 多少钱 (ราคาเท่าไหร่)",
            encouragement: "ถูกต้อง! ถามราคาแม่นยำ เตรียมช็อปปิ้งได้เลย!"
          }
        ],
        boss_challenge: {
          scenario_th: "คุณเห็นพวงกุญแจแพนด้าน่ารักในร้านของฝาก อยากถามราคาคนขาย ควรพูดอย่างไร?",
          options: ["再见！", "你是谁？", "这个多少钱？ (Zhè ge duōshao qián?)", "很好吃！"],
          correct_index: 2,
          explanation_th: "พูดว่า '这个多少钱？' คนขายจะหยิบเครื่องคิดเลขหรือกดราคาให้ดูทันที!",
          encouragement: "ยอดเยี่ยม! คุณได้พวงกุญแจแพนด้าในราคามิตรภาพ!"
        },
        cheer_trophy: { badge_name: "นักช็อปผู้ปราดเปรื่อง 🛍️🏷️", xp_reward: 60 }
      }
    ]
  },

  // UNIT 5: Directions & Transit
  {
    unit_id: "tier1_u05",
    tier: 1,
    unit_number: 5,
    title: {
      zh: "问路与市内交通",
      th: "การเดินทาง & ทิศทาง (Directions & Transit)",
      en: "Directions & Transit"
    },
    description: "อยู่ที่ไหน เลี้ยวซ้าย เลี้ยวขวา นั่งรถไฟใต้ดิน และบอกคนขับแท็กซี่อย่างมั่นใจ",
    lessons: [
      {
        lesson_id: "t1_u05_l01",
        lesson_number: 1,
        title: { zh: "洗手间在哪里？", th: "ห้องน้ำอยู่ที่ไหน? ประโยคถามทางรอดชีวิต", en: "Where is the Restroom?" },
        can_do: { th: "ถามตำแหน่งสถานที่สำคัญด้วยสูตร '[สถานที่] + 在哪里？' ได้", en: "Ask locations using [Place] + zài nǎlǐ?" },
        baby_step_goal: "ท่องสูตร: อยากไปไหน ให้พูดชื่อที่นั้น แล้วตามด้วย 在哪儿 (ไจ้หน่าร์?)",
        vocabulary: [
          { id: "hsk1_0040", hanzi: "在", pinyin: "zài", pinyin_tone: "zai4", meaning_th: "อยู่, ที่", meaning_en: "at / in / located at", radical: "土", radical_name_th: "หมวดดิน", stroke_count: 6, kid_mnemonic: "คนยืนอยู่บนผืนดิน (土) = อยู่ที่นี่", body_gesture: "ชี้นิ้วลงพื้นหนักแน่น" },
          { id: "hsk1_0041", hanzi: "哪儿 / 哪里", pinyin: "nǎr / nǎlǐ", pinyin_tone: "nar3 / na3li3", meaning_th: "ที่ไหน", meaning_en: "where", radical: "口", radical_name_th: "หมวดปาก", stroke_count: 9, kid_mnemonic: "อ้าปาก (口) ร้องถามหาว่าอยู่ที่ไหนนะ?", body_gesture: "เอามือป้องหน้ามองหาซ้ายขวา" },
          { id: "hsk1_0042", hanzi: "这儿 / 那儿", pinyin: "zhèr / nàr", pinyin_tone: "zher4 / nar4", meaning_th: "ที่นี่ / ที่นั่น", meaning_en: "here / there", radical: "辶", radical_name_th: "หมวดการเดิน", stroke_count: 9, kid_mnemonic: "ที่นี่ใกล้ๆ / ที่นั่นไกลออกไป", body_gesture: "ชี้ใกล้ตัว (ที่นี่) และชี้ไกลตัว (ที่นั่น)" },
          { id: "hsk1_0043", hanzi: "去", pinyin: "qù", pinyin_tone: "qu4", meaning_th: "ไป", meaning_en: "to go", radical: "厶", radical_name_th: "หมวดส่วนตัว", stroke_count: 5, kid_mnemonic: "ก้าวเท้าออกจากดินแดนเดิม มุ่งหน้าไปข้างหน้า", body_gesture: "ก้าวขาไปข้างหน้าหนึ่งก้าว" },
          { id: "hsk1_0044", hanzi: "车站", pinyin: "chēzhàn", pinyin_tone: "che1zhan4", meaning_th: "สถานีรถ, ป้ายรถเมล์", meaning_en: "station / stop", radical: "车 / 立", radical_name_th: "รถ + ยืน", stroke_count: 9, kid_mnemonic: "รถ (车) มายืนจอดนิ่ง (站) = ป้ายสถานีรถ", body_gesture: "ทำมือเหมือนคนจับห่วงบนรถเมล์" }
        ],
        grammar_bite: {
          title: "สูตรถามหาตำแหน่ง: [สถานที่] + 在哪儿？",
          explanation_th: "แค่วางชื่อสถานที่ไว้ข้างหน้า แล้วตามด้วย 在哪儿 (zài nǎr?) จะแปลว่า '...อยู่ที่ไหน?' ทันที!",
          patterns: [
            { formula: "车站 在哪儿？", pinyin: "Chēzhàn zài nǎr?", th: "สถานีรถอยู่ที่ไหนครับ?" },
            { formula: "洗手间 在哪儿？", pinyin: "Xǐshǒujiān zài nǎr?", th: "ห้องน้ำอยู่ที่ไหนครับ?" }
          ]
        },
        dialogue: [
          { speaker_name: "สมชาย 🧒", zh: "请问，车站在哪儿？", pinyin: "Qǐngwèn, chēzhàn zài nǎr?", th: "ขอถามหน่อยครับ สถานีรถอยู่ที่ไหนครับ?" },
          { speaker_name: "พลเมืองใจดี 👨", zh: "车站在那儿！", pinyin: "Chēzhàn zài nàr!", th: "สถานีรถอยู่ตรงโน้นครับ!" },
          { speaker_name: "สมชาย 🧒", zh: "谢谢您！再见！", pinyin: "Xièxie nín! Zàijiàn!", th: "ขอบคุณมากครับ ลาก่อนครับ!" }
        ],
        quizzes: [
          {
            type: "sentence_scramble",
            question_th: "เรียงประโยคถามว่า 'สถานีรถอยู่ที่ไหน?':",
            tokens: ["在哪儿？", "车站"],
            correct_sequence: ["车站", "在哪儿？"],
            pinyin: "Chēzhàn zài nǎr?",
            meaning_th: "สถานีรถอยู่ที่ไหน?"
          }
        ],
        boss_challenge: {
          scenario_th: "คุณเพิ่งลงจากรถไฟใต้ดินที่สถานี People's Square ต้องการหาทางไปสถานีรถเมล์เพื่อต่อรถ จะถามเจ้าหน้าที่รักษาความปลอดภัยอย่างไร?",
          options: ["你好，这个多少钱？", "你好，车站在哪儿？ (Nǐ hǎo, chēzhàn zài nǎr?)", "我要吃面条！", "再见！"],
          correct_index: 1,
          explanation_th: "พูดว่า '你好，车站在哪儿？' เจ้าหน้าที่จะชี้ทางไปป้ายรถเมล์ให้คุณทันที!",
          encouragement: "เก่งมาก! เดินทางในเมืองจีนได้อย่างคล่องแคล่วไม่มีหลงทาง!"
        },
        cheer_trophy: { badge_name: "เข็มทิศทองคำนำทาง 🧭🚇", xp_reward: 60 }
      }
    ]
  },

  // UNIT 6: Family & Friends
  {
    unit_id: "tier1_u06",
    tier: 1,
    unit_number: 6,
    title: {
      zh: "家人与朋友圈子",
      th: "ครอบครัว & คนรอบตัว (Family & Friends)",
      en: "Family & Friends"
    },
    description: "แนะนำคุณพ่อ คุณแม่ พี่น้อง เพื่อนสนิท เล่าเรื่องครอบครัวให้คนจีนฟังอย่างอบอุ่น",
    lessons: [
      {
        lesson_id: "t1_u06_l01",
        lesson_number: 1,
        title: { zh: "这是我的爸爸妈妈", th: "นี่คือคุณพ่อคุณแม่ของฉัน", en: "This is My Dad and Mom" },
        can_do: { th: "แนะนำสมาชิกในครอบครัวและเพื่อนด้วยคำว่า '这是我的...' (นี่คือ...ของฉัน) ได้", en: "Introduce family members and friends using 这是我的..." },
        baby_step_goal: "จำคำเรียกพ่อแม่และพี่น้อง: 爸爸 (ป้าปะ), 妈妈 (มามะ), 朋友 (เผิงโหย่ว)",
        vocabulary: [
          { id: "hsk1_0050", hanzi: "爸爸", pinyin: "bàba", pinyin_tone: "ba4ba5", meaning_th: "พ่อ, คุณพ่อ", meaning_en: "father / dad", radical: "父", radical_name_th: "หมวดพ่อ", stroke_count: 8, kid_mnemonic: "คุณพ่อไว้หนวดเขี้ยวใจดี", body_gesture: "ทำท่าลูบหนวดเท่ๆ" },
          { id: "hsk1_0051", hanzi: "妈妈", pinyin: "māma", pinyin_tone: "ma1ma5", meaning_th: "แม่, คุณแม่", meaning_en: "mother / mom", radical: "女", radical_name_th: "หมวดผู้หญิง", stroke_count: 12, kid_mnemonic: "ผู้หญิง (女) ที่เลี้ยงดูเราอย่างทะนุถนอม (马)", body_gesture: "ทำสองมือโอบกอดอบอุ่น" },
          { id: "hsk1_0052", hanzi: "朋友", pinyin: "péngyou", pinyin_tone: "peng2you5", meaning_th: "เพื่อน", meaning_en: "friend", radical: "月 / 又", radical_name_th: "ดวงจันทร์คู่", stroke_count: 12, kid_mnemonic: "พระจันทร์สองดวงเคียงคู่กัน = เพื่อนแท้ไม่ทิ้งกัน", body_gesture: "กอดคอเพื่อนข้างๆ ยิ้มแย้ม" },
          { id: "hsk1_0053", hanzi: "的", pinyin: "de", pinyin_tone: "de5", meaning_th: "ของ (แสดงความเป็นเจ้าของ)", meaning_en: "of / possessive particle", radical: "白", radical_name_th: "หมวดสีขาว", stroke_count: 8, kid_mnemonic: "เป้าหมายสีขาวที่ฉันเป็นเจ้าของ", body_gesture: "เอามือทาบที่อก 'ของฉัน'" },
          { id: "hsk1_0054", hanzi: "高兴", pinyin: "gāoxìng", pinyin_tone: "gao1xing4", meaning_th: "ดีใจ, ยินดี", meaning_en: "happy / glad", radical: "高", radical_name_th: "หมวดสูง", stroke_count: 16, kid_mnemonic: "หอคอยสูง หัวเราะเบิกบานใจ", body_gesture: "กระโดดชูมือดีใจ" }
        ],
        grammar_bite: {
          title: "สูตรแสดงความเป็นเจ้าของ: [คน] + 的 + [ของ]",
          explanation_th: "คำว่า 的 (de) เทียบเท่าคำว่า 'ของ' ในภาษาไทย: 我的 (ของฉัน), 你的 (ของเธอ)",
          patterns: [
            { formula: "我的朋友", pinyin: "wǒ de péngyou", th: "เพื่อนของฉัน" },
            { formula: "认识你很高兴！", pinyin: "Rènshi nǐ hěn gāoxìng!", th: "ยินดีที่ได้รู้จักเธอนะ!" }
          ]
        },
        dialogue: [
          { speaker_name: "สมชาย 🧒", zh: "你好！这是我的朋友，王力。", pinyin: "Nǐ hǎo! Zhè shì wǒ de péngyou, Wáng Lì.", th: "สวัสดีครับ นี่คือเพื่อนของผม ชื่อหวังลี่ครับ" },
          { speaker_name: "หวังลี่ 👦", zh: "你好！认识你很高兴！", pinyin: "Nǐ hǎo! Rènshi nǐ hěn gāoxìng!", th: "สวัสดีครับ ยินดีที่ได้รู้จักนะครับ!" },
          { speaker_name: "แพนด้าเป่าเปา 🐼", zh: "我也很高兴！", pinyin: "Wǒ yě hěn gāoxìng!", th: "ฉันก็ดีใจมากๆ เช่นกันจ้า!" }
        ],
        quizzes: [
          {
            type: "vocab_match",
            question_th: "คำว่า '我的妈妈' แปลว่าอะไร?",
            options: ["เพื่อนของฉัน", "คุณแม่ของฉัน", "คุณพ่อของฉัน", "คุณครูของฉัน"],
            correct_index: 1,
            explanation_th: "我 (ฉัน) + 的 (ของ) + 妈妈 (แม่) = คุณแม่ของฉัน",
            encouragement: "ยอดเยี่ยมมาก! อบอุ่นหัวใจที่สุดเลย!"
          }
        ],
        boss_challenge: {
          scenario_th: "ในงานปาร์ตี้ต้อนรับ คุณได้พบกับโฮสต์แฟมิลี่ชาวจีนเป็นครั้งแรก เขาจับมือคุณ คุณควรพูดประโยคแสดงความยินดีอย่างไร?",
          options: ["对不起！", "认识你很高兴！ (Rènshi nǐ hěn gāoxìng!)", "这个多少钱？", "不要！"],
          correct_index: 1,
          explanation_th: "พูดว่า '认识你很高兴！' (ยินดีที่ได้รู้จักครับ) เป็นการเปิดมิตรภาพที่สวยงามที่สุด!",
          encouragement: "เยี่ยมยอด! โฮสต์ชาวจีนยิ้มกว้างและต้อนรับคุณเข้าบ้านอย่างอบอุ่น!"
        },
        cheer_trophy: { badge_name: "ทูตมิตรภาพอบอุ่นใจ 👨‍👩‍👧‍👦💖", xp_reward: 60 }
      }
    ]
  },

  // UNIT 7: Daily Routines & Free Time
  {
    unit_id: "tier1_u07",
    tier: 1,
    unit_number: 7,
    title: {
      zh: "日常作息与休闲",
      th: "กิจวัตรประจำวัน & งานอดิเรก (Daily Life & Free Time)",
      en: "Daily Life & Free Time"
    },
    description: "ตื่นนอน ทำงาน ดูซีรีส์ เล่นโทรศัพท์ และชวนเพื่อนไปเที่ยววันหยุดสุดสัปดาห์",
    lessons: [
      {
        lesson_id: "t1_u07_l01",
        lesson_number: 1,
        title: { zh: "我喜欢看电影和听音乐", th: "ฉันชอบดูหนังและฟังเพลงยามว่าง", en: "I Like Watching Movies and Listening to Music" },
        can_do: { th: "บอกสิ่งที่เราชอบทำในเวลาว่างด้วยคำว่า '我喜欢...' (ฉันชอบ...) ได้", en: "Express personal hobbies using 我喜欢..." },
        baby_step_goal: "จำคำว่า 喜欢 (xǐhuan - ชอบ) แล้วตามด้วยสิ่งที่เราชอบทำ!",
        vocabulary: [
          { id: "hsk1_0060", hanzi: "喜欢", pinyin: "xǐhuan", pinyin_tone: "xi3huan5", meaning_th: "ชอบ", meaning_en: "to like", radical: "口 / 欠", radical_name_th: "สุขใจ + ปาก", stroke_count: 18, kid_mnemonic: "หัวเราะมีความสุขกับสิ่งที่ถูกใจ", body_gesture: "เอามือทาบอกทำตาวิ้งๆ" },
          { id: "hsk1_0061", hanzi: "看", pinyin: "kàn", pinyin_tone: "kan4", meaning_th: "ดู, มอง, อ่าน", meaning_en: "to look / to watch / to read", radical: "目", radical_name_th: "หมวดตา", stroke_count: 9, kid_mnemonic: "เอามือ (手) ป้องเหนือตา (目) มองดูระยะไกล", body_gesture: "เอามือป้องคิ้วมองไปไกลๆ" },
          { id: "hsk1_0062", hanzi: "电影", pinyin: "diànyǐng", pinyin_tone: "dian4ying3", meaning_th: "ภาพยนตร์, หนัง", meaning_en: "movie / film", radical: "电 / 彡", radical_name_th: "ไฟฟ้า + เงา", stroke_count: 20, kid_mnemonic: "ไฟฟ้า (电) ฉายเงา (影) บนจอผ้าใบ = ภาพยนตร์", body_gesture: "ทำท่าถ่ายกล้องหนังแอ็กชัน" },
          { id: "hsk1_0063", hanzi: "睡觉", pinyin: "shuìjiào", pinyin_tone: "shui4jiao4", meaning_th: "นอนหลับ", meaning_en: "to sleep", radical: "目", radical_name_th: "หมวดตา", stroke_count: 18, kid_mnemonic: "หลับตา (目) พักผ่อนลงบนหมอนนุ่ม", body_gesture: "เอาสองมือประกบแก้มเอียงคอนอนหลับ" }
        ],
        grammar_bite: {
          title: "สูตรบอกความชอบ: 我喜欢 + [กิจกรรม]",
          explanation_th: "พูดคำว่า 我喜欢 (Wǒ xǐhuan) แล้วตามด้วยคำกริยา เช่น 看电影 (ดูหนัง)",
          patterns: [
            { formula: "我喜欢看电影。", pinyin: "Wǒ xǐhuan kàn diànyǐng.", th: "ฉันชอบดูหนัง" },
            { formula: "我不喜欢睡觉。", pinyin: "Wǒ bù xǐhuan shuìjiào.", th: "ฉันไม่ชอบนอนกลางวัน" }
          ]
        },
        dialogue: [
          { speaker_name: "หวังลี่ 👦", zh: "你周末喜欢做什么？", pinyin: "Nǐ zhōumò xǐhuan zuò shénme?", th: "วันหยุดสุดสัปดาห์เธอชอบทำอะไรเหรอ?" },
          { speaker_name: "สมชาย 🧒", zh: "我喜欢看电影，你呢？", pinyin: "Wǒ xǐhuan kàn diànyǐng, nǐ ne?", th: "ฉันชอบดูหนัง แล้วเธอล่ะ?" },
          { speaker_name: "หวังลี่ 👦", zh: "我也喜欢看电影！我们一起去吧！", pinyin: "Wǒ yě xǐhuan kàn diànyǐng! Wǒmen yìqǐ qù ba!", th: "ฉันก็ชอบดูหนังเหมือนกัน! พวกเราไปด้วยกันเถอะ!" }
        ],
        quizzes: [
          {
            type: "vocab_match",
            question_th: "คำว่า '看电影' แปลว่าอะไร?",
            options: ["นอนหลับ", "ดูภาพยนตร์", "กินข้าว", "ฟังเพลง"],
            correct_index: 1,
            explanation_th: "看 (ดู) + 电影 (ภาพยนตร์) = ดูหนัง",
            encouragement: "ถูกต้อง! ซื้อป๊อปคอร์นรอชมหนังได้เลย!"
          }
        ],
        boss_challenge: {
          scenario_th: "เพื่อนคนจีนถามคุณว่า '你喜欢中国电影吗？' (เธอชอบหนังจีนไหม?) คุณชอบมาก อยากตอบตกลงอย่างกระตือรือร้น ควรตอบอย่างไร?",
          options: ["不喜欢！", "我不知道。", "我很喜欢！ (Wǒ hěn xǐhuan!)", "再见！"],
          correct_index: 2,
          explanation_th: "ตอบว่า '我很喜欢！' (ฉันชอบมากเลย!) เพื่อนจะชวนคุยเรื่องซีรีส์จีนอย่างสนุกสนาน!",
          encouragement: "สุดยอดมาก! แลกเปลี่ยนความชอบกับเพื่อนคนจีนได้อย่างสนิทสนม!"
        },
        cheer_trophy: { badge_name: "คอหนังและผู้รักอิสระ 🎬🍿", xp_reward: 60 }
      }
    ]
  },

  // UNIT 8: Weather & Seasons
  {
    unit_id: "tier1_u08",
    tier: 1,
    unit_number: 8,
    title: {
      zh: "天气与四季变换",
      th: "สภาพอากาศ & ฤดูกาล (Weather & Seasons)",
      en: "Weather & Seasons"
    },
    description: "วันนี้ร้อนหรือหนาว? ฝนตกหรือหิมะตก ชวนคุยเรื่องสภาพอากาศและเตรียมเสื้อผ้าไปเที่ยวจีน",
    lessons: [
      {
        lesson_id: "t1_u08_l01",
        lesson_number: 1,
        title: { zh: "今天天气怎么样？", th: "วันนี้อากาศเป็นอย่างไรบ้าง?", en: "How is the Weather Today?" },
        can_do: { th: "ถามและตอบเกี่ยวกับสภาพอากาศ ร้อน (热) หรือหนาว (冷) ได้", en: "Ask and describe the weather using 热 (hot) and 冷 (cold)" },
        baby_step_goal: "จำคำตรงข้าม: 热 (rè - ร้อน มี 4 จุดไฟ 灬) ปะทะ 冷 (lěng - หนาว มีน้ำแข็งสองหยด 冫)",
        vocabulary: [
          { id: "hsk1_0070", hanzi: "天气", pinyin: "tiānqì", pinyin_tone: "tian1qi4", meaning_th: "สภาพอากาศ", meaning_en: "weather", radical: "大 / 气", radical_name_th: "ท้องฟ้า + ลมหายใจ", stroke_count: 8, kid_mnemonic: "ท้องฟ้า (天) พ่นไอน้ำและลม (气) ออกมา = อากาศ", body_gesture: "กางมือมองขึ้นไปบนฟ้า" },
          { id: "hsk1_0071", hanzi: "怎么样", pinyin: "zěnmeyàng", pinyin_tone: "zen3me5yang4", meaning_th: "เป็นอย่างไรบ้าง", meaning_en: "how is it? / how about?", radical: "心 / 木", radical_name_th: "อย่างไร + แบบอย่าง", stroke_count: 22, kid_mnemonic: "ทำหน้าสงสัยถามไถ่ว่าเป็นอย่างไรบ้าง", body_gesture: "ยักไหล่ผายมือสองข้าง" },
          { id: "hsk1_0072", hanzi: "热", pinyin: "rè", pinyin_tone: "re4", meaning_th: "ร้อน", meaning_en: "hot", radical: "灬", radical_name_th: "หมวดไฟสี่จุด", stroke_count: 10, kid_mnemonic: "ข้างล่างมีกองไฟ 4 จุด (灬) ร้อนจังเลย!", body_gesture: "เอามือพัดวีหน้า เหงื่อตก" },
          { id: "hsk1_0073", hanzi: "冷", pinyin: "lěng", pinyin_tone: "leng3", meaning_th: "หนาว, เย็น", meaning_en: "cold", radical: "冫", radical_name_th: "หมวดน้ำแข็งสองหยด", stroke_count: 7, kid_mnemonic: "มีน้ำแข็งสองหยด (冫) หนาวจนตัวสั่น", body_gesture: "กอดอกลูบแขนสั่น บรึ๋ยยย" }
        ],
        grammar_bite: {
          title: "สูตรถามสภาพอากาศ: [เวลา/สถานที่] + 天气怎么样？",
          explanation_th: "ถามว่าอากาศวันนี้เป็นอย่างไร: 今天天气怎么样？ ตอบง่ายๆ: 很热 (ร้อนมาก) หรือ 很冷 (หนาวมาก)",
          patterns: [
            { formula: "今天天气怎么样？", pinyin: "Jīntiān tiānqì zěnmeyàng?", th: "วันนี้อากาศเป็นอย่างไรบ้าง?" },
            { formula: "今天很冷！ / 今天很热！", pinyin: "Jīntiān hěn lěng! / Jīntiān hěn rè!", th: "วันนี้หนาวมาก! / วันนี้ร้อนมาก!" }
          ]
        },
        dialogue: [
          { speaker_name: "สมชาย 🧒", zh: "今天北京天气怎么样？", pinyin: "Jīntiān Běijīng tiānqì zěnmeyàng?", th: "วันนี้อากาศที่ปักกิ่งเป็นอย่างไรบ้างครับ?" },
          { speaker_name: "แพนด้าเป่าเปา 🐼", zh: "今天很冷，下雪了！", pinyin: "Jīntiān hěn lěng, xiàxuě le!", th: "วันนี้หนาวมาก หิมะตกแล้วจ้า!" },
          { speaker_name: "สมชาย 🧒", zh: "太好了！我要看雪！", pinyin: "Tài hǎo le! Wǒ yào kàn xuě!", th: "สุดยอดเลย! ผมอยากเห็นหิมะ!" }
        ],
        quizzes: [
          {
            type: "vocab_match",
            question_th: "ตัวอักษร '热' (ร้อน) มีส่วนประกอบของสิ่งใดอยู่ข้างใต้?",
            options: ["สายน้ำ (氵)", "กองไฟสี่จุด (灬)", "ต้นไม้ (木)", "ก้อนดิน (土)"],
            correct_index: 1,
            explanation_th: "มีกองไฟ 4 จุด (灬) อยู่ข้างใต้ บ่งบอกถึงความร้อนระอุ",
            encouragement: "ตาไวมาก! จำสัญลักษณ์กองไฟได้แม่นยำ!"
          }
        ],
        boss_challenge: {
          scenario_th: "คุณกำลังจัดกระเป๋าจะบินไปเที่ยวเมืองฮาร์บินในฤดูหนาว เพื่อนโทรมาบอกว่า '哈尔滨今天非常冷！' (ฮาร์บินวันนี้หนาวสุดๆ!) คุณควรเตรียมเสื้อผ้าแบบไหน?",
          options: ["เสื้อยืดแขนสั้นและกางเกงขาสั้น", "เสื้อโค้ทหนากันหนาว ถุงมือ และหมวกไหมพรม", "ชุดว่ายน้ำ", "รองเท้าแตะ"],
          correct_index: 1,
          explanation_th: "เพราะ '冷' แปลว่าหนาว ต้องเตรียมเสื้อโค้ทและถุงมือให้อบอุ่น!",
          encouragement: "เตรียมตัวพร้อมลุยหิมะฮาร์บินได้อย่างอบอุ่นปลอดภัย!"
        },
        cheer_trophy: { badge_name: "นักพยากรณ์อากาศรอบรู้ 🌤️❄️", xp_reward: 60 }
      }
    ]
  },

  // UNIT 9: Health & Body
  {
    unit_id: "tier1_u09",
    tier: 1,
    unit_number: 9,
    title: {
      zh: "身体不适与就医",
      th: "ร่างกาย สุขภาพ & ไม่สบาย (Health & Body)",
      en: "Health & Body"
    },
    description: "ปวดหัว ไม่สบาย เป็นไข้ หาหมอ ซื้อยาแก้ปวดที่ร้านขายยาในเซี่ยงไฮ้ รอดปลอดภัยเมื่อป่วย",
    lessons: [
      {
        lesson_id: "t1_u09_l01",
        lesson_number: 1,
        title: { zh: "我不舒服，头疼", th: "ฉันรู้สึกไม่ค่อยสบาย ปวดหัวจังเลย", en: "I Don't Feel Well, I Have a Headache" },
        can_do: { th: "บอกอาการเจ็บป่วยพื้นฐาน เช่น '我不舒服' (ฉันไม่สบาย) และ '头疼' (ปวดหัว) ได้", en: "Express basic sickness symptoms like headache and discomfort" },
        baby_step_goal: "จำคำว่า 疼 (téng - ปวด/เจ็บ) ชี้ไปที่อวัยวะไหน แปลว่าปวดตรงนั้น!",
        vocabulary: [
          { id: "hsk1_0080", hanzi: "头", pinyin: "tóu", pinyin_tone: "tou2", meaning_th: "ศีรษะ, หัว", meaning_en: "head", radical: "大", radical_name_th: "หมวดใหญ่", stroke_count: 5, kid_mnemonic: "มีจุดสองจุดอยู่บนหัวเหมือนมวยผม", body_gesture: "เอามือสองข้างกุมหัว" },
          { id: "hsk1_0081", hanzi: "疼", pinyin: "téng", pinyin_tone: "teng2", meaning_th: "ปวด, เจ็บ", meaning_en: "painful / hurt", radical: "疒", radical_name_th: "หมวดเตียงคนป่วย", stroke_count: 10, kid_mnemonic: "มีหลังคาคนป่วย (疒) นอนปวดระบม", body_gesture: "ทำหน้าเหยเกกุมจุดที่ปวด" },
          { id: "hsk1_0082", hanzi: "不舒服", pinyin: "bù shūfu", pinyin_tone: "bu4 shu1fu5", meaning_th: "ไม่สบาย, อึดอัดตัว", meaning_en: "uncomfortable / unwell", radical: "不 / 舌", radical_name_th: "ไม่ + สบาย", stroke_count: 19, kid_mnemonic: "ร่างกายบอกว่า 'ไม่ (不) สบายตัวเลย'", body_gesture: "เอามือกุมหน้าอกหน้าผาก" },
          { id: "hsk1_0083", hanzi: "医院", pinyin: "yīyuàn", pinyin_tone: "yi1yuan4", meaning_th: "โรงพยาบาล", meaning_en: "hospital", radical: "匚 / 阝", radical_name_th: "การรักษา + ลานกว้าง", stroke_count: 16, kid_mnemonic: "สถานที่หมอรักษาผู้คน = โรงพยาบาล", body_gesture: "ทำมือรูปกากบาทพยาบาล" },
          { id: "hsk1_0084", hanzi: "药", pinyin: "yào", pinyin_tone: "yao4", meaning_th: "ยา", meaning_en: "medicine", radical: "艹", radical_name_th: "หมวดหญ้าสมุนไพร", stroke_count: 9, kid_mnemonic: "พืชสมุนไพร (艹) สรรพคุณยอดเยี่ยมนำมาปรุงเป็นยา", body_gesture: "ทำท่าหยิบเม็ดยากินกับน้ำ" }
        ],
        grammar_bite: {
          title: "สูตรบอกอาการปวด: [อวัยวะ] + 疼",
          explanation_th: "ง่ายดายมาก! แค่บอกชื่ออวัยวะแล้วเติมคำว่า 疼 (téng - ปวด): 头疼 (ปวดหัว), 肚子疼 (ปวดท้อง)",
          patterns: [
            { formula: "我头疼。", pinyin: "Wǒ tóu téng.", th: "ฉันปวดหัวครับ/ค่ะ" },
            { formula: "我要买药。", pinyin: "Wǒ yào mǎi yào.", th: "ฉันต้องการซื้อยาครับ" }
          ]
        },
        dialogue: [
          { speaker_name: "เภสัชกร 👩‍⚕️", zh: "你好！你哪里不舒服？", pinyin: "Nǐ hǎo! Nǐ nǎlǐ bù shūfu?", th: "สวัสดีค่ะ คุณไม่สบายตรงไหนคะ?" },
          { speaker_name: "สมชาย 🧒", zh: "你好，我头疼，发烧了。", pinyin: "Nǐ hǎo, wǒ tóu téng, fāshāo le.", th: "สวัสดีครับ ผมปวดหัวและเป็นไข้ครับ" },
          { speaker_name: "เภสัชกร 👩‍⚕️", zh: "这是感冒药，多喝水！", pinyin: "Zhè shì gǎnmàoyào, duō hē shuǐ!", th: "นี่คือยาแก้ไข้หวัด ดื่มน้ำเยอะๆ นะคะ!" }
        ],
        quizzes: [
          {
            type: "vocab_match",
            question_th: "คำว่า '头疼' (tóu téng) มีความหมายว่าอะไร?",
            options: ["ปวดหัว", "ปวดท้อง", "เจ็บขา", "เจ็บคอ"],
            correct_index: 0,
            explanation_th: "头 (หัว) + 疼 (ปวด) = ปวดหัว",
            encouragement: "ถูกต้องนะคร้าบ! รู้วิธีบอกอาการป่วยได้อย่างปลอดภัย!"
          }
        ],
        boss_challenge: {
          scenario_th: "คุณเที่ยวเดินเล่นจนรู้สึกครั่นเนื้อครั่นตัว ปวดหัว จึงเดินเข้าร้านขายยาในเซี่ยงไฮ้ ต้องการขอยาแก้ปวดหัวจากเภสัชกร ควรบอกอาการอย่างไรให้ตรงประเด็น?",
          options: ["你好，我要吃面条！", "你好，我头疼，要买药。 (Nǐ hǎo, wǒ tóu téng, yào mǎi yào.)", "再见！", "这个多少钱？"],
          correct_index: 1,
          explanation_th: "บอกว่า '我头疼，要买药' (ผมปวดหัว อยากซื้อยาครับ) เภสัชกรจะหยิบยาแก้ปวดที่ถูกต้องให้ทันที!",
          encouragement: "ยอดเยี่ยมมาก! ดูแลตัวเองในต่างแดนได้อย่างมั่นใจและปลอดภัย!"
        },
        cheer_trophy: { badge_name: "ผู้พิทักษ์สุขภาพตนเอง 💊🩺", xp_reward: 60 }
      }
    ]
  },

  // UNIT 10: Hotel & Flight Grand Boss Quest
  {
    unit_id: "tier1_u10",
    tier: 1,
    unit_number: 10,
    title: {
      zh: "酒店入住与登机试炼",
      th: "โรงแรม & เที่ยวบิน (Hotel Check-in & Airport Grand Boss)",
      en: "Hotel Check-in & Flight Boarding"
    },
    description: "เช็กอินโรงแรม ขอรหัส Wi-Fi ไปสนามบิน โหลดกระเป๋า พิชิต Tier 1 Grand Boss Quest!",
    lessons: [
      {
        lesson_id: "t1_u10_l01",
        lesson_number: 1,
        title: { zh: "酒店入住与房卡", th: "เช็กอินโรงแรม ขอคีย์การ์ดและรหัส Wi-Fi", en: "Hotel Check-in & Wi-Fi" },
        can_do: { th: "เช็กอินที่เคาน์เตอร์โรงแรมและขอรหัสผ่าน Wi-Fi เป็นภาษาจีนได้", en: "Check in at a hotel and ask for Wi-Fi credentials" },
        baby_step_goal: "จำคำว่า 预订 (yùdìng - จองไว้แล้ว) และ 密码 (mìmǎ - รหัสผ่าน)",
        vocabulary: [
          { id: "hsk1_0090", hanzi: "房间", pinyin: "fángjiān", pinyin_tone: "fang2jian1", meaning_th: "ห้องพัก", meaning_en: "room", radical: "户 / 门", radical_name_th: "ประตูห้อง", stroke_count: 15, kid_mnemonic: "เปิดประตูเข้าห้องพักอันแสนสบาย", body_gesture: "ทำท่าบิดลูกบิดประตูห้อง" },
          { id: "hsk1_0091", hanzi: "房卡", pinyin: "fángkǎ", pinyin_tone: "fang2ka3", meaning_th: "คีย์การ์ดห้องพัก", meaning_en: "room keycard", radical: "户", radical_name_th: "การ์ดห้อง", stroke_count: 13, kid_mnemonic: "การ์ดแบนๆ แตะเปิดประตูห้อง", body_gesture: "ทำท่าแตะคีย์การ์ด ติ๊ด!" },
          { id: "hsk1_0092", hanzi: "密码", pinyin: "mìmǎ", pinyin_tone: "mi4ma3", meaning_th: "รหัสผ่าน", meaning_en: "password / code", radical: "宀 / 石", radical_name_th: "ความลับ + ตัวเลข", stroke_count: 20, kid_mnemonic: "ตัวเลขลับที่เก็บไว้ในห้อง = รหัสผ่าน", body_gesture: "ทำมือกดแป้นพิมพ์ตัวเลข" },
          { id: "hsk1_0093", hanzi: "机场", pinyin: "jīchǎng", pinyin_tone: "ji1chang3", meaning_th: "สนามบิน", meaning_en: "airport", radical: "木 / 土", radical_name_th: "เครื่องบิน + ลานกว้าง", stroke_count: 13, kid_mnemonic: "ลานกว้าง (场) สำหรับเครื่องบิน (机) บินขึ้นฟ้า", body_gesture: "กางแขนสองข้างบินเหมือนเครื่องบิน" }
        ],
        grammar_bite: {
          title: "สูตรถามรหัส Wi-Fi: Wi-Fi 密码是多少？",
          explanation_th: "พูดคำว่า Wi-Fi แล้วตามด้วย 密码是多少？ (mìmǎ shì duōshao? - รหัสผ่านคือเท่าไหร่?) พนักงานจะเขียนรหัสให้ทันที",
          patterns: [
            { formula: "请问，Wi-Fi 密码是多少？", pinyin: "Qǐngwèn, Wi-Fi mìmǎ shì duōshao?", th: "ขอถามหน่อยครับ รหัส Wi-Fi คืออะไรครับ?" }
          ]
        },
        dialogue: [
          { speaker_name: "พนักงานต้อนรับ 👩‍💼", zh: "您好！请问有预订吗？", pinyin: "Nín hǎo! Qǐngwèn yǒu yùdìng ma?", th: "สวัสดีค่ะ ไม่ทราบว่าจองห้องไว้ไหมคะ?" },
          { speaker_name: "สมชาย 🧒", zh: "您好！我有预订，这是我的护照。", pinyin: "Nín hǎo! Wǒ yǒu yùdìng, zhè shì wǒ de hùzhào.", th: "สวัสดีครับ ผมจองไว้แล้ว นี่คือพาสปอร์ตของผมครับ" },
          { speaker_name: "พนักงานต้อนรับ 👩‍💼", zh: "好的，这是您的房卡。Wi-Fi 密码在卡上。", pinyin: "Hǎo de, zhè shì nín de fángkǎ. Wi-Fi mìmǎ zài kǎ shang.", th: "เรียบร้อยค่ะ นี่คือคีย์การ์ดของคุณ รหัส Wi-Fi อยู่บนการ์ดนะคะ" },
          { speaker_name: "สมชาย 🧒", zh: "非常感谢！再见！", pinyin: "Fēicháng gǎnxiè! Zàijiàn!", th: "ขอบคุณมากๆ ครับ ลาก่อนครับ!" }
        ],
        quizzes: [
          {
            type: "vocab_match",
            question_th: "เมื่อต้องการถามรหัสผ่าน Wi-Fi คำว่า 'รหัสผ่าน' ในภาษาจีนคือคำใด?",
            options: ["房间 (fángjiān)", "房卡 (fángkǎ)", "密码 (mìmǎ)", "机场 (jīchǎng)"],
            correct_index: 2,
            explanation_th: "密码 (mìmǎ) แปลว่า 'รหัสผ่าน'",
            encouragement: "ถูกต้อง! เชื่อมต่ออินเทอร์เน็ตได้ฉลุย!"
          }
        ],
        boss_challenge: {
          scenario_th: "คุณเดินทางมาถึงสนามบินต้าซิงในกรุงปักกิ่งหลังจบทริป 3 วัน 2 คืน กำลังเช็กอินโหลดกระเป๋า เจ้าหน้าที่ขอดูหนังสือเดินทางพร้อมส่งยิ้มหวาน คุณควรยื่นพาสปอร์ตพร้อมกล่าวอย่างไร?",
          options: ["我要吃米饭！", "您好，这是我的护照，谢谢！ (Nín hǎo, zhè shì wǒ de hùzhào, xièxie!)", "不要！", "多少钱？"],
          correct_index: 1,
          explanation_th: "กล่าวทักทายอย่างสุภาพ '您好，这是我的护照，谢谢！' เจ้าหน้าที่จะออกบอร์ดดิ้งพาสให้อย่างรวดเร็ว!",
          encouragement: "🎉 มหัศจรรย์มาก! คุณผ่านการทดสอบเอาชีวิตรอดครบทุกสถานการณ์ใน Tier 1 แล้ว!"
        },
        cheer_trophy: {
          badge_id: "badge_t1_grand_master",
          badge_name: "มหาบัณฑิตนักสำรวจ Tier 1 🌿🏆✨",
          message_th: "ยินดีด้วยอย่างยิ่งจากหัวใจ! คุณพิชิตทั้ง 10 ยูนิตของ Tier 1: Explorer สำเร็จแล้ว สามารถทักทาย สั่งอาหาร ซื้อของ ถามทาง แนะนำครอบครัว บอกสภาพอากาศ และเช็กอินโรงแรมในประเทศจีนได้อย่างมั่นใจ 100%!",
          xp_reward: 300
        }
      }
    ]
  }
];

tier1Units.forEach(u => {
  const filePath = path.join(baseDir, `${u.unit_id.replace('tier1_u', 'unit')}_${getSlug(u.unit_id)}.json`);
  fs.writeFileSync(filePath, JSON.stringify(u, null, 2), 'utf8');
  console.log(`Created: ${filePath}`);
});

function getSlug(unitId) {
  const map = {
    tier1_u02: "numbers_time",
    tier1_u03: "food_drinks",
    tier1_u04: "shopping_money",
    tier1_u05: "directions_transport",
    tier1_u06: "family_friends",
    tier1_u07: "daily_routines",
    tier1_u08: "weather_seasons",
    tier1_u09: "health_body",
    tier1_u10: "hotel_airport"
  };
  return map[unitId] || "unit";
}

console.log("Tier 1 generation finished.");
