---
task_id: "TASK-705"
title: "Tier 2 Traveler Curriculum Batch 3 & Grand Boss (Units 21–25: Entertainment, Fitness, Office, Opinions, 7-Day Capstone)"
type: "FEATURE"
phase: "P07"
created_at: "2026-09-22"
updated_at: "2026-09-22"
status: "TODO"
priority: "HIGH"
assignee: "curriculum_tutor"
reviewer: "pedagogical_qa"
related_plan: "docs/plan/phase_07_tier2_traveler_quest.md"
---

# 📋 [TASK-705] Tier 2 Traveler Curriculum Batch 3 & Grand Boss (Units 21–25)

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `curriculum_tutor` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
ผลิตเนื้อหาบทเรียน Tier 2 Batch 3 ครบ 5 Units รวม Grand Boss Capstone:
1. **Unit 21 (文娱与观影):** ซื้อตั๋วหนัง จองตั๋วพระราชวังโบราณกู้กง *(A 没有 B 那么...)*
2. **Unit 22 (健身与户外):** สมัครฟิตเนส เล่นแบดมินตัน เดินป่า *(一边...一边..., 着)*
3. **Unit 23 (日常办公初探):** ออฟฟิศจีน ปริ้นต์งาน เขียนอีเมลขอลาป่วย *(首先...然后...最后...)*
4. **Unit 24 (观点与讨论):** แสดงจุดยืน เห็นด้วย/คัดค้านอย่างสุภาพ *(尽管...但是...)*
5. **Unit 25 (Grand Boss: 穿越中国):** ทริปแบ็กแพ็ก 7 วัน ข้าม 4 มณฑล แก้ไข 5 วิกฤตการณ์เฉพาะหน้าด้วยภาษาจีน 100%!

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `scripts/build_tier2_batch_c.ts`
- [ ] `[NEW]` `src/data/lessons/tier2/unit21_entertainment.json` ถึง `unit25_grand_boss_odyssey.json`
- [ ] `[NEW]` `data/lessons/tier2/unit21_entertainment.json` ถึง `unit25_grand_boss_odyssey.json`
- [ ] `[MODIFY]` `data/lessons/curriculum_manifest.json`
- [ ] `[MODIFY]` `scripts/lib/curriculumEngine.ts`

---

## 🧪 3. เกณฑ์การตรวจรับคุณภาพ (Quality Gate & DoD)
- [ ] ครบ 15 Units ของ Tier 2 ในระบบ
- [ ] รัน `npm run validate:curriculum -- --strict` ผ่าน 100%
- [ ] Grand Boss Quest มีโจทย์บูรณาการคำศัพท์และไวยากรณ์สมบูรณ์
