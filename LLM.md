# Hanzo Store

## Project

App store / marketplace for Hanzo ecosystem.

- Stack: Next.js + React + TypeScript + Tailwind CSS
- Web3: wagmi, viem, RainbowKit, WalletConnect
- Dev: `npm run dev`
- Build: `npm run build`

## Known Issues

### Build Config (High)
`next.config.js` ignores TS and ESLint errors during build. Should eventually set both to `false`:
```js
typescript: { ignoreBuildErrors: false },
eslint: { ignoreDuringBuilds: false },
```

### Console Statements (Medium)
Production console.error in:
- `app/page.tsx` (line 29)
- `app/apps/[id]/page.tsx` (line 18)
- `app/apps/[id]/page-client.tsx` (line 28)

### URL Validation (Medium)
`app/apps/[id]/page-client.tsx` renders unvalidated URLs from store.json. Sanitize before use.

### Missing Error Boundaries (Medium)
No React Error Boundaries on main pages.

### WalletConnect Fallback (Low)
`lib/wagmi.ts` line 132: project ID falls back to hardcoded 'demo'. Should throw if env var missing.

### Unused Import (Low)
`app/apps/[id]/page-client.tsx`: `Github` from lucide-react is imported but unused.

## Type Declarations

Created `types/hanzo-ui.d.ts` for @hanzo/ui module (no exported types).
`types/hanzo.d.ts` has `Badge` typed as `any` -- should get proper `BadgeProps` interface.

## Key Files

```
app/
  page.tsx                    # Main store page
  apps/[id]/
    page.tsx                  # Server component (fetches app data)
    page-client.tsx           # Client component (app detail)
  providers.tsx               # QueryClient setup
lib/
  wagmi.ts                    # Web3 config
types/
  hanzo-ui.d.ts               # @hanzo/ui type shim
  hanzo.d.ts                  # Shared types
e2e/
  store.spec.ts               # Playwright tests
next.config.js                # Build config
```

## Security

- No hardcoded secrets found
- No SQL injection (no direct DB queries)
- HTTPS enforced for external URLs
- No eval() or dangerous functions

## Design tokens

The palette is `@hanzo/design` — `app/globals.css` imports `tokens/colors.css`
and `tokens/radius.css`, so `:root` is Hanzo's dark palette and `.light` retunes
it (next-themes writes both classes; `defaultTheme="dark"`). Do not declare
`--background`/`--border`/etc. locally; retune upstream in `~/work/hanzo/design`.

`tailwind.config.ts` reads tokens as `var(--x)`, NOT `hsl(var(--x))`. The design
package publishes finished colours (hex, and `rgb(255 255 255 / .10)` alpha
hairlines); wrapping one in `hsl()` is invalid at computed-value time and the
browser drops the whole declaration — which silently disables every colour
utility in the app.

`@hanzo/ui` 5's components are not in the Tailwind `content` globs, so any class
they emit themselves is never generated. Style @hanzo/ui components with the
app's own utility classes, or use a native element — do not rely on their
built-in appearance.

Build order: `npm run generate-store` before `npm run build` — `public/store.json`
is gitignored and generated from `data/`, and `output: 'export'` cannot
prerender `/apps/[id]` without it.
