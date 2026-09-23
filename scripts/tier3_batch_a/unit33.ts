/**
 * scripts/tier3_batch_a/unit33.ts
 * Tier 3 Unit 33: 中国地理与方言 (Geography & Dialects: ภูมิศาสตร์จีนและสำเนียงท้องถิ่น)
 * Fully compliant with Hanzero Schema, Tone Sandhi, Interleaving >= 20%, and Simplified Chinese 100%.
 */

export const unit33 = {
  unit_id: 'tier3_u33',
  tier: 3,
  unit_number: 33,
  title: {
    zh: '中国地理与方言',
    th: 'ภูมิศาสตร์จีนและสำเนียงท้องถิ่น',
    en: 'Geography & Dialects of China'
  },
  description: 'ท่องแดนมังกรผ่านมิติภูมิศาสตร์และภาษาศาสตร์: ความแตกต่างระหว่างภาคเหนือกับภาคใต้ (南北差异), เสน่ห์ของภาษาถิ่นและสำเนียงท้องถิ่น (方言文化与乡音), ตลอดจนภูมิปัญญา 8 ตระกูลอาหารจีน (八大菜系背后的地理)',
  lessons: [
    {
      lesson_id: 't3_u33_l01',
      lesson_number: 1,
      title: {
        zh: '南北差异大盘点',
        th: 'สำรวจความต่างเหนือ-ใต้',
        en: 'North-South Differences Overview'
      },
      can_do: {
        th: 'อธิบายความต่างด้านสภาพอากาศ การใช้ฮีตเตอร์ วัฒนธรรมอาหารเส้น vs ข้าว โดยใช้โครงสร้าง 固然...然而两地人民各具风采',
        en: 'Explain climate, heating, noodles vs rice culture using 固然...然而两地人民各具风采'
      },
      baby_step_goal: 'เป้าหมายวันนี้: เปรียบเทียบความแตกต่างทางวัฒนธรรมและวิถีชีวิตระหว่างคนจีนภาคเหนือและภาคใต้ได้อย่างเข้าใจลึกซึ้ง!',
      vocabulary: [
        {
          id: 'hsk3_3301',
          hanzi: '南北差异',
          pinyin: 'nánběi chāyì',
          display_pinyin: 'nánběi chāyì',
          pinyin_tone: 'nan2bei3 cha1yi4',
          meaning_th: 'ความแตกต่างระหว่างภาคเหนือและภาคใต้',
          meaning_en: 'North-South differences',
          radical: '十',
          radical_name_th: 'หมวดสิบ (十字旁)',
          stroke_count: 28,
          mnemonic: 'ทิศใต้และทิศเหนือ (南北) มีความแตกต่างห่างกัน (差异) = ความต่างเหนือ-ใต้',
          kid_mnemonic: 'แผนที่จีนที่มีเส้นแบ่งแม่น้ำหวยเหอแยกระหว่างเหนือกับใต้ = 南北差异',
          body_gesture: 'กางสองมือซ้ายขวาทำท่าเปรียบเทียบความต่างของสองฟาก'
        },
        {
          id: 'hsk3_3302',
          hanzi: '暖气',
          pinyin: 'nuǎnqì',
          display_pinyin: 'nuǎnqì',
          pinyin_tone: 'nuan3qi4',
          meaning_th: 'ฮีตเตอร์ทำความร้อนส่วนกลาง (ระบบทำความร้อนในอาคาร)',
          meaning_en: 'central heating / radiator',
          radical: '日',
          radical_name_th: 'หมวดดวงอาทิตย์ (日字旁)',
          stroke_count: 17,
          mnemonic: 'ดวงอาทิตย์มอบความอบอุ่น (暖) อากาศร้อนหมุนเวียนในท่อ (气) = ฮีตเตอร์ทำความร้อน',
          kid_mnemonic: 'ท่อเหล็กข้างฝาผนังที่มีไอร้อนอุ่นสบายในฤดูหนาว = 暖气',
          body_gesture: 'สองมือกุมเข้าหากันถูไปมาผิงไออุ่นหน้าฮีตเตอร์'
        },
        {
          id: 'hsk3_3303',
          hanzi: '甜咸',
          pinyin: 'tiánxián',
          display_pinyin: 'tiánxián',
          pinyin_tone: 'tian2xian2',
          meaning_th: 'รสหวานกับรสเค็ม (เช่น ข้อถกเถียงเต้าฮวยหวาน vs เค็ม)',
          meaning_en: 'sweet and salty flavors',
          radical: '甘',
          radical_name_th: 'หมวดหวาน (甘字旁)',
          stroke_count: 16,
          mnemonic: 'รสชาติหวานของน้ำตาล (甜) ประชันกับรสเค็มของเกลือ (咸) = หวานเค็ม',
          kid_mnemonic: 'ช้อนสองคัน คันหนึ่งตักน้ำตาลหวาน อีกคันตักซีอิ๊วเค็ม = 甜咸',
          body_gesture: 'ยื่นสองมือชั่งน้ำหนักสลับกันเหมือนตาชั่งรสหวานกับเค็ม'
        },
        {
          id: 'hsk3_3304',
          hanzi: '面食',
          pinyin: 'miànshí',
          display_pinyin: 'miànshí',
          pinyin_tone: 'mian4shi2',
          meaning_th: 'อาหารประเภทแป้งสาลี (บะหมี่ ซาลาเปา เกี๊ยว แผ่นแป้ง)',
          meaning_en: 'wheat flour food (noodles, buns, dumplings)',
          radical: '面',
          radical_name_th: 'หมวดหน้า/แป้ง (面字旁)',
          stroke_count: 18,
          mnemonic: 'แป้งสาลีบดละเอียด (面) ปรุงเป็นอาหารกินอิ่มท้อง (食) = อาหารประเภทแป้ง',
          kid_mnemonic: 'ซาลาเปาลูกขาวอวบกับชามบะหมี่เส้นยาว = 面食',
          body_gesture: 'สองมือทำท่านวดแป้งสาลีเป็นก้อนกลม'
        },
        {
          id: 'hsk3_3305',
          hanzi: '风采',
          pinyin: 'fēngcǎi',
          display_pinyin: 'fēngcǎi',
          pinyin_tone: 'feng1cai3',
          meaning_th: 'เสน่ห์และเอกลักษณ์อันสง่างาม',
          meaning_en: 'grace / charm / distinctive style',
          radical: '风',
          radical_name_th: 'หมวดลม (风字旁)',
          stroke_count: 13,
          mnemonic: 'สายลมพัดโบก (风) เปล่งประกายสีสันงดงาม (采) = เสน่ห์เอกลักษณ์',
          kid_mnemonic: 'ผ้าคลุมสีสันสดใสปลิวไสวตามสายลมดูสง่างาม = 风采',
          body_gesture: 'ผายสองมือออกกว้างพร้อมรอยยิ้มภาคภูมิใจ'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำว่า 暖气 (nuǎnqì)',
        description_th: 'คำว่า 暖 (nuǎn) เป็นเสียง 3 ต่ำลึก ส่วน 气 (qì) เป็นเสียง 4 หนักแน่น',
        example: '北方冬天有集中供暖气 (ฤดูหนาวภาคเหนือมีฮีตเตอร์ทำความร้อนส่วนกลาง)',
        fun_metaphor: 'เหมือนหย่อนตัวลงนั่งในอ่างน้ำอุ่นแล้วพ่นไอร้อนฟู่ออกมา!',
        reassurance: 'คำนี้ชาวต่างชาติมักประหลาดใจเมื่อไปเยือนจีนภาคเหนือ เพราะในบ้านจะอุ่นจนใส่เสื้อยืดได้'
      },
      grammar_bite: {
        title: 'โครงสร้างการยอมรับความแตกต่างอย่างเปิดกว้าง: 固然...然而两地人民各具风采',
        explanation_th: 'ใช้ในการบรรยายความแตกต่างทางวัฒนธรรม โดยไม่ตัดสินว่าฝ่ายใดดีกว่า แต่ชื่นชมในความหลากหลาย',
        patterns: [
          {
            formula: '南北气候与饮食固然存在差异，然而两地人民各具风采',
            zh: '南北气候与生活习俗固然存在巨大差异，然而两地人民各具独特的文化风采。',
            pinyin: 'Nánběi qìhòu yǔ shēnghuó xísú gùrán cúnzài jùdà chāyì, rán’ér liǎng dì rénmín gè jù dútè de wénhuà fēngcǎi.',
            th: 'สภาพอากาศและประเพณีเหนือ-ใต้แม้จะมีความแตกต่างกันอย่างมหาศาล ทว่าประชาชนทั้งสองถิ่นต่างมีเสน่ห์ทางวัฒนธรรมอันเป็นเอกลักษณ์เฉพาะตัว',
            en: 'Climate and customs north and south indeed differ greatly; however, people in both regions possess unique cultural charm.'
          },
          {
            formula: '北方偏爱 [สิ่งใด]，而南方则更习惯 [สิ่งใด]',
            zh: '北方人主食偏爱面食和水饺，而南方人则更习惯顿顿吃米饭。',
            pinyin: 'Běifāngrén zhǔshí piān’ài miànshí hé shuǐjiǎo, ér Nánfāngrén zé gèng xíguàn dùndùn chī mǐfàn.',
            th: 'คนภาคเหนือนิยมรับประทานอาหารแป้งและเกี๊ยวต้มเป็นอาหารหลัก ส่วนคนภาคใต้คุ้นชินกับการกินข้าวสวยทุกมื้อมากกว่า',
            en: 'Northerners favor wheat noodles and dumplings as staples, while Southerners are used to eating rice every meal.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧑‍💼',
          zh: '小王，我第一次冬天来北京出差，发现屋里竟然热得要穿短袖！',
          pinyin: 'Xiǎo Wáng, wǒ dì-yī cì dōngtiān lái Běijīng chūchāi, fāxiàn wū lǐ jìngrán rè de yào chuān duǎnxiù!',
          th: 'เสี่ยวหวัง นี่เป็นครั้งแรกที่ฉันมาทำงานที่ปักกิ่งในฤดูหนาว เพิ่งค้นพบว่าในห้องเปิดฮีตเตอร์จนร้อนขนาดต้องใส่เสื้อแขนสั้นเลย!',
          en: 'Xiao Wang, first time on business in Beijing in winter, I found indoor heating so warm that I wear short sleeves!'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวหวัง (ชาวปักกิ่ง) 👨‍💼',
          zh: '哈哈！这就是典型的南北差异。北方靠暖气过冬，南方室内外温差小，反而全靠一身正气御寒！',
          pinyin: 'Hāhā! Zhè jiù shì diǎnxíng de nánběi chāyì. Běifāng kào nuǎnqì guòdōng, nánfāng shìnèi-wài wēnchā xiǎo, fǎn’ér quán kào yì shēn zhèngqì yùhán!',
          th: 'ฮ่าๆ! นี่แหละคือความต่างเหนือ-ใต้อันคลาสสิก ภาคเหนือพึ่งพาฮีตเตอร์ผ่านหน้าหนาว ส่วนภาคใต้อุณหภูมิในห้องกับนอกห้องไม่ต่างกัน อาศัยความอดทนล้วนๆ เลยครับ!',
          en: 'Haha! Typical North-South difference. North relies on central heating; South has little indoor-outdoor temp difference, enduring with sheer willpower!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧑‍💼',
          zh: '不仅是供暖，听说连豆腐脑的甜咸两党都能在网上辩论好几天？',
          pinyin: 'Bùjǐn shì gōngnuǎn, tīngshuō lián dòufunǎo de tián-xián liǎng dǎng dōu néng zài wǎngshàng biànlùn hǎo jǐ tiān?',
          th: 'ไม่ใช่แค่เรื่องฮีตเตอร์นะ ได้ยินว่าแม้กระทั่งเต้าฮวย พรรคหวานกับพรรคเค็มก็ยังถกเถียงกันบนเน็ตได้เป็นวันๆ เลยเหรอ?',
          en: 'Not just heating; I heard even sweet vs salty tofu pudding factions debate online for days?'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวหวัง (ชาวปักกิ่ง) 👨‍💼',
          zh: '没错！北方豆腐脑浇咸卤，南方加白糖。饮食习惯固然不同，但两地美食各具风采，都非常好吃！',
          pinyin: 'Méi cuò! Běifāng dòufunǎo jiāo xián lǔ, nánfāng jiā bǎitáng. Yǐnshí xíguàn gùrán bùtóng, dàn liǎng dì měishí gè jù fēngcǎi, dōu fēicháng hǎochī!',
          th: 'ถูกต้องเลยครับ! เต้าฮวยภาคเหนือราดน้ำเกรวี่เค็ม ภาคใต้โรยน้ำตาลทรายขาว รสนิยมการกินแม้จะต่างกัน แต่ของอร่อยสองฟากฟ้าต่างมีเสน่ห์ อร่อยทั้งคู่ครับ!',
          en: 'Spot on! Northern tofu pudding has savory gravy; Southern adds white sugar. Different habits, but cuisines in both regions possess charm, both delicious!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "ในประเทศจีน ระบบ '暖气' (nuǎnqì) มักพบได้ในภูมิภาคใดเป็นหลัก?",
          options: [
            'เมืองทางภาคเหนือของจีน (เหนือเส้นแม่น้ำหวยเหอ-เทือกเขาฉินหลิ่ง)',
            'เกาะไหหลำทางตอนใต้สุด',
            'ฮ่องกงและมาเก๊า',
            'เฉพาะบนเครื่องบิน'
          ],
          correct_index: 0,
          explanation_th: "ระบบฮีตเตอร์รวมส่วนกลาง (集中供暖) ได้รับการจัดสรรตามนโยบายรัฐบาลให้แก่เมืองทางภาคเหนือของจีนเป็นหลัก",
          encouragement: 'จำเกร็ดความรู้ภูมิศาสตร์จีนได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'flash_recall',
          question_th: "อาหารประเภท '面食' (miànshí) นิยมรับประทานเป็นอาหารหลักในแถบใด?",
          options: [
            'ภาคเหนือของจีน (เช่น ปักกิ่ง ซานซี ซานตง ซีอาน)',
            'ริมชายหาดภูเก็ต',
            'สามเหลี่ยมปากแม่น้ำจูเจียง',
            'เฉพาะในเทศกาลกินเจ'
          ],
          correct_index: 0,
          explanation_th: "'面食' คือ อาหารประเภทแป้งสาลี เช่น บะหมี่ เกี๊ยว ซาลาเปา ซึ่งเป็นอาหารหลักของคนจีนภาคเหนือ",
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจวัฒนธรรมอาหารสองฟากฟ้าแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "แม้ว่าสภาพอากาศจะแตกต่างกัน ทว่าอาหารสองถิ่นต่างมีเสน่ห์เฉพาะตัว"',
          tokens: ['两地美食各具风采', '气候固然存在差异', '然而'],
          correct_sequence: ['气候固然存在差异', '然而', '两地美食各具风采'],
          pinyin: 'Qìhòu gùrán cúnzài chāyì, rán’ér liǎng dì měishí gè jù fēngcǎi',
          meaning_th: 'สภาพอากาศแม้จะมีความแตกต่างกัน ทว่าอาหารของสองถิ่นต่างมีเสน่ห์เฉพาะตัว',
          explanation_th: 'การยอมรับ (气候固然存在差异) + คำเชื่อมหักมุม (然而) + ข้อสรุปสุนทรียศาสตร์ (两地美食各具风采)',
          encouragement: 'ต่อประโยคเปรียบเทียบวัฒนธรรมได้อย่างสละสลวย!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '风采' ตัว '风' (ลม/สไตล์) เป็นหมวดนำในตัวเอง สื่อถึงอะไร?",
          options: [
            'สายลมและการเคลื่อนไหวที่มีชีวิตชีวา',
            'ผืนดิน',
            'ก้อนหิน',
            'เปลวไฟ'
          ],
          correct_index: 0,
          explanation_th: "'风' มีความหมายถึงสายลม อากาศ และยังขยายความถึง กลิ่นอาย สไตล์ และประเพณีวัฒนธรรม",
          encouragement: 'เข้าใจมิติลึกซึ้งของอักษรจีนเป็นเลิศ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'เพื่อนชาวต่างชาติถามคุณว่า "อาหารจีนภาคเหนือกับภาคใต้ต่างกันอย่างไร ทำไมบางคนบอกว่าชอบกินแป้ง บางคนชอบกินข้าว?" คุณควรตอบอย่างผู้เชี่ยวชาญวัฒนธรรมอย่างไร?',
        options: [
          '中国地大物博，地理气候固然塑造了“南米北面”的饮食差异，然而两地人民各具风采，无论是北方的水饺面食还是南方的精致米饭点心，都是中华饮食文化的瑰宝！ (Zhōngguó dìdàwùbó, dìlǐ qìhòu gùrán sùzào le “nán mǐ běi miàn” de yǐnshí chāyì, rán’ér liǎng dì rénmín gè jù fēngcǎi, wúlùn shì běifāng de shuǐjiǎo miànshí háishi nánfāng de jīngzhì mǐfàn diǎnxin, dōu shì Zhōnghuá yǐnshí wénhuà de guībǎo!)',
          '北方菜不好吃，只有南方菜才正宗。 (Běifāngcài bù hǎochī, zhǐyǒu nánfāngcài cái zhèngzōng.)',
          '中国人都只吃米饭，不吃面条。 (Zhōngguó rén dōu zhǐ chī mǐfàn, bù chī miàntiáo.)',
          '请问这道汤多少钱一碗？ (Qǐngwèn zhè dào tāng duōshao qián yì wǎn?)'
        ],
        correct_index: 0,
        explanation_th: "คำตอบ '中国地大物博...无论北方水饺面食还是南方点心，都是中华饮食文化瑰宝！' ใช้สำนวนระดับสูง '南米北面' และ '各具风采' ถ่ายทอดความงดงามทางวัฒนธรรมได้อย่างสมบูรณ์แบบ",
        encouragement: 'อธิบายวัฒนธรรมจีนเหนือ-ใต้ได้ดุจนักมานุษยวิทยามืออาชีพ!'
      }
    },
    {
      lesson_id: 't3_u33_l02',
      lesson_number: 2,
      title: {
        zh: '方言文化与乡音',
        th: 'ภาษาถิ่นและสำเนียงบ้านเกิด',
        en: 'Dialects Culture & Regional Accents'
      },
      can_do: {
        th: 'แยกแยะสำเนียงกวางตุ้ง เสฉวน ตะวันออกเฉียงเหนือ (ตงเป่ย) และใช้สำนวน 五湖四海',
        en: 'Distinguish Cantonese, Sichuanese, Dongbei accents, and use idiom 五湖四海'
      },
      baby_step_goal: 'เป้าหมายวันนี้: สัมผัสความหลากหลายของภาษาถิ่นจีน และเข้าใจเพื่อนร่วมงานที่มาจากทั่วสารทิศ!',
      vocabulary: [
        {
          id: 'hsk3_3306',
          hanzi: '方言',
          pinyin: 'fāngyán',
          display_pinyin: 'fāngyán',
          pinyin_tone: 'fang1yan2',
          meaning_th: 'ภาษาถิ่น (Dialect)',
          meaning_en: 'dialect / regional speech',
          radical: '方',
          radical_name_th: 'หมวดทิศทาง (方字旁)',
          stroke_count: 11,
          mnemonic: 'ภาษาคำพูด (言) ประจำท้องถิ่นทิศทางนั้นๆ (方) = ภาษาถิ่น',
          kid_mnemonic: 'กล่องเสียงที่มีสำเนียงพูดแปลกหูแต่น่ารักจากแต่ละมณฑล = 方言',
          body_gesture: 'ยกสองมือแนบหูทำท่าตั้งใจฟังสำเนียงแปลกใหม่'
        },
        {
          id: 'hsk3_3307',
          hanzi: '粤语',
          pinyin: 'yuèyǔ',
          display_pinyin: 'yuèyǔ',
          pinyin_tone: 'yue4yu3',
          meaning_th: 'ภาษากวางตุ้ง (Cantonese)',
          meaning_en: 'Cantonese language',
          radical: '米',
          radical_name_th: 'หมวดข้าว (米字旁)',
          stroke_count: 26,
          mnemonic: 'ภาษาคำพูด (语) ของดินแดนกวางตุ้งไป่เยว่ (粤) = ภาษากวางตุ้ง',
          kid_mnemonic: 'เพลงฮิตกวางตุ้งของดาราดังฮ่องกงที่ร้องเพราะๆ = 粤语',
          body_gesture: 'ทำท่าร้องเพลงอย่างไพเราะแบบนักร้องกวางตุ้ง'
        },
        {
          id: 'hsk3_3308',
          hanzi: '四川话',
          pinyin: 'Sìchuānhuà',
          display_pinyin: 'Sìchuānhuà',
          pinyin_tone: 'Si4chuan1hua4',
          meaning_th: 'ภาษาถิ่นเสฉวน (มีสำเนียงน่ารักและเผ็ดร้อน)',
          meaning_en: 'Sichuan dialect',
          radical: '囗',
          radical_name_th: 'หมวดกรอบล้อม (大口框)',
          stroke_count: 19,
          mnemonic: 'คำพูดภาษา (话) ของแคว้นสายน้ำสี่สายเสฉวน (四川) = ภาษาเสฉวน',
          kid_mnemonic: 'หมีแพนด้ากินไผ่ไปพูดภาษาเสฉวนชวนหัวเราะ = 四川话',
          body_gesture: 'ทำท่าหมีแพนด้าตบมือยิ้มร่าเริง'
        },
        {
          id: 'hsk3_3309',
          hanzi: '口音',
          pinyin: 'kǒuyīn',
          display_pinyin: 'kǒuyīn',
          pinyin_tone: 'kou3yin1',
          meaning_th: 'สำเนียงการออกเสียง',
          meaning_en: 'accent',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 12,
          mnemonic: 'น้ำเสียงสำเนียง (音) ที่เปล่งออกจากริมฝีปาก (口) = สำเนียง',
          kid_mnemonic: 'คลื่นเสียงดนตรีหลากสีที่ลอยพุ่งออกจากปาก = 口音',
          body_gesture: 'ใช้นิ้วชี้ชี้ที่ริมฝีปากเพื่อชี้ประเด็นสำเนียง'
        },
        {
          id: 'hsk3_3310',
          hanzi: '五湖四海',
          pinyin: 'wǔhúsìhǎi',
          display_pinyin: 'wǔhúsìhǎi',
          pinyin_tone: 'wu3hu2si4hai3',
          meaning_th: 'มาจากทั่วทุกทิศทุกสารทิศ (จากทั่วทุกมุมโลก)',
          meaning_en: 'from all corners of the land / from everywhere',
          radical: '二',
          radical_name_th: 'หมวดสอง (二部)',
          stroke_count: 36,
          mnemonic: 'ทะเลสาบทั้งห้า (五湖) และมหาสมุทรทั้งสี่ (四海) = มาจากทั่วทุกสารทิศ',
          kid_mnemonic: 'เพื่อนๆ จากทั่วโลกจับมือล้อมวงรอบลูกโลก = 五湖四海',
          body_gesture: 'กางสองแขนออกกว้างหมุนรอบตัวแสดงความกว้างไกล'
        }
      ],
      tone_rule: {
        rule_name: 'สำนวน 五湖四海 (wǔhúsìhǎi) จังหวะเสียง 3-2-4-3',
        description_th: 'พยางค์: wǔ (3), hú (2), sì (4), hǎi (3) — ระดับเสียงขึ้นลงหลากหลาย ดุจคลื่นน้ำในทะเลสาบและมหาสมุทร',
        example: '朋友来自五湖四海 (มิตรสหายมาจากทั่วทุกสารทิศ)',
        fun_metaphor: 'เหมือนคลื่นน้ำซัดขึ้นเนินแล้วม้วนลงสู่ห้วงมหาสมุทร!',
        reassurance: 'คำนี้ใช้บ่อยมากในงานเลี้ยงสัมมนาและการต้อนรับเพื่อนต่างถิ่น'
      },
      grammar_bite: {
        title: 'การต้อนรับมิตรสหายต่างแดน: 汇聚了来自五湖四海的朋友',
        explanation_th: 'วลีแห่งความอบอุ่นที่แสดงถึงการเปิดรับความหลากหลายของผู้คนจากทุกภาค',
        patterns: [
          {
            formula: '在这座城市里，汇聚了来自五湖四海的朋友',
            zh: '在深圳这样开放的都市里，汇聚了来自五湖四海的创业者。',
            pinyin: 'Zài Shēnzhèn zhèyàng kāifàng de dūshì lǐ, huìjù le láizì wǔhúsìhǎi de chuàngyèzhě.',
            th: 'ในมหานครที่เปิดกว้างอย่างเซินเจิ้น ได้รวบรวมเหล่าผู้บุกเบิกธุรกิจที่มาจากทั่วทุกสารทิศ',
            en: 'In an open metropolis like Shenzhen, entrepreneurs from all corners of the country gather together.'
          },
          {
            formula: '虽然带着不同口音，但是大家 + [การกระทำ]',
            zh: '虽然同事们带着各自的家乡口音，但是大家用普通话沟通得十分顺畅。',
            pinyin: 'Suīrán tóngshìmen dàizhe gèzì de jiāxiāng kǒuyīn, dànshì dàjiā yòng pǔtōnghuà gōutōng de shífēn shùnchàng.',
            th: 'แม้ว่าเพื่อนร่วมงานจะติดสำเนียงบ้านเกิดของตนมาบ้าง แต่ทุกคนสื่อสารภาษาจีนกลางได้อย่างราบรื่นยิ่ง',
            en: 'Although colleagues carry regional accents, everyone communicates very smoothly in Mandarin.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧑‍💼',
          zh: '小陈，我们团队里的伙伴听口音好像来自很多不同的省份啊？',
          pinyin: 'Xiǎo Chén, wǒmen tuánduì lǐ de huǒbàn tīng kǒuyīn hǎoxiàng láizì hěn duō bùtóng de shěngfèn a?',
          th: 'เสี่ยวเฉิน เพื่อนๆ ในทีมเราฟังจากสำเนียงแล้วดูเหมือนจะมาจากหลากหลายมณฑลเลยนะ?',
          en: 'Xiao Chen, judging from accents, our team members seem to come from many different provinces?'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวเฉิน (ฝ่ายบุคคล) 👩‍💼',
          zh: '是的！我们这儿真是“五湖四海皆兄弟”。有讲粤语的广东人、爱说“巴适”的四川妹子，还有幽默的东北老铁！',
          pinyin: 'Shì de! Wǒmen zhèr zhēn shì “wǔhúsìhǎi jiē xiōngdì”. Yǒu jiǎng Yuèyǔ de Guǎngdōngrén, ài shuō “bāshì” de Sìchuān mèizi, hái yǒu yōumò de Dōngběi lǎotiě!',
          th: 'ใช่แล้วค่ะ! ที่นี่พวกเรา “มาจากทั่วทุกสารทิศล้วนเป็นพี่น้องกัน” จริงๆ มีทั้งคนกวางตุ้งพูดภาษากวางตุ้ง, สาวเสฉวนที่ชอบพูดว่า “สบายดีจัง (巴适)”, และพี่น้องตงเป่ยผู้อารมณ์ขันค่ะ!',
          en: 'Yes! Here truly "all men are brothers across the land". Cantonese speakers, Sichuan girls saying "bashi", and witty Dongbei pals!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧑‍💼',
          zh: '太有意思了！平时大家聊天会夹杂方言吗？',
          pinyin: 'Tài yǒuyìsi le! Píngshí dàjiā liáotiān huì jiāzá fāngyán ma?',
          th: 'น่าสนใจมากเลยครับ! ปกติเวลาคุยเล่นกันจะมีภาษาถิ่นปนมาบ้างไหมครับ?',
          en: 'So interesting! Do folks mix in dialects during casual chats?'
        },
        {
          speaker: 'B',
          speaker_name: 'เสี่ยวเฉิน (ฝ่ายบุคคล) 👩‍💼',
          zh: '工作时严谨用普通话，茶水间休息时各种乡音齐飞，反而让团队特别有烟火气和凝聚力！',
          pinyin: 'Gōngzuò shí yánjǐn yòng pǔtōnghuà, cháshuǐjiān xiūxi shí gè zhǒng xiāngyīn qífēi, fǎn’ér ràng tuánduì tèbié yǒu yānhuǒqì hé níngjùlì!',
          th: 'เวลาทำงานเราใช้ภาษาจีนกลางอย่างเคร่งครัดค่ะ แต่ตอนพักดื่มชากาแฟ สำเนียงบ้านเกิดแต่ละภาคจะบินว่อนเลย ทำให้ทีมดูมีชีวิตชีวาและกลมเกลียวกันเป็นพิเศษค่ะ!',
          en: 'Strict Mandarin during work, but during tea breaks all hometown accents fly, making the team lively and cohesive!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "สำนวนจีน '五湖四海' (wǔhúsìhǎi) มีความหมายตรงกับข้อใด?",
          options: [
            'มาจากทั่วทุกสารทิศ ทั่วทุกมุมแคว้น',
            'การเดินทางท่องเที่ยวทางน้ำ',
            'การว่ายน้ำข้ามทะเลสาบ',
            'การประมงน้ำลึก'
          ],
          correct_index: 0,
          explanation_th: "'五湖四海' คือ ทะเลสาบทั้งห้าและทะเลทั้งสี่ อุปมาถึง ผู้คนที่มาจากทั่วทุกสารทิศ",
          encouragement: 'จำสำนวนมิตรภาพไร้พรมแดนได้อย่างแม่นยำ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '巴适' (bāshì) เป็นภาษาถิ่นของมณฑลใด แปลว่า สบายใจ/ยอดเยี่ยม?",
          options: [
            'มณฑลเสฉวน (四川)',
            'มณฑลซานตง (山东)',
            'เกาะไต้หวัน (台湾)',
            'มณฑลเฮยหลงเจียง (黑龙江)'
          ],
          correct_index: 0,
          explanation_th: "'巴适' (bāshì) เป็นคำภาษาถิ่นเสฉวนยอดฮิต แปลว่า สบายยอดเยี่ยม ฟินสุดๆ",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์สแลงภาษาถิ่นเสฉวนแม่นเป๊ะ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ในเมืองใหญ่ได้รวบรวมมิตรสหายที่มาจากทั่วทุกสารทิศ"',
          tokens: ['来自五湖四海的朋友', '在大都市里', '汇聚了'],
          correct_sequence: ['在大都市里', '汇聚了', '来自五湖四海的朋友'],
          pinyin: 'Zài dà dūshì lǐ, huìjù le láizì wǔhúsìhǎi de péngyou',
          meaning_th: 'ในเมืองใหญ่ได้รวบรวมมิตรสหายที่มาจากทั่วทุกสารทิศ',
          explanation_th: 'สถานที่ (在大都市里) + กริยา (汇聚了) + กรรม (来自五湖四海的朋友)',
          encouragement: 'ต่อประโยคสัมพันธภาพข้ามถิ่นฐานได้อย่างลงตัว!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '方言' ตัว '言' (คำพูด) มีความหมายดั้งเดิมตรงกับสิ่งใด?",
          options: [
            'ถ้อยคำและการพูดจาของมนุษย์',
            'ลมหายใจ',
            'เสียงดนตรี',
            'แสงสว่าง'
          ],
          correct_index: 0,
          explanation_th: "'言' เป็นหมวดนำคำพูด สื่อถึงภาษาและการสื่อสารของมนุษย์",
          encouragement: 'เข้าใจรากศัพท์อักษรจีนอย่างถ่องแท้!'
        }
      ],
      boss_challenge: {
        scenario_th: 'ในงานปาร์ตี้ของบริษัท มีเพื่อนร่วมงานจากปักกิ่ง กวางโจว เฉิงตู และฮาร์บิน มารวมตัวกัน คุณได้รับเชิญให้กล่าวทักทาย ควรพูดอย่างไรให้กินใจทุกคน?',
        options: [
          '大家来自五湖四海，操着不同的乡音，却为了同一个梦想齐聚一堂。干了这杯酒，我们都是最好的战友！ (Dàjiā láizì wǔhúsìhǎi, cāozhe bùtóng de xiāngyīn, què wèile tóng yí ge mèngxiǎng qíjù yìtáng. Gān le zhè bēi jiǔ, wǒmen dōu shì zuì hǎo de zhànyǒu!)',
          '你们的方言太难听了，以后都别说了。 (Nǐmen de fāngyán tài nántīng le, yǐhòu dōu bié shuō le.)',
          '我不喜欢跟外地人聊天，好无聊。 (Wǒ bù xǐhuan gēn wàidìrén liáotiān, hǎo wúliáo.)',
          '请问这瓶红酒多少钱买的？ (Qǐngwèn zhè píng hóngjiǔ duōshao qián mǎi de?)'
        ],
        correct_index: 0,
        explanation_th: "คำกล่าว '大家来自五湖四海，操着不同的乡音，却为了同一个梦想齐聚一堂...我们都是最好的战友！' ผสานความหลากหลายทางภาษาถิ่น หลอมรวมพลังใจ และสร้างความเป็นหนึ่งเดียวได้อย่างลึกซึ้ง",
        encouragement: 'ผูกใจมิตรสหายทั่วแคว้นแดนมังกรได้อย่างงดงาม!'
      }
    },
    {
      lesson_id: 't3_u33_l03',
      lesson_number: 3,
      title: {
        zh: '八大菜系背后的地理',
        th: 'ภูมิศาสตร์เบื้องหลัง 8 ตระกูลอาหารจีน',
        en: 'Geography Behind Eight Great Cuisines'
      },
      can_do: {
        th: 'อธิบายความสัมพันธ์ระหว่างภูมิศาสตร์ สภาพอากาศ และ 8 ตระกูลอาหารจีน โดยใช้โครงสร้าง 得益于优越的地理环境...',
        en: 'Explain 8 Great Cuisines and geography using 得益于优越的地理环境...'
      },
      baby_step_goal: 'เป้าหมายวันนี้: รู้จักต้นกำเนิดและจุดเด่นของ 8 ตระกูลอาหารจีน สั่งอาหารอย่างผู้รอบรู้รสชาติท้องถิ่น!',
      vocabulary: [
        {
          id: 'hsk3_3311',
          hanzi: '菜系',
          pinyin: 'càixì',
          display_pinyin: 'càixì',
          pinyin_tone: 'cai4xi4',
          meaning_th: 'ตระกูลอาหาร / สำนักอาหาร (Cuisine Style)',
          meaning_en: 'cuisine system / culinary tradition',
          radical: '艹',
          radical_name_th: 'หมวดหญ้า (草字头)',
          stroke_count: 18,
          mnemonic: 'พืชผักอาหาร (菜) เชื่อมโยงเป็นระบบเครือข่ายประเพณี (系) = ตระกูลอาหาร',
          kid_mnemonic: 'ตำราพิชัยยุทธ์การทำอาหารแบ่งเป็นแปดสำนักใหญ่ = 菜系',
          body_gesture: 'กางนิ้วมือหมุนเป็นระบบแปดตระกูลอาหาร'
        },
        {
          id: 'hsk3_3312',
          hanzi: '地理环境',
          pinyin: 'dìlǐ huánjìng',
          display_pinyin: 'dìlǐ huánjìng',
          pinyin_tone: 'di4li3 huan2jing4',
          meaning_th: 'สภาพแวดล้อมทางภูมิศาสตร์',
          meaning_en: 'geographical environment',
          radical: '土',
          radical_name_th: 'หมวดดิน (提土旁)',
          stroke_count: 36,
          mnemonic: 'ผืนแผ่นดินและสายน้ำ (地理) ล้อมรอบตัวเราเป็นสิ่งแวดล้อม (环境) = สภาพแวดล้อมทางภูมิศาสตร์',
          kid_mnemonic: 'ภูเขา แม่น้ำ และท้องทะเลที่โอบล้อมเมือง = 地理环境',
          body_gesture: 'สองมือวาดแนวเทือกเขาและแม่น้ำรอบตัว'
        },
        {
          id: 'hsk3_3313',
          hanzi: '气候',
          pinyin: 'qìhòu',
          display_pinyin: 'qìhòu',
          pinyin_tone: 'qi4hou4',
          meaning_th: 'สภาพภูมิอากาศ',
          meaning_en: 'climate',
          radical: '气',
          radical_name_th: 'หมวดอากาศ (气字旁)',
          stroke_count: 13,
          mnemonic: 'ไออากาศ (气) ผันแปรตามฤดูกาลและกาลเวลา (候) = สภาพภูมิอากาศ',
          kid_mnemonic: 'เมฆฝน ดวงอาทิตย์ และเกล็ดหิมะที่สลับกันมาเยือน = 气候',
          body_gesture: 'โบกมือพัดไอร้อนแล้วกอดอกสัมผัสลมหนาว'
        },
        {
          id: 'hsk3_3314',
          hanzi: '烹饪',
          pinyin: 'pēngrèn',
          display_pinyin: 'pēngrèn',
          pinyin_tone: 'peng1ren4',
          meaning_th: 'ศิลปะการปรุงอาหาร (การทำอาหารระดับเชฟ)',
          meaning_en: 'culinary art / cooking technique',
          radical: '灬',
          radical_name_th: 'หมวดจุดไฟสี่จุด (四点底)',
          stroke_count: 15,
          mnemonic: 'ตั้งไฟปรุงต้ม (烹) จนอาหารสุกหอมกรุ่น (饪) = ศิลปะการปรุงอาหาร',
          kid_mnemonic: 'เชฟควงกระทะที่มีเปลวไฟลุกท่วมอย่างช่ำชอง = 烹饪',
          body_gesture: 'สองมือทำท่าสะบัดกระทะเหล็กปรุงอาหารอย่างคล่องแคล่ว'
        },
        {
          id: 'hsk3_3315',
          hanzi: '地道',
          pinyin: 'dìdao',
          display_pinyin: 'dìdao',
          pinyin_tone: 'di4dao',
          meaning_th: 'ต้นตำรับแท้ / ดั้งเดิมดั้งเดิม (Authentic)',
          meaning_en: 'authentic / genuine / typical',
          radical: '土',
          radical_name_th: 'หมวดดิน (提土旁)',
          stroke_count: 18,
          mnemonic: 'กำเนิดจากวิถีทาง (道) ของผืนดินท้องถิ่นนั้นแท้จริง (地) = ต้นตำรับแท้',
          kid_mnemonic: 'สลักตราประทับสีแดงว่า "สูตรต้นตำรับแท้ร้อยเปอร์เซ็นต์" = 地道',
          body_gesture: 'ยกนิ้วโป้งขึ้นแล้วพยักหน้ายืนยันความอร่อยแบบออริจินัล'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำว่า 地道 (dìdao) เป็นเสียงเบา',
        description_th: 'คำว่า 地道 เมื่อแปลว่า "ต้นตำรับแท้ / ของแท้ดั้งเดิม" พยางค์ 道 จะออกเสียงเบา (dìdao)',
        example: '尝尝地道的川菜 (ลิ้มลองอาหารเสฉวนต้นตำรับแท้ๆ)',
        fun_metaphor: 'เสียงสับลงหนักแน่นแล้วแตะเบาๆ เหมือนเชฟแตะเกลือโรยปิดท้ายจาน!',
        reassurance: 'หากอ่าน dìdào จะหมายถึง "อุโมงค์ใต้ดิน" ต้องอ่าน dìdao ถึงจะแปลว่า "ต้นตำรับแท้"'
      },
      grammar_bite: {
        title: 'โครงสร้างความสัมพันธ์ระหว่างภูมิศาสตร์และรสชาติ: 得益于...，孕育了...',
        explanation_th: 'ใช้ในการอธิบายว่าทำไมอาหารแต่ละภาคถึงมีรสชาติเฉพาะตัวตามสภาพแวดล้อม',
        patterns: [
          {
            formula: '得益于优越的地理环境，孕育出了独具特色的 [ตระกูลอาหาร]',
            zh: '得益于广东沿海丰富的海鲜资源，孕育出了清淡鲜美的粤菜体系。',
            pinyin: 'Déyì yú Guǎngdōng yánhǎi fēngfù de hǎixiān zīyuán, yùnyù chū le qīngdàn xiānměi de Yuècài tǐxì.',
            th: 'ด้วยอานิสงส์จากทรัพยากรอาหารทะเลอันอุดมสมบูรณ์เลียบชายฝั่งกวางตุ้ง จึงได้หล่อหลอมระบบอาหารกวางตุ้งที่เน้นความสดหวานกลมกล่อม',
            en: 'Benefiting from abundant coastal seafood in Guangdong, the fresh and subtle Cantonese culinary system was nurtured.'
          },
          {
            formula: '因为气候潮湿，所以当地人偏爱用 [เครื่องปรุง] 驱寒去湿',
            zh: '四川盆地气候潮湿阴冷，因此当地烹饪偏爱使用花椒和辣椒来驱寒去湿。',
            pinyin: 'Sìchuān péndì qìhòu cháoshī yīnlěng, yīncǐ dāngdì pēngrèn piān’ài shǐyòng huājiāo hé làjiāo lái qūhán qùshī.',
            th: 'แอ่งกระทะเสฉวนมีสภาพอากาศชื้นและหนาวเย็น ดังนั้นการปรุงอาหารท้องถิ่นจึงนิยมใช้พริกและพริกไทยฮวาเจียวเพื่อขับความชื้นและความหนาว',
            en: 'Sichuan Basin climate is humid and chilly, so local cooking favors Sichuan pepper and chili to dispel cold and dampness.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧑‍💼',
          zh: '张主厨，中国常说的“八大菜系”，背后的地理秘密到底是什么？',
          pinyin: 'Zhāng zhǔchú, Zhōngguó cháng shuō de “bādà càixì”, bèihòu de dìlǐ mìmì dàodǐ shì shénme?',
          th: 'เชฟจางครับ ที่คนจีนมักพูดถึง “แปดตระกูลอาหารใหญ่” ความลับทางภูมิศาสตร์เบื้องหลังคืออะไรกันแน่ครับ?',
          en: 'Chef Zhang, what is the geographical secret behind China’s famous "Eight Great Cuisines"?'
        },
        {
          speaker: 'B',
          speaker_name: 'เชฟจาง (มาสเตอร์เชฟ) 👨‍🍳',
          zh: '正所谓“一方水土养一方人”。鲁苏粤川、闽浙湘徽，每一派烹饪都得益于当地独特的地理环境和气候！',
          pinyin: 'Zhèng suǒwèi “yì fāng shuǐtǔ yǎng yì fāng rén”. Lǔ-Sū-Yuè-Chuān, Mǐn-Zhè-Xiāng-Huī, měi yí pài pēngrèn dōu déyì yú dāngdì dútè de dìlǐ huánjìng hé qìhòu!',
          th: 'ดั่งคำที่ว่า “น้ำและผืนดินถิ่นใด ย่อมหล่อเลี้ยงผู้คนถิ่นนั้น” หลู่ ซู เยว่ ชวน หมิ่น เจ้อ เซียง ฮุย ทุกสำนักการปรุงอาหารล้วนได้อานิสงส์จากภูมิศาสตร์และภูมิอากาศเฉพาะตัวครับ!',
          en: 'As the saying goes, "Each land nurtures its own people". Lu, Su, Yue, Chuan, Min, Zhe, Xiang, Hui all benefit from unique local geography and climate!'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย 🧑‍💼',
          zh: '比如川菜吃辣是因为盆地湿气重，粤菜清鲜是因为靠海食材丰富？',
          pinyin: 'Bǐrú Chuāncài chī là shì yīnwèi péndì shīqì zhòng, Yuècài qīngxiān shì yīnwèi kàohǎi shícái fēngfù?',
          th: 'เช่น อาหารเสฉวนกินเผ็ดเพราะแอ่งกระทะมีความชื้นสะสม อาหารกวางตุ้งเน้นความสดหวานเพราะติดทะเลวัตถุดิบสมบูรณ์ใช่ไหมครับ?',
          en: 'Like Sichuan eating spicy due to basin dampness, while Cantonese stays fresh due to coastal bounties?'
        },
        {
          speaker: 'B',
          speaker_name: 'เชฟจาง (มาสเตอร์เชฟ) 👨‍🍳',
          zh: '完全正确！懂得了地理，才能真正品出中国菜最地道的灵魂！',
          pinyin: 'Wánquán zhèngquè! Dǒngdé le dìlǐ, cái néng zhēnzhèng pǐn chū Zhōngguócài zuì dìdao de línghún!',
          th: 'ถูกต้องที่สุดครับ! เมื่อเข้าใจภูมิศาสตร์อย่างลึกซึ้ง จึงจะสามารถลิ้มรสวิญญาณต้นตำรับแท้ๆ ของอาหารจีนได้อย่างแท้จริง!',
          en: 'Spot on! Understanding geography allows one to truly savor the most authentic soul of Chinese cuisine!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '八大菜系' (bādà càixì) ของจีนประกอบด้วยสำนักใดบ้าง?",
          options: [
            '鲁 (ซานตง), 川 (เสฉวน), 粤 (กวางตุ้ง), 苏 (เจียงซู), 闽 (ฮกเกี้ยน), 浙 (เจ้อเจียง), 湘 (หูหนาน), 徽 (อันฮุย)',
            'อาหารจานด่วน 8 แบรนด์ดัง',
            'ขนมหวาน 8 ชนิดในพระราชวัง',
            'บะหมี่กึ่งสำเร็จรูป 8 รสชาติ'
          ],
          correct_index: 0,
          explanation_th: "八大菜系 คือ 8 ตระกูลอาหารเอกของจีน: ซานตง (鲁), เสฉวน (川), กวางตุ้ง (粤), เจียงซู (苏), ฮกเกี้ยน (闽), เจ้อเจียง (浙), หูหนาน (湘), อันฮุย (徽)",
          encouragement: 'จำสุดยอดแปดสำนักอาหารจีนได้อย่างแม่นยำ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '地道' (dìdao) เมื่ออ่านพยางค์หลังเป็นเสียงเบา มีความหมายว่าอย่างไร?",
          options: [
            'รสชาติต้นตำรับแท้ ดั้งเดิม (Authentic)',
            'อุโมงค์ใต้ดินสำหรับหลบภัย',
            'ถนนคนเดิน',
            'ทางด่วนพิเศษ'
          ],
          correct_index: 0,
          explanation_th: "'地道' (dìdao) แปลว่า รสชาติต้นตำรับดั้งเดิมแท้ๆ",
          encouragement: 'ยอดเยี่ยมมาก! แยกแยะคำหลายเสียงได้อย่างถูกต้อง!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ด้วยอานิสงส์จากสภาพแวดล้อมทางภูมิศาสตร์ จึงได้หล่อหลอมอาหารรสเลิศ"',
          tokens: ['孕育出了地道美食', '独特的地理环境', '得益于'],
          correct_sequence: ['得益于', '独特的地理环境', '孕育出了地道美食'],
          pinyin: 'Déyì yú dútè de dìlǐ huánjìng, yùnyù chū le dìdao měishí',
          meaning_th: 'ด้วยอานิสงส์จากสภาพแวดล้อมทางภูมิศาสตร์อันเป็นเอกลักษณ์ จึงได้หล่อหลอมอาหารต้นตำรับเลิศรส',
          explanation_th: 'คำนำเหตุผล (得益于独特的地理环境) + ผลลัพธ์ (孕育出了地道美食)',
          encouragement: 'ต่อประโยคสุนทรียศาสตร์แห่งอาหารได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '烹饪' (ศิลปะการทำอาหาร) ตัว '烹' มีหมวดนำ '灬' (สี่จุด) ด้านล่าง สื่อถึงอะไร?",
          options: [
            'เปลวไฟที่ใช้ตั้งหม้อปรุงอาหาร (火)',
            'หยดน้ำสี่หยด',
            'เมล็ดข้าวสี่เมล็ด',
            'ขาโต๊ะสี่ขา'
          ],
          correct_index: 0,
          explanation_th: "'灬' (四点底) คือ รูปแปลงของอักษร '火' (ไฟ) เมื่ออยู่ด้านล่าง สื่อถึงการตั้งไฟต้มผัดแกงทอด",
          encouragement: 'รอบรู้รากศัพท์อักษรจีนเป็นเลิศ!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณได้รับเชิญเป็นกรรมการในงานเทศกาลอาหารนานาชาติ คุณต้องการบรรยายสรุปความเชื่อมโยงระหว่างภูมิศาสตร์และรสชาติของ 8 ตระกูลอาหารจีน ควรพูดอย่างไร?',
        options: [
          '所谓一方水土养一方人，八大菜系的诞生正是得益于中国幅员辽阔的地理环境与气候差异，无论是川菜的麻辣驱湿还是粤菜的原汁原味，都展现了人与自然和谐共生的地道魅力！ (Suǒwèi yì fāng shuǐtǔ yǎng yì fāng rén, bādà càixì de dànshēng zhèng shì déyì yú Zhōngguó fúyuán liáokuò de dìlǐ huánjìng yǔ qìhòu chāyì, wúlùn shì Chuāncài de málà qūshī háishi Yuècài de yuánzhī-yuánwèi, dōu zhǎnxiàn le rén yǔ zìrán héxié gòngshēng de dìdao mèilì!)',
          '中国菜都差不多，全放味精。 (Zhōngguócài dōu chàbuduō, quán fàng wèijīng.)',
          '我只吃汉堡包，中国菜我吃不惯。 (Wǒ zhǐ chī hànbǎobāo, Zhōngguócài wǒ chī bú guàn.)',
          '请问服务员能给我一双筷子吗？ (Qǐngwèn fúwùyuán néng gěi wǒ yì shuāng kuàizi ma?)'
        ],
        correct_index: 0,
        explanation_th: "คำกล่าว '所谓一方水土养一方人，八大菜系的诞生正是得益于中国幅员辽阔的地理环境与气候差异...都展现了人与自然和谐共生的地道魅力！' สรุปปรัชญาความสัมพันธ์ระหว่างมนุษย์ ธรรมชาติ ภูมิศาสตร์ และวัฒนธรรมอาหารได้อย่างลึกซึ้งไร้ที่ติ",
        encouragement: 'ได้รับคำชื่นชมจากมาสเตอร์เชฟทั้ง 8 สำนักอย่างท่วมท้น!'
      }
    },
    {
      lesson_id: 't3_u33_l04',
      lesson_number: 4,
      title: {
        zh: 'Boss Challenge: 东西南北中！向世界讲述多元中国',
        th: 'ภารกิจบอส: เล่าเรื่องความหลากหลายของจีนสู่เวทีโลก',
        en: 'Boss Challenge: Presenting Diverse China to the World'
      },
      can_do: {
        th: 'บรรยายความหลากหลายทางภูมิศาสตร์ ภาษาถิ่น วัฒนธรรมเหนือ-ใต้สู่สายตาชาวโลก ผสานคำว่า 地大物博, 包容性, และ 人文风情',
        en: 'Narrate geographical diversity, dialects, and North-South culture using 地大物博, 包容性, and 人文风情'
      },
      baby_step_goal: 'เป้าหมายวันนี้: ถ่ายทอดความมหัศจรรย์แห่งความหลากหลายของแผ่นดินจีนได้อย่างลึกซึ้งและเปี่ยมเสน่ห์!',
      vocabulary: [
        {
          id: 'hsk3_3316',
          hanzi: '地大物博',
          pinyin: 'dìdàwùbó',
          display_pinyin: 'dìdàwùbó',
          pinyin_tone: 'di4da4wu4bo2',
          meaning_th: 'ดินแดนกว้างใหญ่ไพศาล อุดมสมบูรณ์ด้วยทรัพยากร',
          meaning_en: 'vast territory and abundant resources',
          radical: '土',
          radical_name_th: 'หมวดดิน (提土旁)',
          stroke_count: 27,
          mnemonic: 'แผ่นดินกว้างใหญ่ (地大) สรรพสิ่งอุดมสมบูรณ์ไพศาล (物博) = ดินแดนกว้างใหญ่ทรัพยากรล้นเหลือ',
          kid_mnemonic: 'แผนที่แผ่นดินมังกรกว้างใหญ่ที่มีทั้งภูเขาหิมะ แม่น้ำ และทุ่งหญ้า = 地大物博',
          body_gesture: 'กางสองแขนออกกว้างสุดตัวแสดงความไพศาลของแผ่นดิน'
        },
        {
          id: 'hsk3_3317',
          hanzi: '包容性',
          pinyin: 'bāoróngxìng',
          display_pinyin: 'bāoróngxìng',
          pinyin_tone: 'bao1rong2xing4',
          meaning_th: 'ความใจกว้างเปิดรับความหลากหลาย (Inclusivity)',
          meaning_en: 'inclusiveness / tolerance',
          radical: '勹',
          radical_name_th: 'หมวดห่อหุ้ม (包字头)',
          stroke_count: 23,
          mnemonic: 'โอบอุ้มห่อหุ้มไว้ (包) บรรจุหลอมรวมทุกสิ่ง (容) มีคุณลักษณะเปิดกว้าง (性) = การเปิดรับความหลากหลาย',
          kid_mnemonic: 'อ้อมกอดอุ่นๆ ที่ยินดีต้อนรับเพื่อนทุกคนไม่ว่าจะมาจากไหน = 包容性',
          body_gesture: 'สองมือทำท่าโอบกอดรับทุกสิ่งเข้าสู่หัวใจ'
        },
        {
          id: 'hsk3_3318',
          hanzi: '人文风情',
          pinyin: 'rénwén fēngqíng',
          display_pinyin: 'rénwén fēngqíng',
          pinyin_tone: 'ren2wen2 feng1qing2',
          meaning_th: 'วิถีชีวิต ศิลปวัฒนธรรม และเสน่ห์ของผู้คนท้องถิ่น',
          meaning_en: 'humanistic customs and local lifestyle charm',
          radical: '亻',
          radical_name_th: 'หมวดคน (单人旁)',
          stroke_count: 24,
          mnemonic: 'วัฒนธรรมของมนุษย์ (人文) เสน่ห์บรรยากาศประเพณี (风情) = วิถีชีวิตและเสน่ห์ท้องถิ่น',
          kid_mnemonic: 'เทศกาลระบำพื้นเมืองรื่นเริงของผู้คนตามท้องถิ่น = 人文风情',
          body_gesture: 'ทำท่าร่ายรำเบาๆ สะท้อนเสน่ห์ประเพณีพื้นบ้าน'
        },
        {
          id: 'hsk3_3319',
          hanzi: '瑰宝',
          pinyin: 'guībǎo',
          display_pinyin: 'guībǎo',
          pinyin_tone: 'gui1bao3',
          meaning_th: 'สมบัติล้ำค่า / อัญมณีแห่งอารยธรรม',
          meaning_en: 'rarity / treasure of civilization',
          radical: '王',
          radical_name_th: 'หมวดหยก/ราชา (王字旁)',
          stroke_count: 22,
          mnemonic: 'หยกวิเศษสีแดงล้ำค่า (瑰) ผสมผสานกับสมบัติแห่งแผ่นดิน (宝) = สมบัติล้ำค่า',
          kid_mnemonic: 'หีบสมบัติสีทองที่มีแสงเปล่งประกายเจิดจ้า = 瑰宝',
          body_gesture: 'ประคองสองมือเสมือนถืออัญมณีล้ำค่า'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียงคำว่า 瑰宝 (guībǎo)',
        description_th: 'คำว่า 瑰 (guī) เป็นเสียง 1 สูงยาว และ 宝 (bǎo) เป็นเสียง 3 ต่ำลึก ทอดเสียงนิ่งมั่นคง',
        example: '中华文明的瑰宝 (สมบัติล้ำค่าแห่งอารยธรรมจีน)',
        fun_metaphor: 'เหมือนเสียงเคาะระฆังแก้วกริ๊งแล้วเก็บใส่หีบสมบัติทองคำ!',
        reassurance: 'คำนี้ใช้ยกย่องมรดกทางวัฒนธรรมได้อย่างวิจิตรตระการตา'
      },
      grammar_bite: {
        title: 'การสรุปภาพรวมแห่งความหลากหลาย: 正是这种...塑造了...的独特魅力',
        explanation_th: 'สำนวนวิเคราะห์ทางวัฒนธรรมชั้นสูงเพื่อบรรยายความเป็นพหุวัฒนธรรม',
        patterns: [
          {
            formula: '地大物博的自然环境，孕育了极具包容性的人文风情',
            zh: '地大物博的自然环境，孕育了中华文明极具包容性的人文风情与多元文化。',
            pinyin: 'Dìdàwùbó de zìrán huánjìng, yùnyù le Zhōnghuá wénmíng jí jù bāoróngxìng de rénwén fēngqíng yǔ duōyuán wénhuà.',
            th: 'สภาพแวดล้อมธรรมชาติที่กว้างใหญ่ไพศาล ได้หล่อหลอมวิถีชีวิตและวัฒนธรรมอันหลากหลายที่เปี่ยมล้นด้วยการเปิดกว้างของอารยธรรมจีน',
            en: 'The vast natural environment nurtured the highly inclusive customs and diverse culture of Chinese civilization.'
          },
          {
            formula: '正是这种南北交融，构成了世界文明的瑰宝',
            zh: '正是这种南北交融与五湖四海的汇聚，构成了人类文明独一无二的瑰宝。',
            pinyin: 'Zhèng shì zhè zhǒng nánběi jiāoróng yǔ wǔhúsìhǎi de huìjù, gòuchéng le rénlèi wénmíng dúyīwú’èr de guībǎo.',
            th: 'ก็ด้วยการผสมผสานเหนือ-ใต้และการหลอมรวมจากทั่วทุกสารทิศเช่นนี้เอง ที่ก่อร่างเป็นสมบัติล้ำค่าหนึ่งเดียวในอารยธรรมมนุษย์',
            en: 'It is precisely this North-South fusion and nationwide convergence that forms a unique treasure of human civilization.'
          }
        ]
      },
      dialogue: [
        {
          speaker: 'A',
          speaker_name: 'สมชาย (ผู้แทนวัฒนธรรม) 🧑‍💼',
          zh: '各位国际友人和媒体朋友，今天我想向大家分享一个真实而多元的中国。',
          pinyin: 'Gèwèi guójì yǒurén hé méitǐ péngyou, jīntiān wǒ xiǎng xiàng dàjiā fēnxiǎng yí ge zhēnshí ér duōyuán de Zhōngguó.',
          th: 'มิตรสหายชาวต่างชาติและสื่อมวลชนทุกท่าน วันนี้ผมขอแบ่งปันมุมมองเกี่ยวกับประเทศจีนที่แท้จริงและเปี่ยมด้วยความหลากหลายครับ',
          en: 'Distinguished international guests and media friends, today I share a genuine and diverse China with you.'
        },
        {
          speaker: 'B',
          speaker_name: 'ผู้ดำเนินรายการ 👩‍🎤',
          zh: '请问在您眼中，中国最吸引世界的核心魅力究竟是什么？',
          pinyin: 'Qǐngwèn zài nín yǎn zhōng, Zhōngguó zuì xīyǐn shìjiè de héxīn mèilì jiūjìng shì shénme?',
          th: 'ในสายตาของคุณ เสน่ห์แกนหลักของจีนที่ดึงดูดสายตาชาวโลกที่สุดคืออะไรหรือคะ?',
          en: 'In your eyes, what is the core charm of China that attracts the world most?'
        },
        {
          speaker: 'A',
          speaker_name: 'สมชาย (ผู้แทนวัฒนธรรม) 🧑‍💼',
          zh: '我认为是“地大物博之上的包容性”。从冰雪北国的粗犷面食，到烟雨江南的温婉水乡，各具独特的人文风情。',
          pinyin: 'Wǒ rènwéi shì “dìdàwùbó zhī shàng de bāoróngxìng”. Cóng bīngxuě běiguó de cūguǎng miànshí, dào yānyǔ Jiāngnán de wēnwǎn shuǐxiāng, gè jù dútè de rénwén fēngqíng.',
          th: 'ผมมองว่าคือ “การเปิดกว้างบนผืนแผ่นดินอันกว้างใหญ่ไพศาล” จากแดนเหนือหิมะขาวโพลนกับอาหารแป้งอันเข้มแข็ง สู่แดนใต้สายฝนพรำเจียงหนานกับวิถีเมืองน้ำอันอ่อนโยน ต่างมีเสน่ห์วิถีชีวิตเฉพาะตัวครับ',
          en: 'I believe it is "inclusivity rooted in vastness". From snowy North bold noodles to misty South gentle water towns, each possesses unique charm.'
        },
        {
          speaker: 'B',
          speaker_name: 'ผู้ดำเนินรายการ 👩‍🎤',
          zh: '这种和而不同的文化胸襟，正是全球文明交流互鉴的瑰宝！',
          pinyin: 'Zhè zhǒng hé’érbùtóng de wénhuà xiōngjīn, zhèng shì quánqiú wénmíng jiāoliú hùjiàn de guībǎo!',
          th: 'จิตใจที่โอบรับความต่างอย่างกลมเกลียวเช่นนี้แหละ คืออัญมณีล้ำค่าแห่งการแลกเปลี่ยนเรียนรู้ระหว่างอารยธรรมโลก!',
          en: 'This cultural magnanimity of harmony in diversity is precisely a treasure for global civilizational dialogue!'
        }
      ],
      quizzes: [
        {
          type: 'listen_match',
          question_th: "คำว่า '地大物博' (dìdàwùbó) สื่อถึงลักษณะใดของประเทศจีน?",
          options: [
            'อาณาเขตกว้างใหญ่ไพศาลและอุดมด้วยทรัพยากรธรรมชาติหลากหลาย',
            'มีประชากรหนาแน่นเฉพาะในเมืองหลวง',
            'ขาดแคลนแหล่งน้ำธรรมชาติ',
            'มีแต่พื้นที่ทะเลทราย'
          ],
          correct_index: 0,
          explanation_th: "'地大物博' หมายถึง แผ่นดินกว้างใหญ่ไพศาล อุดมสมบูรณ์ด้วยผลิตผลและทรัพยากร",
          encouragement: 'จำสำนวนแม่บททางภูมิศาสตร์จีนได้อย่างแม่นยำ!'
        },
        {
          type: 'flash_recall',
          question_th: "คำว่า '瑰宝' (guībǎo) ในทางวัฒนธรรมมีความหมายว่าอย่างไร?",
          options: [
            'สมบัติล้ำค่า หรืออัญมณีทางอารยธรรม',
            'ของเล่นพลาสติก',
            'เครื่องใช้ในครัว',
            'กระเป๋าเดินทาง'
          ],
          correct_index: 0,
          explanation_th: "'瑰宝' คือ อัญมณีหรือสิ่งล้ำค่าทางวัฒนธรรมและประวัติศาสตร์",
          encouragement: 'ยอดเยี่ยมมาก! ศัพท์วรรณกรรมระดับสูงเป๊ะมาก!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "การหลอมรวมเหนือ-ใต้คือก่อเกิดสมบัติล้ำค่าของอารยธรรม"',
          tokens: ['构成了文明的瑰宝', '正是这种南北交融', '共同'],
          correct_sequence: ['正是这种南北交融', '共同', '构成了文明的瑰宝'],
          pinyin: 'Zhèng shì zhè zhǒng nánběi jiāoróng, gòngtóng gòuchéng le wénmíng de guībǎo',
          meaning_th: 'ก็ด้วยการผสมผสานเหนือ-ใต้นี้เอง ที่ร่วมกันก่อเกิดเป็นสมบัติล้ำค่าของอารยธรรม',
          explanation_th: 'เหตุปัจจัย (正是这种南北交融) + คำเชื่อม (共同) + ข้อสรุป (构成了文明的瑰宝)',
          encouragement: 'โครงสร้างประโยคระดับวิชาการวัฒนธรรมสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: "คำว่า '瑰宝' ตัว '瑰' (อัญมณีล้ำค่า) มีหมวดนำใด?",
          options: [
            '王 (หมวดหยก/ราชา 王字旁)',
            '金 (หมวดโลหะ 金字旁)',
            '石 (หมวดหิน 石字旁)',
            '木 (หมวดไม้ 木字旁)'
          ],
          correct_index: 0,
          explanation_th: "'瑰' มีหมวดนำ '王' (หยก) สื่อถึงอัญมณีหยกสีแดงเลอค่า",
          encouragement: 'แม่นยำในหมวดนำอักษรจีน!'
        }
      ],
      boss_challenge: {
        scenario_th: 'คุณได้รับเกียรติเป็นผู้กล่าวสุนทรพจน์ปิดงานมหกรรมวัฒนธรรมเอเชีย ณ กรุงปักกิ่ง คุณต้องการกล่าวสรุปเสน่ห์แห่งความหลากหลายทางภูมิศาสตร์และวัฒนธรรมของจีนเพื่อสร้างแรงบันดาลใจให้ผู้ฟังทั่วโลก ควรกล่าวอย่างไร?',
        options: [
          '中国地大物博，气候与方言固然千差万别，然而正是这种五湖四海的包容性与南北交融的人文风情，铸就了中华文明生生不息的璀璨瑰宝！ (Zhōngguó dìdàwùbó, qìhòu yǔ fāngyán gùrán qiānchā-wànbié, rán’ér zhèng shì zhè zhǒng wǔhúsìhǎi de bāoróngxìng yǔ nánběi jiāoróng de rénwén fēngqíng, zhùjiù le Zhōnghuá wénmíng shēngshēng-bùxī de cuǐcàn guībǎo!)',
          '中国太大了，走得好累，大家快回去吧。 (Zhōngguó tài dà le, zǒu de hǎo lèi, dàjiā kuài huíqù ba.)',
          '南北方天天吵架，根本合不来。 (Nán-běifāng tiāntiān chǎojià, gēnběn hé bu lái.)',
          '请问今天晚上放烟花吗？ (Qǐngwèn jīntiān wǎnshang fàng yānhuā ma?)'
        ],
        correct_index: 0,
        explanation_th: "สุนทรพจน์ '中国地大物博...铸就了中华文明生生不息的璀璨瑰宝！' ผสานสำนวนเอก '地大物博', '五湖四海', '包容性', '人文风情' และ '瑰宝' ได้อย่างวิจิตรงดงาม สะกดผู้ฟังทั้งฮอลล์",
        encouragement: 'ยินดีด้วยอย่างยิ่ง! คุณผ่าน Boss Challenge ภูมิศาสตร์และภาษาถิ่นจีนระดับ Tier 3 สำเร็จ 100%!'
      },
      cheer_trophy: {
        badge_id: 'badge_t3_u33_master',
        badge_name: 'ผู้รอบรู้ภูมิศาสตร์และวัฒนธรรมแผ่นดินมังกร 🗺️🏆',
        message_th: 'ขอแสดงความยินดี! คุณสำเร็จ Unit 33 เข้าใจความหลากหลายทางภูมิศาสตร์ ภาษาถิ่น วัฒนธรรมเหนือ-ใต้ และ 8 ตระกูลอาหารจีนอย่างลึกซึ้ง!',
        xp_reward: 300
      }
    }
  ]
};
