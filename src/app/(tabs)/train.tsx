import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Layout';
import { Heading } from '@/components/ui/Typography';

export default function Train() {
  return (
    <Screen>
      <Heading level="page">Entrenar</Heading>
      <EmptyState
        title="Carga tu rutina"
        body="Podrás subir el PDF que te dio tu coach o pegar el texto, revisar lo que la app entendió y abrir la ficha de cada ejercicio. Llega en la versión 0.2."
      />
    </Screen>
  );
}
