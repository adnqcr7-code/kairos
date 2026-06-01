#!/usr/bin/env node

const { askBrain } = require('./core/brain');
const { buildTemplate } = require('./core/builder');
const { printDoctor, runDoctor } = require('./core/doctor');
const { printJson, printScan, printSearch, printToolResult } = require('./core/format');
const { createGoal, loadGoal, listGoals, runApprovedGoal } = require('./core/goal-manager');
const { runChat } = require('./core/chat');
const { runMenu } = require('./core/menu');
const { loadMemory, setMemoryValue } = require('./core/memory');
const { checkProvider, listOllamaModels } = require('./core/provider-health');
const { listProviders, providerStatus, setupProvider } = require('./core/providers');
const { runSetup } = require('./core/setup');
const { getSkill, listSkills, searchSkills } = require('./core/skills');
const { readRecentToolEvents } = require('./core/tool-log');
const { listTools } = require('./core/tools');
const { makeDir, readTextFile, runReviewedCommand, scanProject, searchFiles, zipPath } = require('./core/workspace-tools');

function parseArgs(argv) {
  const args = [];
  const flags = {};

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value.startsWith('--')) {
      const key = value.slice(2);
      const next = argv[index + 1];
      if (!next || next.startsWith('--')) {
        flags[key] = true;
      } else {
        flags[key] = next;
        index += 1;
      }
    } else {
      args.push(value);
    }
  }

  return { args, flags };
}

function printHelp() {
  console.log([
    'Kairos Agent 0.1',
    '',
    'Commands:',
    '  (no args) opens the Kairos menu',
    '  start',
    '  chat',
    '  setup [--yes] [--provider offline|ollama|openai|anthropic|gemini|kimi|openrouter|codex]',
    '  doctor',
    '  brain setup|status|list|check',
    '  brain ask "<prompt>"',
    '  ollama models',
    '  run "<powershell command>"',
    '  scan [path]',
    '  search <query> [path]',
    '  read <path>',
    '  mkdir <path>',
    '  zip <sourcePath> <zipPath>',
    '  build <node-cli|discord-bot> <targetPath> [--force]',
    '  /goal "<goal>" [--budget cheap|balanced|best] [--approval step|auto-safe|manual]',
    '  approve <goal-id>',
    '  status [goal-id]',
    '  skills list',
    '  skills search "<query>"',
    '  skills show <category:skill-name>',
    '  tools list',
    '  logs [limit]',
    '  providers list',
    '  providers status [provider]',
    '  providers setup [--provider offline|ollama|openai|anthropic|gemini|kimi|openrouter|codex]',
    '  memory show',
    '  memory set <name|style|note|key> <value>',
    '  --help',
    '',
    'Examples:',
    '  npm.cmd run kairos',
    '  npm.cmd run kairos -- setup',
    '  npm.cmd run kairos -- doctor',
    '  npm.cmd run kairos -- brain setup',
    '  npm.cmd run kairos -- brain status',
    '  npm.cmd run kairos -- brain check',
    '  npm.cmd run kairos -- brain check --all',
    '  npm.cmd run kairos -- brain ask "explain this repo"',
    '  npm.cmd run kairos -- ollama models',
    '  npm.cmd run kairos -- scan',
    '  npm.cmd run kairos -- search discord poseidon-bot',
    '  npm.cmd run kairos -- read README.md',
    '  npm.cmd run kairos -- mkdir apps/demo',
    '  npm.cmd run kairos -- zip poseidon-bot packages/poseidon-bot.zip',
    '  npm.cmd run kairos -- build discord-bot apps/client-bot',
    '  npm.cmd run kairos -- /goal "Build a Discord ticket bot template" --budget cheap --approval step',
    '  npm.cmd run kairos -- approve goal_20260531_001',
    '  npm.cmd run kairos -- skills list',
    '  npm.cmd run kairos -- skills search "model selector"',
    '  npm.cmd run kairos -- skills show 01-coding:code-reviewer',
    '  npm.cmd run kairos -- tools list',
    '  npm.cmd run kairos -- logs 10',
    '  npm.cmd run kairos -- providers status',
    '  npm.cmd run kairos -- providers setup',
    '  npm.cmd run kairos -- providers setup --provider ollama --yes',
    '  npm.cmd run kairos -- providers setup --provider openai'
  ].join('\n'));
}

function printGoal(goal) {
  printJson(goal);
}

