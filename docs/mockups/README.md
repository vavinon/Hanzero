# 📱 Hanzero UI/UX Design Mockup Catalog

ศูนย์รวมภาพร่างต้นแบบหน้าจอ (High-Fidelity UI Mockups) ของแพลตฟอร์ม **Hanzero (ฮั่นซีโร่)** ออกแบบด้วยปรัชญา **Mobile-First Web App** สไตล์ Modern Oriental ร่วมสมัย เน้นความน่ารัก อบอุ่น ใช้งานง่าย และไม่น่ากลัวสำหรับผู้เริ่มต้น

---

## 🎨 Design System Overview
* **โทนสีหลัก (Primary Palette):** ส้มดินเผา/ทองคำ (**Warm Ochre `#F59E0B`**)
* **สีรอง (Accents):** เขียวหยก (**Jade Green `#10B981`**), แดงชาด (**Imperial Vermilion `#EF4444`**)
* **พื้นหลัง (Background):** กระดาษขาวนวลธรรมชาติ (**Rice Paper `#FDFBF7`**)
* **มาสคอตประจำระบบ:** **น้องกระต่ายหูตก (Lop-eared Bunny)** ในชุดจีนโมเดิร์น

---

## 🖼️ 1. หน้าแรก & แผนที่เดินด่าน (Home & Dual Mode Hub)
ไฟล์: `docs/mockups/01_home_quest_and_library.jpg`

* **Top Bar:** แสดงไฟ Streak 🔥, หัวใจ 5 ดวง ❤️, และแต้ม XP
* **Dual-Mode Switcher:** แถบสลับระหว่าง **"Quest Map"** (แผนที่เดินด่าน) กับ **"All Topics (เลือกเรียนอิสระ)"**
* **Interactive Path:** รางไม้ไผ่เชื่อมโยงศาลาบทเรียน มีดาวสะท้อนคะแนน และมีน้องกระต่ายหูตกคอยยืนโบกมือให้กำลังใจ
* **Bottom Nav:** แถบเมนูด้านล่างสำหรับนิ้วโป้ง (Home, Learn, Practice, Profile)

---

## 📖 2. หน้าเรียนคำศัพท์ (Bite-Sized Flashcard Lesson)
ไฟล์: `docs/mockups/02_vocab_card_lesson.jpg`

* **Progress Bar:** แถบความคืบหน้าด้านบน พร้อมหัวน้องกระต่ายเคลื่อนตามจำนวนข้อ
* **Hanzi Legibility & Grid:** อักษรจีนขนาดใหญ่คมชัด (`你`) ในตารางเก้าช่องแบบ米字格 (Mǐzìgé)
* **Accessible Tone Indicator:** พินอิน `nǐ` พร้อมสัญลักษณ์ระบุวรรณยุกต์เสียง 3 (รองรับผู้มีภาวะตาบอดสี)
* **Trilingual Meaning:** คำแปลภาษาไทย ("คุณ, เธอ") และภาษาอังกฤษ ("You")
* **Interactive Toggles:** สวิตช์เปิด/ปิดพินอิน (Pinyin Display) และปุ่มขยายเส้นขีด (Stroke Inspector)

---

## 🎢 3. มินิเกมรถไฟเหาะวรรณยุกต์ (Bunny Tone Coaster)
ไฟล์: `docs/mockups/03_tone_coaster_game.jpg`

* **Tone Wave Tracks:** รางรถไฟเหาะ 4 ระดับเสียงวรรณยุกต์จีน (1: ราบเรียบ, 2: พุ่งขึ้น, 3: โค้งดิ่งขึ้น, 4: ทิ้งดิ่ง)
* **Interactive Mascot:** น้องกระต่ายหูตกนั่งรถลากไม้ไผ่บนรางวรรณยุกต์
* **Audio Pulse:** ปุ่มกดฟังเสียงซ้ำขนาดใหญ่กลางหน้าจอ
* **Safe Practice Badge:** 🛡️ ป้ายยืนยันโซนปลอดภัย ไม่มีการหักหัวใจ ฝึกฟังได้ไม่จำกัด

---

## 🏆 4. การ์ดเกียรติยศส่งแชร์ความสำเร็จ (Hanzero Milestone Passport)
ไฟล์: `docs/mockups/04_milestone_passport.jpg`

* **Celebration Screen:** เอฟเฟกต์พลุกระดาษและข้อความแสดงความยินดีเมื่อจบ Tier 0
* **Passport Certificate:** การ์ดขอบทองสไตล์กระดาษสา มีภาพน้องกระต่ายสวมหมวกบัณฑิต และตราประทับสีแดงมงคล
* **Shareable Call-to-Action:** ปุ่ม "📥 บันทึกรูป / แชร์ลง Social" ส่งออกเป็นรูปภาพสำหรับโพสต์ลง IG Stories หรือ Facebook ได้ทันที

---

## 🧭 5. สถาปัตยกรรมเมนูนำทาง (Clean Information Architecture - ไร้ความซ้ำซ้อน)
เพื่อป้องกันปัญหาเมนูซ้ำซ้อน (Navigation Redundancy) ระหว่างแถบด้านข้างและแถบด้านบน:
* **เมนูด้านซ้าย (Left Sidebar - Global Navigation):**
  1. 🏠 **เรียนรู้ (Learn):** หน้าหลักสำหรับเดินด่านและเลือกบทเรียน
  2. 🧠 **ทบทวนคำศัพท์ (SRS Deck):** คลังทบทวนคำศัพท์ประจำวัน
  3. 🏆 **บัตรเกียรติยศ (Passport & Badges):** คลังเหรียญตราความสำเร็จ
  4. ⚙️ **ตั้งค่า (Settings):** สำรองข้อมูล / ธีม / ปรับแต่งเสียง
* **สวิตช์ในหน้าเรียนรู้ (In-Page View Switcher):**
  * มีเพียง 2 ตัวเลือกชัดเจน: **`[ 🗺️ แผนที่เดินทาง (Quest Path) | 📚 เลือกเรียนอิสระ (All Topics) ]`**
  * *หมายเหตุ:* การ์ดคำศัพท์ (Vocab Flashcard) และมินิเกมรถไฟเหาะ (Tone Coaster) จะถูกเปิดขึ้นมาตามบริบทเมื่อผู้เรียนกดเลือกด่านหรือหัวข้อบทเรียน ไม่นำมากองเป็นแท็บเมนูซ้ำซ้อนด้านบน
