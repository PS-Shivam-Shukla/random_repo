/**
 * Design Tokens for Theme System
 */
export const THEME_TOKENS = {
  colors: {
    primary: {
      light: '#4f46e5', // indigo-600
      dark: '#6366f1',  // indigo-500
    },
    background: {
      light: '#f9fafb', // gray-50
      dark: '#0f172a',  // slate-900
    },
    surface: {
      light: '#ffffff',
      dark: '#1e293b',  // slate-800
    },
    text: {
      light: '#111827', // gray-900
      dark: '#f8fafc',  // slate-50
    },
    muted: {
      light: '#6b7280', // gray-500
      dark: '#94a3b8',  // slate-400
    },
    border: {
      light: '#e5e7eb', // gray-200
      dark: '#334155',  // slate-700
    },
  },
  animation: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
