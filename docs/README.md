# 📖 Hanzero Documentation Hub

ศูนย์รวมเอกสาร สถาปัตยกรรม และแผนปฏิบัติการทั้งหมดของแพลตฟอร์ม **Hanzero (ฮั่นซีโร่ - เว็บฝึกภาษาจีนจาก 0)**

---

## 📂 โครงสร้างโฟลเดอร์เอกสาร

```text
docs/
├── README.md                      # (หน้านี้) แผนผังและสารบัญเอกสารทั้งหมด
├── prd/                           # รายละเอียดความต้องการผลิตภัณฑ์ (PRD)
│   ├── 01_product_vision.md       # เป้าหมาย, Persona ผู้เรียน, Core Value Proposition
│   └── 02_feature_specs.md        # สเปกฟีเจอร์ละเอียด (Onboarding, Audio Fallback, Silent Mode, Safe Zone, Schema Migration)
├── curriculum/                    # โครงสร้างเนื้อหาและการเรียนการสอน
│   ├── 01_pinyin_system.md        # แม่บทระบบพินอินและการออกเสียง
│   ├── 02_radical_basics.md       # หมวดนำ 40 ตัว และ 8 เส้นขีดอักษรจีน
│   ├── 03_lesson_levels.md        # ผังด่าน/บทเรียน (Lessons Roadmap Tier 0 ถึง Tier 4)
│   └── 04_mini_games.md           # คลังการออกแบบมินิเกมการเรียนรู้ (Game Catalog)
├── architecture/                  # การออกแบบระบบและเทคโนโลยี
│   ├── tech_stack.md              # การเลือกเฟรมเวิร์ก, Audio Resilience, Hanzi Legibility, Storage Migration
│   └── data_schema.md             # โครงสร้างข้อมูลบทเรียน คำศัพท์ และ User State Schema v1
├── plan/                          # แผนการพัฒนาแบบละเอียดและ Checklist การตรวจรับงานรายเฟส
│   ├── README.md                  # สารบัญภาพรวมและยุทธศาสตร์การตรวจรับงาน (Quality Gates)
│   ├── phase_01_web_foundation_engines.md     # Phase 1: Web Foundation & Resilience Engines
│   ├── phase_02_unit1_lesson_experience.md    # Phase 2: Unit 1 Complete Experience (Vertical Slice Template)
│   ├── phase_03_gamification_srs.md           # Phase 3: Gamification, Safe Practice Zone & SRS Persistence
│   ├── phase_04_tier0_pinyin_mastery.md       # Phase 4: Tier 0 Pinyin Mastery & Onboarding Flow
│   ├── phase_05_tier1_content_rollout.md      # Phase 5: Tier 1 Rollout, Product KPIs & Production Launch
│   ├── phase_06_content_authoring_studio.md   # Phase 6: Web-based Lesson Authoring Studio & PR Generator
│   ├── phase_07_tier2_traveler_quest.md       # Phase 7: Tier 2 Traveler Rollout & HSK 3-4 Quest Map
│   └── phase_08_tier3_4_advanced_immersion.md # Phase 8: Tier 3-4 Advanced Immersion & Fluency Tools
├── prompts/                       # คลัง Master Prompts สำหรับสั่งการ AI
│   ├── phase_01_scaffolding_prompt.md # แม่แบบคำสั่ง Phase 1.1 Scaffolding & Code Quality Tooling
│   ├── curriculum_prompt.md       # แม่แบบสั่งสร้างเนื้อหาบทเรียน 3 ภาษา (中-泰-英)
│   ├── game_design_prompt.md      # แม่แบบสั่งออกแบบมินิเกมการเรียนรู้
│   └── web_dev_prompt.md          # แม่แบบสถาปนิกและนักพัฒนา Web App (สายฟรี 100%)
└── roadmap/                       # แผนงานและลำดับขั้นตอนการพัฒนา
    └── milestone_plan.md          # ไทม์ไลน์และเป้าหมายในแต่ละระยะ (Phase 1 ถึง 8)
```

---

## 📌 สรุปสาระสำคัญของเอกสารแต่ละส่วน

| โฟลเดอร์ | วัตถุประสงค์ | สถานะ |
| :--- | :--- | :--- |
| **`prd/`** | รวบรวมวิสัยทัศน์ผลิตภัณฑ์ ([01_product_vision.md](file:///c:/DevProjects/hanzero/hanzero/docs/prd/01_product_vision.md)) และสเปกฟีเจอร์ครบทุกมิติ ([02_feature_specs.md](file:///c:/DevProjects/hanzero/hanzero/docs/prd/02_feature_specs.md)) พร้อมกลไก Anti-Churn, Studio และ Telemetry | ✅ สมบูรณ์ครบถ้วน |
| **`curriculum/`** | โครงสร้างเนื้อหา 3 ภาษา (จีน-ไทย-อังกฤษ), [แม่บทพินอิน](file:///c:/DevProjects/hanzero/hanzero/docs/curriculum/01_pinyin_system.md), [รากศัพท์ & เส้นขีด](file:///c:/DevProjects/hanzero/hanzero/docs/curriculum/02_radical_basics.md), [ผังบทเรียน](file:///c:/DevProjects/hanzero/hanzero/docs/curriculum/03_lesson_levels.md) และ [คลังมินิเกม](file:///c:/DevProjects/hanzero/hanzero/docs/curriculum/04_mini_games.md) | ✅ สมบูรณ์ครบถ้วน |
| **`architecture/`** | กำหนดสถาปัตยกรรม เทคโนโลยี Frontend/Backend, Data Model (ดู [tech_stack.md](file:///c:/DevProjects/hanzero/hanzero/docs/architecture/tech_stack.md) และ [data_schema.md](file:///c:/DevProjects/hanzero/hanzero/docs/architecture/data_schema.md)) | ✅ เรียบร้อย |
| **`plan/`** | แผนปฏิบัติการและ Checklist การพัฒนารายเฟส 1-8 พร้อมเกณฑ์ตรวจรับงาน (ดู [docs/plan/](file:///c:/DevProjects/hanzero/hanzero/docs/plan/)) | 🚀 Active & Modular |
| **`prompts/`** | คลัง Master Prompts สำหรับสั่งการ AI ขยายเนื้อหา/เกม/สถาปัตยกรรม (ดู [docs/prompts/](file:///c:/DevProjects/hanzero/hanzero/docs/prompts/)) | 🗄️ คลังแม่แบบ |
| **`roadmap/`** | แผนงานและระยะการพัฒนา Phase 1 - 8 (ดู [milestone_plan.md](file:///c:/DevProjects/hanzero/hanzero/docs/roadmap/milestone_plan.md)) | ✅ เรียบร้อย |

---

## 🤝 ข้อปฏิบัติสำหรับผู้ร่วมพัฒนาและ AI Agent
- ก่อนเริ่มพัฒนาฟีเจอร์ใหม่ ให้ตรวจทานเอกสารใน `docs/plan/` และ `docs/prd/02_feature_specs.md` เสมอ
- หากมีความเปลี่ยนแปลงในการออกแบบหรือเนื้อหาบทเรียน ให้อัปเดตเอกสารในโฟลเดอร์นี้ควบคู่กันทันที
