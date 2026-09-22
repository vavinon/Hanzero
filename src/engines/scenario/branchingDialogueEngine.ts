/**
 * src/engines/scenario/branchingDialogueEngine.ts
 * ------------------------------------------------
 * Pure TypeScript Branching Dialogue & Scenario Decision Engine.
 *
 * Adheres strictly to AGENTS.md §4.2:
 * - Zero DOM / Zero UI (100% pure TypeScript logic, fully testable in Vitest)
 * - Strict Typing: Zero 'any'
 * - Directed Acyclic Graph (DAG) validation with 3-Coloring DFS Cycle Detection
 * - Safe Practice Zone: Tutu's Lifeline rescue mechanic, no harsh instant failures
 * - Complete immutability across state transitions
 * - Resilient error recovery: Post-finish immunity, Dangling target fallbacks, NaN clamp guards
 */

export interface ScenarioText {
  zh: string;
  pinyin: string;
  th: string;
  en: string;
  displayPinyin?: string;
  audioKey?: string;
}

export type NPCRole =
  | 'rider'
  | 'driver'
  | 'doctor'
  | 'hotel_staff'
  | 'police'
  | 'merchant'
  | 'waiter'
  | 'custom';

export type NPCMood =
  | 'delighted' // >= 80: ประทับใจ สบายใจ ยิ้มแย้ม
  | 'friendly' // 55-79: เป็นมิตรปกติ ราบรื่น
  | 'neutral' // 35-54: เข้าสู่โหมดรีบ กระชับเวลา
  | 'confused_hurried' // 15-34: เริ่มงง เร่งรีบ ถามซ้ำ
  | 'awkward_flustered'; // < 15: ลำบากใจ สื่อสารติดขัด (Trigger Tutu Rescue)

export type DecisionPragmaticType =
  | 'optimal' // ยอดเยี่ยม สุภาพ ตรงจุด (+10..+15)
  | 'acceptable' // พอใช้ สื่อสารได้แต่อาจห้วนไปนิด (0..+5)
  | 'misunderstanding' // เข้าใจผิด ต้องอธิบายเพิ่ม (-10..-15)
  | 'impolite_awkward'; // ผิดกาลเทศะ เสียมารยาท (-20..-25)

export interface CulturalEtiquetteNote {
  id: string;
  category:
    | 'digital_life'
    | 'social_courtesy'
    | 'public_transit'
    | 'dining_hospitality'
    | 'medical_clinic';
  titleTh: string;
  insightTh: string;
  doAndDont: {
    doTh: string;
    dontTh: string;
  };
  goldenPhrase: {
    zh: string;
    pinyin: string;
    th: string;
  };
  badgeReward?: string;
}

export interface DecisionBranch {
  id: string;
  text: ScenarioText;
  nextNodeId: string;
  patienceDelta: number;
  pragmaticType: DecisionPragmaticType;
  feedbackTh?: string;
  moodReaction?: NPCMood;
}

export interface ScenarioNode {
  id: string;
  speaker: {
    name: string;
    role: NPCRole;
    avatar?: string;
  };
  text: ScenarioText;
  culturalNote?: CulturalEtiquetteNote;
  branches: DecisionBranch[];
  isEnding?: boolean;
  endingType?: 'grand_pass' | 'cozy_pass' | 'tutu_replay';
  endingTitleTh?: string;
  endingMessageTh?: string;
}

export interface ScenarioTree {
  id: string;
  title: {
    zh: string;
    th: string;
    en?: string;
  };
  npc: {
    id: string;
    name: string;
    role: NPCRole;
    avatar: string;
    initialMood?: NPCMood;
  };
  initialPatience: number;
  startNodeId: string;
  nodes: Record<string, ScenarioNode>;
}

export interface ScenarioStepHistory {
  nodeId: string;
  chosenBranchId: string;
  chosenText: string;
  patienceBefore: number;
  patienceAfter: number;
  patienceDelta: number;
  pragmaticType: DecisionPragmaticType;
  timestamp: number;
  feedbackTh?: string;
}

