'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, Download, Star, Tag, ExternalLink } from 'lucide-react'
import { HanzoLogo } from '@hanzo/logo'
import { Button, Card, CardContent, CardHeader } from '@hanzo/ui'
import { Badge } from '@hanzo/ui/badge'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { sanitizeUrl } from '@/lib/url-utils'
import type { StoreApp } from '@/types'

export function AppDetailPageClient({ id }: { id: string }) {
  const { isConnected } = useAccount()
  const [app, setApp] = useState<StoreApp | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/store.json')
      .then(res => res.json())
      .then(data => {
        const foundApp = data.apps.find((a: StoreApp) => a.id === id)
        setApp(foundApp || null)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-xl text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!app) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <HanzoLogo size={36} className="text-foreground" />
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Store
              </Link>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - App Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* App Header */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                {app.icon ? (
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-secondary flex items-center justify-center">
                    <span className="text-4xl font-bold text-secondary-foreground">
                      {app.name[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                      {app.name}
                    </h1>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {app.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {app.downloads?.toLocaleString()} downloads
                      </span>
                    </div>
                  </div>
                  {app.featured && (
                    <Badge variant="default" className="flex-shrink-0">
                      ⭐ Featured
                    </Badge>
                  )}
                </div>
                <p className="text-foreground">
                  {app.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            {app.tags && app.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {app.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Screenshots */}
            {app.screenshots && app.screenshots.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Screenshots</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {app.screenshots.map((screenshot, i) => (
                      <img
                        key={i}
                        src={screenshot}
                        alt={`Screenshot ${i + 1}`}
                        className="w-full rounded-lg border border-border"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* About */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">About</h2>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 whitespace-pre-wrap">
                  {app.description}
                </p>
              </CardContent>
            </Card>

            {/* Installation */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Installation</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2">Using Hanzo CLI:</h3>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    <code>hanzo install {app.id}</code>
                  </div>
                </div>

                {app.installCommand && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Manual Installation:</h3>
                    <div className="bg-muted p-3 rounded-md font-mono text-sm">
                      <code>{app.installCommand}</code>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Usage */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Usage</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  After installation, you can use this {app.type?.toLowerCase() || 'tool'} with Hanzo AI agents or compatible AI assistants.
                </p>
                {app.mcpConfig && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">MCP Configuration:</h3>
                    <div className="bg-muted p-3 rounded-md font-mono text-xs overflow-x-auto">
                      <pre>{JSON.stringify(app.mcpConfig, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4">
            {/* Install Button */}
            <Card>
              <CardContent className="pt-6">
                {isConnected ? (
                  <Button className="w-full" size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Install
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Connect wallet to install
                    </p>
                    <ConnectButton />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Details</h3>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span className="font-medium">{app.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Author</span>
                  <span className="font-medium">{app.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License</span>
                  <span className="font-medium">{app.license}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{app.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{app.type}</span>
                </div>
                {app.price !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">{app.price === 0 ? 'Free' : `$${app.price}`}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Links</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {app.homepage && sanitizeUrl(app.homepage) && (
                  <a
                    href={sanitizeUrl(app.homepage)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Homepage
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
