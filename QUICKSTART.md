# Quick Start - Enable GitHub Pages

## 🚀 Your Store UI is Ready!

The Next.js store UI is fully built and deployed via GitHub Actions. Just enable GitHub Pages to make it live!

## ✅ What's Already Done

- ✅ Next.js store UI with search & filtering
- ✅ 5 example MCP apps loaded
- ✅ GitHub Actions workflow configured
- ✅ Automatic builds on every push
- ✅ Static site generation (out/ folder)

## 🎯 Enable GitHub Pages (One-Time Setup)

### Option 1: Web Interface (Recommended)

1. **Go to Settings**
   ```
   https://github.com/hanzo-apps/store/settings/pages
   ```

2. **Configure Source**
   - Under "Build and deployment"
   - Source: Select **"GitHub Actions"**
   - Click **"Save"**

3. **Set Permissions** (if deployment fails)
   ```
   https://github.com/hanzo-apps/store/settings/actions
   ```
   - Under "Workflow permissions"
   - Select: **"Read and write permissions"**
   - Check: **"Allow GitHub Actions to create and approve pull requests"**
   - Click **"Save"**

4. **Wait for Deployment**
   - Go to: https://github.com/hanzo-apps/store/actions
   - Watch the "Build and Deploy" workflow
   - When complete, your store is live!

### Option 2: CLI (Alternative)

```bash
# Enable Pages via API (requires repo admin access)
gh api repos/hanzo-apps/store/pages \
  -X POST \
  -f source[branch]=main \
  -f source[path]=/
```

## 🌐 Your Store URL

Once enabled, your store will be available at:

```
https://hanzoai.github.io/store/
```

## 🔗 Custom Domain (Optional)

To use `store.hanzo.ai`:

1. **Add DNS CNAME Record**
   ```
   Type:  CNAME
   Name:  store
   Value: hanzoai.github.io
   ```

2. **Configure in GitHub**
   - Go to: https://github.com/hanzo-apps/store/settings/pages
   - Under "Custom domain", enter: `store.hanzo.ai`
   - Check "Enforce HTTPS"
   - Click "Save"

3. **Wait for DNS Propagation** (5-30 minutes)

## 🧪 Test Your Store Locally

```bash
cd /Users/z/work/hanzo/store

# Development mode
npm run dev
# Visit: http://localhost:3000

# Production build
npm run build
npx serve out
# Visit: http://localhost:3000
```

## 📱 Store UI Features

Your store includes:

- **🔍 Real-time Search** - Instant filtering across names, descriptions, tags
- **📂 Category Filters** - Quick browsing by category with counts
- **📋 Copy Install Commands** - One-click copy for easy installation
- **📱 Responsive Design** - Works perfectly on mobile and desktop
- **⚡ Fast Loading** - Static site, no backend required
- **🔄 Auto-updates** - Rebuilds on every push to main branch

## 📊 Current Store Contents

- **5 Apps**: Example, Filesystem, GitHub, PostgreSQL, Web Search
- **4 Categories**: Development Tools, File Management, Productivity, Data & Analytics
- **JSON API**: `/store.json` for programmatic access

## 🎯 Next Steps

1. ✅ **Enable GitHub Pages** (see above)
2. ✅ **Verify Deployment** - Check Actions tab for success
3. ✅ **Visit Store URL** - Test all features
4. 📦 **Add More Apps** - Submit PRs with new MCP servers
5. 🎨 **Customize** - Update styling, colors, branding

## 📖 Documentation

- **README.md** - Full project documentation
- **CONTRIBUTING.md** - How to add apps
- **DEPLOYMENT.md** - Deployment details
- **LLM.md** - the UI stack, and the two things that bite anyone changing it

## 🆘 Troubleshooting

### Deployment Fails

Check workflow permissions:
```
https://github.com/hanzo-apps/store/settings/actions
```
Enable "Read and write permissions"

### Pages Not Updating

1. Check workflow logs: https://github.com/hanzo-apps/store/actions
2. Verify main branch protection allows workflows
3. Clear browser cache and reload

### Build Errors

Run locally to debug:
```bash
npm run generate-store
npm run build
```

Check error messages and fix JSON files if needed.

## 📞 Support

- **Workflows**: https://github.com/hanzo-apps/store/actions
- **Issues**: https://github.com/hanzo-apps/store/issues
- **Deployments**: https://github.com/hanzo-apps/store/deployments

---

**Your store is production-ready!** Just enable GitHub Pages and you're live! 🎉
