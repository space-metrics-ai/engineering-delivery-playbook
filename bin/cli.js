#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const AGENTS_DIR = 'agents';

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

function main() {
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

    console.log('  Done! Installed to ./agents/\n');
    console.log('  Structure:');
    console.log('  └── agents/');
    console.log('      ├── backend.md');
    console.log('      ├── frontend.md');
    console.log('      ├── mobile.md');
    console.log('      ├── devops.md');
    console.log('      ├── *-reviewer.md');
    console.log('      ├── consultant.md');
    console.log('      ├── ai-metrics.md');
    console.log('      └── knowledge/ (13 knowledge bases)\n');
    console.log('  Next steps:');
    console.log('  1. Configure your AI tool with an agent');
    console.log('  2. Start building!\n');
    console.log('  Docs: https://github.com/space-metrics-ai/engineering-delivery-playbook\n');
  } catch (error) {
    console.error('  Error copying files:', error.message);
    process.exit(1);
  }
}

main();
