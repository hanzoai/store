'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { HanzoLogo } from '@hanzo/logo'
import { Search, Download, ExternalLink, Copy, Check } from 'lucide-react'
import { useAccount } from 'wagmi'
import { XStack, YStack, Text } from '@hanzo/gui'
import { Badge, Button, Card, CardContent, CardFooter, CardHeader, Input } from '@hanzo/ui'
import { TopBar, SiteFooter } from '@/components/site-chrome'
import { sanitizeUrl } from '@/lib/url-utils'
import type { StoreData, StoreApp } from '@/types'

const TYPES = ['all', 'Agent', 'Tool'] as const

export default function StorePage() {
  const { address, isConnected } = useAccount()
  const [storeData, setStoreData] = useState<StoreData | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/store.json')
      .then((res) => res.json())
      .then((data) => {
        setStoreData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filteredApps = useMemo(() => {
    if (!storeData) return []

    const query = searchQuery.trim().toLowerCase()
    const apps = storeData.apps.filter(
      (app) =>
        (selectedType === 'all' || app.type === selectedType) &&
        (selectedCategory === 'all' || app.category === selectedCategory) &&
        (!query ||
          app.name.toLowerCase().includes(query) ||
          app.description.toLowerCase().includes(query) ||
          app.tags.some((tag) => tag.toLowerCase().includes(query))),
    )

    // Featured first, then by reach. `filter` already returned a fresh array, so
    // this sorts a copy rather than the store's own list.
    return apps.sort(
      (a, b) => Number(!!b.featured) - Number(!!a.featured) || (b.downloads || 0) - (a.downloads || 0),
    )
  }, [storeData, searchQuery, selectedCategory, selectedType])

  if (loading || !storeData) {
    return (
      <YStack minH="100vh" items="center" justify="center">
        <Text fontSize="$6" color={storeData || loading ? '$color11' : '$red10'}>
          {loading ? 'Loading store…' : 'Failed to load store data'}
        </Text>
      </YStack>
    )
  }

  return (
    <div className="page">
      <TopBar
        brand={
          <>
            <HanzoLogo size={48} />
            <YStack>
              <Text fontSize="$8" fontWeight="600">
                Hanzo AI Store
              </Text>
              <Text fontSize="$2" color="$color11">
                AI Agent Tools &amp; MCP Servers
              </Text>
            </YStack>
          </>
        }
      >
        <YStack gap="$3" pb="$6">
          <Text fontSize="$3" color="$color11" maxW={640}>
            Boost your AI agents with ready-to-go, tailor-made automations for seamless tech
            integration
          </Text>
          <XStack gap="$3" items="center">
            <Text fontSize="$3" color="$color11">
              <Text fontWeight="600" color="$color12">
                {storeData.apps.length}
              </Text>{' '}
              Apps
            </Text>
            <Text color="$color11">•</Text>
            <Text fontSize="$3" color="$color11">
              <Text fontWeight="600" color="$color12">
                {storeData.categories.length}
              </Text>{' '}
              Categories
            </Text>
          </XStack>
        </YStack>
      </TopBar>

      <main className="container main">
        <YStack gap="$4" pb="$6">
          <Input
            placeholder="Search apps…"
            value={searchQuery}
            onChangeText={setSearchQuery}
            startAdornment={<Search size={16} />}
          />

          <XStack gap="$2" flexWrap="wrap">
            {TYPES.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                size="sm"
                onPress={() => setSelectedType(type)}
              >
                {type === 'all' ? 'All Types' : type} (
                {type === 'all'
                  ? storeData.apps.length
                  : storeData.apps.filter((app) => app.type === type).length}
                )
              </Button>
            ))}
          </XStack>

          <XStack gap="$2" flexWrap="wrap">
            {['all', ...storeData.categories].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onPress={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All' : category} (
                {category === 'all'
                  ? storeData.apps.length
                  : storeData.apps.filter((app) => app.category === category).length}
                )
              </Button>
            ))}
          </XStack>
        </YStack>

        <Text fontSize="$3" color="$color11">
          {filteredApps.length} {filteredApps.length === 1 ? 'app' : 'apps'} found
        </Text>

        {filteredApps.length === 0 ? (
          <YStack items="center" py="$10">
            <Text fontSize="$5" color="$color11">
              No apps found matching your criteria
            </Text>
          </YStack>
        ) : (
          <div className="cards">
            {filteredApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                walletAddress={address}
                isWalletConnected={isConnected}
              />
            ))}
          </div>
        )}
      </main>

      <SiteFooter>
        <YStack items="center" gap="$1" pb="$5">
          <Text fontWeight="500" color="$color12">
            Want to add your MCP server?
          </Text>
          <Text fontSize="$2" color="$color11">
            Fork the repository and submit a PR with your app&apos;s JSON file in{' '}
            <Text fontFamily="$mono">data/agents/</Text> or{' '}
            <Text fontFamily="$mono">data/tools/</Text>
          </Text>
        </YStack>
      </SiteFooter>
    </div>
  )
}

