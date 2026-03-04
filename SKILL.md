# DAOwidget — Agent Guide

## What is this project

DAOwidget is a WordPress plugin for decentralized governance — allows users to create DAOs, submit proposals, and vote using ERC-20 tokens on EVM chains.

- **Live Demo:** https://farm.wpmix.net/daofactory/
- **Landing:** https://onout.org/dao/
- **Repo:** https://github.com/noxonsu/DAOwidget

## Stack

- **Frontend:** React 17 (CRA + craco), TypeScript, SCSS, web3.js, ethers v5
- **Smart Contracts:** Solidity — governance/DAO contracts on EVM chains
- **WordPress:** PHP plugin (`daofactory.php`), shortcode `[daofactory]`
- **CI/CD:** GitHub Actions → farm.wpmix.net via SCP/SSH
- **Hosting:** farm.wpmix.net (WordPress), updates at `/public_html/updates/`

## Repository structure

```
daofactory.php        — WordPress plugin main file (shortcode, enqueue)
src/                  — React source: components, pages, hooks, contracts
build/                — React production build (output of npm run build)
unminified-build/     — Debug build (UNMINIFIED=true)
inc/                  — WordPress PHP includes
lang/                 — Translation files
templates/            — PHP templates
craco.config.js       — CRA override config (build as WP plugin)
package.json          — Node dependencies + scripts
```

## Build & Deploy

### Build locally

```bash
npm install
npm run build          # production build → build/
npm run build:plugin   # craco build for WP plugin
```

### CI/CD (GitHub Actions)

Workflow: `.github/workflows/deploy-daowidget.yml`

On push to `main`/`master`:
1. Verifies SKILL.md exists
2. Builds React app (`npm run build`)
3. Creates `DAOwidget-v<VERSION>.zip` WordPress plugin package
4. Uploads ZIP + `info.json` to `farm.wpmix.net` via SCP
5. Moves ZIP to `/home/farmFactory/web/farm.wpmix.net/public_html/updates/`

### Update plugin on server manually

```bash
ssh farmFactory@95.217.227.162
# Plugin files at:
ls /home/farmFactory/web/farm.wpmix.net/public_html/wp-content/plugins/DAOwidget/
```

### WordPress integration

Plugin page URL: `https://farm.wpmix.net/daofactory/`
Shortcode: `[daofactory]`
Plugin update endpoint: `https://farm.wpmix.net/updates/DAOwidget-v<VERSION>.zip`

## Common tasks

### Add a new EVM network

1. Edit `src/constants/networks.ts` — add network object with `chainId`, `name`, `rpc`, `explorer`
2. Update `src/constants/contracts.ts` — add DAO contract address for the new chain
3. `npm run build` → CI deploys automatically on push

### Update DAO contract address

Edit `src/constants/contracts.ts`:
```ts
export const DAO_CONTRACTS: Record<number, string> = {
  1: "0x...",      // Ethereum
  56: "0x...",     // BSC
  // add new chain here
}
```

### Update WordPress plugin version

Version is auto-bumped in CI via `sed` in `daofactory.php` header.
Manual: edit `Version: X.X.X` in `daofactory.php`.

## Troubleshooting

### Build fails with "Module not found"

```bash
rm -rf node_modules && npm install
```

### React build memory error

```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Old plugin version on WordPress

CI pushes ZIP to updates server. WordPress auto-update checks `info.json`.
Force update: SSH to server and manually replace plugin files in `/wp-content/plugins/DAOwidget/`.

### Web3 wallet not connecting

Check `src/constants/networks.ts` — verify RPC URLs are active.
Test: open browser console → `window.ethereum.request({method:'eth_chainId'})`.
