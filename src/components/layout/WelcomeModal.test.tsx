/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WelcomeModal } from './WelcomeModal';
import * as voiceHealthEngine from '../../engines/audio/voiceHealthEngine';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('WelcomeModal Component', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    vi.spyOn(voiceHealthEngine, 'inspectVoiceHealth').mockResolvedValue({
      grade: 'optimal',
      clientOS: 'windows',
      hasChineseVoice: true,
      isNeural: true,
      activeVoiceName: 'Xiaoxiao',
      totalChineseVoices: 2,
      isOnline: true,
      samplePhrase: '你好！很高兴认识你。',
    });

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

  it('renders nothing when isOpen is false', async () => {
    await act(async () => {
      root?.render(
        <WelcomeModal
          isOpen={false}
          onSelectTrack={vi.fn()}
          onOpenVoiceHealth={vi.fn()}
        />
      );
    });

    expect(container?.innerHTML).toBe('');
  });

  it('renders dual-track selection and defaults to Tier 0', async () => {
    const handleSelectTrack = vi.fn();
    const handleOpenVoiceHealth = vi.fn();

    await act(async () => {
      root?.render(
        <WelcomeModal
          isOpen={true}
          onSelectTrack={handleSelectTrack}
          onOpenVoiceHealth={handleOpenVoiceHealth}
        />
      );
    });

    expect(container?.textContent).toContain('ยินดีต้อนรับสู่ Hanzero');
    expect(container?.textContent).toContain('เริ่มจาก 0 ไม่เคยเรียนจีนมาก่อน');
    expect(container?.textContent).toContain('พอรู้พินอินแล้ว ข้ามไปบทสนทนา');

    // Click "เริ่มการเดินทางสู่ภาษาจีน" button
    const startButton = container?.querySelector('button.btn-tactile-primary') as HTMLButtonElement;
    expect(startButton).not.toBeNull();

    await act(async () => {
      startButton.click();
    });

    // Expect default track to be 'tier0' and silentMode false
    expect(handleSelectTrack).toHaveBeenCalledWith('tier0', false);
  });

  it('allows switching to Tier 1 and triggering onSelectTrack', async () => {
    const handleSelectTrack = vi.fn();

    await act(async () => {
      root?.render(
        <WelcomeModal
          isOpen={true}
          onSelectTrack={handleSelectTrack}
          onOpenVoiceHealth={vi.fn()}
        />
      );
    });

    // Find Tier 1 card via data-testid
    const tier1Card = container?.querySelector('[data-testid="track-card-tier1"]') as HTMLDivElement;
    expect(tier1Card).not.toBeNull();

    await act(async () => {
      tier1Card.click();
    });

    const startButton = container?.querySelector('button.btn-tactile-primary') as HTMLButtonElement;
    await act(async () => {
      startButton.click();
    });

    expect(handleSelectTrack).toHaveBeenCalledWith('tier1', false);
  });

  it('triggers onOpenVoiceHealth when clicking sound settings link', async () => {
    const handleOpenVoiceHealth = vi.fn();

    await act(async () => {
      root?.render(
        <WelcomeModal
          isOpen={true}
          onSelectTrack={vi.fn()}
          onOpenVoiceHealth={handleOpenVoiceHealth}
        />
      );
    });

    const buttons = Array.from(container?.querySelectorAll('button') || []);
    const voiceSettingsBtn = buttons.find((b) => b.textContent?.includes('ทดสอบ / ตั้งค่าเสียง'));
    expect(voiceSettingsBtn).toBeDefined();

    await act(async () => {
      voiceSettingsBtn?.click();
    });

    expect(handleOpenVoiceHealth).toHaveBeenCalledTimes(1);
  });
});
