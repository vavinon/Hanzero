---
task_id: "TASK-701"
title: "Tier 2 Traveler Curriculum Batch 1 (Units 11–15: Scan & Pay, Delivery, HSR, Renting, Dining)"
type: "FEATURE"
phase: "P07"
created_at: "2026-09-22"
updated_at: "2026-09-22"
status: "DONE"
priority: "HIGH"
assignee: "curriculum_tutor"
reviewer: "pedagogical_qa"
related_plan: "docs/plan/phase_07_tier2_traveler_quest.md"
---

# 📋 [TASK-701] Tier 2 Traveler Curriculum Batch 1 (Units 11–15)

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `curriculum_tutor` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
สร้างและนำเข้าเนื้อหาบทเรียน Tier 2 Batch 1 ครบทั้ง 5 Units (รวม 20 บทย่อย: 3 บทเรียนเนื้อหา + 1 Boss Challenge ต่อ Unit) สู่ `src/data/lessons/tier2/` และ `data/lessons/tier2/` ตามมาตรฐาน HSK 3–4:
1. **Unit 11 (扫码支付 - Scan & Pay):** สแกนจ่าย WeChat Pay, Alipay, 扫我还是我扫你, โอนเงิน, เงินทอน
2. **Unit 12 (外卖与快递 - Delivery & Courier):** สั่งเดลิเวอรี่ Meituan, ใส่ที่อยู่, ไรเดอร์โทรส่ง, นัดรับตู้ล็อกเกอร์ Cainiao
3. **Unit 13 (高铁与出行 - High-Speed Rail):** จองตั๋วรถไฟความเร็วสูง 12306, ผ่านจุดตรวจบัตร, เปลี่ยนตั๋ว/คืนตั๋ว
4. **Unit 14 (租房与生活设施 - Renting & Utilities):** สัญญาเช่า 押一付三, ค่าน้ำไฟเน็ต, แจ้งซ่อมแอร์และตู้เย็น
5. **Unit 15 (餐厅点菜进阶 - Advanced Dining):** อาหาร 4 ภาค (เสฉวน, กวางตุ้ง), ระบุรสชาติและข้อห้าม/แพ้อาหาร, ขอใบเสร็จ/แยกบิล
6. **Pedagogical Standards:** อักษรจีนตัวย่อ 100%, Tone Sandhi ถูกกฎ (`wó sáo nǐ`, `jiǎnpiàokǒu`), Dual Pinyin (`pinyin` + `display_pinyin`), Interleaving retention $\ge 20\%$

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [x] `[NEW]` `scripts/tier2_batch_a/unit11.ts` ถึง `unit15.ts` & `scripts/build_tier2_batch_a.ts`
- [x] `[NEW]` `src/data/lessons/tier2/unit11_scan_pay.json`
- [x] `[NEW]` `src/data/lessons/tier2/unit12_delivery_courier.json`
- [x] `[NEW]` `src/data/lessons/tier2/unit13_hsr_travel.json`
- [x] `[NEW]` `src/data/lessons/tier2/unit14_renting_utilities.json`
- [x] `[NEW]` `src/data/lessons/tier2/unit15_advanced_dining.json`
- [x] `[NEW]` `data/lessons/tier2/unit11_scan_pay.json` ถึง `unit15_advanced_dining.json` (Parity mirror)
- [x] `[NEW]` `src/data/lessons/tier2/schemaValidation.test.ts`
- [x] `[MODIFY]` `scripts/lib/curriculumEngine.ts` & `scripts/validateCurriculum.ts`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [x] เขียน `scripts/build_tier2_batch_a.ts` กำหนดคำศัพท์ ไวยากรณ์ บทสนทนา ควิซ และ Boss Challenge ของ Units 11–15
- [x] รันสคริปต์เพื่อสร้างไฟล์ JSON ทั้งใน `src/data/lessons/tier2/` และ `data/lessons/tier2/`
- [x] สร้าง `src/data/lessons/tier2/schemaValidation.test.ts` ทดสอบ Universal Invariants และ Specific Checks (61/61 ผ่าน)
- [x] อัปเดต `scripts/lib/curriculumEngine.ts` ให้ตรวจจับไฟล์ Tier 2 และรัน `npm run validate:curriculum -- --strict`
- [x] ตรวจสอบว่าไม่มีอักษรตัวเต็ม และ Tone Sandhi ทุกตัวถูกต้อง 100%

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Quality Gate & DoD)
- [x] **TypeScript Clean:** `tsc && vite build` ผ่าน 100% ไร้ Type Error
- [x] **Schema Tests Passed:** `npx vitest run src/data/lessons/tier2/schemaValidation.test.ts` ผ่าน 100% (61/61 passed)
- [x] **Curriculum Linter Passed:** `npm run validate:curriculum -- --strict` ผ่าน 100% (21 units, 66 lessons, 360 vocab, Interleaving $\ge 34.1\% > 20\%$)
- [x] **Dual Pinyin Compliant:** ทุกคำศัพท์มี `pinyin` และ `display_pinyin` ถูกต้อง
- [x] **Pedagogical Checked:** ตรวจสอบคำแปลภาษาไทยและอักษรจีนตัวย่อ 100% ไร้ตัวเต็มจากบัญชีดำ

---

## 📝 5. สรุปผลการดำเนินงาน (Execution Summary)
- ดำเนินการสร้างหลักสูตร 5 ยูนิตแรกของ Tier 2 ครบถ้วนตามมาตรฐาน HSK 3-4
- อัตราการเวียนซ้ำคำศัพท์ (Interleaving Retention): U11 (47.7%), U12 (41.1%), U13 (44.6%), U14 (34.1%), U15 (37.7%)
- ทุก Unit ผ่านการตรวจสอบโครงสร้าง JSON, เสียงวรรณยุกต์, Sandhi rules, และความถูกต้องของความหมายอย่างเข้มงวด
