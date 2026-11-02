import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View, type PressableProps, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';
import { fonts, layout, radius, type } from '@/theme/tokens';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

type Props = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  variant?: Variant;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
};

// Estados web de Pressable (react-native-web agrega hovered). El anillo de foco
// lo pone el CSS global con :focus-visible, para que no aparezca al hacer clic.
type InteractionState = { pressed: boolean; hovered?: boolean };

export function Button({ label, variant = 'primary', icon, disabled, style, ...props }: Props) {
  const { colors } = useTheme();

  const palette = {
    primary: { bg: colors.accent, fg: colors.onAccent, border: colors.accent },
    secondary: { bg: colors.surfaceElevated, fg: colors.textPrimary, border: colors.surfaceElevated },
    outline: { bg: 'transparent', fg: colors.textPrimary, border: colors.accent },
    ghost: { bg: 'transparent', fg: colors.accentText, border: 'transparent' },
  }[variant];

  return (
    <Pressable
      role="button"
      aria-disabled={disabled ?? undefined}
      disabled={disabled}
      style={(state) => {
        const { pressed, hovered } = state as InteractionState;
        return [
          {
            minHeight: layout.inputHeight,
            paddingHorizontal: 20,
            borderRadius: radius.button,
            borderWidth: 1.5,
            borderColor: palette.border,
            backgroundColor: palette.bg,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.45 : pressed ? 0.82 : hovered ? 0.92 : 1,
            transform: [{ scale: pressed && !disabled ? 0.98 : 1 }],
          },
          style,
        ] as ViewStyle[];
      }}
      {...props}
    >
      {icon ? (
        <View aria-hidden>
          <Ionicons name={icon} size={18} color={palette.fg} />
        </View>
      ) : null}
      <Text style={{ fontFamily: fonts.bodyBold, fontSize: type.body, color: palette.fg }}>{label}</Text>
    </Pressable>
  );
}
