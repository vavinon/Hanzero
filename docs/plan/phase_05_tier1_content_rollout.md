---
plan_type: "ROADMAP_PHASE"
phase: "05"
created_at: "2026-09-19"
updated_at: "2026-09-21"
status: "IN_PROGRESS"
priority: "HIGH"
target_scripts: ["scripts/validateCurriculum.ts"]
target_curriculum: ["src/data/lessons/tier1/"]
---

# 🌿 Phase 5: Tier 1 Content Rollout, Metrics & Production Launch

เอกสารแผนปฏิบัติการและรายการตรวจสอบอย่างละเอียดสำหรับ **Phase 5** ของการพัฒนา Hanzero: ทยอยผลิต ตรวจทาน และปล่อยเนื้อหา Tier 1 ให้ครบทั้ง 10 Units (40 บทย่อย) พร้อมระบบตรวจสอบอัตโนมัติ (Automated Schema Validator), **ระบบวัดผลผลิตภัณฑ์ (Product Success KPIs & Diagnostics)** และการส่งมอบขึ้น GitHub Pages ฟรีตลอดชีพ

---

## 🎯 เป้าหมายของ Phase 5
เติมเต็มเนื้อหา Tier 1: Explorer (HSK 1-2) ให้ครอบคลุมทุกสถานการณ์การใช้ชีวิตจริงในประเทศจีน ตรวจสอบคุณภาพเนื้อหา 100% ประเมินตัวชี้วัดความสำเร็จของผลิตภัณฑ์ (Product KPIs) และปล่อยเวอร์ชัน Production สู่ผู้ใช้งานจริงผ่าน GitHub Pages ฟรี 0 บาท

---

## 📋 แผนงานปฏิบัติการย่อย (Actionable Checklist)

### 1. ระบบตรวจสอบความถูกต้องของบทเรียนอัตโนมัติ (Curriculum Validator Script)
- [x] สร้างสคริปต์ `scripts/validateCurriculum.ts`: [DONE ✅]
  - ตรวจสอบความถูกต้องของโครงสร้าง JSON ทุกไฟล์ใน `src/data/lessons/`
  - ยืนยันว่าทุกคำศัพท์มี `hanzi`, `pinyin`, `meaning_th`, `meaning_en` ครบถ้วน
  - ตรวจสอบว่าไม่มี ID ด่านหรือคำศัพท์ซ้ำซ้อน
  - ตรวจสอบกฎการทบทวนวนซ้ำ (Interleaving Rule): ยืนยันว่าตั้งแต่ Unit 2 เป็นต้นไป มีคำศัพท์จาก Unit ก่อนหน้าแทรกเข้ามาอย่างน้อย 20%

### 2. ผลิตและตรวจสอบเนื้อหา Tier 1 ทีละ Unit (Unit 2 ถึง 10)
ผลิตเนื้อหาตามแม่แบบ [curriculum_prompt.md](../prompts/curriculum_prompt.md) โดยแบ่งการปล่อยเป็น Batch:

- [x] **Batch A: ตัวเลขและการใช้ชีวิตพื้นฐาน (Unit 2 - 4)** [DONE ✅]
  - **Unit 2 (ตัวเลข วันที่ & เวลา):** นับเลข 0-10, วันในสัปดาห์, การนัดหมายเวลา *(⚡ Sandhi: กฎเสียงเดิมของ `一` yī)*
  - **Unit 3 (สั่งอาหาร & เครื่องดื่ม):** สั่งบะหมี่ ข้าว ชานม เผ็ด/ไม่เผ็ด *(⚡ Sandhi: กฎ `不吃` bù chī)*
  - **Unit 4 (ช็อปปิ้ง & ถามราคา):** ถามราคา ต่อรอง ซื้อของฝาก *(⚡ Sandhi: กฎ `一块` yí kuài)*
