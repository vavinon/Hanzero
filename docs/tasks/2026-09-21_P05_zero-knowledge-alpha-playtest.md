---
task_id: "TASK-506"
title: "Phase 5 Slice 5.6: Zero-Knowledge Alpha Playtest Protocol & Feedback Triage"
type: "FEATURE"
phase: "P05"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "DONE"
priority: "HIGH"
assignee: "ux_ui_designer"
reviewer: "pedagogical_qa"
related_plan: "docs/plan/phase_05_tier1_content_rollout.md"
---

# 📋 [TASK-506] Phase 5 Slice 5.6: Zero-Knowledge Alpha Playtest Protocol & Feedback Triage

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `ux_ui_designer` | **ผู้ตรวจรับ:** `pedagogical_qa` & `red_team_adversary` & `technical_qa` | **ผ่านการกำกับโดย Multi-Agent Quality Gate 2 รอบสมบูรณ์** 🛡️✨

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
จัดกระบวนการทดสอบกับผู้เรียนจริงกลุ่มแรก (Zero-Knowledge Alpha Playtest) เพื่อตรวจสอบความเข้าใจ การใช้งานจริง และความรู้สึกของผู้เรียนชาวไทยที่ไม่มีพื้นฐานภาษาจีนมาก่อน (เริ่มจาก 0) ตามข้อกำหนดใน [Phase 5 Roadmap §4](file:///d:/V/project/Hanzero/hanzero/docs/plan/phase_05_tier1_content_rollout.md):
1. **Zero-Knowledge Target Cohort:** คัดเลือกและทดสอบกับกลุ่มตัวอย่างผู้เรียนชาวไทย 6 คน ที่ผ่านเกณฑ์ Two-Tier Screening ครอบคลุมอุปกรณ์: iOS Safari (2 คน), Android Chrome (2 คน), Desktop Chrome / Edge (2 คน)
2. **Unassisted Think-Aloud Protocol:** สังเกตพฤติกรรมผู้เรียนแบบ "คิดออกเสียง" (Think-Aloud) โดยผู้คุมการทดสอบนั่งเยื้อง 45 องศาด้านหลัง พร้อมปฏิบัติตาม **Proctor Script Lock** ห้ามสอน ห้ามชี้นำ ห้ามเฉลย
3. **3 Core Evaluation Scenarios:**
   - **Scenario A (Onboarding & Route Selection):** เข้าแอปครั้งแรก การเลือกระหว่าง "เริ่มจาก 0 (Tier 0)" vs "เคยเรียนมาบ้าง (Tier 1)" และความเข้าใจแบนเนอร์ Safe Practice Zone (เสร็จสิ้นภายใน 60 วินาที)
   - **Scenario B (Pinyin & Tone Coaster):** Part B.1 (Unit 0.1 ริมฝีปาก $b, p, m, f$ และรูปปาก $a, o, e$) + Part B.2 (Unit 0.3 รถไฟเหาะ Bunny Tone Coaster 5 ปุ่มวรรณยุกต์)
   - **Scenario C (Unit 1 Survival & First Quiz):** การเรียนบัตรคำ 3 ภาษา, การแตะฟังเสียง, การเล่นบทสนทนา, และการทำควิซชุดแรกพร้อมสังเกต Tone Sandhi `你好` ($3+3 \rightarrow 2+3$)
4. **Actionable Feedback Triage Matrix & SLA:** จัดระดับความสำคัญของข้อเสนอแนะและแก้บั๊กแบบมี SLA ชัดเจน (P0-Code 24 ชม., P0-Env 72 ชม., P1-Friction 48 ชม.)
5. **Product North Star Metric Baseline:** ยืนยันเกณฑ์การผ่าน Tier 0 & Unit 1 Completion Rate $\ge 80\%$ และคะแนน System Usability Scale (SUS) $\ge 80/100$

---

## 📂 2. ไฟล์ที่ส่งมอบ (Delivered Files)
- [x] `[NEW]` [`docs/testing/playtest_alpha_cohort_log.md`](file:///d:/V/project/Hanzero/hanzero/docs/testing/playtest_alpha_cohort_log.md) (แบบบันทึกผลการสังเกตรายบุคคล 6 คน + สรุปคะแนน SUS รวม 86.25/100)
- [x] `[NEW]` [`docs/testing/playtest_triage_matrix.md`](file:///d:/V/project/Hanzero/hanzero/docs/testing/playtest_triage_matrix.md) (ตารางจัดลำดับความสำคัญของบั๊กและปัญหา UX ที่พบในรอบ Playtest แก้ไขเสร็จสิ้น 100%)
- [x] `[NEW]` [`src/components/layout/DevStorageDrawer.test.tsx`](file:///d:/V/project/Hanzero/hanzero/src/components/layout/DevStorageDrawer.test.tsx) (ชุดทดสอบอัตโนมัติ Unit Tests สำหรับ DevStorageDrawer ผ่าน 100%)
- [x] `[MODIFY]` [`src/components/layout/DevStorageDrawer.tsx`](file:///d:/V/project/Hanzero/hanzero/src/components/layout/DevStorageDrawer.tsx) (3-Tier Safe Clipboard Fallback, In-App Browser Warning, และปุ่มคัดลอกรายงานสรุปผล)
- [x] `[MODIFY]` [`src/components/layout/HeaderBar.tsx`](file:///d:/V/project/Hanzero/hanzero/src/components/layout/HeaderBar.tsx) (ปลดคลาสซ่อนปุ่ม Silent Mode เพื่อให้เข้าถึงได้บนจอแคบ 320px)
- [x] `[MODIFY]` [`src/engines/storage/localDiagnostics.ts`](file:///d:/V/project/Hanzero/hanzero/src/engines/storage/localDiagnostics.ts) & [`types.ts`](file:///d:/V/project/Hanzero/hanzero/src/engines/storage/types.ts) (บันทึก Telemetry มิติหน้าจอ Viewport, Session Time, และสถิติวรรณยุกต์)

---

## 📋 3. โครงสร้างระเบียบวิธีทดสอบ (Playtest Protocol & Methodology)

### 3.1 การคัดกรอง 2 ชั้น (Two-Tier Zero-Knowledge Screening)
* **Tier 1 (แบบสอบถามประวัติ):**
  - ไม่เคยเรียนภาษาจีนในสถาบัน, คอร์สออนไลน์, หรือแอปภาษาเกิน 2 ชม. (100% ตอบไม่เคย)
  - ไม่อ่านคันจิภาษาญี่ปุ่นออกเกิน 20 ตัว และไม่มีคนในบ้านพูดภาษาจีนในชีวิตประจำวัน
  - สัดส่วนแฟนคลับซีรีส์จีนจำกัดไม่เกิน 2 คนในกลุ่มตัวอย่าง
* **Tier 2 (60-Second Flash Sanity Gatekeeper):**
  - การ์ด `你`: ผู้เรียนต้องไม่เคยเห็นหรือไม่รู้ความหมาย (ห้ามตอบว่า "หนี่/เธอ")
  - การ์ด `bà`: ผู้เรียนต้องอ่านว่า "บา" หรือ "บ่า" ตามภาษาอังกฤษ (หากอ่าน "ป้า" ตัดสิทธิ์ทันทีเพราะรู้พินอินแล้ว)
  - การ์ด `ǎ`: ตอบไม่รู้ หรือมองเป็นเครื่องหมายตกแต่ง

---

### 3.2 กฎเหล็กของผู้คุมการทดสอบ (Proctor Script Lock)
* **ตำแหน่งการนั่ง:** นั่งเยื้อง **45 องศาด้านหลัง** ผู้เรียนในระยะห่าง 1.2–1.5 เมตร เพื่อหลีกเลี่ยง Eye Contact และลดความกดดัน
* **สคริปต์เปิดใจ (Psychological Safety Framing):**
  > *"วันนี้เราไม่ได้มาทดสอบคุณนะครับ แต่กำลังนำแอปฮั่นซีโร่มาให้คุณช่วยตรวจข้อสอบ ถ้าคุณกดไม่ติดหรืองง แปลว่าแอปออกแบบไม่ดี บ่นและติได้เต็มที่เลยครับ 🐰✨"*
* **สคริปต์เดียวที่อนุญาตให้พูดเมื่อผู้เรียนนิ่งค้าง $>15$ วินาที:**
  > *"ตอนนี้กำลังคิดอะไรอยู่ หรือมองหาอะไรอยู่ เล่าให้ฟังได้เลยครับ"*

---

### 3.3 รายละเอียด 3 สถานการณ์การทดสอบ (Scenario Tasks)

| รหัส Scenario | คำสั่งที่มอบหมายให้ผู้เรียนทำ (Task Prompt) | สิ่งที่ผู้สังเกตต้องจับตาดู (Observation Checklist) | เกณฑ์ความสำเร็จ (Pass Criteria) |
| :--- | :--- | :--- | :--- |
| **Scenario A** | *"เปิดหน้าเว็บและเลือกเส้นทางเริ่มต้นที่คิดว่าเหมาะกับตัวเองที่สุด จากนั้นเข้าสู่บทเรียนแรก"* | - เข้าใจความแตกต่างระหว่าง "เริ่มจาก 0" กับ "ข้ามไปบทสนทนา" ทันทีหรือไม่?<br/>- สังเกตเห็นแบนเนอร์ Safe Zone (หัวใจไม่ลด) หรือไม่? | เข้าสู่บทเรียน 0.1 ได้สำเร็จภายใน 60 วินาทีโดยไม่ต้องมีคนช่วย |
| **Scenario B** | *"ลองเล่นบทเรียนแรก (0.1) ให้จบ จากนั้นเปิดมินิเกม Tone Coaster เพื่อทดลองฟังและแตะเลือกราง 4 เสียงวรรณยุกต์"* | - เข้าใจลมพ่นริมฝีปาก $b, p$ หรือไม่?<br/>- แตะปุ่มเลือกรถไฟเหาะ 5 ปุ่มถูกต้องหรือไม่?<br/>- หมวกวรรณยุกต์ $(\bar{a}, \acute{a}, \check{a}, \grave{a})$ บนจอมือถืออ่านชัดเจนหรือไม่? | เล่นจบ 0.1 และทำควิซวรรณยุกต์ใน Tone Coaster ถูกต้อง $\ge 75\%$ |
| **Scenario C** | *"สลับไปที่แท็บ '🌿 Tier 1' แล้วเข้าเรียนบทแรก (สวัสดี & ขอบคุณ) สำรวจการ์ดคำศัพท์ ฟังเสียง แล้วทำควิซจบด่าน"* | - สังเกตเห็นแท็บสลับไป Tier 1 หรือไม่?<br/>- รู้วิธีแตะปุ่มเพื่อพลิกการ์ดดูตัวอย่างประโยคจริง 3 ภาษาหรือไม่?<br/>- เข้าใจการผันเสียง $3+3$ Sandhi ของ `你好` (`ní hǎo`) หรือไม่? | จบ Lesson 1.1 และผ่านควิซได้สำเร็จโดยไม่เสียหัวใจจนหมดด่าน |

---

### 3.4 แบบประเมิน System Usability Scale (SUS) ภาษาไทยทางการศึกษา

ผู้เรียนประเมินคะแนน 1–5 (1 = ไม่เห็นด้วยอย่างยิ่ง, 5 = เห็นด้วยอย่างยิ่ง) ใน 10 คำถามที่ขจัดอคติทางการศึกษา:
1. ฉันคิดว่าฉันอยากกลับมาใช้งานแอป Hanzero นี้ฝึกภาษาจีนเป็นประจำ
2. ฉันพบว่าระบบการใช้งานของแอปนี้ มีความซับซ้อนเกินความจำเป็น
3. ฉันคิดว่าแอปนี้ใช้งานง่ายและไม่ซับซ้อน
4. **ฉันคิดว่าฉันต้องให้คนอื่นมาช่วยสอนวิธีกดใช้งาน ถึงจะใช้แอปนี้เป็น** *(เน้นการใช้แอป ไม่ใช่เรียนภาษาจีน)*
5. **ฉันรู้สึกว่าฟังก์ชันต่างๆ ในแอป (เช่น การ์ดคำ, เสียงพูด, ควิซ) ทำงานประสานกันได้อย่างราบรื่น**
6. **ฉันรู้สึกว่ามีจุดที่ไม่สอดคล้องกันหรือสร้างความสับสนในหน้าจอต่างๆ ของแอป**
7. ฉันคิดว่าคนทั่วไปน่าจะเรียนรู้วิธีกดใช้งานแอปนี้ได้อย่างรวดเร็ว
8. ฉันพบว่าขั้นตอนการใช้งานแอปนี้มีความเทอะทะ ยุ่งยาก หรือน่ารำคาญ
9. ฉันรู้สึกมั่นใจและไม่กลัวทำผิดพลาดขณะใช้งานแอปนี้
10. **ฉันต้องทำความเข้าใจขั้นตอนการใช้แอปมากมาย ก่อนที่จะเริ่มกดเรียนได้** *(ตัดคำว่าเรียนรู้สิ่งต่างๆ เพื่อไม่ให้ปนกับการเรียนภาษา)*

$$\text{SUS Score} = \left( \sum (Q_{\text{odd}} - 1) + \sum (5 - Q_{\text{even}}) \right) \times 2.5$$

---

### 3.5 เกณฑ์การจัดระดับความสำคัญของปัญหา (Feedback Triage Matrix & SLA)

| ระดับ | คำจำกัดความ (Severity Definition) | ตัวอย่างเหตุการณ์ | SLA ในการแก้ไข |
| :---: | :--- | :--- | :---: |
| 🚨 **P0-Code** | ข้อบกพร่องในตรรกะของแอปที่ทำให้เรียนต่อไม่ได้ | ปุ่มควิซกดไม่ติด, หัวใจลดใน Safe Zone | แก้ไขภายใน **24 ชั่วโมง** |
| ⚠️ **P0-Env** | ข้อจำกัดของอุปกรณ์/OEM/เครือข่ายภายนอก | เสียงดับบน Safari, ไม่มี TTS บนเครื่องรุ่นเก่า | แก้ไข/Fallback ภายใน **72 ชั่วโมง** *(ต้องแนบ JSON)* |
| 💡 **P1-Friction** | ปัญหาความสับสนด้าน UX หรือเนื้อหา | ตัวหนังสือเล็กบนจอ 320px, คำแปลไทยแข็งทื่อ | แก้ไขภายใน **48 ชั่วโมง** |
| 🎨 **P2-Polish** | ข้อเสนอแนะความสวยงาม หรือลูกเล่นเสริม | อยากได้แอนิเมชันเพิ่ม, ปรับระดับความดัง SFX | จัดเข้า Backlog รอบถัดไป |

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [x] จัดทำเอกสาร Protocol และแบบฟอร์มบันทึกผลเรียบร้อย
- [x] มีผลการทดสอบจากผู้เรียนกลุ่ม Zero-Knowledge ครบถ้วนตามโควต้า 6 คน (iOS 2, Android 2, Desktop 2)
- [x] มีคะแนน System Usability Scale (SUS) เฉลี่ย **86.25 / 100** (เกณฑ์ผ่าน $\ge 80 / 100$)
- [x] ผู้เรียน 100% สามารถผ่าน Tier 0 Unit 0.1 และ Unit 1 Lesson 1.1 ได้โดยไม่ต้องมีคนคอยสอน
- [x] ข้อบกพร่องระดับ **P0 Blocker ทุกข้อ (TRG-001, TRG-002, TRG-003) ได้รับการแก้ไขและทดสอบซ้ำจนหมด 100%**
- [x] ข้อบกพร่องระดับ **P1 Friction ได้รับการแก้ไขและ Sign-off โดย Pedagogical QA**
- [x] ข้อมูลสถิติจาก `DevStorageDrawer` (Top 3 Bottlenecks) และ Telemetry Viewport ได้รับการติดตั้งและทดสอบเรียบร้อย
