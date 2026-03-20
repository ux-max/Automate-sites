import { create } from 'zustand';

export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    heading: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: string;
  spacing: {
    section: string;
    element: string;
  };
}

interface ThemeState {
  themes: ThemeConfig[];
  activeThemeId: string;
  getActiveTheme: () => ThemeConfig;
  setActiveTheme: (themeId: string) => void;
  updateTheme: (themeId: string, updates: Partial<ThemeConfig>) => void;
}

const defaultThemes: ThemeConfig[] = [
  {
    id: 'modern',
    name: 'Modern',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      heading: '#0f172a',
      border: '#e2e8f0',
    },
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    borderRadius: '12px',
    spacing: { section: '80px 32px', element: '16px' },
  },
  {
    id: 'corporate',
    name: 'Corporate',
    colors: {
      primary: '#1e40af',
      secondary: '#374151',
      accent: '#d97706',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
      textSecondary: '#6b7280',
      heading: '#030712',
      border: '#d1d5db',
    },
    fonts: { heading: 'Georgia, serif', body: 'Arial, sans-serif' },
    borderRadius: '4px',
    spacing: { section: '64px 48px', element: '12px' },
  },
  {
    id: 'creative',
    name: 'Creative',
    colors: {
      primary: '#ec4899',
      secondary: '#f97316',
      accent: '#a855f7',
      background: '#faf5ff',
      surface: '#fef3c7',
      text: '#1c1917',
      textSecondary: '#78716c',
      heading: '#0c0a09',
      border: '#e7e5e4',
    },
    fonts: { heading: 'Outfit, sans-serif', body: 'Inter, sans-serif' },
    borderRadius: '16px',
    spacing: { section: '80px 24px', element: '20px' },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    colors: {
      primary: '#18181b',
      secondary: '#71717a',
      accent: '#18181b',
      background: '#ffffff',
      surface: '#fafafa',
      text: '#27272a',
      textSecondary: '#a1a1aa',
      heading: '#09090b',
      border: '#e4e4e7',
    },
    fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
    borderRadius: '2px',
    spacing: { section: '96px 64px', element: '24px' },
  },
  {
    id: 'bold',
    name: 'Bold',
    colors: {
      primary: '#dc2626',
      secondary: '#fbbf24',
      accent: '#059669',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      heading: '#ffffff',
      border: '#334155',
    },
    fonts: { heading: 'Outfit, sans-serif', body: 'Inter, sans-serif' },
    borderRadius: '8px',
    spacing: { section: '80px 32px', element: '16px' },
  },
];

export const useThemeStore = create<ThemeState>((set, get) => ({
  themes: defaultThemes,
  activeThemeId: 'modern',
  
  getActiveTheme: () => {
    const state = get();
    return state.themes.find(t => t.id === state.activeThemeId) || state.themes[0];
  },
  
  setActiveTheme: (themeId) => set({ activeThemeId: themeId }),
  
  updateTheme: (themeId, updates) => {
    set(state => ({
      themes: state.themes.map(t => t.id === themeId ? { ...t, ...updates } : t),
    }));
  },
}));
