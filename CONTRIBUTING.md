# Contributing to Hanzo Store

Thank you for your interest in contributing to Hanzo Store! This document provides guidelines and instructions for adding your MCP server to the store.

## Quick Start

1. Fork the repository
2. Create your app JSON file in `data/apps/your-app.json`
3. Test locally with `npm run generate-store && npm run dev`
4. Submit a Pull Request

## Submission Requirements

### 1. Your MCP Server Must:

- ✅ Implement the Model Context Protocol (MCP) specification
- ✅ Be installable via npm, npx, or other package managers
- ✅ Have a public repository (GitHub recommended)
- ✅ Include documentation
- ✅ Use an open source license
- ✅ Be actively maintained

### 2. Your JSON File Must:

- ✅ Include all required fields (see schema below)
- ✅ Have a unique `id` in kebab-case format
- ✅ Pass JSON validation
- ✅ Be placed in `data/apps/`
- ✅ Be named `{your-app-id}.json`

### 3. Quality Standards:

- ✅ Clear, concise description (1-2 sentences)
- ✅ Appropriate category selection
- ✅ Relevant tags (3-5 recommended)
- ✅ Working install command
- ✅ Valid repository URL
- ✅ Square icon (256x256 PNG recommended)

## JSON Schema

Here's a complete example:

```json
{
  "id": "my-awesome-server",
  "name": "My Awesome Server",
  "description": "A powerful MCP server for doing amazing things with your data",
  "version": "1.0.0",
  "author": "Your Name",
  "repository": "https://github.com/yourusername/my-awesome-server",
  "homepage": "https://docs.yourserver.com",
  "license": "MIT",
  "category": "Development Tools",
  "tags": ["mcp", "data", "tools", "productivity"],
  "icon": "https://raw.githubusercontent.com/yourusername/my-awesome-server/main/icon.png",
  "screenshots": [
    "https://raw.githubusercontent.com/yourusername/my-awesome-server/main/screenshot1.png"
  ],
  "installCommand": "npx -y my-awesome-server",
  "mcpConfig": {
    "command": "npx",
    "args": ["-y", "my-awesome-server"],
    "env": {
      "API_KEY": "${API_KEY}"
    }
  },
  "readme": "# My Awesome Server\n\nFull readme content here...",
  "changelog": "## v1.0.0\n- Initial release",
  "createdAt": "2025-01-05T00:00:00Z",
  "updatedAt": "2025-01-05T00:00:00Z"
}
```

### Field Descriptions

#### Required Fields

- **id**: Unique identifier in kebab-case (e.g., `my-awesome-server`)
- **name**: Human-readable name (e.g., `My Awesome Server`)
- **description**: Brief description, 1-2 sentences max
- **version**: Semantic version following semver (e.g., `1.0.0`)
- **author**: Your name or organization
- **category**: One of the predefined categories (see below)
- **tags**: Array of searchable keywords (3-5 recommended)
- **createdAt**: ISO 8601 timestamp of first version
- **updatedAt**: ISO 8601 timestamp of last update

#### Optional Fields

- **repository**: GitHub or GitLab URL to source code
- **homepage**: Documentation or marketing website
- **license**: SPDX license identifier (e.g., `MIT`, `Apache-2.0`)
- **icon**: Direct URL to icon image (PNG, 256x256 recommended)
- **screenshots**: Array of screenshot URLs
- **installCommand**: Command users can copy/paste to install
- **mcpConfig**: Configuration for MCP server runtime
  - **command**: Executable command
  - **args**: Array of command arguments
  - **env**: Environment variables (use `${VAR}` for user-provided values)
- **readme**: Full README in markdown format
- **changelog**: Version history in markdown format
- **rating**: Average user rating (managed by store admins)
- **downloads**: Download count (managed by store admins)

### Categories

Choose ONE category that best fits your app:

- **Development Tools**: IDEs, debuggers, linters, build tools
- **Productivity**: Task management, notes, calendars
- **Data & Analytics**: Data processing, visualization, analytics
- **Communication**: Chat, email, notifications
- **File Management**: File operations, sync, backup
- **AI & Machine Learning**: ML models, AI assistants
- **Security**: Authentication, encryption, security tools
- **Utilities**: General utilities and helpers
- **Entertainment**: Games, media players
- **Other**: Doesn't fit other categories

