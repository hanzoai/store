'use client'

import { useState, useMemo, useEffect } from 'react'
import { HanzoLogo } from '@hanzo/logo'
import { Search, Download, ExternalLink, Copy, Check } from 'lucide-react'
import { useAccount } from 'wagmi'
import { XStack, YStack, Text } from '@hanzo/gui'
import { Badge, Button, Card, CardContent, CardFooter, CardHeader, Input } from '@hanzo/ui'
import { AppIcon } from '@/components/app-icon'
import { LinkButton } from '@/components/link-button'
import { TopBar, SiteFooter } from '@/components/site-chrome'
import { installUrl } from '@/lib/install-url'
import { sanitizeUrl } from '@/lib/url-utils'
import type { StoreData, StoreApp } from '@/types'

const TYPES = ['Agent', 'Tool']

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
        <Text fontSize="$6" color={loading ? '$color11' : '$red10'}>
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

          <Facet
            field="type"
            values={TYPES}
            allLabel="All Types"
            selected={selectedType}
            onSelect={setSelectedType}
            apps={storeData.apps}
          />

          <Facet
            field="category"
            values={storeData.categories}
            allLabel="All"
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            apps={storeData.apps}
          />
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
          {/* `<code>` rather than a gui font prop: the config declares two
              families, body and heading, so `fontFamily="$mono"` names a token
              that does not exist and resolves to nothing at all. theme.css
              typesets `code` in Geist Mono, which is where mono actually lives. */}
          <Text fontSize="$2" color="$color11">
            Fork the repository and submit a PR with your app&apos;s JSON file in{' '}
            <code>data/agents/</code> or <code>data/tools/</code>
          </Text>
        </YStack>
      </SiteFooter>
    </div>
  )
}

/**
 * One row of filter buttons.
 *
 * The type row and the category row were the same twenty lines twice over — a
 * wrapping row of buttons, each labelled with a value and how many apps carry
 * it, one of them selected. They differ only in which field they read, so they
 * are one component reading a field.
 *
 * The label is built as ONE string rather than as JSX children. Written as
 * children, the newline and indent around the parentheses fold into text, and
 * every button read "All Types ( 202 )" — the spacing bug you cannot see in the
 * source because it is the source's own whitespace.
 */
function Facet({
  field,
  values,
  allLabel,
  selected,
  onSelect,
  apps,
}: {
  field: 'type' | 'category'
  values: readonly string[]
  allLabel: string
  selected: string
  onSelect: (value: string) => void
  apps: StoreApp[]
}) {
  return (
    <XStack gap="$2" flexWrap="wrap">
      {['all', ...values].map((value) => (
        <Button
          key={value}
          variant={selected === value ? 'default' : 'outline'}
          size="sm"
          onPress={() => onSelect(value)}
        >
          {`${value === 'all' ? allLabel : value} (${
            value === 'all' ? apps.length : apps.filter((app) => app[field] === value).length
          })`}
        </Button>
      ))}
    </XStack>
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

  const repository = app.repository ? sanitizeUrl(app.repository) : null

  return (
    // No `height="100%"`: `.cards` is a grid, and a grid stretches its items to
    // the row by default, so the height is already stated — by the one rule that
    // owns the layout. Saying it twice is how the two can disagree.
    <Card borderColor={app.featured ? '$color8' : '$borderColor'}>
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
          <AppIcon app={app} />
        </XStack>
      </CardHeader>

      {/* `grow`, NOT `flex`. `flex={1}` is React Native's spelling and it
          compiles to `flex: 1 1 0px` — a ZERO basis. The card is a column whose
          height comes from its own content, so a zero-basis body contributed
          nothing, the card sized itself from header plus footer alone, and the
          body collapsed to 0px: every description vanished, every tag row and
          byline spilled out of the box and painted under the buttons, and 202
          cards rendered that way with no error anywhere. `grow={1}` leaves the
          basis at `auto`, so the body is as tall as its text and then takes the
          slack the grid's stretch hands the card — which is what pins every
          footer to the same line. */}
      <CardContent gap="$4" grow={1}>
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
        <LinkButton width="100%" href={`/apps/${app.id}`}>
          View Details
        </LinkButton>

        <LinkButton
          width="100%"
          variant="outline"
          href={installUrl(app, isWalletConnected ? walletAddress : undefined)}
        >
          <Download size={16} />
          Install in Hanzo
        </LinkButton>

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
          <LinkButton width="100%" variant="ghost" size="sm" href={repository} newTab>
            <ExternalLink size={12} />
            View on GitHub
          </LinkButton>
        ) : null}
      </CardFooter>
    </Card>
  )
}
