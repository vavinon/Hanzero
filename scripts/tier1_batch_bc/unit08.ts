/**
 * scripts/tier1_batch_bc/unit08.ts
 * Tier 1 Unit 8: Weather & Seasons (tier1_u08)
 * Golden Template Compliant, Simplified Chinese 100%, Tone Sandhi Annotated.
 */

export const unit08 = {
  unit_id: 'tier1_u08',
  tier: 1,
  unit_number: 8,
  title: {
    zh: '天气与四季变换',
    th: 'สภาพอากาศ & ฤดูกาล',
    en: 'Weather & Seasons'
  },
  description: 'วันนี้ร้อนหรือหนาว? ฝนตกหรือหิมะตก ชวนคุยเรื่องสภาพอากาศและเตรียมเสื้อผ้าไปเที่ยวจีน',
  lessons: [
    {
      lesson_id: 't1_u08_l01',
      lesson_number: 1,
      title: {
        zh: '今天天气怎么样',
        th: 'วันนี้อากาศเป็นอย่างไร?',
        en: 'How is the Weather Today?'
      },
      can_do: {
        th: 'สอบถามและอธิบายสภาพอากาศ ร้อน หนาว สบายๆ ได้อย่างเป็นธรรมชาติ',
        en: 'Ask and describe weather conditions: hot, cold, mild, and comfortable'
      },
      baby_step_goal: 'เป้าหมายวันนี้: คุยเรื่องสภาพอากาศในเมืองจีนและบอกได้ว่าร้อนหรือหนาว!',
      vocabulary: [
        {
          id: 'hsk1_0801',
          hanzi: '天气',
          pinyin: 'tiānqì',
          display_pinyin: 'tiānqì',
          pinyin_tone: 'tian1qi4',
          meaning_th: 'สภาพอากาศ/ดินฟ้าอากาศ',
          meaning_en: 'weather',
          radical: '气',
          radical_name_th: 'หมวดอากาศ (气字头)',
          stroke_count: 8,
          mnemonic: 'ไออากาศ (气) ที่พัดผ่านผืนฟ้า (天) = สภาพอากาศ (天气)',
          kid_mnemonic: 'มองขึ้นไปบนฟ้า สูดลมหายใจสดชื่น = 天气',
          body_gesture: 'กางสองแขนขึ้นสู่ฟ้าแล้วสูดลมหายใจลึกๆ'
        },
        {
          id: 'hsk1_0802',
          hanzi: '怎么样',
          pinyin: 'zěnmeyàng',
          display_pinyin: 'zěnmeyàng',
          pinyin_tone: 'zen3me yang4',
          meaning_th: 'เป็นอย่างไรบ้าง',
          meaning_en: 'how about / how is it',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 18,
          mnemonic: 'ในใจคิดสงสัยว่ารูปลักษณ์สภาพ (样) เป็นอย่างไร = 怎么样',
          kid_mnemonic: 'เอียงคอยิ้มถาม เป็นยังไงบ้างจ๊ะ = 怎么样',
          body_gesture: 'ผายสองมือออกข้างลำตัวพร้อมยิ้มถาม'
        },
        {
          id: 'hsk1_0803',
          hanzi: '热',
          pinyin: 'rè',
          display_pinyin: 'rè',
          pinyin_tone: 're4',
          meaning_th: 'ร้อน',
          meaning_en: 'hot',
          radical: '灬',
          radical_name_th: 'หมวดไฟสี่จุด (四点底)',
          stroke_count: 10,
          mnemonic: 'เปลวไฟสี่จุด (灬) ด้านล่างแผ่ความร้อนระอุ = ร้อน (热)',
          kid_mnemonic: 'แดดแผดเผา เอาพัดมาพัด ร้อนจังเลย = 热',
          body_gesture: 'เอามือข้างหนึ่งพัดโบกใบหน้าทำท่าร้อน'
        },
        {
          id: 'hsk1_0804',
          hanzi: '冷',
          pinyin: 'lěng',
          display_pinyin: 'lěng',
          pinyin_tone: 'leng3',
          meaning_th: 'หนาว/เย็น',
          meaning_en: 'cold',
          radical: '冫',
          radical_name_th: 'หมวดหยดน้ำแข็ง (两点水)',
          stroke_count: 7,
          mnemonic: 'หยดน้ำแข็งสองหยด (冫) เย็นเฉียบจนตัวสั่น = หนาว (冷)',
          kid_mnemonic: 'น้ำแข็งเกาะหนาวสั่น กอดอกหนาวจัง = 冷',
          body_gesture: 'ยกสองแขนกอดอกตัวเองทำตัวสั่นเพราะความหนาว'
        },
        {
          id: 'hsk1_0805',
          hanzi: '不冷不热',
          pinyin: 'bù lěng bú rè',
          display_pinyin: 'bù lěng bú rè',
          pinyin_tone: 'bu4 leng3 bu2 re4',
          meaning_th: 'ไม่หนาวไม่ร้อน (อากาศกำลังสบาย)',
          meaning_en: 'neither cold nor hot / mild',
          radical: '一',
          radical_name_th: 'หมวดเส้นขวาง (一部)',
          stroke_count: 25,
          mnemonic: 'ไม่หนาวจัด (不冷) และไม่ร้อนจัด (不热) ลมพัดสบายอุณหภูมิกำลังดี',
          kid_mnemonic: 'ยืนรับลมเย็นๆ ไม่หนาวไม่ร้อน สบายตัวที่สุด = 不冷不热',
          body_gesture: 'แกว่งแขนสองข้างเบาๆ สูดอากาศสบายใจ',
          sandhi_rule: 'bu'
        }
      ],
      tone_rule: {
        rule_name: 'Dual Tone Sandhi ของ 不 ในวลีเดียวกัน: 不冷不热',
        description_th: 'คำว่า 不 ตัวแรกอยู่หน้าเสียง 3 (lěng) จะคงเสียง 4 เป็น bù ส่วน 不 ตัวหลังอยู่หน้าเสียง 4 (rè) จะผันเป็นเสียง 2 คือ bú จึงอ่านว่า bù lěng bú rè',
        example: '不冷不热 (bù lěng bú rè)',
        fun_metaphor: 'น้องปู้ตัวแรกยืนนิ่ง bù lěng พอน้องปู้ตัวหลังเจอเสียงสี่เลยกระโดดหลบเป็น bú rè!',
        reassurance: 'ออกเสียง bù lěng bú rè ลื่นไหลและเป็นสำนวนที่คนจีนประทับใจมาก!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้ถามสภาพอากาศและข้อห้ามทางไวยากรณ์',
        explanation_th: 'ถามอากาศ: [สถานที่/เวลา] + 天气怎么样？ และเมื่อตอบ ห้ามใส่ 是 หน้าคุณศัพท์เด็ดขาด (เช่น ห้ามพูด 今天天气是冷!)',
        patterns: [
          {
            formula: '[สถานที่/เวลา] + 天气怎么样？ = ...สภาพอากาศเป็นอย่างไร?',
            zh: '北京今天天气怎么样？',
            pinyin: 'Běijīng jīntiān tiānqì zěnmeyàng?',
            th: 'วันนี้สภาพอากาศที่ปักกิ่งเป็นอย่างไรบ้าง?',
            en: 'How is the weather in Beijing today?'
          },
          {
            formula: '今天 [คุณศัพท์บอกอากาศ] = วันนี้...',
            zh: '今天很冷 / 今天不冷不热。',
            pinyin: 'Jīntiān hěn lěng / Jīntiān bù lěng bú rè.',
            th: 'วันนี้หนาวมาก / วันนี้ไม่หนาวไม่ร้อน (อากาศสบาย)',
            en: 'Today is very cold / Today is neither cold nor hot.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '王明，北京今天天气怎么样？',
          pinyin: 'Wáng Míng, Běijīng jīntiān tiānqì zěnmeyàng?',
          th: 'หวังหมิง วันนี้สภาพอากาศที่ปักกิ่งเป็นอย่างไรบ้างเหรอ?',
          en: 'Wang Ming, how is the weather in Beijing today?'
        },
        {
          speaker: 'B',
          speaker_name: 'หวังหมิง 🧑',
          zh: '今天天气非常好，不冷不热，大概二十度。',
          pinyin: 'Jīntiān tiānqì fēicháng hǎo, bù lěng bú rè, dàgài èrshí dù.',
          th: 'วันนี้อากาศดีมากเลย ไม่หนาวไม่ร้อน ประมาณ 20 องศา',
          en: 'Today\'s weather is very good, neither cold nor hot, about 20 degrees.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '太舒服了！在曼谷每天都很热。',
          pinyin: 'Tài shūfu le! Zài Màngǔ měitiān dōu hěn rè.',
          th: 'สบายจังเลย! ที่กรุงเทพฯ ทุกๆ วันร้อนมากเลยนะ',
          en: 'So comfortable! In Bangkok every day is very hot.'
        },
        {
          speaker: 'B',
          speaker_name: 'หวังหมิง 🧑',
          zh: '对啊，今天很适合出去走走！',
          pinyin: 'Duì a, jīntiān hěn shìhé chūqù zǒuzhou!',
          th: 'ใช่แล้ว วันนี้เหมาะกับการออกไปเดินเล่นมากๆ!',
          en: 'Yeah, today is very suitable to go out for a walk!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ได้ยินเสียง 'bù lěng bú rè' สื่อถึงสภาพอากาศแบบใด?",
          options: [
            'ไม่หนาวไม่ร้อน อากาศสบาย',
            'หนาวจัดจนตัวสั่น',
            'ร้อนจัดแดดแผดเผา',
            'ฝนตกหนัก'
          ],
          correct_index: 0,
          explanation_th: 'bù lěng คือ ไม่หนาว และ bú rè คือ ไม่ร้อน รวมกันคือ อากาศสบายกำลังดี',
          encouragement: 'ฟังสำนวนยอดฮิตของคนจีนได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '冷' (หนาว) มีหมวดนำน้ำแข็งสองหยด '冫' สื่อถึงอะไร?",
          options: [
            'เกล็ดน้ำแข็งและไอความเย็นจัด',
            'เปลวไฟที่ลุกไหม้',
            'หยดน้ำฝนโปรยปราย',
            'ผืนดิน'
          ],
          correct_index: 0,
          explanation_th: '冫 (两点水) คือหมวดน้ำแข็ง สื่อถึงความเย็นจัดจนกลายเป็นน้ำแข็ง',
          encouragement: 'จำหมวดนำน้ำแข็ง 冫 ได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "วันนี้สภาพอากาศที่ปักกิ่งเป็นอย่างไร"',
          tokens: [
            '天气怎么样',
            '北京今天'
          ],
          correct_sequence: [
            '北京今天',
            '天气怎么样'
          ],
          pinyin: 'Běijīng jīntiān tiānqì zěnmeyàng',
          meaning_th: 'วันนี้สภาพอากาศที่ปักกิ่งเป็นอย่างไร',
          explanation_th: 'สถานที่/เวลา (北京今天) + ถามอากาศ (天气怎么样？)',
          encouragement: 'ยอดเยี่ยมมาก! ถามสภาพอากาศได้อย่างถูกต้องตามหลักภาษา!'
        },
        {
          type: 'flash_recall',
          question_th: '🚨 กับดักไวยากรณ์: ประโยค "วันนี้อากาศหนาวมาก" ข้อใดถูกต้องตามไวยากรณ์จีน?',
          options: [
            '今天很冷。 (Jīntiān hěn lěng.) - ถูกต้อง ห้ามใส่ 是',
            '今天天气是冷。 (Jīntiān tiānqì shì lěng.) - ผิดไวยากรณ์',
            '是今天冷。 (Shì jīntiān lěng.)',
            '冷今天很。 (Lěng jīntiān hěn.)'
          ],
          correct_index: 0,
          explanation_th: 'ในภาษาจีน คำคุณศัพท์ทำหน้าที่เป็นภาคแสดงได้ทันที ห้ามใส่ 是 คั่นข้างหน้า',
          encouragement: 'ไม่ตกหลุมพรางไวยากรณ์! เก่งยอดเยี่ยม!'
        }
      ],
      boss_challenge: {
        scenario_th: 'เพื่อนคนไทยที่กำลังจะบินมาปักกิ่งส่งแชตถามคุณว่า: "北京今天天气怎么样？" วันนี้อากาศกำลังดี ไม่หนาวไม่ร้อน ต้องตอบเพื่อนว่าอย่างไร?',
        options: [
          '今天天气不冷不热，非常舒服！ (Jīntiān tiānqì bù lěng bú rè, fēicháng shūfu!)',
          '今天很吃药。 (Jīntiān hěn chī yào.)',
          '洗手间在前面。 (Xǐshǒujiān zài qiánmiàn.)',
          '多少钱一件？ (Duōshao qián yí jiàn?)'
        ],
        correct_index: 0,
        explanation_th: '今天天气不冷不热，非常舒服！ เป็นคำตอบที่บรรยายสภาพอากาศได้ตรงจุดและเป็นธรรมชาติที่สุด!',
        encouragement: '🎉 สื่อสารเรื่องอากาศได้อย่างคล่องแคล่ว เพื่อนเตรียมตัวมาเที่ยวได้อย่างสบายใจ!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u08_l01',
        badge_name: 'ผู้พยากรณ์สภาพอากาศ ⛅🐰',
        message_th: 'ยอดเยี่ยมมาก! คุณถามและบอกสภาพอากาศ ร้อน หนาว สบายๆ ได้อย่างคล่องแคล่วแล้ว!',
        xp_reward: 45
      }
    },
    {
      lesson_id: 't1_u08_l02',
      lesson_number: 2,
      title: {
        zh: '下雨了与带伞',
        th: 'ฝนตก & หิมะตก',
        en: 'Raining & Bringing Umbrellas'
      },
      can_do: {
        th: 'บอกสภาพฝนตก หิมะตก แดดออก ฟ้าครึ้ม เข้าใจการใช้ 了 บอกการเปลี่ยนสภาพ และเตือนให้พกร่ม',
        en: 'Express rain, snow, sunny, cloudy, understand inchoative 了, and remind bringing umbrellas'
      },
      baby_step_goal: 'เป้าหมายวันนี้: เตือนเพื่อนให้พกร่มเมื่อฝนตกและบอกหิมะตกได้!',
      vocabulary: [
        {
          id: 'hsk1_0806',
          hanzi: '下雨',
          pinyin: 'xiàyǔ',
          display_pinyin: 'xiàyǔ',
          pinyin_tone: 'xia4yu3',
          meaning_th: 'ฝนตก',
          meaning_en: 'rain / raining',
          radical: '雨',
          radical_name_th: 'หมวดฝน (雨字头)',
          stroke_count: 11,
          mnemonic: 'หยาดฝน (雨) ตกลงมาจากฟ้า (下) = ฝนตก (下雨)',
          kid_mnemonic: 'กางร่ม เม็ดฝนตกลงมาซ่าๆ เปาะแปะ = 下雨',
          body_gesture: 'กระดิกนิ้วมือสองข้างเลื่อนลงจากบนลงล่างเหมือนสายฝน'
        },
        {
          id: 'hsk1_0807',
          hanzi: '下雪',
          pinyin: 'xiàxuě',
          display_pinyin: 'xiàxuě',
          pinyin_tone: 'xia4xue3',
          meaning_th: 'หิมะตก',
          meaning_en: 'snow / snowing',
          radical: '雨',
          radical_name_th: 'หมวดฝน (雨字头)',
          stroke_count: 14,
          mnemonic: 'ปุยหิมะขาวบริสุทธิ์ (雪) ร่วงหล่นลงมา (下) = หิมะตก (下雪)',
          kid_mnemonic: 'ปั้นตุ๊กตาหิมะสีขาว ปุยหิมะโปรยปราย = 下雪',
          body_gesture: 'กางสองมือออกรับปุยหิมะที่โปรยลงมาอย่างตื่นเต้น'
        },
        {
          id: 'hsk1_0808',
          hanzi: '晴天',
          pinyin: 'qíngtiān',
          display_pinyin: 'qíngtiān',
          pinyin_tone: 'qing2tian1',
          meaning_th: 'วันแดดออก/ท้องฟ้าโปร่ง',
          meaning_en: 'sunny day / clear day',
          radical: '日',
          radical_name_th: 'หมวดดวงอาทิตย์ (日字旁)',
          stroke_count: 16,
          mnemonic: 'ดวงอาทิตย์ (日) ส่องแสงสดใส ฟ้าเป็นสีคราม (青) = ท้องฟ้าโปร่ง (晴天)',
          kid_mnemonic: 'แดดออกจ้า ท้องฟ้าสีฟ้าสดใส ไร้เมฆหมอก = 晴天',
          body_gesture: 'สองมือทำเป็นวงกลมดวงอาทิตย์ส่องประกาย'
        },
        {
          id: 'hsk1_0809',
          hanzi: '阴天',
          pinyin: 'yīntiān',
          display_pinyin: 'yīntiān',
          pinyin_tone: 'yin1tian1',
          meaning_th: 'วันฟ้าครึ้ม/เมฆมาก',
          meaning_en: 'overcast / cloudy day',
          radical: '阝',
          radical_name_th: 'หมวดหูซ้าย/เนินเขา (左耳旁)',
          stroke_count: 10,
          mnemonic: 'เมฆหนาบดบังแสงอาทิตย์จนเกิดเงาสลัว = ฟ้าครึ้ม (阴天)',
          kid_mnemonic: 'เมฆดำลอยมาบดบังแดด ลมพัดครึ้มๆ = 阴天',
          body_gesture: 'กางสองมือบังหน้าผากทำท่ามองเมฆครึ้ม'
        },
        {
          id: 'hsk1_0810',
          hanzi: '了',
          pinyin: 'le',
          display_pinyin: 'le',
          pinyin_tone: 'le',
          meaning_th: 'แล้ว (บอกการเปลี่ยนแปลงสภาพแวดล้อม)',
          meaning_en: 'change of state marker / already',
          radical: '乙',
          radical_name_th: 'หมวดกิ่งสอง (乙字旁)',
          stroke_count: 2,
          mnemonic: 'สภาพการณ์เดิมได้เปลี่ยนผ่านไปสู่สถานะใหม่เรียบร้อยแล้ว = แล้ว (了)',
          kid_mnemonic: 'ดีดนิ้วเป๊าะ! เกิดสิ่งใหม่ขึ้นแล้วนะ = 了',
          body_gesture: 'ดีดนิ้วมือขวาอย่างมั่นใจ'
        },
        {
          id: 'hsk1_0811',
          hanzi: '外面',
          pinyin: 'wàimiàn',
          display_pinyin: 'wàimiàn',
          pinyin_tone: 'wai4mian4',
          meaning_th: 'ข้างนอก/ด้านนอก',
          meaning_en: 'outside',
          radical: '夕',
          radical_name_th: 'หมวดดวงจันทร์พลบค่ำ (夕字旁)',
          stroke_count: 14,
          mnemonic: 'ด้านนอก (外) ตัวอาคารหรือห้องพัก = ข้างนอก (外面)',
          kid_mnemonic: 'เปิดประตูมองออกไปข้างนอกห้อง = 外面',
          body_gesture: 'ชี้มือออกไปข้างนอกหน้าต่าง'
        },
        {
          id: 'hsk1_0812',
          hanzi: '带',
          pinyin: 'dài',
          display_pinyin: 'dài',
          pinyin_tone: 'dai4',
          meaning_th: 'พก/นำติดตัวไป',
          meaning_en: 'bring / take along',
          radical: '巾',
          radical_name_th: 'หมวดผ้าเช็ดหน้า (巾字底)',
          stroke_count: 9,
          mnemonic: 'คาดเข็มขัดหรือพกผ้าสิ่งของติดตัวไปด้วย = พก/นำไป (带)',
          kid_mnemonic: 'หยิบใส่กระเป๋า พกติดตัวไปเที่ยวด้วย = 带',
          body_gesture: 'ทำท่าหยิบของใส่ลงในกระเป๋าเป้'
        },
        {
          id: 'hsk1_0813',
          hanzi: '伞',
          pinyin: 'sǎn',
          display_pinyin: 'sǎn',
          pinyin_tone: 'san3',
          meaning_th: 'ร่ม',
          meaning_en: 'umbrella',
          radical: '人',
          radical_name_th: 'หมวดคน (人字头)',
          stroke_count: 6,
          mnemonic: 'รูปทรงร่มที่มีโครงกางคลุมคนด้านล่างเพื่อกันแดดกันฝน = ร่ม (伞)',
          kid_mnemonic: 'กางร่มชึ้บ! เดินลุยฝนอย่างปลอดภัย = 伞',
          body_gesture: 'ยกมือขึ้นเหนือศีรษะทำท่ากางร่ม'
        }
      ],
      tone_rule: {
        rule_name: 'Tone Sandhi 3+3 ในคำว่า 雨伞 (yúsǎn)',
        description_th: '雨 (yǔ) และ 伞 (sǎn) เป็นเสียง 3 ทั้งคู่ เมื่อพูดรวมกัน 雨 จะผันเป็นเสียง 2 คือ yúsǎn',
        example: '雨伞 (yǔ + sǎn -> yúsǎn)',
        fun_metaphor: 'น้องยวี่เจอเพื่อนร่มสั่นเสียง 3 เลยกระโดดขึ้นเสียง 2 yúsǎn!',
        reassurance: 'ออกเสียง yúsǎn ลื่นหู พูดง่าย สบายปาก!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้บอกการเปลี่ยนสภาพด้วย 了 และการเตือนพกของ',
        explanation_th: 'คำว่า 了 วางท้ายประโยคไม่ได้บอกแค่อดีต แต่บอกว่าสภาพแวดล้อมได้เปลี่ยนไปแล้ว (Inchoative 了) เช่น ฝนเริ่มตกลงมาแล้ว',
        patterns: [
          {
            formula: '[สภาพอากาศ] + 了！ = ...แล้วนะ!',
            zh: '下雨了！ / 下雪了！',
            pinyin: 'Xiàyǔ le! / Xiàxuě le!',
            th: 'ฝนตกแล้ว! / หิมะตกแล้ว!',
            en: 'It is raining now! / It is snowing now!'
          },
          {
            formula: '外面 + [สภาพ]，带 [สิ่งของ] 吧！ = ข้างนอก... พก...ไปเถอะ!',
            zh: '外面下雨了，带伞吧！',
            pinyin: 'Wàimiàn xiàyǔ le, dài sǎn ba!',
            th: 'ข้างนอกฝนตกแล้ว พกร่มไปด้วยนะ!',
            en: 'It is raining outside, take an umbrella!'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '王明，你看窗外，阴天了！',
          pinyin: 'Wáng Míng, nǐ kàn chuāngwài, yīntiān le!',
          th: 'หวังหมิง นายดูนอกหน้าต่างสิ ฟ้ามืดครึ้มแล้ว!',
          en: 'Wang Ming, look outside the window, it turned overcast!'
        },
        {
          speaker: 'B',
          speaker_name: 'หวังหมิง 🧑',
          zh: '哎呀，外面下雨了！风也很大。',
          pinyin: 'Āiyā, wàimiàn xiàyǔ le! Fēng yě hěn dà.',
          th: 'อัยย่า ข้างนอกฝนตกลงมาแล้ว! ลมก็แรงด้วย',
          en: 'Oh no, it\'s raining outside! The wind is strong too.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '我们要出门吗？你有雨伞吗？',
          pinyin: 'Wǒmen yào chūmén ma? Nǐ yǒu yǔsǎn ma?',
          th: 'พวกเราจะออกไปข้างนอกไหม? นายมีร่มไหม?',
          en: 'Are we going out? Do you have an umbrella?'
        },
        {
          speaker: 'B',
          speaker_name: 'หวังหมิง 🧑',
          zh: '我有两把伞，给你一把，我们带伞走吧！',
          pinyin: 'Wǒ yǒu liǎng bǎ sǎn, gěi nǐ yì bǎ, wǒmen dài sǎn zǒu ba!',
          th: 'ฉันมีร่มสองคัน ให้เธอคันหนึ่ง พวกเราพกร่มแล้วไปกันเถอะ!',
          en: 'I have two umbrellas, give you one, let\'s take umbrellas and go!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '太好了，谢谢你！',
          pinyin: 'Tài hǎo le, xièxie nǐ!',
          th: 'เยี่ยมเลย ขอบคุณนะ!',
          en: 'Great, thank you!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ได้ยินเสียง 'wàimiàn xiàyǔ le' แปลว่าอะไร?",
          options: [
            'ข้างนอกฝนตกแล้ว',
            'ข้างนอกหิมะตกแล้ว',
            'ข้างนอกแดดออกจ้า',
            'ข้างในห้องหนาวมาก'
          ],
          correct_index: 0,
          explanation_th: 'wàimiàn คือ ข้างนอก และ xiàyǔ le คือ ฝนตกแล้ว รวมกันคือ ข้างนอกฝนตกแล้ว',
          encouragement: 'ฟังคำเตือนเรื่องฝนตกได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "ทั้งคำว่า '雨' (ฝน) และ '雪' (หิมะ) มีหมวดนำใดที่สื่อถึงหยาดน้ำฟ้า?",
          options: [
            'หมวดฝน (雨 雨字头)',
            'หมวดไฟ (灬)',
            'หมวดดิน (土)',
            'หมวดลม (风)'
          ],
          correct_index: 0,
          explanation_th: 'หมวดนำ 雨 (ฝน) อยู่ด้านบนของคำเกี่ยวกับสภาพอากาศ เช่น 雨, 雪, 雾, 霜',
          encouragement: 'จำหมวดนำฝน 雨 ได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ข้างนอกฝนตกแล้ว พกร่มไปด้วยนะ"',
          tokens: [
            '带伞吧',
            '外面下雨了'
          ],
          correct_sequence: [
            '外面下雨了',
            '带伞吧'
          ],
          pinyin: 'Wàimiàn xiàyǔ le, dài sǎn ba',
          meaning_th: 'ข้างนอกฝนตกแล้ว พกร่มไปด้วยนะ',
          explanation_th: 'บอกเหตุการณ์สภาพอากาศ (外面下雨了) + คำแนะนำ (带伞吧)',
          encouragement: 'เรียงประโยคตักเตือนเพื่อนได้อย่างคล่องแคล่ว!'
        },
        {
          type: 'flash_recall',
          question_th: 'คำว่า "หิมะตก" ในภาษาจีนตรงกับข้อใด?',
          options: [
            '下雪 (xiàxuě)',
            '下雨 (xiàyǔ)',
            '晴天 (qíngtiān)',
            '阴天 (yīntiān)'
          ],
          correct_index: 0,
          explanation_th: '下雪 (xiàxuě) แปลว่า หิมะตก ส่วน 下雨 (xiàyǔ) แปลว่า ฝนตก',
          encouragement: 'แยกแยะฝนตกกับหิมะตกได้แม่นยำ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณมองออกไปนอกหน้าต่างเห็นฝนเริ่มตกลงมา และเพื่อนกำลังจะเปิดประตูเดินออกไปข้างนอก คุณต้องการเตือนเพื่อนว่า "ข้างนอกฝนตกแล้ว พกร่มไปด้วยนะ!" ต้องพูดว่าอย่างไร?',
        options: [
          '外面下雨了，带伞吧！ (Wàimiàn xiàyǔ le, dài sǎn ba!)',
          '外面下雨了，不要吃药。 (Wàimiàn xiàyǔ le, bú yào chī yào.)',
          '洗手间在外面。 (Xǐshǒujiān zài wàimiàn.)',
          '这是我爸爸的雨伞。 (Zhè shì wǒ bàba de yǔsǎn.)'
        ],
        correct_index: 0,
        explanation_th: '外面下雨了，带伞吧！ เป็นประโยคแสดงความห่วงใยที่ถูกต้องตามธรรมชาติและไวยากรณ์ 100%!',
        encouragement: '🎉 ความห่วงใยอบอุ่นใจมาก! เพื่อนพกร่มแล้วไม่เปียกฝนแน่นอน!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u08_l02',
        badge_name: 'ผู้พิทักษ์สายฝนและหิมะ ☔🐰',
        message_th: 'ยอดเยี่ยมมาก! คุณบอกฝนตก หิมะตก และเตือนให้พกร่มได้อย่างคล่องแคล่ว!',
        xp_reward: 45
      }
    },
    {
      lesson_id: 't1_u08_l03',
      lesson_number: 3,
      title: {
        zh: '一年四季与穿衣服',
        th: '4 ฤดูกาล & เสื้อผ้า',
        en: 'Four Seasons & Clothing'
      },
      can_do: {
        th: 'บอกชื่อ 4 ฤดูกาล ฤดูที่ชอบที่สุด และใช้ลักษณนาม 件 กับเสื้อผ้าได้อย่างถูกต้อง',
        en: 'Name the four seasons, express favorites, and use measure word 件 for clothes'
      },
      baby_step_goal: 'เป้าหมายวันนี้: บอกฤดูกาลที่ชอบที่สุดและชวนใส่เสื้อผ้ากันหนาวได้!',
      vocabulary: [
        {
          id: 'hsk1_0814',
          hanzi: '春天',
          pinyin: 'chūntiān',
          display_pinyin: 'chūntiān',
          pinyin_tone: 'chun1tian1',
          meaning_th: 'ฤดูใบไม้ผลิ',
          meaning_en: 'spring',
          radical: '日',
          radical_name_th: 'หมวดดวงอาทิตย์ (日字底)',
          stroke_count: 13,
          mnemonic: 'แสงอาทิตย์ (日) อบอุ่นส่องให้ต้นหญ้าผลิใบเขียวขจี = ฤดูใบไม้ผลิ (春天)',
          kid_mnemonic: 'ดอกไม้บานสะพรั่ง ผีเสื้อบินว่อน สดชื่น = 春天',
          body_gesture: 'ทำมือกางออกเป็นดอกไม้บานสดใส'
        },
        {
          id: 'hsk1_0815',
          hanzi: '夏天',
          pinyin: 'xiàtiān',
          display_pinyin: 'xiàtiān',
          pinyin_tone: 'xia4tian1',
          meaning_th: 'ฤดูร้อน',
          meaning_en: 'summer',
          radical: '夂',
          radical_name_th: 'หมวดก้าวเท้าช้า (夂字底)',
          stroke_count: 14,
          mnemonic: 'ผู้คนสวมหมวกก้าวเดินช้าๆ ใต้เปลวแดด = ฤดูร้อน (夏天)',
          kid_mnemonic: 'กินไอติมเย็นๆ ชื่นใจในหน้าร้อน = 夏天',
          body_gesture: 'ทำท่าเลียไอติมและพัดคลายร้อน'
        },
        {
          id: 'hsk1_0816',
          hanzi: '秋天',
          pinyin: 'qiūtiān',
          display_pinyin: 'qiūtiān',
          pinyin_tone: 'qiu1tian1',
          meaning_th: 'ฤดูใบไม้ร่วง',
          meaning_en: 'autumn / fall',
          radical: '禾',
          radical_name_th: 'หมวดรวงข้าว (禾木旁)',
          stroke_count: 13,
          mnemonic: 'รวงข้าวสีทอง (禾) สุกงอม ใบไม้เปลี่ยนสีร่วงหล่น = ฤดูใบไม้ร่วง (秋天)',
          kid_mnemonic: 'ใบไม้สีส้มทองร่วงหล่น ลมพัดเย็นสบาย = 秋天',
          body_gesture: 'สองมือกางออกแล้วค่อยๆ ร่อนลงเหมือนใบไม้ร่วง'
        },
        {
          id: 'hsk1_0817',
          hanzi: '冬天',
          pinyin: 'dōngtiān',
          display_pinyin: 'dōngtiān',
          pinyin_tone: 'dong1tian1',
          meaning_th: 'ฤดูหนาว',
          meaning_en: 'winter',
          radical: '夂',
          radical_name_th: 'หมวดก้าวเท้าช้า (夂字头)',
          stroke_count: 9,
          mnemonic: 'หยดน้ำแข็งสองหยด (冫) ตกค้างในฤดูกาลสุดท้ายของปี = ฤดูหนาว (冬天)',
          kid_mnemonic: 'ใส่เสื้อกันหนาวหนาๆ หิมะตกหนาวเย็น = 冬天',
          body_gesture: 'ทำท่าสั่นหนาวและเอามือถูกันให้อบอุ่น'
        },
        {
          id: 'hsk1_0818',
          hanzi: '穿',
          pinyin: 'chuān',
          display_pinyin: 'chuān',
          pinyin_tone: 'chuan1',
          meaning_th: 'สวม/ใส่ (เสื้อผ้า รองเท้า)',
          meaning_en: 'wear / put on',
          radical: '穴',
          radical_name_th: 'หมวดถ้ำโพรง (穴宝盖)',
          stroke_count: 9,
          mnemonic: 'สอดแขนและศีรษะผ่านช่องโพรงเสื้อผ้า (穴) = สวมใส่ (穿)',
          kid_mnemonic: 'สวมเสื้อยืด สอดแขนสองข้างชึ้บ = 穿',
          body_gesture: 'ทำท่าสวมเสื้อแจ็กเก็ตรูดซิปขึ้น'
        },
        {
          id: 'hsk1_0819',
          hanzi: '衣服',
          pinyin: 'yīfu',
          display_pinyin: 'yīfu',
          pinyin_tone: 'yi1fu',
          meaning_th: 'เสื้อผ้า/ชุด',
          meaning_en: 'clothes / clothing',
          radical: '衣',
          radical_name_th: 'หมวดเสื้อผ้า (衣字部)',
          stroke_count: 14,
          mnemonic: 'อาภรณ์เสื้อผ้าที่ตัดเย็บเพื่อสวมใส่ร่างกาย = เสื้อผ้า (衣服)',
          kid_mnemonic: 'เสื้อผ้าสวยงาม ใส่แล้วดูดีจังเลย = 衣服',
          body_gesture: 'ลูบที่ชายเสื้อตัวเองทั้งสองข้าง'
        },
        {
          id: 'hsk1_0820',
          hanzi: '最',
          pinyin: 'zuì',
          display_pinyin: 'zuì',
          pinyin_tone: 'zui4',
          meaning_th: 'ที่สุด (อันดับ 1)',
          meaning_en: 'most / -est',
          radical: '日',
          radical_name_th: 'หมวดดวงอาทิตย์ (日字头)',
          stroke_count: 12,
          mnemonic: 'ความโดดเด่นสูงสุดเหนือสิ่งอื่นใด = ที่สุด (最)',
          kid_mnemonic: 'ชูนิ้วโป้ง ยอดเยี่ยมอันดับหนึ่งเลย! = 最',
          body_gesture: 'ยกนิ้วโป้งสองข้างขึ้นระดับอกอย่างมั่นใจ'
        }
      ],
      tone_rule: {
        rule_name: 'Tone Sandhi ในลักษณนามเสื้อผ้า: 一件 (yí jiàn)',
        description_th: 'คำว่า 一 เมื่ออยู่หน้าคำลักษณนามเสียง 4 (jiàn) จะผันเป็นเสียง 2 คือ yí jiàn',
        example: '一件衣服 (yí jiàn yīfu)',
        fun_metaphor: 'น้องอีหน้าเสียงสี่ ผันขึ้นเสียงสอง yí jiàn พริ้วไหวเหมือนเสื้อผ้าไหม!',
        reassurance: 'จำวลีฮิต yí jiàn yīfu (เสื้อผ้าหนึ่งตัว) พูดเมื่อไหร่เป๊ะเมื่อนั้น!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้บอกฤดูที่ชอบที่สุดและการสวมใส่เสื้อผ้า',
        explanation_th: 'บอกความชอบอันดับหนึ่งใช้ 我最喜欢 + ฤดูกาล และการใส่เสื้อผ้าใช้ 穿 + จำนวน + 件 + 衣服',
        patterns: [
          {
            formula: '我最喜欢 + [ฤดูกาล] = ฉันชอบ...ที่สุด',
            zh: '我最喜欢秋天。',
            pinyin: 'Wǒ zuì xǐhuan qiūtiān.',
            th: 'ฉันชอบฤดูใบไม้ร่วงที่สุด',
            en: 'I like autumn the most.'
          },
          {
            formula: '多穿 + [จำนวน] + 件 + 衣服 = ใส่เสื้อผ้าเพิ่มอีก...ตัวนะ',
            zh: '今天太冷了，多穿一件衣服吧！',
            pinyin: 'Jīntiān tài lěng le, duō chuān yí jiàn yīfu ba!',
            th: 'วันนี้หนาวเกินไปแล้ว ใส่เสื้อผ้าหนาๆ เพิ่มอีกตัวนะ!',
            en: 'Today is too cold, wear one more piece of clothing!'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: 'สมชาย，一年四季，你最喜欢哪个季节？',
          pinyin: 'Somchai, yì nián sì jì, nǐ zuì xǐhuan nǎ ge jìjié?',
          th: 'สมชาย ใน 4 ฤดูกาลของหนึ่งปี นายชอบฤดูไหนมากที่สุดเหรอ?',
          en: 'Somchai, out of four seasons, which do you like most?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '我最喜欢秋天！北京的秋天天气最好，不冷不热。你呢？',
          pinyin: 'Wǒ zuì xǐhuan qiūtiān! Běijīng de qiūtiān tiānqì zuì hǎo, bù lěng bú rè. Nǐ ne?',
          th: 'ฉันชอบฤดูใบไม้ร่วงที่สุด! ฤดูใบไม้ร่วงที่ปักกิ่งอากาศดีที่สุด ไม่หนาวไม่ร้อน นายล่ะ?',
          en: 'I like autumn best! Beijing\'s autumn weather is best, mild. You?'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่หมิง 🧑',
          zh: '我也喜欢秋天。但是冬天可以看雪！不过冬天太冷了。',
          pinyin: 'Wǒ yě xǐhuan qiūtiān. Dànshì dōngtiān kěyǐ kàn xuě! Búguò dōngtiān tài lěng le.',
          th: 'ฉันก็ชอบฤดูใบไม้ร่วง แต่ฤดูหนาวดูหิมะได้นะ! ทว่าฤดูหนาวหนาวเกินไปหน่อย',
          en: 'I also like autumn. But in winter we can see snow! Though winter is too cold.'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '对，去中国北方冬天要多穿两件厚衣服！',
          pinyin: 'Duì, qù Zhōngguó běifāng dōngtiān yào duō chuān liǎng jiàn hòu yīfu!',
          th: 'ใช่แล้ว ไปเที่ยวภาคเหนือของจีนในฤดูหนาวต้องใส่เสื้อผ้าหนาๆ เพิ่มอีก 2 ตัวนะ!',
          en: 'Right, going to northern China in winter must wear two extra thick coats!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ได้ยินเสียง 'wǒ zuì xǐhuan qiūtiān' แปลว่าอะไร?",
          options: [
            'ฉันชอบฤดูใบไม้ร่วงที่สุด',
            'ฉันชอบฤดูใบไม้ผลิที่สุด',
            'ฉันชอบฤดูร้อนที่สุด',
            'ฉันชอบฤดูหนาวที่สุด'
          ],
          correct_index: 0,
          explanation_th: 'zuì xǐhuan คือ ชอบที่สุด และ qiūtiān คือ ฤดูใบไม้ร่วง',
          encouragement: 'จำชื่อฤดูกาลได้แม่นยำมาก!'
        },
        {
          type: 'radical_focus',
          question_th: "ลักษณนามที่ใช้กับเสื้อผ้าในภาษาจีนคือคำใด?",
          options: [
            '件 (jiàn)',
            '口 (kǒu)',
            '个 (ge)',
            '杯 (bēi)'
          ],
          correct_index: 0,
          explanation_th: 'เสื้อผ้าใช้ลักษณนาม 件 (jiàn) เช่น 一件衣服 (เสื้อผ้า 1 ตัว)',
          encouragement: 'จำลักษณนามเสื้อผ้าได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ฉันชอบฤดูใบไม้ร่วงที่สุด"',
          tokens: [
            '秋天',
            '我最喜欢'
          ],
          correct_sequence: [
            '我最喜欢',
            '秋天'
          ],
          pinyin: 'Wǒ zuì xǐhuan qiūtiān',
          meaning_th: 'ฉันชอบฤดูใบไม้ร่วงที่สุด',
          explanation_th: 'ประธานและคำบอกระดับความชอบ (我最喜欢) + ฤดูกาล (秋天)',
          encouragement: 'เรียงประโยคบอกความชอบได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'flash_recall',
          question_th: 'คำว่า "ฤดูหนาว" ในภาษาจีนตรงกับคำใด?',
          options: [
            '冬天 (dōngtiān)',
            '夏天 (xiàtiān)',
            '春天 (chūntiān)',
            '秋天 (qiūtiān)'
          ],
          correct_index: 0,
          explanation_th: '冬天 (dōngtiān) คือ ฤดูหนาว ส่วน 夏天 (xiàtiān) คือ ฤดูร้อน',
          encouragement: 'แยกแยะ 4 ฤดูกาลได้แม่นยำ 100%!'
        }
      ],
      boss_challenge: {
        scenario_th: 'เพื่อนชาวจีนถามคุณว่า: "一年四季，你最喜欢哪个季节？" คุณชอบฤดูใบไม้ผลิที่สุดเพราะดอกไม้บานสวยงาม ต้องตอบว่าอย่างไร?',
        options: [
          '我最喜欢春天。 (Wǒ zuì xǐhuan chūntiān.)',
          '我最喜欢下雨。 (Wǒ zuì xǐhuan xiàyǔ.)',
          '洗手间在哪儿？ (Xǐshǒujiān zài nǎr?)',
          '我有四口人。 (Wǒ yǒu sì kǒu rén.)'
        ],
        correct_index: 0,
        explanation_th: '我最喜欢春天。 เป็นคำตอบที่บอกฤดูโปรดได้อย่างชัดเจนและไวยากรณ์เป๊ะ 100%!',
        encouragement: '🎉 สนทนาเรื่องฤดูกาลได้อย่างคล่องแคล่วและงดงาม!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u08_l03',
        badge_name: 'ผู้เชี่ยวชาญ 4 ฤดูกาล 🍁🐰',
        message_th: 'เก่งกาจมาก! คุณบอกชื่อ 4 ฤดูกาลและใช้ลักษณนามเสื้อผ้า 件 ได้อย่างถูกต้อง!',
        xp_reward: 45
      }
    },
    {
      lesson_id: 't1_u08_l04',
      lesson_number: 4,
      title: {
        zh: '查天气预报准备去哈尔滨通关',
        th: 'Boss Challenge: ตรวจสภาพอากาศก่อนบินไปฮาร์บิน',
        en: 'Boss Challenge: Check Weather Before Flying to Harbin'
      },
      can_do: {
        th: 'บูรณาการสภาพอากาศ อุณหภูมิตัวเลข การแต่งกาย และการเดินทางเตรียมบินไปเที่ยวเมืองหิมะฮาร์บิน',
        en: 'Integrate weather, temperature numbers, clothing, and transit for a snow trip to Harbin'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พิชิตบอสใหญ่ Unit 8 ตรวจเช็กสภาพอากาศและเตรียมพร้อมลุยหิมะ!',
      vocabulary: [
        {
          id: 'hsk1_0821',
          hanzi: '度',
          pinyin: 'dù',
          display_pinyin: 'dù',
          pinyin_tone: 'du4',
          meaning_th: 'องศา (อุณหภูมิ)',
          meaning_en: 'degree (temperature)',
          radical: '广',
          radical_name_th: 'หมวดเพิงพักกว้าง (广字头)',
          stroke_count: 9,
          mnemonic: 'มาตรวัดระดับอุณหภูมิความร้อนหนาว = องศา (度)',
          kid_mnemonic: 'ปรอทวัดไข้วัดอุณหภูมิ ชี้เลของศา = 度',
          body_gesture: 'ทำนิ้วชี้กับนิ้วโป้งวัดระยะความสูงปรอท'
        },
        {
          id: 'hsk1_0822',
          hanzi: '非常',
          pinyin: 'fēicháng',
          display_pinyin: 'fēicháng',
          pinyin_tone: 'fei1chang2',
          meaning_th: 'เป็นพิเศษ/อย่างยิ่ง (มากกว่า 很)',
          meaning_en: 'extremely / extraordinarily',
          radical: '非',
          radical_name_th: 'หมวดปฏิเสธ (非字部)',
          stroke_count: 19,
          mnemonic: 'ความโดดเด่นเกินกว่าระดับปกติธรรมดา (常) ทั่วไป = เป็นพิเศษ (非常)',
          kid_mnemonic: 'ชูสองแขนกว้างสุดๆ หนาวเป็นพิเศษเลย! = 非常',
          body_gesture: 'กางสองแขนออกกว้างสุดตัวแสดงความมากเป็นพิเศษ'
        }
      ],
      tone_rule: {
        rule_name: 'การอ่านอุณหภูมิติดลบ: 零下 (língxià)',
        description_th: 'อุณหภูมิต่ำกว่าศูนย์องศาในภาษาจีนพูดว่า 零下 (língxià) ตามด้วยตัวเลของศา เช่น 零下十度 (língxià shí dù)',
        example: '零下十度 (língxià shí dù = ติดลบ 10 องศา)',
        fun_metaphor: 'เลขศูนย์ líng แล้วตกลงไปข้างล่าง xià สื่อถึงความหนาวจับใจ!',
        reassurance: 'จำโครงสร้าง 零下 + ตัวเลข + 度 ไว้ เตรียมตัวไปเที่ยวเทศกาลน้ำแข็งฮาร์บินได้เลย!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้ปรึกษาสภาพอากาศและการเดินทาง',
        explanation_th: 'บูรณาการถามสภาพอากาศต่างเมือง: [สถานที่] + 现在天气怎么样？ และการแนะนำการแต่งกาย: 要多穿 + [จำนวน] + 件衣服',
        patterns: [
          {
            formula: '[สถานที่] + 现在天气怎么样？ = ตอนนี้...สภาพอากาศเป็นอย่างไร?',
            zh: '哈尔滨现在天气怎么样？',
            pinyin: 'Hā\'ěrbīn xiànzài tiānqì zěnmeyàng?',
            th: 'ตอนนี้ที่ฮาร์บินสภาพอากาศเป็นอย่างไรบ้าง?',
            en: 'How is the weather in Harbin right now?'
          },
          {
            formula: '你要多穿 + [จำนวน] + 件衣服 = เธอต้องใส่เสื้อผ้าเพิ่มอีก...ตัวนะ',
            zh: '你要多穿两件厚衣服，带上伞！',
            pinyin: 'Nǐ yào duō chuān liǎng jiàn hòu yīfu, dài shàng sǎn!',
            th: 'เธอต้องใส่เสื้อหนาๆ เพิ่มอีก 2 ตัวนะ และพกร่มไปด้วย!',
            en: 'You need to wear two extra thick coats, and bring an umbrella!'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '喂，王明！我明天坐飞机去哈尔滨。哈尔滨现在天气怎么样？',
          pinyin: 'Wèi, Wáng Míng! Wǒ míngtiān zuò fēijī qù Hā\'ěrbīn. Hā\'ěrbīn xiànzài tiānqì zěnmeyàng?',
          th: 'ฮัลโหลหวังหมิง! พรุ่งนี้ฉันจะนั่งเครื่องบินไปฮาร์บิน ตอนนี้ที่ฮาร์บินอากาศเป็นอย่างไรบ้าง?',
          en: 'Hello Wang Ming! I fly to Harbin tomorrow. How is the weather there now?'
        },
        {
          speaker: 'B',
          speaker_name: 'หวังหมิง 🧑',
          zh: '哈尔滨现在下大雪了！零下十度，非常冷！',
          pinyin: 'Hā\'ěrbīn xiànzài xià dà xuě le! Língxià shí dù, fēicháng lěng!',
          th: 'ฮาร์บินตอนนี้หิมะตกหนักมาก! ติดลบ 10 องศา หนาวเป็นพิเศษเลย!',
          en: 'Harbin is having heavy snow now! Minus 10 degrees, extremely cold!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '太冷了！我要穿什么衣服？',
          pinyin: 'Tài lěng le! Wǒ yào chuān shénme yīfu?',
          th: 'หนาวมากเลย! ฉันต้องใส่เสื้อผ้าอะไรไปบ้าง?',
          en: 'So cold! What clothes should I wear?'
        },
        {
          speaker: 'B',
          speaker_name: 'หวังหมิง 🧑',
          zh: '你要多穿两件厚衣服，戴帽子，还要带上伞！',
          pinyin: 'Nǐ yào duō chuān liǎng jiàn hòu yīfu, dài màozi, hái yào dài shàng sǎn!',
          th: 'เธอต้องใส่เสื้อหนาๆ เพิ่มอีก 2 ตัว ใส่หมวก และอย่าลืมพกร่มไปด้วยนะ!',
          en: 'Wear two thick coats, put on a hat, and also bring an umbrella!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '好的，谢谢你的关心！哈尔滨见！',
          pinyin: 'Hǎode, xièxie nǐ de guānxīn! Hā\'ěrbīn jiàn!',
          th: 'โอเค ขอบคุณสำหรับความห่วงใยนะ! เจอกันที่ฮาร์บิน!',
          en: 'Okay, thank you for caring! See you in Harbin!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ได้ยินเสียง 'língxià shí dù' หมายถึงอุณหภูมิเท่าใด?",
          options: [
            'ติดลบ 10 องศา',
            '10 องศา',
            'ติดลบ 20 องศา',
            '0 องศา'
          ],
          correct_index: 0,
          explanation_th: 'língxià คือ ต่ำกว่าศูนย์ (ติดลบ) และ shí dù คือ 10 องศา รวมกันคือ ติดลบ 10 องศา',
          encouragement: 'เข้าใจการบอกอุณหภูมิติดลบได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '非常' (เป็นพิเศษ/อย่างยิ่ง) ใช้เน้นระดับอารมณ์มากกว่าคำใด?",
          options: [
            '很 (hěn) - มาก',
            '不 (bù) - ไม่',
            '也 (yě) - ก็ด้วย',
            '有 (yǒu) - มี'
          ],
          correct_index: 0,
          explanation_th: '非常 (fēicháng) แสดงระดับความเข้มข้นมากกว่าคำว่า 很 (มาก)',
          encouragement: 'เข้าใจระดับคำขยายคุณศัพท์ในภาษาจีนได้อย่างลึกซึ้ง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "คุณต้องใส่เสื้อผ้าหนาๆ เพิ่มอีกสองตัว"',
          tokens: [
            '厚衣服',
            '两件',
            '你要多穿'
          ],
          correct_sequence: [
            '你要多穿',
            '两件',
            '厚衣服'
          ],
          pinyin: 'Nǐ yào duō chuān liǎng jiàn hòu yīfu',
          meaning_th: 'คุณต้องใส่เสื้อผ้าหนาๆ เพิ่มอีกสองตัว',
          explanation_th: 'ประธานและคำแนะนำ (你要多穿) + ลักษณนาม (两件) + เสื้อหนา (厚衣服)',
          encouragement: 'บูรณาการลักษณนาม 两件 ได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'flash_recall',
          question_th: 'เมื่อเพื่อนบอกสภาพอากาศที่หนาวเย็นและให้คำแนะนำที่ดี เราควรขอบคุณอย่างไร?',
          options: [
            '谢谢你的关心！ (Xièxie nǐ de guānxīn!) - ขอบคุณสำหรับความห่วงใย',
            '不客气！ (Bú kèqi!)',
            '多少钱？ (Duōshao qián?)',
            '洗手间在那儿。 (Xǐshǒujiān zài nàr.)'
          ],
          correct_index: 0,
          explanation_th: '谢谢你的关心！ แปลว่า ขอบคุณสำหรับความห่วงใย เป็นสำนวนตอบรับที่อบอุ่นและสุภาพยิ่ง',
          encouragement: 'สำนวนภาษาจีนงดงามและกินใจมาก!'
        }
      ],
      boss_challenge: {
        scenario_th: 'เพื่อนคนจีนโทรมาเตือนคุณก่อนบินไปฮาร์บินว่า "哈尔滨现在零下十度，下大雪了！" คุณต้องการตอบรับคำเตือนและขอบคุณความห่วงใย ต้องพูดว่าอย่างไร?',
        options: [
          '太冷了！我多穿两件厚衣服，谢谢你的关心！ (Tài lěng le! Wǒ duō chuān liǎng jiàn hòu yīfu, xièxie nǐ de guānxīn!)',
          '下雨了，洗手间在哪儿？ (Xiàyǔ le, xǐshǒujiān zài nǎr?)',
          '我要一碗面条，不要辣。 (Wǒ yào yì wǎn miàntiáo, bú yào là.)',
          '这是我妈妈，再见！ (Zhè shì wǒ māma, zàijiàn!)'
        ],
        correct_index: 0,
        explanation_th: '太冷了！我多穿两件厚衣服，谢谢你的关心！ เป็นการตอบรับที่สมบูรณ์แบบ บูรณาการทั้งคำบอกสภาพอากาศ การเตรียมเสื้อผ้า และมารยาท 100%!',
        encouragement: '🎉 ยอดเยี่ยมที่สุด! คุณพิชิต Grand Boss Challenge ของ Unit 8 ได้สำเร็จอย่างงดงาม!'
      },
      cheer_trophy: {
        badge_id: 'badge_t1_u08_master',
        badge_name: 'นักสำรวจสภาพอากาศ 4 ฤดู 🌤️🐰',
        message_th: 'ขอแสดงความยินดีด้วย! คุณผ่านบทเรียนสภาพอากาศและฤดูกาลระดับ Tier 1 ครบทั้ง 4 บทย่อยแล้ว!',
        xp_reward: 200
      }
    }
  ]
};
