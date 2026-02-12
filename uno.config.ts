import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
    presetIcons({
      scale: 1.2,
    }),
  ],
  shortcuts: {
    'btn': 'px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200',
    'btn-primary': 'btn bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500',
    'btn-ghost': 'btn bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
    'card': 'rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3',
    'text-primary': 'text-gray-900 dark:text-gray-100',
    'text-secondary': 'text-gray-600 dark:text-gray-400',
    'text-muted': 'text-gray-400 dark:text-gray-500',
  },
  theme: {
    colors: {
      github: {
        bg: '#0d1117',
        surface: '#161b22',
        border: '#30363d',
        text: '#e6edf3',
        muted: '#8b949e',
        accent: '#58a6ff',
      },
    },
  },
});
