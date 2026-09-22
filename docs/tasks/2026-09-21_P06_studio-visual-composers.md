---
task_id: "TASK-603"
title: "Phase 6 Slice 6.3: Studio Visual Composer UI (Vocab, Dialogue & Quiz Forms)"
type: "FEATURE"
phase: "P06"
created_at: "2026-09-21"
updated_at: "2026-09-22"
status: "DONE"
priority: "HIGH"
assignee: "web_dev"
reviewer: "pedagogical_qa"
related_plan: "docs/plan/phase_06_content_authoring_studio.md"
---

# 📋 [TASK-603] Studio Visual Composer UI (Vocab, Dialogue & Quiz Forms)

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `web_dev` & `ux_ui_designer` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

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
- [x] `[NEW]` `src/components/studio/StudioLayout.tsx`
- [x] `[NEW]` `src/components/studio/LessonMetadataForm.tsx`
- [x] `[NEW]` `src/components/studio/VocabComposer.tsx`
- [x] `[NEW]` `src/components/studio/VocabItemCard.tsx`
- [x] `[NEW]` `src/components/studio/DialogueComposer.tsx`
- [x] `[NEW]` `src/components/studio/DialogueLineItem.tsx`
- [x] `[NEW]` `src/components/studio/QuizComposer.tsx`
- [x] `[NEW]` `src/components/studio/QuizItemCard.tsx`
- [x] `[NEW]` `src/components/studio/StudioNavbar.tsx`
- [x] `[NEW]` `src/components/studio/StudioReviewPanel.tsx`
- [x] `[NEW]` `src/components/studio/studioAudioPlayer.ts`
- [x] `[NEW]` `src/components/studio/index.ts`
- [x] `[NEW]` `src/components/studio/VocabComposer.test.tsx`
- [x] `[NEW]` `src/components/studio/DialogueComposer.test.tsx`
- [x] `[NEW]` `src/components/studio/QuizComposer.test.tsx`
- [x] `[NEW]` `src/components/studio/LessonMetadataForm.test.tsx`
- [x] `[NEW]` `src/components/studio/StudioNavbar.test.tsx`
- [x] `[NEW]` `src/components/studio/StudioLayout.test.tsx`
- [x] `[MODIFY]` `src/engines/pinyin/pinyinUtils.ts` (Contextual umlauts, neutral tones 0/5, punctuation detach/attach)
- [x] `[MODIFY]` `src/engines/pinyin/pinyinUtils.test.ts` (Edge-case tests)
- [x] `[MODIFY]` `src/App.tsx` (Studio view integration & lazy loading)

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [x] ออกแบบและพัฒนา `StudioNavbar` พร้อมสถานะ Draft Status (บันทึกแล้ว / กำลังพิมพ์)
- [x] พัฒนา `LessonMetadataForm` พร้อมการตรวจสอบรหัส ID ให้ตรงตามรูปแบบ `tierX_uYY_lZZ`
- [x] พัฒนา `VocabComposer` เชื่อมต่อกับ `studioLinterEngine` เพื่อแสดงป้ายเตือนสีส้มเมื่อพบคำที่มี Tone Sandhi หรือคำเตือนสีแดงเมื่อพบตัวเต็ม
- [x] พัฒนา `DialogueComposer` พร้อมรองรับการเพิ่มบรรทัดบทพูดแบบ Dynamic
- [x] พัฒนา `QuizComposer` พร้อมระบบสร้างคำตอบหลอก (Distractors generator helper)
- [x] เขียน Unit Tests สำหรับคอมโพเนนต์ฟอร์ม ตรวจสอบว่า Event การพิมพ์และเพิ่มข้อมูลทำงานถูกต้อง

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [x] **Mobile-First & Desktop Friendly:** สลับแท็บและพิมพ์ฟอร์มได้สะดวกทั้งบนหน้าจอคอมพิวเตอร์และมือถือ
- [x] **Instant Feedback:** เมื่อพิมพ์พินอินหรือคำจีนที่มีข้อผิดพลาด ต้องแสดงคำเตือนทางภาษาศาสตร์แบบ Inline ทันที
- [x] **Accessibility:** รองรับการใช้คีย์บอร์ด Tab/Enter ในการสลับช่องกรอกและปุ่มกด
- [x] **TypeScript Clean:** คอมไพล์ผ่าน 100% ไร้ข้อผิดพลาด (`tsc --noEmit` exit 0, zero `any`)
- [x] **Deterministic Unit Tests:** 6/6 test files (23 tests) passed in `src/components/studio/`; 36/36 test files (520 tests) passed across codebase
- [x] **Bundle Verification:** Studio chunk lazy-loaded as code-split bundle (26.49 kB gzipped, 0 KB initial impact)
