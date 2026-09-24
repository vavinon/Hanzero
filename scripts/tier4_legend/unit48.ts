import { UnitLessonData } from '../../src/types/lesson';

export const unit48Data: UnitLessonData = {
  unit_id: 'tier4_u48',
  tier: 4,
  unit_number: 48,
  title: {
    zh: '中国古代哲学思想核心',
    th: 'แก่นปรัชญาจีนโบราณ: ขงจื๊อ เต๋า และนิติธรรม',
    en: 'Core Chinese Philosophical Traditions: Confucianism, Daoism & Legalism'
  },
  description: 'ศึกษาแก่นปรัชญายุคก่อนฉิน (儒家: 仁爱与修身, 道家: 无为与自然, 法家: 制度与法治) และการหลอมรวมภูมิปัญญาเพื่อการบริหารและการพัฒนาตนเองในยุคปัจจุบัน',
  lessons: [
    {
      lesson_id: 't4_u48_l01',
      lesson_number: 1,
      title: {
        zh: '儒家之道：仁爱与修身齐家',
        th: 'วิถีแห่งขงจื๊อ: เมตตาธรรม (仁爱) และการฝึกฝนตนเอง (修身)',
        en: 'Confucianism: Benevolence & Moral Cultivation'
      },
      can_do: {
        th: 'อธิบายแนวคิด 仁爱 (เมตตาธรรม) และ 中庸 (ทางสายกลาง) พร้อมใช้สำนวน 见贤思齐 ในการพัฒนาตนเองได้',
        en: 'Explain Confucian core values (Ren-ai and Zhongyong) and apply idiom "Aspire to Equal the Virtuous"'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำหลักการ 修身 และ 见贤思齐 มาปรับใช้ในการเรียนรู้และขัดเกลาบุคลิกภาพ!',
      vocabulary: [
        {
          id: 'hsk4_4801',
          hanzi: '儒家',
          pinyin: 'rújiā',
          display_pinyin: 'rújiā',
          pinyin_tone: 'ru2jia1',
          meaning_th: 'สำนักปรัชญาขงจื๊อ / ลัทธิหรูที่เน้นคุณธรรมและจริยธรรม',
          meaning_en: 'Confucianism / Confucian school of thought',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 26,
          mnemonic: 'นักปราชญ์ผู้เปี่ยมด้วยน้ำใจต่อมนุษย์ (儒) ร่วมกันก่อตั้งสำนักทางความคิด (家) = สำนักขงจื๊อ',
          kid_mnemonic: 'บัณฑิตสวมหมวกทรงสูงก้มคำนับทักทายอย่างมีมารยาท = 儒家',
          body_gesture: 'ประสานสองมือไว้ข้างหน้าระดับอกคำนับอย่างสุภาพ'
        },
        {
          id: 'hsk4_4802',
          hanzi: '仁爱',
          pinyin: 'rén\'ài',
          display_pinyin: 'rén\'ài',
          pinyin_tone: 'ren2\'ai4',
          meaning_th: 'ความเมตตากรุณา / จิตใจที่เปี่ยมด้วยความรักต่อเพื่อนมนุษย์',
          meaning_en: 'benevolence / humaneness / universal love',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 14,
          mnemonic: 'คนสองคนอยู่ร่วมกันด้วยความรักใคร่ (仁) มีหัวใจอันอบอุ่น (爱) = เมตตาธรรม',
          kid_mnemonic: 'วาดรูปหัวใจดวงโตมอบให้เพื่อนทุกคนในห้องเรียน = 仁爱',
          body_gesture: 'สองมือกุมหัวใจแนบอกแล้วยิ้มอย่างอ่อนโยน'
        },
        {
          id: 'hsk4_4803',
          hanzi: '修身',
          pinyin: 'xiūshēn',
          display_pinyin: 'xiūshēn',
          pinyin_tone: 'xiu1shēn',
          meaning_th: 'การฝึกฝนขัดเกลาตนเอง / การบำเพ็ญคุณธรรมประจำใจ',
          meaning_en: 'cultivate one\'s moral character / self-improvement',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 16,
          mnemonic: 'ขัดแต่งซ่อมแซม (修) ร่างกายและจิตใจของตน (身) = การขัดเกลาตนเอง',
          kid_mnemonic: 'ยืนส่องกระจกจัดระเบียบเสื้อผ้าและรอยยิ้มให้สง่างาม = 修身',
          body_gesture: 'ยกสองมือจัดคอเสื้อและจัดท่ายืนให้สง่าผ่าเผย'
        },
        {
          id: 'hsk4_4804',
          hanzi: '中庸',
          pinyin: 'zhōngyōng',
          display_pinyin: 'zhōngyōng',
          pinyin_tone: 'zhong1yong1',
          meaning_th: 'ทางสายกลาง / มัชฌิมาปฏิปทาตามคติขงจื๊อ (ไม่ตึงและไม่หย่อนเกินไป)',
          meaning_en: 'doctrine of the mean / golden mean / moderation',
          radical: '广',
          radical_name_th: 'หมวดเพิงพัก (广字旁)',
          stroke_count: 15,
          mnemonic: 'ยืนหยัดตรงกลางอย่างมั่นคง (中) นำมาใช้ในชีวิตประจำวันอย่างกลมกลืน (庸) = ทางสายกลาง',
          kid_mnemonic: 'กระต่ายเดินทรงตัวบนสะพานไม้อย่างสมดุลไม่เอียงซ้ายขวา = 中庸',
          body_gesture: 'กางสองแขนรักษาสมดุลเหมือนเดินบนเส้นลวดอย่างมั่นคง'
        },
        {
          id: 'hsk4_4805',
          hanzi: '见贤思齐',
          pinyin: 'jiànxiánsīqí',
          display_pinyin: 'jiànxiánsīqí',
          pinyin_tone: 'jian4xian2si1qi2',
          meaning_th: 'เมื่อเห็นผู้มีปัญญาและคุณธรรม จงคิดฝึกฝนตนให้เสมอเหมือน',
          meaning_en: 'when seeing a worthy person, aspire to emulate them',
          radical: '见',
          radical_name_th: 'หมวดมองเห็น (见字旁)',
          stroke_count: 36,
          mnemonic: 'มองเห็น (见) ผู้ทรงภูมิธรรม (贤) แล้วคิดไตร่ตรอง (思) ที่จะก้าวไปเคียงคู่เสมอเหมือน (齐) = พัฒนาตนตามคนดี',
          kid_mnemonic: 'เห็นคุณครูใจดีแล้วสัญญากับตัวเองว่าโตขึ้นจะเป็นคนเก่งและใจดีเหมือนกัน = 见贤思齐',
          body_gesture: 'ชี้นิ้วไปยังภาพปราชญ์แล้วแตะที่อกแสดงความตั้งใจ'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงวรรณยุกต์เรียง 4 พยางค์ 见贤思齐 (jiànxiánsīqí)',
        description_th: 'jiàn (เสียง 4) xián (เสียง 2) sī (เสียง 1) qí (เสียง 2) จังหวะเสียงต่ำ-สูงสลับกันอย่างไพเราะ',
        example: '见贤思齐焉，见不贤而内自省也。',
        fun_metaphor: 'เหมือนระนาดเอกตีไล่ระดับเสียงบันไดโน้ตขึ้นสู่ความเจริญ',
        reassurance: 'คำสอนอันโด่งดังจากคัมภีร์หลุนอวี่ (论语) ของขงจื๊อ'
      },
      grammar_bite: {
        title: 'โครงสร้างการบำเพ็ญคุณธรรม: 坚持……之道，做到见贤思齐',
        formula: '在立身处世中，我们应当秉持[หลักการขงจื๊อ]，做到见贤思齐，不断[พัฒนาตนเอง]',
        explanation_th: 'ใช้ในการกล่าวสุนทรพจน์ด้านการศึกษา จริยธรรมองค์กร และการสร้างแรงบันดาลใจ',
        patterns: [
          {
            formula: '秉持仁爱之心，恪守中庸之道。',
            zh: '为人处世应当秉持仁爱之心，恪守中庸之道，不偏不倚。',
            pinyin: 'Wéirén chǔshì yīngdāng bǐngchí rén\'ài zhī xīn, kèshǒu zhōngyōng zhī dào, bùpiān bùyǐ.',
            th: 'การดำเนินชีวิตพึงยึดมั่นในจิตใจแห่งเมตตาธรรม ปฏิบัติตามวิถีทางสายกลางอย่างเที่ยงตรงไม่เอียงเอน',
            en: 'In conducting oneself, one should uphold a benevolent heart and adhere to the golden mean without bias.'
          },
          {
            formula: '注重自身修身，做到见贤思齐。',
            zh: '优秀的管理者注重个人修身，时刻做到见贤思齐，虚心向他人学习。',
            pinyin: 'Yōuxiù de guǎnlǐzhě zhùzhòng gèrén xiūshēn, shíkè zuò dào jiànxiánsīqí, xūxīn xiàng tārén xuéxí.',
            th: 'ผู้บริหารที่ยอดเยี่ยมย่อมให้ความสำคัญกับการฝึกฝนตนเอง ตระหนักถึงการเห็นคนดีแล้วคิดเสมอเหมือน และเรียนรู้จากผู้อื่นอย่างถ่อมตน',
            en: 'Outstanding managers emphasize personal self-cultivation, constantly emulating the virtuous and learning humbly from others.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '孟导师 (Mentor Meng) 📜',
          zh: '张教授好！今天非常高兴有机会和您在这里讨论，现代年轻人在日常学习、工作与生活中，如何深入理解并实践儒家思想？',
          pinyin: 'Zhāng jiàoshòu hǎo! Jīntiān fēicháng gāoxìng yǒu jīhuì hé nín zài zhèlǐ tǎolùn, xiàndài niánqīngrén zài rìcháng xuéxí, gōngzuò yǔ shēnghuó zhōng, rúhé shēnrù lǐjiě bìng shíjiàn Rújiā sīxiǎng?',
          th: 'สวัสดีครับศาสตราจารย์จาง! วันนี้ยินดีเป็นอย่างยิ่งที่มีโอกาสได้มาสนทนากับท่านที่นี่ คนรุ่นใหม่ในการเรียน การทำงาน และการใช้ชีวิตประจำวัน จะเข้าใจอย่างลึกซึ้งและนำปรัชญาขงจื๊อมาปฏิบัติจริงได้อย่างไรครับ?',
          en: 'Hello Prof. Zhang! I am very glad to have the opportunity to discuss here with you today: how can modern youth deeply understand and practice Confucian thoughts in their daily study, work, and life?',
          audio_trigger: 't4_u48_l01_d01'
        },
        {
          speaker: '张教授 (Prof. Zhang) 👨‍🏫',
          zh: '其实核心就在于修身与仁爱，我们在日常学习、工作与生活中，多关爱家人，加强沟通与合作，善待身边同事。',
          pinyin: 'Qíshí héxīn jiù zàiyú xiūshēn yǔ rén\'ài, wǒmen zài rìcháng xuéxí, gōngzuò yǔ shēnghuó zhōng, duō guān\'ài jiārén, jiāqiáng gōutōng yǔ hézuò, shàndài shēnbiān tóngshì.',
          th: 'ที่จริงแล้วแก่นแท้อยู่ที่การขัดเกลาตนเองและเมตตาธรรม พวกเราในการเรียน การทำงาน และการใช้ชีวิตประจำวัน ใส่ใจคนในครอบครัว เพิ่มพูนการสื่อสารและความร่วมมือ และปฏิบัติต่อเพื่อนร่วมงานด้วยความอบอุ่นครับ',
          en: 'Actually, the core lies in self-cultivation and benevolence: in our daily study, work, and life, we care for family, enhance communication and cooperation, and treat colleagues with kindness.',
          audio_trigger: 't4_u48_l01_d02'
        },
        {
          speaker: '孟导师 (Mentor Meng) 📜',
          zh: '对，我们在现代企业和市场发展中，强调“中庸之道”，面对复杂问题也要避免极端情绪。',
          pinyin: 'Duì, wǒmen zài xiàndài qǐyè hé shìchǎng fāzhǎn zhōng, qiángdiào "zhōngyōng zhī dào", miànduì fùzá wèntí yě yào bìmiǎn jíduān qíngxù.',
          th: 'ถูกต้องครับ พวกเราในการพัฒนาองค์กรและตลาดสมัยใหม่ ย่อมเน้นย้ำเรื่อง "วิถีทางสายกลาง" เผชิญกับปัญหาซับซ้อนก็ต้องหลีกเลี่ยงอารมณ์ที่สุดโต่งเช่นกัน',
          en: 'Right, in modern enterprise and market development, we emphasize the "golden mean"; facing complex problems, we must also avoid extreme emotional swings.',
          audio_trigger: 't4_u48_l01_d03'
        },
        {
          speaker: '张教授 (Prof. Zhang) 👨‍🏫',
          zh: '在团队中保持“见贤思齐”的心态，大家互相学习、共同解决问题，企业才能健康创新发展。',
          pinyin: 'Zài tuánduì zhōng bǎochí "jiànxiánsīqí" de xīntài, dàjiā hùxiāng xuéxí, gòngtóng jiějué wèntí, qǐyè cái néng jiànkāng chuàngxīn fāzhǎn.',
          th: 'การรักษาทัศนคติ "เห็นคนดีแล้วคิดเทียบเคียง" ในทีมงาน ทุกคนเรียนรู้ซึ่งกันและกันและร่วมมือกันแก้ปัญหา องค์กรจึงจะสามารถพัฒนานวัตกรรมอย่างมั่นคงได้ครับ',
          en: 'Maintaining a mindset of emulating the virtuous in a team allows mutual learning and joint problem-solving, so the enterprise can innovate and grow healthily.',
          audio_trigger: 't4_u48_l01_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'สำนวน "见贤思齐" (jiànxiánsīqí) สอนให้เรามีทัศนคติอย่างไร?',
          options: [
            'เมื่อเห็นผู้มีความรู้ความสามารถและคุณธรรม ควรตั้งใจเรียนรู้และพัฒนาตนเองให้ทัดเทียม',
            'เมื่อเห็นคนเก่งควรเกิดความอิจฉาริษยา',
            'ควรหลีกเลี่ยงคนที่มีความรู้สูงกว่าตน',
            'ควรโอ้อวดความสามารถของตนต่อหน้าผู้อื่น'
          ],
          correct_index: 0,
          explanation_th: '"见贤思齐" มาจากคำสอนขงจื๊อ หมายถึง เมื่อเห็นคนดีมีปัญญา จงพยายามปรับปรุงตนเองให้เก่งและดีเสมอกัน',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจคติธรรมขงจื๊อได้อย่างลึกซึ้ง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "เมื่อเห็นผู้มีปัญญา จงคิดพัฒนาตนให้เสมอเหมือน"',
          tokens: ['思齐', '见贤'],
          correct_sequence: ['见贤', '思齐'],
          pinyin: 'Jiànxián sīqí.',
          meaning_th: 'เมื่อเห็นผู้มีปัญญา จงคิดพัฒนาตนให้เสมอเหมือน',
          explanation_th: 'เห็นผู้มีคุณธรรม (见贤) + คิดเสมอเหมือน (思齐)',
          encouragement: 'จัดเรียงคำสอนคลาสสิกได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "仁" (rén - เมตตา) ประกอบด้วยหมวดนำคน (亻) และเลขสอง (二) สื่อถึงอะไร?',
          options: [
            'การปฏิบัติตนและจิตใจอันดีงามเมื่อมนุษย์สองคนอยู่ร่วมกันในสังคม',
            'คนสองคนเดินแข่งกัน',
            'คนสองคนทะเลาะกัน',
            'คนที่มีสองจิตสองใจ'
          ],
          correct_index: 0,
          explanation_th: '"仁" คือ คนสองคน (亻 + 二) สื่อถึงมนุษยธรรมและไมตรีจิตระหว่างมนุษย์ในการอยู่ร่วมกัน',
          encouragement: 'จำรากศัพท์ปรัชญาขงจื๊อได้อย่างถ่องแท้!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "中庸" (Zhongyong) ในปรัชญาขงจื๊อ หมายถึงอะไร?',
          options: [
            'ความพอดี ความสมดุล ไม่เอนเอียงไปทางสุดโต่ง (ทางสายกลาง)',
            'ความเฉื่อยชาและไม่ยอมลงมือทำอะไรเลย',
            'การยอมให้ผู้อื่นเอาเปรียบตลอดเวลา',
            'การเอาชนะผู้อื่นด้วยกำลังบังคับ'
          ],
          correct_index: 0,
          explanation_th: '"中庸之道" คือ วิถีแห่งความสมดุล ทางสายกลาง การกระทำที่พอเหมาะพอดีกับสถานการณ์',
          encouragement: 'เข้าใจหลักการดำเนินชีวิตระดับสูง!'
        }
      ],
      boss_challenge: {
        question: 'ในสุนทรพจน์รับตำแหน่งคณบดี ประโยคใดนำค่านิยมขงจื๊อมาสื่อสารได้อย่างสง่างามและเหมาะสมที่สุด?',
        options: [
          '我们将坚持以仁爱为本，激励全体师生修身立德，做到见贤思齐。',
          '我们将出其不意对师生敬而远之，放弃所有修身。',
          '所谓智者，必须半途而废，不再追求任何仁爱。',
          '我们顺其自然，完全不需要任何中庸与修身。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกบูรณาการ "以仁爱为本", "修身立德" และ "见贤思齐" ได้อย่างกลมกลืนและถูกต้องตามหลักวิชาการ'
      },
      cheer_trophy: {
        badge_name: 'บัณฑิตผู้เปี่ยมเมตตาธรรม (Confucian Sage)',
        message_th: 'ยอดเยี่ยม! คุณเข้าใจแก่นปรัชญา 仁爱, 修身 และ 中庸 ของขงจื๊ออย่างลึกซึ้งและพร้อมประยุกต์ใช้ในชีวิต!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u48_l02',
      lesson_number: 2,
      title: {
        zh: '道家之哲：无为而治与道法自然',
        th: 'ปรัชญาแห่งเต๋า: ปกครองโดยไร้การแทรกแซง (无为而治) และความดีดั่งสายน้ำ (上善若水)',
        en: 'Daoism: Non-Action Governance & Following Nature'
      },
      can_do: {
        th: 'อธิบายปรัชญาเต๋า (เล่าจื๊อ-จวงจื๊อ) เข้าใจมโนทัศน์ 无为而治 และใช้สำนวน 上善若水, 物极必反 ได้อย่างถูกต้อง',
        en: 'Explain Daoist philosophy (Laozi-Zhuangzi), Wuwei governance, and idioms "Supreme Good is Like Water" & "Things Turned Opposite"'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ใช้สำนวน 上善若水 และ 物极必反 ในการวิเคราะห์การเปลี่ยนแปลงของโลก!',
      vocabulary: [
        {
          id: 'hsk4_4806',
          hanzi: '道家',
          pinyin: 'dàojiā',
          display_pinyin: 'dàojiā',
          pinyin_tone: 'dao4jia1',
          meaning_th: 'สำนักปรัชญาเต๋า / ปรัชญาที่เน้นการคล้อยตามธรรมชาติและความสงบเรียบง่าย',
          meaning_en: 'Daoism / Taoist school of thought',
          radical: '辶',
          radical_name_th: 'หมวดการเดิน (走之旁)',
          stroke_count: 22,
          mnemonic: 'ก้าวย่างบนมรรคาแห่งปัญญา (道) ร่วมกับครอบครัวสำนักคิด (家) = สำนักเต๋า',
          kid_mnemonic: 'เล่าจื๊อขี่ควายเขียวเดินทางมุ่งหน้าสู่ภูเขาธรรมชาติ = 道家',
          body_gesture: 'ก้าวเท้าหนึ่งก้าวอย่างสงบมือไขว้หลังเหมือนนักพรตเต๋า'
        },
        {
          id: 'hsk4_4807',
          hanzi: '无为而治',
          pinyin: 'wúwéi\'érzhì',
          display_pinyin: 'wúwéi\'érzhì',
          pinyin_tone: 'wu2wei2\'er2zhi4',
          meaning_th: 'การปกครองโดยไร้การแทรกแซงตามอำเภอใจ / บริหารจัดการโดยคล้อยตามกฎธรรมชาติ',
          meaning_en: 'governing by non-interference / rule by doing nothing contrary to nature',
          radical: '灬',
          radical_name_th: 'หมวดสี่จุดไฟ (四点底)',
          stroke_count: 28,
          mnemonic: 'ไม่เข้าไปแทรกแซงฝืนธรรมชาติ (无为) แต่ทำให้บ้านเมืองสงบเรียบร้อย (而治) = ปกครองโดยคล้อยตามธรรมชาติ',
          kid_mnemonic: 'ปล่อยให้ต้นไม้เติบโตตามแสงแดดและสายฝนโดยไม่ไปดึงลำต้น = 无为而治',
          body_gesture: 'หงายมือสองข้างออกช้าๆ แสดงความปล่อยวางอย่างสงบ'
        },
        {
          id: 'hsk4_4808',
          hanzi: '上善若水',
          pinyin: 'shàngshànruòshuǐ',
          display_pinyin: 'shàngshànruòshuǐ',
          pinyin_tone: 'shang4shan4ruo4shui3',
          meaning_th: 'คุณธรรมสูงสุดเปรียบดั่งสายน้ำ (หล่อเลี้ยงสรรพสิ่งโดยไม่แก่งแย่ง ถ่อมตนอยู่จุดต่ำสุด)',
          meaning_en: 'highest virtue is like water (nourishes all things without striving)',
          radical: '一',
          radical_name_th: 'หมวดหนึ่ง (一部)',
          stroke_count: 28,
          mnemonic: 'ความดีงามอันสูงสุด (上善) ย่อมละม้ายคล้ายสายน้ำ (若水) = คุณธรรมดั่งสายน้ำ',
          kid_mnemonic: 'น้ำในลำธารรินรดดอกไม้ทุกดอกให้สดชื่นโดยไม่บ่นเหนื่อย = 上善若水',
          body_gesture: 'วาดมือสองข้างเป็นคลื่นน้ำไหลลงสู่ที่ต่ำอย่างนุ่มนวล'
        },
        {
          id: 'hsk4_4809',
          hanzi: '辩证',
          pinyin: 'biànzhèng',
          display_pinyin: 'biànzhèng',
          pinyin_tone: 'bian4zheng4',
          meaning_th: 'วิภาษวิธี / การมองแบบเชื่อมโยง สองด้าน และหมุนเวียนสมดุล (Dialectical)',
          meaning_en: 'dialectical / dialectics / analyzing contradictory unity',
          radical: '辛',
          radical_name_th: 'หมวดรสเผ็ด (辛字旁)',
          stroke_count: 22,
          mnemonic: 'จำแนกแยกแยะด้วยคำพูด (辩) เพื่อพิสูจน์ยืนยันความจริง (证) = วิภาษวิธีมองรอบด้าน',
          kid_mnemonic: 'หมุนเหรียญดูทั้งด้านหัวและด้านก้อยเพื่อเห็นภาพรวม = 辩证',
          body_gesture: 'พลิกมือหงายและคว่ำช้าๆ แสดงการมองสองด้านของเหรียญ'
        },
        {
          id: 'hsk4_4810',
          hanzi: '物极必反',
          pinyin: 'wùjíbìfǎn',
          display_pinyin: 'wùjíbìfǎn',
          pinyin_tone: 'wu4ji2bi4fan3',
          meaning_th: 'สรรพสิ่งเมื่อก้าวถึงขีดสุด ย่อมหมุนวนกลับสู่ทิศทางตรงกันข้าม',
          meaning_en: 'things turn into their opposites when reaching extremes',
          radical: '牜',
          radical_name_th: 'หมวดวัว (牛字旁)',
          stroke_count: 24,
          mnemonic: 'สรรพสิ่ง (物) เมื่อก้าวถึงจุดยอดสุดขั้ว (极) ย่อมต้อง (必) พลิกผันย้อนกลับ (反) = สุดขั้วย่อมคืนสู่สมดุล',
          kid_mnemonic: 'โยนลูกบอลขึ้นฟ้าจนสุดแรงแล้วลูกบอลก็ตกลงมาที่เดิม = 物极必反',
          body_gesture: 'ชูมือขึ้นสูงสุดแล้ววาดโค้งหมุนวนกลับลงมา'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงวรรณยุกต์ในสำนวนปรัชญา 上善若水 (shàngshànruòshuǐ)',
        description_th: 'shàng (เสียง 4) shàn (เสียง 4) ruò (เสียง 4) shuǐ (เสียง 3) ออกเสียง 4 หนักแน่นสามครั้งแล้วผ่อนลงเสียง 3 นุ่มนวลท้ายคำ',
        example: '上善若水，水善利万物而不争。',
        fun_metaphor: 'เหมือนน้ำตกไหลซัดผ่านโขดหินสามชั้นแล้วลงสู่แอ่งน้ำสงบนิ่ง',
        reassurance: 'สำนวนปรัชญาเต๋าที่นิยมจารึกบนพู่กันจีนและห้องรับรองระดับสูง'
      },
      grammar_bite: {
        title: 'โครงสร้างวิภาษวิธีเต๋า: 辩证看待……，懂得物极必反',
        formula: '面对[ความสำเร็จ/วิกฤต]，我们应当以辩证的眼光看待，懂得物极必反的道理',
        explanation_th: 'ใช้ในการเตือนสติในยามรุ่งโรจน์ไม่ให้ลำพองใจ และให้กำลังใจในยามตกต่ำว่าโอกาสใหม่กำลังจะมาถึง',
        patterns: [
          {
            formula: '秉持上善若水，滋养团队而不争。',
            zh: '优秀的领导者善于包容，秉持上善若水的胸怀，滋养团队而不争名夺利。',
            pinyin: 'Yōuxiù de lǐngdǎozhě shànyú bāoróng, bǐngchí shàngshànruòshuǐ de xiōnghuái, zīyǎng tuánduì ér bù zhēngmíng duólì.',
            th: 'ผู้นำที่ยอดเยี่ยมย่อมรู้จักโอบอ้อมอารี ยึดมั่นในดวงใจดั่งคุณธรรมสายน้ำ คอยหล่อเลี้ยงทีมงานโดยไม่แก่งแย่งชิงดี',
            en: 'Outstanding leaders excel in tolerance, holding a mindset of supreme virtue like water, nurturing the team without seeking fame or wealth.'
          },
          {
            formula: '辩证分析问题，明白物极必反。',
            zh: '在经济周期的波动中，我们要辩证分析趋势，明白物极必反的客观规律。',
            pinyin: 'Zài jīngjì zhōuqī de bōdòng zhōng, wǒmen yào biànzhèng fēnxī qūshì, míngbai wùjíbìfǎn de kèguān guīlǜ.',
            th: 'ท่ามกลางความผันผวนของวัฏจักรเศรษฐกิจ พวกเราต้องวิเคราะห์แนวโน้มอย่างมีวิภาษวิธี เข้าใจในกฎธรรมชาติที่สรรพสิ่งเมื่อถึงขีดสุดย่อมหมุนวนกลับ',
            en: 'Amid fluctuations of economic cycles, we must analyze trends dialectically and understand the objective law that things reverse at extremes.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '老学者 (Elder Scholar) 🪶',
          zh: '张教授好！当下很多公司在市场竞争中遇到困难，我们如何通过学习道家智慧来解决实际问题？',
          pinyin: 'Zhāng jiàoshòu hǎo! Dāngxià hěnduō gōngsī zài shìchǎng jìngzhēng zhōng yù dào kùnnán, wǒmen rúhé tōngguò xuéxí Dàojiā zhìhuì lái jiějué shíjì wèntí?',
          th: 'สวัสดีครับศาสตราจารย์จาง! ปัจจุบันหลายบริษัทพบเจอความยากลำบากในการแข่งขันทางการตลาด พวกเราจะเรียนรู้ภูมิปัญญาเต๋าเพื่อมาแก้ปัญหาในชีวิตจริงได้อย่างไรครับ?',
          en: 'Hello Prof. Zhang! Looking at many companies encountering difficulties in market competition today, how can we solve practical problems by learning Daoist wisdom?',
          audio_trigger: 't4_u48_l02_d01'
        },
        {
          speaker: '张教授 (Prof. Zhang) 👨‍🏫',
          zh: '老子讲“上善若水”，真正的强者善于利万物而不争，在科技创新与绿色生态中开辟新道路。',
          pinyin: 'Lǎozǐ jiǎng "shàngshànruòshuǐ", zhēnzhèng de qiángzhě shànyú lì wànwù ér bù zhēng, zài kējì chuàngxīn yǔ lǜsè shēngtài zhōng kāipì xīn dàolù.',
          th: 'เล่าจื๊อกล่าวว่า "คุณธรรมสูงสุดดุจสายน้ำ" ผู้แข็งแกร่งที่แท้จริงย่อมเอื้อประโยชน์แก่สรรพสิ่งโดยไม่แย่งชิง แต่บุกเบิกเส้นทางใหม่ในนวัตกรรมเทคโนโลยีและระบบนิเวศสีเขียวครับ',
          en: 'Laozi said "supreme virtue is like water"; truly strong players benefit all things without striving, pioneering new paths in technology and green ecosystems.',
          audio_trigger: 't4_u48_l02_d02'
        },
        {
          speaker: '老学者 (Elder Scholar) 🪶',
          zh: '管理上讲“无为而治”，是不是在企业经营中什么都不做呢？',
          pinyin: 'Guǎnlǐ shang jiǎng "wúwéi\'érzhì", shì bù shì zài qǐyè jīngyíng zhōng shénme dōu bù zuò ne?',
          th: 'ในทางการบริหารที่กล่าวว่า "ปกครองโดยไร้การกระทำ" หมายถึงการไม่ทำอะไรเลยในการดำเนินธุรกิจหรือเปล่าครับ?',
          en: 'When management talks about "governing by non-action", does it mean doing nothing at all in business operations?',
          audio_trigger: 't4_u48_l02_d03'
        },
        {
          speaker: '张教授 (Prof. Zhang) 👨‍🏫',
          zh: '非也！“无为”是指顺应经济与市场客观规律，尊重自然环境，在长期投资中把握“物极必反”的平衡。',
          pinyin: 'Fēi yě! "Wúwéi" shì zhǐ shùnyìng jīngjì yǔ shìchǎng kèguān guīlǜ, zūnzhòng zìrán huánjìng, zài chángqī tóuzī zhōng bǎwò "wùjíbìfǎn" de pínghéng.',
          th: 'หาใช่เช่นนั้นไม่! "ไร้การกระทำ" หมายถึงการคล้อยตามกฎเกณฑ์ภาวะวิสัยของเศรษฐกิจและตลาด เคารพสิ่งแวดล้อมธรรมชาติ และรักษาดุลยภาพของ "สรรพสิ่งสุดขั้วย่อมหวนกลับ" ในการลงทุนระยะยาวครับ',
          en: 'Not at all! "Wuwei" means adapting to objective laws of economy and market, respecting the natural environment, and grasping balance in long-term investments knowing things reverse at extremes.',
          audio_trigger: 't4_u48_l02_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'สำนวน "上善若水" (shàngshànruòshuǐ) เปรียบเทียบคุณธรรมสูงสุดกับคุณลักษณะใดของน้ำ?',
          options: [
            'การหล่อเลี้ยงและเอื้อประโยชน์แก่สรรพสิ่งโดยไม่เรียกร้องแก่งแย่ง พร้อมถ่อมตนอยู่จุดต่ำสุด',
            'ความเย็นจัดจนกลายเป็นน้ำแข็ง',
            'ความรุนแรงของคลื่นยักษ์สึนามิ',
            'ความสามารถในการละลายเกลือและน้ำตาล'
          ],
          correct_index: 0,
          explanation_th: 'เล่าจื๊อเปรียบน้ำว่า "水善利万物而不争，处众人之所恶" คือน้ำหล่อเลี้ยงชีวิตทุกคนโดยไม่แย่งชิง และยินดีไหลไปสู่จุดต่ำสุดอย่างถ่อมตน',
          encouragement: 'ลึกซึ้งมาก! เข้าใจแก่นปรัชญาเต๋าอย่างสมบูรณ์!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "คุณธรรมสูงสุด เปรียบดุจดั่งสายน้ำ"',
          tokens: ['若水', '上善'],
          correct_sequence: ['上善', '若水'],
          pinyin: 'Shàngshàn ruòshuǐ.',
          meaning_th: 'คุณธรรมสูงสุด เปรียบดุจดั่งสายน้ำ',
          explanation_th: 'คุณธรรมสูงสุด (上善) + ดุจดั่งสายน้ำ (若水)',
          encouragement: 'เรียงคำสอนเต๋าอันอมตะได้อย่างถูกต้อง!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "水" (shuǐ - น้ำ) เมื่อแปลงเป็นหมวดนำด้านข้างของอักษรจีน มักเขียนในรูปใด?',
          options: [
            '氵 (หมวดสามจุดน้ำ 三点水)',
            '灬 (หมวดสี่จุดไฟ 四点底)',
            '冫 (หมวดสองจุดน้ำแข็ง 冫字旁)',
            '宀 (หมวดหลังคา 宝盖头)'
          ],
          correct_index: 0,
          explanation_th: 'อักษร "水" เมื่ออยู่ด้านซ้ายของคำ มักเขียนเป็น "氵" (三点水 - สามจุดน้ำ)',
          encouragement: 'จำรูปแบบแปลงของหมวดน้ำได้อย่างแม่นยำ!'
        },
        {
          type: 'multiple_choice',
          question_th: 'สำนวน "物极必反" (wùjíbìfǎn) เตือนใจมนุษย์อย่างไร?',
          options: [
            'สรรพสิ่งเมื่อพัฒนาถึงจุดขีดสุด ย่อมพลิกผันกลับไปสู่ทิศทางตรงกันข้าม จึงไม่ควรตึงหรือประมาทจนเกินไป',
            'สิ่งของทุกชิ้นเมื่อเก่าแล้วต้องทิ้ง',
            'คนเราควรทำทุกอย่างให้สุดโต่งอยู่เสมอ',
            'ไม่มีอะไรเปลี่ยนแปลงในโลกนี้'
          ],
          correct_index: 0,
          explanation_th: '"物极必反" สะท้อนปรัชญาวิภาษวิธีโบราณว่า สรรพสิ่งเมื่อถึงขีดสุดจะย้อนกลับ ดั่งพระอาทิตย์ขึ้นสูงสุดแล้วย่อมคล้อยต่ำลง',
          encouragement: 'เข้าใจกฎธรรมชาติและการเปลี่ยนแปลงอย่างถ่องแท้!'
        }
      ],
      boss_challenge: {
        question: 'ในการเขียนบทความแนะนำการบริหารทรัพยากรบุคคล ประโยคใดนำปรัชญาเต๋ามาปรับใช้ได้อย่างลึกซึ้งที่สุด?',
        options: [
          '管理者当学“上善若水”，以包容之心激发团队潜能，实现无为而治。',
          '管理者应当出其不意对员工施加暴力，追求敬而远之。',
          '所谓智者，必须半途而废，物极必反不可相信。',
          '管理者应该闭门造车，完全不顾规律。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "上善若水" และ "无为而治" ในการบริหารคนได้อย่างทรงคุณค่าและงดงาม'
      },
      cheer_trophy: {
        badge_name: 'นักพรตผู้กลมกลืนกับวิถีธรรมชาติ (Daoist Master of Harmony)',
        message_th: 'ยอดเยี่ยม! คุณเข้าใจปรัชญาเต๋า 上善若水 และ 无为而治 ก้าวสู่ความสุขุมลุ่มลึกระดับปรัชญาเมธี!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u48_l03',
      lesson_number: 3,
      title: {
        zh: '法家之术：法度与制度规范',
        th: 'กลยุทธ์แห่งนิติธรรม: วินัยกฎเกณฑ์ (法度) และรางวัลลงทัณฑ์ชัดเจน (赏罚分明)',
        en: 'Legalism: Rule of Law & Institutional Governance'
      },
      can_do: {
        th: 'อธิบายแนวคิดสำนักนิติธรรม (法家) และนำสำนวน 赏罚分明, 法不阿贵 มาประยุกต์ใช้ในการสร้างระบบการทำงานที่มีมาตรฐานได้',
        en: 'Explain Legalist governance doctrine and apply idioms "Clear Rewards & Punishments" and "Law Does Not Favor Nobility"'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำหลักการ 法度 และ 赏罚分明 มาสร้างความเป็นธรรมและความโปร่งใสในระบบงาน!',
      vocabulary: [
        {
          id: 'hsk4_48011',
          hanzi: '法家',
          pinyin: 'fǎjiā',
          display_pinyin: 'fǎjiā',
          pinyin_tone: 'fa3jia1',
          meaning_th: 'สำนักนิติธรรม / ปรัชญาการปกครองด้วยระบบกฎหมายและอำนาจรัฐ (หานเฟยจื่อ)',
          meaning_en: 'Legalism / Legalist school of thought',
          radical: '氵',
          radical_name_th: 'หมวดสามจุดน้ำ (三点水)',
          stroke_count: 18,
          mnemonic: 'กฎหมายเที่ยงตรงดั่งระนาบผิวน้ำ (法) แห่งสำนักการปกครอง (家) = สำนักนิติธรรม',
          kid_mnemonic: 'ตุลาการถือตราชั่งไม้ทองเหลืองตัดสินคดีอย่างเที่ยงตรง = 法家',
          body_gesture: 'สองมือทำท่ากางออกเหมือนตราชั่งที่สมดุลสองข้าง'
        },
        {
          id: 'hsk4_48012',
          hanzi: '法度',
          pinyin: 'fǎdù',
          display_pinyin: 'fǎdù',
          pinyin_tone: 'fa3du4',
          meaning_th: 'กฎเกณฑ์แบบแผน / วินัยและบรรทัดฐานของระบบองค์กรหรือรัฐ',
          meaning_en: 'laws and regulations / legal system and discipline',
          radical: '广',
          radical_name_th: 'หมวดเพิงพัก (广字旁)',
          stroke_count: 17,
          mnemonic: 'กฎหมายมาตรฐาน (法) วัดระดับความประพฤติ (度) = บรรทัดฐานและวินัย',
          kid_mnemonic: 'ถือไม้บรรทัดเหล็กขีดเส้นตรงระเบียบข้อบังคับของโรงเรียน = 法度',
          body_gesture: 'ใช้มือข้างหนึ่งทำท่าสับขนานเป็นแนวเส้นตรงบนฝ่ามืออีกข้าง'
        },
        {
          id: 'hsk4_48013',
          hanzi: '赏罚分明',
          pinyin: 'shǎngfáfēnmíng',
          display_pinyin: 'shǎngfáfēnmíng',
          pinyin_tone: 'shang3fa2fen1ming2',
          meaning_th: 'ปูนบำเหน็จรางวัลและลงทัณฑ์อย่างเที่ยงธรรมชัดเจน โปร่งใสไร้ลำเอียง',
          meaning_en: 'clear rewards and punishments / dispense justice impartially',
          radical: '贝',
          radical_name_th: 'หมวดหอยเบี้ย (贝字底)',
          stroke_count: 37,
          mnemonic: 'มอบรางวัลทรัพย์สิน (赏) ควบคู่บทลงโทษ (罚) อย่างจำแนกชัดเจน (分明) = รางวัลและโทษชัดเจน',
          kid_mnemonic: 'ทำความดีได้เหรียญทอง ทำผิดกฎต้องบำเพ็ญประโยชน์อย่างเท่าเทียม = 赏罚分明',
          body_gesture: 'มือซ้ายยื่นมอบเหรียญรางวัล มือขวาทำท่ากำกับตักเตือน'
        },
        {
          id: 'hsk4_48014',
          hanzi: '权衡',
          pinyin: 'quánhéng',
          display_pinyin: 'quánhéng',
          pinyin_tone: 'quan2heng2',
          meaning_th: 'การชั่งน้ำหนักข้อดีข้อเสีย / การไตร่ตรองดุลพินิจอย่างรอบคอบ',
          meaning_en: 'weigh and balance / deliberate on pros and cons',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 22,
          mnemonic: 'ลูกตุ้มน้ำหนัก (权) บนคานตราชั่งไม้ (衡) = การชั่งน้ำหนักไตร่ตรอง',
          kid_mnemonic: 'ยกตราชั่งทองเหลืองดูน้ำหนักเปรียบเทียบสองฝั่ง = 权衡',
          body_gesture: 'กางสองมือออกทำท่ายกขึ้นยกลงสลับกันเพื่อชั่งน้ำหนัก'
        },
        {
          id: 'hsk4_48015',
          hanzi: '法不阿贵',
          pinyin: 'fǎbù\'āguì',
          display_pinyin: 'fǎbù\'āguì',
          pinyin_tone: 'fa3bu4\'a1gui4',
          meaning_th: 'กฎหมายไม่เอนเอียงเอาใจผู้มีบรรดาศักดิ์ / ความเสมอภาคต่อหน้ากฎหมาย',
          meaning_en: 'the law does not flatter the noble / equality before the law',
          radical: '氵',
          radical_name_th: 'หมวดสามจุดน้ำ (三点水)',
          stroke_count: 29,
          mnemonic: 'กฎหมาย (法) ไม่ (不) ประจบสอพลอเอนเอียง (阿) ต่อผู้สูงศักดิ์ (贵) = กฎหมายยุติธรรมเสมอภาค',
          kid_mnemonic: 'ตุลาการตัดสินเจ้าชายทำผิดกฎก็ต้องยอมรับผิดเหมือนประชาชน = 法不阿贵',
          body_gesture: 'ยืนตัวตรงสะบัดแขนเสื้ออย่างเด็ดเดี่ยวไม่เกรงกลัวอิทธิพล'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำปฏิเสธในสำนวน 法不阿贵 (fǎbù\'āguì)',
        description_th: 'fǎ (เสียง 3) bù (เสียง 4) ā (เสียง 1) guì (เสียง 4) ออกเสียง bù หนักแน่นเพราะตามด้วย ā เสียง 1',
        example: '刑过不避大臣，赏善不遗匹夫，法不阿贵也。',
        fun_metaphor: 'เหมือนเสียงค้อนศาลเคาะลงบนแท่นหินอย่างยุติธรรมไร้ข้อยกเว้น',
        reassurance: 'สำนวนนิติธรรมชื่อดังจากคัมภีร์《韩非子》(หานเฟยจื่อ)'
      },
      grammar_bite: {
        title: 'โครงสร้างการบริหารตามหลักนิติธรรม: 严守法度，做到赏罚分明',
        formula: '在制度建设中，必须健全[กฎเกณฑ์แบบแผน]，做到法不阿贵、赏罚分明',
        explanation_th: 'ใช้ในการกำหนดยุทธศาสตร์ธรรมาภิบาล การปฏิรูปองค์กร และการสร้างความโปร่งใส',
        patterns: [
          {
            formula: '完善规章法度，做到赏罚分明。',
            zh: '现代企业必须建立健全的规章法度，真正做到赏罚分明，激发全员活力。',
            pinyin: 'Xiàndài qǐyè bìxū jiànlì jiànquán de guīzhāng fǎdù, zhēnzhèng zuò dào shǎngfáfēnmíng, jīfā quányuán huólì.',
            th: 'องค์กรสมัยใหม่ต้องสถาปนากฎระเบียบและแบบแผนที่สมบูรณ์ ปูนบำเหน็จและลงทัณฑ์อย่างโปร่งใสชัดเจนอย่างแท้จริง เพื่อปลุกพลังของพนักงานทุกคน',
            en: 'Modern enterprises must establish a sound system of rules and discipline, truly achieving clear rewards and punishments to inspire full vigor.'
          },
          {
            formula: '权衡利弊，坚持法不阿贵。',
            zh: '在执行管理条例时，要审慎权衡利弊，坚持法不阿贵，维护制度权威。',
            pinyin: 'Zài zhíxíng guǎnlǐ tiáolì shí, yào shěnshèn quánhéng lìbì, jiānchí fǎbù\'āguì, wéihù zhìdù quánwēi.',
            th: 'ในการบังคับใช้ระเบียบการบริหาร ต้องชั่งน้ำหนักข้อดีข้อเสียอย่างรอบคอบ ยึดมั่นในหลักการที่กฎหมายไม่เอนเอียงเอาใจใคร เพื่อพิทักษ์ศักดิ์ศรีของระบบ',
            en: 'When enforcing management regulations, one should prudently weigh pros and cons and insist that rules favor no one, upholding institutional authority.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '孟导师 (Mentor Meng) 📜',
          zh: '张教授，如果企业管理只依靠道德教育，员工在复杂环境中往往难以遵守规则，我们需要建立怎样的法律制度？',
          pinyin: 'Zhāng jiàoshòu, rúguǒ qǐyè guǎnlǐ zhǐ yīkào dàodé jiàoyù, yuángōng zài fùzá huánjìng zhōng wǎngwǎng nányǐ zūnshǒu guīzé, wǒmen xūyào jiànlì zěnyàng de fǎlǜ zhìdù?',
          th: 'ศาสตราจารย์จางครับ หากการบริหารองค์กรพึ่งพาเพียงการศึกษาอบรมทางศีลธรรม พนักงานในสภาวะแวดล้อมที่ซับซ้อนมักยากที่จะปฏิบัติตามกฎเกณฑ์ พวกเราจำเป็นต้องสร้างระบบกฎหมายและระเบียบวินัยเช่นไรครับ?',
          en: 'Prof. Zhang, if enterprise management relies solely on moral education, employees in complex environments often struggle to obey rules; what kind of legal institutional system do we need to establish?',
          audio_trigger: 't4_u48_l03_d01'
        },
        {
          speaker: '张教授 (Prof. Zhang) 👨‍🏫',
          zh: '确实如此，这就需要借鉴法家思想，建立明确的法度与规范。',
          pinyin: 'Quèshí rúcǐ, zhè jiù xūyào jièjiàn Fǎjiā sīxiǎng, jiànlì míngquè de fǎdù yǔ guīfàn.',
          th: 'เป็นเช่นนั้นจริงครับ นี่จึงต้องนำแนวคิดสำนักนิติธรรมมาปรับใช้ สถาปนากฎเกณฑ์และบรรทัดฐานที่ชัดเจน',
          en: 'Indeed, this requires drawing on Legalist philosophy to establish clear laws, discipline, and standards.',
          audio_trigger: 't4_u48_l03_d02'
        },
        {
          speaker: '孟导师 (Mentor Meng) 📜',
          zh: '谢谢张教授！建立明确的法度与规范，确实是解决现代管理问题的科学方法。法家的核心是“法不阿贵”与“赏罚分明”，这对现代治理极具启示。',
          pinyin: 'Xièxie Zhāng jiàoshòu! Jiànlì míngquè de fǎdù yǔ guīfàn, quèshí shì jiějué xiàndài guǎnlǐ wèntí de kēxué fāngfǎ. Fǎjiā de héxīn shì "fǎbù\'āguì" yǔ "shǎngfáfēnmíng", zhè duì xiàndài zhìlǐ jí jù qǐshì.',
          th: 'ขอบคุณศาสตราจารย์จางครับ! การสถาปนากฎเกณฑ์และบรรทัดฐานที่ชัดเจน เป็นวิธีการทางวิทยาศาสตร์ในการแก้ไขปัญหาการบริหารสมัยใหม่อย่างแท้จริง แก่นแท้ของนิติธรรมคือ "กฎหมายไม่เอาใจผู้มีอิทธิพล" และ "รางวัลโทษชัดเจน" ซึ่งให้ข้อคิดอย่างยิ่งต่อธรรมาภิบาลสมัยใหม่',
          en: 'Thank you Prof. Zhang! Establishing clear laws and standards is truly a scientific method to solve modern management problems. The core of Legalism is "the law favors no nobility" and "clear rewards and punishments", highly enlightening for modern governance.',
          audio_trigger: 't4_u48_l03_d03'
        },
        {
          speaker: '张教授 (Prof. Zhang) 👨‍🏫',
          zh: '权衡利弊之后，德法兼治、刚柔并济，才是最完备的治理智慧。',
          pinyin: 'Quánhéng lìbì zhīhòu, dé fǎ jiānzhì, gāng róu bìng jì, cái shì zuì wánbèi de zhìlǐ zhìhuì.',
          th: 'หลังจากชั่งน้ำหนักข้อดีข้อเสียแล้ว การบริหารด้วยทั้งคุณธรรมและกฎหมาย ผสานความเข้มงวดและความอ่อนโยนเข้าด้วยกัน จึงเป็นปัญญาแห่งการปกครองที่สมบูรณ์ที่สุดครับ',
          en: 'After weighing pros and cons, combining morality with law and balancing firmness with flexibility represents the most comprehensive wisdom of governance.',
          audio_trigger: 't4_u48_l03_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'สำนวน "法不阿贵" (fǎbù\'āguì) หมายถึงหลักการใดในสังคมสมัยใหม่?',
          options: [
            'หลักความเสมอภาคต่อหน้ากฎหมาย กฎหมายบังคับใช้เท่าเทียมกันไม่ยกเว้นผู้มีอำนาจหรือร่ำรวย',
            'กฎหมายมีไว้เพื่อลงโทษคนจนเท่านั้น',
            'คนรวยสามารถจ่ายเงินเพื่อพ้นโทษได้',
            'กฎหมายเปลี่ยนแปลงตามคำสั่งของผู้มีอิทธิพล'
          ],
          correct_index: 0,
          explanation_th: '"法不阿贵" (The law does not flatter the noble) คือหลักนิติธรรมที่ระบุว่า กฎหมายต้องเที่ยงธรรมเสมอภาค ไม่เอนเอียงเอาใจใคร',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจหลักนิติธรรมสากลผ่านสำนวนจีนโบราณ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "กฎหมายไม่เอนเอียง ปูนบำเหน็จลงทัณฑ์ชัดเจน"',
          tokens: ['赏罚分明', '法不阿贵'],
          correct_sequence: ['法不阿贵', '赏罚分明'],
          pinyin: 'Fǎbù\'āguì, shǎngfáfēnmíng.',
          meaning_th: 'กฎหมายไม่เอนเอียง ปูนบำเหน็จลงทัณฑ์ชัดเจน',
          explanation_th: 'หลักความเสมอภาค (法不阿贵) + หลักการลงโทษและให้รางวัล (赏罚分明)',
          encouragement: 'เรียงหลักนิติรัฐได้อย่างทรงพลัง!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "赏" (shǎng - ให้รางวัล) มีหมวด "贝" (หอยเบี้ย/ทรัพย์) ด้านล่าง สื่อถึงอะไร?',
          options: [
            'การมอบทรัพย์สินเงินทองหรือของมีค่าเพื่อเป็นรางวัลตอบแทนความดีความชอบ',
            'การประมูลสิ่งของริมทะเล',
            'การลงโทษปรับเงิน',
            'การเก็บเปลือกหอย'
          ],
          correct_index: 0,
          explanation_th: '"贝" คือเงินตราในยุคโบราณ "赏" จึงหมายถึงการพระราชทานหรือมอบทรัพย์รางวัลตอบแทนผู้สร้างผลงาน',
          encouragement: 'วิเคราะห์ความหมายอักษรจีนได้อย่างแม่นยำ!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "权衡" (quánhéng) ในการตัดสินใจทางธุรกิจหมายถึงอะไร?',
          options: [
            'การชั่งน้ำหนักเปรียบเทียบผลได้ผลเสียอย่างรอบคอบก่อนตัดสินใจ',
            'การใช้อำนาจเผด็จการสั่งการ',
            'การมอบอำนาจให้ผู้อื่นทั้งหมด',
            'การหลีกเลี่ยงความรับผิดชอบ'
          ],
          correct_index: 0,
          explanation_th: '"权衡" เปรียบเหมือนการวางของบนตราชั่งเพื่อชั่งน้ำหนัก สื่อถึงการไตร่ตรองข้อดีข้อเสียอย่างสุขุม',
          encouragement: 'จำคำศัพท์เชิงวิเคราะห์ได้อย่างแม่นยำ!'
        }
      ],
      boss_challenge: {
        question: 'ในคู่มือจริยธรรมและระเบียบวินัยของบรรษัทข้ามชาติ ข้อความใดสะท้อนหลักธรรมาภิบาลแบบนิติธรรมได้อย่างสมบูรณ์ที่สุด?',
        options: [
          '公司严格遵守各项法度，坚决做到法不阿贵、赏罚分明。',
          '公司应该出其不意对管理层免责，对基层半途而废。',
          '所谓智者，无需任何法度与权衡。',
          '公司顺其自然，不需要任何制度规范。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกระบุ "遵守各项法度" ควบคู่ "法不阿贵、赏罚分明" ได้อย่างหนักแน่น เที่ยงธรรม และถูกต้องตามหลักการบริหาร'
      },
      cheer_trophy: {
        badge_name: 'ผู้พิทักษ์ความยุติธรรมและนิติธรรม (Guardian of the Rule of Law)',
        message_th: 'ยินดีด้วย! คุณเข้าใจมิติของสำนักนิติธรรม (法家) และหลักการ 法不阿贵 เพื่อสร้างระบบงานที่โปร่งใสยุติธรรม!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u48_l04',
      lesson_number: 4,
      title: {
        zh: '思想融合：古为今用与和而不同',
        th: 'การหลอมรวมทางปัญญา: นำอดีตรับใช้ปัจจุบัน (古为今用) และกลมเกลียวทว่าคงเอกลักษณ์ (和而不同)',
        en: 'Philosophical Synthesis: Ancient Wisdom for Modern Times'
      },
      can_do: {
        th: 'บูรณาการคุณค่าของ 3 สำนักปรัชญาใหญ่ (儒、道、法) และใช้สำนวน 和而不同, 古为今用, 博大精深 ในการสื่อสารระดับสากล',
        en: 'Synthesize the three great traditions (Confucianism, Daoism, Legalism) and use idioms "Harmony in Diversity" & "Ancient for Present"'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำหลักการ 和而不同 และ 兼收并蓄 มาสร้างวิสัยทัศน์ที่เปิดกว้างและสมดุล!',
      vocabulary: [
        {
          id: 'hsk4_48016',
          hanzi: '和而不同',
          pinyin: 'hé\'érbùtóng',
          display_pinyin: 'hé\'érbùtóng',
          pinyin_tone: 'he2\'er2bu4tong2',
          meaning_th: 'กลมเกลียวสมานฉันท์ ทว่าคงไว้ซึ่งความแตกต่างและเอกลักษณ์เฉพาะตน',
          meaning_en: 'harmony in diversity / harmonious yet not identical',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 24,
          mnemonic: 'อยู่ร่วมกันอย่างกลมเกลียวประดุจเสียงดนตรีประสาน (和) ทว่า (而) ไม่จำเป็นต้องเหมือนกันทุกกระเบียดนิ้ว (不同) = กลมเกลียวบนความหลากหลาย',
          kid_mnemonic: 'วงออร์เคสตรามีเครื่องดนตรีหลายชนิดเล่นพร้อมกันเป็นเพลงเพราะ = 和而不同',
          body_gesture: 'กางสองมือออกแล้วนำมาประสานกันอย่างกลมกลืนนุ่มนวล'
        },
        {
          id: 'hsk4_48017',
          hanzi: '古为今用',
          pinyin: 'gǔwéijīnyòng',
          display_pinyin: 'gǔwéijīnyòng',
          pinyin_tone: 'gu3wei2jin1yong4',
          meaning_th: 'นำภูมิปัญญาโบราณมาปรับใช้เพื่อประโยชน์ของยุคปัจจุบัน',
          meaning_en: 'make the past serve the present / adapt ancient wisdom for modern use',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字底)',
          stroke_count: 18,
          mnemonic: 'เรื่องราวในอดีตกาล (古) นำมาแปรเปลี่ยนให้เกิด (为) ประโยชน์แก่ยุคปัจจุบัน (今用) = นำอดีตรับใช้ปัจจุบัน',
          kid_mnemonic: 'หยิบตำราโบราณมาสร้างโปรแกรมคอมพิวเตอร์สุดล้ำ = 古为今用',
          body_gesture: 'มือซ้ายรับม้วนคัมภีร์ส่งต่อให้มือขวาที่ถือแท็บเล็ตสมัยใหม่'
        },
        {
          id: 'hsk4_48018',
          hanzi: '博大精深',
          pinyin: 'bódàjīngshēn',
          display_pinyin: 'bódàjīngshēn',
          pinyin_tone: 'bo2da4jing1shen1',
          meaning_th: 'กว้างใหญ่ไพศาลและลึกซึ้งละเอียดอ่อน (มักใช้อธิบายวัฒนธรรมและองค์ความรู้)',
          meaning_en: 'broad and profound / vast and deep in knowledge',
          radical: '十',
          radical_name_th: 'หมวดสิบ (十字部)',
          stroke_count: 37,
          mnemonic: 'กว้างใหญ่ไพศาลดั่งมหาสมุทร (博大) ประณีตลึกซึ้งถึงแก่นสาร (精深) = กว้างไกลลึกซึ้งไร้ขอบเขต',
          kid_mnemonic: 'ห้องสมุดยักษ์ที่เต็มไปด้วยหนังสือแห่งความรู้สูงจรดเพดาน = 博大精深',
          body_gesture: 'กางสองแขนออกกว้างสุดตัวแล้วค่อยๆ ชูขึ้นสูงมองท้องฟ้า'
        },
        {
          id: 'hsk4_48019',
          hanzi: '格物致知',
          pinyin: 'géwùzhìzhī',
          display_pinyin: 'géwùzhìzhī',
          pinyin_tone: 'ge2wu4zhi4zhi1',
          meaning_th: 'ศึกษาค้นคว้ากฎเกณฑ์ของสรรพสิ่งอย่างละเอียดลึกซึ้ง เพื่อบรรลุปัญญาอันบริสุทธิ์',
          meaning_en: 'investigate things to extend knowledge / seek knowledge through thorough study',
          radical: '木',
          radical_name_th: 'หมวดไม้ (木字旁)',
          stroke_count: 31,
          mnemonic: 'ตรวจสอบศึกษาสรรพสิ่ง (格物) เพื่อนำไปสู่ (致) ความรู้แจ้งแห่งปัญญา (知) = ค้นคว้าเพื่อบรรลุปัญญา',
          kid_mnemonic: 'ส่องกล้องจุลทรรศน์ตรวจดูเซลล์พืชจนเข้าใจความลับของธรรมชาติ = 格物致知',
          body_gesture: 'ทำท่าส่องแว่นขยายดูสิ่งของอย่างละเอียดแล้วพยักหน้าเข้าใจ'
        },
        {
          id: 'hsk4_48020',
          hanzi: '兼收并蓄',
          pinyin: 'jiānshōubìngxù',
          display_pinyin: 'jiānshōubìngxù',
          pinyin_tone: 'jian1shou1bing4xu4',
          meaning_th: 'เปิดกว้างโอบรับและหลอมรวมความหลากหลายเข้าด้วยกันอย่างรอบด้าน',
          meaning_en: 'take in everything / all-inclusive / absorb diverse elements',
          radical: '八',
          radical_name_th: 'หมวดแปด (八字部)',
          stroke_count: 38,
          mnemonic: 'รวบรวมอย่างพร้อมเพรียง (兼收) และกักเก็บสะสมไว้อย่างอุดมสมบูรณ์ (并蓄) = โอบรับทุกสรรพสิ่ง',
          kid_mnemonic: 'เปิดอ้อมแขนรับเพื่อนจากทุกมุมโลกมาร้องเพลงร่วมกัน = 兼收并蓄',
          body_gesture: 'วาดสองมือจากด้านนอกเข้าหาตัวรวบรวมพลังสู่ศูนย์กลาง'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำคมขงจื๊อ 和而不同 (hé\'érbùtóng)',
        description_th: 'hé (เสียง 2) ér (เสียง 2) bù (เสียง 4) tóng (เสียง 2) ผันเสียงตามวรรณยุกต์มาตรฐานอย่างสง่างาม',
        example: '君子和而不同，小人同而不和。',
        fun_metaphor: 'เหมือนเสียงเครื่องดนตรีหลายชนิดในวงออร์เคสตราที่ประสานกันอย่างลงตัว',
        reassurance: 'สำนวนทองคำของขงจื๊อที่ได้รับการยกย่องเป็นรากฐานของความสัมพันธ์ระหว่างประเทศและการอยู่ร่วมกัน'
      },
      grammar_bite: {
        title: 'โครงสร้างการหลอมรวมวัฒนธรรม: 兼收并蓄，坚持古为今用',
        formula: '在文化传承与发展中，我们应当秉持[การเปิดกว้าง]，坚持古为今用，实现[การต่อยอดใหม่]',
        explanation_th: 'ใช้ในการนำเสนอวิสัยทัศน์ทางวิชาการและวัฒนธรรม เพื่อชูความเป็นสากลควบคู่กับรากเหง้าภูมิปัญญา',
        patterns: [
          {
            formula: '秉持和而不同，促进多元交融。',
            zh: '我们主张在国际交流中秉持“和而不同”的理念，尊重文明多样性。',
            pinyin: 'Wǒmen zhǔzhāng zài guójì jiāoliú zhōng bǐngchí "hé\'érbùtóng" de lǐniàn, zūnzhòng wénmíng duōyàngxìng.',
            th: 'พวกเราสนับสนุนการยึดมั่นในแนวคิด "กลมเกลียวบนความแตกต่าง" ในการแลกเปลี่ยนระหว่างประเทศ เคารพในความหลากหลายทางอารยธรรม',
            en: 'We advocate upholding the concept of "harmony in diversity" in international exchanges, respecting the diversity of civilizations.'
          },
          {
            formula: '传承博大精深，做到古为今用。',
            zh: '中华优秀传统文化博大精深，我们要坚持古为今用，为现代社会注入智慧。',
            pinyin: 'Zhōnghuá yōuxiù chuántǒng wénhuà bódàjīngshēn, wǒmen yào jiānchí gǔwéijīnyòng, wèi xiàndài shèhuì zhùrù zhìhuì.',
            th: 'วัฒนธรรมดั้งเดิมอันล้ำค่าของจีนกว้างใหญ่และลึกซึ้ง พวกเราต้องยึดมั่นในการนำอดีตมารับใช้ปัจจุบัน เพื่อเติมเต็มปัญญาให้แก่สังคมสมัยใหม่',
            en: 'Fine traditional Chinese culture is broad and profound; we must adhere to making the past serve the present, infusing modern society with wisdom.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '张教授 (Prof. Zhang) 👨‍🏫',
          zh: '各位同学好！今天我们大家在这里完成了儒家、道家与法家的讨论学习，希望大家总结经验，有什么深刻的心得体会？',
          pinyin: 'Gèwèi tóngxué hǎo! Jīntiān wǒmen dàjiā zài zhèlǐ wánchéng le Rújiā, Dàojiā yǔ Fǎjiā de tǎolùn xuéxí, xīwàng dàjiā zǒngjié jīngyàn, yǒu shénme shēnkè de xīndé tǐhuì?',
          th: 'สวัสดีนักศึกษาทุกท่าน! วันนี้พวกเราทุกคนที่นี่ได้เรียนรู้และอภิปรายเกี่ยวกับสำนักขงจื๊อ เต๋า และนิติธรรมจนเสร็จสิ้น หวังว่าทุกคนจะสรุปบทเรียนและมีข้อคิดอะไรลึกซึ้งบ้างครับ?',
          en: 'Hello students! Today we all completed the discussion and study of Confucianism, Daoism, and Legalism here; hoping everyone summarizes experience, what profound reflections do you have?',
          audio_trigger: 't4_u48_l04_d01'
        },
        {
          speaker: '王研究员 (Researcher Wang) 👨‍💼',
          zh: '中国哲学博大精深，儒家讲仁爱修身，道家讲顺其自然，法家讲制度规范。',
          pinyin: 'Zhōngguó zhéxué bódàjīngshēn, Rújiā jiǎng rén\'ài xiūshēn, Dàojiā jiǎng shùnqízìrán, Fǎjiā jiǎng zhìdù guīfàn.',
          th: 'ปรัชญาจีนกว้างไกลและลึกซึ้งมากครับ ขงจื๊อเน้นเมตตาธรรมและการฝึกฝนตน เต๋าเน้นการคล้อยตามธรรมชาติ นิติธรรมเน้นระบบระเบียบ',
          en: 'Chinese philosophy is broad and profound: Confucianism teaches benevolence and self-cultivation, Daoism follows nature, and Legalism stresses discipline.',
          audio_trigger: 't4_u48_l04_d02'
        },
        {
          speaker: '张教授 (Prof. Zhang) 👨‍🏫',
          zh: '说得好！三者兼收并蓄，古为今用，才能构建健全的现代治理体系。',
          pinyin: 'Shuō de hǎo! Sān zhě jiānshōubìngxù, gǔwéijīnyòng, cái néng gòujiàn jiànquán de xiàndài zhìlǐ tǐxì.',
          th: 'พูดได้ดีมาก! หลอมรวมทั้งสามด้านอย่างเปิดกว้าง นำอดีตมารับใช้ปัจจุบัน จึงจะสร้างระบบธรรมาภิบาลสมัยใหม่ที่สมบูรณ์ได้',
          en: 'Well said! Embracing all three and adapting the past for present use enables building a sound modern governance system.',
          audio_trigger: 't4_u48_l04_d03'
        },
        {
          speaker: '王研究员 (Researcher Wang) 👨‍💼',
          zh: '在国际交往中，我们也应当践行“和而不同”，推动人类文明互鉴。',
          pinyin: 'Zài guójì jiāowǎng zhōng, wǒmen yě yīngdāng jiànxíng "hé\'érbùtóng", tuīdòng rénlèi wénmíng hùjiàn.',
          th: 'ในการมีปฏิสัมพันธ์ระดับสากล พวกเราก็ควรนำหลัก "กลมเกลียวบนความแตกต่าง" มาปฏิบัติ ขับเคลื่อนการเรียนรู้ซึ่งกันและกันของอารยธรรมมนุษย์ครับ',
          en: 'In international interactions, we should also practice "harmony in diversity", promoting mutual learning among human civilizations.',
          audio_trigger: 't4_u48_l04_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'สำนวน "和而不同" (hé\'érbùtóng) มีความหมายตรงกับหลักการใด?',
          options: [
            'การอยู่ร่วมกันอย่างปรองดองสมานฉันท์ โดยยอมรับและเคารพในความแตกต่างหลากหลายของแต่ละบุคคล',
            'การบังคับให้ทุกคนคิดและพูดเหมือนกันทุกอย่าง',
            'การตัดขาดความสัมพันธ์กับคนที่มีความคิดไม่ตรงกัน',
            'การยอมให้ผู้อื่นครอบงำความคิดของตนเอง'
          ],
          correct_index: 0,
          explanation_th: '"君子和而不同" (สุภาพชนกลมเกลียวทว่าคงเอกลักษณ์) สื่อถึงการอยู่ร่วมกันอย่างสันติและเคารพในความแตกต่าง',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจแก่นปรัชญาการอยู่ร่วมกันระดับสากล!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "สุภาพชนกลมเกลียวทว่าคงเอกลักษณ์ คนพาลเหมือนกันทว่าแก่งแย่ง"',
          tokens: ['小人同而不和', '君子和而不同'],
          correct_sequence: ['君子和而不同', '小人同而不和'],
          pinyin: 'Jūnzǐ hé\'érbùtóng, xiǎorén tóng\'érbùhé.',
          meaning_th: 'สุภาพชนกลมเกลียวทว่าคงเอกลักษณ์ คนพาลเหมือนกันทว่าแก่งแย่ง',
          explanation_th: 'ประโยคเปรียบเทียบ: สุภาพชน (君子和而不同) + คนพาล (小人同而不和)',
          encouragement: 'เรียงคำสอนขงจื๊ออันเป็นอมตะได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "和" (hé - ความกลมเกลียว) ประกอบด้วย "禾" (รวงข้าว) และ "口" (ปาก) สื่อถึงภาพมโนทัศน์ใด?',
          options: [
            'ทุกคนมีข้าวกินอิ่มปากอิ่มท้อง นำมาซึ่งความสงบสุขและความกลมเกลียวในสังคม',
            'การเกี่ยวข้าวในทุ่งนา',
            'การเคี้ยวอาหารอร่อย',
            'การร้องเพลงประสานเสียง'
          ],
          correct_index: 0,
          explanation_th: '"禾" (รวงข้าว) + "口" (ปาก) สื่อถึงความอุดมสมบูรณ์ ทุกคนมีกิน ย่อมนำไปสู่ความปรองดองและสันติสุข (和)',
          encouragement: 'จำรากศัพท์ความสามัคคีได้อย่างลึกซึ้ง!'
        },
        {
          type: 'multiple_choice',
          question_th: 'สำนวน "古为今用" (gǔwéijīnyòng) หมายถึงอะไร?',
          options: [
            'การคัดเลือกและนำมรดกภูมิปัญญาโบราณมาปรับประยุกต์ใช้ให้เกิดประโยชน์ในยุคปัจจุบัน',
            'การย้อนกลับไปใช้ชีวิตแบบคนโบราณโดยไม่ใช้เทคโนโลยี',
            'การยกเลิกกฎหมายใหม่ทั้งหมดแล้วใช้กฎหมายโบราณ',
            'การเก็บโบราณวัตถุไว้ในพิพิธภัณฑ์เท่านั้น'
          ],
          correct_index: 0,
          explanation_th: '"古为今用" คือ การสืบสานอดีตเพื่อรับใช้ปัจจุบัน นำปรัชญาโบราณมาเป็นแนวทางแก้ปัญหาในโลกยุคใหม่',
          encouragement: 'เข้าใจทัศนะประวัติศาสตร์และการประยุกต์ใช้อย่างถ่องแท้!'
        }
      ],
      boss_challenge: {
        question: 'ในแถลงการณ์เปิดศูนย์วิจัยอารยธรรมเปรียบเทียบ ข้อความใดแสดงถึงวิสัยทัศน์แห่งการหลอมรวมภูมิปัญญาได้อย่างทรงพลังที่สุด?',
        options: [
          '我们倡导“和而不同”的包容精神，坚持兼收并蓄、古为今用，汲取古代先哲智慧。',
          '我们必须半途而废，拒绝所有古为今用与和而不同。',
          '所谓智者，敬而远之，放弃博大精深的一切探索。',
          '我们顺其自然，不需要任何格物致知与兼收并蓄。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกบูรณาการ "和而不同", "兼收并蓄", "古为今用" ได้อย่างสมบูรณ์แบบตามมาตรฐานวิชาการระดับสากล'
      },
      cheer_trophy: {
        badge_name: 'ปราชญ์ผู้หลอมรวมสามสำนักปรัชญา (Grand Master of Tri-Philosophical Synthesis)',
        message_th: 'ขอแสดงความยินดีด้วยอย่างยิ่ง! คุณได้พิชิตหน่วยเรียนปรัชญาจีนโบราณ 儒、道、法 ครบถ้วน ก้าวสู่ระดับปราชญ์ภาษาจีนอย่างแท้จริง!',
        xp_reward: 150
      }
    }
  ]
};
