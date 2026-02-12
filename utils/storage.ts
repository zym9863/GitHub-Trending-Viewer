import { storage } from 'wxt/utils/storage';
import type { CachedData, ThemeMode } from './types';

const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export async function getCachedData<T>(key: string): Promise<T | null> {
  const cached = await storage.getItem<CachedData<T>>(`local:cache:${key}`);
  if (!cached) return null;
  if (Date.now() - cached.timestamp > CACHE_TTL) return null;
  return cached.data;
}

export async function setCachedData<T>(key: string, data: T): Promise<void> {
  const cached: CachedData<T> = {
    data,
    timestamp: Date.now(),
    key,
  };
  await storage.setItem(`local:cache:${key}`, cached);
}

export async function getFavorites(): Promise<string[]> {
  return (await storage.getItem<string[]>('local:favorites')) || [];
}

export async function addFavorite(repoFullName: string): Promise<void> {
  const favorites = await getFavorites();
  if (!favorites.includes(repoFullName)) {
    favorites.push(repoFullName);
    await storage.setItem('local:favorites', favorites);
  }
}

export async function removeFavorite(repoFullName: string): Promise<void> {
  const favorites = await getFavorites();
  await storage.setItem(
    'local:favorites',
    favorites.filter((f) => f !== repoFullName),
  );
}

export async function getTheme(): Promise<ThemeMode> {
  return (await storage.getItem<ThemeMode>('local:theme')) || 'system';
}

export async function setTheme(theme: ThemeMode): Promise<void> {
  await storage.setItem('local:theme', theme);
}

export function watchFavorites(callback: (favorites: string[] | null) => void) {
  return storage.watch<string[]>('local:favorites', callback);
}

export function watchTheme(callback: (theme: ThemeMode | null) => void) {
  return storage.watch<ThemeMode>('local:theme', callback);
}
