const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'data', 'lessons');

// ==========================================
// TIER 2: TRAVELER (15 Units Blueprint)
// ==========================================
const tier2Data = {
  tier_id: "tier2",
  tier_number: 2,
  name: {
    zh: "行者级：深度出行与生活 (HSK 3-4)",
    th: "Tier 2: Traveler (นักเดินทางท่องแดนมังกร)",
    en: "Tier 2: Traveler (Independent Exploration)"
  },
  description: "เที่ยวจีนคนเดียว สั่งเดลิเวอรี่ จ่ายเงินผ่านมือถือ จองตั๋วรถไฟความเร็วสูง เรียกรถ และสนทนาลื่นไหลแบบคนท้องถิ่น",
  total_units: 15,
  units: [
    {
      unit_id: "tier2_u01",
      unit_number: 1,
      title: { zh: "外卖订餐与备注", th: "สั่งอาหารเดลิเวอรี่ & ระบุหมายเหตุพิเศษ", en: "Food Delivery & Special Instructions" },
      icon: "🛵",
      estimated_minutes: 25,
      xp_reward: 200,
      status: "ready",
      key_vocabulary: [
        { hanzi: "外卖", pinyin: "wàimài", meaning_th: "เดลิเวอรี่ / อาหารสั่งกลับบ้าน" },
        { hanzi: "送餐", pinyin: "sòngcān", meaning_th: "ส่งอาหาร" },
        { hanzi: "微辣", pinyin: "wēilà", meaning_th: "เผ็ดน้อย" },
        { hanzi: "不放香菜", pinyin: "bù fàng xiāngcài", meaning_th: "ไม่ใส่ผักชี" },
        { hanzi: "骑手", pinyin: "qíshǒu", meaning_th: "ไรเดอร์ส่งอาหาร" }
      ],
      grammar_point: "การใช้ '请 + 别/不要...' เพื่อระบุข้อห้ามในหมายเหตุ เช่น '请不要放辣' (โปรดอย่าใส่เผ็ด)",
      sample_dialogue: {
        speaker_a: "ไรเดอร์ 🛵: 您好，您的外卖到了，在酒店前台！",
        speaker_b: "ผู้เรียน 🧒: 好的，非常感谢，我马上下来拿！"
      }
    },
    {
      unit_id: "tier2_u02",
      unit_number: 2,
      title: { zh: "微信与支付宝扫码支付", th: "กระเป๋าเงินดิจิทัล WeChat Pay & Alipay", en: "Mobile Payments (WeChat & Alipay)" },
      icon: "📱",
      estimated_minutes: 25,
      xp_reward: 200,
      status: "ready",
      key_vocabulary: [
        { hanzi: "扫码", pinyin: "sǎomǎ", meaning_th: "สแกนคิวอาร์โค้ด" },
        { hanzi: "微信支付", pinyin: "Wēixìn zhīfù", meaning_th: "WeChat Pay" },
        { hanzi: "支付宝", pinyin: "Zhīfùbǎo", meaning_th: "Alipay" },
        { hanzi: "我扫你", pinyin: "wǒ sǎo nǐ", meaning_th: "ฉันสแกนเธอ (เธอเปิดรับเงิน)" },
        { hanzi: "你扫我", pinyin: "nǐ sǎo wǒ", meaning_th: "เธอสแกนฉัน (ฉันเปิดบาร์โค้ดจ่าย)" }
      ],
      grammar_point: "โครงสร้าง '用 + [วิธี] + 支付' เช่น '可以用微信支付吗？' (ใช้ WeChat Pay ได้ไหมครับ?)",
      sample_dialogue: {
        speaker_a: "สมชาย 🧒: 请问，可以刷微信吗？",
        speaker_b: "คนขาย 👩‍💼: 可以，我扫你还是你扫我？"
      }
    },
    {
      unit_id: "tier2_u03",
      unit_number: 3,
      title: { zh: "乘坐高铁与火车站进站", th: "นั่งรถไฟความเร็วสูง (高铁) & ตรวจตั๋ว", en: "High-Speed Rail & Train Station" },
      icon: "🚄",
      estimated_minutes: 25,
      xp_reward: 200,
      status: "ready",
      key_vocabulary: [
        { hanzi: "高铁", pinyin: "gāotiě", meaning_th: "รถไฟความเร็วสูง" },
        { hanzi: "二等座", pinyin: "èrděngzuò", meaning_th: "ที่นั่งชั้นสอง" },
        { hanzi: "候车室", pinyin: "hòuchēshì", meaning_th: "ห้องพักผู้โดยสารรอขึ้นรถ" },
        { hanzi: "检票口", pinyin: "jiǎnpiàokǒu", meaning_th: "ประตูตรวจตั๋ว" },
        { hanzi: "靠窗", pinyin: "kàochuāng", meaning_th: "ติดริมหน้าต่าง" }
      ],
      grammar_point: "การระบุตำแหน่งที่นั่งด้วย '靠...' เช่น 靠窗 (ริมหน้าต่าง), 靠过道 (ริมทางเดิน)",
      sample_dialogue: {
        speaker_a: "สมชาย 🧒: 请问去上海的高铁在哪个检票口？",
        speaker_b: "เจ้าหน้าที่ 👨‍✈️: 在12号检票口，请提前15分钟进站。"
      }
    },
    { unit_id: "tier2_u04", unit_number: 4, title: { zh: "租房与公寓生活", th: "เช่าห้องพักและอพาร์ตเมนต์", en: "Renting an Apartment" }, icon: "🔑", estimated_minutes: 25, xp_reward: 200, status: "blueprint" },
    { unit_id: "tier2_u05", unit_number: 5, title: { zh: "网约车滴滴出行", th: "เรียกรถ Didi และคุยกับคนขับ", en: "Ride Hailing with Didi" }, icon: "🚖", estimated_minutes: 25, xp_reward: 200, status: "blueprint" },
    { unit_id: "tier2_u06", unit_number: 6, title: { zh: "退换货与售后服务", th: "คืนของ เปลี่ยนสินค้า และบริการหลังการขาย", en: "Returns & Exchanges" }, icon: "📦", estimated_minutes: 25, xp_reward: 200, status: "blueprint" },
    { unit_id: "tier2_u07", unit_number: 7, title: { zh: "理发与水疗放松", th: "ตัดผมและสปาผ่อนคลาย", en: "Haircut & Spa" }, icon: "💇", estimated_minutes: 25, xp_reward: 200, status: "blueprint" },
    { unit_id: "tier2_u08", unit_number: 8, title: { zh: "历史名胜与买票预约", th: "เที่ยวสถานที่ประวัติศาสตร์ & จองตั๋วเข้าชม", en: "Visiting Historical Sites" }, icon: "🏯", estimated_minutes: 25, xp_reward: 200, status: "blueprint" },
    { unit_id: "tier2_u09", unit_number: 9, title: { zh: "表达观点与深入感受", th: "การแสดงความเห็นและความรู้สึกเชิงลึก", en: "Expressing In-depth Opinions" }, icon: "💭", estimated_minutes: 25, xp_reward: 200, status: "blueprint" },
    { unit_id: "tier2_u10", unit_number: 10, title: { zh: "工作求职与面试初探", th: "การสัมภาษณ์งานและแนะนำประสบการณ์", en: "Job Interview Basics" }, icon: "💼", estimated_minutes: 25, xp_reward: 200, status: "blueprint" },
    { unit_id: "tier2_u11", unit_number: 11, title: { zh: "中国茶文化与聚会", th: "วัฒนธรรมการดื่มชาและการสังสรรค์", en: "Tea Culture & Social Gatherings" }, icon: "🍵", estimated_minutes: 25, xp_reward: 200, status: "blueprint" },
    { unit_id: "tier2_u12", unit_number: 12, title: { zh: "应急处理与投诉求助", th: "แก้ไขปัญหาเฉพาะหน้าและแจ้งเรื่องร้องเรียน", en: "Handling Emergencies & Complaints" }, icon: "⚠️", estimated_minutes: 25, xp_reward: 200, status: "blueprint" },
    { unit_id: "tier2_u13", unit_number: 13, title: { zh: "运动健身与生活方式", th: "กีฬา สุขภาพและการออกกำลังกาย", en: "Sports & Healthy Lifestyle" }, icon: "⚽", estimated_minutes: 25, xp_reward: 200, status: "blueprint" },
    { unit_id: "tier2_u14", unit_number: 14, title: { zh: "中国传统节日与习俗", th: "เทศกาลจีนสำคัญ (ตรุษจีน ไหว้พระจันทร์)", en: "Traditional Chinese Festivals" }, icon: "🏮", estimated_minutes: 25, xp_reward: 200, status: "blueprint" },
    { unit_id: "tier2_u15", unit_number: 15, title: { zh: "背包独行四城试炼", th: "Tier 2 Boss Quest: ตะลุยเดี่ยวแบกเป้ 4 เมืองจีน", en: "Tier 2 Boss Quest: Solo Backpacking Across 4 Cities" }, icon: "🏔️", estimated_minutes: 30, xp_reward: 400, status: "blueprint" }
  ]
};

