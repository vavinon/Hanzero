---
task_id: "TASK-300"
title: "Phase 3 Gamification, Safe Practice Zone & SRS Persistence"
type: "FEATURE"
phase: "P03"
created_at: "2026-09-20"
updated_at: "2026-09-20"
status: "DONE"
priority: "HIGH"
assignee: "web_dev"
reviewer: "technical_qa"
related_plan: "docs/plan/phase_03_gamification_srs.md"
---

# 📋 [TASK-300] Phase 3 Gamification, Safe Practice Zone & SRS Persistence

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `technical_qa` & `gamification_designer`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
สร้างระบบแรงจูงใจ แผนที่การเรียนรู้ (Quest Map), ระบบเศรษฐกิจเกมที่มี Safe Practice Zone ถนอมใจผู้เรียน, และเครื่องยนต์ทบทวนคำศัพท์อัจฉริยะ Spaced Repetition (SRS) พร้อมระบบสำรองข้อมูลข้ามเครื่อง:
1. แผนที่เส้นทางการเรียนรู้สไตล์ Modern Oriental พร้อมระบบสถานะด่าน (QuestMap)
2. แดชบอร์ดผู้เรียน (HeaderBar) ติดตาม Streak, XP, และหัวใจ 5 ดวง (Safe Practice Zone ไม่หักหัวใจใน Tier 0 และ SRS)
3. ระบบ Daily Goals (5/10/15 นาที) และหน้าสรุปผลประจำวัน (DailyCompletionModal)
4. เครื่องยนต์ทบทวนคำศัพท์ SuperMemo SM-2 Engine พร้อมเพดานทบทวนสูงสุด 20 คำ/วัน (Daily Cap) และระบบกู้วิกฤตการ์ดค้าง (Backlog Triage)
5. หน้าจอทบทวนคำศัพท์สไตล์การ์ด 3D พร้อม Dock ปุ่มประเมิน 4 ระดับ (ReviewDeck)
6. ระบบบันทึกสถานะคู่ขนาน LocalStorage + IndexedDB Mirror พร้อมระบบสำรองกู้คืนข้อมูล 1-Click JSON และ Quick Sync Code

---

## 📂 2. ไฟล์ที่ส่งมอบ (Delivered Files)
- [x] `[NEW]` `src/engines/srs/srsEngine.ts` (Pure TypeScript SM-2 Calculator)
- [x] `[NEW]` `src/engines/srs/srsEngine.test.ts` (Unit Tests 20/20 Passed)
- [x] `[NEW]` `src/hooks/useUserState.ts` (State Management & Dual-Storage Sync)
- [x] `[NEW]` `src/hooks/useUserState.test.tsx` (Unit Tests 7/7 Passed)
- [x] `[NEW]` `src/components/layout/QuestMap.tsx`
- [x] `[NEW]` `src/components/layout/HeaderBar.tsx`
- [x] `[NEW]` `src/components/layout/DailyCompletionModal.tsx`
- [x] `[NEW]` `src/components/srs/ReviewDeck.tsx`
- [x] `[NEW]` `src/types/srs.ts`
- [x] `[NEW]` `src/types/user.ts`
- [x] `[MODIFY]` `src/App.tsx` (เชื่อมต่อ Router View: Map / Lesson / Review)

---

## 📋 3. รายการสิ่งที่ดำเนินการแล้ว (Completed Work)
- [x] พัฒนา `srsEngine.ts` คำนวณช่วงวัน Interval, Ease Factor (EF) ตามสมการ SM-2 ขอบเขต $[1.3, 2.5]$
- [x] ออกแบบอัลกอริทึม Daily Review Cap จำกัดไม่เกิน 20 คำต่อวัน ป้องกัน Cognitive Overload
- [x] ออกแบบ Backlog Triage แบ่งจ่ายคำค้างทบทวนวันละ 10 คำ เมื่อผู้เรียนห่างหายไปนาน
- [x] พัฒนา `useUserState.ts` รองรับระบบ Persistent Storage, IndexedDB Cold Mirror และ Ghost-State Overwrite Guard
- [x] พัฒนา QuestMap รองรับการสลับมุมมอง Tier 0 และ Tier 1 มีสถานะ Locked / Active / Completed / Boss
- [x] พัฒนา HeaderBar รองรับ Mobile 360px Responsive Rule ย่อหัวใจเป็น `❤️ x 5` เมื่อจอกว้าง $\le 380\text{px}$
- [x] บูรณาการระบบ Safe Practice Zone ยืนยันไม่ตัดหัวใจใน Tier 0 และ SRS Review

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [x] **TypeScript Clean:** รัน `tsc --noEmit` ผ่าน 100% ไร้ข้อผิดพลาด Type
- [x] **Unit Tests Passed:** ชุดทดสอบ SM-2 Engine และ useUserState ผ่านครบ 100%
- [x] **Safe Practice Verified:** ตอบผิดในโหมดทบทวนและ Tier 0 หัวใจไม่ลดลงแม้แต่ดวงเดียว
- [x] **Anti-Overload Tested:** จำนวนคิวการ์ดทบทวนต่อวันถูกจำกัดไว้ที่ 20 คำอย่างเข้มงวด
- [x] **IndexedDB Mirror Tested:** ข้อมูลใน LocalStorage ซิงก์ลง IndexedDB ถูกต้อง และกู้คืนได้เมื่อแคชถูกล้าง

---

## 📝 5. บันทึกผลการส่งมอบ (Sign-Off Notes)
- ปิดเฟส Phase 3 สำเร็จสมบูรณ์ ทุกคอมโพเนนต์ผ่านเกณฑ์การตรวจรับ พร้อมรองรับบทเรียน Tier 0 และ 1
