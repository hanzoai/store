'use client'

/**
 * The frame the three policy documents sit in — guidelines, terms, privacy.
 *
 * All three are the same page with different prose: a top bar with a way back
 * to the store, a title, and a long-form article. Written once here, the three
 * cannot drift apart, and the pages themselves become what they actually are —
 * the text.
 *
 * Typography lives in the `.doc` scope in globals.css, so the article body is
 * plain semantic HTML and stays diffable against the legal copy it mirrors.
 */
import type { ReactNode } from 'react'
import { StoreMark, TopBar, SiteFooter } from './site-chrome'

export function DocPage({
  title,
  lede,
  children,
}: {
  title: string
  /** The dateline / one-paragraph opening that sits under the title. */
  lede?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="page">
      <TopBar brand={<StoreMark />} />

      <main className="doc">
        <h1>{title}</h1>
        {lede}
        {children}
      </main>

      <SiteFooter />
    </div>
  )
}
