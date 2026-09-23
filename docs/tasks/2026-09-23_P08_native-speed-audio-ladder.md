---
task_id: "TASK-804"
title: "Native Speed Audio Ladder & Commute Podcast Mode (0.75x–1.5x + Ambient Soundscapes + MediaSession)"
type: "FEATURE"
phase: "P08"
created_at: "2026-09-23"
updated_at: "2026-09-23"
status: "TODO"
priority: "HIGH"
assignee: "web_dev"
reviewer: "technical_qa"
related_plan: "docs/plan/phase_08_tier3_4_advanced_immersion.md"
---

# 📋 [TASK-804] Native Speed Audio Ladder & Commute Podcast Mode

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `web_dev` | **ผู้ตรวจรับ:** `technical_qa` & `red_team_adversary`

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
- [ ] `[NEW]` `src/engines/audio/nativeSpeedEngine.ts`
- [ ] `[MODIFY]` `src/engines/audio/audioEngine.ts`
- [ ] `[TEST]` `src/engines/audio/nativeSpeedEngine.test.ts`
- [ ] `[NEW]` `src/components/audio/NativeSpeedAudioLadder.tsx`
- [ ] `[NEW]` `src/components/audio/PodcastPlayerSheet.tsx`
- [ ] `[TEST]` `src/components/audio/NativeSpeedAudioLadder.test.tsx`

---

## 📋 3. รายการสิ่งที่ต้องทำ (Actionable Checklist)
- [ ] พัฒนาโมดูล `nativeSpeedEngine.ts`:
  - นิยาม SpeedStep: `0.75 | 1.0 | 1.25 | 1.5`
  - พัฒนา Web Audio Ambient Soundscapes generator (หรือ white/pink noise filter presets)
  - ผสานเข้ากับ `audioEngine.ts` เพื่อส่ง rate parameter เข้า SpeechSynthesisUtterance
- [ ] พัฒนาฟังก์ชันจัดการ `navigator.mediaSession`:
  - ตั้งค่า metadata (title, artist: 'Hanzero Podcast', artwork)
  - กำหนด action handlers: `play`, `pause`, `previoustrack`, `nexttrack`
- [ ] พัฒนาคอมโพเนนต์ `NativeSpeedAudioLadder.tsx`:
  - ปุ่มปรับระดับความเร็ว 4 ขั้นพร้อมแอนิเมชันสปริง
  - เมนูเลือกเสียง Ambient Soundscape พร้อมแถบสไลด์ปรับความดัง
- [ ] พัฒนาแผงเครื่องเล่น `PodcastPlayerSheet.tsx`:
  - โหมดแสดงสคริปต์คาราโอเกะ (Synchronized Transcript Highlighting)
- [ ] เขียน Unit Tests และทดสอบ Red Team: สแปมกดสลับสปีดรัวๆ 30 ครั้ง และทดสอบ Tab Sleep/Wake

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] **Pitch Intact:** เสียงพูดที่ความเร็ว `1.25x` และ `1.5x` ฟังชัดเจน ไม่กระตุกหรือระดับเสียงเพี้ยน
- [ ] **Audio Context Cleanup:** เมื่อสลับหน้าจอหรือปิดแผงเล่นเสียง ต้องหยุด Ambient sound และคืน Memory ทันที
- [ ] **Lock Screen Controls:** สั่ง Pause/Play จาก Lock Screen ของมือถือได้จริง
- [ ] **Red Team Flood Resistant:** รัวปุ่มเปลี่ยนระดับเสียง 30 ครั้งใน 3 วินาที คิวเสียงไม่ค้างและไม่แฮงก์

---

## 📝 5. บันทึกระหว่างพัฒนาและปัญหาหน้างาน (Dev Notes & Blockers)
- *Web Speech API บน Android/iOS บางเวอร์ชันอาจมีบั๊กเสียงตัดเมื่อหน้าจอดับ ต้องตรวจสอบ Service Worker Audio Fallback ควบคู่ด้วย*
