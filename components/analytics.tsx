'use client'

import { usePathname } from 'next/navigation'
import { AnalyticsProvider, usePageview } from '@hanzo/event/react'

/** The ONE Hanzo telemetry front door — POST api.hanzo.ai/v1/event. Cloud fans the
 *  single batched stream out to the web (analytics), product (insights) and error
 *  lenses, so there is no second analytics SDK and no second error SDK. The client
 *  never sends the org; Cloud resolves the tenant from the publishable key. */
const HOST = 'https://api.hanzo.ai'

/** Publishable ingest key (pk_…), minted per org via POST /v1/ingest/keys. Every
 *  visitor here is logged out, so no bearer can ride the request and this
 *  write-only, bundle-safe key IS how anonymous pageviews and errors resolve to an
 *  org. Unset → events are best-effort and dropped at the edge. */
const INGEST_KEY = process.env.NEXT_PUBLIC_EVENT_INGEST_KEY?.trim() || undefined

/** Honor an explicit browser opt-out — Global Privacy Control first, then legacy
 *  DNT. Opting out suppresses pageviews AND errors. */
function consented(): boolean {
  if (typeof navigator === 'undefined') return true
  const nav = navigator as Navigator & {
    globalPrivacyControl?: boolean
    doNotTrack?: string | null
  }
  if (nav.globalPrivacyControl === true) return false
  const dnt = nav.doNotTrack
  return dnt !== '1' && dnt !== 'yes'
}

function Pageview() {
  usePageview(usePathname())
  return null
}

/** Telemetry root. The provider owns the ONE @hanzo/event client: it fires the
 *  first pageview, registers auto error capture (window.onerror +
 *  unhandledrejection) and flushes on unload. <Pageview> adds one per client-side
 *  route change — the provider's autoPageview already covers the initial load, so
 *  pages are counted exactly once. */
export function Analytics({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider
      config={{ product: 'store', host: HOST, ingestKey: INGEST_KEY, enabled: consented() }}
    >
      <Pageview />
      {children}
    </AnalyticsProvider>
  )
}
