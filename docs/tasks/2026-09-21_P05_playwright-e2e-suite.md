---
task_id: "TASK-504"
title: "Phase 5 Slice 5.4: Local Diagnostics & Playwright E2E Testing Suite"
type: "FEATURE"
phase: "P05"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "TODO"
priority: "HIGH"
assignee: "technical_qa"
reviewer: "red_team_adversary"
related_plan: "docs/plan/phase_05_tier1_content_rollout.md"
---

# 📋 [TASK-504] Phase 5 Slice 5.4: Local Diagnostics & Playwright E2E Testing Suite

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `technical_qa` | **ผู้ตรวจรับ:** `red_team_adversary`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
ติดตั้งระบบวัดผลผลิตภัณฑ์ในตัวเครื่อง (Local Diagnostics) และชุดทดสอบเบราว์เซอร์อัตโนมัติ (Playwright E2E Suite) เพื่อรับประกันประสบการณ์ผู้ใช้ระดับ 60fps ก่อนปล่อยสู่ Production:
1. **Zero-Cost Local Diagnostics:** บันทึกสถิตินิรนาม Top 3 จุดที่ผู้เรียนตอบผิดซ้ำบ่อย และอัตราการใช้งาน Silent Mode ลงในเครื่อง
2. **Playwright E2E Suite:** ติดตั้งและคอนฟิก `playwright.config.ts` สำหรับรันบน Headless Chromium / WebKit
3. **5 Essential User Journeys:**
   - Journey 1: First-Run Onboarding & Safe Zone (ตอบผิดใน Tier 0 หัวใจไม่ลด)
   - Journey 2: Fast-track to Tier 1 & Heart Penalty (ตอบผิดใน Tier 1 หัวใจลด)
   - Journey 3: SRS Review Loop (ทบทวนการ์ดและบันทึกลง IndexedDB)
   - Journey 4: Voice Health Alert Modal (จำลองเครื่องไร้เสียงจีน)
   - Journey 5: Small Screen 320px Squeeze (ทดสอบเลย์เอาต์หน้าจอแคบสุด)

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `playwright.config.ts`
- [ ] `[NEW]` `e2e/onboarding-safezone.spec.ts`
- [ ] `[NEW]` `e2e/tier1-lessons.spec.ts`
- [ ] `[NEW]` `e2e/srs-review.spec.ts`
- [ ] `[NEW]` `e2e/voice-health.spec.ts`
- [ ] `[NEW]` `e2e/mobile-viewport.spec.ts`
- [ ] `[MODIFY]` `package.json` (เพิ่ม dependencies & scripts: `test:e2e`)

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] ติดตั้ง `@playwright/test` ใน devDependencies
- [ ] กำหนดค่า `playwright.config.ts` สำหรับทดสอบทั้ง Desktop และ Mobile Viewport (360x640, 320x568)
- [ ] พัฒนา E2E Test ครอบคลุมครบทั้ง 5 User Journeys
- [ ] พัฒนา Local Diagnostics Service เก็บข้อมูลข้อผิดพลาดแบบนิรนาม
- [ ] ทดสอบรัน `npm run test:e2e` ยืนยันผ่าน 100%

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **100% E2E Pass:** ทุก Scenario ใน 5 User Journeys ผ่านครบถ้วน
- [ ] **No Flaky Tests:** รันซ้ำ 3 รอบไม่มีเทสต์ล้ม
- [ ] **Local Diagnostics Working:** บันทึกสถิติข้อผิดพลาดได้ถูกต้องโดยไม่ทำให้ประสิทธิภาพตก

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *จะระบุรายละเอียดระหว่างการลงมือพัฒนา*
