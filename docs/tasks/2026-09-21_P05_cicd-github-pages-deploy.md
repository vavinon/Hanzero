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

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `technical_qa` | **ผู้ตรวจรับ:** `web_dev` & `red_team_adversary` | **ผ่านการ Hardening รอบที่ 2 โดย Red Team** 🛡️🔥

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
สร้างระบบ Automation สำหรับตรวจสอบคุณภาพและ Deploy ขึ้น GitHub Pages ฟรี 100% ผ่าน GitHub Actions พร้อมประตูตรวจคุณภาพ 5 ด่าน (Automated Quality Gate) และระบบป้องกันปัญหา Bundle ระเบิด / URL case-sensitivity:
1. **5-Stage Automated Quality Gate:** ทุกการ Push หรือ Pull Request เข้า `main` ต้องผ่าน TypeCheck, Curriculum Linter, Vitest, Playwright E2E Tests, และ Bundle Size Audit
2. **Automated Bundle Size Audit:** สคริปต์ตรวจขนาดไฟล์อัตโนมัติใน Pipeline (Gzipped CSS $\le 20\text{KB}$, Total Gzipped JS $\le 300\text{KB}$) พร้อมการแยก Dynamic Import ราย Unit JSON ป้องกันไฟล์หลักบวม
3. **Dynamic Base Path Configuration:** ปรับแต่ง `vite.config.ts` ให้รองรับ `process.env.VITE_BASE_PATH || '/Hanzero/'` เพื่อความยืดหยุ่นในการย้ายโดเมนหรือรันบนเคสตัวพิมพ์เล็ก
4. **Sanitized SPA 404 Routing Solution:** ติดตั้ง `public/404.html` และ Route Restoration Script ใน `index.html` พร้อมระบบป้องกัน Open-Redirect / XSS
5. **OpenGraph & Twitter Card Metadata:** ติดตั้งแท็กสำหรับพรีวิวโซเชียลมีเดียเวลาผู้เรียนแชร์ลิงก์หรือรูป Passport

---

## 📂 2. ไฟล์ที่ส่งมอบ (Delivered Files)
- [ ] `[NEW]` `.github/workflows/deploy.yml` (GitHub Actions CI/CD Pipeline)
- [ ] `[NEW]` `public/404.html` (SPA Fallback Redirect Handler with Anti-Phishing Defense)
- [ ] `[MODIFY]` `index.html` (Sanitized Route Restoration & OpenGraph Meta Tags)
- [ ] `[MODIFY]` `vite.config.ts` (Dynamic Base Path & Unit JSON Dynamic Chunking)

---

## 📋 3. สถาปัตยกรรมและรายละเอียดทางเทคนิค (Technical Specifications)

