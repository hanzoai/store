'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { HanzoLogo } from '@hanzo/logo';
import { Search, Download, ExternalLink, Copy, Check } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Button, Input, Card, CardContent, CardFooter, CardHeader } from '@hanzo/ui';
import { Badge } from '@hanzo/ui/badge';
import { sanitizeUrl } from '@/lib/url-utils';
import type { StoreData, StoreApp } from '@/types';

export default function StorePage() {
  const { address, isConnected } = useAccount();
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load store data
    fetch('/store.json')
      .then(res => res.json())
      .then(data => {
        setStoreData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredApps = useMemo(() => {
    if (!storeData) return [];

    let apps = storeData.apps;

    // Filter by type
    if (selectedType !== 'all') {
      apps = apps.filter(app => app.type === selectedType);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      apps = apps.filter(app => app.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      apps = apps.filter(app =>
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort by downloads (descending) and featured first
    apps.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.downloads || 0) - (a.downloads || 0);
    });

    return apps;
  }, [storeData, searchQuery, selectedCategory, selectedType]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-xl text-muted-foreground">Loading store...</div>
      </div>
    );
  }

  if (!storeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-xl text-destructive">Failed to load store data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <HanzoLogo size={48} className="text-foreground" />
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">Hanzo AI Store</h1>
                <p className="text-sm text-muted-foreground">AI Agent Tools & MCP Servers</p>
              </div>
            </div>
            <ConnectButton />
          </div>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            Boost your AI agents with ready-to-go, tailor-made automations for seamless tech integration
          </p>
          <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{storeData.apps.length}</span> Apps
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{storeData.categories.length}</span> Categories
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 border-border/40 focus:border-border/60"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'Agent', 'Tool'].map(type => {
              const count = type === 'all'
                ? storeData.apps.length
                : storeData.apps.filter(app => app.type === type).length;
              return (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type === 'all' ? 'All Types' : type} ({count})
                </Button>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All ({storeData.apps.length})
            </Button>
            {storeData.categories.map(category => {
              const count = storeData.apps.filter(app => app.category === category).length;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({count})
                </Button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-muted-foreground">
          {filteredApps.length} {filteredApps.length === 1 ? 'app' : 'apps'} found
        </div>

        {/* App Grid */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No apps found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map(app => (
              <AppCard key={app.id} app={app} walletAddress={address} isWalletConnected={isConnected} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border/40 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6">
            <div className="text-center text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Want to add your MCP server?</p>
              <p className="text-sm">
                Fork the repository and submit a PR with your app's JSON file in{' '}
                <code className="bg-muted px-2 py-0.5 rounded text-foreground">data/agents/</code> or{' '}
                <code className="bg-muted px-2 py-0.5 rounded text-foreground">data/tools/</code>
              </p>
            </div>
            <div className="flex justify-center gap-6 text-sm">
              <Link href="/guidelines" className="text-muted-foreground hover:text-foreground transition-colors">
                Guidelines
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AppCard({ app, walletAddress, isWalletConnected }: {
  app: StoreApp;
  walletAddress?: `0x${string}`;
  isWalletConnected: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copyInstallCommand = () => {
    if (app.installCommand) {
      navigator.clipboard.writeText(app.installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const installInHanzo = () => {
    // Open hanzo:// protocol to install the app
    // The desktop app will handle this URL and install the MCP server
    let hanzoUrl = `hanzo://install/${encodeURIComponent(app.id)}?name=${encodeURIComponent(app.name)}&type=${encodeURIComponent(app.type || 'Tool')}`;

    // Add wallet address if connected
    if (isWalletConnected && walletAddress) {
      hanzoUrl += `&wallet=${encodeURIComponent(walletAddress)}`;
    }

    window.location.href = hanzoUrl;
  };

  return (
    <Card className={app.featured ? 'border-primary/50' : 'border-border/40 hover:border-border/60 transition-colors'}>
      <CardHeader>
        {app.featured && (
          <Badge variant="default" className="w-fit mb-3">
            ⭐ Featured
          </Badge>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold mb-2 truncate">{app.name}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {app.type && (
                <Badge variant="secondary">{app.type}</Badge>
              )}
              {app.downloads !== undefined && app.downloads > 0 && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Download className="h-3 w-3" />
                  {app.downloads.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          {app.icon && (
            <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
              <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{app.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {app.tags.slice(0, 4).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {app.tags.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{app.tags.length - 4}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <span>{app.author}</span>
          {app.license && <span>{app.license}</span>}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Link href={`/apps/${app.id}`} className="w-full">
          <Button
            variant="default"
            size="default"
            className="w-full"
          >
            View Details
          </Button>
        </Link>

        <Button
          variant="outline"
          size="default"
          className="w-full"
          onClick={installInHanzo}
        >
          <Download className="h-4 w-4" />
          Install in Hanzo
        </Button>

        {app.installCommand && (
          <Button
            variant="outline"
            size="sm"
            className="w-full font-mono text-xs"
            onClick={copyInstallCommand}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                {app.installCommand.length > 30
                  ? `${app.installCommand.substring(0, 30)}...`
                  : app.installCommand
                }
              </>
            )}
          </Button>
        )}

        {app.repository && sanitizeUrl(app.repository) && (
          <a
            href={sanitizeUrl(app.repository)!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full"
          >
            <ExternalLink className="h-3 w-3" />
            View on GitHub
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
