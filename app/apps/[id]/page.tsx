'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, Download, Star, Tag, ExternalLink, Github } from 'lucide-react'
import { HanzoLogo } from '@hanzo/logo'
import { Button, Badge, Card, CardContent, CardHeader } from '@hanzo/ui'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { apps } from '../../../lib/apps-data'

export default function AppDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { isConnected } = useAccount()
  
  const app = apps.find(a => a.id === id)
  
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
            <div className="flex flex-wrap gap-2">
              {app.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Long Description */}
            {app.longDescription && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">About</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {app.longDescription}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Installation Instructions */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Installation</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Using Hanzo CLI</h3>
                  <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">hanzo install {app.id}</code>
                  </pre>
                </div>
                {app.packageName && (
                  <div>
                    <h3 className="font-medium mb-2">Manual Installation</h3>
                    <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm">npm install {app.packageName}</code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Usage Example */}
            {app.usageExample && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Usage Example</h2>
                </CardHeader>
                <CardContent>
                  <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">{app.usageExample}</code>
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Install Button */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Button 
                  size="lg" 
                  className="w-full"
                  disabled={!isConnected}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Install in Hanzo
                </Button>
                {!isConnected && (
                  <p className="text-xs text-center text-muted-foreground">
                    Connect wallet to install
                  </p>
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
                  <span className="font-medium">{app.version || '1.0.0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Author</span>
                  <span className="font-medium">{app.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License</span>
                  <span className="font-medium">{app.license || 'MIT'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{app.category}</span>
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Links</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {app.repository && (
                  <a
                    href={app.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                    <span>View Source Code</span>
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                )}
                {app.homepage && (
                  <a
                    href={app.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Homepage</span>
                    <ExternalLink className="h-3 w-3 ml-auto" />
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
