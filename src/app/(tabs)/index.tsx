import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen, Stack } from '@/components/ui/Layout';
import { Caption, Heading } from '@/components/ui/Typography';
import { usePreferences } from '@/stores/preferences';

const dateFormat = new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });

// "lunes, 2 de noviembre" -> "Lunes, 2 de noviembre" (en español solo la primera letra).
function formatToday(date: Date) {
  const text = dateFormat.format(date);
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function Today() {
  const router = useRouter();
  const name = usePreferences((state) => state.profile?.name ?? '');
  const today = formatToday(new Date());

  return (
    <Screen>
      <Stack gap={1}>
        <Caption>{today}</Caption>
        <Heading level="page">Hola, {name}</Heading>
      </Stack>
      <EmptyState
        title="Todavía no tienes una rutina"
        body="Cuando cargues tu rutina, aquí verás la sesión de hoy con lo que toca, cuántas series y un botón para empezar."
        action={<Button label="Ir a Entrenar" variant="outline" onPress={() => router.navigate('/train')} />}
      />
    </Screen>
  );
}
