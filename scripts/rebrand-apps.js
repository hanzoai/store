#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const APPS_DIR = path.join(__dirname, '..', 'data', 'apps');

function rebrandApps() {
  console.log('Rebranding apps...\n');

  const files = fs.readdirSync(APPS_DIR).filter(f => f.endsWith('.json'));
  let updated = 0;

  for (const file of files) {
    const filepath = path.join(APPS_DIR, file);
    const content = fs.readFileSync(filepath, 'utf-8');
    const app = JSON.parse(content);
    let changed = false;

    // Replace author names
    if (app.author && (app.author.includes('shinkai') || app.author.includes('Shinkai') || app.author.includes('@@official'))) {
      app.author = 'hanzo.ai';
      changed = true;
    }

    // Update tool logo/banner creator name
    if (app.name && app.name.includes('Shinkai')) {
      app.name = app.name.replace(/Shinkai/gi, 'Hanzo');
      changed = true;
    }

    // Update description
    if (app.description && app.description.includes('Shinkai')) {
      app.description = app.description.replace(/Shinkai/gi, 'Hanzo');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filepath, JSON.stringify(app, null, 2));
      updated++;
    }
  }

  // Rename files with shinkai in the name
  const shinkaiFiles = files.filter(f => f.toLowerCase().includes('shinkai'));
  for (const file of shinkaiFiles) {
    const oldPath = path.join(APPS_DIR, file);
    const newFile = file.replace(/shinkai/gi, 'hanzo');
    const newPath = path.join(APPS_DIR, newFile);

    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${file} → ${newFile}`);
  }

  console.log(`\n✅ Rebranding complete!`);
  console.log(`   Updated: ${updated} apps`);
  console.log(`   Renamed: ${shinkaiFiles.length} files`);
}

rebrandApps();
