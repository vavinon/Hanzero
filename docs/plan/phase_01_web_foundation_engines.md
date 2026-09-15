# ⚙️ Phase 1: Web Foundation, Design System, PWA & Pure Engines

เอกสารแผนปฏิบัติการและรายการตรวจสอบอย่างละเอียดสำหรับ **Phase 1** ของการพัฒนา Hanzero: วางโครงสร้างโปรเจกต์ ระบบ PWA แคชออฟไลน์ ระบบการออกแบบ (Design Tokens & Font Subsetting) และเครื่องยนต์เบื้องหลังพร้อมระบบสำรอง (Audio Resilience Engine พร้อม Static Audio Pack และ IndexedDB Mirror)

---

## 🎯 เป้าหมายของ Phase 1
สร้างรากฐาน Web Application ที่รวดเร็ว ลื่นไหล สไตล์ Modern Oriental ป้องกันปัญหาข้อมูลหายบน Safari ด้วย PWA/IndexedDB มีระบบเสียงสองประสาน (SFX/TTS) ที่มี Static Audio Pack สำรองสำหรับ Tier 0 และระบบคัดอักษรจีนที่ปลอดภัยจาก Memory Leak ก่อนเริ่มนำเข้าเนื้อหาบทเรียน

---

## 📋 แผนงานปฏิบัติการย่อย (Actionable Checklist)

### 1. โครงสร้างโปรเจกต์และการกำหนดค่า (Project Scaffolding & Code Quality)
- [x] ติดตั้งโปรเจกต์ด้วย Vite + React + TypeScript:
  - สร้าง `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`
- [x] ตั้งค่า Code Quality & Test Tooling:
  - ติดตั้ง `eslint`, `prettier` และ `vitest` สำหรับ Automated Unit Testing
  - กำหนด npm scripts: `npm run lint`, `npm test`
- [x] ติดตั้ง PWA & Offline Support:
  - ติดตั้ง `vite-plugin-pwa`
  - กำหนดค่า `manifest.json` (ชื่อแอป Hanzero, สี ธีม Modern Oriental, ไอคอนน้องกระต่ายหูตกทู่ทู่ (Lop-eared Bunny Tutu), display: standalone)
  - ตั้งค่า Service Worker ให้แคช Static Assets และ Audio
- [x] ติดตั้ง Dependencies จำเป็น (Zero-cost & น้ำหนักเบา):
  - `lucide-react` (ไอคอนมินิมอล)
  - `pinyin-pro` (ระบบประมวลผลและแปลงพินอิน)
  - `hanzi-writer` (ระบบแอนิเมชันและตรวจลำดับขีดตัวอักษรจีน)
  - `idb-keyval` (หรือ lightweight IndexedDB helper สำหรับ Dual Storage)
- [x] สร้างโครงสร้างไดเรกทอรีมาตรฐานตาม `AGENTS.md`:
  ```text
  src/
  ├── assets/          # SVG, ไอคอน และ static audio tier 0
  │   └── audio/tier0/ # Static audio fallback สำหรับ Tier 0 (~2MB)
  ├── components/      # UI components (common, layout, hanzi, test)
  ├── engines/         # audio (audioEngine.ts), srs, storage
  ├── data/            # data/lessons/
  ├── hooks/           # useAudio, useTheme, useUserState
  ├── styles/          # index.css, variables.css, animations.css
  ├── types/           # interfaces
  ├── App.tsx
  └── main.tsx
  ```

### 2. ระบบการออกแบบและสไตล์ (Design Tokens, Font Subsetting, Accessible Tones & 360px Layout)
- [ ] นำเข้าฟอนต์พรีเมียม 3 ภาษา พร้อมกลยุทธ์ Font Subsetting & Legibility Fallback:
  - ภาษาไทย: `Prompt` หรือ `Noto Sans Thai`
  - ภาษาจีน: **Dual Chinese Font Strategy**:
    - `LXGW WenKai` (KaiTi ลายมือพู่กันบรรจง) สำหรับตัวอักษรขนาดใหญ่ (`--font-hanzi-hero`, `--font-hanzi-card`)
    - `Noto Sans SC` (HeiTi โกธิคเส้นสม่ำเสมอ) เป็น Fallback อัตโนมัติสำหรับตัวอักษรขนาดเล็ก (<32px) ปุ่มควิซ และอุปกรณ์ความละเอียดต่ำ (Low-DPI) เพื่อป้องกันเส้นขีดเบลอ/แตก
    - ใช้กลยุทธ์ **Google Fonts Dynamic Slice** หรือตัด Subset เฉพาะ HSK 1–3 ไม่โหลดไฟล์เต็ม 30MB
  - สากล: `Inter` / `Outfit`
