import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Layout';

export default function NotFound() {
  const router = useRouter();
  return (
    <Screen>
      <EmptyState
        title="Esta página no existe"
        body="El enlace puede estar incompleto o venir de una versión anterior de la app."
        action={<Button label="Volver a Hoy" onPress={() => router.replace('/')} />}
      />
    </Screen>
  );
}
