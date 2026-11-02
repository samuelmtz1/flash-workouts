import { Text, type TextProps, type TextStyle } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';
import { fonts, type } from '@/theme/tokens';

type Tone = 'primary' | 'secondary' | 'accent' | 'warning' | 'error' | 'success';

type Props = TextProps & { tone?: Tone };

function useToneColor(tone: Tone) {
  const { colors } = useTheme();
  return {
    primary: colors.textPrimary,
    secondary: colors.textSecondary,
    accent: colors.accentText,
    warning: colors.warningText,
    error: colors.errorText,
    success: colors.successText,
  }[tone];
}

const headingStyles: Record<'hero' | 'page' | 'section' | 'card', TextStyle> = {
  hero: { fontFamily: fonts.headingBold, fontSize: type.hero, lineHeight: 40, letterSpacing: -0.6 },
  page: { fontFamily: fonts.heading, fontSize: type.pageTitle, lineHeight: 34, letterSpacing: -0.4 },
  section: { fontFamily: fonts.heading, fontSize: type.sectionTitle, lineHeight: 28 },
  card: { fontFamily: fonts.bodyBold, fontSize: type.cardTitle, lineHeight: 24 },
};

const headingLevel = { hero: 1, page: 1, section: 2, card: 3 } as const;

export function Heading({
  level = 'page',
  tone = 'primary',
  style,
  ...props
}: Props & { level?: keyof typeof headingStyles }) {
  const color = useToneColor(tone);
  return (
    <Text role="heading" aria-level={headingLevel[level]} style={[headingStyles[level], { color }, style]} {...props} />
  );
}

export function Body({ tone = 'primary', style, ...props }: Props) {
  const color = useToneColor(tone);
  return <Text style={[{ fontFamily: fonts.body, fontSize: type.body, lineHeight: 23, color }, style]} {...props} />;
}

export function Caption({ tone = 'secondary', style, ...props }: Props) {
  const color = useToneColor(tone);
  return (
    <Text style={[{ fontFamily: fonts.bodyMedium, fontSize: type.caption, lineHeight: 19, color }, style]} {...props} />
  );
}

export function Label({ tone = 'secondary', style, ...props }: Props) {
  const color = useToneColor(tone);
  return (
    <Text
      style={[{ fontFamily: fonts.bodySemibold, fontSize: type.small + 1, lineHeight: 16, color }, style]}
      {...props}
    />
  );
}

// Números de entrenamiento: pesos, tiempos, series. Plex Mono por sus cifras
// tabulares, que no bailan cuando el temporizador cambia.
export function Metric({
  tone = 'primary',
  size = 'regular',
  style,
  ...props
}: Props & { size?: 'regular' | 'large' }) {
  const color = useToneColor(tone);
  const fontSize = size === 'large' ? type.metricLarge : type.metric;
  return (
    <Text
      style={[
        {
          fontFamily: fonts.metric,
          fontSize,
          lineHeight: Math.round(fontSize * 1.15),
          color,
          fontVariant: ['tabular-nums'],
        },
        style,
      ]}
      {...props}
    />
  );
}
