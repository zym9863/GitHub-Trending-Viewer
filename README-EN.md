[Chinese](README.md) | [English](README-EN.md)

# GitHub Trending Viewer

A browser extension built with `WXT + Vue 3 + UnoCSS` for browsing GitHub Trending repositories and developers.

This project currently has two UI entry points:
- `popup`: toolbar popup view
- `trending`: full-page view (opened manually, does not override browser new tab)

## Features

- Repositories/Developers tab switch
- Time range filter: `daily` / `weekly` / `monthly`
- Programming language filter (built-in common language list)
- Repository favorites (persisted locally)
- Theme mode switch: `system` / `light` / `dark`
- Local cache for trending data (30-minute TTL)
- One-time prefetch of daily trending repositories on extension install

## Tech Stack

- `WXT`: browser extension framework
- `Vue 3` + `<script setup lang="ts">`
- `TypeScript`
- `UnoCSS` + `@unocss/preset-icons`

## Data Source and Implementation Notes

- Data is fetched from `https://github.com/trending` and parsed from HTML (not an official GitHub API).
- Required extension permissions:
  - `storage`
  - `contextMenus`
  - `https://github.com/*` (`host_permissions`)
- Cache keys are built from `type + time range + language`, for example:
  - `repos:daily:all`
  - `developers:weekly:typescript`

## Quick Start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start local development

```bash
# Chrome (default)
pnpm dev

# Firefox
pnpm dev:firefox
```

### 3. Build and package

```bash
# Chrome build
pnpm build

# Firefox build
pnpm build:firefox

# Chrome zip package
pnpm zip

# Firefox zip package
pnpm zip:firefox
```

### 4. Type check

```bash
pnpm compile
```

## Load the Extension (Chrome Example)

1. Run `pnpm dev` or `pnpm build`
2. Open `chrome://extensions`
3. Enable Developer mode
4. Click "Load unpacked"
5. Select `.output/chrome-mv3-dev` (dev) or `.output/chrome-mv3` (build)

## Open the Full-Page View

- Keyboard shortcut: press `Alt+G` (customizable in `chrome://extensions/shortcuts`)
- Extension menu: right-click the extension action and click `Open GitHub Trending Page`
- Popup button: click `Open Full Page`

## Project Structure

```text
.
|-- entrypoints/
|   |-- background.ts        # Background script (prefetch on install)
|   |-- popup/               # Popup entry
|   `-- trending/            # Full-page entry
|-- components/              # UI components (RepoCard/DevCard/FilterBar, etc.)
|-- composables/             # State logic (trending/favorites/theme)
|-- utils/                   # API, HTML parser, storage, types, languages
|-- public/icon/             # Extension icons
|-- wxt.config.ts            # WXT and manifest config
`-- uno.config.ts            # UnoCSS config
```

## Known Limitations

- Parsing depends on GitHub Trending page DOM structure; page changes may break parsing.
- Data fetching is affected by GitHub network availability and response status.
- Cache expires in 30 minutes and is not force-refreshed on every tab/filter switch.
