# 📋 Hanzero Web App: Step-by-Step Execution Plan

> 💡 **หมายเหตุสำคัญ:** เพื่อให้การพัฒนาและการตรวจสอบคุณภาพ (Quality Assurance & Verification) ทำได้อย่างรัดกุมและเป็นรูปธรรม แผนงานการพัฒนา Hanzero ได้ถูกแบ่งออกเป็น **8 เฟสย่อยอย่างละเอียด** พร้อมเกณฑ์การตรวจรับงาน (Acceptance Criteria) แยกรายไฟล์ สามารถเข้าดูแผนปฏิบัติการฉบับเต็มได้ที่:
> 
> * 🗺️ **ภาพรวมและยุทธศาสตร์การตรวจรับงาน:** [docs/plan/README.md](file:///c:/DevProjects/hanzero/hanzero/docs/plan/README.md)
> * ⚙️ **Phase 1: Foundations & Core Engines:** [phase_01_web_foundation_engines.md](file:///c:/DevProjects/hanzero/hanzero/docs/plan/phase_01_web_foundation_engines.md)
> * 📖 **Phase 2: Unit 1 Complete Experience:** [phase_02_unit1_lesson_experience.md](file:///c:/DevProjects/hanzero/hanzero/docs/plan/phase_02_unit1_lesson_experience.md)
> * 🎮 **Phase 3: Gamification & SRS System:** [phase_03_gamification_srs.md](file:///c:/DevProjects/hanzero/hanzero/docs/plan/phase_03_gamification_srs.md)
> * 🌱 **Phase 4: Tier 0 Pinyin Mastery:** [phase_04_tier0_pinyin_mastery.md](file:///c:/DevProjects/hanzero/hanzero/docs/plan/phase_04_tier0_pinyin_mastery.md)
> * 🌿 **Phase 5: Tier 1 Content Rollout:** [phase_05_tier1_content_rollout.md](file:///c:/DevProjects/hanzero/hanzero/docs/plan/phase_05_tier1_content_rollout.md)
> * 🛠️ **Phase 6: Content Authoring Studio:** [phase_06_content_authoring_studio.md](file:///c:/DevProjects/hanzero/hanzero/docs/plan/phase_06_content_authoring_studio.md)
> * 🎋 **Phase 7: Tier 2 Traveler Quest:** [phase_07_tier2_traveler_quest.md](file:///c:/DevProjects/hanzero/hanzero/docs/plan/phase_07_tier2_traveler_quest.md)
> * 🐉 **Phase 8: Tier 3-4 Advanced Immersion:** [phase_08_tier3_4_advanced_immersion.md](file:///c:/DevProjects/hanzero/hanzero/docs/plan/phase_08_tier3_4_advanced_immersion.md)

---

## 🗺️ สรุปกรอบการทำงานเบื้องต้น (Historical Summary)


### 📍 Step 1: สรุป Tech Stack & สถาปัตยกรรม Zero-Cost (Tech Decisions)
- [ ] **1.1 ยืนยัน Frontend Stack:**
  - Build Tool: Vite + React + TypeScript (น้ำหนักเบา HMR รวดเร็ว)
  - Styling: Modern Oriental Vanilla CSS (CSS Variables) ไม่ต้องใช้ Tailwind/Framework หนักๆ
  - Chinese Libraries: `hanzi-writer` (ฝึกคัดอักษรจีน), `pinyin-pro` (ประมวลผลพินอิน)
- [ ] **1.2 ยืนยัน Audio Architecture (สายฟรี 0 บาท):**
  - Chinese Speech: Web Speech Synthesis API (`zh-CN`, ปรับ speed ได้ 0.75x - 1.0x) ฟรี ไม่จำกัดโควตา
  - Sound Effects: Web Audio API Oscillator (สังเคราะห์เสียงไม้ไผ่กระทบ, มาริมบา, ป๊อป) 0 KB network
- [ ] **1.3 ยืนยันระบบ Storage & Deployment:**
  - Local Data: `LocalStorage` + `IndexedDB` (Offline-First 100%)
  - Hosting / CI/CD: GitHub Pages ผ่าน GitHub Actions (`.github/workflows/deploy.yml`)

---

### 📍 Step 2: โครงสร้างโปรเจกต์ & Design System (Scaffolding & Styles)
- [ ] **2.1 สร้างโปรเจกต์ตั้งต้น (Vite + React + TS):**
  - สร้างไฟล์กำหนดค่า: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`
  - ติดตั้ง Dependencies: `lucide-react`, `pinyin-pro`, `hanzi-writer`
- [ ] **2.2 จัดระเบียบโครงสร้างโฟลเดอร์:**
  ```text
  src/
  ├── assets/          # SVG, ไอคอน, สัญลักษณ์มงคล
  ├── components/      # UI components (Header, Nav, Card, Modal)
  │   ├── common/      # ปุ่มกดสปริง, Badge, HeartMeter, ProgressBar
  │   ├── lesson/      # DialoguePlayer, VocabCard, ToneBoard
  │   └── hanzi/       # HanziWriterBox
  ├── engines/         # โมดูลคำนวณและระบบเบื้องหลัง
  │   ├── audio/       # audioEngine.ts (TTS + SFX Synth)
  │   └── srs/         # srsEngine.ts (SM-2 / Leitner)
  ├── data/            # คลังข้อมูลบทเรียนและคำศัพท์ JSON
  ├── styles/          # index.css, variables.css, animations.css
  ├── types/           # TypeScript interfaces (Lesson, Vocab, UserState)
  ├── App.tsx          # Main Application Entry & Views
  └── main.tsx
  ```
- [ ] **2.3 กำหนด Design Tokens & ฟอนต์ (`src/styles/index.css`):**
  - นำเข้าฟอนต์: `Prompt` (ไทย), `LXGW WenKai` / `Noto Sans SC` (จีน), `Inter` (อังกฤษ/ตัวเลข)
  - Color Palette:
    - Primary Jade: `#10B981` (เขียวหยก)
    - Accent Ochre: `#F59E0B` (ดินเผา/ทองคำอบอุ่น)
    - Imperial Vermilion: `#EF4444` (แดงชาดสำหรับหัวใจ/แต้มสำคัญ)
    - Rice Paper (Light): `#FDFBF7` / Ink Stone (Dark): `#12161A`
  - Micro-interactions: แอนิเมชันปุ่มกดเด้งดึ๋ง, รางเรืองแสง, การ์ดมีมิติ
- [ ] **2.4 สร้าง App Shell:**
  - Header: สถานะไฟ Streak 🔥, หัวใจ Hearts ❤️, แต้ม XP ⭐, ปุ่มสลับ Dark/Light Theme
  - Bottom Navigation Bar สำหรับจอมือถือ (Home / Learn / Practice / Profile)
  - Layout Container ที่ปรับขนาดพอดีทั้งมือถือและจอคอม

---

### 📍 Step 3: ระบบเสียงสองประสาน (Audio Engine Module)
- [ ] **3.1 โมดูล `src/engines/audio/audioEngine.ts`:**
  - ฟังก์ชัน `speakChinese(text: string, rate: number = 0.85)`
  - ค้นหาเสียงจีนกลาง (`zh-CN`, `cmn-Hans-CN`)
  - ฟังก์ชัน `speakWordWithPinyin(hanzi: string, pinyin: string)`
- [ ] **3.2 สังเคราะห์ SFX ด้วย Web Audio API (0 KB):**
  - `playClickSound()`: ไม้ไผ่กระทบ (Bamboo Block)
  - `playSuccessChime()`: มาริมบาคอร์ดเสียงใสเมื่อตอบถูก
  - `playErrorSound()`: เสียง Thud นุ่มนวลเมื่อตอบผิด
  - `playLevelUp()`: เสียง Fanfare จบด่าน
- [ ] **3.3 คอมโพเนนต์ทดสอบเสียง (`AudioTestPanel.tsx`):**
  - ปุ่มทดสอบเสียงคำศัพท์ "你好", "谢谢", "汉字"
  - ปุ่มทดสอบเสียงเอฟเฟกต์ทั้งหมดเพื่อยืนยันว่าทำงานได้ 100%

---

### 📍 Step 4: คลังบทเรียนและการ์ดคำศัพท์ (Bite-sized Lesson Player)
- [ ] **4.1 เชื่อมต่อข้อมูลบทเรียน JSON (Unit 1: การทักทาย):**
  - นำเข้าข้อมูลจาก `data/lessons/tier1/unit01_greetings.json`
  - กำหนด Interface สำหรับ `Dialogue`, `Vocabulary`, `GrammarBite`
- [ ] **4.2 การ์ดคำศัพท์ Flashcard 3 ภาษา:**
  - แสดงอักษรจีนตัวโต พินอิน วรรณยุกต์กำกับสี คำแปลไทย-อังกฤษ
  - ปุ่มกดฟังเสียงทันที
  - ภาพจำช่วยจำ (Visual Mnemonic)
  - การแตะเพื่อพลิกการ์ด 3D ดูตัวอย่างประโยค
- [ ] **4.3 ตัวเล่นบทสนทนา (Interactive Dialogue Player):**
  - แชตสลับฝั่ง A - B สไตล์แชตโมเดิร์น
  - แตะเพื่อฟังเสียงทีละประโยค พร้อมไฮไลต์คำที่กำลังพูด

---

### 📍 Step 5: มินิเกม & ระบบคัดอักษรจีน (Hanzi Writer & Tone Trainer)
- [ ] **5.1 ฝึกคัดอักษรจีน (`HanziWriterBox.tsx`):**
  - แอนิเมชันสาธิตเส้นขีดทีละเส้น (Stroke Animation)
  - โหมดฝึกเขียน (Stroke Quiz Mode) รองรับนิ้วสัมผัสบนมือถือ
  - การให้คะแนนความแม่นยำและปลดล็อกดาว
- [ ] **5.2 กระดานฝึกวรรณยุกต์ 4 เสียง (Tone Trainer):**
  - กราฟิกคลื่นเสียง 4 วรรณยุกต์ (1: ราบเรียบ, 2: ชันขึ้น, 3: โค้งต่ำแล้วขึ้น, 4: ดิ่งลง)
  - ปุ่มฟังเทียบเสียงคำเดียวกันใน 4 วรรณยุกต์
  - มินิเกมฟังแล้วเลือกวรรณยุกต์ที่ถูกต้อง

---

### 📍 Step 6: ระบบบันทึกสถานะผู้เรียน & นำขึ้น GitHub Pages
- [ ] **6.1 ระบบบันทึกความก้าวหน้า (User State & Offline Storage):**
  - จัดเก็บสถิติลง `localStorage`: Streak, Hearts, XP, คำศัพท์ที่เรียนแล้ว
  - ระบบ Spaced Repetition (SRS) พื้นฐานคำนวณรอบทบทวน
- [ ] **6.2 ตั้งค่า GitHub Pages & CI/CD Workflow:**
  - กำหนด Base Path ใน `vite.config.ts` ให้ตรงกับ Subpath ของ GitHub Repo (`/hanzero/`)
  - สร้างไฟล์ `.github/workflows/deploy.yml` เพื่อ Build และ Deploy ไปยัง GitHub Pages อัตโนมัติเมื่อ push สู่ main branch
- [ ] **6.3 ตรวจสอบและส่งมอบ Web App ใช้งานจริง:**
  - เข้าถึงผ่าน URL จริง เช่น `https://<github-user>.github.io/hanzero/`
  - ทดสอบการใช้งานบนมือถือจริง (Responsive & Touch Test)

---

### 📍 Step 7: Content Authoring Studio & Community Pipeline (Phase 6)
- [ ] **7.1 Visual Lesson Studio GUI (`/studio`):**
  - ตัวสร้างบทเรียนแบบ Zero-Backend พร้อม Live Phone Preview
  - รองรับการกรอกข้อมูล 3 ภาษา (จีน-ไทย-อังกฤษ), การ์ดคำศัพท์, บทสนทนา และแบบฝึกหัด
- [ ] **7.2 Pedagogical Linters & Auto-Tone Engine:**
  - แปลงพินอินตัวเลขเป็น Tone Marks อัตโนมัติ (`ni3hao3` ➔ `nǐhǎo`)
  - ตรวจจับ Tone Sandhi (3+3, bù, yī, half-third tone) และตรวจสอบเส้นขีด `hanzi-writer`
- [ ] **7.3 1-Click Export & GitHub PR Engine:**
  - ส่งออก JSON ตามสเปก หรือเปิด Pull Request ผ่าน Octokit Client-side โดยไม่ต้องแตะ Command Line

---

### 📍 Step 8: Tier 2 Content Rollout & HSR Metro Quest Map (Phase 7)
- [ ] **8.1 ระบบบทสนทนาแตกกิ่ง (Branching Dialogue Engine):**
  - โมดูล `InteractiveScenarioPlayer.tsx` พร้อมระบบคะแนนความพึงพอใจของ NPC (Patience Bar)
- [ ] **8.2 วิดเจ็ตไวยากรณ์เชิงโครงสร้าง (Grammar Slot Builder):**
  - คอมโพเนนต์ต่อบล็อกประโยค 把, 被, และคำเสริมบอกทิศทาง/ผลลัพธ์ (Directional & Resultative Complements)
- [ ] **8.3 แผนที่การเดินทางรถไฟความเร็วสูง (HSR Quest Map):**
  - เดินทางข้ามเมืองใหญ่ ปลดล็อกสถานีและตั๋วรถไฟความเร็วสูงประทับตรา
- [ ] **8.4 ปล่อยเนื้อหา Units 11 ถึง 25 (60 บทย่อย):**
  - สแกนจ่าย, สั่งเดลิเวอรี่, รถไฟความเร็วสูง, เช่าห้อง, หาหมอ ฯลฯ

---

### 📍 Step 9: Tier 3-4 Advanced Immersion & Fluency Tools (Phase 8)
- [ ] **9.1 Smart Immersion Reader:**
  - ระบบตัดคำภาษาจีนบน Client-side ด้วย `Intl.Segmenter` แตะดูคำแปลและบันทึกเข้า SRS ได้ทันที
- [ ] **9.2 成语 Dilemma Engine:**
  - เรียนรู้ที่มาสุภาษิตจีนผ่านมินิสตอรี่และการตัดสินใจในบริบทการทำงาน
- [ ] **9.3 Native Speed Audio Ladder:**
  - ฝึกฟังเสียง Native ความเร็ว 0.8x ➔ 1.0x ➔ 1.25x พร้อมโหมด Commute Podcast
- [ ] **9.4 ปล่อยเนื้อหา Units 26 ถึง 57 (128 บทย่อย):**
  - ครอบคลุมการเจรจาธุรกิจ, สัญญา, วัฒนธรรม, วรรณกรรมจีนโบราณ (文言虚词) และ Grand Capstone

