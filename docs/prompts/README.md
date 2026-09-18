# 📜 Hanzero Prompt Blueprints & Agent Instructions (`docs/prompts/`)

โฟลเดอร์นี้เป็นศูนย์รวม **Prompt แม่แบบมาตรฐาน (Prompt Blueprints)** ของโปรเจกต์ Hanzero สำหรับใช้ในการสั่งงาน AI Agent, Subagents, และเป็นแนวทางในการพัฒนาหลักสูตร ระบบเกม และฟีเจอร์ต่างๆ ให้เป็นไปตามมาตรฐานเดียวกัน

---

## 📂 รายการเอกสารแม่แบบ Prompt ในโฟลเดอร์นี้:

| ชื่อไฟล์ | บทบาทหน้าที่ | รายละเอียด |
| :--- | :--- | :--- |
| **[`phase_03_subagents_prompts.md`](./phase_03_subagents_prompts.md)** | **Phase 3 Multi-Agent Team** | แม่แบบ Prompt สำหรับส่งมอบงานให้ทีม Subagent ทั้ง 4 บทบาท (SRS Engine, State Hook, UI Components, QA Adversary) สำหรับพัฒนา Phase 3 |
| **[`curriculum_prompt.md`](./curriculum_prompt.md)** | **Curriculum & Lesson Authoring** | แม่แบบ Prompt สำหรับอาจารย์สอนภาษาจีน สร้างบทเรียน 3 ภาษา (จีน-ไทย-อังกฤษ) แบบ Bite-sized |
| **[`game_design_prompt.md`](./game_design_prompt.md)** | **Gamification & Interactive Mechanics** | แม่แบบ Prompt สำหรับนักออกแบบเกม ออกแบบกลไก Tone Coaster, เลโก้เรียงประโยค, และระบบสะสมดาว |
| **[`phase_01_scaffolding_prompt.md`](./phase_01_scaffolding_prompt.md)** | **Phase 1 Scaffolding** | แม่แบบคำสั่ง Phase 1.1 Scaffolding & Code Quality Tooling |
| **[`qa_and_red_team_prompts.md`](./qa_and_red_team_prompts.md)** | **Pedagogical QA & Red Team** | แม่แบบตรวจภาษาจีนและจู่โจมความปลอดภัยระบบ |
| **[`web_dev_prompt.md`](./web_dev_prompt.md)** | **Web Architect & Developer** | แม่แบบสถาปนิกและนักพัฒนา Web App สายฟรี 100% |

---

## 🚀 วิธีการใช้งานในเซสชันใหม่:

1. เปิดอ่านไฟล์ Prompt ที่เกี่ยวข้องกับงานที่ต้องการทำ
2. คัดลอก Prompt แม่แบบในส่วนที่ต้องการ นำไปส่งต่อให้ AI Subagent หรือสั่งการในแชตได้ทันที
3. เมื่อมี Phase หรือฟีเจอร์ใหม่ ให้สร้างไฟล์ Prompt Blueprint สรุปไว้ในโฟลเดอร์นี้ควบคู่กันเสมอ
