#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const AGENTS_DIR = 'agents';
const AGENT_MEMORY_DIR = '.AGENT';
const OPENSPEC_DIR = 'openspec';

const AGENTS = {
  // Engineers
  'backend': { name: 'Backend Engineer', file: 'backend.md' },
  'frontend': { name: 'Frontend Engineer', file: 'frontend.md' },
  'mobile': { name: 'Mobile Engineer', file: 'mobile.md' },
  'devops': { name: 'DevOps Engineer', file: 'devops.md' },
  // Reviewers
  'backend-reviewer': { name: 'Backend Reviewer', file: 'backend-reviewer.md' },
  'frontend-reviewer': { name: 'Frontend Reviewer', file: 'frontend-reviewer.md' },
  'mobile-reviewer': { name: 'Mobile Reviewer', file: 'mobile-reviewer.md' },
  'devops-reviewer': { name: 'DevOps Reviewer', file: 'devops-reviewer.md' },
  // Specialists
  'consultant': { name: 'Tech Consultant', file: 'consultant.md' },
};

// Aliases for convenience
const ALIASES = {
  'be': 'backend',
  'fe': 'frontend',
  'mob': 'mobile',
  'ops': 'devops',
  'be-review': 'backend-reviewer',
  'fe-review': 'frontend-reviewer',
  'mob-review': 'mobile-reviewer',
  'ops-review': 'devops-reviewer',
  'consult': 'consultant',
};

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const files = fs.readdirSync(src);
    for (const file of files) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function resolveAgent(name) {
  const key = name.toLowerCase();
  if (AGENTS[key]) return { key, ...AGENTS[key] };
  if (ALIASES[key]) return { key: ALIASES[key], ...AGENTS[ALIASES[key]] };
  return null;
}

function generateLeanClaudeMd(agent, agentPath) {
  const cwd = process.cwd();
  const projectName = path.basename(cwd);
  const hasMemory = fs.existsSync(path.join(cwd, AGENT_MEMORY_DIR));
  const hasOpenSpec = fs.existsSync(path.join(cwd, OPENSPEC_DIR));

  return `# CLAUDE.md

## Context
${projectName} — Active agent: ${agent.name}.
Full agent rules: agents/${agent.file}
Knowledge base: agents/knowledge/

## Agent
Read and follow agents/${agent.file} for all guidelines, patterns, and behavior rules.
Reference agents/knowledge/ for design patterns, testing, and engineering principles.

## Standards
- Follow conventions in agents/${agent.file}
- PR size < 400 lines
- Code coverage >= 80% (new code)
- Conventional comments: blocker: | issue: | suggestion: | nit:
${hasOpenSpec ? '- Use OpenSpec for spec-driven development (/opsx:propose, /opsx:apply)' : ''}
${hasMemory ? `
## Memory
Read .AGENT/ for persistent context:
- .AGENT/semantic_memory/project/ for architecture and conventions
- .AGENT/semantic_memory/entities/ for team and services
- .AGENT/procedural_memory/skills/ for reusable workflows` : ''}

## Out of Scope
- Don't modify CI/CD pipelines without asking
- Don't commit directly to main
- Don't make product decisions — focus on code

## Learnings
<!-- Add learnings from PRs and code reviews here -->
<!-- Format: - [YYYY-MM-DD] Learning description -->
`;
}

function switchAgent(agentKey) {
  const agent = resolveAgent(agentKey);

  if (!agent) {
    console.log('\n  Unknown agent: ' + agentKey);
    console.log('\n  Available agents:');
    console.log('  ─────────────────');
    console.log('  Engineers:  backend, frontend, mobile, devops');
    console.log('  Reviewers:  backend-reviewer, frontend-reviewer, mobile-reviewer, devops-reviewer');
    console.log('  Specialist: consultant');
    console.log('\n  Aliases:    be, fe, mob, ops, be-review, fe-review, mob-review, ops-review, consult\n');
    process.exit(1);
  }

  const cwd = process.cwd();
  const agentsDir = path.join(cwd, AGENTS_DIR);
  const agentPath = path.join(agentsDir, agent.file);

  if (!fs.existsSync(agentPath)) {
    console.log('\n  Agent file not found: ' + agentPath);
    console.log('  Run "npx eng-delivery-playbook" first to install agents.\n');
    process.exit(1);
  }

  // Generate lean CLAUDE.md (~30 lines, ~600 tokens) instead of dumping full agent (~500 lines)
  const leanContent = generateLeanClaudeMd(agent, agentPath);
  fs.writeFileSync(path.join(cwd, 'CLAUDE.md'), leanContent);

  // .cursorrules gets the full agent content (Cursor uses it differently)
  const agentContent = fs.readFileSync(agentPath, 'utf-8');
  fs.writeFileSync(path.join(cwd, '.cursorrules'), agentContent);

  console.log('\n  Switched to: ' + agent.name);
  console.log('  ✓ Updated CLAUDE.md (lean ~600 tokens)');
  console.log('  ✓ Updated .cursorrules (full agent)');
  console.log('  Tip: Claude reads agents/' + agent.file + ' on demand\n');
}

