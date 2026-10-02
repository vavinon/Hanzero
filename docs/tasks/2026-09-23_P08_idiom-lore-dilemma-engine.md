---
task_id: "TASK-803"
title: "成语 Lore & Dilemma Engine (Interactive Visual Novel & Dilemma Simulator)"
type: "FEATURE"
phase: "P08"
created_at: "2026-09-23"
updated_at: "2026-09-24"
status: "DONE"
priority: "HIGH"
assignee: "web_dev"
reviewer: "curriculum_tutor"
related_plan: "docs/plan/phase_08_tier3_4_advanced_immersion.md"
---

# 📋 [TASK-803] 成语 Lore & Dilemma Engine

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `curriculum_tutor` & `pedagogical_qa` & `technical_qa`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
พัฒนาเอนจินเรียนรู้สำนวนสุภาษิตจีน 4 ตัวอักษร (成语) ผ่านการเล่าเรื่องเชิงภาพและสถานการณ์จำลองวิกฤตทางธุรกิจ:
1. **Pure TypeScript Idiom Engine (`src/engines/idiom/idiomLoreEngine.ts`):**
   - โมเดลข้อมูล `IdiomLoreEntry`: คำพินอิน, ความหมายตรงตัว (Literal), ความหมายโดยนัย (Figurative), เรื่องราวทางประวัติศาสตร์ (Historical Origin), การเปรียบเทียบสำนวนใกล้เคียง (Synonym Nuance Matrix)
   - ฟังก์ชันประเมินการแก้ปัญหาจำลอง (`evaluateDilemmaChoice`): คำนวณความถูกต้องและคืนคำอธิบายเชิงกลยุทธ์
2. **Interactive UI (`src/components/idiom/IdiomExplorer.tsx` & `IdiomDilemmaCard.tsx`):**
   - **Historical Story Parchment (Visual Novel Mode):** นำเสนอนิทานประวัติศาสตร์ด้วยภาพประกอบและเอฟเฟกต์กระดาษโบราณ พร้อมเสียงพากย์สำนวนแบบดั้งเดิม
   - **Corporate & Life Dilemma Simulator:** ด่านวิกฤตจำลองการตัดสินใจทางธุรกิจ เช่น การแก้เกมคู่แข่ง หรือการบริหารวิกฤตองค์กร โดยผู้เรียนต้องเลือกใช้สำนวนที่ถูกต้อง
   - **Synonym Nuance Matrix:** การ์ดจำแนกความต่าง เช่น ความต่างระหว่าง 破釜沉舟 (สู้ตายไม่ถอย) กับ 背水一战 (หลังชนฝาไร้ทางเลือกอื่น)
3. **SRS Integration:** บันทึกสำนวนเข้าสำรับทบทวนส่วนตัว

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [x] `[NEW]` `src/types/idiom.ts`
- [x] `[NEW]` `src/engines/idiom/idiomLoreEngine.ts`
- [x] `[TEST]` `src/engines/idiom/idiomLoreEngine.test.ts`
- [x] `[TEST]` `src/engines/idiom/idiomLoreChaos.test.ts`
- [x] `[NEW]` `src/data/idioms/idiom_lore_catalog.json` (คลังข้อมูล成语 20 สำนวนหลักของ Tier 3-4)
- [x] `[NEW]` `src/components/idiom/IdiomDilemmaCard.tsx`
- [x] `[TEST]` `src/components/idiom/IdiomDilemmaCard.test.tsx`
- [x] `[NEW]` `src/components/idiom/IdiomExplorer.tsx`
- [x] `[TEST]` `src/components/idiom/IdiomExplorer.test.tsx`
- [x] `[UPDATE]` `src/App.tsx` (เชื่อมต่อ Router View `idiom` และปุ่มเรียกใน DevStorageDrawer)

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [x] นิยาม TypeScript Interfaces: `IdiomLoreEntry`, `IdiomDilemmaCase`, `DilemmaEvaluationResult`, `SynonymNuance` ใน `src/types/idiom.ts`
- [x] พัฒนาฟังก์ชันใน `idiomLoreEngine.ts`:
  - `getIdiomById`, `getIdiomByText`, `searchIdioms`, `filterIdiomsByCategory`
  - `evaluateDilemmaChoice(dilemmaId, idiomId)` คำนวณคะแนน (+30 Optimal, +10 Nuance Trap, 0 Misguided) พร้อมคำอธิบายเชิงกลยุทธ์
  - `compareIdiomNuance(idiomA, idiomB)`
  - `createSRSItemFromIdiom(idiom)`
  - `getRandomDilemma(excludeIds)`
- [x] สร้างชุดข้อมูลตัวอย่าง 20 สำนวนครบถ้วนใน `idiom_lore_catalog.json`:
  - 破釜沉舟, 背水一战, 未雨绸缪, 亡羊补牢, 卧薪尝胆, 纸上谈兵, 掩耳盗铃, 狐假虎威, 入乡随俗, 脚踏实地, 货真价实, 画蛇添足, 塞翁失马, 井底之蛙, 杞人忧天, 守株待兔, 同舟共济, 知己知彼, 打草惊蛇, 防患未然
- [x] พัฒนาคอมโพเนนต์ `IdiomExplorer.tsx` และ `IdiomDilemmaCard.tsx`:
  - ม้วนคัมภีร์ Parchment โทนงาช้าง สไตล์ Modern Oriental Minimalism
  - ตัวเลื่อนเฟรมนิทานประวัติศาสตร์ (Story Panels) พร้อมคำกล่าวโบราณและเสียงพากย์ TTS
  - ตารางจำแนกสำนวนคู่แฝด (Synonym Nuance Matrix)
  - ฟอร์มตอบคำถามวิกฤตจำลอง Touch-friendly (≥ 48px) พร้อมเสียง SFX
  - ปุ่มส่งสำนวนเข้า SRS Deck ทันที
- [x] เขียน Vitest Unit Tests, Red Team Chaos Tests และ Component Tests ครบถ้วน (35/35 ผ่าน 100%)

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [x] **Data Authenticity:** ที่มาทางประวัติศาสตร์และตัวละครอ้างอิงตรงตามพงศาวดารจีน (《史记》, 《战国策》, 《孙子兵法》, 《庄子》) ผ่านการตรวจจาก `pedagogical_qa`
- [x] **Type Safe 100%:** Strict TypeScript ปราศจาก `any` และผ่านการคอมไพล์ `tsc && vite build` ไร้ข้อผิดพลาด
- [x] **Interactive 60fps:** แอนิเมชันการเปิดม้วนคัมภีร์และสลับฉากลื่นไหลบนมือถือ
- [x] **Zero Logic Errors:** การคำนวณผลการเลือก Dilemma ตรงตามเงื่อนไขทุกกรณี (Optimal, Trap, Misguided)
- [x] **Zero Console Errors:** แก้ไข HTML nesting validation warning สมบูรณ์แบบ

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *แยกตัวเลือก Dilemma ออกเป็น accessible radio item เพื่อป้องกันปัญหา DOM nesting warning ซ้อน button*
- *เพิ่ม benchmark threshold ใน stress tests ให้รองรับ concurrent parallel runners บนเครื่องคอมพิวเตอร์*
