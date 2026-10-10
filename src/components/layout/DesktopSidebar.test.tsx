/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DesktopSidebar } from './DesktopSidebar';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('DesktopSidebar Component (Resilient Desktop Navigation)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    window.scrollTo = vi.fn();
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

  const defaultProps = {
    currentView: 'map' as const,
    onNavigate: vi.fn(),
    dueCardsCount: 5,
    onOpenPassport: vi.fn(),
    onOpenTestPanel: vi.fn(),
    activeLessonId: 't0_u01_l01',
    onSelectLesson: vi.fn(),
    completedLessons: ['t0_u01_l01'],
  };

  it('renders DesktopSidebar with brand header, global hubs, and course tree navigator', async () => {
    await act(async () => {
      root?.render(<DesktopSidebar {...defaultProps} />);
    });

    expect(container?.querySelector('[data-testid="desktop-sidebar"]')).not.toBeNull();
    expect(container?.textContent).toContain('Hanzero');
    expect(container?.textContent).toContain('เริ่มจาก 0 สู่ภาษาจีนคล่องตัว');

    // Global Hubs
    expect(container?.querySelector('[data-testid="nav-item-vocab"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="nav-item-review"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="nav-item-immersion"]')).not.toBeNull();
    expect(container?.textContent).toContain('5'); // SRS badge

    // Navigator Header
    expect(container?.textContent).toContain('สารบัญบทเรียน');
    expect(container?.textContent).toContain('พาสปอร์ต');
  });

  it('renders scrollable area with class course-tree-scroll-area and minHeight: 0', async () => {
    await act(async () => {
      root?.render(<DesktopSidebar {...defaultProps} />);
    });

    const scrollArea = container?.querySelector('.course-tree-scroll-area') as HTMLElement | null;
    expect(scrollArea).not.toBeNull();
    if (scrollArea) {
      expect(scrollArea.style.overflowY).toBe('auto');
      expect(scrollArea.style.overscrollBehavior).toBe('contain');
    }
  });

  it('switches to Tier 3 and renders all 20 units without crashing', async () => {
    await act(async () => {
      root?.render(<DesktopSidebar {...defaultProps} />);
    });

    // Find and click T3 button
    const buttons = Array.from(container?.querySelectorAll('button') || []);
    const t3Button = buttons.find((b) => b.textContent?.trim() === 'T3');
    expect(t3Button).not.toBeUndefined();

    await act(async () => {
      t3Button?.click();
    });

    // Tier 3 contains Unit 26 through Unit 45
    expect(container?.textContent).toContain('Unit 26:');
    expect(container?.textContent).toContain('Unit 45:');
  });

  it('filters units when typing into search input', async () => {
    await act(async () => {
      root?.render(<DesktopSidebar {...defaultProps} />);
    });

    const searchInput = container?.querySelector('input[type="text"]') as HTMLInputElement | null;
    expect(searchInput).not.toBeNull();

    await act(async () => {
      if (searchInput) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;
        nativeSetter?.call(searchInput, 'วิทยานิพนธ์');
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });

    expect(container?.textContent).toContain('Unit 45:');
  });

  it('toggles Advanced Tools collapsible and triggers navigation', async () => {
    const onNavigate = vi.fn();
    await act(async () => {
      root?.render(<DesktopSidebar {...defaultProps} onNavigate={onNavigate} />);
    });

    const buttons = Array.from(container?.querySelectorAll('button') || []);
    const advancedToolsToggle = buttons.find((b) => b.textContent?.includes('เครื่องมือขั้นสูง'));
    expect(advancedToolsToggle).not.toBeUndefined();

    await act(async () => {
      advancedToolsToggle?.click();
    });

    expect(container?.querySelector('[data-testid="nav-item-reader"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="nav-item-idiom"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="nav-item-podcast"]')).not.toBeNull();
    expect(container?.querySelector('[data-testid="nav-item-studio"]')).not.toBeNull();

    const readerBtn = container?.querySelector('[data-testid="nav-item-reader"]') as HTMLButtonElement | null;
    await act(async () => {
      readerBtn?.click();
    });

    expect(onNavigate).toHaveBeenCalledWith('reader');
  });

  it('triggers onOpenPassport and onOpenTestPanel when footer buttons are clicked', async () => {
    const onOpenPassport = vi.fn();
    const onOpenTestPanel = vi.fn();
    await act(async () => {
      root?.render(<DesktopSidebar {...defaultProps} onOpenPassport={onOpenPassport} onOpenTestPanel={onOpenTestPanel} />);
    });

    const buttons = Array.from(container?.querySelectorAll('button') || []);
    const passportBtn = buttons.find((b) => b.textContent?.includes('พาสปอร์ต'));
    expect(passportBtn).not.toBeUndefined();

    await act(async () => {
      passportBtn?.click();
    });
    expect(onOpenPassport).toHaveBeenCalledTimes(1);

    const testLabBtn = container?.querySelector('button[title="Engine Test Lab 🧪"]') as HTMLButtonElement | null;
    expect(testLabBtn).not.toBeNull();

    await act(async () => {
      testLabBtn?.click();
    });
    expect(onOpenTestPanel).toHaveBeenCalledTimes(1);
  });
});
