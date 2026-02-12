[中文](README.md) | [English](README-EN.md)

# GitHub Trending Viewer

一个基于 `WXT + Vue 3 + UnoCSS` 的浏览器扩展，用于浏览 GitHub Trending 仓库和开发者。

当前实现包含两个前端入口：
- `popup`：浏览器工具栏弹窗视图
- `newtab`：新标签页视图

## 功能特性

- 仓库/开发者双视图切换
- 时间范围筛选：`daily` / `weekly` / `monthly`
- 编程语言筛选（内置常见语言列表）
- 仓库收藏（本地持久化）
- 主题模式切换：`system` / `light` / `dark`
- 本地缓存 Trending 数据（30 分钟 TTL）
- 扩展安装时后台预拉取一次每日 Trending 仓库数据

## 技术栈

- `WXT`：浏览器扩展开发框架
- `Vue 3` + `<script setup lang="ts">`
- `TypeScript`
- `UnoCSS` + `@unocss/preset-icons`

## 数据来源与实现说明

- 数据通过请求 `https://github.com/trending` 页面并解析 HTML 获取（非 GitHub 官方 API）。
- 需要的扩展权限：
  - `storage`
  - `https://github.com/*`（`host_permissions`）
- 缓存键按 `类型 + 时间范围 + 语言` 组合生成，例如：
  - `repos:daily:all`
  - `developers:weekly:typescript`

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 本地开发

```bash
# Chrome (默认)
pnpm dev

# Firefox
pnpm dev:firefox
```

### 3. 构建与打包

```bash
# Chrome 构建
pnpm build

# Firefox 构建
pnpm build:firefox

# Chrome 打包 zip
pnpm zip

# Firefox 打包 zip
pnpm zip:firefox
```

### 4. 类型检查

```bash
pnpm compile
```

## 加载扩展（以 Chrome 为例）

1. 运行 `pnpm dev` 或 `pnpm build`
2. 打开 `chrome://extensions`
3. 开启“开发者模式”
4. 点击“加载已解压的扩展程序”
5. 选择 `.output/chrome-mv3-dev`（开发模式）或 `.output/chrome-mv3`（构建产物）

## 项目结构

```text
.
├─ entrypoints/
│  ├─ background.ts        # 后台脚本（安装时预拉取数据）
│  ├─ popup/               # Popup 入口
│  └─ newtab/              # New Tab 入口
├─ components/             # 视图组件（RepoCard/DevCard/FilterBar 等）
├─ composables/            # 业务状态（trending/favorites/theme）
├─ utils/                  # API、HTML 解析、存储、类型、语言列表
├─ public/icon/            # 扩展图标
├─ wxt.config.ts           # WXT 与 manifest 配置
└─ uno.config.ts           # UnoCSS 配置
```

## 已知限制

- 解析依赖 GitHub Trending 页面 DOM 结构，若页面改版可能导致字段解析失败。
- 数据抓取受 GitHub 网络可达性和请求状态影响。
- 缓存默认 30 分钟过期，不会在每次切换时强制重新请求。
