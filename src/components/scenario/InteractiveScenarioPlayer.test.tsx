/**
 * @vitest-environment jsdom
 */

import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  InteractiveScenarioPlayer,
  InteractiveScenarioPlayerProps,
} from './InteractiveScenarioPlayer';
import { ScenarioTree } from '../../engines/scenario/branchingDialogueEngine';
import * as audioEngine from '../../engines/audio/audioEngine';

// Configure React 18 act environment for JSDOM
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

const createMockTree = (): ScenarioTree => ({
  id: 'test_delivery_gate',
  title: {
    zh: '外卖到达',
    th: 'เดลิเวอรี่มาถึง',
    en: 'Food Delivery',
  },
  npc: {
    id: 'rider_zhang',
    name: '张师傅',
    role: 'rider',
    avatar: '🛵',
    initialMood: 'friendly',
  },
  initialPatience: 70,
  startNodeId: 'node_start',
  nodes: {
    node_start: {
      id: 'node_start',
      speaker: { name: '张师傅', role: 'rider', avatar: '🛵' },
      text: {
        zh: '您好！外卖到了，单元门锁着。',
        pinyin: 'Nín hǎo! Wàimài dào le, dānyuán mén suǒzhe.',
        th: 'สวัสดีครับ เดลิเวอรี่มาถึงแล้ว ประตูอาคารล็อกครับ',
        en: 'Hello! Food delivery is here, but the gate is locked.',
      },
      culturalNote: {
        id: "culture_01",
        category: "digital_life",
        titleTh: "มารยาทการติดต่อไรเดอร์",
        insightTh: "บอกรหัสผ่านพร้อมเครื่องหมาย #",
        doAndDont: {
          doTh: "บอก 8866#",
          dontTh: "อย่าให้ไรเดอร์รอนาน",
        },
        goldenPhrase: {
          zh: "师傅辛苦了！",
          pinyin: "Shīfu xīnkǔ le!",
          th: "พี่เหนื่อยหน่อยนะครับ!",
        },
      },
      branches: [
        {
          id: 'branch_optimal',
          text: {
            zh: '师傅辛苦了！密码是8866#，放门口就好。',
            pinyin: 'Shīfu xīnkǔ le! Mìmǎ shì 8866#, fàng ménkǒu jiù hǎo.',
            th: 'พี่เหนื่อยหน่อยครับ รหัสคือ 8866# วางไว้หน้าห้องได้เลยครับ',
            en: 'Thanks! Passcode is 8866#, leave at door please.',
          },
          nextNodeId: 'node_door_success',
          patienceDelta: 15,
          pragmaticType: 'optimal',
          feedbackTh: 'ยอดเยี่ยมมาก!',
        },
        {
          id: 'branch_impolite',
          text: {
            zh: '怎么这么慢？',
            pinyin: 'Zěnme zhème màn?',
            th: 'ทำไมช้าจัง?',
            en: 'Why so slow?',
          },
          nextNodeId: 'node_hurried',
          patienceDelta: -60, // Drops patience below 15 to trigger Tutu lifeline
          pragmaticType: 'impolite_awkward',
          feedbackTh: 'ไม่ควรตำหนิไรเดอร์',
        },
      ],
    },
    node_door_success: {
      id: 'node_door_success',
      speaker: { name: '张师傅', role: 'rider' },
      text: {
        zh: '好的！已经放在门口了，祝您用餐愉快！',
        pinyin: 'Hǎo de! Yǐjīng fàng zài ménkǒu le, zhù nín yòngcān yúkuài!',
        th: 'เรียบร้อยครับ วางไว้หน้าห้องแล้ว ทานให้อร่อยครับ!',
        en: 'Done! Left at the door, enjoy!',
      },
      branches: [],
      isEnding: true,
      endingType: 'grand_pass',
      endingTitleTh: 'ผ่านฉลุยยอดเยี่ยม! 🌟',
      endingMessageTh: 'คุณสื่อสารกับไรเดอร์อย่างรวดเร็วและสุภาพ',
    },
    node_hurried: {
      id: 'node_hurried',
      speaker: { name: '张师傅', role: 'rider' },
      text: {
        zh: '我急着送下一单，放快递柜了！',
        pinyin: 'Wǒ jízhe sòng xià yī dān, fàng kuàidìguì le!',
        th: 'ผมรีบส่งออเดอร์ถัดไป ขอฝากไว้ที่ตู้ล็อกเกอร์นะ!',
        en: 'I am in a hurry, leaving it in parcel locker!',
      },
      branches: [],
      isEnding: true,
      endingType: 'cozy_pass',
    },
  },
});

