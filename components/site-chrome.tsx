'use client'

/**
 * The chrome every page in the store wears: one top bar, one footer.
 *
 * The store page and the three policy documents each carried their own copy of
 * both — four headers with the same logo/ConnectButton row, four footers with
 * the same three links. They are here once, so a link added to the footer is
 * added to the site.
 */
import type { ReactNode } from 'react'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'

/** The one place the site's own routes are enumerated. */
const LINKS = [
  { href: '/guidelines', label: 'Guidelines' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
]

/**
 * @param brand  the left-hand identity block — a mark, or a mark plus a title
 * @param children optional matter that sits under the bar, inside the same gutter
 */
export function TopBar({ brand, children }: { brand: ReactNode; children?: ReactNode }) {
  return (
    <header className="topbar">
      <div className="container">
        <div className="bar">
          <div className="brand">{brand}</div>
          <ConnectButton />
        </div>
        {children}
      </div>
    </header>
  )
}

export function SiteFooter({ children }: { children?: ReactNode }) {
  return (
    <footer className="site-footer">
      <div className="container">
        {children}
        <nav className="links">
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <p className="copyright">© 2025 Hanzo Industries Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
