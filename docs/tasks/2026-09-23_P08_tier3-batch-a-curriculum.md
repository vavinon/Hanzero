---
task_id: "TASK-801"
title: "Tier 3 Master Curriculum Batch 1: Units 26–35 (Workplace, Business, Tech & Society)"
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

# 📋 [TASK-801] Tier 3 Master Curriculum Batch 1 (Units 26–35)

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `curriculum_tutor` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
ผลิตและตรวจสอบบทเรียนภาษาจีนระดับสูง **Tier 3: Master ชุดแรก (Units 26–35 รวม 10 Units / 40 บทเรียน)** ตามมาตรฐาน HSK 5-6 และสเปกใน [03_lesson_levels.md](../curriculum/03_lesson_levels.md):
1. **บริบทการทำงานและเจรจาการค้า:** การรายงานความคืบหน้า (汇报), การเจรจาราคาและเครดิตเทอม (商务谈判), ตรวจร่างสัญญาจัดซื้อ (采购合同), วัฒนธรรมโต๊ะสุราจีน (酒桌文化)
2. **เทคโนโลยี สังคม และการศึกษา:** นวัตกรรม EV และ AI (新能源/大模型), การสัมภาษณ์งานบริษัทข้ามชาติจีน (求职面试), ความต่างเหนือ-ใต้และสำเนียงท้องถิ่น (地理与方言), ปรากฏการณ์การศึกษาและภาวะกดดัน (内卷/躺平), นโยบายคาร์บอนต่ำ (双碳/低碳)
3. **成语 4 ตัวอักษรชุดแรก (10 สำนวน):** 脚踏实地, 讨价还价, 货真价实, 入乡随俗, 一清二楚, 日新月异, 自告奋勇, 五湖四海, 望子成龙, 绿水青山
4. **ความสมบูรณ์ของโครงสร้างข้อมูล:** ผลิตไฟล์ JSON ลงทั้ง `src/data/lessons/tier3/` และสำเนากระจกเงา `data/lessons/tier3/`

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `scripts/build_tier3_batch_a.ts` (สคริปต์ผลิต JSON บทเรียน Units 26–35)
- [ ] `[NEW]` `src/data/lessons/tier3/unit26.json` ถึง `unit35.json`
- [ ] `[NEW]` `data/lessons/tier3/unit26.json` ถึง `unit35.json`
- [ ] `[TEST]` `src/data/lessons/tier3/schemaValidation.test.ts` (ทดสอบความถูกต้องของโครงสร้าง JSON)

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] สร้างโฟลเดอร์ `src/data/lessons/tier3/` และ `data/lessons/tier3/`
- [ ] เขียนสคริปต์ `scripts/build_tier3_batch_a.ts` รวบรวมคำศัพท์ ไวยากรณ์ บทสนทนา และ Boss Challenges ของ Units 26–35:
  - **Unit 26:** 职场沟通 (การสื่อสารในที่ทำงาน / 脚踏实地)
  - **Unit 27:** 商务谈判 (การเจรจาต่อรองการค้า / 讨价还价)
  - **Unit 28:** 中国电商生态 (อีคอมเมิร์ซ & ไลฟ์สด Douyin / 货真价实)
  - **Unit 29:** 酒桌文化与社交 (วัฒนธรรมโต๊ะสุรา & การชนแก้ว / 入乡随俗)
  - **Unit 30:** 合同与法务初步 (ตรวจร่างสัญญาเบื้องต้น / 一清二楚)
  - **Unit 31:** 中国科技与创新 (EV & AI นวัตกรรมจีน / 日新月异)
  - **Unit 32:** 求职与面试技巧 (สัมภาษณ์งานบริษัทเทคจีน / 自告奋勇)
  - **Unit 33:** 中国地理与方言 (ภูมิศาสตร์และสำเนียงท้องถิ่น / 五湖四海)
  - **Unit 34:** 教育与内卷现象 (การศึกษา & ภาวะกดดันสังคม / 望子成龙)
  - **Unit 35:** 环境保护与低碳 (การพัฒนาสีเขียว & คาร์บอนต่ำ / 绿水青山)
- [ ] รันสคริปต์สร้างไฟล์ JSON ทั้ง 10 Units
- [ ] เขียนและรัน Vitest Schema Validation Test สำหรับ Tier 3
- [ ] รัน `npm run validate:curriculum -- --strict` ตรวจสอบ Pinyin และวรรณยุกต์

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **Data Schema Compliant:** ผ่านการตรวจสอบฟิลด์ `hanzi`, `pinyin`, `th`, `en`, `tones` ครบทุกคำ
- [ ] **Pedagogical Checked:** ตรวจทานความถูกต้องของอักษรจีนตัวย่อ สำนวน成语 และคำแปลภาษาไทย 100%
- [ ] **Curriculum Linter:** `npm run validate:curriculum -- --strict` ผ่าน Exit Code 0 ไร้ Warning/Error
- [ ] **Zero Missing Tone Marks:** วรรณยุกต์ Pinyin วางตรงสระหลักถูกต้องตามหลักสากล

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *คำศัพท์ระดับ HSK 5-6 มีความซับซ้อนของภาษาเขียน (书面语) และโครงสร้างคู่เชื่อม ต้องให้ความสำคัญกับตัวอย่างประโยคบริบทจริง*
