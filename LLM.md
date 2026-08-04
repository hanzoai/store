# Working in hanzo/store

What an agent needs before touching this repo. Two things are load-bearing and
neither is obvious from the source.

## 1. This repo is the Market's editorial source, not its read path

`data/agents/*.json` and `data/tools/*.json` are the curated catalog — one
reviewable file per item, changed by Pull Request. `hanzoai/cdn` builds the
served documents from them (`cd ../cdn && scripts/market.py gen --from
../store`). Do not hand-edit the generated files there, and do not point clients
at `store.hanzo.ai/store.json`.

`public/store.json` is generated (`npm run generate-store`) and gitignored. The
site fetches it at runtime; that is why every page waits for data before it has
anything to render, and why prerendering a page proves nothing about what it
shows.

## 2. The UI stack is @hanzo/ui on @hanzo/gui — and gui fails silently

There is no Tailwind, no Radix, no shadcn, no `cn()`, no `postcss.config`. The
vocabulary is exactly two:

- **Inside a card** — @hanzo/ui components (`Button`, `Card`, `Badge`, `Input`)
  and @hanzo/gui style props (`items`, `justify`, `gap`, `px`, `rounded`, `bg`).
- **Positioning the page** — plain CSS in `app/globals.css`, reading the tokens
  `@hanzo/ui/theme.css` defines. Grid, sticky bars and long-form prose are
  CSS-only ideas; gui's stacks are flexbox on every platform and deliberately do
  not cover them.

Nothing may introduce a third way.

### The trap

**@hanzo/gui accepts a prop it does not recognise, and lets one prop silently
undo another.** No error, no type failure, and `next build` stays green while
the page renders wrong. Six defects reached the built site that way; each is
described at its call site. The shapes to watch for:

- **A React Native spelling that means something else on the web.** `flex={1}`
  compiles to `flex: 1 1 0px` — a zero basis. On a card body in an auto-height
  column it collapsed the box to 0px and the content painted outside it. Use
  `grow={1}`, which leaves the basis at `auto`. (`grow` is also the config's
  shorthand for `flexGrow`; the config sets `onlyAllowShorthands`.)
- **A variant that expands into more than you asked for.** `size="$6"` is not
  `fontSize`. It expands to the whole typographic row for that step — size,
  leading, tracking AND weight — and the Hanzo ladder's weight column is 400 at
  every step, so it replaces any `fontWeight` the component declared. Restate
  the weight after it.
- **A token that does not exist.** `fontFamily="$mono"` names nothing (the
  config declares `body` and `heading` only) and resolves to nothing at all.
  Mono lives in `theme.css`, which typesets `code`/`pre`.
- **A frame prop that lands on markup you did not intend.** gui's Button frame
  declares `role="button"` and stamps it on whatever it renders, so
  `<Button asChild>` around an anchor produces `<a href role="button">`. That is
  what `components/link-button.tsx` exists to state once.
- **The five in hanzo.ai's `page-kit.tsx`** — `animation` vs `transition`,
  `$gtSm` vs `$sm` (the media keys here are `xs/sm/md/lg/xl` and `max-*`), `tag`
  vs `render`, `lineHeight={1.1}` rendering as 1.1px, `letterSpacing` as a prop.

### So verify by looking, not by building

A green build proves the imports resolved. The e2e suite (`e2e/store.spec.ts`)
is the actual check: every assertion reads a **computed style** or a **measured
box** off the running page, because that is the only evidence that tells
"styled" apart from "the prop went nowhere". It asserts the six defects
specifically, and each was confirmed to fail when its defect is put back.

Nothing in it asserts that a count is `>= 0`. The suite this replaced was mostly
those, over Tailwind selectors that no longer exist.

```bash
npm run typecheck                              # tsc --noEmit
npm run build                                  # 209 static pages
npx playwright test --project=chromium         # 21 tests
```

## 3. TypeScript stays on 5.x

`typescript@7` is the native Go compiler and its npm package is a launcher for
that binary and nothing else — `require('typescript')` returns two keys, and
`readConfigFile`, `parseJsonConfigFileContent` and `sys` are all `undefined`.
Next reads `tsconfig.json` through exactly those functions to learn
`compilerOptions.paths`, so on TS 7 it learns nothing, `@/*` is never registered
as a webpack alias, and every path-aliased import fails to resolve. Same shape
as tsup, whose `rollup-plugin-dts` breaks on it.

This is a property of the consumer, not a defect to fix here. Do not add
`@typescript/native-preview` either: it is `7.0.0-dev`, behind stable.

`next.config` is `.mjs` for the same reason — Next loads a TypeScript config
through the compiler API, which would make config LOADING depend on which
TypeScript is installed.

## 4. Two dependency facts the build needs

- `@coinbase/cdp-sdk`, reached through wagmi's Base Account connector, imports
  the `@x402/*` payment SDKs unconditionally while declaring them optional
  peers. The store never signs an x402 payment and does not install them, and
  webpack resolves statically — so they are mapped to `fallback: false` in
  `next.config.mjs`.
- @hanzo/ui's icons need `react-native-svg`, whose peer floor is react ^19.2.3.
  That is why react is pinned at 19.2.8.

## 5. Known-stale data

Every `icon` and `screenshot` url in the catalog is a **presigned R2 link**
inherited from the upstream Shinkai store, signed 2025-11-05 with
`X-Amz-Expires=86400`. All 202 have been dead since the following day, so the
store renders `AppIcon`'s initial for every app and the Screenshots panel never
appears. That is the fallback working, not a rendering bug — but the artwork
itself is real missing data and wants re-hosting.