function listAgents() {
  console.log('\n  Available agents:');
  console.log('  ─────────────────\n');
  console.log('  Engineers:');
  console.log('    backend          Backend Engineer (be)');
  console.log('    frontend         Frontend Engineer (fe)');
  console.log('    mobile           Mobile Engineer (mob)');
  console.log('    devops           DevOps Engineer (ops)');
  console.log('\n  Reviewers:');
  console.log('    backend-reviewer   Backend Reviewer (be-review)');
  console.log('    frontend-reviewer  Frontend Reviewer (fe-review)');
  console.log('    mobile-reviewer    Mobile Reviewer (mob-review)');
  console.log('    devops-reviewer    DevOps Reviewer (ops-review)');
  console.log('\n  Specialists:');
  console.log('    consultant       Tech Consultant (consult)');
  console.log('\n  Usage: eng-play switch <agent>\n');
}

async function selectAgent() {
  const agentList = Object.entries(AGENTS);

  console.log('  Select your primary agent:\n');

  agentList.forEach(([key, agent], index) => {
    console.log(`  ${index + 1}. ${agent.name}`);
  });
  console.log(`  0. Skip (configure later)\n`);

  const answer = await prompt('  Enter number: ');
  const choice = parseInt(answer, 10);

  if (choice === 0 || isNaN(choice)) {
    return null;
  }

  if (choice >= 1 && choice <= agentList.length) {
    const [key, agent] = agentList[choice - 1];
    return { key, ...agent };
  }

  return null;
}

function configureAgent(agent, agentsDir) {
  const agentPath = path.join(agentsDir, agent.file);
  const agentContent = fs.readFileSync(agentPath, 'utf-8');
  const cwd = process.cwd();

  // Lean CLAUDE.md for Claude Code (~600 tokens)
  const leanContent = generateLeanClaudeMd(agent, agentPath);
  fs.writeFileSync(path.join(cwd, 'CLAUDE.md'), leanContent);
  console.log(`  ✓ Created CLAUDE.md (lean ~600 tokens)`);

  // Full content for Cursor
  fs.writeFileSync(path.join(cwd, '.cursorrules'), agentContent);
  console.log(`  ✓ Created .cursorrules (full agent)`);
}

function installMemory() {
  const packageRoot = path.resolve(__dirname, '..');
  const sourceDir = path.join(packageRoot, AGENT_MEMORY_DIR);
  const targetDir = path.join(process.cwd(), AGENT_MEMORY_DIR);

  if (!fs.existsSync(sourceDir)) {
    console.log('  Warning: .AGENT/ directory not found in package. Skipping memory setup.');
    return false;
  }

  if (fs.existsSync(targetDir)) {
    console.log('  .AGENT/ directory already exists. Skipping (use "eng-play memory init --force" to reset).');
    return true;
  }

  copyRecursive(sourceDir, targetDir);
  console.log('  ✓ Installed .AGENT/ memory architecture\n');
  return true;
}

function memoryInit(force) {
  const cwd = process.cwd();
  const targetDir = path.join(cwd, AGENT_MEMORY_DIR);

  if (fs.existsSync(targetDir) && !force) {
    console.log('\n  .AGENT/ directory already exists.');
    console.log('  Use "eng-play memory init --force" to reset.\n');
    return;
  }

  if (fs.existsSync(targetDir) && force) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  const packageRoot = path.resolve(__dirname, '..');
  const sourceDir = path.join(packageRoot, AGENT_MEMORY_DIR);

  if (fs.existsSync(sourceDir)) {
    copyRecursive(sourceDir, targetDir);
  } else {
    // Create minimal structure if package source not available
    const dirs = [
      'working_memory',
      'procedural_memory/skills',
      'semantic_memory/project',
      'semantic_memory/entities',
      'episodic_memory/conversations',
      'episodic_memory/decisions',
      'meta_memory'
    ];
    dirs.forEach(dir => {
      fs.mkdirSync(path.join(targetDir, dir), { recursive: true });
    });
  }

  console.log('\n  ✓ Initialized .AGENT/ memory architecture\n');
  console.log('  Structure:');
  console.log('  ──────────');
  console.log('  .AGENT/');
  console.log('  ├── working_memory/     Active session context');
  console.log('  ├── procedural_memory/  How-to knowledge & skills');
  console.log('  ├── semantic_memory/    Project & entity knowledge');
  console.log('  ├── episodic_memory/    Conversations & decisions');
  console.log('  └── meta_memory/        Memory management\n');
}

