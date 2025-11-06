#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const APPS_DIR = path.join(__dirname, '..', 'data', 'apps');
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'store.json');

function generateStore() {
  console.log('Generating store data...');

  // Read all app JSON files
  const files = fs.readdirSync(APPS_DIR).filter(f => f.endsWith('.json'));
  const apps = files.map(file => {
    const content = fs.readFileSync(path.join(APPS_DIR, file), 'utf-8');
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
  console.log(`Store data generated: ${apps.length} apps, ${categories.length} categories`);
  console.log(`Output: ${OUTPUT_FILE}`);
}

generateStore();
