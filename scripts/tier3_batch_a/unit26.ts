/**
 * scripts/tier3_batch_a/unit26.ts
 * Tier 3 Unit 26: 职场沟通 (Workplace Communication: การสื่อสารในที่ทำงาน)
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

export const unit26 = {
  unit_id: 'tier3_u26',
  tier: 3,
  unit_number: 26,
  title: {
    zh: '职场沟通',
    th: 'การสื่อสารในที่ทำงาน',
    en: 'Workplace Communication'
  },
  description: 'ยกระดับการทำงานสู่ความเป็นมืออาชีพ: รายงานผลงานต่อหัวหน้า (汇报), การกระจายงานและติดตามความคืบหน้า (跟进), และศิลปะการให้ฟีดแบ็กอย่างสร้างสรรค์ (反馈)',
  lessons: [
    {
      lesson_id: 't3_u26_l01',
      lesson_number: 1,
      title: {
        zh: '向上汇报工作',
        th: 'การรายงานผลงานต่อหัวหน้า',
        en: 'Reporting to Manager'
      },
      can_do: {
        th: 'รายงานความคืบหน้าและสรุปผลการทำงานด้วยภาษาทางการ ใช้โครงสร้าง 鉴于... และ 据...统计',
        en: 'Report work progress and summarize results using formal structures like 鉴于... and 据...统计'
      },
      baby_step_goal: 'เป้าหมายวันนี้: รายงานสรุปความคืบหน้าของโปรเจกต์ต่อหัวหน้าด้วยน้ำเสียงทางการและมั่นใจ!',
      vocabulary: [
        {
          id: 'hsk3_2601',
          hanzi: '汇报',
          pinyin: 'huìbào',
          display_pinyin: 'huìbào',
          pinyin_tone: 'hui4bao4',
          meaning_th: 'รายงานผลงาน (ต่อผู้บังคับบัญชา)',
          meaning_en: 'to report (to superiors)',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 16,
          mnemonic: 'รวมรวมข้อมูล (汇) แล้วใช้คำพูดรายงาน (报) สรุปผลงาน = รายงานผลงาน',
          kid_mnemonic: 'ถือแฟ้มเอกสารไปเคาะห้องหัวหน้าเพื่อเล่าสรุปผลงาน = 汇报',
          body_gesture: 'สองมือถือแฟ้มเสมือนก้มศีรษะเล็กน้อยเพื่อยื่นรายงาน'
        },
        {
          id: 'hsk3_2602',
          hanzi: '进展',
          pinyin: 'jìnzhǎn',
          display_pinyin: 'jìnzhǎn',
          pinyin_tone: 'jin4zhan3',
          meaning_th: 'ความคืบหน้า (ของงาน)',
          meaning_en: 'progress / advancement',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之底)',
          stroke_count: 17,
          mnemonic: 'ก้าวไปข้างหน้า (进) และขยายผลลัพธ์ออกไป (展) = ความคืบหน้า',
          kid_mnemonic: 'ลูกศรสีเขียวกำลังพุ่งไปข้างหน้าบนแผนภูมิ = 进展',
          body_gesture: 'ยกฝ่ามือผลักเฉียงขึ้นไปข้างหน้าแสดงการเติบโต'
        },
        {
          id: 'hsk3_2603',
          hanzi: '总结',
          pinyin: 'zǒngjié',
          display_pinyin: 'zǒngjié',
          pinyin_tone: 'zong3jie2',
          meaning_th: 'สรุป / การสรุปผล',
          meaning_en: 'summary / to summarize',
          radical: '纟',
          radical_name_th: 'หมวดเส้นไหม (绞丝旁)',
          stroke_count: 18,
          mnemonic: 'รวมทุกสิ่งไว้ด้วยกัน (总) แล้วผูกมัดเป็นข้อสรุป (结) = สรุป',
          kid_mnemonic: 'มัดริบบิ้นกล่องของขวัญปิดท้ายการทำงาน = 总结',
          body_gesture: 'กวาดสองมือเข้าหากันแล้วประกบนิ้วเหมือนรวบรวมข้อมูล'
        },
        {
          id: 'hsk3_2604',
          hanzi: '方案',
          pinyin: 'fāng’àn',
          display_pinyin: 'fāng’àn',
          pinyin_tone: 'fang1an4',
          meaning_th: 'แผนงาน / ข้อเสนอแนะแนวทาง',
          meaning_en: 'plan / scheme / proposal',
          radical: '木',
          radical_name_th: 'หมวดต้นไม้ (木字旁)',
          stroke_count: 14,
          mnemonic: 'ทิศทาง (方) ที่ร่างไว้บนโต๊ะไม้ (案) เพื่อดำเนินการ = แผนงาน',
          kid_mnemonic: 'กระดาษแผนงานพิมพ์ลายพิมพ์เขียววางบนโต๊ะ = 方案',
          body_gesture: 'วาดสี่เหลี่ยมผืนผ้าแนวนอนในอากาศเหมือนกางกระดาษพิมพ์เขียว'
        },
        {
          id: 'hsk3_2605',
          hanzi: '顾虑',
          pinyin: 'gùlǜ',
          display_pinyin: 'gùlǜ',
          pinyin_tone: 'gu4lu:4',
          meaning_th: 'ข้อกังวล / ความพะวง',
          meaning_en: 'concern / misgiving',
          radical: '页',
          radical_name_th: 'หมวดหน้า (页字旁)',
          stroke_count: 21,
          mnemonic: 'หันกลับไปมอง (顾) และคิดไตร่ตรองรอบคอบ (虑) = ข้อกังวล',
          kid_mnemonic: 'เอียงคอแตะคางคิดวิเคราะห์ความเสี่ยงรอบด้าน = 顾虑',
          body_gesture: 'เอานิ้วชี้แตะที่ขมับทำท่าครุ่นคิดระแวดระวัง'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำควบ 方案 (fāng’àn) อย่างชัดถ้อยชัดคำ',
        description_th: 'คำว่า 方 (fāng) เป็นเสียง 1 สูงยาว และ 案 (àn) เป็นเสียง 4 หนักแน่น ให้มีช่วงหยุดหายใจเบาๆ (syllable break) ระหว่าง fāng กับ àn',
        example: '解决方案 (jiějué fāng’àn: แนวทางแก้ปัญหา)',
        fun_metaphor: 'เหมือนเคาะกระดิ่งใสๆ กริ๊ง แล้ววางตรารับรองปั๊บลงบนกระดาษ!',
        reassurance: 'ไม่ต้องรีบพูดติดกันจนกลืนเสียง การเว้นจังหวะนิดเดียวจะทำให้ฟังดูเป็นมืออาชีพยิ่งขึ้น!'
      },
      grammar_bite: {
        title: 'โครงสร้างภาษาเขียนทางการ: 鉴于... (เนื่องจาก/เมื่อพิจารณาจาก...)',
        explanation_th: 'ใช้ในรายงานและอีเมลทางการเพื่อระบุเหตุผลหรือข้อเท็จจริงก่อนนำเสนอข้อสรุปหรือแนวทางแก้ไข',
        patterns: [
          {
            formula: '鉴于 + [ข้อเท็จจริง/สถานการณ์], 我们 + [ข้อเสนอ]',
            zh: '鉴于目前项目的进展，我们准备了两个优化方案。',
            pinyin: 'Jiànyú mùqián xiàngmù de jìnzhǎn, wǒmen zhǔnbèi le liǎng ge yōuhuà fāng’àn.',
            th: 'เนื่องจากความคืบหน้าของโครงการในปัจจุบัน พวกเราจึงได้เตรียมแผนปรับปรุงไว้ 2 แนวทาง',
            en: 'In view of the current project progress, we have prepared two optimization plans.'
          },
          {
            formula: '据 + [แหล่งข้อมูล] + 统计，...',
            zh: '据初步统计，本周的工作效率提升了百分之十五。',
            pinyin: 'Jù chūbù tǒngjì, běn zhōu de gōngzuò xiàolǜ tíshēng le bǎifēnzhī shíwǔ.',
            th: 'ตามสถิติเบื้องต้น ประสิทธิภาพการทำงานในสัปดาห์นี้เพิ่มขึ้น 15%',
            en: 'According to preliminary statistics, work efficiency increased by 15% this week.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย (พนักงาน) 🧑‍💼',
          zh: '王总您好，我想向您简要汇报一下新产品的推广进展。',
          pinyin: 'Wáng zǒng nín hǎo, wǒ xiǎng xiàng nín jiǎnyào huìbào yíxià xīn chǎnpǐn de tuīguǎng jìnzhǎn.',
          th: 'สวัสดีครับบอสหวัง ผมขออนุญาตรายงานสรุปความคืบหน้าการโปรโมตสินค้าใหม่สั้นๆ ครับ',
          en: 'Hello President Wang, I would like to briefly report on the promotion progress of our new product.'
        },
        {
          speaker: 'B',
          speaker_name: 'ผู้จัดการหวัง 👩‍💼',
          zh: '好的，请坐。你们目前有遇到什么顾虑或者困难吗？',
          pinyin: 'Hǎo de, qǐng zuò. Nǐmen mùqián yǒu yùdào shénme gùlǜ huòzhě kùnnan ma?',
          th: 'ได้เลย นั่งก่อนสิ ตอนนี้พวกเธอมีข้อกังวลหรือความยากลำบากอะไรไหม?',
          en: 'Sure, please have a seat. Have you encountered any concerns or difficulties currently?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย (พนักงาน) 🧑‍💼',
          zh: '鉴于目前线上流量成本上升，我们已经做好了应对方案，请您过目。',
          pinyin: 'Jiànyú mùqián xiànshàng liúliàng chéngběn shàngshēng, wǒmen yǐjīng zuò hǎo le yìngduì fāng’àn, qǐng nín guòmù.',
          th: 'เนื่องจากต้นทุนทราฟฟิกออนไลน์ในปัจจุบันปรับตัวสูงขึ้น พวกเราจึงได้เตรียมแผนรับมือเรียบร้อยแล้ว ขอเรียนเชิญท่านพิจารณาครับ',
          en: 'In view of rising online traffic costs, we have prepared a response plan for your review.'
        },
        {
          speaker: 'B',
          speaker_name: 'ผู้จัดการหวัง 👩‍💼',
          zh: '总结得很到位，这个方案非常切实可行，就按这个推进吧！',
          pinyin: 'Zǒngjié de hěn dàowèi, zhè ge fāng’àn fēicháng qièshí kěxíng, jiù àn zhè ge tuījìn ba!',
          th: 'สรุปได้ตรงจุดมาก แผนงานนี้ใช้การได้จริงอย่างยิ่ง ให้เดินหน้าตามนี้ได้เลย!',
          en: 'Very well summarized, this plan is very practical and feasible, proceed accordingly!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '汇报' (huìbào) มีความหมายตรงกับข้อใด?",
          options: [
            'รายงานผลงานต่อผู้บังคับบัญชา',
            'สมัครสมาชิกฟิตเนส',
            'ขอคืนเงินค่าสินค้า',
            'สั่งอาหารเดลิเวอรี่'
          ],
          correct_index: 0,
          explanation_th: "'汇报' หมายถึง การรายงานผลงาน สรุปข้อมูล หรืออัปเดตงานให้หัวหน้าทราบ",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์สำคัญสำหรับชีวิตการทำงานจำได้แม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ผมขอรายงานความคืบหน้าของโครงการสั้นๆ ครับ"',
          tokens: ['新项目的进展', '简要汇报', '我想', '一下'],
          correct_sequence: ['我想', '简要汇报', '一下', '新项目的进展'],
          pinyin: 'Wǒ xiǎng jiǎnyào huìbào yíxià xīn xiàngmù de jìnzhǎn',
          meaning_th: 'ผมขอรายงานความคืบหน้าของโครงการสั้นๆ ครับ',
          explanation_th: 'โครงสร้าง: ประธาน (我想) + กริยาขยาย (简要汇报一下) + กรรม (新项目的进展)',
          encouragement: 'ประกอบประโยครายงานผลงานได้ลื่นไหลระดับมืออาชีพ!'
        },
        {
          type: 'flash_recall',
          question_th: "เมื่อต้องการเสนอทางออกหรือแผนการแก้ปัญหา ควรใช้คำศัพท์ใด?",
          options: [
            '方案 (fāng’àn)',
            '外卖 (wàimài)',
            '行李 (xíngli)',
            '发票 (fāpiào)'
          ],
          correct_index: 0,
          explanation_th: "'方案' แปลว่า แผนงาน แผนการ หรือแนวทางแก้ไข",
          encouragement: 'เลือกคำศัพท์ทางธุรกิจได้อย่างถูกต้องไร้ที่ติ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '进展' (ก้าวหน้า/คืบหน้า) ตัว '进' มีหมวดนำใด?",
          options: [
            '辶 (หมวดก้าวเดิน 走之底)',
            '扌 (หมวดมือ 提手旁)',
            '氵 (หมวดน้ำ 三点水)',
            '口 (หมวดปาก 口字旁)'
          ],
          correct_index: 0,
          explanation_th: "'进' ประกอบด้วยหมวดนำ '辶' สื่อถึงการเคลื่อนที่และการก้าวไปข้างหน้า",
          encouragement: 'จำหมวดนำอักษรจีนได้แม่นยำมาก!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณต้องเข้าร่วมการประชุมกับผู้จัดการเพื่อสรุปผลการทดสอบโปรดักต์ใหม่ และต้องการแจ้งว่าทีมได้เตรียมแผนสำรองไว้แล้ว ควรพูดประโยคใด?',
        options: [
          '王总，关于目前的测试进展，我们已经做好了应对方案。 (Wáng zǒng, guānyú mùqián de cèshì jìnzhǎn, wǒmen yǐjīng zuò hǎo le yìngduì fāng’àn.)',
          '请把菜单给我看一下，我想点菜。 (Qǐng bǎ càidān gěi wǒ kàn yíxià, wǒ xiǎng diǎncài.)',
          '我的手机没电了，可以用现金吗？ (Wǒ de shǒujī méidiàn le, kěyǐ yòng xiànjīn ma?)',
          '请问高铁站怎么走？ (Qǐngwèn gāotiězhàn zěnme zǒu?)'
        ],
        correct_index: 0,
        explanation_th: "ประโยค '王总，关于目前的测试进展，我们已经做好了应对方案。' ชัดเจน เป็นทางการ และแสดงความพร้อมในการทำงานระดับมืออาชีพ",
        encouragement: 'ผ่านด่านการรายงานผลงานอย่างสง่างาม!'
      }
    },
    {
      lesson_id: 't3_u26_l02',
      lesson_number: 2,
      title: {
        zh: '任务拆解与跟进',
        th: 'การกระจายงานและติดตามงาน',
        en: 'Task Breakdown & Tracking'
      },
      can_do: {
        th: 'อธิบายการแบ่งย่อยเนื้องาน มอบหมายผู้รับผิดชอบ กำหนดหมุดหมาย และใช้สำนวน 脚踏实地',
        en: 'Explain task decomposition, assign owners, set milestones, and use idiom 脚踏实地'
      },
      baby_step_goal: 'เป้าหมายวันนี้: แตกย่อยโปรเจกต์ใหญ่เป็นงานย่อย และติดตามความคืบหน้าไม่ให้งานล่าช้า!',
      vocabulary: [
        {
          id: 'hsk3_2606',
          hanzi: '拆解',
          pinyin: 'chāijiě',
          display_pinyin: 'chāijiě',
          pinyin_tone: 'chai1jie3',
          meaning_th: 'แตกย่อย / ถอดแยกชิ้นงาน',
          meaning_en: 'to break down / disassemble',
          radical: '扌',
          radical_name_th: 'หมวดมือ (提手旁)',
          stroke_count: 16,
          mnemonic: 'ใช้มือถอดแยก (拆) และคลี่คลายปัญหา (解) = แตกย่อยงาน',
          kid_mnemonic: 'ถอดแยกตัวต่อเลโก้ชิ้นใหญ่ออกเป็นชิ้นเล็กๆ = 拆解',
          body_gesture: 'สองมือกำหลวมๆ แล้วแยกออกจากกันเหมือนดึงตัวต่อเลโก้'
        },
        {
          id: 'hsk3_2607',
          hanzi: '责任人',
          pinyin: 'zérènrén',
          display_pinyin: 'zérènrén',
          pinyin_tone: 'ze2ren4ren2',
          meaning_th: 'ผู้รับผิดชอบหลัก',
          meaning_en: 'person in charge / owner',
          radical: '亻',
          radical_name_th: 'หมวดคน (单人旁)',
          stroke_count: 17,
          mnemonic: 'คน (人) ผู้แบกรับภาระหน้าที่ (责任) = ผู้รับผิดชอบ',
          kid_mnemonic: 'เพื่อนที่ถือป้ายชื่อหน้าแถวคอยดูแลเพื่อนๆ = 责任人',
          body_gesture: 'ยกมือกุมหน้าอกตนเองแสดงความรับผิดชอบ'
        },
        {
          id: 'hsk3_2608',
          hanzi: '里程碑',
          pinyin: 'lǐchéngbēi',
          display_pinyin: 'lǐchéngbēi',
          pinyin_tone: 'li3cheng2bei1',
          meaning_th: 'หมุดหมายสำคัญ / ไมล์สโตน',
          meaning_en: 'milestone',
          radical: '石',
          radical_name_th: 'หมวดหิน (石字旁)',
          stroke_count: 27,
          mnemonic: 'หลักหิน (碑) ที่ปักบอกระยะทาง (里程) = หมุดหมายสำคัญ',
          kid_mnemonic: 'เสาป้ายหินบอกทางที่มีธงสีแดงปักอยู่ = 里程碑',
          body_gesture: 'ทำมือตั้งฉากปักลงบนโต๊ะเหมือนปักเสาหลัก'
        },
        {
          id: 'hsk3_2609',
          hanzi: '滞后',
          pinyin: 'zhìhòu',
          display_pinyin: 'zhìhòu',
          pinyin_tone: 'zhi4hou4',
          meaning_th: 'ล่าช้ากว่ากำหนด / ล้าหลัง',
          meaning_en: 'lag behind / delayed',
          radical: '氵',
          radical_name_th: 'หมวดน้ำ (三点水)',
          stroke_count: 18,
          mnemonic: 'น้ำนิ่งติดขัด (滞) ทำให้ตามอยู่ข้างหลัง (后) = ล่าช้ากว่ากำหนด',
          kid_mnemonic: 'เข็มนาฬิกาหมุนช้ากว่าเพื่อนจนตามหลัง = 滞后',
          body_gesture: 'ยกมือชี้นิ้วถอยหลังบ่งบอกความชักช้า'
        },
        {
          id: 'hsk3_2610',
          hanzi: '脚踏实地',
          pinyin: 'jiǎotàshídì',
          display_pinyin: 'jiǎotàshídì',
          pinyin_tone: 'jiao3ta4shi2di4',
          meaning_th: 'ทำงานจริงจังมีหลักเกณฑ์ ไม่เพ้อฝัน (ติดดิน)',
          meaning_en: 'down-to-earth / earnest and pragmatic',
          radical: '月',
          radical_name_th: 'หมวดเนื้อ/ร่างกาย (月字旁)',
          stroke_count: 36,
          mnemonic: 'เท้า (脚) เหยียบ (踏) ลงบนพื้นดินจริง (实地) = ทำงานจริงจังไม่เพ้อฝัน',
          kid_mnemonic: 'ย่ำเท้าลงบนพื้นดินอย่างมั่นคงไม่ลอยขึ้นฟ้า = 脚踏实地',
          body_gesture: 'ย่ำเท้าลงพื้นเบาๆ สองครั้งเพื่อยืนยันความหนักแน่น'
        }
      ],
      tone_rule: {
        rule_name: 'สำนวน 4 พยางค์ 脚踏实地 (jiǎotàshídì) จังหวะ 2-2',
        description_th: 'จังหวะการอ่านสำนวน 成语 ให้แบ่งเป็น 2 ท่อน: 脚踏 (jiǎotà) แล้วหยุดเล็กน้อย ตามด้วย 实地 (shídì)',
        example: '做人要脚踏实地 (Zuòrén yào jiǎotàshídì: เป็นคนต้องทำงานจริงจังติดดิน)',
        fun_metaphor: 'เหมือนก้าวเท้าซ้าย-ขวาอย่างมั่นคงลงบนพื้นศิลา!',
        reassurance: 'อ่านด้วยน้ำเสียงหนักแน่น แสดงความน่าเชื่อถือและความมุ่งมั่นในการทำงาน'
      },
      grammar_bite: {
        title: 'การกำกับความรับผิดชอบ: 由...负责 (ให้...เป็นผู้รับผิดชอบ)',
        explanation_th: 'ใช้ในการประชุมและการวางแผนงาน เพื่อระบุตัวบุคคลหรือทีมที่รับผิดชอบงานนั้นๆ อย่างชัดเจน',
        patterns: [
          {
            formula: '[ชิ้นงาน/โมดูล] + 由 + [บุคคล/ทีม] + 负责',
            zh: '这个核心模块由张工负责跟进。',
            pinyin: 'Zhè ge héxīn mókuài yóu Zhāng gōng fùzé gēnjìn.',
            th: 'โมดูลแกนหลักนี้วิศวกรจางเป็นผู้รับผิดชอบติดตาม',
            en: 'This core module is followed up by Engineer Zhang.'
          },
          {
            formula: '绝不能 + [กริยา] + 以免 + [ผลเสีย]',
            zh: '我们必须脚踏实地，绝不能让进度滞后。',
            pinyin: 'Wǒmen bìxū jiǎotàshídì, jué bùnéng ràng jìndù zhìhòu.',
            th: 'พวกเราต้องทำงานจริงจังรอบคอบ ไม่ยอมให้ความคืบหน้าล่าช้าเป็นอันขาด',
            en: 'We must be down-to-earth and never allow progress to lag behind.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'หลี่เฉียง (หัวหน้าทีม) 👨‍💼',
          zh: '大家注意，这次的项目必须把所有任务细致拆解。',
          pinyin: 'Dàjiā zhùyì, zhè cì de xiàngmù bìxū bǎ suǒyǒu rènwu xìzhì chāijiě.',
          th: 'ทุกคนโปรดฟัง โครงการรอบนี้ต้องแบ่งย่อยงานทั้งหมดอย่างละเอียดรอบคอบ',
          en: 'Everyone pay attention, this project must break down all tasks meticulously.'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวหลิน 👩‍💻',
          zh: '明白！每个里程碑都已经明确了责任人和交付时间。',
          pinyin: 'Míngbai! Měi ge lǐchéngbēi dōu yǐjīng míngquè le zérènrén hé jiāofù shíjiān.',
          th: 'เข้าใจแล้วค่ะ! แต่ละไมล์สโตนระบุผู้รับผิดชอบและวันส่งมอบชัดเจนแล้ว',
          en: 'Understood! Each milestone has clarified the owner and delivery date.'
        },
        {
          speaker: 'A',
          speaker_name: 'หลี่เฉียง (หัวหน้าทีม) 👨‍💼',
          zh: '很好，上一期的测试进度有些滞后，这次大家一定要脚踏实地。',
          pinyin: 'Hěn hǎo, shàng yì qī de cèshì jìndù yǒuxiē zhìhòu, zhè cì dàjiā yídìng yào jiǎotàshídì.',
          th: 'ดีมาก ความคืบหน้าการทดสอบเฟสก่อนล่าช้าไปบ้าง รอบนี้ทุกคนต้องลงมือจริงจังไม่ประมาทนะ',
          en: 'Very good, previous test progress lagged a bit, this time everyone must stay grounded.'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวหลิน 👩‍💻',
          zh: '放心吧李经理，我们每天都会同步进展，保证按时上线！',
          pinyin: 'Fàngxīn ba Lǐ jīnglǐ, wǒmen měi tiān dōu huì tóngbù jìnzhǎn, bǎozhèng ànshí shàngxiàn!',
          th: 'วางใจได้ค่ะผู้จัดการหลี่ พวกเราจะซิงก์ความคืบหน้าทุกวัน รับรองเปิดตัวตรงเวลาค่ะ!',
          en: 'Rest assured Manager Li, we will sync progress daily to ensure launching on time!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "สำนวนจีน '脚踏实地' (jiǎotàshídì) สื่อถึงทัศนคติในการทำงานแบบใด?",
          options: [
            'ทำงานจริงจังรอบคอบ ไม่เพ้อฝัน',
            'ทำงานเอาหน้าอย่างรีบร้อน',
            'หลีกเลี่ยงความรับผิดชอบ',
            'เปลี่ยนแผนงานไปเรื่อยๆ'
          ],
          correct_index: 0,
          explanation_th: "'脚踏实地' หมายถึง การทำงานด้วยความจริงจัง ติดดิน หนักแน่น มีหลักเกณฑ์",
          encouragement: 'จำสำนวนจีนยอดฮิตในที่ทำงานได้แม่นยำมาก!'
        },
        {
          type: 'flash_recall',
          question_th: "หากงานไม่เป็นไปตามแผนและช้ากว่ากำหนด ควรใช้คำว่าอะไร?",
          options: [
            '滞后 (zhìhòu)',
            '提前 (tíqián)',
            '退货 (tuìhuò)',
            '免税 (miǎnshuì)'
          ],
          correct_index: 0,
          explanation_th: "'滞后' แปลว่า ล่าช้ากว่ากำหนด หรือล้าหลัง",
          encouragement: 'เลือกคำศัพท์เทคนิคในการบริหารโครงการได้เป๊ะมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "แต่ละหมุดหมายกำหนดผู้รับผิดชอบชัดเจนแล้ว"',
          tokens: ['明确了责任人', '已经', '每个里程碑'],
          correct_sequence: ['每个里程碑', '已经', '明确了责任人'],
          pinyin: 'Měi ge lǐchéngbēi yǐjīng míngquè le zérènrén',
          meaning_th: 'แต่ละหมุดหมายกำหนดผู้รับผิดชอบชัดเจนแล้ว',
          explanation_th: 'หัวข้อ (每个里程碑) + กริยาวิเศษณ์ (已经) + ภาคแสดง (明确了责任人)',
          encouragement: 'เก่งมาก! ไวยากรณ์การจัดการทีมสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: "ตัวอักษร '碑' (หลักหิน/ป้ายหิน) ในคำว่า '里程碑' มีหมวดนำใด?",
          options: [
            '石 (หมวดหิน 石字旁)',
            '木 (หมวดไม้ 木字旁)',
            '金 (หมวดโลหะ 金字旁)',
            '土 (หมวดดิน 提土旁)'
          ],
          correct_index: 0,
          explanation_th: "'碑' คือ แผ่นหินสลัก จึงใช้หมวดนำ '石' (หิน)",
          encouragement: 'รากศัพท์อักษรจีนเข้าใจลึกซึ้ง!'
        }
      ],
      boss_challenge: {
        scenario_th: 'ในที่ประชุมวางแผนงานไตรมาสใหม่ หัวหน้าถามว่าทีมจะป้องกันไม่ให้กำหนดส่งงานล่าช้าได้อย่างไร คุณควรตอบอย่างไรให้ดูเป็นมืออาชีพ?',
        options: [
          '我们会把任务细致拆解，明确责任人，脚踏实地推进。 (Wǒmen huì bǎ rènwu xìzhì chāijiě, míngquè zérènrén, jiǎotàshídì tuījìn.)',
          '我不知道，这不归我管。 (Wǒ bù zhīdào, zhè bù guī wǒ guǎn.)',
          '今天天气真好，我们去吃火锅吧。 (Jīntiān tiānqì zhēn hǎo, wǒmen qù chī huǒguō ba.)',
          '洗手间在哪儿？我想洗手。 (Xǐshǒujiān zài nǎr? Wǒ xiǎng xǐshǒu.)'
        ],
        correct_index: 0,
        explanation_th: "การตอบว่า '我们会把任务细致拆解，明确责任人，脚踏实地推进。' สะท้อนถึงวุฒิภาวะและความเข้าใจในขั้นตอนการทำงานจริง",
        encouragement: 'พิชิตคำถามสัมภาษณ์และการประชุมระดับสูงได้อย่างยอดเยี่ยม!'
      }
    },
    {
      lesson_id: 't3_u26_l03',
      lesson_number: 3,
      title: {
        zh: '职场情商与反馈',
        th: 'ความฉลาดทางอารมณ์และฟีดแบ็ก',
        en: 'Workplace EQ & Feedback'
      },
      can_do: {
        th: 'ให้ฟีดแบ็กอย่างนุ่มนวลและสร้างสรรค์ ใช้โครงสร้าง 依我看... และ 是否可以考虑...',
        en: 'Deliver constructive feedback tactfully using 依我看... and 是否可以考虑...'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำเสนอข้อเสนอแนะที่เห็นต่างโดยไม่ทำให้เพื่อนร่วมงานเสียหน้า!',
      vocabulary: [
        {
          id: 'hsk3_2611',
          hanzi: '委婉',
          pinyin: 'wěiwǎn',
          display_pinyin: 'wěiwǎn',
          pinyin_tone: 'wei3wan3',
          meaning_th: 'นุ่มนวล / บัวไม่ให้ช้ำน้ำไม่ให้ขุ่น',
          meaning_en: 'tactful / diplomatic / gentle',
          radical: '女',
          radical_name_th: 'หมวดผู้หญิง (女字旁)',
          stroke_count: 19,
          mnemonic: 'หญิงสาว (女) พูดจาอ่อนโยน (委) คดเคี้ยวไม่แทงใจดำ (婉) = นุ่มนวล',
          kid_mnemonic: 'พูดจาเพราะๆ ยิ้มหวานๆ ชวนให้คนฟังรู้สึกสบายใจ = 委婉',
          body_gesture: 'ยกสองมือผายออกข้างหน้าอย่างนอบน้อมอ่อนโยน'
        },
        {
          id: 'hsk3_2612',
          hanzi: '反馈',
          pinyin: 'fǎnkuì',
          display_pinyin: 'fǎnkuì',
          pinyin_tone: 'fan3kui4',
          meaning_th: 'ผลสะท้อนกลับ / ข้อเสนอแนะ (ฟีดแบ็ก)',
          meaning_en: 'feedback',
          radical: '又',
          radical_name_th: 'หมวดมือขวา/อีกครั้ง (又字旁)',
          stroke_count: 16,
          mnemonic: 'ส่งย้อนกลับมา (反) เป็นของขวัญตอบแทน (馈) = ฟีดแบ็ก',
          kid_mnemonic: 'กล่องของขวัญความเห็นที่ส่งกลับมาให้อีกฝ่าย = 反馈',
          body_gesture: 'ยื่นมือออกไปแล้วดึงกลับเข้าหาราวกับรับของขวัญ'
        },
        {
          id: 'hsk3_2613',
          hanzi: '协作',
          pinyin: 'xiézuò',
          display_pinyin: 'xiézuò',
          pinyin_tone: 'xie2zuo4',
          meaning_th: 'ร่วมมือกันทำงาน / การประสานงาน',
          meaning_en: 'collaborate / cooperate',
          radical: '十',
          radical_name_th: 'หมวดสิบ (十字旁)',
          stroke_count: 15,
          mnemonic: 'ร่วมใจกันสิบคน (十+三力=协) ทำงานให้สำเร็จ (作) = ร่วมมือกัน',
          kid_mnemonic: 'เพื่อนๆ ร่วมพลังช่วยกันยกโต๊ะตัวใหญ่ = 协作',
          body_gesture: 'กำสองมือแล้วนำมาประกบกันสื่อถึงความร่วมมือ'
        },
        {
          id: 'hsk3_2614',
          hanzi: '协调',
          pinyin: 'xiétiáo',
          display_pinyin: 'xiétiáo',
          pinyin_tone: 'xie2tiao2',
          meaning_th: 'ไกล่เกลี่ย / ประสานประโยชน์ให้ลงตัว',
          meaning_en: 'coordinate / harmonize',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 22,
          mnemonic: 'ร่วมใจกัน (协) ปรับจูนเสียงดนตรีด้วยคำพูด (调) = ประสานให้ลงตัว',
          kid_mnemonic: 'วาทยกรกำลังโบกไม้ควบคุมวงดนตรีให้เล่นพร้อมกัน = 协调',
          body_gesture: 'สองมือทำท่าโบกขึ้นลงสลับกันเหมือนปรับสมดุลเครื่องชั่ง'
        },
        {
          id: 'hsk3_2615',
          hanzi: '默契',
          pinyin: 'mòqì',
          display_pinyin: 'mòqì',
          pinyin_tone: 'mo4qi4',
          meaning_th: 'ความเข้าขารู้ใจ (ไม่ต้องพูดก็รู้ใจ)',
          meaning_en: 'tacit understanding / rapport',
          radical: '黑',
          radical_name_th: 'หมวดสีดำ (黑字旁)',
          stroke_count: 23,
          mnemonic: 'เงียบสงบในความมืด (默) แต่มีสัญญาใจมั่นคง (契) = ความรู้ใจ',
          kid_mnemonic: 'มองตากันปุ๊บก็รู้ใจกันปั๊บ ไฮไฟฟ์เลย = 默契',
          body_gesture: 'ยกสองนิ้วชี้ข้างหน้าแล้วสบตาพยักหน้าให้เพื่อน'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงวรรณยุกต์ 委婉 (wěiwǎn) กฎเสียง 3 ซ้อน (3+3 -> 2+3)',
        description_th: 'คำว่า 委 (wěi) และ 婉 (wǎn) เป็นเสียง 3 ทั้งคู่ เมื่อพูดติดกัน คำแรกจะผันเป็นเสียง 2 กลายเป็น wéiwǎn',
        example: '委婉表达 (wéiwǎn biǎodá: แสดงออกอย่างนุ่มนวล)',
        fun_metaphor: 'น้องเสียงสามเจอน้องเสียงสาม เลยขี่ม้ากระโดดขึ้นเป็นเสียงสองอย่างสง่างาม!',
        reassurance: 'แม้รูปพินอินเขียน wěiwǎn แต่ให้ออกเสียงเป็น wéiwǎn จะฟังดูคล่องแคล่วเป็นธรรมชาติที่สุด!'
      },
      grammar_bite: {
        title: 'การเสนอความเห็นอย่างสุภาพ: 依我看... / 是否可以考虑...',
        explanation_th: 'แทนที่จะพูดปฏิเสธตรงๆ ให้ใช้คำขึ้นต้นที่แสดงความถ่อมตน เพื่อเปิดพื้นที่ให้คู่สนทนารับฟังอย่างสบายใจ',
        patterns: [
          {
            formula: '依我看，我们 + 是否可以考虑 + [ข้อเสนอ]',
            zh: '依我看，我们是否可以考虑分阶段进行交付？',
            pinyin: 'Yī wǒ kàn, wǒmen shìfǒu kěyǐ kǎolǜ fēn jiēduàn jìnxíng jiāofù?',
            th: 'ในมุมมองของผม พวกเราพอจะพิจารณาการส่งมอบงานเป็นเฟสๆ ได้ไหมครับ?',
            en: 'In my view, could we consider delivering in stages?'
          },
          {
            formula: '感谢您的反馈，这有助于我们 + [การปรับปรุง]',
            zh: '非常感谢您的反馈，团队之间的协作越来越有默契了。',
            pinyin: 'Fēicháng gǎnxiè nín de fǎnkuì, tuánduì zhījiān de xiézuò yuè lái yuè yǒu mòqì le.',
            th: 'ขอบคุณสำหรับฟีดแบ็กเป็นอย่างยิ่ง การประสานงานระหว่างทีมเข้าขารู้ใจกันมากขึ้นเรื่อยๆ',
            en: 'Thank you very much for your feedback, teamwork is gaining better rapport.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'เฉินจิ้ง (ดีไซเนอร์) 👩‍🎨',
          zh: '大家看一下这个新视觉方案，请大家多提意见。',
          pinyin: 'Dàjiā kàn yíxià zhè ge xīn shìjué fāng’àn, qǐng dàjiā duō tí yìjiàn.',
          th: 'ทุกคนช่วยดูแบบดีไซน์ใหม่หน่อยนะคะ เชิญให้ความเห็นได้เต็มที่เลยค่ะ',
          en: 'Take a look at this new visual proposal, please share your suggestions.'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧑‍💼',
          zh: '视觉效果非常惊艳！依我看，按钮的颜色是否可以稍微调亮一点儿？',
          pinyin: 'Shìjué xiàoguǒ fēicháng jīngyàn! Yī wǒ kàn, ànniǔ de yánsè shìfǒu kěyǐ shāowēi tiáo liàng yìdiǎnr?',
          th: 'ภาพรวมดูน่าทึ่งมากครับ! ในมุมมองของผม สีของปุ่มกดพอจะพิจารณาปรับให้สว่างขึ้นอีกสักนิดได้ไหมครับ?',
          en: 'Visual effect is stunning! In my view, could we consider making the button color slightly brighter?'
        },
        {
          speaker: 'A',
          speaker_name: 'เฉินจิ้ง (ดีไซเนอร์) 👩‍🎨',
          zh: '这个建议很委婉也很中肯！这样确实更利于用户点击。',
          pinyin: 'Zhè ge jiànyì hěn wěiwǎn yě hěn zhòngkěn! Zhèyàng quèshí gèng lìyú yònghù diǎnjī.',
          th: 'ข้อเสนอนี้ทั้งนุ่มนวลและตรงประเด็นมากเลยค่ะ! แบบนี้ช่วยให้ผู้ใช้กดง่ายขึ้นจริงๆ',
          en: 'This suggestion is very tactful and pertinent! It indeed helps user clicks.'
        },
        {
          speaker: 'B',
          speaker_name: 'สมชาย 🧑‍💼',
          zh: '太好了，跨部门协作就是需要这样及时的沟通与协调。',
          pinyin: 'Tài hǎo le, kuà bùmén xiézuò jiù shì xūyào zhèyàng jíshí de gōutōng yǔ xiétiáo.',
          th: 'ยอดเยี่ยมเลยครับ การร่วมมือข้ามแผนกต้องอาศัยการสื่อสารและประสานงานที่ทันท่วงทีแบบนี้แหละครับ',
          en: 'Great, cross-department collaboration precisely requires such timely communication and coordination.'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "เมื่อต้องการเสนอแนะอย่างสุภาพว่า 'ในมุมมองของผม' ควรใช้สำนวนใด?",
          options: [
            '依我看 (Yī wǒ kàn)',
            '你听我说 (Nǐ tīng wǒ shuō)',
            '无论如何 (Wúlùn rúhé)',
            '绝不可能 (Jué bù kěnéng)'
          ],
          correct_index: 0,
          explanation_th: "'依我看' แปลว่า ในมุมมองของฉัน/ผม ใช้แสดงความเห็นอย่างสุภาพและถ่อมตน",
          encouragement: 'ยอดเยี่ยมมาก! การใช้คำสุภาพช่วยเสริมสร้างเสน่ห์ในที่ทำงาน!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "พวกเราพอจะพิจารณาการส่งมอบเป็นเฟสๆ ได้ไหมครับ"',
          tokens: ['是否可以考虑', '我们', '分阶段交付'],
          correct_sequence: ['我们', '是否可以考虑', '分阶段交付'],
          pinyin: 'Wǒmen shìfǒu kěyǐ kǎolǜ fēn jiēduàn jiāofù',
          meaning_th: 'พวกเราพอจะพิจารณาการส่งมอบเป็นเฟสๆ ได้ไหมครับ',
          explanation_th: 'ประธาน (我们) + คำถามสุภาพ (是否可以考虑) + สิ่งที่เสนอ (分阶段交付)',
          encouragement: 'ต่อประโยคได้นุ่มนวลและเป็นมืออาชีพมาก!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '默契' (mòqì) มีความหมายตรงกับข้อใด?",
          options: [
            'ความเข้าขารู้ใจโดยไม่ต้องพูด',
            'การโต้เถียงเสียงดัง',
            'ความเข้าใจผิดในสัญญา',
            'การยกเลิกการประชุม'
          ],
          correct_index: 0,
          explanation_th: "'默契' สื่อถึง ความรู้ใจ ความเข้าขา และความเข้าใจซึ่งกันและกันอย่างแนบเนียน",
          encouragement: 'จำศัพท์ความสัมพันธ์ในที่ทำงานได้ดีเยี่ยม!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '反馈' (ฟีดแบ็ก) ตัว '馈' มีหมวดนำใด?",
          options: [
            '饣 (หมวดอาหาร 饣字旁)',
            '言 (หมวดคำพูด 言字旁)',
            '心 (หมวดใจ 心字底)',
            '手 (หมวดมือ 手字旁)'
          ],
          correct_index: 0,
          explanation_th: "'馈' หมายถึง การมอบอาหารหรือของกำนัล จึงมีหมวดนำ '饣' (อาหาร)",
          encouragement: 'เข้าใจลึกซึ้งถึงวิวัฒนาการตัวอักษรจีน!'
        }
      ],
      boss_challenge: {
        scenario_th: 'เพื่อนร่วมงานนำเสนอสไลด์ที่มีตัวหนังสือแน่นเกินไป คุณต้องการแนะนำให้ลดทอนเนื้อหาลงอย่างนุ่มนวลที่สุด ควรพูดอย่างไร?',
        options: [
          '设计得很有深度！依我看，文字部分是否可以考虑稍微精简一些？ (Shèjì de hěn yǒu shēndù! Yī wǒ kàn, wénzì bùfen shìfǒu kěyǐ kǎolǜ shāowēi jīngjiǎn yìxiē?)',
          '你做的太差了，重做吧。 (Nǐ zuò de tài chà le, chóngzuò ba.)',
          '我不想看，随便你吧。 (Wǒ bù xiǎng kàn, suíbiàn nǐ ba.)',
          '请给我倒一杯咖啡。 (Qǐng gěi wǒ dào yì bēi kāfēi.)'
        ],
        correct_index: 0,
        explanation_th: "การชมเชยก่อนแล้วเสนอแนะอย่างสุภาพ '依我看，文字部分是否可以考虑稍微精简一些？' เป็นศิลปะขั้นสูงของการทำงานร่วมกัน",
        encouragement: 'สุดยอดมาก! EQ ที่ทำงานเต็มร้อย ได้ใจเพื่อนร่วมทีมแน่นอน!'
      }
    },
    {
      lesson_id: 't3_u26_l04',
      lesson_number: 4,
      title: {
        zh: 'Boss Challenge: 季度业绩复盘汇报',
        th: 'ภารกิจบอส: รายงานสรุปผลงานประจำไตรมาส',
        en: 'Boss Challenge: Quarterly Review Report'
      },
      can_do: {
        th: 'บูรณาการคำศัพท์และวาทกรรมทางการ นำเสนอรายงานผลงานประจำไตรมาสต่อผู้บริหารได้อย่างราบรื่น',
        en: 'Synthesize formal discourse and vocabulary to present quarterly performance report to executive'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำเสนอรายงานไตรมาสต่อผู้บริหาร ตอบคำถามข้อกังวล และปิดการนำเสนออย่างสมบูรณ์แบบ!',
      vocabulary: [
        {
          id: 'hsk3_2616',
          hanzi: '复盘',
          pinyin: 'fùpán',
          display_pinyin: 'fùpán',
          pinyin_tone: 'fu4pan2',
          meaning_th: 'การทบทวนถอดบทเรียน (หลังจบงาน)',
          meaning_en: 'post-mortem review / debrief',
          radical: '皿',
          radical_name_th: 'หมวดภาชนะ (皿字底)',
          stroke_count: 20,
          mnemonic: 'นำกระดานหมาก (盘) กลับมาเล่นซ้ำ (复) เพื่อถอดบทเรียน = ทบทวนถอดบทเรียน',
          kid_mnemonic: 'เอาเทปการแข่งขันมาเปิดดูย้อนหลังเพื่อหาจุดพัฒนา = 复盘',
          body_gesture: 'หมุนฝ่ามือสองข้างวนเข้าหากันเป็นวงกลมเหมือนย้อนภาพ'
        },
        {
          id: 'hsk3_2617',
          hanzi: '达成率',
          pinyin: 'dáchénglǜ',
          display_pinyin: 'dáchénglǜ',
          pinyin_tone: 'da2cheng2lu:4',
          meaning_th: 'อัตราความสำเร็จตามเป้าหมาย (KPI)',
          meaning_en: 'achievement rate / hit rate',
          radical: '辶',
          radical_name_th: 'หมวดก้าวเดิน (走之底)',
          stroke_count: 21,
          mnemonic: 'ก้าวไปถึง (达) ความสำเร็จ (成) คิดเป็นอัตราร้อยละ (率) = อัตราสำเร็จ',
          kid_mnemonic: 'แถบหลอดพลังวิ่งเต็มร้อยเปอร์เซ็นต์ = 达成率',
          body_gesture: 'ชูกำปั้นขึ้นเหนือศีรษะแสดงชัยชนะในการพิชิตเป้าหมาย'
        },
        {
          id: 'hsk3_2618',
          hanzi: '闭环',
          pinyin: 'bìhuán',
          display_pinyin: 'bìhuán',
          pinyin_tone: 'bi4huan2',
          meaning_th: 'ระบบวงจรปิดสมบูรณ์ (ครบกระบวนการไม่ทิ้งค้าง)',
          meaning_en: 'closed loop / end-to-end completion',
          radical: '门',
          radical_name_th: 'หมวดประตู (门字框)',
          stroke_count: 18,
          mnemonic: 'ปิดประตู (闭) และเชื่อมต่อเป็นห่วงกลม (环) = ครบกระบวนการ',
          kid_mnemonic: 'ต่อรางรถไฟเป็นวงกลมเชื่อมต่อกันพอดี = 闭环',
          body_gesture: 'ใช้นิ้วชี้และนิ้วโป้งสองข้างประกบกันทำเป็นห่วงกลม'
        },
        {
          id: 'hsk3_2619',
          hanzi: '优化',
          pinyin: 'yōuhuà',
          display_pinyin: 'yōuhuà',
          pinyin_tone: 'you1hua4',
          meaning_th: 'เพิ่มประสิทธิภาพ / ปรับปรุงให้ดียิ่งขึ้น',
          meaning_en: 'optimize / enhance',
          radical: '亻',
          radical_name_th: 'หมวดคน (单人旁)',
          stroke_count: 10,
          mnemonic: 'คนเก่งเป็นเลิศ (优) เปลี่ยนแปลงให้ดีขึ้น (化) = เพิ่มประสิทธิภาพ',
          kid_mnemonic: 'อัปเกรดไอเทมในเกมให้สว่างวิบวับ = 优化',
          body_gesture: 'ยกสองมือขึ้นเหนืออกแล้วสะบัดนิ้วออกเหมือนประกายไฟอัปเกรด'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำศัพท์ธุรกิจ 达成率 (dáchénglǜ)',
        description_th: 'คำว่า 达 (dá) และ 成 (chéng) เป็นเสียง 2 สูงขึ้นทั้งคู่ ส่วน 率 (lǜ) เป็นเสียง 4 สั้นหนักแน่น มีเสียงสระ ü ชัดเจน',
        example: '目标达成率 (mùbiāo dáchénglǜ: อัตราสำเร็จของเป้าหมาย)',
        fun_metaphor: 'เสียงเหินขึ้นฟ้าสองจังหวะแล้วตอกหมุดแน่นเปรี๊ยะ!',
        reassurance: 'ระวังการออกเสียง lǜ ให้ปากจู๋กลม จะออกเสียงได้ถูกต้องเหมือนเจ้าของภาษา'
      },
      grammar_bite: {
        title: 'การสรุปผลเชิงตัวเลข: 围绕...形成闭环 (มุ่งเน้น...จนเกิดกระบวนการครบวงจร)',
        explanation_th: 'คำศัพท์ภาษาธุรกิจยอดนิยมขององค์กรจีนสมัยใหม่เพื่ออธิบายการทำงานที่มีประสิทธิภาพ',
        patterns: [
          {
            formula: '据统计，本季度目标达成率已达 + [เปอร์เซ็นต์]',
            zh: '据统计，本季度核心业务达成率已达百分之一百二十。',
            pinyin: 'Jù tǒngjì, běn jīdù héxīn yèwù dáchénglǜ yǐ dá bǎifēnzhī yìbǎi èrshí.',
            th: 'ตามสถิติ อัตราสำเร็จของธุรกิจหลักในไตรมาสนี้แตะระดับ 120% แล้ว',
            en: 'According to statistics, core business achievement rate reached 120% this quarter.'
          },
          {
            formula: '通过 + [วิธีการ], 形成业务闭环',
            zh: '通过深入复盘，我们优化了流程，形成了完整的闭环。',
            pinyin: 'Tōngguò shēnrù fùpán, wǒmen yōuhuà le liúchéng, xíngchéng le wánzhěng de bìhuán.',
            th: 'จากการทบทวนถอดบทเรียนอย่างลึกซึ้ง พวกเราได้ปรับปรุงขั้นตอนจนเกิดเป็นวงจรปิดที่สมบูรณ์',
            en: 'Through in-depth review, we optimized the process and formed a complete closed loop.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧑‍💼',
          zh: '各位领导好，今天我代表团队就第三季度的工作进行复盘汇报。',
          pinyin: 'Gèwèi lǐngdǎo hǎo, jīntiān wǒ dàibiǎo tuánduì jiù dì-sān jīdù de gōngzuò jìnxíng fùpán huìbào.',
          th: 'สวัสดีผู้บริหารทุกท่านครับ วันนี้ผมขอเป็นตัวแทนทีมงานรายงานทบทวนผลงานไตรมาสที่สามครับ',
          en: 'Hello executives, today on behalf of the team I report on our third-quarter debrief.'
        },
        {
          speaker: 'B',
          speaker_name: 'ซีอีโอหลิว 👨‍💼',
          zh: '很好，大家最关注的核心指标达成率怎么样？',
          pinyin: 'Hěn hǎo, dàjiā zuì guānzhù de héxīn zhǐbiāo dáchénglǜ zěnmeyàng?',
          th: 'ดีมาก ตัวชี้วัดหลักที่ทุกคนให้ความสนใจ อัตราความสำเร็จเป็นอย่างไรบ้าง?',
          en: 'Very good, how is the achievement rate for the core metrics everyone is focused on?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧑‍💼',
          zh: '据统计，整体达成率达到了115%。我们还优化了用户反馈链路，形成了服务闭环。',
          pinyin: 'Jù tǒngjì, zhěngtǐ dáchénglǜ dádào le bǎifēnzhī yībǎiyǐshíwǔ. Wǒmen hái yōuhuà le yònghù fǎnkuì liànlù, xíngchéng le fúwù bìhuán.',
          th: 'ตามสถิติ อัตราสำเร็จโดยรวมแตะที่ 115% ครับ นอกจากนี้เรายังปรับปรุงสายงานฟีดแบ็กของผู้ใช้จนเกิดเป็นวงจรบริการที่ครบกระบวนการครับ',
          en: 'According to statistics, overall hit rate reached 115%. We also optimized user feedback loop into a service closed loop.'
        },
        {
          speaker: 'B',
          speaker_name: 'ซีอีโอหลิว 👨‍💼',
          zh: '思路清晰，脚踏实地！下个季度继续保持这种高水准的协作！',
          pinyin: 'Sīlù qīngxī, jiǎotàshídì! Xià ge jīdù jìxù bǎochí zhè zhǒng gāo shuǐzhǔn de xiézuò!',
          th: 'แนวคิดชัดเจน ทำงานจริงจังรอบคอบ! ไตรมาสหน้ารักษามาตรฐานการประสานงานระดับสูงนี้ไว้นะ!',
          en: 'Clear thinking and well grounded! Keep up this high standard of collaboration next quarter!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '复盘' (fùpán) ในวงการธุรกิจจีนหมายถึงอะไร?",
          options: [
            'การทบทวนถอดบทเรียนเพื่อปรับปรุงการทำงาน',
            'การลาออกจากงานเพื่อพักผ่อน',
            'การเซ็นสัญญากับคู่ค้ารายใหม่',
            'การแจกโบนัสประจำปี'
          ],
          correct_index: 0,
          explanation_th: "'复盘' เดิมเป็นศัพท์หมากรุกจีน ปัจจุบันหมายถึง การถอดบทเรียนและทบทวนข้อดี-ข้อเสียของงานที่ผ่านมา",
          encouragement: 'เข้าใจศัพท์โมเดิร์นบิสซิเนสจีนได้อย่างลึกซึ้ง!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '达成率' (dáchénglǜ) มักใช้กับสิ่งใด?",
          options: [
            'เป้าหมายการขายและ KPI',
            'ราคาตั๋วเครื่องบิน',
            'รสชาติของอาหาร',
            'สภาพอากาศประจำวัน'
          ],
          correct_index: 0,
          explanation_th: "'达成率' ใช้ประเมินอัตราความสำเร็จตามเป้าหมายของโครงการหรือยอดขาย",
          encouragement: 'จำคำศัพท์ชี้วัดความสำเร็จได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "พวกเราได้ปรับปรุงขั้นตอนจนเกิดเป็นวงจรปิดที่สมบูรณ์"',
          tokens: ['形成了闭环', '优化了流程', '我们'],
          correct_sequence: ['我们', '优化了流程', '形成了闭环'],
          pinyin: 'Wǒmen yōuhuà le liúchéng, xíngchéng le bìhuán',
          meaning_th: 'พวกเราได้ปรับปรุงขั้นตอนจนเกิดเป็นวงจรปิดที่สมบูรณ์',
          explanation_th: 'ประธาน (我们) + กริยา 1 (优化了流程) + กริยา 2 (形成了闭环)',
          encouragement: 'ต่อโครงสร้างประโยคระดับผู้บริหารได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '闭环' ตัว '闭' (ปิด) มีหมวดนำใด?",
          options: [
            '门 (หมวดประตู 门字框)',
            '口 (หมวดปาก 口字旁)',
            '穴 (หมวดถ้ำ 穴宝盖)',
            '广 (หมวดอาคาร 广字旁)'
          ],
          correct_index: 0,
          explanation_th: "'闭' มีหมวดนำ '门' (ประตู) สื่อถึงการปิดประตู",
          encouragement: 'เก่งมาก หมวดนำแม่นยำ 100%!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณยืนอยู่หน้าบอร์ดบริหารเพื่อปิดการรายงานประจำไตรมาส ผู้บริหารชื่นชมผลงานและถามถึงแผนขั้นต่อไป คุณควรกล่าวสรุปอย่างไร?',
        options: [
          '感谢各位领导的肯定，我们将继续脚踏实地，优化流程，全力以赴完成年度目标！ (Gǎnxiè gèwèi lǐngdǎo de kěndìng, wǒmen jiāng jìxù jiǎotàshídì, yōuhuà liúchéng, quánlì yǐ fù wánchéng niándù mùbiāo!)',
          '报告完毕，大家可以下班了。 (Bàogào wánbì, dàjiā kěyǐ xiàbān le.)',
          '我不想再汇报了，肚子好饿。 (Wǒ bù xiǎng zài huìbào le, dùzi hǎo è.)',
          '请问今天几月几号？ (Qǐngwèn jīntiān jǐ yuè jǐ hào?)'
        ],
        correct_index: 0,
        explanation_th: "การกล่าวขอบคุณ พร้อมตอกย้ำสำนวน '脚踏实地' และ '优化流程' แสดงถึงความเป็นผู้นำและความมุ่งมั่นในการพาทีมสู่ความสำเร็จ",
        encouragement: 'ยินดีด้วยอย่างยิ่ง! คุณผ่าน Boss Challenge การสื่อสารในองค์กรระดับ Tier 3 สำเร็จ 100%!'
      },
      cheer_trophy: {
        badge_id: 'badge_t3_u26_master',
        badge_name: 'ผู้พิชิตการสื่อสารองค์กรจีนขั้นเทพ 💼🏆',
        message_th: 'ขอแสดงความยินดี! คุณสำเร็จ Unit 26 พร้อมสื่อสารและรายงานผลงานกับองค์กรจีนได้อย่างมืออาชีพและเปี่ยมเสน่ห์!',
        xp_reward: 300
      }
    }
  ]
};