describe('InteractiveScenarioPlayer Component (TASK-702)', () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    vi.spyOn(audioEngine, 'speak').mockImplementation((_text, options) => {
      options?.onStart?.();
      options?.onEnd?.();
      return Promise.resolve();
    });
    vi.spyOn(audioEngine, 'stopSpeaking').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playClick').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playCorrect').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playIncorrect').mockImplementation(() => {});
    vi.spyOn(audioEngine, 'playFanfare').mockImplementation(() => {});
  });

  afterEach(async () => {
    if (root) {
      await act(async () => {
        root!.unmount();
      });
      root = null;
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
      container = null;
    }
    vi.restoreAllMocks();
  });

  const renderComponent = async (props: Partial<InteractiveScenarioPlayerProps> = {}) => {
    const defaultProps: InteractiveScenarioPlayerProps = {
      tree: createMockTree(),
      ...props,
    };

    await act(async () => {
      root!.render(<InteractiveScenarioPlayer {...defaultProps} />);
    });
  };

  it('1. renders NPC header, Zen mood gauge, dialogue and decision branches correctly', async () => {
    await renderComponent();

    expect(container?.textContent).toContain('外卖到达');
    expect(container?.textContent).toContain('张师傅');
    expect(container?.textContent).toContain('🛵');
    expect(container?.textContent).toContain('70%');
    expect(container?.textContent).toContain('您好！外卖到了，单元门锁着。');

    // Decision options
    expect(container?.textContent).toContain('师傅辛苦了！密码是8866#');
    expect(container?.textContent).toContain('怎么这么慢？');
  });

  it('2. toggles pinyin display modes (peek, always, hidden)', async () => {
    await renderComponent({ defaultPinyinMode: 'always' });

    // In 'always' mode, pinyin text is rendered
    expect(container?.textContent).toContain('Nín hǎo! Wàimài dào le, dānyuán mén suǒzhe.');

    // Switch to hidden mode
    const hideButton = Array.from(container?.querySelectorAll('button') || []).find(
      (b) => b.textContent?.trim() === 'ซ่อน'
    );
    expect(hideButton).toBeDefined();

    await act(async () => {
      hideButton!.click();
    });

    // Pinyin text container will have opacity-0 / max-h-0
    const pinyinContainers = container?.querySelectorAll('.overflow-hidden.text-emerald-800');
    expect(pinyinContainers?.[0]?.className).toContain('opacity-0');
  });

  it('3. advances dialogue and shows celebration screen on reaching terminal node', async () => {
    const onComplete = vi.fn();
    await renderComponent({ onComplete });

    const optimalButton = Array.from(container?.querySelectorAll('button') || []).find(
      (b) => b.textContent?.includes('师傅辛苦了！')
    );
    expect(optimalButton).toBeDefined();

    await act(async () => {
      optimalButton!.click();
    });

    // Node changes to node_door_success, which is terminal
    expect(container?.textContent).toContain('顺利通关 - ผ่านฉลุยยอดเยี่ยม!');
    expect(container?.textContent).toContain('ผ่านฉลุยยอดเยี่ยม! 🌟');
    expect(container?.textContent).toContain('คะแนนภารกิจ:');

    // Click complete button
    const completeButton = Array.from(container?.querySelectorAll('button') || []).find(
      (b) => b.textContent?.includes('เสร็จสิ้น')
    );
    expect(completeButton).toBeDefined();

    await act(async () => {
      completeButton!.click();
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete.mock.calls[0][0].outcome).toBe('grand_pass');
  });

  it('4. triggers audio speech on speaker button click', async () => {
    await renderComponent();

    const speakerButton = container?.querySelector('button[aria-label^="ฟังเสียงภาษาจีน"]') as HTMLButtonElement;
    expect(speakerButton).toBeDefined();

    await act(async () => {
      speakerButton.click();
    });

    expect(audioEngine.speak).toHaveBeenCalledWith(
      '您好！外卖到了，单元门锁着。',
      expect.objectContaining({ rate: 0.85 })
    );
  });

  it('5. triggers Tutu Lifeline modal when patience falls critically low', async () => {
    const lowPatienceTree = createMockTree();
    lowPatienceTree.initialPatience = 10; // Starts below 15!
    await renderComponent({ tree: lowPatienceTree, initialPatience: 10 });

    // Tutu Lifeline modal should appear
    expect(container?.textContent).toContain('ทู่ทู่ชวนกู้สถานการณ์!');
    expect(container?.textContent).toContain('不好意思，我的中文还在学，请稍等一下！');

    // Click rescue button
    const rescueButton = Array.from(container?.querySelectorAll('button') || []).find(
      (b) => b.textContent?.includes('กู้สถานการณ์ (+25 🛟)')
    );
    expect(rescueButton).toBeDefined();

    await act(async () => {
      rescueButton!.click();
    });

    // Patience increased by 25 (from 10 to 35) and modal closed
    expect(container?.textContent).toContain('35%');
    expect(container?.textContent).not.toContain('ทู่ทู่ชวนกู้สถานการณ์!');
  });

  it('6. renders safe fallback UI when tree fails validation', async () => {
    const corruptTree = createMockTree();
    corruptTree.startNodeId = 'non_existent_node';

    const onExit = vi.fn();
    await renderComponent({ tree: corruptTree, onExit });

    expect(container?.textContent).toContain('ขออภัย ข้อมูลสถานการณ์ไม่สมบูรณ์');
    expect(container?.textContent).toContain('Start node \'non_existent_node\' is missing');

    const exitButton = Array.from(container?.querySelectorAll('button') || []).find(
      (b) => b.textContent?.includes('ย้อนกลับ')
    );
    expect(exitButton).toBeDefined();

    await act(async () => {
      exitButton!.click();
    });
    expect(onExit).toHaveBeenCalledTimes(1);
  });

  describe('🔥 Red Team Adversarial Attacks', () => {
    it('Attack 1: Rapid Choice Spamming (50 clicks) is locked out without race conditions', async () => {
      await renderComponent();

      const optimalButton = Array.from(container?.querySelectorAll('button') || []).find(
        (b) => b.textContent?.includes('师傅辛苦了！')
      );
      expect(optimalButton).toBeDefined();

      // Spam click 50 times synchronously
      await act(async () => {
        for (let i = 0; i < 50; i++) {
          optimalButton!.click();
        }
      });

      // playClick should be called only once due to transition lockout
      expect(audioEngine.playClick).toHaveBeenCalledTimes(1);
      // Advances to ending screen cleanly without errors
      expect(container?.textContent).toContain('顺利通关');
    });

    it('Attack 2: Audio Teardown stops speech on unmount', async () => {
      await renderComponent();

      // Trigger speech
      const speakerButton = container?.querySelector('button[aria-label^="ฟังเสียงภาษาจีน"]') as HTMLButtonElement;
      await act(async () => {
        speakerButton.click();
      });

      // Unmount component
      await act(async () => {
        root!.unmount();
      });
      root = null;

      expect(audioEngine.stopSpeaking).toHaveBeenCalled();
    });
  });
});
