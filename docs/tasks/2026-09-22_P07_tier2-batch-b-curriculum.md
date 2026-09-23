---
task_id: "TASK-704"
title: "Tier 2 Traveler Curriculum Batch 2 (Units 16–20: Returns, Clinic, Telecom/Bank, Festivals, Police)"
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

# 📋 [TASK-704] Tier 2 Traveler Curriculum Batch 2 (Units 16–20)

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `curriculum_tutor` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
ผลิตเนื้อหาบทเรียน Tier 2 Batch 2 ครบ 5 Units (20 บทย่อย + 5 Boss Challenges):
1. **Unit 16 (商场退换货):** ช็อปปิ้ง เปลี่ยนไซส์ คืนสินค้าพร้อมใบเสร็จ *(ประโยค 被, 比...更..., 只要...就...)*
2. **Unit 17 (看病与买药进阶):** หาหมอ อธิบายอาการแพ้ ท้องเสีย รับยาที่เภสัช *(Potential Complements: 吃得下/吃不下/受不了/好不了, 一天三次一次两粒)*
3. **Unit 18 (银行与通信业务):** เปิดบัญชี ICBC จัดการซิมการ์ดและเน็ตมือถือ *(只有...才..., 必须本人签字, 包含30GB流量, 绑定支付宝)*
4. **Unit 19 (中国节庆与拜访):** ตรุษจีน ไหว้พระจันทร์ มารยาทมอบของขวัญ *(Tone Sandhi: 买礼物 `mái lǐwù`, 祝您新年快乐，万事如意，身体健康，阖家幸福)*
5. **Unit 20 (求助与意外处理):** แจ้งความของหายที่สถานีตำรวจ ติดต่อสถานทูตไทย *(竟然, 果然, 连...都..., 车身被撞了一下, 办理紧急旅行证)*

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [x] `[NEW]` `scripts/tier2_batch_b/unit16.ts` ถึง `unit20.ts`
- [x] `[NEW]` `scripts/build_tier2_batch_b.ts`
- [x] `[NEW]` `src/data/lessons/tier2/unit16_shopping_returns.json` ถึง `unit20_emergencies.json`
- [x] `[NEW]` `data/lessons/tier2/unit16_shopping_returns.json` ถึง `unit20_emergencies.json` (Parity mirror)
- [x] `[MODIFY]` `src/data/lessons/tier2/schemaValidation.test.ts` (101/101 tests passed)
- [x] `[MODIFY]` `scripts/lib/curriculumEngine.ts` (Support 买礼物 3+3 sandhi & Potential Complements neutral tone `bu`)

---

## 🧪 3. เกณฑ์การตรวจรับคุณภาพ (Quality Gate & DoD)
- [x] **TypeScript Clean:** `tsc --noEmit` & `npm run build` ผ่าน 100% ไร้ Type Error
- [x] **Schema Tests Passed:** `npx vitest run src/data/lessons/tier2/schemaValidation.test.ts` ผ่าน 100% (101/101 passed)
- [x] **Curriculum Linter Passed:** `npx tsx scripts/validateCurriculum.ts --tier 2 --strict --verbose` ผ่าน 100% (10 units, 40 lessons, 215 vocab)
- [x] **Interleaving Retention $\ge 20\%$:**
  - Unit 16: 35.2%
  - Unit 17: 32.0%
  - Unit 18: 33.6%
  - Unit 19: 30.8%
  - Unit 20: 29.2%
- [x] **Simplified Chinese 100%:** ไร้ตัวเต็มจาก Blacklist
- [x] **Tone Sandhi Transparency:** กฎ 3+3 (`买礼物 mái lǐwù`), Half-3rd tone (`打折 dǎzhé`), และ Potential Complements (`chībuxià`, `shòubuliǎo`)

---

## 📝 4. สรุปผลการดำเนินงาน (Execution Summary)
- ดำเนินการสร้างหลักสูตรครบทั้ง 5 ยูนิตของ Batch 2 (Units 16–20) ตามมาตรฐาน HSK 3-4
- อัตราการเวียนซ้ำคำศัพท์ (Interleaving Retention) ทุกยูนิตสูงกว่าเกณฑ์ขั้นต่ำ 20%
- ทุก Unit ผ่านการตรวจสอบโครงสร้าง JSON, เสียงวรรณยุกต์, Sandhi rules, และความถูกต้องของความหมายอย่างเข้มงวด
