#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const AGENTS_DIR = 'agents';

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

  const agentContent = fs.readFileSync(agentPath, 'utf-8');

  // Update CLAUDE.md
  fs.writeFileSync(path.join(cwd, 'CLAUDE.md'), agentContent);

  // Update .cursorrules
  fs.writeFileSync(path.join(cwd, '.cursorrules'), agentContent);

  console.log('\n  Switched to: ' + agent.name);
  console.log('  ✓ Updated CLAUDE.md');
  console.log('  ✓ Updated .cursorrules\n');
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
  console.log('\n  Usage: edp switch <agent>\n');
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

  fs.writeFileSync(path.join(cwd, 'CLAUDE.md'), agentContent);
  console.log(`  ✓ Created CLAUDE.md (Claude Code)`);

  fs.writeFileSync(path.join(cwd, '.cursorrules'), agentContent);
  console.log(`  ✓ Created .cursorrules (Cursor)`);
}

async function install() {
  console.log('\n  Engineering Delivery Playbook\n');
  console.log('  Installing agents and knowledge bases...\n');

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
    console.log('  ✓ Installed agents to ./agents/\n');

    const selectedAgent = await selectAgent();

    if (selectedAgent) {
      console.log(`\n  Configuring ${selectedAgent.name}...\n`);
      configureAgent(selectedAgent, targetDir);
    }

    console.log('\n  Done!\n');
    console.log('  Quick start:');
    console.log('  ────────────');
    console.log('  edp switch backend      # Switch to Backend Engineer');
    console.log('  edp switch be-review    # Switch to Backend Reviewer');
    console.log('  edp list                # Show all agents\n');
    console.log('  Docs: https://github.com/space-metrics-ai/engineering-delivery-playbook\n');
  } catch (error) {
    console.error('  Error:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log('\n  Engineering Delivery Playbook\n');
  console.log('  Usage:');
  console.log('  ──────');
  console.log('  edp                    Install agents (interactive)');
  console.log('  edp install            Install agents (interactive)');
  console.log('  edp switch <agent>     Switch to a different agent');
  console.log('  edp list               List all available agents');
  console.log('  edp help               Show this help\n');
  console.log('  Examples:');
  console.log('  ─────────');
  console.log('  edp switch backend');
  console.log('  edp switch frontend-reviewer');
  console.log('  edp switch consultant\n');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'install') {
    await install();
  } else if (command === 'switch') {
    const agentKey = args[1];
    if (!agentKey) {
      console.log('\n  Usage: edp switch <agent>');
      console.log('  Run "edp list" to see available agents.\n');
      process.exit(1);
    }
    switchAgent(agentKey);
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
