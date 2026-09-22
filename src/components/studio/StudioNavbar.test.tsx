/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { StudioNavbar } from './StudioNavbar';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('StudioNavbar Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    if (root) {
      act(() => {
        root?.unmount();
      });
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    container = null;
    root = null;
    vi.restoreAllMocks();
  });

  it('renders all 5 navigation tabs and displays item counts correctly', async () => {
    const onSelectTab = vi.fn();

    await act(async () => {
      root?.render(
        <StudioNavbar
          activeTab="vocab"
          onSelectTab={onSelectTab}
          tier={1}
          unitNumber={1}
          lessonNumber={1}
          unitTitleTh="การทักทาย"
          isSaving={false}
          isDirty={false}
          lastSavedAt={Date.now()}
          storageStatus="saved"
          vocabCount={6}
          dialogueCount={4}
          quizCount={3}
          validationErrors={[]}
          validationWarnings={[]}
          onForceSave={vi.fn()}
          onReset={vi.fn()}
          onLoadSample={vi.fn()}
          onOpenImport={vi.fn()}
          onExit={vi.fn()}
        />
      );
    });

    const buttons = container?.querySelectorAll('nav button');
    expect(buttons?.length).toBe(5);

    // Verify tab labels
    expect(container?.textContent).toContain('ข้อมูลทั่วไป');
    expect(container?.textContent).toContain('คำศัพท์');
    expect(container?.textContent).toContain('บทสนทนา');
    expect(container?.textContent).toContain('แบบฝึกหัด');
    expect(container?.textContent).toContain('ตรวจทาน & ส่งออก');

    // Verify item counts
    expect(container?.textContent).toContain('6'); // vocab count
    expect(container?.textContent).toContain('4'); // dialogue count
    expect(container?.textContent).toContain('3'); // quiz count

    // Click tab
    const dialogueTab = Array.from(buttons || []).find((b) => b.textContent?.includes('บทสนทนา'));
    expect(dialogueTab).toBeDefined();
    await act(async () => {
      dialogueTab?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(onSelectTab).toHaveBeenCalledWith('dialogue');
  });

  it('displays autosave status indicator correctly for saving, dirty, and saved states', async () => {
    // 1. Saving State
    await act(async () => {
      root?.render(
        <StudioNavbar
          activeTab="metadata"
          onSelectTab={vi.fn()}
          tier={1}
          unitNumber={1}
          lessonNumber={1}
          unitTitleTh="การทักทาย"
          isSaving={true}
          isDirty={true}
          lastSavedAt={null}
          storageStatus="saving"
          vocabCount={0}
          dialogueCount={0}
          quizCount={0}
          validationErrors={[]}
          validationWarnings={[]}
          onForceSave={vi.fn()}
          onReset={vi.fn()}
          onLoadSample={vi.fn()}
          onOpenImport={vi.fn()}
          onExit={vi.fn()}
        />
      );
    });
    expect(container?.textContent).toContain('กำลังบันทึก...');

    // 2. Dirty Unsaved State
    await act(async () => {
      root?.render(
        <StudioNavbar
          activeTab="metadata"
          onSelectTab={vi.fn()}
          tier={1}
          unitNumber={1}
          lessonNumber={1}
          unitTitleTh="การทักทาย"
          isSaving={false}
          isDirty={true}
          lastSavedAt={null}
          storageStatus="idle"
          vocabCount={0}
          dialogueCount={0}
          quizCount={0}
          validationErrors={[]}
          validationWarnings={[]}
          onForceSave={vi.fn()}
          onReset={vi.fn()}
          onLoadSample={vi.fn()}
          onOpenImport={vi.fn()}
          onExit={vi.fn()}
        />
      );
    });
    expect(container?.textContent).toContain('มีข้อมูลยังไม่บันทึก');
  });

  it('triggers master actions when clicked (Force Save, Reset, Load Sample, Import, Exit)', async () => {
    const onForceSave = vi.fn();
    const onReset = vi.fn();
    const onLoadSample = vi.fn();
    const onOpenImport = vi.fn();
    const onExit = vi.fn();

    await act(async () => {
      root?.render(
        <StudioNavbar
          activeTab="metadata"
          onSelectTab={vi.fn()}
          tier={1}
          unitNumber={1}
          lessonNumber={1}
          unitTitleTh="การทักทาย"
          isSaving={false}
          isDirty={false}
          lastSavedAt={Date.now()}
          storageStatus="saved"
          vocabCount={0}
          dialogueCount={0}
          quizCount={0}
          validationErrors={[]}
          validationWarnings={[]}
          onForceSave={onForceSave}
          onReset={onReset}
          onLoadSample={onLoadSample}
          onOpenImport={onOpenImport}
          onExit={onExit}
        />
      );
    });

    const forceSaveBtn = Array.from(container?.querySelectorAll('button') || []).find((b) =>
      b.textContent?.includes('บันทึก')
    );
    const loadSampleBtn = Array.from(container?.querySelectorAll('button') || []).find((b) =>
      b.textContent?.includes('ตัวอย่าง')
    );
    const importBtn = Array.from(container?.querySelectorAll('button') || []).find((b) =>
      b.textContent?.includes('นำเข้า')
    );
    const exitBtn = Array.from(container?.querySelectorAll('button') || []).find((b) =>
      b.textContent?.includes('กลับ')
    );

    await act(async () => {
      forceSaveBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      loadSampleBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      importBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      exitBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onForceSave).toHaveBeenCalledTimes(1);
    expect(onLoadSample).toHaveBeenCalledTimes(1);
    expect(onOpenImport).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledTimes(1);
  });
});
