# 📊 Data Schema & State Architecture

เอกสารนี้ระบุโครงสร้างและรูปแบบข้อมูลของคำศัพท์ เนื้อหาบทเรียน และสถานะความก้าวหน้าของผู้เรียน (User State & SRS Persistence) ในระบบ **Hanzero**

---

## 🗂️ 1. ฐานข้อมูลคำศัพท์มาตรฐาน HSK 3.0 (`data/hsk/`)

| ไฟล์ | รายละเอียด | จำนวนรายการ |
| :--- | :--- | :--- |
| `hsk1.json` | คำศัพท์ HSK 3.0 ระดับ 1 (เรียงตาม Frequency ความถี่การใช้งาน) | 506 คำ |
| `hsk2.json` | คำศัพท์ HSK 3.0 ระดับ 2 | 750 คำ |
| `hsk3.json` | คำศัพท์ HSK 3.0 ระดับ 3 | 953 คำ |
| `hsk4.json` | คำศัพท์ HSK 3.0 ระดับ 4 | 972 คำ |
| `hsk5.json` | คำศัพท์ HSK 3.0 ระดับ 5 | 1,059 คำ |
| `hsk6.json` | คำศัพท์ HSK 3.0 ระดับ 6 | 1,123 คำ |
| `hsk7-9.json` | คำศัพท์ HSK 3.0 ระดับ 7 - 9 (ระดับสูง/การทูต/วิชาการ) | 5,606 คำ |
| `characters.json` | ฐานข้อมูลตัวอักษรจีนเดี่ยว (Characters) แบ่งตามระดับ | 3,000 ตัว |
| `grammar.json` | ฐานข้อมูลไวยากรณ์ (Grammar Points) | 573 หัวข้อ |
| `summary.json` | สรุปภาพรวมและสถิติข้อมูล | - |

```typescript
interface HskWordEntry {
  id: string;              // รหัสประจำคำ เช่น "hsk1_0001"
  hanzi: string;           // ตัวอักษรจีนตัวย่อ (Simplified) เช่น "我"
  traditional: string;     // ตัวอักษรจีนตัวเต็ม (Traditional) เช่น "我"
  pinyin: string;          // พินอินมาตรฐานพจนานุกรมคงรูปเดิม (Standard Dictionary Pinyin) เช่น "bù kèqi", "nǐ hǎo"
  display_pinyin?: string; // พินอินแสดงผลตามเสียงผันจริง (Pedagogical Sandhi Pinyin) เช่น "bú kèqi"
  sandhi_rule?: "3+3" | "half3" | "bu" | "yi" | null; // กฎการผันเสียงกำกับ
  pinyin_tone: string;     // พินอินแบบตัวเลขกำกับเสียง เช่น "wo3"
  bopomofo: string;        // จู้อิน (Zhuyin) เช่น "ㄨㄛˇ"
  radical: string;         // หมวดนำอักษรจีน (Radical) เช่น "戈"
  level: number | string;  // ระดับ HSK 3.0 (1, 2, 3, 4, 5, 6, "7-9")
  level_old: number | null;// เทียบระดับ HSK 2.0 (1-6)
  frequency: number;       // ลำดับความถี่การใช้งาน (ยิ่งน้อยยิ่งเจอบ่อย)
  pos: string[];           // ชนิดของคำ (Part of Speech) เช่น ["r"] (pronoun)
  definitions: string[];   // ความหมายภาษาอังกฤษ
  classifiers: string[];   // ลักษณนามที่ใช้ร่วมกัน เช่น ["个", "张"]
  meaning_th: string;      // ความหมายภาษาไทย (สำหรับแสดงผลหลักในแอป)
}
```

---

## 🗺️ 2. สารบัญกลางและโมเดลบทเรียน (`data/lessons/`)

