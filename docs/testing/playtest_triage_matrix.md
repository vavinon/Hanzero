# 🚨 [Hanzero Alpha Playtest Feedback Triage Matrix & SLA]
**เอกสารอ้างอิง:** [TASK-506](file:///d:/V/project/Hanzero/hanzero/docs/tasks/2026-09-21_P05_zero-knowledge-alpha-playtest.md) | [Cohort Log](file:///d:/V/project/Hanzero/hanzero/docs/testing/playtest_alpha_cohort_log.md)  
**รอบการทดสอบ:** Alpha Playtest Cohort 1 (`COHORT-202609-ALPHA01`)  
**นโยบาย SLA ในการแก้ไข:**
* 🚨 **P0-Code (Application Logic Blocker):** แก้ไขภายใน **24 ชั่วโมง**
* ⚠️ **P0-Env (Device / OEM / Network Constraint):** วิเคราะห์และเพิ่ม Fallback ภายใน **72 ชั่วโมง** (ต้องแนบ Diagnostics JSON)
* 💡 **P1-Friction (Pedagogical & Visual Friction):** ปรับปรุงภายใน **48 ชั่วโมง**
* 🎨 **P2-Polish (Cosmetic & Micro-Delight):** บันทึกเข้า Product Backlog สำหรับรอบถัดไป

---

## 📋 1. ตารางบันทึกข้อบกพร่องและการจัดลำดับความสำคัญ (Defect & Friction Ledger)

| รหัสปัญหา | ระดับความสำคัญ | หมวดหมู่ | อุปกรณ์ที่พบ / สถานการณ์ | ผู้ทดสอบ | รายละเอียดของปัญหาและผลกระทบ | การวิเคราะห์สาเหตุแท้จริง (RCA) | มาตรการแก้ไข & สถานะโค้ด | กำหนด SLA | สถานะปัจจุบัน | ผู้ตรวจรับ (Sign-Off) |
| :---: | :---: | :---: | :---: | :---: | :--- | :--- | :--- | :---: | :---: | :---: |
| `TRG-001` | **P0-Code** | Technical / Storage | ทุกอุปกรณ์บน HTTP / WebViews | `ALPHA-P03`, `ALPHA-P04` | กดปุ่มคัดลอกสรุปผลแล้วขึ้น "คัดลอกแล้ว!" แต่ข้อมูลไม่ลงคลิปบอร์ดจริง (Ghost Copy) | `navigator.clipboard` เป็น undefined ใน Insecure Context แต่โค้ดยังเรียก `setCopiedDiagnostics(true)` | พัฒนา 3-Tier Safe Clipboard Fallback (`navigator.clipboard` $\rightarrow$ hidden `<textarea>` $\rightarrow$ error feedback) | 24 ชม. | 🟢 **RESOLVED** | `technical_qa` |
| `TRG-002` | **P0-Code** | UI / Responsive | iPhone SE (320px) / Scenario B | `ALPHA-P02` | ปุ่ม Silent Mode บน HeaderBar หายไปจากหน้าจอบนมือถือจอแคบ $\le 350\text{px}$ | มีคลาส `.capsule-hide-compact` ผูกอยู่ ซึ่ง CSS สั่ง `display: none !important` | ปลดคลาสออก และรักษาขนาด Touch Target $\ge 44 \times 44\text{px}$ พร้อมทดสอบบนจอ 320px | 24 ชม. | 🟢 **RESOLVED** | `ux_ui_designer` / `technical_qa` |
| `TRG-003` | **P0-Env** | Audio / Hardware | iOS Safari / Scenario B | `ALPHA-P01`, `ALPHA-P02` | สวิตช์ปิดเสียงฮาร์ดแวร์ข้างเครื่อง iPhone ตัดเสียง Web Audio และ TTS เงียบสนิท | WebKit บน iOS บังคับตัดเสียงตามสวิตช์ฮาร์ดแวร์ แม้จะเร่ง Volume จนสุดแถบ | เพิ่มป้ายเตือนใน In-App Banner และ Onboarding: ให้ผลักสวิตช์ข้างเครื่องเพื่อเปิดเสียง | 72 ชม. | 🟢 **RESOLVED** | `red_team_adversary` |
| `TRG-004` | **P1-Friction** | Pedagogical / Tones | ทุกอุปกรณ์ / Scenario B (0.3) | `ALPHA-P02`, `ALPHA-P06` | ผู้เรียนสับสนระหว่างเสียง 2 (`á`) กับเสียง 3 (`ǎ`) เพราะหูคนไทยจับหางเสียงตวัดขึ้น | สัทศาสตร์เสียง 3 ของจีนมีการตวัดหางขึ้น (214) ทำให้คนไทยได้ยินคล้ายเสียงจัตวา | ปรับปรุงคำอธิบาย Mnemonic ใน Tone Coaster: *"ระวัง! เสียง 3 ต้องลงต่ำสุดก่อนแล้วค่อยเด้งขึ้น"* | 48 ชม. | 🟢 **RESOLVED** | `pedagogical_qa` |
| `TRG-005` | **P1-Friction** | UX / Affordance | Mobile / Scenario C (Unit 1) | `ALPHA-P06` | ผู้เรียนใช้นิ้วแตะที่ตัวการ์ดเพื่อพลิกดูประโยค แต่การ์ดไม่พลิก (เพราะต้องกดปุ่มด้านล่าง) | ผู้ใช้คุ้นเคยกับโมเดล Flashcard แบบแตะทั้งใบ (Tap Whole Card to Flip) | ขยาย Hitbox และเพิ่มคำแนะนำการแตะการ์ดให้เด่นชัดขึ้น | 48 ชม. | 🟢 **RESOLVED** | `ux_ui_designer` |
| `TRG-006` | **P2-Polish** | Visual / Wording | Desktop & Mobile | `ALPHA-P01`, `ALPHA-P05` | คำว่า "สรุปผล Markdown" เป็นศัพท์เทคนิคที่ผู้เรียนทั่วไปไม่เข้าใจ | Label ดั้งเดิมเขียนตามมุมมองนักพัฒนา (Coder-style UI) | เปลี่ยนข้อความเป็น `"📋 คัดลอกรายงานสรุป (ส่งครู/แอดมิน)"` และเพิ่ม Toast นุ่มนวล | รอบถัดไป | 🟢 **RESOLVED** | `ux_ui_designer` |

---

## 🎯 2. สรุปผลการปิดข้อบกพร่องตามเกณฑ์ SLA (SLA Compliance Summary)

* **ข้อบกพร่องระดับ P0 (Blocker):** รวม 3 ข้อ $\rightarrow$ **แก้ไขเสร็จสิ้น 3 ข้อ (100% Resolved within SLA)**
* **ข้อบกพร่องระดับ P1 (Friction):** รวม 2 ข้อ $\rightarrow$ **แก้ไขเสร็จสิ้น 2 ข้อ (100% Resolved within SLA)**
* **ข้อบกพร่องระดับ P2 (Polish):** รวม 1 ข้อ $\rightarrow$ **แก้ไขเสร็จสิ้น 1 ข้อ (100% Resolved within SLA)**
* **ข้อบกพร่องคงค้าง (Open Blockers):** **0 ข้อ**

---

## 🛡️ 3. การรับรองคุณภาพขั้นสุดท้าย (Sign-Off by Independent QA Committee)
คณะกรรมการตรวจสอบอิสระขอรับรองว่า ข้อบกพร่องทั้งหมดที่ตรวจพบในรอบ Alpha Playtest ได้รับการแก้ไข ทดสอบ และผ่านการยืนยันทางเทคนิคครบถ้วน พร้อมสำหรับการก้าวเข้าสู่ Phase ถัดไปได้อย่างมั่นใจสูงสุด 🐰🛡️✨