function AppCard({
  app,
  walletAddress,
  isWalletConnected,
}: {
  app: StoreApp
  walletAddress?: `0x${string}`
  isWalletConnected: boolean
}) {
  const [copied, setCopied] = useState(false)

  const copyInstallCommand = () => {
    if (!app.installCommand) return
    navigator.clipboard.writeText(app.installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // The desktop app handles `hanzo://` and performs the install. A connected
  // wallet rides along so it knows who is installing.
  const installInHanzo = () => {
    const params = new URLSearchParams({ name: app.name, type: app.type || 'Tool' })
    if (isWalletConnected && walletAddress) params.set('wallet', walletAddress)
    window.location.href = `hanzo://install/${encodeURIComponent(app.id)}?${params}`
  }

  const repository = app.repository ? sanitizeUrl(app.repository) : null

  return (
    <Card height="100%" borderColor={app.featured ? '$color8' : '$borderColor'}>
      <CardHeader gap="$3">
        {app.featured ? <Badge variant="default">⭐ Featured</Badge> : null}

        <XStack width="100%" items="flex-start" justify="space-between" gap="$4">
          <YStack flex={1} minW={0} gap="$2">
            <Text fontSize="$6" fontWeight="600" numberOfLines={1}>
              {app.name}
            </Text>
            <XStack items="center" gap="$2" flexWrap="wrap">
              {app.type ? <Badge variant="secondary">{app.type}</Badge> : null}
              {app.downloads ? (
                <XStack items="center" gap="$1">
                  <Download size={12} />
                  <Text fontSize="$2" color="$color11">
                    {app.downloads.toLocaleString()}
                  </Text>
                </XStack>
              ) : null}
            </XStack>
          </YStack>
          {app.icon ? <img className="app-icon" src={app.icon} alt={app.name} /> : null}
        </XStack>
      </CardHeader>

      <CardContent gap="$4" flex={1}>
        <Text fontSize="$3" color="$color11" numberOfLines={3}>
          {app.description}
        </Text>

        <XStack gap="$1.5" flexWrap="wrap">
          {app.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
          {app.tags.length > 4 ? <Badge variant="outline">+{app.tags.length - 4}</Badge> : null}
        </XStack>

        <XStack
          justify="space-between"
          pt="$3"
          borderTopWidth={1}
          borderColor="$borderColor"
          gap="$2"
        >
          <Text fontSize="$1" color="$color11">
            {app.author}
          </Text>
          {app.license ? (
            <Text fontSize="$1" color="$color11">
              {app.license}
            </Text>
          ) : null}
        </XStack>
      </CardContent>

      <CardFooter flexDirection="column" gap="$2">
        <Button width="100%" asChild>
          <Link href={`/apps/${app.id}`}>View Details</Link>
        </Button>

        <Button width="100%" variant="outline" onPress={installInHanzo}>
          <Download size={16} />
          Install in Hanzo
        </Button>

        {app.installCommand ? (
          <Button width="100%" variant="outline" size="sm" onPress={copyInstallCommand}>
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied
              ? 'Copied!'
              : app.installCommand.length > 30
                ? `${app.installCommand.slice(0, 30)}…`
                : app.installCommand}
          </Button>
        ) : null}

        {repository ? (
          <Button width="100%" variant="ghost" size="sm" asChild>
            <a href={repository} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={12} />
              View on GitHub
            </a>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}