- [x] **Batch B: เดินทางและสังคมรอบตัว (Unit 5 - 7)** [DONE ✅]
  - **Unit 5 (การเดินทาง & ทิศทาง):** ขึ้นแท็กซี่ รถไฟใต้ดิน เลี้ยวซ้าย/ขวา ถามทาง
  - **Unit 6 (ครอบครัว & เพื่อน):** แนะนำคนในครอบครัว จำนวนคน เพื่อนร่วมงาน
  - **Unit 7 (กิจวัตร & งานอดิเรก):** ตื่นนอน ทำงาน ดูหนัง วันหยุดสุดสัปดาห์ *(⚡ Sandhi: กฎ `一起` yì qǐ)*
- [x] **Batch C: สุขภาพและการเดินทางขั้นสูง (Unit 8 - 10)** [DONE ✅]
  - **Unit 8 (สภาพอากาศ & ฤดูกาล):** ร้อน หนาว ฝนตก หิมะตก เตรียมเสื้อผ้า
  - **Unit 9 (ร่างกาย สุขภาพ & ไม่สบาย):** ปวดหัว เป็นไข้ ซื้อยาที่ร้านขายยา ไปโรงพยาบาล
  - **Unit 10 (โรงแรม & เที่ยวบิน):** เช็กอินโรงแรม ขอรหัส Wi-Fi สนามบิน ขึ้นเครื่องบิน
  - 🏆 **Tier 1 Grand Boss Quest:** "ภารกิจเที่ยวจีน 3 วัน 2 คืนไร้อุปสรรค" (Lesson 10.4)

### 3. ระบบวัดผลผลิตภัณฑ์และข้อมูลสถิตินิรนาม (Product KPIs & Telemetry)
- [ ] ระบบเก็บข้อมูลสถิตินิรนามในตัวเครื่อง (Zero-Cost Local Diagnostics):
  - บันทึกสถิติ 3 จุดที่ผู้เรียนตอบผิดซ้ำบ่อยที่สุด (Top 3 Learning Bottlenecks) เพื่อนำไปปรับปรุงเนื้อหา
  - บันทึกอัตราการใช้งาน Silent Mode และ Slow TTS Mode
- [ ] กำหนดเกณฑ์วัดผลความสำเร็จของผลิตภัณฑ์ (Product North Star Metrics):
  - **Tier 0 Completion Rate > 60%:** ผู้เริ่มต้นที่เข้าเรียน Tier 0 จบครบทั้ง 6 Units
  - **Unit 1 Completion Rate > 50%:** สัดส่วนผู้เรียนที่จบ Unit 1 สำเร็จ
  - **Day-7 Retention > 35%:** ผู้เรียนกลับมาเปิดแอปซ้ำภายใน 7 วัน

### 4. การทดสอบกับผู้เรียนจริง (Zero-Knowledge Alpha Playtest) [DONE ✅]
*(ดำเนินการตามแผนปฏิบัติการฉบับเต็มใน [TASK-506](../tasks/2026-09-21_P05_zero-knowledge-alpha-playtest.md))*
- [x] จัดรอบ Internal Alpha Playtest ร่วมกับกลุ่มผู้เรียนชาวไทยที่ไม่มีพื้นฐานภาษาจีน (Zero-Knowledge) 5–8 คน (iOS 2-3, Android 2-3, Desktop 1-2): [DONE ✅]
  - สังเกตพฤติกรรมผ่าน Unassisted Think-Aloud Session ครอบคลุม Scenario A (Onboarding & Safe Zone), Scenario B (Tone Coaster & Diacritics), และ Scenario C (Unit 1 Survival & Quiz)
  - ประเมินคะแนน System Usability Scale (SUS) กำหนดเกณฑ์ผ่าน $\ge 80 / 100$ (จริง: **86.25 / 100**)
  - จัดหมวดหมู่ปัญหาและแก้บั๊กตาม Feedback Triage Matrix (P0 Blocker: 24 ชม., P1 Friction: 48 ชม.) ก่อนเปิดตัวสาธารณะ (แก้ไขเสร็จสิ้น 100%)


