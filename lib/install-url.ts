/**
 * The one spelling of the store → desktop hand-off.
 *
 * Hanzo Desktop registers the `hanzo://` scheme and performs the install; the
 * connected wallet rides along so the app knows who is installing. The store
 * grid and the app page both offer the install, and they used to spell the link
 * two different ways — `hanzo://install/<id>?…` on one and `hanzo://config?…`
 * on the other — which is one protocol with two truths. It is stated here.
 */
import type { StoreApp } from '@/types'

export function installUrl(app: StoreApp, wallet?: `0x${string}`): string {
  const params = new URLSearchParams({ name: app.name, type: app.type || 'Tool' })
  if (wallet) params.set('wallet', wallet)
  return `hanzo://install/${encodeURIComponent(app.id)}?${params}`
}
