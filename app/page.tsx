'use client';

import { useState, useMemo, useEffect } from 'react';
import type { StoreData, StoreApp } from '@/types';

export default function StorePage() {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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

    return apps;
  }, [storeData, searchQuery, selectedCategory]);

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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Hanzo Store</h1>
          <p className="mt-2 text-gray-600">
            Discover and install MCP servers for Hanzo Desktop
          </p>
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
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{app.name}</h3>
          <p className="text-sm text-gray-600">{app.version}</p>
        </div>
        {app.icon && (
          <div className="w-12 h-12 flex-shrink-0 ml-4">
            <img src={app.icon} alt={app.name} className="w-full h-full rounded" />
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{app.description}</p>

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