export interface ScenarioSession {
  treeId: string;
  currentNodeId: string;
  patience: number;
  currentMood: NPCMood;
  history: ScenarioStepHistory[];
  isFinished: boolean;
  outcome?: 'grand_pass' | 'cozy_pass' | 'tutu_replay';
  score: number;
  tutuRescueUsed: boolean;
}

export interface ValidationError {
  code: 'MISSING_START_NODE' | 'CYCLE_DETECTED' | 'DEAD_END' | 'DANGLING_TARGET' | 'INVALID_ENDING';
  nodeId?: string;
  branchId?: string;
  message: string;
  cyclePath?: string[];
}

export interface ValidationWarning {
  code: 'ORPHAN_NODE' | 'UNREACHABLE_TERMINAL';
  nodeId?: string;
  message: string;
}

export interface TreeMetrics {
  totalNodes: number;
  terminalNodes: number;
  shortestPathLength: number;
  longestPathLength: number;
  orphanCount: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  metrics: TreeMetrics;
}

/**
 * Maps a numeric patience value (0-100) to an NPCMood.
 */
export function getPatienceMood(patience: number): NPCMood {
  const p = calculatePatienceDelta(patience, 0);
  if (p >= 80) return 'delighted';
  if (p >= 55) return 'friendly';
  if (p >= 35) return 'neutral';
  if (p >= 15) return 'confused_hurried';
  return 'awkward_flustered';
}

/**
 * Clamps numeric patience change strictly within [0, 100], handling NaN / Infinity safely.
 */
export function calculatePatienceDelta(currentPatience: number, delta: number): number {
  const safeCurrent = Number.isFinite(currentPatience) ? currentPatience : 50;
  const safeDelta = Number.isFinite(delta) ? delta : 0;
  const result = safeCurrent + safeDelta;
  return Math.max(0, Math.min(100, Math.round(result)));
}

/**
 * Creates a fresh scenario session initialized at the tree's startNodeId.
 */
export function createScenarioSession(
  tree: ScenarioTree,
  options?: { initialPatience?: number; initialMood?: NPCMood }
): ScenarioSession {
  const initPatience = calculatePatienceDelta(
    options?.initialPatience ?? tree.initialPatience ?? 75,
    0
  );

  const initMood =
    options?.initialMood ??
    (options?.initialPatience !== undefined
      ? getPatienceMood(initPatience)
      : tree.npc.initialMood ?? getPatienceMood(initPatience));

  return {
    treeId: tree.id,
    currentNodeId: tree.startNodeId,
    patience: initPatience,
    currentMood: initMood,
    history: [],
    isFinished: false,
    score: 0,
    tutuRescueUsed: false,
  };
}

/**
 * Calculates a deterministic scenario performance score based on pragmatic decisions,
 * remaining patience, and penalties.
 */
export function calculateScenarioScore(session: ScenarioSession, _tree: ScenarioTree): number {
  let score = 0;

  // Base score based on remaining patience
  score += Math.round(session.patience * 0.5); // up to 50 pts

  // Score from choices in history
  for (const step of session.history) {
    switch (step.pragmaticType) {
      case 'optimal':
        score += 25;
        break;
      case 'acceptable':
        score += 15;
        break;
      case 'misunderstanding':
        score += 5;
        break;
      case 'impolite_awkward':
        score += 0;
        break;
    }
  }

  // Bonus for outcome
  if (session.outcome === 'grand_pass') {
    score += 50;
  } else if (session.outcome === 'cozy_pass') {
    score += 30;
  }

  // Small penalty if Tutu Lifeline was used to rescue
  if (session.tutuRescueUsed) {
    score = Math.max(10, score - 15);
  }

  return Math.max(0, score);
}

