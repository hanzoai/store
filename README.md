<p align="center"><img src=".github/hero.svg" alt="store" width="880"></p>

# Hanzo AI Store

The official AI agent tools and MCP server marketplace for Hanzo Desktop.

## Overview

Hanzo AI Store is a simple, flatfile-based marketplace that allows users to discover and install AI agent tools and MCP servers. It's built with Next.js and uses a git-based submission workflow via Pull Requests.

## Features

- 🚀 **Static Site Generation**: Pre-compiled Next.js app for fast performance
- 🔍 **Client-Side Filtering**: All filtering happens in the browser for instant results
- 📦 **Flatfile Database**: Each app is a JSON file in `data/apps/`
- 🔄 **Git-Based Submissions**: Submit new apps via Pull Requests
- 🎨 **Clean UI**: Modern, responsive interface with Tailwind CSS
- 📱 **Desktop & Web**: Works in Hanzo Desktop and as a standalone web app

## Getting Started

### Installation

```bash
npm install
```

### Generate Store Data

```bash
npm run generate-store
```

This reads all JSON files from `data/apps/` and generates `public/store.json`.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory.

## Project Structure

```
hanzo-store/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main store page
│   └── globals.css        # Global styles
├── data/
│   ├── agents/            # AI agents (one JSON per agent)
│   │   └── *.json
│   └── tools/             # Automation tools (one JSON per tool)
│       └── *.json
├── scripts/
│   └── generate-store.js  # Generates public/store.json
├── types/
│   └── index.ts           # TypeScript types
└── public/
    └── store.json         # Generated store data (gitignored)
```

## Adding a New App

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Create an App JSON File

Create a new file in `data/agents/` (for AI agents) or `data/tools/` (for automation tools) with your app's information:

```json
{
  "id": "my-awesome-server",
  "name": "My Awesome Server",
  "description": "A brief description of what your MCP server does",
  "version": "1.0.0",
  "author": "Your Name",
  "repository": "https://github.com/yourusername/my-awesome-server",
  "homepage": "https://your-docs-site.com",
  "license": "MIT",
  "category": "Development Tools",
  "tags": ["mcp", "tools", "productivity"],
  "icon": "https://your-icon-url.com/icon.png",
  "installCommand": "npx -y @yourusername/my-awesome-server",
  "mcpConfig": {
    "command": "npx",
    "args": ["-y", "@yourusername/my-awesome-server"],
    "env": {
      "API_KEY": "your-api-key-env-var"
    }
  },
  "createdAt": "2025-01-05T00:00:00Z",
  "updatedAt": "2025-01-05T00:00:00Z"
}
```

### 3. Submit a Pull Request

1. Commit your changes
2. Push to your fork
3. Open a Pull Request against the main repository
4. Wait for review and approval

### App JSON Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier (kebab-case) |
| `name` | string | ✅ | Display name |
| `description` | string | ✅ | Brief description |
| `version` | string | ✅ | Semantic version (e.g., "1.0.0") |
| `author` | string | ✅ | Author name or organization |
| `category` | string | ✅ | Category (see Categories below) |
| `tags` | string[] | ✅ | Searchable tags |
| `repository` | string | ❌ | GitHub repository URL |
| `homepage` | string | ❌ | Documentation or homepage URL |
| `license` | string | ❌ | License (e.g., "MIT", "Apache-2.0") |
| `icon` | string | ❌ | Icon URL (square, min 128x128) |
| `screenshots` | string[] | ❌ | Screenshot URLs |
| `installCommand` | string | ❌ | Quick install command |
| `mcpConfig` | object | ❌ | MCP server configuration |
| `readme` | string | ❌ | Full README content (markdown) |
| `changelog` | string | ❌ | Changelog (markdown) |
| `rating` | number | ❌ | Average rating (1-5) |
| `downloads` | number | ❌ | Download count |
| `createdAt` | string | ✅ | ISO 8601 date |
| `updatedAt` | string | ✅ | ISO 8601 date |

### Categories

- Development Tools
- Productivity
- Data & Analytics
- Communication
- File Management
- AI & Machine Learning
- Security
- Utilities
- Entertainment
- Other

## API

The store data is available as a static JSON file at `/store.json`.

**Response:**

```json
{
  "apps": [...],
  "categories": [...],
  "version": "1.0.0",
  "lastUpdated": "2025-01-05T12:00:00Z"
}
```

## Integration with Hanzo Desktop

Hanzo Desktop can fetch the store data from:

```
https://store.hanzo.ai/store.json
```

The app can then display the store UI in an embedded webview or implement its own native UI using the JSON data.

## Development

### Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Node.js**: For build scripts

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm start` - Serve production build locally
- `npm run lint` - Run ESLint
- `npm run generate-store` - Generate store.json from flatfiles

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Submission Guidelines

1. ✅ App must be a valid MCP server
2. ✅ JSON must be valid and complete
3. ✅ All required fields must be present
4. ✅ ID must be unique and kebab-case
5. ✅ Icon should be square (recommended 256x256)
6. ✅ Repository should be public
7. ✅ License should be open source

### Review Process

1. Automated checks run on PR
2. Manual review by maintainers
3. Merge and deploy to production
4. App appears in store within 5 minutes

## License

MIT © Hanzo AI

## Support

- **Issues**: [GitHub Issues](https://github.com/hanzo-ai/hanzo-store/issues)
- **Discord**: [Join our Discord](https://discord.gg/hanzo)
- **Email**: support@hanzo.ai