function memoryStatus() {
  const cwd = process.cwd();
  const agentDir = path.join(cwd, AGENT_MEMORY_DIR);

  if (!fs.existsSync(agentDir)) {
    console.log('\n  No .AGENT/ directory found.');
    console.log('  Run "eng-play memory init" to initialize.\n');
    return;
  }

  const categories = [
    { name: 'working_memory', label: 'Working Memory', question: 'What am I doing now?' },
    { name: 'procedural_memory', label: 'Procedural Memory', question: 'How do I do this?' },
    { name: 'semantic_memory', label: 'Semantic Memory', question: 'What do I know?' },
    { name: 'episodic_memory', label: 'Episodic Memory', question: 'What happened before?' },
    { name: 'meta_memory', label: 'Meta Memory', question: 'How can I improve?' },
  ];

  console.log('\n  .AGENT/ Memory Status\n');

  categories.forEach(cat => {
    const catDir = path.join(agentDir, cat.name);
    const exists = fs.existsSync(catDir);
    const icon = exists ? '✓' : '✗';
    let count = 0;
    if (exists) {
      count = countFiles(catDir);
    }
    console.log(`  ${icon} ${cat.label.padEnd(22)} ${cat.question.padEnd(28)} (${count} files)`);
  });
  console.log('');
}

function countFiles(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name));
    } else if (entry.name !== '.gitkeep') {
      count++;
    }
  }
  return count;
}

function handleMemory(args) {
  const subCommand = args[0];

  if (!subCommand || subCommand === 'help' || subCommand === '--help') {
    console.log('\n  EDP Memory Commands\n');
    console.log('  Usage:');
    console.log('  ──────');
    console.log('  eng-play memory init            Initialize .AGENT/ memory architecture');
    console.log('  eng-play memory init --force    Reset .AGENT/ to defaults');
    console.log('  eng-play memory status          Show memory status');
    console.log('  eng-play memory help            Show this help\n');
  } else if (subCommand === 'init') {
    const force = args.includes('--force');
    memoryInit(force);
  } else if (subCommand === 'status') {
    memoryStatus();
  } else {
    console.log('\n  Unknown memory command: ' + subCommand);
    handleMemory(['help']);
  }
}

async function install() {
  console.log('\n  Engineering Delivery Playbook\n');
  console.log('  Installing agents, knowledge bases & memory architecture...\n');

  const packageRoot = path.resolve(__dirname, '..');
  const sourceDir = path.join(packageRoot, AGENTS_DIR);
  const targetDir = path.join(process.cwd(), AGENTS_DIR);

  if (!fs.existsSync(sourceDir)) {
    console.error('  Error: agents directory not found in package.');
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
    console.log('  Warning: agents/ directory already exists.');
    console.log('  Updating with latest version...\n');
  }

  try {
    copyRecursive(sourceDir, targetDir);
    console.log('  ✓ Installed agents to ./agents/');

    // Install .AGENT/ memory architecture
    installMemory();

    const selectedAgent = await selectAgent();

    if (selectedAgent) {
      console.log(`\n  Configuring ${selectedAgent.name}...\n`);
      configureAgent(selectedAgent, targetDir);
    }

    console.log('\n  Done!\n');
    console.log('  Quick start:');
    console.log('  ────────────');
    console.log('  eng-play switch backend      # Switch to Backend Engineer');
    console.log('  eng-play switch be-review    # Switch to Backend Reviewer');
    console.log('  eng-play list                # Show all agents');
    console.log('  eng-play memory status       # Check memory architecture\n');
    console.log('  Docs: https://github.com/space-metrics-ai/engineering-delivery-playbook\n');
  } catch (error) {
    console.error('  Error:', error.message);
    process.exit(1);
  }
}

