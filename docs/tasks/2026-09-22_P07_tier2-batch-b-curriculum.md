---
task_id: "TASK-704"
title: "Tier 2 Traveler Curriculum Batch 2 (Units 16–20: Returns, Clinic, Telecom/Bank, Festivals, Police)"
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

# 📋 [TASK-704] Tier 2 Traveler Curriculum Batch 2 (Units 16–20)

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `curriculum_tutor` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
ผลิตเนื้อหาบทเรียน Tier 2 Batch 2 ครบ 5 Units (20 บทย่อย):
1. **Unit 16 (商场退换货):** ช็อปปิ้ง เปลี่ยนไซส์ คืนสินค้าพร้อมใบเสร็จ *(ประโยค 被)*
2. **Unit 17 (看病与买药进阶):** หาหมอ อธิบายอาการแพ้ ท้องเสีย รับยาที่เภสัช *(Potential Complements: 吃得下/好不了)*
3. **Unit 18 (银行与通信业务):** เปิดบัญชี ICBC จัดการซิมการ์ดและเน็ตมือถือ *(只有...才...)*
4. **Unit 19 (中国节庆与拜访):** ตรุษจีน ไหว้พระจันทร์ มารยาทมอบของขวัญ *(Tone Sandhi: 买礼物 `mái lǐwù`)*
5. **Unit 20 (求助与意外处理):** แจ้งความของหายที่สถานีตำรวจ ติดต่อสถานทูตไทย *(竟然, 果然, 连...都...)*

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `scripts/build_tier2_batch_b.ts`
- [ ] `[NEW]` `src/data/lessons/tier2/unit16_shopping_returns.json` ถึง `unit20_emergencies.json`
- [ ] `[NEW]` `data/lessons/tier2/unit16_shopping_returns.json` ถึง `unit20_emergencies.json`
- [ ] `[MODIFY]` `src/data/lessons/tier2/schemaValidation.test.ts`

---

## 🧪 3. เกณฑ์การตรวจรับคุณภาพ (Quality Gate & DoD)
- [ ] Schema validation ผ่าน 100%
- [ ] Interleaving retention $\ge 20\%$
- [ ] อักษรจีนตัวย่อ 100%
