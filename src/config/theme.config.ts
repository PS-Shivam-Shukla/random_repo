/**
 * Theme default settings and configurations.
 */
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  defaultTheme: ThemeMode;
  storageKey: string;
  accentColor: string;
}

export const themeConfig: ThemeConfig = {
  defaultTheme: 'dark',
  storageKey: 'interviewsage_theme_preference',
  accentColor: 'indigo',
};
