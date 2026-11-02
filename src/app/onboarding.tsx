import { useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Field, Segmented } from '@/components/ui/Field';
import { Card, Row, Screen, Stack } from '@/components/ui/Layout';
import { Body, Caption, Heading } from '@/components/ui/Typography';
import { requestPersistentStorage } from '@/lib/platform/persistentStorage';
import { NAME_MAX, validateProfile, type ProfileDraft, type ProfileErrors } from '@/lib/profileForm';
import { usePreferences, type Level, type Units } from '@/stores/preferences';
import { useTheme } from '@/theme/ThemeProvider';
import { fonts } from '@/theme/tokens';

const levels: { value: Level; label: string }[] = [
  { value: 'beginner', label: 'Empiezo' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' },
];

export default function Onboarding() {
  const { colors } = useTheme();
  const units = usePreferences((state) => state.units);
  const setUnits = usePreferences((state) => state.setUnits);
  const completeOnboarding = usePreferences((state) => state.completeOnboarding);

  const [draft, setDraft] = useState<ProfileDraft>({ name: '', height: '', weight: '' });
  const [errors, setErrors] = useState<ProfileErrors>({});

  const update = (patch: Partial<ProfileDraft>) => setDraft((current) => ({ ...current, ...patch }));

  const submit = () => {
    const result = validateProfile(draft, units);
    setErrors(result.errors);
    if (!result.profile) return;
    completeOnboarding(result.profile);
    void requestPersistentStorage();
  };

  return (
    <Screen contentStyle={{ maxWidth: 520 }}>
      <Body style={{ fontFamily: fonts.headingBold, fontSize: 17, color: colors.textPrimary }}>Flash Workouts</Body>

      <Stack gap={3}>
        <Heading level="hero">Antes de empezar</Heading>
        <Body tone="secondary">
          Flash Workouts lee la rutina que te dio tu coach y te dice qué toca hoy, cómo se hace cada ejercicio y cuánto
          llevas. Solo necesitamos tu nombre; lo demás es opcional.
        </Body>
      </Stack>

      <Stack gap={6} role="form" aria-label="Crear perfil">
        <Field
          label="Nombre"
          value={draft.name}
          onChangeText={(name) => update({ name })}
          error={errors.name}
          autoComplete="given-name"
          maxLength={NAME_MAX}
          returnKeyType="next"
        />
        <Segmented<Units>
          label="Unidades de peso"
          options={[
            { value: 'kg', label: 'Kilogramos' },
            { value: 'lb', label: 'Libras' },
          ]}
          value={units}
          onChange={setUnits}
        />
        <Row gap={4} style={{ alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <Field
              label="Estatura (opcional)"
              value={draft.height}
              onChangeText={(height) => update({ height })}
              error={errors.height}
              inputMode="decimal"
              suffix="cm"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Field
              label="Peso (opcional)"
              value={draft.weight}
              onChangeText={(weight) => update({ weight })}
              error={errors.weight}
              inputMode="decimal"
              suffix={units}
            />
          </View>
        </Row>
        <Segmented<Level>
          label="Experiencia en el gimnasio (opcional)"
          options={levels}
          value={draft.level}
          onChange={(level) => update({ level })}
        />
      </Stack>

      <Card elevated>
        <Body>Tus datos se quedan en este dispositivo.</Body>
        <Caption>
          No hay cuentas ni servidores. Si cambias de teléfono o borras los datos del navegador, necesitarás un
          respaldo; la opción de exportarlo llega antes de la versión 1.0.
        </Caption>
        <Caption>
          Las indicaciones de técnica son orientativas y no sustituyen a un médico, fisioterapeuta o entrenador. Si un
          ejercicio te duele, detente.
        </Caption>
      </Card>

      <Button label="Crear mi perfil" onPress={submit} />
    </Screen>
  );
}
