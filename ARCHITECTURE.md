# Hanzo Tool Registry Architecture

## Overview

The Hanzo ecosystem uses a three-layer architecture for tool/agent identity, distribution, and verification:

1. **Identity Layer** (On-chain) - Source of truth for ownership
2. **Code Layer** (GitHub) - Source of truth for code
3. **Distribution Layer** (Desktop App) - Verification and installation

```
┌─────────────────────────────────────────────────────┐
│  Layer 1: Identity (Hanzo/Lux/Zoo Blockchains)     │
│  Contract: HanzoToolRegistry.sol                   │
│  - Tool ownership via Hanzo identities             │
│  - Metadata: repository, path, version, codeHash   │
│  - On-chain verification                           │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  Layer 2: Code (GitHub)                            │
│  Repository: github.com/hanzoai/tools              │
│  - Source code storage                             │
│  - Version control                                 │
│  - Collaboration & CI/CD                           │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  Layer 3: Distribution (Desktop App)               │
│  - Resolves: @hanzo/tool-name → NFT → GitHub      │
│  - Verifies: codeHash matches                      │
│  - Installs: Tool/agent locally                    │
└─────────────────────────────────────────────────────┘
```

## Naming Convention

### Tool Names (npm-style)

```
Format: @<namespace>/<tool-name>[@version][#ref]

Examples:
  @hanzo/audio-insight              # Latest version
  @hanzo/audio-insight@1.0.0        # Specific version
  @hanzo/audio-insight#v1.0.0       # Git tag
  @alice/my-agent                   # Community tool
  @acme/enterprise-tool             # Organization tool
```

### Identity Format

```
Format: @@<name>.<network>

Examples:
  @@official.hanzo                  # Official Hanzo identity
  @@alice.hanzo                     # User identity on Hanzo
  @@acme.lux                        # Organization on Lux
```

### DID Resolution

```
Tool Name: @hanzo/audio-insight
     ↓
DID: did:hanzo:official/audio-insight
     ↓
NFT: #12345 on HanzoToolRegistry
     ↓
Metadata: {
  name: "@hanzo/audio-insight",
  identity: "@@official.hanzo",
  repository: "github.com/hanzoai/tools",
  path: "/agents/audio-insight",
  version: "1.0.0",
  codeHash: "abc123...",
  ...
}
     ↓
GitHub: github.com/hanzoai/tools/tree/abc123/agents/audio-insight
```

## Smart Contract: HanzoToolRegistry

### Key Features

- **Tool Registration**: Link tools to Hanzo identities
- **Metadata Storage**: Repository, path, version, code hash
- **Ownership**: Only identity owners can register/update tools
- **Transfer**: Move tools between identities
- **Verification**: Code hash validation for security

### On-Chain Data Structure

```solidity
struct ToolMetadata {
    string name;              // @hanzo/audio-insight
    string identity;          // @@official.hanzo
    string repository;        // github.com/hanzoai/tools
    string path;              // /agents/audio-insight
    string version;           // 1.0.0
    string license;           // MIT
    string category;          // Education
    string description;       // Tool description
    string codeHash;          // git commit SHA or IPFS hash
    string[] tags;            // ["audio", "analysis"]
    string mcpCommand;        // MCP command
    string[] mcpArgs;         // MCP arguments
    bool active;              // Published/deprecated status
    uint256 createdAt;        // Registration timestamp
    uint256 updatedAt;        // Last update timestamp
}
```

## Store Data Format

### Current Structure (store.json)

```json
{
  "id": "audio-insight",
  "name": "Audio Insight",
  "homepage": "@hanzo/audio-insight",
  "repository": "github.com/hanzoai/tools",
  "path": "/agents/audio-insight",
  "version": "1.0.0",
  "author": "hanzo.ai",
  "license": "MIT",
  "category": "Education",
  "tags": [],
  "type": "Agent",
  "mcpConfig": {
    "command": "any",
    "args": ["@hanzo/audio-insight"],
    "env": {}
  }
}
```

### Future: On-Chain Integration