### 5. ระบบทดสอบอัตโนมัติครบวงจร (Automated E2E Testing & Test Pyramid)
- [x] ติดตั้งและตั้งค่า **Playwright E2E Suite** (`playwright.config.ts`) สำหรับรัน Headless Browser Tests
- [x] พัฒนา E2E User Journey Scenarios ครอบคลุมเส้นทางสำคัญ (6 Journeys x 3 Browsers/Viewports: Desktop Chrome, Android 360x640, iPhone SE 320x568):
  - **Journey 1 (First-Run Onboarding & Safe Zone):** ผู้ใช้ใหม่เข้ามา เลือกลู่ทาง "เริ่มจาก 0" $\rightarrow$ เริ่มบทเรียนพินอิน $\rightarrow$ ลองตอบผิด ยืนยันหัวใจไม่ลดแม้แต่ดวงเดียว (Safe Practice Zone)
  - **Journey 2 (Fast-track to Tier 1 & Heart Penalty):** ผู้ใช้เลือกข้ามไป Tier 1 $\rightarrow$ เล่น Unit 1.1 $\rightarrow$ เมื่อตอบผิดต้องตัดหัวใจ และแสดงหน้าต่างหมดหัวใจ/รีฟิล
  - **Journey 3 (SRS Review Loop):** เข้าสู่หน้าทบทวนคำศัพท์ $\rightarrow$ คลิกการ์ดคำ $\rightarrow$ เลือกความจำ (Again/Good/Easy) $\rightarrow$ ตรวจสอบความถูกต้องของตรรกะ SM-2 ใน Storage
  - **Journey 4 (Voice Health Alert Modal):** จำลองเบราว์เซอร์ที่ไม่มีชุดเสียงจีน (`zh-CN`) $\rightarrow$ Modal แนะนำการติดตั้งเสียงต้องปรากฏขึ้นอย่างถูกต้อง
  - **Journey 5 (Small Screen 320px Squeeze):** ทดสอบบน Viewport กว้าง 320px ยืนยันว่า Pinyin tone marks และปุ่มกดไม่ตกขอบหรือหลุดเลย์เอาต์ (Touch targets $\ge 44$px)
  - **Journey 6 (Storage Anti-Zombie Resurrection Defense):** ตรวจสอบการล้างข้อมูลพร้อม Tombstone ไม่ให้ Cold Mirror ปลุกชีพข้อมูลกลับมาหลังรีเฟรชหน้าเว็บ
- [x] สคริปต์รันเทสต์เบื้องหลัง: `npm run test:e2e` และ `npm run test:all` (รวม Unit + Curriculum + E2E)

### 6. ระบบนำขึ้น GitHub Pages, Social Metadata & CI/CD Pipeline (Deployment & Automation)
- [x] ตั้งค่า `vite.config.ts`: [DONE ✅]
  - กำหนด `base: process.env.VITE_BASE_PATH || '/Hanzero/'` เพื่อรองรับ Subpath บน GitHub Pages และ Dynamic manual chunks
- [x] ติดตั้ง OpenGraph / Twitter Card Meta Tags (`index.html`): [DONE ✅]
  - รองรับการแสดงผลรูปภาพพรีวิวบัตรเกียรติยศและน้องกระต่ายฮั่นซีโร่ เวลาผู้เรียนแชร์ลิงก์ลงโซเชียลมีเดีย
- [x] สร้าง GitHub Actions Workflow `.github/workflows/deploy.yml`: [DONE ✅]
  - ทริกเกอร์อัตโนมัติเมื่อ push หรือ merge เข้า branch `main`
  - **5-Stage Automated Quality Gate:**
    1. `TypeCheck`: `npx tsc --noEmit`
    2. `Curriculum Lint`: `npm run validate:curriculum -- --strict`
    3. `Unit & Engine Suite`: `npm test -- --run`
    4. `E2E Smoke Suite`: `npx playwright test`
    5. `Bundle Performance Audit`: `npm run audit:bundle`
  - สั่ง Deploy ไปยัง GitHub Pages **เฉพาะเมื่อทุก Stage ผ่าน 100% เท่านั้น**
- [x] ตั้งค่า Custom 404 / SPA Redirect (`public/404.html` & `index.html`): [DONE ✅]
  - รองรับการรีเฟรชหน้าเว็บในทุก URL path โดยไม่เกิดปัญหาหน้า 404 Not Found พร้อมระบบป้องกัน Open-Redirect / XSS 4 ชั้น

