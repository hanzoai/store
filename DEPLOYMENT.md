# Deployment Guide

## GitHub Pages Setup

To enable automatic deployment to GitHub Pages:

### 1. Enable GitHub Pages

Go to your repository settings: https://github.com/hanzoai/store/settings/pages

1. Under "Build and deployment"
2. Set **Source** to: `GitHub Actions`
3. Save

### 2. Verify Workflow Permissions

Go to: https://github.com/hanzoai/store/settings/actions

1. Under "Workflow permissions"
2. Select: `Read and write permissions`
3. Check: `Allow GitHub Actions to create and approve pull requests`
4. Save

### 3. Trigger Deployment

The next push to `main` will automatically:
- Validate all JSON files
- Generate `store.json`
- Build the Next.js app
- Deploy to GitHub Pages

Your store will be live at: **https://hanzoai.github.io/store/**

### 4. Custom Domain (Optional)

To use a custom domain like `store.hanzo.ai`:

1. Add DNS record:
   ```
   Type: CNAME
   Name: store
   Value: hanzoai.github.io
   ```

2. In GitHub Pages settings, add custom domain: `store.hanzo.ai`
3. Enable "Enforce HTTPS"

## Manual Deployment

If you want to deploy manually:

```bash
# Build
npm run generate-store
npm run build

# Deploy to any static host
# The static files are in ./out/
rsync -avz out/ user@yourserver.com:/var/www/store/
```

## Deployment Checklist

- [ ] GitHub Pages enabled with GitHub Actions source
- [ ] Workflow permissions set to read/write
- [ ] Initial deployment successful
- [ ] Store accessible at GitHub Pages URL
- [ ] All apps load correctly
- [ ] Search and filtering work
- [ ] `/store.json` accessible
- [ ] Custom domain configured (if applicable)

## Troubleshooting

### Build fails with "export const dynamic" error

This means an API route wasn't removed. API routes aren't supported in static exports. Use only `/store.json`.

### JSON validation fails

Check that all JSON files in `data/apps/` are valid and include required fields:
- id, name, description, version, author, category, tags, createdAt, updatedAt

### Pages not updating

- Check GitHub Actions tab for workflow status
- Ensure `main` branch protection isn't blocking workflows
- Verify `public/store.json` is gitignored and regenerated on build

## Updating the Store

To add/update apps:

1. **Via Fork + PR** (recommended):
   - Fork the repo
   - Add/edit JSON in `data/apps/`
   - Submit PR
   - Automated checks validate
   - Merge triggers deployment

2. **Direct Push** (maintainers only):
   ```bash
   # Edit/add JSON files in data/apps/
   npm run generate-store
   git add data/apps/
   git commit -m "Add new app: YourApp"
   git push
   ```

## Monitoring

- **GitHub Actions**: Monitor builds and deployments
- **Logs**: Check workflow logs for any errors
- **Analytics**: Add Google Analytics or Plausible if needed

## Backup

The store data is backed up via:
- Git history (all commits)
- GitHub repository
- Local clones

To backup locally:
```bash
git clone git@github.com:hanzoai/store.git hanzo-store-backup
```

## Performance

Current build size: ~104 KB First Load JS

To optimize:
- Images: Use WebP format, optimize sizes
- Icons: Use SVG or small PNGs (< 50KB)
- JSON: Keep descriptions concise

## Support

- **Issues**: https://github.com/hanzoai/store/issues
- **Workflows**: https://github.com/hanzoai/store/actions
- **Deployments**: https://github.com/hanzoai/store/deployments