```json
{
  "homepage": "@hanzo/audio-insight",
  "did": "did:hanzo:official/audio-insight",
  "nftId": "12345",
  "identity": "@@official.hanzo",
  "repository": "github.com/hanzoai/tools",
  "path": "/agents/audio-insight",
  "codeHash": "sha256:abc123...",
  "verified": true
}
```

## Deep Linking

### Current Implementation

```
URL: hanzo://config?tool=@hanzo/audio-insight
  ↓
Desktop App:
  1. Opens configuration page for tool
  2. User can install/configure
```

### Future: Verified Installation

```
URL: hanzo://install/@hanzo/audio-insight
  ↓
Desktop App:
  1. Resolves on-chain: @hanzo/audio-insight → NFT metadata
  2. Fetches from GitHub: repository + path + codeHash
  3. Verifies: SHA256(code) === codeHash
  4. Installs if verified
  5. Records install on-chain
```

## Developer Workflow

### Publishing a Tool

```bash
# 1. Develop tool
cd ~/my-tools/my-agent
# ... write code ...

# 2. Push to GitHub
git add . && git commit -m "Initial release"
git tag v1.0.0
git push origin main --tags

# 3. Register on-chain (future CLI)
hanzo registry publish \
  --name @alice/my-agent \
  --identity @@alice.hanzo \
  --repo github.com/alice/my-tools \
  --path /my-agent \
  --version 1.0.0 \
  --commit $(git rev-parse HEAD)

# Output:
# ✅ Registered tool on-chain
# 📦 Name: @alice/my-agent
# 🔑 Identity: @@alice.hanzo
# 🔗 DID: did:hanzo:alice/my-agent
# 🌐 Published to: store.hanzo.ai/apps/my-agent
```

### Updating a Tool

```bash
# 1. Make changes
git add . && git commit -m "v1.1.0 - new features"
git tag v1.1.0
git push origin main --tags

# 2. Update on-chain
hanzo registry update \
  --name @alice/my-agent \
  --version 1.1.0 \
  --commit $(git rev-parse HEAD)
```

## Migration Path

### Phase 1 (Current) ✅
- npm-style naming: `@hanzo/audio-insight`
- GitHub repository: `github.com/hanzoai/tools`
- Path structure: `/agents/{id}` or `/tools/{id}`
- Deep linking: `hanzo://config?tool=@hanzo/audio-insight`

### Phase 2 (Next)
- Deploy HanzoToolRegistry contract
- Register official tools on-chain
- Add code hash verification
- Update desktop app for on-chain resolution

### Phase 3 (Future)
- Community tool registration
- IPFS backup for code
- Decentralized package manager
- On-chain governance for official tools
- Tool staking and reputation system

## Security Considerations

### Code Verification
- All code matched against on-chain hash
- GitHub as primary source, IPFS as backup
- Multi-sig for official tool updates
- Audit trail for all changes

### Identity Security
- NFT-based ownership
- Only identity owners can register tools
- Transfer mechanism for tool ownership
- Staking requirements prevent spam

### Trust Model
- Official tools: Verified by Hanzo AI (@hanzo/*)
- Community tools: Reputation-based
- Enterprise tools: Organization-verified
- Code audits: Optional third-party verification

## Related Repositories

- **hanzo-store**: Web UI and data generation
  - `/Users/z/work/shinkai/hanzo-store`
  - https://github.com/hanzoai/store

- **hanzo/identity**: Smart contracts and identity system
  - `/Users/z/work/hanzo/identity`
  - HanzoRegistry.sol - User identity management
  - HanzoToolRegistry.sol - Tool/agent linking

- **hanzoai/tools**: Official tools and agents
  - https://github.com/hanzoai/tools
  - Source code for all @hanzo/* tools

- **hanzo-desktop**: Desktop application
  - `/Users/z/work/shinkai/hanzo-desktop`
  - Deep linking and verification

## Next Steps

1. **Deploy HanzoToolRegistry** to testnets
2. **Register official tools** on-chain
3. **Update desktop app** for verification
4. **Create CLI tool** for community publishing
5. **Build governance** for official tools
6. **Implement IPFS** backup system
7. **Add reputation** and staking system
