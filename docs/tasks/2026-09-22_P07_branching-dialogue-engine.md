---
task_id: "TASK-702"
title: "Branching Dialogue & Scenario Decision Engine (branchingDialogueEngine.ts + InteractiveScenarioPlayer.tsx)"
type: "FEATURE"
phase: "P07"
created_at: "2026-09-22"
updated_at: "2026-09-22"
status: "TODO"
priority: "HIGH"
assignee: "web_dev"
reviewer: "technical_qa"
related_plan: "docs/plan/phase_07_tier2_traveler_quest.md"
---

# 📋 [TASK-702] Branching Dialogue & Scenario Decision Engine

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `technical_qa` & `red_team_adversary`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
พัฒนาเอนจินบทสนทนาแตกกิ่งและเครื่องเล่นสถานการณ์จำลอง (Scenario Decision Player):
1. **Pure TypeScript Engine (`src/engines/scenario/branchingDialogueEngine.ts`):** Zero DOM, DAG-validated branching tree, ป้องกัน Dead ends, คำนวณแถบอารมณ์ความพึงพอใจของ NPC (Patience Bar 0–100)
2. **Interactive UI (`src/components/scenario/InteractiveScenarioPlayer.tsx`):** กล่องคำพูด NPC, แถบ Patience Bar (เขียว/เหลือง/แดง), ปุ่มเลือกคำตอบ Touch-friendly ($\ge 44$px), Cultural Etiquette Toast, Web Audio SFX
3. **Red Team Verification:** ทลายระบบตรวจหาลูปวน, ตรวจจับทางตัน, ทดสอบกดสแปมรัว 50 ครั้ง

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `src/engines/scenario/branchingDialogueEngine.ts`
- [ ] `[NEW]` `src/engines/scenario/branchingDialogueEngine.test.ts`
- [ ] `[NEW]` `src/components/scenario/InteractiveScenarioPlayer.tsx`
- [ ] `[NEW]` `src/components/scenario/InteractiveScenarioPlayer.test.tsx`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] พัฒนา Type Interfaces สำหรับ ScenarioNode, DecisionBranch, ScenarioSession
- [ ] พัฒนาฟังก์ชัน validateScenarioTree ป้องกัน Dead-ends และ Cycles
- [ ] พัฒนาคอมโพเนนต์ InteractiveScenarioPlayer พร้อมแถบ Patience Bar
- [ ] เขียน Unit Tests ครอบคลุม 100% ด้วย Vitest
- [ ] Red team test ตรวจหา memory leak และ unhandled errors

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Quality Gate & DoD)
- [ ] **Type Safety:** Strict typing 100%, Zero `any`
- [ ] **Zero Dead Ends:** ต้นไม้บทสนทนาทุกกิ่งมีทางออกและผลลัพธ์ชัดเจน
- [ ] **Mobile Ergonomics:** Hitbox ปุ่มเลือกคำตอบ $\ge 44$px, ลื่นไหล 60fps