### Master Manifest Schema: `curriculum_manifest.json`
```typescript
interface CurriculumManifest {
  project: string;
  version: string;
  total_tiers: number;
  tiers: Array<{
    tier_id: string;          // e.g. "tier0", "tier1", "tier2", "tier3", "tier4"
    tier_number: number;      // 0, 1, 2, 3, 4
    name: { zh: string; th: string; en: string };
    hsk_level: string;        // "Pre-HSK", "HSK 1 - 2", ...
    theme: {
      color_primary: string;
      color_secondary: string;
      color_bg: string;
      badge_icon: string;
    };
    total_units: number;
    units: Array<{
      unit_id: string;        // e.g. "tier1_u01"
      unit_number: number;
      title: { zh: string; th: string; en: string };
      description_th: string;
      icon: string;
      estimated_minutes: number;
      xp_reward: number;
      lesson_count: number;
      status: "ready" | "blueprint_ready" | "in_progress";
      file: string;           // พาธไฟล์สัมพัทธ์ใน data/lessons/
    }>;
  }>;
}
```

### Dual Lesson Archetypes:
* **Archetype A (Tier 0: Phonetics & Stroke Order):** มีฟิลด์ `sound_cards` (รูปปาก, เทียบเสียงไทย, ท่าทางร่างกาย, คำตัวอย่าง) และ `stroke_cards` (แอนิเมชันเส้นขีด, รากศัพท์)
* **Archetype B (Tier 1 - 4: Can-Do Daily Communication):** มีฟิลด์ `vocabulary` (3 ภาษา + kid_mnemonic + body_gesture), `tone_rule`, `grammar_bite`, `dialogue`, `quizzes` (4 มิติ) และ `boss_challenge`

---

## 💾 3. สถานะผู้เรียนและระบบบันทึกความก้าวหน้า (Tiered Storage Architecture)

เพื่อรองรับการขยายตัวของผู้เรียนสู่ระดับ Tier 4 (3,000–5,000 คำ) โดยไม่ชนเพดานโควตา 5MB ของ `LocalStorage` ระบบจะแบ่งการจัดเก็บออกเป็น **2 ชั้น (Hot vs Cold Partitioning)** อย่างชัดเจน:

### 3.1 Hot State (`LocalStorage: hanzero_user_state_v1`)
เก็บเฉพาะ Metadata สำคัญขนาดเล็กมาก (**< 50 KB**) เพื่อให้อ่านค่าได้แบบ Synchronous ตอนเริ่มต้นเปิดแอป (Zero Layout Shift / Instant Render):

```typescript
export interface UserStateSchema {
  schema_version: 1;                 // สำหรับการตรวจเช็กและ Migration อัตโนมัติ
  updated_at: string;                // ISO Date string

  // การตั้งค่าความพึงพอใจ (Preferences)
  preferences: {
    theme: "light" | "dark";
    silent_mode: boolean;            // โหมดเดินทาง ไม่เปิดเสียง
    speech_rate: number;             // 0.75 - 1.0
    audio_sfx_volume: number;        // 0.0 - 1.0
    hanzi_font_style: "wenkai" | "sans";
  };

  // ความก้าวหน้าในหลักสูตร (Core Progress)
  progress: {
    current_tier: string;            // เช่น "tier0" หรือ "tier1"
    unlocked_tiers: string[];
    unlocked_units: string[];
    completed_lessons: string[];     // Array ของ lesson_id เช่น ["t1_u01_l01"]
    streak: {
      count: number;
      last_active_date: string;      // "YYYY-MM-DD"
      freeze_tokens: number;         // โทเค็นป้องกันไฟดับ
    };
    hearts: {
      current: number;               // 0 - 5
      max: number;                   // ปกติ 5
      last_regen_timestamp: number;  // timestamp มิลลิวินาที
    };
    xp: number;
    level: number;
  };

  // ดัชนีสรุปย่อของ SRS สำหรับแสดงผลหน้า Dashboard (< 5 KB)
  srs_summary: {
    total_learned_count: number;
    due_today_count: number;
    last_review_date: string;
  };

  // ข้อมูลสถิติเชิงการเรียนรู้แบบนิรนาม (Zero-Cost Local Diagnostics)
  diagnostics: {
    confused_pinyin_tones: Record<string, number>; // เช่น { "sh_vs_s": 4, "tone2_vs_tone3": 6 }
    total_practice_count: number;
  };
}
```