function showOpenspecHelp() {
  console.log('\n  OpenSpec Commands\n');
  console.log('  Usage:');
  console.log('  ──────');
  console.log('  eng-play openspec start "<feature>"         Start full workflow (auto-detect agent)');
  console.log('  eng-play openspec start "<feature>" <agent> Start with specific agent');
  console.log('  eng-play openspec init                      Initialize openspec directory');
  console.log('  eng-play openspec status                    Show current workflow status');
  console.log('  eng-play openspec help                      Show this help\n');
  console.log('  Agent shortcuts (optional):');
  console.log('  ───────────────────────────');
  console.log('  be       Backend Engineer');
  console.log('  fe       Frontend Engineer');
  console.log('  mob      Mobile Engineer');
  console.log('  ops      DevOps Engineer\n');
  console.log('  Examples:');
  console.log('  ─────────');
  console.log('  eng-play openspec start "user authentication with OAuth"');
  console.log('  eng-play openspec start "responsive dashboard" fe');
  console.log('  eng-play openspec init\n');
}

function openspecInit() {
  const cwd = process.cwd();
  const openspecDir = path.join(cwd, OPENSPEC_DIR);

  if (fs.existsSync(openspecDir)) {
    console.log('\n  openspec/ directory already exists.\n');
    return;
  }

  // Create directory structure
  const dirs = ['specs', 'changes'];
  fs.mkdirSync(openspecDir, { recursive: true });
  dirs.forEach(dir => {
    fs.mkdirSync(path.join(openspecDir, dir), { recursive: true });
  });

  console.log('\n  Created openspec/ directory structure:');
  console.log('  ├── specs/      Living specifications');
  console.log('  └── changes/    Change proposals\n');
  console.log('  Next: Use /opsx:propose "<feature>" or eng-play openspec start "<feature>" <agent>\n');
  console.log('  Tip: Install OpenSpec globally for full power:');
  console.log('  npm install -g @fission-ai/openspec@latest\n');
}

function openspecStatus() {
  const cwd = process.cwd();
  const openspecDir = path.join(cwd, OPENSPEC_DIR);

  if (!fs.existsSync(openspecDir)) {
    console.log('\n  No openspec/ directory found.');
    console.log('  Run "eng-play openspec init" or "openspec init" to initialize.\n');
    return;
  }

  const specsDir = path.join(openspecDir, 'specs');
  const changesDir = path.join(openspecDir, 'changes');
  const specs = fs.existsSync(specsDir) ? fs.readdirSync(specsDir).filter(f => !f.startsWith('.')) : [];
  const changes = fs.existsSync(changesDir) ? fs.readdirSync(changesDir).filter(f => !f.startsWith('.')) : [];

  console.log('\n  OpenSpec Status\n');
  console.log('  openspec/ directory: ✓ exists');
  console.log(`  Specs: ${specs.length}`);
  if (specs.length > 0) {
    specs.forEach(spec => console.log(`    - ${spec}`));
  }
  console.log(`  Changes: ${changes.length}`);
  if (changes.length > 0) {
    changes.forEach(change => console.log(`    - ${change}`));
  }
  console.log('');
}

function detectAgent() {
  const cwd = process.cwd();
  const indicators = {
    backend: [
      'pom.xml', 'build.gradle', 'go.mod', 'Gemfile', 'requirements.txt',
      'Pipfile', 'setup.py', 'pyproject.toml', 'Cargo.toml',
    ],
    frontend: [
      'next.config.js', 'next.config.ts', 'nuxt.config.ts', 'vite.config.ts',
      'vue.config.js', 'angular.json', 'svelte.config.js',
    ],
    mobile: [
      'pubspec.yaml', 'Podfile', 'build.gradle.kts',
      'AndroidManifest.xml', 'Info.plist',
    ],
    devops: [
      'Dockerfile', 'docker-compose.yml', 'terraform.tf', 'main.tf',
      'Jenkinsfile', 'ansible.cfg', '.github/workflows',
    ],
  };

  const scores = { backend: 0, frontend: 0, mobile: 0, devops: 0 };

  // Check package.json for frontend clues
  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
      const feFrameworks = ['react', 'vue', 'next', 'nuxt', 'angular', 'svelte', '@angular/core'];
      const beFrameworks = ['express', 'fastify', 'koa', 'nestjs', '@nestjs/core', 'hapi'];
      if (deps.some(d => feFrameworks.includes(d))) scores.frontend += 3;
      if (deps.some(d => beFrameworks.includes(d))) scores.backend += 3;
    } catch (e) { /* ignore */ }
  }

  // Check file indicators
  for (const [agent, files] of Object.entries(indicators)) {
    for (const file of files) {
      if (fs.existsSync(path.join(cwd, file))) {
        scores[agent] += 2;
      }
    }
  }

  // Check src/ directory patterns
  const srcPatterns = {
    frontend: ['src/components', 'src/pages', 'src/app', 'app/page.tsx', 'app/layout.tsx'],
    backend: ['src/main', 'src/controllers', 'src/routes', 'src/services', 'cmd/', 'internal/'],
    mobile: ['lib/', 'ios/', 'android/'],
  };

  for (const [agent, dirs] of Object.entries(srcPatterns)) {
    for (const dir of dirs) {
      if (fs.existsSync(path.join(cwd, dir))) {
        scores[agent] += 1;
      }
    }
  }

  // Return the agent with highest score, default to backend
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return best[1] > 0 ? best[0] : 'backend';
}

