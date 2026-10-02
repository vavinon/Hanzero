---
task_id: "TASK-706"
title: "HSR Metro Quest Map, Stamped Tickets & 4-Tier Verification Suite"
type: "FEATURE"
phase: "P07"
created_at: "2026-09-22"
updated_at: "2026-09-23"
status: "DONE"
priority: "HIGH"
assignee: "ux_ui_designer"
reviewer: "technical_qa"
related_plan: "docs/plan/phase_07_tier2_traveler_quest.md"
---

# 📋 [TASK-706] HSR Metro Quest Map, Stamped Tickets & 4-Tier Verification Suite

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `ux_ui_designer` & `test_automation_engineer` | **ผู้ตรวจรับ:** `technical_qa` & `pedagogical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
1. **HSR Metro Quest Map (`src/components/layout/HsrQuestMap.tsx`):**
   - แผนที่เส้นทางรถไฟความเร็วสูง 4 มหานคร (ปักกิ่ง ➔ ซีอาน ➔ เฉิงตู ➔ เซี่ยงไฮ้) 15 สถานี
   - ตั๋วรถไฟความเร็วสูงประทับตราดิจิทัล (Stamped HSR Ticket Modal: G706 次, 二等座, ตราประทับสีชาด 中国高铁 · 已检票)
   - ผสานเข้ากับ `QuestMap.tsx` ผ่านแท็บ **"🎋 Tier 2: นักเดินทาง"** ด้วย Code-splitting (`React.lazy`)
2. **Playwright E2E Test Suite (`e2e/tier2_traveler_quest.spec.ts`):**
   - ทดสอบ Journey การเดินทางของผู้เรียนตั้งแต่เข้าสู่ Tier 2 จนถึงเรียนจบและรับตั๋วประทับตรา
   - ทดสอบบน Desktop Chrome, Mobile Android (360x640), Mobile iPhone SE (320x568) ผ่านครบ 100%
3. **4-Tier QA & Final Sign-off:**
   - Vitest Unit Tests: 46 test files / 755 unit tests ผ่าน 100%
   - `npm run validate:curriculum -- --strict` ผ่าน 100% (31 Units, 106 Lessons, 586 Vocab)
   - `npm run audit:bundle` (CSS: 3.24KB $\le$ 20KB, JS: 217.29KB $\le$ 300KB) ผ่านเกณฑ์
   - Red Team Adversarial Attacks: หน้าจอ 320px Squeeze ไม่ล้น ไม่แตก

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [x] `[NEW]` `src/data/lessons/tier2/index.ts`
- [x] `[NEW]` `src/components/layout/HsrQuestMap.tsx`
- [x] `[NEW]` `src/components/layout/HsrQuestMap.test.tsx`
- [x] `[MODIFY]` `src/components/layout/QuestMap.tsx`
- [x] `[MODIFY]` `src/components/lesson/LessonView.tsx`
- [x] `[NEW]` `e2e/tier2_traveler_quest.spec.ts`
- [x] `[MODIFY]` `docs/plan/phase_07_tier2_traveler_quest.md`
- [x] `[MODIFY]` `docs/plan/README.md`

---

## 🧪 3. เกณฑ์การตรวจรับคุณภาพ (Quality Gate & DoD)
- [x] แผนผังรถไฟความเร็วสูงปลดล็อกตาม Progress ถูกต้อง
- [x] Playwright E2E รันผ่านครบทุก Scenarios บนทุกแพลตฟอร์ม
- [x] ไม่เกิน Performance Bundle Budgets (CSS 3.24KB, JS 217.29KB)
- [x] TypeScript Strict Types 100% ไร้ `any` (`tsc --noEmit` สะอาดสมบูรณ์)
