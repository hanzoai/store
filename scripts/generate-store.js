#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '..', 'data', 'agents');
const TOOLS_DIR = path.join(__dirname, '..', 'data', 'tools');
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'store.json');

/**
 * Convert old DID format to new npm-style format
 * local:::__official_shinkai:::audio_insight → @hanzo/audio-insight
 */
function convertToNpmFormat(homepage) {
  if (!homepage || typeof homepage !== 'string') return homepage;

  // Check if it's the old format with :::
  if (homepage.includes(':::')) {
    // Extract the last part after :::
    const parts = homepage.split(':::');
    const name = parts[parts.length - 1];

    // Convert underscores to hyphens
    const normalizedName = name.replace(/_/g, '-');

    // Return npm-style format
    return `@hanzo/${normalizedName}`;
  }

  return homepage;
}

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
    const app = JSON.parse(content);

    // Transform homepage to new format
    app.homepage = convertToNpmFormat(app.homepage);

    // Also transform mcpConfig.args if present
    if (app.mcpConfig && app.mcpConfig.args && Array.isArray(app.mcpConfig.args)) {
      app.mcpConfig.args = app.mcpConfig.args.map(arg => convertToNpmFormat(arg));
    }

    // Add repository and path fields
    app.repository = 'github.com/hanzoai/tools';

    // Determine path based on type
    const subdir = app.type === 'Agent' ? 'agents' : 'tools';
    app.path = `/${subdir}/${app.id}`;

    return app;
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
