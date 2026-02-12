export interface TrendingRepo {
  fullName: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  todayStars: number;
  builtBy: { username: string; avatar: string }[];
  url: string;
}

export interface TrendingDeveloper {
  username: string;
  displayName: string;
  avatar: string;
  popularRepo: { name: string; description: string };
  url: string;
}

export type TimeRange = 'daily' | 'weekly' | 'monthly';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface CachedData<T> {
  data: T;
  timestamp: number;
  key: string;
}
