---
task_id: "TASK-803"
title: "成语 Lore & Dilemma Engine (Interactive Visual Novel & Dilemma Simulator)"
type: "FEATURE"
phase: "P08"
created_at: "2026-09-23"
updated_at: "2026-09-23"
status: "TODO"
priority: "HIGH"
assignee: "web_dev"
reviewer: "curriculum_tutor"
related_plan: "docs/plan/phase_08_tier3_4_advanced_immersion.md"
---

# 📋 [TASK-803] 成语 Lore & Dilemma Engine

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `curriculum_tutor` & `pedagogical_qa`

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
- [ ] `[NEW]` `src/engines/idiom/idiomLoreEngine.ts`
- [ ] `[TEST]` `src/engines/idiom/idiomLoreEngine.test.ts`
- [ ] `[NEW]` `src/data/idioms/idiom_lore_catalog.json` (คลังข้อมูล成语 20 สำนวนหลักของ Tier 3)
- [ ] `[NEW]` `src/components/idiom/IdiomExplorer.tsx`
- [ ] `[NEW]` `src/components/idiom/IdiomDilemmaCard.tsx`
- [ ] `[TEST]` `src/components/idiom/IdiomExplorer.test.tsx`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] นิยาม TypeScript Interfaces: `IdiomLoreEntry`, `IdiomDilemmaCase`, `DilemmaEvaluationResult`
- [ ] พัฒนาฟังก์ชันใน `idiomLoreEngine.ts`:
  - `getIdiomById`, `searchIdiomsByKeyword`
  - `evaluateDilemmaChoice(dilemmaId, idiomId)`
  - `compareIdiomNuances(idiomA, idiomB)`
- [ ] สร้างชุดข้อมูลตัวอย่างใน `idiom_lore_catalog.json` (脚踏实地, 讨价还价, 货真价实, 入乡随俗, 破釜沉舟, 未雨绸缪, 亡羊补牢 ฯลฯ)
- [ ] พัฒนาคอมโพเนนต์ `IdiomExplorer.tsx` และ `IdiomDilemmaCard.tsx`:
  - แอนิเมชันเปิดการ์ดสไตล์ม้วนคัมภีร์จีนโบราณ
  - ฟอร์มเลือกกลยุทธ์จำลอง พร้อมเสียง Feedback SFX
  - การ์ดสรุปคำศัพท์และปุ่มส่งเข้า SRS
- [ ] เขียน Vitest Unit Tests สำหรับ Engine และ Component Tests สำหรับ Explorer

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **Data Authenticity:** ที่มาทางประวัติศาสตร์และตัวละครอ้างอิงตรงตามพงศาวดารจีน (เช่น 《史记》, 《三国志》) ผ่านการตรวจจาก `pedagogical_qa`
- [ ] **Type Safe 100%:** Strict TypeScript ปราศจาก `any`
- [ ] **Interactive 60fps:** แอนิเมชันการเปิดม้วนคัมภีร์ลื่นไหล 60fps บนมือถือ
- [ ] **Zero Logic Errors:** การคำนวณผลการเลือก Dilemma ตรงตามเงื่อนไขทุกกรณี

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *ต้องระวังเรื่องความยาวของเนื้อเรื่องในหน้าจอมือถือ แบ่งเป็นฉากสั้นๆ 3-4 เฟรมเพื่อให้คงเอกลักษณ์ Bite-sized Learning*
