#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const AGENTS_DIR = 'agents';

const AGENTS = [
  { name: 'Backend Engineer', file: 'backend.md' },
  { name: 'Frontend Engineer', file: 'frontend.md' },
  { name: 'Mobile Engineer', file: 'mobile.md' },
  { name: 'DevOps Engineer', file: 'devops.md' },
  { name: 'Backend Reviewer', file: 'backend-reviewer.md' },
  { name: 'Frontend Reviewer', file: 'frontend-reviewer.md' },
  { name: 'Mobile Reviewer', file: 'mobile-reviewer.md' },
  { name: 'DevOps Reviewer', file: 'devops-reviewer.md' },
  { name: 'Tech Consultant', file: 'consultant.md' },
];

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

async function selectAgent() {
  console.log('  Select your primary agent:\n');

  AGENTS.forEach((agent, index) => {
    console.log(`  ${index + 1}. ${agent.name}`);
  });
  console.log(`  0. Skip (configure later)\n`);

  const answer = await prompt('  Enter number: ');
  const choice = parseInt(answer, 10);

  if (choice === 0 || isNaN(choice)) {
    return null;
  }

  if (choice >= 1 && choice <= AGENTS.length) {
    return AGENTS[choice - 1];
  }

  return null;
}

function configureAgent(agent, agentsDir) {
  const agentPath = path.join(agentsDir, agent.file);
  const agentContent = fs.readFileSync(agentPath, 'utf-8');
  const cwd = process.cwd();

  // Create CLAUDE.md for Claude Code
  fs.writeFileSync(path.join(cwd, 'CLAUDE.md'), agentContent);
  console.log(`  ✓ Created CLAUDE.md (Claude Code)`);

  // Create .cursorrules for Cursor
  fs.writeFileSync(path.join(cwd, '.cursorrules'), agentContent);
  console.log(`  ✓ Created .cursorrules (Cursor)`);
}

async function main() {
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

    // Ask which agent to configure
    const selectedAgent = await selectAgent();

    if (selectedAgent) {
      console.log(`\n  Configuring ${selectedAgent.name}...\n`);
      configureAgent(selectedAgent, targetDir);
    }

    console.log('\n  Done!\n');
    console.log('  Structure:');
    console.log('  └── agents/');
    console.log('      ├── backend.md');
    console.log('      ├── frontend.md');
    console.log('      ├── mobile.md');
    console.log('      ├── devops.md');
    console.log('      ├── *-reviewer.md');
    console.log('      ├── consultant.md');
    console.log('      └── knowledge/ (13 knowledge bases)\n');

    if (selectedAgent) {
      console.log(`  Agent "${selectedAgent.name}" is ready!`);
      console.log('  Open Claude Code or Cursor and start building.\n');
    } else {
      console.log('  To configure an agent later:');
      console.log('  cp agents/backend.md CLAUDE.md\n');
    }

    console.log('  Docs: https://github.com/space-metrics-ai/engineering-delivery-playbook\n');
  } catch (error) {
    console.error('  Error:', error.message);
    process.exit(1);
  }
}

main();
