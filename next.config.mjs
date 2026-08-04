// Plain ESM, not next.config.ts — deliberately. Next loads a TypeScript config
// through the TypeScript compiler API, which makes config LOADING depend on
// which TypeScript is installed; on the native TS 7 compiler that dies before
// anything compiles. As ESM the config is a plain object Next reads natively,
// and the type comes from a JSDoc annotation. `pnpm typecheck` runs tsgo; this
// file is never on either path.

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // @hanzo/gui and the @hanzo/ui components built on it ship untranspiled ESM
  // with react-native module resolution. Next has to compile them and resolve
  // `react-native` to the web implementation — this is the whole browser story
  // for the gui substrate, and it is the same list every Hanzo Next app carries.
  transpilePackages: ['@hanzo/gui', '@hanzo/ui', 'react-native-web'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    }
    // `.web.*` FIRST is what makes the react-native ecosystem resolve its web
    // variants; without it a package resolves its native entry and webpack
    // chokes on React Native's Flow source.
    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      ...(config.resolve.extensions || []),
    ]
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
