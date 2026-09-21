---
task_id: "TASK-503"
title: "Phase 5 Slice 5.3: Tier 1 Content Rollout - Batch B & C (Units 5 - 10 + Grand Boss)"
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

# 📋 [TASK-503] Phase 5 Slice 5.3: Tier 1 Content Rollout - Batch B & C (Units 5 - 10 + Grand Boss)

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `curriculum_tutor` | **ผู้ตรวจรับ:** `pedagogical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
ขยายเนื้อหาบทเรียน Tier 1 ให้ครบถ้วนทั้ง 10 Units เพื่อให้ผู้เรียนมีความพร้อมในการใช้ชีวิตจริงในประเทศจีน:
1. **Batch B (การเดินทาง & สังคม):**
   - Unit 5: การเดินทาง & ทิศทาง (แท็กซี่, รถไฟใต้ดิน, เลี้ยวซ้าย/ขวา, ถามทาง)
   - Unit 6: ครอบครัว & เพื่อน (แนะนำสมาชิกในครอบครัว, จำนวนคน, เพื่อนร่วมงาน)
   - Unit 7: กิจวัตร & งานอดิเรก (ตื่นนอน, ทำงาน, ดูหนัง, วันหยุด) *(⚡ Sandhi: `一起` yì qǐ)*
2. **Batch C (สุขภาพ & การเดินทางขั้นสูง):**
   - Unit 8: สภาพอากาศ & ฤดูกาล (ร้อน, หนาว, ฝนตก, หิมะตก, การเตรียมเสื้อผ้า)
   - Unit 9: ร่างกาย สุขภาพ & ไม่สบาย (ปวดหัว, เป็นไข้, ซื้อยา, ไปโรงพยาบาล)
   - Unit 10: โรงแรม & เที่ยวบิน (เช็กอินโรงแรม, ขอรหัส Wi-Fi, สนามบิน, ขึ้นเครื่องบิน)
3. 🏆 **Tier 1 Grand Boss Quest:** "ภารกิจเที่ยวจีน 3 วัน 2 คืนไร้อุปสรรค"

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `src/data/lessons/tier1/unit05_directions_transport.json`
- [ ] `[NEW]` `src/data/lessons/tier1/unit06_family_friends.json`
- [ ] `[NEW]` `src/data/lessons/tier1/unit07_daily_routines.json`
- [ ] `[NEW]` `src/data/lessons/tier1/unit08_weather_seasons.json`
- [ ] `[NEW]` `src/data/lessons/tier1/unit09_health_body.json`
- [ ] `[NEW]` `src/data/lessons/tier1/unit10_hotel_airport.json`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] ผลิตเนื้อหา Batch B (Units 5, 6, 7) พร้อมบทสนทนาสถานการณ์จริง
- [ ] ผลิตเนื้อหา Batch C (Units 8, 9, 10)
- [ ] ออกแบบด่าน Tier 1 Grand Boss Quest ที่ผสานทักษะจากทั้ง 10 Units
- [ ] ยืนยันกฎ Interleaving 20% และ Tone Sandhi ตลอดทั้ง 6 Units
- [ ] ตรวจสอบความถูกต้องร่วมกับ Pedagogical QA

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **10 Units Complete:** บทเรียน Tier 1 ครบทั้ง 10 Units รวม 40 บทย่อย
- [ ] **Curriculum Linter Pass:** ผ่านการตรวจจาก `validateCurriculum.ts` 100% ไร้ข้อผิดพลาด
- [ ] **Pedagogical Checked:** ตรวจทานความถูกต้องของสำนวนจีนและคำแปลภาษาไทยเรียบร้อย

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *จะระบุรายละเอียดระหว่างการลงมือพัฒนา*