### Tags Best Practices

- Use lowercase
- Be specific (e.g., `typescript` not just `code`)
- Include relevant technologies (e.g., `postgres`, `redis`)
- Include use cases (e.g., `data-processing`, `automation`)
- Limit to 3-5 tags for best results

## Testing Your Submission

Before submitting, test your app locally:

```bash
# 1. Clone your fork
git clone https://github.com/yourusername/hanzo-store.git
cd hanzo-store

# 2. Install dependencies
npm install

# 3. Add your app JSON to data/apps/

# 4. Generate store data
npm run generate-store

# 5. Start dev server
npm run dev

# 6. Visit http://localhost:3000 and verify your app appears correctly
```

### Validation Checklist

- [ ] JSON is valid (no syntax errors)
- [ ] All required fields are present
- [ ] ID is unique and kebab-case
- [ ] Version follows semver
- [ ] Install command works
- [ ] Repository URL is accessible
- [ ] Icon loads correctly
- [ ] Category is valid
- [ ] Tags are relevant
- [ ] Description is clear and concise

## Submitting Your PR

1. **Commit your changes:**
   ```bash
   git add data/apps/your-app.json
   git commit -m "Add YourApp to store"
   ```

2. **Push to your fork:**
   ```bash
   git push origin main
   ```

3. **Open a Pull Request:**
   - Go to the main repository
   - Click "New Pull Request"
   - Select your fork
   - Fill out the PR template
   - Submit!

### PR Template

When opening your PR, please include:

```markdown
## Adding [App Name]

### App Details
- **Name**: [App Name]
- **Category**: [Category]
- **Repository**: [GitHub URL]
- **Author**: [Your Name]

### Checklist
- [ ] JSON is valid
- [ ] All required fields present
- [ ] Tested locally
- [ ] Icon loads correctly
- [ ] Install command works
- [ ] Documentation complete

### Description
[Brief description of what your app does and why it's useful]
```

## Review Process

1. **Automated Checks** (< 1 minute)
   - JSON validation
   - Required fields check
   - Duplicate ID check

2. **Manual Review** (1-3 days)
   - Quality assessment
   - Security review
   - Category/tag verification
   - Installation testing

3. **Approval & Merge** (< 1 hour)
   - PR approved by maintainer
   - Merged to main
   - Auto-deployed to production

4. **Live** (< 5 minutes)
   - App appears in store
   - Available for installation

## Updating Your App

To update your app:

1. Edit your JSON file in `data/apps/your-app.json`
2. Update the `version` field
3. Update the `updatedAt` timestamp
4. Add to `changelog` field
5. Submit a new PR

## Removing Your App

To remove your app from the store:

1. Open an issue requesting removal
2. Provide reason for removal
3. Maintainers will review and process

Or submit a PR deleting your JSON file.

## Guidelines & Best Practices

### Icon Guidelines

- Format: PNG with transparency
- Size: 256x256 pixels minimum
- Style: Simple, clear, recognizable
- Background: Transparent or solid color
- File size: < 100KB recommended

### Description Guidelines

- Length: 1-2 sentences (100-200 characters)
- Focus: What it does, not how
- Tone: Clear, professional
- Keywords: Include searchable terms naturally

### Screenshot Guidelines

- Format: PNG or JPEG
- Size: 1920x1080 or 1280x720
- Content: Show key features
- Quality: High resolution, clear text
- Quantity: 1-5 screenshots

## Code of Conduct

Please note we have a Code of Conduct. By participating in this project, you agree to abide by its terms.

### Expected Behavior

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Spam or promotional content
- Malicious or harmful apps
- Plagiarism or copyright violation

## Getting Help

Need help? We're here for you:

- **Discord**: [Join our Discord](https://discord.gg/hanzo)
- **Issues**: [GitHub Issues](https://github.com/hanzo-ai/hanzo-store/issues)
- **Email**: support@hanzo.ai

## Recognition

Contributors who add quality apps will be:

- Listed in our contributors file
- Featured in our newsletter (if interested)
- Given a "Contributor" role in Discord

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Hanzo Store! 🚀
