'use client';

import { useState, useMemo, useEffect } from 'react';
import type { StoreData, StoreApp } from '@/types';

export default function StorePage() {
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
      .catch(err => {
        console.error('Failed to load store data:', err);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading store...</div>
      </div>
    );
  }

  if (!storeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Failed to load store data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-2">
            <img src="/hanzo-logo.svg" alt="Hanzo" className="h-8" />
            <h1 className="text-3xl font-bold text-gray-900">Store</h1>
          </div>
          <p className="mt-2 text-gray-600">
            Boost your AI agents with ready-to-go, tailor-made automations for seamless tech integration
          </p>
          <div className="mt-4 flex gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              {storeData.apps.length} Apps
            </span>
            <span>•</span>
            <span>{storeData.categories.length} Categories</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Type Filter */}
          <div className="flex gap-2">
            {['all', 'Agent', 'Tool'].map(type => {
              const count = type === 'all'
                ? storeData.apps.length
                : storeData.apps.filter(app => app.type === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    selectedType === type
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {type === 'all' ? 'All Types' : type} ({count})
                </button>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              All ({storeData.apps.length})
            </button>
            {storeData.categories.map(category => {
              const count = storeData.apps.filter(app => app.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          {filteredApps.length} {filteredApps.length === 1 ? 'app' : 'apps'} found
        </div>

        {/* App Grid */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No apps found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Want to add your MCP server?</p>
            <p className="mt-2">
              Fork the repository and submit a PR with your app's JSON file in{' '}
              <code className="bg-gray-100 px-2 py-1 rounded">data/apps/</code>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AppCard({ app }: { app: StoreApp }) {
  const [copied, setCopied] = useState(false);

  const copyInstallCommand = () => {
    if (app.installCommand) {
      navigator.clipboard.writeText(app.installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`bg-white border rounded-lg p-6 hover:shadow-lg transition-all ${
      app.featured ? 'border-indigo-500 border-2' : 'border-gray-200'
    }`}>
      {app.featured && (
        <div className="mb-2">
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded">
            ⭐ Featured
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{app.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {app.type && (
              <span className="px-2 py-0.5 bg-gray-100 rounded">{app.type}</span>
            )}
            {app.downloads !== undefined && app.downloads > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/>
                </svg>
                {app.downloads.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        {app.icon && (
          <div className="w-16 h-16 flex-shrink-0 ml-4">
            <img src={app.icon} alt={app.name} className="w-full h-full rounded object-cover" />
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2">{app.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {app.tags.map(tag => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span>{app.author}</span>
        {app.license && <span>{app.license}</span>}
      </div>

      {app.installCommand && (
        <div className="relative">
          <button
            onClick={copyInstallCommand}
            className="w-full text-left bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm font-mono overflow-x-auto hover:bg-gray-100 transition-colors"
            title="Click to copy"
          >
            <code>{app.installCommand}</code>
          </button>
          {copied && (
            <span className="absolute right-2 top-2 text-xs text-green-600 font-medium">
              Copied!
            </span>
          )}
        </div>
      )}

      {app.repository && (
        <a
          href={app.repository}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 text-sm"
        >
          View on GitHub
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      )}
    </div>
  );
}
