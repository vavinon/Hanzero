const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'data', 'lessons');

// Ensure directories exist
const dirs = ['tier0', 'tier1', 'tier2', 'tier3', 'tier4'];
dirs.forEach(d => {
  const dirPath = path.join(baseDir, d);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// ==========================================
// TIER 0: SEED (10 UNITS)
// ==========================================
const tier0Units = [
  {
    unit_id: "tier0_u01",
    tier: 0,
    unit_number: 1,
    title: {
      zh: "唇齿音与单韵母 (一)",
      th: "เสียงริมฝีปาก & ฟัน (b, p, m, f, d, t, n, l) + สระ (a, o, e)",
      en: "Labial & Dental Initials + Simple Finals (a, o, e)"
    },
    description: "ก้าวแรกของการออกเสียงภาษาจีน: อ้าปากกว้าง ห่อปากกลม เปรียบเทียบเสียงกับภาษาไทยอย่างเป็นธรรมชาติ",
    archetype: "phonetic_and_stroke",
    lessons: [
      {
        lesson_id: "t0_u01_l01",
        lesson_number: 1,
        title: { zh: "单韵母 a, o, e", th: "3 สระมหัศจรรย์: a, o, e", en: "Simple Finals a, o, e" },
        can_do: { th: "อ้าปากออกเสียงสระ a, o, e ได้ถูกต้องตามรูปปากมาตรฐาน", en: "Pronounce simple finals a, o, e accurately" },
        baby_step_goal: "จำรูปปาก 3 ท่า: ปากกว้างหาหมอ (a), ปากกลมไก่ขัน (o), และปากยิ้มกว้าง (e)",
        sound_cards: [
          {
            symbol: "a",
            type: "final",
            thai_approx: "อา",
            mouth_shape: "อ้าปากกว้างเต็มที่ ลิ้นวางราบ",
            kid_mnemonic: "เหมือนเวลาคุณหมอบอกให้ 'อ้าปากซิ... อาาา'",
            body_gesture: "กางสองมือออกข้างๆ กว้างๆ",
            example_word: { hanzi: "啊", pinyin: "ā", meaning_th: "อา (เสียงอุทาน)" }
          },
          {
            symbol: "o",
            type: "final",
            thai_approx: "โอ / ออ",
            mouth_shape: "ห่อริมฝีปากให้เป็นวงกลมมน",
            kid_mnemonic: "ไก่โต้งโก่งคอขันตอนเช้า 'โอ๊ก โอ๊ก โอ่'",
            body_gesture: "ทำมือสองข้างประกบเป็นรูปวงกลมหน้าปาก",
            example_word: { hanzi: "窝", pinyin: "wō", meaning_th: "รังนก" }
          },
          {
            symbol: "e",
            type: "final",
            thai_approx: "เออ (กึ่งเออ-เออะ)",
            mouth_shape: "ฉีกยิ้มมุมปากสองข้าง ลิ้นถอยหลังเล็กน้อย",
            kid_mnemonic: "ยิ้มเห็นฟันเหมือนห่านขาวกำลังร้อง 'เอออออ'",
            body_gesture: "ใช้นิ้วชี้สองข้างชี้ที่มุมปากยิ้มแฉ่ง",
            example_word: { hanzi: "鹅", pinyin: "é", meaning_th: "ห่านขาว" }
          }
        ],
        quizzes: [
          {
            type: "mouth_shape_match",
            question_th: "เมื่อต้องการออกเสียงสระ 'a' ควรทำรูปปากอย่างไร?",
            options: ["ห่อปากกลมจิ๋ว", "อ้าปากกว้างที่สุดเหมือนหาหมอ", "กัดฟันแน่นๆ", "ยิ้มมุมปากแคบๆ"],
            correct_index: 1,
            explanation_th: "สระ 'a' ต้องอ้าปากกว้าง ลิ้นวางสบายๆ ลมเปล่งจากคอ",
            encouragement: "ยอดเยี่ยมมาก! อ้าปากกว้างพูดเสียงใสปิ๊ง!"
          }
        ],
        cheer_trophy: { badge_name: "นักร้องเสียงใส a-o-e 🌱", xp_reward: 30 }
      },
      {
        lesson_id: "t0_u01_l02",
        lesson_number: 2,
        title: { zh: "声母 b, p, m, f", th: "4 พยัญชนะริมฝีปาก (b, p, m, f)", en: "Labial Initials b, p, m, f" },
        can_do: { th: "แยกแยะความต่างระหว่างเสียงลมไม่พ่น (b) กับพ่นลมแรง (p) ได้", en: "Differentiate unaspirated b and aspirated p" },
        baby_step_goal: "เอากระดาษมาวางหน้าปาก แล้วดูว่ากระดาษปลิวหรือไม่ปลิว!",
        sound_cards: [
          {
            symbol: "b",
            type: "initial",
            thai_approx: "ป (ไม่พ่นลม)",
            mouth_shape: "ริมฝีปากบนล่างประกบกันแน่น แล้วเปิดออกแบบเบาๆ",
            kid_mnemonic: "ป.ปลาตากลม กระดาษหน้าปาก 'ไม่ปลิว'",
            body_gesture: "กำมือแน่นไว้ที่ปากแล้วแบมือเบาๆ",
            example_word: { hanzi: "八", pinyin: "bā", meaning_th: "เลขแปด" }
          },
          {
            symbol: "p",
            type: "initial",
            thai_approx: "พ (พ่นลมแรง!)",
            mouth_shape: "ประกบริมฝีปากแล้วพ่นลมระเบิดออกมาเต็มที่",
            kid_mnemonic: "พ่นลมพรวด! กระดาษหน้าปาก 'ปลิวพึ่บพั่บ'",
            body_gesture: "เป่าลมใส่ฝ่ามือตัวเองเพื่อเช็คลมร้อนพุ่ง",
            example_word: { hanzi: "爬", pinyin: "pá", meaning_th: "ปีนเขา" }
          },
          {
            symbol: "m",
            type: "initial",
            thai_approx: "ม (เสียงขึ้นจมูก)",
            mouth_shape: "ปิดปาก แล้วส่งเสียงสั่นสะเทือนขึ้นจมูก",
            kid_mnemonic: "แม่ทำอาหารอร่อย ส่งเสียง 'อื้มมมม'",
            body_gesture: "ลูบท้องวนๆ แสดงความเอร็ดอร่อย",
            example_word: { hanzi: "妈", pinyin: "mā", meaning_th: "แม่" }
          },
          {
            symbol: "f",
            type: "initial",
            thai_approx: "ฟ (ฟันบนแตะปากล่าง)",
            mouth_shape: "ฟันบนแตะริมฝีปากล่างเบาๆ แล้วพ่นลมผ่านซอกฟัน",
            kid_mnemonic: "ฟันกระต่ายแตะปากล่าง พ่นลมฟู่ๆ",
            body_gesture: "ทำฟันกระต่ายน่ารัก",
            example_word: { hanzi: "发", pinyin: "fā", meaning_th: "ส่งออก / ร่ำรวย" }
          }
        ],
        quizzes: [
          {
            type: "listen_match",
            question_th: "พยัญชนะตัวใดต้อง 'พ่นลมแรง' จนกระดาษปลิว?",
            options: ["b (ป)", "p (พ)", "m (ม)", "f (ฟ)"],
            correct_index: 1,
            explanation_th: "p เป็นเสียงพ่นลมแรง (Aspirated) ลมจะพุ่งออกมาเต็มแรง",
            encouragement: "เก่งมาก! ลมพ่นพรวด พริ้วไหวเป๊ะเวอร์!"
          }
        ],
        cheer_trophy: { badge_name: "ยอดนักพ่นลม b-p-m-f 💨", xp_reward: 30 }
      },
      {
        lesson_id: "t0_u01_l03",
        lesson_number: 3,
        title: { zh: "声母 d, t, n, l", th: "4 พยัญชนะปลายลิ้นแตะฟันบน (d, t, n, l)", en: "Alveolar Initials d, t, n, l" },
        can_do: { th: "ใช้ปลายลิ้นแตะปุ่มเหงือกบนเพื่อออกเสียง d, t, n, l ได้อย่างเป็นธรรมชาติ", en: "Pronounce d, t, n, l with tongue tip touching alveolar ridge" },
        baby_step_goal: "กระดิกปลายลิ้นแตะหลังฟันบนเป็นจังหวะเคาะกลอง!",
        sound_cards: [
          {
            symbol: "d",
            type: "initial",
            thai_approx: "ต (ไม่พ่นลม)",
            mouth_shape: "ปลายลิ้นแตะหลังฟันบน แล้วดีดออกเบาๆ",
            kid_mnemonic: "เสียงกลอง ตีกลองดัง ตึง! ตึง! ตึง!",
            body_gesture: "ทำท่าตีกลองด้วยสองมือ",
            example_word: { hanzi: "大", pinyin: "dà", meaning_th: "ใหญ่" }
          },
          {
            symbol: "t",
            type: "initial",
            thai_approx: "ท (พ่นลมแรง)",
            mouth_shape: "ปลายลิ้นแตะหลังฟันบน แล้วดีดออกพร้อมพ่นลมพุ่ง",
            kid_mnemonic: "กระต่ายกระโดด ทะลุฟ้า ทึ้งๆ!",
            body_gesture: "ดีดนิ้วโป้งขึ้นฟ้าพ่นลม",
            example_word: { hanzi: "他", pinyin: "tā", meaning_th: "เขา (ผู้ชาย)" }
          },
          {
            symbol: "n",
            type: "initial",
            thai_approx: "น (เสียงขึ้นจมูก)",
            mouth_shape: "ปลายลิ้นกั้นลม เสียงกังวานออกทางจมูก",
            kid_mnemonic: "คุณหนูน่ารัก ร้องเพลง นกน้อย",
            body_gesture: "เอานิ้วแตะสันจมูกเบาๆ รับรู้แรงสั่นสะเทือน",
            example_word: { hanzi: "你", pinyin: "nǐ", meaning_th: "เธอ" }
          },
          {
            symbol: "l",
            type: "initial",
            thai_approx: "ล (ลมออกข้างลิ้น)",
            mouth_shape: "ปลายลิ้นแตะหลังฟันบน ลมไหลออกสองข้างลิ้น",
            kid_mnemonic: "ลิงโลดเต้น ลั้ลลา ลั้ลลา",
            body_gesture: "แกว่งแขนซ้ายขวาร่าเริง",
            example_word: { hanzi: "乐", pinyin: "lè", meaning_th: "มีความสุข" }
          }
        ],
        quizzes: [
          {
            type: "listen_match",
            question_th: "พยัญชนะ 'd' ในภาษาจีน ออกเสียงเทียบเคียงกับพยัญชนะไทยตัวใด?",
            options: ["ด.เด็ก", "ต.เต่า", "ท.ทหาร", "บ.ใบไม้"],
            correct_index: 1,
            explanation_th: "'d' ในพินอินเทียบเท่ากับเสียง ต.เต่า (เสียงไม่พ่นลม)",
            encouragement: "ถูกต้องนะคร้าบ! จำไว้ว่า d คือ ต.เต่า ไม่ใช่ ด.เด็ก นะคนเก่ง!"
          }
        ],
        cheer_trophy: { badge_name: "มือกลองปลายลิ้น d-t-n-l 🥁", xp_reward: 40 }
      }
    ]
  },
  {
    unit_id: "tier0_u02",
    tier: 0,
    unit_number: 2,
    title: {
      zh: "舌根音与单韵母 (二)",
      th: "เสียงโคนลิ้น & ลมพ่น (g, k, h, j, q, x) + สระ (i, u, ü)",
      en: "Velar & Palatal Initials + Simple Finals (i, u, ü)"
    },
    description: "ไขความลับสระปากจิ๋ว ü ที่คนไทยกลัว พร้อมฝึกเสียงโคนลิ้นและเพดานแข็งอย่างสบายอารมณ์",
    archetype: "phonetic_and_stroke",
    lessons: [
      {
        lesson_id: "t0_u02_l01",
        lesson_number: 1,
        title: { zh: "单韵母 i, u, ü", th: "สระยิ้ม i, สระปากจู๋ u, และสระปราบเซียน ü", en: "Simple Finals i, u, ü" },
        can_do: { th: "ออกเสียงสระ ü ได้เป๊ะด้วยเคล็ดลับ 'ปากทำท่าอู แต่ข้างในพูดอี'", en: "Master the tricky ü final using the mouth-shape trick" },
        baby_step_goal: "ทำปากจู๋เหมือนจะเป่านกหวีด แล้วปล่อยเสียง 'อี' ออกมา = ปิ๊ง! ได้เสียง ü ทันที!",
        sound_cards: [
          {
            symbol: "i",
            type: "final",
            thai_approx: "อี",
            mouth_shape: "ฉีกยิ้มกว้าง ปลายลิ้นแตะหลังฟันล่าง",
            kid_mnemonic: "ยิ้มหวานถ่ายรูป 'หนึ่ง สอง ซั่ม... ชีสสส (อี)'",
            body_gesture: "ชูสองนิ้วยิ้มหวาน",
            example_word: { hanzi: "一", pinyin: "yī", meaning_th: "เลขหนึ่ง" }
          },
          {
            symbol: "u",
            type: "final",
            thai_approx: "อู",
            mouth_shape: "ห่อปากจู๋ยื่นไปข้างหน้า รูเปิดเล็กนิดเดียว",
            kid_mnemonic: "นกฮูกตากลมโต ร้อง 'ฮูกกกก (อู)'",
            body_gesture: "ทำมือครอบเป็นจะงอยปากนกยื่นไปข้างหน้า",
            example_word: { hanzi: "五", pinyin: "wǔ", meaning_th: "เลขห้า" }
          },
          {
            symbol: "ü",
            type: "final",
            thai_approx: "อวี (สระ อู ผสม อี)",
            mouth_shape: "ปากจู๋กลมจิ๋ว ห้ามขยับปาก แล้วเปล่งเสียง 'อี'",
            kid_mnemonic: "ปลาทองพ่นฟองน้ำ ปากกลมป๊อก 'อวี่ อวี่ อวี่'",
            body_gesture: "ทำปากจู๋กลมบล็อกไว้แล้วส่งเสียงปลาทองว่ายน้ำ",
            example_word: { hanzi: "鱼", pinyin: "yú", meaning_th: "ปลา" }
          }
        ],
        quizzes: [
          {
            type: "mouth_shape_match",
            question_th: "เคล็ดลับเด็ดในการออกเสียงสระ 'ü' ให้ถูกต้องที่สุดคืออะไร?",
            options: ["อ้าปากกว้างๆ ร้องโอ้โฮ", "ทำปากจู๋เป็นรูเล็กเหมือนสระ 'u' แต่ข้างในเปล่งเสียง 'i (อี)'", "กัดฟันแน่นๆ แล้วพูดอู", "แลบลิ้นออกมาแตะริมฝีปาก"],
            correct_index: 1,
            explanation_th: "ถูกต้อง! ปากกลมจิ๋ว ห้ามขยับปาก แล้วปล่อยเสียง 'อี' ลมจะกลายเป็น 'ü' โดยอัตโนมัติ!",
            encouragement: "สุดยอดมาก! เคล็ดลับนี้ใช้ได้ผลตลอดชีวิตเลยนะเด็กดี!"
          }
        ],
        cheer_trophy: { badge_name: "เจ้าของสระปลาทอง ü 🐟", xp_reward: 35 }
      },
      {
        lesson_id: "t0_u02_l02",
        lesson_number: 2,
        title: { zh: "声母 g, k, h", th: "3 เสียงโคนลิ้น (g, k, h)", en: "Velar Initials g, k, h" },
        can_do: { th: "ยกโคนลิ้นแตะเพดานอ่อนเพื่อออกเสียง g (ก), k (ค), h (ฮ) ได้ชัดเจน", en: "Pronounce velar sounds g, k, h comfortably" },
        baby_step_goal: "จำว่า g คือ ก.ไก่ (ไม่พ่นลม) ส่วน k คือ ค.ควาย (พ่นลมแรง)",
        sound_cards: [
          {
            symbol: "g",
            type: "initial",
            thai_approx: "ก (ไม่พ่นลม)",
            mouth_shape: "ยกโคนลิ้นกั้นลม แล้วเปิดออกเบาๆ",
            kid_mnemonic: "ไก่กุ๊กไก่ ไม่พ่นลม",
            body_gesture: "ทำมือเป็นปีกไก่กระพือ",
            example_word: { hanzi: "哥", pinyin: "gē", meaning_th: "พี่ชาย" }
          },
          {
            symbol: "k",
            type: "initial",
            thai_approx: "ค (พ่นลมแรง)",
            mouth_shape: "ยกโคนลิ้นกั้นลม แล้วพ่นลมพุ่งระเบิดออกมา",
            kid_mnemonic: "ไอ ค่อกแค่ก พ่นลมแรง!",
            body_gesture: "เอามือป้องปากเช็คลมพุ่ง",
            example_word: { hanzi: "渴", pinyin: "kě", meaning_th: "กระหายน้ำ" }
          },
          {
            symbol: "h",
            type: "initial",
            thai_approx: "ฮ (เสียงเสียดแทรกในคอ)",
            mouth_shape: "ปล่อยลมเสียดสีผ่านโคนลิ้นและลำคออย่างผ่อนคลาย",
            kid_mnemonic: "หัวเราะ ฮ่าๆๆ มีความสุขจัง",
            body_gesture: "เอามือจับหน้าอกหัวเราะอย่างมีความสุข",
            example_word: { hanzi: "好", pinyin: "hǎo", meaning_th: "ดี" }
          }
        ],
        quizzes: [
          {
            type: "listen_match",
            question_th: "คำว่า '好' (ดี) ขึ้นต้นด้วยพยัญชนะเสียงใด?",
            options: ["g (ก)", "k (ค)", "h (ฮ)", "b (ป)"],
            correct_index: 2,
            explanation_th: "好 (hǎo) ขึ้นต้นด้วยพยัญชนะ 'h' ออกเสียง ฮ.นกฮูก เสียดสีในลำคอเบาๆ",
            encouragement: "ถูกต้องจ้า! จำเก่งมากเลย!"
          }
        ],
        cheer_trophy: { badge_name: "จอมยุทธ์โคนลิ้น g-k-h 🦅", xp_reward: 35 }
      },
      {
        lesson_id: "t0_u02_l03",
        lesson_number: 3,
        title: { zh: "声母 j, q, x", th: "3 เสียงเพดานแข็งหน้ายิ้ม (j, q, x)", en: "Palatal Initials j, q, x" },
        can_do: { th: "ยิ้มมุมปากและใช้หน้าลิ้นแตะเพดานแข็งเพื่อออกเสียง j (จ), q (ช), x (ซ)", en: "Pronounce palatal sounds j, q, x with a smile" },
        baby_step_goal: "หน้าต้องยิ้มเสมอเมื่อพูด j, q, x!",
        sound_cards: [
          {
            symbol: "j",
            type: "initial",
            thai_approx: "จ (ยิ้มกว้าง ไม่พ่นลม)",
            mouth_shape: "หน้าลิ้นแตะเพดานแข็ง ฉีกยิ้ม",
            kid_mnemonic: "ไก่น้อย จิ๊บๆ ยิ้มแฉ่ง",
            body_gesture: "ทำนิ้วจีบยิ้มหวาน",
            example_word: { hanzi: "鸡", pinyin: "jī", meaning_th: "ไก่" }
          },
          {
            symbol: "q",
            type: "initial",
            thai_approx: "ช (ยิ้มกว้าง + พ่นลมแรงสุดขีด!)",
            mouth_shape: "หน้าลิ้นแตะเพดานแข็ง แล้วพ่นลมฟู่พุ่งออกมา",
            kid_mnemonic: "ลูกโป่งแตก ฟู่! ลมพุ่งปรี๊ด",
            body_gesture: "ทำท่าลูกโป่งระเบิดขยายสองมือออก",
            example_word: { hanzi: "七", pinyin: "qī", meaning_th: "เลขเจ็ด" }
          },
          {
            symbol: "x",
            type: "initial",
            thai_approx: "ซ (ยิ้มกว้าง ลมพ่นผ่านซอกลิ้น)",
            mouth_shape: "หน้าลิ้นยกใกล้เพดานแข็ง ลมเสียดสีบางเบา",
            kid_mnemonic: "แตงโมสีแดง สดชื่น 西瓜 (ซีกวา)",
            body_gesture: "ทำท่าถือแตงโมกินคำโต",
            example_word: { hanzi: "西", pinyin: "xī", meaning_th: "ทิศตะวันตก" }
          }
        ],
        quizzes: [
          {
            type: "listen_match",
            question_th: "พยัญชนะ 'q' มีลักษณะการออกเสียงอย่างไรเมื่อเทียบกับ 'j'?",
            options: ["ไม่พ่นลมเหมือนกัน", "q ต้องพ่นลมแรงพุ่งออกมาอย่างชัดเจน", "ต้องห่อปากกลม", "ต้องม้วนลิ้นเข้าในคอ"],
            correct_index: 1,
            explanation_th: "ถูกต้อง! 'q' คือเสียงคู่แฝดพ่นลมแรงของ 'j'",
            encouragement: "ยอดเยี่ยม! จับเคล็ดลับลมพ่นได้แม่นยำมาก!"
          }
        ],
        cheer_trophy: { badge_name: "ยิ้มหวานเสียงใส j-q-x 😊", xp_reward: 30 }
      }
    ]
  },
  {
    unit_id: "tier0_u03",
    tier: 0,
    unit_number: 3,
    title: {
      zh: "声调魔法与轻声",
      th: "4 วรรณยุกต์ & เสียงเบา (ā, á, ǎ, à, a)",
      en: "4 Tones & Neutral Tone Mastery"
    },
    description: "ท่องแดนสวนสนุกสไลเดอร์กับ 4 วรรณยุกต์ภาษาจีน จำง่ายด้วยเสียงดนตรีและท่าทางชี้นิ้วในอากาศ",
    archetype: "phonetic_and_stroke",
    lessons: [
      {
        lesson_id: "t0_u03_l01",
        lesson_number: 1,
        title: { zh: "四声与过山车", th: "4 วรรณยุกต์บนรถไฟเหาะตีลังกา", en: "The 4 Rollercoaster Tones" },
        can_do: { th: "ผันเสียง 1, 2, 3, 4 ได้อย่างเป็นจังหวะเพลงโดยไม่สับสน", en: "Produce and identify the 4 Mandarin tones reliably" },
        baby_step_goal: "ใช้นิ้วชี้วาดภาพบนอากาศ: ขีดตรง (1) ➔ ปีนเขา (2) ➔ ลงสไลเดอร์ (3) ➔ ทุบโต๊ะ (4)",
        sound_cards: [
          {
            symbol: "ā (เสียง 1)",
            type: "tone",
            thai_approx: "เสียงสามัญ สูงและยาวตรง",
            mouth_shape: "ระดับเสียงคงที่ 55 สูงเหมือนร้องเพลงโน้ต ซอล",
            kid_mnemonic: "รถไฟวิ่งทางตรงเรียบกริบ ร้อง อาาาา",
            body_gesture: "ใช้นิ้วชี้ลากเส้นตรงแนวนอนบนอากาศ ➡️",
            example_word: { hanzi: "妈", pinyin: "mā", meaning_th: "แม่" }
          },
          {
            symbol: "á (เสียง 2)",
            type: "tone",
            thai_approx: "เสียงจัตวา ลากขึ้นฟ้า",
            mouth_shape: "ระดับเสียง 35 พุ่งขึ้นเหมือนถาม 'อะไรนะ?!'",
            kid_mnemonic: "รถไฟเหาะปีนขึ้นเขา ชันดิก หวาาา?!",
            body_gesture: "ใช้นิ้วชี้ลากเฉียงขึ้นไปบนท้องฟ้า ↗️",
            example_word: { hanzi: "麻", pinyin: "má", meaning_th: "ป่าน / ชา" }
          },
          {
            symbol: "ǎ (เสียง 3)",
            type: "tone",
            thai_approx: "เสียงเอก ลงต่ำแล้วตวัดขึ้น",
            mouth_shape: "ระดับเสียง 214 ทิ้งตัวลงก้นบึ้งแล้วดีดขึ้น",
            kid_mnemonic: "ลงสไลเดอร์หวาดเสียว ก้มหัวฮึบแล้วเงยหน้าขึ้น!",
            body_gesture: "พยักหน้าลงต่ำสุดแล้วเงยหน้าขึ้น ↘️↗️",
            example_word: { hanzi: "马", pinyin: "mǎ", meaning_th: "ม้า" }
          },
          {
            symbol: "à (เสียง 4)",
            type: "tone",
            thai_approx: "เสียงโท สั้น หนัก และเด็ดขาด",
            mouth_shape: "ระดับเสียง 51 พุ่งดิ่งลงจากยอดเขา สั้นและหนักแน่น",
            kid_mnemonic: "แอปเปิ้ลตกใส่หัว ร้อง 'โอ๊ย! (อ้า!)'",
            body_gesture: "ฟันมือลงเร็วและเฉียบขาด ↘️",
            example_word: { hanzi: "骂", pinyin: "mà", meaning_th: "ดุด่า" }
          }
        ],
        quizzes: [
          {
            type: "listen_match",
            question_th: "วรรณยุกต์เสียงที่ 2 (á) มีทิศทางการเคลื่อนที่ของเสียงอย่างไร?",
            options: ["เรียบตรงบนฟ้า", "พุ่งขึ้นสูงเหมือนกำลังถาม", "ดิ่งลงพื้นสั้นกระชับ", "ทิ้งตัวลงก้นสไลเดอร์แล้วเด้งขึ้น"],
            correct_index: 1,
            explanation_th: "ถูกต้อง! เสียงที่ 2 (á) พุ่งขึ้นจากล่างขึ้นบนเหมือนถามว่า 'หา?!'",
            encouragement: "เยี่ยมยอด! วาดนิ้วขึ้นฟ้าได้อย่างสง่างาม!"
          }
        ],
        cheer_trophy: { badge_name: "กัปตันรถไฟเหาะ 4 วรรณยุกต์ 🎢", xp_reward: 40 }
      },
      {
        lesson_id: "t0_u03_l02",
        lesson_number: 2,
        title: { zh: "轻声与节奏", th: "เสียงเบา (Neutral Tone) สบายๆ นุ่มละมุน", en: "Neutral Tone & Rhythm" },
        can_do: { th: "ออกเสียงคำซ้ำที่มีเสียงเบา เช่น 妈妈 (māma), 谢谢 (xièxie) ได้เป็นธรรมชาติ", en: "Pronounce neutral tones naturally in reduplicated words" },
        baby_step_goal: "ตัวแรกออกเต็มเสียง ตัวหลังแตะเบาๆ เหมือนขนนกตกใส่พื้น",
        sound_cards: [
          {
            symbol: "a (เสียงเบา ไม่มีเครื่องหมาย)",
            type: "tone",
            thai_approx: "เสียงสั้น เบา ครึ่งเสียง",
            mouth_shape: "ผ่อนคลายกล้ามเนื้อปากทั้งหมด ออกเสียงสั้นและนุ่ม",
            kid_mnemonic: "หยดน้ำหยดลงบนใบบัว ติ๊ง... เบาจัง",
            body_gesture: "แตะปลายนิ้วลงบนโต๊ะเบาๆ นุ่มนวล",
            example_word: { hanzi: "爸爸", pinyin: "bàba", meaning_th: "พ่อ" }
          }
        ],
        quizzes: [
          {
            type: "listen_match",
            question_th: "คำว่า '妈妈' (māma - คุณแม่) พยางค์ที่สองออกเสียงอย่างไร?",
            options: ["ออกเสียงลากยาวกว่าตัวแรก", "ออกเสียงเบา สั้น และนุ่มนวล", "ออกเสียงหนักและกระแทกเสียง", "ไม่ต้องออกเสียงเลย"],
            correct_index: 1,
            explanation_th: "พยางค์หลังเป็นเสียงเบา (轻声) ต้องออกเสียงสั้น เบา สบายๆ",
            encouragement: "เก่งมาก! พูดน่ารักเหมือนน้องกระต่ายน้อยเลย!"
          }
        ],
        cheer_trophy: { badge_name: "ปรมาจารย์เสียงขนนก 🪶", xp_reward: 30 }
      }
    ]
  },
  {
    unit_id: "tier0_u04",
    tier: 0,
    unit_number: 4,
    title: {
      zh: "翘舌音与平舌音对决",
      th: "ลิ้นม้วน (zh, ch, sh, r) vs ลิ้นแบนชิดฟัน (z, c, s)",
      en: "Retroflex vs Dental Sibilants"
    },
    description: "ด่านปราบเซียนยอดฮิต! เคล็ดลับแยกประสาทสัมผัสตำแหน่งลิ้น ม้วนขึ้นเพดาน vs แตะหลังฟันล่าง",
    archetype: "phonetic_and_stroke",
    lessons: [
      {
        lesson_id: "t0_u04_l01",
        lesson_number: 1,
        title: { zh: "翘舌四剑客 zh, ch, sh, r", th: "4 ขุนพลลิ้นม้วน: zh, ch, sh, r", en: "The 4 Retroflex Sounds" },
        can_do: { th: "ยกปลายลิ้นงอขึ้นหาเพดานแข็งเพื่อออกเสียงกลุ่ม zh, ch, sh, r ได้อย่างถูกต้อง", en: "Produce retroflex sounds comfortably without tongue cramps" },
        baby_step_goal: "เอาปลายลิ้นแตะเพดานเหงือกบนเหมือนกำลังอมลูกอม!",
        sound_cards: [
          {
            symbol: "zh",
            type: "initial",
            thai_approx: "จ (ม้วนลิ้น ไม่พ่นลม)",
            mouth_shape: "ปลายลิ้นงอขึ้นแตะเพดานแข็ง แล้วปล่อยลมออกเบาๆ",
            kid_mnemonic: "จระเข้ลอยน้ำ อมลูกอมเม็ดโต ม้วนลิ้น",
            body_gesture: "งอนิ้วชี้ให้โค้งเหมือนลิ้นม้วน",
            example_word: { hanzi: "中", pinyin: "zhōng", meaning_th: "ตรงกลาง / ประเทศจีน" }
          },
          {
            symbol: "ch",
            type: "initial",
            thai_approx: "ช (ม้วนลิ้น + พ่นลมแรง!)",
            mouth_shape: "ปลายลิ้นงอแตะเพดานแข็ง แล้วพ่นลมพุ่งระเบิดออกมา",
            kid_mnemonic: "รถไฟวิ่ง ปู๊นๆ พ่นไอน้ำ ชึ่กชั่ก",
            body_gesture: "หมุนแขนเป็นล้อรถไฟ",
            example_word: { hanzi: "吃", pinyin: "chī", meaning_th: "กิน" }
          },
          {
            symbol: "sh",
            type: "initial",
            thai_approx: "ซ/ช (ม้วนลิ้น ลมเสียดสีเพดาน)",
            mouth_shape: "ปลายลิ้นใกล้เพดานแข็ง ลมไหลผ่านช่องว่างอย่างต่อเนื่อง",
            kid_mnemonic: "จุ๊ๆ อย่าส่งเสียงดัง ชู่ววว",
            body_gesture: "เอานิ้วชี้แตะปากทำท่า ชู่ววว",
            example_word: { hanzi: "是", pinyin: "shì", meaning_th: "เป็น, คือ, ใช่" }
          },
          {
            symbol: "r",
            type: "initial",
            thai_approx: "ย/ร (ม้วนลิ้น เส้นเสียงสั่นสะเทือน)",
            mouth_shape: "ตำแหน่งเดียวกับ sh แต่เปล่งเสียงให้ลำคอสั่น",
            kid_mnemonic: "ดวงอาทิตย์ส่องแสง อบอุ่น ยรื่อออ",
            body_gesture: "เอามือทาบคอรู้สึกคอสั่นสะเทือน",
            example_word: { hanzi: "人", pinyin: "rén", meaning_th: "คน" }
          }
        ],
        quizzes: [
          {
            type: "listen_match",
            question_th: "คำว่า '吃' (chī - กิน) ต้องวางตำแหน่งลิ้นอย่างไร?",
            options: ["แลบลิ้นออกนอกปาก", "ปลายลิ้นงอขึ้นหาเพดานเหงือกบนและพ่นลมแรง", "เอาลิ้นแตะฟันหน้าแบนราบ", "ลิ้นไม่แตะส่วนใดเลย"],
            correct_index: 1,
            explanation_th: "ch เป็นกลุ่มลิ้นม้วน (翘舌音) ต้องงอปลายลิ้นขึ้นเพดานแข็งและพ่นลมแรง",
            encouragement: "ยอดเยี่ยมมาก! ลิ้นม้วนพ่นลมกินของอร่อยได้สบาย!"
          }
        ],
        cheer_trophy: { badge_name: "อัศวินลิ้นม้วน 4 ทิศ 🗡️", xp_reward: 40 }
      },
      {
        lesson_id: "t0_u04_l02",
        lesson_number: 2,
        title: { zh: "平舌三兄弟 z, c, s", th: "3 พี่น้องลิ้นแบนชิดฟัน: z, c, s", en: "The 3 Flat Dental Sounds" },
        can_do: { th: "วางลิ้นแบนราบแตะหลังฟันล่างเพื่อออกเสียง z, c, s ชัดเจน ไม่ปนกับกลุ่มลิ้นม้วน", en: "Keep tongue completely flat behind lower teeth for z, c, s" },
        baby_step_goal: "กัดฟันเบาๆ ยิ้มกว้าง ลิ้นห้ามงอเด็ดขาด!",
        sound_cards: [
          {
            symbol: "z",
            type: "initial",
            thai_approx: "ซ/จ (ลิ้นแบนชิดฟัน ไม่พ่นลม)",
            mouth_shape: "ปลายลิ้นแตะหลังฟันบน แล้วถอยหลังเปิดช่องแคบ",
            kid_mnemonic: "ตัวต่อ บินมา ซื่อออ ไม่พ่นลม",
            body_gesture: "ใช้นิ้วชี้ทำท่าตัวต่อบิน",
            example_word: { hanzi: "再", pinyin: "zài", meaning_th: "อีกครั้ง" }
          },
          {
            symbol: "c",
            type: "initial",
            thai_approx: "ช/ซ (ลิ้นแบน + พ่นลมแรงพุ่ง)",
            mouth_shape: "เหมือน z แต่พ่นลมผ่านซอกฟันอย่างรวดเร็ว",
            kid_mnemonic: "สเปรย์ฉีดน้ำ ฟู่! พ่นละออง",
            body_gesture: "ทำท่ากดกระป๋องสเปรย์",
            example_word: { hanzi: "菜", pinyin: "cài", meaning_th: "กับข้าว / ผัก" }
          },
          {
            symbol: "s",
            type: "initial",
            thai_approx: "ส (ฟันสบกัน ลมพ่นผ่านซอกฟัน)",
            mouth_shape: "ปลายลิ้นใกล้หลังฟันบน ลมเสียดแทรกผ่านฟัน",
            kid_mnemonic: "งูเขียวเลื้อย ซี่ๆๆ ฟันชิด",
            body_gesture: "ทำมือเลื้อยเหมือนงู",
            example_word: { hanzi: "四", pinyin: "sì", meaning_th: "เลขสี่" }
          }
        ],
        quizzes: [
          {
            type: "listen_match",
            question_th: "คู่เปรียบเทียบ 'sì' (เลข 4) กับ 'shì' (ใช่) ต่างกันที่จุดใด?",
            options: ["sì ใช้เสียงขึ้นจมูก", "sì ลิ้นแบนชิดฟัน ส่วน shì ลิ้นต้องงอม้วนขึ้นหาเพดาน", "sì เสียงยาวกว่า shì", "ไม่มีความแตกต่างกันเลย"],
            correct_index: 1,
            explanation_th: "ถูกต้อง! sì (4) ลิ้นแบนชิดฟัน ส่วน shì (ใช่) ลิ้นต้องม้วนขึ้นเพดานปาก",
            encouragement: "เป๊ะมาก! แยกความต่างระหว่าง 4 กับ ใช่ ได้ขาดลอย!"
          }
        ],
        cheer_trophy: { badge_name: "ผู้พิทักษ์ลิ้นแบน z-c-s 🛡️", xp_reward: 40 }
      }
    ]
  },
  {
    unit_id: "tier0_u05",
    tier: 0,
    unit_number: 5,
    title: {
      zh: "变调的秘密",
      th: "กฎการผันเสียงสำคัญ (Tone Sandhi: 3+3, 一, 不)",
      en: "Tone Sandhi Rules"
    },
    description: "ไขปริศนาทำไมเขียนอย่างแต่อ่านอีกอย่าง? เรียนรู้ 3 กฎทองของการผันเสียงธรรมชาติ",
    archetype: "phonetic_and_stroke",
    lessons: [
      {
        lesson_id: "t0_u05_l01",
        lesson_number: 1,
        title: { zh: "第三声相连变调", th: "กฎเสียง 3 + 3 ➔ 2 + 3 (คลื่นสไลเดอร์)", en: "Third Tone Sandhi" },
        can_do: { th: "ผันเสียงคำที่เสียง 3 ชนกันได้อย่างเป็นอัตโนมัติ เช่น 你好, 我也", en: "Apply 3rd tone change automatically in speech" },
        baby_step_goal: "ท่องไว้: สไลด์ขึ้นแล้วค่อยลง (หนี ↗️ ห่าว ↘️↗️)",
        tone_rules: [
          {
            name: "3 + 3 ➔ 2 + 3",
            explanation_th: "เมื่อเสียง 3 สองตัวอยู่ติดกัน ตัวหน้าจะผันเป็นเสียง 2 เสมอ เพื่อไม่ให้ลิ้นเหนื่อย",
            examples: [
              { written: "你好 (nǐ hǎo)", spoken: "ní hǎo", meaning_th: "สวัสดี" },
              { written: "我也 (wǒ yě)", spoken: "wó yě", meaning_th: "ฉันก็ด้วย" }
            ]
          }
        ],
        quizzes: [
          {
            type: "listen_match",
            question_th: "คำว่า '你好' เขียนพินอิน nǐ + hǎo แต่อ่านออกเสียงจริงอย่างไร?",
            options: ["nī hǎo (เสียง 1 + 3)", "ní hǎo (เสียง 2 + 3)", "nǐ hào (เสียง 3 + 4)", "nǐ hǎo (เสียง 3 ทั้งคู่)"],
            correct_index: 1,
            explanation_th: "ตัวหน้าจะผันเสียงเป็นเสียง 2 กลายเป็น 'ní hǎo' (หนีห่าว)",
            encouragement: "ยอดเยี่ยมมาก! กฎนี้ทำให้พูดคล่องเหมือนคนจีนแท้ๆ เลย!"
          }
        ],
        cheer_trophy: { badge_name: "คลื่นวิเศษ 3+3 🌊", xp_reward: 35 }
      },
      {
        lesson_id: "t0_u05_l02",
        lesson_number: 2,
        title: { zh: "不和一的变调", th: "กฎแปลงร่างของ '不' (ไม่) และ '一' (หนึ่ง)", en: "Tone Changes of 不 and 一" },
        can_do: { th: "เปลี่ยนเสียง '不' (bù) เป็น 'bú' เมื่ออยู่หน้าเสียง 4 เช่น 不客气, 不是", en: "Change bù to bú in front of 4th tones" },
        baby_step_goal: "จำง่ายๆ: เสียง 4 ชนเสียง 4 ไม่ได้! ตัวหน้าต้องหลบขึ้นฟ้าเป็นเสียง 2 ทันที!",
        tone_rules: [
          {
            name: "不 (bù) + เสียง 4 ➔ bú + เสียง 4",
            explanation_th: "คำว่า 不 เดิมเป็นเสียง 4 แต่ถ้าตามด้วยเสียง 4 ตัว 不 จะผันเป็นเสียง 2 ทันที",
            examples: [
              { written: "不是 (bù shì)", spoken: "bú shì", meaning_th: "ไม่ใช่" },
              { written: "不要 (bù yào)", spoken: "bú yào", meaning_th: "ไม่เอา" },
              { written: "不客气 (bù kèqi)", spoken: "bú kèqi", meaning_th: "ไม่เป็นไร" }
            ]
          }
        ],
        quizzes: [
          {
            type: "listen_match",
            question_th: "เมื่อพูดคำว่า '不是' (ไม่ใช่) คำว่า '不' จะออกเสียงวรรณยุกต์ใด?",
            options: ["เสียง 1 (bū)", "เสียง 2 (bú)", "เสียง 3 (bǔ)", "เสียง 4 (bù)"],
            correct_index: 1,
            explanation_th: "เมื่ออยู่หน้าเสียง 4 (shì) ตัว 不 จะผันเป็นเสียง 2 ออกเสียงว่า 'bú shì'",
            encouragement: "ถูกเผงเลย! แปลงร่างคล่องแคล่วมาก!"
          }
        ],
        cheer_trophy: { badge_name: "นักเล่นแร่แปรเสียง 不 & 一 🪄", xp_reward: 35 }
      }
    ]
  },
  {
    unit_id: "tier0_u06",
    tier: 0,
    unit_number: 6,
    title: {
      zh: "汉字八大基本笔画",
      th: "8 เส้นขีดพื้นฐาน & 7 กฎลำดับขีด",
      en: "8 Basic Strokes & Stroke Order Rules"
    },
    description: "แปลงอักษรจีนเป็นบล็อกต่อเลโก้ สนุกกับ 8 เส้นขีดพื้นฐานและทิศทางลากเส้นที่ลื่นไหล",
    archetype: "phonetic_and_stroke",
    lessons: [
      {
        lesson_id: "t0_u06_l01",
        lesson_number: 1,
        title: { zh: "八大基本笔画", th: "8 เส้นขีดรากแก้วของอักษรจีน", en: "The 8 Fundamental Strokes" },
        can_do: { th: "บอกชื่อและทิศทางของ 8 เส้นขีดพื้นฐาน (ขวาง, ตั้ง, ปัดซ้าย, ปัดขวา, จุด, ตวัดขึ้น, หักมุม, ตะขอ) ได้", en: "Recognize and write the 8 fundamental Chinese strokes" },
        baby_step_goal: "จำคำว่า '永' (หย่ง - นิรันดร์) ตัวเดียวมีครบทั้ง 8 เส้นขีดเลยนะ!",
        stroke_cards: [
          { name_zh: "横", pinyin: "héng", name_th: "เส้นขวาง (นอน)", direction: "ลากจากซ้ายไปขวา ➡️", symbol: "一" },
          { name_zh: "竖", pinyin: "shù", name_th: "เส้นตั้ง (ดิ่ง)", direction: "ลากจากบนลงล่าง ⬇️", symbol: "丨" },
          { name_zh: "撇", pinyin: "piě", name_th: "เส้นปัดซ้าย", direction: "ลากจากบนปัดลงไปทางซ้ายล่าง ↙️", symbol: "丿" },
          { name_zh: "捺", pinyin: "nà", name_th: "เส้นปัดขวา", direction: "ลากจากบนปัดลงไปทางขวาล่าง ↘️", symbol: "乀" },
          { name_zh: "点", pinyin: "diǎn", name_th: "จุดหยดน้ำ", direction: "แตะจุดเล็กๆ จากบนลงขวา 💧", symbol: "丶" },
          { name_zh: "提", pinyin: "tí", name_th: "ตวัดขึ้น", direction: "ลากสะบัดจากซ้ายล่างขึ้นขวาบน ↗️", symbol: "㇁" },
          { name_zh: "折", pinyin: "zhé", name_th: "หักเลี้ยว", direction: "ลากเส้นแล้วหักมุมเป็นฉาก ↪️", symbol: "𠃍" },
          { name_zh: "钩", pinyin: "gōu", name_th: "ตะขอเกี่ยว", direction: "ลากแล้วตวัดงอปลายขึ้นเหมือนตะขอเบ็ด 🪝", symbol: "亅" }
        ],
        quizzes: [
          {
            type: "stroke_detective",
            question_th: "เส้น '横' (héng - เส้นนอน) ต้องลากเส้นไปในทิศทางใด?",
            options: ["จากขวาไปซ้าย", "จากซ้ายไปขวา", "จากล่างขึ้นบน", "วนเป็นวงกลม"],
            correct_index: 1,
            explanation_th: "เส้นขวางต้องลากจาก 'ซ้ายไปขวา' เสมออย่างมั่นคง",
            encouragement: "ยอดเยี่ยมมาก! ลากเส้นได้ตรงเป๊ะดั่งไม้บรรทัด!"
          }
        ],
        cheer_trophy: { badge_name: "ปรมาจารย์ 8 เส้นขีด ✍️", xp_reward: 40 }
      },
      {
        lesson_id: "t0_u06_l02",
        lesson_number: 2,
        title: { zh: "笔顺七大规则", th: "7 กฎทองของลำดับขีด: เขียนอย่างไรให้สวยลื่นไหล", en: "The 7 Golden Rules of Stroke Order" },
        can_do: { th: "เขียนตัวอักษรจีนตามลำดับ: บนลงล่าง, ซ้ายไปขวา, นอกเข้าใน แล้วปิดประตู", en: "Apply top-down, left-right, outside-in rules naturally" },
        baby_step_goal: "ท่องคาถา: 'เข้าบ้านให้เรียบร้อย แล้วค่อยปิดประตู!'",
        rules: [
          "1. บนลงล่าง (เช่น 三 - สาม)",
          "2. ซ้ายไปขวา (เช่น 川 - แม่น้ำ)",
          "3. ขวางก่อนตั้ง (เช่น 十 - สิบ)",
          "4. ปัดซ้ายก่อนปัดขวา (เช่น 八 - แปด)",
          "5. นอกก่อนใน (เช่น 月 - พระจันทร์)",
          "6. เข้าข้างในให้เสร็จแล้วปิดประตู (เช่น 日 - ดวงอาทิตย์, 回 - กลับ)",
          "7. แกนกลางก่อนสองข้าง (เช่น 小 - เล็ก, 水 - น้ำ)"
        ],
        quizzes: [
          {
            type: "stroke_detective",
            question_th: "เมื่อเขียนตัวอักษร '十' (สิบ) ต้องลากเส้นใดก่อน?",
            options: ["เส้นตั้ง (竖) ก่อน", "เส้นขวาง (横) ก่อน", "เส้นไหนก่อนก็ได้", "จุดตรงกลางก่อน"],
            correct_index: 1,
            explanation_th: "กฎทอง: 'ขวางก่อนตั้ง' ลากเส้นนอน héng แล้วค่อยลากเส้นตั้ง shù ผ่าลงมา",
            encouragement: "ถูกต้องนะคร้าบ! จำกฎขวางก่อนตั้งได้แม่นยำมาก!"
          }
        ],
        cheer_trophy: { badge_name: "สถาปนิกโครงสร้างอักษร 🏛️", xp_reward: 40 }
      }
    ]
  },
  {
    unit_id: "tier0_u07",
    tier: 0,
    unit_number: 7,
    title: {
      zh: "人体与情感部首",
      th: "หมวดนำมนุษย์ & อารมณ์ (亻, 女, 子, 口, 忄, 扌, 目, 讠)",
      en: "Human & Emotional Radicals"
    },
    description: "แกะรอยตัวอักษรจีนจากเงาร่างกายคน มือ ตา ปาก หัวใจ และคำพูด เดาความหมายศัพท์ได้ทันทีที่เห็น",
    archetype: "phonetic_and_stroke",
    lessons: [
      {
        lesson_id: "t0_u07_l01",
        lesson_number: 1,
        title: { zh: "人与五官手足", th: "หมวดคน มือ ปาก และดวงตา", en: "Body, Hands, Mouth & Eyes Radicals" },
        can_do: { th: "จำแนกหมวดนำ 亻 (คน), 扌 (มือ), 口 (ปาก), 目 (ตา) ในคำศัพท์ใหม่ได้ทันที", en: "Identify body-related radicals in unseen words" },
        baby_step_goal: "เห็นหมวดนำปุ๊บ รู้ปั๊บว่าคำนี้ต้องเกี่ยวกับคนและการกระทำแน่นอน!",
        radicals: [
          { radical: "亻", name_th: "หมวดคนยืน (单人旁)", meaning: "มนุษย์ / บุคคล", example: "你 (เธอ), 他 (เขา), 们 (พวก)" },
          { radical: "扌", name_th: "หมวดมือ (提手旁)", meaning: "มือ / การหยิบจับทำ", example: "打 (ตี), 找 (หา), 提 (ยก)" },
          { radical: "口", name_th: "หมวดปาก (口字旁)", meaning: "ปาก / การกินการพูด", example: "吃 (กิน), 喝 (ดื่ม), 叫 (เรียก)" },
          { radical: "目", name_th: "หมวดตา (目字旁)", meaning: "ดวงตา / การมองดู", example: "看 (ดู), 睡 (นอนหลับ), 睛 (ตาดำ)" }
        ],
        quizzes: [
          {
            type: "radical_detective",
            question_th: "คำว่า '吃' (chī - กิน) และ '喝' (hē - ดื่ม) มีหมวดนำเหมือนกันคือตัวใด?",
            options: ["亻 (คน)", "口 (ปาก)", "扌 (มือ)", "目 (ตา)"],
            correct_index: 1,
            explanation_th: "ทั้งกินและดื่มต้องใช้ 'ปาก' จึงมีหมวดนำ 口 อยู่ข้างหน้าเสมอ",
            encouragement: "เก่งกาจมาก! อ้าปากกินขนมชื่นใจ!"
          }
        ],
        cheer_trophy: { badge_name: "หมอตรวจร่างกายหมวดนำ 🩺", xp_reward: 40 }
      },
      {
        lesson_id: "t0_u07_l02",
        lesson_number: 2,
        title: { zh: "家庭、言语与内心", th: "หมวดครอบครัว คำพูด และหัวใจ", en: "Family, Speech & Heart Radicals" },
        can_do: { th: "เชื่อมโยงหมวด 女 (ผู้หญิง), 子 (เด็ก), 讠 (คำพูด), 忄 (หัวใจ) เข้ากับความหมายของคำ", en: "Connect emotional and speech radicals to meanings" },
        baby_step_goal: "เห็นคำว่ารัก คิดถึง หรือขอโทษ มองหาหมวดหัวใจ '忄' หรือคำพูด '讠' ได้เลย!",
        radicals: [
          { radical: "女", name_th: "หมวดผู้หญิง (女字旁)", meaning: "ผู้หญิง / แม่", example: "好 (ดี), 妈 (แม่), 姐 (พี่สาว)" },
          { radical: "子", name_th: "หมวดเด็ก (子字旁)", meaning: "ทารก / เด็ก / เมล็ด", example: "字 (ตัวหนังสือ), 孩 (เด็ก)" },
          { radical: "讠", name_th: "หมวดคำพูด (言字旁)", meaning: "ภาษา / คำพูด", example: "话 (พูด), 说 (คุย), 语 (ภาษา), 谢 (ขอบคุณ)" },
          { radical: "忄", name_th: "หมวดหัวใจตั้ง (竖心旁)", meaning: "อารมณ์ / ความรู้สึก", example: "忙 (ยุ่งใจ), 快 (สุขใจ), 怕 (กลัว)" }
        ],
        quizzes: [
          {
            type: "radical_detective",
            question_th: "หมวดนำ '讠' มักปรากฏในคำศัพท์ที่เกี่ยวข้องกับเรื่องใด?",
            options: ["อาหารการกิน", "การเดินท่องเที่ยว", "คำพูดและการสื่อสาร", "สภาพอากาศ"],
            correct_index: 2,
            explanation_th: "讠 พัฒนามาจากตัว 言 หมายถึง 'คำพูดและภาษา'",
            encouragement: "ยอดเยี่ยม! ฟังคำพูดหวานๆ พูดขอบคุณได้คล่องแคล่ว!"
          }
        ],
        cheer_trophy: { badge_name: "ทูตแห่งความรู้สึกและคำพูด 💖", xp_reward: 40 }
      }
    ]
  },
  {
    unit_id: "tier0_u08",
    tier: 0,
    unit_number: 8,
    title: {
      zh: "自然与五行部首",
      th: "หมวดนำธรรมชาติ & ธาตุทั้ง 5 (氵, 火/灬, 木, 日, 土, 艹)",
      en: "Nature & Elemental Radicals"
    },
    description: "สัมผัสพลังธรรมชาติในอักษรจีน: สายน้ำ กองไฟ ต้นไม้ แสงอาทิตย์ ผืนดิน และพงหญ้า",
    archetype: "phonetic_and_stroke",
    lessons: [
      {
        lesson_id: "t0_u08_l01",
        lesson_number: 1,
        title: { zh: "水火木日土草", th: "6 ธาตุธรรมชาติในตัวอักษรจีน", en: "The 6 Nature Elements in Chinese Characters" },
        can_do: { th: "เดาคำศัพท์เกี่ยวกับน้ำ ไฟ ต้นไม้ และพืช จากหมวดนำธรรมชาติได้", en: "Deduce nature-related meanings from radical elements" },
        baby_step_goal: "3 หยดน้ำ = ของเหลว / 4 จุดไฟ = ความร้อนปิ้งย่าง!",
        radicals: [
          { radical: "氵", name_th: "หมวดน้ำสามหยด (三点水)", meaning: "น้ำ / ของเหลว", example: "河 (แม่น้ำ), 洗 (ล้าง), 海 (ทะเล)" },
          { radical: "火 / 灬", name_th: "หมวดไฟ (火字旁/四点底)", meaning: "ไฟ / ความร้อน / การปรุงอาหาร", example: "热 (ร้อน), 炒 (ผัด), 烤 (ย่าง)" },
          { radical: "木", name_th: "หมวดไม้ (木字旁)", meaning: "ต้นไม้ / ไม้", example: "杯 (แก้วน้ำ), 桌 (โต๊ะ), 椅 (เก้าอี้)" },
          { radical: "日", name_th: "หมวดพระอาทิตย์ (日字旁)", meaning: "ดวงอาทิตย์ / วันเวลา", example: "明 (สว่าง), 早 (เช้า), 时 (เวลา)" },
          { radical: "土", name_th: "หมวดดิน (土字旁)", meaning: "ผืนดิน / สถานที่", example: "地 (พื้นดิน), 场 (ลานกว้าง)" },
          { radical: "艹", name_th: "หมวดหญ้า (草字头)", meaning: "พืชผัก / ดอกไม้ / ชา", example: "茶 (ชา), 菜 (ผัก), 药 (ยาสมุนไพร)" }
        ],
        quizzes: [
          {
            type: "radical_detective",
            question_th: "คำว่า '茶' (chá - ชา) และ '菜' (cài - ผัก) มีหมวดนำด้านบนคือตัวใด?",
            options: ["氵 (น้ำ)", "艹 (หญ้า/พืช)", "木 (ต้นไม้)", "日 (ดวงอาทิตย์)"],
            correct_index: 1,
            explanation_th: "ใบชาและผักเป็นพืช จึงมีหมวดนำหัวหญ้า '艹' อยู่ด้านบนเสมอ",
            encouragement: "เก่งกาจมาก! ได้กลิ่นหอมของใบชาเลยล่ะ!"
          }
        ],
        cheer_trophy: { badge_name: "พิทักษ์ธรรมชาติแห่งพงไพร 🌲", xp_reward: 45 }
      }
    ]
  },
  {
    unit_id: "tier0_u09",
    tier: 0,
    unit_number: 9,
    title: {
      zh: "空间与物品部首",
      th: "หมวดนำสถานที่ & สิ่งของ (辶, 宀, 门, 饣, 贝, 刂)",
      en: "Spatial & Object Radicals"
    },
    description: "ท่องเมืองอักษรจีน: หลังคาบ้าน ประตู การเดินทาง อาหาร เงินทอง และของมีคม",
    archetype: "phonetic_and_stroke",
    lessons: [
      {
        lesson_id: "t0_u09_l01",
        lesson_number: 1,
        title: { zh: "空间、行走与器物", th: "หลังคาบ้าน ประตู การก้าวเดิน และของใช้", en: "Shelter, Gates, Motion & Objects" },
        can_do: { th: "ระบุหมวดหลังคาบ้าน (宀), การเดินทาง (辶), อาหาร (饣), เงินทอง (贝) ได้อย่างแม่นยำ", en: "Identify spatial and utilitarian radicals in HSK vocabulary" },
        baby_step_goal: "เห็นหลังคาบ้าน 宀 นึกถึงบ้านอันแสนอบอุ่น / เห็น 辶 นึกถึงการเดินไปข้างหน้า!",
        radicals: [
          { radical: "宀", name_th: "หมวดหลังคาบ้าน (宝盖头)", meaning: "บ้าน / อาคารที่พัก", example: "家 (บ้าน), 安 (ปลอดภัย), 定 (แน่นอน)" },
          { radical: "辶", name_th: "หมวดการเดินทาง (走之底)", meaning: "เดิน / ระยะทาง / ยานพาหนะ", example: "进 (เข้า), 远 (ไกล), 近 (ใกล้), 迎 (ต้อนรับ)" },
          { radical: "门", name_th: "หมวดประตู (门字框)", meaning: "ประตู / ทางเข้า", example: "问 (ถาม - เอาปากไปถามที่ประตู), 间 (ห้อง)" },
          { radical: "饣", name_th: "หมวดอาหาร (食字旁)", meaning: "อาหารการกิน", example: "饭 (ข้าว), 饱 (อิ่ม), 饺 (เกี๊ยว)" },
          { radical: "贝", name_th: "หมวดเปลือกหอยเงินทอง (贝字旁)", meaning: "เงินตรา / มีค่า / ซื้อขาย", example: "贵 (แพง), 财 (ทรัพย์สิน), 买 (ซื้อ)" },
          { radical: "刂", name_th: "หมวดมีดตั้ง (立刀旁)", meaning: "มีด / การตัดแบ่ง", example: "分 (แบ่ง), 别 (ลาจาก / อย่า), 刚 (เพิ่งจะ)" }
        ],
        quizzes: [
          {
            type: "radical_detective",
            question_th: "ตัวอักษร '家' (jiā - บ้าน) มีหมวดนำด้านบนคือหมวดใด?",
            options: ["宀 (หลังคาบ้าน)", "门 (ประตู)", "辶 (การเดินทาง)", "艹 (หญ้า)"],
            correct_index: 0,
            explanation_th: "宀 คือหลังคาบ้าน ข้างล่างคือ 豕 (หมู) = ใต้หลังคามีสัตว์เลี้ยงคือ 'บ้าน' อันอบอุ่น",
            encouragement: "ยอดเยี่ยมมาก! อบอุ่นเหมือนอยู่บ้านเลย!"
          }
        ],
        cheer_trophy: { badge_name: "นักสำรวจเมืองอักษรจีน 🏰", xp_reward: 45 }
      }
    ]
  },
  {
    unit_id: "tier0_u10",
    tier: 0,
    unit_number: 10,
    title: {
      zh: "幼苗破土毕业试炼",
      th: "Tier 0 Boss Quest: ถอดรหัสเสียงและแกะรอย 10 อักษรแรก",
      en: "Tier 0 Boss Quest: The Seed Graduation"
    },
    description: "บททดสอบรวมมิตรด่านสุดท้ายของ Tier 0 รวมพลังฟังเสียง ผันวรรณยุกต์ และประกอบร่างตัวอักษรเพื่อคว้าเข็มกลัดต้นกล้าผลิใบ!",
    archetype: "boss_quest",
    lessons: [
      {
        lesson_id: "t0_u10_l01",
        lesson_number: 1,
        title: { zh: "幼苗大闯关", th: "ภารกิจพิชิตพินอิน & รากแก้วอักษรจีน", en: "The Seed Graduation Trial" },
        can_do: { th: "พิชิตแบบทดสอบรวมมิตรระบบเสียงพินอิน วรรณยุกต์ และหมวดนำได้ 100% พร้อมก้าวสู่ Tier 1", en: "Pass comprehensive phonetics & radical trial and advance to Tier 1" },
        baby_step_goal: "ตอบถูก 4 ข้อเพื่อปลดล็อกเข็มกลัดเกียรติยศต้นกล้าผลิใบ!",
        quizzes: [
          {
            type: "listen_match",
            question_th: "ข้อใดคือการสะกดพินอินที่ถูกต้องของคำว่า 'ม้า' (mǎ)?",
            options: ["mā (เสียง 1)", "má (เสียง 2)", "mǎ (เสียง 3)", "mà (เสียง 4)"],
            correct_index: 2,
            explanation_th: "马 (ม้า) ออกเสียงว่า mǎ วรรณยุกต์เสียงที่ 3 (สไลเดอร์ตีลังกา)",
            encouragement: "ถูกต้อง! ขี่ม้าวิ่งฉิวเลย!"
          },
          {
            type: "radical_detective",
            question_th: "หากต้องการเขียนคำว่า '喝' (hē - ดื่มน้ำ) หมวดนำด้านหน้าสุดต้องเป็นตัวใด?",
            options: ["氵 (น้ำสามหยด)", "口 (ปาก)", "扌 (มือ)", "火 (ไฟ)"],
            correct_index: 1,
            explanation_th: "ดื่มน้ำเป็นการกระทำที่ใช้ 'ปาก' จึงมีหมวดนำ 口 อยู่ข้างหน้า",
            encouragement: "เป๊ะมาก! วิเคราะห์หมวดนำได้เฉียบคม!"
          },
          {
            type: "listen_match",
            question_th: "คำว่า '再见' (zàijiàn - ลาก่อน) ตัวพยัญชนะ 'z' จัดเป็นกลุ่มเสียงใด?",
            options: ["ลิ้นม้วนขึ้นเพดานปาก", "ลิ้นแบนชิดหลังฟันล่าง (平舌音)", "พ่นลมแรงจนกระดาษปลิว", "เสียงขึ้นจมูก"],
            correct_index: 1,
            explanation_th: "z เป็นกลุ่มลิ้นแบนราบชิดหลังฟัน (平舌音)",
            encouragement: "สุดยอดมาก! แยกแยะตำแหน่งลิ้นได้อย่างมืออาชีพ!"
          },
          {
            type: "listen_match",
            question_th: "เมื่อคำว่า '你好' พูดเร็วๆ ในชีวิตจริง จะออกเสียงเป็นทำนองใด?",
            options: ["หนี่ - ห่าว", "หนี - ห่าว (ผันคำหน้าเป็นเสียง 2)", "หนี่ - หาว", "นี่ - ห่าว"],
            correct_index: 1,
            explanation_th: "กฎ 3+3 ➔ 2+3 ผันเป็น 'ní hǎo' (หนีห่าว)",
            encouragement: "ยินดีด้วย! คุณสำเร็จหลักสูตร Tier 0: Seed เรียบร้อยแล้ว!"
          }
        ],
        boss_challenge: {
          scenario_th: "น้องกระต่ายทู่ทู่เดินมาหาคุณที่ประตูเมืองฮั่นซีโร่ ยื่นมือมาจับและพูดว่า '你好！' คุณผ่านการฝึกฝนระบบเสียงมาทั้งหมด คุณจะทักทายตอบกลับอย่างไรให้ไพเราะที่สุด?",
          options: ["Ní hǎo! (หนีห่าว) พร้อมส่งรอยยิ้มหวาน", "ไม่พูดอะไรเลยเพราะกลัวผันเสียงผิด", "Bù hǎo! (ปู้ห่าว)", "Zàijiàn! (ไจ้เจี้ยนทันที)"],
          correct_index: 0,
          explanation_th: "ทักทายกลับด้วย 'Ní hǎo!' ด้วยรอยยิ้มและความมั่นใจ!",
          encouragement: "🎉 ว้าว! คุณผ่านการทดสอบต้นกล้าสำเร็จแล้ว น้องกระต่ายทู่ทู่กำลังมอบเข็มกลัดให้คุณ!"
        },
        cheer_trophy: {
          badge_id: "badge_t0_graduation",
          badge_name: "ต้นกล้าผู้กล้าหาญผลิใบ 🌱✨",
          message_th: "ขอแสดงความยินดีด้วยอย่างยิ่ง! คุณผ่านด่านระบบเสียงพินอิน วรรณยุกต์ และ 8 เส้นขีดอักษรจีนเรียบร้อยแล้ว รากฐานมั่นคง พร้อมก้าวสู่การใช้ชีวิตจริงใน Tier 1: Explorer ได้อย่างเต็มภาคภูมิ!",
          xp_reward: 250
        }
      }
    ]
  }
];

// Write Tier 0 units
tier0Units.forEach(u => {
  const filePath = path.join(baseDir, 'tier0', `${u.unit_id.replace('tier0_u', 'unit')}_${getSlug(u.unit_id)}.json`);
  fs.writeFileSync(filePath, JSON.stringify(u, null, 2), 'utf8');
  console.log(`Created: ${filePath}`);
});

function getSlug(unitId) {
  const map = {
    tier0_u01: "initials_finals_part1",
    tier0_u02: "initials_finals_part2",
    tier0_u03: "tones_mastery",
    tier0_u04: "retroflex_vs_dental",
    tier0_u05: "tone_sandhi",
    tier0_u06: "stroke_basics",
    tier0_u07: "human_radicals",
    tier0_u08: "nature_radicals",
    tier0_u09: "object_radicals",
    tier0_u10: "seed_boss_quest"
  };
  return map[unitId] || "unit";
}

console.log("Tier 0 generation finished.");