// ==========================================
// TIER 3: MASTER (20 Units Blueprint)
// ==========================================
const tier3Data = {
  tier_id: "tier3",
  tier_number: 3,
  name: {
    zh: "大师级：职场商务与文化深度 (HSK 5-6)",
    th: "Tier 3: Master (ผู้เชี่ยวชาญการทำงาน & วัฒนธรรม)",
    en: "Tier 3: Master (Professional & Cultural Fluency)"
  },
  description: "ทำงานร่วมกับคนจีน เจรจาธุรกิจ เข้าใจกระแสสังคมอย่างลึกซึ้ง และดูซีรีส์จีนได้โดยไม่ต้องพึ่งพาซับไตเติล",
  total_units: 20,
  units: [
    {
      unit_id: "tier3_u01",
      unit_number: 1,
      title: { zh: "职场邮件与正式沟通", th: "การเขียนอีเมลและการสื่อสารทางการในองค์กร", en: "Business Email & Formal Communication" },
      icon: "✉️",
      estimated_minutes: 30,
      xp_reward: 250,
      status: "ready",
      key_vocabulary: [
        { hanzi: "尊敬的", pinyin: "zūnjìng de", meaning_th: "กราบเรียน / เรียนท่าน...ที่เคารพ" },
        { hanzi: "汇报", pinyin: "huìbào", meaning_th: "รายงานผลการปฏิบัติงาน" },
        { hanzi: "附件", pinyin: "fùjiàn", meaning_th: "ไฟล์แนบเอกสาร" },
        { hanzi: "查收", pinyin: "cháshōu", meaning_th: "โปรดตรวจสอบและรับเอกสาร" },
        { hanzi: "顺祝商祺", pinyin: "shùnzhù shāngqí", meaning_th: "ขออวยพรให้กิจการเจริญรุ่งเรือง (คำลงท้ายจดหมายธุรกิจ)" }
      ],
      grammar_point: "โครงสร้างจดหมายทางการจีน: คำขึ้นต้นเกียรติยศ + เนื้อหาความคืบหน้า + ขอคำชี้แนะ + คำอวยพรมงคลสี่พยางค์",
      sample_dialogue: {
        speaker_a: "พนักงาน 🧑‍💼: 尊敬的张总，本周的项目进展报告已作为附件发送，请查收。",
        speaker_b: "ผู้จัดการ 👨‍💼: 收到，辛苦了，明天上午十点开会讨论。"
      }
    },
    {
      unit_id: "tier3_u02",
      unit_number: 2,
      title: { zh: "商业会议与项目展示", th: "การประชุมธุรกิจและการนำเสนองาน (Pitching)", en: "Business Meetings & Pitching" },
      icon: "📊",
      estimated_minutes: 30,
      xp_reward: 250,
      status: "ready",
      key_vocabulary: [
        { hanzi: "市场份额", pinyin: "shìchǎng fèn'é", meaning_th: "ส่วนแบ่งการตลาด" },
        { hanzi: "核心优势", pinyin: "héxīn yōushì", meaning_th: "จุดเด่นและข้อได้เปรียบหลัก" },
        { hanzi: "投资回报率", pinyin: "tóuzī huíbàolǜ", meaning_th: "ผลตอบแทนจากการลงทุน (ROI)" }
      ],
      grammar_point: "การใช้สำนวนเชื่อมโยงตรรกะ '基于上述分析，我们建议...' (จากบทวิเคราะห์ข้างต้น ทางเราขอเสนอแนะว่า...)",
      sample_dialogue: {
        speaker_a: "ผู้บรรยาย 🧑‍💼: 如图所示，该产品在东南亚市场的增长潜力巨大。",
        speaker_b: "นักลงทุน 👩‍💼: 这个方案很有前瞻性，我们非常感兴趣。"
      }
    },
    { unit_id: "tier3_u03", unit_number: 3, title: { zh: "商务谈判与价格磋商", th: "การเจรจาต่อรองราคาและเงื่อนไขการค้า", en: "Commercial Negotiations" }, icon: "🤝", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u04", unit_number: 4, title: { zh: "商业合同与条款解读", th: "สัญญาและข้อตกลงทางการค้า", en: "Contracts & Agreements" }, icon: "📜", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u05", unit_number: 5, title: { zh: "电商营销与直播带货", th: "การตลาดอีคอมเมิร์ซและการไลฟ์ขายของ", en: "E-Commerce & Live Streaming" }, icon: "📈", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u06", unit_number: 6, title: { zh: "常用成语与文化典故", th: "สำนวนจีนคลาสสิกที่ใช้ในชีวิตประจำวัน (成语)", en: "Essential Idioms & Cultural Stories" }, icon: "📖", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u07", unit_number: 7, title: { zh: "互联网流行语与社会风潮", th: "คำสแลงอินเทอร์เน็ตและกระแสสังคมร่วมสมัย", en: "Internet Slang & Social Trends" }, icon: "🔥", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u08", unit_number: 8, title: { zh: "科技创新与经济新闻", th: "ข่าวเศรษฐกิจและเทคโนโลยีจีน", en: "Tech Innovation & Financial News" }, icon: "🤖", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u09", unit_number: 9, title: { zh: "影视文艺与深度评论", th: "การวิพากษ์ภาพยนตร์และวรรณกรรมร่วมสมัย", en: "Cinema & Cultural Criticism" }, icon: "🎬", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u10", unit_number: 10, title: { zh: "八大菜系与饮食哲学", th: "อาหารและปรัชญา 8 สำรับใหญ่ของจีน", en: "The 8 Culinary Traditions" }, icon: "🍲", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u11", unit_number: 11, title: { zh: "职场文化与社会心态", th: "วัฒนธรรมการทำงานในจีน (996, 内卷, 躺平)", en: "Workplace Dynamics (996, Involuted)" }, icon: "🏢", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u12", unit_number: 12, title: { zh: "生态文明与地理全貌", th: "ภูมิศาสตร์จีนและการอนุรักษ์สิ่งแวดล้อม", en: "Geography & Ecology" }, icon: "🗺️", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u13", unit_number: 13, title: { zh: "人际网络与关系艺术", th: "ศิลปะการสร้างเครือข่ายสัมพันธ์ (关系 - Guānxi)", en: "Networking & Guanxi Mastery" }, icon: "🌐", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u14", unit_number: 14, title: { zh: "酒桌礼仪与商务宴请", th: "มารยาทบนโต๊ะอาหารและการเลี้ยงรับรองทางธุรกิจ", en: "Banqueting & Dining Etiquette" }, icon: "🍶", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u15", unit_number: 15, title: { zh: "消费者心理与市场洞察", th: "การวิเคราะห์พฤติกรรมผู้บริโภคชาวจีน", en: "Consumer Insights" }, icon: "🛒", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u16", unit_number: 16, title: { zh: "中医养生与传统智慧", th: "การแพทย์แผนจีนและศาสตร์การดูแลสุขภาพ", en: "Traditional Chinese Medicine (TCM)" }, icon: "🌿", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u17", unit_number: 17, title: { zh: "当代音乐与流行艺术", th: "ดนตรีและศิลปะร่วมสมัยของจีน", en: "Contemporary Music & Arts" }, icon: "🎵", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u18", unit_number: 18, title: { zh: "人力资源与团队建设", th: "การบริหารจัดการทรัพยากรบุคคลในองค์กรจีน", en: "HR Management & Team Building" }, icon: "👥", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u19", unit_number: 19, title: { zh: "公众演讲与表达技巧", th: "การพูดในที่สาธารณะและการกล่าวสุนทรพจน์", en: "Public Speaking & Oratory" }, icon: "🎙️", estimated_minutes: 30, xp_reward: 250, status: "blueprint" },
    { unit_id: "tier3_u20", unit_number: 20, title: { zh: "广交会国际商务巅峰战", th: "Tier 3 Grand Quest: ปิดดีลการค้างานแคนตันแฟร์", en: "Tier 3 Grand Quest: Closing Global Deals at Canton Fair" }, icon: "👑", estimated_minutes: 35, xp_reward: 500, status: "blueprint" }
  ]
};

