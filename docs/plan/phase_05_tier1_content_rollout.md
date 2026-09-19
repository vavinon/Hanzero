# 🌿 Phase 5: Tier 1 Content Rollout, Metrics & Production Launch

เอกสารแผนปฏิบัติการและรายการตรวจสอบอย่างละเอียดสำหรับ **Phase 5** ของการพัฒนา Hanzero: ทยอยผลิต ตรวจทาน และปล่อยเนื้อหา Tier 1 ให้ครบทั้ง 10 Units (40 บทย่อย) พร้อมระบบตรวจสอบอัตโนมัติ (Automated Schema Validator), **ระบบวัดผลผลิตภัณฑ์ (Product Success KPIs & Diagnostics)** และการส่งมอบขึ้น GitHub Pages ฟรีตลอดชีพ

---

## 🎯 เป้าหมายของ Phase 5
เติมเต็มเนื้อหา Tier 1: Explorer (HSK 1-2) ให้ครอบคลุมทุกสถานการณ์การใช้ชีวิตจริงในประเทศจีน ตรวจสอบคุณภาพเนื้อหา 100% ประเมินตัวชี้วัดความสำเร็จของผลิตภัณฑ์ (Product KPIs) และปล่อยเวอร์ชัน Production สู่ผู้ใช้งานจริงผ่าน GitHub Pages ฟรี 0 บาท

---

## 📋 แผนงานปฏิบัติการย่อย (Actionable Checklist)

### 1. ระบบตรวจสอบความถูกต้องของบทเรียนอัตโนมัติ (Curriculum Validator Script)
- [ ] สร้างสคริปต์ `scripts/validateCurriculum.ts`:
  - ตรวจสอบความถูกต้องของโครงสร้าง JSON ทุกไฟล์ใน `src/data/lessons/`
  - ยืนยันว่าทุกคำศัพท์มี `hanzi`, `pinyin`, `meaning_th`, `meaning_en` ครบถ้วน
  - ตรวจสอบว่าไม่มี ID ด่านหรือคำศัพท์ซ้ำซ้อน
  - ตรวจสอบกฎการทบทวนวนซ้ำ (Interleaving Rule): ยืนยันว่าตั้งแต่ Unit 2 เป็นต้นไป มีคำศัพท์จาก Unit ก่อนหน้าแทรกเข้ามาอย่างน้อย 20%

### 2. ผลิตและตรวจสอบเนื้อหา Tier 1 ทีละ Unit (Unit 2 ถึง 10)
ผลิตเนื้อหาตามแม่แบบ [curriculum_prompt.md](../prompts/curriculum_prompt.md) โดยแบ่งการปล่อยเป็น Batch:

- [ ] **Batch A: ตัวเลขและการใช้ชีวิตพื้นฐาน (Unit 2 - 4)**
  - **Unit 2 (ตัวเลข วันที่ & เวลา):** นับเลข 0-10, วันในสัปดาห์, การนัดหมายเวลา *(⚡ Sandhi: กฎเสียงเดิมของ `一` yī)*
  - **Unit 3 (สั่งอาหาร & เครื่องดื่ม):** สั่งบะหมี่ ข้าว ชานม เผ็ด/ไม่เผ็ด *(⚡ Sandhi: กฎ `不吃` bù chī)*
  - **Unit 4 (ช็อปปิ้ง & ถามราคา):** ถามราคา ต่อรอง ซื้อของฝาก *(⚡ Sandhi: กฎ `一块` yí kuài)*
- [ ] **Batch B: เดินทางและสังคมรอบตัว (Unit 5 - 7)**
  - **Unit 5 (การเดินทาง & ทิศทาง):** ขึ้นแท็กซี่ รถไฟใต้ดิน เลี้ยวซ้าย/ขวา ถามทาง
  - **Unit 6 (ครอบครัว & เพื่อน):** แนะนำคนในครอบครัว จำนวนคน เพื่อนร่วมงาน
  - **Unit 7 (กิจวัตร & งานอดิเรก):** ตื่นนอน ทำงาน ดูหนัง วันหยุดสุดสัปดาห์ *(⚡ Sandhi: กฎ `一起` yì qǐ)*
- [ ] **Batch C: สุขภาพและการเดินทางขั้นสูง (Unit 8 - 10)**
  - **Unit 8 (สภาพอากาศ & ฤดูกาล):** ร้อน หนาว ฝนตก หิมะตก เตรียมเสื้อผ้า
  - **Unit 9 (ร่างกาย สุขภาพ & ไม่สบาย):** ปวดหัว เป็นไข้ ซื้อยาที่ร้านขายยา ไปโรงพยาบาล
  - **Unit 10 (โรงแรม & เที่ยวบิน):** เช็กอินโรงแรม ขอรหัส Wi-Fi สนามบิน ขึ้นเครื่องบิน
  - 🏆 **Tier 1 Grand Boss Quest:** "ภารกิจเที่ยวจีน 3 วัน 2 คืนไร้อุปสรรค"

### 3. ระบบวัดผลผลิตภัณฑ์และข้อมูลสถิตินิรนาม (Product KPIs & Telemetry)
- [ ] ระบบเก็บข้อมูลสถิตินิรนามในตัวเครื่อง (Zero-Cost Local Diagnostics):
  - บันทึกสถิติ 3 จุดที่ผู้เรียนตอบผิดซ้ำบ่อยที่สุด (Top 3 Learning Bottlenecks) เพื่อนำไปปรับปรุงเนื้อหา
  - บันทึกอัตราการใช้งาน Silent Mode และ Slow TTS Mode
