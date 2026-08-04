'use client'

/**
 * A button that navigates.
 *
 * Five controls in the store go somewhere: two into the store's own routes, two
 * into the desktop app over `hanzo://`, one out to GitHub. Each was written as
 * `<Button asChild>` wrapped around an anchor, which is the right markup — and
 * @hanzo/gui's Button frame declares `role="button"`, which it stamps onto
 * whatever it renders. So all five arrived in the page as
 * `<a href="…" role="button">`: they navigate, and they told assistive tech they
 * were buttons. An `<a href>` is a link. The role says so here, once, instead of
 * at five call sites.
 *
 * Which anchor to render follows from the destination, so it is not a prop. A
 * path inside the store is a `next/link` and routes on the client; anything else
 * is a plain anchor. `newTab` is only for destinations that leave the web app —
 * never for `hanzo://`, where a new tab would open, hand off, and stay behind
 * empty.
 */
import type { ComponentProps, ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@hanzo/ui'

export function LinkButton({
  href,
  newTab = false,
  children,
  ...props
}: Omit<ComponentProps<typeof Button>, 'asChild' | 'children'> & {
  href: string
  /** Open in a new tab — for destinations outside the store. */
  newTab?: boolean
  children?: ReactNode
}) {
  return (
    <Button asChild role="link" {...props}>
      {href.startsWith('/') ? (
        <Link href={href}>{children}</Link>
      ) : (
        <a href={href} {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })}>
          {children}
        </a>
      )}
    </Button>
  )
}
