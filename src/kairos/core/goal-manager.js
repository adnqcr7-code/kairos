const { runOfflineSwarm } = require('./agents');
const { buildWarning, approveGoal } = require('./governor');
const { BUDGET_MODES, routeModels } = require('./model-router');
const { providerStatus } = require('./providers');
const { suggestSkillsForGoal } = require('./skills');
const { saveGoal, loadGoal, listGoals } = require('./storage');

const APPROVAL_MODES = Object.freeze(['step', 'auto-safe', 'manual']);

function nextGoalId() {
  const now = new Date();
  const stamp = now.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  const suffix = Math.random().toString(36).slice(2, 6);
  return `goal_${stamp}_${suffix}`;
}

function createGoal({ title, budgetMode, approvalMode }) {
  if (!BUDGET_MODES.includes(budgetMode)) {
    throw new Error(`Invalid budget mode: ${budgetMode}. Use one of: ${BUDGET_MODES.join(', ')}`);
  }

  if (!APPROVAL_MODES.includes(approvalMode)) {
    throw new Error(`Invalid approval mode: ${approvalMode}. Use one of: ${APPROVAL_MODES.join(', ')}`);
  }

  const modelPlan = routeModels(budgetMode);
  const activeProvider = providerStatus();
  const suggestedSkills = suggestSkillsForGoal(title);
  const goal = {
    id: nextGoalId(),
    title,
    status: 'pending_approval',
    budgetMode,
    approvalMode,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    modelPlan: Object.fromEntries(
      Object.entries(modelPlan).map(([role, provider]) => [role, provider.id])
    ),
    suggestedSkills: suggestedSkills.map((skill) => ({
      id: skill.id,
      title: skill.title,
      relativePath: skill.relativePath
    })),
    successCriteria: [
      'Plan is clear enough to implement.',
      'Safety rules are visible before work starts.',
      'No file edits happen without a later approval layer.',
      'Goal state can be resumed from disk.'
    ],
    executionMode: 'offline-safe-dry-run',
    activeProvider,
    events: [
      {
        at: new Date().toISOString(),
        type: 'goal.created',
        message: 'Goal created and waiting for approval.'
      }
    ]
  };

  goal.warning = buildWarning(goal, modelPlan);
  return saveGoal(goal);
}

function runApprovedGoal(goalId) {
  const loaded = loadGoal(goalId);
  const approved = approveGoal(loaded);
  const outputs = runOfflineSwarm(approved);

  const completed = {
    ...approved,
    status: 'completed',
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    outputs,
    events: [
      ...approved.events,
      {
        at: new Date().toISOString(),
        type: 'goal.approved',
        message: 'User approved the goal.'
      },
      {
        at: new Date().toISOString(),
        type: 'swarm.completed',
        message: 'Offline safe swarm completed.'
      }
    ]
  };

  return saveGoal(completed);
}

module.exports = {
  APPROVAL_MODES,
  createGoal,
  loadGoal,
  listGoals,
  runApprovedGoal
};
