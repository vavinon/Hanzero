/**
 * scripts/tier4_legend/unit52.ts
 * Unit 52: 唐诗宋词鉴赏与现代引用 (Tang & Song Poetry Appreciation & Modern Citations)
 * Tier 4 Legend - Unit 7 (L-07)
 * Strict typing, zero 'any', simplified Chinese only, tone sandhi compliant, interleaving >= 20%.
 */

export const unit52Data = {
  unit_id: 'tier4_u52',
  tier: 4,
  unit_number: 52,
  title: {
    zh: '唐诗宋词鉴赏与现代引用',
    th: 'สุนทรียศาสตร์กวีนิพนธ์ถัง-ซ่งและการนำมาประยุกต์ใช้ในยุคปัจจุบัน',
    en: 'Tang & Song Poetry Appreciation & Modern Citations'
  },
  description: 'ดื่มด่ำกวีนิพนธ์ชั้นครูของหลี่ไป๋ ตู้ฝู่ ซูซื่อ หวังอันสือ และเรียนรู้การนำบทกวีอมตะไปอ้างอิงในสุนทรพจน์ระดับผู้นำ สื่อมวลชน และการสร้างแรงบันดาลใจ',
  lessons: [
    {
      lesson_id: 't4_u52_l01',
      lesson_number: 1,
      title: {
        zh: '盛唐豪情：李白诗境与浪漫意象',
        th: 'ความองอาจแห่งต้าถัง: มโนทัศน์กวีและความโรแมนติกของหลี่ไป๋ (李白)',
        en: 'High Tang Splendor: Li Bai & Romantic Imagery'
      },
      can_do: {
        th: 'อธิบายสุนทรียศาสตร์ของกวีหลี่ไป๋ และนำวรรคทอง เช่น 乘风破浪, 举头望明月, 直挂云帆 ไปใช้อ้างอิงในการพูดสร้างแรงบันดาลใจได้',
        en: 'Understand Li Bai\'s poetic style and cite famous verses like Braving Wind and Waves to inspire audiences'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำสำนวนวรรคทอง 乘风破浪 และ 直挂云帆 ไปใช้ในการกล่าวสุนทรพจน์เปิดโครงการ!',
      vocabulary: [
        {
          id: 'hsk4_5201',
          hanzi: '诗仙',
          pinyin: 'shīxiān',
          display_pinyin: 'shīxiān',
          pinyin_tone: 'shi1xian1',
          meaning_th: 'เซียนกวี (สมญานามยกย่องหลี่ไป๋ ผู้มีพรสวรรค์และจิตวิญญาณอิสระดั่งเทพเซียน)',
          meaning_en: 'Poet Immortal (epithet of Li Bai)',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 13,
          mnemonic: 'บทกวีคำพูดอันไพเราะ (诗) ดุจเทพเซียนพำนักบนขุนเขา (仙) = เซียนกวี',
          kid_mnemonic: 'ชายชราสวมชุดขาวลอยลงมาจากก้อนเมฆพร้อมพู่กันทอง = 诗仙',
          body_gesture: 'ยกสองมือผายออกสู่ท้องฟ้าแล้วสะบัดข้อมือเบาๆ ดั่งเซียนลอยลม'
        },
        {
          id: 'hsk4_5202',
          hanzi: '豪迈',
          pinyin: 'háomài',
          display_pinyin: 'háomài',
          pinyin_tone: 'hao2mai4',
          meaning_th: 'อาจหาญสง่างาม / ใจกว้างเปิดเผยเปี่ยมพลัง (Bold and generous)',
          meaning_en: 'bold / heroic / magnanimous / daring',
          radical: '豕',
          radical_name_th: 'หมวดหมู (豕字旁)',
          stroke_count: 20,
          mnemonic: 'วีรบุรุษผู้เก่งกล้า (豪) ก้าวเท้าย่างเดินอย่างองอาจ (迈) = อาจหาญสง่างาม',
          kid_mnemonic: 'แม่ทัพยืนหัวเราะก้องกังวานกลางสายลมอย่างไม่หวั่นเกรง = 豪迈',
          body_gesture: 'ยืนอกผายไหล่ผึ่งแล้วกำหมัดวางข้างเอวอย่างสง่าผ่าเผย'
        },
        {
          id: 'hsk4_5203',
          hanzi: '乘风破浪',
          pinyin: 'chéngfēngpòlàng',
          display_pinyin: 'chéngfēngpòlàng',
          pinyin_tone: 'cheng2feng1po4lang4',
          meaning_th: 'โต้คลื่นฝ่าลมแรง / ก้าวไปข้างหน้าอย่างกล้าหาญฟันฝ่าทุกอุปสรรค (จากบทกวีหลี่ไป๋)',
          meaning_en: 'brave the wind and waves / forge ahead through difficulties',
          radical: '丿',
          radical_name_th: 'หมวดขีดตวัดซ้าย (撇字旁)',
          stroke_count: 36,
          mnemonic: 'ขึ้นขี่สายลม (乘风) ผ่าทะลวงคลื่นลูกใหญ่ (破浪) = ฝ่าคลื่นลมไปข้างหน้า',
          kid_mnemonic: 'เรือใบแล่นฝ่าคลื่นมหาสมุทรลูกโตแล่นฉิวไปสู่ดินแดนใหม่ = 乘风破浪',
          body_gesture: 'ทำสองมือเป็นหัวเรือพุ่งทะลวงฝ่าคลื่นลมไปข้างหน้า'
        },
        {
          id: 'hsk4_5204',
          hanzi: '意象',
          pinyin: 'yìxiàng',
          display_pinyin: 'yìxiàng',
          pinyin_tone: 'yi4xiang4',
          meaning_th: 'มโนทัศน์ / ภาพจินตนาการทางกวีนิพนธ์ (Imagery)',
          meaning_en: 'imagery / poetic image',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 24,
          mnemonic: 'ความคิดความรู้สึกในดวงใจ (意) สะท้อนเป็นรูปภาพชัดเจน (象) = มโนทัศน์กวี',
          kid_mnemonic: 'หลับตาแล้วจินตนาการเห็นดวงจันทร์สีเงินและแม่น้ำสะท้อนแสง = 意象',
          body_gesture: 'สองมือทำท่าแตะที่ตาแล้วกางออกวาดเป็นภาพวาดในอากาศ'
        },
        {
          id: 'hsk4_5205',
          hanzi: '直挂云帆',
          pinyin: 'zhíguàyúnfān',
          display_pinyin: 'zhíguàyúnfān',
          pinyin_tone: 'zhi2gua4yun2fan1',
          meaning_th: 'ชักใบเรือสีขาวพุ่งทะยานสู่ก้อนเมฆ (สัญลักษณ์แห่งความมุ่งมั่นสู่เป้าหมายอันยิ่งใหญ่)',
          meaning_en: 'hoist the cloud-white sail straight ahead / set sail towards grand goals',
          radical: '目',
          radical_name_th: 'หมวดดวงตา (目字旁)',
          stroke_count: 28,
          mnemonic: 'ตั้งตรงเด็ดเดี่ยว (直) แขวนชักใบเรือขึ้น (挂) สู่เวิ้งเมฆา (云帆) = ชักใบเรือสู่เมฆา',
          kid_mnemonic: 'ดึงเชือกใบเรือสีขาวชูขึ้นสูงจนแตะก้อนเมฆบนฟ้า = 直挂云帆',
          body_gesture: 'สองมือทำท่าดึงเชือกชักใบเรือสูงขึ้นสู่ท้องฟ้า'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 乘风破浪 (chéngfēngpòlàng)',
        description_th: 'chéng (เสียง 2) fēng (เสียง 1) pò (เสียง 4) làng (เสียง 4)',
        example: '长风破浪会有时，直挂云帆济沧海 (Chángfēng pòlàng huì yǒushí, zhíguà yúnfān jì cānghǎi)',
        fun_metaphor: 'วรรคทองของหลี่ไป๋ที่ผู้นำธุรกิจและนักการเมืองทุกคนใช้อวยพรการเริ่มต้นสิ่งใหม่',
        reassurance: 'คำว่า 乘 ในที่นี้อ่าน chéng (กริยา ขี่/โดยสาร)'
      },
      grammar_bite: {
        title: 'โครงสร้างการอ้างอิงกวี: 正如诗仙李白所云：“……”，激励我们……',
        formula: '正如李白名句“长风破浪会有时，直挂云帆济沧海”所言，我们坚信……',
        explanation_th: 'ใช้ในการกล่าวสุนทรพจน์พิธีการและบทความสร้างแรงบันดาลใจ',
        patterns: [
          {
            formula: '引用李白名句，展现豪迈气概。',
            zh: '面对重重困难与考验，我们坚信“长风破浪会有时，直挂云帆济沧海”，必将抵达胜利的彼岸。',
            pinyin: 'Miànduì chóngchóng kùnnan yǔ kǎoyàn, wǒmen jiānxìn "Chángfēng pòlàng huì yǒushí, zhíguà yúnfān jì cānghǎi", bìjiāng dǐdá shènglì de bǐ\'àn.',
            th: 'เมื่อต้องเผชิญกับอุปสรรคและบททดสอบรอบด้าน พวกเราเชื่อมั่นอย่างลึกซึ้งในคำกล่าวที่ว่า "สายลมพัดแรงโต้คลื่นย่อมมีเวลา ชักใบเรือสู่เมฆาข้ามมหาสมุทรสีคราม" ย่อมจะบรรลุถึงฝั่งแห่งชัยชนะอย่างแน่นอน',
            en: 'Facing layer upon layer of difficulties and tests, we firmly believe "a time will come to ride the wind and cleave the waves; I will hoist my cloud-white sail straight across the vast sea", and we shall surely reach the shore of victory.'
          },
          {
            formula: '借用明月意象，抒发思乡之情。',
            zh: '“举头望明月，低头思故乡”，这句跨越千年的经典诗句唤起了无数海外游子的家国情怀。',
            pinyin: '"Jǔtóu wàng míngyuè, dītóu sī gùxiāng", zhè jù kuàyuè qiānnián de jīngdiǎn shījù huànqǐ le wúshù hǎiwài yóuzǐ de jiāguó qínghuái.',
            th: '"เงยหน้ามองจันทรากระจ่าง ก้มหน้าหวนคิดถึงบ้านเกิด" วรรคทองอมตะข้ามสหัสวรรษนี้ได้ปลุกความผูกพันต่อแผ่นดินเกิดของชาวจีนโพ้นทะเลนับไม่ถ้วน',
            en: '"Looking up, I gaze at the bright moon; looking down, I think of my hometown" — this classic verse spanning a millennium awakens patriotic sentiments among countless overseas travelers.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '文化学者 (Cultural Scholar) 📜',
          zh: '各位朋友，诗仙李白的诗歌之所以千古流传，在于其超凡脱俗的想象力与气吞山河的豪迈意象。',
          pinyin: 'Gèwèi péngyǒu, shīxiān Lǐ Bái de shīgē zhīsuǒyǐ qiāngǔ liúchuán, zàiyú qí chāofán tuōsú de xiǎngxiànglì yǔ qì tūn shānhé de háomài yìxiàng.',
          th: 'มิตรสหายทุกท่านครับ เหตุผลที่บทกวีของเซียนกวีหลี่ไป๋ได้รับการสืบทอดมานับพันปี อยู่ที่จินตนาการอันเหนือชั้นและมโนทัศน์อันองอาจสะท้านขุนเขาครับ',
          en: 'Friends, the reason why Poet Immortal Li Bai\'s poems have been passed down for millennia lies in his extraordinary imagination and magnificent imagery that swallows mountains and rivers.',
          audio_trigger: 't4_u52_l01_d01'
        },
        {
          speaker: '青年创业者 (Young Founder) 🚀',
          zh: '老师说得真好！在我们的创业团队遇到逆境时，大家总是用“乘风破浪”来相互勉励。',
          pinyin: 'Lǎoshī shuō de zhēn hǎo! Zài wǒmen de chuàngyè tuánduì yùdào nìjìng shí, dàjiā zǒngshì yòng "chéngfēngpòlàng" lái xiānghù miǎnlì.',
          th: 'อาจารย์กล่าวได้ดีเหลือเกินครับ! เวลาที่ทีมสตาร์ตอัปของเราเจอมรสุม ทุกคนมักจะนำคำว่า "乘风破浪" มาเป็นพลังใจให้กันและกันเสมอครับ',
          en: 'Teacher, you said it so well! When our startup team encounters adversity, we always encourage each other with "braving wind and waves".',
          audio_trigger: 't4_u52_l01_d02'
        },
        {
          speaker: '文化学者 (Cultural Scholar) 📜',
          zh: '是的！“长风破浪会有时，直挂云帆济沧海”是古典诗词中极具生命力的瑰宝，它赋予我们坚韧前行的无穷勇气。',
          pinyin: 'Shì de! "Chángfēng pòlàng huì yǒushí, zhíguà yúnfān jì cānghǎi" shì gǔdiǎn shīcí zhōng jí jù shēngmìnglì de guībǎo, tā fùyǔ wǒmen jiānrèn qiánxíng de wúqióng yǒngqì.',
          th: 'ถูกต้องครับ! "สายลมพัดแรงโต้คลื่นย่อมมีเวลา ชักใบเรือสู่เมฆาข้ามมหาสมุทร" คืออัญมณีล้ำค่าแห่งกวีนิพนธ์โบราณที่เปี่ยมพลังชีวิต มอบความกล้าหาญอันไร้ขีดจำกัดให้เราก้าวต่อไปข้างหน้า',
          en: 'Yes! "A time will come to ride the wind and cleave the waves; I will hoist my cloud-white sail straight across the vast sea" is a vital treasure giving us endless courage to forge ahead resiliently.',
          audio_trigger: 't4_u52_l01_d03'
        },
        {
          speaker: '青年创业者 (Young Founder) 🚀',
          zh: '古为今用、知行合一！无论商海风云如何变幻，我们都要保持这份浪漫与豪迈，不懈追求卓越！',
          pinyin: 'Gǔwéijīnyòng, zhīxínghéyī! Wúlùn shānghǎi fēngyún rúhé biànhuàn, wǒmen dōu yào bǎochí zhè yīfèn làngmàn yǔ háomài, bùxiè zhuīqiú zhuóyuè!',
          th: 'นำอดีตมารับใช้ปัจจุบัน รู้แล้วลงมือทำจริง! ไม่ว่าคลื่นลมในสมรภูมิการค้าจะผันผวนเพียงใด พวกเราก็จะรักษาความโรแมนติกและความองอาจนี้ไว้ เพื่อมุ่งสู่ความเป็นเลิศอย่างไม่หยุดยั้งครับ!',
          en: 'Making the past serve the present, unity of knowledge and action! No matter how turbulent the commercial sea changes, we will maintain this romance and boldness, relentlessly pursuing excellence!',
          audio_trigger: 't4_u52_l01_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'กวีเอก หลี่ไป๋ (李白) ได้รับการขนานนามยกย่องในประวัติศาสตร์วรรณคดีจีนว่าอะไร?',
          options: [
            '诗仙 (shīxiān - เซียนกวี)',
            '诗圣 (shīshèng - นักบุญกวี / ปราชญ์กวี)',
            '词圣 (císhèng - ปราชญ์แห่งเนื้อเพลงฉือ)',
            '诗魔 (shīmó - มารกวี)'
          ],
          correct_index: 0,
          explanation_th: 'หลี่ไป๋ ได้รับสมญานามว่า "诗仙" (เซียนกวี) ส่วน ตู้ฝู่ ได้รับสมญานามว่า "诗圣" (ปราชญ์กวี)',
          encouragement: 'ยอดเยี่ยมมาก! มีความรู้ประวัติวรรณคดีจีนคลาสสิกที่แม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "โต้คลื่นฝ่าลมแรง ชักใบเรือสู่เมฆา"',
          tokens: ['直挂云帆', '乘风破浪'],
          correct_sequence: ['乘风破浪', '直挂云帆'],
          pinyin: 'Chéngfēngpòlàng, zhíguà yúnfān.',
          meaning_th: 'โต้คลื่นฝ่าลมแรง ชักใบเรือสู่เมฆา',
          explanation_th: 'โต้คลื่นลม (乘风破浪) + ชักใบเรือมุ่งสู่เป้าหมาย (直挂云帆)',
          encouragement: 'จัดวรรคทองกวีเอกได้อย่างทรงพลัง!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "仙" (xiān - เซียน/ผู้วิเศษ) ใน "诗仙" ประกอบด้วย "亻" (คน) และ "山" (ภูเขา) สื่อถึงอะไร?',
          options: [
            'มนุษย์ผู้บำเพ็ญตบะบนยอดเขาสูงจนบรรลุธรรมเป็นผู้วิเศษเหนือโลกมนุษย์',
            'การปีนเขาออกกำลังกาย',
            'การทำเหมืองแร่บนภูเขา',
            'คนตัดฟืนบนดอย'
          ],
          correct_index: 0,
          explanation_th: '"亻" (คน) + "山" (ภูเขา) = เซียนผู้วิเศษที่บำเพ็ญตนบนเขา หลุดพ้นจากกิเลสทางโลก (仙)',
          encouragement: 'เข้าใจรากศัพท์เทพเซียนได้อย่างถ่องแท้!'
        },
        {
          type: 'multiple_choice',
          question_th: 'บทกวี "静夜思" (ความคิดในคืนอันเงียบสงัด) ของหลี่ไป๋ ใช้มโนทัศน์ (意象) ใดเป็นสัญลักษณ์แห่งความคิดถึงบ้านเกิด?',
          options: [
            '明月 (míngyuè - ดวงจันทร์กระจ่างฟ้า)',
            '落叶 (luòyè - ใบไม้ร่วง)',
            '桃花 (táohuā - ดอกท้อ)',
            '战马 (zhànmǎ - ม้าศึก)'
          ],
          correct_index: 0,
          explanation_th: 'หลี่ไป๋ใช้ "明月" (ดวงจันทร์) สื่อถึง "举头望明月，低头思故乡" จนกลายเป็นสัญลักษณ์แทนความคิดถึงบ้านสากล',
          encouragement: 'จำวรรคทองแห่งความทรงจำวัยเด็กได้อย่างลึกซึ้ง!'
        }
      ],
      boss_challenge: {
        question: 'ในสุนทรพจน์เปิดตัวผลิตภัณฑ์ใหม่ต่อหน้าสื่อมวลชนทั่วโลก ประโยคใดอ้างอิงบทกวีหลี่ไป๋ได้อย่างสง่างามและเปี่ยมพลังบันดาลใจที่สุด?',
        options: [
          '“长风破浪会有时，直挂云帆济沧海”，今天我们携全新技术破局而来，必将开创全球行业新纪元！',
          '国家加强宏观调控，坚持稳中求进，有效应对通胀与利率风险。',
          '央行实施稳健货币政策，强化逆周期调节，保持市场流动性充裕。',
          '企业加快产业升级与供给侧改革，大幅提高实体经济附加值。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกอ้างอิงวรรคทองของหลี่ไป๋ "长风破浪会有时，直挂云帆济沧海" ร่วมกับคำว่า "开创新纪元" ได้อย่างสมบูรณ์แบบ ทรงพลังและปลุกใจผู้ฟัง'
      },
      cheer_trophy: {
        badge_name: 'ผู้สืบทอดจิตวิญญาณเซียนกวี (Inheritor of Poet Immortal)',
        message_th: 'ยินดีด้วย! คุณเข้าใจสุนทรียศาสตร์ของหลี่ไป๋ และคำว่า 豪迈, 乘风破浪, 直挂云帆 พร้อมสร้างแรงบันดาลใจสู่เวทีสากล!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u52_l02',
      lesson_number: 2,
      title: {
        zh: '忧国忧民：杜甫诗圣与沉郁家国',
        th: 'ห่วงใยแผ่นดินและราษฎร: ตู้ฝู่ (杜甫) ปราชญ์กวีและจิตวิญญาณแห่งชาติ',
        en: 'Caring for Nation & People: Du Fu & Patriotic Spirit'
      },
      can_do: {
        th: 'อธิบายวรรคทองของตู้ฝู่ เช่น 诗圣, 沉郁, 会当凌绝顶, 润物细无声, 忧国忧民 และนำมาใช้กล่าวถึงความรับผิดชอบต่อสังคมได้',
        en: 'Master Du Fu\'s poetry and ethos: Poet Sage, Profound Melancholy, Summit Reaching, and Social Responsibility'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำสำนวนวรรคทอง 会当凌绝顶 และ 润物细无声 ไปใช้ในการบรรยายบทบาทความเป็นผู้นำ!',
      vocabulary: [
        {
          id: 'hsk4_5206',
          hanzi: '诗圣',
          pinyin: 'shīshèng',
          display_pinyin: 'shīshèng',
          pinyin_tone: 'shi1sheng4',
          meaning_th: 'ปราชญ์กวี / นักบุญกวี (สมญานามยกย่องตู้ฝู่ ผู้เขียนบทกวีสะท้อนชีวิตราษฎรและความรักชาติ)',
          meaning_en: 'Poet Sage (epithet of Du Fu)',
          radical: '讠',
          radical_name_th: 'หมวดคำพูด (言字旁)',
          stroke_count: 13,
          mnemonic: 'บทกวี (诗) เปี่ยมด้วยปรีชาญาณและความเมตตาธรรมดั่งอริยบุคคล (圣) = ปราชญ์กวี',
          kid_mnemonic: 'คุณลุงกวีผู้เมตตานั่งเขียนบทกวีห่วงใยเด็กๆ และชาวบ้าน = 诗圣',
          body_gesture: 'ยกสองมือประสานระดับอกโค้งคำนับด้วยความเคารพอย่างสูง'
        },
        {
          id: 'hsk4_5207',
          hanzi: '沉郁',
          pinyin: 'chényù',
          display_pinyin: 'chényù',
          pinyin_tone: 'chen2yu4',
          meaning_th: 'ลุ่มลึกซาบซึ้ง / หม่นเศร้าแต่เปี่ยมด้วยพลังความรักชาติและมนุษยธรรม (สไตล์กวีของตู้ฝู่)',
          meaning_en: 'profound and poignant / deeply meditative and melancholic',
          radical: '氵',
          radical_name_th: 'หมวดน้ำสามหยด (三点水)',
          stroke_count: 22,
          mnemonic: 'จมลึกดั่งท้องทะเล (沉) อัดแน่นด้วยความรู้สึกในดงพงไพร (郁) = ลุ่มลึกกินใจ',
          kid_mnemonic: 'ยืนมองสายน้ำไหลในยามอาทิตย์อัสดงด้วยความคิดคำนึงถึงประเทศชาติ = 沉郁',
          body_gesture: 'เอามือขวาแตะที่หัวใจพร้อมทอดสายตามองไปข้างหน้าอย่างลึกซึ้ง'
        },
        {
          id: 'hsk4_5208',
          hanzi: '会当凌绝顶',
          pinyin: 'huìdānglíngjuédǐng',
          display_pinyin: 'huìdānglíngjuédǐng',
          pinyin_tone: 'hui4dang1ling2jue2ding3',
          meaning_th: 'สักวันหนึ่งจะต้องปีนขึ้นสู่ยอดเขาสูงสุดให้จงได้ (จากบทกวีชมเขาไท่ซานของตู้ฝู่)',
          meaning_en: 'one day I must climb to the very summit (from Du Fu\'s poem on Mount Tai)',
          radical: '人',
          radical_name_th: 'หมวดคน (人字头)',
          stroke_count: 42,
          mnemonic: 'จะต้อง (会当) ก้าวข้ามผ่าน (凌) ยอดเขาสูงเทียมฟ้าที่ไร้ผู้เทียมทาน (绝顶) = ต้องปีนสู่ยอดสุด',
          kid_mnemonic: 'ยืนมองยอดเขาไท่ซานแล้วชูกำปั้นบอกตัวเองว่าฉันต้องปีนขึ้นไปถึงยอดให้ได้ = 会当凌绝顶',
          body_gesture: 'กำหมัดขวาชูขึ้นฟ้าอย่างมุ่งมั่นแน่วแน่'
        },
        {
          id: 'hsk4_5209',
          hanzi: '润物细无声',
          pinyin: 'rùnwùxìwúshēng',
          display_pinyin: 'rùnwùxìwúshēng',
          pinyin_tone: 'run4wu4xi4wu2sheng1',
          meaning_th: 'หล่อเลี้ยงสรรพสิ่งอย่างอ่อนโยนเงียบสงบไร้เสียง (สัญลักษณ์แห่งการศึกษาและคุณธรรมที่ซึมซาบ)',
          meaning_en: 'moisten things silently / nurture gently and unassumingly',
          radical: '氵',
          radical_name_th: 'หมวดน้ำสามหยด (三点水)',
          stroke_count: 36,
          mnemonic: 'หยาดฝนชโลมชุ่มฉ่ำ (润) บำรุงสรรพสิ่ง (物) ละเอียดอ่อนโยน (细) ไร้สำเนียงรบกวน (无声) = หล่อเลี้ยงไร้เสียง',
          kid_mnemonic: 'ฝนฤดูใบไม้ผลิพรำเบาๆ ปลุกต้นกล้าดอกไม้ให้บานสะพรั่ง = 润物细无声',
          body_gesture: 'ขยับนิ้วมือทั้งสิบช้าๆ ดั่งหยาดฝนโปรยปรายลงสู่ผืนดิน'
        },
        {
          id: 'hsk4_5210',
          hanzi: '忧国忧民',
          pinyin: 'yōuguóyōumín',
          display_pinyin: 'yōuguóyōumín',
          pinyin_tone: 'you1guo2you1min2',
          meaning_th: 'ห่วงใยประเทศชาติและห่วงหาอาทรราษฎร (จิตวิญญาณแห่งปัญญาชนจีนโบราณ)',
          meaning_en: 'concerned about nation and people / patriotic and humanitarian',
          radical: '心',
          radical_name_th: 'หมวดหัวใจ (心字底)',
          stroke_count: 27,
          mnemonic: 'กังวลใจห่วงใย (忧) แผ่นดินบ้านเกิด (国) และเพื่อนร่วมชาติราษฎร (民) = ห่วงชาติรักราษฎร',
          kid_mnemonic: 'คุณหมออาสาเดินทางไปรักษาชาวบ้านในชนบทด้วยใจรักและเสียสละ = 忧国忧民',
          body_gesture: 'สองมือกุมเข้าหากันไว้ที่หน้าอกแสดงความปรารถนาดีต่อส่วนรวม'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 会当凌绝顶 (huìdānglíngjuédǐng)',
        description_th: 'huì (เสียง 4) dāng (เสียง 1) líng (เสียง 2) jué (เสียง 2) dǐng (เสียง 3)',
        example: '会当凌绝顶，一览众山小 (Huì dāng líng juédǐng, yī lǎn zhòng shān xiǎo)',
        fun_metaphor: 'เมื่อขึ้นสู่ยอดเขาไท่ซาน ทิวเขารอบข้างล้วนดูเล็กกระจิริด',
        reassurance: 'คำว่า 凌 (líng) เสียง 2 แปลว่า ก้าวขึ้นไปเหนือกว่า'
      },
      grammar_bite: {
        title: 'โครงสร้างการยกย่องวิสัยทัศน์: 秉持……情怀，彰显“会当凌绝顶”之志',
        formula: '始终秉持忧国忧民的赤子情怀，彰显“会当凌绝顶，一览众山小”的宏伟气魄',
        explanation_th: 'ใช้ในการยกย่องผู้บริหาร นักวิจัย และครูบาอาจารย์ผู้มีคุณูปการต่อส่วนรวม',
        patterns: [
          {
            formula: '登高望远，立志凌顶。',
            zh: '科研工作者应当树立“会当凌绝顶，一览众山小”的雄心壮志，勇攀世界科学最高峰。',
            pinyin: 'Kēyán gōngzuòzhě yīngdāng shùlì "Huì dāng líng juédǐng, yī lǎn zhòng shān xiǎo" de xióngxīn zhuàngzhì, yǒng pān shìjiè kēxué zuì gāofēng.',
            th: 'นักวิจัยวิทยาศาสตร์พึงสร้างปณิธานอันแรงกล้าดั่ง "สักวันหนึ่งต้องปีนสู่ยอดเขาสูงสุด ชะโงกแลขุนเขาอื่นล้วนแลดูเล็กกระจิดริด" เพื่อกล้าปีนป่ายสู่จุดสูงสุดของวิทยาการระดับโลก',
            en: 'Scientific researchers should establish the lofty aspiration of "reaching the summit to overlook all mountains small", bravely scaling the highest peaks of world science.'
          },
          {
            formula: '潜移默化，润物细无声。',
            zh: '优秀的教育正如春雨“随风潜入夜，润物细无声”，在不知不觉中塑造着青年的美好心灵。',
            pinyin: 'Yōuxiù de jiàoyù zhèngrú chūnyǔ "Suí fēng qiánrù yè, rùnwù xì wúshēng", zài bùzhībùjué zhōng sùzào zhe qīngnián de měihǎo xīnlíng.',
            th: 'การศึกษาอันยอดเยี่ยมเปรียบเสมือนฝนวสันต์ "ลอบซึมซาบตามสายลมยามราตรี ชโลมหล่อเลี้ยงสรรพสิ่งอย่างเงียบงัน" ซึ่งหล่อหลอมจิตใจอันงดงามของเยาวชนอย่างลึกซึ้งโดยไม่รู้ตัว',
            en: 'Outstanding education is just like spring rain "creeping into the night with the breeze, moistening things silently", subtly shaping the beautiful souls of youth.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '中文系教授 (Prof. of Literature) 🏛️',
          zh: '同学们，如果说李白代表了盛唐浪漫主义的巅峰，那么杜甫则代表了现实主义与忧国忧民情怀的极境。',
          pinyin: 'Tóngxuémen, rúguǒ shuō Lǐ Bái dàibiǎo le shèngtáng làngmànzhǔyì de diānfēng, nàme Dù Fǔ zé dàibiǎo le xiànshízhǔyì yǔ yōuguóyōumín qínghuái de jíjìng.',
          th: 'นักศึกษาทุกท่าน หากหลี่ไป๋คือตัวแทนจุดสูงสุดแห่งความโรแมนติกยุคต้าถัง ตู้ฝู่ก็คือตัวแทนขีดสุดแห่งสัจนิยมและความรักชาติห่วงใยราษฎรครับ',
          en: 'Students, if Li Bai represents the peak of High Tang romanticism, then Du Fu represents the pinnacle of realism and patriotic humanitarian sentiment.',
          audio_trigger: 't4_u52_l02_d01'
        },
        {
          speaker: '研究生 (Graduate Student) 📖',
          zh: '杜甫在青年时代登泰山写下“会当凌绝顶，一览众山小”，展现了何等的少年壮志与胸襟气度！',
          pinyin: 'Dù Fǔ zài qīngnián shídài dēng Tàishān xiěxià "Huì dāng líng juédǐng, yī lǎn zhòng shān xiǎo", zhǎnxiàn le héděng de shàonián zhuàngzhì yǔ xiōngjīn qìdù!',
          th: 'ตู้ฝู่ในวัยหนุ่มเมื่อคราวปีนเขาไท่ซานได้ประพันธ์ว่า "会当凌绝顶，一览众山小" สะท้อนถึงปณิธานอันยิ่งใหญ่และวิสัยทัศน์ที่กว้างไกลของคนหนุ่มสาวอย่างแท้จริงครับ!',
          en: 'In his youth ascending Mount Tai, Du Fu wrote "one day I must climb to the summit and see all mountains small", demonstrating such youthful ambition and broad-mindedness!',
          audio_trigger: 't4_u52_l02_d02'
        },
        {
          speaker: '中文系教授 (Prof. of Literature) 🏛️',
          zh: '正是！而到了晚年，他的诗风更加沉郁顿挫，“安得广厦千万间，大庇天下寒士俱欢颜”，将个人命运完全融入天下苍生。',
          pinyin: 'Zhèng shì! Ér dào le wǎnnián, tā de shīfēng gèngjiā chényù dùncuò, "Ān dé guǎngshà qiānwàn jiān, dàbì tiānxià hánsì jù huānyán", jiāng gèrén mìngyùn wánquán róngrù tiānxià cāngshēng.',
          th: 'ถูกต้องทีเดียว! และในวัยชรา ลีลากวีของท่านยิ่งลุ่มลึกทรงพลัง "ไฉนเลยจะมีคฤหาสน์ใหญ่หมื่นพันหลัง เพื่อคุ้มภัยให้ปัญญาชนยากไร้ทั่วหล้าได้ยิ้มแย้ม" ท่านได้หลอมรวมโชคชะตาตนเองเข้ากับราษฎรทั้งแผ่นดิน',
          en: 'Exactly! In his late years, his poetic style grew even more profound and poignant: "How could we have ten thousand mansions to shelter all poor scholars under heaven with joy", merging personal fate with all humanity.',
          audio_trigger: 't4_u52_l02_d03'
        },
        {
          speaker: '研究生 (Graduate Student) 📖',
          zh: '这种天下为公的胸怀，正是中华优秀传统文化中最值得我们代代相传的精神脊梁！',
          pinyin: 'Zhè zhǒng tiānxià wéi gōng de xiōnghuái, zhèng shì Zhōnghuá yōuxiù chuántǒng wénhuà zhōng zuì zhíde wǒmen dàidài xiāngchuán de jīngshén jǐliáng!',
          th: 'หัวใจที่เห็นแก่ส่วนรวมเช่นนี้ คือกระดูกสันหลังทางจิตวิญญาณในวัฒนธรรมดั้งเดิมอันล้ำค่าของจีนที่ควรค่าแก่การสืบทอดจากรุ่นสู่รุ่นครับ!',
          en: 'This spirit of the world for all is precisely the spiritual backbone in outstanding Chinese traditional culture most worthy of passing down from generation to generation!',
          audio_trigger: 't4_u52_l02_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'สมญานาม "诗圣" (shīshèng) ในประวัติศาสตร์กวีจีนยกย่องใคร?',
          options: [
            '杜甫 (ตู้ฝู่)',
            '李白 (หลี่ไป๋)',
            '白居易 (ไป๋จวีอี้)',
            '王维 (หวังเหวย)'
          ],
          correct_index: 0,
          explanation_th: 'ตู้ฝู่ ได้รับการยกย่องเป็น "诗圣" (ปราชญ์กวี) เนื่องจากบทกวีของท่านสะท้อนชีวิตราษฎรและประวัติศาสตร์อย่างซื่อตรง',
          encouragement: 'ยอดเยี่ยมมาก! จดจำปรมาจารย์กวีได้อย่างแม่นยำ!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "สักวันต้องปีนสู่ยอดสุด มองดูขุนเขาอื่นเล็กกระจิดริด"',
          tokens: ['一览众山小', '会当凌绝顶'],
          correct_sequence: ['会当凌绝顶', '一览众山小'],
          pinyin: 'Huì dāng líng juédǐng, yī lǎn zhòng shān xiǎo.',
          meaning_th: 'สักวันต้องปีนสู่ยอดสุด มองดูขุนเขาอื่นเล็กกระจิดริด',
          explanation_th: 'ปณิธานปีนสู่ยอด (会当凌绝顶) + วิสัยทัศน์ชะโงกมองขุนเขา (一览众山小)',
          encouragement: 'จัดวรรคทองอมตะของตู้ฝู่ได้อย่างสมบูรณ์แบบ!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "润" (rùn - ชโลม/ชุ่มชื้น) ใน "润物细无声" มีหมวดนำ "氵" (น้ำ) สื่อถึงอะไร?',
          options: [
            'สายฝนฤดูใบไม้ผลิที่ซึมซับลงสู่ดิน หล่อเลี้ยงต้นไม้ใบหญ้าให้เจริญเติบโต',
            'น้ำท่วมใหญ่สร้างความเสียหาย',
            'การล่องเรือออกสู่ทะเลลึก',
            'การต้มน้ำเดือด'
          ],
          correct_index: 0,
          explanation_th: '"氵" คือสายน้ำอันอ่อนโยนที่หล่อเลี้ยงชุ่มชื้นสรรพสิ่ง (滋润) ดั่งพระคุณของครูและบุพการี',
          encouragement: 'เข้าใจมโนทัศน์สายฝนชุ่มฉ่ำได้อย่างลึกซึ้ง!'
        },
        {
          type: 'multiple_choice',
          question_th: 'วรรคทอง "润物细无声" มักนิยมนำมาเปรียบเทียบกับวิชาชีพหรือบทบาทใดในสังคมปัจจุบัน?',
          options: [
            'ครูบาอาจารย์และการศึกษา (ที่อบรมสั่งสอนขัดเกลาจิตใจเยาวชนอย่างเงียบสงบและลึกซึ้ง)',
            'ทหารรักษาพระองค์',
            'พนักงานขายตรง',
            'นักขับรถไฟเหาะ'
          ],
          correct_index: 0,
          explanation_th: '"润物细无声" เป็นคำอุปมาเปรียบเทียบที่นิยมที่สุดสำหรับการอบรมบ่มเพาะของครูบาอาจารย์',
          encouragement: 'เข้าใจการประยุกต์ใช้วรรณคดีในสังคมร่วมสมัยอย่างแท้จริง!'
        }
      ],
      boss_challenge: {
        question: 'ในพิธีมอบรางวัลนักวิทยาศาสตร์ผู้สร้างคุณูปการแห่งชาติ ประโยคใดสดุดีผลงานและความเสียสละของท่านได้อย่างซาบซึ้งและสมเกียรติที่สุด?',
        options: [
          '先生一生忧国忧民，以“会当凌绝顶”之志勇攀科技高峰，以“润物细无声”之德教书育人，堪称当代国士无双！',
          '白皮书强调中国经济韧性强、潜力大，总体呈现稳中向好态势。',
          '科技创新驱动高质量发展，积极培育数字经济新动能。',
          '严格保护知识产权，打击恶意侵权，加快专利与商标确权。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "忧国忧民", "会当凌绝顶", "润物细无声" และ "国士无双" ได้อย่างไพเราะ ซาบซึ้ง และทรงเกียรติยศสูงสุด'
      },
      cheer_trophy: {
        badge_name: 'ผู้หยั่งถึงจิตวิญญาณปราชญ์กวี (Empathizer of Poet Sage)',
        message_th: 'ยินดีด้วย! คุณเข้าใจความลึกซึ้งของตู้ฝู่ และคำว่า 沉郁, 会当凌绝顶, 润物细无声 พร้อมนำคุณธรรมกวีไปใช้พัฒนาสังคม!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u52_l03',
      lesson_number: 3,
      title: {
        zh: '旷达境界：苏轼词意与人生风雨',
        th: 'จิตใจอันปลอดโปร่ง: บทเพลงฉือของซูซื่อ (苏轼) และมรสุมชีวิต',
        en: 'Tranquil Wisdom: Su Shi & Poetic Resilience'
      },
      can_do: {
        th: 'เข้าใจปรัชญาชีวิตอันเบิกบานของซูซื่อ และใช้วรรคทอง เช่น 千里共婵娟, 也无风雨也无晴, 豁达 ในการปรับสมดุลจิตใจและให้กำลังใจผู้อื่นได้',
        en: 'Understand Su Shi\'s open-minded philosophy and cite verses like Sharing the Moon from Afar to provide comfort'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำวรรคทอง 千里共婵娟 และคำว่า 豁达 ไปใช้ในคำอวยพรเทศกาลไหว้พระจันทร์!',
      vocabulary: [
        {
          id: 'hsk4_5211',
          hanzi: '豁达',
          pinyin: 'huòdá',
          display_pinyin: 'huòdá',
          pinyin_tone: 'huo4da2',
          meaning_th: 'ใจกว้างปลอดโปร่ง / มองโลกในแง่บวกไม่ยึดติดมรสุมชีวิต (Open-minded and magnanimous)',
          meaning_en: 'open-minded / broad-minded / magnanimous',
          radical: '谷',
          radical_name_th: 'หมวดหุบเขา (谷字旁)',
          stroke_count: 23,
          mnemonic: 'หุบเขากว้างใหญ่เปิดโล่ง (豁) บรรลุทะลุปรุโปร่งในทุกเส้นทาง (达) = ใจกว้างเปิดโล่ง',
          kid_mnemonic: 'เดินออกจากถ้ำมืดแล้วเจอลานทุ่งหญ้ากว้างใหญ่สายลมพัดเย็นสบาย = 豁达',
          body_gesture: 'กางสองแขนออกกว้างแล้วยิ้มแย้มสูดอากาศบริสุทธิ์เต็มปอด'
        },
        {
          id: 'hsk4_5212',
          hanzi: '婵娟',
          pinyin: 'chánjuān',
          display_pinyin: 'chánjuān',
          pinyin_tone: 'chan2juan1',
          meaning_th: 'ดวงจันทร์อันงดงาม / เทพธิดาแห่งดวงจันทร์ (คำกวีแทนคำว่า ดวงจันทร์)',
          meaning_en: 'the beautiful moon / goddess of the moon',
          radical: '女',
          radical_name_th: 'หมวดผู้หญิง (女字旁)',
          stroke_count: 18,
          mnemonic: 'หญิงงามบนสรวงสวรรค์ (女) อ่อนช้อยงดงามดั่งจันทราวันเพ็ญ (婵娟) = ดวงจันทร์วันเพ็ญ',
          kid_mnemonic: 'กระต่ายหยกเคียงข้างฉางเอ๋อบนดวงจันทร์สีเหลืองทองกลมโต = 婵娟',
          body_gesture: 'สองมือทำเป็นวงกลมโค้งประกบกันเหนือศีรษะเหมือนพระจันทร์เต็มดวง'
        },
        {
          id: 'hsk4_5213',
          hanzi: '千里共婵娟',
          pinyin: 'qiānlǐgòngchánjuān',
          display_pinyin: 'qiānlǐgòngchánjuān',
          pinyin_tone: 'qian1li3gong4chan2juan1',
          meaning_th: 'แม้ห่างไกลพันลี้ ก็ร่วมชื่นชมแสงจันทร์ดวงเดียวกัน (คำอวยพรมิตรภาพและความผูกพัน)',
          meaning_en: 'share the beauty of the moon together though thousands of miles apart',
          radical: '十',
          radical_name_th: 'หมวดสิบ (十字儿)',
          stroke_count: 36,
          mnemonic: 'ระยะทางนับพันลี้ (千里) ร่วมกันแบ่งปันความสุข (共) ใต้แสงจันทร์ดวงเดียวกัน (婵娟) = ร่วมชมจันทร์พันลี้',
          kid_mnemonic: 'โทรศัพท์คุยกับคุณยายที่อยู่ต่างจังหวัดพร้อมมองพระจันทร์ดวงเดียวกัน = 千里共婵娟',
          body_gesture: 'เอามือซ้ายทาบอก มือขวาชี้ขึ้นมองดวงจันทร์ไกลแสนไกล'
        },
        {
          id: 'hsk4_5214',
          hanzi: '风雨',
          pinyin: 'fēngyǔ',
          display_pinyin: 'fēngyǔ',
          pinyin_tone: 'feng1yu3',
          meaning_th: 'ลมฝน / มรสุมและอุปสรรคแห่งชีวิต (Metaphor for trials and hardships)',
          meaning_en: 'wind and rain / hardships / trials and tribulations',
          radical: '风',
          radical_name_th: 'หมวดสายลม (风字旁)',
          stroke_count: 12,
          mnemonic: 'สายลมพัดกรรโชก (风) หยาดฝนตกกระหน่ำ (雨) = ลมฝนและบททดสอบชีวิต',
          kid_mnemonic: 'เดินกางร่มฝ่าพายุฝนเพื่อกลับไปกินข้าวอุ่นๆ ที่บ้าน = 风雨',
          body_gesture: 'สองมือทำท่ากันลมฝนที่พัดใส่ใบหน้า'
        },
        {
          id: 'hsk4_5215',
          hanzi: '淡然',
          pinyin: 'dànrán',
          display_pinyin: 'dànrán',
          pinyin_tone: 'dan4ran2',
          meaning_th: 'สงบนิ่งปล่อยวาง / ไม่ตื่นตระหนกต่อลาภยศสรรเสริญหรือคำนินทา (Serene and nonchalant)',
          meaning_en: 'calm / serene / indifferent to worldly gains / nonchalant',
          radical: '氵',
          radical_name_th: 'หมวดน้ำสามหยด (三点水)',
          stroke_count: 23,
          mnemonic: 'สายน้ำใสบริสุทธิ์ไม่ปรุงแต่ง (淡) คงอยู่เช่นนั้นตามธรรมชาติ (然) = สงบนิ่งปล่อยวาง',
          kid_mnemonic: 'จิบน้ำชาอุ่นๆ นั่งมองน้ำหยดหลังฝนหยุดตกด้วยรอยยิ้มนิ่งๆ = 淡然',
          body_gesture: 'ผายสองมือออกช้าๆ พร้อมยิ้มอย่างปล่อยวางไร้กังวล'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 千里共婵娟 (qiānlǐgòngchánjuān)',
        description_th: 'qiān (เสียง 1) lǐ (เสียง 3) gòng (เสียง 4) chán (เสียง 2) juān (เสียง 1)',
        example: '但愿人长久，千里共婵娟 (Dàn yuàn rén chángjiǔ, qiānlǐ gòng chánjuān)',
        fun_metaphor: 'คำกลอนที่คนไทยคุ้นหูที่สุดในเทศกาลไหว้พระจันทร์และเพลงเติ้งลี่จวิน',
        reassurance: 'คำว่า 婵 (chán) อ่านเสียง 2 และ 娟 (juān) อ่านเสียง 1'
      },
      grammar_bite: {
        title: 'โครงสร้างการอวยพรและการปล่อยวาง: 但愿……，千里共婵娟',
        formula: '但愿人长久，千里共婵娟；笑对人生起伏，看淡风雨阴晴',
        explanation_th: 'ใช้ในการเขียนการ์ดอวยพร ส่งสารอวยพรในเทศกาล และการเขียนบทความให้กำลังใจ',
        patterns: [
          {
            formula: '送上中秋祝福，祝愿千里共婵娟。',
            zh: '值此中秋佳节之际，衷心祝愿全球华侨华人幸福安康，“但愿人长久，千里共婵娟”。',
            pinyin: 'Zhícǐ zhōngqiū jiājié zhī jì, zhōngxīn zhùyuàn quánqiú huáqiáo huárén xìngfú ānkāng, "Dàn yuàn rén chángjiǔ, qiānlǐ gòng chánjuān".',
            th: 'เนื่องในวาระเทศกาลไหว้พระจันทร์ ขออวยพรอย่างจริงใจให้พี่น้องชาวจีนโพ้นทะเลทั่วโลกมีความสุขและสุขภาพแข็งแรง "ขอเพียงคนเราอายุยืนยาว แม้ห่างไกลพันลี้ก็ร่วมชมแสงจันทร์เดียวกัน"',
            en: 'On the occasion of the Mid-Autumn Festival, we sincerely wish overseas Chinese worldwide happiness and good health: "May we all be blessed with longevity, though miles apart, we share the beauty of the moon together".'
          },
          {
            formula: '面对逆境风雨，保持旷达淡然。',
            zh: '苏轼的名句“回首向来萧瑟处，归去，也无风雨也无晴”，启迪我们在逆境中保持从容与豁达。',
            pinyin: 'Sū Shì de míngjù "Huíshǒu xiànglái xiāosè chù, guīqù, yě wú fēngyǔ yě wú qíng", qǐdí wǒmen zài nìjìng zhōng bǎochí cóngróng yǔ huòdá.',
            th: 'วรรคทองของซูซื่อที่ว่า "เหลียวมองย้อนหลังไปยังที่ซึ่งเคยมีมรสุมเหน็บหนาว เดินกลับไป ไม่มีทั้งลมฝนและไม่มีทั้งแดดออก" ช่วยจุดประกายให้เรารักษาความสุขุมและใจกว้างในยามเผชิญวิกฤต',
            en: 'Su Shi\'s famous line "Looking back at the bleak path traveled, returning, there is neither rain nor sunshine" inspires us to maintain composure and broad-mindedness amid adversity.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '企业导师 (Executive Mentor) 🍵',
          zh: '小王，我看你最近因为海外项目受阻情绪有些低落，不如读一读苏东坡的《定风波》。',
          pinyin: 'Xiǎo Wáng, wǒ kàn nǐ zuìjìn yīnwèi hǎiwài xiàngmù shòuzǔ qíngxù yǒuxiē dīluò, bùrú dú yī dú Sū Dōngpō de "Dìngfēngbō".',
          th: 'เสี่ยวหวัง ผมเห็นคุณช่วงนี้จิตตกเล็กน้อยเพราะโครงการต่างประเทศติดขัด สู้มาลองอ่านบทกวี 《ติ้งเฟิงปัว》 ของซูตงพอดูสักหน่อยไหมครับ',
          en: 'Xiao Wang, I see you feeling a bit down due to setbacks in overseas projects; why not read Su Dongpo\'s "Calming the Waves"?',
          audio_trigger: 't4_u52_l03_d01'
        },
        {
          speaker: '海外项目经理 (Project Manager) 💼',
          zh: '“竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生！”苏轼当年被贬黄州，却能如此豁达从容。',
          pinyin: '"Zhúzhàng mángxié qīng shèng mǎ, shéi pà? Yī suō yānyǔ rèn píngshēng!" Sū Shì dāngnián bèi biǎn Huángzhōu, què néng rúcǐ huòdá cóngróng.',
          th: '"ไม้เท้าไผ่กับเกือกฟางเบาสบายกว่าขี่ม้า ใครจะกลัว? เสื้อคลุมฟางตัวเดียวปล่อยชีวิตผ่านลมฝนหมอกควัน!" ซูซื่อในตอนนั้นถูกเนรเทศไปหวงโจว แต่กลับใจกว้างและสงบเยือกเย็นได้ถึงเพียงนี้',
          en: '"Bamboo cane and straw sandals are lighter than horses; who is afraid? A straw cloak amidst misty rain lets me live out my life!" Exiled to Huangzhou back then, Su Shi was so magnanimous and composed.',
          audio_trigger: 't4_u52_l03_d02'
        },
        {
          speaker: '企业导师 (Executive Mentor) 🍵',
          zh: '没错。真正的强者不是没有经历过挫折，而是历经风雨之后，依然能够淡然一笑，“也无风雨也无晴”。',
          pinyin: 'Méi cuò. Zhēnzhèng de qiángzhě búshì méiyǒu jīnglì guò cuòzhé, ér shì lìjīng fēngyǔ zhīhòu, yīrán nénggòu dànrán yī xiào, "yě wú fēngyǔ yě wú qíng".',
          th: 'ถูกต้องแล้ว ผู้แข็งแกร่งที่แท้จริงไม่ใช่คนที่ไม่เคยเจอปัญหา แต่คือคนที่ผ่านมรสุมชีวิตมาแล้ว ยังคงยิ้มได้อย่างสงบนิ่ง "ไม่มีทั้งลมฝนและไม่มีทั้งแดดออก"',
          en: 'Exactly. The truly strong are not those who never faced setbacks, but those who, after weathering storms, can still smile calmly: "neither rain nor sunshine".',
          audio_trigger: 't4_u52_l03_d03'
        },
        {
          speaker: '海外项目经理 (Project Manager) 💼',
          zh: '谢谢导师点拨！我明白了，心怀坦荡、顺其自然，只要团队同心协力，什么样的坎坷我们都能跨过去！',
          pinyin: 'Xièxie dǎoshī diǎnbō! Wǒ míngbai le, xīnhuái tǎndàng, shùnqízìrán, zhǐyào tuánduì tóngxīn xiélì, shénmeyàng de kǎnkě wǒmen dōu néng kuà guòqù!',
          th: 'ขอบคุณท่านที่ช่วยชี้แนะทางสว่างครับ! ผมเข้าใจแล้ว จิตใจเปิดกว้าง คล้อยตามธรรมชาติ ขอเพียงทีมร่วมแรงร่วมใจ อุปสรรคแบบไหนเราก็ก้าวข้ามผ่านได้แน่นอนครับ!',
          en: 'Thank you mentor for your guidance! I understand now: keeping an open heart and following nature, as long as the team works together with one heart, we can overcome any rough bumps!',
          audio_trigger: 't4_u52_l03_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'วรรคทอง "但愿人长久，千里共婵娟" มาจากผลงานบทเพลงฉือชิ้นเอกใดของซูซื่อ?',
          options: [
            '水调歌头 (Shuǐdiàogētóu - เพลงชลธารเบื้องต้น)',
            '念奴娇·赤壁怀古 (Niànnújiāo - รำลึกอดีตผาแดง)',
            '江城子·乙卯正月二十日夜记梦 (เจียงเฉิงจื่อ)',
            '定风波 (Dìngfēngbō - สงบคลื่นลม)'
          ],
          correct_index: 0,
          explanation_th: '"但愿人长久，千里共婵娟" เป็นท่อนจบของ 《水调歌头·明月几时有》 ที่โด่งดังที่สุดในประวัติศาสตร์จีน',
          encouragement: 'ยอดเยี่ยมมาก! เข้าใจสุดยอดวรรณคดีจีนอย่างถ่องแท้!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "หวังเพียงอายุยืนยาว ร่วมชื่นชมแสงจันทร์พันลี้"',
          tokens: ['千里共婵娟', '但愿人长久'],
          correct_sequence: ['但愿人长久', '千里共婵娟'],
          pinyin: 'Dàn yuàn rén chángjiǔ, qiānlǐ gòng chánjuān.',
          meaning_th: 'หวังเพียงอายุยืนยาว ร่วมชื่นชมแสงจันทร์พันลี้',
          explanation_th: 'คำอธิษฐานความผาสุก (但愿人长久) + ความผูกพันข้ามพรมแดน (千里共婵娟)',
          encouragement: 'จัดคำอวยพรที่ไพเราะที่สุดในภาษาจีนได้อย่างงดงาม!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "豁" (huò - เปิดโล่ง/กว้างขวาง) ใน "豁达" มีหมวดนำ "谷" (หุบเขา) สื่อถึงจิตใจแบบใด?',
          options: [
            'จิตใจที่เปิดกว้างและลึกซึ้งดั่งหุบเขาธรรมชาติ สามารถโอบรับได้ทั้งเรื่องดีและเรื่องร้าย',
            'ความแคบของตรอกซอกซอย',
            'ความตระหนี่ถี่เหนียว',
            'ความดุร้ายของสัตว์ป่า'
          ],
          correct_index: 0,
          explanation_th: '"谷" คือหุบเขาที่กว้างขวาง สื่อถึงจิตใจที่โอบอ้อมอารีและเปิดกว้างไร้ขอบเขต (豁达)',
          encouragement: 'เข้าใจรากศัพท์หุบเขาแห่งความปล่อยวางได้อย่างลึกซึ้ง!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "婵娟" (chánjuān) ในบทกวีจีนโบราณ เป็นคำไวพจน์ (สัญลักษณ์แทน) ของสิ่งใด?',
          options: [
            '月亮 (yuèliang - พระจันทร์)',
            '太阳 (tàiyáng - พระอาทิตย์)',
            '大山 (dàshān - ภูเขาใหญ่)',
            '长河 (chánghé - แม่น้ำสายยาว)'
          ],
          correct_index: 0,
          explanation_th: '"婵娟" คือคำกวีที่ใช้แทน "月亮" (ดวงจันทร์วันเพ็ญอันงดงาม)',
          encouragement: 'จำคำศัพท์กวีชั้นสูงได้อย่างแม่นยำ!'
        }
      ],
      boss_challenge: {
        question: 'ในงานเลี้ยงอำลาเอกอัครราชทูตที่ครบวาระการปฏิบัติหน้าที่ ประโยคใดอวยพรมิตรภาพข้ามแดนได้อย่างอบอุ่น ซาบซึ้ง และงดงามที่สุด?',
        options: [
          '海内存知己，天涯若比邻；借苏轼名句预祝阁下前程似锦，“但愿人长久，千里共婵娟”！',
          '诉讼代理人在法庭上对证据严格质证，依据适用法律取得全面胜诉。',
          '双方约定将合同争议提交商事仲裁，依法执行终局裁决。',
          '仲裁庭积极斡旋协调，督促双方诚信履约并达成争议和解。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกผสาน "海内存知己，天涯若比邻" เข้ากับ "但愿人长久，千里共婵娟" ได้อย่างสมบูรณ์แบบ ไพเราะจับใจ และเหมาะสมกับพิธีการทูตสูงสุด'
      },
      cheer_trophy: {
        badge_name: 'บัณฑิตผู้รู้แจ้งความเบิกบาน (Scholar of Tranquil Wisdom)',
        message_th: 'ยินดีด้วย! คุณเข้าใจปรัชญาความเบิกบานของซูซื่อ และคำว่า 豁达, 婵娟, 千里共婵娟 พร้อมนำสุนทรียศาสตร์กวีไปปลอบประโลมและสร้างแรงใจแก่ผู้คน!',
        xp_reward: 120
      }
    },
    {
      lesson_id: 't4_u52_l04',
      lesson_number: 4,
      title: {
        zh: '登高望远：王安石哲理与现代气象',
        th: 'ขึ้นสู่ที่สูงมองการไกล: ปรัชญากวีของหวังอันสือ (王安石) และวิสัยทัศน์ร่วมสมัย',
        en: 'Climbing High: Wang Anshi & Philosophical Vision'
      },
      can_do: {
        th: 'อธิบายบทกวีเชิงปรัชญาของหวังอันสือ เช่น 登高, 哲理, 不畏浮云遮望眼, 自缘身在最高层, 寄托 และนำไปใช้อธิบายวิสัยทัศน์ทางยุทธศาสตร์ได้',
        en: 'Interpret Wang Anshi\'s philosophical poetry and cite "Fear Not Floating Clouds" to express strategic vision'
      },
      baby_step_goal: 'เป้าหมายวันนี้: นำวรรคทอง 不畏浮云遮望眼 ไปใช้ในการแถลงวิสัยทัศน์ความมั่นใจต่อหน้าผู้บริหาร!',
      vocabulary: [
        {
          id: 'hsk4_5216',
          hanzi: '登高',
          pinyin: 'dēnggāo',
          display_pinyin: 'dēnggāo',
          pinyin_tone: 'deng1gao1',
          meaning_th: 'การปีนขึ้นสู่ที่สูง / การขึ้นที่สูงเพื่อชมทัศนียภาพและมองการณ์ไกล',
          meaning_en: 'ascend heights / climb high / gain broader perspective',
          radical: '癶',
          radical_name_th: 'หมวดก้าวขา (登字头)',
          stroke_count: 22,
          mnemonic: 'ก้าวขาสองข้างปีนป่าย (登) ขึ้นสู่ยอดสูงเสียดฟ้า (高) = ปีนขึ้นสู่ที่สูง',
          kid_mnemonic: 'เดินขึ้นบันไดหอคอยโบราณขึ้นไปชั้นบนสุดเพื่อดูวิวทั้งเมือง = 登高',
          body_gesture: 'ก้าวขาสลับขึ้นสองก้าวแล้วทอดสายตามองไปข้างหน้าไกลแสนไกล'
        },
        {
          id: 'hsk4_5217',
          hanzi: '哲理',
          pinyin: 'zhélǐ',
          display_pinyin: 'zhélǐ',
          pinyin_tone: 'zhe2li3',
          meaning_th: 'ปรัชญา / สัจธรรมและข้อคิดอันลึกซึ้ง (Philosophical wisdom)',
          meaning_en: 'philosophical theory / philosophy / profound wisdom',
          radical: '口',
          radical_name_th: 'หมวดปาก (口字旁)',
          stroke_count: 21,
          mnemonic: 'ถ้อยคำแห่งปราชญ์ผู้รู้แจ้ง (哲) สัจธรรมกฎเกณฑ์แห่งหยก (理) = ปรัชญาข้อคิด',
          kid_mnemonic: 'เปิดอ่านม้วนคัมภีร์ที่มีตัวอักษรสีทองเปล่งประกายสัจธรรม = 哲理',
          body_gesture: 'เอานิ้วชี้แตะขมับแล้วผายมือออกข้างหน้าอย่างมีสติปัญญา'
        },
        {
          id: 'hsk4_5218',
          hanzi: '不畏浮云',
          pinyin: 'bùwèifúyún',
          display_pinyin: 'bùwèifúyún',
          pinyin_tone: 'bu4wei4fu2yun2',
          meaning_th: 'ไม่หวั่นเกรงเมฆหมอกบังตา (ไม่กลัวอุปสรรคหลอกลวงชั่วคราว / จากบทกวีหวังอันสือ)',
          meaning_en: 'fear not floating clouds / undeterred by illusions or temporary fog',
          radical: '一',
          radical_name_th: 'หมวดหนึ่ง (单一)',
          stroke_count: 27,
          mnemonic: 'ไม่ (不) หวั่นกลัวเกรงขาม (畏) ต่อเมฆหมอกที่ลอยมาบดบัง (浮云) = ไม่หวั่นเมฆหมอก',
          kid_mnemonic: 'โบกมือปัดหมอกควันสีเทาออกจากดวงตาแล้วมองเห็นดวงอาทิตย์แจ่มชัด = 不畏浮云',
          body_gesture: 'ใช้หลังมือขวาปัดไปข้างหน้าแสดงการขจัดเมฆหมอกที่บังสายตา'
        },
        {
          id: 'hsk4_5219',
          hanzi: '最高层',
          pinyin: 'zuìgāocéng',
          display_pinyin: 'zuìgāocéng',
          pinyin_tone: 'zui4gao1ceng2',
          meaning_th: 'จุดสูงสุด / ชั้นบนสุด / วิสัยทัศน์ระดับสูงสุด (Topmost level / Highest vantage point)',
          meaning_en: 'highest tier / topmost level / highest vantage point',
          radical: '日',
          radical_name_th: 'หมวดดวงอาทิตย์ (日字旁)',
          stroke_count: 32,
          mnemonic: 'ถึงที่สุดแห่งขอบฟ้า (最) ยอดเขาสูงส่ง (高) ในชั้นบรรยากาศสูงสุด (层) = ระดับสูงสุด',
          kid_mnemonic: 'ยืนบนยอดหอคอยกระจกชั้น 100 มองเห็นทั้งจักรวาล = 最高层',
          body_gesture: 'ชูมือขวาขึ้นสูงเหนือศีรษะแสดงจุดสูงสุด'
        },
        {
          id: 'hsk4_5220',
          hanzi: '寄托',
          pinyin: 'jìtuō',
          display_pinyin: 'jìtuō',
          pinyin_tone: 'ji4tuo1',
          meaning_th: 'การฝากฝัง / การฝากความหวังหรือความรู้สึกไว้กับสิ่งใดสิ่งหนึ่ง (Place hopes on)',
          meaning_en: 'entrust / place (hopes or feelings) on / sustainment',
          radical: '宀',
          radical_name_th: 'หมวดหลังคาเรือน (宝盖头)',
          stroke_count: 17,
          mnemonic: 'ส่งมอบไปรษณีย์ข้ามแดน (寄) ฝากฝังความไว้วางใจบนฝ่ามือ (托) = ฝากฝังความรู้สึก',
          kid_mnemonic: 'พับนกกระเรียนกระดาษเขียนคำอวยพรส่งไปให้เพื่อนรัก = 寄托',
          body_gesture: 'สองมือทำท่าประคองสิ่งของล้ำค่ายื่นมอบให้ด้วยความจริงใจ'
        }
      ],
      tone_rule: {
        rule_name: 'การออกเสียง 不畏浮云 (bùwèifúyún)',
        description_th: 'bù (เสียง 4 เปลี่ยนเป็น bú ตามกฎปู้หน้าเสียง 4: bú wèi) fú (เสียง 2) yún (เสียง 2)',
        example: '不畏浮云遮望眼，自缘身在最高层 (Bù wèi fúyún zhē wàng yǎn, zì yuán shēn zài zuì gāocéng)',
        fun_metaphor: 'คำว่า 不 หน้า 畏 (เสียง 4) ผันเสียงเป็น bú ตามกฎ Tone Sandhi',
        reassurance: 'วรรคทองของหวังอันสือที่ผู้นำระดับประธานาธิบดีชอบนำมาใช้อธิบายยุทธศาสตร์ระดับชาติ'
      },
      grammar_bite: {
        title: 'โครงสร้างการวิเคราะห์ยุทธศาสตร์: 坚持登高望远，不畏浮云遮望眼',
        formula: '始终坚持登高望远，不畏浮云遮望眼，善于在危机中育先机、于变局中开新局',
        explanation_th: 'ใช้ในการแถลงวิสัยทัศน์และการประชุมวางแผนยุทธศาสตร์องค์กรระดับชาติ',
        patterns: [
          {
            formula: '不畏浮云，保持战略定力。',
            zh: '面对国际风云变幻，我们必须“不畏浮云遮望眼，自缘身在最高层”，保持强大的战略定力。',
            pinyin: 'Miànduì guójì fēngyún biànhuàn, wǒmen bìxū "Bù wèi fúyún zhē wàng yǎn, zì yuán shēn zài zuì gāocéng", bǎochí qiángdà de zhànlüè dìnglì.',
            th: 'เมื่อเผชิญกับความผันผวนของสถานการณ์โลก พวกเราต้อง "ไม่หวั่นเมฆหมอกลอยมาบดบังสายตา ด้วยเหตุเพราะกายนี้ยืนหยัดอยู่บนชั้นสูงสุด" รักษาความแน่วแน่ทางยุทธศาสตร์อันแข็งแกร่ง',
            en: 'Facing international turbulence, we must "fear not floating clouds blocking our vision, for we stand on the highest peak", maintaining robust strategic resolve.'
          },
          {
            formula: '登高望远，寄托美好愿景。',
            zh: '登高望远不仅是一种开阔的地理境界，更寄托了中华民族追求天下大同的美好愿景。',
            pinyin: 'Dēnggāowàngyuǎn bùjǐn shì yī zhǒng kāikuò de dìlǐ jìngjiè, gèng jìtuō le Zhōnghuá mínzú zhuīqiú tiānxià dàtóng de měihǎo yuànjǐng.',
            th: 'การขึ้นที่สูงมองการณ์ไกลมิใช่เพียงสภาวะทางภูมิศาสตร์อันเปิดกว้างเท่านั้น แต่ยังฝากฝังวิสัยทัศน์อันงดงามของประชาชาติจีนในการแสวงหาโลกแห่งภราดรภาพสากล',
            en: 'Ascending heights to look far is not only a broad geographical perspective, but also entrusts the beautiful vision of the Chinese nation in pursuing universal harmony.'
          }
        ]
      },
      dialogue: [
        {
          speaker: '战略研究院长 (President of Strategy) 🧭',
          zh: '各位同仁，当前国际格局纷繁复杂，个别国家的逆全球化思潮如同层层浮云。',
          pinyin: 'Gèwèi tóngrén, dāngqián guójì géjú fēnfán fùzá, gèbié guójiā de nì quánqiúhuà sīcháo rútóng céngcéng fúyún.',
          th: 'เพื่อนร่วมงานทุกท่าน สภาวการณ์ระหว่างประเทศในปัจจุบันซับซ้อนสับสน กระแสต่อต้านโลกาภิวัตน์ของบางประเทศเปรียบเสมือนเมฆหมอกหนาทึบครับ',
          en: 'Colleagues, the current international landscape is complex; the anti-globalization trend in certain countries is like layers of floating clouds.',
          audio_trigger: 't4_u52_l04_d01'
        },
        {
          speaker: '资深顾问 (Senior Advisor) 🎓',
          zh: '宋代改革家王安石在登飞来峰时写道：“不畏浮云遮望眼，自缘身在最高层”。这正是战略家必备的历史眼光！',
          pinyin: 'Sòngdài gǎigéjiā Wáng Ānshí zài dēng Fēiláifēng shí xiědào: "Bù wèi fúyún zhē wàng yǎn, zì yuán shēn zài zuì gāocéng". Zhè zhèng shì zhànlüèjiā bìbèi de lìshǐ yǎnguāng!',
          th: 'หวังอันสือ นักปฏิรูปสมัยราชวงศ์ซ่ง เมื่อคราวปีนขึ้นยอดเขาเฟยไหลเฟิง ได้ประพันธ์ไว้ว่า "不畏浮云遮望眼，自缘身在最高层" นี่คือสายตาทางประวัติศาสตร์ที่นักยุทธศาสตร์ทุกคนต้องมีครับ!',
          en: 'Song Dynasty reformer Wang Anshi wrote atop Feilai Peak: "Fear not floating clouds blocking the view, for I stand on the highest level." This is the historical vision every strategist must possess!',
          audio_trigger: 't4_u52_l04_d02'
        },
        {
          speaker: '战略研究院长 (President of Strategy) 🧭',
          zh: '说得极是！登高望远，才能看清历史发展的大势所趋。我们要不畏浮云、保持定力，坚定推进多边合作。',
          pinyin: 'Shuō de jí shì! Dēnggāowàngyuǎn, cái néng kànqīng lìshǐ fāzhǎn de dàshìsuǒqū. Wǒmen yào bùwèifúyún, bǎochí dìnglì, jiāndìng tuījìn duōbiān hézuò.',
          th: 'พูดได้ตรงประเด็นที่สุด! ขึ้นที่สูงมองการณ์ไกล จึงจะเห็นแนวโน้มใหญ่แห่งประวัติศาสตร์ได้อย่างชัดเจน เราต้องไม่กลัวเมฆหมอก รักษาความแน่วแน่ และผลักดันความร่วมมือพหุภาคีอย่างมั่นคง',
          en: 'Extremely well said! Only by ascending heights can one clearly see the overarching trend of history. We must fear not clouds, maintain resolve, and firmly advance multilateral cooperation.',
          audio_trigger: 't4_u52_l04_d03'
        },
        {
          speaker: '资深顾问 (Senior Advisor) 🎓',
          zh: '将优秀的古典诗词哲理寄托于当代国家治理与跨国合作，正是“古为今用、温故知新”的最佳典范！',
          pinyin: 'Jiāng yōuxiù de gǔdiǎn shīcí zhélǐ jìtuō yú dāngdài guójiā zhìlǐ yǔ kuàguó hézuò, zhèng shì "gǔwéijīnyòng, wēngùzhīxīn" de zuìjiā diǎnfàn!',
          th: 'การนำปรัชญากวีนิพนธ์คลาสสิกอันยอดเยี่ยมมาฝากฝังไว้ในการบริหารรัฐร่วมสมัยและความร่วมมือข้ามชาติ คือตัวอย่างที่ดีที่สุดของ "นำอดีตรับใช้ปัจจุบัน ทบทวนอดีตรู้สิ่งใหม่" ครับ!',
          en: 'Entrusting outstanding classical poetry philosophy into contemporary governance and cross-border cooperation is the ultimate model of "making past serve present, gaining new insights from the old"!',
          audio_trigger: 't4_u52_l04_d04'
        }
      ],
      quizzes: [
        {
          type: 'multiple_choice',
          question_th: 'วรรคทอง "不畏浮云遮望眼，自缘身在最高层" เป็นผลงานประพันธ์ของใคร?',
          options: [
            '王安石 (หวังอันสือ)',
            '苏轼 (ซูซื่อ)',
            '李白 (หลี่ไป๋)',
            '杜甫 (ตู้ฝู่)'
          ],
          correct_index: 0,
          explanation_th: 'บทกวี 《登飞来峰》 เป็นผลงานเอกของ หวังอันสือ (王安石) นักปฏิรูปและกวีเอกสมัยราชวงศ์ซ่ง',
          encouragement: 'ยอดเยี่ยมมาก! มีความรู้ลึกซึ้งในวรรณคดีและประวัติศาสตร์จีน!'
        },
        {
          type: 'sentence_scramble',
          question_th: 'เรียงประโยค: "ไม่กลัวเมฆหมอกบังตา เพราะยืนอยู่บนชั้นสูงสุด"',
          tokens: ['自缘身在最高层', '不畏浮云遮望眼'],
          correct_sequence: ['不畏浮云遮望眼', '自缘身在最高层'],
          pinyin: 'Bù wèi fúyún zhē wàng yǎn, zì yuán shēn zài zuì gāocéng.',
          meaning_th: 'ไม่กลัวเมฆหมอกบังตา เพราะยืนอยู่บนชั้นสูงสุด',
          explanation_th: 'ความกล้าหาญไม่หวั่นเกรง (不畏浮云遮望眼) + เหตุผลแห่งวิสัยทัศน์สูงส่ง (自缘身在最高层)',
          encouragement: 'จัดวรรคทองเชิงปรัชญาได้อย่างยอดเยี่ยม!'
        },
        {
          type: 'radical_focus',
          question_th: 'คำว่า "登" (dēng - ปีนขึ้น/ก้าวขึ้น) มีหมวดนำ "癶" (ก้าวขา) ด้านบน สื่อถึงอะไร?',
          options: [
            'การก้าวเท้าสลับซ้ายขวาอย่างต่อเนื่องเพื่อปีนป่ายขึ้นสู่ที่สูง',
            'การนั่งสมาธิ',
            'การนอนหลับ',
            'การก้มหน้ากราบไหว้'
          ],
          correct_index: 0,
          explanation_th: '"癶" คือรอยเท้าสองข้างที่ก้าวเดินขึ้นสู่ที่สูงอย่างไม่หยุดยั้ง (登高)',
          encouragement: 'จำรากศัพท์ได้อย่างแม่นยำ!'
        },
        {
          type: 'multiple_choice',
          question_th: 'คำว่า "浮云" (fúyún - เมฆที่ลอยไปมา) ในกวีนิพนธ์จีนโบราณ มักเป็นสัญลักษณ์เปรียบเทียบกับสิ่งใด?',
          options: [
            'อุปสรรคชั่วคราว คำนินทา หรือความเข้าใจผิดที่เกิดขึ้นเพียงประเดี๋ยวประด๋าวแล้วก็สลายไป',
            'ทรัพย์สมบัติที่มั่นคงถาวร',
            'แผ่นดินใหญ่',
            'กำแพงเมืองจีน'
          ],
          correct_index: 0,
          explanation_th: '"浮云" เปรียบดั่งสิ่งหลอกลวงและความยากลำบากชั่วคราว ไม่สามารถบดบังดวงตะวันและวิสัยทัศน์ของผู้ยิ่งใหญ่ได้',
          encouragement: 'เข้าใจอุปมาทางปรัชญาอย่างลึกซึ้งและเฉียบคม!'
        }
      ],
      boss_challenge: {
        question: 'ในการแถลงข่าวปิดการประชุมสุดยอดผู้นำเศรษฐกิจโลก ประโยคใดสื่อถึงวิสัยทัศน์อันกว้างไกลและความเชื่อมั่นในอนาคตได้อย่างสมบูรณ์แบบที่สุด?',
        options: [
          '“不畏浮云遮望眼，自缘身在最高层”，只要各国坚持登高望远，加强多边沟通与合作，就一定能驱散阴霾，迎来共同繁荣的美好明天！',
          '建立健全企业合规风控审查体系，切实做到防患未然。',
          '依法向人民法院申请司法禁令与赔偿，获得及时的法律救济。',
          '管辖权异议是涉外诉讼的重要防线，应当实事求是权衡利弊。'
        ],
        correct_index: 0,
        explanation_th: 'ประโยคแรกอ้างอิง "不畏浮云遮望眼，自缘身在最高层" ควบคู่กับ "登高望远" และ "多边合作" ได้อย่างสง่างาม ทรงพลัง และมีวิสัยทัศน์กว้างไกลสูงสุด'
      },
      cheer_trophy: {
        badge_name: 'ผู้นำวิสัยทัศน์ยอดเขาสูงสุด (Master of the Highest Vantage Point)',
        message_th: 'ขอแสดงความยินดีด้วยอย่างยิ่ง! คุณได้พิชิตสุนทรียศาสตร์กวีนิพนธ์ถัง-ซ่ง และวรรคทองเชิงปรัชญาครบถ้วน ก้าวสู่การเป็นปราชญ์ภาษาจีนและวาทกรระดับตำนาน!',
        xp_reward: 150
      }
    }
  ]
};
