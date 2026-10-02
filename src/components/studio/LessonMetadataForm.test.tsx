/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LessonMetadataForm } from './LessonMetadataForm';
import { createBlankDraft } from '../../engines/studio/studioSerializer';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('LessonMetadataForm Component', () => {
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

  it('renders Unit and Lesson inputs and responds to metadata updates', async () => {
    const draft = createBlankDraft(1, 1);
    const onUpdateUnitMetadata = vi.fn();
    const onUpdateLessonMetadata = vi.fn();
    const onSelectLessonIndex = vi.fn();

    await act(async () => {
      root?.render(
        <LessonMetadataForm
          draft={draft}
          activeLesson={draft.lessons[0]}
          onUpdateUnitMetadata={onUpdateUnitMetadata}
          onUpdateLessonMetadata={onUpdateLessonMetadata}
          onSelectLessonIndex={onSelectLessonIndex}
        />
      );
    });

    expect(container?.textContent).toContain('ข้อมูลระดับยูนิต');
    expect(container?.textContent).toContain('ข้อมูลบทเรียนที่กำลังแต่ง');

    // Test Tier Select Change
    const select = container?.querySelector('select');
    expect(select).toBeDefined();
    await act(async () => {
      if (select) {
        select.value = '2';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    expect(onUpdateUnitMetadata).toHaveBeenCalledWith({ tier: 2 });

    // Test Unit ID Input Change
    const unitIdInput = Array.from(container?.querySelectorAll('input') || []).find(
      (inp) => inp.value === 'tier1_u01'
    );
    expect(unitIdInput).toBeDefined();

    await act(async () => {
      if (unitIdInput) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;
        nativeSetter?.call(unitIdInput, 'tier2_u02');
        unitIdInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    expect(onUpdateUnitMetadata).toHaveBeenCalledWith({ unit_id: 'tier2_u02' });
  });

  it('detects traditional Chinese characters in titles and shows pedagogical warning', async () => {
    const draft = createBlankDraft(1, 1);
    draft.title.zh = '國家的問候'; // Contains traditional chars 國 and 問

    await act(async () => {
      root?.render(
        <LessonMetadataForm
          draft={draft}
          activeLesson={draft.lessons[0]}
          onUpdateUnitMetadata={vi.fn()}
          onUpdateLessonMetadata={vi.fn()}
          onSelectLessonIndex={vi.fn()}
        />
      );
    });

    // Should display traditional char warning
    expect(container?.textContent).toContain('พบตัวเต็ม');
    expect(container?.textContent).toContain('国');
  });
});
