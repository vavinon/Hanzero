/**
 * scripts/tier3_batch_b/unit36.ts
 * Tier 3 Unit 36: 心理健康与情感 (Mental Health & Emotional Well-being)
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

export const unit36 = {
  unit_id: 'tier3_u36',
  tier: 3,
  unit_number: 36,
  title: {
    zh: '心理健康与情感',
    th: 'สุขภาพจิตและการจัดการอารมณ์',
    en: 'Mental Health & Emotional Well-being'
  },
  description: 'ทำความเข้าใจและสื่อสารสภาวะทางอารมณ์ สุขภาพจิตของคนรุ่นใหม่: แรงกดดันและอาการหมดไฟ (职场倦怠), การเยียวยาจิตใจและการรับฟัง (心理疗愈与倾听), และการปรับสมดุลชีวิตเพื่อความยั่งยืน (工作与生活平衡)',
  lessons: [
    {
      lesson_id: 't3_u36_l01',
      lesson_number: 1,
      title: {
        zh: '情绪与压力',
        th: 'อารมณ์และแรงกดดัน',
        en: 'Emotions & Stress'
      },
      can_do: {
        th: 'บรรยายสภาวะอารมณ์ ความวิตกกังวล และการปลดปล่อยความเครียดได้อย่างชัดเจน',
        en: 'Describe emotions, anxiety, and stress relief clearly'
      },
      baby_step_goal: 'เป้าหมายวันนี้: บอกเล่าความรู้สึกวิตกกังวลและวิธีผ่อนคลายความเครียดสะสมได้อย่างเป็นธรรมชาติ!',
      vocabulary: [
        {
          id: 'hsk3_3601',
          hanzi: '焦虑',
          pinyin: 'jiāolǜ',
          display_pinyin: 'jiāolǜ',
          pinyin_tone: 'jiao1lu:4',
          meaning_th: 'วิตกกังวล / ความกระวนกระวายใจ',
          meaning_en: 'anxiety / anxious',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 22,
          mnemonic: 'หัวใจที่ร้อนรุ่มเหมือนถูกเผา (焦) และครุ่นคิดระแวงไม่หยุด (虑) = วิตกกังวล',
          kid_mnemonic: 'หน้าการ์ตูนเหงื่อตก มีเครื่องหมายคำถามหมุนวนรอบหัวใจ = 焦虑',
          body_gesture: 'เอามือทาบอกขยับนิ้วถี่ๆ แสดงความกระวนกระวาย'
        },
        {
          id: 'hsk3_3602',
          hanzi: '抑郁',
          pinyin: 'yìyù',
          display_pinyin: 'yìyù',
          pinyin_tone: 'yi4yu4',
          meaning_th: 'ซึมเศร้า / หดหู่ใจ',
          meaning_en: 'depression / depressed',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 22,
          mnemonic: 'ความรู้สึกถูกกดทับ (抑) ไว้ในป่ารกทึบจนอึดอัด (郁) = ซึมเศร้า',
          kid_mnemonic: 'ก้อนเมฆฝนสีเทาหยดน้ำฝนลงบนต้นกล้าที่ก้มหน้า = 抑郁',
          body_gesture: 'ก้มหน้าลงช้าๆ ปล่อยสองแขนลู่ลงข้างลำตัว'
        },
        {
          id: 'hsk3_3603',
          hanzi: '崩溃',
          pinyin: 'bēngkuì',
          display_pinyin: 'bēngkuì',
          pinyin_tone: 'beng1kui4',
          meaning_th: 'สติแตก / พังทลาย / แบกรับไม่ไหว',
          meaning_en: 'to collapse / to break down',
          radical: '山',
          radical_name_th: 'หมวดภูเขา (山字旁)',
          stroke_count: 23,
          mnemonic: 'ภูเขาดินถล่มลงมา (崩) จนเขื่อนพังทะลัก (溃) = พังทลาย สติแตก',
          kid_mnemonic: 'กำแพงอิฐของปราสาทพังทลายลงมาเป็นชิ้นๆ = 崩溃',
          body_gesture: 'สองมือกุมขมับแล้วสะบัดมือออกเหมือนเขื่อนพัง'
        },
        {
          id: 'hsk3_3604',
          hanzi: '释放',
          pinyin: 'shìfàng',
          display_pinyin: 'shìfàng',
          pinyin_tone: 'shi4fang4',
          meaning_th: 'ปลดปล่อย / ระบายออก',
          meaning_en: 'to release / to vent',
          radical: '釆',
          radical_name_th: 'หมวดแยกแยะ (釆字旁)',
          stroke_count: 19,
          mnemonic: 'อธิบายแยกแยะคลายปม (释) แล้วเปิดปล่อยให้โบยบินออกไป (放) = ปลดปล่อย',
          kid_mnemonic: 'เปิดประตูกรงนกให้นกพิราบบินขึ้นสู่ท้องฟ้าสีคราม = 释放',
          body_gesture: 'กุมมือที่อกแล้วเปิดสองแขนผายออกสู่ท้องฟ้า'
        },
        {
          id: 'hsk3_3605',
          hanzi: '减压',
          pinyin: 'jiǎnyā',
          display_pinyin: 'jiǎnyā',
          pinyin_tone: 'jian3ya1',
          meaning_th: 'ลดความเครียด / ผ่อนคลายแรงกดดัน',
          meaning_en: 'to relieve stress / decompress',
          radical: '冫',
          radical_name_th: 'หมวดน้ำแข็งสองจุด (两点水)',
          stroke_count: 17,
          mnemonic: 'ลดทอน (减) น้ำหนักแรงกดดัน (压) ลง = คลายเครียด',
          kid_mnemonic: 'ปลดก้อนหินหนักออกจากเป้สะพายหลังแล้วยิ้มกว้าง = 减压',
          body_gesture: 'ทำท่าเป่าปากฟู่พร้อมทิ้งไหล่ลงสบายๆ'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 释放 (shìfàng) เสียง 4 คู่หนักแน่น',
        description_th: 'shì และ fàng ล้วนเป็นเสียง 4 ให้ลงน้ำหนักกระชับ มั่นใจ ไม่ลากเสียงยาว เพื่อสื่อถึงการปลดปล่อยพลังงาน',
        example: '释放压力 (shìfàng yālì: ปลดปล่อยความเครียด)',
        fun_metaphor: 'เหมือนดีดนิ้วสองครั้งเป๊าะๆ ปล่อยลูกโป่งลอยขึ้นฟ้า!',
        reassurance: 'ออกเสียง 4 ติดกันได้สบาย เพียงทิ้งเสียงลงต่ำสั้นๆ ทั้งสองพยางค์'
      },
      grammar_bite: {
        title: 'โครงสร้างบอกสาเหตุและผลกระทบ: 面对...难免会感到... (เมื่อเผชิญกับ... ย่อมหลีกเลี่ยงไม่ได้ที่จะรู้สึก...)',
        explanation_th: 'ใช้แสดงความเห็นอกเห็นใจและยอมรับตามความเป็นจริงว่าสภาวะกดดันย่อมส่งผลต่ออารมณ์',
        patterns: [
          {
            formula: '面对 + [สถานการณ์กดดัน], 难免会感到 + [อารมณ์]',
            zh: '面对连续加班，大家难免会感到焦虑。',
            pinyin: 'Miànduì liánxù jiābān, dàjiā nánmiǎn huì gǎndào jiāolǜ.',
            th: 'เมื่อต้องเผชิญกับการทำงานล่วงเวลาติดต่อกัน ทุกคนย่อมหลีกเลี่ยงไม่ได้ที่จะรู้สึกวิตกกังวล',
            en: 'Facing continuous overtime, it is inevitable for everyone to feel anxious.'
          },
          {
            formula: '通过 + [วิธีปฏิบัติ], 来 + 释放压力',
            zh: '我们要通过运动来释放工作压力。',
            pinyin: 'Wǒmen yào tōngguò yùndòng lái shìfàng gōngzuò yālì.',
            th: 'พวกเราต้องปลดปล่อยความเครียดจากการทำงานผ่านการออกกำลังกาย',
            en: 'We need to release work pressure through exercise.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลิน (เพื่อนร่วมงาน) 👩‍💼',
          zh: '最近看你脸色不太好，是不是工作压力太大了？',
          pinyin: 'Zuìjìn kàn nǐ liǎnsè bú tài hǎo, shì bú shì gōngzuò yālì tài dà le?',
          th: 'ช่วงนี้เห็นสีหน้าเธอไม่ค่อยดีเลย ความเครียดจากงานหนักเกินไปหรือเปล่า?',
          en: 'You look a bit pale lately, is work pressure too overwhelming?'
        },
        {
          speaker: 'B',
          speaker_name: 'เฉิน (พนักงาน) 🧑‍💻',
          zh: '确实，面对这个紧急项目，我整天都很焦虑，甚至快崩溃了。',
          pinyin: 'Quèshí, miànduì zhè ge jǐnjí xiàngmù, wǒ zhěngtiān dōu hěn jiāolǜ, shènzhì kuài bēngkuì le.',
          th: 'จริงด้วยครับ เผชิญกับโปรเจกต์ด่วนตัวนี้ ผมวิตกกังวลทั้งวัน จนแทบจะสติแตกอยู่แล้ว',
          en: 'Indeed, facing this urgent project, I feel anxious all day, almost breaking down.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลิน (เพื่อนร่วมงาน) 👩‍💼',
          zh: '千万别硬扛，长期抑郁对身体伤害太大了，今天下班后去跑步减压吧！',
          pinyin: 'Qiānwàn bié yìngkáng, chángqī yìyù duì shēntǐ shānghài tài dà le, jīntiān xiàbān hòu qù pǎobù jiǎnyā ba!',
          th: 'อย่าฝืนทนคนเดียวเด็ดขาด ความหดหู่สะสมระยะยาวทำร้ายร่างกายมาก เย็นนี้หลังเลิกงานไปวิ่งคลายเครียดกันเถอะ!',
          en: 'Do not just tough it out alone, prolonged depression damages health badly, let us go running after work to decompress!'
        },
        {
          speaker: 'B',
          speaker_name: 'เฉิน (พนักงาน) 🧑‍💻',
          zh: '好主意，适度运动确实能有效释放内心的压抑感。',
          pinyin: 'Hǎo zhǔyi, shìdù yùndòng quèshí néng yǒuxiào shìfàng nèixīn de yāyìgǎn.',
          th: 'ความคิดที่ดีเลย การขยับร่างกายอย่างพอเหมาะช่วยปลดปล่อยความอึดอัดข้างในได้ดีจริงๆ',
          en: 'Great idea, moderate exercise really helps release inner feelings of oppression.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '焦虑' (jiāolǜ) มีความหมายตรงกับข้อใด?",
          options: [
            'วิตกกังวล / กระวนกระวายใจ',
            'ร่าเริงแจ่มใส',
            'หิวโหย',
            'เบื่อหน่ายอาหาร'
          ],
          correct_index: 0,
          explanation_th: "'焦虑' (jiāolǜ) หมายถึง ความรู้สึกวิตกกังวล กระสับกระส่าย ไม่สบายใจ",
          encouragement: 'ถูกต้องยอดเยี่ยม! จับความหมายอารมณ์ได้เป๊ะมาก!'
        },
        {
          type: 'flash_recall',
          question_th: "หากต้องการบอกว่า 'ปลดปล่อยความเครียด' ควรใช้คำว่าอะไร?",
          options: [
            '释放压力 (shìfàng yālì)',
            '增加成本 (zēngjiā chéngběn)',
            '推迟发货 (tuīchí fāhuò)',
            '取消订单 (qǔxiāo dìngdān)'
          ],
          correct_index: 0,
          explanation_th: "'释放压力' แปลว่า ปลดปล่อยหรือระบายความกดดัน/ความเครียดออกไป",
          encouragement: 'แม่นยำมาก! ใช้สำนวนภาษาจีนระดับมืออาชีพได้คล่องแคล่ว!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ทุกคนย่อมหลีกเลี่ยงไม่ได้ที่จะรู้สึกวิตกกังวลเมื่อต้องทำงานล่วงเวลา"',
          tokens: ['大家', '连续加班', '面对', '难免会感到焦虑'],
          correct_sequence: ['面对', '连续加班', '大家', '难免会感到焦虑'],
          pinyin: 'Miànduì liánxù jiābān, dàjiā nánmiǎn huì gǎndào jiāolǜ.',
          meaning_th: 'เมื่อเผชิญกับการทำงานล่วงเวลาต่อเนื่อง ทุกคนย่อมหลีกเลี่ยงไม่ได้ที่จะกังวล',
          explanation_th: 'โครงสร้าง 面对 + ปัญหา/สถานการณ์, ประธาน + 难免会感到...',
          encouragement: 'เก่งมาก! วางโครงสร้างประโยคอารมณ์ได้สละสลวย!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '焦' และ '虑' ในคำว่า 焦虑 เกี่ยวข้องกับอวัยวะหรือสภาวะใด?",
          options: [
            '心 (หัวใจ / ความรู้สึกข้างในจิตใจ)',
            '口 (ปาก / การรับประทานอาหาร)',
            '足 (เท้า / การก้าวเดิน)',
            '车 (ยานพาหนะ)'
          ],
          correct_index: 0,
          explanation_th: "'虑' มีหมวด '心' (หัวใจ) ด้านล่าง สื่อถึงกระบวนการคิดและสภาวะความรู้สึกภายในใจ",
          encouragement: 'สังเกตรากศัพท์ได้เฉียบคมมาก!'
        }
      ]
    },
    {
      lesson_id: 't3_u36_l02',
      lesson_number: 2,
      title: {
        zh: '职场倦怠与透支',
        th: 'ภาวะหมดไฟในการทำงานและการใช้พลังเกินขีดจำกัด',
        en: 'Workplace Burnout & Exhaustion'
      },
      can_do: {
        th: 'อธิบายอาการเหนื่อยล้าสะสม ภาวะ Burnout และการขอเวลาพักหายใจ',
        en: 'Explain burnout, emotional exhaustion, and taking a breather'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องภาวะหมดไฟ (Burnout) และการจัดสมดุลไม่ให้ร่างกายทรุดโทรม!',
      vocabulary: [
        {
          id: 'hsk3_3606',
          hanzi: '倦怠',
          pinyin: 'juàndài',
          display_pinyin: 'juàndài',
          pinyin_tone: 'juan4dai4',
          meaning_th: 'เหนื่อยหน่าย / ภาวะหมดไฟ (Burnout)',
          meaning_en: 'burnout / weary and tired',
          radical: '忄',
          radical_name_th: 'หมวดหัวใจแนวตั้ง (竖心旁)',
          stroke_count: 19,
          mnemonic: 'หัวใจที่เหนื่อยล้า (倦) และเริ่มเฉื่อยชาหมดแรง (怠) = ภาวะหมดไฟ',
          kid_mnemonic: 'ถ่านแบตเตอรี่สีแดงกะพริบขีดสุดท้าย = 倦怠',
          body_gesture: 'ทำท่าทิ้งตัวพิงพนักเก้าอี้ถอนหายใจยาว'
        },
        {
          id: 'hsk3_3607',
          hanzi: '透支',
          pinyin: 'tòuzhī',
          display_pinyin: 'tòuzhī',
          pinyin_tone: 'tou4zhi1',
          meaning_th: 'เบิกใช้เกิน / ใช้พลังงานหรือร่างกายเกินขีดจำกัด',
          meaning_en: 'to overdraw / overexhaust',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之底)',
          stroke_count: 14,
          mnemonic: 'ทะลุข้ามขีดจำกัด (透) เบิกจ่ายออกไปล่วงหน้า (支) = ใช้เกินตัว',
          kid_mnemonic: 'บัตรเครดิตที่รูดจนเต็มวงเงินติดลบสีแดง = 透支',
          body_gesture: 'กวาดมือข้ามเส้นสมมติข้างหน้าแล้วส่ายศีรษะ'
        },
        {
          id: 'hsk3_3608',
          hanzi: '调节',
          pinyin: 'tiáojié',
          display_pinyin: 'tiáojié',
          pinyin_tone: 'tiao2jie2',
          meaning_th: 'ปรับสมดุล / ปรับจูน / ควบคุมให้พอเหมาะ',
          meaning_en: 'to adjust / to regulate',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 18,
          mnemonic: 'เจรจาปรองดอง (调) ตามจังหวะข้อต่อที่เหมาะสม (节) = ปรับจูนสมดุล',
          kid_mnemonic: 'หมุนปุ่มวอลลุ่มเครื่องเสียงให้เสียงนุ่มนวลพอดี = 调节',
          body_gesture: 'ทำมือหมุนลูกบิดปรับระดับช้าๆ ทั้งสองข้าง'
        },
        {
          id: 'hsk3_3609',
          hanzi: '喘息',
          pinyin: 'chuǎnxī',
          display_pinyin: 'chuǎnxī',
          pinyin_tone: 'chuan3xi1',
          meaning_th: 'พักหายใจ / จังหวะพักผ่อนสั้นๆ',
          meaning_en: 'breathing space / respite',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 22,
          mnemonic: 'อ้าปากหอบหายใจ (喘) เพื่อพักผ่อนฟื้นฟูลมหายใจ (息) = พักหายใจ',
          kid_mnemonic: 'นักวิ่งหยุดแวะดื่มน้ำข้างทางแล้วสูดหายใจลึกๆ = 喘息',
          body_gesture: 'เอามือแตะหน้าอกแล้วสูดลมหายใจเข้าช้าๆ'
        },
        {
          id: 'hsk3_3610',
          hanzi: '防线',
          pinyin: 'fángxiàn',
          display_pinyin: 'fángxiàn',
          pinyin_tone: 'fang2xian4',
          meaning_th: 'แนวป้องกัน / ขีดจำกัดความอดทนทางจิตใจ',
          meaning_en: 'defense line',
          radical: '阝',
          radical_name_th: 'หมวดเนินดินซ้าย (左耳旁)',
          stroke_count: 14,
          mnemonic: 'เนินดินป้องกันข้าศึก (防) ขึงเป็นแนวเส้นยาว (线) = แนวป้องกัน',
          kid_mnemonic: 'โล่ป้องกันเรืองแสงกางกั้นไม่ให้คลื่นลูกใหญ่ซัดถึงตัว = 防线',
          body_gesture: 'ยกสองแขนไขว้กันตรงอกเป็นรูปตัวกากบาทป้องกัน'
        }
      ],
      tone_rule: {
        rule_name: 'การผันเสียง 透支 (tòuzhī) เสียง 4 ต่อด้วยเสียง 1',
        description_th: 'tòu เป็นเสียง 4 หนักสั้น ตามด้วย zhī เสียง 1 สูงเรียบ ให้ตัดเสียงหนักแล้วลากเสียงเรียบตรง',
        example: '身体透支 (shēntǐ tòuzhī: ร่างกายใช้พลังงานเกินขีดจำกัด)',
        fun_metaphor: 'เหมือนกดปุ่มสตาร์ตหนักๆ ตึ้ก แล้วเสียงเครื่องยนต์วิ่งเรียบ ฮึ่ม!',
        reassurance: 'ออกเสียงชัดเจนเป็นธรรมชาติ ช่วยเพิ่มความน่าเชื่อถือในบริบทการทำงาน'
      },
      grammar_bite: {
        title: 'โครงสร้างเตือนสติ: 与其...不如... (แทนที่จะ... สู้... ดีกว่า)',
        explanation_th: 'ใช้เปรียบเทียบสองทางเลือกเพื่อแนะทางออกที่ดีต่อสุขภาพจิตและป้องกันภาวะหมดไฟ',
        patterns: [
          {
            formula: '与其 + [พฤติกรรมฝืนทนที่เป็นโทษ], 不如 + [ทางเลือกที่สร้างสรรค์]',
            zh: '与其盲目透支身体，不如停下来好好调节几天。',
            pinyin: 'Yǐqí mángmù tòuzhī shēntǐ, bùrú tíng xiàlai hǎohǎo tiáojié jǐ tiān.',
            th: 'แทนที่จะฝืนใช้ร่างกายเกินขีดจำกัดอย่างไร้ทิศทาง สู้หยุดพักปรับสมดุลสักสองสามวันดีกว่า',
            en: 'Rather than blindly overdrawing your body, it is better to stop and regulate for a few days.'
          },
          {
            formula: '给...一点喘息的空间',
            zh: '我们要给团队一点喘息的空间，才能保证长期的工作效率。',
            pinyin: 'Wǒmen yào gěi tuánduì yìdiǎn chuǎnxī de kōngjiān, cái néng bǎozhèng chángqī de gōngzuò xiàolǜ.',
            th: 'พวกเราต้องให้พื้นที่พักหายใจแก่ทีมบ้าง จึงจะรักษาประสิทธิภาพการทำงานในระยะยาวได้',
            en: 'We need to give the team some breathing room to ensure long-term work efficiency.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'จาง (หัวหน้างาน) 👨‍💼',
          zh: '小王，我发现你最近有些职业倦怠，开会时总心不在焉。',
          pinyin: 'Xiǎo Wáng, wǒ fāxiàn nǐ zuìjìn yǒuxiē zhíyè juàndài, kāihuì shí zǒng xīnbúzàiyān.',
          th: 'เสี่ยวหวัง ผมสังเกตว่าช่วงนี้คุณมีอาการหมดไฟในการทำงาน เวลาประชุมใจลอยตลอดเลย',
          en: 'Xiao Wang, I noticed you have some job burnout lately, always distracted during meetings.'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวหวัง (วิศวกร) 🧑‍💻',
          zh: '张经理，抱歉。连续加班两个月，我的精力和身体已经严重透支了。',
          pinyin: 'Zhāng jīnglǐ, bàoqiàn. Liánxù jiābān liǎng ge yuè, wǒ de jīnglì yǔ shēntǐ yǐjīng yánzhòng tòuzhī le.',
          th: 'ผู้จัดการจางครับ ขออภัยด้วยครับ ทำงานล่วงเวลาต่อเนื่องมาสองเดือน พลังและร่างกายของผมใช้เกินขีดจำกัดไปมากแล้ว',
          en: 'Manager Zhang, apologies. Working overtime continuously for two months, my energy and body are severely overdrawn.'
        },
        {
          speaker: 'A',
          speaker_name: 'จาง (หัวหน้างาน) 👨‍💼',
          zh: '千万别突破心理防线。与其强撑着降低效率，不如休两天年假调节一下。',
          pinyin: 'Qiānwàn bié tūpò xīnlǐ fángxiàn. Yǐqí qiángchēng zhe jiàngdī xiàolǜ, bùrú xiū liǎng tiān niánjià tiáojié yíxià.',
          th: 'อย่าปล่อยให้ทะลุแนวป้องกันทางจิตใจเด็ดขาด แทนที่จะฝืนทนจนประสิทธิภาพตก สู้ใช้วันลาพักร้อนสองวันไปปรับจูนจิตใจดีกว่า',
          en: 'Never let your mental defense line collapse. Rather than forcing it and dropping efficiency, better take two days annual leave to recharge.'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวหวัง (วิศวกร) 🧑‍💻',
          zh: '非常感谢您的理解，我确实需要一点喘息的时间。',
          pinyin: 'Fēicháng gǎnxiè nín de lǐjiě, wǒ quèshí xūyào yìdiǎn chuǎnxī de shíjiān.',
          th: 'ขอบพระคุณสำหรับความเข้าใจเป็นอย่างยิ่งครับ ผมต้องการเวลาพักหายใจสักนิดจริงๆ ครับ',
          en: 'Thank you very much for your understanding, I truly need some breathing space.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '透支' (tòuzhī) มีความหมายในเชิงการทำงานและสุขภาพอย่างไร?",
          options: [
            'การหักโหมใช้พลังงานหรือร่างกายเกินขีดจำกัด',
            'การได้รับเงินโบนัสพิเศษประจำปี',
            'การเบิกอุปกรณ์สำนักงานใหม่',
            'การตรวจเช็กสต็อกสินค้าคงคลัง'
          ],
          correct_index: 0,
          explanation_th: "'透支' หมายถึง การเบิกใช้ล่วงหน้าเกินวงเงิน หรือการหักโหมใช้กำลังกายจนทรุดโทรม",
          encouragement: 'ยอดเยี่ยมมาก! เลือกคำตอบได้ตรงความหมายเป๊ะ!'
        },
        {
          type: 'flash_recall',
          question_th: "วลี '职业倦怠' (zhíyè juàndài) สอดคล้องกับคำศัพท์ภาษาอังกฤษข้อใด?",
          options: [
            'Job Burnout',
            'Career Promotion',
            'Salary Negotiation',
            'Annual Vacation'
          ],
          correct_index: 0,
          explanation_th: "'职业倦怠' คือสภาวะ Job Burnout หรืออาการหมดไฟในการทำงานนั่นเอง",
          encouragement: 'จำศัพท์วิชาชีพได้แม่นยำมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "แทนที่จะฝืนใช้ร่างกายเกินกำลัง สู้หยุดพักปรับสมดุลดีกว่า"',
          tokens: ['停下来调节', '与其', '盲目透支身体', '不如'],
          correct_sequence: ['与其', '盲目透支身体', '不如', '停下来调节'],
          pinyin: 'Yǐqí mángmù tòuzhī shēntǐ, bùrú tíng xiàlai tiáojié.',
          meaning_th: 'แทนที่จะฝืนใช้ร่างกายเกินกำลัง สู้หยุดพักปรับสมดุลดีกว่า',
          explanation_th: 'โครงสร้าง 与其 A, 不如 B (แทนที่จะทำ A สู้ทำ B ดีกว่า)',
          encouragement: 'เรียงประโยคตรรกะภาษาจีนได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '调节' ตัว '调' (tiáo - ปรับสมดุล) มีหมวดนำใด?",
          options: [
            '讠 (หมวดคำพูด 言字旁)',
            '氵 (หมวดน้ำ 三点水)',
            '火 (หมวดไฟ 火字旁)',
            '金 (หมวดโลหะ 金字旁)'
          ],
          correct_index: 0,
          explanation_th: "'调' มีหมวด '讠' (คำพูด) สื่อถึงการเจรจา ประสาน และปรับข้อตกลงให้เข้าที่",
          encouragement: 'มองทะลุหมวดนำอักษรจีนได้อย่างแม่นยำ!'
        }
      ]
    },
    {
      lesson_id: 't3_u36_l03',
      lesson_number: 3,
      title: {
        zh: '心理疗愈与倾听',
        th: 'การเยียวยาจิตใจและการรับฟังอย่างเข้าใจ',
        en: 'Psychological Healing & Empathetic Listening'
      },
      can_do: {
        th: 'ใช้ทักษะการรับฟัง การเห็นอกเห็นใจ และเข้าใจสำนวน 得不偿失',
        en: 'Practice empathetic listening and understand the idiom 得不偿失'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ใช้สำนวน 得不偿失 เตือนใจ และฝึกประโยคแสดงความเข้าอกเข้าใจผู้อื่น!',
      vocabulary: [
        {
          id: 'hsk3_3611',
          hanzi: '倾听',
          pinyin: 'qīngtīng',
          display_pinyin: 'qīngtīng',
          pinyin_tone: 'qing1ting1',
          meaning_th: 'ตั้งใจรับฟังอย่างลึกซึ้ง',
          meaning_en: 'to listen attentively',
          radical: '亻',
          radical_name_th: 'หมวดคนยืน (单人旁)',
          stroke_count: 17,
          mnemonic: 'เอียงโน้มตัวเข้าหา (倾) เพื่อเงี่ยหูฟังอย่างตั้งใจ (听) = ตั้งใจรับฟัง',
          kid_mnemonic: 'หูฟังสีทองเงี่ยฟังเสียงกระซิบเบาๆ ด้วยรอยยิ้มอบอุ่น = 倾听',
          body_gesture: 'เอามือป้องหลังใบหูแล้วพยักหน้ารับอย่างเข้าใจ'
        },
        {
          id: 'hsk3_3612',
          hanzi: '共情',
          pinyin: 'gòngqíng',
          display_pinyin: 'gòngqíng',
          pinyin_tone: 'gong4qing2',
          meaning_th: 'ความเข้าอกเข้าใจ / การร่วมรู้สึก (Empathy)',
          meaning_en: 'empathy / empathetic',
          radical: '八',
          radical_name_th: 'หมวดแปด (八字头)',
          stroke_count: 17,
          mnemonic: 'ร่วมกัน (共) สัมผัสความรู้สึกและอารมณ์ (情) ของอีกฝ่าย = Empathy',
          kid_mnemonic: 'หัวใจสองดวงส่องแสงเชื่อมต่อกันเป็นสายรุ้ง = 共情',
          body_gesture: 'สองมือกุมเข้าหากันแนบอกส่งพลังความอบอุ่น'
        },
        {
          id: 'hsk3_3613',
          hanzi: '治愈',
          pinyin: 'zhìyù',
          display_pinyin: 'zhìyù',
          pinyin_tone: 'zhi4yu4',
          meaning_th: 'เยียวยา / สมานแผลใจ / ฮีลใจ',
          meaning_en: 'to heal / therapeutic',
          radical: '氵',
          radical_name_th: 'หมวดน้ำ (三点水)',
          stroke_count: 20,
          mnemonic: 'สายน้ำสะอาดบำบัดรักษา (治) ฟื้นฟูจิตใจให้หายดี (愈) = เยียวยา ฮีลใจ',
          kid_mnemonic: 'พลาสเตอร์ยาน่ารักแปะลงบนหัวใจพร้อมดอกไม้ผลิบาน = 治愈',
          body_gesture: 'ลูบหลังมือเบาๆ สื่อถึงการปลอบประโลมเยียวยา'
        },
        {
          id: 'hsk3_3614',
          hanzi: '得不偿失',
          pinyin: 'dé bù cháng shī',
          display_pinyin: 'dé bù cháng shī',
          pinyin_tone: 'de2 bu4 chang2 shi1',
          meaning_th: 'ได้ไม่คุ้มเสีย (สิ่งที่ได้รับมาชดเชยสิ่งที่สูญเสียไปไม่ได้)',
          meaning_en: 'the gains do not make up for the losses',
          radical: '彳',
          radical_name_th: 'หมวดคนเดินคู่ (双人旁)',
          stroke_count: 35,
          mnemonic: 'สิ่งที่ได้มา (得) ไม่อาจ (不) ชดใช้ชดเชย (偿) สิ่งที่เสียไป (失) = ได้ไม่คุ้มเสีย',
          kid_mnemonic: 'ได้เหรียญเงิน 1 เหรียญแต่ทำกระเป๋าสมบัติทองคำหล่นหาย = 得不偿失',
          body_gesture: 'กางมือข้างหนึ่งแบรับเหรียญเล็ก อีกข้างชี้ไปยังของใหญ่ที่หายไปพลางส่ายหัว'
        },
        {
          id: 'hsk3_3615',
          hanzi: '内耗',
          pinyin: 'nèihào',
          display_pinyin: 'nèihào',
          pinyin_tone: 'nei4hao4',
          meaning_th: 'ภาวะคิดวนกัดกร่อนจิตใจตัวเอง / การสูญเสียพลังงานภายใน',
          meaning_en: 'internal friction / emotional overthinking',
          radical: '人',
          radical_name_th: 'หมวดคน (人字头)',
          stroke_count: 14,
          mnemonic: 'อยู่ภายใน (内) กัดกร่อนสิ้นเปลืองพลังงาน (耗) = ภาวะคิดวนกัดกร่อนตัวเอง',
          kid_mnemonic: 'เฟืองนาฬิกาสองตัวข้างในหมุนขัดกันเองจนควันขึ้น = 内耗',
          body_gesture: 'วนนิ้วชี้สองข้างชนกันตรงกลางอกแสดงความขัดแย้งภายใน'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงสำนวน 得不偿失 (dé bù cháng shī)',
        description_th: 'คำว่า 不 อยู่หน้า 偿 (เสียง 2) จึงออกเสียงเป็น bù (เสียง 4) ปกติ ให้เน้นเสียง cháng และ shī ให้ชัดถ้อยชัดคำ',
        example: '为了加班牺牲健康，真是得不偿失！',
        fun_metaphor: 'เหมือนเสียงระฆังเตือนสติ: ได้... ไม่... คุ้ม... เสีย!',
        reassurance: 'สำนวน 4 พยางค์นี้เป็นสำนวนระดับ HSK 5-6 ที่คนจีนใช้ในชีวิตจริงบ่อยมาก จำครั้งเดียวใช้ได้ตลอดชีพ!'
      },
      grammar_bite: {
        title: 'โครงสร้างเตือนสติเชิงเปรียบเทียบ: ...免得得不偿失 (เพื่อจะได้ไม่ต้องได้ไม่คุ้มเสีย)',
        explanation_th: 'ใช้ลงท้ายข้อเสนอแนะเพื่อเตือนสติว่าอย่าทำสิ่งใดจนก่อให้เกิดผลเสียที่รุนแรงกว่า',
        patterns: [
          {
            formula: '千万不要 + [พฤติกรรมเสี่ยง], 免得 + 得不偿失',
            zh: '千万不要为了赚钱而透支身体，免得得不偿失。',
            pinyin: 'Qiānwàn bú yào wèile zhuànqián ér tòuzhī shēntǐ, miǎnde dé bù cháng shī.',
            th: 'อย่าหักโหมใช้ร่างกายเกินขีดจำกัดเพื่อหาเงินเด็ดขาด เพื่อจะได้ไม่ต้องได้ไม่คุ้มเสีย',
            en: 'Never overdraw your health just to make money, lest the losses outweigh the gains.'
          },
          {
            formula: '学会倾听与共情，能够有效减少...',
            zh: '团队学会倾听与共情，能够有效减少无意义的精神内耗。',
            pinyin: 'Tuánduì xuéhuì qīngtīng yǔ gòngqíng, nénggòu yǒuxiào jiǎnshǎo wúyìyì de jīngshén nèihào.',
            th: 'ทีมที่เรียนรู้การรับฟังและเข้าอกเข้าใจ สามารถลดการสูญเสียพลังใจโดยไร้ประโยชน์ได้อย่างมีประสิทธิภาพ',
            en: 'Teams learning to listen and empathize can effectively reduce meaningless mental friction.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลี่ (ที่ปรึกษา) 👩‍💼',
          zh: '其实很多时候，我们内心的焦虑往往来源于不必要的精神内耗。',
          pinyin: 'Qíshí hěn duō shíhou, wǒmen nèixīn de jiāolǜ wǎngwǎng láiyuán yú bú bìyào de jīngshén nèihào.',
          th: 'จริงๆ แล้วหลายครั้ง ความวิตกกังวลในใจของพวกเรามักมาจากความคิดวนกัดกร่อนตัวเองโดยไม่จำเป็น',
          en: 'In fact, often our inner anxiety stems from unnecessary mental friction and overthinking.'
        },
        {
          speaker: 'B',
          speaker_name: 'หวัง (พนักงาน) 🧑‍💼',
          zh: '您说得太对了，我总担心事情做不好，整夜睡不着觉。',
          pinyin: 'Nín shuō de tài duì le, wǒ zǒng dānxīn shìqing zuò bù hǎo, zhěngyè shuì bù zháo jiào.',
          th: 'คุณพูดถูกมากๆ เลยครับ ผมมักกังวลว่างานจะทำออกมาได้ไม่ดี จนแทบนอนไม่หลับทั้งคืน',
          en: 'You are so right, I always worry that things will not go well, unable to sleep all night.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่ (ที่ปรึกษา) 👩‍💼',
          zh: '我们需要学会真诚倾听自己内心的声音，多给自己一些治愈和关怀。',
          pinyin: 'Wǒmen xūyào xuéhuì zhēnchéng qīngtīng zìjǐ nèixīn de shēngyīn, duō gěi zìjǐ yìxiē zhìyù yǔ guānhuái.',
          th: 'พวกเราต้องเรียนรู้ที่จะตั้งใจฟังเสียงข้างในใจตนเองอย่างจริงใจ มอบการเยียวยาและความห่วงใยให้ตัวเองมากขึ้น',
          en: 'We need to learn to genuinely listen to our inner voice and give ourselves more healing and care.'
        },
        {
          speaker: 'B',
          speaker_name: 'หวัง (พนักงาน) 🧑‍💼',
          zh: '是的，拼命工作却把身体拖垮了，那真是得不偿失。',
          pinyin: 'Shì de, pīnmìng gōngzuò què bǎ shēntǐ tuōkuǎ le, nà zhēn shì dé bù cháng shī.',
          th: 'ใช่แล้วครับ ทุ่มเททำงานแทบตายแต่ร่างกายพังทรุดโทรม นั่นเป็นเรื่องที่ได้ไม่คุ้มเสียจริงๆ ครับ',
          en: 'Yes, working desperately only to ruin one\'s health is truly a case of gains not making up for losses.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "สำนวน '得不偿失' (dé bù cháng shī) มีความหมายตรงกับสำนวนไทยข้อใด?",
          options: [
            'ได้ไม่คุ้มเสีย / ได้อย่างเสียอย่างที่ขาดทุนย่อยยับ',
            'น้ำขึ้นให้รีบตัก',
            'ขี่ช้างจับตั๊กแตน',
            'ไก่เห็นตีนงู งูเห็นนมไก่'
          ],
          correct_index: 0,
          explanation_th: "'得不偿失' แปลตรงตัวว่า ได้มาแต่ชดเชยสิ่งที่เสียไปไม่ได้ หรือ 'ได้ไม่คุ้มเสีย'",
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจสำนวนจีนระดับสูงได้อย่างลึกซึ้ง!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '共情' (gòngqíng) สอดคล้องกับแนวคิดทางจิตวิทยาข้อใด?",
          options: [
            'Empathy (ความเข้าอกเข้าใจผู้อื่นอย่างแท้จริง)',
            'Competition (การแข่งขันชิงดี)',
            'Isolation (การแยกตัวอยู่อย่างโดดเดี่ยว)',
            'Denial (การปฏิเสธความจริง)'
          ],
          correct_index: 0,
          explanation_th: "'共情' คือความสามารถในการรับรู้และเข้าใจความรู้สึกของผู้อื่น (Empathy)",
          encouragement: 'จำคำศัพท์จิตวิทยาและการสื่อสารได้เฉียบคมมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "อย่าหักโหมใช้ร่างกายเกินขีดจำกัดเพื่อหาเงิน เพื่อจะได้ไม่ต้องได้ไม่คุ้มเสีย"',
          tokens: ['免得得不偿失', '千万不要', '为了赚钱', '透支身体'],
          correct_sequence: ['千万不要', '为了赚钱', '透支身体', '免得得不偿失'],
          pinyin: 'Qiānwàn bú yào wèile zhuànqián tòuzhī shēntǐ, miǎnde dé bù cháng shī.',
          meaning_th: 'อย่าใช้ร่างกายเกินกำลังเพื่อหาเงิน เพื่อจะได้ไม่ต้องได้ไม่คุ้มเสีย',
          explanation_th: 'โครงสร้าง 千万不要... + 免得得不偿失',
          encouragement: 'เก่งกาจมาก! ประกอบประโยคสุภาษิตได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '倾听' ตัว '倾' (qīng - โน้มเอียง/ตั้งใจ) มีหมวดนำใด?",
          options: [
            '亻 (หมวดคน 单人旁)',
            '木 (หมวดไม้ 木字旁)',
            '日 (หมวดดวงอาทิตย์ 日字旁)',
            '月 (หมวดดวงจันทร์ 月字旁)'
          ],
          correct_index: 0,
          explanation_th: "'倾' มีหมวด '亻' (คน) สื่อถึงท่าทางของคนที่โน้มตัวเอียงเข้าไปใกล้เพื่อตั้งใจฟัง",
          encouragement: 'เข้าใจลึกซึ้งถึงรากศัพท์และสรีระท่าทาง!'
        }
      ]
    },
    {
      lesson_id: 't3_u36_l04',
      lesson_number: 4,
      title: {
        zh: '寻求专业帮助与平衡',
        th: 'การขอรับคำปรึกษาและสร้างสมดุลชีวิต',
        en: 'Professional Counseling & Work-Life Harmony'
      },
      can_do: {
        th: 'ขอรับคำปรึกษาทางจิตวิทยาและนำเสนอแนวทางการสร้างสมดุลชีวิตกับการทำงาน',
        en: 'Seek counseling and advocate work-life harmony'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สนทนาเรื่องการปรึกษาผู้เชี่ยวชาญ และพิชิต Boss Challenge สรุปกลยุทธ์สุขภาวะองค์กร!',
      vocabulary: [
        {
          id: 'hsk3_3616',
          hanzi: '心理咨询',
          pinyin: 'xīnlǐ zīxún',
          display_pinyin: 'xīnlǐ zīxún',
          pinyin_tone: 'xin1li3 zi1xun2',
          meaning_th: 'การให้คำปรึกษาทางจิตวิทยา',
          meaning_en: 'psychological counseling',
          radical: '忄',
          radical_name_th: 'หมวดหัวใจ (竖心旁)',
          stroke_count: 31,
          mnemonic: 'หลักการทางจิตใจ (心理) ร่วมปรึกษาหารืออย่างรอบคอบ (咨询) = ปรึกษาจิตวิทยา',
          kid_mnemonic: 'เก้าอี้โซฟานุ่มในห้องอบอุ่นที่มีผู้เชี่ยวชาญนั่งคุยรับฟังอย่างใจดี = 心理咨询',
          body_gesture: 'สองมือทำท่าผายออกข้างหน้าเหมือนเชิญให้นั่งคุยเปิดใจ'
        },
        {
          id: 'hsk3_3617',
          hanzi: '疏导',
          pinyin: 'shūdǎo',
          display_pinyin: 'shūdǎo',
          pinyin_tone: 'shu1dao3',
          meaning_th: 'ระบายอารมณ์ / ปลดเปลื้องและแนะแนวทาง',
          meaning_en: 'to channel / to guide emotions',
          radical: '疋',
          radical_name_th: 'หมวดเท้า (疋字旁)',
          stroke_count: 18,
          mnemonic: 'ขุดลอกระบายสิ่งที่อุดตัน (疏) นำทางน้ำให้ไหลสะดวก (导) = ปลดเปลื้องแนะทาง',
          kid_mnemonic: 'เปิดทางน้ำที่ติดขัดให้สายน้ำใสไหลเอื่อยอย่างราบรื่น = 疏导',
          body_gesture: 'กวาดมือเป็นคลื่นช้าๆ จากอกออกไปข้างหน้าแสดงความโล่งโปร่ง'
        },
        {
          id: 'hsk3_3618',
          hanzi: '平衡',
          pinyin: 'pínghéng',
          display_pinyin: 'pínghéng',
          pinyin_tone: 'ping2heng2',
          meaning_th: 'ความสมดุล / ดุลยภาพ',
          meaning_en: 'balance / equilibrium',
          radical: '干',
          radical_name_th: 'หมวดกาน (干字旁)',
          stroke_count: 21,
          mnemonic: 'ราบเรียบเสมอกัน (平) ด้วยคานชั่งที่เที่ยงตรง (衡) = สมดุล ดุลยภาพ',
          kid_mnemonic: 'ตาชั่งโบราณที่มีลูกตุ้มสองข้างอยู่ในระนาบเดียวกันเป๊ะ = 平衡',
          body_gesture: 'กางแขนสองข้างออกระนาบเดียวกับไหล่เหมือนปีกนกที่ทรงตัวนิ่ง'
        },
        {
          id: 'hsk3_3619',
          hanzi: '韧性',
          pinyin: 'rènxìng',
          display_pinyin: 'rènxìng',
          pinyin_tone: 'ren4xing4',
          meaning_th: 'ความยืดหยุ่นทางจิตใจ / พลังฟื้นตัวจากวิกฤต (Resilience)',
          meaning_en: 'resilience / toughness',
          radical: '韦',
          radical_name_th: 'หมวดแผ่นหนัง (韦字旁)',
          stroke_count: 15,
          mnemonic: 'เหนียวแน่นทนทานดั่งหนังแท้ (韧) ผสานคุณสมบัติทางใจ (性) = พลังฟื้นตัวยืดหยุ่น',
          kid_mnemonic: 'ต้นไผ่เขียวที่ลู่ลมตามพายุแล้วดีดตัวกลับมาตั้งตรงอย่างสง่างาม = 韧性',
          body_gesture: 'กำหมัดแนบเอวแล้วยืดอกขึ้นแสดงความแข็งแกร่งยืดหยุ่น'
        },
        {
          id: 'hsk3_3620',
          hanzi: '可持续',
          pinyin: 'kěchíxù',
          display_pinyin: 'kěchíxù',
          pinyin_tone: 'ke3chi2xu4',
          meaning_th: 'ยั่งยืน / คงอยู่ได้อย่างต่อเนื่อง',
          meaning_en: 'sustainable / sustainability',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 25,
          mnemonic: 'สามารถ (可) ถือยึดมั่นรักษาไว้ (持) และดำเนินต่อไปไม่ขาดสาย (续) = ยั่งยืน',
          kid_mnemonic: 'ต้นไม้ผลิดอกออกผลวนเวียนตามฤดูกาลไม่รู้จบ = 可持续',
          body_gesture: 'สองมือประสานหมุนเป็นวงกลมต่อเนื่องแสดงความยั่งยืน'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 平衡 (pínghéng) เสียง 2 คู่ต่อเนื่อง',
        description_th: 'píng และ héng ล้วนเป็นเสียง 2 ให้ไล่ระดับเสียงจากกลางขึ้นสูงอย่างนุ่มนวลทั้งสองพยางค์',
        example: '工作与生活平衡 (gōngzuò yǔ shēnghuó pínghéng: สมดุลชีวิตและการทำงาน)',
        fun_metaphor: 'เหมือนพายเรือทวนคลื่นเบาๆ สองระลอก ฮึบ... ฮึบ!',
        reassurance: 'ไม่ต้องเกร็งคอ ปล่อยเสียงให้กังวานโล่งสบาย'
      },
      grammar_bite: {
        title: 'โครงสร้างการบรรลุเป้าหมายระยะยาว: 唯有...，才能实现可持续的... (มีเพียงแต่... เท่านั้น จึงจะบรรลุความยั่งยืน...)',
        explanation_th: 'ใช้ในการเสนอแนะเชิงกลยุทธ์ทั้งในระดับบุคคลและระดับนโยบายองค์กร',
        patterns: [
          {
            formula: '唯有 + [การปรับสมดุล], 才能实现 + 可持续的 + [เป้าหมาย]',
            zh: '唯有保持心理健康，才能实现个人职业的可持续发展。',
            pinyin: 'Wéiyǒu bǎochí xīnlǐ jiànkāng, cái néng shíxiàn gèrén zhíyè de kěchíxù fāzhǎn.',
            th: 'มีเพียงแต่การรักษาสุขภาพจิตที่ดีเท่านั้น จึงจะบรรลุการพัฒนาอาชีพการงานที่ยั่งยืนได้',
            en: 'Only by maintaining mental health can one achieve sustainable career development.'
          },
          {
            formula: '在...中培养心理韧性',
            zh: '我们要在挑战中培养心理韧性，积极面对各种变化。',
            pinyin: 'Wǒmen yào zài tiǎozhàn zhōng péiyǎng xīnlǐ rènxìng, jījí miànduì gè zhǒng biànhuà.',
            th: 'พวกเราต้องบ่มเพาะความยืดหยุ่นทางจิตใจท่ามกลางความท้าทาย เพื่อเผชิญหน้ากับการเปลี่ยนแปลงอย่างกระตือรือร้น',
            en: 'We need to cultivate mental resilience amidst challenges to actively face various changes.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'ผู้เชี่ยวชาญด้านสุขภาวะ 👩‍⚕️',
          zh: '欢迎来到心理咨询室，今天我们来聊聊如何建立工作与生活的平衡。',
          pinyin: 'Huānyíng láidào xīnlǐ zīxúnshì, jīntiān wǒmen lái liáoliao rúhé jiànlì gōngzuò yǔ shēnghuó de pínghéng.',
          th: 'ยินดีต้อนรับสู่ห้องให้คำปรึกษาทางจิตวิทยาค่ะ วันนี้เรามาคุยกันเรื่องการสร้างสมดุลระหว่างงานกับชีวิตส่วนตัวนะคะ',
          en: 'Welcome to the psychological counseling room, today let us talk about how to establish work-life balance.'
        },
        {
          speaker: 'B',
          speaker_name: 'หลี่ (พนักงาน) 🧑‍💼',
          zh: '老师好，我经常感到情绪无法疏导，不知道该怎么提升自己的心理韧性。',
          pinyin: 'Lǎoshī hǎo, wǒ jīngcháng gǎndào qíngxù wúfǎ shūdǎo, bù zhīdào gāi zěnme tíshēng zìjǐ de xīnlǐ rènxìng.',
          th: 'สวัสดีครับอาจารย์ ผมมักรู้สึกว่าระบายอารมณ์ไม่ถูกทาง และไม่รู้ว่าจะเสริมสร้างพลังฟื้นตัวทางใจของตนเองได้อย่างไร',
          en: 'Hello counselor, I often feel unable to channel my emotions and do not know how to boost my mental resilience.'
        },
        {
          speaker: 'A',
          speaker_name: 'ผู้เชี่ยวชาญด้านสุขภาวะ 👩‍⚕️',
          zh: '遇到压力时学会及时疏导非常关键。记住，健康是1，其他成就都是后面的0。',
          pinyin: 'Yùdào yālì shí xuéhuì jíshí shūdǎo fēicháng guānjiàn. Jìzhù, jiànkāng shì yī, qítā chéngjiù dōu shì hòumiàn de líng.',
          th: 'เมื่อพบเจอแรงกดดัน การเรียนรู้ที่จะปลดเปลื้องระบายอารมณ์อย่างทันท่วงทีสำคัญมากค่ะ จำไว้นะคะ สุขภาพคือเลข 1 ความสำเร็จอื่นๆ ล้วนเป็นเลข 0 ที่ตามหลัง',
          en: 'Learning to channel emotions timely when stressed is crucial. Remember, health is the 1, other achievements are the zeros behind it.'
        },
        {
          speaker: 'B',
          speaker_name: 'หลี่ (พนักงาน) 🧑‍💼',
          zh: '我明白了，唯有身心健康，工作和生活才能真正实现可持续发展！',
          pinyin: 'Wǒ míngbai le, wéiyǒu shēnxīn jiànkāng, gōngzuò yǔ shēnghuó cái néng zhēnzhèng shíxiàn kěchíxù fāzhǎn!',
          th: 'ผมเข้าใจกระจ่างแล้วครับ มีเพียงกายและใจที่สมบูรณ์เท่านั้น งานและชีวิตจึงจะบรรลุความยั่งยืนได้อย่างแท้จริง!',
          en: 'I understand now, only with a healthy body and mind can work and life truly achieve sustainable development!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '心理韧性' (xīnlǐ rènxìng) มีความหมายตรงกับข้อใด?",
          options: [
            'พลังฟื้นตัวและความยืดหยุ่นทางจิตใจ (Resilience)',
            'ความดื้อรั้นเอาแต่ใจ',
            'ความเฉยเมยต่อโลกภายนอก',
            'ความทะเยอทะยานทางการเงิน'
          ],
          correct_index: 0,
          explanation_th: "'心理韧性' หมายถึง ความยืดหยุ่นทางจิตใจ ความสามารถในการปรับตัวและฟื้นคืนจากภาวะวิกฤต",
          encouragement: 'ถูกต้องยอดเยี่ยม! จับแนวคิดจิตวิทยาเชิงบวกได้เป๊ะมาก!'
        },
        {
          type: 'flash_recall',
          question_th: "ประโยค '工作与生活平衡' หมายถึงอะไร?",
          options: [
            'ความสมดุลระหว่างการทำงานและการใช้ชีวิต (Work-Life Balance)',
            'การทำงานหนักตลอด 24 ชั่วโมง',
            'การลาออกจากงานเพื่ออยู่บ้านเฉยๆ',
            'การเปลี่ยนงานบ่อยทุกสามเดือน'
          ],
          correct_index: 0,
          explanation_th: "'工作与生活平衡' คือแนวคิดความสมดุลระหว่างชีวิตการทำงานและชีวิตส่วนตัว (Work-Life Balance)",
          encouragement: 'แม่นยำมาก! ใช้ภาษาจีนสื่อสารประเด็นร่วมสมัยได้อย่างคล่องแคล่ว!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "มีเพียงรักษาสุขภาพจิตที่ดี จึงจะบรรลุการพัฒนาที่ยั่งยืน"',
          tokens: ['可持续发展', '唯有保持心理健康', '才能实现'],
          correct_sequence: ['唯有保持心理健康', '才能实现', '可持续发展'],
          pinyin: 'Wéiyǒu bǎochí xīnlǐ jiànkāng, cái néng shíxiàn kěchíxù fāzhǎn.',
          meaning_th: 'มีเพียงรักษาสุขภาพจิตที่ดี จึงจะบรรลุการพัฒนาที่ยั่งยืนได้',
          explanation_th: 'โครงสร้าง 唯有... + 才能实现...',
          encouragement: 'เรียงประโยคภาษาทางการได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '平衡' ตัว '平' (píng - ราบเรียบ/เสมอภาค) มีความหมายแฝงถึงสิ่งใด?",
          options: [
            'ความราบเรียบ เสมอภาค และไร้ความขัดแย้งเอนเอียง',
            'ความร้อนแรงดั่งเปลวไฟ',
            'ความลึกดั่งมหาสมุทร',
            'ความรวดเร็วดั่งสายฟ้า'
          ],
          correct_index: 0,
          explanation_th: "'平' สื่อถึงความราบเรียบ เที่ยงตรง อยู่ในระนาบที่เสมอกันและมั่นคง",
          encouragement: 'เข้าใจลึกซึ้งถึงความหมายเชิงสัญลักษณ์ของอักษรจีน!'
        }
      ],
      boss_challenge: {
        scenario_th: 'ในการประชุมผู้บริหารระดับสูงเพื่อกำหนดนโยบายสุขภาวะพนักงาน (Employee Well-being) ซีอีโอถามว่า "เหตุใดบริษัทจึงควรสนับสนุนให้พนักงานมี Work-Life Balance และบริการปรึกษาจิตวิทยา?" คุณควรตอบอย่างไรให้เป็นมืออาชีพ?',
        options: [
          '唯有关注员工的心理健康与情绪疏导，避免过度透支与得不偿失，才能建立强大的心理韧性，实现企业与个人的可持续共赢！ (Wéiyǒu guānzhù yuángōng de xīnlǐ jiànkāng yǔ qíngxù shūdǎo, bìmiǎn guòdù tòuzhī yǔ dé bù cháng shī, cái néng jiànlì qiángdà de xīnlǐ rènxìng, shíxiàn qǐyè yǔ gèrén de kěchíxù gòngyíng!)',
          '因为别的公司都发下午茶，我们如果不发就很没有面子。 (Yīnwèi bié de gōngsī dōu fā xiàwǔchá, wǒmen rúguǒ bù fā jiù hěn méiyǒu miànzi.)',
          '员工累了就让他们直接辞职，再招新人就可以了。 (Yuángōng lèi le jiù ràng tāmen zhíjiē cízhí, zài zhāo xīnrén jiù kěyǐ le.)',
          '请问今天食堂中午吃什么菜？ (Qǐngwèn jīntiān shítáng zhōngwǔ chī shénme cài?)'
        ],
        correct_index: 0,
        explanation_th: "คำตอบ '唯有关注员工的心理健康...实现企业与个人的可持续共赢！' ครอบคลุมทั้งการป้องกันการสูญเสีย (得不偿失), การเสริมพลังใจ (心理韧性), และความยั่งยืนขององค์กร (可持续) ได้อย่างลึกซึ้งและเฉียบคมที่สุด",
        encouragement: 'ยินดีด้วย! คุณพิชิต Boss Challenge ได้รับการยอมรับจากคณะผู้บริหารระดับสูงสุด!'
      },
      cheer_trophy: {
        badge_id: 'badge_t3_u36_master',
        badge_name: 'ผู้เชี่ยวชาญสุขภาวะจิตและดุลยภาพแห่งชีวิต 🌿🧘‍♂️',
        message_th: 'สุดยอดมาก! คุณได้พิชิตบทเรียนยูนิตที่ 36 สำเร็จอย่างงดงาม เชี่ยวชาญศัพท์อารมณ์ สุขภาพจิต ภาวะหมดไฟ และสมดุลชีวิตระดับ Master!',
        xp_reward: 300
      }
    }
  ]
};
