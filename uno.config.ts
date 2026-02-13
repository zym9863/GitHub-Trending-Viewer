import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
    presetIcons({
      scale: 1.2,
    }),
  ],
  shortcuts: {
    btn: 'inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide cursor-pointer transition-all duration-180',
    'btn-primary': 'btn border border-transparent bg-[color:var(--accent)] text-[color:var(--accent-contrast)] hover:opacity-92 hover:-translate-y-0.5',
    'btn-ghost': 'btn border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--text-primary)]',
    card: 'rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--surface)]/95 p-4 shadow-[var(--shadow-soft)] backdrop-blur-sm transition-all duration-200 hover:border-[color:var(--accent)]/45 hover:-translate-y-0.5',
    'text-primary': 'text-[color:var(--text-primary)]',
    'text-secondary': 'text-[color:var(--text-secondary)]',
    'text-muted': 'text-[color:var(--text-muted)]',
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
