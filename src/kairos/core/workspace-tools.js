const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { kairosDataDir, ROOT_DIR } = require('./storage');
const { requireApproval, reviewAction, reviewCommand } = require('./safety');
const { logToolEvent } = require('./tool-log');

function safeResolve(targetPath) {
  const resolved = path.resolve(ROOT_DIR, targetPath);
  const roots = [path.resolve(ROOT_DIR), path.resolve(kairosDataDir())];
  if (!roots.some((root) => resolved === root || resolved.startsWith(`${root}${path.sep}`))) {
    throw new Error(`Path outside approved roots: ${targetPath}`);
  }
  return resolved;
}

function relativeToRoot(filePath) {
  return path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
}

function shouldSkipDir(name) {
  return ['.git', 'node_modules', 'data', 'kk', 'Downloads'].includes(name);
}

function shouldSkipFile(name) {
  return name === '.env'
    || name.endsWith('.log')
    || name.endsWith('.pid')
    || name.endsWith('.zip');
}

function walkFiles(dirPath, options = {}) {
  const maxFiles = options.maxFiles || 500;
  const results = [];
  const stack = [dirPath];

  while (stack.length > 0 && results.length < maxFiles) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (!shouldSkipDir(entry.name)) stack.push(fullPath);
      } else if (entry.isFile() && !shouldSkipFile(entry.name)) {
        results.push(fullPath);
        if (results.length >= maxFiles) break;
      }
    }
  }

  return results;
}

function scanProject(targetPath = '.') {
  const root = safeResolve(targetPath);
  if (!fs.existsSync(root)) {
    throw new Error(`Project path not found: ${targetPath}`);
  }
  const files = walkFiles(root, { maxFiles: 1000 });
  const packagePath = path.join(root, 'package.json');
  const packageJson = fs.existsSync(packagePath)
    ? JSON.parse(fs.readFileSync(packagePath, 'utf8'))
    : null;

  const result = {
    root,
    fileCount: files.length,
    scripts: packageJson?.scripts || {},
    dependencies: Object.keys(packageJson?.dependencies || {}),
    devDependencies: Object.keys(packageJson?.devDependencies || {}),
    topFiles: files.slice(0, 50).map(relativeToRoot)
  };
  logToolEvent({ tool: 'project.scan', targetPath, completed: true, fileCount: result.fileCount });
  return result;
}

function searchFiles(query, targetPath = '.') {
  if (!query || query.length < 2) {
    throw new Error('Search query must be at least 2 characters.');
  }

  const root = safeResolve(targetPath);
  if (!fs.existsSync(root)) {
    throw new Error(`Search path not found: ${targetPath}`);
  }
  const files = walkFiles(root, { maxFiles: 1500 });
  const lowerQuery = query.toLowerCase();
  const matches = [];

  for (const filePath of files) {
    const relative = relativeToRoot(filePath);
    if (relative.toLowerCase().includes(lowerQuery)) {
      matches.push({ file: relative, match: 'path' });
      continue;
    }

    const stat = fs.statSync(filePath);
    if (stat.size > 250_000) continue;

    let text = '';
    try {
      text = fs.readFileSync(filePath, 'utf8');
    } catch {
      continue;
    }

    const lineIndex = text.toLowerCase().split(/\r?\n/).findIndex((line) => line.includes(lowerQuery));
    if (lineIndex !== -1) {
      matches.push({ file: relative, line: lineIndex + 1, match: 'content' });
    }

    if (matches.length >= 50) break;
  }

  logToolEvent({ tool: 'files.search', query, targetPath, completed: true, matches: matches.length });
  return matches;
}

function readTextFile(targetPath, options = {}) {
  const resolved = safeResolve(targetPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`File not found: ${targetPath}`);
  }
  const stat = fs.statSync(resolved);
  const maxBytes = options.maxBytes || 80_000;
  if (stat.size > maxBytes) {
    throw new Error(`File is too large to read safely (${stat.size} bytes). Max: ${maxBytes}`);
  }

  const result = {
    path: resolved,
    relativePath: relativeToRoot(resolved),
    content: fs.readFileSync(resolved, 'utf8')
  };
  logToolEvent({ tool: 'files.read', targetPath, completed: true, bytes: result.content.length });
  return result;
}

async function makeDir(targetPath, flags = {}) {
  const resolved = safeResolve(targetPath);
  const review = reviewAction({ kind: 'mkdir', targetPath: resolved });
  if (!await requireApproval(review, flags)) {
    return { completed: false, message: 'Folder creation cancelled.' };
  }

  fs.mkdirSync(resolved, { recursive: true });
  const result = { completed: true, path: resolved, review };
  logToolEvent({ tool: 'files.mkdir', targetPath, completed: true, risk: review.level });
  return result;
}

async function zipPath(sourcePath, outPath, flags = {}) {
  const source = safeResolve(sourcePath);
  const output = safeResolve(outPath);
  const overwrite = fs.existsSync(output);
  const review = reviewAction({ kind: 'zip', source, output, overwrite });
  if (!await requireApproval(review, flags)) {
    return { completed: false, message: 'Zip cancelled.' };
  }

  fs.mkdirSync(path.dirname(output), { recursive: true });
  if (overwrite) fs.rmSync(output, { force: true });

  const command = [
    '$ErrorActionPreference = "Stop"',
    `Compress-Archive -LiteralPath ${JSON.stringify(source)} -DestinationPath ${JSON.stringify(output)} -Force`
  ].join('; ');
  const result = spawnSync('powershell.exe', ['-NoProfile', '-Command', command], {
    encoding: 'utf8',
    cwd: ROOT_DIR
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || 'Compress-Archive failed.');
  }

  const zipResult = { completed: true, source, output, review };
  logToolEvent({ tool: 'package.zip', sourcePath, outPath, completed: true, risk: review.level });
  return zipResult;
}

async function runReviewedCommand(command, flags = {}) {
  const review = reviewCommand(command);
  if (!await requireApproval(review, flags)) {
    const cancelled = { completed: false, message: 'Command cancelled.', review };
    logToolEvent({ tool: 'shell.run', command, completed: false, risk: review.level, cancelled: true });
    return cancelled;
  }

  const result = spawnSync('powershell.exe', ['-NoProfile', '-Command', command], {
    encoding: 'utf8',
    cwd: ROOT_DIR,
    timeout: 120000
  });

  const commandResult = {
    completed: result.status === 0,
    status: result.status,
    stdout: result.stdout,
    stderr: result.stderr,
    review
  };
  logToolEvent({ tool: 'shell.run', command, completed: commandResult.completed, status: commandResult.status, risk: review.level });
  return commandResult;
}

module.exports = {
  makeDir,
  readTextFile,
  runReviewedCommand,
  safeResolve,
  scanProject,
  searchFiles,
  zipPath
};
