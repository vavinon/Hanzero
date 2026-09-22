# 📜 Hanzero Prompt Blueprints & Agent Instructions (`docs/prompts/`)

โฟลเดอร์นี้เป็นศูนย์รวม **Prompt แม่แบบมาตรฐาน (Prompt Blueprints)** ของโปรเจกต์ Hanzero สำหรับใช้ในการสั่งงาน AI Agent, Subagents, และเป็นแนวทางในการพัฒนาหลักสูตร ระบบเกม และฟีเจอร์ต่างๆ ให้เป็นไปตามมาตรฐานเดียวกัน

---

## 📂 รายการเอกสารแม่แบบ Prompt ในโฟลเดอร์นี้:

| ชื่อไฟล์ | บทบาทหน้าที่ | รายละเอียด |
| :--- | :--- | :--- |
| **[`phase_07_subagents_kickoff_prompt.md`](./phase_07_subagents_kickoff_prompt.md)** | **Phase 7 Traveler Multi-Agent** | แม่แบบ Prompt ฉบับสมบูรณ์สำหรับ New Chat สั่งการทีม Subagents แบ่งกลุ่มพัฒนา Phase 7 (Tier 2: Units 11–25, Branching Dialogue, Grammar Slot, HSR Map) |
| **[`phase_03_subagents_prompts.md`](./phase_03_subagents_prompts.md)** | **Phase 3 Multi-Agent Team** | แม่แบบ Prompt สำหรับส่งมอบงานให้ทีม Subagent ทั้ง 4 บทบาท (SRS Engine, State Hook, UI Components, QA Adversary) สำหรับพัฒนา Phase 3 |
| **[`curriculum_prompt.md`](./curriculum_prompt.md)** | **Curriculum Authoring Prompt** | แม่แบบสั่งการ AI สร้างบทเรียน 3 ภาษา (จีน-ไทย-อังกฤษ) อ้างอิงสเปกจาก [`docs/curriculum/00_lesson_framework.md`](../curriculum/00_lesson_framework.md) |

> [!NOTE]
> - **Agent Blueprints:** พิมพ์เขียวและ System Prompts ของทีม Agent ทั้งหมดประจำการอยู่ที่ **[`agents/`](../../agents/)** เป็น Single Source of Truth
> - **Game Design Guidelines:** หลักจิตวิทยาเกมมิฟิเคชันและคลังมินิเกม ถูกจัดเก็บอย่างเป็นทางการอยู่ที่ **[`agents/gamification_designer.md`](../../agents/gamification_designer.md)** และ **[`docs/curriculum/04_mini_games.md`](../curriculum/04_mini_games.md)**

---

## 🚀 วิธีการใช้งานในเซสชันใหม่:

1. เปิดอ่านไฟล์ Prompt ที่เกี่ยวข้องกับงานที่ต้องการทำ
2. คัดลอก Prompt แม่แบบในส่วนที่ต้องการ นำไปส่งต่อให้ AI Subagent หรือสั่งการในแชตได้ทันที
3. เมื่อมี Phase หรือฟีเจอร์ใหม่ ให้สร้างไฟล์ Prompt Blueprint สรุปไว้ในโฟลเดอร์นี้ควบคู่กันเสมอ
