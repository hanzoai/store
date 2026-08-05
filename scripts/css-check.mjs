/**
 * Fail the build when the rendered markup uses a class no delivered sheet defines.
 *
 * `gui-css-check out/` on its own is a FALSE GREEN here. The store fetches
 * store.json in the browser, so the exported HTML is a shell: checking it found
 * 29 classes and passed, while the page a user actually gets carries 228 — and
 * nine of those had no rule. The check has to look at a rendered page, which is
 * what its own `--render` flag is for, and rendering needs the export served.
 *
 * So: serve out/ on an ephemeral port, render one page of each KIND (grid, app
 * record, long-form document — every route is one of those three), and hand the
 * urls to gui-css-check. No dev server, no fixtures; this is the artifact that
 * ships, measured the way a browser sees it.
 */
import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const ROOT = new URL('../out/', import.meta.url).pathname
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' }

const server = createServer(async (req, res) => {
  // Strip the query, refuse to climb out of out/.
  const rel = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  const file = join(ROOT, rel.endsWith('/') ? rel + 'index.html' : rel)
  try {
    const body = await readFile(file)
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404).end('not found')
  }
})

await new Promise((r) => server.listen(0, '127.0.0.1', r))
const base = `http://127.0.0.1:${server.address().port}`

// One route per kind. `/apps/audio-insight` stands for all 202 — they are the
// same component with different data, and rendering 202 of them proves nothing
// the first one did not.
// spawn, never spawnSync: the checker fetches these urls from THIS process, and
// a synchronous child blocks the event loop the server answers on — it would
// wait out its own timeout against a server that can never reply.
const routes = ['/index.html', '/apps/audio-insight.html', '/terms.html']
const status = await new Promise((resolve) => {
  const child = spawn('gui-css-check', routes.flatMap((r) => ['--render', base + r]), {
    stdio: 'inherit',
    env: { ...process.env, PATH: `${new URL('../node_modules/.bin', import.meta.url).pathname}:${process.env.PATH}` },
  })
  child.on('close', resolve)
  child.on('error', () => resolve(1))
})

server.close()
process.exit(status ?? 1)
