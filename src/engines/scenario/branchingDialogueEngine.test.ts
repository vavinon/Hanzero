import { describe, it, expect } from 'vitest';
import {
  getPatienceMood,
  calculatePatienceDelta,
  createScenarioSession,
  makeChoice,
  applyTutuRescue,
  calculateScenarioScore,
  validateScenarioTree,
  ScenarioTree,
} from './branchingDialogueEngine';

describe('branchingDialogueEngine (Pure Logic)', () => {
  const createMockTree = (): ScenarioTree => ({
    id: 'test_tree_01',
    title: {
      zh: '外卖配送',
      th: 'การส่งอาหารเดลิเวอรี่',
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
        speaker: { name: '张师傅', role: 'rider' },
        text: {
          zh: '您好！外卖到了，单元门锁着进不去。',
          pinyin: 'Nín hǎo! Wàimài dào le, dānyuán mén suǒzhe jìn bu qù.',
          th: 'สวัสดีครับ! เดลิเวอรี่มาถึงแล้ว ประตูอาคารล็อกเข้าไม่ได้ครับ',
          en: 'Hello! Food delivery has arrived, but the building gate is locked.',
        },
        branches: [
          {
            id: 'branch_optimal',
            text: {
              zh: '师傅辛苦了！密码是1234#，放门口就好。',
              pinyin: 'Shīfu xīnkǔ le! Mìmǎ shì 1234#, fàng ménkǒu jiù hǎo.',
              th: 'พี่เหนื่อยหน่อยนะครับ! รหัสผ่านคือ 1234# วางไว้หน้าห้องได้เลยครับ',
              en: 'Thanks for your hard work! Passcode is 1234#, please leave it at my door.',
            },
            nextNodeId: 'node_gate_open',
            patienceDelta: 15,
            pragmaticType: 'optimal',
            feedbackTh: 'ยอดเยี่ยม! ทักทายด้วยความเห็นใจ บอกรหัสพร้อม # และสถานที่วางชัดเจน',
          },
          {
            id: 'branch_acceptable',
            text: {
              zh: '密码是1234，你上来吧。',
              pinyin: 'Mìmǎ shì 1234, nǐ shànglái ba.',
              th: 'รหัสคือ 1234 คุณขึ้นมาเลย',
              en: 'Code is 1234, please come up.',
            },
            nextNodeId: 'node_gate_open',
            patienceDelta: 0,
            pragmaticType: 'acceptable',
            feedbackTh: 'สื่อสารได้ แต่อาจขาดเครื่องหมาย # และความสุภาพไปนิด',
          },
          {
            id: 'branch_impolite',
            text: {
              zh: '你怎么这么慢？自己想办法进来！',
              pinyin: 'Nǐ zěnme zhème màn? Zìjǐ xiǎng bànfǎ jìnlái!',
              th: 'ทำไมคุณช้าจัง? คิดหาทางเข้ามาเองสิ!',
              en: 'Why are you so slow? Find a way in yourself!',
            },
            nextNodeId: 'node_hurried',
            patienceDelta: -25,
            pragmaticType: 'impolite_awkward',
            feedbackTh: 'ผิดกาลเทศะ! ไรเดอร์ต้องรีบทำเวลา การพูดตำหนิจะทำให้เกิดความตึงเครียด',
          },
        ],
      },
      node_gate_open: {
        id: 'node_gate_open',
        speaker: { name: '张师傅', role: 'rider' },
        text: {
          zh: '好的！已经放在门口了，祝您用餐愉快！',
          pinyin: 'Hǎo de! Yǐjīng fàng zài ménkǒu le, zhù nín yòngcān yúkuài!',
          th: 'ได้เลยครับ! วางไว้หน้าห้องแล้ว ทานให้อร่อยนะครับ!',
          en: 'Alright! Placed by the door, enjoy your meal!',
        },
        branches: [],
        isEnding: true,
        endingType: 'grand_pass',
        endingTitleTh: 'ภารกิจสำเร็จลุล่วงยอดเยี่ยม!',
        endingMessageTh: 'คุณสื่อสารกับไรเดอร์อย่างสุภาพและรวดเร็ว อาหารส่งถึงห้องเรียบร้อย',
      },
      node_hurried: {
        id: 'node_hurried',
        speaker: { name: '张师傅', role: 'rider' },
        text: {
          zh: '我还有别的单要送，实在等不了了，放物业保安室了！',
          pinyin: 'Wǒ hái yǒu bié de dān yào sòng, shízài děng bù liǎo le, fàng wùyè bǎo\'ān shì le!',
          th: 'ผมมีออเดอร์อื่นต้องส่ง รอไม่ได้จริงๆ ขอฝากไว้ที่ป้อม รปภ. นิติบุคคลนะครับ!',
          en: 'I have other orders to deliver and cannot wait, leaving it at security!',
        },
        branches: [],
        isEnding: true,
        endingType: 'cozy_pass',
        endingTitleTh: 'ได้รับอาหารที่ป้อม รปภ.',
        endingMessageTh: 'อาหารมาถึงแล้ว แต่คุณต้องเดินลงไปรับเองที่ป้อม รปภ.',
      },
    },
  });

  describe('1. getPatienceMood & calculatePatienceDelta', () => {
    it('maps patience levels to appropriate NPC moods accurately', () => {
      expect(getPatienceMood(95)).toBe('delighted');
      expect(getPatienceMood(80)).toBe('delighted');
      expect(getPatienceMood(79)).toBe('friendly');
      expect(getPatienceMood(55)).toBe('friendly');
      expect(getPatienceMood(54)).toBe('neutral');
      expect(getPatienceMood(35)).toBe('neutral');
      expect(getPatienceMood(34)).toBe('confused_hurried');
      expect(getPatienceMood(15)).toBe('confused_hurried');
      expect(getPatienceMood(14)).toBe('awkward_flustered');
      expect(getPatienceMood(0)).toBe('awkward_flustered');
    });

    it('clamps patience changes strictly between 0 and 100', () => {
      expect(calculatePatienceDelta(90, 20)).toBe(100);
      expect(calculatePatienceDelta(10, -25)).toBe(0);
      expect(calculatePatienceDelta(50, 15)).toBe(65);
    });

    it('safely handles non-finite or NaN inputs without throwing', () => {
      expect(calculatePatienceDelta(NaN, 10)).toBe(60); // default 50 + 10
      expect(calculatePatienceDelta(50, NaN)).toBe(50);
      expect(calculatePatienceDelta(Infinity, 0)).toBe(50);
    });
  });

  describe('2. createScenarioSession & makeChoice State Transitions', () => {
    it('initializes a fresh session properly', () => {
      const tree = createMockTree();
      const session = createScenarioSession(tree);

      expect(session.treeId).toBe('test_tree_01');
      expect(session.currentNodeId).toBe('node_start');
      expect(session.patience).toBe(70);
      expect(session.currentMood).toBe('friendly');
      expect(session.history).toHaveLength(0);
      expect(session.isFinished).toBe(false);
      expect(session.score).toBe(0);
      expect(session.tutuRescueUsed).toBe(false);
    });

    it('transitions to next node and records history on optimal choice', () => {
      const tree = createMockTree();
      const session = createScenarioSession(tree);

      const nextSession = makeChoice(tree, session, 'branch_optimal');

      expect(nextSession.currentNodeId).toBe('node_gate_open');
      expect(nextSession.patience).toBe(85); // 70 + 15
      expect(nextSession.currentMood).toBe('delighted'); // >= 80
      expect(nextSession.history).toHaveLength(1);
      expect(nextSession.history[0].chosenBranchId).toBe('branch_optimal');
      expect(nextSession.history[0].pragmaticType).toBe('optimal');
      expect(nextSession.isFinished).toBe(true); // node_gate_open isEnding
      expect(nextSession.outcome).toBe('grand_pass');
      expect(nextSession.score).toBeGreaterThan(0);
    });

    it('decreases patience and sets appropriate mood on impolite choice', () => {
      const tree = createMockTree();
      const session = createScenarioSession(tree);

      const nextSession = makeChoice(tree, session, 'branch_impolite');

      expect(nextSession.currentNodeId).toBe('node_hurried');
      expect(nextSession.patience).toBe(45); // 70 - 25
      expect(nextSession.currentMood).toBe('neutral'); // 35..54
      expect(nextSession.isFinished).toBe(true);
      expect(nextSession.outcome).toBe('cozy_pass');
    });

    it('enforces post-finish immunity (rejects actions once finished)', () => {
      const tree = createMockTree();
      const session = createScenarioSession(tree);

      const finishedSession = makeChoice(tree, session, 'branch_optimal');
      expect(finishedSession.isFinished).toBe(true);

      // Attempt another choice on finished session
      const blockedSession = makeChoice(tree, finishedSession, 'branch_acceptable');
      expect(blockedSession).toBe(finishedSession); // Same reference, no change
    });

    it('recovers gracefully when choice points to non-existent branch or node', () => {
      const tree = createMockTree();
      const session = createScenarioSession(tree);

      // Non-existent branch id
      const unchangedSession = makeChoice(tree, session, 'ghost_branch_id');
      expect(unchangedSession).toBe(session);

      // Dangling target node test
      const corruptTree = createMockTree();
      corruptTree.nodes.node_start.branches[0].nextNodeId = 'ghost_node_target';

      const recoveredSession = makeChoice(corruptTree, session, 'branch_optimal');
      expect(recoveredSession.isFinished).toBe(true);
      expect(recoveredSession.outcome).toBe('tutu_replay');
    });
  });

  describe('3. Tutu Lifeline Rescue Mechanics', () => {
    it('restores patience by +25 and recalculates mood', () => {
      const tree = createMockTree();
      const session = createScenarioSession(tree, { initialPatience: 20 });
      expect(session.currentMood).toBe('confused_hurried');

      const rescuedSession = applyTutuRescue(session);
      expect(rescuedSession.patience).toBe(45); // 20 + 25
      expect(rescuedSession.currentMood).toBe('neutral');
      expect(rescuedSession.tutuRescueUsed).toBe(true);
    });

    it('cannot be used more than once per session', () => {
      const tree = createMockTree();
      const session = createScenarioSession(tree, { initialPatience: 20 });

      const firstRescue = applyTutuRescue(session);
      expect(firstRescue.patience).toBe(45);
      expect(firstRescue.tutuRescueUsed).toBe(true);

      const secondRescue = applyTutuRescue(firstRescue);
      expect(secondRescue).toBe(firstRescue); // Unchanged
      expect(secondRescue.patience).toBe(45);
    });

    it('cannot be used on a finished session', () => {
      const tree = createMockTree();
      const session = createScenarioSession(tree);
      const finishedSession = makeChoice(tree, session, 'branch_optimal');
      expect(finishedSession.isFinished).toBe(true);

      const attemptRescue = applyTutuRescue(finishedSession);
      expect(attemptRescue).toBe(finishedSession);
    });
  });

  describe('4. calculateScenarioScore', () => {
    it('produces higher score for optimal decisions and high patience', () => {
      const tree = createMockTree();
      const sessionOptimal = makeChoice(tree, createScenarioSession(tree), 'branch_optimal');
      const sessionImpolite = makeChoice(tree, createScenarioSession(tree), 'branch_impolite');

      const scoreOpt = calculateScenarioScore(sessionOptimal, tree);
      const scoreImp = calculateScenarioScore(sessionImpolite, tree);

      expect(scoreOpt).toBeGreaterThan(scoreImp);
      expect(sessionOptimal.score).toBe(scoreOpt);
    });
  });

  describe('5. validateScenarioTree (DAG & Structural Validation)', () => {
    it('validates a correct branching tree with zero errors', () => {
      const tree = createMockTree();
      const result = validateScenarioTree(tree);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.metrics.totalNodes).toBe(3);
      expect(result.metrics.terminalNodes).toBe(2);
      expect(result.metrics.shortestPathLength).toBe(1);
      expect(result.metrics.longestPathLength).toBe(1);
    });

    it('accepts Diamond DAG graphs without false positive cycle errors', () => {
      // Diamond: start -> A -> end, start -> B -> end
      const diamondTree: ScenarioTree = {
        id: 'diamond_tree',
        title: { zh: '菱形图', th: 'ไดมอนด์', en: 'Diamond' },
        npc: { id: 'npc', name: 'NPC', role: 'driver', avatar: '🚕' },
        initialPatience: 80,
        startNodeId: 'node_start',
        nodes: {
          node_start: {
            id: 'node_start',
            speaker: { name: 'NPC', role: 'driver' },
            text: { zh: 'A', pinyin: 'a', th: 'ก', en: 'A' },
            branches: [
              { id: 'b1', text: { zh: '1', pinyin: '1', th: '1', en: '1' }, nextNodeId: 'node_a', patienceDelta: 0, pragmaticType: 'optimal' },
              { id: 'b2', text: { zh: '2', pinyin: '2', th: '2', en: '2' }, nextNodeId: 'node_b', patienceDelta: 0, pragmaticType: 'optimal' },
            ],
          },
          node_a: {
            id: 'node_a',
            speaker: { name: 'NPC', role: 'driver' },
            text: { zh: 'A', pinyin: 'a', th: 'ก', en: 'A' },
            branches: [
              { id: 'b3', text: { zh: '3', pinyin: '3', th: '3', en: '3' }, nextNodeId: 'node_end', patienceDelta: 0, pragmaticType: 'optimal' },
            ],
          },
          node_b: {
            id: 'node_b',
            speaker: { name: 'NPC', role: 'driver' },
            text: { zh: 'B', pinyin: 'b', th: 'ข', en: 'B' },
            branches: [
              { id: 'b4', text: { zh: '4', pinyin: '4', th: '4', en: '4' }, nextNodeId: 'node_end', patienceDelta: 0, pragmaticType: 'optimal' },
            ],
          },
          node_end: {
            id: 'node_end',
            speaker: { name: 'NPC', role: 'driver' },
            text: { zh: 'End', pinyin: 'end', th: 'จบ', en: 'End' },
            branches: [],
            isEnding: true,
          },
        },
      };

      const result = validateScenarioTree(diamondTree);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.metrics.shortestPathLength).toBe(2);
      expect(result.metrics.longestPathLength).toBe(2);
    });

    it('detects genuine directed cycles with 3-Coloring DFS and reports cyclePath', () => {
      // Loop: start -> A -> B -> A
      const cyclicTree: ScenarioTree = {
        id: 'cyclic_tree',
        title: { zh: '循环', th: 'ลูป', en: 'Loop' },
        npc: { id: 'npc', name: 'NPC', role: 'doctor', avatar: '🩺' },
        initialPatience: 80,
        startNodeId: 'node_start',
        nodes: {
          node_start: {
            id: 'node_start',
            speaker: { name: 'NPC', role: 'doctor' },
            text: { zh: 'Start', pinyin: 'start', th: 'เริ่ม', en: 'Start' },
            branches: [
              { id: 'b1', text: { zh: '1', pinyin: '1', th: '1', en: '1' }, nextNodeId: 'node_a', patienceDelta: 0, pragmaticType: 'optimal' },
            ],
          },
          node_a: {
            id: 'node_a',
            speaker: { name: 'NPC', role: 'doctor' },
            text: { zh: 'A', pinyin: 'a', th: 'A', en: 'A' },
            branches: [
              { id: 'b2', text: { zh: '2', pinyin: '2', th: '2', en: '2' }, nextNodeId: 'node_b', patienceDelta: 0, pragmaticType: 'optimal' },
            ],
          },
          node_b: {
            id: 'node_b',
            speaker: { name: 'NPC', role: 'doctor' },
            text: { zh: 'B', pinyin: 'b', th: 'B', en: 'B' },
            branches: [
              { id: 'b3', text: { zh: '3', pinyin: '3', th: '3', en: '3' }, nextNodeId: 'node_a', patienceDelta: 0, pragmaticType: 'optimal' },
            ],
          },
        },
      };

      const result = validateScenarioTree(cyclicTree);
      expect(result.isValid).toBe(false);
      const cycleError = result.errors.find((e) => e.code === 'CYCLE_DETECTED');
      expect(cycleError).toBeDefined();
      expect(cycleError?.cyclePath).toEqual(['node_a', 'node_b', 'node_a']);
    });

    it('detects missing start node error', () => {
      const corruptTree = createMockTree();
      corruptTree.startNodeId = 'ghost_start_node';

      const result = validateScenarioTree(corruptTree);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.code === 'MISSING_START_NODE')).toBe(true);
    });

    it('detects dead-end nodes (non-terminal with no branches)', () => {
      const corruptTree = createMockTree();
      corruptTree.nodes.node_start.branches = []; // Non-terminal with 0 branches

      const result = validateScenarioTree(corruptTree);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.code === 'DEAD_END')).toBe(true);
    });

    it('detects dangling targets (branches pointing to nowhere)', () => {
      const corruptTree = createMockTree();
      corruptTree.nodes.node_start.branches[0].nextNodeId = 'nowhere_node';

      const result = validateScenarioTree(corruptTree);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.code === 'DANGLING_TARGET')).toBe(true);
    });

    it('detects invalid terminal nodes having outgoing branches', () => {
      const corruptTree = createMockTree();
      corruptTree.nodes.node_gate_open.branches = [
        { id: 'b_invalid', text: { zh: '1', pinyin: '1', th: '1', en: '1' }, nextNodeId: 'node_start', patienceDelta: 0, pragmaticType: 'optimal' },
      ];

      const result = validateScenarioTree(corruptTree);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.code === 'INVALID_ENDING')).toBe(true);
    });

    it('warns about orphan nodes unreachable from start node', () => {
      const treeWithOrphan = createMockTree();
      treeWithOrphan.nodes['node_orphan'] = {
        id: 'node_orphan',
        speaker: { name: 'Ghost', role: 'custom' },
        text: { zh: 'Lonely', pinyin: 'lonely', th: 'เดียวดาย', en: 'Lonely' },
        branches: [],
        isEnding: true,
      };

      const result = validateScenarioTree(treeWithOrphan);
      expect(result.isValid).toBe(true); // Warnings don't invalidate tree
      expect(result.warnings.some((w) => w.code === 'ORPHAN_NODE')).toBe(true);
      expect(result.metrics.orphanCount).toBe(1);
    });

    it('validates production scenario JSON files: delivery_gate_code and didi_tail_number', async () => {
      const deliveryGate = await import('../../data/scenarios/delivery_gate_code.json');
      const didiTail = await import('../../data/scenarios/didi_tail_number.json');

      const valDelivery = validateScenarioTree(deliveryGate.default as unknown as ScenarioTree);
      expect(valDelivery.isValid).toBe(true);
      expect(valDelivery.errors).toHaveLength(0);
      expect(valDelivery.metrics.terminalNodes).toBeGreaterThanOrEqual(1);

      const valDidi = validateScenarioTree(didiTail.default as unknown as ScenarioTree);
      expect(valDidi.isValid).toBe(true);
      expect(valDidi.errors).toHaveLength(0);
      expect(valDidi.metrics.terminalNodes).toBeGreaterThanOrEqual(1);
    });
  });
});
