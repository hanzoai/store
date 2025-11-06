#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_BASE = 'https://store-api.shinkai.com/store/products';
const APPS_DIR = path.join(__dirname, '..', 'data', 'apps');
const LIMIT = 50; // Fetch more per page for efficiency

// Ensure apps directory exists
if (!fs.existsSync(APPS_DIR)) {
  fs.mkdirSync(APPS_DIR, { recursive: true });
}

function fetchPage(page) {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}?page=${page}&limit=${LIMIT}&sort=downloads&type=all`;
    console.log(`Fetching page ${page}...`);

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

function convertToHanzoFormat(product) {
  // Create kebab-case ID from name
  const id = product.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Map product type and category
  const category = product.category?.name || 'Utilities';

  // Create install command based on runner type
  let installCommand = '';
  if (product.runner === 'deno' && product.routerKey) {
    installCommand = `deno run -A ${product.routerKey}`;
  } else if (product.runner === 'python' && product.routerKey) {
    installCommand = `python ${product.routerKey}`;
  } else if (product.runner === 'node' && product.routerKey) {
    installCommand = `node ${product.routerKey}`;
  }

  return {
    id,
    name: product.name,
    description: product.description,
    version: '1.0.0', // Default version
    author: product.author.replace('@', ''),
    repository: product.routerKey?.includes('github') ? product.routerKey : undefined,
    homepage: product.routerKey,
    license: 'MIT', // Assume MIT
    category,
    tags: product.keywords || [],
    icon: product.icon_url,
    screenshots: product.banner_url || [],
    installCommand,
    mcpConfig: product.routerKey ? {
      command: product.runner || 'node',
      args: [product.routerKey],
      env: {}
    } : undefined,
    readme: undefined,
    changelog: undefined,
    rating: undefined,
    downloads: product.downloads || 0,
    createdAt: product.createdAt,
    updatedAt: product.createdAt,
    // Additional Hanzo-specific fields
    type: product.type, // Agent or Tool
    toolLanguage: product.toolLanguage,
    operatingSystem: product.operating_system || [],
    runner: product.runner,
    featured: product.featured || false,
    price: product.price_usd || 0
  };
}

async function importAllApps() {
  try {
    console.log('Starting import from Shinkai store...\n');

    // Fetch first page to get total count
    const firstPage = await fetchPage(1);
    console.log('First page response:', JSON.stringify(firstPage, null, 2).substring(0, 500));

    const totalPages = Math.ceil((firstPage.total || 203) / LIMIT);
    const totalProducts = firstPage.total || 203;

    console.log(`Total products: ${totalProducts}`);
    console.log(`Total pages: ${totalPages}\n`);

    let allProducts = [];

    // Fetch all pages
    for (let page = 1; page <= totalPages; page++) {
      const response = await fetchPage(page);
      allProducts = allProducts.concat(response.products);

      console.log(`✓ Page ${page}/${totalPages} - ${response.products.length} products`);

      // Small delay to be nice to the API
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\nTotal products fetched: ${allProducts.length}`);
    console.log('Converting to Hanzo format...\n');

    // Convert and save each product
    let saved = 0;
    let skipped = 0;

    for (const product of allProducts) {
      try {
        const hanzoApp = convertToHanzoFormat(product);
        const filename = `${hanzoApp.id}.json`;
        const filepath = path.join(APPS_DIR, filename);

        // Save JSON file
        fs.writeFileSync(filepath, JSON.stringify(hanzoApp, null, 2));
        saved++;

        if (saved % 50 === 0) {
          console.log(`Saved ${saved} apps...`);
        }
      } catch (err) {
        console.error(`Failed to convert ${product.name}:`, err.message);
        skipped++;
      }
    }

    console.log(`\n✅ Import complete!`);
    console.log(`   Saved: ${saved} apps`);
    console.log(`   Skipped: ${skipped} apps`);
    console.log(`\nApps saved to: ${APPS_DIR}`);

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

// Run import
importAllApps();