- [ ] กำหนดมาตรฐานขนาดตัวอักษรจีนและพินอิน (Hanzi & Pinyin Legibility Tokens):
  - `--font-hanzi-hero: 3.5rem` (56px) สำหรับหน้าเรียนคัดลายมือ
  - `--font-hanzi-card: 2.25rem` (36px) ขั้นต่ำสำหรับการ์ดคำศัพท์
  - `--font-hanzi-quiz: 1.75rem` (28px) ขั้นต่ำสำหรับปุ่มควิซ
  - `--font-pinyin-body: 1.25rem` (20px) พร้อม **`line-height: 1.5` ขึ้นไปเสมอ** เพื่อป้องกันการตัดหัววรรณยุกต์ (Diacritic Clipping) เช่น `ǚ`, `ǎ`
- [ ] กำหนด CSS Variables ที่ผ่านเกณฑ์ความเปรียบต่างสากล (WCAG AA Accessible Palette):
  - Primary Jade Accent: `#10B981` (สำหรับปุ่ม/ไฮไลต์พื้นหลังเข้ม)
  - **Text-Safe Dark Jade:** `#047857` (Contrast Ratio > 5.1:1 บน Rice Paper สำหรับข้อความ/ไอคอน)
  - Accent Ochre: `#F59E0B` (สำหรับแบดจ์/แถบความก้าวหน้า)
  - **Text-Safe Dark Ochre:** `#B45309` (Contrast Ratio > 4.8:1 บน Rice Paper สำหรับข้อความ/สัญลักษณ์)
  - Text-Safe Vermilion: `#DC2626` (Contrast Ratio > 5.0:1)
  - Backgrounds: Rice Paper `#FDFBF7` (โหมดสว่าง) / Ink Stone `#12161A` (โหมดมืด)
  - **Accessible Dual-Encoded Tones:** กำหนดคลาสแสดงวรรณยุกต์ที่ผสาน **สี + รูปทรงเรขาคณิต/สัญลักษณ์รูปคลื่น (¯ ˊ ˇ ˋ)** ควบคู่กันเสมอ เพื่อให้ผู้ใช้ตาบอดสี (Deuteranopia/Protanopia) แยก 4 เสียงได้อย่างแม่นยำ 100%
- [ ] กฎเลย์เอาต์สำหรับหน้าจอมือถือขนาดเล็ก (360px Small Viewport Resilience):
  - Safe Touch Target: Hitbox ปุ่มกดและตัวเลือกไม่ต่ำกว่า 44x44px ทุกจุด
  - Mobile Condensed Header: รวมกลุ่มหัวใจเป็นตัวเลขย่อ `❤️ x 5` บนจอความกว้าง < 380px ป้องกัน Header Bar ล้นจอ
  - Responsive Stacking: แผงเปรียบเทียบเสียงคู่ก้ำกึ่ง (Minimal Pairs) สลับเป็น Vertical Stack อัตโนมัติเมื่อความกว้างจอ < 400px

