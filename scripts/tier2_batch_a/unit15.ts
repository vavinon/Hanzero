/**
 * scripts/tier2_batch_a/unit15.ts
 * Tier 2 Unit 15: 餐厅点菜进阶 (Advanced Dining & Regional Flavors)
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

export const unit15 = {
  unit_id: 'tier2_u15',
  tier: 2,
  unit_number: 15,
  title: {
    zh: '餐厅点菜进阶',
    th: 'อาหารจีนเชิงลึก & รสชาติท้องถิ่น',
    en: 'Advanced Dining & Regional Flavors'
  },
  description: 'ลิ้มลองอาหาร 4 ภาคของจีน ระบุรสชาติเฉพาะตัว แจ้งข้อห้ามและอาการแพ้อาหาร จัดเลี้ยงเพื่อนคนจีน และขอใบเสร็จออกใบกำกับภาษี',
  lessons: [
    {
      lesson_id: 't2_u15_l01',
      lesson_number: 1,
      title: {
        zh: '特色风味与招牌菜',
        th: 'เอกลักษณ์อาหาร 4 ภาค & เมนูซิกเนเจอร์',
        en: 'Regional Flavors & Signature Dishes'
      },
      can_do: {
        th: 'แยกความแตกต่างของอาหารเสฉวน (川菜) กับกวางตุ้ง (粤菜) สั่งเมนูเด็ดประจำร้าน และใช้โครงสร้าง "越...越..."',
        en: 'Distinguish Sichuan from Cantonese cuisines, order signature dishes, and use "越...越..."'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ถามหาเมนูเด็ดประจำร้านและบอกว่า "ยิ่งกินยิ่งอร่อย" เป็นภาษาจีนได้!',
      vocabulary: [
        {
          id: 'hsk2_1501',
          hanzi: '川菜',
          pinyin: 'Chuāncài',
          display_pinyin: 'Chuāncài',
          pinyin_tone: 'chuan1cai4',
          meaning_th: 'อาหารเสฉวน (รสเผ็ดชา หอมเครื่องเทศ)',
          meaning_en: 'Sichuan cuisine',
          radical: '川',
          radical_name_th: 'หมวดแม่น้ำสามสาย (川字旁)',
          stroke_count: 14,
          mnemonic: 'อาหารผักหญ้า (菜) จากดินแดนสายน้ำเสฉวน (川) = อาหารเสฉวน',
          kid_mnemonic: 'หม้อไฟสีแดงพริกไทยลอยฟ่อง ชาลิ้นซี้ดซ้าด = 川菜',
          body_gesture: 'เอามือพัดปากทำท่าเผ็ดชาอร่อย'
        },
        {
          id: 'hsk2_1502',
          hanzi: '粤菜',
          pinyin: 'Yuècài',
          display_pinyin: 'Yuècài',
          pinyin_tone: 'yue4cai4',
          meaning_th: 'อาหารกวางตุ้ง (รสสด ละมุน เน้นวัตถุดิบแท้)',
          meaning_en: 'Cantonese cuisine',
          radical: '米',
          radical_name_th: 'หมวดเมล็ดข้าว (米字旁)',
          stroke_count: 23,
          mnemonic: 'อาหารรสประณีต (菜) จากมณฑลกวางตุ้ง (粤) = อาหารกวางตุ้ง',
          kid_mnemonic: 'ติ่มซำเข่งไม้ไผ่ควันฉุย กุ้งเด้งสดหวาน = 粤菜',
          body_gesture: 'สองมือทำท่าหยิบติ่มซำเข้าปากเคี้ยวตุ้ยๆ'
        },
        {
          id: 'hsk2_1503',
          hanzi: '招牌菜',
          pinyin: 'zhāopáicài',
          display_pinyin: 'zhāopáicài',
          pinyin_tone: 'zhao1pai2cai4',
          meaning_th: 'เมนูเด็ดประจำร้าน / ซิกเนเจอร์ดิช',
          meaning_en: 'signature dish / specialty',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 23,
          mnemonic: 'กวักมือเรียก (招) ให้มาชิมจานเด็ดที่เขียนบนป้ายหน้าร้าน (牌菜) = เมนูเด็ดประจำร้าน',
          kid_mnemonic: 'เมนูติดดาวทองหน้าแรกที่ทุกคนต้องสั่ง = 招牌菜',
          body_gesture: 'ยกนิ้วโป้งสองข้างชูการันตีความอร่อย'
        },
        {
          id: 'hsk2_1504',
          hanzi: '特色',
          pinyin: 'tèsè',
          display_pinyin: 'tèsè',
          pinyin_tone: 'te4se4',
          meaning_th: 'เอกลักษณ์ / จุดเด่นเฉพาะตัว',
          meaning_en: 'characteristic / specialty',
          radical: '牜',
          radical_name_th: 'หมวดวัว (牛字旁)',
          stroke_count: 16,
          mnemonic: 'ความพิเศษโดดเด่น (特) ที่มีสีสันเฉพาะตัว (色) = เอกลักษณ์',
          kid_mnemonic: 'ชุดเสื้อผ้าหลากสีสันไม่เหมือนใคร = 特色',
          body_gesture: 'สองมือวาดดาวประกายวิบวับในอากาศ'
        },
        {
          id: 'hsk2_1505',
          hanzi: '口味',
          pinyin: 'kǒuwèi',
          display_pinyin: 'kǒuwèi',
          pinyin_tone: 'kou3wei4',
          meaning_th: 'รสปาก / รสนิยมความชอบในรสชาติ',
          meaning_en: 'taste / flavor preference',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 11,
          mnemonic: 'ปลายลิ้นและริมฝีปาก (口) สัมผัสถึงรสชาติ (味) = รสปาก',
          kid_mnemonic: 'เลียริมฝีปาก อื้มมม รสชาติตรงใจ = 口味',
          body_gesture: 'เอานิ้วชี้แตะริมฝีปากพยักหน้าถูกใจ'
        },
        {
          id: 'hsk2_1506',
          hanzi: '地道',
          pinyin: 'dìdao',
          display_pinyin: 'dìdao',
          pinyin_tone: 'di4dao',
          meaning_th: 'ต้นตำรับ / รสดั้งเดิมแท้ๆ แท้ทรู',
          meaning_en: 'authentic / genuine',
          radical: '土',
          radical_name_th: 'หมวดดิน (土字旁)',
          stroke_count: 18,
          mnemonic: 'วิถีทาง (道) ที่กำเนิดจากผืนแผ่นดินถิ่นนั้นอย่างแท้จริง (地) = ต้นตำรับแท้ๆ',
          kid_mnemonic: 'เป็ดย่างปักกิ่งสูตรโบราณ รสชาติต้นตำรับ = 地道',
          body_gesture: 'ยกสองมือผายออกแสดงความยอดเยี่ยมของต้นตำรับ'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำว่า 地道 (dìdao) เป็นเสียงเบา',
        description_th: 'คำว่า 地 (dì เสียงที่ 4) เมื่อคู่กับ 道 ในความหมายว่า "ต้นตำรับ/แท้ทรู" คำว่า 道 จะออกเป็นเสียงเบา (Neutral Tone) คือ "dìdao"',
        example: '这家川菜很地道 (Zhè jiā Chuāncài hěn dìdao)',
        fun_metaphor: 'เสียงสี่หนักแน่นแล้วตามด้วยเสียงเบาสบายๆ เหมือนเคาะโต๊ะแล้วพยักหน้าว่า "ของแท้แน่นอน!"',
        reassurance: 'ชมร้านอาหารว่า hěn dìdao เจ้าของร้านจะยิ้มแก้มปริและแถมของหวานให้แน่นอน!'
      },
      grammar_bite: {
        title: 'โครงสร้างความทวีคูณ: 越...越... (ยิ่ง...ก็ยิ่ง...)',
        explanation_th: 'ใช้ 越 + กริยา/คุณศัพท์ A + 越 + กริยา/คุณศัพท์ B เพื่อบอกว่า ยิ่งทำสิ่งหนึ่ง ผลลัพธ์ก็ยิ่งเพิ่มพูน',
        patterns: [
          {
            formula: '越 + [กริยา] + 越 + [คุณศัพท์]',
            zh: '麻婆豆腐越吃越辣，越吃越香！',
            pinyin: 'Mápó dòufu yuè chī yuè là, yuè chī yuè xiāng!',
            th: 'เต้าหู้มาโปยิ่งกินก็ยิ่งเผ็ด ยิ่งกินก็ยิ่งหอมกลมกล่อม!',
            en: 'Mapo tofu is spicier and more fragrant the more you eat!'
          },
          {
            formula: '你们店有什么 + 招牌菜？',
            zh: '请问你们店有什么招牌菜？',
            pinyin: 'Qǐngwèn nǐmen diàn yǒu shénme zhāopáicài?',
            th: 'ขอถามหน่อยครับ ร้านของคุณมีเมนูซิกเนเจอร์เด็ดๆ อะไรบ้างครับ?',
            en: 'Excuse me, what are your restaurant\'s signature dishes?'
          },
          {
            formula: '这个菜的味道非常 + 地道',
            zh: '这道烤鸭的味道非常地道。',
            pinyin: 'Zhè dào kǎoyā de wèidào fēicháng dìdao.',
            th: 'รสชาติของเป็ดย่างจานนี้ต้นตำรับแท้ๆ เลยครับ',
            en: 'The flavor of this roast duck is very authentic.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'บริกรหญิงร้านอาหารจีน 💁‍♀️',
          zh: '欢迎光临！两位先生请坐！这是我们的菜单，请问想吃点儿什么？',
          pinyin: 'Huānyíng guānglín! Liǎng wèi xiānsheng qǐng zuò! Zhè shì wǒmen de càidān, qǐngwèn xiǎng chī diǎnr shénme?',
          th: 'ยินดีต้อนรับค่ะ! สุภาพบุรุษสองท่านเชิญนั่งค่ะ! นี่คือเมนูของเรา อยากทานอะไรดีคะ?',
          en: 'Welcome! Gentlemen please take a seat! Here is our menu, what would you like?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '你好！我们第一次来，请问你们店有什么招牌菜和特色菜？',
          pinyin: 'Nǐ hǎo! Wǒmen dì-yī cì lái, qǐngwèn nǐmen diàn yǒu shénme zhāopáicài hé tèsècài?',
          th: 'สวัสดีครับ! พวกเรามาครั้งแรก ขอถามหน่อยทางร้านมีเมนูเด็ดและอาหารขึ้นชื่ออะไรบ้างครับ?',
          en: 'Hello! First time here, what are your signature dishes and specialties?'
        },
        {
          speaker: 'A',
          speaker_name: 'บริกรหญิงร้านอาหารจีน 💁‍♀️',
          zh: '我们家是地道川菜馆，招牌菜是水煮牛肉和宫保鸡丁，口味麻辣鲜香。',
          pinyin: 'Wǒmen jiā shì dìdao Chuāncàiguǎn, zhāopáicài shì shuǐzhǔ niúròu hé gōngbǎo jīdīng, kǒuwèi málà xiān xiāng.',
          th: 'ร้านเราเป็นร้านอาหารเสฉวนแท้ต้นตำรับค่ะ จานเด็ดคือเนื้อต้มพริกเสฉวนกับไก่ผัดถั่วลิสง รสชาติเผ็ดชาหอมสดชื่นค่ะ',
          en: 'We are authentic Sichuan restaurant, specialties are boiled beef and Kung Pao chicken, spicy and fragrant.'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '太诱人了！这两道招牌菜各来一份，米饭两碗，谢谢！',
          pinyin: 'Tài yòurén le! Zhè liǎng dào zhāopáicài gè lái yí fèn, mǐfàn liǎng wǎn, xièxie!',
          th: 'น่าทานมากๆ ครับ! เอาสองเมนูเด็ดนี้อย่างละหนึ่งที่ ข้าวสวยสองถ้วย ขอบคุณครับ!',
          en: 'So tempting! One serving for each of these two specialties, two bowls of rice, thanks!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อต้องการถามพนักงานว่า 'ร้านนี้มีเมนูเด็ดซิกเนเจอร์อะไรบ้าง' ควรพูดประโยคใด?",
          options: [
            '请问你们店有什么招牌菜？',
            '请问洗手间在哪里？',
            '我要改签高铁票。',
            '押金能退吗？'
          ],
          correct_index: 0,
          explanation_th: "'招牌菜' คือ เมนูซิกเนเจอร์จานเด็ดของร้าน เป็นประโยคยอดนิยมสำหรับนักชิม",
          encouragement: 'ยอดเยี่ยมมาก! สั่งอาหารจานเด็ดได้เหมือนกูรูนักชิม!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ยิ่งกินก็ยิ่งเผ็ด ยิ่งกินก็ยิ่งหอม"',
          tokens: ['越吃越香', '越吃越辣'],
          correct_sequence: ['越吃越辣', '越吃越香'],
          pinyin: 'Yuè chī yuè là, yuè chī yuè xiāng',
          meaning_th: 'ยิ่งกินก็ยิ่งเผ็ด ยิ่งกินก็ยิ่งหอม',
          explanation_th: 'โครงสร้าง 越...越...: 越吃越辣 (ยิ่งกินยิ่งเผ็ด) + 越吃越香 (ยิ่งกินยิ่งหอม)',
          encouragement: 'ต่อบล็อกไวยากรณ์ 越...越... ได้คล่องแคล่วเป๊ะเวอร์!'
        },
        {
          type: 'flash_recall',
          question_th: "อาหารเสฉวน (川菜) มีลักษณะเด่นด้านรสชาติอย่างไร?",
          options: [
            'เผ็ดชา หอมกลมกล่อม (麻辣鲜香)',
            'จืดสนิท ไม่มีรสชาติ',
            'หวานจัดและเย็นเฉียบ',
            'เปรี้ยวแหลมอย่างเดียว'
          ],
          correct_index: 0,
          explanation_th: "อาหารเสฉวนมีเอกลักษณ์คือ '麻辣' (หมาล่า: เผ็ดและชาที่ปลายลิ้นจากพริกและฮวาเจียว)",
          encouragement: 'เข้าใจวัฒนธรรมอาหารจีนอย่างลึกซึ้ง!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '川' ในคำว่า '川菜' มีรูปร่างจำลองมาจากสิ่งใด?",
          options: [
            'สายน้ำแม่น้ำสามสายที่ไหลขนานกัน',
            'ต้นไม้สามต้น',
            'ภูเขาสามลูก',
            'เปลวไฟสามกอง'
          ],
          correct_index: 0,
          explanation_th: "'川' จำลองมาจากเส้นทางน้ำไหลของแม่น้ำหลายสายในดินแดนเสฉวน (四川)",
          encouragement: 'จำรากศัพท์อักษรจีนได้แม่นยำมาก!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณพาเพื่อนมาทานอาหารค่ำที่ร้านอาหารชื่อดังในเฉิงตู ต้องการถามบริกรอย่างสุภาพว่า "ร้านของคุณมีเมนูเด็ดอะไรบ้าง และรสชาติเป็นแบบต้นตำรับแท้ๆ ไหม" ควรพูดว่าอย่างไร?',
        options: [
          '服务员您好！请问你们店有什么招牌菜？口味地道吗？ (Fúwùyuán nín hǎo! Qǐngwèn nǐmen diàn yǒu shénme zhāopáicài? Kǒuwèi dìdao ma?)',
          '对不起，我想要一张发票。 (Duìbuqǐ, wǒ xiǎng yào yì zhāng fāpiào.)',
          '退票需要手续费吗？ (Tuìpiào xūyào shǒuxùfèi ma?)',
          '这里可以寄快递吗？ (Zhèlǐ kěyǐ jì kuàidì ma?)'
        ],
        correct_index: 0,
        explanation_th: "ประโยค '服务员您好！请问你们店有什么招牌菜？口味地道吗？' ถามได้ครบถ้วนทั้งเมนูแนะนำ (招牌菜) และความเป็นต้นตำรับ (地道)",
        encouragement: 'สุดยอดการสื่อสาร! สั่งอาหารร้านดังได้อย่างมั่นใจไร้กังวล!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u15_l01',
        badge_name: 'กูรูนักชิมอาหาร 4 ภาค 🍲🥢',
        message_th: 'ยินดีด้วยนะคนเก่ง! คุณสามารถแยกอาหารเสฉวน กวางตุ้ง และสั่งเมนูเด็ดประจำร้านได้อย่างเชี่ยวชาญ!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't2_u15_l02',
      lesson_number: 2,
      title: {
        zh: '饮食忌口与特殊要求',
        th: 'ระบุข้อจำกัดอาหาร & แจ้งอาการแพ้',
        en: 'Dietary Restrictions & Allergies'
      },
      can_do: {
        th: 'ระบุรสชาติที่ต้องการ (เผ็ดน้อย, ไม่ใส่ต้นหอม, น้ำมันน้อย, หวานน้อย) และแจ้งอาการแพ้อาหารได้อย่างปลอดภัย 100%',
        en: 'Specify custom taste (mild spicy, no green onions, less oil/sugar) and communicate food allergies safely'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พูดบอกว่า "ฉันแพ้ถั่วลิสง และขอเผ็ดน้อยไม่ใส่ต้นหอม" ได้อย่างชัดเจน!',
      vocabulary: [
        {
          id: 'hsk2_1507',
          hanzi: '忌口',
          pinyin: 'jìkǒu',
          display_pinyin: 'jìkǒu',
          pinyin_tone: 'ji4kou3',
          meaning_th: 'อาหารต้องห้าม / ข้อจำกัดในการรับประทาน',
          meaning_en: 'dietary restrictions / avoid food',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 10,
          mnemonic: 'ตั้งใจละเว้น (忌) ไม่นำสิ่งนั้นเข้าสู่ริมฝีปาก (口) = อาหารต้องห้าม',
          kid_mnemonic: 'ส่ายหน้าโบกมือว่า "ของจานนี้หนูทานไม่ได้จ้า" = 忌口',
          body_gesture: 'สองมือทำเครื่องหมายกากบาทไขว้กันระดับอก'
        },
        {
          id: 'hsk2_1508',
          hanzi: '微辣',
          pinyin: 'wēilà',
          display_pinyin: 'wēilà',
          pinyin_tone: 'wei1la4',
          meaning_th: 'เผ็ดน้อย / เผ็ดเบาๆ พอเป็นพิธี',
          meaning_en: 'mildly spicy / a little spicy',
          radical: '彳',
          radical_name_th: 'หมวดก้าวเดินคู่ (双人旁)',
          stroke_count: 27,
          mnemonic: 'รสเผ็ดร้อน (辣) เพียงเล็กน้อยนิดเดียว (微) = เผ็ดน้อย',
          kid_mnemonic: 'พริกสีแดงจิ๋วครึ่งเม็ด อร่อยกำลังดีไม่แสบปาก = 微辣',
          body_gesture: 'จีบนิ้วโป้งกับนิ้วชี้บอกว่า "เผ็ดนิดเดียวพอนะจ๊ะ"'
        },
        {
          id: 'hsk2_1509',
          hanzi: '免葱',
          pinyin: 'miǎncōng',
          display_pinyin: 'miǎncōng',
          pinyin_tone: 'mian3cong1',
          meaning_th: 'ไม่ใส่ต้นหอม (ยกเว้นต้นหอม)',
          meaning_en: 'no scallions / no green onions',
          radical: '刀',
          radical_name_th: 'หมวดมีด (刀字部)',
          stroke_count: 19,
          mnemonic: 'ยกเว้นไม่ต้องใส่ (免) ต้นหอมซอยสีเขียว (葱) = ไม่ใส่ต้นหอม',
          kid_mnemonic: 'เขี่ยต้นหอมออก ชามนี้ไม่เอาหอมเลยจ้า = 免葱',
          body_gesture: 'โบกมือปฏิเสธเบาๆ'
        },
        {
          id: 'hsk2_1510',
          hanzi: '少油',
          pinyin: 'shǎoyóu',
          display_pinyin: 'shǎoyóu',
          pinyin_tone: 'shao3you2',
          meaning_th: 'น้ำมันน้อย / ไม่มันเยิ้ม',
          meaning_en: 'less oil',
          radical: '小',
          radical_name_th: 'หมวดเล็ก (小字旁)',
          stroke_count: 12,
          mnemonic: 'ใช้น้ำมันปรุงอาหาร (油) ในปริมาณน้อยๆ (少) = น้ำมันน้อย',
          kid_mnemonic: 'หยดน้ำมันแค่หยดเดียว สุขภาพดี = 少油',
          body_gesture: 'ใช้นิ้วชี้ลดระดับลงแสดงถึงปริมาณที่น้อยลง'
        },
        {
          id: 'hsk2_1511',
          hanzi: '少糖',
          pinyin: 'shǎotáng',
          display_pinyin: 'shǎotáng',
          pinyin_tone: 'shao3tang2',
          meaning_th: 'หวานน้อย / ใส่น้ำตาลน้อย',
          meaning_en: 'less sugar',
          radical: '小',
          radical_name_th: 'หมวดเล็ก (小字旁)',
          stroke_count: 20,
          mnemonic: 'ใส่น้ำตาลทราย (糖) ในปริมาณน้อย (少) = หวานน้อย',
          kid_mnemonic: 'ตักน้ำตาลครึ่งช้อน ชานมไม่หวานเกินไป = 少糖',
          body_gesture: 'ทำท่าช้อนตักน้ำตาลนิดเดียว'
        },
        {
          id: 'hsk2_1512',
          hanzi: '过敏',
          pinyin: 'guòmǐn',
          display_pinyin: 'guòmǐn',
          pinyin_tone: 'guo4min3',
          meaning_th: 'แพ้ (อาหาร / ละอองเกสร / สารต่างๆ)',
          meaning_en: 'allergic to / allergy',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之底)',
          stroke_count: 17,
          mnemonic: 'ร่างกายมีปฏิกิริยาไวเกินไป (敏) จนเกินขอบเขตปกติ (过) = อาการแพ้',
          kid_mnemonic: 'มีผื่นแดงขึ้น คันยิบๆ ห้ามทานเด็ดขาด = 过敏',
          body_gesture: 'เอามือเกาแขนเบาๆ ทำหน้าเตือนว่ามีอาการแพ้'
        }
      ],
      tone_rule: {
        rule_name: 'กฎการผันเสียงของ 不 在 不要 (bú yào)',
        description_th: 'คำว่า 不 (bù เสียง 4) เมื่ออยู่หน้า 要 (yào เสียง 4) จะต้องผันขึ้นเป็นเสียงที่ 2 คือ "bú"',
        example: '不要放辣椒 (bú yào fàng làjiāo), 不要香菜 (bú yào xiāngcài)',
        fun_metaphor: 'เสียงสี่ชนเสียงสี่ไม่ดี ต้องสไลด์เหินฟ้าขึ้น bú แล้วทิ้งดิ่ง yào ชัดเจน!',
        reassurance: 'พูด bú yào สบายๆ คล่องปาก พ่อครัวจะเข้าใจทันทีว่าไม่เอาสิ่งนั้น!'
      },
      grammar_bite: {
        title: 'สูตรระบุข้อจำกัดอาหาร: 麻烦不要放... และ 我对...过敏',
        explanation_th: 'ใช้ 麻烦不要放... เพื่อขอไม่ใส่เครื่องปรุงบางชนิด และใช้ 我对 + [อาหาร] + 过敏 เพื่อแจ้งอาการแพ้อย่างชัดเจน',
        patterns: [
          {
            formula: '我对 + [สิ่งของ/อาหาร] + 过敏',
            zh: '我对花生严重过敏。',
            pinyin: 'Wǒ duì huāshēng yánzhòng guòmǐn.',
            th: 'ฉันแพ้ถั่วลิสงอย่างรุนแรงครับ/ค่ะ',
            en: 'I am severely allergic to peanuts.'
          },
          {
            formula: '麻烦 + [คำกำชับ]：少油、少糖、微辣',
            zh: '麻烦菜里少油、微辣，不要放香菜。',
            pinyin: 'Máfan cài lǐ shǎo yóu, wēilà, bú yào fàng xiāngcài.',
            th: 'รบกวนในอาหารใส่น้ำมันน้อย เผ็ดน้อย และไม่ใส่ผักชีนะครับ',
            en: 'Please make dishes less oily, mild spicy, and without cilantro.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'บริกรรับออเดอร์ 🧑‍🍳',
          zh: '先生，您点的菜一共四道。请问有什么忌口吗？',
          pinyin: 'Xiānsheng, nín diǎn de cài yígòng sì dào. Qǐngwèn yǒu shénme jìkǒu ma?',
          th: 'คุณผู้ชายครับ อาหารที่สั่งทั้งหมด 4 อย่างครับ ขอเรียนถามว่ามีข้อจำกัดเรื่องอาหารหรือแพ้อะไรไหมครับ?',
          en: 'Sir, you ordered 4 dishes. Any dietary restrictions or allergies?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '有两点特殊要求：第一，我对花生过敏，千万不能放花生！',
          pinyin: 'Yǒu liǎng diǎn tèshū yāoqiú: Dì-yī, wǒ duì huāshēng guòmǐn, qiānwàn bù néng fàng huāshēng!',
          th: 'มีข้อกำชับพิเศษสองข้อครับ: ข้อแรก ผมแพ้ถั่วลิสง ห้ามใส่ถั่วลิสงเด็ดขาดเลยนะครับ!',
          en: 'Two special requests: First, I am allergic to peanuts, absolutely no peanuts!'
        },
        {
          speaker: 'A',
          speaker_name: 'บริกรรับออเดอร์ 🧑‍🍳',
          zh: '记下了，后厨绝对不碰花生！那辣度方面呢？',
          pinyin: 'Jì xià le, hòuchú juéduì bù pèng huāshēng! Nà làdù fāngmiàn ne?',
          th: 'จดบันทึกแล้วครับ ในครัวจะไม่แตะถั่วลิสงเด็ดขาด! แล้วเรื่องระดับความเผ็ดล่ะครับ?',
          en: 'Noted, kitchen will definitely avoid peanuts! How about spicy level?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '麻烦全部做微辣，少油少盐，免葱，谢谢您！',
          pinyin: 'Máfan quánbù zuò wēilà, shǎo yóu shǎo yán, miǎncōng, xièxie nín!',
          th: 'รบกวนทำเป็นเผ็ดน้อยทั้งหมด น้ำมันน้อยเค็มน้อย และไม่ใส่ต้นหอม ขอบคุณมากครับ!',
          en: 'Please make all mild spicy, less oil and salt, no scallions, thank you!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อมีอาการแพ้อาหาร เช่น แพ้ถั่วลิสง ประโยคเตือนความปลอดภัยข้อใดถูกต้องที่สุด?",
          options: [
            '我对花生过敏，千万不能放！',
            '我喜欢吃花生，多放一点儿。',
            '请问多少钱一碗？',
            '我要两张高铁票。'
          ],
          correct_index: 0,
          explanation_th: "'我对花生过敏，千万不能放！' แจ้งอาการแพ้ (过敏) และกำชับว่าห้ามใส่เด็ดขาด (千万不能放) อย่างปลอดภัย",
          encouragement: 'ประโยคช่วยชีวิต! ท่องจำให้ขึ้นใจเพื่อความปลอดภัยเสมอ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ฉันแพ้ถั่วลิสงอย่างรุนแรง"',
          tokens: ['花生', '严重过敏', '我对'],
          correct_sequence: ['我对', '花生', '严重过敏'],
          pinyin: 'Wǒ duì huāshēng yánzhòng guòmǐn',
          meaning_th: 'ฉันแพ้ถั่วลิสงอย่างรุนแรง',
          explanation_th: 'โครงสร้าง: 我对 (ฉันต่อ...) + สิ่งที่แพ้ (花生) + 严重过敏 (แพ้อย่างรุนแรง)',
          encouragement: 'ต่อบล็อกประโยคแจ้งอาการแพ้ได้แม่นยำมาก!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '微辣' (wēilà) หมายถึงระดับความเผ็ดแบบใด?",
          options: [
            'เผ็ดน้อย',
            'เผ็ดปานกลาง',
            'เผ็ดมากสุดๆ',
            'ไม่เผ็ดเลย'
          ],
          correct_index: 0,
          explanation_th: "'微辣' แปลว่า เผ็ดน้อย (微 = เล็กน้อย, 辣 = เผ็ด)",
          encouragement: 'จำระดับความเผ็ดได้แม่นยำ สั่งอาหารได้อร่อยสบายใจ!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '忌' ในคำว่า '忌口' (ข้อห้ามเรื่องอาหาร) มีหมวดนำหัวใจ '心' สื่อถึงสิ่งใด?",
          options: [
            'ความระมัดระวังในจิตใจที่ต้องละเว้น',
            'ความหิวโหย',
            'ความโกรธแค้น',
            'ความเกียจคร้าน'
          ],
          correct_index: 0,
          explanation_th: "หมวด '心' คือ จิตใจ สื่อถึงการตั้งใจระมัดระวังและละเว้นสิ่งที่ไม่ถูกกับร่างกาย",
          encouragement: 'เข้าใจลึกซึ้งถึงความหมายเชิงอักษรศาสตร์!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณไปทานอาหารกับเพื่อนที่ร้านอาหารในหางโจว คุณมีอาการแพ้อาหารทะเล และไม่ชอบทานเผ็ดกับผักชี คุณควรบอกบริกรขณะจดออเดอร์อย่างไรให้ปลอดภัยและถูกต้องครบถ้วน?',
        options: [
          '服务员，我有忌口：我对海鲜过敏，所有菜都做微辣，麻烦不要放香菜！ (Fúwùyuán, wǒ yǒu jìkǒu: Wǒ duì hǎixiān guòmǐn, suǒyǒu cài dōu zuò wēilà, máfan bú yào fàng xiāngcài!)',
          '再见，明天见！ (Zàijiàn, míngtiān jiàn!)',
          '请问这台洗衣机多少钱？ (Qǐngwèn zhè tái xǐyījī duōshao qián?)',
          '我的房间空调漏水了。 (Wǒ de fángjiān kōngtiáo lòushuǐ le.)'
        ],
        correct_index: 0,
        explanation_th: "ประโยค '服务员，我有忌口：我对海鲜过敏，所有菜都做微辣，麻烦不要放香菜！' ครบถ้วนทั้งคำเกริ่น (我有忌口) สิ่งที่แพ้ (海鲜过敏) รสชาติ (微辣) และผักที่ไม่ใส่ (不要放香菜)",
        encouragement: 'ยอดเยี่ยมมาก! สั่งอาหารได้อย่างปลอดภัยและมั่นใจในทุกมื้ออาหารที่จีน!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u15_l02',
        badge_name: 'ผู้พิทักษ์ความปลอดภัยบนโต๊ะอาหาร 🛡️🍽️',
        message_th: 'ยินดีด้วยนะคนเก่ง! คุณสามารถระบุรสชาติเฉพาะตัวและแจ้งอาการแพ้อาหารภาษาจีนได้อย่างปลอดภัย 100%!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't2_u15_l03',
      lesson_number: 3,
      title: {
        zh: '买单与打包文化',
        th: 'เช็กบิล ห่อกลับบ้าน & ขอใบเสร็จทางการ',
        en: 'Bill Settlement, Takeaway & Fapiao'
      },
      can_do: {
        th: 'เรียกเช็กบิล (买单) ขอห่ออาหารที่ทานไม่หมดกลับบ้าน (打包) และขอใบกำกับภาษีทางการ (发票)',
        en: 'Ask for the bill (买单), pack leftover food (打包), and request official tax invoices (发票)'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พูดคำว่า "เช็กบิล ห่อกลับบ้าน และขอใบกำกับภาษี" ได้อย่างมั่นใจ!',
      vocabulary: [
        {
          id: 'hsk2_1513',
          hanzi: '买单',
          pinyin: 'mǎidān',
          display_pinyin: 'mǎidān',
          pinyin_tone: 'mai3dan1',
          meaning_th: 'เช็กบิล / คิดเงิน',
          meaning_en: 'pay the bill / check please',
          radical: '十',
          radical_name_th: 'หมวดสิบ (十字儿)',
          stroke_count: 14,
          mnemonic: 'จ่ายเงินซื้อ (买) ตามใบเสร็จรายการ (单) = เช็กบิล',
          kid_mnemonic: 'ยกมือเรียกพนักงาน "พี่ครับ คิดเงินด้วยครับ" = 买单',
          body_gesture: 'ยกมือขวาขึ้นระดับศีรษะทำท่าเรียกเช็กบิล'
        },
        {
          id: 'hsk2_1514',
          hanzi: '打包',
          pinyin: 'dǎbāo',
          display_pinyin: 'dǎbāo',
          pinyin_tone: 'da3bao1',
          meaning_th: 'ห่อกลับบ้าน / แพ็กอาหารใส่กล่อง',
          meaning_en: 'pack food to go / doggy bag',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 10,
          mnemonic: 'ใช้มือจัดการ (打) ห่อหุ้มอาหารใส่ห่อ (包) = ห่อกลับบ้าน',
          kid_mnemonic: 'เอาอาหารที่เหลือใส่กล่องผูกโบเอากลับไปกินต่อ = 打包',
          body_gesture: 'สองมือทำท่าปิดฝากล่องอาหารแล้วผูกหูหิ้ว'
        },
        {
          id: 'hsk2_1515',
          hanzi: '发票',
          pinyin: 'fāpiào',
          display_pinyin: 'fāpiào',
          pinyin_tone: 'fa1piao4',
          meaning_th: 'ใบกำกับภาษี / ใบเสร็จรับเงินทางการ (Fapiao)',
          meaning_en: 'official tax invoice / receipt',
          radical: '又',
          radical_name_th: 'หมวดมือขวา (又字旁)',
          stroke_count: 16,
          mnemonic: 'ออกเอกสารรับรอง (发) ในรูปตั๋วใบสำคัญภาษี (票) = ใบกำกับภาษี',
          kid_mnemonic: 'ใบเสร็จทางการใบยาวๆ มีตราประทับสีแดงไว้เบิกเงินบริษัท = 发票',
          body_gesture: 'สองมือประคองรับใบเสร็จรับเงินอย่างทะนุถนอม'
        },
        {
          id: 'hsk2_1516',
          hanzi: '服务费',
          pinyin: 'fúwùfèi',
          display_pinyin: 'fúwùfèi',
          pinyin_tone: 'fu2wu4fei4',
          meaning_th: 'ค่าบริการ (Service Charge)',
          meaning_en: 'service fee',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 23,
          mnemonic: 'ค่าใช้จ่าย (费) สำหรับการบริการดูแลเอาใจใส่ (服务) = ค่าบริการ',
          kid_mnemonic: 'ค่าทิปหรือค่าดูแลของพนักงานในร้านอาหารหรู = 服务费',
          body_gesture: 'ค้อมตัวผายมือแสดงการให้บริการ'
        },
        {
          id: 'hsk2_1517',
          hanzi: '打包盒',
          pinyin: 'dǎbāohé',
          display_pinyin: 'dǎbāohé',
          pinyin_tone: 'da3bao1he2',
          meaning_th: 'กล่องสำหรับใส่อาหารกลับบ้าน',
          meaning_en: 'takeaway box / container',
          radical: '皿',
          radical_name_th: 'หมวดภาชนะจานชาม (皿字底)',
          stroke_count: 16,
          mnemonic: 'กล่องภาชนะ (盒) ที่นำมาใช้แพ็กห่ออาหาร (打包) = กล่องใส่อาหารกลับบ้าน',
          kid_mnemonic: 'กล่องพลาสติกใสมีฝาปิดสนิท = 打包盒',
          body_gesture: 'ใช้นิ้วทำเป็นรูปกล่องสี่เหลี่ยม'
        },
        {
          id: 'hsk2_1518',
          hanzi: '团购',
          pinyin: 'tuángòu',
          display_pinyin: 'tuángòu',
          pinyin_tone: 'tuan2gou4',
          meaning_th: 'สั่งซื้อคูปองกลุ่มออนไลน์ (เช่น เมนูเซ็ตลดราคาใน Meituan/Dianping)',
          meaning_en: 'group buying / discount voucher',
          radical: '囗',
          radical_name_th: 'หมวดกรอบล้อม (大口框)',
          stroke_count: 14,
          mnemonic: 'รวมกลุ่มกัน (团) สั่งซื้อของราคาพิเศษ (购) = ซื้อคูปองกลุ่มลดราคา',
          kid_mnemonic: 'กดซื้อเวาเชอร์เซ็ตอาหารลด 50% ในมือถือ = 团购',
          body_gesture: 'ยื่นมือถือให้แคชเชียร์สแกนคูปองส่วนลด'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำว่า 买单 (mǎidān) อย่างมั่นใจ',
        description_th: 'คำว่า 买 (mǎi) เป็นเสียงที่ 3 อยู่หน้า 单 (dān เสียงที่ 1) คำว่า 买 จะออกเป็นเสียงครึ่งเสียงสาม (ต่ำ 21) แล้วต่อด้วย dān ที่สูงยาว',
        example: '服务员，买单！ (Fúwùyuán, mǎidān!)',
        fun_metaphor: 'ยกมือขึ้นพร้อมกดเสียง mǎi สั้นๆ แล้วลากเสียง dān ใสๆ ดังกังวานทั่วร้าน!',
        reassurance: 'คำนี้ใช้บ่อยที่สุดในร้านอาหารจีน เรียกพนักงานพร้อมคำนี้แล้วทุกคนจะหันมาบริการทันที!'
      },
      grammar_bite: {
        title: 'โครงสร้างเน้นย้ำ 是...的: เราซื้อเซ็ตโปรโมชันออนไลน์มา',
        explanation_th: 'ใช้โครงสร้าง 是...的 เพื่อเน้นย้ำวิธีการหรือสถานที่ เช่น เน้นว่า "ซื้อผ่านระบบโปรโมชันออนไลน์"',
        patterns: [
          {
            formula: '我们是 + [วิธีการ] + 的',
            zh: '我们是在网上团购的套餐。',
            pinyin: 'Wǒmen shì zài wǎngshang tuángòu de tàocān.',
            th: 'พวกเราซื้อเซ็ตอาหารนี้ผ่านโปรโมชันกลุ่มในเน็ตมาครับ',
            en: 'We bought this set meal through online group buying.'
          },
          {
            formula: '吃不完，麻烦 + 打包',
            zh: '这些菜吃不完，麻烦帮忙打包一下。',
            pinyin: 'Zhèxiē cài chī bu wán, máfan bāngmáng dǎbāo yíxià.',
            th: 'อาหารเหล่านี้ทานไม่หมด รบกวนช่วยห่อกลับบ้านหน่อยครับ',
            en: 'Cannot finish these dishes, please help pack them to go.'
          },
          {
            formula: '请问可以 + 开电子发票吗？',
            zh: '买单后请问可以开电子发票吗？',
            pinyin: 'Mǎidān hòu qǐngwèn kěyǐ kāi diànzǐ fāpiào ma?',
            th: 'หลังจากคิดเงินแล้ว ขอถามหน่อยออกใบเสร็จอิเล็กทรอนิกส์ได้ไหมครับ?',
            en: 'After paying, may I get an electronic tax invoice?'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '服务员，买单！顺便拿两个打包盒，这两道菜我们打包带走。',
          pinyin: 'Fúwùyuán, mǎidān! Shùnbiàn ná liǎng ge dǎbāohé, zhè liǎng dào cài wǒmen dǎbāo dàizǒu.',
          th: 'พนักงานครับ เช็กบิลครับ! รบกวนขอกล่องกลับบ้านสองกล่องด้วย สองจานนี้พวกเราจะห่อกลับครับ',
          en: 'Waiter, check please! Also bring two takeaway boxes, we want to pack these two dishes.'
        },
        {
          speaker: 'B',
          speaker_name: 'บริกรแคชเชียร์ 👩‍💼',
          zh: '好的！打包盒两块钱一个。请问您是在大众点评团购的套餐吗？',
          pinyin: 'Hǎo de! Dǎbāohé liǎng kuài qián yí ge. Qǐngwèn nín shì zài Dàzhòng Diǎnpíng tuángòu de tàocān ma?',
          th: 'ได้ค่ะ! กล่องใส่อาหารกล่องละ 2 หยวนนะคะ ขอเรียนถามว่าคุณซื้อเซ็ตคูปองใน Dianping มาใช่ไหมคะ?',
          en: 'Sure! Boxes are 2 yuan each. Did you buy the set voucher on Dianping?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '是的，我们是网上团购的，这是券码。另外请问可以开发票吗？',
          pinyin: 'Shì de, wǒmen shì wǎngshang tuángòu de, zhè shì quànmǎ. Lìngwài qǐngwèn kěyǐ kāi fāpiào ma?',
          th: 'ใช่แล้วครับ พวกเราซื้อคูปองออนไลน์มา นี่คือรหัสคูปองครับ นอกจากนี้ออกใบกำกับภาษีได้ไหมครับ?',
          en: 'Yes, we bought voucher online, here is QR code. Also may I get a tax invoice?'
        },
        {
          speaker: 'B',
          speaker_name: 'บริกรแคชเชียร์ 👩‍💼',
          zh: '可以的！扫描小票上的二维码，在手机上填写公司信息就能开具电子发票。',
          pinyin: 'Kěyǐ de! Sǎomiáo xiǎopiào shang de èrwéimǎ, zài shǒujī shang tiánxiě gōngsī xìnxī jiù néng kāijù diànzǐ fāpiào.',
          th: 'ได้แน่นอนค่ะ! สแกนคิวอาร์โค้ดบนสลิปใบเสร็จ กรอกข้อมูลบริษัทในมือถือก็ออกใบเสร็จอิเล็กทรอนิกส์ได้เลยค่ะ',
          en: 'Sure! Scan QR code on the receipt, fill company info on your phone to get e-invoice.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อทานอาหารในร้านไม่หมดและต้องการนำกลับบ้าน ควรพูดคำว่าอะไร?",
          options: [
            '打包 (dǎbāo)',
            '买单 (mǎidān)',
            '退票 (tuìpiào)',
            '挂号 (guàhào)'
          ],
          correct_index: 0,
          explanation_th: "'打包' (dǎbāo) คือ สำนวนสากลในภาษาจีนที่แปลว่า 'ห่อกลับบ้าน'",
          encouragement: 'ถูกต้องยอดเยี่ยม! ทานไม่หมดห่อกลับบ้านไม่ทิ้งขว้าง ดีมากๆ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "อาหารเหล่านี้ทานไม่หมด รบกวนช่วยห่อกลับบ้านหน่อย"',
          tokens: ['麻烦帮忙打包', '这些菜', '吃不完'],
          correct_sequence: ['这些菜', '吃不完', '麻烦帮忙打包'],
          pinyin: 'Zhèxiē cài chī bu wán, máfan bāngmáng dǎbāo',
          meaning_th: 'อาหารเหล่านี้ทานไม่หมด รบกวนช่วยห่อกลับบ้านหน่อย',
          explanation_th: 'โครงสร้าง: 这些菜 (อาหารเหล่านี้) + 吃不完 (ทานไม่หมด) + 麻烦帮忙打包 (รบกวนช่วยห่อกลับ)',
          encouragement: 'ต่อประโยคห่ออาหารได้คล่องแคล่วเป๊ะเวอร์!'
        },
        {
          type: 'flash_recall',
          question_th: "ใบกำกับภาษีอย่างเป็นทางการของจีนที่ใช้สำหรับการเบิกจ่ายทางบัญชี เรียกว่าอะไร?",
          options: [
            '发票 (fāpiào)',
            '小票 (xiǎopiào)',
            '门票 (ménpiào)',
            '车票 (chēpiào)'
          ],
          correct_index: 0,
          explanation_th: "'发票' (fāpiào) คือ ใบกำกับภาษีอย่างเป็นทางการของกรมสรรพากรจีน",
          encouragement: 'จำคำศัพท์ธุรกิจและการเงินจีนได้ยอดเยี่ยม!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '盒' ในคำว่า '打包盒' (กล่องใส่อาหาร) มีหมวดนำจานชาม '皿' สื่อถึงสิ่งใด?",
          options: [
            'ภาชนะบรรจุใส่อาหารและสิ่งของ',
            'แผ่นดินกว้างใหญ่',
            'สายน้ำไหล',
            'ดวงอาทิตย์ส่องแสง'
          ],
          correct_index: 0,
          explanation_th: "หมวด '皿' (皿字底) สื่อถึง ภาชนะ จาน ชาม หรือกล่องใส่สิ่งของ",
          encouragement: 'เข้าใจรากศัพท์อักษรจีนได้ลึกซึ้งมาก!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณทานอาหารเสร็จแล้ว อาหารยังเหลืออีกครึ่งหนึ่ง คุณต้องการยกมือบอกบริกรว่า "เช็กบิล ขอกล่องห่อกลับบ้านสองกล่อง และขอสแกนออกใบกำกับภาษีอิเล็กทรอนิกส์ด้วย" ควรพูดว่าอย่างไร?',
        options: [
          '服务员买单！麻烦拿两个打包盒，另外请问可以开电子发票吗？ (Fúwùyuán mǎidān! Máfan ná liǎng ge dǎbāohé, lìngwài qǐngwèn kěyǐ kāi diànzǐ fāpiào ma?)',
          '不要买票，太贵了。 (Bú yào mǎi piào, tài guì le.)',
          '请问北京站在哪里？ (Qǐngwèn Běijīng zhàn zài nǎlǐ?)',
          '我们去看电影吧。 (Wǒmen qù kàn diànyǐng ba.)'
        ],
        correct_index: 0,
        explanation_th: "ประโยค '服务员买单！麻烦拿两个打包盒，另外请问可以开电子发票吗？' ครบถ้วนทั้งเช็กบิล (买单) กล่องห่อกลับ (打包盒) และใบกำกับภาษี (电子发票)",
        encouragement: 'ยอดเยี่ยมมาก! เช็กบิลและจัดการมื้ออาหารได้อย่างคุ้มค่าและมืออาชีพ!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u15_l03',
        badge_name: 'ผู้เชี่ยวชาญการเช็กบิลและใบกำกับภาษี 🧾🥡',
        message_th: 'ยินดีด้วยนะคนเก่ง! คุณสามารถเรียกเช็กบิล ห่ออาหารกลับบ้าน และขอใบเสร็จภาษี fapiao ในจีนได้อย่างคล่องแคล่ว!',
        xp_reward: 50
      }
    },
    {
      lesson_id: 't2_u15_l04',
      lesson_number: 4,
      title: {
        zh: '盛宴东道主通关',
        th: 'บอสชาเลนจ์: เจ้าภาพจัดเลี้ยงอาหาร 4 ภาค',
        en: 'Boss Challenge: Hosting a Regional Banquet'
      },
      can_do: {
        th: 'บูรณาการการต้อนรับเพื่อนชาวจีน สั่งอาหารขึ้นชื่อตามรสชาติของแต่ละคน ดูแลมารยาทบนโต๊ะอาหาร และกล่าวคำอวยพรชนแก้ว 100%',
        en: 'Integrate welcoming Chinese guests, ordering diverse regional specialties, dinner table etiquette, and toast traditions'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พิชิตบอสใหญ่ เป็นเจ้าภาพจัดเลี้ยงเพื่อนคนจีน สั่งอาหารและกล่าวชนแก้วสำเร็จ 100%!',
      vocabulary: [
        {
          id: 'hsk2_1519',
          hanzi: '招待',
          pinyin: 'zhāodài',
          display_pinyin: 'zhāodài',
          pinyin_tone: 'zhao1dai4',
          meaning_th: 'ต้อนรับขับสู้ / เลี้ยงรับรองแขก',
          meaning_en: 'to entertain guests / host',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 17,
          mnemonic: 'ใช้มือต้อนรับ (招) คอยปรนนิบัติดูแล (待) แขกผู้มาเยือน = เลี้ยงรับรอง',
          kid_mnemonic: 'เปิดประตูต้อนรับเพื่อนๆ เข้ามาทานของอร่อยเต็มโต๊ะ = 招待',
          body_gesture: 'กุมสองมือค้อมตัวต้อนรับแขกอย่างอบอุ่น'
        },
        {
          id: 'hsk2_1520',
          hanzi: '敬酒',
          pinyin: 'jìngjiǔ',
          display_pinyin: 'jìngjiǔ',
          pinyin_tone: 'jing4jiu3',
          meaning_th: 'คารวะสุรา / ยกแก้วอวยพรตามธรรมเนียมจีน',
          meaning_en: 'propose a toast',
          radical: '攵',
          radical_name_th: 'หมวดเคาะเบาๆ (反文旁)',
          stroke_count: 22,
          mnemonic: 'แสดงความเคารพอย่างจริงใจ (敬) ด้วยการยกจอกสุรา (酒) = ยกแก้วอวยพร',
          kid_mnemonic: 'สองมือประคองแก้วเครื่องดื่มยกขึ้นคารวะผู้ใหญ่ = 敬酒',
          body_gesture: 'สองมือประคองแก้วเครื่องดื่มในระดับต่ำกว่าผู้ใหญ่เล็กน้อย'
        },
        {
          id: 'hsk2_1521',
          hanzi: '干杯',
          pinyin: 'gānbēi',
          display_pinyin: 'gānbēi',
          pinyin_tone: 'gan1bei1',
          meaning_th: 'ชนแก้ว / หมดแก้ว! (ไชโย!)',
          meaning_en: 'cheers / bottoms up',
          radical: '干',
          radical_name_th: 'หมวดแห้ง/กิ่งไม้ (干部)',
          stroke_count: 11,
          mnemonic: 'ดื่มให้แห้งหมดเกลี้ยง (干) จากถ้วยแก้ว (杯) = ชนแก้วหมดแก้ว',
          kid_mnemonic: 'เอาแก้วมาชนกันดังกริ๊ง แล้วดื่มให้เกลี้ยงแก้ว = 干杯',
          body_gesture: 'ชูแก้วขึ้นตรงหน้าพร้อมยิ้มกว้างกล่าว "กานเปย!"'
        },
        {
          id: 'hsk2_1522',
          hanzi: '满意',
          pinyin: 'mǎnyì',
          display_pinyin: 'mǎnyì',
          pinyin_tone: 'man3yi4',
          meaning_th: 'พึงพอใจ / ถูกใจเป็นอย่างยิ่ง',
          meaning_en: 'satisfied / pleased',
          radical: '氵',
          radical_name_th: 'หมวดน้ำ (三点水)',
          stroke_count: 22,
          mnemonic: 'ความสุขเอ่อล้นเต็มเปี่ยม (满) อยู่ในความนึกคิด (意) = พึงพอใจ',
          kid_mnemonic: 'ลูบท้องกลมๆ ยิ้มแก้มปริว่าอิ่มอร่อยถูกใจมาก = 满意',
          body_gesture: 'ลูบอกลูบท้องด้วยความอิ่มเอมใจ'
        }
      ],
      tone_rule: {
        rule_name: 'มารยาทการออกเสียงคำว่า 干杯 (gānbēi) อย่างมีพลัง',
        description_th: 'คำว่า 干 (gān) และ 杯 (bēi) เป็นเสียงที่ 1 สูงยาวทั้งคู่ ให้ออกเสียงหนักแน่น สดใส ร่าเริง เพื่อส่งพลังบวกและความปรารถนาดีให้ทุกคนบนโต๊ะอาหาร',
        example: '为了我们的友谊，干杯！ (Wèile wǒmen de yǒuyì, gānbēi!)',
        fun_metaphor: 'เสียงแก้วชนกันดังกริ๊งก้องกังวาน นำพาโชคลาภและมิตรภาพยืนยาว!',
        reassurance: 'กล่าวคำว่า gānbēi อย่างมั่นใจ บรรยากาศโต๊ะอาหารจีนจะครึกครื้นอบอุ่นทันที!'
      },
      grammar_bite: {
        title: 'สูตรกล่าวคำอวยพรบนโต๊ะอาหารจีน: 为了...，干杯！',
        explanation_th: 'ในวัฒนธรรมจีน เจ้าภาพจะกล่าวคำขอบคุณและอวยพร โดยใช้คำว่า 为了 (เพื่อ...) แล้วตามด้วย 干杯 (ชนแก้ว!)',
        patterns: [
          {
            formula: '为了我们的 + [มิตรภาพ/สุขภาพ/ความร่วมมือ]，干杯！',
            zh: '为了我们的友谊和健康，干杯！',
            pinyin: 'Wèile wǒmen de yǒuyì hé jiànkāng, gānbēi!',
            th: 'เพื่อมิตรภาพและสุขภาพที่แข็งแรงของพวกเรา ชนแก้วครับ!',
            en: 'For our friendship and good health, cheers!'
          },
          {
            formula: '大家吃得 + 满意 + 吗？',
            zh: '今天的菜大家吃得还满意吗？',
            pinyin: 'Jīntiān de cài dàjiā chī de hái mǎnyì ma?',
            th: 'อาหารวันนี้ทุกๆ ท่านรับประทานแล้วพึงพอใจไหมครับ?',
            en: 'Is everyone satisfied with the dishes today?'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย เจ้าภาพจัดเลี้ยง 🧒',
          zh: '各位朋友，非常高兴今天能在这里招待大家！菜都上齐了，大家快动筷子！',
          pinyin: 'Gèwèi péngyou, fēicháng gāoxìng jīntiān néng zài zhèlǐ zhāodài dàjiā! Cài dōu shàng qí le, dàjiā kuài dòng kuàizi!',
          th: 'เพื่อนๆ ทุกคนครับ ยินดีเป็นอย่างยิ่งที่วันนี้ได้เลี้ยงรับรองทุกท่านที่นี่! อาหารมาครบแล้ว ทุกคนลงมือทานกันเลยครับ!',
          en: 'Dear friends, so glad to host everyone here today! All dishes served, please dig in!'
        },
        {
          speaker: 'B',
          speaker_name: 'เพื่อนคนจีน เสี่ยวหวัง 👦',
          zh: 'สมชาย太客气了！这桌菜有川菜也有粤菜，荤素搭配得太棒了！',
          pinyin: 'Somchai tài kèqi le! Zhè zhuō cài yǒu Chuāncài yě yǒu Yuècài, hūnsù dāpèi de tài bàng le!',
          th: 'สมชายเกรงใจเกินไปแล้ว! โต๊ะนี้มีทั้งอาหารเสฉวนและกวางตุ้ง จัดเมนูเนื้อและผักได้ลงตัวยอดเยี่ยมมาก!',
          en: 'Somchai is too polite! This table has Sichuan and Cantonese, great meat and veggie match!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย เจ้าภาพจัดเลี้ยง 🧒',
          zh: '大家喜欢就好！我先敬大家一杯：为了我们的友谊，干杯！',
          pinyin: 'Dàjiā xǐhuan jiù hǎo! Wǒ xiān jìng dàjiā yì bēi: Wèile wǒmen de yǒuyì, gānbēi!',
          th: 'ทุกคนชอบก็ดีใจแล้วครับ! ผมขอคารวะทุกท่านหนึ่งแก้ว: เพื่อมิตรภาพอันงดงามของพวกเรา ชนแก้วครับ!',
          en: 'Glad you like it! Let me propose a toast first: For our friendship, cheers!'
        },
        {
          speaker: 'B',
          speaker_name: 'เพื่อนคนจีน เสี่ยวหวัง 👦',
          zh: '干杯！祝我们在中国的每一天都开开心心！',
          pinyin: 'Gānbēi! Zhù wǒmen zài Zhōngguó de měi yì tiān dōu kāikāixīnxīn!',
          th: 'ชนแก้ว! ขอให้พวกเรามีความสุขในทุกๆ วันที่อยู่ในประเทศจีนนะ!',
          en: 'Cheers! Wish us happy and joyful every single day in China!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อเป็นเจ้าภาพจัดเลี้ยงและต้องการกล่าวคำอวยพรชนแก้วกับเพื่อนๆ ประโยคใดสุภาพและเป็นมงคลที่สุด?",
          options: [
            '为了我们的友谊和健康，干杯！',
            '你们快点吃，我要回家了。',
            '这个菜太贵了，大家少吃点。',
            '请问去飞机场怎么走？'
          ],
          correct_index: 0,
          explanation_th: "'为了我们的友谊和健康，干杯！' แปลว่า เพื่อมิตรภาพและสุขภาพของพวกเรา ชนแก้ว! เป็นคำกล่าวโต๊ะอาหารที่คลาสสิกและอบอุ่นที่สุด",
          encouragement: 'ยอดเยี่ยมมาก! วัฒนธรรมการจัดเลี้ยงและมารยาทจีนคุณเข้าใจทะลุปรุโปร่ง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "เพื่อมิตรภาพของพวกเรา ชนแก้ว!"',
          tokens: ['干杯', '为了我们的友谊'],
          correct_sequence: ['为了我们的友谊', '干杯'],
          pinyin: 'Wèile wǒmen de yǒuyì, gānbēi',
          meaning_th: 'เพื่อมิตรภาพของพวกเรา ชนแก้ว!',
          explanation_th: 'โครงสร้าง: 为了我们的友谊 (เพื่อมิตรภาพของพวกเรา) + 干杯 (ชนแก้ว)',
          encouragement: 'กล่าวคำชนแก้วได้เป๊ะปังระดับมืออาชีพ!'
        },
        {
          type: 'flash_recall',
          question_th: "มารยาทจีนในการ '敬酒' (ชนแก้วคารวะ) กับผู้อาวุโสหรือแขกคนสำคัญ ควรปฏิบัติตัวอย่างไร?",
          options: [
            'ใช้สองมือประคองแก้ว และให้ขอบแก้วของเราอยู่ต่ำกว่าขอบแก้วของผู้ใหญ่เล็กน้อย',
            'ยกแก้วชนให้ขอบแก้วของเราสูงกว่าผู้ใหญ่มากๆ',
            'ใช้มือเดียวโยนแก้วขึ้นฟ้า',
            'ดื่มคนเดียวโดยไม่ต้องมองหน้าใคร'
          ],
          correct_index: 0,
          explanation_th: "มารยาทจีนกำหนดให้ใช้สองมือประคองแก้ว และชนแก้วให้ขอบแก้วเราต่ำกว่าเพื่อแสดงความอ่อนน้อมถ่อมตน",
          encouragement: 'รู้ลึกวัฒนธรรมจีนระดับเอ็กซ์คลูซีฟ! น่าประทับใจมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '杯' ในคำว่า '干杯' มีหมวดนำไม้ '木' สื่อถึงสิ่งใด?",
          options: [
            'ถ้วยจอกน้ำที่แกะสลักจากไม้ในอดีต',
            'ต้นไม้ใหญ่ในป่า',
            'ผลไม้อร่อย',
            'ใบไม้ร่วง'
          ],
          correct_index: 0,
          explanation_th: "หมวด '木' สื่อถึง ไม้ ซึ่งเป็นวัสดุดั้งเดิมในการทำถ้วยจอกสุราโบราณ",
          encouragement: 'เข้าใจรากศัพท์อักษรจีนได้ลึกซึ้ง!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณเป็นเจ้าภาพจัดเลี้ยงอาหารค่ำต้อนรับเพื่อนคนจีนที่เฉิงตู อาหาร 4 ภาคทยอยเสิร์ฟขึ้นโต๊ะเต็มไปด้วยความน่ารับประทาน คุณต้องการยืนขึ้นกล่าวขอบคุณ เลี้ยงต้อนรับ และชวนทุกคนชนแก้วเพื่อมิตรภาพ ควรพูดว่าอย่างไร?',
        options: [
          '各位朋友，非常高兴今天能在这里招待大家！菜都齐了，为了我们的友谊和健康，干杯！ (Gèwèi péngyou, fēicháng gāoxìng jīntiān néng zài zhèlǐ zhāodài dàjiā! Cài dōu qí le, wèile wǒmen de yǒuyì hé jiànkāng, gānbēi!)',
          '对不起，我想要一张发票。 (Duìbuqǐ, wǒ xiǎng yào yì zhāng fāpiào.)',
          '请问退票需要扣多少手续费？ (Qǐngwèn tuìpiào xūyào kòu duōshao shǒuxùfèi?)',
          '不要买票，太贵了。 (Bú yào mǎi piào, tài guì le.)'
        ],
        correct_index: 0,
        explanation_th: "ประโยค '各位朋友，非常高兴今天能在这里招待大家！菜都齐了，为了我们的友谊和健康，干杯！' ครบถ้วนทั้งคำทักทาย ความยินดีที่ได้ต้อนรับ การเชิญทานอาหาร และการยกแก้วชนเพื่อมิตรภาพที่งดงาม",
        encouragement: 'ยินดีด้วย! คุณพิชิตบอสใหญ่ เป็นเจ้าภาพจัดเลี้ยงอาหาร 4 ภาคได้อย่างสง่างามสมบูรณ์แบบ 100%!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u15_master',
        badge_name: 'เจ้าภาพดินเนอร์ระดับตำนาน 🏆🍷',
        message_th: 'ยินดีด้วยอย่างยิ่ง! คุณผ่าน Unit 15 สมบูรณ์แบบ พร้อมเป็นเจ้าภาพจัดเลี้ยง สั่งอาหาร 4 ภาค และเข้าสังคมวัฒนธรรมโต๊ะอาหารจีนได้อย่างไร้ที่ติ!',
        xp_reward: 200
      }
    }
  ]
};
