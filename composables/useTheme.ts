import { ref, onMounted, onUnmounted, watch } from 'vue';
import type { ThemeMode } from '@/utils/types';
import { getTheme, setTheme as saveTheme, watchTheme } from '@/utils/storage';

export function useTheme() {
  const theme = ref<ThemeMode>('system');
  let unwatch: (() => void) | undefined;
  let mediaQuery: MediaQueryList | undefined;

  function getEffectiveTheme(): 'light' | 'dark' {
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme.value;
  }

  function applyTheme() {
    const effective = getEffectiveTheme();
    document.documentElement.classList.toggle('dark', effective === 'dark');
  }

  async function toggleTheme() {
    const order: ThemeMode[] = ['system', 'light', 'dark'];
    const currentIndex = order.indexOf(theme.value);
    theme.value = order[(currentIndex + 1) % order.length];
    await saveTheme(theme.value);
    applyTheme();
  }

  function onSystemThemeChange() {
    if (theme.value === 'system') {
      applyTheme();
    }
  }

  watch(theme, () => {
    applyTheme();
  });

  onMounted(async () => {
    theme.value = await getTheme();
    applyTheme();

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', onSystemThemeChange);

    unwatch = watchTheme((newTheme) => {
      if (newTheme) {
        theme.value = newTheme;
      }
    });
  });

  onUnmounted(() => {
    unwatch?.();
    mediaQuery?.removeEventListener('change', onSystemThemeChange);
  });

  return {
    theme,
    getEffectiveTheme,
    toggleTheme,
  };
}