async function main() {
  const { args, flags } = parseArgs(process.argv.slice(2));
  const command = args[0];

  if (command === '--help' || flags.help) {
    printHelp();
    return;
  }

  if (!command || command === 'start') {
    await runMenu();
    return;
  }

  if (command === 'chat') {
    await runChat();
    return;
  }

  if (command === 'setup') {
    const result = await runSetup(flags);
    if (!result.completed) {
      console.log(result.message);
      return;
    }

    console.log('Setup complete.');
    console.log(`Provider: ${result.provider.id}`);
    console.log(`Memory: ${result.memoryPath}`);
    if (result.health) {
      console.log(`Brain check: ${result.health.ok ? 'OK' : 'NOT READY'} - ${result.health.message}`);
    }
    if (result.provider.id !== 'offline' && result.health?.ok) {
      console.log('Starting chat...');
      await runChat();
    }
    return;
  }

  if (command === 'doctor') {
    const report = await runDoctor();
    flags.json ? printGoal(report) : printDoctor(report);
    return;
  }

  if (command === '/goal') {
    const title = args.slice(1).join(' ').trim();
    if (!title) {
      throw new Error('Missing goal text. Example: /goal "Build a Discord ticket bot template"');
    }

    const goal = createGoal({
      title,
      budgetMode: flags.budget || 'cheap',
      approvalMode: flags.approval || 'step'
    });

    console.log(goal.warning);
    console.log('');
    console.log(`Goal saved: ${goal.id}`);
    console.log(`Approve with: npm.cmd run kairos -- approve ${goal.id}`);
    return;
  }

  if (command === 'approve') {
    const goalId = args[1];
    if (!goalId) throw new Error('Missing goal id. Example: approve goal_20260531_001');
    const result = runApprovedGoal(goalId);
    printGoal(result);
    return;
  }

  if (command === 'status') {
    const goalId = args[1];
    if (goalId) {
      printGoal(loadGoal(goalId));
      return;
    }

    const goals = listGoals();
    if (goals.length === 0) {
      console.log('No Kairos goals yet.');
      return;
    }

    for (const goal of goals) {
      console.log(`${goal.id} | ${goal.status} | ${goal.title}`);
    }
    return;
  }

  if (command === 'skills') {
    const subcommand = args[1] || 'list';

    if (subcommand === 'list') {
      const result = listSkills();
      if (result.warning) {
        console.log(result.warning);
        return;
      }

      console.log(`Skills root: ${result.rootDir}`);
      for (const skill of result.skills) {
        console.log(`${skill.id} | ${skill.title}`);
      }
      return;
    }

    if (subcommand === 'show') {
      const skillId = args[2];
      if (!skillId) throw new Error('Missing skill id. Example: skills show 01-coding:code-reviewer');
      const skill = getSkill(skillId);
      console.log([
        `${skill.id} | ${skill.title}`,
        `Path: ${skill.path}`,
        '',
        skill.content
      ].join('\n'));
      return;
    }

    if (subcommand === 'search') {
      const query = args.slice(2).join(' ').trim();
      if (!query) throw new Error('Missing search query. Example: skills search "model selector"');
      const results = searchSkills(query);
      if (results.length === 0) {
        console.log(`No skills matched: ${query}`);
        return;
      }

      for (const skill of results) {
        console.log(`${skill.id} | score=${skill.score} | ${skill.title}`);
      }
      return;
    }

    throw new Error(`Unknown skills command: ${subcommand}`);
  }

  if (command === 'tools') {
    const subcommand = args[1] || 'list';
    if (subcommand !== 'list') {
      throw new Error(`Unknown tools command: ${subcommand}`);
    }

    for (const tool of listTools()) {
      console.log(`${tool.id} | ${tool.status} | ${tool.description}`);
    }
    return;
  }

  if (command === 'logs') {
    const limit = Number.parseInt(args[1] || '25', 10);
    printGoal(readRecentToolEvents(Number.isInteger(limit) ? limit : 25));
    return;
  }

  if (command === 'providers') {
    const subcommand = args[1] || 'status';

    if (subcommand === 'list') {
      for (const provider of listProviders()) {
        console.log(`${provider.id} | ${provider.status.configured ? 'configured' : 'needs setup'} | ${provider.label} | ${provider.description}`);
      }
      return;
    }

    if (subcommand === 'status') {
      const providerId = args[2];
      printGoal(providerStatus(providerId));
      return;
    }

    if (subcommand === 'setup') {
      const providerId = flags.provider;
      const result = await setupProvider(providerId, flags);
      console.log(`Saved provider config to: ${result.envPath}`);
      printGoal(result.status);
      return;
    }

    throw new Error(`Unknown providers command: ${subcommand}`);
  }

  if (command === 'brain') {
    const subcommand = args[1] || 'status';

    if (subcommand === 'list') {
      for (const provider of listProviders()) {
        console.log(`${provider.id} | ${provider.status.configured ? 'configured' : 'needs setup'} | ${provider.label} | ${provider.description}`);
      }
      return;
    }

    if (subcommand === 'status') {
      printGoal(providerStatus(args[2]));
      return;
    }

    if (subcommand === 'setup' || subcommand === 'change') {
      const result = await setupProvider(flags.provider, flags);
      console.log('Brain updated.');
      console.log(`Provider: ${result.status.id}`);
      console.log(`Status: ${result.status.configured ? 'configured' : 'needs setup'}`);
      const health = await checkProvider(result.status.id);
      console.log(`Brain check: ${health.ok ? 'OK' : 'NOT READY'} - ${health.message}`);
      return;
    }

    if (subcommand === 'check') {
      if (flags.all) {
        for (const provider of listProviders()) {
          const health = await checkProvider(provider.id);
          console.log(`${provider.id} | ${health.ok ? 'OK' : 'NOT READY'} | ${health.message}`);
        }
        return;
      }

      printGoal(await checkProvider(args[2] || providerStatus().id));
      return;
    }

    if (subcommand === 'ask') {
      const prompt = args.slice(2).join(' ').trim();
      if (!prompt) throw new Error('Usage: brain ask "<prompt>"');
      console.log(await askBrain(prompt));
      return;
    }

    throw new Error(`Unknown brain command: ${subcommand}`);
  }

  if (command === 'ollama') {
    const subcommand = args[1] || 'models';
    if (subcommand === 'models') {
      const result = await listOllamaModels();
      if (!result.ok) {
        console.log(result.message);
        if (result.detail) console.log(result.detail);
        return;
      }

      if (result.models.length === 0) {
        console.log('Ollama is running, but no models are installed.');
        console.log('Try: ollama pull llama3.1');
        return;
      }

      console.log('Ollama models:');
      for (const model of result.models) console.log(`- ${model}`);
      return;
    }

    throw new Error(`Unknown ollama command: ${subcommand}`);
  }

  if (command === 'run') {
    const shellCommand = args.slice(1).join(' ').trim();
    if (!shellCommand) throw new Error('Usage: run "<powershell command>"');
    const result = await runReviewedCommand(shellCommand, flags);
    flags.json ? printJson(result) : printToolResult(result);
    return;
  }

  if (command === 'scan') {
    const result = scanProject(args[1] || '.');
    flags.json ? printJson(result) : printScan(result);
    return;
  }

  if (command === 'search') {
    const query = args[1];
    if (!query) throw new Error('Usage: search <query> [path]');
    const result = searchFiles(query, args[2] || '.');
    flags.json ? printJson(result) : printSearch(result);
    return;
  }

  if (command === 'read') {
    const targetPath = args[1];
    if (!targetPath) throw new Error('Usage: read <path>');
    const result = readTextFile(targetPath);
    console.log(result.content);
    return;
  }

  if (command === 'mkdir') {
    const targetPath = args[1];
    if (!targetPath) throw new Error('Usage: mkdir <path>');
    const result = await makeDir(targetPath, flags);
    flags.json ? printJson(result) : printToolResult(result);
    return;
  }

  if (command === 'zip') {
    const sourcePath = args[1];
    const outPath = args[2];
    if (!sourcePath || !outPath) throw new Error('Usage: zip <sourcePath> <zipPath>');
    const result = await zipPath(sourcePath, outPath, flags);
    flags.json ? printJson(result) : printToolResult(result);
    return;
  }

  if (command === 'build') {
    const type = args[1];
    const targetPath = args[2];
    if (!type || !targetPath) throw new Error('Usage: build <node-cli|discord-bot> <targetPath> [--force]');
    const result = await buildTemplate({ type, targetPath, flags });
    flags.json ? printJson(result) : printToolResult(result);
    return;
  }

  if (command === 'memory') {
    const subcommand = args[1] || 'show';
    if (subcommand === 'show') {
      printGoal(loadMemory());
      return;
    }

    if (subcommand === 'set') {
      const key = args[2];
      const value = args.slice(3).join(' ').trim();
      if (!key || !value) {
        throw new Error('Usage: memory set <name|style|note|key> <value>');
      }

      printGoal(setMemoryValue(key, value));
      return;
    }

    throw new Error(`Unknown memory command: ${subcommand}`);
  }

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error(`Kairos error: ${error.message}`);
  process.exitCode = 1;
});
