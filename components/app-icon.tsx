'use client'

/**
 * An app's artwork — and the fallback that is currently doing all of the work.
 *
 * The card grid and the app page both show it, at two sizes, and both have to
 * survive artwork that does not load. Today that is every app: each `icon` in
 * the data is a PRESIGNED R2 URL inherited from the upstream Shinkai store,
 * signed 2025-11-05 with `X-Amz-Expires=86400`, so all 202 have been dead links
 * since the following day. The grid had no fallback at all and rendered the
 * browser's broken-image glyph with the alt text spilling out of the 4rem box;
 * the app page had one, but only for a MISSING url, never a failing one. Both
 * are the same fact — "show the artwork, or the initial" — so it is stated
 * here, once, and both surfaces are covered by the same rule.
 */
import { useState } from 'react'

export function AppIcon({
  app,
  lg = false,
}: {
  app: { name: string; icon?: string }
  /** The page hero renders the same mark at 6rem; the card at 4rem. */
  lg?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const className = lg ? 'app-icon lg' : 'app-icon'

  if (!app.icon || failed) {
    return <div className={`${className} fallback`}>{app.name[0]}</div>
  }

  return (
    <img className={className} src={app.icon} alt={app.name} onError={() => setFailed(true)} />
  )
}
