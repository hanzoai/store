#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '..', 'data', 'agents');
const TOOLS_DIR = path.join(__dirname, '..', 'data', 'tools');
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'store.json');

function generateStore() {
  console.log('Generating store data...\n');

  // Read all app JSON files from both directories
  const agentFiles = fs.existsSync(AGENTS_DIR)
    ? fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.json')).map(f => ({ dir: AGENTS_DIR, file: f }))
    : [];
  const toolFiles = fs.existsSync(TOOLS_DIR)
    ? fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('.json')).map(f => ({ dir: TOOLS_DIR, file: f }))
    : [];

  const allFiles = [...agentFiles, ...toolFiles];

  const apps = allFiles.map(({ dir, file }) => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    return JSON.parse(content);
  });

  // Extract unique categories
  const categories = [...new Set(apps.map(app => app.category))].sort();

  // Create store data
  const storeData = {
    apps,
    categories,
    version: '1.0.0',
    lastUpdated: new Date().toISOString()
  };

  // Ensure public directory exists
  const publicDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write store data
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(storeData, null, 2));

  const agentCount = apps.filter(a => a.type === 'Agent').length;
  const toolCount = apps.filter(a => a.type === 'Tool').length;

  console.log('✅ Store data generated:');
  console.log(`   Agents: ${agentCount}`);
  console.log(`   Tools: ${toolCount}`);
  console.log(`   Total: ${apps.length} apps`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`\nOutput: ${OUTPUT_FILE}`);
}

generateStore();
