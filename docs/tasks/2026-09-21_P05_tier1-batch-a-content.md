---
task_id: "TASK-502"
title: "Phase 5 Slice 5.2: Tier 1 Content Rollout - Batch A (Units 2, 3, 4)"
type: "FEATURE"
phase: "P05"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "TODO"
priority: "HIGH"
assignee: "curriculum_tutor"
reviewer: "pedagogical_qa"
related_plan: "docs/plan/phase_05_tier1_content_rollout.md"
---

# 📋 [TASK-502] Phase 5 Slice 5.2: Tier 1 Content Rollout - Batch A (Units 2, 3, 4)

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `curriculum_tutor` | **ผู้ตรวจรับ:** `pedagogical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
ยกระดับและนำเข้าเนื้อหาบทเรียน Tier 1 Batch A ครบ 3 Units ตามมาตรฐาน Golden Template (ครบ 4 บทย่อยต่อ Unit: 3 บทย่อยเนื้อหา + 1 Boss Challenge):
1. **Unit 2 (ตัวเลข วันที่ & เวลา):** นับเลข 0-10, วันในสัปดาห์, การนัดหมายเวลา *(⚡ Sandhi: กฎเสียงเดิมของ `一` yī)*
2. **Unit 3 (สั่งอาหาร & เครื่องดื่ม):** สั่งบะหมี่ ข้าว ชานม เผ็ด/ไม่เผ็ด *(⚡ Sandhi: กฎ `不吃` bù chī)*
3. **Unit 4 (ช็อปปิ้ง & ถามราคา):** ถามราคา ต่อรอง ซื้อของฝาก *(⚡ Sandhi: กฎ `一块` yí kuài)*
4. บรรจุส่วนประกอบครบถ้วน: บัตรคำศัพท์พร้อมภาพจำ Mnemonic, บทสนทนาคาราโอเกะ, เลโก้ไวยากรณ์, และมินิเกมควิซท้ายบท

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `src/data/lessons/tier1/unit02_numbers_time.json`
- [ ] `[NEW]` `src/data/lessons/tier1/unit03_food_drinks.json`
- [ ] `[NEW]` `src/data/lessons/tier1/unit04_shopping_money.json`
- [ ] `[MODIFY]` `src/data/lessons/tier1/schemaValidation.test.ts`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] จัดเตรียมโครงสร้างเนื้อหา Unit 2 (ตัวเลข & เวลา) พร้อมกฎ Interleaving 20% จาก Unit 1
- [ ] จัดเตรียมโครงสร้างเนื้อหา Unit 3 (อาหาร & เครื่องดื่ม)
- [ ] จัดเตรียมโครงสร้างเนื้อหา Unit 4 (ช็อปปิ้ง & ถามราคา)
- [ ] ตรวจทานตัวอักษรจีนตัวย่อ, ตำแหน่งวรรณยุกต์พินอิน, และคำแปลไทยร่วมกับ Pedagogical QA
- [ ] รันสคริปต์ตรวจสอบความถูกต้องของ Schema และ Tone Sandhi

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **Pedagogical Checked:** ตัวอักษรจีน พินอิน คำแปลไทย และ Tone Sandhi ถูกต้อง 100%
- [ ] **Interleaving Rule:** มีคำศัพท์จาก Unit ก่อนหน้าแทรกเข้ามาทบทวน $\ge 20\%$
- [ ] **Schema Validation:** ผ่านชุดทดสอบอัตโนมัติ `npm test` และ `npm run validate:curriculum`

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *จะระบุรายละเอียดระหว่างการลงมือพัฒนา*
