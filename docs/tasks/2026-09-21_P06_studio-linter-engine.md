---
task_id: "TASK-601"
title: "Phase 6 Slice 6.1: In-Browser Pedagogical Linter & Pinyin Auto-Converter Engine"
type: "FEATURE"
phase: "P06"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "DONE"
priority: "HIGH"
assignee: "web_dev"
reviewer: "pedagogical_qa"
related_plan: "docs/plan/phase_06_content_authoring_studio.md"
---

# 📋 [TASK-601] In-Browser Pedagogical Linter & Pinyin Auto-Converter Engine

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
สร้าง Pure Functional Pedagogical Linter Engine สำหรับทำงานบน Client-Side Browser ในโฟลเดอร์ `src/engines/studio/studioLinterEngine.ts` โดยแยกเป็น Pure TypeScript บริสุทธิ์ (Zero-DOM, Zero-Node.js imports เช่น `fs`/`path`):
1. **Auto Pinyin Tone Placer:** พิมพ์พินอินด้วยตัวเลขวรรณยุกต์ (เช่น `ni3hao3`, `lv4`, `nv3`) แล้วแปลงเป็นเครื่องหมายวรรณยุกต์มาตรฐานสากล (`nǐhǎo`, `lǜ`, `nǚ`) โดยวางบนสระที่ถูกต้อง ($a > o > e > i/u$)
2. **Real-time Tone Sandhi Detector:** ตรวจจับคำที่มีการผันเสียงอัตโนมัติ:
   - กฎของ `不`: เสียง 4 ชนเสียง 4 ➔ ผันเป็นเสียง 2 (`bù` + 4th tone ➔ `bú` เช่น `bú shì`)
   - กฎของ `一`: ตามด้วยเสียง 1, 2, 3 ➔ ผันเป็นเสียง 4 (`yì`); ตามด้วยเสียง 4 ➔ ผันเป็นเสียง 2 (`yí`)
   - กฎเสียง 3 ชน 3: คำสองพยางค์เสียง 3+3 ➔ พยางค์แรกผันเป็นเสียง 2 (`2+3` เช่น `nǐhǎo` ➔ `níhǎo`)
3. **Traditional Chinese & Forbidden Grammar Guard:** สกัดกั้นอักษรจีนตัวเต็ม (Traditional Variants) จาก Blacklist และตรวจจับไวยากรณ์ต้องห้าม (เช่น `不有` ➔ บังคับใช้ `没有`)
4. **Stroke Availability Check:** ตรวจสอบว่าตัวอักษรจีนที่ป้อนมีอยู่ในฐานข้อมูลเส้นขีดหรือไม่ เพื่อป้องกันปัญหาแคนวาสคัดลายมือแฮงก์

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [x] `[NEW]` `src/engines/studio/studioLinterEngine.ts` (Pure Linter & Converter Logic)
- [x] `[NEW]` `src/engines/studio/studioLinterEngine.test.ts` (100% Automated Vitest Coverage)
- [x] `[NEW]` `src/engines/studio/index.ts` (Module barrel export)

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [x] ถอดแยกฟังก์ชันจาก `scripts/lib/curriculumEngine.ts` ที่ไม่ขึ้นกับ Node `fs`/`path` มาเป็น Browser-friendly functions
- [x] พัฒนาฟังก์ชัน `convertNumericPinyinToDiacritics(input: string): string`
- [x] พัฒนาฟังก์ชัน `lintPinyinOrthography(pinyin: string): LintMessage[]`
- [x] พัฒนาฟังก์ชัน `lintToneSandhi(hanzi: string, pinyin: string): ToneSandhiHint[]`
- [x] พัฒนาฟังก์ชัน `lintTraditionalChars(text: string): TraditionalCharIssue[]`
- [x] พัฒนาฟังก์ชัน `lintGrammarRules(text: string): LintMessage[]`
- [x] เขียน Unit Tests ทดสอบเคสปกติ, เคสขอบ (Edge cases เช่น `ü`, สระเดี่ยว, สระคู่, พยางค์เดียว/หลายพยางค์) ให้ผ่าน 100%

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [x] **TypeScript Clean:** รัน `npx tsc --noEmit` ผ่าน 100% ไร้ Type Error (Zero `any`)
- [x] **Unit Tests Passed:** รัน `npm test` สำหรับ `studioLinterEngine.test.ts` ผ่าน 100% (20/20 tests passed)
- [x] **Zero DOM Dependency:** โมดูลต้องไม่มีการเรียกใช้ `window`, `document`, หรือไลบรารี Node.js
- [x] **Pedagogical QA Sign-off:** ตรวจสอบความถูกต้องของการวางวรรณยุกต์และกฎ Sandhi ครบถ้วน