// ==========================================
// TIER 4: LEGEND (10 Units Blueprint)
// ==========================================
const tier4Data = {
  tier_id: "tier4",
  tier_number: 4,
  name: {
    zh: "传奇级：学术文学与外交高度 (HSK 7-9)",
    th: "Tier 4: Legend (ปราชญ์ภาษา วรรณกรรม & การทูต)",
    en: "Tier 4: Legend (Classical, Academic & Diplomatic)"
  },
  description: "คลังความรู้ขั้นสูงสุด ปรัชญาคลาสสิก วรรณกรรมจีนโบราณ สุนทรพจน์ทางการทูต และการวิเคราะห์เศรษฐศาสตร์เชิงมหภาค",
  total_units: 10,
  units: [
    {
      unit_id: "tier4_u01",
      unit_number: 1,
      title: { zh: "文言文实词与虚词精析", th: "ภาษาจีนโบราณพื้นฐานและคำเชื่อมสำคัญ (文言文)", en: "Introduction to Classical Chinese" },
      icon: "📜",
      estimated_minutes: 35,
      xp_reward: 350,
      status: "ready",
      key_vocabulary: [
        { hanzi: "之", pinyin: "zhī", meaning_th: "ของ / ไปยัง / คำสรรพนามแทนสิ่งนั้น (文言虚词)" },
        { hanzi: "乎", pinyin: "hū", meaning_th: "หรือ / หรือไม่ (เทียบเท่า 吗)" },
        { hanzi: "者", pinyin: "zhě", meaning_th: "ผู้ที่ / สิ่งที่ / คนที่" },
        { hanzi: "也", pinyin: "yě", meaning_th: "คำลงท้ายยืนยันความจริง (เทียบเท่า です/เป็นอยู่คือ)" }
      ],
      grammar_point: "โครงสร้างประโยคบอกเล่าโบราณ: '...者，...也' (ผู้ที่เป็น... คือ... นั่นเอง) เช่น '仁者，人也' (ผู้เปี่ยมเมตตา ย่อมเห็นค่าในความเป็นมนุษย์)",
      sample_dialogue: {
        speaker_a: "อาจารย์ปราชญ์ 📜: '温故而知新，可以为师矣。' 何解？",
        speaker_b: "บัณฑิต 🎓: 意思是复习旧知识从而获得新体会，便可为人师表。"
      }
    },
    { unit_id: "tier4_u02", unit_number: 2, title: { zh: "先秦哲学：儒家与道家争鸣", th: "ปรัชญาสมัยก่อนราชวงศ์ฉิน: ขงจื๊อและเล่าจื๊อ", en: "Pre-Qin Philosophy: Confucianism & Daoism" }, icon: "☯️", estimated_minutes: 35, xp_reward: 350, status: "blueprint" },
    { unit_id: "tier4_u03", unit_number: 3, title: { zh: "唐诗宋词格律与美学鉴赏", th: "สุนทรียศาสตร์บทกวีสมัยถังและซ่ง", en: "Tang Poetry & Song Lyrics Aesthetics" }, icon: "🪶", estimated_minutes: 35, xp_reward: 350, status: "blueprint" },
    { unit_id: "tier4_u04", unit_number: 4, title: { zh: "四大名著文学脉络解读", th: "สี่สุดยอดวรรณกรรมคลาสสิก (สามก๊ก, ไซอิ๋ว ฯลฯ)", en: "The Four Great Classical Novels" }, icon: "📚", estimated_minutes: 35, xp_reward: 350, status: "blueprint" },
    { unit_id: "tier4_u05", unit_number: 5, title: { zh: "国际外交辞令与联合声明", th: "ภาษาทางการทูตและแถลงการณ์ร่วมระหว่างประเทศ", en: "Diplomatic Discourse & Joint Statements" }, icon: "🏛️", estimated_minutes: 35, xp_reward: 350, status: "blueprint" },
    { unit_id: "tier4_u06", unit_number: 6, title: { zh: "国际贸易法与跨国仲裁", th: "กฎหมายการค้าระหว่างประเทศและการอนุญาโตตุลาการ", en: "International Trade Law & Arbitration" }, icon: "⚖️", estimated_minutes: 35, xp_reward: 350, status: "blueprint" },
    { unit_id: "tier4_u07", unit_number: 7, title: { zh: "宏观经济分析与金融政策", th: "การวิเคราะห์เศรษฐศาสตร์มหภาคและนโยบายการเงิน", en: "Macroeconomic Analysis & Fiscal Policy" }, icon: "💹", estimated_minutes: 35, xp_reward: 350, status: "blueprint" },
    { unit_id: "tier4_u08", unit_number: 8, title: { zh: "同声传译与高级文学翻译", th: "การล่ามคู่ขนานและการแปลวรรณกรรมขั้นสูง", en: "Simultaneous Interpretation & Literary Translation" }, icon: "🗣️", estimated_minutes: 35, xp_reward: 350, status: "blueprint" },
    { unit_id: "tier4_u09", unit_number: 9, title: { zh: "学术论文规范与批判性写作", th: "การเขียนบทความวิจัยทางวิชาการและบทความเชิงวิพากษ์", en: "Academic Publishing & Critical Writing" }, icon: "🎓", estimated_minutes: 35, xp_reward: 350, status: "blueprint" },
    { unit_id: "tier4_u10", unit_number: 10, title: { zh: "汉学至高无上帝王试炼", th: "Tier 4 Legend Quest: บททดสอบมหาบัณฑิตเกียรติยศ", en: "Tier 4 Legend Quest: The Supreme Sinology Fellowship" }, icon: "🏆", estimated_minutes: 45, xp_reward: 1000, status: "blueprint" }
  ]
};

// Write Tier 2, 3, 4 files
fs.writeFileSync(path.join(baseDir, 'tier2', 'unit_blueprints.json'), JSON.stringify(tier2Data, null, 2), 'utf8');
console.log('Created Tier 2 blueprint file.');

fs.writeFileSync(path.join(baseDir, 'tier3', 'unit_blueprints.json'), JSON.stringify(tier3Data, null, 2), 'utf8');
console.log('Created Tier 3 blueprint file.');

fs.writeFileSync(path.join(baseDir, 'tier4', 'unit_blueprints.json'), JSON.stringify(tier4Data, null, 2), 'utf8');
console.log('Created Tier 4 blueprint file.');

console.log('Advanced tiers generation finished successfully.');
