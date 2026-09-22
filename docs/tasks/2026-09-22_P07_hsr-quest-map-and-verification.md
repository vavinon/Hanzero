---
task_id: "TASK-706"
title: "HSR Metro Quest Map, Stamped Tickets & 4-Tier Verification Suite"
type: "FEATURE"
phase: "P07"
created_at: "2026-09-22"
updated_at: "2026-09-22"
status: "TODO"
priority: "HIGH"
assignee: "ux_ui_designer"
reviewer: "technical_qa"
related_plan: "docs/plan/phase_07_tier2_traveler_quest.md"
---

# 📋 [TASK-706] HSR Metro Quest Map, Stamped Tickets & 4-Tier Verification Suite

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `ux_ui_designer` & `test_automation_engineer` | **ผู้ตรวจรับ:** `technical_qa` & `pedagogical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
1. **HSR Metro Quest Map (`src/components/layout/HsrQuestMap.tsx`):**
   - แผนที่เส้นทางรถไฟความเร็วสูง 4 มหานคร (ปักกิ่ง ➔ ซีอาน ➔ เฉิงตู ➔ เซี่ยงไฮ้) 15 สถานี
   - ตั๋วรถไฟความเร็วสูงประทับตราดิจิทัล (Stamped HSR Ticket Modal)
   - ผสานเข้ากับ `QuestMap.tsx` ผ่านแท็บ **"🎋 Tier 2: นักเดินทาง"**
2. **Playwright E2E Test Suite (`e2e/tier2_traveler_quest.spec.ts`):**
   - ทดสอบ Journey การเดินทางของผู้เรียนตั้งแต่เข้าสู่ Tier 2 จนถึงเรียนจบและรับตั๋วประทับตรา
3. **4-Tier QA & Final Sign-off:**
   - Vitest Unit Tests 100%
   - `npm run validate:curriculum -- --strict` 100%
   - `npm run audit:bundle` (CSS $\le$ 20KB, JS $\le$ 300KB)
   - Red Team Adversarial Attacks 100%

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `src/components/layout/HsrQuestMap.tsx`
- [ ] `[NEW]` `src/components/layout/HsrQuestMap.test.tsx`
- [ ] `[MODIFY]` `src/components/layout/QuestMap.tsx`
- [ ] `[NEW]` `e2e/tier2_traveler_quest.spec.ts`
- [ ] `[MODIFY]` `docs/plan/phase_07_tier2_traveler_quest.md`
- [ ] `[MODIFY]` `docs/plan/README.md`

---

## 🧪 3. เกณฑ์การตรวจรับคุณภาพ (Quality Gate & DoD)
- [ ] แผนผังรถไฟความเร็วสูงปลดล็อกตาม Progress ถูกต้อง
- [ ] Playwright E2E รันผ่านครบทุก Scenarios
- [ ] ไม่เกิน Performance Bundle Budgets
