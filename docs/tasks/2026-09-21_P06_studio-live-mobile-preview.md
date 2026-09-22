---
task_id: "TASK-604"
title: "Phase 6 Slice 6.4: Live Interactive Mobile Device Preview & Audio Sandbox"
type: "FEATURE"
phase: "P06"
created_at: "2026-09-21"
updated_at: "2026-09-22"
status: "DONE"
priority: "HIGH"
assignee: "ux_ui_designer"
reviewer: "red_team_adversary"
related_plan: "docs/plan/phase_06_content_authoring_studio.md"
---

# 📋 [TASK-604] Live Interactive Mobile Device Preview & Audio Sandbox

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `ux_ui_designer` & `web_dev` | **ผู้ตรวจรับ:** `red_team_adversary` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
พัฒนาหน้าจอจำลองสมาร์ตโฟนแบบเรียลไทม์ (Live Interactive Mobile Frame) วางคู่ขนานกับหน้าต่างแก้ไข (Split Screen) เพื่อให้ผู้เขียนบทเรียนเห็นผลลัพธ์การเรนเดอร์จริงในทันที:
1. **Interactive Mobile Shell:** กรอบจำลองมือถือขนาดมาตรฐาน (380x740) ที่ปรับเปลี่ยนโหมดมุมมองได้ (Overview / Vocab View / Dialogue View / Quiz View / Audio Sandbox)
2. **Real Component Hot Simulation:** ดึงคอมโพเนนต์จริงของแอป ได้แก่ `VocabCard`, `DialoguePlayer`, และ `QuizContainer` มารับ Props จาก Draft State โดยตรง ข้อมูลที่พิมพ์ในฟอร์มจะปรากฏบนหน้าจอมือถือทันทีโดยไม่ต้องกดรีเฟรช
3. **In-Studio Audio Sandbox:** แผงควบคุมเสียงในตัว เพื่อทดสอบการออกเสียงภาษาจีนกลาง (`zh-CN`) ผ่าน Web Speech API พร้อมปุ่มปรับความเร็วเสียง (0.75x ช้าลงเพื่อฟังชัด / 1.0x ความเร็วปกติ) และการตรวจจับ Tone Sandhi (3+3 -> 2+3)
4. **Responsive Split Layout:**
   - หน้าจอกว้าง ($\ge 1024$px): แสดง Editor และ Mobile Frame เคียงข้างกันแบบ Split-Screen พร้อมปุ่มเปิด/ปิดกรอบพรีวิว
   - หน้าจอแคบ ($< 1024$px): มีปุ่ม Floating FAB "📱 ดูพรีวิวสด" เพื่อเปิดพรีวิวแบบ Overlay Drawer ลื่นไหล

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [x] `[NEW]` `src/components/studio/MobilePreviewFrame.tsx`
- [x] `[NEW]` `src/components/studio/AudioPreviewSandbox.tsx`
- [x] `[NEW]` `src/components/studio/MobilePreviewFrame.test.tsx`
- [x] `[NEW]` `src/components/studio/AudioPreviewSandbox.test.tsx`
- [x] `[MODIFY]` `src/components/studio/StudioLayout.tsx`
- [x] `[MODIFY]` `src/components/studio/StudioLayout.test.tsx`
- [x] `[MODIFY]` `src/components/studio/index.ts`
- [x] `[MODIFY]` `src/components/lesson/DialoguePlayer.tsx` (Null-safety guard for optional speaker name)

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [x] สร้างคอมโพเนนต์ `MobilePreviewFrame` พร้อมแถบจำลองด้านบน (Status bar 9:41, Dynamic Island, Pill Switcher)
- [x] ผูกข้อมูลการ์ดคำศัพท์สดกับ `VocabCard` พร้อม Carousel Pager สำหรับเลื่อนดูคำศัพท์ทีละใบ
- [x] ผูกข้อมูลบทสนทนากับ `DialoguePlayer` ให้สามารถกดเล่นเสียงจำลองบทสนทนาโต้ตอบได้
- [x] ผูกข้อมูลควิซกับ `QuizContainer` พร้อมปุ่มรีเซ็ตทำควิซซ้ำได้ทันที
- [x] พัฒนา `AudioPreviewSandbox` ให้ผู้เขียนพิมพ์ประโยคทดสอบและกดฟังเสียง TTS ภาษาจีนกลางได้ทันที พร้อมปุ่มปรับ 1.0x / 0.75x และตรวจจับ Tone Sandhi
- [x] เขียน Unit Tests ตรวจสอบการเรนเดอร์คอมโพเนนต์ในกรอบพรีวิว ครอบคลุม 100%

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [x] **Performance 60fps:** การพิมพ์ข้อมูลในฟอร์มไม่ทำให้กรอบพรีวิวกระตุก (Zero Lag / Pure React Rendering)
- [x] **Accurate App Parity:** หน้าจอพรีวิวแสดงผลเหมือนกับหน้าจอเรียนจริงของผู้เรียน 100% ผ่านคอมโพเนนต์แท้
- [x] **Responsive Transition:** ปรับขนาดหน้าจอจาก Desktop สู่ Tablet/Mobile ได้ลื่นไหลด้วย Pure CSS Media Queries และ Slide-over Overlay Drawer
- [x] **Red Team Resilience:** รับมือข้อมูลคำแปลยาวพิเศษ, รองรับบทเรียนที่ยังว่างเปล่า (Empty States 0 items) ด้วยกราฟิกน้องกระต่าย ไม่เกิด White Screen of Death
- [x] **TypeScript Clean:** คอมไพล์ผ่าน 100% ไร้ข้อผิดพลาด (`tsc --noEmit` exit 0, zero `any`)
- [x] **Deterministic Unit Tests:** 8/8 test files (34 tests) passed in `src/components/studio/`; 38/38 test files (533 tests) passed across codebase
- [x] **Bundle Verification:** Production build ผ่านฉลุย (`npm run build` exit 0, StudioLayout chunk 31.56 kB gzipped, 0 KB initial impact)