function getEnvironmentContext() {
  const cwd = process.cwd();
  const context = {
    project: path.basename(cwd),
    hasGit: fs.existsSync(path.join(cwd, '.git')),
    hasTests: false,
    hasCI: false,
    hasOpenSpec: fs.existsSync(path.join(cwd, OPENSPEC_DIR)),
    hasMemory: fs.existsSync(path.join(cwd, AGENT_MEMORY_DIR)),
  };

  // Detect test setup
  const testDirs = ['test', 'tests', '__tests__', 'spec', 'src/test'];
  context.hasTests = testDirs.some(d => fs.existsSync(path.join(cwd, d)));

  // Detect CI
  const ciPaths = ['.github/workflows', '.gitlab-ci.yml', 'Jenkinsfile', '.circleci'];
  context.hasCI = ciPaths.some(d => fs.existsSync(path.join(cwd, d)));

  return context;
}

function openspecStart(feature, agentKey) {
  if (!feature) {
    console.log('\n  Error: Missing feature description.');
    console.log('  Usage: eng-play openspec start "<feature>" [agent]\n');
    process.exit(1);
  }

  // Auto-detect or resolve agent
  let detectedAgent = null;
  if (agentKey) {
    detectedAgent = resolveAgent(agentKey);
    if (!detectedAgent) {
      console.log('\n  Unknown agent: ' + agentKey);
      console.log('  Available: be (backend), fe (frontend), mob (mobile), ops (devops)\n');
      process.exit(1);
    }
  } else {
    const detected = detectAgent();
    detectedAgent = { key: detected, ...AGENTS[detected] };
    console.log('\n  Auto-detected agent: ' + detectedAgent.name);
  }

  const cwd = process.cwd();
  const agentsDir = path.join(cwd, AGENTS_DIR);
  const agentPath = path.join(agentsDir, detectedAgent.file);

  if (!fs.existsSync(agentPath)) {
    console.log('\n  Agent file not found. Run "npx eng-delivery-playbook" first.\n');
    process.exit(1);
  }

  // Initialize openspec if needed
  const openspecDir = path.join(cwd, OPENSPEC_DIR);
  if (!fs.existsSync(openspecDir)) {
    openspecInit();
  }

  // Switch agent — lean CLAUDE.md, full .cursorrules
  const leanContent = generateLeanClaudeMd(detectedAgent, agentPath);
  fs.writeFileSync(path.join(cwd, 'CLAUDE.md'), leanContent);
  const agentContent = fs.readFileSync(agentPath, 'utf-8');
  fs.writeFileSync(path.join(cwd, '.cursorrules'), agentContent);

  // Gather environment context
  const env = getEnvironmentContext();

  // Create structured prompt
  const promptContent = `# OpenSpec Auto-Flow

## Environment
- **Project**: ${env.project}
- **Agent**: ${detectedAgent.name}
- **Git**: ${env.hasGit ? 'yes' : 'no'}
- **Tests**: ${env.hasTests ? 'yes' : 'setup needed'}
- **CI/CD**: ${env.hasCI ? 'yes' : 'not detected'}
- **Memory**: ${env.hasMemory ? '.AGENT/ active' : 'not initialized'}

## Goal
${feature}

## State
- Agent: ${detectedAgent.name} (switched)
- OpenSpec: ${env.hasOpenSpec ? 'initialized' : 'ready'}
- CLAUDE.md: updated
- .cursorrules: updated

## Actions
Execute the full workflow automatically — NO confirmations, NO pauses:

1. **/opsx:propose** — Generate proposal, specs, design, and tasks for the goal above
2. **/opsx:apply** — Implement all tasks from the proposal
3. ${env.hasTests ? '**/opsx:verify** — Validate implementation against specs' : '**Write tests** — Create test coverage for the implementation'}

## Rules
- Execute ALL actions sequentially without stopping
- Make reasonable decisions instead of asking
- Show progress: [1/3], [2/3], [3/3]
- ONLY stop on fatal errors
- When in doubt: KEEP GOING
`;

  const promptPath = path.join(openspecDir, 'prompt.md');
  fs.writeFileSync(promptPath, promptContent);

  console.log('  Feature: ' + feature);
  console.log('\n  Environment:');
  console.log('  ────────────');
  console.log('  Project:  ' + env.project);
  console.log('  Agent:    ' + detectedAgent.name + (agentKey ? '' : ' (auto-detected)'));
  console.log('  Git:      ' + (env.hasGit ? '✓' : '✗'));
  console.log('  Tests:    ' + (env.hasTests ? '✓' : '✗ setup needed'));
  console.log('  CI/CD:    ' + (env.hasCI ? '✓' : '✗'));
  console.log('  Memory:   ' + (env.hasMemory ? '✓' : '✗'));
  console.log('\n  ✓ Created openspec/prompt.md');
  console.log('  ✓ Switched CLAUDE.md & .cursorrules\n');
  console.log('  Now tell your AI agent:');
  console.log('  ───────────────────────');
  console.log('  "Read openspec/prompt.md and execute the full workflow"\n');
}

