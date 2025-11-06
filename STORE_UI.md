# Store UI Documentation

## Overview

The Hanzo Store features a modern, responsive web interface built with Next.js, React, and Tailwind CSS. The UI provides a seamless browsing experience for discovering and installing MCP servers.

## Features

### 🔍 Search & Discovery

- **Real-time Search**: Instant search across app names, descriptions, and tags
- **Category Filtering**: Quick filtering by category with app counts
- **Client-Side Performance**: All filtering happens in the browser for instant results

### 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets for mobile users
- **Adaptive Layout**: Grid adjusts from 1 to 3 columns based on screen width

### 🎨 User Interface

#### Header
- Store title and tagline
- Sticky positioning for easy navigation
- Clean, professional design

#### Search Bar
- Large, accessible input field
- Search icon for visual clarity
- Real-time filtering as you type
- Searches: names, descriptions, tags

#### Category Filters
- Pill-style buttons with hover effects
- App counts for each category
- Active state highlighting
- "All" option to clear filters

#### App Cards
- **Title & Version**: Clear app identification
- **Description**: Brief summary (truncated at 3 lines)
- **Tags**: Visual tag badges for quick scanning
- **Author & License**: Creator attribution
- **Install Command**: One-click copy functionality
- **GitHub Link**: Direct repository access
- **Icon Support**: Optional app icons
- **Hover Effect**: Subtle shadow on hover

#### Footer
- Submission instructions
- Clear call-to-action for contributors
- Code example for JSON file location

### 🎯 Component Structure

```typescript
StorePage (app/page.tsx)
├── Header (sticky)
│   ├── Title
│   └── Description
├── Search & Filter Section
│   ├── Search Input
│   └── Category Pills
├── Results Count
└── App Grid
    └── AppCard[] (mapped)
        ├── Icon (optional)
        ├── Name & Version
        ├── Description
        ├── Tags
        ├── Author & License
        ├── Install Command (copyable)
        └── GitHub Link
```

### 🔧 Technical Details

#### State Management
```typescript
- storeData: StoreData | null    // All store data
- searchQuery: string             // Current search term
- selectedCategory: string        // Active category filter
- loading: boolean                // Loading state
- copied: boolean                 // Copy feedback (per card)
```

#### Client-Side Filtering
```typescript
filteredApps = useMemo(() => {
  // 1. Filter by category
  // 2. Filter by search query (name, description, tags)
  // 3. Return filtered results
}, [storeData, searchQuery, selectedCategory])
```

#### Performance Optimizations
- `useMemo` for expensive filtering operations
- Static site generation for instant page loads
- Minimal JavaScript bundle (104 KB first load)
- No runtime API calls (data pre-compiled)

### 🎨 Styling

#### Tailwind CSS Classes

**Colors:**
- Primary: `blue-600` (buttons, links)
- Gray scale: `gray-50/100/200/300/600/700/900`
- Hover: Slightly darker shades
- Focus: `ring-2 ring-blue-500`

**Typography:**
- Headers: `text-3xl font-bold`
- Body: `text-base`
- Small: `text-sm`
- Monospace: `font-mono` (install commands)

**Spacing:**
- Consistent padding: `px-4 py-3`
- Grid gap: `gap-6`
- Section margins: `mb-8`

**Components:**
- Rounded corners: `rounded-lg`
- Borders: `border border-gray-200`
- Shadows: `hover:shadow-lg`
- Transitions: `transition-colors`, `transition-shadow`

### 📊 Layout Breakpoints

```css
Mobile (< 768px):     1 column grid
Tablet (768px+):      2 column grid
Desktop (1024px+):    3 column grid
```

### 🚀 Loading States

1. **Initial Load**
   - Centered loading message
   - "Loading store..." text
   - Spinner (optional enhancement)

2. **Error State**
   - Red error message
   - "Failed to load store data"
   - Helpful error text

3. **Empty State**
   - "No apps found matching your criteria"
   - Encourages different search terms

### 💡 User Interactions

#### Search
1. User types in search box
2. `searchQuery` state updates
3. `filteredApps` automatically recalculates
4. Grid updates instantly

#### Category Filter
1. User clicks category pill
2. `selectedCategory` state updates
3. Active pill highlights
4. `filteredApps` recalculates
5. Results count updates

#### Copy Install Command
1. User clicks install command button
2. `navigator.clipboard.writeText()` copies text
3. "Copied!" feedback shows for 2 seconds
4. Button returns to normal state

### 🔗 Data Flow

```
store.json (static)
    ↓
fetch('/store.json')
    ↓
setStoreData(data)
    ↓
filteredApps (computed)
    ↓
App Grid (rendered)
```

### 🎯 Key Files

- `app/page.tsx` - Main store page with search/filter logic
- `app/layout.tsx` - Root layout with metadata
- `app/globals.css` - Tailwind CSS imports
- `types/index.ts` - TypeScript interfaces
- `public/store.json` - Static store data

### 🔮 Future Enhancements

**Planned:**
- [ ] Sorting options (name, date, popularity)
- [ ] Advanced filters (license, tags)
- [ ] App detail pages
- [ ] User ratings and reviews
- [ ] Download statistics
- [ ] Installation analytics
- [ ] Dark mode support
- [ ] Favorites/bookmarks

**Possible:**
- [ ] Server-side search for larger catalogs
- [ ] Lazy loading for 100+ apps
- [ ] Virtual scrolling
- [ ] Progressive Web App (PWA)
- [ ] Offline support
- [ ] Keyboard shortcuts
- [ ] Accessibility improvements (WCAG AAA)

### 📱 Mobile Experience

Optimized for mobile with:
- Large touch targets (min 44x44px)
- Readable font sizes (16px+)
- Ample spacing between interactive elements
- Single column layout on small screens
- No horizontal scrolling
- Fast load times (< 2s on 3G)

### ♿ Accessibility

- Semantic HTML elements
- Proper heading hierarchy
- Alt text for icons (when implemented)
- Keyboard navigation support
- Focus indicators
- ARIA labels (to be enhanced)
- Color contrast ratios (WCAG AA compliant)

### 🧪 Testing

Test the UI locally:

```bash
npm run dev
# Visit http://localhost:3000

# Test search:
# - Type "github" → should show GitHub MCP
# - Type "database" → should show PostgreSQL MCP

# Test filters:
# - Click "Development Tools" → should show 2 apps
# - Click "All" → should show all 5 apps

# Test copy:
# - Click install command → should show "Copied!"
```

### 📊 Performance Metrics

**Current Build:**
- First Load JS: 104 KB
- Page Size: 2.06 KB
- Static Routes: 1
- Build Time: ~3 seconds

**Lighthouse Scores (Target):**
- Performance: 95+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 100

---

Built with ❤️ by Hanzo AI
