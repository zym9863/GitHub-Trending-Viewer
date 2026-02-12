import { defineConfig } from 'wxt';
import UnoCSS from 'unocss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  vite: () => ({
    plugins: [UnoCSS()],
  }),
  manifest: {
    name: 'GitHub Trending Viewer',
    description: 'Browse GitHub trending repositories and developers',
    permissions: ['storage', 'contextMenus'],
    host_permissions: ['https://github.com/*'],
    commands: {
      'open-trending-page': {
        description: 'Open GitHub Trending full page',
        suggested_key: {
          default: 'Alt+G',
        },
      },
    },
  },
});
