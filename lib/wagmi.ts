import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { defineChain } from 'viem'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

// Define Lux chain
export const lux = defineChain({
  id: 96369,
  name: 'Lux',
  nativeCurrency: {
    decimals: 18,
    name: 'Lux',
    symbol: 'LUX',
  },
  rpcUrls: {
    default: {
      http: ['https://api.lux.network'],
    },
  },
  blockExplorers: {
    default: { name: 'LuxScan', url: 'https://explore.lux.network' },
  },
  testnet: false,
})

// Define Lux testnet
export const luxTestnet = defineChain({
  id: 96368,
  name: 'Lux Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Lux',
    symbol: 'LUX',
  },
  rpcUrls: {
    default: {
      http: ['https://api.lux-test.network'],
    },
  },
  blockExplorers: {
    default: { name: 'LuxScan Testnet', url: 'https://explore.lux-test.network' },
  },
  testnet: true,
})

// Define Hanzo chain
export const hanzo = defineChain({
  id: 369363,
  name: 'Hanzo',
  nativeCurrency: {
    decimals: 18,
    name: 'Hanzo',
    symbol: 'HANZO',
  },
  rpcUrls: {
    default: {
      http: ['https://api.hanzo.ai'],
    },
  },
  blockExplorers: {
    default: { name: 'HanzoScan', url: 'https://explore.hanzo.ai' },
  },
  testnet: false,
})

// Define Hanzo testnet
export const hanzoTestnet = defineChain({
  id: 36962,
  name: 'Hanzo Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Hanzo',
    symbol: 'HANZO',
  },
  rpcUrls: {
    default: {
      http: ['https://api.hanzo-test.ai'],
    },
  },
  blockExplorers: {
    default: { name: 'HanzoScan Testnet', url: 'https://explore.hanzo-test.ai' },
  },
  testnet: true,
})

// Define Zoo chain
export const zoo = defineChain({
  id: 200200,
  name: 'Zoo',
  nativeCurrency: {
    decimals: 18,
    name: 'Zoo',
    symbol: 'ZOO',
  },
  rpcUrls: {
    default: {
      http: ['https://api.zoo.ngo'],
    },
  },
  blockExplorers: {
    default: { name: 'ZooScan', url: 'https://explore.zoo.ngo' },
  },
  testnet: false,
})

// Define Zoo testnet
export const zooTestnet = defineChain({
  id: 200201,
  name: 'Zoo Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Zoo',
    symbol: 'ZOO',
  },
  rpcUrls: {
    default: {
      http: ['https://api.zoo-test.ngo'],
    },
  },
  blockExplorers: {
    default: { name: 'ZooScan Testnet', url: 'https://explore.zoo-test.ngo' },
  },
  testnet: true,
})

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const config = createConfig({
  chains: [hanzo, hanzoTestnet, zoo, zooTestnet, lux, luxTestnet, mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Hanzo Store' }),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ],
  transports: {
    [hanzo.id]: http(),
    [hanzoTestnet.id]: http(),
    [zoo.id]: http(),
    [zooTestnet.id]: http(),
    [lux.id]: http(),
    [luxTestnet.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
