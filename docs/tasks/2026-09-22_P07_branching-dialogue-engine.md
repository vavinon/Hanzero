---
task_id: "TASK-702"
title: "Branching Dialogue & Scenario Decision Engine (branchingDialogueEngine.ts + InteractiveScenarioPlayer.tsx)"
type: "FEATURE"
phase: "P07"
created_at: "2026-09-22"
updated_at: "2026-09-22"
status: "DONE"
priority: "HIGH"
assignee: "web_dev"
reviewer: "technical_qa"
related_plan: "docs/plan/phase_07_tier2_traveler_quest.md"
---

# 📋 [TASK-702] Branching Dialogue & Scenario Decision Engine

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `technical_qa` & `red_team_adversary`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
พัฒนาเอนจินบทสนทนาแตกกิ่งและเครื่องเล่นสถานการณ์จำลอง (Scenario Decision Player):
1. **Pure TypeScript Engine (`src/engines/scenario/branchingDialogueEngine.ts`):** Zero DOM, 3-Color DFS DAG-validated branching tree, ป้องกัน Dead ends/Orphans, คำนวณแถบอารมณ์ความพึงพอใจของ NPC (Patience Bar 0–100), Tutu's Lifeline rescue mechanism
2. **Interactive UI (`src/components/scenario/InteractiveScenarioPlayer.tsx`):** กล่องคำพูด NPC, Zen Mood Gauge (Jade/Amber/Terracotta/Rose), ปุ่มเลือกคำตอบ Touch-friendly ($\ge 48$px), Dynamic Pinyin Fading 2.0 (Hold-to-Peek), Cultural Etiquette Parchment, Web Audio SFX
3. **Red Team Verification:** ตรวจจับลูปวนและรายงาน cyclePath, ตรวจจับทางตัน, ทดสอบกดสแปมรัว 50 ครั้งด้วย `isTransitioningRef` lockout, audio teardown on unmount

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [x] `[NEW]` `src/engines/scenario/branchingDialogueEngine.ts`
- [x] `[NEW]` `src/engines/scenario/branchingDialogueEngine.test.ts`
- [x] `[NEW]` `src/data/scenarios/delivery_gate_code.json`
- [x] `[NEW]` `src/data/scenarios/didi_tail_number.json`
- [x] `[NEW]` `src/components/scenario/InteractiveScenarioPlayer.tsx`
- [x] `[NEW]` `src/components/scenario/InteractiveScenarioPlayer.test.tsx`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [x] พัฒนา Type Interfaces สำหรับ ScenarioNode, DecisionBranch, ScenarioSession, CulturalEtiquetteNote
- [x] พัฒนาฟังก์ชัน validateScenarioTree ป้องกัน Dead-ends และ Cycles ด้วย 3-Color DFS
- [x] พัฒนาคอมโพเนนต์ InteractiveScenarioPlayer พร้อมแถบ Zen Mood Gauge และ Hold-to-Peek
- [x] เขียน Unit Tests ครอบคลุม 100% ด้วย Vitest (29 tests ผ่านครบ)
- [x] Red team test ตรวจสอบ Rapid Spam 50 clicks และ Audio Teardown ผ่าน 100%

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Quality Gate & DoD)
- [x] **Type Safety:** Strict typing 100%, Zero `any`, `tsc --noEmit` Exit Code 0
- [x] **Zero Dead Ends:** ต้นไม้บทสนทนาทุกกิ่งมีทางออกและผลลัพธ์ชัดเจน พร้อม Diamond graph support
- [x] **Mobile Ergonomics:** Hitbox ปุ่มเลือกคำตอบ $\ge 48$px, ลื่นไหล 60fps
- [x] **Safe Practice Zone:** ป้องกัน Foreign Language Anxiety ด้วยระบบ Tutu's Lifeline (+25 Patience)