### 3. เครื่องยนต์เสียงสองประสานและระบบสำรอง (Audio Resilience Engine)
- [ ] สร้าง `src/engines/audio/audioEngine.ts`:
  - **Singleton AudioContext & Lifecycle Manager:**
    - สร้าง instance เดียว ปลดล็อก AudioContext ใน First Touch ของผู้เรียน (`unlockAudioContext()`)
    - **Wakeup & Auto-Resume:** ดักจับ Event `visibilitychange` และ `focus` เมื่อผู้เรียนปลดล็อกหน้าจอหรือสลับแท็บกลับมา หากพบ `audioContext.state === 'suspended'` ให้สั่ง `.resume()` ทันที ป้องกันเสียงใบ้
  - **Chinese Speech (TTS) & Queue Stuck Watchdog:**
    - ใช้งาน `window.speechSynthesis` ค้นหาเสียง `zh-CN` / `cmn-Hans-CN` อัตโนมัติ ปรับ Speed ได้ (0.75x - 1.0x)
    - เรียก `window.speechSynthesis.cancel()` เพื่อรีเซ็ตคิวเสียงที่ค้างอยู่ก่อนสั่ง `speak()` ทุกครั้ง ป้องกันบั๊กคิวเสียงค้างบน iOS/Mobile
    - **Speech GC Bug Workaround & Keep-Alive:** เก็บ Reference ของ `SpeechSynthesisUtterance` ใน Module Set เพื่อแก้ปัญหา Garbage Collector ตัดเสียงกลางประโยค
    - **Fallback Timeout Watchdog (3 วินาที):** หาก TTS ไม่ตอบสนองภายใน 3 วินาที ให้สลับไปเล่นเสียงจาก Static Audio Pack หรือ Web Audio Sine Wave ชี้แนะโทนเสียงแทนอัตโนมัติ
  - **Pre-rendered Tier 0 Static Audio Pack (~2MB):** ฟังก์ชัน `playPhonemeAudio(code)` ดึงไฟล์เสียงคนจริงที่แคชไว้ใน PWA มาเล่นทันทีเมื่อไม่มี Native Chinese TTS
  - **Sound Effects (0 KB Network):** สังเคราะห์เสียงผ่าน Web Audio API Oscillator (`playClick()`, `playCorrect()`, `playIncorrect()`, `playFanfare()`)
  - **Graceful Tone Fallback:** สังเคราะห์คลื่น Sine Wave ชี้แนะระดับเสียงวรรณยุกต์ (Tone Contour) เมื่อไม่มีเสียงคนจริง
  - **In-App Browser Detector:** ตรวจจับหากรันอยู่ใน WebView ของ LINE / Facebook / WeChat และแสดงแบนเนอร์แนะนำให้ "เปิดด้วยเบราว์เซอร์ปกติ (Safari / Chrome)" เพื่อให้ใช้งานเสียงและไมโครโฟนได้ลื่นไหล 100%

### 4. ระบบจัดเก็บข้อมูลสำรองแบบแบ่งชั้น (Tiered Storage Engine: Hot LocalStorage + Cold IndexedDB)
- [ ] สร้าง `src/engines/storage/storageEngine.ts`:
  - **Persistent Storage Request:** เรียกใช้งาน `navigator.storage.persist()` อัตโนมัติเมื่อเปิดแอป เพื่อขอสิทธิ์ป้องกัน Safari ITP และระบบประหยัดพลังงานของ OS ล้างข้อมูลทิ้งหลังไม่ได้เปิด 7 วัน
  - **Hot Tier:** บันทึก State สรุปย่อลง `LocalStorage` (`hanzero_user_state_v1` < 50KB) สำหรับ Fast Boot / Zero UI Flash
  - **Cold Tier:** บันทึกก้อนข้อมูลใหญ่ลง `IndexedDB` (`srs_records` รองรับ 5,000+ คำ, `hanzi_strokes` แคชเส้นขีด)
  - **Dual Mirror & Auto-Migration:** ซิงก์สำรองอัตโนมัติระหว่าง LocalStorage และ IndexedDB พร้อมฟังก์ชันย้าย Schema ป้องกันจอขาว
  - **Backup & Portability:**
    - 1-Click JSON Full Snapshot (Export / Import)
    - **Emergency Quick Sync String (URL Hash / Text Code):** สร้างรหัสสตริงความก้าวหน้าขนาดกะทัดรัด (เช่น `HZ1-U05-S14-X1200`) ที่ผู้เรียนสามารถคัดลอกส่งเข้า LINE/Notes ของตนเองได้ใน 1 วินาที
    - เตรียมพร้อมสำหรับ Compressed Base64 QR Sync

### 5. โมดูลคัดอักษรจีน (Hanzi Writer Component)
- [ ] สร้าง `src/components/hanzi/HanziWriterBox.tsx` & `src/engines/hanzi/strokeDataLoader.ts`:
  - **On-Demand Stroke Caching:** ใช้ Custom `charDataLoader` ตรวจสอบและดึงข้อมูลเส้นขีดจาก IndexedDB ก่อน หากไม่มีจึง Fetch และบันทึกลง IndexedDB อัตโนมัติ (ไม่ Bundling ข้อมูลขีด 6MB ล่วงหน้า)
  - โหมดสาธิต: แอนิเมชันวาดเส้นขีดทีละเส้นตามลำดับถูกต้อง (Animated Stroke Order)
  - โหมดฝึกเขียน: ระบบลากเส้นด้วยเมาส์หรือนิ้วสัมผัส พร้อมการตรวจจับลำดับขีดผิด/ถูก
  - ตารางคัดจีน (Grid Lines): สไตล์ช่องตารางแบบ米字格 (Mǐzìgé) หรือ 田字格 (Tiánzìgé)
  - **Canvas & DOM Cleanup:** เคลียร์ Container, Event Listeners และ Animation Frame เมื่อ Unmount หรือสลับการ์ดเพื่อป้องกัน Memory Leak 100%

