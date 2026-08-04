import type { Metadata } from 'next'
import { Providers } from './providers'
// RainbowKit first, globals second: the store's token bindings are the ones
// that must win.
import '@rainbow-me/rainbowkit/styles.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hanzo AI Store',
  description:
    'Boost your AI agents with ready-to-go, tailor-made automations for seamless tech integration',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // `dark` on <html> is what the @hanzo/ui token sheet keys its dark palette
  // off; `GuiProvider defaultTheme="dark"` is the same fact for the component
  // layer. The store has no theme switcher and its wallet modal is dark by
  // design, so the theme is stated, not negotiated.
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
