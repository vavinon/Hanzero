---
task_id: "TASK-605"
title: "Phase 6 Slice 6.5: Zero-Token Git Hand-off, PR Template & Playwright E2E Suite"
type: "FEATURE"
phase: "P06"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "DONE"
priority: "HIGH"
assignee: "technical_qa"
reviewer: "technical_qa"
related_plan: "docs/plan/phase_06_content_authoring_studio.md"
---

# 📋 [TASK-605] Zero-Token Git Hand-off, PR Template & Playwright E2E Suite

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `technical_qa` & `web_dev` | **ผู้ตรวจรับ:** `technical_qa` & `red_team_adversary`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
พัฒนาระบบส่งออกและเชื่อมต่อ GitHub แบบปลอดภัยไร้ความเสี่ยง (Zero-Token Git Hand-off) พร้อมติดตั้งชุดทดสอบอัตโนมัติ End-to-End ครบวงจรสำหรับ Studio:
1. **1-Click JSON Download:** ปุ่มดาวน์โหลดไฟล์ JSON ที่ถูกฟอร์แมตและตรวจสอบแล้วด้วยชื่อไฟล์มาตรฐาน เช่น `unit11_scan_pay.json` พร้อมนำไปวางใน `src/data/lessons/tier1/` หรือ `tier2/`
2. **Zero-Token PR Template Generator:**
   - สร้าง Markdown Template สำเร็จรูปสำหรับเปิด GitHub Issue / Pull Request
   - บรรจุข้อมูล Meta, สรุปคำศัพท์ใหม่, อัตราส่วน Interleaving, และ Code Block ของ JSON
   - มีปุ่ม "📋 คัดลอก Pull Request Template" ให้ผู้ร่วมพัฒนาสามารถนำไปเปิด PR บน GitHub ได้ทันทีโดยไม่ต้องป้อน Token ใดๆ ลงในเบราว์เซอร์
3. **Playwright E2E Authoring Suite (`e2e/studio.spec.ts`):**
   - Scenario 1: เปิดหน้า Studio ➔ สร้างบทเรียนใหม่ ➔ กรอกคำศัพท์ ➔ ยืนยัน Pinyin Auto-converter
   - Scenario 2: สร้างควิซ ➔ ทดลองตอบใน Live Preview Frame ➔ ตรวจสอบความถูกต้อง
   - Scenario 3: สลับไป Export ➔ กด Download JSON ➔ ตรวจสอบว่าไฟล์ผ่าน `validateCurriculum.ts`
   - Scenario 4: รีเฟรชเบราว์เซอร์ ➔ ข้อมูลในดราฟต์ต้องกลับมาครบถ้วน 100% (Draft Recovery)
4. **Red Team Chaos & Security Guard:**
   - ทดสอบนำเข้าไฟล์ JSON ที่มีโครงสร้างผิดปกติ หรือมีการแทรกสคริปต์ XSS (`<script>alert(1)</script>`) ต้องถูก Sanitize และไม่แครช
   - ตรวจสอบประสิทธิภาพ Bundle Size ว่าหน้า Studio ไม่ทำให้ Production Bundle ของผู้เรียนบวม

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [x] `[NEW]` `src/engines/studio/gitHandoff.ts` (Pure engine สำหรับสร้าง PR Template, sanitize markdown, และตั้งชื่อไฟล์มาตรฐาน)
- [x] `[NEW]` `src/engines/studio/gitHandoff.test.ts` (10/10 Unit tests ผ่าน 100%)
- [x] `[NEW]` `src/components/studio/GitExportModal.tsx` (Zero-Token Export UI พร้อม Copy PR, Raw JSON, Download Blob และ Keyboard Accessibility)
- [x] `[NEW]` `src/components/studio/GitExportModal.test.tsx` (5/5 Unit tests ผ่าน 100%)
- [x] `[NEW]` `e2e/studio.spec.ts` (5 Playwright E2E Scenarios ครอบคลุม Desktop, Android, และ iPhone SE)
- [x] `[MODIFY]` `src/components/studio/StudioNavbar.tsx` & `StudioReviewPanel.tsx` (ปุ่มเปิด Export Modal)
- [x] `[MODIFY]` `src/components/studio/StudioLayout.tsx` (เชื่อมต่อ GitExportModal และปรับ Drawer Alignment)
- [x] `[MODIFY]` `src/components/layout/DevStorageDrawer.tsx` (เพิ่มปุ่มลัด `Open Authoring Studio`)
- [x] `[MODIFY]` `src/App.tsx` (รองรับ Direct Navigation ผ่าน `?view=studio` และบายพาส WelcomeModal)

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [x] พัฒนา `GitExportModal` แสดงผล JSON Code Block พร้อมปุ่มดาวน์โหลดและปุ่มคัดลอก PR Description
- [x] ผสานฟังก์ชันตรวจผ่านสคริปต์ `validateCurriculum.ts` เข้ากับผลลัพธ์การ Export
- [x] เพิ่ม Route / View `'studio'` ใน `src/App.tsx` เพื่อให้สามารถเข้าถึงผ่าน URL Param `?view=studio` หรือคลิกจาก `DevStorageDrawer`
- [x] เขียน E2E Test Scenarios ด้วย Playwright (`e2e/studio.spec.ts`) ครอบคลุมทั้ง Desktop และ Mobile Viewport
- [x] รันการทดสอบความปลอดภัยและการฟื้นฟูข้อมูลดราฟต์ (Chaos & Resilience Test)

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [x] **E2E Tests Pass:** รัน `npx playwright test e2e/studio.spec.ts` ผ่าน 15/15 scenarios (Desktop Chrome, Mobile Android, Mobile iPhone SE)
- [x] **Curriculum Schema 100%:** ไฟล์ JSON ที่ดาวน์โหลดออกมาและ Tier 1 Curriculum ทั้งหมดรันผ่าน `npm run validate:curriculum -- --strict` 100%
- [x] **Zero-Leak Guarantee:** ไม่มีการส่งข้อมูล Token หรือประวัติการแก้ไขออกนอกเครื่องผู้ใช้ (Zero-Token Client-side only)
- [x] **Bundle Budget Compliance:** สตูดิโอถูกทำ Code-splitting / Lazy load (StudioLayout chunk 36.08 KB gzipped; Student app bundle 62.8 KB <= 100 KB budget)
- [x] **TypeScript & Linter Clean:** `npm run lint` ไร้ Type Error และ `npm test` ผ่าน 548/548 tests (40 test files)

---

## 🎖️ 5. รายงานผลการตรวจรับ (QA Sign-Off)
1. **Technical QA:** ผ่านการตรวจรับความปลอดภัย โค้ดถูกแยกเป็นสัดส่วน (Pure Engine vs Presentation UI) ตามหลัก Zero-UI และ Strict TypeScript (0 any)
2. **Red Team Adversary:** ผ่านการทดสอบ XSS Payload Injection ใน Title/Vocabulary, Draft Crash Resilience ใน LocalStorage, และ UI Rendering บนหน้าจอแคบ (320px iPhone SE)
3. **Test Automation Engineer:** ชุดทดสอบ Vitest และ Playwright E2E ทำงานสมบูรณ์แบบทั้ง 3 เบราว์เซอร์โปรไฟล์