### 3.1 GitHub Actions Workflow Specification (`.github/workflows/deploy.yml`)
```yaml
name: Hanzero Quality Gate & Production Deployment

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  quality-gate:
    name: 🛡️ 5-Stage Quality Gate & Audit
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout Repository
        uses: actions/checkout@v4

      - name: 🟢 Setup Node.js 20.x
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: 📦 Install Dependencies
        run: npm ci

      - name: 🔍 Stage 1: TypeScript Strict TypeCheck
        run: npx tsc --noEmit

      - name: 📜 Stage 2: Curriculum Schema & Pedagogical Linter
        run: npm run validate:curriculum -- --strict

      - name: ⚡ Stage 3: Vitest Engine & Unit Test Suite
        run: npm test -- --run

      - name: 🎭 Cache Playwright Browser Binaries
        id: playwright-cache
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ hashFiles('package-lock.json') }}

      - name: 🌐 Install Playwright Browsers & OS Dependencies
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps chromium webkit

      - name: 🌐 Install Playwright System Dependencies (on Cache Hit)
        if: steps.playwright-cache.outputs.cache-hit == 'true'
        run: npx playwright install-deps chromium webkit

      - name: 🏗️ Build Application for E2E Preview
        run: npm run build
        env:
          VITE_BASE_PATH: /Hanzero/

      - name: 🎭 Stage 4: Playwright E2E Test Suite
        run: npx playwright test

      - name: 📊 Stage 5: Bundle Performance Budget Audit
        run: |
          echo "Auditing Production Bundle Size..."
          CSS_SIZE=$(gzip -c dist/assets/*.css | wc -c)
          echo "Total Gzipped CSS: $CSS_SIZE bytes (Budget: 20480 bytes / 20 KB)"
          if [ "$CSS_SIZE" -gt 20480 ]; then
            echo "❌ CSS Bundle Budget Exceeded: $CSS_SIZE > 20480"
            exit 1
          fi

          TOTAL_JS_SIZE=$(find dist/assets -name "*.js" -exec gzip -c {} \; | wc -c)
          echo "Total Gzipped JS: $TOTAL_JS_SIZE bytes (Budget: 307200 bytes / 300 KB)"
          if [ "$TOTAL_JS_SIZE" -gt 307200 ]; then
            echo "❌ Total JS Bundle Budget Exceeded: $TOTAL_JS_SIZE > 307200"
            exit 1
          fi
          echo "✅ All Performance Budgets Satisfied!"

      - name: 📤 Upload Playwright Report on Failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

  deploy-pages:
    name: 🚀 Deploy to GitHub Pages
    needs: quality-gate
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: 📥 Checkout Repository
        uses: actions/checkout@v4

      - name: 🟢 Setup Node.js 20.x
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: 📦 Install Dependencies
        run: npm ci

      - name: 🏗️ Production Build
        run: npm run build
        env:
          VITE_BASE_PATH: /Hanzero/

      - name: 🔧 Setup GitHub Pages SPA 404 Fallback
        run: |
          cp public/404.html dist/404.html || cp dist/index.html dist/404.html

      - name: 📤 Upload Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

      - name: 🚀 Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3.2 ป้องกัน Bundle ระเบิดด้วย Lazy Chunking (`vite.config.ts`)
เพื่อไม่ให้ไฟล์ JSON ทั้ง 10 Units ดึงขนาด Bundle เกิน 300 KB:
- แยก Chunk อัตโนมัติ: `manualChunks` แยก `vendor-react`, `vendor-hanzi`
- ไฟล์ JSON ของบทเรียนต้องถูกโหลดแบบ Dynamic Import เมื่อผู้เรียนเปิด Unit นั้นๆ

### 3.3 ระบบป้องกัน Open-Redirect ใน SPA 404
ใน `index.html` สคริปต์กู้คืน Route ต้องตรวจสอบว่า URL ที่ส่งมาไม่ขึ้นต้นด้วย `//` หรือมี Protocol ภายนอก:
```javascript
var path = l.search.slice(1);
if (path.startsWith('/') && !path.startsWith('//') && !path.includes(':')) {
  window.history.replaceState(null, null, l.pathname.slice(0, -1) + path + l.hash);
} else {
  window.history.replaceState(null, null, l.pathname);
}
```

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] Pipeline ทำงานครบทุก Stage และบล็อกการ Deploy ทันทีหากมีเทสต์ล้ม
- [ ] มีระบบ Caching สำหรับ `~/.cache/ms-playwright` ทำให้รัน E2E รวดเร็ว
- [ ] Audit ขนาดไฟล์ CSS ($\le 20\text{KB}$) และ JS ($\le 300\text{KB}$) สำเร็จ
- [ ] ทดสอบ Direct URL Refresh บน Production แล้วไม่ขึ้นหน้า 404
- [ ] ป้องกันช่องโหว่ Open-Redirect ใน SPA Script เรียบร้อย
- [ ] ทดสอบ Social Sharing Debugger (Facebook / Twitter) แล้วรูปและข้อความพรีวิวขึ้นสมบูรณ์
