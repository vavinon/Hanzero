/**
 * scripts/tier2_batch_b/unit17.ts
 * Tier 2 Unit 17: 看病与买药进阶 (Advanced Clinic & Pharmacy)
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

export const unit17 = {
  unit_id: 'tier2_u17',
  tier: 2,
  unit_number: 17,
  title: {
    zh: '看病与买药进阶',
    th: 'พบแพทย์ & แจ้งอาการละเอียด',
    en: 'Advanced Clinic & Pharmacy'
  },
  description: 'พบแพทย์ที่โรงพยาบาลในจีนอย่างมั่นใจ ทำบัตรคิวตรวจ triage อธิบายอาการป่วยเชิงลึกด้วย Potential Complements (กินไม่ลง/ทนไม่ไหว) และเข้าใจคำแนะนำการทานยาของเภสัชกร',
  lessons: [
    {
      lesson_id: 't2_u17_l01',
      lesson_number: 1,
      title: {
        zh: '挂号与科室',
        th: 'ลงทะเบียนตรวจโรค & แผนกแพทย์',
        en: 'Registration & Departments'
      },
      can_do: {
        th: 'ลงทะเบียนทำบัตรตรวจ เลือกแผนกตรวจโรค (内科) และปฏิบัติตามลำดับขั้นตอนด้วยโครงสร้าง 先...然后...',
        en: 'Register for hospital triage, select medical departments, and follow sequence using 先...然后...'
      },
      baby_step_goal: 'เป้าหมายวันนี้: เดินไปที่ตู้บริการหรือเคาน์เตอร์คัดกรอง บอกอาการปวดท้อง และลงทะเบียนแผนกอายุรกรรมได้สำเร็จ!',
      vocabulary: [
        {
          id: 'hsk2_1701',
          hanzi: '挂号',
          pinyin: 'guàhào',
          display_pinyin: 'guàhào',
          pinyin_tone: 'gua4hao4',
          meaning_th: 'ลงทะเบียนตรวจโรค / ทำบัตรคิวพบแพทย์',
          meaning_en: 'to register at a hospital',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 14,
          mnemonic: 'ใช้มือ (扌) แขวนป้ายเบอร์คิวตรวจของโรงพยาบาล (号) = ลงทะเบียนตรวจโรค',
          kid_mnemonic: 'ยื่นพาสปอร์ตแตะตู้คัดกรอง เครื่องปริ้นต์บัตรคิวตัวเลขยาวๆ = 挂号',
          body_gesture: 'ยื่นสองมือทำท่าแตะบัตรแล้วดึงสลิปบัตรคิวออกมา'
        },
        {
          id: 'hsk2_1702',
          hanzi: '门诊',
          pinyin: 'ménzhěn',
          display_pinyin: 'ménzhěn',
          pinyin_tone: 'men2zhen3',
          meaning_th: 'แผนกผู้ป่วยนอก (OPD)',
          meaning_en: 'outpatient service',
          radical: '门',
          radical_name_th: 'หมวดประตู (门字框)',
          stroke_count: 12,
          mnemonic: 'เดินเข้าสู่ประตูโรงพยาบาล (门) เพื่อรับการตรวจวินิจฉัยโรค (诊) = แผนกผู้ป่วยนอก',
          kid_mnemonic: 'เดินผ่านประตูใหญ่เข้าไปตรวจสุขภาพ ไม่ต้องนอนค้างคืน = 门诊',
          body_gesture: 'ผายมือชี้เข้าประตูห้องตรวจอย่างสุภาพ'
        },
        {
          id: 'hsk2_1703',
          hanzi: '内科',
          pinyin: 'nèikē',
          display_pinyin: 'nèikē',
          pinyin_tone: 'nei4ke1',
          meaning_th: 'แผนกอายุรกรรม (โรคภายใน)',
          meaning_en: 'internal medicine department',
          radical: '冂',
          radical_name_th: 'หมวดกรอบล่างเปิด (同字框)',
          stroke_count: 13,
          mnemonic: 'ตรวจรักษาอวัยวะข้างในร่างกาย (内) ตามหมวดหมู่วิทยาการแพทย์ (科) = แผนกอายุรกรรม',
          kid_mnemonic: 'ปวดกระเพาะ เจ็บหน้าอก คุณหมอตรวจอวัยวะข้างใน = 内科',
          body_gesture: 'เอามือกุมท้องและหน้าอกเพื่อชี้อวัยวะภายใน'
        },
        {
          id: 'hsk2_1704',
          hanzi: '候诊',
          pinyin: 'hòuzhěn',
          display_pinyin: 'hòuzhěn',
          pinyin_tone: 'hou4zhen3',
          meaning_th: 'นั่งรอพบแพทย์ / รอเรียกคิวตรวจ',
          meaning_en: 'waiting for medical consultation',
          radical: '亻',
          radical_name_th: 'หมวดคน (单人旁)',
          stroke_count: 19,
          mnemonic: 'คนไข้นั่งรอคอยอย่างใจเย็น (候) เพื่อรอหมอเรียกเข้าตรวจ (诊) = นั่งรอพบแพทย์',
          kid_mnemonic: 'นั่งเก้าอี้มองหน้าจอดิจิทัล รอชื่อขึ้นหน้าห้องตรวจ = 候诊',
          body_gesture: 'ประสานมือนั่งตัวตรงมองหน้าจออย่างตั้งใจ'
        },
        {
          id: 'hsk2_1705',
          hanzi: '专家号',
          pinyin: 'zhuānjiāhào',
          display_pinyin: 'zhuānjiāhào',
          pinyin_tone: 'zhuan1jia1hao4',
          meaning_th: 'คิวตรวจแพทย์ผู้เชี่ยวชาญระดับอาจารย์หมอ',
          meaning_en: 'specialist appointment / queue',
          radical: '寸',
          radical_name_th: 'หมวดนิ้วฟุต (寸字旁)',
          stroke_count: 19,
          mnemonic: 'คิวบัตรตรวจ (号) สำหรับพบแพทย์ผู้เชี่ยวชาญเฉพาะทางระดับปรมาจารย์ (专家) = คิวแพทย์เชี่ยวชาญ',
          kid_mnemonic: 'บัตรทองคำพบคุณหมอเก่งระดับอาจารย์ ตรวจละเอียดเป๊ะ = 专家号',
          body_gesture: 'ชูนิ้วโป้งระดับสายตาแล้วพยักหน้าชื่นชม'
        },
        {
          id: 'hsk2_1706',
          hanzi: '导医台',
          pinyin: 'dǎoyītái',
          display_pinyin: 'dǎoyītái',
          pinyin_tone: 'dao3yi1tai2',
          meaning_th: 'โต๊ะประชาสัมพันธ์คัดกรองผู้ป่วย',
          meaning_en: 'hospital triage / information desk',
          radical: '寸',
          radical_name_th: 'หมวดนิ้วฟุต (寸字旁)',
          stroke_count: 18,
          mnemonic: 'โต๊ะเคาน์เตอร์ (台) ที่มีพยาบาลคอยนำทางแนะนำการหาหมอ (导医) = โต๊ะประชาสัมพันธ์คัดกรอง',
          kid_mnemonic: 'เคาน์เตอร์พยาบาลชุดขาวหน้าประตู คอยบอกว่าต้องไปห้องไหน = 导医台',
          body_gesture: 'ผายมือบอกทิศทางอย่างนุ่มนวล'
        }
      ],
      tone_rule: {
        rule_name: 'โครงสร้างลำดับขั้นตอนในโรงพยาบาล: 先...然后...',
        description_th: 'ใช้ 先 (xiān) ตามด้วยขั้นตอนแรก และ 然后 (ránhòu) ตามด้วยขั้นตอนถัดไป เพื่ออธิบายลำดับการทำบัตรและเข้าตรวจ',
        example: '先挂号，然后去候诊区 (Xiān guàhào, ránhòu qù hòuzhěnqū)',
        fun_metaphor: 'เหมือนต่อรถไฟสองตู้! ตู้แรก 先 นำขบวน ตู้สอง 然后 วิ่งตามติดๆ!',
        reassurance: 'คำว่า 挂号 (guàhào) วรรณยุกต์เสียง 4 คู่กัน ออกเสียงกระชับมั่นใจได้เลย!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้ลำดับขั้นตอน: 先...然后... และการถามแผนกตรวจ',
        explanation_th: 'สอบถามว่าอาการแบบนี้ควรลงทะเบียนแผนกใด และปฏิบัติตามคำแนะนำตามลำดับ',
        patterns: [
          {
            formula: '先 + [กริยาขั้นแรก] + 然后 + [กริยาขั้นถัดไป]',
            zh: '请先在机器上挂号，然后去二楼候诊。',
            pinyin: 'Qǐng xiān zài jīqì shang guàhào, ránhòu qù èr lóu hòuzhěn.',
            th: 'กรุณาลงทะเบียนที่ตู้ก่อน จากนั้นค่อยขึ้นไปรอตรวจที่ชั้นสองครับ',
            en: 'Please register on the machine first, then go to the second floor to wait.'
          },
          {
            formula: '请问 + [อาการ] + 该挂什么科？',
            zh: '请问肚子疼该挂什么科？',
            pinyin: 'Qǐngwèn dùzi téng gāi guà shénme kē?',
            th: 'ขอถามหน่อยครับ ปวดท้องควรลงทะเบียนแผนกไหนครับ?',
            en: 'Excuse me, which department should I register for stomach ache?'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '护士您好！我肚子疼得很厉害，请问在导医台该怎么办理挂号？',
          pinyin: 'Hùshi nín hǎo! Wǒ dùzi téng de hěn lìhai, qǐngwèn zài dǎoyītái gāi zěnme bànlǐ guàhào?',
          th: 'สวัสดีครับคุณพยาบาล! ผมปวดท้องรุนแรงมาก ขอถามหน่อยครับที่เคาน์เตอร์คัดกรองต้องทำเรื่องลงทะเบียนอย่างไรครับ?',
          en: 'Hello nurse! My stomach hurts badly, how should I register at the triage desk?'
        },
        {
          speaker: 'B',
          speaker_name: 'พยาบาลคัดกรอง 👩‍⚕️',
          zh: '肚子疼请挂消化内科。您先在自助机上刷护照挂号，然后去三楼门诊候诊区等叫号。',
          pinyin: 'Dùzi téng qǐng guà xiāohuà nèikē. Nín xiān zài zìzhùjī shang shuā hùzhào guàhào, ránhòu qù sān lóu ménzhěn hòuzhěnqū děng jiàohào.',
          th: 'ปวดท้องกรุณาลงทะเบียนแผนกอายุรกรรมทางเดินอาหารค่ะ คุณนำพาสปอร์ตไปสแกนทำบัตรคิวที่ตู้บริการตนเองก่อน จากนั้นค่อยขึ้นไปนั่งรอเรียกคิวที่ชั้น 3 ค่ะ',
          en: 'For stomach pain please register for gastroenterology. First scan your passport on the self-service machine, then go to the 3rd floor outpatient waiting area to wait for your number.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '请问现在有专家号吗？还是只能挂普通门诊？',
          pinyin: 'Qǐngwèn xiànzài yǒu zhuānjiāhào ma? Háishi zhǐ néng guà pǔtōng ménzhěn?',
          th: 'ขอถามหน่อยครับตอนนี้มีคิวแพทย์ผู้เชี่ยวชาญไหมครับ หรือว่าลงได้เฉพาะตรวจทั่วไป?',
          en: 'Excuse me, is there a specialist queue now? Or only general outpatient?'
        },
        {
          speaker: 'B',
          speaker_name: 'พยาบาลคัดกรอง 👩‍⚕️',
          zh: '今天上午还有两位消化内科专家的号，我帮您在机器上选专家号。',
          pinyin: 'Jīntiān shàngwǔ hái yǒu liǎng wèi xiāohuà nèikē zhuānjiā de hào, wǒ bāng nín zài jīqì shang xuǎn zhuānjiāhào.',
          th: 'เช้าวันนี้ยังมีคิวแพทย์เชี่ยวชาญทางเดินอาหาร 2 คิวค่ะ เดี๋ยวฉันช่วยกดเลือกคิวผู้เชี่ยวชาญที่ตู้ให้นะคะ',
          en: 'There are still two slots for gastroenterology specialists this morning, I will help you select the specialist queue on the machine.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อพยาบาลบอกว่า '请挂消化内科' หมายถึงให้ไปลงทะเบียนแผนกใด?",
          options: [
            'แผนกอายุรกรรมทางเดินอาหาร',
            'แผนกศัลยกรรมกระดูก',
            'แผนกตา หู คอ จมูก',
            'แผนกทันตกรรมทำฟัน'
          ],
          correct_index: 0,
          explanation_th: "'内科' คือ แผนกอายุรกรรม และ '消化' คือ ทางเดินอาหาร/ย่อยอาหาร จึงหมายถึง แผนกอายุรกรรมทางเดินอาหาร",
          encouragement: 'เข้าใจคำศัพท์แผนกการแพทย์ในโรงพยาบาลจีนได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '门' ในคำว่า '门诊' (แผนกผู้ป่วยนอก) มีความหมายดั้งเดิมตรงกับข้อใด?",
          options: [
            'ประตูทางเข้า',
            'เข็มฉีดยา',
            'เตียงนอนคนไข้',
            'ใบสั่งยา'
          ],
          correct_index: 0,
          explanation_th: "'门' แปลว่า ประตู สื่อถึงการตรวจที่ห้องตรวจบริเวณด้านหน้าประตูใหญ่โดยไม่ต้องนอนแอดมิท",
          encouragement: 'เข้าใจรากศัพท์อักษร 门 ได้อย่างแจ่มแจ้ง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ลงทะเบียนก่อน จากนั้นค่อยไปนั่งรอตรวจ"',
          tokens: ['然后去候诊', '先挂号'],
          correct_sequence: ['先挂号', '然后去候诊'],
          pinyin: 'Xiān guàhào, ránhòu qù hòuzhěn',
          meaning_th: 'ลงทะเบียนก่อน จากนั้นค่อยไปนั่งรอตรวจ',
          explanation_th: 'ขั้นแรก (先挂号) + ขั้นถัดไป (然后去候诊)',
          encouragement: 'เรียงลำดับขั้นตอนโรงพยาบาลได้คล่องแคล่วมาก!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '候诊' (hòuzhěn) มีความหมายตรงกับข้อใด?",
          options: [
            'นั่งรอพบแพทย์',
            'จ่ายเงินค่ายา',
            'ตรวจเลือด',
            'กลับบ้าน'
          ],
          correct_index: 0,
          explanation_th: "'候诊' แปลว่า นั่งรอรับการตรวจ (候 = รอคอย, 诊 = ตรวจรักษา)",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์การแพทย์จำได้แม่นยำ!'
        }
      ]
    },
    {
      lesson_id: 't2_u17_l02',
      lesson_number: 2,
      title: {
        zh: '描述详细病情',
        th: 'แจ้งอาการป่วยเชิงลึก',
        en: 'Nuanced Symptoms'
      },
      can_do: {
        th: 'อธิบายอาการป่วยอย่างละเอียดโดยใช้ Potential Complements (吃得下/吃不下/好不了/受不了) และ 越来越...',
        en: 'Describe symptoms in detail using Potential Complements and 越来越...'
      },
      baby_step_goal: 'เป้าหมายวันนี้: บรรยายอาการให้แพทย์ฟังได้ชัดเจนว่า "กินอะไรไม่ลง อาเจียน และปวดท้องจนทนไม่ไหว"!',
      vocabulary: [
        {
          id: 'hsk2_1707',
          hanzi: '拉肚子',
          pinyin: 'lādùzi',
          display_pinyin: 'lādùzi',
          pinyin_tone: 'la1du4zi',
          meaning_th: 'ท้องเสีย / ถ่ายท้อง',
          meaning_en: 'to have diarrhea',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 18,
          mnemonic: 'มือดึงลากระบาย (拉) ของเสียออกจากท้องไส้ (肚子) = ท้องเสีย',
          kid_mnemonic: 'วิ่งเข้าห้องน้ำกุมท้อง ทำหน้าบิดเบี้ยว = 拉肚子',
          body_gesture: 'กุมท้องสองข้างทำหน้าเหยเกเหมือนวิ่งหาห้องน้ำ'
        },
        {
          id: 'hsk2_1708',
          hanzi: '恶心',
          pinyin: 'ěxin',
          display_pinyin: 'ěxin',
          pinyin_tone: 'e3xin',
          meaning_th: 'คลื่นไส้ / พะอืดพะอม',
          meaning_en: 'nauseous / to feel sick',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 14,
          mnemonic: 'ในจิตใจและลำคอ (心) รู้สึกแย่ปั่นป่วนจนอยากอาเจียน (恶) = คลื่นไส้',
          kid_mnemonic: 'กลืนไม่เข้าคายไม่ออก เอามือปิดปากจะอาเจียน = 恶心',
          body_gesture: 'เอามือทาบคอหอยทำหน้าพะอืดพะอม'
        },
        {
          id: 'hsk2_1709',
          hanzi: '胃',
          pinyin: 'wèi',
          display_pinyin: 'wèi',
          pinyin_tone: 'wei4',
          meaning_th: 'กระเพาะอาหาร',
          meaning_en: 'stomach',
          radical: '月',
          radical_name_th: 'หมวดเนื้อหนัง (月字旁)',
          stroke_count: 9,
          mnemonic: 'อวัยวะเนื้อหนัง (月) มีรูปร่างคล้ายแปลงนาบ่มเพาะอาหาร (田) = กระเพาะอาหาร',
          kid_mnemonic: 'ชี้ที่ท้องตรงใต้ลิ้นปี่ กระเพาะอาหารย่อยของกิน = 胃',
          body_gesture: 'เอามือกดที่ใต้ลิ้นปี่ตำแหน่งกระเพาะอาหาร'
        },
        {
          id: 'hsk2_1710',
          hanzi: '症状',
          pinyin: 'zhèngzhuàng',
          display_pinyin: 'zhèngzhuàng',
          pinyin_tone: 'zheng4zhuang4',
          meaning_th: 'อาการของโรค',
          meaning_en: 'symptom',
          radical: '疒',
          radical_name_th: 'หมวดโรคภัย (病字旁)',
          stroke_count: 18,
          mnemonic: 'อาการเจ็บป่วย (疒) ที่แสดงสภาพลักษณะอาการออกมาให้เห็น (状) = อาการของโรค',
          kid_mnemonic: 'ลิสต์รายการอาการ ไอ ตัวร้อน ปวดท้อง = 症状',
          body_gesture: 'ผายมือชี้บอกจุดต่างๆ ที่เจ็บป่วย'
        },
        {
          id: 'hsk2_1711',
          hanzi: '吃不下',
          pinyin: 'chī bu xià',
          display_pinyin: 'chībuxià',
          pinyin_tone: 'chi1buxia4',
          meaning_th: 'กินไม่ลง / กลืนไม่ไหว (Potential Complement)',
          meaning_en: 'cannot eat / unable to swallow',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 12,
          mnemonic: 'อ้าปาก (口) พยายามจะกิน (吃) แต่กลืนไม่ลงสู่กระเพาะ (不下) = กินไม่ลง',
          kid_mnemonic: 'ตักข้าวมาจ่อปาก แต่คลื่นไส้จนกลืนไม่ลง ส่ายหัวโบกมือ = 吃不下',
          body_gesture: 'ส่ายหน้าโบกมือผลักชามข้าวออก'
        },
        {
          id: 'hsk2_1712',
          hanzi: '受不了',
          pinyin: 'shòu bu liǎo',
          display_pinyin: 'shòubuliǎo',
          pinyin_tone: 'shou4buliao3',
          meaning_th: 'ทนไม่ไหวแล้ว / ทนต่อไปไม่ได้',
          meaning_en: 'cannot bear / unbearable',
          radical: '又',
          radical_name_th: 'หมวดมือขวา (又字旁)',
          stroke_count: 14,
          mnemonic: 'สองมือแบกรับ (受) ความเจ็บปวดต่อไปจนสุดความสามารถ (不了) = ทนไม่ไหวแล้ว',
          kid_mnemonic: 'ปวดท้องจี๊ดจนร้องโอยๆ ทนไม่ไหวแล้วครับหมอ! = 受不了',
          body_gesture: 'เอามือกุมขมับหรือกุมท้องแล้วส่ายหัวร้องโอดครวญ'
        }
      ],
      tone_rule: {
        rule_name: 'Potential Complements (可能补语) และเสียงเบา',
        description_th: 'ในโครงสร้างกริยาบอกความสามารถ V + 得/不 + ผลลัพธ์ เช่น 吃得下 (chīdexià) และ 吃不下 (chībuxià) คำว่า 得 และ 不 จะลดทอนเสียงเป็นเสียงเบา (Neutral tone) ส่วนคำว่า 了 ใน 受不了 และ 好不了 ต้องอ่านว่า liǎo (เสียง 3) ห้ามอ่านเป็น le!',
        example: '吃得下 (chīdexià), 吃不下 (chībuxià), 受不了 (shòubuliǎo), 好不了 (hǎobuliǎo)',
        fun_metaphor: 'คำว่า 得 และ 不 ในโครงสร้างนี้ทำตัวลีบๆ เป็นสะพานเชื่อมระหว่างกริยาและผลลัพธ์!',
        reassurance: 'ระวังคำว่า 了 เมื่ออยู่หลัง 不 ในโครงสร้างนี้ อ่านว่า liǎo เสมอ!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้ Potential Complements และการบอกระดับ 越来越...',
        explanation_th: 'ใช้ V + 不 + 下/了 เพื่อบอกว่าทำไม่ไหว และใช้ 越来越 + คุณศัพท์ เพื่อบอกว่าอาการทวีความรุนแรงขึ้น',
        patterns: [
          {
            formula: '恶心得 + 吃不下 + 东西',
            zh: '我恶心得吃不下东西。',
            pinyin: 'Wǒ ěxin de chībuxià dōngxi.',
            th: 'ผมคลื่นไส้จนกินอะไรไม่ลงเลยครับ',
            en: 'I feel so nauseous that I cannot eat anything.'
          },
          {
            formula: '肚子 + 疼得 + 受不了',
            zh: '肚子疼得受不了。',
            pinyin: 'Dùzi téng de shòubuliǎo.',
            th: 'ปวดท้องจนทนไม่ไหวแล้วครับ',
            en: 'My stomach hurts unbearably.'
          },
          {
            formula: '越来越 + [คุณศัพท์]',
            zh: '肚子越来越疼了。',
            pinyin: 'Dùzi yuèláiyuè téng le.',
            th: 'ท้องปวดขึ้นเรื่อยๆ แล้วครับ',
            en: 'The stomach pain is getting worse and worse.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'คุณหมออายุรกรรม 👨‍⚕️',
          zh: '请坐。你哪里不舒服？有什么具体的症状？',
          pinyin: 'Qǐng zuò. Nǐ nǎlǐ bù shūfu? Yǒu shénme jùtǐ de zhèngzhuàng?',
          th: 'เชิญนั่งครับ คุณรู้สึกไม่สบายตรงไหน มีอาการอะไรบ้างครับ?',
          en: 'Please sit. Where do you feel uncomfortable? What specific symptoms do you have?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '医生，昨晚吃完夜市后，我就一直拉肚子，恶心得吃不下任何东西。',
          pinyin: 'Yīshēng, zuówǎn chī wán yèshì hòu, wǒ jiù yìzhí lādùzi, ěxin de chībuxià rènhé dōngxi.',
          th: 'คุณหมอครับ เมื่อคืนหลังจากกินที่ตลาดกลางคืน ผมก็ท้องเสียตลอดเลย คลื่นไส้จนกินอะไรไม่ลงเลยครับ',
          en: 'Doctor, after eating at the night market last night, I have had diarrhea constantly and felt too nauseous to eat anything.'
        },
        {
          speaker: 'A',
          speaker_name: 'คุณหมออายุรกรรม 👨‍⚕️',
          zh: '拉了几次？胃部或者腹部觉得疼吗？',
          pinyin: 'Lā le jǐ cì? Wèibù huòzhě fùbù juéde téng ma?',
          th: 'ถ่ายท้องไปกี่รอบแล้วครับ? รู้สึกปวดที่กระเพาะหรือช่องท้องไหม?',
          en: 'How many times did you have diarrhea? Does your stomach or abdomen hurt?'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧒',
          zh: '拉了五次，胃部绞痛，越来越疼，真的疼得受不了了！',
          pinyin: 'Lā le wǔ cì, wèibù jiǎotòng, yuèláiyuè téng, zhēn de téng de shòubuliǎo le!',
          th: 'ถ่ายไป 5 รอบแล้วครับ ปวดเกร็งที่กระเพาะ ปวดขึ้นเรื่อยๆ ทนไม่ไหวจริงๆ แล้วครับ!',
          en: 'Five times, cramping in stomach, getting worse and worse, truly unbearably painful!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อคนไข้บอกว่า '恶心得吃不下东西' มีความหมายตรงกับข้อใด?",
          options: [
            'คลื่นไส้จนกินอะไรไม่ลง',
            'หิวข้าวมากจนกินได้หมด',
            'อาหารรสชาติอร่อยมาก',
            'กินยาเรียบร้อยแล้ว'
          ],
          correct_index: 0,
          explanation_th: "'恶心' แปลว่า คลื่นไส้ และ '吃不下' คือ กินไม่ลง จึงหมายถึง คลื่นไส้จนกินอะไรไม่ลง",
          encouragement: 'เข้าใจ Potential Complement ได้อย่างแม่นยำ!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '胃' (กระเพาะอาหาร) มีหมวดนำเนื้อหนัง '月' อยู่ด้านล่าง สื่อถึงสิ่งใด?",
          options: [
            'อวัยวะเนื้อเยื่อในร่างกายมนุษย์',
            'การเดินทางไกล',
            'สภาพอากาศฤดูหนาว',
            'แม่น้ำลำธาร'
          ],
          correct_index: 0,
          explanation_th: "หมวด '月' (肉月旁) ในตัวอักษรเกี่ยวกับร่างกาย สื่อถึงกล้ามเนื้อและอวัยวะภายใน",
          encouragement: 'จำหมวดนำเนื้อหนัง 月 ได้แม่นยำมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ปวดท้องจนทนไม่ไหวแล้ว"',
          tokens: ['受不了了', '肚子疼得'],
          correct_sequence: ['肚子疼得', '受不了了'],
          pinyin: 'Dùzi téng de shòubuliǎo le',
          meaning_th: 'ปวดท้องจนทนไม่ไหวแล้ว',
          explanation_th: 'อาการ (肚子疼得) + ผลลัพธ์ขีดสุด (受不了了)',
          encouragement: 'ต่อบล็อกเลโก้อาการป่วยได้คล่องแคล่วมาก!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '受不了' (shòubuliǎo) อ่านออกเสียงคำสุดท้ายว่าอย่างไร?",
          options: [
            'liǎo (เสียง 3)',
            'le (เสียงเบา)',
            'lào (เสียง 4)',
            'liào (เสียง 4)'
          ],
          correct_index: 0,
          explanation_th: "ในโครงสร้าง Potential Complement คำว่า '了' อ่านว่า 'liǎo' (เสียง 3) เสมอ",
          encouragement: 'ยอดเยี่ยมมาก! กฎสัทศาสตร์ข้อยกเว้นจำได้แม่นยำ!'
        }
      ]
    },
    {
      lesson_id: 't2_u17_l03',
      lesson_number: 3,
      title: {
        zh: '药房取药与医嘱',
        th: 'รับยาที่ห้องยา & คำสั่งแพทย์',
        en: 'Pharmacy & Prescriptions'
      },
      can_do: {
        th: 'นำใบสั่งยาไปรับยาที่ห้องยา อ่านฉลากยา และเข้าใจคำแนะนำความถี่การทานยาและข้อห้าม',
        en: 'Collect medicine at pharmacy, read prescription labels, and understand dosage instructions'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ฟังคำแนะนำของเภสัชกรเข้าใจว่า "ทานวันละ 3 ครั้ง ครั้งละ 2 เม็ด หลังอาหาร" อย่างแม่นยำ!',
      vocabulary: [
        {
          id: 'hsk2_1713',
          hanzi: '药房',
          pinyin: 'yàofáng',
          display_pinyin: 'yàofáng',
          pinyin_tone: 'yao4fang2',
          meaning_th: 'ห้องจ่ายยา / ร้านขายยา',
          meaning_en: 'pharmacy / dispensary',
          radical: '艹',
          radical_name_th: 'หมวดหญ้า/สมุนไพร (草字头)',
          stroke_count: 17,
          mnemonic: 'ห้องอาคาร (房) ที่จัดเก็บสมุนไพรและยารักษาโรค (药) = ห้องจ่ายยา',
          kid_mnemonic: 'ช่องกระจกที่มีเภสัชกรหยิบกล่องยาใส่ถุงยื่นให้ = 药房',
          body_gesture: 'ทำท่ายื่นสองมือไปข้างหน้ารับถุงยา'
        },
        {
          id: 'hsk2_1714',
          hanzi: '取药',
          pinyin: 'qǔyào',
          display_pinyin: 'qǔyào',
          pinyin_tone: 'qu3yao4',
          meaning_th: 'รับยา / ไปเอายาตามใบสั่ง',
          meaning_en: 'to collect medicine',
          radical: '又',
          radical_name_th: 'หมวดมือขวา (又字旁)',
          stroke_count: 17,
          mnemonic: 'ยื่นมือไปหยิบรับ (取) กล่องยารักษาโรค (药) = รับยา',
          kid_mnemonic: 'เดินไปที่ช่องหมายเลข 3 ยื่นใบสั่งยาแล้วรับถุงยา = 取药',
          body_gesture: 'ยื่นใบกระดาษไปข้างหน้าแล้วดึงถุงยากลับมา'
        },
        {
          id: 'hsk2_1715',
          hanzi: '医嘱',
          pinyin: 'yīzhǔ',
          display_pinyin: 'yīzhǔ',
          pinyin_tone: 'yi1zhu3',
          meaning_th: 'คำสั่งแพทย์ / คำแนะนำการใช้ยา',
          meaning_en: "doctor's advice / medical instruction",
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 15,
          mnemonic: 'คำพูดกำชับจากปาก (嘱) ของคุณหมอผู้รักษา (医) = คำแนะนำของแพทย์',
          kid_mnemonic: 'คุณหมอเขียนกำกับบนซองยาว่าต้องกินกี่เม็ดห้ามลืม = 医嘱',
          body_gesture: 'ชี้นิ้วเคาะที่ข้างหูเพื่อตั้งใจฟังคำแนะนำ'
        },
        {
          id: 'hsk2_1716',
          hanzi: '服用',
          pinyin: 'fúyòng',
          display_pinyin: 'fúyòng',
          pinyin_tone: 'fu2yong4',
          meaning_th: 'รับประทานยา (ภาษาทางการแพทย์)',
          meaning_en: 'to take medicine (formal)',
          radical: '月',
          radical_name_th: 'หมวดเนื้อหนัง (月字旁)',
          stroke_count: 13,
          mnemonic: 'รับยาเข้าสู่ร่างกาย (服) เพื่อนำไปใช้งานรักษาอาการ (用) = รับประทานยา',
          kid_mnemonic: 'หยิบเม็ดยาเข้าปาก ดื่มน้ำอุ่นตามอึกๆ = 服用',
          body_gesture: 'ทำท่าหยิบเม็ดยาเข้าปากแล้วดื่มน้ำตาม'
        },
        {
          id: 'hsk2_1717',
          hanzi: '饭后',
          pinyin: 'fànhòu',
          display_pinyin: 'fànhòu',
          pinyin_tone: 'fan4hou4',
          meaning_th: 'หลังอาหาร',
          meaning_en: 'after meals',
          radical: '饣',
          radical_name_th: 'หมวดอาหาร (食字旁)',
          stroke_count: 16,
          mnemonic: 'หลังจากกินข้าวและอาหารเรียบร้อยแล้ว (饭) ค่อยทำในเวลาต่อมา (后) = หลังอาหาร',
          kid_mnemonic: 'กินข้าวอิ่มแปรงฟันเสร็จแล้วค่อยหยิบยามากิน = 饭后',
          body_gesture: 'ลูบท้องอิ่มสบายแล้วค่อยหยิบยา'
        },
        {
          id: 'hsk2_1718',
          hanzi: '粒',
          pinyin: 'lì',
          display_pinyin: 'lì',
          pinyin_tone: 'li4',
          meaning_th: 'เม็ด / แคปซูล (ลักษณนามยา)',
          meaning_en: 'pill / capsule / grain (classifier)',
          radical: '米',
          radical_name_th: 'หมวดเมล็ดข้าว (米字旁)',
          stroke_count: 11,
          mnemonic: 'เม็ดเล็กๆ กลมๆ ดั่งเมล็ดข้าวสาร (米) ยืนตรง (立) = เม็ดยา',
          kid_mnemonic: 'ยาเม็ดแคปซูลเล็กๆ สองเม็ดในอุ้งมือ = 粒',
          body_gesture: 'จีบนิ้วโป้งกับนิ้วชี้เป็นเม็ดยาจิ๋วสองเม็ด'
        }
      ],
      tone_rule: {
        rule_name: 'การผันเสียงของ 一 ในประโยคระบุโดสยา',
        description_th: 'คำว่า 一 นำหน้าคำเสียง 1 (天) จะผันเป็น yì (yì tiān sān cì) แต่นำหน้าคำเสียง 4 (次) จะผันเป็น yí (yí cì liǎng lì)',
        example: '一天三次 (yì tiān sān cì - วันละ 3 ครั้ง), 一次两粒 (yí cì liǎng lì - ครั้งละ 2 เม็ด)',
        fun_metaphor: 'น้อง 一 ปรับเสียงตามคำข้างหลัง! ถ้าเจอเสียง 4 ก็ยกเสียงขึ้นเป็น yí ถ้าเจอเสียงอื่นก็กดเสียงลงเป็น yì!',
        reassurance: 'อ่านออกเสียงตามจังหวะ: 一天三次，一次两粒，饭后服用!'
      },
      grammar_bite: {
        title: 'สูตรเลโก้ระบุโดสยา: 一天...次，一次...粒 และ 千万别...',
        explanation_th: 'บอกความถี่และจำนวนเม็ดยา พร้อมข้อห้ามเด็ดขาดระหว่างทานยาด้วย 千万别...',
        patterns: [
          {
            formula: '一天 + [จำนวน] + 次，一次 + [จำนวน] + 粒，饭后服用',
            zh: '一天三次，一次两粒，饭后温水服用。',
            pinyin: 'Yì tiān sān cì, yí cì liǎng lì, fànhòu wēnshuǐ fúyòng.',
            th: 'วันละ 3 ครั้ง ครั้งละ 2 เม็ด รับประทานหลังอาหารด้วยน้ำอุ่น',
            en: 'Three times a day, two pills each time, take after meals with warm water.'
          },
          {
            formula: '服药期间 + 千万别 + [กริยา]',
            zh: '服药期间千万别喝酒。',
            pinyin: 'Fúyào qījiān qiānwàn bié hējiǔ.',
            th: 'ระหว่างทานยาเด็ดขาดห้ามดื่มสุรา',
            en: 'Never drink alcohol during medication.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '药剂师您好！这是急诊医生开的处方，我来取药。',
          pinyin: 'Yàojìshī nín hǎo! Zhè shì jízhěn yīshēng kāi de chǔfāng, wǒ lái qǔyào.',
          th: 'สวัสดีครับเภสัชกร! นี่คือใบสั่งยาที่คุณหมอห้องฉุกเฉินเปิดให้ ผมมารับยาครับ',
          en: 'Hello pharmacist! This is the prescription from the ER doctor, I am here to collect medicine.'
        },
        {
          speaker: 'B',
          speaker_name: 'เภสัชกร 👩‍⚕️',
          zh: '好的，请核对姓名。这是止泻胶囊，一天三次，一次两粒，饭后温水服用。',
          pinyin: 'Hǎo de, qǐng héduì xìngmíng. Zhè shì zhǐxiè jiāonáng, yì tiān sān cì, yí cì liǎng lì, fànhòu wēnshuǐ fúyòng.',
          th: 'ได้ค่ะ กรุณาตรวจชื่อนะคะ นี่คือยาแคปซูลแก้ท้องเสีย ทานวันละ 3 ครั้ง ครั้งละ 2 เม็ด หลังอาหารด้วยน้ำอุ่นค่ะ',
          en: 'Sure, please verify your name. These are anti-diarrhea capsules, three times a day, two pills each time, take after meals with warm water.'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '请问这个药吃完会头晕想睡觉吗？',
          pinyin: 'Qǐngwèn zhè ge yào chī wán huì tóuyūn xiǎng shuìjiào ma?',
          th: 'ขอถามหน่อยครับ ยานี้ทานแล้วจะมีอาการเวียนหัวหรืออยากนอนหลับไหมครับ?',
          en: 'Excuse me, will this medicine cause dizziness or drowsiness after taking?'
        },
        {
          speaker: 'B',
          speaker_name: 'เภสัชกร 👩‍⚕️',
          zh: '不会困，但请遵医嘱，服药期间千万别吃辛辣食物，也千万别喝酒。',
          pinyin: 'Bú huì kùn, dàn qǐng zūn yīzhǔ, fúyào qījiān qiānwàn bié chī xīnlà shíwù, yě qiānwàn bié hējiǔ.',
          th: 'ไม่ง่วงค่ะ แต่กรุณาปฏิบัติตามคำสั่งแพทย์ ระหว่างทานยาเด็ดขาดห้ามทานอาหารรสจัดเผ็ดร้อน และห้ามดื่มสุราเด็ดขาดนะคะ',
          en: 'No drowsiness, but please follow instructions, strictly avoid spicy food and never drink alcohol during medication.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อเภสัชกรบอกว่า '一天三次，一次两粒，饭后服用' หมายถึงทานยาอย่างไร?",
          options: [
            'วันละ 3 ครั้ง ครั้งละ 2 เม็ด หลังอาหาร',
            'วันละ 2 ครั้ง ครั้งละ 3 เม็ด ก่อนอาหาร',
            'ทานทันที 3 เม็ด หลังอาหารมื้อเย็น',
            'ทานวันละ 1 ครั้ง ครั้งละ 2 เม็ด ก่อนนอน'
          ],
          correct_index: 0,
          explanation_th: "'一天三次' = วันละ 3 ครั้ง, '一次两粒' = ครั้งละ 2 เม็ด, '饭后服用' = ทานหลังอาหาร",
          encouragement: 'จำโดสยาและความถี่ภาษาจีนได้อย่างแม่นยำ 100%!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '粒' (เม็ด/แคปซูล) มีหมวดนำข้าวสาร '米' สื่อถึงสิ่งใด?",
          options: [
            'ลักษณะที่เป็นเม็ดเล็กๆ กลมๆ',
            'น้ำยาน้ำเชื่อม',
            'เข็มฉีดยาขนาดใหญ่',
            'ผงแป้งชงน้ำ'
          ],
          correct_index: 0,
          explanation_th: "หมวด '米' สื่อถึงเมล็ดข้าว ซึ่งเป็นเม็ดเล็กๆ กลมๆ จึงใช้เป็นลักษณนามของเม็ดยา",
          encouragement: 'เข้าใจที่มาของลักษณนาม 粒 ได้อย่างลึกซึ้ง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "วันละ 3 ครั้ง ครั้งละ 2 เม็ด"',
          tokens: ['一次两粒', '一天三次'],
          correct_sequence: ['一天三次', '一次两粒'],
          pinyin: 'Yì tiān sān cì, yí cì liǎng lì',
          meaning_th: 'วันละ 3 ครั้ง ครั้งละ 2 เม็ด',
          explanation_th: 'ความถี่ต่อวัน (一天三次) + ปริมาณต่อครั้ง (一次两粒)',
          encouragement: 'ต่อบล็อกเลโก้ฉลากยาได้รวดเร็วและถูกต้อง!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '饭后' (fànhòu) มีความหมายตรงกับข้อใด?",
          options: [
            'หลังอาหาร',
            'ก่อนอาหาร',
            'พร้อมอาหาร',
            'ขณะท้องว่าง'
          ],
          correct_index: 0,
          explanation_th: "'饭后' แปลว่า หลังอาหาร (饭 = ข้าว/อาหาร, 后 = ภายหลัง)",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์สำคัญจำได้แม่นยำ!'
        }
      ]
    },
    {
      lesson_id: 't2_u17_l04',
      lesson_number: 4,
      title: {
        zh: '看病进阶急救挑战',
        th: 'ภารกิจพิชิตโรงพยาบาลเซี่ยงไฮ้',
        en: 'Ruijin Hospital Quest'
      },
      can_do: {
        th: 'รับมือสถานการณ์ฉุกเฉินทางการแพทย์ในโรงพยาบาล สื่อสารอาการเชิงลึก ยืนยันประวัติแพ้ยา และรับยาได้อย่างถูกต้อง',
        en: 'Handle medical emergencies, communicate nuanced symptoms, verify allergy history, and collect prescriptions'
      },
      baby_step_goal: 'เป้าหมายวันนี้: พิชิตบอสใหญ่โรงพยาบาลรุ่ยจินเซี่ยงไฮ้ ผ่านขั้นตอนคัดกรอง พบแพทย์ และรับยาปลอดภัย 100%!',
      vocabulary: [
        {
          id: 'hsk2_1719',
          hanzi: '急诊',
          pinyin: 'jízhěn',
          display_pinyin: 'jízhěn',
          pinyin_tone: 'ji2zhen3',
          meaning_th: 'แผนกฉุกเฉิน (ER)',
          meaning_en: 'emergency department / treatment',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 14,
          mnemonic: 'ในจิตใจร้อนรนรีบด่วน (急) ต้องตรวจรักษาชีวิตทันที (诊) = แผนกฉุกเฉิน',
          kid_mnemonic: 'ไฟไซเรนสีแดงหมุนรอบ รถพยาบาลวิ่งมาส่งหน้าห้องฉุกเฉิน = 急诊',
          body_gesture: 'ทำสองมือหมุนวนเหนือหัวเหมือนไฟไซเรนรถพยาบาล'
        },
        {
          id: 'hsk2_1720',
          hanzi: '处方',
          pinyin: 'chǔfāng',
          display_pinyin: 'chǔfāng',
          pinyin_tone: 'chu3fang1',
          meaning_th: 'ใบสั่งยา / สูตรยาจากแพทย์',
          meaning_en: 'prescription / recipe',
          radical: '方',
          radical_name_th: 'หมวดทิศทาง (方字旁)',
          stroke_count: 9,
          mnemonic: 'หมอวินิจฉัยตัดสินและจัดสรร (处) ทิศทางวิธีรักษาพร้อมสูตรยา (方) = ใบสั่งยา',
          kid_mnemonic: 'กระดาษที่คุณหมอเขียนรายการยาให้ถือไปรับที่ห้องยา = 处方',
          body_gesture: 'ทำท่าเขียนใบสั่งยาบนฝ่ามือแล้วยื่นให้เภสัชกร'
        },
        {
          id: 'hsk2_1721',
          hanzi: '胶囊',
          pinyin: 'jiāonáng',
          display_pinyin: 'jiāonáng',
          pinyin_tone: 'jiao1nang2',
          meaning_th: 'ยาแคปซูล',
          meaning_en: 'capsule',
          radical: '月',
          radical_name_th: 'หมวดเนื้อหนัง (月字旁)',
          stroke_count: 22,
          mnemonic: 'ปลอกเจลาตินเนื้อนุ่ม (胶) ที่เป็นถุงห่อหุ้มผงยาไว้ข้างใน (囊) = ยาแคปซูล',
          kid_mnemonic: 'แคปซูลสองสี หัวแดงท้ายขาว กลืนง่ายไม่ขม = 胶囊',
          body_gesture: 'ประกบนิ้วมือเป็นรูปวงรีแคปซูล'
        },
        {
          id: 'hsk2_1722',
          hanzi: '好转',
          pinyin: 'hǎozhuǎn',
          display_pinyin: 'hǎozhuǎn',
          pinyin_tone: 'hao3zhuan3',
          meaning_th: 'อาการดีขึ้น / ทุเลาลง',
          meaning_en: 'to improve / take a turn for the better',
          radical: '女',
          radical_name_th: 'หมวดหญิง (女字旁)',
          stroke_count: 10,
          mnemonic: 'หมุนเปลี่ยนทิศทาง (转) กลับคืนสู่ความแข็งแรงสมบูรณ์ดี (好) = อาการดีขึ้น',
          kid_mnemonic: 'หน้าตาเริ่มสดใส มีรอยยิ้ม ท้องหายปวดแล้ว = 好转',
          body_gesture: 'ปาดเหงื่อบนหน้าผากแล้วยิ้มยกสองนิ้วโป้ง'
        }
      ],
      tone_rule: {
        rule_name: 'Tone Sandhi: 好转 (hǎozhuǎn ➔ háozhuǎn)',
        description_th: 'คำว่า 好 (เสียง 3) นำหน้า 转 (เสียง 3) เข้ากฎ 3+3 Sandhi คำว่า 好 จะผันเสียงเป็นเสียง 2 (háo)',
        example: '好转 (hǎozhuǎn ➔ háozhuǎn), 身体好转 (shēntǐ háozhuǎn)',
        fun_metaphor: 'เสียงสามสองตัวเจอกัน ตัวหน้าเด้งขึ้นฟ้าเป็นเสียงสองทันที!',
        reassurance: 'พูดว่า háozhuǎn ลื่นไหลเป็นธรรมชาติแบบเจ้าของภาษา 100%!'
      },
      grammar_bite: {
        title: 'สรุปการสื่อสารในสถานพยาบาล (Hospital Master Playbook)',
        explanation_th: 'บอกอาการด้วย Potential Complement, ยืนยันประวัติแพ้ด้วย 对...过敏, และรับคำแนะนำการทานยา',
        patterns: [
          {
            formula: '我对 + [ชื่อยา/สาร] + 不过敏 / 过敏',
            zh: '我对阿莫西林不过敏。',
            pinyin: 'Wǒ duì āmòxīlín bú guòmǐn.',
            th: 'ผมไม่แพ้ยาอะม็อกซีซิลลินครับ',
            en: 'I am not allergic to amoxicillin.'
          },
          {
            formula: '如果 + 症状没有好转 + 就...',
            zh: '如果三天后症状没有好转，请来复诊。',
            pinyin: 'Rúguǒ sān tiān hòu zhèngzhuàng méiyǒu hǎozhuǎn, qǐng lái fùzhěn.',
            th: 'หากผ่านไป 3 วันแล้วอาการยังไม่ดีขึ้น กรุณากลับมาตรวจซ้ำนะครับ',
            en: 'If symptoms do not improve after three days, please return for a follow-up.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '医生，我昨晚拉肚子五次，恶心得吃不下东西，胃部越来越疼，真的疼得受不了了！',
          pinyin: 'Yīshēng, wǒ zuówǎn lādùzi wǔ cì, ěxin de chībuxià dōngxi, wèibù yuèláiyuè téng, zhēn de téng de shòubuliǎo le!',
          th: 'คุณหมอครับ เมื่อคืนผมถ่ายท้อง 5 ครั้ง คลื่นไส้จนกินอะไรไม่ลง กระเพาะปวดขึ้นเรื่อยๆ ทนไม่ไหวจริงๆ แล้วครับ!',
          en: 'Doctor, I had diarrhea five times last night, felt too nauseous to eat anything, stomach pain got worse and worse, truly unbearable!'
        },
        {
          speaker: 'B',
          speaker_name: 'คุณหมอรุ่ยจิน 👨‍⚕️',
          zh: '这是急性肠胃炎。先验个血，你对头孢或者青霉素药物过敏吗？',
          pinyin: 'Zhè shì jíxìng chángwèiyán. Xiān yàn ge xiě, nǐ duì tóubāo huòzhě qīngméisù yàowù guòmǐn ma?',
          th: 'นี่คือกระเพาะและลำไส้อักเสบเฉียบพลันครับ ตรวจเลือดก่อนนะครับ คุณแพ้ยากลุ่มเซฟาโลสปอรินหรือเพนิซิลลินไหมครับ?',
          en: 'This is acute gastroenteritis. Let us do a blood test first, are you allergic to cephalosporin or penicillin?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧒',
          zh: '我对任何药物都不过敏。',
          pinyin: 'Wǒ duì rènhé yàowù dōu bú guòmǐn.',
          th: 'ผมไม่แพ้ยาชนิดใดเลยครับ',
          en: 'I am not allergic to any medications.'
        },
        {
          speaker: 'B',
          speaker_name: 'คุณหมอรุ่ยจิน 👨‍⚕️',
          zh: '好的，去一楼药房取止泻胶囊。一天三次，一次两粒，饭后温水服用。三天后如果症状没有好转，再来急诊复查。',
          pinyin: 'Hǎo de, qù yī lóu yàofáng qǔ zhǐxiè jiāonáng. Yì tiān sān cì, yí cì liǎng lì, fànhòu wēnshuǐ fúyòng. Sān tiān hòu rúguǒ zhèngzhuàng méiyǒu hǎozhuǎn, zài lái jízhěn fùchá.',
          th: 'ดีครับ ไปรับยาแคปซูลแก้ท้องเสียที่ห้องยาชั้น 1 นะครับ ทานวันละ 3 ครั้ง ครั้งละ 2 เม็ด หลังอาหารด้วยน้ำอุ่น หลัง 3 วันหากอาการยังไม่ดีขึ้น ให้กลับมาตรวจซ้ำที่ห้องฉุกเฉินนะครับ',
          en: 'Okay, go to 1st floor pharmacy to pick up anti-diarrhea capsules. Three times a day, two pills each time, after meals with warm water. If symptoms do not improve after three days, return to ER for follow-up.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อแพทย์ถามว่า '你对药物过敏吗？' หมายถึงข้อใด?",
          options: [
            'คุณมีประวัติแพ้ยาไหม?',
            'คุณทานยาตรงเวลาไหม?',
            'คุณเคยมาโรงพยาบาลนี้ไหม?',
            'คุณมียาติดตัวมาไหม?'
          ],
          correct_index: 0,
          explanation_th: "'对...过敏' แปลว่า แพ้สิ่งนั้น ดังนั้น '对药物过敏' จึงหมายถึง แพ้ยา",
          encouragement: 'เข้าใจคำถามความปลอดภัยทางการแพทย์อย่างถูกต้อง!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '急' ในคำว่า '急诊' (ห้องฉุกเฉิน) มีหมวดนำใจ '心' สื่อถึงสิ่งใด?",
          options: [
            'ความเร่งด่วนร้อนใจที่ต้องรีบรักษาทันที',
            'การเดินข้ามสะพาน',
            'การนับจำนวนเงิน',
            'การรับประทานอาหาร'
          ],
          correct_index: 0,
          explanation_th: "'急' มีหมวดใจ '心' สื่อถึงอารมณ์ร้อนใจ รีบด่วน ฉุกเฉิน",
          encouragement: 'เข้าใจความหมายลึกซึ้งของอักษรหมวดใจ 心!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ผมไม่แพ้ยาชนิดใดเลย"',
          tokens: ['都不过敏', '我对任何药物'],
          correct_sequence: ['我对任何药物', '都不过敏'],
          pinyin: 'Wǒ duì rènhé yàowù dōu bú guòmǐn',
          meaning_th: 'ผมไม่แพ้ยาชนิดใดเลย',
          explanation_th: 'โครงสร้างปฏิเสธสิ้นเชิง (我对任何药物) + (都不过敏)',
          encouragement: 'เรียงประโยคยืนยันประวัติสุขภาพได้อย่างแม่นยำ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '好转' (hǎozhuǎn) หมายถึงข้อใด?",
          options: [
            'อาการดีขึ้น / ทุเลาลง',
            'อาการทรุดหนักลง',
            'เปลี่ยนแพทย์ผู้ตรวจ',
            'ย้ายโรงพยาบาล'
          ],
          correct_index: 0,
          explanation_th: "'好转' แปลว่า อาการดีขึ้น ทุเลาลง (好 = ดี, 转 = เปลี่ยนทิศทาง)",
          encouragement: 'จำศัพท์ฟื้นฟูสุขภาพได้ขึ้นใจแล้ว!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณมีอาการอาหารเป็นพิษเฉียบพลันหลังทานมื้อดึกที่เซี่ยงไฮ้ ปวดท้องรุนแรง ท้องเสีย 5 รอบ และอาเจียนจนกินอะไรไม่ลง (吃不下) คุณเดินทางมาถึงโรงพยาบาลรุ่ยจินเซี่ยงไฮ้เพื่อเข้าตรวจแผนกฉุกเฉิน (急诊) คุณควรแจ้งอาการ ยืนยันประวัติแพ้ยา และทบทวนโดสยาอย่างไร?',
        options: [
          '医生，我拉肚子五次，恶心得吃不下东西，胃部越来越疼得受不了！我对任何药物都不过敏，请问胶囊一天吃几次？ (Yīshēng, wǒ lādùzi wǔ cì, ěxin de chībuxià dōngxi, wèibù yuèláiyuè téng de shòubuliǎo! Wǒ duì rènhé yàowù dōu bú guòmǐn, qǐngwèn jiāonáng yì tiān chī jǐ cì?)',
          '你好，我想买一件宽松的衣服，多少钱？ (Nǐ hǎo, wǒ xiǎng mǎi yí jiàn kuānsōng de yīfu, duōshao qián?)',
          '服务员，我们要加一份辣火锅，谢谢！ (Fúwùyuán, wǒmen yào jiā yí fèn là huǒguō, xièxie!)',
          '我不去医院，我要去高铁站坐车！ (Wǒ bú qù yīyuàn, wǒ yào qù gāotiězhàn zuò chē!)'
        ],
        correct_index: 0,
        explanation_th: "ตัวเลือกแรกสื่อสารครบถ้วนสมบูรณ์แบบที่สุด: บรรยายอาการท้องเสียและคลื่นไส้ด้วย Potential Complement (吃不下) บอกระดับความปวดที่ทนไม่ไหว (越来越疼得受不了) ยืนยันประวัติแพ้ยา (对任何药物不过敏) และถามวิธีทานยาแคปซูล (胶囊一天吃几次)",
        encouragement: 'ยินดีด้วยอย่างยิ่ง! คุณพิชิต Boss Challenge โรงพยาบาลเซี่ยงไฮ้ สื่อสารภาวะฉุกเฉินและรับการรักษาปลอดภัย 100%!'
      },
      cheer_trophy: {
        badge_id: 'badge_t2_u17_master',
        badge_name: 'ผู้พิชิตโรงพยาบาลและล่ามสุขภาพจำลอง 🏥💊',
        message_th: 'สุดยอดมาก! คุณผ่าน Unit 17 แล้ว พร้อมรับมือการพบแพทย์ในจีน อธิบายอาการป่วยเชิงลึก และรับประทานยาตามใบสั่งได้อย่างถูกต้องปลอดภัย!',
        xp_reward: 200
      }
    }
  ]
};
