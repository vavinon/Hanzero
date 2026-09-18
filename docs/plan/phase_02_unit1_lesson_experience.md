# 📖 Phase 2: Unit 1 Complete Lesson Experience (Vertical Slice)

เอกสารแผนปฏิบัติการและรายการตรวจสอบอย่างละเอียดสำหรับ **Phase 2** ของการพัฒนา Hanzero: สร้างประสบการณ์การเรียนรู้ครบวงจรสำหรับ Unit แรก ("ทักทาย & ขอบคุณ") เพื่อเป็น **แม่แบบชิ้นส่วนสมบูรณ์ (Engineering Vertical Slice & UX Golden Template)** ให้กับบทเรียนทั้งหมด

> 💡 **หมายเหตุสำคัญจาก Senior PM (Architectural Clarification):**  
> ใน Phase 2 นี้ เป็นการสร้างบทเรียน Unit 1 ในเชิง **Technical Proof of Concept (PoC)** เพื่อทดสอบความสมบูรณ์ของคอมโพเนนต์ Flashcard, Dialogue, Grammar และ Quiz ร่วมกันก่อน  
> **ไม่ใช่ลำดับจริงของผู้เรียนใหม่:** สำหรับผู้เรียนที่เริ่มต้นจากศูนย์ (Zero-knowledge) เมื่อแอปเปิดตัวจริง เส้นทาง Onboarding จะพาเข้าสู่ [Tier 0: Pinyin Mastery](file:///c:/DevProjects/hanzero/hanzero/docs/plan/phase_04_tier0_pinyin_mastery.md) ก่อนเสมอ

---

## 🎯 เป้าหมายของ Phase 2
ส่งมอบประสบการณ์การเรียนรู้ระดับพรีเมียมใน **Unit 1: ทักทาย & ขอบคุณ (First Greetings & Gratitude)** ตั้งแต่ก้าวแรกจนจบ Boss Challenge พร้อมระบบประเมินผล การแสดงผลตัวอักษรจีนที่คมชัด และโหมดรองรับการเรียนขณะเดินทาง (Silent Mode)

---

## 📋 แผนงานปฏิบัติการย่อย (Actionable Checklist)

### 1. โครงสร้างข้อมูลบทเรียน (Unit 1 Data JSON)
- [x] นำเข้าและตรวจสอบไฟล์ `src/data/lessons/tier1/unit01_greetings.json` ตาม Schema:
  - **Lesson 1.1:** สวัสดี & ขอบคุณ (`你好`, `谢谢`, `不客气`, `再见`)
    - *Tone Sandhi Check:* กำกับเสียงเปลี่ยนของ `不客气` เป็น `bú kèqi`
  - **Lesson 1.2:** ฉันคือ... คุณชื่ออะไร? (`我`, `叫`, `什么`, `名字`)
  - **Lesson 1.3:** คนชาติไหน? (`是`, `哪`, `国`, `人`, `泰国`, `中国`)
    - *Tone Sandhi Check:* กำกับเสียงเปลี่ยนของ `不是` เป็น `bú shì`
  - **Lesson 1.4 (Boss Challenge):** จำลองสถานการณ์แนะนำตัวในที่ทำงานจริง

### 2. คอมโพเนนต์การ์ดคำศัพท์ 3 ภาษา (Trilingual VocabCard)
- [x] พัฒนา `src/components/lesson/VocabCard.tsx`:
  - แสดงตัวอักษรจีนขนาดใหญ่ไม่ต่ำกว่า 36px (`2.25rem`) เพื่อความคมชัดของเส้นขีด
  - **Accessible Tone Indicators:** วรรณยุกต์พินอินกำกับสีควบคู่สัญลักษณ์คลื่นเสียง (¯ ˊ ˇ ˋ) หรือตัวเลข รองรับผู้มีภาวะตาบอดสี
  - คำแปล 2 ภาษา: ภาษาไทยเป็นธรรมชาติ + ภาษาอังกฤษสากล
  - ภาพจำช่วยจำ (Visual Mnemonic Hint)
  - ปุ่มกดฟังเสียง Native Voice (พร้อมปุ่มปรับ Slow 0.75x)
  - **Progressive Pinyin Fading Prototype:** ปุ่มสลับดูพินอินแบบเต็ม (Full), จาง (Faded), หรือซ่อน (Hidden พร้อมแตะเพื่อแอบดู) เพื่อฝึกจำตัวอักษรจีนจริง
  - ปุ่มขยายเส้นขีด (Stroke Inspector Modal) แสดงตัวอักษร 120px ในตารางเก้าช่อง
  - รองรับการแตะเพื่อพลิกการ์ด 3D ดูตัวอย่างประโยคบริบทจริง

### 3. ตัวเล่นบทสนทนาจำลอง (Interactive Dialogue Player)
- [x] พัฒนา `src/components/lesson/DialoguePlayer.tsx`:
  - ดีไซน์สไตล์ Modern Chat Bubble สลับฝั่งคู่สนทนา A - B
  - ปุ่มเล่นเสียงต่อเนื่องทั้งบท หรือแตะฟังทีละประโยค
  - ไฮไลต์ข้อความและคำศัพท์แบบคาราโอเกะขณะที่เสียงกำลังเล่น
  - ปุ่มสลับการแสดงผล 3 ระดับ: "อักษรจีน+พินอิน+ไทย" / "อักษรจีน+พินอิน" / "อักษรจีนล้วน" เพื่อท้าทายผู้เรียน

### 4. ตัวอธิบายไวยากรณ์จิ๋ว 1 นาที (Grammar Bite Card)
- [x] พัฒนา `src/components/lesson/GrammarBite.tsx`:
  - การเปรียบเทียบโครงสร้างประโยค 3 ภาษา (จีน vs ไทย vs อังกฤษ)
  - สรุปสั้น กระชับ จบใน 1 หน้าจอ ไม่ต้องเลื่อนยาว
  - Visual Lego Formula Visualizer แสดงสูตรประโยคสำเร็จรูปแยกสีตามหมวดคำ
  - กฎการผันเสียงวรรณยุกต์ (Tone Sandhi) พร้อมภาพจำสนุกๆ 🎢 และกล่องคลายกังวล 💖
  - ปุ่มฟังเสียง Native Voice พร้อมตัวสลับความเร็ว 1.0x / 0.75x (Hitbox $\ge 44\text{px}$)

### 5. มินิเกมทดสอบท้ายบท (Interactive Quiz Engine)
- [x] พัฒนา `src/components/lesson/QuizContainer.tsx` รองรับ 4 โหมด:
  - **Tone & Sound Matcher:** ฟังเสียงแล้วเลือกพินอิน/วรรณยุกต์ที่ถูกต้อง
  - **Word Meaning Match:** จับคู่ตัวอักษรจีนกับความหมายภาษาไทย
  - **Sentence Builder:** แตะเรียงคำศัพท์ในกล่องให้เป็นประโยคที่ถูกต้อง
  - **Mini Hanzi Stroke:** ทดสอบลำดับขีดตัวอักษร 1 ตัวสำคัญ
- [x] **Silent Mode Adaptive Logic:** หากเปิด Silent Mode ข้อสอบข้อฟังเสียงจะถูกแปลงเป็นโหมดดูพินอินจับคู่ความหมายอัตโนมัติ
- [x] **Boss Victory & Milestone Card:** เมื่อผ่าน Lesson 1.4 Boss Challenge แสดงหน้าต่างชัยชนะพร้อมบัตรเกียรติยศพรีวิวสำหรับกดแชร์

---

## 🔍 รายการตรวจรับงานและทดสอบคุณภาพ (Verification & Acceptance Criteria)

| จุดตรวจสอบ | วิธีการทดสอบ (How to Verify) | เกณฑ์การผ่าน (Acceptance Criteria) |
| :--- | :--- | :--- |
| **1. Linguistic Accuracy (ความถูกต้องของภาษา)** | ตรวจสอบ Pinyin, วรรณยุกต์ และกฎการเปลี่ยนเสียงใน JSON | 1. `不客气` ต้องแสดงและออกเสียง `bú kèqi`<br/>2. `不是` ต้องแสดงและออกเสียง `bú shì`<br/>3. คำแปลภาษาไทยต้องเป็นสำนวนธรรมชาติ |
| **2. Stroke Legibility & Zoom** | ทดสอบเปิดการ์ดคำว่า `谢` (12 ขีด) บนจอมือถือ 375px | เส้นขีดอ่านออกชัดเจน และเมื่อกดปุ่ม Zoom จะแสดงหน้าต่างขยายเส้นขีดพร้อมตาราง |
| **3. Progressive Pinyin Fading** | กดสลับโหมดซ่อนพินอินในการ์ดคำศัพท์ | พินอินถูกซ่อนหรือจางลง และสามารถแตะเพื่อแสดงเฉลยพินอินชั่วคราวได้ |
| **4. Silent Mode Quiz Adaptation** | เปิดสวิตช์ Silent Mode แล้วเข้าทำควิซ | ควิซไม่เล่นเสียง และข้อสอบฟังเสียงถูกแปลงเป็นข้อสอบความหมาย/รูปอักษรโดยสมบูรณ์ |
| **5. Smooth Dialogue Playback** | กดเล่นบทสนทนาใน Lesson 1.1 และ 1.2 | เสียงประโยคเล่นต่อเนื่องลื่นไหล มีแอนิเมชันไฮไลต์ตามจังหวะเสียงพูด |
| **6. Boss Challenge Victory** | เล่นด่าน Lesson 1.4 Boss Challenge จนสำเร็จ | แสดงหน้าสรุปคะแนน (Victory Screen) พร้อมเอฟเฟกต์ Fanfare ได้รับ XP และปุ่มดูบัตรเกียรติยศ |

---

## 🛑 Definition of Done (DoD) สำหรับ Phase 2
เมื่อผู้ใช้สามารถเปิดเว็บขึ้นมา กดเลือก Unit 1 เรียนเนื้อหาตั้งแต่ Lesson 1.1 ถึง 1.4 ผ่านแบบทดสอบทั้งในโหมดปกติและ Silent Mode ทดสอบระบบซ่อนพินอินได้ และเห็นหน้าสรุปคะแนนโดยไม่มีข้อผิดพลาดบน Console จึงถือว่า Phase 2 เสร็จสมบูรณ์และพร้อมเข้าสู่ [Phase 3: Gamification & SRS](file:///c:/DevProjects/hanzero/hanzero/docs/plan/phase_03_gamification_srs.md)

