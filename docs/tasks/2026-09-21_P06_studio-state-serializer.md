---
task_id: "TASK-602"
title: "Phase 6 Slice 6.2: Studio Draft State Engine, Recovery & JSON Serialization"
type: "FEATURE"
phase: "P06"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "TODO"
priority: "HIGH"
assignee: "web_dev"
reviewer: "technical_qa"
related_plan: "docs/plan/phase_06_content_authoring_studio.md"
---

# 📋 [TASK-602] Studio Draft State Engine, Recovery & JSON Serialization

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
สร้างระบบจัดการ State แบบร่างของบทเรียน (Draft State Engine) และตัวแปลงข้อมูล JSON สำหรับ Studio:
1. **Draft Persistence & Auto-Recovery:** บันทึกสถานะการแก้ไขบทเรียน (Metadata, Vocab, Dialogue, Quiz) ลงใน LocalStorage แบบ Reactive Auto-Save ป้องกันปัญหาข้อมูลสูญหายเมื่อปิดแท็บหรือรีเฟรชหน้าเว็บโดยไม่ตั้งใจ
2. **Strict Schema Serialization:** แปลงข้อมูลจาก Form State ให้เป็นโครงสร้าง `LessonUnit` JSON ตามมาตรฐาน `src/types/lesson.ts` ที่สอดคล้องกับไฟล์บทเรียนจริงใน `src/data/lessons/`
3. **JSON File Importer:** ระบบอัปโหลด/เลือกไฟล์ JSON บทเรียนเดิม (เช่น `unit01_greetings.json`) นำเข้าสู่ Editor เพื่อแก้ไขต่อได้อย่างราบรื่น พร้อมการตรวจสอบความถูกต้องของไฟล์และแจ้งเตือนฟิลด์ที่ไม่ตรงตาม Schema
4. **Export Sanitizer:** คัดกรองช่องว่างส่วนเกิน (Trim), จัดเรียงลำดับ ID อัตโนมัติ และฟอร์แมต JSON ให้สวยงามพร้อมส่งออก

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `src/engines/studio/studioSerializer.ts` (JSON Parser, Sanitizer & Validator)
- [ ] `[NEW]` `src/engines/studio/studioSerializer.test.ts` (Unit Tests for Serialization Round-trip)
- [ ] `[NEW]` `src/hooks/useStudioDraft.ts` (React Hook สำหรับ State บทเรียนร่าง + Auto-save)
- [ ] `[NEW]` `src/hooks/useStudioDraft.test.tsx` (Hook Tests with Mock Storage)

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] นิยาม Type สำหรับ Studio Draft Model (`StudioDraftState`, `StudioVocabDraft`, `StudioQuizDraft`)
- [ ] พัฒนาฟังก์ชัน `serializeDraftToLessonUnit(draft: StudioDraftState): LessonUnit`
- [ ] พัฒนาฟังก์ชัน `parseLessonUnitToDraft(jsonString: string): { draft: StudioDraftState; errors: string[] }`
- [ ] พัฒนา Hook `useStudioDraft` พร้อม debounce auto-save ลง LocalStorage key `hanzero_studio_draft_v1`
- [ ] เพิ่มฟังก์ชัน `resetDraft()`, `loadSampleLesson(unitId: string)`, และ `exportDraftJson()`
- [ ] เขียน Unit Tests ตรวจสอบการแปลง Draft ➔ JSON ➔ Draft ให้ข้อมูลไม่สูญหายและไม่ผิดเพี้ยน

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **TypeScript Clean:** `npx tsc --noEmit` ผ่าน 100%
- [ ] **Round-Trip Fidelity:** นำเข้า Unit 1 ➔ แปลงเป็น Draft ➔ แปลงกลับเป็น JSON ต้องได้โครงสร้างและข้อมูลตรงกัน 100%
- [ ] **Crash Resilience:** ปิดหน้าเว็บขณะแก้ไขข้อมูล แล้วเปิดกลับมา ข้อมูลต้องได้รับการกู้คืนสมบูรณ์
- [ ] **Technical QA Sign-off:** ตรวจสอบความปลอดภัย ไม่ให้มีโค้ดที่ทำให้เกิด LocalStorage Quota Exceeded หรือ State ทับซ้อน