/**
 * Applies Tutu's Lifeline rescue mechanism:
 * Restores +25 patience when the situation becomes awkward or hurried.
 * Can only be used once per session.
 */
export function applyTutuRescue(session: ScenarioSession): ScenarioSession {
  if (session.tutuRescueUsed || session.isFinished) {
    return session;
  }

  const restoredPatience = calculatePatienceDelta(session.patience, 25);
  const updatedSession: ScenarioSession = {
    ...session,
    patience: restoredPatience,
    currentMood: getPatienceMood(restoredPatience),
    tutuRescueUsed: true,
  };

  return {
    ...updatedSession,
    score: calculateScenarioScore(updatedSession, { id: session.treeId } as ScenarioTree),
  };
}

/**
 * Pure state machine transition: Processes a user's chosen decision branch.
 * Enforces:
 * - Post-finish immunity (no-op if session is already finished)
 * - Immutability (returns newly cloned session)
 * - Dangling target fallback (fails gracefully to tutu_replay instead of crashing)
 * - Automatic ending outcome determination
 */
export function makeChoice(
  tree: ScenarioTree,
  session: ScenarioSession,
  branchId: string
): ScenarioSession {
  // 1. Post-finish immunity guard
  if (session.isFinished) {
    return session;
  }

  const currentNode = tree.nodes[session.currentNodeId];
  if (!currentNode) {
    // Current node disappeared or was invalid
    return {
      ...session,
      isFinished: true,
      outcome: 'tutu_replay',
    };
  }

  const chosenBranch = currentNode.branches.find((b) => b.id === branchId);
  if (!chosenBranch) {
    // Branch not found; return unchanged session
    return session;
  }

  // 2. Calculate updated patience & mood
  const patienceBefore = session.patience;
  const patienceAfter = calculatePatienceDelta(patienceBefore, chosenBranch.patienceDelta);
  const moodAfter = chosenBranch.moodReaction ?? getPatienceMood(patienceAfter);

  // 3. Create history entry
  const historyEntry: ScenarioStepHistory = {
    nodeId: session.currentNodeId,
    chosenBranchId: chosenBranch.id,
    chosenText: chosenBranch.text.zh,
    patienceBefore,
    patienceAfter,
    patienceDelta: chosenBranch.patienceDelta,
    pragmaticType: chosenBranch.pragmaticType,
    timestamp: Date.now(),
    feedbackTh: chosenBranch.feedbackTh,
  };

  const nextHistory = [...session.history, historyEntry];

  // 4. Validate next node existence (Dangling target guard)
  const nextNode = tree.nodes[chosenBranch.nextNodeId];
  if (!nextNode) {
    const safeEndSession: ScenarioSession = {
      ...session,
      patience: patienceAfter,
      currentMood: moodAfter,
      history: nextHistory,
      isFinished: true,
      outcome: 'tutu_replay',
    };
    return {
      ...safeEndSession,
      score: calculateScenarioScore(safeEndSession, tree),
    };
  }

  // 5. Check if next node is terminal or patience is completely depleted
  let isFinished = false;
  let outcome: 'grand_pass' | 'cozy_pass' | 'tutu_replay' | undefined = undefined;

  if (nextNode.isEnding) {
    isFinished = true;
    if (nextNode.endingType) {
      outcome = nextNode.endingType;
    } else if (patienceAfter >= 75) {
      outcome = 'grand_pass';
    } else if (patienceAfter >= 35) {
      outcome = 'cozy_pass';
    } else {
      outcome = 'tutu_replay';
    }
  } else if (patienceAfter <= 0 && session.tutuRescueUsed) {
    // Both patience depleted and rescue already used: conclusion
    isFinished = true;
    outcome = 'tutu_replay';
  }

  const updatedSession: ScenarioSession = {
    treeId: session.treeId,
    currentNodeId: chosenBranch.nextNodeId,
    patience: patienceAfter,
    currentMood: moodAfter,
    history: nextHistory,
    isFinished,
    outcome,
    score: 0,
    tutuRescueUsed: session.tutuRescueUsed,
  };

  return {
    ...updatedSession,
    score: calculateScenarioScore(updatedSession, tree),
  };
}

