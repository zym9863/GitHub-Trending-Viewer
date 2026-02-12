import { ref, onMounted, onUnmounted } from 'vue';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  watchFavorites,
} from '@/utils/storage';

export function useFavorites() {
  const favorites = ref<Set<string>>(new Set());
  let unwatch: (() => void) | undefined;

  function isFavorite(repoFullName: string): boolean {
    return favorites.value.has(repoFullName);
  }

  async function toggleFavorite(repoFullName: string) {
    if (isFavorite(repoFullName)) {
      await removeFavorite(repoFullName);
      favorites.value = new Set([...favorites.value].filter((f) => f !== repoFullName));
    } else {
      await addFavorite(repoFullName);
      favorites.value = new Set([...favorites.value, repoFullName]);
    }
  }

  onMounted(async () => {
    const stored = await getFavorites();
    favorites.value = new Set(stored);

    unwatch = watchFavorites((newFavorites) => {
      favorites.value = new Set(newFavorites || []);
    });
  });

  onUnmounted(() => {
    unwatch?.();
  });

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
