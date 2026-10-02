---
plan_type: "ROADMAP_PHASE"
phase: "03"
created_at: "2026-09-15"
updated_at: "2026-09-19"
status: "COMPLETED"
priority: "HIGH"
target_engines: ["src/engines/srs/srsEngine.ts", "src/hooks/useUserState.ts"]
target_components: ["src/components/layout/QuestMap.tsx", "src/components/layout/HeaderBar.tsx", "src/components/srs/ReviewDeck.tsx"]
---

# 🎮 Phase 3: Gamification, Progression & SRS Flashcards

เอกสารแผนปฏิบัติการและรายการตรวจสอบอย่างละเอียดสำหรับ **Phase 3** ของการพัฒนา Hanzero: สร้างระบบแรงจูงใจ แผนที่การเรียนรู้ (Quest Map), ระบบเศรษฐกิจเกมที่มี **Safe Practice Zone ถนอมผู้เรียน**, และเครื่องยนต์ทบทวนคำศัพท์อัจฉริยะ Spaced Repetition (SRS) พร้อมระบบสำรองข้อมูลข้ามเครื่อง

---

## 🎯 เป้าหมายของ Phase 3
เปลี่ยนการเรียนภาษาจีนให้กลายเป็นการเดินทางที่สนุก น่าติดตาม มีระบบรักษาวินัยผู้เรียน และมีระบบทบทวนคำศัพท์ตามหลักการทำงานของสมอง โดยไม่ลงโทษผู้เรียนจนถอดใจด้วย Safe Practice Zone

---

## 📋 แผนงานปฏิบัติการย่อย (Actionable Checklist)

### 1. แผนที่เส้นทางการเรียนรู้ (Quest Path & Node System)
- [x] พัฒนา `src/components/layout/QuestMap.tsx`:
  - ดีไซน์เส้นทางเดินแบบคดเคี้ยวสไตล์ Modern Oriental
  - สถานะของแต่ละด่าน:
    - 🔒 **Locked:** ด่านที่ยังล็อกอยู่
    - 🟢 **Active / Current:** ด่านปัจจุบัน มีแอนิเมชันลูกเต้นเรียกร้องความสนใจ
    - ⭐ **Completed:** ด่านที่ผ่านแล้ว แสดงดาว 1-3 ดวง และสามารถกดเล่นซ้ำได้
    - 👑 **Boss Node:** หมุดรูปเจดีย์ สำหรับด่านทดสอบประจำ Unit
  - แถบ Tier Switcher: สลับดูแผนที่ระหว่าง Tier 0 และ Tier 1 ได้อิสระ

### 2. แดชบอร์ดสถานะและโซนการเรียนรู้ปลอดภัย (User Economy & Safe Practice Zone)
- [x] พัฒนา `src/components/layout/HeaderBar.tsx`:
  - 🔥 **Streak Tracker:** นับจำนวนวันเรียนติดต่อกัน พร้อมไอคอนไฟลุก (Anti-exploit max +1 ต่อวัน)
  - ❤️ **Heart Meter:** หัวใจ 5 ดวง พร้อม **Mobile 360px Responsive Rule**:
    - บนหน้าจอกว้าง (>380px): แสดงหัวใจเรียง 5 ดวง
    - บนหน้าจอเล็ก (<=380px): ย่อเป็น `❤️ x 5` เพื่อป้องกัน Header Bar ล้นจอแนวนอน
  - ⭐ **XP Points & Level:** คะแนนสะสมสำหรับปลดล็อกระดับ
  - ⚙️ **Settings & Diagnostics:** เชื่อมต่อ DevStorageDrawer, Silent Mode, และปุ่ม Export/Import ข้อมูล
- [x] **ระบบหัวใจและกฎ Safe Practice Zone (Pedagogical Protection):**
  - 🛡️ **Tier 0 และ SRS Review จะไม่มีการหักหัวใจเด็ดขาด** เมื่อตอบผิด (ไม่ทำให้ผู้เริ่มต้นเครียดกับการฟังวรรณยุกต์)
  - ⚠️ หักหัวใจเฉพาะใน Unit Quiz และ Boss Challenge ของ Tier 1 ขึ้นไป
  - **การฟื้นฟูหัวใจ:**
    - ฟื้นฟูอัตโนมัติ 1 ดวงทุก 4 ชั่วโมง
    - โหมดฝึกฝนเพื่อฟื้นฟู (Practice to Earn): ทบทวนการ์ดคำศัพท์ถูก 5 ข้อ ได้รับ 1 หัวใจทันที (Clamp $\le 5$ ดวง)
- [x] **Daily Study Goals & Session Closure:**
  - ตัวเลือกเป้าหมายรายวัน: 5 นาที (Casual) / 10 นาที (Regular) / 15 นาที (Intense)
  - หน้าต่าง **Daily Completion Card**: เมื่อเรียนครบเป้าหมาย แสดงการ์ดสรุปผล (XP วันนี้, คำศัพท์ใหม่, สถิติความแม่นยำ) สร้างความรู้สึกจบเซสชันในแต่ละวัน

