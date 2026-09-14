# 🎮 Phase 3: Gamification, Progression & SRS Flashcards

เอกสารแผนปฏิบัติการและรายการตรวจสอบอย่างละเอียดสำหรับ **Phase 3** ของการพัฒนา Hanzero: สร้างระบบแรงจูงใจ แผนที่การเรียนรู้ (Quest Map), ระบบเศรษฐกิจเกมที่มี **Safe Practice Zone ถนอมผู้เรียน**, และเครื่องยนต์ทบทวนคำศัพท์อัจฉริยะ Spaced Repetition (SRS) พร้อมระบบสำรองข้อมูลข้ามเครื่อง

---

## 🎯 เป้าหมายของ Phase 3
เปลี่ยนการเรียนภาษาจีนให้กลายเป็นการเดินทางที่สนุก น่าติดตาม มีระบบรักษาวินัยผู้เรียน และมีระบบทบทวนคำศัพท์ตามหลักการทำงานของสมอง โดยไม่ลงโทษผู้เรียนจนถอดใจด้วย Safe Practice Zone

---

## 📋 แผนงานปฏิบัติการย่อย (Actionable Checklist)

### 1. แผนที่เส้นทางการเรียนรู้ (Quest Path & Node System)
- [ ] พัฒนา `src/components/layout/QuestMap.tsx`:
  - ดีไซน์เส้นทางเดินแบบคดเคี้ยวสไตล์ Modern Oriental
  - สถานะของแต่ละด่าน:
    - 🔒 **Locked:** ด่านที่ยังล็อกอยู่
    - 🟢 **Active / Current:** ด่านปัจจุบัน มีแอนิเมชันลูกเต้นเรียกร้องความสนใจ
    - ⭐ **Completed:** ด่านที่ผ่านแล้ว แสดงดาว 1-3 ดวง และสามารถกดเล่นซ้ำได้
    - 👑 **Boss Node:** หมุดรูปเจดีย์ สำหรับด่านทดสอบประจำ Unit
  - แถบ Tier Switcher: สลับดูแผนที่ระหว่าง Tier 0 และ Tier 1 ได้อิสระ

### 2. แดชบอร์ดสถานะและโซนการเรียนรู้ปลอดภัย (User Economy & Safe Practice Zone)
- [ ] พัฒนา `src/components/layout/HeaderBar.tsx`:
  - 🔥 **Streak Tracker:** นับจำนวนวันเรียนติดต่อกัน พร้อมไอคอนไฟลุก
  - ❤️ **Heart Meter:** หัวใจ 5 ดวง พร้อม **Mobile 360px Responsive Rule**:
    - บนหน้าจอกว้าง (>380px): แสดงหัวใจเรียง 5 ดวง
    - บนหน้าจอเล็ก (<=380px): ย่อเป็น `❤️ x 5` เพื่อป้องกัน Header Bar ล้นจอแนวนอน
  - ⭐ **XP Points & Level:** คะแนนสะสมสำหรับปลดล็อกระดับ
  - ⚙️ **Settings Modal:** สลับ Dark/Light mode, Silent Mode, ตั้งเป้าหมายรายวัน, และปุ่ม Export/Import ข้อมูล
- [ ] **ระบบหัวใจและกฎ Safe Practice Zone (Pedagogical Protection):**
  - 🛡️ **Tier 0 และ SRS Review จะไม่มีการหักหัวใจเด็ดขาด** เมื่อตอบผิด (ไม่ทำให้ผู้เริ่มต้นเครียดกับการฟังวรรณยุกต์)
  - ⚠️ หักหัวใจเฉพาะใน Unit Quiz และ Boss Challenge ของ Tier 1 ขึ้นไป
  - **การฟื้นฟูหัวใจ:**
    - ฟื้นฟูอัตโนมัติ 1 ดวงทุก 4 ชั่วโมง
    - โหมดฝึกฝนเพื่อฟื้นฟู (Practice to Earn): ทบทวนการ์ดคำศัพท์ถูก 5 ข้อ ได้รับ 1 หัวใจทันที
- [ ] **Daily Study Goals & Session Closure:**
  - ตัวเลือกเป้าหมายรายวัน: 5 นาที (Casual) / 10 นาที (Regular) / 15 นาที (Intense)
  - หน้าต่าง **Daily Completion Card**: เมื่อเรียนครบเป้าหมาย แสดงการ์ดสรุปผล (XP วันนี้, คำศัพท์ใหม่, สถิติความแม่นยำ) สร้างความรู้สึกจบเซสชันในแต่ละวัน

### 3. เครื่องยนต์คำนวณการทบทวนคำศัพท์ (SRS Engine: SuperMemo SM-2 & Anti-Overload)
- [ ] สร้าง `src/engines/srs/srsEngine.ts`:
  - ตัวคำนวณระดับความง่าย (Ease Factor: เริ่มต้น 2.5)
  - จำนวนรอบที่จำได้สำเร็จ (Repetitions)
  - กำหนดรอบวันทบทวน (Interval: 1 วัน ➔ 3 วัน ➔ 7 วัน ➔ 14 วัน ➔ 30 วัน)
  - ระดับการประเมินตนเองของผู้เรียน (Again = 0, Hard = 1, Good = 2, Easy = 3)
  - **Daily Review Cap:** ล็อกจำนวนการ์ดทบทวนสูงสุดไม่เกิน **20 คำ/วัน** เพื่อป้องกันภาระเกินกำลังสมอง
  - **Backlog Triage Mode:** เมื่อผู้เรียนหยุดเรียนไปเกิน 7 วัน ระบบจะเสนอโหมด "เกลี่ยการบ้านค้าง" โดยแบ่งการ์ดทบทวนเป็นก้อนย่อยวันละ 10 คำ ไม่ให้ค้างเป็นร้อยคำ
