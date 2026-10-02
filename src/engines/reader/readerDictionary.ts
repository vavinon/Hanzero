/**
 * src/engines/reader/readerDictionary.ts
 * Compact, curated dictionary & idiom registry for Hanzero Immersion Reader.
 * Pure TypeScript, zero external dependencies, 100% testable.
 * Provides high-accuracy pinyin, Thai & English meanings, and HSK 3.0 level tags.
 */

import { WordDefinition } from '../../types/reader';

export interface DictEntry {
  p: string; // Pinyin with tone marks
  th: string; // Natural Thai meaning
  en: string; // English meaning
  h: number; // HSK Level: 1-6, 7 for HSK 7-9, 0 for domain/general
  d?: boolean; // True if specialized domain term
  r?: string; // Radical
  rn?: string; // Radical name in Thai
  eg?: { zh: string; pinyin: string; th: string; en: string };
}

/**
 * Curated compact dictionary mapping Chinese words/idioms to definitions.
 */
export const COMPACT_DICTIONARY: Record<string, DictEntry> = {
  // === 成语 (Chengyu 4-character idioms) & Proverbs ===
  '互利共赢': {
    p: 'hù lì gòng yíng',
    th: 'ผลประโยชน์ร่วมกัน ชนะทั้งสองฝ่าย (Win-win)',
    en: 'mutual benefit and win-win outcome',
    h: 5,
    eg: { zh: '双方本着互利共赢的原则开展合作。', pinyin: 'shuāng fāng běn zhe hù lì gòng yíng de yuán zé kāi zhǎn hé zuò.', th: 'ทั้งสองฝ่ายร่วมมือกันตามหลักการที่ได้ประโยชน์ร่วมกัน', en: 'Both sides cooperate on the principle of mutual benefit.' },
  },
  '脚踏实地': {
    p: 'jiǎo tà shí dì',
    th: 'ทำงานจริงจังมีหลักเกณฑ์ ไม่เพ้อฝัน',
    en: 'down-to-earth; pragmatic and steady',
    h: 5,
  },
  '讨价还价': {
    p: 'tǎo jià huán jià',
    th: 'ต่อรองราคาและเงื่อนไขอย่างละเอียด',
    en: 'bargain; haggle over price',
    h: 5,
  },
  '货真价实': {
    p: 'huò zhēn jià shí',
    th: 'สินค้าแท้คุณภาพคุ้มราคา',
    en: 'genuine goods at a fair price',
    h: 5,
  },
  '入乡随俗': {
    p: 'rù xiāng suí sú',
    th: 'เข้าเมืองตาหลิ่วต้องหลิ่วตาตาม',
    en: 'when in Rome, do as the Romans do',
    h: 5,
  },
  '一清二楚': {
    p: 'yī qīng èr chǔ',
    th: 'แจ่มแจ้งชัดเจน ไร้ข้อคลุมเครือ',
    en: 'crystal clear; fully evident',
    h: 4,
  },
  '日新月异': {
    p: 'rì xīn yuè yì',
    th: 'เปลี่ยนแปลงรุดหน้าเร็ววันต่อวัน',
    en: 'rapid progress day by day',
    h: 6,
  },
  '自告奋勇': {
    p: 'zì gào fèn yǒng',
    th: 'อาสาด้วยความกระตือรือร้นและมั่นใจ',
    en: 'volunteer courageously',
    h: 5,
  },
  '五湖四海': {
    p: 'wǔ hú sì hǎi',
    th: 'มาจากทั่วทุกทิศทุกมุมแคว้น',
    en: 'all corners of the country/world',
    h: 5,
  },
  '望子成龙': {
    p: 'wàng zǐ chéng lóng',
    th: 'หวังให้บุตรหลานเจริญก้าวหน้าเป็นเลิศ',
    en: 'hope one\'s child becomes successful',
    h: 5,
  },
  '绿水青山': {
    p: 'lǜ shuǐ qīng shān',
    th: 'ธรรมชาติป่าเขาเขียวขจีมีค่าดั่งทอง',
    en: 'clear waters and green mountains',
    h: 5,
  },
  '破釜沉舟': {
    p: 'pò fǔ chén zhōu',
    th: 'ทุบหม้อข้าว จมเรือรบ ตัดทางถอยสู้ตายเพื่อชัยชนะ',
    en: 'burn one\'s boats; commit fully to victory',
    h: 6,
  },
  '未雨绸缪': {
    p: 'wèi yǔ chóu móu',
    th: 'เตรียมการล่วงหน้าก่อนฝนตก ป้องกันไว้ก่อน',
    en: 'prepare for a rainy day; take precautions',
    h: 6,
  },
  '亡羊补牢': {
    p: 'wáng yáng bǔ láo',
    th: 'วัวหายล้อมคอก แก้ไขข้อผิดพลาดไม่ให้สายเกินไป',
    en: 'mend the fold after the sheep are lost; better late than never',
    h: 5,
  },
  '全力以赴': {
    p: 'quán lì yǐ fù',
    th: 'ทุ่มเทสุดกำลังความสามารถ',
    en: 'spare no effort; go all out',
    h: 5,
  },
  '得不偿失': {
    p: 'dé bù cháng shī',
    th: 'ได้ไม่คุ้มเสีย ขาดทุนมากกว่าได้',
    en: 'the gains do not make up for the losses',
    h: 6,
  },
  '苦尽甘来': {
    p: 'kǔ jìn gān lái',
    th: 'หมดทุกข์สุขมา ความลำบากสิ้นสุดลงพบความสำเร็จ',
    en: 'bitterness ends and sweetness begins',
    h: 6,
  },
  '迫在眉睫': {
    p: 'pò zài méi jié',
    th: 'จวนตัว อยู่ตรงหน้าเร่งด่วน',
    en: 'imminent; pressing on one\'s eyelashes',
    h: 6,
  },
  '供不应求': {
    p: 'gōng bù yìng qiú',
    th: 'สินค้าขาดตลาด ความต้องการมากกว่าปริมาณผลิต',
    en: 'supply falls short of demand',
    h: 5,
  },
  '兢兢业业': {
    p: 'jīng jīng yè yè',
    th: 'ขยันขันแข็งรอบคอบและตั้งใจ',
    en: 'cautious and conscientious',
    h: 6,
  },
  '马马虎虎': {
    p: 'mǎ ma hū hū',
    th: 'งั้นๆ / พอใช้ได้ / ชุ่ยๆ เลินเล่อ',
    en: 'so-so; careless',
    h: 3,
  },

  // === Business, Legal & Contracts (商务与法律) ===
  '商务谈判': { p: 'shāng wù tán pàn', th: 'การเจรจาต่อรองทางธุรกิจ', en: 'business negotiation', h: 5, d: true },
  '谈判': { p: 'tán pàn', th: 'เจรจา / ต่อรอง', en: 'negotiate / talk', h: 5 },
  '采购合同': { p: 'cǎi gòu hé tong', th: 'สัญญาจัดซื้อจัดจ้าง', en: 'procurement contract', h: 5, d: true },
  '采购': { p: 'cǎi gòu', th: 'จัดซื้อ / สั่งซื้อ', en: 'procure / purchase', h: 5 },
  '合同': { p: 'hé tong', th: 'สัญญา / ข้อตกลง', en: 'contract / agreement', h: 4 },
  '审阅': { p: 'shěn yuè', th: 'ตรวจทาน / พิจารณาตรวจดู', en: 'review / examine', h: 6 },
  '条款': { p: 'tiáo kuǎn', th: 'ข้อสัญญา / เงื่อนไข / มาตรา', en: 'clause / term', h: 5 },
  '甲方': { p: 'jiǎ fāng', th: 'ฝ่ายผู้ว่าจ้าง / ฝ่าย ก', en: 'Party A (first party in contract)', h: 5, d: true },
  '乙方': { p: 'yǐ fāng', th: 'ฝ่ายผู้รับจ้าง / ฝ่าย ข', en: 'Party B (second party in contract)', h: 5, d: true },
  '不可抗力': { p: 'bù kě kàng lì', th: 'เหตุสุดวิสัย (Force Majeure)', en: 'force majeure / act of God', h: 6, d: true },
  '违约金': { p: 'wéi yuē jīn', th: 'เบี้ยปรับการผิดสัญญา', en: 'liquidated damages / penalty', h: 6, d: true },
  '违约': { p: 'wéi yuē', th: 'ผิดสัญญา / ละเมิดข้อตกลง', en: 'breach of contract', h: 5 },
  '保密协议': { p: 'bǎo mì xié yì', th: 'สัญญาไม่เปิดเผยข้อมูลความลับ (NDA)', en: 'non-disclosure agreement (NDA)', h: 5, d: true },
  '保密': { p: 'bǎo mì', th: 'รักษาความลับ', en: 'keep confidential', h: 5 },
  '协议': { p: 'xié yì', th: 'ข้อตกลง / สัญญา', en: 'agreement / pact', h: 5 },
  '账期': { p: 'zhàng qī', th: 'เครดิตเทอม / กำหนดเวลาชำระเงิน', en: 'credit term / payment period', h: 5, d: true },
  '预付款': { p: 'yù fù kuǎn', th: 'เงินมัดจำ / เงินจ่ายล่วงหน้า', en: 'advance payment / deposit', h: 5, d: true },
  '尾款': { p: 'wěi kuǎn', th: 'เงินค่างวดสุดท้าย', en: 'final payment / remaining balance', h: 5, d: true },
  '信用证': { p: 'xìn yòng zhèng', th: 'เลตเตอร์ออฟเครดิต (L/C)', en: 'letter of credit (L/C)', h: 6, d: true },
  '利润率': { p: 'lì rùn lǜ', th: 'อัตรากำไร (Margin)', en: 'profit margin', h: 5, d: true },
  '起订量': { p: 'qǐ dìng liàng', th: 'ยอดสั่งซื้อขั้นต่ำ (MOQ)', en: 'minimum order quantity (MOQ)', h: 5, d: true },
  '履约': { p: 'lǚ yuè', th: 'ปฏิบัติตามสัญญา', en: 'fulfill contract terms', h: 6 },
  '义务': { p: 'yì wù', th: 'ภาระหน้าที่ / ข้อผูกพัน', en: 'obligation / duty', h: 5 },
  '纠纷': { p: 'jiū fēn', th: 'ข้อพิพาท / ข้อขัดแย้ง', en: 'dispute / controversy', h: 5 },
  '协商': { p: 'xié shāng', th: 'ปรึกษาหารือ / ไกล่เกลี่ย', en: 'consult / deliberate', h: 5 },
  '诉讼': { p: 'sù sòng', th: 'การฟ้องร้องคดีความในศาล', en: 'lawsuit / litigation', h: 6 },
  '仲裁委员会': { p: 'zhòng cái wěi yuán huì', th: 'คณะกรรมการอนุญาโตตุลาการ', en: 'arbitration commission', h: 7, d: true },
  '管辖权': { p: 'guǎn xiá quán', th: 'เขตอำนาจศาล (Jurisdiction)', en: 'jurisdiction', h: 7, d: true },

  // === E-Commerce & Tech (电商与科技) ===
  '直播带货': { p: 'zhí bō dài huò', th: 'ไลฟ์สดขายสินค้า', en: 'livestream selling', h: 5, d: true },
  '直播': { p: 'zhí bō', th: 'ถ่ายทอดสด / ไลฟ์', en: 'live broadcast', h: 4 },
  '带货': { p: 'dài huò', th: 'แนะนำและขายสินค้า', en: 'endorse / sell goods', h: 4 },
  '私域流量': { p: 'sī yù liú liàng', th: 'ทราฟฟิกส่วนตัว (Private Traffic)', en: 'private domain traffic', h: 6, d: true },
  '流量': { p: 'liú liàng', th: 'ปริมาณผู้เข้าชม / ทราฟฟิก', en: 'traffic / flow', h: 5 },
  '转化率': { p: 'zhuǎn huà lǜ', th: 'อัตราส่วนการแปลงเป็นยอดซื้อ', en: 'conversion rate', h: 5, d: true },
  '闭环': { p: 'bì huán', th: 'ลูปวงจรปิด (Closed-loop ecosystem)', en: 'closed loop / complete cycle', h: 6, d: true },
  '供应链': { p: 'gōng yìng liàn', th: 'ห่วงโซ่อุปทาน (Supply Chain)', en: 'supply chain', h: 5, d: true },
  '复购率': { p: 'fù gòu lǜ', th: 'อัตราการซื้อซ้ำ', en: 'repurchase rate', h: 5, d: true },
  '新能源汽车': { p: 'xīn néng yuán qì chē', th: 'รถยนต์พลังงานใหม่ (EV/Hybrid)', en: 'new energy vehicle (NEV)', h: 6, d: true },
  '新能源': { p: 'xīn néng yuán', th: 'พลังงานใหม่ / พลังงานสะอาด', en: 'new energy', h: 5 },
  '电动车': { p: 'diàn dòng chē', th: 'รถยนต์ไฟฟ้า / มอเตอร์ไซค์ไฟฟ้า', en: 'electric vehicle (EV)', h: 4 },
  '自动驾驶': { p: 'zì dòng jià shǐ', th: 'ระบบขับเคลื่อนอัตโนมัติ', en: 'autonomous driving', h: 6, d: true },
  '人工智能': { p: 'rén gōng zhì néng', th: 'ปัญญาประดิษฐ์ (AI)', en: 'artificial intelligence (AI)', h: 5 },
  '大语言模型': { p: 'dà yǔ yán mó xíng', th: 'โมเดลภาษาขนาดใหญ่ (LLM)', en: 'large language model (LLM)', h: 7, d: true },
  '芯片': { p: 'xīn piàn', th: 'ไมโครชิป / เซมิคอนดักเตอร์', en: 'microchip / semiconductor', h: 5 },
  '算力': { p: 'suàn lì', th: 'พลังการประมวลผลทางคอมพิวเตอร์', en: 'computing power', h: 6, d: true },
  '续航里程': { p: 'xù háng lǐ chéng', th: 'ระยะทางวิ่งต่อการชาร์จหนึ่งครั้ง', en: 'driving range / endurance', h: 6, d: true },
  '续航': { p: 'xù háng', th: 'ระยะเวลาหรือระยะทางที่ใช้งานได้ต่อเนื่อง', en: 'battery life / cruising range', h: 5 },
  '智能化': { p: 'zhì néng huà', th: 'การยกระดับสู่ระบบอัจฉริยะ', en: 'intelligentization / smart upgrade', h: 6 },
  '产业升级': { p: 'chǎn yè shēng jí', th: 'การยกระดับอุตสาหกรรม', en: 'industrial upgrading', h: 6, d: true },
  '生态红线': { p: 'shēng tài hóng xiàn', th: 'เส้นแดงขอบเขตการคุ้มครองระบบนิเวศ', en: 'ecological red line', h: 7, d: true },

  // === Society & Mindset (社会与心态) ===
  '内卷': { p: 'nèi juǎn', th: 'การแข่งขันที่กดดันดุเดือด (Involution)', en: 'involution; intense competition', h: 5, d: true },
  '躺平': { p: 'tǎng píng', th: 'การนอนราบ / ไม่ดิ้นรนแข่งขันเกินตัว', en: 'lying flat; opting out of rat race', h: 5, d: true },
  '摆烂': { p: 'bǎi làn', th: 'การปล่อยจอย / ปล่อยให้พังไปเลย', en: 'letting things rot; giving up', h: 5, d: true },
  '松弛感': { p: 'sōng chí gǎn', th: 'ความรู้สึกผ่อนคลายสบายๆ ไม่ตื่นตระหนก', en: 'sense of relaxation and ease', h: 6, d: true },
  '焦虑': { p: 'jiāo lǜ', th: 'ความวิตกกังวล / ความเครียดสะสม', en: 'anxiety / worried', h: 5 },
  '破局': { p: 'pò jú', th: 'การฝ่าวิกฤต / หาทางออกจากทางตัน', en: 'break the impasse / breakthrough', h: 6 },
  '双碳目标': { p: 'shuāng tàn mù biāo', th: 'เป้าหมายคาร์บอนคู่ (พีคคาร์บอน & ความเป็นกลางทางคาร์บอน)', en: 'dual carbon goals', h: 7, d: true },
  '绿色转型': { p: 'lǜ sè zhuǎn xíng', th: 'การเปลี่ยนผ่านสู่เศรษฐกิจสีเขียว', en: 'green transformation', h: 6, d: true },

  // === Core HSK Vocabulary & High-Frequency Functional Words ===
  '你好': { p: 'nǐ hǎo', th: 'สวัสดี', en: 'hello', h: 1, r: '亻', rn: 'คน' },
  '谢谢': { p: 'xiè xie', th: 'ขอบคุณ', en: 'thank you', h: 1, r: '讠', rn: 'คำพูด' },
  '不客气': { p: 'bú kè qi', th: 'ไม่เป็นไร / ด้วยความยินดี', en: 'you are welcome', h: 1 },
  '再见': { p: 'zài jiàn', th: 'ลาก่อน / พบกันใหม่', en: 'goodbye', h: 1 },
  '中国': { p: 'zhōng guó', th: 'ประเทศจีน', en: 'China', h: 1 },
  '泰国': { p: 'tài guó', th: 'ประเทศไทย', en: 'Thailand', h: 1 },
  '公司': { p: 'gōng sī', th: 'บริษัท', en: 'company / corporation', h: 2 },
  '合作': { p: 'hé zuò', th: 'ร่วมมือ / ทำงานร่วมกัน', en: 'cooperate / collaboration', h: 4 },
  '发展': { p: 'fā zhǎn', th: 'พัฒนา / การเจริญเติบโต', en: 'develop / growth', h: 3 },
  '技术': { p: 'jì shù', th: 'เทคโนโลยี / ทักษะวิชาชีพ', en: 'technology / skill', h: 4 },
  '市场': { p: 'shì chǎng', th: 'ตลาด / แวดวงการค้า', en: 'market / marketplace', h: 3 },
  '产品': { p: 'chǎn pǐn', th: 'ผลิตภัณฑ์ / สินค้า', en: 'product / goods', h: 4 },
  '用户': { p: 'yòng hù', th: 'ผู้ใช้งาน / ลูกค้า', en: 'user / customer', h: 4 },
  '数据': { p: 'shù jù', th: 'ข้อมูลสถิติ / ดาต้า', en: 'data / numbers', h: 4 },
  '投资': { p: 'tóu zī', th: 'ลงทุน / เงินลงทุน', en: 'invest / investment', h: 4 },
  '全球': { p: 'quán qiú', th: 'ทั่วโลก / ระดับโลก', en: 'global / worldwide', h: 4 },
  '未来': { p: 'wèi lái', th: 'อนาคต', en: 'future', h: 3 },
  '目前': { p: 'mù qián', th: 'ในปัจจุบัน / ณ ตอนนี้', en: 'at present / currently', h: 4 },
  '情况': { p: 'qíng kuàng', th: 'สถานการณ์ / สภาพความเป็นอยู่', en: 'situation / circumstances', h: 3 },
  '方案': { p: 'fāng àn', th: 'แผนการ / โครงการแก้ไข', en: 'plan / scheme', h: 5 },
  '总结': { p: 'zǒng jié', th: 'สรุปผล / บทสรุป', en: 'summarize / conclusion', h: 4 },
  '进展': { p: 'jìn zhǎn', th: 'ความคืบหน้า / ก้าวหน้า', en: 'progress / headway', h: 5 },
  '汇报': { p: 'huì bào', th: 'รายงานความคืบหน้าต่อหัวหน้า', en: 'report to superiors', h: 5 },
  '责任': { p: 'zé rèn', th: 'ความรับผิดชอบ / ภาระ', en: 'responsibility / duty', h: 4 },
  '沟通': { p: 'gōu tōng', th: 'ติดต่อสื่อสาร / พูดคุยทำความเข้าใจ', en: 'communicate / liaison', h: 4 },
  '反馈': { p: 'fǎn kuì', th: 'ข้อเสนอแนะสะท้อนกลับ (Feedback)', en: 'feedback', h: 5 },
  '协调': { p: 'xié tiáo', th: 'ประสานงาน / สอดคล้องกลมกลืน', en: 'coordinate / harmonize', h: 5 },
  '成本': { p: 'chéng běn', th: 'ต้นทุน', en: 'cost / prime cost', h: 5 },
  '价格': { p: 'jià gé', th: 'ราคา', en: 'price / value', h: 3 },
  '质量': { p: 'zhì liàng', th: 'คุณภาพ', en: 'quality', h: 3 },
  '平台': { p: 'píng tái', th: 'แพลตฟอร์ม', en: 'platform', h: 5 },
  '品牌': { p: 'pǐn pái', th: 'แบรนด์ / ยี่ห้อ', en: 'brand / trademark', h: 5 },
  '销售': { p: 'xiāo shòu', th: 'การขาย / ยอดจำหน่าย', en: 'sell / marketing', h: 4 },
  '竞争': { p: 'jìng zhēng', th: 'การแข่งขัน', en: 'competition / compete', h: 4 },
  '优势': { p: 'yōu shì', th: 'จุดเด่น / ข้อได้เปรียบ', en: 'advantage / superiority', h: 4 },
  '劣势': { p: 'liè shì', th: 'จุดด้อย / ข้อเสียเปรียบ', en: 'disadvantage / inferior position', h: 5 },
  '挑战': { p: 'tiǎo zhàn', th: 'ความท้าทาย', en: 'challenge', h: 4 },
  '机会': { p: 'jī huì', th: 'โอกาส', en: 'opportunity / chance', h: 3 },
  '环境': { p: 'huán jìng', th: 'สภาพแวดล้อม / สิ่งแวดล้อม', en: 'environment / surroundings', h: 3 },
  '文化': { p: 'wén huà', th: 'วัฒนธรรม', en: 'culture', h: 3 },
  '历史': { p: 'lì shǐ', th: 'ประวัติศาสตร์', en: 'history', h: 3 },
  '社会': { p: 'shè huì', th: 'สังคม', en: 'society', h: 4 },
  '生活': { p: 'shēng huó', th: 'การใช้ชีวิต / ดำเนินชีวิต', en: 'life / live', h: 3 },
  '工作': { p: 'gōng zuò', th: 'การทำงาน / งาน', en: 'work / job', h: 1 },
  '学习': { p: 'xué xí', th: 'การเรียนรู้ / ศึกษา', en: 'study / learn', h: 1 },
  '重要': { p: 'zhòng yào', th: 'สำคัญ', en: 'important', h: 2 },
  '主要': { p: 'zhǔ yào', th: 'เป็นหลัก / สำคัญยิ่ง', en: 'main / primary', h: 3 },
  '因为': { p: 'yīn wèi', th: 'เพราะว่า', en: 'because', h: 2 },
  '所以': { p: 'suǒ yǐ', th: 'ดังนั้น จึง', en: 'therefore', h: 2 },
  '虽然': { p: 'suī rán', th: 'แม้ว่า', en: 'although', h: 3 },
  '但是': { p: 'dàn shì', th: 'แต่ว่า', en: 'but / however', h: 2 },
  '不仅': { p: 'bù jǐn', th: 'ไม่เพียงแต่', en: 'not only', h: 4 },
  '而且': { p: 'ér qiě', th: 'แต่ยัง...อีกด้วย', en: 'and also / furthermore', h: 3 },
  '然而': { p: 'rán ér', th: 'อย่างไรก็ตาม', en: 'however / yet', h: 4 },
  '通过': { p: 'tōng guò', th: 'ผ่านทาง / โดยอาศัย', en: 'through / via', h: 3 },
  '随着': { p: 'suí zhe', th: 'ตามการ... / ควบคู่ไปกับ', en: 'along with / in the wake of', h: 4 },

  // === Core HSK 1 & 2 Pronouns, Verbs & High-Frequency Particles ===
  '我': { p: 'wǒ', th: 'ฉัน / ผม', en: 'I / me', h: 1, r: '戈', rn: 'หอก' },
  '你': { p: 'nǐ', th: 'คุณ / เธอ', en: 'you', h: 1, r: '亻', rn: 'คน' },
  '他': { p: 'tā', th: 'เขา (ผู้ชาย)', en: 'he / him', h: 1, r: '亻', rn: 'คน' },
  '她': { p: 'tā', th: 'เธอ (ผู้หญิง)', en: 'she / her', h: 1, r: '女', rn: 'ผู้หญิง' },
  '我们': { p: 'wǒ men', th: 'พวกเรา', en: 'we / us', h: 1 },
  '你们': { p: 'nǐ men', th: 'พวกคุณ', en: 'you (plural)', h: 1 },
  '他们': { p: 'tā men', th: 'พวกเขา', en: 'they / them', h: 1 },
  '是': { p: 'shì', th: 'คือ / เป็น / ใช่', en: 'to be / yes', h: 1, r: '日', rn: 'ดวงอาทิตย์' },
  '叫': { p: 'jiào', th: 'ชื่อว่า / เรียก', en: 'call / called', h: 1, r: '口', rn: 'ปาก' },
  '什么': { p: 'shén me', th: 'อะไร', en: 'what', h: 1 },
  '名字': { p: 'míng zi', th: 'ชื่อ', en: 'name', h: 1 },
  '人': { p: 'rén', th: 'คน', en: 'person / human', h: 1, r: '人', rn: 'คน' },
  '中国人': { p: 'zhōng guó rén', th: 'คนจีน / ชาวจีน', en: 'Chinese person', h: 1 },
  '泰国人': { p: 'tài guó rén', th: 'คนไทย / ชาวไทย', en: 'Thai person', h: 1 },
  '很': { p: 'hěn', th: 'มาก', en: 'very', h: 1, r: '彳', rn: 'ทางเดิน' },
  '好': { p: 'hǎo', th: 'ดี', en: 'good / well', h: 1, r: '女', rn: 'ผู้หญิง' },
  '的': { p: 'de', th: 'ของ / ที่', en: 'possessive or descriptive particle', h: 1, r: '白', rn: 'สีขาว' },
  '了': { p: 'le', th: 'แล้ว (จบการกระทำ / เปลี่ยนสภาพ)', en: 'aspect particle (completed action)', h: 1 },
  '在': { p: 'zài', th: 'อยู่ / ที่ / กำลัง', en: 'at / in / ongoing', h: 1 },
  '有': { p: 'yǒu', th: 'มี', en: 'have / there is', h: 1, r: '月', rn: 'ดวงจันทร์' },
  '和': { p: 'hé', th: 'และ / กับ', en: 'and / with', h: 1, r: '口', rn: 'ปาก' },
  '这': { p: 'zhè', th: 'นี่ / นี้', en: 'this', h: 1, r: '辶', rn: 'ก้าวเดิน' },
  '那': { p: 'nà', th: 'นั่น / นั้น', en: 'that', h: 1 },
  '不': { p: 'bù', th: 'ไม่', en: 'not / no', h: 1 },
  '个': { p: 'gè', th: 'อัน / ชิ้น (ลักษณนามทั่วไป)', en: 'general measure word', h: 1 },
  '会': { p: 'huì', th: 'เป็น / สามารถ / จะ', en: 'can / will', h: 1 },
  '看': { p: 'kàn', th: 'ดู / มอง / อ่าน', en: 'look / see / read', h: 1 },
  '说': { p: 'shuō', th: 'พูด', en: 'speak / say', h: 1, r: '讠', rn: 'คำพูด' },
  '听': { p: 'tīng', th: 'ฟัง', en: 'listen / hear', h: 1, r: '口', rn: 'ปาก' },
  '去': { p: 'qù', th: 'ไป', en: 'go', h: 1 },
  '来': { p: 'lái', th: 'มา', en: 'come', h: 1 },
  '想': { p: 'xiǎng', th: 'อยาก / คิดถึง / คิดว่า', en: 'want / think / miss', h: 1 },
  '吃': { p: 'chī', th: 'กิน', en: 'eat', h: 1, r: '口', rn: 'ปาก' },
  '喝': { p: 'hē', th: 'ดื่ม', en: 'drink', h: 1, r: '口', rn: 'ปาก' },
  '大': { p: 'dà', th: 'ใหญ่', en: 'big / large', h: 1, r: '大', rn: 'ใหญ่' },
  '小': { p: 'xiǎo', th: 'เล็ก', en: 'small / little', h: 1, r: '小', rn: 'เล็ก' },
  '多': { p: 'duō', th: 'มาก / เยอะ', en: 'many / much', h: 1 },
  '少': { p: 'shǎo', th: 'น้อย', en: 'few / little', h: 1 },
};

/**
 * Pre-compiled list of multi-character compounds (sorted descending by string length).
 * Used for Greedy Forward Matching in Phase 1 of Hybrid Segmentation to prevent breaking idioms.
 */
export const KNOWN_MULTI_CHAR_COMPOUNDS: string[] = Object.keys(COMPACT_DICTIONARY)
  .filter((word) => word.length >= 2)
  .sort((a, b) => b.length - a.length);

/**
 * Fast lookup helper for word definitions.
 */
export function lookupDictionary(word: string): WordDefinition | null {
  const clean = word.trim();
  const entry = COMPACT_DICTIONARY[clean];
  if (!entry) return null;

  return {
    word: clean,
    pinyin: entry.p,
    meaning_th: entry.th,
    meaning_en: entry.en,
    hsk_level: entry.h,
    is_domain_term: entry.d,
    radical: entry.r,
    radical_name_th: entry.rn,
    example_sentence: entry.eg,
  };
}
