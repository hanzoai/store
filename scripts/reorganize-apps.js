#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const APPS_DIR = path.join(__dirname, '..', 'data', 'apps');
const AGENTS_DIR = path.join(__dirname, '..', 'data', 'agents');
const TOOLS_DIR = path.join(__dirname, '..', 'data', 'tools');

// Create new directories
if (!fs.existsSync(AGENTS_DIR)) {
  fs.mkdirSync(AGENTS_DIR, { recursive: true });
}
if (!fs.existsSync(TOOLS_DIR)) {
  fs.mkdirSync(TOOLS_DIR, { recursive: true });
}

function reorganizeApps() {
  console.log('Reorganizing apps into agents/ and tools/ folders...\n');

  const files = fs.readdirSync(APPS_DIR).filter(f => f.endsWith('.json'));
  let agentCount = 0;
  let toolCount = 0;
  let unknownCount = 0;

  for (const file of files) {
    const oldPath = path.join(APPS_DIR, file);
    const content = fs.readFileSync(oldPath, 'utf-8');
    const app = JSON.parse(content);

    let newPath;
    if (app.type === 'Agent') {
      newPath = path.join(AGENTS_DIR, file);
      agentCount++;
    } else if (app.type === 'Tool') {
      newPath = path.join(TOOLS_DIR, file);
      toolCount++;
    } else {
      // Default to tools if type is missing or unknown
      newPath = path.join(TOOLS_DIR, file);
      unknownCount++;
    }

    fs.renameSync(oldPath, newPath);
  }

  // Remove old apps directory if empty
  const remaining = fs.readdirSync(APPS_DIR);
  if (remaining.length === 0) {
    fs.rmdirSync(APPS_DIR);
    console.log('✓ Removed empty apps/ directory\n');
  }

  console.log('✅ Reorganization complete!');
  console.log(`   Agents: ${agentCount} → data/agents/`);
  console.log(`   Tools: ${toolCount} → data/tools/`);
  if (unknownCount > 0) {
    console.log(`   Unknown type (moved to tools): ${unknownCount}`);
  }
  console.log(`   Total: ${agentCount + toolCount + unknownCount} apps`);
}

reorganizeApps();
