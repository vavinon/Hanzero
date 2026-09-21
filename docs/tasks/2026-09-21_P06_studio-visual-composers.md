---
task_id: "TASK-603"
title: "Phase 6 Slice 6.3: Studio Visual Composer UI (Vocab, Dialogue & Quiz Forms)"
type: "FEATURE"
phase: "P06"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "TODO"
priority: "HIGH"
assignee: "web_dev"
reviewer: "pedagogical_qa"
related_plan: "docs/plan/phase_06_content_authoring_studio.md"
---

# 📋 [TASK-603] Studio Visual Composer UI (Vocab, Dialogue & Quiz Forms)

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `web_dev` & `ux_ui_designer` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
สร้าง UI Components สำหรับหน้าจอ Authoring Studio ภายใต้ธีมสุนทรียภาพ **Modern Oriental Minimalism** เน้นความใช้งานง่าย ฟอร์มกรอกที่กระชับ และมีระบบช่วยเหลือการพิมพ์ภาษาจีน (Pedagogical Inline Assistance):
1. **Studio Header & Step Navigator:** แถบนำทางขั้นตอนการแต่งบทเรียน (1. ข้อมูลทั่วไป ➔ 2. คำศัพท์ ➔ 3. บทสนทนา ➔ 4. แบบฝึกหัด ➔ 5. ตรวจทาน & ส่งออก) พร้อมปุ่ม Reset, Load Template, และ Save
2. **Lesson Metadata Form:** กำหนด Tier (0-4), Unit Number, Lesson Index, ชื่อบทเรียนภาษาไทย จีน และอังกฤษ
3. **Vocab Composer:**
   - เพิ่ม/ลบ/สลับตำแหน่งการ์ดคำศัพท์
   - กล่องพิมพ์ Pinyin อัจฉริยะ (กด Spacebar/Tab เพื่อแปลงตัวเลขเป็นวรรณยุกต์อัตโนมัติ)
   - ตัวเลือกลำดับขีดและ Radical แนะนำ
   - ปุ่มกดทดสอบฟังเสียง TTS ทันที
4. **Dialogue Composer:**
   - สร้างบทสนทนาระหว่างตัวละคร A และ B
   - เลือก Avatar / บทบาท (เช่น ครู, พนักงาน, นักท่องเที่ยว)
   - แปลง Pinyin และคำแปลภาษาไทยอัตโนมัติ
5. **Quiz Composer:**
   - ฟอร์มสร้างข้อสอบ 4 ประเภทหลัก: Multiple Choice, Hanzi Stroke Order, Sentence Scramble, Tone Discrimination
   - เครื่องมือ Balance Guard: ตรวจสอบความถูกต้องของคำตอบที่ถูกต้อง และป้องกันการเอียงของข้อเฉลย

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `src/components/studio/StudioLayout.tsx`
- [ ] `[NEW]` `src/components/studio/LessonMetadataForm.tsx`
- [ ] `[NEW]` `src/components/studio/VocabComposer.tsx`
- [ ] `[NEW]` `src/components/studio/DialogueComposer.tsx`
- [ ] `[NEW]` `src/components/studio/QuizComposer.tsx`
- [ ] `[NEW]` `src/components/studio/StudioNavbar.tsx`
- [ ] `[NEW]` `src/components/studio/VocabComposer.test.tsx`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] ออกแบบและพัฒนา `StudioNavbar` พร้อมสถานะ Draft Status (บันทึกแล้ว / กำลังพิมพ์)
- [ ] พัฒนา `LessonMetadataForm` พร้อมการตรวจสอบรหัส ID ให้ตรงตามรูปแบบ `tierX_uYY_lZZ`
- [ ] พัฒนา `VocabComposer` เชื่อมต่อกับ `studioLinterEngine` เพื่อแสดงป้ายเตือนสีส้มเมื่อพบคำที่มี Tone Sandhi หรือคำเตือนสีแดงเมื่อพบตัวเต็ม
- [ ] พัฒนา `DialogueComposer` พร้อมรองรับการเพิ่มบรรทัดบทพูดแบบ Dynamic
- [ ] พัฒนา `QuizComposer` พร้อมระบบสร้างคำตอบหลอก (Distractors generator helper)
- [ ] เขียน Unit Tests สำหรับคอมโพเนนต์ฟอร์ม ตรวจสอบว่า Event การพิมพ์และเพิ่มข้อมูลทำงานถูกต้อง

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **Mobile-First & Desktop Friendly:** สลับแท็บและพิมพ์ฟอร์มได้สะดวกทั้งบนหน้าจอคอมพิวเตอร์และมือถือ
- [ ] **Instant Feedback:** เมื่อพิมพ์พินอินหรือคำจีนที่มีข้อผิดพลาด ต้องแสดงคำเตือนทางภาษาศาสตร์แบบ Inline ทันที
- [ ] **Accessibility:** รองรับการใช้คีย์บอร์ด Tab/Enter ในการสลับช่องกรอกและปุ่มกด
- [ ] **TypeScript Clean:** คอมไพล์ผ่าน 100% ไร้ข้อผิดพลาด