### 3. เครื่องยนต์คำนวณการทบทวนคำศัพท์ (SRS Engine: SuperMemo SM-2 & Anti-Overload)
- [x] สร้าง `src/engines/srs/srsEngine.ts` (Pure TypeScript, Zero-UI, 100% Testable):
  - **SuperMemo SM-2 Mathematical Specifications:**
    - ระดับการประเมินของผู้เรียน:
      - `0 = Again` (ลืมสนิท / ตอบผิด)
      - `1 = Hard` (จำได้ยากมาก / ต้องนึกนาน)
      - `2 = Good` (จำได้ถูกต้อง / ใช้ความพยายามปานกลาง)
      - `3 = Easy` (จำได้แม่นยำในทันที)
    - ค่าความง่ายเริ่มต้น (Initial Ease Factor): $EF = 2.5$ (Clamp ขอบเขต $[1.3, 2.5]$)
    - สูตรคำนวณ Ease Factor ใหม่:
      $$EF' = EF + (0.1 - (3 - grade) \times (0.08 + (3 - grade) \times 0.02))$$
    - การคำนวณช่วงวัน (Interval Days):
      - รอบที่ 1 ($Repetitions = 1$): $Interval = 1$ วัน
      - รอบที่ 2 ($Repetitions = 2$): $Interval = 3$ วัน (หรือ $6$ วันสำหรับ Easy)
      - รอบที่ 3+ ($Repetitions \ge 3$): $Interval_n = \lceil Interval_{n-1} \times EF \rceil$
      - หากตอบ Again ($Grade = 0$): รีเซ็ต $Repetitions = 0$, $Interval = 1$ วัน แต่คงค่า $EF$ ไว้
  - **Daily Review Cap Algorithm:** ล็อกจำนวนการ์ดทบทวนสูงสุดไม่เกิน **20 คำ/วัน (`MAX_DAILY_REVIEWS = 20`)** ป้องกันภาวะล้นสมอง (Cognitive Overload)
  - **Backlog Triage Algorithm:** เมื่อผู้เรียนหยุดเรียนไปเกิน 7 วัน หรือมีคำค้างทบทวนสะสมเกิน 30 คำ ระบบจะเปิดสถานะ `isTriageActive: true` และจ่ายคำศัพท์เป็นก้อนย่อยวันละ **10 คำ (`TRIAGE_BATCH_SIZE = 10`)** พร้อมข้อความให้กำลังใจ
- [x] หน้าคลังทบทวนคำศัพท์ (`src/components/srs/ReviewDeck.tsx`):
  - แอนิเมชันพลิกการ์ด CSS 3D Transform 60fps
  - Dock ปุ่มประเมิน 4 ระดับ (Again, Hard, Good, Easy) ชิดขอบล่างตามรัศมีนิ้วโป้ง (Thumb Zone $\ge 48\text{px}$)
  - แสดงคำใบ้ Mnemonic ภาพจำช่วยจำด้านหลังการ์ด
  - Empty Queue State เมื่อทบทวนครบถ้วน

### 4. ระบบบันทึกสถานะสองชั้นและการย้ายข้อมูล (State Migration, IndexedDB & Backup)
- [x] พัฒนา `src/hooks/useUserState.ts`:
  - จัดเก็บลง `LocalStorage` เป็นหลักในคีย์ `hanzero_user_state_v1`
  - ทำ Auto-mirror ไปยัง `IndexedDB` (`hanzero_mirror_db`) ทุกครั้งที่มีการบันทึก พร้อมขอสิทธิ์ `navigator.storage.persist()`
  - บูตผ่าน **Boot Resurrection Gate**: หาก LocalStorage โดน Safari ล้าง ดึงข้อมูลจาก Cold Mirror กลับมาซ่อมแซมอัตโนมัติ พร้อม Ghost-State Overwrite Guard
  - **Contract Interface สำหรับ Custom Hook:**
    ```typescript
    export interface UseUserStateReturn {
      userState: UserStateSchema;
      isLoading: boolean;
      isPersisted: boolean;
      completeLesson: (lessonId: string, xpReward: number) => Promise<void>;
      deductHeart: () => Promise<boolean>; // คืนค่า false หากอยู่ใน Safe Practice Zone หรือหัวใจหมด
      earnHeart: (amount?: number) => Promise<void>;
      updatePreferences: (patch: Partial<PreferencesState>) => Promise<void>;
      exportBackup: () => Promise<string>;
      importBackup: (jsonString: string) => Promise<boolean>;
      quickSyncCode: string;
    }
    ```

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
เมื่อระบบ Quest Map นำทางได้ทั้งสอง Tier, กฎ Safe Practice Zone ทำงานถูกต้อง, ระบบ Daily Goal สรุปผลได้, ระบบ SRS มี Daily Cap ไม่เกิน 20 คำ, Header Bar รองรับหน้าจอ 360px และระบบ Backup/Dual Storage สำรองข้อมูลได้จริง จึงถือว่า Phase 3 เสร็จสมบูรณ์และพร้อมเข้าสู่ [Phase 4: Tier 0 Pinyin Mastery](./phase_04_tier0_pinyin_mastery.md)

