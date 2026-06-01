const TOOLS = [
  {
    id: 'goal.create',
    status: 'ready',
    description: 'Create a guarded /goal run and save it locally.'
  },
  {
    id: 'goal.approve',
    status: 'ready',
    description: 'Approve a pending goal and run the offline-safe swarm.'
  },
  {
    id: 'skills.list',
    status: 'ready',
    description: 'Scan and list local markdown skills.'
  },
  {
    id: 'skills.search',
    status: 'ready',
    description: 'Find relevant built-in skills for a task.'
  },
  {
    id: 'skills.show',
    status: 'ready',
    description: 'Display a specific skill by id.'
  },
  {
    id: 'brain.setup',
    status: 'ready',
    description: 'Choose or change the AI brain provider.'
  },
  {
    id: 'brain.status',
    status: 'ready',
    description: 'Show current AI brain config without exposing secrets.'
  },
  {
    id: 'providers.setup',
    status: 'ready',
    description: 'Lower-level provider configuration command.'
  },
  {
    id: 'providers.status',
    status: 'ready',
    description: 'Lower-level provider status command.'
  },
  {
    id: 'files.read',
    status: 'ready',
    description: 'Read approved project files for agent context.'
  },
  {
    id: 'files.search',
    status: 'ready',
    description: 'Search files with fast ripgrep-style matching.'
  },
  {
    id: 'files.write',
    status: 'ready',
    description: 'Create approved files inside the workspace.'
  },
  {
    id: 'files.patch',
    status: 'planned',
    description: 'Apply guarded file patches only inside approved folders.'
  },
  {
    id: 'diff.view',
    status: 'planned',
    description: 'Show pending code changes before approval.'
  },
  {
    id: 'git.status',
    status: 'planned',
    description: 'Inspect repository status and changed files.'
  },
  {
    id: 'git.diff',
    status: 'planned',
    description: 'Inspect code diffs for review and planning.'
  },
  {
    id: 'git.branch',
    status: 'planned',
    description: 'Create or switch guarded working branches.'
  },
  {
    id: 'shell.safe-run',
    status: 'ready',
    description: 'Run allowlisted commands with approval and logs.'
  },
  {
    id: 'shell.approve',
    status: 'ready',
    description: 'Ask before risky commands, installs, deletes, or network actions.'
  },
  {
    id: 'npm.install',
    status: 'planned',
    description: 'Install Node dependencies only after approval.'
  },
  {
    id: 'tests.run',
    status: 'planned',
    description: 'Run project test/check scripts and summarize failures.'
  },
  {
    id: 'project.scan',
    status: 'ready',
    description: 'Inspect a project stack, scripts, and structure.'
  },
  {
    id: 'project.build',
    status: 'ready',
    description: 'Generate approved starter project templates such as Discord bots and Node CLIs.'
  },
  {
    id: 'project.index',
    status: 'planned',
    description: 'Build a local index of files, scripts, dependencies, and skills.'
  },
  {
    id: 'web.fetch',
    status: 'planned',
    description: 'Fetch approved URLs for docs/research when network is allowed.'
  },
  {
    id: 'browser.open',
    status: 'planned',
    description: 'Open local app previews for UI verification.'
  },
  {
    id: 'memory.read',
    status: 'ready',
    description: 'Read local user/project memory.'
  },
  {
    id: 'memory.write',
    status: 'ready',
    description: 'Add local user/project memory notes.'
  },
  {
    id: 'security.scan',
    status: 'planned',
    description: 'Run security checks for secrets, risky commands, and dangerous code patterns.'
  },
  {
    id: 'agents.swarm',
    status: 'planned',
    description: 'Coordinate planner, builder, tester, reviewer, security, and docs agents.'
  },
  {
    id: 'package.export',
    status: 'ready',
    description: 'Prepare client delivery zips, README, and .env.example.'
  }
];

function listTools() {
  return TOOLS;
}

module.exports = {
  listTools
};
