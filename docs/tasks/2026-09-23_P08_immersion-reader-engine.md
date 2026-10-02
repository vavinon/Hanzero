---
task_id: "TASK-802"
title: "Smart Immersion Reader Engine & Tap-to-Inspect UI (Intl.Segmenter + HSK Heatmap + SRS Bridge)"
type: "FEATURE"
phase: "P08"
created_at: "2026-09-23"
updated_at: "2026-09-23"
status: "TODO"
priority: "HIGH"
assignee: "web_dev"
reviewer: "technical_qa"
related_plan: "docs/plan/phase_08_tier3_4_advanced_immersion.md"
---

# 📋 [TASK-802] Smart Immersion Reader Engine & Tap-to-Inspect UI

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `technical_qa` & `ux_ui_designer`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
พัฒนาเครื่องมืออ่านบทความจีนพร้อมระบบตัดคำและสืบค้นคำศัพท์แบบ Zero-Dependency บนเบราว์เซอร์:
1. **Pure TypeScript Segmentation Engine (`src/engines/reader/immersionReaderEngine.ts`):**
   - ประมวลผลตัดคำภาษาจีนด้วยเบราว์เซอร์เนทีฟ `Intl.Segmenter` (`locale: 'zh-CN', granularity: 'word'`) ลื่นไหลในหน่วยมิลลิวินาที ไม่ต้องพึ่งพา Dictionary หรือโมเดลภายนอกขนาดใหญ่
   - วิเคราะห์ระดับความยากของคำศัพท์ตามเกณฑ์ HSK 1–6 และ HSK 7–9 (HSK Level Distribution)
   - สร้างข้อมูลสำหรับการสืบค้นคำศัพท์เมื่อแตะ (Tap-to-Inspect Generator)
   - ฟังก์ชันเชื่อมต่อคำศัพท์บทความเข้าสู่ระบบทบทวน SM-2 SRS (`createSRSItemFromToken`)
2. **Interactive UI (`src/components/reader/ImmersionArticleReader.tsx`):**
   - แถบปรับขนาดตัวอักษรจีนและการจัดหน้าสไตล์หนังสือวรรณกรรมจีนร่วมสมัย
   - **HSK Level Color Heatmap:** สลับโหมดไฮไลต์โค้ดสีระดับคำศัพท์ (HSK 1-2 เขียว, HSK 3-4 ฟ้า, HSK 5-6 ส้ม, HSK 7-9 ม่วง)
   - **Tap-to-Inspect Drawer/Modal:** แตะที่คำใดๆ เพื่อเปิดหน้าต่างดูคำอ่าน พินอิน คำแปลไทย/อังกฤษ ตัวอย่างประโยค และปุ่มฟังเสียง TTS
   - **ปุ่ม "+ SRS":** เพิ่มคำศัพท์เข้าคลังทบทวนส่วนบุคคลได้ทันทีใน 1 คลิก
   - **Comprehension Check:** คำถามตรวจสอบความเข้าใจ 2-3 ข้อท้ายบทความ

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `src/engines/reader/immersionReaderEngine.ts`
- [ ] `[TEST]` `src/engines/reader/immersionReaderEngine.test.ts`
- [ ] `[NEW]` `src/data/articles/sample_articles.json` (คลังบทความอ่านตัวอย่างระดับ Master)
- [ ] `[NEW]` `src/components/reader/ImmersionArticleReader.tsx`
- [ ] `[TEST]` `src/components/reader/ImmersionArticleReader.test.tsx`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] สร้าง Pure Engine `immersionReaderEngine.ts`:
  - พัฒนาฟังก์ชัน `segmentChineseText(text: string): SegmentedToken[]` ด้วย `Intl.Segmenter`
  - พัฒนาระบบแมปปิ้งคำศัพท์กับระดับ HSK (`getWordHSKLevel`)
  - พัฒนาฟังก์ชันคำนวณ HSK Distribution และ Readability Score
  - พัฒนาฟังก์ชันแปลง Token สู่ SRS Card Model
- [ ] เขียน Vitest Unit Tests สำหรับ `immersionReaderEngine.test.ts` (เครื่องหมายวรรคตอน ตัวเลข บทความยาว)
- [ ] พัฒนาคอมโพเนนต์ `ImmersionArticleReader.tsx`:
  - ตัวสลับโหมด HSK Heatmap
  - ตัวแสดงผลเนื้อหาพร้อมปุ่มแตะคำแบบ Touch-Ergonomics (Hitbox ปลอดภัย)
  - Bottom Sheet แสดงคำแปล พร้อมปุ่มกดฟังเสียง TTS
  - ปุ่ม "+ SRS" พร้อม Toast Notification
- [ ] เขียน Component Tests ใน `ImmersionArticleReader.test.tsx`
- [ ] ทดสอบความเข้ากันได้ของ `Intl.Segmenter` พร้อม Fallback แบบ Safe Tokenizer กรณีเบราว์เซอร์เก่า

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **Zero-Dependency & Fast:** ตัดคำบนเบราว์เซอร์ 100% ไม่ดึง API ภายนอก เวลาประมวลผลบทความ 500 คำ $< 10$ms
- [ ] **Type Safe 100%:** Strict TypeScript ไร้ `any` ผ่าน `tsc --noEmit`
- [ ] **SRS Integration:** คำที่กดเพิ่มด้วย "+ SRS" ปรากฏใน SRS Deck และทบทวนได้ทันที
- [ ] **Mobile Ergonomics:** การแตะคำบนจอสัมผัสขนาดเล็ก 320px ไม่เกิด Mis-tap หรือเลย์เอาต์เพี้ยน
- [ ] **Unit Tests Passed:** รันผ่าน Vitest 100% ทุกชุด

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *`Intl.Segmenter` มีรองรับใน Chrome 87+, Safari 14.1+, Firefox 125+ ต้องเตรียม Safe Regex Split Fallback สำหรับเบราว์เซอร์เก่าเป็นระบบป้องกัน*
