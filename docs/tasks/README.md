# 📌 Hanzero Task Board & Execution Hub (`docs/tasks/`)

ยินดีต้อนรับสู่ศูนย์กลางการติดตามงานระดับปฏิบัติการ (Actionable Task Execution) ของ **Hanzero (ฮั่นซีโร่)**  
โฟลเดอร์นี้ใช้สำหรับจัดการงานย่อย (Micro-Slices) รายวัน ติดตามสถานะงาน และบันทึกประวัติการส่งมอบงานย้อนหลังตามลำดับเวลาจริง

---

## 🚨 แถบสถานะงานด่วนฉุกเฉิน (Active Hotfix / Incident)

> 🟢 **สถานะปัจจุบัน:** ไม่มีงานด่วนฉุกเฉินแทรกคิว (System Healthy — All 413 Tests Passing)

*หมายเหตุ: หากมีงานด่วนแทรก (เช่น บั๊กเสียงฉุกเฉิน, ระบบบันทึกข้อมูลพัง) ให้เปิดไฟล์ชื่อ `YYYY-MM-DD_HOTFIX_[Slug].md` ทันที และอัปเดตแถบนี้เป็นสีส้ม/แดงเพื่อพักงานปกติไว้ชั่วคราว*

---

## 🎯 โฟกัสปัจจุบัน (Current Sprint Focus)

* **เฟสปัจจุบัน:** **Phase 6: Content Authoring Studio & Community Contribution**
* **แผนแม่บท:** [docs/plan/phase_06_content_authoring_studio.md](../plan/phase_06_content_authoring_studio.md)
* **เป้าหมายสปรินต์:** สร้างเครื่องมือ Authoring Studio บนเบราว์เซอร์ (Zero-Backend Web GUI) พร้อม In-Browser Pedagogical Linter, Reactive Draft Persistence, Live Mobile Device Preview, และ Zero-Token Git Hand-off สำหรับส่งออกบทเรียน

---

## 📊 ตารางสถานะงานทั้งหมด (Task Master Board)

| วันที่ | รหัส Task | ชื่องาน / ขอบเขต | เฟส | ผู้รับผิดชอบ | สถานะ | ลิงก์รายละเอียด |
| :---: | :---: | :--- | :---: | :---: | :---: | :--- |
| **2026-09-18** | `TASK-100` | Scaffolding, Core Web Audio & Resilience Engines | P01 | `web_dev` | `DONE` ✅ | [`2026-09-18_P01_...`](./2026-09-18_P01_foundation-and-engines.md) |
| **2026-09-19** | `TASK-200` | Unit 1 Complete Lesson Experience (Vertical Slice) | P02 | `web_dev` | `DONE` ✅ | [`2026-09-19_P02_...`](./2026-09-19_P02_unit1-complete-experience.md) |
| **2026-09-20** | `TASK-300` | Gamification, Safe Practice Zone & SRS Persistence | P03 | `web_dev` | `DONE` ✅ | [`2026-09-20_P03_...`](./2026-09-20_P03_gamification-and-srs.md) |
| **2026-09-21** | `TASK-501` | สคริปต์ตรวจความถูกต้องของบทเรียน (`validateCurriculum.ts`) | P05 | `web_dev` | `DONE` ✅ | [`2026-09-21_P05_...`](./2026-09-21_P05_curriculum-validator.md) |
| **2026-09-21** | `TASK-502` | ปล่อยเนื้อหา Tier 1 Batch A: Unit 2 - 4 (ตัวเลข อาหาร ช็อปปิ้ง) | P05 | `curriculum_tutor` | `DONE` ✅ | [`2026-09-21_P05_...`](./2026-09-21_P05_tier1-batch-a-content.md) |
| **2026-09-21** | `TASK-503` | ปล่อยเนื้อหา Tier 1 Batch B & C: Unit 5 - 10 + Grand Boss Quest | P05 | `curriculum_tutor` | `DONE` ✅ | [`2026-09-21_P05_...`](./2026-09-21_P05_tier1-batch-bc-content.md) |
| **2026-09-21** | `TASK-504` | Local Diagnostics & Playwright E2E Testing Suite | P05 | `technical_qa` | `DONE` ✅ | [`2026-09-21_P05_...`](./2026-09-21_P05_playwright-e2e-suite.md) |
| **2026-09-21** | `TASK-505` | GitHub Actions CI/CD Pipeline & GitHub Pages Deploy | P05 | `technical_qa` | `DONE` ✅ | [`2026-09-21_P05_...`](./2026-09-21_P05_cicd-github-pages-deploy.md) |
| **2026-09-21** | `TASK-506` | Zero-Knowledge Alpha Playtest Protocol & Feedback Triage | P05 | `ux_ui_designer` | `DONE` ✅ | [`2026-09-21_P05_...`](./2026-09-21_P05_zero-knowledge-alpha-playtest.md) |
| **2026-09-21** | `TASK-601` | In-Browser Pedagogical Linter & Pinyin Auto-Converter Engine | P06 | `web_dev` | `DONE` ✅ | [`2026-09-21_P06_...`](./2026-09-21_P06_studio-linter-engine.md) |
| **2026-09-21** | `TASK-602` | Studio Draft State Engine, Recovery & JSON Serialization | P06 | `web_dev` | `DONE` ✅ | [`2026-09-21_P06_...`](./2026-09-21_P06_studio-state-serializer.md) |
| **2026-09-21** | `TASK-603` | Studio Visual Composer UI (Vocab, Dialogue & Quiz Forms) | P06 | `web_dev` | `DONE` ✅ | [`2026-09-21_P06_...`](./2026-09-21_P06_studio-visual-composers.md) |
| **2026-09-21** | `TASK-604` | Live Interactive Mobile Device Preview & Audio Sandbox | P06 | `ux_ui_designer` | `DONE` ✅ | [`2026-09-21_P06_...`](./2026-09-21_P06_studio-live-mobile-preview.md) |
| **2026-09-21** | `TASK-605` | Zero-Token Git Hand-off, PR Template & Playwright E2E Suite | P06 | `technical_qa` | `TODO` ⏳ | [`2026-09-21_P06_...`](./2026-09-21_P06_studio-git-handoff-e2e.md) |

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
