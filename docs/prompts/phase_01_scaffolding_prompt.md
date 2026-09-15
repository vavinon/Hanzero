# 🛠️ Master Prompt: Hanzero Phase 1.1 - Project Scaffolding & Code Quality

เอกสารนี้เก็บ **Prompt แม่แบบฉบับสมบูรณ์** สำหรับสั่งการ AI Agent หรือใช้เป็นคู่มือดำเนินงานสำหรับ **Phase 1: หมวดที่ 1 (Project Scaffolding, PWA & Code Quality Tooling)** ของแพลตฟอร์ม **Hanzero (ฮั่นซีโร่)** ตามมาตรฐานใน `AGENTS.md` และ `docs/plan/phase_01_web_foundation_engines.md`

---

## 📋 Prompt สั่งการ (Copy นำไปใช้งานได้ทันที)

```markdown
# 🛠️ Task: Hanzero Phase 1.1 - Project Scaffolding, PWA & Quality Tooling

## 🎯 Role & Objective
คุณคือ "Senior Frontend Platform Engineer & Tech Lead" ของโปรเจกต์ Hanzero
ภารกิจคือตั้งค่าโครงสร้างโปรเจกต์เริ่มต้น (Scaffolding) ด้วย **Vite + React + TypeScript + PWA + Vitest** ในโฟลเดอร์ปัจจุบันให้สมบูรณ์ 100% ตามข้อกำหนดใน `AGENTS.md` และ `docs/plan/phase_01_web_foundation_engines.md`

---

## 🛡️ Critical Constraints & Safety Rules (กฎความปลอดภัยขั้นสูงสุด)
1. **ห้ามแตะต้องหรือลบไฟล์เดิมเด็ดขาด:** โฟลเดอร์ `.git/`, `docs/`, `data/`, `assets/`, `scripts/` ต้องคงอยู่ครบถ้วน 100%
2. **Zero `any` in TypeScript:** เปิดใช้งาน `strict: true` ใน `tsconfig.json` และห้ามใช้ type `any`
3. **Path Alias Support:** ตั้งค่า Path Alias ให้ `@/*` ชี้ไปที่ `./src/*` ทั้งใน `tsconfig.json` และ `vite.config.ts`
4. **Offline PWA Ready:** ตั้งค่า `vite-plugin-pwa` ให้รองรับ standalone mode พร้อมแคช asset พื้นฐาน และระบุไอคอนแอปเป็น **"น้องกระต่ายหูตกทู่ทู่ (Tutu 兔兔 🐰)"**
5. **Precision Scaffolding:** สร้างไฟล์กำหนดค่าทีละไฟล์อย่างประณีต ไม่รันคำสั่งล้างโฟลเดอร์

---

## 📦 Required Packages Specification

### 1. Production Dependencies:
- `react`: ^18.3.1 (หรือ ^19)
- `react-dom`: ^18.3.1 (หรือ ^19)
- `lucide-react`: ไอคอนสไตล์มินิมอล
- `pinyin-pro`: ระบบประมวลผล แปลง และจัดกลุ่มพินอิน
- `hanzi-writer`: ระบบแอนิเมชันและตรวจลำดับขีดตัวอักษรจีน
- `idb-keyval`: Lightweight IndexedDB Storage สำหรับ Safari Offline Mirror

### 2. Dev & Tooling Dependencies:
- `typescript`, `@types/react`, `@types/react-dom`, `@types/node`
- `vite`, `@vitejs/plugin-react`, `vite-plugin-pwa`
- `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`
- `eslint`, `prettier`

---

## 📋 Action Checklist ที่ต้องทำให้เสร็จสมบูรณ์

### Step 1: Configuration Files
- [ ] สร้าง `package.json` พร้อม Scripts: `dev`, `build`, `lint`, `test`, `preview`
- [ ] สร้าง `tsconfig.json` และ `tsconfig.node.json` (ตั้งค่า `@/*` path alias, strict mode)
- [ ] สร้าง `vite.config.ts` (กำหนด React plugin, `@` alias, Base path สำหรับ GitHub Pages, และการตั้งค่า PWA Manifest)
- [ ] สร้าง `index.html` (ตั้งค่า Meta Viewport, Title "Hanzero - เริ่มจาก 0 สู่ภาษาจีนคล่องตัว", นำเข้า Google Fonts 3 ภาษา: Prompt, Noto Sans SC, Inter)
- [ ] สร้าง `vitest.config.ts` (หรือผสานใน `vite.config.ts`) สำหรับรัน Unit Tests ด้วย JSDOM Environment

### Step 2: Directory Architecture ตาม AGENTS.md
สร้างโครงสร้างโฟลเดอร์ภายใต้ `src/`:
```text
src/
├── assets/          # สำหรับ SVG/Brand Assets (ดึงรูปจาก assets/brand/)
├── components/      # UI components
│   ├── common/      # ปุ่มกดสปริง, Badge, HeartMeter, ProgressBar
│   ├── layout/      # Header, BottomNav, Viewport Container
│   ├── lesson/      # VocabCard, ToneBoard
│   ├── test-panels/ # Developer Sandboxes (AudioTestPanel, EngineTestPanel)
│   └── hanzi/       # HanziWriterBox
├── engines/         # Pure TS Logic (Audio, Pinyin, SRS) ห้ามมี JSX
│   ├── audio/
│   ├── pinyin/
│   └── srs/
├── data/            # Local data bridge
├── hooks/           # Custom React Hooks
├── types/           # TypeScript strict types
└── styles/          # index.css (Modern Oriental Design Tokens)
```

### Step 3: Minimal Smoke Test
- [ ] สร้าง `src/main.tsx` และ `src/App.tsx` แสดงหน้า Welcome ทดสอบว่า React mount สำเร็จและโหลดฟอนต์ 3 ภาษาถูกต้อง
- [ ] สร้าง Unit Test ตัวอย่าง `src/engines/smoke.test.ts` เพื่อทดสอบว่า Vitest รันผ่าน 100%

---

## 🚦 Definition of Done (DoD)
1. ติดตั้ง Packages สำเร็จ ไม่มีข้อขัดแย้งของ Dependency
2. รัน `npm run build` หรือ `npx tsc --noEmit` ผ่าน 100% ไร้ Type Error
3. รัน `npm test` แล้ว Unit Test ตัวอย่างผ่านสำเร็จ
4. ข้อมูลเดิมใน `docs/`, `data/`, `assets/`, `scripts/` อยู่ครบถ้วน ปลอดภัย 100%
```
