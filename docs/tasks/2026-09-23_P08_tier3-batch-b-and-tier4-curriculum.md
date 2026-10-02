---
task_id: "TASK-805"
title: "Tier 3 Batch 2 (Units 36–45) & Tier 4 Legend Curriculum (Units 46–57 Classical & Diplomatic)"
type: "FEATURE"
phase: "P08"
created_at: "2026-09-23"
updated_at: "2026-09-23"
status: "TODO"
priority: "HIGH"
assignee: "curriculum_tutor"
reviewer: "pedagogical_qa"
related_plan: "docs/plan/phase_08_tier3_4_advanced_immersion.md"
---

# 📋 [TASK-805] Tier 3 Batch 2 & Tier 4 Legend Curriculum

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `curriculum_tutor` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
ผลิตและตรวจสอบเนื้อหาขั้นสูงสมบูรณ์แบบ ทั้งระดับ **Tier 3 Batch 2 (Units 36–45 / 40 บทเรียน)** และ **Tier 4: Legend (Units 46–57 / 12 Units / 48 บทเรียน)** รวม 22 Units (88 บทเรียน):
1. **Tier 3 Master Batch 2 (Units 36–45):**
   - จิตวิทยาและสุขภาพจิต (心理健康 / 得不偿失)
   - ศิลปะการแสดงและดนตรี (传统艺术 / 妙不可言)
   - การแพทย์แผนจีน (现代医疗与养生 / 对症下药)
   - การลงทุนและเศรษฐกิจครัวเรือน (投资理财 / 未雨绸缪)
   - สุนทรียศาสตร์ชาจีน (茶道与禅意 / 苦尽甘来)
   - มีมโซเชียลมีเดียและภาษาวัยรุ่น (网络热梗 / 半途而废)
   - การพัฒนาเมืองและประวัติศาสตร์ (城市变迁 / 翻天覆地)
   - การแถลงข่าวและบริหารวิกฤต (危机公关 / 亡羊补牢)
   - การสื่อสารข้ามวัฒนธรรม (跨文化交流 / 胸怀大度)
   - Master Thesis Defense: แผนธุรกิจเจาะตลาดจีน (全力以赴)
2. **Tier 4 Legend Curriculum (Units 46–57):**
   - คำช่วยโบราณในภาษาทางการ (之、乎、者、也、以、于、而、其)
   - พิชัยสงครามซุนวูกับกลยุทธ์ธุรกิจ (《孙子兵法》)
   - ปรัชญาจีนโบราณ (ขงจื๊อ-เต๋า-นิติธรรม)
   - วาทศิลป์ทางการทูตและแถลงการณ์กระทรวงการต่างประเทศ
   - สมุดปกขาวเศรษฐกิจมหภาคและนโยบายรัฐ
   - คดีทรัพย์สินทางปัญญาและอนุญาโตตุลาการระหว่างประเทศ
   - กวีนิพนธ์ถังและซ่ง (หลี่ไป๋, ตู้ฝู่, ซูซื่อ)
   - วรรณกรรมจีนสมัยใหม่ (หลู่ซวิ่น, เหลาเส่อ)
   - ภูมิรัฐศาสตร์และเส้นทางสายไหม (Belt and Road)
   - การเจรจาควบรวมกิจการระดับสูง (M&A)
   - การเขียนบทความวิจัยวิชาการและ Peer Review
   - Legend Grand Capstone: วิทยานิพนธ์ระดับตำนาน 2,000 คำ

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `scripts/build_tier3_batch_b.ts`
- [ ] `[NEW]` `scripts/build_tier4_legend.ts`
- [ ] `[NEW]` `src/data/lessons/tier3/unit36.json` ถึง `unit45.json`
- [ ] `[NEW]` `data/lessons/tier3/unit36.json` ถึง `unit45.json`
- [ ] `[NEW]` `src/data/lessons/tier4/unit46.json` ถึง `unit57.json`
- [ ] `[NEW]` `data/lessons/tier4/unit46.json` ถึง `unit57.json`
- [ ] `[TEST]` `src/data/lessons/tier4/schemaValidation.test.ts`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] พัฒนาสคริปต์ `scripts/build_tier3_batch_b.ts` สำหรับ Units 36–45
- [ ] พัฒนาสคริปต์ `scripts/build_tier4_legend.ts` สำหรับ Units 46–57 (รวมบทกวีและภาษาเขียนโบราณ)
- [ ] รันสคริปต์ผลิต JSON ลงทั้งใน `src/data/lessons/` และสำเนา `data/lessons/`
- [ ] เขียนและรัน Vitest Schema Validation สำหรับ Tier 4
- [ ] รัน `npm run validate:curriculum -- --strict` ตรวจสอบ Pinyin และวรรณยุกต์ทั้งหมด

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **Curriculum Linter Passed:** ผ่าน `npm run validate:curriculum -- --strict` 100% ไร้ Error
- [ ] **Pedagogical Checked:** ตรวจทานความถูกต้องของบทกวีโบราณ ตัวอักษร และคำแปลไทยระดับวรรณกรรม
- [ ] **Data Completeness:** มีครบทั้ง 22 Units (88 บทเรียนย่อย) พร้อม Boss Challenges ทุกบท
- [ ] **Chunked Loading:** ไฟล์ JSON ถูกโหลดแบบ Asynchronous ตามความต้องการของผู้เรียน

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *บทกวีนิพนธ์ใน Unit 52 ต้องระบุทั้งชื่อบทกวี ชื่อกวี ราชวงศ์ และคำอธิบายฉันทลักษณ์คู่ขนานอย่างประณีต*