/**
 * Validates a ScenarioTree for structural integrity:
 * 1. Checks startNodeId existence
 * 2. 3-Color DFS Cycle Detection (White=0, Gray=1, Black=2) with cycle path tracking
 * 3. Dead-end detection (non-ending nodes with zero branches)
 * 4. Dangling targets (branches pointing to non-existent nodes)
 * 5. Invalid ending nodes (ending nodes having branching children)
 * 6. Orphan nodes detection (nodes unreachable from startNodeId via BFS)
 * 7. Path length metrics calculation (Shortest and Longest paths to terminal nodes)
 */
export function validateScenarioTree(tree: ScenarioTree): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  const totalNodes = Object.keys(tree.nodes).length;
  let terminalNodes = 0;

  // 1. Check startNodeId existence
  if (!tree.startNodeId || !tree.nodes[tree.startNodeId]) {
    errors.push({
      code: 'MISSING_START_NODE',
      message: `Start node '${tree.startNodeId}' is missing from the tree nodes registry.`,
    });
  }

  // 2. Inspect node structural properties (Dead-ends, Dangling targets, Terminal nodes)
  for (const [nodeId, node] of Object.entries(tree.nodes)) {
    if (node.isEnding) {
      terminalNodes++;
      if (node.branches && node.branches.length > 0) {
        errors.push({
          code: 'INVALID_ENDING',
          nodeId,
          message: `Terminal node '${nodeId}' has outgoing branches. Terminal nodes must not have branches.`,
        });
      }
    } else {
      if (!node.branches || node.branches.length === 0) {
        errors.push({
          code: 'DEAD_END',
          nodeId,
          message: `Non-terminal node '${nodeId}' has no outgoing branches (Dead end).`,
        });
      }
    }

    // Inspect branch targets
    if (node.branches) {
      for (const branch of node.branches) {
        if (!tree.nodes[branch.nextNodeId]) {
          errors.push({
            code: 'DANGLING_TARGET',
            nodeId,
            branchId: branch.id,
            message: `Branch '${branch.id}' in node '${nodeId}' points to non-existent node '${branch.nextNodeId}'.`,
          });
        }
      }
    }
  }

  // 3. 3-Color DFS Cycle Detection (White = 0, Gray = 1, Black = 2)
  const WHITE = 0;
  const GRAY = 1;
  const BLACK = 2;
  const colors: Record<string, number> = {};
  for (const nodeId of Object.keys(tree.nodes)) {
    colors[nodeId] = WHITE;
  }

  const callStack: string[] = [];

  function dfsDetectCycle(nodeId: string): void {
    colors[nodeId] = GRAY;
    callStack.push(nodeId);

    const node = tree.nodes[nodeId];
    if (node && node.branches) {
      for (const branch of node.branches) {
        const targetId = branch.nextNodeId;
        if (colors[targetId] === GRAY) {
          // Cycle detected!
          const cycleStartIndex = callStack.indexOf(targetId);
          const cyclePath = [...callStack.slice(cycleStartIndex), targetId];
          errors.push({
            code: 'CYCLE_DETECTED',
            nodeId,
            branchId: branch.id,
            message: `Directed cycle detected in scenario tree: ${cyclePath.join(' -> ')}`,
            cyclePath,
          });
        } else if (colors[targetId] === WHITE && tree.nodes[targetId]) {
          dfsDetectCycle(targetId);
        }
      }
    }

    callStack.pop();
    colors[nodeId] = BLACK;
  }

  if (tree.startNodeId && tree.nodes[tree.startNodeId]) {
    dfsDetectCycle(tree.startNodeId);
  }

  // Run cycle detection for any remaining unvisited nodes
  for (const nodeId of Object.keys(tree.nodes)) {
    if (colors[nodeId] === WHITE) {
      dfsDetectCycle(nodeId);
    }
  }

  // 4. BFS Reachability from startNodeId (Orphan Node Detection)
  const reachableNodes = new Set<string>();
  if (tree.startNodeId && tree.nodes[tree.startNodeId]) {
    const queue: string[] = [tree.startNodeId];
    reachableNodes.add(tree.startNodeId);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      const currNode = tree.nodes[curr];
      if (currNode && currNode.branches) {
        for (const branch of currNode.branches) {
          if (tree.nodes[branch.nextNodeId] && !reachableNodes.has(branch.nextNodeId)) {
            reachableNodes.add(branch.nextNodeId);
            queue.push(branch.nextNodeId);
          }
        }
      }
    }
  }

  let orphanCount = 0;
  for (const nodeId of Object.keys(tree.nodes)) {
    if (!reachableNodes.has(nodeId)) {
      orphanCount++;
      warnings.push({
        code: 'ORPHAN_NODE',
        nodeId,
        message: `Node '${nodeId}' is unreachable from start node '${tree.startNodeId}'.`,
      });
    }
  }

  // 5. Shortest and Longest Path Metrics Calculation (if DAG / no cycle detected)
  let shortestPathLength = 0;
  let longestPathLength = 0;

  const hasCycle = errors.some((e) => e.code === 'CYCLE_DETECTED');

  if (!hasCycle && tree.startNodeId && tree.nodes[tree.startNodeId]) {
    // BFS for shortest path to any terminal node
    const distance: Record<string, number> = { [tree.startNodeId]: 0 };
    const queue: string[] = [tree.startNodeId];
    let minTerminalDist: number | null = null;

    while (queue.length > 0) {
      const curr = queue.shift()!;
      const currDist = distance[curr];
      const currNode = tree.nodes[curr];

      if (currNode?.isEnding) {
        if (minTerminalDist === null || currDist < minTerminalDist) {
          minTerminalDist = currDist;
        }
      }

      if (currNode && currNode.branches) {
        for (const branch of currNode.branches) {
          const target = branch.nextNodeId;
          if (tree.nodes[target] && distance[target] === undefined) {
            distance[target] = currDist + 1;
            queue.push(target);
          }
        }
      }
    }

    if (minTerminalDist !== null) {
      shortestPathLength = minTerminalDist;
    }

    // Memoized DFS for longest path to terminal
    const memoLongest: Record<string, number> = {};

    function getLongestPath(nodeId: string): number {
      if (memoLongest[nodeId] !== undefined) {
        return memoLongest[nodeId];
      }

      const node = tree.nodes[nodeId];
      if (!node || node.isEnding || !node.branches || node.branches.length === 0) {
        memoLongest[nodeId] = 0;
        return 0;
      }

      let maxChildDist = 0;
      for (const branch of node.branches) {
        if (tree.nodes[branch.nextNodeId]) {
          const childDist = 1 + getLongestPath(branch.nextNodeId);
          if (childDist > maxChildDist) {
            maxChildDist = childDist;
          }
        }
      }

      memoLongest[nodeId] = maxChildDist;
      return maxChildDist;
    }

    longestPathLength = getLongestPath(tree.startNodeId);

    // Check if any reachable node cannot reach a terminal
    for (const reachableId of reachableNodes) {
      const node = tree.nodes[reachableId];
      if (node && !node.isEnding && getLongestPath(reachableId) === 0) {
        warnings.push({
          code: 'UNREACHABLE_TERMINAL',
          nodeId: reachableId,
          message: `Reachable node '${reachableId}' cannot reach any terminal node.`,
        });
      }
    }
  }

  const metrics: TreeMetrics = {
    totalNodes,
    terminalNodes,
    shortestPathLength,
    longestPathLength,
    orphanCount,
  };

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    metrics,
  };
}
