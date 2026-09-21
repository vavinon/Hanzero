---
task_id: "TASK-504"
title: "Phase 5 Slice 5.4: Local Diagnostics & Playwright E2E Testing Suite"
type: "FEATURE"
phase: "P05"
created_at: "2026-09-21"
updated_at: "2026-09-21"
status: "TODO"
priority: "HIGH"
assignee: "technical_qa"
reviewer: "red_team_adversary"
related_plan: "docs/plan/phase_05_tier1_content_rollout.md"
---

# 📋 [TASK-504] Phase 5 Slice 5.4: Local Diagnostics & Playwright E2E Testing Suite

> **สถานะปัจจุบัน:** `TODO` ⏳ | **ผู้รับผิดชอบ:** `technical_qa` | **ผู้ตรวจรับ:** `red_team_adversary` & `web_dev` | **ผ่านการ Hardening รอบที่ 2 โดย Red Team** 🛡️🔥

---

## 🎯 1. วัตถุประสงค์และขอบเขต (Objective & Scope)
ติดตั้งระบบสถิตินิรนามในตัวเครื่อง (Local Diagnostics) และระบบทดสอบอัตโนมัติบนเบราว์เซอร์จริง (Playwright E2E Suite) เพื่อรับประกันความลื่นไหลระดับ 60fps และตรวจจับข้อผิดพลาดก่อนถึงมือผู้ใช้งาน:
1. **Zero-Cost Local Diagnostics:** ออกแบบ service บันทึกสถิติ 3 จุดที่ผู้เรียนตอบผิดซ้ำบ่อยที่สุด (Top 3 Bottlenecks) และสถิติการใช้งาน Silent Mode ลงใน IndexedDB/LocalStorage
2. **Headless Audio & Network Hardening:**
   - ติดตั้ง Chromium Launch Args: `--autoplay-policy=no-user-gesture-required` ป้องกัน Autoplay Block ในโหมด Headless
   - ฉีด Mock Interceptor สำหรับเครือข่าย `dict.youdao.com` เพื่อป้องกันปัญหา Timeout 5 วินาที หรือถูกบล็อก HTTP 403 บน GitHub Actions Runners
3. **6 Essential User Journeys:**
   - Journey 1: First-Run Onboarding & Safe Practice Zone (ตอบผิดใน Tier 0 หัวใจไม่ลด)
   - Journey 2: Fast-Track to Tier 1 & Heart Penalty (ตอบผิดใน Tier 1 หัวใจลดจนหมดและแสดง Refill Modal)
   - Journey 3: SRS Flashcard Review Loop (ทบทวนการ์ด, ปรับ SM-2 Ease Factor, ซิงก์ IndexedDB)
   - Journey 4: Voice Health Alert Modal (จำลองระบบปฏิบัติการที่ไม่มีชุดเสียงจีน)
   - Journey 5: Small Screen 320px Squeeze (ตรวจจับการตัดหัววรรณยุกต์ และขนาดปุ่มสัมผัส $\ge 40\text{px}$)
   - **Journey 6 (New - Red Team Audit):** Storage Reset & Anti-Zombie Resurrection Test (ล้างข้อมูลแล้วรีเฟรช ข้อมูลเก่าต้องไม่ถูก IndexedDB mirror ฟื้นคืนชีพกลับมา)

---

## 📂 2. ไฟล์ที่ส่งมอบ (Delivered Files)
- [ ] `[NEW]` `playwright.config.ts` (Desktop Chrome, Android 360x640, iPhone SE 320x568)
- [ ] `[NEW]` `e2e/fixtures/mockApis.ts` (Deterministic AudioContext, SpeechSynthesis & Youdao Mock Harness)
- [ ] `[NEW]` `e2e/onboarding-safezone.spec.ts` (Journey 1)
- [ ] `[NEW]` `e2e/tier1-lessons.spec.ts` (Journey 2)
- [ ] `[NEW]` `e2e/srs-review.spec.ts` (Journey 3)
- [ ] `[NEW]` `e2e/voice-health.spec.ts` (Journey 4)
- [ ] `[NEW]` `e2e/mobile-viewport.spec.ts` (Journey 5)
- [ ] `[NEW]` `e2e/storage-resurrection.spec.ts` (Journey 6)
- [ ] `[NEW]` `src/engines/storage/localDiagnostics.ts` (Zero-Cost Local Telemetry Engine)
- [ ] `[MODIFY]` `src/engines/storage/storageEngine.ts` (แก้บั๊ก Zombie Auto-Resurrection เมื่อผู้ใช้ตั้งใจล้างข้อมูล)
- [ ] `[MODIFY]` `package.json` (เพิ่ม `@playwright/test` และ script `test:e2e`)

