# 📌 Hanzero Task Board & Execution Hub (`docs/tasks/`)

ยินดีต้อนรับสู่ศูนย์กลางการติดตามงานระดับปฏิบัติการ (Actionable Task Execution) ของ **Hanzero (ฮั่นซีโร่)**  
โฟลเดอร์นี้ใช้สำหรับจัดการงานย่อย (Micro-Slices) รายวัน ติดตามสถานะงาน และบันทึกประวัติการส่งมอบงานย้อนหลังตามลำดับเวลาจริง

---

## 🚨 แถบสถานะงานด่วนฉุกเฉิน (Active Hotfix / Incident)

> 🟢 **สถานะปัจจุบัน:** ไม่มีงานด่วนฉุกเฉินแทรกคิว (System Healthy — All 277 Tests Passing)

*หมายเหตุ: หากมีงานด่วนแทรก (เช่น บั๊กเสียงฉุกเฉิน, ระบบบันทึกข้อมูลพัง) ให้เปิดไฟล์ชื่อ `YYYY-MM-DD_HOTFIX_[Slug].md` ทันที และอัปเดตแถบนี้เป็นสีส้ม/แดงเพื่อพักงานปกติไว้ชั่วคราว*

---

## 🎯 โฟกัสปัจจุบัน (Current Sprint Focus)

* **เฟสปัจจุบัน:** **Phase 5: Tier 1 Content Rollout, Metrics & Production Launch**
* **แผนแม่บท:** [docs/plan/phase_05_tier1_content_rollout.md](../plan/phase_05_tier1_content_rollout.md)
* **เป้าหมายสปรินต์:** ขยายเนื้อหาบทเรียน Tier 1 ครบ 10 Units (40 บทย่อย), พัฒนาระบบตรวจสอบเนื้อหาอัตโนมัติ (`validateCurriculum.ts`), ติดตั้ง Playwright E2E Testing Suite, และสร้าง GitHub Actions CI/CD Pipeline สำหรับ Deploy ขึ้น GitHub Pages

---

## 📊 ตารางสถานะงานทั้งหมด (Task Master Board)

| วันที่ | รหัส Task | ชื่องาน / ขอบเขต | เฟส | ผู้รับผิดชอบ | สถานะ | ลิงก์รายละเอียด |
| :---: | :---: | :--- | :---: | :---: | :---: | :--- |
| **2026-09-18** | `TASK-100` | Scaffolding, Core Web Audio & Resilience Engines | P01 | `web_dev` | `DONE` ✅ | [`2026-09-18_P01_...`](./2026-09-18_P01_foundation-and-engines.md) |
| **2026-09-19** | `TASK-200` | Unit 1 Complete Lesson Experience (Vertical Slice) | P02 | `web_dev` | `DONE` ✅ | [`2026-09-19_P02_...`](./2026-09-19_P02_unit1-complete-experience.md) |
| **2026-09-20** | `TASK-300` | Gamification, Safe Practice Zone & SRS Persistence | P03 | `web_dev` | `DONE` ✅ | [`2026-09-20_P03_...`](./2026-09-20_P03_gamification-and-srs.md) |
| **2026-09-21** | `TASK-400` | Tier 0 Pinyin Mastery, Phonics Games & Onboarding | P04 | `web_dev` | `DONE` ✅ | [`2026-09-21_P04_...`](./2026-09-21_P04_tier0-pinyin-mastery.md) |
| *2026-09-21* | `TASK-501` | สคริปต์ตรวจความถูกต้องของบทเรียน (`validateCurriculum.ts`) | P05 | `web_dev` | `TODO` ⏳ | *เตรียมเปิด Task* |
| *2026-09-21* | `TASK-502` | ปล่อยเนื้อหา Tier 1 Batch A: Unit 2 - 4 (ตัวเลข อาหาร ช็อปปิ้ง) | P05 | `curriculum_tutor` | `TODO` ⏳ | *เตรียมเปิด Task* |
| *2026-09-22* | `TASK-503` | ปล่อยเนื้อหา Tier 1 Batch B & C: Unit 5 - 10 + Grand Boss Quest | P05 | `curriculum_tutor` | `TODO` ⏳ | *เตรียมเปิด Task* |
| *2026-09-22* | `TASK-504` | ติดตั้ง Playwright E2E Suite & GitHub Actions CI/CD Deploy | P05 | `technical_qa` | `TODO` ⏳ | *เตรียมเปิด Task* |

---

## 📐 กฎและมาตรฐานการตั้งชื่อไฟล์ Task

เพื่อให้ระบบเรียงตามลำดับเวลาอัตโนมัติ และรู้ประวัติศาสตร์การทำงานชัดเจน:

1. **รูปแบบชื่องานปกติ:**  
   `YYYY-MM-DD_P[Phase]_[task-slug].md`  
   *ตัวอย่าง:* `2026-09-21_P05_curriculum-validator.md`

2. **รูปแบบชื่องานด่วนฉุกเฉิน (Hotfix):**  
   `YYYY-MM-DD_HOTFIX_[task-slug].md`  
   *ตัวอย่าง:* `2026-09-21_HOTFIX_safari-audio-unlock.md`

3. **การสร้าง Task ใหม่:**  
   คัดลอกแม่แบบจาก [`_template.md`](./_template.md) และกรอก Metadata Header ด้านบนเสมอ