- [ ] หน้าคลังทบทวนคำศัพท์ (Review Deck Screen):
  - ดึงคำศัพท์ที่ถึงกำหนดทบทวน (Due Words ภายใต้โควตา 20 คำ) ขึ้นมาเป็นการ์ดทบทวนประจำวัน
  - แตะเพื่อดูเฉลย และกดปุ่มประเมินความจำตนเอง

### 4. ระบบบันทึกสถานะสองชั้นและการย้ายข้อมูล (State Migration, IndexedDB & Backup)
- [ ] พัฒนา `src/hooks/useUserState.ts`:
  - จัดเก็บลง `LocalStorage` เป็นหลักในคีย์ `hanzero_user_state_v1`
  - ทำ Auto-mirror ไปยัง `IndexedDB` ทุกครั้งที่มีการบันทึก พร้อมขอสิทธิ์ `navigator.storage.persist()` ป้องกัน Safari ITP ล้างข้อมูลหลัง 7 วัน
  - ฟังก์ชัน `migrateUserState(raw)`: ตรวจจับ Schema Version เก่าและปรับเป็น v1 อัตโนมัติ ป้องกันจอขาว
  - ฟังก์ชัน Export Backup: ดาวน์โหลดไฟล์ JSON สำรองข้อมูล
  - ฟังก์ชัน Import Backup: โหลดไฟล์ JSON กู้คืนความก้าวหน้ากลับมาทันที
  - **Quick Sync Code Generator:** สร้างรหัสกู้คืนแบบสั้น (เช่น `HZ1-U05-S14-X1200`) สำหรับคัดลอกลง LINE/Notes ใน 1 แตะ

---

## 🔍 รายการตรวจรับงานและทดสอบคุณภาพ (Verification & Acceptance Criteria)

| จุดตรวจสอบ | วิธีการทดสอบ (How to Verify) | เกณฑ์การผ่าน (Acceptance Criteria) |
| :--- | :--- | :--- |
| **1. Safe Practice Zone** | ตอบผิดซ้ำๆ ในโหมดฝึกฟังพินอิน หรือในหน้า SRS Review | จำนวนหัวใจต้องไม่ลดลง (คงที่ 5 ดวงเสมอ) ไม่มีหน้าต่างขัดจังหวะ |
| **2. Daily Review Cap & Triage** | จำลองคำศัพท์ Due 50 คำในระบบ แล้วเปิดหน้า Review Deck | แสดงการ์ดให้ทบทวนสูงสุด 20 คำตาม Cap และมีข้อความแจ้งเตือนโหมดเกลี่ยการบ้านค้าง |
| **3. Daily Goal & Completion Card** | เรียนจนครบเป้าหมายเวลาประจำวัน (เช่น 5 นาที) | แสดงหน้า Daily Completion Card สรุป XP และความก้าวหน้าพร้อมเสียง Fanfare |
| **4. Unit Quiz Heart Deduction** | ตอบผิดในแบบทดสอบท้ายบท Tier 1 | หัวใจลดลง 1 ดวง เมื่อเหลือ 0 จะมีตัวเลือกให้ไปฝึกคำศัพท์เพื่อเติมหัวใจทันที |
| **5. Practice-to-Earn Heart** | เมื่อหัวใจเหลือ 0 เข้าโหมดฝึกฝนและตอบถูกครบ 5 คำ | หัวใจเพิ่มขึ้นเป็น 1 ดวงทันที และสามารถกลับไปลุยด่านหลักต่อได้ |
| **6. Schema Auto-Migration** | Mock ข้อมูลเก่าที่ไม่มี `schema_version` ลงใน LocalStorage แล้วรีเฟรช | แอปไม่แครช โครงสร้างถูกอัปเกรดเป็น `schema_version: 1` และความก้าวหน้าเดิมยังอยู่ครบ |
| **7. 1-Click JSON Backup & Safari Protection** | กดปุ่ม Export Backup จากนั้นล้างแคช แล้ว Import | สถิติ Streak, XP, และด่านที่ปลดล็อกถูกกู้คืนกลับมา 100% |
| **8. 360px HeaderBar Fit** | เปิดหน้าแอปบน Viewport กว้าง 360px | HeaderBar แสดงผลเรียบร้อย ไม่ล้นจอ หัวใจย่อเป็น `❤️ x 5` สวยงาม |

---

## 🛑 Definition of Done (DoD) สำหรับ Phase 3
เมื่อระบบ Quest Map นำทางได้ทั้งสอง Tier, กฎ Safe Practice Zone ทำงานถูกต้อง, ระบบ Daily Goal สรุปผลได้, ระบบ SRS มี Daily Cap ไม่เกิน 20 คำ, Header Bar รองรับหน้าจอ 360px และระบบ Backup/Dual Storage สำรองข้อมูลได้จริง จึงถือว่า Phase 3 เสร็จสมบูรณ์และพร้อมเข้าสู่ [Phase 4: Tier 0 Pinyin Mastery](file:///c:/DevProjects/hanzero/hanzero/docs/plan/phase_04_tier0_pinyin_mastery.md)

