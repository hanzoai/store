import { test, expect, type Page } from '@playwright/test'

/**
 * What the store has to keep being true.
 *
 * These assert the things that ACTUALLY broke in the move to @hanzo/gui, because
 * gui silently ignores a prop it does not recognise and silently lets one prop
 * undo another: no error, no type failure, and the build stays green while the
 * page renders wrong. So every check here reads a COMPUTED style or a measured
 * box off the running page — the only evidence that tells "styled" apart from
 * "the prop went nowhere".
 *
 * Nothing here asserts that a count is `>= 0`. A test that cannot fail is not a
 * test, and the suite this replaced was mostly those.
 */

/** The data arrives over fetch, so every check waits for a card, not for load. */
async function store(page: Page) {
  await page.goto('/')
  await page.waitForSelector('[data-slot="card"]')
}

const box = (page: Page, selector: string) =>
  page
    .locator(selector)
    .first()
    .evaluate((el) => {
      const r = el.getBoundingClientRect()
      return { width: Math.round(r.width), height: Math.round(r.height) }
    })

const columns = (page: Page, selector: string) =>
  page
    .locator(selector)
    .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length)

test.describe('store', () => {
  test('every card shows its description, tags and byline', async ({ page }) => {
    await store(page)

    // `flex={1}` on the card body compiled to `flex: 1 1 0px` and collapsed it to
    // zero: the description vanished, and the tag row and byline painted OUTSIDE
    // the box, over the buttons. The body has to be as tall as its own contents.
    const body = await box(page, '[data-slot="card-content"]')
    expect(body.height).toBeGreaterThan(60)

    const description = page.locator('[data-slot="card-content"] > *').first()
    await expect(description).toBeVisible()
    expect((await description.textContent())?.trim().length).toBeGreaterThan(0)
  })

  test('a long description is held to three lines', async ({ page }) => {
    await store(page)

    const lines = await page.evaluate(() => {
      const bodies = [...document.querySelectorAll('[data-slot="card-content"]')]
      const longest = bodies
        .map((el) => el.firstElementChild!)
        .sort((a, b) => b.textContent!.length - a.textContent!.length)[0]
      return (
        longest.getBoundingClientRect().height / parseFloat(getComputedStyle(longest).lineHeight)
      )
    })
    expect(Math.round(lines)).toBe(3)
  })

  test('every footer in a row sits on the same line', async ({ page }) => {
    await store(page)

    const offsets = await page.evaluate(() =>
      [...document.querySelectorAll('[data-slot="card"]')].slice(0, 3).map((card) =>
        Math.round(
          card.querySelector('[data-slot="card-footer"]')!.getBoundingClientRect().top -
            card.getBoundingClientRect().top,
        ),
      ),
    )
    expect(new Set(offsets).size).toBe(1)
  })

  test('a button that navigates is not underlined', async ({ page }) => {
    await store(page)

    // `asChild` renders the control as the anchor it wraps — correct markup, and
    // the user-agent underline on every label.
    const decorations = await page.evaluate(() => [
      ...new Set(
        [...document.querySelectorAll('[data-slot="button"]')].map(
          (el) => getComputedStyle(el).textDecorationLine,
        ),
      ),
    ])
    expect(decorations).toEqual(['none'])
  })

  test('a filter reads as one phrase, and filters to the count it declares', async ({ page }) => {
    await store(page)

    // Written as JSX children the source's own newlines folded into the label and
    // every button read "Agent ( 23 )".
    const agent = page.getByRole('button', { name: /^Agent \(\d+\)$/ })
    await expect(agent).toBeVisible()

    const declared = Number((await agent.textContent())!.match(/\((\d+)\)/)![1])
    await agent.click()
    await expect(page.getByText(`${declared} apps found`)).toBeVisible()
    expect(await page.locator('[data-slot="card"]').count()).toBe(declared)
  })

  test('search narrows the grid, and says so when nothing matches', async ({ page }) => {
    await store(page)

    const all = await page.locator('[data-slot="card"]').count()
    const search = page.getByPlaceholder('Search apps…')

    await search.fill('audio')
    await expect(page.locator('[data-slot="card"]').first()).toBeVisible()
    const narrowed = await page.locator('[data-slot="card"]').count()
    expect(narrowed).toBeGreaterThan(0)
    expect(narrowed).toBeLessThan(all)

    await search.fill('nothing-matches-this-query')
    await expect(page.getByText('No apps found matching your criteria')).toBeVisible()
  })

  test('artwork that does not load falls back to the initial', async ({ page }) => {
    await store(page)

    // Every icon in the data is a presigned url that expired in 2025; with no
    // fallback the grid rendered 202 broken-image glyphs, alt text spilling out
    // of the box.
    await expect(page.locator('.app-icon').first()).toBeVisible()
    expect(await box(page, '.app-icon')).toEqual({ width: 64, height: 64 })
  })

  test('the store hands off to the desktop app over one protocol', async ({ page }) => {
    await store(page)

    const install = page.getByRole('link', { name: /Install in Hanzo/ }).first()
    expect(await install.getAttribute('href')).toMatch(/^hanzo:\/\/install\/[^?]+\?name=/)
  })

  test('the mark keeps its size on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 })
    await store(page)

    // As a plain flex child the mark took its share of the squeeze and rendered
    // 0px wide at this width.
    expect((await box(page, '.brand > :first-child')).width).toBe(48)
  })

  test('nothing scrolls the page sideways', async ({ page }) => {
    for (const width of [1280, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 800 })
      await store(page)
      const [scrollWidth, clientWidth] = await page.evaluate(() => [
        document.body.scrollWidth,
        document.body.clientWidth,
      ])
      expect(scrollWidth, `body overflows at ${width}px`).toBe(clientWidth)
    }
  })

  test('the grid is one column on a phone and three on a desktop', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 })
    await store(page)
    expect(await columns(page, '.cards')).toBe(1)

    await page.setViewportSize({ width: 1280, height: 800 })
    await store(page)
    expect(await columns(page, '.cards')).toBe(3)
  })

  test('no Tailwind utility or Radix attribute reaches the page', async ({ page }) => {
    await store(page)

    const residue = await page.evaluate(() => {
      const found = new Set<string>()
      const utility =
        /^(flex$|grid$|hidden$|block$|text-|bg-|border-|p-\d|px-|py-|m-\d|mx-|my-|gap-|w-\d|h-\d|min-|max-|rounded-|items-|justify-|space-|leading-|tracking-|shadow-|absolute$|relative$|sticky$|overflow-|z-\d)/
      for (const el of document.querySelectorAll('*')) {
        for (const name of el.classList) if (utility.test(name)) found.add(name)
        for (const attr of el.attributes) if (attr.name.startsWith('data-radix')) found.add(attr.name)
      }
      return [...found]
    })
    expect(residue).toEqual([])
  })

  test('the wallet modal reads the store’s tokens rather than a palette of its own', async ({
    page,
  }) => {
    await store(page)

    const bound = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement)
      const rk = getComputedStyle(document.querySelector('[data-rk]')!)
      return {
        primary: root.getPropertyValue('--primary').trim(),
        accent: rk.getPropertyValue('--rk-colors-accentColor').trim(),
        border: root.getPropertyValue('--border').trim(),
        modalBorder: rk.getPropertyValue('--rk-colors-modalBorder').trim(),
      }
    })
    expect(bound.primary).not.toBe('')
    expect(bound.accent).toBe(bound.primary)
    expect(bound.modalBorder).toBe(bound.border)
  })
})

