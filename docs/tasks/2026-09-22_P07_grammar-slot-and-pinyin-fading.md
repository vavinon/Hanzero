---
task_id: "TASK-703"
title: "Complex Grammar Sandbox & Dynamic Pinyin Fading 2.0 (GrammarSlotBuilder.tsx + Hold-to-Peek)"
type: "FEATURE"
phase: "P07"
created_at: "2026-09-22"
updated_at: "2026-09-22"
status: "TODO"
priority: "HIGH"
assignee: "web_dev"
reviewer: "pedagogical_qa"
related_plan: "docs/plan/phase_07_tier2_traveler_quest.md"
---

# 📋 [TASK-703] Complex Grammar Sandbox & Dynamic Pinyin Fading 2.0

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `web_dev` & `ux_ui_designer` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
สร้างวิดเจ็ตฝึกฝนไวยากรณ์โครงสร้างประโยคซับซ้อนและระบบซ่อนพินอินขั้นสูง:
1. **Grammar Slot Engine (`src/engines/grammar/grammarSlotEngine.ts`):** โครงสร้างประโยค 把, ประโยค 被, และ Complements (ความเป็นไปได้/ทิศทาง/ผลลัพธ์)
2. **Grammar Slot Builder UI (`src/components/grammar/GrammarSlotBuilder.tsx`):** วิดเจ็ตต่อบล็อกคำศัพท์แบบแยกสีตามประเภทคำ พร้อมคำแนะนำไวยากรณ์เข้าใจง่ายเมื่อเรียงผิด
3. **Dynamic Pinyin Fading 2.0 (Hold-to-Peek):** ซ่อนพินอินเป็นค่าเริ่มต้นใน Tier 2, แตะค้าง (Hold) เพื่อแอบดูพินอิน และบันทึก `peekCount` ส่งเข้า SRS

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `src/engines/grammar/grammarSlotEngine.ts`
- [ ] `[NEW]` `src/engines/grammar/grammarSlotEngine.test.ts`
- [ ] `[NEW]` `src/components/grammar/GrammarSlotBuilder.tsx`
- [ ] `[NEW]` `src/components/grammar/GrammarSlotBuilder.test.tsx`
- [ ] `[MODIFY]` `src/components/lesson/VocabCard.tsx`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] พัฒนา grammarSlotEngine รองรับสูตรประโยค 把 / 被 / Complements
- [ ] พัฒนา GrammarSlotBuilder พร้อมแอนิเมชัน tactile spring และเสียงอ่านเมื่อแตะ
- [ ] อัปเกรดฟังก์ชัน Hold-to-Peek ใน VocabCard รองรับ touch & mouse hold พร้อม callback `onPeek`
- [ ] เขียน Unit Tests ครอบคลุม 100%

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Quality Gate & DoD)
- [ ] **Slot Validation:** ตรวจจับตำแหน่งคำถูกต้อง 100%
- [ ] **Hold-to-Peek:** ตอบสนองลื่นไหล ไม่มีบั๊กค้าง
- [ ] **Mobile Touch:** ใช้งานสะดวกบนจอมือถือ
