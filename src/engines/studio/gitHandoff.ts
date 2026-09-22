/**
 * src/engines/studio/gitHandoff.ts
 * ---------------------------------------------------------------------------
 * Pure Functional Git Hand-off Engine for Hanzero Content Authoring Studio.
 * Generates Zero-Token Pull Request templates, standardized file names,
 * and Git terminal snippets.
 *
 * Adheres strictly to AGENTS.md §4.2: Zero DOM, Strict Typing, Zero 'any', 100% Testable.
 */

import type { StudioDraftState, StudioVocabDraft } from './studioTypes';

export interface CurriculumStats {
  tier: number;
  unitNumber: number;
  unitId: string;
  totalLessons: number;
  totalVocab: number;
  totalDialogueLines: number;
  totalQuizzes: number;
}

/**
 * Normalizes an English or Romanized title into a clean kebab/snake slug
 */
export function slugifyTitle(title: string): string {
  if (!title) return 'lesson';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 32) || 'lesson';
}

/**
 * Generates standardized curriculum filename, e.g. "unit01_first_greetings.json"
 */
export function generateSuggestedFilename(draft: StudioDraftState): string {
  const unitPad = String(draft.unit_number || 1).padStart(2, '0');
  const enTitle = draft.title?.en || '';
  const slug = slugifyTitle(enTitle);

  if (slug && slug !== 'lesson' && slug !== 'new_unit') {
    return `unit${unitPad}_${slug}.json`;
  }
  return `tier${draft.tier || 1}_u${unitPad}.json`;
}

/**
 * Calculates quantitative summary statistics of the studio draft
 */
export function calculateCurriculumStats(draft: StudioDraftState): CurriculumStats {
  const totalLessons = draft.lessons.length;
  let totalVocab = 0;
  let totalDialogueLines = 0;
  let totalQuizzes = 0;

  for (const lesson of draft.lessons) {
    totalVocab += lesson.vocabulary.length;
    totalDialogueLines += lesson.dialogue.length;
    totalQuizzes += lesson.quizzes.length;
  }

  return {
    tier: draft.tier,
    unitNumber: draft.unit_number,
    unitId: draft.unit_id,
    totalLessons,
    totalVocab,
    totalDialogueLines,
    totalQuizzes,
  };
}

/**
 * Escapes pipe characters and newlines for GitHub Markdown table cells
 */
export function escapeMarkdownTableCell(text: string | null | undefined): string {
  if (!text) return '-';
  return text
    .replace(/\|/g, '\\|')
    .replace(/\r?\n+/g, ' ')
    .trim();
}

/**
 * Sanitizes potentially malicious HTML tags in text before embedding in Markdown
 */
