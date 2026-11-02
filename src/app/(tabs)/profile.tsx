import Constants from 'expo-constants';
import { useState } from 'react';
import { Alert, Platform } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Field, Segmented } from '@/components/ui/Field';
import { Card, Screen, Stack } from '@/components/ui/Layout';
import { Body, Caption, Heading } from '@/components/ui/Typography';
import { NAME_MAX } from '@/lib/profileForm';
import { usePreferences, type ThemePreference, type Units } from '@/stores/preferences';

function confirmDestructive(message: string, onConfirm: () => void) {
  if (Platform.OS === 'web') {
    if (window.confirm(message)) onConfirm();
    return;
  }
  Alert.alert('Borrar mis datos', message, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Borrar', style: 'destructive', onPress: onConfirm },
  ]);
}

export default function Profile() {
  const profile = usePreferences((state) => state.profile);
  const theme = usePreferences((state) => state.theme);
  const units = usePreferences((state) => state.units);
  const { setTheme, setUnits, updateProfile } = usePreferences.getState();

  const [name, setName] = useState(profile?.name ?? '');
  const [nameError, setNameError] = useState<string>();
  const [saved, setSaved] = useState(false);

  const trimmed = name.trim().replace(/\s+/g, ' ');
  const nameChanged = trimmed !== profile?.name;

  const saveName = () => {
    if (trimmed === '') {
      setNameError('Escribe tu nombre.');
      return;
    }
    setNameError(undefined);
    updateProfile({ name: trimmed });
    setSaved(true);
  };

  const deleteAll = () =>
    confirmDestructive('Se borrarán tu perfil y tus preferencias de este dispositivo. No se puede deshacer.', () => {
      localStorage.removeItem('flash-workouts:preferences');
      usePreferences.setState({ profile: null, theme: 'system', units: 'kg' });
    });

  return (
    <Screen>
      <Heading level="page">Perfil</Heading>

      <Card>
        <Field
          label="Nombre"
          value={name}
          onChangeText={(value) => {
            setName(value);
            setSaved(false);
          }}
          error={nameError}
          maxLength={NAME_MAX}
          autoComplete="given-name"
          onSubmitEditing={saveName}
        />
        <Button
          label={saved && !nameChanged ? 'Guardado' : 'Guardar nombre'}
          variant="secondary"
          disabled={!nameChanged}
          onPress={saveName}
          style={{ alignSelf: 'flex-start' }}
        />
      </Card>

      <Card>
        <Segmented<ThemePreference>
          label="Tema"
          options={[
            { value: 'system', label: 'Sistema' },
            { value: 'light', label: 'Claro' },
            { value: 'dark', label: 'Oscuro' },
          ]}
          value={theme}
          onChange={setTheme}
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
      </Card>

      <Stack gap={3}>
        <Heading level="section">Tus datos</Heading>
        <Card elevated>
          <Body>Todo se guarda solo en este dispositivo.</Body>
          <Caption>
            Flash Workouts no tiene cuentas, servidores ni analítica. Nadie más ve tu rutina, tus registros ni tus
            fotos. El respaldo exportable llega antes de la versión 1.0.
          </Caption>
        </Card>
        <Button label="Borrar mis datos" variant="outline" icon="trash-outline" onPress={deleteAll} />
      </Stack>

      <Caption>Versión {Constants.expoConfig?.version ?? 'desconocida'}</Caption>
    </Screen>
  );
}
