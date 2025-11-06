import { AppDetailPageClient } from './page-client'
import type { StoreApp } from '@/types'

// Generate static params for all apps at build time
export async function generateStaticParams() {
  try {
    // Read store.json from public directory at build time
    const fs = await import('fs')
    const path = await import('path')
    const storeDataPath = path.join(process.cwd(), 'public', 'store.json')
    const storeDataContent = fs.readFileSync(storeDataPath, 'utf-8')
    const storeData = JSON.parse(storeDataContent)

    return storeData.apps.map((app: StoreApp) => ({
      id: app.id,
    }))
  } catch {
    return []
  }
}

export default async function AppDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <AppDetailPageClient id={id} />
}