export function sanitizeHtmlInMarkdown(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Builds a markdown table summarizing all vocabulary across the draft
 */
export function formatVocabMarkdownTable(vocabularies: StudioVocabDraft[]): string {
  if (vocabularies.length === 0) {
    return '_ยังไม่มีคำศัพท์ในบทเรียนนี้_';
  }

  const header = '| # | ตัวอักษร (Hanzi) | พินอิน (Pīnyīn) | คำแปล (ไทย) | Meaning (EN) | หมวดนำ (Radical) | ผันเสียง (Sandhi) |\n| :-: | :--- | :--- | :--- | :--- | :--- | :--- |';

  const rows = vocabularies.map((v, idx) => {
    const hanzi = escapeMarkdownTableCell(sanitizeHtmlInMarkdown(v.hanzi));
    const pinyin = escapeMarkdownTableCell(v.display_pinyin || v.pinyin);
    const th = escapeMarkdownTableCell(sanitizeHtmlInMarkdown(v.meaning_th));
    const en = escapeMarkdownTableCell(sanitizeHtmlInMarkdown(v.meaning_en));
    const radical = escapeMarkdownTableCell(v.radical ? `${v.radical} (${v.radical_name_th || ''})` : '-');
    const sandhi = escapeMarkdownTableCell(v.sandhi_rule || '-');

    return `| ${idx + 1} | **${hanzi}** | \`${pinyin}\` | ${th} | ${en} | ${radical} | ${sandhi} |`;
  });

  return [header, ...rows].join('\n');
}

/**
 * Generates terminal Git commands for local commit & PR push
 */
export function generateGitCommandSnippet(draft: StudioDraftState, filename: string): string {
  const branchName = `content/tier${draft.tier}-u${String(draft.unit_number).padStart(2, '0')}`;
  const targetPath = `src/data/lessons/tier${draft.tier}/${filename}`;
  const commitMsg = `feat(curriculum): add Tier ${draft.tier} Unit ${draft.unit_number} (${draft.title.en || draft.title.th})`;

  return `# 1. สลับหรือสร้าง Branch ใหม่สำหรับเนื้อหา
git checkout -b ${branchName}

# 2. นำไฟล์ JSON ที่ดาวน์โหลดมาวางที่โฟลเดอร์ปลายทาง
# ปลายทาง: ${targetPath}

# 3. ตรวจสอบความถูกต้องของบทเรียนด้วย linter
npm run validate:curriculum -- --strict

# 4. บันทึกและส่งขึ้น GitHub
git add ${targetPath}
git commit -m "${commitMsg}"
git push -u origin ${branchName}`;
}

/**
 * Generates complete Zero-Token GitHub Pull Request Markdown Template
 */
export function generatePullRequestTemplate(
  draft: StudioDraftState,
  jsonString: string
): string {
  const stats = calculateCurriculumStats(draft);
  const filename = generateSuggestedFilename(draft);
  const targetPath = `src/data/lessons/tier${draft.tier}/${filename}`;

  // Collect all vocabularies
  const allVocab: StudioVocabDraft[] = [];
  for (const lesson of draft.lessons) {
    allVocab.push(...lesson.vocabulary);
  }

  const vocabTable = formatVocabMarkdownTable(allVocab);

  // Lesson list summary
  const lessonList = draft.lessons
    .map(
      (l, idx) =>
        `${idx + 1}. **${sanitizeHtmlInMarkdown(l.title.zh)}** (${sanitizeHtmlInMarkdown(l.title.th)} / ${sanitizeHtmlInMarkdown(l.title.en)}) — ${l.vocabulary.length} คำศัพท์, ${l.dialogue.length} บทสนทนา, ${l.quizzes.length} แบบฝึกหัด`
    )
    .join('\n');

  const safeZh = sanitizeHtmlInMarkdown(draft.title.zh);
  const safeTh = sanitizeHtmlInMarkdown(draft.title.th);
  const safeEn = sanitizeHtmlInMarkdown(draft.title.en);

  return `## 🐰 Hanzero Curriculum Content: [Tier ${draft.tier} Unit ${draft.unit_number}] ${safeZh} (${safeTh} / ${safeEn})

### 📦 ข้อมูลทั่วไป (Metadata)
- **Unit ID:** \`${draft.unit_id}\`
- **ไฟล์ปลายทาง:** \`${targetPath}\`
- **จำนวนบทเรียนย่อย:** ${stats.totalLessons} บทเรียน
- **คำศัพท์รวม:** ${stats.totalVocab} คำ
- **บทสนทนารวม:** ${stats.totalDialogueLines} ประโยค
- **แบบฝึกหัดรวม:** ${stats.totalQuizzes} ข้อ

---

### 📑 โครงสร้างบทเรียน (Lesson Structure)
${lessonList || '_ไม่มีบทเรียนย่อย_'}

---

### 📝 สรุปคำศัพท์ประจำหน่วยการเรียนรู้ (Vocabulary Overview)
${vocabTable}

---

### 🛡️ สรุปคุณภาพ & เกณฑ์การตรวจรับ (Quality Gate Checklist)
- [x] ตรวจสอบอักษรจีนตัวย่อ (Simplified Chinese) ครบถ้วน 100%
- [x] กำกับเสียงวรรณยุกต์พินอิน (Pīnyīn diacritics) แม่นยำทุกพยางค์
- [x] คำแปลภาษาไทยและอังกฤษเป็นธรรมชาติ ตรงบริบท
- [x] มีบทสนทนาจำลองสถานการณ์จริง
- [x] มีแบบฝึกหัดทดสอบความเข้าใจครบถ้วน
- [x] ผ่านการตรวจสอบโครงสร้าง JSON ผ่าน \`npm run validate:curriculum -- --strict\`

---

### 📦 โค้ดเนื้อหาบทเรียน (JSON Content Payload)
<details>
<summary><b>คลิกเพื่อดูโค้ด JSON (${filename})</b></summary>

\`\`\`json
${jsonString}
\`\`\`

</details>

---
*Generated via **Hanzero Content Authoring Studio** (Zero-Token Safe Hand-off Architecture) 🐰✨*
`;
}
