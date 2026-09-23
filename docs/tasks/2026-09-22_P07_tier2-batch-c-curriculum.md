---
task_id: "TASK-705"
title: "Tier 2 Traveler Curriculum Batch 3 & Grand Boss (Units 21–25: Entertainment, Fitness, Office, Opinions, 7-Day Capstone)"
type: "FEATURE"
phase: "P07"
created_at: "2026-09-22"
updated_at: "2026-09-23"
status: "DONE"
priority: "HIGH"
assignee: "curriculum_tutor"
reviewer: "pedagogical_qa"
related_plan: "docs/plan/phase_07_tier2_traveler_quest.md"
---

# 📋 [TASK-705] Tier 2 Traveler Curriculum Batch 3 & Grand Boss (Units 21–25)

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `curriculum_tutor` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
ผลิตเนื้อหาบทเรียน Tier 2 Batch 3 ครบ 5 Units รวม Grand Boss Capstone (20 บทย่อย + 5 Boss Challenges):
1. **Unit 21 (文娱与观影):** ซื้อตั๋วหนัง เลือกรอบ IMAX จองตั๋วพระราชวังโบราณกู้กงผ่านมินิโปรแกรม *(A 没有 B 那么..., 值得二刷)*
2. **Unit 22 (健身与户外):** สมัครฟิตเนส เล่นแบดมินตัน/ปิงปอง เดินป่าแคมปิ้ง *(一边...一边..., 着)*
3. **Unit 23 (日常办公初探):** ออฟฟิศจีน ปริ้นต์/สแกนงาน เขียนอีเมลขอลาป่วยและส่งมอบงาน *(首先...然后...最后..., 望领导批准)*
4. **Unit 24 (观点与讨论):** แสดงจุดยืน เห็นด้วย/คัดค้านอย่างสุภาพ ถกประเด็น WFH vs Office *(尽管...但是..., 不妨, 一方面...另一方面..., 达成共识)*
5. **Unit 25 (Grand Boss: 穿越中国):** ทริปแบ็กแพ็ก 7 วัน ข้าม 4 มหานคร (ปักกิ่ง ➔ ซีอาน ➔ เฉิงตู ➔ เซี่ยงไฮ้) พิชิต 5 วิกฤตการณ์เฉพาะหน้าด้วยภาษาจีน 100%!

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [x] `[NEW]` `scripts/tier2_batch_c/unit21.ts` ถึง `unit25.ts`
- [x] `[NEW]` `scripts/build_tier2_batch_c.ts`
- [x] `[NEW]` `src/data/lessons/tier2/unit21_entertainment.json` ถึง `unit25_grand_boss_odyssey.json`
- [x] `[NEW]` `data/lessons/tier2/unit21_entertainment.json` ถึง `unit25_grand_boss_odyssey.json` (Parity mirror)
- [x] `[MODIFY]` `src/data/lessons/tier2/schemaValidation.test.ts` (151/151 tests passed)

---

## 🧪 3. เกณฑ์การตรวจรับคุณภาพ (Quality Gate & DoD)
- [x] **TypeScript Clean:** `tsc --noEmit` & `npm run build` ผ่าน 100% ไร้ Type Error
- [x] **Schema Tests Passed:** `npx vitest run src/data/lessons/tier2/schemaValidation.test.ts` ผ่าน 100% (151/151 passed)
- [x] **Curriculum Linter Passed:** `npx tsx scripts/validateCurriculum.ts --tier all --strict` ผ่าน 100% (31 units, 106 lessons, 586 vocab)
- [x] **Interleaving Retention $\ge 20\%$:**
  - Unit 21: 27.6% (88 recycled words)
  - Unit 22: 29.1% (97 recycled words)
  - Unit 23: 29.5% (103 recycled words)
  - Unit 24: 23.9% (78 recycled words)
  - Unit 25: 30.2% (110 recycled words)
- [x] **Simplified Chinese 100%:** ไร้ตัวเต็มจาก Blacklist
- [x] **Tone Sandhi Transparency:** กฎ 3+3 (เช่น `展览 zhánlǎn`, `讲解器 jiángjiěqì`, `导演 dáoyǎn`), Half-3rd tone (`羽毛球`, `请假`, `总结`), และโครงสร้าง `着`

---

## 📝 4. สรุปผลการดำเนินงาน (Execution Summary)
- ดำเนินการสร้างหลักสูตรครบทั้ง 5 ยูนิตของ Batch 3 (Units 21–25) ทำให้ Tier 2: Traveler สมบูรณ์ครบทั้ง 15 ยูนิต 60 บทเรียน
- ทุก Unit ผ่านการตรวจสอบโครงสร้าง JSON, เสียงวรรณยุกต์, Sandhi rules, และความถูกต้องของความหมายอย่างเข้มงวด
- Grand Boss Quest (Unit 25) ออกแบบบูรณาการ 5 วิกฤตการณ์ข้าม 4 มหานคร ทดสอบการประยุกต์ใช้ความรู้ภาษาจีนระดับ HSK 3-4 ในชีวิตจริงได้อย่างยอดเยี่ยม
