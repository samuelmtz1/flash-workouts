import Ionicons from '@expo/vector-icons/Ionicons';
import type { TabTriggerSlotProps } from 'expo-router/ui';
import type { ComponentRef, Ref } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';
import { fonts, layout, radius, type } from '@/theme/tokens';

// El tipo de ref de TabTriggerSlotProps no coincide con el de Pressable en
// RN 0.88; se declara el de Pressable, que es el elemento que lo recibe.
type Props = Omit<TabTriggerSlotProps, 'ref'> & {
  ref?: Ref<ComponentRef<typeof Pressable>>;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
  orientation: 'bottom' | 'side';
};

// Activo: icono relleno + texto en negrita + acento. La forma del icono
// cambia además del color, para no depender solo del color.
export function NavButton({ label, icon, iconActive, orientation, isFocused, ...props }: Props) {
  const { colors } = useTheme();
  const side = orientation === 'side';
  const tint = isFocused ? colors.accentText : colors.textSecondary;

  return (
    <Pressable
      {...props}
      aria-current={isFocused ? 'page' : undefined}
      style={(state) => {
        const { hovered, pressed } = state as { hovered?: boolean; pressed: boolean };
        return [
          side
            ? {
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                minHeight: 46,
                paddingHorizontal: 14,
                borderRadius: radius.button,
                backgroundColor: isFocused ? colors.accentSoft : hovered ? colors.surfaceElevated : 'transparent',
              }
            : {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                minHeight: layout.tapTarget + 8,
                borderRadius: radius.button,
                backgroundColor: hovered ? colors.surfaceElevated : 'transparent',
              },
          { cursor: 'pointer', opacity: pressed ? 0.75 : 1 },
        ] as object[];
      }}
    >
      <View aria-hidden>
        <Ionicons name={isFocused ? iconActive : icon} size={side ? 20 : 22} color={tint} />
      </View>
      <Text
        style={{
          fontFamily: isFocused ? fonts.bodyBold : fonts.bodyMedium,
          fontSize: side ? type.body : type.small,
          color: side && isFocused ? colors.textPrimary : tint,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
