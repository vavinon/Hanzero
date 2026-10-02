/**
 * scripts/tier2_batch_c/unit22.ts
 * Tier 2 Unit 22: 健身与户外 (Fitness & Outdoors)
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

export const unit22 = {
  unit_id: 'tier2_u22',
  tier: 2,
  unit_number: 22,
  title: {
    zh: '健身与户外',
    th: 'ฟิตเนส & กิจกรรมกลางแจ้ง',
    en: 'Fitness & Outdoors'
  },
  description: 'ออกกำลังกายดูแลสุขภาพในแดนมังกร เข้าฟิตเนส วิ่งลู่ ยกเวท จองคอร์ทตีแบดมินตัน เดินป่าแคมปิ้งท่ามกลางธรรมชาติ และวางแผนตารางเทรนเนอร์ส่วนตัว',
  lessons: [
    {
      lesson_id: 't2_u22_l01',
      lesson_number: 1,
      title: {
        zh: '健身房锻炼',
        th: 'การออกกำลังกายในฟิตเนส',
        en: 'Gym Workout & Equipment'
      },
      can_do: {
        th: 'บอกเล่ากิจวัตรการเข้าฟิตเนส ใช้อุปกรณ์ออกกำลังกาย และใช้โครงสร้าง 一边...一边... เพื่อแสดงการทำสองสิ่งพร้อมกัน',
        en: 'Describe gym workout routines, use fitness equipment, and use 一边...一边... to express simultaneous actions'
      },
      baby_step_goal: 'เป้าหมายวันนี้: บอกเพื่อนได้ว่า "ฉันชอบวิ่งบนลู่วิ่งไฟฟ้าไปพร้อมๆ กับฟังเพลงจีน และยกดัมเบลล์ 3 เซ็ต" อย่างคล่องปาก!',
      vocabulary: [
        {
          id: 'hsk2_2201',
          hanzi: '健身房',
          pinyin: 'jiànshēnfáng',
          display_pinyin: 'jiànshēnfáng',
          pinyin_tone: 'jian4shen1fang2',
          meaning_th: 'ห้องออกกำลังกาย / ยิม / ฟิตเนส',
          meaning_en: 'gym / fitness center',
          radical: '亻',
          radical_name_th: 'หมวดคน (单人旁)',
          stroke_count: 24,
          mnemonic: 'ห้องอาคาร (房) ที่ผู้คนเข้าไปสร้างสุขภาพร่างกายให้แข็งแรงกำยำ (健身) = ฟิตเนส',
          kid_mnemonic: 'ห้องกระจกใส มีดัมเบลล์และลู่วิ่งเรียงราย คนเหงื่อออกยิ้มสดชื่น = 健身房',
          body_gesture: 'ยกสองแขนเบ่งกล้ามทั้งสองข้าง'
        },
        {
          id: 'hsk2_2202',
          hanzi: '锻炼',
          pinyin: 'duànliàn',
          display_pinyin: 'duànliàn',
          pinyin_tone: 'duan4lian4',
          meaning_th: 'ออกกำลังกาย / ฝึกฝนขัดเกลา',
          meaning_en: 'to exercise / to work out',
          radical: '钅',
          radical_name_th: 'หมวดโลหะทอง (金字旁)',
          stroke_count: 26,
          mnemonic: 'หลอมโลหะด้วยไฟ (炼) และตีขัดเกลาเหล็กกล้า (锻) ดั่งการฝึกฝนร่างกาย = ออกกำลังกาย',
          kid_mnemonic: 'ออกแรงเหวี่ยงแขนย่อเข่า กล้ามเนื้อแข็งแรงเหมือนเหล็กกล้า = 锻炼',
          body_gesture: 'ชกหมัดสลับซ้ายขวาไปข้างหน้าอย่างกระฉับกระเฉง'
        },
        {
          id: 'hsk2_2203',
          hanzi: '跑步机',
          pinyin: 'pǎobùjī',
          display_pinyin: 'pǎobùjī',
          pinyin_tone: 'pao3bu4ji1',
          meaning_th: 'ลู่วิ่งไฟฟ้า',
          meaning_en: 'treadmill',
          radical: '足',
          radical_name_th: 'หมวดเท้า (足字旁)',
          stroke_count: 26,
          mnemonic: 'เครื่องจักรไฟฟ้า (机) ที่จำลองการก้าวเท้า (步) วิ่งไปข้างหน้า (跑) = ลู่วิ่งไฟฟ้า',
          kid_mnemonic: 'สายพานหมุนอยู่กับที่ สองเท้าซอยวิ่งไม่หยุด = 跑步机',
          body_gesture: 'งอแขนสองข้างทำท่าย่ำเท้าซอยวิ่งอยู่กับที่'
        },
        {
          id: 'hsk2_2204',
          hanzi: '哑铃',
          pinyin: 'yǎlíng',
          display_pinyin: 'yǎlíng',
          pinyin_tone: 'ya3ling2',
          meaning_th: 'ดัมเบลล์',
          meaning_en: 'dumbbell',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 20,
          mnemonic: 'กระดิ่งโลหะ (铃) ที่ไม่มีลูกกระพรวนไร้เสียงกังวานดั่งคนใบ้ (哑) = ดัมเบลล์',
          kid_mnemonic: 'แท่งเหล็กถ่วงน้ำหนักสองหัว ยกขึ้นลงเงียบๆ เสริมกล้ามแขน = 哑铃',
          body_gesture: 'กำมือสองข้างยกดัมเบลล์ขึ้นมาระดับอกแล้วเกร็งกล้าม'
        },
        {
          id: 'hsk2_2205',
          hanzi: '教练',
          pinyin: 'jiàoliàn',
          display_pinyin: 'jiàoliàn',
          pinyin_tone: 'jiao4lian4',
          meaning_th: 'ครูฝึก / โค้ช / เทรนเนอร์',
          meaning_en: 'coach / fitness trainer',
          radical: '攵',
          radical_name_th: 'หมวดเคาะตี (反文旁)',
          stroke_count: 22,
          mnemonic: 'ผู้คอยสั่งสอนให้ความรู้ (教) และฝึกฝนขัดเกลาท่วงท่า (练) = โค้ช / เทรนเนอร์',
          kid_mnemonic: 'ครูฝึกหุ่นฟิตเปรี๊ยะ ยืนนับจังหวะ "หนึ่ง สอง สาม!" = 教练',
          body_gesture: 'ชูนิ้วนับจังหวะพร้อมออกคำสั่งอย่างกระตือรือร้น'
        },
        {
          id: 'hsk2_2206',
          hanzi: '出汗',
          pinyin: 'chūhàn',
          display_pinyin: 'chūhàn',
          pinyin_tone: 'chu1han4',
          meaning_th: 'เหงื่อออก / หลั่งเหงื่อ',
          meaning_en: 'to sweat / sweating',
          radical: '氵',
          radical_name_th: 'หมวดน้ำ (三点水)',
          stroke_count: 11,
          mnemonic: 'หยดน้ำหยาดเหงื่อ (汗) ไหลรินออกมาจากรูขุมขน (出) = เหงื่อออก',
          kid_mnemonic: 'วิ่งเหนื่อยจนเหงื่อหยดติ๋งๆ ปาดเหงื่อที่หน้าผาก = 出汗',
          body_gesture: 'ยกหลังมือขึ้นปาดเหงื่อที่หน้าผากแล้วสะบัดมือ'
        }
      ],
      tone_rule: {
        rule_name: 'ไวยากรณ์คู่เชื่อม: 一边...一边... (ทำสองอย่างพร้อมกัน)',
        description_th: 'ใช้เชื่อมคำกริยาสองอย่างที่เกิดขึ้นไปพร้อมๆ กันในเวลาเดียวกัน (เช่น 一边跑步一边听播客 = วิ่งไปพลางฟังพอดแคสต์ไปพลาง)',
        example: '他喜欢一边锻炼一边听音乐 (Tā xǐhuan yìbiān duànliàn yìbiān tīng yīnyuè)',
        fun_metaphor: 'เหมือนมีสองมือทำสองสิ่งเพลินๆ เพิ่มประสิทธิภาพคูณสอง!',
        reassurance: 'กริยาทั้งสองตัวหลัง 一边 มักมีความสำคัญเท่าเทียมกัน'
      },
      grammar_bite: {
        title: 'สูตรเลโก้ทำพร้อมกัน: ประธาน + 一边 + [กริยา 1] + 一边 + [กริยา 2]',
        explanation_th: 'ใช้บรรยายกิจกรรมสองอย่างที่ดำเนินควบคู่กันเพื่อความเพลิดเพลินหรือการบริหารเวลา',
        patterns: [
          {
            formula: '我每天 + 一边跑步 + 一边 + [กริยา 2]',
            zh: '我每天在跑步机上一边跑步一边听中文歌。',
            pinyin: 'Wǒ měitiān zài pǎobùjī shàng yìbiān pǎobù yìbiān tīng zhōngwén gē.',
            th: 'ผมวิ่งบนลู่วิ่งไฟฟ้าไปพร้อมๆ กับฟังเพลงจีนทุกวันครับ',
            en: 'Every day on the treadmill I run while listening to Chinese songs.'
          },
          {
            formula: '出了一身汗 + 感觉特别 + [คุณศัพท์]',
            zh: '锻炼完出了一身汗，感觉特别舒服。',
            pinyin: 'Duànliàn wán chū le yì shēn hàn, gǎnjué tèbié shūfu.',
            th: 'ออกกำลังกายเสร็จเหงื่อท่วมตัว รู้สึกสบายตัวเป็นพิเศษครับ',
            en: 'After working out and working up a sweat, I feel especially refreshed.'
          },
          {
            formula: '跟着教练 + 一起 + [กริยา]',
            zh: '新手最好跟着教练一起练习器械。',
            pinyin: 'Xīnshǒu zuìhǎo gēnzhe jiàoliàn yìqǐ liànxí qìxiè.',
            th: 'มือใหม่ควรฝึกใช้อุปกรณ์ร่วมกับเทรนเนอร์จะดีที่สุดครับ',
            en: 'Beginners are best advised to practice with equipment alongside a trainer.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'โค้ชเฉิน 👨‍💼',
          zh: '小柴，欢迎来健身房！今天打算主要锻炼哪个部位？',
          pinyin: 'Xiǎo Chái, huānyíng lái jiànshēnfáng! Jīntiān dǎsuàn zhǔyào duànliàn nǎge bùwèi?',
          th: 'เสี่ยวชาย ยินดีต้อนรับสู่ฟิตเนส! วันนี้วางแผนจะเน้นออกกำลังกายส่วนไหนเป็นหลักครับ?',
          en: 'Xiao Chai, welcome to the gym! Which part do you plan to mainly train today?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '陈教练好！我想先在跑步机上慢跑二十分钟出出汗，然后再练练哑铃。',
          pinyin: 'Chén jiàoliàn hǎo! Wǒ xiǎng xiān zài pǎobùjī shàng mànpǎo èrshí fēnzhōng chūchū hàn, ránhòu zài liànlian yǎlíng.',
          th: 'สวัสดีครับโค้ชเฉิน! ผมอยากจะวิ่งเหยาะๆ บนลู่วิ่งสัก 20 นาทีให้เหงื่อออกก่อน จากนั้นค่อยไปยกดัมเบลล์ครับ',
          en: 'Hello Coach Chen! I want to jog on the treadmill for 20 minutes to work up a sweat, then practice dumbbells.'
        },
        {
          speaker: 'A',
          speaker_name: 'โค้ชเฉิน 👨‍💼',
          zh: '这个计划不错！跑步时可以戴上耳机，一边运动一边听播客，时间过得更快。',
          pinyin: 'Zhège jìhuà búcuò! Pǎobù shí kěyǐ dài shàng ěrjī, yìbiān yùndòng yìbiān tīng bōkè, shíjiān guò de gèng kuài.',
          th: 'แผนนี้ดีเลยครับ! ตอนวิ่งสามารถสวมหูฟัง วิ่งไปพลางฟังพอดแคสต์ไปพลาง เวลาจะผ่านไปเร็วขึ้นครับ',
          en: 'Great plan! You can put on earphones while running, exercising while listening to podcasts makes time fly faster.'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '是的！等我热身好了，麻烦教练指导我一下推举哑铃的标准动作。',
          pinyin: 'Shì de! Děng wǒ rèshēn hǎo le, máfan jiàoliàn zhǐdǎo wǒ yíxià tuījǔ yǎlíng de biāozhǔn dòngzuò.',
          th: 'ใช่เลยครับ! พอน่าวอร์มอัปเสร็จแล้ว รบกวนโค้ชช่วยชี้แนะท่าทางมาตรฐานในการยกดัมเบลล์ให้หน่อยนะครับ',
          en: 'Yes! Once I finish warming up, could you please guide me on standard dumbbell pressing form?'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "อุปกรณ์ฟิตเนส '跑步机' (pǎobùjī) หมายถึงเครื่องมือใด?",
          options: [
            'ลู่วิ่งไฟฟ้า',
            'จักรยานออกกำลังกาย',
            'ม้านั่งยกเวท',
            'สระว่ายน้ำ'
          ],
          correct_index: 0,
          explanation_th: "'跑步机' (跑步 = วิ่ง, 机 = เครื่องจักร) แปลว่า ลู่วิ่งไฟฟ้า",
          encouragement: 'จำคำศัพท์อุปกรณ์ฟิตเนสได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '跑' ในคำว่า '跑步机' (ลู่วิ่ง) มีหมวดนำใด?",
          options: [
            '足 (หมวดเท้า 足字旁)',
            '扌 (หมวดมือ 提手旁)',
            '走 (หมวดก้าวเดิน 走字旁)',
            '车 (หมวดรถ 车字旁)'
          ],
          correct_index: 0,
          explanation_th: "'跑' ใช้หมวดนำเท้า '足' บ่งบอกถึงการใช้เท้าวิ่งก้าวไปข้างหน้า",
          encouragement: 'สังเกตรากศัพท์หมวดเท้า 足 ได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ฉันวิ่งไปพลางฟังเพลงไปพลางบนลู่วิ่งไฟฟ้า"',
          tokens: ['一边跑步一边听歌', '我在跑步机上'],
          correct_sequence: ['我在跑步机上', '一边跑步一边听歌'],
          pinyin: 'Wǒ zài pǎobùjī shàng yìbiān pǎobù yìbiān tīng gē',
          meaning_th: 'ฉันวิ่งไปพลางฟังเพลงไปพลางบนลู่วิ่งไฟฟ้า',
          explanation_th: 'ประธานและสถานที่ (我在跑步机上) + โครงสร้างควบคู่ (一边跑步一边听歌)',
          encouragement: 'ต่อบล็อกเลโก้ 一边...一边... ได้ถูกต้องสมบูรณ์แบบ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '锻炼' (duànliàn) มีความหมายตรงกับข้อใด?",
          options: [
            'ออกกำลังกาย / ฝึกฝน',
            'พักผ่อนนอนหลับ',
            'รับประทานอาหาร',
            'ดูโทรทัศน์'
          ],
          correct_index: 0,
          explanation_th: "'锻炼' แปลว่า ออกกำลังกาย หรือฝึกฝนร่างกายและจิตใจ",
          encouragement: 'จำศัพท์หลักของการดูแลสุขภาพได้อย่างยอดเยี่ยม!'
        }
      ]
    },
    {
      lesson_id: 't2_u22_l02',
      lesson_number: 2,
      title: {
        zh: '球类运动与约球',
        th: 'กีฬาประเภทลูกบอล & การนัดตีคอร์ท',
        en: 'Ball Sports & Booking Courts'
      },
      can_do: {
        th: 'จองคอร์ทแบดมินตันหรือโต๊ะปิงปอง ชวนเพื่อนเล่นกีฬา และออกเสียง Tone Sandhi 两个球 (liǎng ge qiú) ได้อย่างถูกต้อง',
        en: 'Book badminton courts or ping pong tables, invite friends to play, and pronounce Tone Sandhi 两个球 accurately'
      },
      baby_step_goal: 'เป้าหมายวันนี้: โทรจองคอร์ทแบดมินตัน 2 ชั่วโมงตอนหนึ่งทุ่ม พร้อมเตรียมนัดดวลลูกขนไก่กับเพื่อนได้อย่างมั่นใจ!',
      vocabulary: [
        {
          id: 'hsk2_2207',
          hanzi: '羽毛球',
          pinyin: 'yǔmáoqiú',
          display_pinyin: 'yǔmáoqiú',
          pinyin_tone: 'yu3mao2qiu2',
          meaning_th: 'แบดมินตัน / ลูกขนไก่',
          meaning_en: 'badminton / shuttlecock',
          radical: '羽',
          radical_name_th: 'หมวดขนนก (羽字旁)',
          stroke_count: 21,
          mnemonic: 'ลูกกลม (球) ที่ประดับด้วยปีกและขนนกอันพริ้วไหว (羽毛) = แบดมินตัน',
          kid_mnemonic: 'ลูกขนไก่สีขาว ตีลอยข้ามตาข่ายไปมา = 羽毛球',
          body_gesture: 'ยกแขนเหวี่ยงแร็กเก็ตตบลูกขนไก่เหนือศีรษะ'
        },
        {
          id: 'hsk2_2208',
          hanzi: '乒乓球',
          pinyin: 'pīngpāngqiú',
          display_pinyin: 'pīngpāngqiú',
          pinyin_tone: 'ping1pang1qiu2',
          meaning_th: 'ปิงปอง / กีฬาเทเบิลเทนนิส (กีฬาประจำชาติจีน)',
          meaning_en: 'ping-pong / table tennis',
          radical: '丿',
          radical_name_th: 'หมวดเส้นตวัดซ้าย (撇)',
          stroke_count: 17,
          mnemonic: 'เสียงกระดอนของลูกปิงปองกระทบโต๊ะ ปิง-ปอง (乒-乓) เด้งไปมา = ปิงปอง',
          kid_mnemonic: 'ไม้ปิงปองสีแดง-ดำ เด้งลูกกลมสีส้ม ปิง-ปอง! = 乒乓球',
          body_gesture: 'สองมือทำท่าถือไม้ปิงปองตวัดหน้ามือหลังมือสลับกัน'
        },
        {
          id: 'hsk2_2209',
          hanzi: '场地',
          pinyin: 'chǎngdì',
          display_pinyin: 'chǎngdì',
          pinyin_tone: 'chang3di4',
          meaning_th: 'สนามกีฬา / คอร์ท / สถานที่จัดงาน',
          meaning_en: 'court / venue / ground',
          radical: '土',
          radical_name_th: 'หมวดดิน (提土旁)',
          stroke_count: 12,
          mnemonic: 'ผืนแผ่นดิน (地) ที่จัดสรรเป็นลานกว้างสำหรับการแข่งขัน (场) = สนามกีฬา / คอร์ท',
          kid_mnemonic: 'คอร์ทในร่มพื้นสีเขียว ขีดเส้นสีขาวชัดเจน = 场地',
          body_gesture: 'ผายสองมือชี้ไปยังพื้นที่สนามกว้างด้านหน้า'
        },
        {
          id: 'hsk2_2210',
          hanzi: '球拍',
          pinyin: 'qiúpāi',
          display_pinyin: 'qiúpāi',
          pinyin_tone: 'qiu2pai1',
          meaning_th: 'ไม้ตีลูกบอล / ไม้แร็กเก็ต',
          meaning_en: 'racket / paddle',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 19,
          mnemonic: 'อุปกรณ์สำหรับใช้มือตี (拍) ลูกกลมกีฬา (球) = ไม้แร็กเก็ต',
          kid_mnemonic: 'ด้ามจับกระชับมือ เอ็นขึงตึงเปรี๊ยะ ตีลูกดังกังวาน = 球拍',
          body_gesture: 'เอามือจับด้ามไม้ตีแล้วสวิงกลางอากาศ'
        },
        {
          id: 'hsk2_2211',
          hanzi: '比赛',
          pinyin: 'bǐsài',
          display_pinyin: 'bǐsài',
          pinyin_tone: 'bi3sai4',
          meaning_th: 'การแข่งขัน / แข่งขันประลองฝีมือ',
          meaning_en: 'match / competition / contest',
          radical: '比',
          radical_name_th: 'หมวดเปรียบเทียบ (比字旁)',
          stroke_count: 18,
          mnemonic: 'การนำความสามารถมาเปรียบเทียบวัดผล (比) เพื่อชิงรางวัลเกียรติยศ (赛) = การแข่งขัน',
          kid_mnemonic: 'แต้ม 20 เท่า ดิวซ์กันอย่างดุเดือด กองเชียร์ส่งเสียงเฮ = 比赛',
          body_gesture: 'กำสองหมัดทำท่าสู้ๆ อย่างมีพลัง'
        },
        {
          id: 'hsk2_2212',
          hanzi: '水平',
          pinyin: 'shuǐpíng',
          display_pinyin: 'shuǐpíng',
          pinyin_tone: 'shui3ping2',
          meaning_th: 'ระดับฝีมือ / มาตรฐาน',
          meaning_en: 'level / standard / proficiency',
          radical: '水',
          radical_name_th: 'หมวดน้ำ (水字旁)',
          stroke_count: 9,
          mnemonic: 'ความราบเรียบเสมอกันดั่งผิวน้ำ (水平) ใช้วัดระดับมาตรฐานความเชี่ยวชาญ = ระดับฝีมือ',
          kid_mnemonic: 'ระดับฝีมือเทพ ตีลูกหยอดหน้าเน็ตได้อย่างแม่นยำ = 水平',
          body_gesture: 'คว่ำฝ่ามือขนานกับพื้นระดับอกแสดงความนิ่งและระดับมาตรฐาน'
        }
      ],
      tone_rule: {
        rule_name: 'Tone Sandhi: 羽毛球 (yǔmáoqiú) และ 两个球 (liǎng ge qiú)',
        description_th: '羽毛球 (3+2+2) คำว่า 羽 (3) ตามด้วยเสียง 2 毛 จึงคงรูป Half-3rd tone ไม่ผันเป็นเสียงสอง ส่วน 两个球 (liǎng ge qiú) คำว่า 两 (3) ตามด้วย 个 (เสียงเบา/4) ออกเสียงหนักแน่น',
        example: '打羽毛球 (dǎ yǔmáoqiú), 预约场地 (yùyuē chǎngdì)',
        fun_metaphor: 'สังเกตเสียงลูกขนไก่ลอย: หยู่...เหมา...ฉิว ลื่นไหลไม่มีสะดุด!',
        reassurance: 'กีฬาแบดมินตันและปิงปองเป็นสะพานเชื่อมมิตรภาพยอดนิยมที่สุดของคนจีน'
      },
      grammar_bite: {
        title: 'สูตรเลโก้ชวนเล่นกีฬา: 跟...约好 / 打一场...',
        explanation_th: 'ใช้ 跟...约好了 (นัดกับ...ไว้แล้ว) และคำลักษณนาม 场 (chǎng) สำหรับการแข่งขันหรือการเล่นกีฬาหนึ่งรอบ',
        patterns: [
          {
            formula: '我想预约 + 今晚七点 + [ประเภทกีฬา] + 的场地',
            zh: '我想预约今晚七点羽毛球场地，打两个小时。',
            pinyin: 'Wǒ xiǎng yùyuē jīnwǎn qī diǎn yǔmáoqiú chǎngdì, dǎ liǎng ge xiǎoshí.',
            th: 'ผมอยากจองคอร์ทแบดมินตันหนึ่งทุ่มคืนนี้ เล่น 2 ชั่วโมงครับ',
            en: 'I would like to book a badminton court for 7 PM tonight for 2 hours.'
          },
          {
            formula: '他的水平 + 比我 + 更 + [คุณศัพท์]',
            zh: '他的乒乓球水平比我高得多。',
            pinyin: 'Tā de pīngpāngqiú shuǐpíng bǐ wǒ gāo de duō.',
            th: 'ระดับฝีมือปิงปองของเขาสูงกว่าผมมากเลยครับ',
            en: 'His table tennis skill level is much higher than mine.'
          },
          {
            formula: '周末有空 + 跟我打一场 + [กีฬา] + 吗？',
            zh: '周末有空跟我打一场羽毛球比赛吗？',
            pinyin: 'Zhōumò yǒukòng gēn wǒ dǎ yì chǎng yǔmáoqiú bǐsài ma?',
            th: 'สุดสัปดาห์นี้ว่างมาดวลแบดมินตันกับสักแมตช์ไหมครับ?',
            en: 'Are you free this weekend to play a badminton match with me?'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '你好！请问今天晚上七点到九点，还有空的羽毛球场地吗？',
          pinyin: 'Nǐ hǎo! Qǐngwèn jīntiān wǎnshang qī diǎn dào jiǔ diǎn, hái yǒu kōng de yǔmáoqiú chǎngdì ma?',
          th: 'สวัสดีครับ! ขอถามหน่อยคืนนี้หนึ่งทุ่มถึงสามทุ่ม ยังมีคอร์ทแบดมินตันว่างไหมครับ?',
          en: 'Hello! Are there any available badminton courts tonight from 7 PM to 9 PM?'
        },
        {
          speaker: 'B',
          speaker_name: 'เจ้าหน้าที่สนามกีฬา 👩‍💼',
          zh: '三号场地刚好空着！每小时六十块钱，请问你们自带球拍还是需要在前台租借？',
          pinyin: 'Sān hào chǎngdì gānghǎo kòng zhe! Měi xiǎoshí liùshí kuài qián, qǐngwèn nǐmen zìdài qiúpāi háishì xūyào zài qiántái zūjiè?',
          th: 'คอร์ทหมายเลข 3 ว่างอยู่พอดีค่ะ! ชั่วโมงละ 60 หยวน ไม่ทราบว่าพวกคุณนำไม้มาเองหรือต้องการเช่าที่เคาน์เตอร์คะ?',
          en: 'Court 3 happens to be available! It is 60 yuan per hour. Did you bring your own rackets or do you need to rent?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '我们自带了球拍，但想买一桶羽毛球，请问一共多少钱？支持扫码吗？',
          pinyin: 'Wǒmen zìdài le qiúpāi, dàn xiǎng mǎi yì tǒng yǔmáoqiú, qǐngwèn yígòng duōshao qián? Zhīchí sǎomǎ ma?',
          th: 'พวกเรานำไม้มาเองครับ แต่ต้องการซื้อลูกขนไก่ 1 หลอด ขอถามหน่อยรวมทั้งหมดเท่าไหร่ครับ? รองรับการสแกนจ่ายไหมครับ?',
          en: 'We brought our own rackets, but want to buy a tube of shuttlecocks. How much in total? Do you support QR scan pay?'
        },
        {
          speaker: 'B',
          speaker_name: 'เจ้าหน้าที่สนามกีฬา 👩‍💼',
          zh: '场地费加一桶球一共一百八十块，微信或者支付宝扫码都可以，祝你们打球开心！',
          pinyin: 'Chǎngdìfèi jiā yì tǒng qiú yígòng yìbǎi bāshí kuài, Wēixìn huòzhě Zhīfùbǎo sǎomǎ dōu kěyǐ, zhù nǐmen dǎqiú kāixīn!',
          th: 'ค่าคอร์ทรวมลูกขนไก่ 1 หลอด รวม 180 หยวนค่ะ สแกน WeChat หรือ Alipay ก็ได้ทั้งนั้น ขอให้เล่นกีฬาอย่างมีความสุขนะคะ!',
          en: 'Court fee plus a tube of shuttlecocks is 180 yuan in total. WeChat or Alipay QR scan are both fine. Have fun playing!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "กีฬาประจำชาติยอดนิยมของจีน '乒乓球' (pīngpāngqiú) คือกีฬาชนิดใด?",
          options: [
            'กีฬาปิงปอง (เทเบิลเทนนิส)',
            'กีฬาฟุตบอล',
            'กีฬาบาสเกตบอล',
            'กีฬาว่ายน้ำ'
          ],
          correct_index: 0,
          explanation_th: "'乒乓球' (pīngpāngqiú) คือ กีฬาปิงปอง หรือ เทเบิลเทนนิส",
          encouragement: 'จำชื่อกีฬาจีนยอดฮิตได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '羽' ในคำว่า '羽毛球' (แบดมินตัน) มีความหมายดั้งเดิมเกี่ยวกับสิ่งใด?",
          options: [
            'ขนนก / ปีกนก',
            'น้ำกระเซ็น',
            'เปลวไฟร้อน',
            'ก้อนหิน'
          ],
          correct_index: 0,
          explanation_th: "'羽' คือ หมวดขนนกหรือปีกนก สื่อถึงลูกขนไก่ที่ทำจากขนนกแท้",
          encouragement: 'จำรากศัพท์หมวดขนนก 羽 ได้เฉียบคม!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ระดับฝีมือปิงปองของเขาสูงกว่าฉันมาก"',
          tokens: ['比我高得多', '他的乒乓球水平'],
          correct_sequence: ['他的乒乓球水平', '比我高得多'],
          pinyin: 'Tā de pīngpāngqiú shuǐpíng bǐ wǒ gāo de duō',
          meaning_th: 'ระดับฝีมือปิงปองของเขาสูงกว่าฉันมาก',
          explanation_th: 'ประธาน (他的乒乓球水平) + ประโยคเปรียบเทียบ (比我高得多)',
          encouragement: 'ต่อบล็อกเลโก้ประโยคเปรียบเทียบฝีมือได้อย่างแม่นยำ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '场地' (chǎngdì) มีความหมายตรงกับข้อใด?",
          options: [
            'สนามกีฬา / คอร์ท',
            'ตั๋วรถไฟใต้ดิน',
            'ห้องรับประทานอาหาร',
            'ใบเสร็จรับเงิน'
          ],
          correct_index: 0,
          explanation_th: "'场地' แปลว่า สนามกีฬา / คอร์ท หรือลานจัดกิจกรรม",
          encouragement: 'จำศัพท์สถานที่เล่นกีฬาได้อย่างคล่องแคล่ว!'
        }
      ]
    },
    {
      lesson_id: 't2_u22_l03',
      lesson_number: 3,
      title: {
        zh: '户外徒步与露营',
        th: 'เดินป่า & ตั้งแคมป์กลางแจ้ง',
        en: 'Hiking & Outdoor Camping'
      },
      can_do: {
        th: 'อธิบายกิจกรรมเดินป่า กางเต็นท์แคมปิ้ง เตรียมอุปกรณ์กลางแจ้ง และใช้ไวยากรณ์ 着 (zhe) แสดงสภาพคงอยู่',
        en: 'Describe hiking and camping activities, prepare outdoor gear, and use the aspect particle 着 for continuous states'
      },
      baby_step_goal: 'เป้าหมายวันนี้: เล่าทริปเดินป่าภูเขาได้ว่า "พวกเราสะพายกระเป๋าเป้ สวมหมวกกันแดด และกางเต็นท์ริมทะเลสาบ" ได้อย่างเพลิดเพลิน!',
      vocabulary: [
        {
          id: 'hsk2_2213',
          hanzi: '徒步',
          pinyin: 'túbù',
          display_pinyin: 'túbù',
          pinyin_tone: 'tu2bu4',
          meaning_th: 'เดินป่า / เดินเท้าทางไกล',
          meaning_en: 'to hike / on foot',
          radical: '彳',
          radical_name_th: 'หมวดก้าวเดิน (双人旁)',
          stroke_count: 17,
          mnemonic: 'ก้าวเดินด้วยสองเท้าเปล่า (徒) ย่ำผ่านเส้นทางธรรมชาติ (步) = เดินป่า / เดินเท้า',
          kid_mnemonic: 'ถือไม้เท้าเดินป่า ก้าวขึ้นเนินเขาชมวิว = 徒步',
          body_gesture: 'ทำท่ากำสองมือถือไม้ค้ำเดินป่าย่ำเท้าขึ้นบันได'
        },
        {
          id: 'hsk2_2214',
          hanzi: '露营',
          pinyin: 'lùyíng',
          display_pinyin: 'lùyíng',
          pinyin_tone: 'lu4ying2',
          meaning_th: 'ตั้งแคมป์ / พักแรมกลางแจ้ง',
          meaning_en: 'to camp / camping',
          radical: '雨',
          radical_name_th: 'หมวดฝน (雨字头)',
          stroke_count: 32,
          mnemonic: 'ตั้งค่ายพักแรม (营) กลางแจ้งใต้สายหมอกและหยาดน้ำค้างยามค่ำคืน (露) = ตั้งแคมป์',
          kid_mnemonic: 'นอนดูดาวหน้าเต็นท์ ต้มชาร้อนดื่มกลางป่า = 露营',
          body_gesture: 'สองมือทำท่าสามเหลี่ยมประกบกันเป็นเต็นท์พักแรม'
        },
        {
          id: 'hsk2_2215',
          hanzi: '帐篷',
          pinyin: 'zhàngpeng',
          display_pinyin: 'zhàngpeng',
          pinyin_tone: 'zhang4peng2',
          meaning_th: 'เต็นท์ / กระโจมที่พัก',
          meaning_en: 'tent',
          radical: '巾',
          radical_name_th: 'หมวดผ้า (巾字旁)',
          stroke_count: 23,
          mnemonic: 'ผ้าใบกางคลุมกันแดดฝน (帐) สร้างเป็นเพิงกระโจมพักพิง (篷) = เต็นท์',
          kid_mnemonic: 'ตอกสมอบก กางผ้าใบขึงเชือกเป็นบ้านหลังน้อย = 帐篷',
          body_gesture: 'ทำท่าตอกค้อนลงสมอบกที่พื้น'
        },
        {
          id: 'hsk2_2216',
          hanzi: '背包',
          pinyin: 'bèibāo',
          display_pinyin: 'bèibāo',
          pinyin_tone: 'bei4bao1',
          meaning_th: 'กระเป๋าเป้สะพายหลัง',
          meaning_en: 'backpack',
          radical: '月',
          radical_name_th: 'หมวดเนื้อหนัง (月字旁)',
          stroke_count: 14,
          mnemonic: 'กระเป๋าบรรจุสิ่งของ (包) ที่สะพายแนบอยู่กับแผ่นหลังของร่างกาย (背) = กระเป๋าเป้',
          kid_mnemonic: 'เป้ใบใหญ่จุของ ใส่ขวดน้ำ เสื้อกันหนาว สะพายขึ้นหลัง = 背包',
          body_gesture: 'เอื้อมมือสองข้างจับสายสะพายเป้ที่หัวไหล่แล้วดึงกระชับ'
        },
        {
          id: 'hsk2_2217',
          hanzi: '装备',
          pinyin: 'zhuāngbèi',
          display_pinyin: 'zhuāngbèi',
          pinyin_tone: 'zhuang1bei4',
          meaning_th: 'อุปกรณ์ / เครื่องมือสัมภาระ',
          meaning_en: 'equipment / gear',
          radical: '衣',
          radical_name_th: 'หมวดเสื้อผ้า (衣字底)',
          stroke_count: 24,
          mnemonic: 'เสื้อผ้าและสิ่งของที่สวมใส่ (装) จัดเตรียมไว้อย่างเพียบพร้อม (备) = อุปกรณ์เครื่องมือ',
          kid_mnemonic: 'ไฟฉาย มีดพก เสื้อกันฝน อุปกรณ์ครบครันพร้อมลุย = 装备',
          body_gesture: 'สองมือคลำเข็มขัดและกระเป๋าข้างลำตัวตรวจสอบความพร้อม'
        },
        {
          id: 'hsk2_2218',
          hanzi: '防晒',
          pinyin: 'fángshài',
          display_pinyin: 'fángshài',
          pinyin_tone: 'fang2shai4',
          meaning_th: 'กันแดด / ป้องกันแสงแดด',
          meaning_en: 'sun protection / sunscreen',
          radical: '阝',
          radical_name_th: 'หมวดเนินเขาซ้าย (双耳旁)',
          stroke_count: 17,
          mnemonic: 'ตั้งคันดินป้องกัน (防) แสงแดดที่แผดเผาจากดวงอาทิตย์ (晒) = ป้องกันแดด',
          kid_mnemonic: 'ทาครีมกันแดด สวมหมวกปีกกว้าง แดดแรงแค่ไหนก็ไม่กลัว = 防晒',
          body_gesture: 'ยกสองมือขึ้นป้องแดดเหนือหน้าผาก'
        }
      ],
      tone_rule: {
        rule_name: 'ไวยากรณ์กริยาช่วย: 着 (zhe) แสดงสภาพคงอยู่ต่อเนื่อง',
        description_th: 'วางหลังกริยาแสดงว่าการกระทำหรือสภาพนั้นกำลังดำรงอยู่อย่างต่อเนื่อง เช่น 背着背包 (สะพายกระเป๋าเป้อยู่), 穿戴着装备 (สวมใส่อุปกรณ์อยู่)',
        example: '大家背着背包开心地往前走 (Dàjiā bēizhe bèibāo kāixīn de wǎng qián zǒu)',
        fun_metaphor: 'คำว่า 着 เหมือนปุ่มค้างสถานะ (Freeze Frame) ตรึงภาพความพร้อมไว้ตลอดการเดินทาง!',
        reassurance: 'คำว่า 着 ในบริบทนี้อ่านออกเสียงเบา (Neutral Tone: zhe)'
      },
      grammar_bite: {
        title: 'สูตรเลโก้แสดงสภาพคงอยู่: ประธาน + กริยา + 着 + กรรม',
        explanation_th: 'ใช้บรรยายรูปลักษณ์ภายนอก ท่วงท่า หรือสภาพสิ่งของในการทำกิจกรรมกลางแจ้ง',
        patterns: [
          {
            formula: '队员们 + 背着 + [สัมภาระ] + 一起出发',
            zh: '我们背着沉重的背包一起出发去徒步。',
            pinyin: 'Wǒmen bēizhe chénzhòng de bèibāo yìqǐ chūfā qù túbù.',
            th: 'พวกเราสะพายกระเป๋าเป้ใบหนักออกเดินทางไปเดินป่าด้วยกันครับ',
            en: 'Carrying heavy backpacks, we set off hiking together.'
          },
          {
            formula: '在草地上 + 扎着 + 几个五颜六色的 + [สิ่งของ]',
            zh: '湖边的草地上扎着好几个帐篷。',
            pinyin: 'Hú biān de cǎodì shàng zhā zhe hǎojǐ ge zhàngpeng.',
            th: 'บนสนามหญ้าริมทะเลสาบมีเต็นท์กางอยู่หลายหลังเลยครับ',
            en: 'Several tents are pitched on the grass by the lake.'
          },
          {
            formula: '出门徒步一定要做好 + [การป้องกัน]',
            zh: '去户外徒步一定要做好防晒和防雨准备。',
            pinyin: 'Qù hùwài túbù yídìng yào zuòhǎo fángshài hé fángyǔ zhǔnbèi.',
            th: 'ไปเดินป่ากลางแจ้งต้องเตรียมตัวกันแดดและกันฝนให้ดีนะครับ',
            en: 'When going outdoor hiking, be sure to prepare well for sun and rain protection.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หวังหลง 🧑',
          zh: '小柴，听说你周末参加了北京近郊的徒步露营活动，感觉好玩吗？',
          pinyin: 'Xiǎo Chái, tīngshuō nǐ zhōumò cānjiā le Běijīng jìnjiāo de túbù lùyíng huódòng, gǎnjué hǎowán ma?',
          th: 'เสี่ยวชาย ได้ยินว่าสุดสัปดาห์นายไปร่วมกิจกรรมเดินป่าแคมปิ้งชานเมืองปักกิ่ง สนุกไหม?',
          en: 'Xiao Chai, I heard you joined an outdoor hiking and camping trip in Beijing suburbs, was it fun?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '太难忘了！我们十几个驴友背着背包，沿着山路徒步了十五公里，风景绝美！',
          pinyin: 'Tài nánwàng le! Wǒmen shí-jǐ ge lǘyǒu bēizhe bèibāo, yánzhe shānlù túbù le shí-wǔ gōnglǐ, fēngjǐng juéměi!',
          th: 'น่าประทับใจสุดๆ ครับ! เพื่อนนักเดินป่าสิบกว่าคนสะพายเป้เดินเลียบเขาไป 15 กิโลเมตร ทิวทัศน์สวยงามไร้ที่ติ!',
          en: 'Unforgettable! Over a dozen of us backpackers hiked 15 kilometers along the mountain trail, scenery was stunning!'
        },
        {
          speaker: 'A',
          speaker_name: 'หวังหลง 🧑',
          zh: '晚上住在哪里？山上温度低，你们带够防寒装备了吗？',
          pinyin: 'Wǎnshang zhù zài nǎlǐ? Shānshàng wēndù dī, nǐmen dài gòu fánghán zhuāngbèi le ma?',
          th: 'ตอนกลางคืนพักที่ไหนเหรอ? บนเขาอุณหภูมิต่ำ พวกนายพกอุปกรณ์กันหนาวไปพอไหม?',
          en: 'Where did you stay at night? Mountain temperatures are low, did you bring enough cold-weather gear?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '我们在山顶搭着帐篷露营，穿着专业冲锋衣，一点儿都不冷，早晨还看到了日出！',
          pinyin: 'Wǒmen zài shāndǐng dā zhe zhàngpeng lùyíng, chuān zhe zhuānyè chōngfēngyī, yìdiǎnr dōu bù lěng, zǎochen hái kàndào le rìchū!',
          th: 'พวกเรากางเต็นท์แคมปิ้งบนยอดเขา สวมเสื้อแจ็กเก็ตกันลมมืออาชีพ ไม่หนาวเลยสักนิด และตอนเช้ายังได้เห็นพระอาทิตย์ขึ้นด้วยครับ!',
          en: 'We pitched tents camping on the mountain peak, wearing windbreaker jackets, not cold at all, and saw sunrise in the morning!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '露营' (lùyíng) หมายถึงกิจกรรมใด?",
          options: [
            'การตั้งแคมป์ / พักแรมกลางแจ้ง',
            'การว่ายน้ำในทะเลสาบ',
            'การช็อปปิ้งในห้างสรรพสินค้า',
            'การสอบวัดระดับภาษา'
          ],
          correct_index: 0,
          explanation_th: "'露营' แปลว่า การตั้งแคมป์ / พักแรมกลางแจ้งในเต็นท์",
          encouragement: 'จำคำศัพท์กิจกรรมธรรมชาติได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '帐' ในคำว่า '帐篷' (เต็นท์) มีหมวดนำใด?",
          options: [
            '巾 (หมวดผ้า 巾字旁)',
            '木 (หมวดไม้ 木字旁)',
            '土 (หมวดดิน 提土旁)',
            '金 (หมวดโลหะ 金字旁)'
          ],
          correct_index: 0,
          explanation_th: "'帐' ใช้หมวดนำผ้า '巾' สื่อถึงผืนผ้าใบหรือมุ้งกระโจมสำหรับกันลมแดด",
          encouragement: 'จำรากศัพท์หมวดผ้า 巾 ได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "พวกเราสะพายกระเป๋าเป้ออกเดินทางไปเดินป่าด้วยกัน"',
          tokens: ['一起出发去徒步', '我们背着背包'],
          correct_sequence: ['我们背着背包', '一起出发去徒步'],
          pinyin: 'Wǒmen bēizhe bèibāo yìqǐ chūfā qù túbù',
          meaning_th: 'พวกเราสะพายกระเป๋าเป้ออกเดินทางไปเดินป่าด้วยกัน',
          explanation_th: 'ประธานและสภาพท่าทาง (我们背着背包) + การกระทำมุ่งหน้า (一起出发去徒步)',
          encouragement: 'ต่อบล็อกเลโก้กริยาช่วย 着 ได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '装备' (zhuāngbèi) มีความหมายตรงกับข้อใด?",
          options: [
            'อุปกรณ์ / เครื่องมือสัมภาระ',
            'ตารางนัดหมายแพทย์',
            'ใบขับขี่สากล',
            'อาหารปรุงสุก'
          ],
          correct_index: 0,
          explanation_th: "'装备' แปลว่า อุปกรณ์ เครื่องมือ หรือสัมภาระเฉพาะทาง",
          encouragement: 'จำศัพท์หมวดกิจกรรมกลางแจ้งได้ยอดเยี่ยม!'
        }
      ]
    },
    {
      lesson_id: 't2_u22_l04',
      lesson_number: 4,
      title: {
        zh: '健身私教与挑战',
        th: 'เทรนเนอร์ส่วนตัว & พิชิตเป้าหมาย',
        en: 'Personal Trainer & Boss Challenge'
      },
      can_do: {
        th: 'ปรึกษาเทรนเนอร์ส่วนตัว กำหนดเป้าหมายลดไขมันเสริมกล้ามเนื้อ และพิชิต Boss Challenge ฟิตเนสและสุขภาพ',
        en: 'Consult personal trainers, set fat loss and muscle gain goals, and complete the Fitness Boss Challenge'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สมัครสมาชิกฟิตเนสรายปี นัดหมายคอร์สเทรนเนอร์ส่วนตัว 10 ครั้ง และตั้งเป้าหมายลดไขมันได้ 100%!',
      vocabulary: [
        {
          id: 'hsk2_2219',
          hanzi: '会员卡',
          pinyin: 'huìyuánkǎ',
          display_pinyin: 'huìyuánkǎ',
          pinyin_tone: 'hui4yuan2ka3',
          meaning_th: 'บัตรสมาชิก / สมาชิกภาพ',
          meaning_en: 'membership card',
          radical: '人',
          radical_name_th: 'หมวดคน (人字头)',
          stroke_count: 20,
          mnemonic: 'บัตรการ์ด (卡) สำหรับบุคคล (员) ผู้เข้าร่วมประชุมสมาคม (会) = บัตรสมาชิก',
          kid_mnemonic: 'การ์ดทองแตะประตูฟิตเนส ติ๊ดเดียวเดินผ่านฉลุย = 会员卡',
          body_gesture: 'ยื่นบัตรการ์ดในมือแตะเครื่องสแกนหน้าประตู'
        },
        {
          id: 'hsk2_2220',
          hanzi: '私教',
          pinyin: 'sījiào',
          display_pinyin: 'sījiào',
          pinyin_tone: 'si1jiao4',
          meaning_th: 'เทรนเนอร์ส่วนตัว / คอร์สสอนส่วนตัว',
          meaning_en: 'personal trainer / 1-on-1 coaching',
          radical: '禾',
          radical_name_th: 'หมวดรวงข้าว (禾木旁)',
          stroke_count: 16,
          mnemonic: 'ครูผู้ฝึกสอน (教) ที่ดูแลตัวต่อตัวเป็นพิเศษเฉพาะบุคคล (私) = เทรนเนอร์ส่วนตัว',
          kid_mnemonic: 'โค้ชยืนข้างๆ คอยจับเวลาและจัดระเบียบร่างกาย = 私教',
          body_gesture: 'เอามือแตะหลังเพื่อนเพื่อจัดระเบียบหลังให้ตรง'
        },
        {
          id: 'hsk2_2221',
          hanzi: '减脂',
          pinyin: 'jiǎnzhī',
          display_pinyin: 'jiǎnzhī',
          pinyin_tone: 'jian3zhi1',
          meaning_th: 'ลดไขมัน / เบิร์นไขมัน',
          meaning_en: 'to reduce body fat / fat loss',
          radical: '冫',
          radical_name_th: 'หมวดน้ำแข็ง (两点水)',
          stroke_count: 20,
          mnemonic: 'ลดทอนตัดส่วนเกิน (减) ชั้นไขมันตามร่างกาย (脂) = ลดไขมัน',
          kid_mnemonic: 'หน้าท้องแบนราบ เอวเล็กลง ใส่กางเกงสบาย = 减脂',
          body_gesture: 'ลูบหน้าท้องให้กระชับแบนราบ'
        },
        {
          id: 'hsk2_2222',
          hanzi: '增肌',
          pinyin: 'zēngjī',
          display_pinyin: 'zēngjī',
          pinyin_tone: 'zeng1ji1',
          meaning_th: 'เสริมสร้างกล้ามเนื้อ / เพิ่มมวลกล้าม',
          meaning_en: 'to build muscle / hypertrophy',
          radical: '土',
          radical_name_th: 'หมวดดิน (提土旁)',
          stroke_count: 21,
          mnemonic: 'พอกพูนเพิ่มพูน (增) มัดกล้ามเนื้อแข็งแกร่ง (肌) = เสริมสร้างกล้ามเนื้อ',
          kid_mnemonic: 'กล้ามแขนปูดแน่น แข็งแรงทรงพลัง = 增肌',
          body_gesture: 'งอแขนเบ่งกล้ามไบเซปส์แน่นๆ'
        },
        {
          id: 'hsk2_2223',
          hanzi: '坚持',
          pinyin: 'jiānchí',
          display_pinyin: 'jiānchí',
          pinyin_tone: 'jian1chi2',
          meaning_th: 'มุ่งมั่นต่อเนื่อง / อดทนไม่ย่อท้อ',
          meaning_en: 'to persist / to persevere',
          radical: '土',
          radical_name_th: 'หมวดดิน (提土旁)',
          stroke_count: 17,
          mnemonic: 'ยืนหยัดมั่นคงดั่งกำแพงหิน (坚) และยึดกุมเป้าหมายไว้แน่น (持) = อดทนมุ่งมั่น',
          kid_mnemonic: 'เหนื่อยแค่ไหนก็ไม่ยอมแพ้ ออกกำลังกายทุกสัปดาห์ = 坚持',
          body_gesture: 'กำหมัดแนบอกพร้อมพยักหน้าอย่างแน่วแน่'
        },
        {
          id: 'hsk2_2224',
          hanzi: '目标',
          pinyin: 'mùbiāo',
          display_pinyin: 'mùbiāo',
          pinyin_tone: 'mu4biao1',
          meaning_th: 'เป้าหมาย / วัตถุประสงค์',
          meaning_en: 'goal / objective / target',
          radical: '目',
          radical_name_th: 'หมวดตา (目字旁)',
          stroke_count: 14,
          mnemonic: 'สายตาจับจ้อง (目) ไปยังป้ายบอกพิกัดปลายทาง (标) = เป้าหมาย',
          kid_mnemonic: 'เป้าธนูตรงกลาง ล็อกเป้าหมายแล้วพุ่งชน = 目标',
          body_gesture: 'ชี้นิ้วตรงไปข้างหน้ายังจุดหมายไกลๆ'
        }
      ],
      tone_rule: {
        rule_name: 'สำนวนสร้างแรงบันดาลใจ: 贵在坚持 (guì zài jiānchí)',
        description_th: 'คำว่า 坚持 (1+2) รวมกับสำนวน 贵在坚持 แปลว่า "หัวใจสำคัญอยู่ที่ความสม่ำเสมอ" นิยมใช้อย่างแพร่หลายในวงการกีฬาและการออกกำลังกาย',
        example: '健身贵在坚持 (jiànshēn guì zài jiānchí)',
        fun_metaphor: 'ไม่ต้องออกกำลังกายจนหมดแรงในวันเดียว ขอเพียง "坚持" ทำทุกวัน ชัยชนะเป็นของคุณแน่นอน!',
        reassurance: 'เมื่อสื่อสารเรื่องสุขภาพในจีน คำว่า 坚持 จะได้รับคำชื่นชมเสมอ'
      },
      grammar_bite: {
        title: 'สูตรเลโก้กำหนดเป้าหมาย: 我的目标是 + [减脂 / 增肌] + 只要坚持就能成功',
        explanation_th: 'ใช้ระบุเป้าหมายสุขภาพและการจัดตารางร่วมกับเทรนเนอร์',
        patterns: [
          {
            formula: '我办理了一张 + [ประเภทบัตร] + 健身卡',
            zh: '我在离家最近的健身房办了一张年卡。',
            pinyin: 'Wǒ zài lí jiā zuì jìn de jiànshēnfáng bàn le yì zhāng niánkǎ.',
            th: 'ผมทำบัตรสมาชิกรวมรายปีที่ฟิตเนสใกล้บ้านที่สุดครับ',
            en: 'I got an annual membership card at the gym closest to my home.'
          },
          {
            formula: '我的首要目标是 + 先减脂 + 然后增肌',
            zh: '我的首要健身目标是先减脂，然后再增肌。',
            pinyin: 'Wǒ de shǒuyào jiànshēn mùbiāo shì xiān jiǎnzhī, ránhòu zài zēngjī.',
            th: 'เป้าหมายฟิตเนสอันดับแรกของผมคือลดไขมันก่อน จากนั้นค่อยเพิ่มกล้ามเนื้อครับ',
            en: 'My primary fitness goal is to lose fat first, then build muscle.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'ที่ปรึกษาฟิตเนส 👩‍💼',
          zh: '先生您好！请问您是想办理健身会员卡还是咨询私教课程？',
          pinyin: 'Xiānsheng nín hǎo! Qǐngwèn nín shì xiǎng bànlǐ jiànshēn huìyuánkǎ háishì zīxún sījiào kèchéng?',
          th: 'สวัสดีค่ะคุณผู้ชาย! ไม่ทราบว่าสนใจสมัครบัตรสมาชิกฟิตเนสหรือสอบถามคอร์สเทรนเนอร์ส่วนตัวคะ?',
          en: 'Hello sir! Would you like to apply for a gym membership or inquire about personal training courses?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '我想两个都了解一下。我的目标是三个月内减脂五公斤，并稍微增肌。',
          pinyin: 'Wǒ xiǎng liǎng ge dōu liǎojiě yíxià. Wǒ de mùbiāo shì sān ge yuè nèi jiǎnzhī wǔ gōngjīn, bìng shāowēi zēngjī.',
          th: 'ผมอยากทำความเข้าใจทั้งสองอย่างครับ เป้าหมายของผมคือลดไขมัน 5 กิโลกรัมภายใน 3 เดือน และเสริมสร้างกล้ามเนื้อขึ้นเล็กน้อยครับ',
          en: 'I would like to learn about both. My goal is to lose 5 kg of fat within three months and build some muscle.'
        },
        {
          speaker: 'A',
          speaker_name: 'ที่ปรึกษาฟิตเนส 👩‍💼',
          zh: '太好了！我们现在办年卡赠送三次私教体验课，教练会帮您制定科学的饮食和训练计划。',
          pinyin: 'Tài hǎo le! Wǒmen xiànzài bàn niánkǎ zèngsòng sān cì sījiào tǐyàn kè, jiàoliàn huì bāng nín zhìdìng kēxué de yǐnshí hé xùnliàn jìhuà.',
          th: 'ดีเลยค่ะ! ตอนนี้สมัครบัตรรายปีแถมฟรีคอร์สทดลองเทรนเนอร์ส่วนตัว 3 ครั้ง โค้ชจะช่วยวางแผนโภชนาการและการฝึกซ้อมอย่างถูกต้องให้ค่ะ',
          en: 'Wonderful! Applying for an annual card now includes three free personal training trial classes. The coach will tailor a scientific diet and training plan for you.'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '非常划算！只要坚持锻炼，我相信一定能达成目标，我现在就扫码付款。',
          pinyin: 'Fēicháng huásuàn! Zhǐyào jiānchí duànliàn, wǒ xiāngxìn yídìng néng dáchéng mùbiāo, wǒ xiànzài jiù sǎomǎ fùkuǎn.',
          th: 'คุ้มค่ามากครับ! ขอเพียงมุ่งมั่นออกกำลังกายอย่างต่อเนื่อง ผมเชื่อว่าจะบรรลุเป้าหมายได้อย่างแน่นอน ตอนนี้ขอสแกนจ่ายเงินเลยครับ',
          en: 'Very worthwhile! As long as I persist in exercising, I believe I can achieve the goal. I will scan to pay right now.'
        }
      ],
      quizzes: [
        {
          type: 'meaning_match',
          question_th: "คำว่า '减脂' (jiǎnzhī) และ '增肌' (zēngjī) มีความหมายตรงกับข้อใดตามลำดับ?",
          options: [
            'ลดไขมัน และ เสริมสร้างกล้ามเนื้อ',
            'เพิ่มน้ำหนัก และ กินอาหารรสจัด',
            'วิ่งแข่ง และ ว่ายน้ำ',
            'นอนหลับพักผ่อน และ ทำงานล่วงเวลา'
          ],
          correct_index: 0,
          explanation_th: "'减脂' คือ การลดไขมันในร่างกาย ส่วน '增肌' คือ การสร้างมวลกล้ามเนื้อ",
          encouragement: 'จำศัพท์เป้าหมายฟิตเนสยอดนิยมได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '卡' ในคำว่า '会员卡' (บัตรสมาชิก) มีความหมายตรงกับสิ่งใด?",
          options: [
            'บัตร / การ์ด',
            'รองเท้ากีฬา',
            'ผ้าเช็ดหน้า',
            'น้ำผลไม้'
          ],
          correct_index: 0,
          explanation_th: "'卡' (kǎ) ทับศัพท์มาจากคำว่า Card แปลว่า บัตร / การ์ด",
          encouragement: 'จำคำยืมภาษาต่างประเทศได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ขอเพียงอดทนมุ่งมั่นออกกำลังกาย ก็สามารถบรรลุเป้าหมายได้อย่างแน่นอน"',
          tokens: ['一定能达成目标', '只要坚持锻炼'],
          correct_sequence: ['只要坚持锻炼', '一定能达成目标'],
          pinyin: 'Zhǐyào jiānchí duànliàn, yídìng néng dáchéng mùbiāo',
          meaning_th: 'ขอเพียงอดทนมุ่งมั่นออกกำลังกาย ก็สามารถบรรลุเป้าหมายได้อย่างแน่นอน',
          explanation_th: 'เงื่อนไขความอดทน (只要坚持锻炼) + ผลลัพธ์ความสำเร็จ (一定能达成目标)',
          encouragement: 'ต่อบล็อกเลโก้สร้างแรงบันดาลใจได้ยอดเยี่ยม!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '私教' (sījiào) ย่อมาจากคำว่าอะไร?",
          options: [
            '私人教练 (เทรนเนอร์ส่วนตัว)',
            '私立学校 (โรงเรียนเอกชน)',
            '司机教练 (ครูฝึกสอนขับรถ)',
            '食物教授 (ศาสตราจารย์ด้านอาหาร)'
          ],
          correct_index: 0,
          explanation_th: "'私教' เป็นคำย่อของ '私人教练' แปลว่า เทรนเนอร์ส่วนตัว / โค้ชตัวต่อตัว",
          encouragement: 'รู้ลึกศัพท์ย่อในวงการฟิตเนสจีนได้อย่างยอดเยี่ยม!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณต้องการสมัครสมาชิกฟิตเนสในเซี่ยงไฮ้เพื่อเตรียมร่างกายก่อนออกทริปเดินป่าระยะไกล คุณเดินเข้าไปที่แผนกต้อนรับของยิม แจ้งว่าต้องการสมัครบัตรสมาชิกรวมรายปี (年卡) พร้อมทั้งขอปรึกษาเทรนเนอร์ส่วนตัว (私教) เพื่อออกแบบตารางออกกำลังกายเน้นลดไขมัน (减脂) และเพิ่มความแข็งแรงของขา และต้องการสแกนจ่ายเงินผ่าน Alipay คุณควรพูดกับพนักงานอย่างไร?',
        options: [
          '您好！我想办理一张健身年卡，并咨询私教课程。我的目标是减脂并增强腿部力量，请问支持支付宝付款吗？ (Nín hǎo! Wǒ xiǎng bànlǐ yì zhāng jiànshēn niánkǎ, bìng zīxún sījiào kèchéng. Wǒ de mùbiāo shì jiǎnzhī bìng zēngqiáng tuǐbù lìliang, qǐngwèn zhīchí Zhīfùbǎo fùkuǎn ma?)',
          '服务员，这盘辣子鸡太辣了，麻烦给我换一碗白米饭！ (Fúwùyuán, zhè pán làzǐjī tài là le, máfan gěi wǒ huàn yì wǎn bái mǐfàn!)',
          '我想退票，这趟高铁晚点了，我不要坐了！ (Wǒ xiǎng tuìpiào, zhè tàng gāotiě wǎndiǎn le, wǒ bú yào zuò le!)',
          '警察同志，我的护照丢在出租车上了，快帮我调监控！ (Jǐngchá tóngzhì, wǒ de hùzhào diū zài chūzūchē shàng le, kuài bāng wǒ diào jiānkòng!)'
        ],
        correct_index: 0,
        explanation_th: "ตัวเลือกแรกถูกต้องและตรงประเด็นที่สุด: ระบุความประสงค์สมัครบัตรสมาชิกรายปี (办理年卡) ปรึกษาคอร์สเทรนเนอร์ส่วนตัว (咨询私教课程) บอกเป้าหมายลดไขมันและเสริมแรงขา (目标是减脂并增强腿部力量) และถามช่องทางชำระเงิน Alipay (支持支付宝付款吗)",
        encouragement: 'ยินดีด้วยอย่างยิ่ง! คุณผ่านด่าน Boss Challenge ฟิตเนสและสุขภาพ สมัครสมาชิกและวางแผนฟิตหุ่นอย่างมืออาชีพ 100%!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u22_master',
        badge_name: 'ปรมาจารย์ฟิตเนสและนักผจญภัยกลางแจ้ง 🏃‍♂️🏸🏕️',
        message_th: 'สุดยอดมาก! คุณสำเร็จ Unit 22 แล้ว พร้อมลุยฟิตเนส วิ่งลู่ ยกเวท ตีแบดมินตัน เดินป่าแคมปิ้ง และรักษาสุขภาพในจีนได้อย่างมีพลัง!',
        xp_reward: 200
      }
    }
  ]
};
