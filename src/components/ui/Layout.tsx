import type { ReactNode } from 'react';
import { ScrollView, View, useWindowDimensions, type ViewProps, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';
import { layout, radius, space } from '@/theme/tokens';

export function useIsDesktop() {
  return useWindowDimensions().width >= layout.sidebarBreakpoint;
}

// Contenedor de cada pantalla: scroll, ancho máximo y márgenes laterales
// del documento (20 px en móvil, 32 px en escritorio).
export function Screen({ children, contentStyle }: { children: ReactNode; contentStyle?: ViewStyle }) {
  const { colors } = useTheme();
  const desktop = useIsDesktop();
  const side = desktop ? layout.sidePaddingDesktop : layout.sidePaddingMobile;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingHorizontal: side,
        paddingTop: desktop ? space[10] : space[6],
        paddingBottom: space[10],
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View role="main" style={[{ width: '100%', maxWidth: 760, alignSelf: 'center', gap: space[6] }, contentStyle]}>
        {children}
      </View>
    </ScrollView>
  );
}

export function Card({ style, elevated = false, ...props }: ViewProps & { elevated?: boolean }) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: elevated ? colors.surfaceElevated : colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: radius.card,
          padding: space[4] + 2,
          gap: space[3],
        },
        style,
      ]}
      {...props}
    />
  );
}

export function Stack({ gap = 3, style, ...props }: ViewProps & { gap?: keyof typeof space }) {
  return <View style={[{ gap: space[gap] }, style]} {...props} />;
}

export function Row({ gap = 3, style, ...props }: ViewProps & { gap?: keyof typeof space }) {
  return <View style={[{ flexDirection: 'row', alignItems: 'center', gap: space[gap] }, style]} {...props} />;
}
