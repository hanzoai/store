'use client'

/**
 * One app, in full.
 *
 * Same two vocabularies as the rest of the store: @hanzo/gui style props for
 * everything inside a card, plain CSS in globals.css for everything that
 * positions the page. The two-column split, the hero icon and the code blocks
 * are page furniture, so they are CSS; the stacks, type and tokens are gui.
 */
import { useEffect, useState, type ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { Download, ExternalLink, Star, Tag } from 'lucide-react'
import { useAccount } from 'wagmi'
import { Text, XStack, YStack } from '@hanzo/gui'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@hanzo/ui'
import { SiteFooter, StoreMark, TopBar } from '@/components/site-chrome'
import { installUrl } from '@/lib/install-url'
import { sanitizeUrl } from '@/lib/url-utils'
import type { StoreApp } from '@/types'

export function AppDetailPageClient({ id }: { id: string }) {
  const { address, isConnected } = useAccount()
  const [app, setApp] = useState<StoreApp | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/store.json')
      .then((res) => res.json())
      .then((data: { apps: StoreApp[] }) => setApp(data.apps.find((a) => a.id === id) ?? null))
      .catch(() => setApp(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <YStack minH="100vh" items="center" justify="center">
        <Text fontSize="$6" color="$color11">
          Loading…
        </Text>
      </YStack>
    )
  }

  if (!app) notFound()

  const homepage = app.homepage ? sanitizeUrl(app.homepage) : null
  const repository = app.repository ? sanitizeUrl(app.repository) : null

  return (
    <div className="page">
      <TopBar brand={<StoreMark />} />

      <main className="container main">
        <div className="detail">
          <YStack gap="$5">
            <XStack gap="$5" items="flex-start" flexWrap="wrap">
              {app.icon ? (
                <img className="app-icon lg" src={app.icon} alt={app.name} />
              ) : (
                <div className="app-icon lg fallback">{app.name[0]}</div>
              )}

              <YStack flex={1} minW={0} gap="$3">
                <Text render="h1" fontSize="$10" fontWeight="700">
                  {app.name}
                </Text>

                <XStack items="center" gap="$4" flexWrap="wrap">
                  {app.type ? (
                    <XStack items="center" gap="$1.5">
                      <Tag size={12} />
                      <Text fontSize="$2" color="$color11">
                        {app.type}
                      </Text>
                    </XStack>
                  ) : null}
                  {app.downloads ? (
                    <XStack items="center" gap="$1.5">
                      <Star size={12} />
                      <Text fontSize="$2" color="$color11">
                        {app.downloads.toLocaleString()} downloads
                      </Text>
                    </XStack>
                  ) : null}
                  {app.featured ? <Badge variant="default">⭐ Featured</Badge> : null}
                </XStack>

                <Text fontSize="$4" color="$color11">
                  {app.description}
                </Text>

                {app.tags.length ? (
                  <XStack gap="$1.5" flexWrap="wrap">
                    {app.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </XStack>
                ) : null}
              </YStack>
            </XStack>

            {app.screenshots?.length ? (
              <Panel title="Screenshots">
                <YStack gap="$4">
                  {app.screenshots.map((src, i) => (
                    <img
                      key={src}
                      className="shot"
                      src={src}
                      alt={`${app.name} screenshot ${i + 1}`}
                    />
                  ))}
                </YStack>
              </Panel>
            ) : null}

            <Panel title="Installation">
              <YStack gap="$4">
                <YStack gap="$2">
                  <Text fontSize="$2" fontWeight="600">
                    Using the Hanzo CLI
                  </Text>
                  <pre className="code">
                    <code>hanzo install {app.id}</code>
                  </pre>
                </YStack>

                {app.installCommand ? (
                  <YStack gap="$2">
                    <Text fontSize="$2" fontWeight="600">
                      Manual installation
                    </Text>
                    <pre className="code">
                      <code>{app.installCommand}</code>
                    </pre>
                  </YStack>
                ) : null}
              </YStack>
            </Panel>

            <Panel title="Usage">
              <YStack gap="$4">
                <Text fontSize="$3" color="$color11">
                  After installation this {app.type?.toLowerCase() || 'tool'} is available to Hanzo
                  AI agents and any compatible assistant.
                </Text>
                {app.mcpConfig ? (
                  <YStack gap="$2">
                    <Text fontSize="$2" fontWeight="600">
                      MCP configuration
                    </Text>
                    <pre className="code">
                      <code>{JSON.stringify(app.mcpConfig, null, 2)}</code>
                    </pre>
                  </YStack>
                ) : null}
              </YStack>
            </Panel>
          </YStack>

          <YStack gap="$4">
            <Card>
              <CardContent gap="$3">
                <Button size="lg" asChild>
                  <a href={installUrl(app, isConnected ? address : undefined)}>
                    <Download size={16} />
                    Open in Hanzo Desktop
                  </a>
                </Button>
                <Text fontSize="$1" color="$color11" text="center">
                  Requires the Hanzo Desktop app
                </Text>
              </CardContent>
            </Card>

            <Panel title="Details">
              <YStack gap="$3">
                <Row label="Version" value={app.version} />
                <Row label="Author" value={app.author} />
                <Row label="License" value={app.license} />
                <Row label="Category" value={app.category} />
                <Row label="Type" value={app.type} />
                <Row
                  label="Price"
                  value={
                    app.price === undefined ? undefined : app.price === 0 ? 'Free' : `$${app.price}`
                  }
                />
              </YStack>
            </Panel>

            {homepage || repository ? (
              <Panel title="Links">
                <YStack gap="$2" items="flex-start">
                  {homepage ? <LinkOut href={homepage}>Homepage</LinkOut> : null}
                  {repository ? <LinkOut href={repository}>Source</LinkOut> : null}
                </YStack>
              </Panel>
            ) : null}
          </YStack>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

/** A titled card — every block on this page is one. */
function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle render="h2" size="$6">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

/** One line of the metadata table; absent facts render nothing at all. */
function Row({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === '') return null
  return (
    <XStack justify="space-between" gap="$4">
      <Text fontSize="$2" color="$color11">
        {label}
      </Text>
      <Text fontSize="$2" fontWeight="500">
        {value}
      </Text>
    </XStack>
  )
}

function LinkOut({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button variant="ghost" size="sm" asChild>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <ExternalLink size={12} />
        {children}
      </a>
    </Button>
  )
}
