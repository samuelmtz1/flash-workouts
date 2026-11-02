// Tokens del documento de diseño Premium Fitness (docs/DESIGN.md).
// Los valores *Text son ajustes de contraste para texto en modo claro: el
// documento exige WCAG AA y los originales no llegan a 4.5:1 sobre el fondo.

export type ThemeName = 'light' | 'dark';

export type Colors = {
  background: string;
  surface: string;
  surfaceElevated: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentSoft: string;
  accentText: string;
  onAccent: string;
  border: string;
  success: string;
  successText: string;
  warning: string;
  warningText: string;
  error: string;
  errorText: string;
};

export const themes: Record<ThemeName, Colors> = {
  light: {
    background: '#F5F1E8',
    surface: '#FFFFFF',
    surfaceElevated: '#F0EDE5',
    textPrimary: '#171717',
    textSecondary: '#6B675F', // documento: #77736C (4.18:1 sobre el fondo)
    accent: '#B18B48',
    accentSoft: '#E9DCC0',
    accentText: '#7F612F', // el acento como texto: 5.10:1
    onAccent: '#111111',
    border: '#E4DED2',
    success: '#52765C',
    successText: '#4A6B53',
    warning: '#A66B28',
    warningText: '#8F5A1E',
    error: '#A64B45',
    errorText: '#93433D',
  },
  dark: {
    background: '#111111',
    surface: '#1C1C1C',
    surfaceElevated: '#252525',
    textPrimary: '#F5F1E8',
    textSecondary: '#A5A5A5',
    accent: '#D6B878',
    accentSoft: '#403722',
    accentText: '#D6B878',
    onAccent: '#111111',
    border: '#343434',
    success: '#8DBB8D',
    successText: '#8DBB8D',
    warning: '#E2AE60',
    warningText: '#E2AE60',
    error: '#E17B73',
    errorText: '#E17B73',
  },
};

export const fonts = {
  heading: 'Sora_600SemiBold',
  headingBold: 'Sora_700Bold',
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_500Medium',
  bodySemibold: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
  metric: 'IBMPlexMono_500Medium',
} as const;

// Escala de la sección 3 del documento, en px.
export const type = {
  hero: 34,
  pageTitle: 28,
  sectionTitle: 21,
  cardTitle: 17,
  body: 15,
  caption: 13,
  small: 11,
  metric: 28,
  metricLarge: 56,
} as const;

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32, 10: 40 } as const;

export const radius = { button: 12, card: 16, modal: 20 } as const;

export const layout = {
  inputHeight: 50,
  navHeight: 72,
  tapTarget: 44,
  maxWidth: 1200,
  sidePaddingMobile: 20,
  sidePaddingDesktop: 32,
  sidebarBreakpoint: 1024,
  sidebarWidth: 232,
} as const;

export const motion = { fast: 150, base: 200, slow: 250 } as const;
