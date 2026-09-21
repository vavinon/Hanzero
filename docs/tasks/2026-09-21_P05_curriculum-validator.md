---
task_id: "TASK-501"
title: "Phase 5 Slice 5.1: Curriculum Validator & Quality Linter Engine"
type: "FEATURE"
phase: "P05"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "TODO"
priority: "HIGH"
assignee: "web_dev"
reviewer: "pedagogical_qa"
related_plan: "docs/plan/phase_05_tier1_content_rollout.md"
---

# 📋 [TASK-501] Phase 5 Slice 5.1: Curriculum Validator & Quality Linter Engine

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
สร้างเครื่องมือตรวจสอบความถูกต้องของบทเรียนอัตโนมัติ (Automated Curriculum Validator & Linter) เพื่อให้มั่นใจว่าข้อมูลบทเรียนภาษาจีนทั้งหมดถูกต้องตามสเปก ก่อนนำไปใช้ใน Production:
1. ตรวจสอบ Schema ของ JSON บทเรียนทุกไฟล์ใน `src/data/lessons/` (ฟิลด์บังคับ: `hanzi`, `pinyin`, `meaning_th`, `meaning_en` ห้ามขาด)
2. ตรวจสอบความซ้ำซ้อนของ ID (Unit IDs, Lesson IDs, Vocab IDs)
3. ตรวจสอบกฎการผันเสียงวรรณยุกต์ (Tone Sandhi Linter): ตรวจจับคำที่มี `一` (yī/yí/yì) และ `不` (bù/bú) ว่ากำกับพินอินตรงตามบริบท
4. ตรวจสอบกฎการทบทวนวนซ้ำ (Interleaving Rule): ยืนยันว่าตั้งแต่ Unit 2 เป็นต้นไป มีคำศัพท์จาก Unit ก่อนหน้าแทรกเข้ามาอย่างน้อย 20%
5. ผูกเข้ากับคำสั่ง npm script `npm run validate:curriculum`

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `scripts/validateCurriculum.ts`
- [ ] `[MODIFY]` `package.json` (เพิ่ม script `validate:curriculum`)
- [ ] `[TEST]` `src/data/lessons/tier1/schemaValidation.test.ts`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] พัฒนาสคริปต์ `scripts/validateCurriculum.ts` (TypeScript / Node.js)
- [ ] เขียนตรรกะตรวจสอบ Required Fields และ JSON Data Type
- [ ] เขียนตรรกะ Tone Sandhi Linting ตรวจจับ `一` และ `不`
- [ ] เขียนตรรกะ Interleaving Rate Calculator (คำนวณคำศัพท์เก่าเทียบคำศัพท์ใหม่)
- [ ] รันการตรวจสอบกับบทเรียน Tier 0 และ Tier 1 Unit 1 ที่มีอยู่เดิม

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **100% Pass on Existing Data:** ข้อมูล Tier 0 และ Unit 1 ปัจจุบันต้องผ่านการตรวจสอบ 100% ไร้ข้อผิดพลาด
- [ ] **Clear Error Reporting:** แสดงผลจุดที่ผิดพลาดชัดเจน (ชื่อไฟล์, เลขบรรทัด, รหัสคำศัพท์, สาเหตุ)
- [ ] **CLI Exit Code:** ส่งคืน exit code 0 เมื่อผ่าน และ exit code 1 เมื่อพบข้อผิดพลาด

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *จะระบุรายละเอียดระหว่างการลงมือพัฒนา*
