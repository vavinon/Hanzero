---
task_id: "TASK-602"
title: "Phase 6 Slice 6.2: Studio Draft State Engine, Recovery & JSON Serialization"
type: "FEATURE"
phase: "P06"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "DONE"
priority: "HIGH"
assignee: "web_dev"
reviewer: "technical_qa"
related_plan: "docs/plan/phase_06_content_authoring_studio.md"
---

# 📋 [TASK-602] Studio Draft State Engine, Recovery & JSON Serialization

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
สร้างระบบจัดการ State แบบร่างของบทเรียน (Draft State Engine) และตัวแปลงข้อมูล JSON สำหรับ Studio:
1. **Draft Persistence & Auto-Recovery:** บันทึกสถานะการแก้ไขบทเรียน (Metadata, Vocab, Dialogue, Quiz) ลงใน LocalStorage แบบ Reactive Auto-Save (หน่วงเวลา 1,000ms พร้อม Synchronous Flush บน `visibilitychange` และ `beforeunload`) ป้องกันปัญหาข้อมูลสูญหายเมื่อปิดแท็บหรือรีเฟรชหน้าเว็บ
2. **Strict Schema Serialization:** แปลงข้อมูลจาก Form State ให้เป็นโครงสร้าง `UnitLessonData` JSON ตามมาตรฐาน `src/types/lesson.ts` ที่สอดคล้องกับไฟล์บทเรียนจริงใน `src/data/lessons/`
3. **JSON File Importer:** ระบบอัปโหลด/เลือกไฟล์ JSON บทเรียนเดิม (เช่น `unit01_greetings.json`) นำเข้าสู่ Editor เพื่อแก้ไขต่อได้อย่างราบรื่น พร้อม Toxic JSON Defense (ตัด `__proto__`, `constructor`), ป้องกัน DoS (>2MB), ตรวจสอบความถูกต้อง และคำนวณตำแหน่ง Line/Column หากเกิด Syntax Error
4. **Export Sanitizer:** คัดกรองช่องว่างส่วนเกิน (Trim), แปลงวรรคตอนภาษาจีนเต็มรูป (`，` `。` `！` `？`), จัดเรียงลำดับ ID อัตโนมัติ, ผสาน Pinyin Tone Sandhi ('3+3') และฟอร์แมต JSON ให้สวยงามพร้อมส่งออก

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [x] `[NEW]` `src/engines/studio/studioTypes.ts` (Strict Type Definitions สำหรับ Draft State, Metadata, Validation & Errors)
- [x] `[NEW]` `src/engines/studio/studioSerializer.ts` (JSON Parser, Sanitizer, Typography Normalizer & Validator)
- [x] `[NEW]` `src/engines/studio/studioSerializer.test.ts` (13 Unit Tests: 100% Round-trip Fidelity, Toxic JSON, Typography)
- [x] `[NEW]` `src/hooks/useStudioDraft.ts` (React Reducer Hook พร้อม Cancelable Auto-save 1,000ms, Zombie Prevention & Flushes)
- [x] `[NEW]` `src/hooks/useStudioDraft.test.tsx` (10 Hook Tests: Debounce, Recovery, QuotaExceeded, Lifecycle Flushes, CRUD)

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [x] นิยาม Type สำหรับ Studio Draft Model (`StudioDraftState`, `StudioLessonDraft`, `StudioVocabDraft`, `StudioQuizDraft`) ใน `studioTypes.ts`
- [x] พัฒนาฟังก์ชัน `serializeDraftToLessonUnit(draft: StudioDraftState): UnitLessonData` พร้อม Typography Sanitizer และ Auto-Sequencing
- [x] พัฒนาฟังก์ชัน `parseLessonUnitToDraft(input: string | UnitLessonData): StudioImportResult` พร้อม Syntax Error Line/Column และ Toxic JSON Defense
- [x] พัฒนา Hook `useStudioDraft` พร้อม Cancelable debounce auto-save ลง LocalStorage key `hanzero_studio_draft_v1` และ In-Memory Fallback
- [x] เพิ่มฟังก์ชัน `resetDraft()`, `loadSampleLesson()`, `importJson()`, `exportJson()`, และ `forceSave()`
- [x] เขียน Unit Tests ตรวจสอบการแปลง Draft ➔ JSON ➔ Draft แบบ 100% Round-trip Deep Equality กับ `unit01_greetings.json` และ `unit02_numbers_time.json`

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [x] **TypeScript Clean:** `npx tsc --noEmit` ผ่าน 100% (0 Error, Zero `any`)
- [x] **Round-Trip Fidelity:** นำเข้า Unit 1 และ Unit 2 ➔ แปลงเป็น Draft ➔ แปลงกลับเป็น JSON โครงสร้างและข้อมูลตรงกัน 100%
- [x] **Crash Resilience:** ปิดหน้าเว็บขณะแก้ไขข้อมูล แล้วเปิดกลับมา ข้อมูลได้รับการกู้คืนสมบูรณ์ มี Synchronous Flush ป้องกัน Keystroke Loss
- [x] **Technical QA Sign-off:** ตรวจสอบความปลอดภัย จัดการ `QuotaExceededError` และ Safari Private Browsing โดยมี In-Memory Cache รองรับ ไม่เกิด White Screen
- [x] **Red Team Defense:** แก้ไข Zombie Overwrite Race Condition สำเร็จด้วย Cancelable Debounce และล้าง Prototype Pollution (`__proto__`) 100%
- [x] **Curriculum Linter Pass:** รัน `npm run validate:curriculum -- --strict` ผ่านฉลุย 100%
