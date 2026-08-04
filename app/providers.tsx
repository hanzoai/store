'use client'

/**
 * The one provider stack for the store.
 *
 * `@hanzo/ui/gui-config` is the SHARED Hanzo scale — the same type, radius and
 * spacing ladder the console, the login portal and hanzo/sites mount. A private
 * copy is a scale that drifts, so the store reads the published one and every
 * @hanzo/ui component here renders at the sizes it renders at everywhere else.
 *
 * Wallet connect sits inside it: the store hands a connected address to the
 * `hanzo://install/…` deep link so the desktop app knows who is installing.
 */
import { type ReactNode } from 'react'
import { GuiProvider } from '@hanzo/gui'
import guiConfig from '@hanzo/ui/gui-config'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { config } from '@/lib/wagmi'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <GuiProvider config={guiConfig} defaultTheme="dark">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {/* Structure only — every colour and radius the wallet modal uses is
              bound to a Hanzo token in globals.css, so the palette is stated
              once rather than half here and half there. */}
          <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </GuiProvider>
  )
}
