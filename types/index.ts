export interface StoreApp {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  repository?: string;
  homepage?: string;
  license?: string;
  category: string;
  tags: string[];
  icon?: string;
  screenshots?: string[];
  installCommand?: string;
  mcpConfig?: {
    command?: string;
    args?: string[];
    env?: Record<string, string>;
  };
  readme?: string;
  changelog?: string;
  rating?: number;
  downloads?: number;
  createdAt: string;
  updatedAt: string;
  // Hanzo-specific fields
  type?: string; // Agent, Tool, etc.
  toolLanguage?: string | null;
  operatingSystem?: string[];
  runner?: string;
  featured?: boolean;
  price?: number;
}

export interface StoreData {
  apps: StoreApp[];
  categories: string[];
  version: string;
  lastUpdated: string;
}
