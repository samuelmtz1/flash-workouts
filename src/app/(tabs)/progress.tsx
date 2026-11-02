import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Layout';
import { Heading } from '@/components/ui/Typography';

export default function Progress() {
  return (
    <Screen>
      <Heading level="page">Progreso</Heading>
      <EmptyState
        title="Sin registros todavía"
        body="Tu peso, tus medidas, tus pruebas y tus récords por ejercicio aparecerán aquí. Todo es opcional. Llega en la versión 0.5."
      />
    </Screen>
  );
}