---

## 🔍 รายการตรวจรับงานและทดสอบคุณภาพ (Verification & Acceptance Criteria)

| จุดตรวจสอบ | วิธีการทดสอบ (How to Verify) | เกณฑ์การผ่าน (Acceptance Criteria) | สถานะ |
| :--- | :--- | :--- | :--- |
| **1. Automated Schema Pass** | รันคำสั่ง `npm run validate:curriculum` ใน Terminal | ผ่าน 100% โดยไม่มีข้อผิดพลาด (Zero Errors / Zero Missing Fields) | ✅ PASS (100%) |
| **2. Interleaving Coverage** | ตรวจสอบรายงานของ Script ใน Unit 2-10 | ทุก Unit มีคำศัพท์/โครงสร้างจาก Unit ก่อนหน้าแทรกอยู่อย่างน้อย 20% | ✅ PASS (37-48%) |
| **3. Tone Sandhi Audit** | ตรวจสอบไฟล์เสียงและตัวอักษรของคำที่มี `一`, `不` และกฎเสียง 3 ชน 3 (`3+3 ➔ 2+3`) ในทุก Unit | วรรณยุกต์พินอินตรงตามกฎผันเสียง เช่น `yí kuài`, `yì qǐ`, `bù chī`, `bú shì`, `kéyǐ`, `shóubiǎo` | ✅ PASS |
| **4. Automated E2E Pass** | รันคำสั่ง `npm run test:e2e` บน Headless Chrome/WebKit | เทสต์ User Journeys ทั้ง 6 สถานการณ์ผ่าน 100% ไร้ข้อผิดพลาด | ✅ PASS (18/18) |
| **5. Alpha Playtest Sign-off** | ทดสอบกับผู้เรียน Zero-Knowledge 5-8 คน | ผู้เรียนเข้าใจวิธีเล่น สามารถผ่าน Tier 0 ได้โดยไม่ต้องมีคนคอยสอนข้างๆ (SUS 86.25/100) | ✅ PASS (TASK-506) |
| **6. Bundle Size & Load Speed** | รัน `npm run audit:bundle` ตรวจขนาดไฟล์จริง | ขนาด CSS Gzip $\le 20\text{KB}$ (จริง: 3.16 KB) และ JS รวม $\le 300\text{KB}$ (จริง: 169.81 KB) | ✅ PASS (TASK-505) |
| **7. CI/CD Pipeline Gate** | ตรวจสอบ `.github/workflows/deploy.yml` 5-Stage Gate | Pipeline บล็อกการ Deploy เมื่อมีเทสต์ตก และปล่อย Deploy ไปยัง GitHub Pages เมื่อผ่าน 100% | ✅ PASS (TASK-505) |
| **8. Live Production SPA Route** | ติดตั้ง `public/404.html` และ Route Restoration ใน `index.html` | รีเฟรชหน้าเว็บได้ทุก Subpath และป้องกัน Open-Redirect / XSS ได้ 100% | ✅ PASS (TASK-505) |
| **9. Product Diagnostics Verification** | ทดลองตอบผิดซ้ำในด่าน และตรวจดูผลใน Local Diagnostics | ระบบบันทึกสถิติข้อผิดพลาดลงใน State ได้ถูกต้องเพื่อการวิเคราะห์ปรับปรุง | ✅ PASS (TASK-504) |

---

## 🛑 Definition of Done (DoD) สำหรับ Phase 5
เมื่อบทเรียน Tier 1 ครบทั้ง 10 Units ได้รับการตรวจสอบความถูกต้องของเนื้อหา 100% สคริปต์ Validation ผ่านทุกเงื่อนไข ผ่านชุดทดสอบ Automated E2E Test และ CI/CD Pipeline ทุกชั้น ผ่านการทดสอบ Alpha Playtest กับผู้เรียนจริง ระบบวัดผล Local Diagnostics พร้อมทำงาน และระบบออนไลน์บน GitHub Pages ให้นักเรียนเข้ามาเรียนได้จริง จึงถือว่าการเปิดตัวเวอร์ชัน Production ของ Hanzero ประสบความสำเร็จสมบูรณ์!

