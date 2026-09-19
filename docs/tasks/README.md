# 📌 Hanzero Task Board & Execution Hub (`docs/tasks/`)

ยินดีต้อนรับสู่ศูนย์กลางการติดตามงานระดับปฏิบัติการ (Actionable Task Execution) ของ **Hanzero (ฮั่นซีโร่)**  
โฟลเดอร์นี้ใช้สำหรับจัดการงานย่อย (Micro-Slices) รายวัน ติดตามสถานะงาน และบันทึกประวัติการส่งมอบงานย้อนหลังตามลำดับเวลาจริง

---

## 🚨 แถบสถานะงานด่วนฉุกเฉิน (Active Hotfix / Incident)

> 🟢 **สถานะปัจจุบัน:** ไม่มีงานด่วนฉุกเฉินแทรกคิว (System Healthy)

*หมายเหตุ: หากมีงานด่วนแทรก (เช่น บั๊กเสียงฉุกเฉิน, ระบบบันทึกข้อมูลพัง) ให้เปิดไฟล์ชื่อ `YYYY-MM-DD_HOTFIX_[Slug].md` ทันที และอัปเดตแถบนี้เป็นสีส้ม/แดงเพื่อพักงานปกติไว้ชั่วคราว*

---

## 🎯 โฟกัสปัจจุบัน (Current Sprint Focus)

* **เฟสปัจจุบัน:** **Phase 3: Gamification, Progression & SRS Flashcards**
* **แผนแม่บท:** [docs/plan/phase_03_gamification_srs.md](../plan/phase_03_gamification_srs.md)
* **เป้าหมายสปรินต์:** พัฒนา SM-2 SRS Engine, `useUserState` hook (IndexedDB Sync), Quest Map, และ Review Deck

---

## 📊 ตารางสถานะงานทั้งหมด (Task Master Board)

| วันที่ | รหัส Task | ชื่องาน / ขอบเขต | เฟส | ผู้รับผิดชอบ | สถานะ | ลิงก์รายละเอียด |
| :---: | :---: | :--- | :---: | :---: | :---: | :--- |
| **2026-09-18** | `TASK-100` | Scaffolding, Core Web Audio & Resilience Engines | P01 | `web_dev` | `DONE` ✅ | [`2026-09-18_P01_...`](./2026-09-18_P01_foundation-and-engines.md) |
| **2026-09-19** | `TASK-200` | Unit 1 Complete Lesson Experience (Vertical Slice) | P02 | `web_dev` | `DONE` ✅ | [`2026-09-19_P02_...`](./2026-09-19_P02_unit1-complete-experience.md) |
| *2026-09-20* | `TASK-301` | พัฒนา SRS SM-2 Engine (Pure TypeScript) | P03 | `web_dev` | `TODO` ⏳ | *เตรียมเปิด Task* |
| *2026-09-20* | `TASK-302` | พัฒนา State Hook `useUserState` + IndexedDB Mirror | P03 | `web_dev` | `TODO` ⏳ | *เตรียมเปิด Task* |
| *2026-09-21* | `TASK-303` | หน้า Quest Map & Daily Review Deck UI | P03 | `web_dev` | `TODO` ⏳ | *เตรียมเปิด Task* |

---

## 📐 กฎและมาตรฐานการตั้งชื่อไฟล์ Task

เพื่อให้ระบบเรียงตามลำดับเวลาอัตโนมัติ และรู้ประวัติศาสตร์การทำงานชัดเจน:

1. **รูปแบบชื่องานปกติ:**  
   `YYYY-MM-DD_P[Phase]_[task-slug].md`  
   *ตัวอย่าง:* `2026-09-20_P03_srs-sm2-engine.md`

2. **รูปแบบชื่องานด่วนฉุกเฉิน (Hotfix):**  
   `YYYY-MM-DD_HOTFIX_[task-slug].md`  
   *ตัวอย่าง:* `2026-09-21_HOTFIX_safari-audio-unlock.md`

3. **การสร้าง Task ใหม่:**  
   คัดลอกแม่แบบจาก [`_template.md`](./_template.md) และกรอก Metadata Header ด้านบนเสมอ
