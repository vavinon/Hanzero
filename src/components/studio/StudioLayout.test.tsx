/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { StudioLayout } from './StudioLayout';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('StudioLayout Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    localStorage.clear();
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
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders studio layout with initial metadata tab active and others hidden', async () => {
    const onExit = vi.fn();

    await act(async () => {
      root?.render(<StudioLayout onExit={onExit} />);
    });

    // Check navbar presence
    const navbar = container?.querySelector('header');
    expect(navbar).not.toBeNull();

    // The 5 tab containers inside <main>
    const main = container?.querySelector('main');
    expect(main).not.toBeNull();
    const tabContainers = main?.querySelectorAll(':scope > div');
    expect(tabContainers?.length).toBe(5);

    // Tab 1 (metadata) should be visible (display: block)
    // Other tabs should have display: none
    expect((tabContainers?.[0] as HTMLElement).style.display).toBe('block');
    expect((tabContainers?.[1] as HTMLElement).style.display).toBe('none');
    expect((tabContainers?.[2] as HTMLElement).style.display).toBe('none');
    expect((tabContainers?.[3] as HTMLElement).style.display).toBe('none');
    expect((tabContainers?.[4] as HTMLElement).style.display).toBe('none');
  });

  it('switches tabs properly when clicking tab buttons in StudioNavbar', async () => {
    const onExit = vi.fn();

    await act(async () => {
      root?.render(<StudioLayout onExit={onExit} />);
    });

    const main = container?.querySelector('main');
    const tabContainers = main?.querySelectorAll(':scope > div');

    // Click Vocab tab button (data-tab="vocab")
    const vocabTabBtn = container?.querySelector('button[data-tab="vocab"]') as HTMLButtonElement;
    expect(vocabTabBtn).not.toBeNull();

    await act(async () => {
      vocabTabBtn.click();
    });

    // Now Vocab tab (index 1) should be 'block', metadata (index 0) should be 'none'
    expect((tabContainers?.[0] as HTMLElement).style.display).toBe('none');
    expect((tabContainers?.[1] as HTMLElement).style.display).toBe('block');
    expect((tabContainers?.[2] as HTMLElement).style.display).toBe('none');

    // Click Dialogue tab button
    const dialogueTabBtn = container?.querySelector('button[data-tab="dialogue"]') as HTMLButtonElement;
    await act(async () => {
      dialogueTabBtn.click();
    });
    expect((tabContainers?.[1] as HTMLElement).style.display).toBe('none');
    expect((tabContainers?.[2] as HTMLElement).style.display).toBe('block');

    // Click Quiz tab button
    const quizTabBtn = container?.querySelector('button[data-tab="quiz"]') as HTMLButtonElement;
    await act(async () => {
      quizTabBtn.click();
    });
    expect((tabContainers?.[2] as HTMLElement).style.display).toBe('none');
    expect((tabContainers?.[3] as HTMLElement).style.display).toBe('block');

    // Click Review tab button
    const reviewTabBtn = container?.querySelector('button[data-tab="review"]') as HTMLButtonElement;
    await act(async () => {
      reviewTabBtn.click();
    });
    expect((tabContainers?.[3] as HTMLElement).style.display).toBe('none');
    expect((tabContainers?.[4] as HTMLElement).style.display).toBe('block');
  });

  it('opens and closes the Import JSON dialog', async () => {
    const onExit = vi.fn();

    await act(async () => {
      root?.render(<StudioLayout onExit={onExit} />);
    });

    // Modal should not exist initially
    expect(document.querySelector('div[role="dialog"]')).toBeNull();

    // Click Import button in navbar (button contains 'นำเข้า')
    const importBtn = Array.from(container?.querySelectorAll('button') || []).find((b) =>
      b.textContent?.includes('นำเข้า')
    );
    expect(importBtn).toBeDefined();

    await act(async () => {
      importBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // Modal dialog should now exist
    const dialog = document.querySelector('div[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.textContent).toContain('นำเข้าไฟล์ JSON บทเรียน');

    // Find cancel button in dialog
    const cancelBtn = Array.from(dialog?.querySelectorAll('button') || []).find((b) =>
      b.textContent?.includes('ยกเลิก')
    );
    expect(cancelBtn).toBeDefined();

    await act(async () => {
      cancelBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // Modal should be dismissed
    expect(document.querySelector('div[role="dialog"]')).toBeNull();
  });

  it('opens and closes the Reset Draft confirmation dialog', async () => {
    const onExit = vi.fn();

    await act(async () => {
      root?.render(<StudioLayout onExit={onExit} />);
    });

    // Modal should not exist initially
    expect(document.querySelector('div[role="dialog"]')).toBeNull();

    // Click Reset button in navbar (has title containing 'ล้างข้อมูล')
    const resetBtn = Array.from(container?.querySelectorAll('button') || []).find((b) =>
      b.getAttribute('title')?.includes('ล้างข้อมูล')
    );
    expect(resetBtn).toBeDefined();

    await act(async () => {
      resetBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // Reset confirmation dialog should now exist
    const dialog = document.querySelector('div[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.textContent).toContain('ยืนยันการล้างข้อมูลแบบร่าง?');

    // Click cancel in reset dialog
    const cancelBtn = Array.from(dialog?.querySelectorAll('button') || []).find((b) =>
      b.textContent?.includes('ยกเลิก')
    );
    expect(cancelBtn).toBeDefined();

    await act(async () => {
      cancelBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // Modal should be dismissed
    expect(document.querySelector('div[role="dialog"]')).toBeNull();
  });

  it('calls onExit when exit button is clicked', async () => {
    const onExit = vi.fn();

    await act(async () => {
      root?.render(<StudioLayout onExit={onExit} />);
    });

    // Exit button in navbar has title 'กลับสู่แผนที่การเรียนรู้' or text 'กลับ'
    const exitBtn = Array.from(container?.querySelectorAll('button') || []).find((b) =>
      b.getAttribute('title')?.includes('กลับสู่แผนที่') || b.textContent?.includes('กลับ')
    );
    expect(exitBtn).toBeDefined();

    await act(async () => {
      exitBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onExit).toHaveBeenCalledTimes(1);
  });
});
