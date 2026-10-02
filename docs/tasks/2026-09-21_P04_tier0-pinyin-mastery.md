---
task_id: "TASK-400"
title: "Phase 4 Tier 0 Pinyin Mastery, Phonics Games & First-Run Onboarding"
type: "FEATURE"
phase: "P04"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "DONE"
priority: "HIGH"
assignee: "web_dev"
reviewer: "pedagogical_qa"
related_plan: "docs/plan/phase_04_tier0_pinyin_mastery.md"
---

# 📋 [TASK-400] Phase 4 Tier 0 Pinyin Mastery, Phonics Games & First-Run Onboarding

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
เปิดตัวเส้นทางหลักสำหรับผู้เรียนเริ่มต้นจากศูนย์เด็ดขาด (Zero-knowledge) โดยมีหน้าต่าง Onboarding คอยนำทาง, ครอบคลุมระบบเสียงพินอินครบถ้วน 6 Units, มินิเกมฝึกหูที่ไม่ตัดหัวใจ (Safe Practice Zone), ภาพช่วยจำรูปปาก, และบัตรเกียรติยศจบการศึกษา Tier 0:
1. ระบบต้อนรับผู้เรียน First-run Dual-Track Onboarding (WelcomeModal) นำทางระหว่าง "เริ่มจาก 0" กับ "พอรู้พินอินแล้ว"
2. ระบบตรวจสุขภาพเสียงของระบบปฏิบัติการแบบ Zero-MP3 Cascade (VoiceHealthModal & voiceHealthEngine)
3. นำเข้าข้อมูลบทเรียน Tier 0 ครบ 6 Units (ริมฝีปาก, โคนลิ้น, วรรณยุกต์, ลิ้นม้วน/ลิ้นแบน, สระผสม/นาสิก, เส้นขีด & หมวดนำ)
4. มินิเกมรถไฟเหาะ 4 วรรณยุกต์ (ToneCoaster) พร้อมเสียงนำสังเคราะห์ Sine Wave Tone Contour
5. ระบบฝึกพูดและเทียบเสียงตนเอง 2 วินาที (EchoMicRecorder) แบบ Client-side MediaRecorder
6. กระดานเปรียบเทียบเสียงคู่ก้ำกึ่ง (MinimalPairBoard) พร้อมเลย์เอาต์ Responsive รองรับจอมือถือเล็ก
7. ด่านประกอบร่างอักษรจีน (RadicalPuzzle) หมวดนำมนุษย์และธรรมชาติ พร้อม Mnemonic ภาพจำช่วยจำ
8. บัตรเกียรติยศส่งต่อความสำเร็จ (MilestonePassportModal) เรนเดอร์ Canvas 2D คมชัด 1080x1440px ส่งออกเป็น PNG หรือแชร์ผ่าน Web Share API

---

## 📂 2. ไฟล์ที่ส่งมอบ (Delivered Files)
- [x] `[NEW]` `src/components/layout/WelcomeModal.tsx`
- [x] `[NEW]` `src/components/layout/VoiceHealthModal.tsx`
- [x] `[NEW]` `src/components/layout/MilestonePassportModal.tsx`
- [x] `[NEW]` `src/engines/audio/voiceHealthEngine.ts`
- [x] `[NEW]` `src/hooks/useVoiceHealth.ts`
- [x] `[NEW]` `src/components/games/ToneCoaster.tsx`
- [x] `[NEW]` `src/components/games/EchoMicRecorder.tsx`
- [x] `[NEW]` `src/components/games/MinimalPairBoard.tsx`
- [x] `[NEW]` `src/components/games/RadicalPuzzle.tsx`
- [x] `[NEW]` `src/data/lessons/tier0/` (6 Units: `unit00_01_lips_tongue.json` ถึง `unit00_06_strokes_radicals.json`)
- [x] `[NEW]` Unit Test Suites ทั้งหมดสำหรับ Components และ Engines ใหม่ (รวม 277 Tests ผ่านครบ 100%)
- [x] `[MODIFY]` `src/App.tsx` (เชื่อมต่อ First-run Onboarding, Voice Health Check และ Grand Boss Passport Modal)

---

## 📋 3. รายการสิ่งที่ดำเนินการแล้ว (Completed Work)
- [x] พัฒนา WelcomeModal รองรับการจดจำเส้นทางที่ผู้เรียนเลือกและส่งผลต่อสถานะ Onboarding ใน Progress Schema
- [x] ออกแบบระบบตรวจคุณภาพเสียงภาษาจีนแบบ 3-Tier Zero-MP3 Cascade แนะนำวิธีติดตั้งเสียงของแต่ละ OS ได้แม่นยำ
- [x] บรรจุบทเรียน 6 Units ตามหลักสูตรพินอินแม่บท ตรวจสอบวรรณยุกต์และคำแปลไทย 100%
- [x] พัฒนา ToneCoaster มินิเกมรถไฟเหาะเชื่อมต่อ Web Audio Sine Wave Tone Contour ลากเสียงตามระดับจริง
- [x] พัฒนา EchoMicRecorder รองรับการบันทึกเสียงผู้เรียนและเล่นเสียง Native สลับอัตโนมัติ
- [x] พัฒนา RadicalPuzzle ถอดรหัสอักษรจีนด้วยแนวคิดบล็อกเลโก้ และอธิบายเคล็ดวิชาหลบขีด (Spatial Yielding)
- [x] พัฒนา MilestonePassportModal พร้อมตรายางประทับหยกแดงน้องกระต่ายทู่ทู่และปุ่มแชร์รูปภาพ
- [x] ทดสอบการทำงานในโหมด Safe Practice Zone ยืนยันไม่มีการหักหัวใจใน Tier 0 ทั้งหมด

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [x] **Pedagogical Checked:** ตัวอักษรจีน, พินอิน, กฎผันเสียง 3+3 (`ní hǎo`) และ Half-3 ถูกต้อง 100%
- [x] **Voice Health Resilience:** ตรวจสอบได้แม้ไม่มีชุดเสียงจีน และมีระบบสังเคราะห์ความถี่เสียงสำรองอัตโนมัติ
- [x] **Zero Heart Penalty:** ตอบผิดในเกมและบทเรียน Tier 0 ทั้งหมด ไม่เสียหัวใจ
- [x] **Responsive Mobile Layout:** แสดงผลสวยงามบนหน้าจอแคบตั้งแต่ 360px ขึ้นไป
- [x] **Automated Tests:** ผ่านครบ 277 tests โดยไม่มี error ใดๆ

---

## 📝 5. บันทึกผลการส่งมอบ (Sign-Off Notes)
- ปิดเฟส Phase 4 สำเร็จสมบูรณ์ ผู้เรียนเริ่มต้นจากศูนย์สามารถเรียนรู้พินอิน ออกเสียง และจบหลักสูตรต้นกล้าเพื่อพร้อมก้าวเข้าสู่ Tier 1 ได้อย่างมั่นใจ
