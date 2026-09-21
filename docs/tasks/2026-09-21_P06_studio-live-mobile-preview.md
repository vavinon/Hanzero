---
task_id: "TASK-604"
title: "Phase 6 Slice 6.4: Live Interactive Mobile Device Preview & Audio Sandbox"
type: "FEATURE"
phase: "P06"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "TODO"
priority: "HIGH"
assignee: "ux_ui_designer"
reviewer: "red_team_adversary"
related_plan: "docs/plan/phase_06_content_authoring_studio.md"
---

# 📋 [TASK-604] Live Interactive Mobile Device Preview & Audio Sandbox

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `ux_ui_designer` & `web_dev` | **ผู้ตรวจรับ:** `red_team_adversary` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
พัฒนาหน้าจอจำลองสมาร์ตโฟนแบบเรียลไทม์ (Live Interactive Mobile Frame) วางคู่ขนานกับหน้าต่างแก้ไข (Split Screen) เพื่อให้ผู้เขียนบทเรียนเห็นผลลัพธ์การเรนเดอร์จริงในทันที:
1. **Interactive Mobile Shell:** กรอบจำลองมือถือขนาดมาตรฐาน (375x667 หรือ 390x844) ที่ปรับเปลี่ยนโหมดมุมมองได้ (Card View / Dialogue View / Quiz View)
2. **Real Component Hot Simulation:** ดึงคอมโพเนนต์จริงของแอป ได้แก่ `VocabCard`, `DialoguePlayer`, และ `QuizContainer` มารับ Props จาก Draft State โดยตรง ข้อมูลที่พิมพ์ในฟอร์มจะปรากฏบนหน้าจอมือถือทันทีโดยไม่ต้องกดรีเฟรช
3. **In-Studio Audio Sandbox:** แผงควบคุมเสียงในตัว เพื่อทดสอบการออกเสียงภาษาจีนกลาง (`zh-CN`) ผ่าน Web Speech API พร้อมปุ่มปรับความเร็วเสียง (0.75x ช้าลงเพื่อฟังชัด / 1.0x ความเร็วปกติ)
4. **Responsive Split Layout:**
   - หน้าจอกว้าง ($\ge 1024$px): แสดง Editor และ Mobile Frame เคียงข้างกันแบบ Split-Screen 50/50
   - หน้าจอแคบ ($< 1024$px): มีปุ่ม Floating FAB หรือแท็บ "📱 ดูพรีวิว" เพื่อเปิดพรีวิวแบบ Overlay Drawer

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `src/components/studio/MobilePreviewFrame.tsx`
- [ ] `[NEW]` `src/components/studio/AudioPreviewSandbox.tsx`
- [ ] `[MODIFY]` `src/components/studio/StudioLayout.tsx`
- [ ] `[TEST]` `src/components/studio/MobilePreviewFrame.test.tsx`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] สร้างคอมโพเนนต์ `MobilePreviewFrame` พร้อมแถบจำลองด้านบน (Status bar, Lesson Title, Tab Pill Switcher)
- [ ] ผูกข้อมูลการ์ดคำศัพท์สดกับ `VocabCard` แสดงผลภาพเส้นขีด Pinyin และความหมาย
- [ ] ผูกข้อมูลบทสนทนากับ `DialoguePlayer` ให้สามารถกดเล่นเสียงจำลองบทสนทนาโต้ตอบได้
- [ ] ผูกข้อมูลควิซกับ `QuizContainer` ทดลองคลิกเลือกคำตอบและตรวจสอบเอฟเฟกต์ถูก/ผิด
- [ ] พัฒนา `AudioPreviewSandbox` ให้ผู้เขียนพิมพ์ประโยคทดสอบและกดฟังเสียง TTS ภาษาจีนกลางได้ทันที
- [ ] เขียน Unit Tests ตรวจสอบการเรนเดอร์คอมโพเนนต์ในกรอบพรีวิว

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **Performance 60fps:** การพิมพ์ข้อมูลในฟอร์มไม่ทำให้กรอบพรีวิวกระตุก (Zero Lag / Pure React Rendering)
- [ ] **Accurate App Parity:** หน้าจอพรีวิวต้องแสดงผลเหมือนกับหน้าจอเรียนจริงของผู้เรียน 100%
- [ ] **Responsive Transition:** ปรับขนาดหน้าจอจาก Desktop สู่ Tablet/Mobile ได้ลื่นไหล
- [ ] **Red Team Resilience:** ทดสอบกรอกข้อความยาวมากเป็นพิเศษ (Long string overflow) กรอบมือถือต้องจัดการ Scroll ได้เหมาะสม ไม่พังเลย์เอาต์
