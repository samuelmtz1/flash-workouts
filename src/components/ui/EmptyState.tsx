import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Hatch } from '@/components/ui/Hatch';
import { Card } from '@/components/ui/Layout';
import { Body, Heading } from '@/components/ui/Typography';
import { useTheme } from '@/theme/ThemeProvider';
import { radius, space } from '@/theme/tokens';

// Pantalla sin datos todavía: dice qué falta y qué hacer, con la trama como
// marca de "pendiente".
export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  const { colors } = useTheme();
  return (
    <Card style={{ padding: 0, overflow: 'hidden', gap: 0 }}>
      <View style={{ height: 72, borderTopLeftRadius: radius.card, borderTopRightRadius: radius.card }}>
        <Hatch width="100%" height={72} color={colors.border} spacing={8} strokeWidth={1.5} />
      </View>
      <View style={{ padding: space[6], gap: space[3] }}>
        <Heading level="section">{title}</Heading>
        <Body tone="secondary">{body}</Body>
        {action ? <View style={{ marginTop: space[2], alignSelf: 'flex-start' }}>{action}</View> : null}
      </View>
    </Card>
  );
}
