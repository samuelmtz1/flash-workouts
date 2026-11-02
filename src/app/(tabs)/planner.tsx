import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Layout';
import { Heading } from '@/components/ui/Typography';

export default function Planner() {
  return (
    <Screen>
      <Heading level="page">Calendario</Heading>
      <EmptyState
        title="Tu mes, día por día"
        body="Cada día que entrenes se marcará aquí, y podrás agregar una foto para ver el mes completo como un mosaico. Llega en la versión 0.4."
      />
    </Screen>
  );
}