### 3.2 Cold State (`IndexedDB: 3-Database Architecture`)
เพื่อป้องกันปัญหาฐานข้อมูลชนกัน (Lock contention) และเพิ่มความทนทานต่อ Safari 7-day ITP data eviction โค้ดจริงแบ่งการจัดเก็บใน IndexedDB ออกเป็น **3 ฐานข้อมูลอิสระ (3 Isolated Databases)**:

1. **`hanzero_srs_db`** (ObjectStore: `srs_records`, Primary Key: `word_id`):
   - เก็บสถานะการจำคำศัพท์ SM-2, วันครบกำหนดทบทวน, Ease Factor, และประวัติการทบทวน
2. **`hanzero_strokes_db`** (ObjectStore: `hanzi_strokes`, Primary Key: `char`):
   - เก็บข้อมูลแคชเวกเตอร์ลำดับขีดอักษรจีน (Strokes & Medians) เพื่อโหลดซ้ำได้ทันทีแม้ออฟไลน์
3. **`hanzero_mirror_db`** (ObjectStore: `cold_hot_mirror`, Key: `'active_user_state'`):
   - ทำสำเนา Hot State (`hanzero_user_state_v1`) ลงใน IndexedDB ควบคู่กับ LocalStorage เสมอ เพื่อรองรับกลไก **Boot Resurrection Gate**

```typescript
// ObjectStore: "srs_records" in "hanzero_srs_db" (Primary Key: word_id)
export interface SrsItemRecord {
  word_id: string;               // e.g. "hsk1_0001"
  hanzi: string;
  pinyin: string;
  meaning_th: string;
  ease_factor: number;          // เริ่มต้น 2.5 (SM-2)
  interval_days: number;        // วัน
  repetitions: number;          // จำนวนรอบที่จำได้สำเร็จ
  due_date: string;             // "YYYY-MM-DD" ที่ต้องทบทวน
  last_reviewed: string;        // ISO Date
  review_history: Array<{       // ประวัติการตอบย้อนหลัง
    date: string;
    grade: number;              // 0 - 3 (Again, Hard, Good, Easy)
  }>;
}

// ObjectStore: "hanzi_strokes" in "hanzero_strokes_db" (Primary Key: char)
export interface HanziStrokeCacheRecord {
  char: string;                 // อักษรจีน 1 ตัว เช่น "我"
  strokes: string[];            // SVG stroke data
  medians: number[][][];        // แนวเส้นสำหรับตรวจจับการลาก
  cached_at: number;            // Timestamp Epoch ms
}
```

---

## 🛡️ 4. กฎความปลอดภัยทางข้อมูลและการย้ายข้อมูล (Data Safety & Sync Rules)

### 4.1 Safe Practice Zone Flag
* ในแบบทดสอบใดๆ ที่มีแอตทริบิวต์ `is_safe_practice_zone: true` (รวมถึงบทเรียน Tier 0 ทั้งหมด และโหมดทบทวน SRS Flashcards) -> ระบบจะปิดการหักหัวใจโดยสิ้นเชิงเมื่อผู้เรียนตอบผิด

### 4.2 Auto-Migration Pattern
```typescript
export function migrateUserState(raw: unknown): UserStateSchema {
  if (!raw || typeof raw !== "object") return createDefaultUserState();
  const data = raw as Partial<UserStateSchema>;
  
  // ตรวจจับ Schema Version
  if (!data.schema_version || data.schema_version < 1) {
    return {
      ...createDefaultUserState(),
      ...data,
      schema_version: 1,
      preferences: { ...createDefaultUserState().preferences, ...data.preferences },
      progress: { ...createDefaultUserState().progress, ...data.progress },
    };
  }
  return data as UserStateSchema;
}
```

