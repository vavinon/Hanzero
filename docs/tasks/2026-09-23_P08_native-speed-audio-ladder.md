---
task_id: "TASK-804"
title: "Native Speed Audio Ladder & Commute Podcast Mode (0.75x–1.5x + Ambient Soundscapes + MediaSession)"
type: "FEATURE"
phase: "P08"
created_at: "2026-09-23"
updated_at: "2026-09-24"
status: "DONE"
priority: "HIGH"
assignee: "web_dev"
reviewer: "technical_qa"
related_plan: "docs/plan/phase_08_tier3_4_advanced_immersion.md"
---

# 📋 [TASK-804] Native Speed Audio Ladder & Commute Podcast Mode

> **สถานะปัจจุบัน:** `DONE` ✅ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `technical_qa` & `red_team_adversary`

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
ยกระดับประสบการณ์การฟังภาษาจีนความเร็วสมจริง และระบบเสียงพอดแคสต์สำหรับการฝึกฟังระหว่างเดินทาง:
1. **Multi-Step Speed Ladder (`src/engines/audio/nativeSpeedEngine.ts` & `audioEngine.ts`):**
   - ตัวควบคุมความเร็ว 4 ระดับ: `0.75x` (วิเคราะห์คำเชื่อม/แกะไวยากรณ์), `1.0x` (มาตรฐาน), `1.25x` (ความเร็วคนจีนพูดคุยทั่วไป), `1.5x` (ความเร็วข่าวสาร/พอดแคสต์ด่วน)
   - ปรับความเร็วโดยรักษาระดับ Pitch (Pitch-Preserved Rate) ไม่ให้เสียงแหลมเป็นชิปมังก์
2. **Ambient Soundscape Layer (Web Audio API Synthesizer / AudioNodes):**
   - เลเยอร์เสียงบรรยากาศสังเคราะห์ (Office chatter, Subway train, Street cafe) เพื่อฝึกทักษะการฟังจับใจความท่ามกลางเสียงรบกวนจริง
   - ตัวปรับระดับเสียงบรรยากาศ (Ambient Volume 0–100%)
3. **Commute Podcast Mode & MediaSession API:**
   - เล่นเสียงบทสนทนาและคำศัพท์ต่อเนื่องเป็นเพลย์ลิสต์
   - ผสานกับ `navigator.mediaSession` แสดงชื่อบทเรียนและคำศัพท์บน Lock Screen มือถือ พร้อมรองรับปุ่มควบคุมจากหูฟังบลูทูธ
   - ระบบเบื้องหลังทำงานต่อเนื่องแม้ย่อเบราว์เซอร์หรือปิดหน้าจอมือถือ

---

## 📂 2. ไฟล์ที่เกี่ยวข้อง (Affected Files)
- [x] `[NEW]` `src/types/audio.ts`
- [x] `[NEW]` `src/data/audio/podcastCatalog.ts`
- [x] `[NEW]` `src/engines/audio/nativeSpeedEngine.ts`
- [x] `[MODIFY]` `src/engines/audio/audioEngine.ts`
- [x] `[TEST]` `src/engines/audio/nativeSpeedEngine.test.ts`
- [x] `[TEST]` `src/engines/audio/nativeSpeedChaos.test.ts`
- [x] `[NEW]` `src/components/audio/NativeSpeedAudioLadder.tsx`
- [x] `[NEW]` `src/components/audio/PodcastPlayerSheet.tsx`
- [x] `[TEST]` `src/components/audio/NativeSpeedAudioLadder.test.tsx`
- [x] `[TEST]` `src/components/audio/PodcastPlayerSheet.test.tsx`
- [x] `[MODIFY]` `src/App.tsx`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [x] พัฒนาโมดูล `nativeSpeedEngine.ts`:
  - นิยาม SpeedStep: `0.75 | 1.0 | 1.25 | 1.5`
  - พัฒนา Web Audio Ambient Soundscapes generator (Pink/White noise filter & Biquad presets)
  - ผสานเข้ากับ `audioEngine.ts` ด้วยฟังก์ชัน `speakWithNativeSpeed`
- [x] พัฒนาฟังก์ชันจัดการ `navigator.mediaSession`:
  - ตั้งค่า metadata (title, artist: 'Hanzero 汉Zero', album, artwork)
  - กำหนด action handlers: `play`, `pause`, `previoustrack`, `nexttrack`, `seekto`
- [x] พัฒนาคอมโพเนนต์ `NativeSpeedAudioLadder.tsx`:
  - ปุ่มปรับระดับความเร็ว 4 ขั้นพร้อมแอนิเมชันสปริง
  - เมนูเลือกเสียง Ambient Soundscape พร้อมแถบสไลด์ปรับความดัง
- [x] พัฒนาแผงเครื่องเล่น `PodcastPlayerSheet.tsx`:
  - โหมดแสดงสคริปต์คาราโอเกะ (Synchronized Transcript Highlighting)
  - แผ่นเสียง/ปกหมุนนุ่มนวล พร้อมปุ่มควบคุมแบบ Touch-friendly (≥ 48px)
- [x] เขียน Unit Tests และทดสอบ Red Team: สแปมกดสลับสปีดรัวๆ 100 ครั้ง และทดสอบเสียงบรรยากาศ (58 test files / 947 tests ผ่าน 100%)

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [x] **Pitch Intact:** เสียงพูดที่ความเร็ว `1.25x` และ `1.5x` ฟังชัดเจน ไม่กระตุกหรือระดับเสียงเพี้ยน
- [x] **Audio Context Cleanup:** เมื่อสลับหน้าจอหรือปิดแผงเล่นเสียง สั่งหยุด Ambient sound และคืน Memory ทันที
- [x] **Lock Screen Controls:** สั่ง Pause/Play จาก Lock Screen ของมือถือและหูฟังผ่าน `navigator.mediaSession`
- [x] **Red Team Flood Resistant:** รัวปุ่มเปลี่ยนระดับเสียง 100 ครั้ง คิวเสียงไม่ค้างและไม่แฮงก์
- [x] **Type Safe & Zero Any:** ผ่าน `tsc --noEmit` ไร้ Type Warning และขนาด JS chunk เพียง 25.37 kB (12.44 kB gzipped)

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *กำหนด safe fallback ในกรณีที่รันบน headless testing environment ที่ไม่มี window.MediaMetadata constructor*
- *สกัดเสียง ambient ด้วย Web Audio BiquadFilterNode และ Paul Kellet pink noise algorithm ช่วยลดขนาดไฟล์ MP3 เป็น 0 KB*