test.describe('app page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/apps/audio-insight')
  })

  test('a panel heading is a heading, not body text', async ({ page }) => {
    await page.waitForSelector('h2')

    // `size="$6"` is a VARIANT: it expands to the whole typographic row for that
    // step, and the weight column of the Hanzo ladder is 400 at every step, so it
    // quietly replaced the 600 CardTitle declares for itself.
    const weights = await page.evaluate(() =>
      [...document.querySelectorAll('h2')].map((el) => getComputedStyle(el).fontWeight),
    )
    expect(weights.length).toBeGreaterThan(0)
    expect([...new Set(weights)]).toEqual(['600'])
  })

  test('the title is a real h1 at display size', async ({ page }) => {
    const h1 = page.locator('h1')
    await expect(h1).toHaveText('Audio Insight')
    expect(
      await h1.evaluate((el) => {
        const c = getComputedStyle(el)
        return { size: c.fontSize, weight: c.fontWeight }
      }),
    ).toEqual({ size: '32px', weight: '700' })
  })

  test('commands are typeset in mono', async ({ page }) => {
    await page.waitForSelector('pre.code')
    expect(
      await page
        .locator('pre.code')
        .first()
        .evaluate((el) => getComputedStyle(el).fontFamily),
    ).toContain('Geist Mono')
  })

  test('the record and the rail are two columns on a desktop, one on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.waitForSelector('.detail')
    expect(await columns(page, '.detail')).toBe(2)

    await page.setViewportSize({ width: 390, height: 800 })
    expect(await columns(page, '.detail')).toBe(1)
  })

  test('the install button carries the same deep link the grid does', async ({ page }) => {
    const install = page.getByRole('link', { name: /Open in Hanzo Desktop/ })
    expect(await install.getAttribute('href')).toBe(
      'hanzo://install/audio-insight?name=Audio+Insight&type=Agent',
    )
  })
})

test.describe('documents', () => {
  for (const [path, title] of [
    ['/guidelines', 'App Store Guidelines'],
    ['/terms', 'Terms of Service'],
    ['/privacy', 'Privacy Policy'],
  ]) {
    test(`${path} is typeset prose wearing the store's chrome`, async ({ page }) => {
      await page.goto(path)

      await expect(page.locator('.doc h1')).toHaveText(title)
      await expect(page.getByRole('link', { name: 'Back to Store' })).toBeVisible()
      // The footer enumerates the site's routes in one place, so all three
      // documents are reachable from all three.
      await expect(page.locator('.site-footer a')).toHaveCount(3)

      // Prose leading, not UI leading — the whole reason these are CSS and not
      // component vocabulary.
      const leading = await page.locator('.doc').evaluate((el) => {
        const c = getComputedStyle(el)
        return parseFloat(c.lineHeight) / parseFloat(c.fontSize)
      })
      expect(leading).toBeGreaterThan(1.5)
    })
  }
})