### 4.3 ระบบพกพาและสำรองข้อมูลข้ามอุปกรณ์ (Portability & Sync Protocols)

1. **Persistent Storage Protection (`navigator.storage.persist()`):**
   - เรียกใช้สิทธิ์ Storage Persistence ตั้งแต่โหลดแอป เพื่อสั่งให้เบราว์เซอร์ (Safari/Chrome) จัดเก็บข้อมูลใน IndexedDB แบบ **Permanent** ป้องกัน WebKit ITP 7-day inactivity wipe และป้องกันการถูก OS เคลียร์แคชอัตโนมัติ

2. **Emergency Quick Sync String (1-Tap Text Code):**
   - สำหรับผู้ใช้ทั่วไปที่ไม่ได้ดาวน์โหลด JSON บันทึกข้อมูล:
   - แปลง Key Metrics (Tier, Unit, Lessons, Streak, XP, Level, Checksum) เป็นสตริงสั้นๆ เช่น:
     `HZ1-T1-U05-L14-S07-X1250-C9A2`
   - ผู้เรียนสามารถแตะปุ่ม "คัดลอกรหัสกู้คืน" เพียงครั้งเดียว เพื่อแปะเก็บไว้ใน Note, LINE Keep หรือแชตส่วนตัว เมื่อเปลี่ยนเครื่องหรือเผลอล้างประวัติ สามารถวางรหัสนี้เพื่อกู้สถานะบทเรียนได้ทันที

3. **1-Click Full JSON Snapshot (Export / Import):**
   - ส่งออกไฟล์ `hanzero_backup_YYYY-MM-DD.json` ที่รวมทั้ง Hot State (`hanzero_user_state_v1`) และ Cold State (`srs_records` จาก IndexedDB) เป็นก้อนเดียว
   ```json
   {
     "app": "Hanzero",
     "export_version": 1,
     "exported_at": "2026-09-15T12:00:00.000Z",
     "hot_state": { ... },
     "srs_records": [ ... ]
   }
   ```

4. **Boot Resurrection Gate (Auto-Healing from Cold Mirror):**
   - เมื่อเริ่มต้นแอป ระบบจะตรวจสอบ Hot State ใน `LocalStorage` หากตรวจพบว่าสูญหายหรือเสียหาย (เช่น ถูก Safari ITP ล้างหลังจากไม่เปิด 7 วัน)
   - ระบบจะเข้าสู่ **Resurrection Gate** โดยดึงสำเนาล่าสุดจาก `hanzero_mirror_db` (Store: `cold_hot_mirror`) ขึ้นมาเขียนทับใน `LocalStorage` อัตโนมัติทันที
   - ผู้เรียนจะไม่สูญเสียความก้าวหน้าแม้แต่น้อย (Zero Progress Loss)

5. **Compressed Base64 QR Sync (Zero-Server P2P Migration):**
   - ผู้เรียนสามารถสร้าง Dynamic QR Code จากมือถือเครื่องเดิม เพื่อให้แท็บเล็ตหรือคอมพิวเตอร์เครื่องใหม่สแกนกล้องรับสถานะความก้าวหน้าได้ทันทีภายใน 5 วินาที
   - ใช้งานไลบรารี `pako` (Deflate/Gzip) บีบอัด Payload ของ Hot State + Active SRS Records เหลือประมาณ **1.5 KB - 2.5 KB** บรรจุลงใน QR Code ได้อย่างปลอดภัย

6. **Future BYOS Cloud Sync (Bring-Your-Own-Storage):**
   - สถาปัตยกรรมเตรียม Hook สำหรับเชื่อมต่อ Google Drive REST API (ผ่าน Client-side OAuth 2.0 PKCE) เพื่อซิงก์ไฟล์สำรองไปยังโฟลเดอร์ส่วนตัว `AppData` ของผู้เรียนโดยตรง ฟรีค่าเซิร์ฟเวอร์ 100% และข้อมูลเป็นส่วนตัวสูงสุด

