---
task_id: "TASK-806"
title: "Voice Pitching & Shadowing 2.0, Immersion Hub & 4-Tier Playwright E2E Suite"
type: "FEATURE"
phase: "P08"
created_at: "2026-09-23"
updated_at: "2026-09-23"
status: "TODO"
priority: "HIGH"
assignee: "web_dev"
reviewer: "technical_qa"
related_plan: "docs/plan/phase_08_tier3_4_advanced_immersion.md"
---

# 📋 [TASK-806] Voice Pitching & Immersion Hub + E2E Suite

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `technical_qa` & `test_automation_engineer`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
พัฒนาระบบวิเคราะห์เสียงพูดนำเสนอ แดชบอร์ดศูนย์กลางการเรียนรู้ขั้นสูง และชุดทดสอบ E2E อัตโนมัติปิดท้าย Phase 8:
1. **Voice Pitching & Shadowing 2.0 (`src/components/voice/VoicePitchingRecorder.tsx`):**
   - ขยายขีดความสามารถ Echo Mic รองรับการอัดเสียงยาว 15–30 วินาที ด้วย Web MediaRecorder API
   - แอนิเมชันแสดงคลื่นเสียงสด (Real-time Audio Waveform Visualizer บน Canvas 60fps)
   - ด่านจำลอง Mini Business Pitch: ซ้อมพูดแผนธุรกิจ 30 วินาทีพร้อมจับเวลาและแสดงคีย์เวิร์ด
   - ระบบ Phrase-by-phrase Comparison: เล่นเทียบเสียงผู้เรียนกับเจ้าของภาษาเป็นท่อนๆ
2. **Immersion Hub (`src/components/layout/ImmersionHub.tsx`):**
   - ศูนย์รวมการเรียนรู้ระดับ Tier 3 และ Tier 4: คลังบทความ (Article Library), หอเกียรติยศสำนวนจีน (Idiom Hall of Fame), สถานีพอดแคสต์ (Podcast Station)
   - สลับแท็บระหว่าง Tier 3 (Master) และ Tier 4 (Legend)
3. **Playwright E2E Test Suite (`e2e/tier3_4_advanced_immersion.spec.ts`):**
   - ทดสอบ Flow การใช้งานทั้งหมด: เข้าอ่านบทความ, แตะดูคำแปลด้วย `Intl.Segmenter`, เพิ่มคำเข้า SRS, เล่นด่านทดสอบ成语, สลับความเร็วเสียง Audio Ladder, และอัดเสียงใน Voice Pitching
4. **4-Tier QA Sign-off:** ตรวจสอบ TypeScript, Vitest, Bundle Budget, และ Pedagogical Checks ครบ 100%

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `src/components/voice/VoicePitchingRecorder.tsx`
- [ ] `[TEST]` `src/components/voice/VoicePitchingRecorder.test.tsx`
- [ ] `[NEW]` `src/components/layout/ImmersionHub.tsx`
- [ ] `[TEST]` `src/components/layout/ImmersionHub.test.tsx`
- [ ] `[MODIFY]` `src/App.tsx` (ผสาน ImmersionHub ผ่าน Code-splitting)
- [ ] `[NEW]` `e2e/tier3_4_advanced_immersion.spec.ts`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] พัฒนาคอมโพเนนต์ `VoicePitchingRecorder.tsx`:
  - จัดการ MediaRecorder, Blob audio, AudioContext Visualizer
  - เครื่องเล่นเทียบเสียง 2 ช่อง (User vs Native)
  - Memory cleanup คืนไมโครโฟนเมื่อ Unmount
- [ ] พัฒนาคอมโพเนนต์ `ImmersionHub.tsx`:
  - เลย์เอาต์ Modern Scholar UI พร้อมแอนิเมชันเปิดแท็บ
  - เชื่อมโยงเข้ากับ `ImmersionArticleReader`, `IdiomExplorer`, และ `PodcastPlayerSheet`
- [ ] ผสาน `ImmersionHub` เข้ากับ `App.tsx` ด้วย `React.lazy`
- [ ] เขียน Vitest Component Tests สำหรับ Recorder และ Hub
- [ ] เขียน Playwright E2E Test Suite ใน `e2e/tier3_4_advanced_immersion.spec.ts`
- [ ] รันการตรวจสอบ 4-Tier QA Matrix และบันทึกผลการปิด Phase 8

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **Mic Teardown Clean:** ไมโครโฟนปิดสนิทหลังเลิกใช้งาน ไม่มีไฟเตือนสีส้มค้างบนเบราว์เซอร์
- [ ] **Canvas 60fps:** การวาดคลื่นเสียงไม่กระตุก และล้าง Animation Frame เสมอ
- [ ] **Playwright E2E Passing:** E2E Scenarios ผ่าน 100% บน Chromium
- [ ] **Bundle Budget Compliant:** Lazy-loaded Chunks ไม่ทำให้ Initial Bundle ใหญ่เกินงบ
- [ ] **TypeScript Clean:** `tsc --noEmit` Exit Code 0 ไร้ Type Error

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *ต้องขอ Permissions ไมโครโฟนอย่างสุภาพ พร้อมคำแนะนำกรณีผู้ใช้ปฏิเสธการเข้าถึงไมค์*
