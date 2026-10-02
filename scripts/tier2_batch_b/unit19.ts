/**
 * scripts/tier2_batch_b/unit19.ts
 * Tier 2 Unit 19: 中国节庆与拜访 (Festivals & Social Visits)
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

export const unit19 = {
  unit_id: 'tier2_u19',
  tier: 2,
  unit_number: 19,
  title: {
    zh: '中国节庆与拜访',
    th: 'เทศกาลจีน & มารยาทเยี่ยมเยือน',
    en: 'Festivals & Social Visits'
  },
  description: 'สัมผัสประเพณีวัฒนธรรมจีนอันอบอุ่น เทศกาลตรุษจีน ไหว้พระจันทร์ ไหว้บ๊ะจ่าง กล่าวคำอวยพรมงคลสี่คำ มารยาทการไปเป็นแขกเยือนบ้าน และกฎการเปลี่ยนเสียงซื้อของขวัญ (买礼物 mái lǐwù)',
  lessons: [
    {
      lesson_id: 't2_u19_l01',
      lesson_number: 1,
      title: {
        zh: '春节与拜年',
        th: 'ตรุษจีน & อวยพรมงคล',
        en: 'Spring Festival & New Year Wishes'
      },
      can_do: {
        th: 'อวยพรปีใหม่จีนด้วยสำนวนมงคลสี่คำ กล่าวทักทายญาติผู้ใหญ่ และรับซองอั่งเปาอย่างนอบน้อม',
        en: 'Deliver Chinese New Year 4-character auspicious wishes, greet elders, and receive red envelopes politely'
      },
      baby_step_goal: 'เป้าหมายวันนี้: กล่าวอวยพรผู้ใหญ่ในบ้านเพื่อนว่า "祝您新年快乐，万事如意，身体健康" พร้อมรับอั่งเปาอย่างสุภาพ!',
      vocabulary: [
        {
          id: 'hsk2_1901',
          hanzi: '春节',
          pinyin: 'Chūnjié',
          display_pinyin: 'Chūnjié',
          pinyin_tone: 'Chun1jie2',
          meaning_th: 'เทศกาลตรุษจีน / วันขึ้นปีใหม่จีน',
          meaning_en: 'Spring Festival / Chinese New Year',
          radical: '日',
          radical_name_th: 'หมวดดวงอาทิตย์ (日字旁)',
          stroke_count: 14,
          mnemonic: 'ดวงตะวัน (日) ในฤดูใบไม้ผลิอันอบอุ่น (春) ต้อนรับเทศกาลมงคล (节) = เทศกาลตรุษจีน',
          kid_mnemonic: 'จุดประทัด แปะป้ายชุนเหลียนสีแดง ต้อนรับปีใหม่ = 春节',
          body_gesture: 'กุมสองมือคารวะไหว้ปีใหม่จีนระดับอก'
        },
        {
          id: 'hsk2_1902',
          hanzi: '拜年',
          pinyin: 'bàinián',
          display_pinyin: 'bàinián',
          pinyin_tone: 'bai4nian2',
          meaning_th: 'สวัสดีปีใหม่จีน / เดินสายอวยพรตรุษจีน',
          meaning_en: 'to pay a New Year visit / greet for New Year',
          radical: '手',
          radical_name_th: 'หมวดมือ (手字旁)',
          stroke_count: 15,
          mnemonic: 'ประสานสองมือ (手) โค้งคำนับกราบไหว้คารวะในวันปีใหม่ (年) = สวัสดีปีใหม่จีน',
          kid_mnemonic: 'ทำท่ากงโส่ว กุมมือไหว้อวยพรผู้ใหญ่ = 拜年',
          body_gesture: 'ทำท่ากงโส่ว (ประสานมือคารวะ) ค้อมตัวคำนับเล็กน้อย'
        },
        {
          id: 'hsk2_1903',
          hanzi: '红包',
          pinyin: 'hóngbāo',
          display_pinyin: 'hóngbāo',
          pinyin_tone: 'hong2bao1',
          meaning_th: 'ซองอั่งเปา / ซองแดงมงคล',
          meaning_en: 'red envelope / lucky money packet',
          radical: '纟',
          radical_name_th: 'หมวดเส้นไหม (绞丝旁)',
          stroke_count: 11,
          mnemonic: 'ซองผ้าไหมสีแดงมงคล (红) ที่ห่อหุ้มเงินขวัญถุงไว้ข้างใน (包) = ซองอั่งเปา',
          kid_mnemonic: 'ซองสีแดงสดใส มีตัวอักษร 福 รับมาใส่กระเป๋าเสื้อ = 红包',
          body_gesture: 'ยื่นสองมือประคองรับซองแดงด้วยความนอบน้อม'
        },
        {
          id: 'hsk2_1904',
          hanzi: '吉利',
          pinyin: 'jílì',
          display_pinyin: 'jílì',
          pinyin_tone: 'ji2li4',
          meaning_th: 'เป็นสิริมงคล / โชคดีราบรื่น',
          meaning_en: 'auspicious / lucky',
          radical: '士',
          radical_name_th: 'หมวดปราชญ์ (士字旁)',
          stroke_count: 13,
          mnemonic: 'คำพูดของปราชญ์ผู้มีศีลธรรม (吉) นำพาความราบรื่นและผลประโยชน์อันดี (利) = เป็นสิริมงคล',
          kid_mnemonic: 'กินส้ม กินปลา วันตรุษจีน มีโชคลาภตลอดปี = 吉利',
          body_gesture: 'ชูสองนิ้วโป้งแตะกันแล้วยิ้มกว้าง'
        },
        {
          id: 'hsk2_1905',
          hanzi: '万事如意',
          pinyin: 'wànshì rúyì',
          display_pinyin: 'wànshì rúyì',
          pinyin_tone: 'wan4shi4 ru2yi4',
          meaning_th: 'สมปรารถนาในทุกสรรพสิ่ง',
          meaning_en: 'may all go well with you / all wishes come true',
          radical: '一',
          radical_name_th: 'หมวดหนึ่งขีด (一部)',
          stroke_count: 24,
          mnemonic: 'หมื่นเรื่องราวสรรพสิ่ง (万事) ราบรื่นสมดั่งใจนึกคิดปรารถนา (如意) = สมปรารถนาในทุกสิ่ง',
          kid_mnemonic: 'ขอพรอะไรก็ได้ดั่งใจ เสกได้ทุกอย่าง = 万事如意',
          body_gesture: 'ผายสองมือออกกว้างจากอกขึ้นสู่ฟ้า'
        },
        {
          id: 'hsk2_1906',
          hanzi: '长辈',
          pinyin: 'zhǎngbèi',
          display_pinyin: 'zhǎngbèi',
          pinyin_tone: 'zhang3bei4',
          meaning_th: 'ญาติผู้ใหญ่ / ผู้อาวุโส',
          meaning_en: 'elder generation / seniors',
          radical: '长',
          radical_name_th: 'หมวดยาว/เติบโต (长字旁)',
          stroke_count: 12,
          mnemonic: 'บุคคลรุ่นก่อนที่เติบโตยาวนานกว่าเรา (长) ในลำดับเครือญาติ (辈) = ญาติผู้ใหญ่',
          kid_mnemonic: 'คุณปู่ คุณย่า คุณลุง คุณป้า ที่เราต้องเคารพรัก = 长辈',
          body_gesture: 'ค้อมศีรษะคำนับแสดงความเคารพอย่างจริงใจ'
        }
      ],
      tone_rule: {
        rule_name: 'คำอวยพร 4 พยางค์ และการเว้นวรรคจังหวะมงคล',
        description_th: 'คำอวยพรมงคล 4 คำ เช่น 万事如意 (wànshì rúyì) และ 身体健康 (shēntǐ jiànkāng) ให้ออกเสียงเป็นจังหวะ 2-2 อย่างชัดเจน ไม่รวบเสียง',
        example: '祝您 / 新年快乐，万事如意，身体健康！',
        fun_metaphor: 'เหมือนเคาะระฆังทอง 4 ครั้ง! กังวาน ไพเราะ และทรงพลัง!',
        reassurance: 'คำว่า 祝您 (zhù nín) สุภาพกว่า 祝你 มาก เมื่อใช้อวยพรผู้ใหญ่'
      },
      grammar_bite: {
        title: 'สูตรเลโก้คำอวยพรมงคล: 祝您... และ 给...拜年',
        explanation_th: 'ใช้ 祝您 + คำมงคล 4 ตัวเพื่ออวยพร และใช้ 给 + ผู้ใหญ่ + 拜年 เพื่อบอกว่ามาสวัสดีปีใหม่',
        patterns: [
          {
            formula: '祝您 + 新年快乐 + [คำมงคล 4 ตัว]',
            zh: '祝您新年快乐，万事如意，身体健康！',
            pinyin: 'Zhù nín xīnnián kuàilè, wànshì rúyì, shēntǐ jiànkāng!',
            th: 'ขอให้ท่านมีความสุขในวันปีใหม่ สมปรารถนาในทุกสิ่ง และสุขภาพแข็งแรงครับ!',
            en: 'Wishing you a Happy New Year, all wishes come true, and good health!'
          },
          {
            formula: '我来给 + [บุคคล] + 拜年了',
            zh: '我来给叔叔阿姨拜年了！',
            pinyin: 'Wǒ lái gěi shūshu āyí bàinián le!',
            th: 'ผมมาสวัสดีปีใหม่คุณอาทั้งสองครับ!',
            en: 'I have come to wish Uncle and Auntie a Happy New Year!'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '叔叔阿姨过年好！我来给长辈拜年了！祝您二老新年快乐，万事如意，身体健康！',
          pinyin: 'Shūshu āyí guònián hǎo! Wǒ lái gěi zhǎngbèi bàinián le! Zhù nín èr lǎo xīnnián kuàilè, wànshì rúyì, shēntǐ jiànkāng!',
          th: 'สวัสดีปีใหม่ครับคุณอาทั้งสอง! ผมมาสวัสดีปีใหม่ผู้ใหญ่ครับ ขอให้ผู้อาวุโสทั้งสองมีความสุขในวันปีใหม่ สมปรารถนาในทุกสิ่ง และสุขภาพแข็งแรงครับ!',
          en: 'Happy New Year Uncle and Auntie! I came to pay New Year respects to elders! Wishing you both Happy New Year, all wishes fulfilled, and good health!'
        },
        {
          speaker: 'B',
          speaker_name: 'คุณป้าเจ้าบ้าน 👩‍🦳',
          zh: '哎呀，小林太懂事了！新年快乐！大年初一图个吉利，阿姨给你准备了大红包！',
          pinyin: 'Āiyā, Xiǎo Lín tài dǒngshì le! Xīnnián kuàilè! Dànián chūyī tú ge jílì, āyí gěi nǐ zhǔnbèi le dà hóngbāo!',
          th: 'โถ พ่อหนุ่มหลินรู้ความน่ารักจริงๆ! สวัสดีปีใหม่จ้ะ! วันชิวอิกเอาฤกษ์เอาชัยเป็นสิริมงคล ป้าเตรียมซองอั่งเปาใบใหญ่ไว้ให้หนูแล้วจ้ะ!',
          en: 'Oh, Xiao Lin is so polite and thoughtful! Happy New Year! On the first day of New Year for good fortune, Auntie prepared a big red envelope for you!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '谢谢阿姨！太感谢了，祝您一家阖家幸福！',
          pinyin: 'Xièxie āyí! Tài gǎnxiè le, zhù nín yì jiā héjiā xìngfú!',
          th: 'ขอบคุณครับคุณป้า! ขอบพระคุณมากครับ ขอให้ครอบครัวของท่านมีความสุขพร้อมหน้าพร้อมตานะครับ!',
          en: 'Thank you Auntie! Much appreciated, wishing your entire family great happiness!'
        },
        {
          speaker: 'B',
          speaker_name: 'คุณป้าเจ้าบ้าน 👩‍🦳',
          zh: '快进屋坐，刚出锅的热水饺，多吃点儿！',
          pinyin: 'Kuài jìn wū zuò, gāng chū guō de rè shuǐjiǎo, duō chī diǎnr!',
          th: 'รีบเข้าบ้านมานั่งเลยจ้ะ เกี๊ยวน้ำร้อนๆ เพิ่งยกขึ้นจากกระทะ ทานเยอะๆ เลยนะ!',
          en: 'Quickly come inside and sit, hot dumplings just out of the pot, eat plenty!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "สำนวนมงคล 4 คำ '万事如意' (wànshì rúyì) มีความหมายตรงกับข้อใด?",
          options: [
            'สมปรารถนาในทุกสรรพสิ่ง',
            'ร่ำรวยเงินทองนับหมื่นหยวน',
            'เดินทางปลอดภัยทุกเส้นทาง',
            'รับประทานอาหารอร่อยทุกมื้อ'
          ],
          correct_index: 0,
          explanation_th: "'万事' คือ ทุกเรื่องราว และ '如意' คือ สมดั่งใจนึก จึงแปลว่า สมปรารถนาในทุกสรรพสิ่ง",
          encouragement: 'จำคำอวยพรตรุษจีนยอดนิยมได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '包' ในคำว่า '红包' (ซองอั่งเปา) มีหมวดนำใด?",
          options: [
            '勹 (หมวดห่อหุ้ม 包字头)',
            '口 (หมวดปาก 口字旁)',
            '纟 (หมวดเส้นไหม 绞丝旁)',
            '日 (หมวดดวงอาทิตย์ 日字旁)'
          ],
          correct_index: 0,
          explanation_th: "'包' ใช้หมวดนำ '勹' สื่อถึงการห่อหุ้มสิ่งของไว้ข้างใน",
          encouragement: 'จำรากศัพท์หมวดห่อหุ้ม 勹 ได้อย่างถูกต้อง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ขอให้ท่านมีความสุขในวันปีใหม่"',
          tokens: ['新年快乐', '祝您'],
          correct_sequence: ['祝您', '新年快乐'],
          pinyin: 'Zhù nín xīnnián kuàilè',
          meaning_th: 'ขอให้ท่านมีความสุขในวันปีใหม่',
          explanation_th: 'คำนำหน้าคำอวยพร (祝您) + ประโยคมงคล (新年快乐)',
          encouragement: 'เรียงคำอวยพรมงคลได้คล่องแคล่วและสุภาพมาก!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '吉利' (jílì) มีความหมายตรงกับข้อใด?",
          options: [
            'เป็นสิริมงคล / โชคดี',
            'ราคาประหยัด',
            'อันตราย',
            'ยากลำบาก'
          ],
          correct_index: 0,
          explanation_th: "'吉利' แปลว่า เป็นสิริมงคล โชคดี (吉 = โชคดี, 利 = ราบรื่น)",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์วัฒนธรรมจีนจำได้แม่นยำ!'
        }
      ]
    },
    {
      lesson_id: 't2_u19_l02',
      lesson_number: 2,
      title: {
        zh: '中秋与端午',
        th: 'ไหว้พระจันทร์ & บ๊ะจ่าง',
        en: 'Mid-Autumn & Dragon Boat'
      },
      can_do: {
        th: 'อธิบายความหมายเชิงสัญลักษณ์ของขนมไหว้พระจันทร์และบ๊ะจ่างโดยใช้โครงสร้าง 象征着... และ 既...又...',
        en: 'Explain cultural symbolism of mooncakes and zongzi using 象征着... and 既...又...'
      },
      baby_step_goal: 'เป้าหมายวันนี้: เล่าให้เพื่อนคนจีนฟังได้ว่า "ขนมไหว้พระจันทร์ทรงกลมเป็นสัญลักษณ์ของความพร้อมหน้าพร้อมตาของครอบครัว"!',
      vocabulary: [
        {
          id: 'hsk2_1907',
          hanzi: '中秋节',
          pinyin: 'Zhōngqiūjié',
          display_pinyin: 'Zhōngqiūjié',
          pinyin_tone: 'Zhong1qiu1jie2',
          meaning_th: 'เทศกาลไหว้พระจันทร์',
          meaning_en: 'Mid-Autumn Festival',
          radical: '丨',
          radical_name_th: 'หมวดหนึ่งขีดตั้ง (竖部)',
          stroke_count: 17,
          mnemonic: 'ค่ำคืนใจกลาง (中) ฤดูใบไม้ร่วง (秋) ที่ดวงจันทร์กลมโตส่องสว่าง (节) = เทศกาลไหว้พระจันทร์',
          kid_mnemonic: 'นั่งชมพระจันทร์เต็มดวงกลมโต กินขนมไหว้พระจันทร์ไส้ไข่เค็ม = 中秋节',
          body_gesture: 'ชี้มองดวงจันทร์กลมโตบนท้องฟ้าแล้วยิ้ม'
        },
        {
          id: 'hsk2_1908',
          hanzi: '月饼',
          pinyin: 'yuèbing',
          display_pinyin: 'yuèbing',
          pinyin_tone: 'yue4bing',
          meaning_th: 'ขนมไหว้พระจันทร์',
          meaning_en: 'mooncake',
          radical: '月',
          radical_name_th: 'หมวดดวงจันทร์ (月字旁)',
          stroke_count: 12,
          mnemonic: 'ขนมแป้งอบ (饼) ทรงกลมลวดลายประณีตดั่งดวงจันทร์ (月) = ขนมไหว้พระจันทร์',
          kid_mnemonic: 'ขนมก้อนกลมสีน้ำตาลทอง ลายดอกไม้ ตัดแบ่งกินกับครอบครัว = 月饼',
          body_gesture: 'ประกบสองมือเป็นก้อนกลมเหมือนขนมไหว้พระจันทร์'
        },
        {
          id: 'hsk2_1909',
          hanzi: '端午节',
          pinyin: 'Duānwǔjié',
          display_pinyin: 'Duānwǔjié',
          pinyin_tone: 'Duan1wu3jie2',
          meaning_th: 'เทศกาลไหว้บ๊ะจ่าง / แข่งเรือมังกร',
          meaning_en: 'Dragon Boat Festival',
          radical: '立',
          radical_name_th: 'หมวดตั้งตรง (立字旁)',
          stroke_count: 23,
          mnemonic: 'วันที่ห้าเดือนห้าเริ่มต้นเทศกาล (端) แข่งขันพายเรือมังกรกลางลำน้ำ (节) = เทศกาลไหว้บ๊ะจ่าง',
          kid_mnemonic: 'พายเรือหัวมังกร ฮึดจั๊วะๆ กินบ๊ะจ่างหอมใบไผ่ = 端午节',
          body_gesture: 'ทำท่าจับไม้พายจ้วงพายเรือมังกรอย่างขึงขัง'
        },
        {
          id: 'hsk2_1910',
          hanzi: '粽子',
          pinyin: 'zòngzi',
          display_pinyin: 'zòngzi',
          pinyin_tone: 'zong4zi',
          meaning_th: 'ขนมบ๊ะจ่าง',
          meaning_en: 'zongzi / rice dumpling',
          radical: '米',
          radical_name_th: 'หมวดเมล็ดข้าว (米字旁)',
          stroke_count: 17,
          mnemonic: 'ข้าวเหนียวเมล็ดงาม (米) ห่อด้วยใบไผ่เป็นทรงสามเหลี่ยม (粽) = ขนมบ๊ะจ่าง',
          kid_mnemonic: 'ห่อใบไผ่สีเขียวทรงสามเหลี่ยม แกะเชือกออกมาเจอข้าวเหนียวหมูเค็ม = 粽子',
          body_gesture: 'ทำนิ้วหัวแม่มือกับนิ้วชี้ประกบกันเป็นรูปสามเหลี่ยมบ๊ะจ่าง'
        },
        {
          id: 'hsk2_1911',
          hanzi: '团圆',
          pinyin: 'tuányuán',
          display_pinyin: 'tuányuán',
          pinyin_tone: 'tuan2yuan2',
          meaning_th: 'การอยู่พร้อมหน้าพร้อมตา / กลมเกลียวอบอุ่น',
          meaning_en: 'reunion / to reunite as a family',
          radical: '囗',
          radical_name_th: 'หมวดกรอบสี่เหลี่ยมรอบ (大口框)',
          stroke_count: 16,
          mnemonic: 'คนในครอบครัวล้อมวงกลม (囗) อยู่รวมกันกลมเกลียวพร้อมหน้า (圆) = อยู่พร้อมหน้าพร้อมตา',
          kid_mnemonic: 'ทุกคนในบ้านกลับมากินข้าวโต๊ะกลมด้วยกันอย่างมีความสุข = 团圆',
          body_gesture: 'กอดแขนทำมือล้อมวงกลมรอบตัว'
        },
        {
          id: 'hsk2_1912',
          hanzi: '象征',
          pinyin: 'xiàngzhēng',
          display_pinyin: 'xiàngzhēng',
          pinyin_tone: 'xiang4zheng1',
          meaning_th: 'เป็นสัญลักษณ์แทน / สะท้อนถึง',
          meaning_en: 'to symbolize / symbol',
          radical: '⺈',
          radical_name_th: 'หมวดมีดหงาย (斜刀头)',
          stroke_count: 19,
          mnemonic: 'รูปลักษณ์อันสง่างาม (象) ที่พิสูจน์ยืนยันความหมายลึกซึ้ง (征) = เป็นสัญลักษณ์แทน',
          kid_mnemonic: 'ดวงจันทร์กลม สื่อถึงใจของทุกคนที่กลมเกลียว = 象征',
          body_gesture: 'ใช้นิ้วชี้สองข้างวาดวงกลมสัญลักษณ์ในอากาศ'
        }
      ],
      tone_rule: {
        rule_name: 'ไวยากรณ์เชื่อมโยงสองคุณสมบัติ: 既...又... (Both... and...)',
        description_th: 'ใช้ 既 (jì) ตามด้วยข้อดีข้อที่หนึ่ง และ 又 (yòu) ตามด้วยข้อดีข้อที่สอง เพื่อบอกว่ามีคุณสมบัติดีงามทั้งสองประการ',
        example: '既好吃又有文化意义 (Jì hǎochī yòu yǒu wénhuà yìyì - ทั้งอร่อยและมีความหมายทางวัฒนธรรม)',
        fun_metaphor: 'เหมือนได้โชคสองชั้น! ชั้นแรก 既 หอมหวาน ชั้นสอง 又 ลึกซึ้ง!',
        reassurance: 'คำว่า 端午节 (Duānwǔjié) คำว่า 端 เป็นเสียง 1 ชัดเจน'
      },
      grammar_bite: {
        title: 'สูตรเลโก้สัญลักษณ์วัฒนธรรม: 象征着... และ 既...又...',
        explanation_th: 'อธิบายว่าสิ่งของดั้งเดิมเป็นสัญลักษณ์ของอะไร และมีคุณค่าอย่างไร',
        patterns: [
          {
            formula: '圆圆的 + [สิ่งของ] + 象征着 + [ความหมายนามธรรม]',
            zh: '圆圆的月饼象征着阖家团圆。',
            pinyin: 'Yuányuán de yuèbing xiàngzhēngzhe héjiā tuányuán.',
            th: 'ขนมไหว้พระจันทร์ทรงกลมเป็นสัญลักษณ์ของการอยู่พร้อมหน้าของครอบครัว',
            en: 'Round mooncakes symbolize family reunion.'
          },
          {
            formula: '既 + [คุณสมบัติ A] + 又 + [คุณสมบัติ B]',
            zh: '粽子既好吃又有深厚的文化内涵。',
            pinyin: 'Zòngzi jì hǎochī yòu yǒu shēnhòu de wénhuà nèihán.',
            th: 'บ๊ะจ่างทั้งอร่อยและมีความหมายทางวัฒนธรรมอันลึกซึ้ง',
            en: 'Zongzi is both delicious and rich in cultural meaning.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'เพื่อนคนจีน 🧒',
          zh: '小林，中秋节中国人全家都要一起吃月饼、赏月，你知道这代表什么吗？',
          pinyin: 'Xiǎo Lín, Zhōngqiūjié Zhōngguórén quán jiā dōu yào yìqǐ chī yuèbing, shǎng yuè, nǐ zhīdào zhè dàibiǎo shénme ma?',
          th: 'เสี่ยวหลิน เทศกาลไหว้พระจันทร์คนจีนทั้งบ้านจะกินขนมไหว้พระจันทร์และชมจันทร์ด้วยกัน เธอรู้ไหมว่าสิ่งนี้เป็นตัวแทนของอะไร?',
          en: 'Xiao Lin, during Mid-Autumn Festival Chinese families eat mooncakes and watch the moon together, do you know what this represents?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '我知道！因为圆圆的月亮和月饼都象征着阖家团圆，对吧？',
          pinyin: 'Wǒ zhīdào! Yīnwèi yuányuán de yuèliang hé yuèbing dōu xiàngzhēngzhe héjiā tuányuán, duì ba?',
          th: 'ผมรู้ครับ! เพราะว่าดวงจันทร์และขนมไหว้พระจันทร์ทรงกลมเป็นสัญลักษณ์ของการอยู่พร้อมหน้าพร้อมตาของครอบครัว ใช่ไหมครับ?',
          en: 'I know! Because the round moon and mooncakes symbolize family reunion, right?'
        },
        {
          speaker: 'A',
          speaker_name: 'เพื่อนคนจีน 🧒',
          zh: '完全正确！端午节吃粽子也是这样，中国传统美食既有文化又有口福！',
          pinyin: 'Wánquán zhèngquè! Duānwǔjié chī zòngzi yě shì zhèyàng, Zhōngguó chuántǒng měishí jì yǒu wénhuà yòu yǒu kǒufú!',
          th: 'ถูกต้องเป๊ะเลย! เทศกาลไหว้บ๊ะจ่างก็เหมือนกัน อาหารโบราณของจีนทั้งมีวัฒนธรรมและมีบุญปากความอร่อย!',
          en: 'Completely correct! Eating zongzi during Dragon Boat Festival is similar, Chinese traditional food is both cultural and a culinary delight!'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '我特别喜欢蛋黄莲蓉月饼，甜咸适中，太美味了！',
          pinyin: 'Wǒ tèbié xǐhuan dànhuáng liánróng yuèbing, tián xián shìzhōng, tài měiwèi le!',
          th: 'ผมชอบขนมไหว้พระจันทร์ไส้เม็ดบัวไข่เค็มเป็นพิเศษ หวานเค็มกำลังดี อร่อยมากเลยครับ!',
          en: 'I especially love lotus paste mooncake with egg yolk, balanced sweet and savory, so delicious!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ในวัฒนธรรมจีน ขนมไหว้พระจันทร์ทรงกลม '象征' ถึงสิ่งใด?",
          options: [
            'การอยู่พร้อมหน้าพร้อมตาของครอบครัว (团圆)',
            'การสอบเข้ามหาวิทยาลัยได้คะแนนเต็ม',
            'การเดินทางไปต่างประเทศคนเดียว',
            'การลดราคาสินค้าช่วงฤดูใบไม้ร่วง'
          ],
          correct_index: 0,
          explanation_th: "รูปทรงกลมของขนมไหว้พระจันทร์และดวงจันทร์ '象征着团圆' (เป็นสัญลักษณ์ของความพร้อมหน้าพร้อมตา)",
          encouragement: 'เข้าใจความหมายเชิงสัญลักษณ์ของประเพณีจีนอย่างลึกซึ้ง!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '粽' ในคำว่า '粽子' (บ๊ะจ่าง) มีหมวดนำข้าวสาร '米' สื่อถึงสิ่งใด?",
          options: [
            'ข้าวเหนียวที่เป็นวัตถุดิบหลัก',
            'น้ำซุปต้มเนื้อ',
            'เครื่องเทศรสเผ็ด',
            'ผลไม้เชื่อม'
          ],
          correct_index: 0,
          explanation_th: "หมวด '米' บ่งบอกว่าบ๊ะจ่างทำมาจากเมล็ดข้าวสาร (ข้าวเหนียว)",
          encouragement: 'จำรากศัพท์หมวดข้าวสาร 米 ได้อย่างถูกต้อง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ขนมไหว้พระจันทร์เป็นสัญลักษณ์ของความพร้อมหน้าพร้อมตา"',
          tokens: ['家庭团圆', '月饼象征着'],
          correct_sequence: ['月饼象征着', '家庭团圆'],
          pinyin: 'Yuèbing xiàngzhēngzhe jiātíng tuányuán',
          meaning_th: 'ขนมไหว้พระจันทร์เป็นสัญลักษณ์ของความพร้อมหน้าพร้อมตา',
          explanation_th: 'ประธาน (月饼) + กริยาสัญลักษณ์ (象征着) + กรรมนาม (家庭团圆)',
          encouragement: 'ต่อบล็อกเลโก้วัฒนธรรมจีนได้งดงามมาก!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '团圆' (tuányuán) มีความหมายตรงกับข้อใด?",
          options: [
            'การอยู่พร้อมหน้าพร้อมตากลมเกลียว',
            'การสอบแข่งขัน',
            'การเดินทางท่องเที่ยว',
            'การแยกย้ายเดินทางไกล'
          ],
          correct_index: 0,
          explanation_th: "'团圆' แปลว่า การอยู่พร้อมหน้าพร้อมตา (团 = รวมกลุ่ม, 圆 = วงกลมสมบูรณ์)",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์สำคัญจำได้แม่นยำ!'
        }
      ]
    },
    {
      lesson_id: 't2_u19_l03',
      lesson_number: 3,
      title: {
        zh: '做客礼仪与送礼',
        th: 'มารยาทเยือนบ้าน & การมอบของขวัญ',
        en: 'Guest Etiquette & Gift Sandhi'
      },
      can_do: {
        th: 'ปฏิบัติตามมารยาทเมื่อไปเยือนบ้านคนจีน มอบของขวัญอย่างถ่อมตน และออกเสียง 3+3 Sandhi ใน 买礼物 (mái lǐwù) ได้ถูกต้อง',
        en: 'Follow Chinese guest etiquette, present gifts with modesty, and pronounce 3+3 Sandhi in 买礼物 accurately'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ยื่นของขวัญให้เจ้าบ้านพร้อมพูดอย่างสุภาพว่า "这是我的一点儿心意，太打扰你们了"!',
      vocabulary: [
        {
          id: 'hsk2_1913',
          hanzi: '做客',
          pinyin: 'zuòkè',
          display_pinyin: 'zuòkè',
          pinyin_tone: 'zuo4ke4',
          meaning_th: 'ไปเป็นแขกเยือนบ้าน',
          meaning_en: 'to be a guest / visit someone',
          radical: '亻',
          radical_name_th: 'หมวดคน (单人旁)',
          stroke_count: 20,
          mnemonic: 'คน (亻) ปฏิบัติตน (做) ในฐานะแขกผู้มีเกียรติในบ้าน (客) = ไปเป็นแขกเยือนบ้าน',
          kid_mnemonic: 'สวมรองเท้าแตะเดินเข้าบ้านเพื่อนอย่างสุภาพ = 做客',
          body_gesture: 'ก้าวเท้าค้อมตัวคำนับเล็กน้อยเดินเข้าประตู'
        },
        {
          id: 'hsk2_1914',
          hanzi: '买礼物',
          pinyin: 'mǎi lǐwù',
          display_pinyin: 'mái lǐwù',
          pinyin_tone: 'mai3li3wu4',
          meaning_th: 'ซื้อของขวัญ (กฎ 3+3 Tone Sandhi)',
          meaning_en: 'to buy gifts',
          radical: '礻',
          radical_name_th: 'หมวดบูชา/เซ่นไหว้ (示字旁)',
          stroke_count: 18,
          sandhi_rule: '3+3',
          mnemonic: 'ใช้เงินซื้อ (买) สิ่งของอันมีค่า (物) เพื่อแสดงความเคารพและมิตรภาพ (礼) = ซื้อของขวัญ',
          kid_mnemonic: 'ห่อกล่องของขวัญผูกริบบิ้นสีทอง สวยงาม = 买礼物',
          body_gesture: 'ยื่นสองมือประคองกล่องของขวัญไปข้างหน้า'
        },
        {
          id: 'hsk2_1915',
          hanzi: '心意',
          pinyin: 'xīnyì',
          display_pinyin: 'xīnyì',
          pinyin_tone: 'xin1yi4',
          meaning_th: 'น้ำใจ / ความปรารถนาดีจากใจ',
          meaning_en: 'kindly feelings / token of appreciation',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 17,
          mnemonic: 'ความรู้สึกปรารถนาดี (意) ที่หลั่งไหลออกมาจากก้นบึ้งของหัวใจ (心) = น้ำใจอันบริสุทธิ์',
          kid_mnemonic: 'ของขวัญชิ้นเล็กแต่ให้ด้วยใจจริง = 心意',
          body_gesture: 'วางมือขวาทาบไว้ที่หน้าอกข้างซ้ายตรงหัวใจ'
        },
        {
          id: 'hsk2_1916',
          hanzi: '打扰',
          pinyin: 'dǎrǎo',
          display_pinyin: 'dǎrǎo',
          pinyin_tone: 'da3rao3',
          meaning_th: 'รบกวน (คำสุภาพถ่อมตน)',
          meaning_en: 'to disturb / trouble someone',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 15,
          mnemonic: 'กิริยาที่เกรงว่าการมาเยือนจะทำให้เจ้าบ้านต้องเหน็ดเหนื่อย (打扰) = มารบกวน',
          kid_mnemonic: 'เกรงใจจังเลย มารบกวนคุณป้าทำกับข้าว = 打扰',
          body_gesture: 'โค้งคำนับเล็กน้อยแล้วผายสองมือขอโทษอย่างสุภาพ'
        },
        {
          id: 'hsk2_1917',
          hanzi: '礼仪',
          pinyin: 'lǐyí',
          display_pinyin: 'lǐyí',
          pinyin_tone: 'li3yi2',
          meaning_th: 'มารยาทและธรรมเนียมปฏิบัติ',
          meaning_en: 'etiquette / ceremony / courtesy protocol',
          radical: '礻',
          radical_name_th: 'หมวดบูชา/เซ่นไหว้ (示字旁)',
          stroke_count: 10,
          mnemonic: 'พิธีกรรมแสดงความเคารพ (礼) ควบคู่กับท่วงท่าอันสง่างามและถูกต้องตามแบบแผน (仪) = มารยาทและธรรมเนียมปฏิบัติ',
          kid_mnemonic: 'ไหว้สวย ยิ้มแย้ม รู้วิธีมอบของขวัญอย่างสุภาพ = 礼仪',
          body_gesture: 'ประสานสองมือคารวะตามธรรมเนียมจีนโบราณ'
        },
        {
          id: 'hsk2_1918',
          hanzi: '客气',
          pinyin: 'kèqi',
          display_pinyin: 'kèqi',
          pinyin_tone: 'ke4qi',
          meaning_th: 'เกรงใจ / เป็นพิธีรีตองเกินไป',
          meaning_en: 'polite / overly courteous',
          radical: '宀',
          radical_name_th: 'หมวดหลังคาเรือน (宝盖头)',
          stroke_count: 13,
          mnemonic: 'บรรยากาศและท่าที (气) แบบแขกผู้มาเยือน (客) = ความเกรงใจ',
          kid_mnemonic: 'คนกันเองไม่ต้องเกรงใจ! ยิ้มกว้างกอดคอ = 客气',
          body_gesture: 'โบกมือปฏิเสธความเกรงใจด้วยรอยยิ้มอบอุ่น'
        }
      ],
      tone_rule: {
        rule_name: 'Tone Sandhi: 买礼物 (mǎi lǐwù ➔ mái lǐwù)',
        description_th: 'คำว่า 买 (เสียง 3) นำหน้าพยางค์เสียง 3 เดิมของ 礼物 (lǐwù) จะผันเป็นเสียง 2 (mái) ตามกฎ 3+3 Tone Sandhi เพื่อให้การพูดคล่องตัว',
        example: '买礼物 ➔ mái lǐwù, 买水果 ➔ mái shuíguǒ',
        fun_metaphor: 'คำว่า 买 เด้งขึ้นฟ้าเป็น mái ทันทีเมื่อเตรียมมอบของขวัญแสนสุข!',
        reassurance: 'ระบุ display_pinyin เป็น mái lǐwù เสมอเพื่อให้ผู้เรียนออกเสียงได้ตรงสำเนียงเป๊ะ!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้มารยาทแขกและเจ้าบ้าน: 来就来嘛... และ 一点儿心意...',
        explanation_th: 'เจ้าบ้านกล่าวต้อนรับไม่ให้เกรงใจ ส่วนแขกกล่าวมอบของขวัญอย่างถ่อมตน',
        patterns: [
          {
            formula: '来就来嘛，还带什么礼物，太客气了！',
            zh: '来就来嘛，还买礼物，太客气了！',
            pinyin: 'Lái jiù lái ma, hái mái lǐwù, tài kèqi le!',
            th: 'มาก็ดีใจแล้ว ยังจะซื้อของขวัญมาอีก เกรงใจกันเกินไปแล้ว!',
            en: 'Just coming is enough, why buy gifts, you are too kind!'
          },
          {
            formula: '这是我的一点儿心意，请收下',
            zh: '这是我的一点儿心意，请您收下。',
            pinyin: 'Zhè shì wǒ de yìdiǎnr xīnyì, qǐng nín shōuxià.',
            th: 'นี่เป็นน้ำใจเล็กๆ น้อยๆ จากผม กรุณารับไว้ด้วยนะครับ',
            en: 'This is a small token of my appreciation, please accept it.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '叔叔阿姨您好！今天来您家做客，太打扰你们了！这是给您带的新鲜水果，一点儿心意请收下！',
          pinyin: 'Shūshu āyí nín hǎo! Jīntiān lái nín jiā zuòkè, tài dǎrǎo nǐmen le! Zhè shì gěi nín dài de xīnxiān shuǐguǒ, yìdiǎnr xīnyì qǐng shōuxià!',
          th: 'สวัสดีครับคุณอาทั้งสอง! วันนี้มาเป็นแขกเยือนบ้าน มารบกวนพวกท่านแล้วครับ! นี่คือผลไม้สดที่นำมาฝาก เป็นน้ำใจเล็กๆ น้อยๆ กรุณารับไว้ด้วยนะครับ!',
          en: 'Hello Uncle and Auntie! Visiting your home today, truly sorry to trouble you! These are fresh fruits I brought, please accept this small token of appreciation!'
        },
        {
          speaker: 'B',
          speaker_name: 'คุณลุงเจ้าบ้าน 👨‍🦳',
          zh: '哎呀，来就来嘛，还买礼物，太客气了！快请进，快请进！',
          pinyin: 'Āiyā, lái jiù lái ma, hái mái lǐwù, tài kèqi le! Kuài qǐng jìn, kuài qǐng jìn!',
          th: 'โถ มาเฉยๆ ก็พอแล้ว ยังจะซื้อของขวัญมาอีก เกรงใจกันเกินไปแล้ว! รีบเข้ามาข้างในเลยจ้ะ รีบเข้ามาเลย!',
          en: 'Oh, just coming is wonderful, why buy gifts, you are too polite! Come in please, come in!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '阿姨今天准备了这么多丰盛的菜肴，太感谢您的热情招待了！',
          pinyin: 'Āyí jīntiān zhǔnbèi le zhème duō fēngshèng de càiyáo, tài gǎnxiè nín de rèqíng zhāodài le!',
          th: 'วันนี้คุณป้าเตรียมกับข้าวมากมายน่าทานขนาดนี้ ขอบพระคุณสำหรับการต้อนรับขับสู้ที่แสนอบอุ่นมากครับ!',
          en: 'Auntie prepared so many lavish dishes today, thank you so much for your warm hospitality!'
        },
        {
          speaker: 'B',
          speaker_name: 'คุณลุงเจ้าบ้าน 👨‍🦳',
          zh: '到了这里就跟到自己家一样，别拘束，先喝杯热茶润润喉！',
          pinyin: 'Dào le zhèlǐ jiù gēn dào zìjǐ jiā yíyàng, bié jūshù, xiān hē bēi rèchá rùnrùn hóu!',
          th: 'มาถึงที่นี่ก็ทำตัวเหมือนอยู่บ้านตัวเองนะ ไม่ต้องเกรงใจ ดื่มชาร้อนสักจอกให้ชุ่มคอก่อนสิจ๊ะ!',
          en: 'Being here is just like being at your own home, make yourself comfortable, have a cup of hot tea first!'
        }
      ],
      quizzes: [
        {
          type: 'meaning_match',
          question_th: "เมื่อนำของขวัญไปมอบให้เจ้าบ้าน คำพูดใดสุภาพและแสดงความถ่อมตนที่สุด?",
          options: [
            '这是我的一点儿心意，请收下。',
            '这个礼物非常昂贵，你要好好收着。',
            '我没有钱，所以随便买买。',
            '快给我拿好吃的，我饿了。'
          ],
          correct_index: 0,
          explanation_th: "'这是我的一点儿心意，请收下。' (นี่คือน้ำใจเล็กๆ น้อยๆ จากผม กรุณารับไว้) เป็นสำนวนถ่อมตนที่สุภาพและเป็นมารยาทมาตรฐาน",
          encouragement: 'เข้าใจมารยาทการมอบของขวัญของจีนอย่างถ่องแท้!'
        },
        {
          type: 'tone_match',
          question_th: "คำว่า '买礼物' ออกเสียงพยางค์แรกว่าอย่างไรตามกฎ Tone Sandhi?",
          options: [
            'mái (เสียง 2)',
            'mǎi (เสียง 3 เดิม)',
            'mài (เสียง 4)',
            'māi (เสียง 1)'
          ],
          correct_index: 0,
          explanation_th: "ตามกฎ 3+3 Tone Sandhi คำว่า '买' (3) นำหน้า '礼' (3) จะผันเป็นเสียง 2 คือ 'mái'",
          encouragement: 'จำกฎการเปลี่ยนเสียง 3+3 ในชีวิตจริงได้แม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ยังจะซื้อของขวัญมาอีก เกรงใจเกินไปแล้ว"',
          tokens: ['太客气了', '还买礼物'],
          correct_sequence: ['还买礼物', '太客气了'],
          pinyin: 'Hái mái lǐwù, tài kèqi le',
          meaning_th: 'ยังจะซื้อของขวัญมาอีก เกรงใจเกินไปแล้ว',
          explanation_th: 'การกระทำที่เกรงใจ (还买礼物) + คำอุทานชมเชย (太客气了)',
          encouragement: 'ต่อบล็อกเลโก้มารยาทเจ้าบ้านได้คล่องแคล่วมาก!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '礼仪' (lǐyí) มีความหมายตรงกับข้อใด?",
          options: [
            'มารยาทและธรรมเนียมปฏิบัติ',
            'ขอความช่วยเหลือ',
            'ปฏิเสธคำเชิญ',
            'จ่ายเงินค่าอาหาร'
          ],
          correct_index: 0,
          explanation_th: "'礼仪' แปลว่า มารยาทและธรรมเนียมปฏิบัติ (礼 = พิธี/มารยาท, 仪 = แบบแผน)",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์สำคัญจำได้แม่นยำ!'
        }
      ]
    },
    {
      lesson_id: 't2_u19_l04',
      lesson_number: 4,
      title: {
        zh: '西安四合院拜年挑战',
        th: 'ภารกิจสวัสดีปีใหม่เรือนโบราณซีอาน',
        en: 'Xi’an Courtyard Quest'
      },
      can_do: {
        th: 'นำของขวัญไปสวัสดีปีใหม่ที่บ้านสี่เหอย่วนของเพื่อนคนจีน กล่าวคำถ่อมตน อวยพรมงคลสี่คำ และรับอั่งเปาอย่างถูกต้องตามธรรมเนียม',
        en: 'Visit Chinese siheyuan courtyard, present gifts with modesty, deliver 4-character blessings, and receive red envelopes'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พิชิตบอสใหญ่วัฒนธรรมซีอาน สื่อสารมารยาทจีนครบถ้วนจนผู้ใหญ่ชื่นชม 100%!',
      vocabulary: [
        {
          id: 'hsk2_1919',
          hanzi: '四合院',
          pinyin: 'sìhéyuàn',
          display_pinyin: 'sìhéyuàn',
          pinyin_tone: 'si4he2yuan4',
          meaning_th: 'บ้านสี่เหอย่วน (บ้านโบราณล้อมลานสี่ทิศ)',
          meaning_en: 'courtyard house / Siheyuan',
          radical: '囗',
          radical_name_th: 'หมวดกรอบสี่เหลี่ยมรอบ (大口框)',
          stroke_count: 20,
          mnemonic: 'บ้านเรือนสี่ทิศล้อมรอบ (四) รวมกันอย่างลงตัว (合) มีลานกว้างตรงกลาง (院) = บ้านสี่เหอย่วน',
          kid_mnemonic: 'บ้านโบราณมีลานตรงกลาง ปลูกต้นไม้ มีนกเกาะ = 四合院',
          body_gesture: 'ทำสองแขนกางเป็นกรอบสี่เหลี่ยมล้อมรอบลานบ้าน'
        },
        {
          id: 'hsk2_1920',
          hanzi: '阖家',
          pinyin: 'héjiā',
          display_pinyin: 'héjiā',
          pinyin_tone: 'he2jia1',
          meaning_th: 'ทุกคนในครอบครัว / ทั้งบ้าน (ภาษาทางการมงคล)',
          meaning_en: 'the whole family (formal / polite)',
          radical: '门',
          radical_name_th: 'หมวดประตู (门字框)',
          stroke_count: 21,
          mnemonic: 'ปิดประตูบ้านอบอุ่น (阖) สมาชิกทุกคนในบ้านอยู่พร้อมหน้า (家) = ทุกคนในครอบครัว',
          kid_mnemonic: 'ทั้งครอบครัว พ่อแม่ลูกปู่ย่าตายาย รวมตัวกัน = 阖家',
          body_gesture: 'รวบสองมือเข้าหากันโอบล้อมครอบครัว'
        },
        {
          id: 'hsk2_1921',
          hanzi: '懂事',
          pinyin: 'dǒngshì',
          display_pinyin: 'dǒngshì',
          pinyin_tone: 'dong3shi4',
          meaning_th: 'รู้ความ / กิริยามารยาทดีงาม',
          meaning_en: 'sensible / thoughtful / well-behaved',
          radical: '忄',
          radical_name_th: 'หมวดใจยืน (竖心旁)',
          stroke_count: 23,
          mnemonic: 'มีจิตใจเข้าใจโลก (懂) และปฏิบัติต่อเรื่องราวต่างๆ ได้อย่างเหมาะสม (事) = รู้ความ',
          kid_mnemonic: 'เด็กดีน่ารัก ผู้ใหญ่เอ่ยปากชมเปาะ = 懂事',
          body_gesture: 'พยักหน้ายิ้มแล้วค้อมหัวรับคำชมอย่างถ่อมตน'
        },
        {
          id: 'hsk2_1922',
          hanzi: '热茶',
          pinyin: 'rèchá',
          display_pinyin: 'rèchá',
          pinyin_tone: 're4cha2',
          meaning_th: 'น้ำชาร้อนต้อนรับแขก',
          meaning_en: 'hot tea',
          radical: '艹',
          radical_name_th: 'หมวดหญ้า/สมุนไพร (草字头)',
          stroke_count: 19,
          mnemonic: 'ใบชาหอมกรุ่น (茶) ชงด้วยน้ำร้อนอุ่นสบายคลายหนาว (热) = น้ำชาร้อน',
          kid_mnemonic: 'ถ้วยชาควันลอยกรุ่น กลิ่นหอมฟุ้ง = 热茶',
          body_gesture: 'ประคองถ้วยชาด้วยสองมือแล้วเป่าเบาๆ'
        }
      ],
      tone_rule: {
        rule_name: 'Tone Sandhi: การผันเสียง 懂事 (dǒngshì ➔ dǒngshì)',
        description_th: 'คำว่า 懂 (เสียง 3) นำหน้า 事 (เสียง 4) ออกเสียงเป็น Half-3rd Tone ชัดเจน',
        example: '夸我懂事 (kuā wǒ dǒngshì - ชมว่าฉันรู้ความ)',
        fun_metaphor: 'คำชมว่า 懂事 คือคำชมสูงสุดที่ผู้ใหญ่จีนจะมอบให้แก่เด็กหรือแขกผู้มาเยือน!',
        reassurance: 'คำว่า 阖家 (héjiā) คำว่า 阖 เป็นเสียง 2 ชัดเจน'
      },
      grammar_bite: {
        title: 'สรุปบทสนทนาเยือนบ้านและอวยพรตรุษจีน (Courtyard Master Playbook)',
        explanation_th: 'รวมคำกล่าวถ่อมตน มอบของขวัญ อวยพรมงคล 4 คำ และรับอั่งเปา',
        patterns: [
          {
            formula: '祝叔叔阿姨 + [คำมงคล 4 ตัว] + [คำมงคล 4 ตัว]',
            zh: '祝叔叔阿姨新年快乐，万事如意，身体健康，阖家幸福！',
            pinyin: 'Zhù shūshu āyí xīnnián kuàilè, wànshì rúyì, shēntǐ jiànkāng, héjiā xìngfú!',
            th: 'ขอให้คุณอาทั้งสองมีความสุขในวันปีใหม่ สมปรารถนา สุขภาพแข็งแรง ครอบครัวเปี่ยมสุขครับ!',
            en: 'Wishing Uncle and Auntie Happy New Year, all wishes fulfilled, good health, and family happiness!'
          },
          {
            formula: '一点儿心意 + 请您收下',
            zh: '这是我的一点儿心意，请您收下。',
            pinyin: 'Zhè shì wǒ de yìdiǎnr xīnyì, qǐng nín shōuxià.',
            th: 'นี่เป็นน้ำใจเล็กๆ น้อยๆ จากผม กรุณารับไว้ด้วยนะครับ',
            en: 'This is a small token of my appreciation, please accept it.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '叔叔阿姨过年好！今天来四合院拜年，太打扰你们了！这是给您带的新鲜水果，一点儿心意请收下！',
          pinyin: 'Shūshu āyí guònián hǎo! Jīntiān lái sìhéyuàn bàinián, tài dǎrǎo nǐmen le! Zhè shì gěi nín dài de xīnxiān shuǐguǒ, yìdiǎnr xīnyì qǐng shōuxià!',
          th: 'สวัสดีปีใหม่ครับคุณอาทั้งสอง! วันนี้มาสวัสดีปีใหม่ที่บ้านสี่เหอย่วน มารบกวนพวกท่านแล้วครับ! นี่คือผลไม้สดที่นำมาฝาก เป็นน้ำใจเล็กๆ น้อยๆ กรุณารับไว้ด้วยนะครับ!',
          en: 'Happy New Year Uncle and Auntie! Visiting your courtyard house for New Year, sorry to trouble you! These are fresh fruits I brought, please accept this small token of appreciation!'
        },
        {
          speaker: 'B',
          speaker_name: 'คุณป้าเจ้าบ้าน 👩‍🦳',
          zh: '哎呀，来就来嘛，还买礼物，太客气了！小林真是太懂事了！快进屋喝热茶！',
          pinyin: 'Āiyā, lái jiù lái ma, hái mái lǐwù, tài kèqi le! Xiǎo Lín zhēnshi tài dǒngshì le! Kuài jìn wū hē rèchá!',
          th: 'โถ มาเฉยๆ ก็ดีใจแล้ว ยังจะซื้อของขวัญมาอีก เกรงใจกันเกินไปแล้ว! เสี่ยวหลินนี่รู้ความน่ารักจริงๆ! รีบเข้าบ้านมาดื่มชาร้อนเร็วเข้าจ้ะ!',
          en: 'Oh, just coming is wonderful, why buy gifts, you are too kind! Xiao Lin is truly so thoughtful! Come inside and have hot tea quickly!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '祝叔叔阿姨新年快乐，万事如意，身体健康，阖家幸福！',
          pinyin: 'Zhù shūshu āyí xīnnián kuàilè, wànshì rúyì, shēntǐ jiànkāng, héjiā xìngfú!',
          th: 'ขอให้คุณอาทั้งสองมีความสุขในวันปีใหม่ สมปรารถนาในทุกสรรพสิ่ง สุขภาพแข็งแรง และครอบครัวเปี่ยมสุขครับ!',
          en: 'Wishing Uncle and Auntie Happy New Year, all wishes fulfilled, good health, and family happiness!'
        },
        {
          speaker: 'B',
          speaker_name: 'คุณลุงเจ้าบ้าน 👨‍🦳',
          zh: '好孩子！大年初一图个大吉大利，叔叔给你一个大红包，祝你学业进步！',
          pinyin: 'Hǎo háizi! Dànián chūyī tú ge dàjí dàlì, shūshu gěi nǐ yí ge dà hóngbāo, zhù nǐ xuéyè jìnbù!',
          th: 'เด็กดี! วันชิวอิกเอาฤกษ์มหาศิริมงคล อาให้ซองอั่งเปาใบใหญ่นะ ขอให้การเรียนก้าวหน้าสำเร็จนะหลาน!',
          en: 'Good child! On the first day of New Year for supreme fortune, Uncle gives you a big red envelope, wishing you progress in studies!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อผู้ใหญ่ชาวจีนชมว่า '你太懂事了' (Nǐ tài dǒngshì le) หมายถึงข้อใด?",
          options: [
            'เธอเป็นคนที่รู้ความและมีมารยาทดีมาก',
            'เธอพูดภาษาจีนไม่รู้เรื่อง',
            'เธอซื้อของขวัญแพงเกินไป',
            'เธอมาถึงผิดเวลา'
          ],
          correct_index: 0,
          explanation_th: "'懂事' เป็นคำชมที่มีความหมายว่า รู้ความ มีกิริยามารยาทดี เข้าใจธรรมเนียม",
          encouragement: 'เข้าใจคำชมทางวัฒนธรรมจีนได้อย่างลึกซึ้ง!'
        },
        {
          type: 'meaning_match',
          question_th: "บ้านโบราณแบบ '四合院' มีผังอาคารแบบใด?",
          options: [
            'บ้านสี่ทิศล้อมรอบลานสี่เหลี่ยมตรงกลาง',
            'ตึกแถวทรงกระบอกสูง 5 ชั้น',
            'บ้านแพลอยอยู่กลางน้ำ',
            'กระท่อมไม้ทรงกลม'
          ],
          correct_index: 0,
          explanation_th: "'四合院' (Siheyuan) คือ บ้านที่มีอาคาร 4 หลังล้อมรอบลานสี่เหลี่ยมตรงกลาง",
          encouragement: 'จำเอกลักษณ์สถาปัตยกรรมจีนโบราณได้แม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ขอให้ทั้งครอบครัวเปี่ยมสุข"',
          tokens: ['阖家幸福', '祝您'],
          correct_sequence: ['祝您', '阖家幸福'],
          pinyin: 'Zhù nín héjiā xìngfú',
          meaning_th: 'ขอให้ทั้งครอบครัวเปี่ยมสุข',
          explanation_th: 'คำนำหน้าคำอวยพร (祝您) + ประโยคมงคลครอบครัว (阖家幸福)',
          encouragement: 'เรียงคำอวยพรตรุษจีนได้อย่างงดงาม!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '阖家' (héjiā) มีความหมายตรงกับข้อใด?",
          options: [
            'ทุกคนในครอบครัว / ทั้งบ้าน',
            'เพื่อนร่วมงาน',
            'เพื่อนบ้าน',
            'แขกต่างถิ่น'
          ],
          correct_index: 0,
          explanation_th: "'阖家' แปลว่า ทั้งครอบครัว (阖 = ทั้งหมด, 家 = ครอบครัว)",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์สำคัญจำได้แม่นยำ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณได้รับเกียรติเชิญไปร่วมฉลองวันขึ้นปีใหม่จีน (大年初一) ที่บ้านสไตล์สี่เหอย่วนโบราณของเพื่อนสนิทในเมืองซีอาน คุณนำกระเช้าผลไม้สดไปมอบให้คุณอาทั้งสอง กล่าวคำถ่อมตน มอบของขวัญ อวยพร 4 คำ และรับอั่งเปาอย่างนอบน้อม คุณควรพูดอย่างไรให้ประทับใจที่สุด?',
        options: [
          '叔叔阿姨过年好！今天来拜年太打扰了，这是新鲜水果，一点儿心意请收下！祝您新年快乐，万事如意，身体健康，阖家幸福！ (Shūshu āyí guònián hǎo! Jīntiān lái bàinián tài dǎrǎo le, zhè shì xīnxiān shuǐguǒ, yìdiǎnr xīnyì qǐng shōuxià! Zhù nín xīnnián kuàilè, wànshì rúyì, shēntǐ jiànkāng, héjiā xìngfú!)',
          '你们家的房子太旧了，什么时候搬家？ (Nǐmen jiā de fángzi tài jiù le, shénme shíhou bānjiā?)',
          '服务员，这个红烧牛肉太咸了，我要换货！ (Fúwùyuán, zhè ge hóngshāo niúròu tài xián le, wǒ yào huànhuò!)',
          '医生，我肚子疼，可以给我开处方药吗？ (Yīshēng, wǒ dùzi téng, kěyǐ gěi wǒ kāi chǔfāngyào ma?)'
        ],
        correct_index: 0,
        explanation_th: "ตัวเลือกแรกสื่อสารมารยาทจีนได้สมบูรณ์แบบไร้ที่ติ: สวัสดีปีใหม่ (过年好) ถ่อมตนว่ามารบกวน (太打扰了) มอบของขวัญเป็นน้ำใจ (一点儿心意请收下) และร้อยเรียงคำอวยพรมงคล 4 คำอันทรงคุณค่าครบถ้วน",
        encouragement: 'ยินดีด้วยอย่างยิ่ง! คุณพิชิต Boss Challenge วัฒนธรรมเรือนโบราณซีอาน ได้รับคำชมว่ารู้ความ (懂事) และรับอั่งเปาสำเร็จ 100%!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u19_master',
        badge_name: 'ทูตวัฒนธรรมและมิตรภาพแดนมังกร 🏮🥟',
        message_th: 'สุดยอดมาก! คุณผ่าน Unit 19 สมบูรณ์แบบ พร้อมไปเยือนบ้านเพื่อนคนจีน อวยพรตรุษจีนด้วยสำนวน 4 คำ และมอบของขวัญได้อย่างสง่างาม!',
        xp_reward: 200
      }
    }
  ]
};
