const assert = require('node:assert/strict');
const { loadMemory } = require('../core/memory');
const { providerStatus } = require('../core/providers');
const { searchSkills } = require('../core/skills');
const { readRecentToolEvents } = require('../core/tool-log');
const { listTools } = require('../core/tools');
const { scanProject } = require('../core/workspace-tools');

function run() {
  const provider = providerStatus();
  assert.ok(provider.id, 'provider status should include an id');

  const tools = listTools();
  assert.ok(tools.some((tool) => tool.id === 'goal.create'), 'tools should include goal.create');
  assert.ok(tools.some((tool) => tool.id === 'providers.setup'), 'tools should include providers.setup');
  assert.ok(tools.some((tool) => tool.id === 'project.build' && tool.status === 'ready'), 'tools should include ready project.build');

  const securitySkills = searchSkills('security auditor');
  assert.equal(securitySkills[0].id, '01-coding:security-auditor');

  const memory = loadMemory();
  assert.ok(memory.user, 'memory should include user profile');
  assert.ok(Array.isArray(memory.notes), 'memory notes should be an array');

  const scan = scanProject('.');
  assert.ok(scan.fileCount > 0, 'project scan should find files');
  assert.ok(Array.isArray(readRecentToolEvents(5)), 'tool logs should be readable');

  console.log('Kairos smoke tests passed.');
}

run();
