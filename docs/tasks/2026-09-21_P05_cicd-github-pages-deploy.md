---
task_id: "TASK-505"
title: "Phase 5 Slice 5.5: CI/CD Pipeline Automation & Production Launch (GitHub Pages)"
type: "FEATURE"
phase: "P05"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "TODO"
priority: "HIGH"
assignee: "technical_qa"
reviewer: "web_dev"
related_plan: "docs/plan/phase_05_tier1_content_rollout.md"
---

# 📋 [TASK-505] Phase 5 Slice 5.5: CI/CD Pipeline Automation & Production Launch (GitHub Pages)

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `technical_qa` | **ผู้ตรวจรับ:** `web_dev`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
สร้างระบบ Automation สำหรับ Deploy ขึ้น GitHub Pages ฟรี 100% ผ่าน GitHub Actions พร้อมประตูตรวจคุณภาพ 4 ด่าน (Automated Quality Gate):
1. **GitHub Actions Workflow (`.github/workflows/deploy.yml`):**
   - Stage 1: TypeScript Check (`tsc --noEmit`)
   - Stage 2: Curriculum Lint (`npm run validate:curriculum`)
   - Stage 3: Vitest Unit & Engine Tests (`npm test`)
   - Stage 4: Playwright E2E Smoke Tests (`npm run test:e2e`)
   - Stage 5: Production Build & Deploy to GitHub Pages (รันเฉพาะเมื่อทุก Stage ผ่าน)
2. **Production Hosting Config:** ปรับแต่ง `vite.config.ts` (Base path `/hanzero/` หรือ custom domain) และระบบ SPA 404 Redirect
3. **Social & Sharing Metadata:** ปรับปรุง OpenGraph และ Twitter Cards ใน `index.html` เพื่อให้พรีวิวรูปบัตรเกียรติยศสวยงามเมื่อแชร์ลง Social Media

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [ ] `[NEW]` `.github/workflows/deploy.yml`
- [ ] `[MODIFY]` `vite.config.ts` (Base path & build chunks)
- [ ] `[MODIFY]` `index.html` (OpenGraph / Social meta tags)
- [ ] `[NEW]` `public/404.html` (SPA fallback redirect)

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] สร้างไฟล์ Workflow `.github/workflows/deploy.yml`
- [ ] ตั้งค่าสิทธิ์ `pages: write` และ `id-token: write` ใน GitHub Actions
- [ ] ปรับแก้ `vite.config.ts` ให้รองรับ production base path
- [ ] ใส่ OpenGraph tags สำหรับชื่อแอป, คำโปรย, และไอคอนน้องกระต่ายทู่ทู่
- [ ] ทดสอบสร้าง Production Build ในเครื่อง ยืนยัน Service Worker และ Assets โหลดครบถ้วน

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **4-Stage Gate Passes:** ผ่านทุกการตรวจสอบทั้ง Type, Curriculum, Unit Tests, และ E2E Smoke
- [ ] **Zero-Cost Deployment:** ใช้งานบน GitHub Pages ฟรี 100% โดยไม่ต้องพึ่ง Server ภายนอก
- [ ] **SPA Direct Refresh:** เข้า URL ลึก หรือรีเฟรชหน้าแล้วไม่เกิด Error 404
- [ ] **Rich Social Preview:** ทดสอบ URL Debugger แล้วภาพปกและคำบรรยายแสดงผลถูกต้อง

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *จะระบุรายละเอียดระหว่างการลงมือพัฒนา*