### 6. แผงควบคุมและทดสอบระบบ (Engine Test Panel)
- [ ] สร้างหน้าจอทดสอบ `src/components/test/EngineTestPanel.tsx`:
  - ตรวจสอบและแสดงรายชื่อ Voice Pack ภาษาจีนในเครื่อง
  - ปุ่มทดสอบเสียง TTS, การตัดคำยาว (GC Bug Test) และปุ่มทดสอบ Static Audio Pack ของ Tier 0
  - ปุ่มทดสอบ iOS First Touch Audio Unlock และ SFX Oscillators
  - **ปุ่มทดสอบ AudioContext Lifecycle Resume:** จำลองการสลับแท็บ/พักหน้าจอแล้วกลับมาตรวจสอบสถานะเสียง
  - ปุ่มทดสอบ Dual Tiered Storage (อ่าน/เขียน Hot LocalStorage และ Cold IndexedDB) พร้อมสถานะ `navigator.storage.persist()`
  - ปุ่มทดสอบคัดอักษรจีนและตรวจสอบ IndexedDB Stroke Cache
  - ปุ่มทดสอบ Responsive Layout 360px (Header Condensing & Contrast Check)

---

## 🔍 รายการตรวจรับงานและทดสอบคุณภาพ (Verification & Acceptance Criteria)

| จุดตรวจสอบ | วิธีการทดสอบ (How to Verify) | เกณฑ์การผ่าน (Acceptance Criteria) |
| :--- | :--- | :--- |
| **1. Zero Latency Audio & Resume** | กด SFX รัวๆ สลับแท็บไปหน้าอื่น 10 วินาที แล้วกลับมากดใหม่ | เสียงดังทันที (<5ms) และกลับมาดังต่อเนื่องอัตโนมัติ ไม่ค้างในสถานะ suspended |
| **2. TTS Voice & Queue Stuck Safety** | รัวปุ่มออกเสียงประโยคยาวบน Safari/Mobile แล้วกดย่อแอป | เสียงไม่ตัดกลางคัน และเมื่อกลับมาคิวเสียงไม่ค้าง สามารถพูดคำใหม่ได้ทันที |
| **3. iOS Touch Audio Unlock** | ทดสอบบน Safari มือถือ (iOS) | เสียงต้องเล่นได้ตั้งแต่การกดปุ่มแรก ไม่ถูก Autoplay Policy บล็อก |
| **4. PWA & Offline Ready** | เปิด DevTools โหมด Offline แล้วรีเฟรชหน้าเว็บ | หน้าเว็บโหลดขึ้นสมบูรณ์โดยไม่ขึ้นหน้าไดโนเสาร์ และ Service Worker Active |
| **5. Storage Resilience & Persist** | ตรวจสอบผ่าน DevTools `navigator.storage.persisted()` | ส่งคืนค่า `true` และข้อมูล Hot/Cold Mirror สอดคล้องกันทั้ง LocalStorage และ IndexedDB |
| **6. Hanzi Legibility & 360px Layout** | จำลองหน้าจอขนาด 360px กว้าง x 640px สูง ใน DevTools | Header Bar ไม่ล้นจอ (หัวใจย่อเป็นตัวเลข), ฟอนต์อ่านชัดเจนไม่แตก และตัวอักษรจีนขีดซับซ้อนอ่านออก |
| **7. Accessible Color Contrast** | ทดสอบ Text สี Jade/Ochre บนพื้นหลัง Rice Paper | ผ่านเกณฑ์ WCAG AA ขั้นต่ำ 4.5:1 สำหรับข้อความทั้งหมด |

---

## 🛑 Definition of Done (DoD) สำหรับ Phase 1
เมื่อผ่านการทดสอบทั้ง 6 ข้อในตารางข้างต้น รัน `npm test` ผ่าน และ `npm run build` สำเร็จโดยไม่มีคำเตือน Type Error จึงจะถือว่า Phase 1 เสร็จสมบูรณ์และพร้อมเข้าสู่ [Phase 2: Unit 1 Complete Experience](file:///c:/DevProjects/hanzero/hanzero/docs/plan/phase_02_unit1_lesson_experience.md)

