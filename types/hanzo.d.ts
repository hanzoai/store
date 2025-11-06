declare module '@hanzo/ui' {
  export * from '@hanzo/ui/dist/index'
}

declare module '@hanzo/ui/badge' {
  export const Badge: any
}

declare module '@hanzo/logo/react' {
  import React from 'react'
  export interface HanzoLogoProps {
    variant?: 'color' | 'mono' | 'white'
    size?: number | string
    className?: string
    style?: React.CSSProperties
  }
  export const HanzoLogo: React.FC<HanzoLogoProps>
}