function handleOpenspec(args) {
  const subCommand = args[0];

  if (!subCommand || subCommand === 'help' || subCommand === '--help') {
    showOpenspecHelp();
  } else if (subCommand === 'init') {
    openspecInit();
  } else if (subCommand === 'status') {
    openspecStatus();
  } else if (subCommand === 'start') {
    // Collect all remaining args — feature might be unquoted words, last arg might be agent
    const remaining = args.slice(1);
    if (remaining.length === 0) {
      openspecStart(null, null);
    } else {
      // Check if last arg is an agent alias
      const lastArg = remaining[remaining.length - 1];
      const possibleAgent = resolveAgent(lastArg);
      if (possibleAgent && remaining.length > 1) {
        const feature = remaining.slice(0, -1).join(' ');
        openspecStart(feature, lastArg);
      } else {
        const feature = remaining.join(' ');
        openspecStart(feature, null);
      }
    }
  } else {
    console.log('\n  Unknown openspec command: ' + subCommand);
    showOpenspecHelp();
  }
}

function showHelp() {
  console.log('\n  Engineering Delivery Playbook\n');
  console.log('  Usage:');
  console.log('  ──────');
  console.log('  eng-play                    Install agents (interactive)');
  console.log('  eng-play install            Install agents (interactive)');
  console.log('  eng-play switch <agent>     Switch to a different agent');
  console.log('  eng-play list               List all available agents');
  console.log('  eng-play openspec <cmd>     OpenSpec workflow commands');
  console.log('  eng-play memory <cmd>       Memory architecture commands');
  console.log('  eng-play help               Show this help\n');
  console.log('  Examples:');
  console.log('  ─────────');
  console.log('  eng-play switch backend');
  console.log('  eng-play switch frontend-reviewer');
  console.log('  eng-play openspec start "feature" be');
  console.log('  eng-play memory init\n');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'install') {
    await install();
  } else if (command === 'switch') {
    const agentKey = args[1];
    if (!agentKey) {
      console.log('\n  Usage: eng-play switch <agent>');
      console.log('  Run "eng-play list" to see available agents.\n');
      process.exit(1);
    }
    switchAgent(agentKey);
  } else if (command === 'openspec') {
    handleOpenspec(args.slice(1));
  } else if (command === 'speckit') {
    // Backward compatibility
    console.log('\n  Note: "speckit" is deprecated. Use "openspec" instead.\n');
    handleOpenspec(args.slice(1));
  } else if (command === 'memory') {
    handleMemory(args.slice(1));
  } else if (command === 'list') {
    listAgents();
  } else if (command === 'help' || command === '--help' || command === '-h') {
    showHelp();
  } else {
    // Assume it's an agent name for quick switch
    const agent = resolveAgent(command);
    if (agent) {
      switchAgent(command);
    } else {
      showHelp();
    }
  }
}

main();