- [ ] กำหนดเกณฑ์วัดผลความสำเร็จของผลิตภัณฑ์ (Product North Star Metrics):
  - **Tier 0 Completion Rate > 60%:** ผู้เริ่มต้นที่เข้าเรียน Tier 0 จบครบทั้ง 6 Units
  - **Unit 1 Completion Rate > 50%:** สัดส่วนผู้เรียนที่จบ Unit 1 สำเร็จ
  - **Day-7 Retention > 35%:** ผู้เรียนกลับมาเปิดแอปซ้ำภายใน 7 วัน

### 4. การทดสอบกับผู้เรียนจริง (Zero-Knowledge Alpha Playtest)
- [ ] จัดรอบ Internal Alpha Playtest ร่วมกับกลุ่มผู้เรียนชาวไทยที่ไม่มีพื้นฐานภาษาจีน (Zero-Knowledge) อย่างน้อย 5 คน:
  - สังเกตพฤติกรรมตั้งแต่หน้า Onboarding ไปจนจบ Tier 0 และ Unit 1
  - ตรวจสอบจุดสะดุด (UX Friction): ปัญหาความสับสนของเสียงพินอิน, ขนาดตัวอักษร, หรือความเข้าใจในกฎผันเสียง
  - รวบรวม Feedback เพื่อ Fine-tune ควิซและบทสนทนาก่อนเปิดตัวสาธารณะ

### 5. ระบบนำขึ้น GitHub Pages, Social Metadata & CI/CD (Deployment & Automation)
- [ ] ตั้งค่า `vite.config.ts`:
  - กำหนด `base: '/hanzero/'` เพื่อรองรับ Subpath บน GitHub Pages
- [ ] ติดตั้ง OpenGraph / Twitter Card Meta Tags (`index.html`):
  - รองรับการแสดงผลรูปภาพพรีวิวบัตรเกียรติยศ (Passport Preview) เวลาผู้เรียนแชร์ลิงก์ลงโซเชียลมีเดีย
- [ ] สร้าง GitHub Actions Workflow `.github/workflows/deploy.yml`:
  - ทริกเกอร์อัตโนมัติเมื่อ push หรือ merge เข้า branch `main`
  - ตรวจสอบ Lint และทดสอบ Validation Script
  - สั่ง `npm run build` และ Deploy ไปยัง GitHub Pages
- [ ] ตั้งค่า Custom 404 / SPA Redirect:
  - รองรับการรีเฟรชหน้าเว็บในทุก URL path โดยไม่เกิดปัญหาหน้า 404 Not Found

---

## 🔍 รายการตรวจรับงานและทดสอบคุณภาพ (Verification & Acceptance Criteria)

| จุดตรวจสอบ | วิธีการทดสอบ (How to Verify) | เกณฑ์การผ่าน (Acceptance Criteria) |
| :--- | :--- | :--- |
| **1. Automated Schema Pass** | รันคำสั่ง `npm run validate:curriculum` ใน Terminal | ผ่าน 100% โดยไม่มีข้อผิดพลาด (Zero Errors / Zero Missing Fields) |
| **2. Interleaving Coverage** | ตรวจสอบรายงานของ Script ใน Unit 2-10 | ทุก Unit มีคำศัพท์/โครงสร้างจาก Unit ก่อนหน้าแทรกอยู่อย่างน้อย 20% |
| **3. Tone Sandhi Audit** | ตรวจสอบไฟล์เสียงและตัวอักษรของคำที่มี `一` และ `不` ในทุก Unit | วรรณยุกต์พินอินตรงตามกฎผันเสียง เช่น `yí kuài`, `yì qǐ`, `bù chī`, `bú shì` |
| **4. Alpha Playtest Sign-off** | ทดสอบกับผู้เรียน Zero-Knowledge 5 คน | ผู้เรียนเข้าใจวิธีเล่น สามารถผ่าน Tier 0 ได้โดยไม่ต้องมีคนคอยสอนข้างๆ |
| **5. Bundle Size & Load Speed** | รัน `npm run build` แล้วตรวจขนาดไฟล์ และทดสอบด้วย Lighthouse | ขนาด JavaScript รวม (Gzip) < 300KB และคะแนน Performance > 90 |
| **6. Live Production Test** | เข้าใช้งานผ่าน URL จริงของ GitHub Pages บนมือถือ iOS และ Android | โหลดหน้าเว็บได้สมบูรณ์ เสียงสังเคราะห์ออกครบ เล่นได้ทุก Unit โดยไม่ต้องต่อเซิร์ฟเวอร์ภายนอก |
| **7. Product Diagnostics Verification** | ทดลองตอบผิดซ้ำในด่าน และตรวจดูผลใน Local Diagnostics | ระบบบันทึกสถิติข้อผิดพลาดลงใน State ได้ถูกต้องเพื่อการวิเคราะห์ปรับปรุง |

---

## 🛑 Definition of Done (DoD) สำหรับ Phase 5
เมื่อบทเรียน Tier 1 ครบทั้ง 10 Units ได้รับการตรวจสอบความถูกต้องของเนื้อหา 100% สคริปต์ Validation ผ่านทุกเงื่อนไข ผ่านการทดสอบ Alpha Playtest กับผู้เรียนจริง ระบบวัดผล Local Diagnostics พร้อมทำงาน และระบบออนไลน์บน GitHub Pages ให้นักเรียนเข้ามาเรียนได้จริง จึงถือว่าการเปิดตัวเวอร์ชัน Production ของ Hanzero ประสบความสำเร็จสมบูรณ์!