---

## 📋 3. สถาปัตยกรรมและรายละเอียดทางเทคนิค (Technical Specifications)

### 3.1 Headless Audio & Network Mock Harness (`e2e/fixtures/mockApis.ts`)
```typescript
import { Page } from '@playwright/test';

export interface MockAudioOptions {
  chineseVoiceAvailable?: boolean;
}

export async function injectWebAudioAndSpeechMocks(page: Page, options: MockAudioOptions = {}) {
  const chineseVoiceAvailable = options.chineseVoiceAvailable ?? true;

  // 1. ดักจับและ Mock Youdao Fallback Network Requests ป้องกัน Timeout 5 วินาทีใน CI
  await page.route('**/dictvoice*', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'audio/wav',
      body: Buffer.from('UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA', 'base64'),
    });
  });

  // 2. ฉีด Mock AudioContext และ SpeechSynthesis เข้า Browser Environment
  await page.addInitScript(({ hasVoice }) => {
    class MockAudioNode { connect() { return this; } disconnect() {} }
    class MockAudioContext {
      state = 'running';
      currentTime = 0;
      destination = new MockAudioNode();
      createOscillator() {
        return {
          connect: () => {}, start: () => {}, stop: () => {},
          frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
        };
      }
      createGain() {
        return {
          connect: () => {},
          gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
        };
      }
      resume() { return Promise.resolve(); }
      suspend() { return Promise.resolve(); }
      close() { return Promise.resolve(); }
    }
    // @ts-expect-error Mock assignment
    window.AudioContext = MockAudioContext;
    // @ts-expect-error Mock assignment
    window.webkitAudioContext = MockAudioContext;

    const mockVoices = hasVoice ? [{ name: 'Tingting (Neural)', lang: 'zh-CN', default: true, localService: true, voiceURI: 'Tingting' }] : [];
    class MockSpeechSynthesisUtterance {
      text: string; lang = 'zh-CN'; rate = 1; pitch = 1; volume = 1;
      onstart: (() => void) | null = null; onend: (() => void) | null = null;
      constructor(text = '') { this.text = text; }
    }
    const mockSpeechSynthesis = {
      paused: false, pending: false, speaking: false,
      getVoices: () => mockVoices,
      speak: (utterance: MockSpeechSynthesisUtterance) => {
        mockSpeechSynthesis.speaking = true;
        setTimeout(() => {
          if (utterance.onstart) utterance.onstart();
          setTimeout(() => {
            mockSpeechSynthesis.speaking = false;
            if (utterance.onend) utterance.onend();
          }, 30);
        }, 10);
      },
      cancel: () => { mockSpeechSynthesis.speaking = false; },
      pause: () => { mockSpeechSynthesis.paused = true; },
      resume: () => { mockSpeechSynthesis.paused = false; },
      addEventListener: (type: string, listener: () => void) => {
        if (type === 'voiceschanged') setTimeout(listener, 10);
      },
      removeEventListener: () => {},
    };
    // @ts-expect-error Mock assignment
    window.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
    // @ts-expect-error Mock assignment
    window.speechSynthesis = mockSpeechSynthesis;
  }, { hasVoice: chineseVoiceAvailable });
}
```

### 3.2 รายละเอียดการทดสอบ 6 User Journeys

#### Journey 1: First-Run Onboarding & Safe Practice Zone
1. ล้าง Storage $\rightarrow$ เข้าเว็บ $\rightarrow$ ยืนยันว่า `WelcomeModal` แสดง
2. เลือก "เริ่มจาก 0 (Tier 0)" $\rightarrow$ กด "เริ่มต้นก้าวแรก" $\rightarrow$ ยืนยันเข้าสู่ Tier 0
3. คลิกบทเรียน 0.1 $\rightarrow$ ไปที่แท็บแบบทดสอบ $\rightarrow$ ยืนยันแบนเนอร์ Safe Practice Zone
4. จงใจตอบผิด $\rightarrow$ ยืนยันหัวใจคงที่ 5 ดวงเสมอ ไม่มีการตัดหัวใจ

