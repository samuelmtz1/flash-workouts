import { useId, useState } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';

import { Caption, Label } from '@/components/ui/Typography';
import { useTheme } from '@/theme/ThemeProvider';
import { fonts, layout, radius, space, type } from '@/theme/tokens';

type FieldProps = TextInputProps & {
  label: string;
  hint?: string;
  error?: string;
  suffix?: string;
};

export function Field({ label, hint, error, suffix, style, ...props }: FieldProps) {
  const { colors } = useTheme();
  const id = useId();
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ gap: space[2] }}>
      <Label nativeID={`${id}-label`} tone="primary">
        {label}
      </Label>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: layout.inputHeight,
          borderRadius: radius.button,
          borderWidth: 1.5,
          borderColor: error ? colors.error : focused ? colors.accent : colors.border,
          backgroundColor: colors.surface,
          paddingHorizontal: space[4],
        }}
      >
        <TextInput
          aria-labelledby={`${id}-label`}
          aria-invalid={error ? true : undefined}
          placeholderTextColor={colors.textSecondary}
          onFocus={(event) => {
            setFocused(true);
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            props.onBlur?.(event);
          }}
          style={[
            {
              flex: 1,
              minHeight: layout.inputHeight - 4,
              fontFamily: fonts.body,
              fontSize: 16,
              color: colors.textPrimary,
            },
            { outlineStyle: 'none' } as object,
            style,
          ]}
          {...props}
        />
        {suffix ? (
          <Text style={{ fontFamily: fonts.metric, fontSize: type.caption, color: colors.textSecondary }}>
            {suffix}
          </Text>
        ) : null}
      </View>
      {error ? <Caption tone="error">{error}</Caption> : hint ? <Caption>{hint}</Caption> : null}
    </View>
  );
}

type Option<T extends string> = { value: T; label: string };

// Grupo de opciones excluyentes (tema, unidades, nivel).
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option<T>[];
  value: T | undefined;
  onChange: (value: T) => void;
}) {
  const { colors } = useTheme();
  const id = useId();

  return (
    <View style={{ gap: space[2] }}>
      <Label nativeID={`${id}-label`} tone="primary">
        {label}
      </Label>
      <View
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        style={{
          flexDirection: 'row',
          padding: 4,
          gap: 4,
          borderRadius: radius.button,
          backgroundColor: colors.surfaceElevated,
        }}
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.value}
              role="radio"
              aria-checked={selected}
              onPress={() => onChange(option.value)}
              style={(state) => {
                const { hovered } = state as { hovered?: boolean };
                return [
                  {
                    flex: 1,
                    minHeight: layout.tapTarget,
                    borderRadius: radius.button - 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: space[2],
                    backgroundColor: selected ? colors.surface : hovered ? colors.border : 'transparent',
                    borderWidth: 1,
                    borderColor: selected ? colors.accent : 'transparent',
                    cursor: 'pointer',
                  },
                ] as object[];
              }}
            >
              <Text
                style={{
                  fontFamily: selected ? fonts.bodyBold : fonts.bodyMedium,
                  fontSize: type.caption + 1,
                  color: selected ? colors.textPrimary : colors.textSecondary,
                }}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
