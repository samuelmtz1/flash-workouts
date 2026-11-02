import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { Platform, useColorScheme } from 'react-native';

import { usePreferences } from '@/stores/preferences';
import { themes, type Colors, type ThemeName } from '@/theme/tokens';

type ThemeContextValue = { name: ThemeName; colors: Colors };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const preference = usePreferences((state) => state.theme);
  const system = useColorScheme();
  const name: ThemeName = preference === 'system' ? (system === 'dark' ? 'dark' : 'light') : preference;

  const value = useMemo(() => ({ name, colors: themes[name] }), [name]);

  // En web, el fondo del documento y los controles nativos siguen al tema
  // para que no aparezca un destello blanco al cargar o al hacer scroll.
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const root = document.documentElement;
    root.style.colorScheme = name;
    root.style.backgroundColor = value.colors.background;
    root.style.setProperty('--focus-ring', value.colors.textPrimary);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value.colors.background);
  }, [name, value.colors.background, value.colors.textPrimary]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme necesita ThemeProvider');
  return value;
}