#### Journey 2: Fast-Track to Tier 1 & Heart Penalty
1. เริ่มเซสชันใหม่ $\rightarrow$ เลือก "เคยเรียนมาบ้าง (Tier 1)" $\rightarrow$ โหลดเข้า Unit 1 ทันที
2. ไปที่แท็บแบบทดสอบ $\rightarrow$ ยืนยันไม่มีแบนเนอร์ Safe Practice Zone
3. ตอบผิด 1 ครั้ง $\rightarrow$ หัวใจลดเหลือ 4 ดวง
4. ตอบผิดจนหัวใจเหลือ 0 $\rightarrow$ แสดงหน้าต่าง Heart Refill Modal อย่างถูกต้อง

#### Journey 3: SRS Flashcard Review Loop
1. Pre-seed IndexedDB ด้วยการ์ดคำศัพท์ 3 คำที่ครบกำหนดทบทวนวันนี้
2. คลิกปุ่มทบทวนคำศัพท์บน HeaderBar $\rightarrow$ เข้าสู่ `ReviewDeck`
3. กดปุ่ม "แสดงเฉลย" $\rightarrow$ ตรวจสอบพินอิน คำแปลไทย และภาพช่วยจำ
4. กดปุ่มประเมิน "ดี (Good - Grade 2)"
5. ตรวจสอบ IndexedDB จาก Browser Context: Repetitions เพิ่มขึ้น, Ease Factor อัปเดตตาม SM-2 และ Due Date ขยับไปวันถัดไป

#### Journey 4: Voice Health Alert Modal
1. ฉีด Mock สภาพแวดล้อมที่ไร้เสียงจีน `{ chineseVoiceAvailable: false }`
2. เข้าแอปพลิเคชัน $\rightarrow$ เปิด `VoiceHealthModal`
3. ยืนยันสถานะ `grade: 'fallback'` (โหมดคลื่นเสียง Sine Wave หรือสตรีมเน็ตเวิร์ก)
4. สลับแท็บ OS (Windows, macOS, iOS, Android) และยืนยันคำแนะนำติดตั้งเสียงแสดงผลถูกต้อง

#### Journey 5: Small Screen 320px Squeeze (iPhone SE 1st Gen)
1. ปรับขนาด Viewport เป็น `{ width: 320, height: 568 }`
2. ตรวจสอบว่า `document.documentElement.scrollWidth <= 320` (ไม่มีเนื้อหาล้นจอแนวนอน)
3. ตรวจสอบปุ่มกดทุกปุ่มมีความสูง $\ge 40\text{px}$ (Touch Target ปลอดภัย)
4. ยืนยันว่าองค์ประกอบ `.pinyin` มี CSS `line-height >= 1.3` และ padding-top $\ge 2\text{px}$ ไม่ถูกตัดหมวกวรรณยุกต์

#### Journey 6: Storage Reset & Anti-Zombie Resurrection Test (Red Team Trap Hardening)
1. ผู้เรียนกดปุ่ม "ล้างข้อมูลทั้งหมด" ใน DevDrawer / Settings
2. ตรวจสอบว่า LocalStorage และ IndexedDB ถูกล้างอย่างสมบูรณ์
3. สั่ง Reload หน้าเว็บ
4. ยืนยันว่าระบบเข้าสู่หน้าต่าง WelcomeModal ต้อนรับผู้ใช้ใหม่ และ **ไม่ดึงข้อมูลเก่าจาก Cold Mirror กลับมาฟื้นคืนชีพ (Anti-Zombie Gate)**

---

## 🧪 4. เกณฑ์การตรวจรับคุณภาพ (Acceptance & Quality Gate)
- [ ] ติดตั้ง Playwright และ Chromium/WebKit ได้สมบูรณ์
- [ ] รัน `npm run test:e2e` ผ่านครบทั้ง 6 User Journeys (100% Pass)
- [ ] ไม่มีปัญหา Flaky Test (รันซ้ำ 3 รอบผ่านฉลุยทุกรอบ)
- [ ] รันบน Viewport 320px และ 360px ได้อย่างสมบูรณ์แบบ
- [ ] มีการจัดเก็บ Local Diagnostics ลง IndexedDB โดยไม่มีผลต่อประสิทธิภาพ
