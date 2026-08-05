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

### The tokens are FINISHED values — never wrap one in `hsl()`

The ladder comes from `@hanzo/design`, which publishes colours ready to use: hex,
and alpha hairlines already written as `rgb(255 255 255 / .10)`. So a token is
spent as `var(--border)` and nothing else. `hsl(var(--border))` expands to
`hsl(rgb(255 255 255 / .10))`, which is invalid at computed-value time — and an
invalid declaration is not clamped or approximated, it is **dropped**. The rule
around it still matches, the element still has a border-width, and the colour
simply never arrives.

That is how it hides. Nothing errors, nothing warns, the build is green and the
selector is right there in devtools; the page is just quietly colourless. The
`hsl(var(--x))` form is shadcn's convention, where tokens are bare `H S% L%`
triples — this repo carried it in the Tailwind config it no longer has, and it
ate every colour in the app. Tailwind is gone; **the trap is not**, because it
is a property of the tokens, not of Tailwind. Any new `hsl(`, `rgb(` or
`oklch(` wrapper around a `var(--…)` is the same bug.

### `theme.css`, not `styles.css` — and that is a decision, not an accident

@hanzo/ui publishes two independent sheets; neither imports the other.
`styles.css` is 437KB — the whole token ladder plus every gui atomic class plus
the bare-word handles (`mono`, `paper`, `row`, `tnum`, …). `theme.css` is 58KB:
tokens and typography only. This app imports **theme.css**, because the atomics
arrive inline from gui at runtime (~724KB per document) and the store's markup
uses exactly one bare-word handle, `font_body`, which gui's inline block defines.
Adding styles.css would deliver a second copy of what is already inline.

It also avoids a live footgun. `styles.css` ends with a **bare, unscoped**
`:root { --background: var(--t189) }` at byte 262038, and `--t189` is near-white
unconditionally. The dark block that should beat it is scoped
`:root.t_dark, :root.t_light .t_dark, .tm_xxt` — gui's own theme class. A host
that drives themes with next-themes writes `dark`/`light`, never `t_dark`, so
that block never matches and the bare `:root` governs; at equal specificity the
last sheet imported wins, and importing ui/styles.css last turns the dark ground
near-white. `theme.css` has no such rule — its single `--background` is a bare
`:root` set to `#0a0a0a` directly.

Nothing in the toolchain can see that go wrong: build, typecheck and the CSS
check all pass on the broken variant, because none of them resolves a custom
property. So it is asserted numerically instead — measured on this tree, ground
and ink invert and both stay far above AAA:

| | `background-color` | `color` | contrast |
|---|---|---|---|
| dark | `rgb(20, 20, 20)` | `rgb(255, 255, 255)` | 18.42:1 |
| light | `rgb(247, 247, 247)` | `rgb(5, 5, 5)` | 19.02:1 |

If you ever switch to `styles.css`, re-import `@hanzo/design/tokens/colors.css`
**after** it and re-measure that table. A single theme's pair proves nothing.

### The faces are a separate import, and omitting it fails silently

`app/globals.css` imports two sheets and needs both:

```css
@import '@hanzo/design/tokens/fonts.css';   /* the @font-face rules + the woff2 */
@import '@hanzo/ui/theme.css';              /* the ladder, which only NAMES them */
```

`@hanzo/ui` 8.0.47 deliberately stopped shipping `@font-face` — it was a
duplicate of @hanzo/design's, pointing at font files ui does not carry, and on
webpack the unresolvable `url()` compiled into a throw. ui now only declares
`--font-sans: "Geist", …`; **@hanzo/design is the single owner of the faces** and
ships the two variable woff2 beside the CSS, whose urls resolve from inside
`node_modules` with no configuration.

Drop that first `@import` and nothing complains: the build is green, the CSS
check is green (it is a font-resolution problem, not a missing class), and every
page renders in the `ui-sans-serif, system-ui` fallback. Self-hosted on purpose —
the store makes no third-party request for type. The e2e suite asserts
`document.fonts.check('16px Geist')` for exactly this reason.

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

`postbuild` runs `scripts/css-check.mjs`, which fails the build when the markup
uses a class no delivered sheet defines. It serves `out/` and renders three
pages rather than reading the exported HTML, and that distinction is the whole
point: this site fetches its data in the browser, so the exported HTML is a
shell. Checking the shell found 29 classes and passed; rendering the same pages
found 227 — and nine of those had no rule behind them. `gui-css-check out/` on
its own is a **false green** here, which is worse than no check at all.

The nine were `btn-*` / `badge-*`, semantic handles @hanzo/ui stamps on a control
in addition to the @hanzo/gui atomics that actually paint it. They are inert —
strip every one off a rendered element and its computed background, padding and
radius do not move — so they are listed in `gui-css-check.json` with that note,
rather than given rules that would duplicate what gui already does. The store
hooks exactly one handle, `.btn`, and that one is defined.

```bash
npm run typecheck                              # tsc --noEmit
npm run build                                  # 209 static pages, then css-check
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
inherited from the upstream store this catalog was forked from, signed
2025-11-05 with `X-Amz-Expires=86400`. All 202 have been dead since the
following day, so the store renders `AppIcon`'s initial for every app and the
Screenshots panel never appears. That is the fallback working, not a rendering
bug — but the artwork itself is real missing data and wants re-hosting.
