import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { Text, View } from 'react-native';

import { NavButton } from '@/components/nav/NavButton';
import { useIsDesktop } from '@/components/ui/Layout';
import { useTheme } from '@/theme/ThemeProvider';
import { fonts, layout, space } from '@/theme/tokens';

const sections = [
  { name: 'index', href: '/', label: 'Hoy', icon: 'today-outline', iconActive: 'today' },
  { name: 'train', href: '/train', label: 'Entrenar', icon: 'barbell-outline', iconActive: 'barbell' },
  { name: 'progress', href: '/progress', label: 'Progreso', icon: 'stats-chart-outline', iconActive: 'stats-chart' },
  { name: 'planner', href: '/planner', label: 'Calendario', icon: 'calendar-outline', iconActive: 'calendar' },
  { name: 'profile', href: '/profile', label: 'Perfil', icon: 'person-outline', iconActive: 'person' },
] as const;

// Móvil: barra inferior de 5 secciones. Escritorio (>= 1024 px): barra lateral.
// Es la misma lista de TabTrigger; solo cambia el orden y la dirección.
export default function TabsLayout() {
  const { colors } = useTheme();
  const desktop = useIsDesktop();
  const orientation = desktop ? 'side' : 'bottom';

  const list = (
    <TabList asChild>
      <View
        role="navigation"
        aria-label="Secciones"
        style={
          desktop
            ? {
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: layout.sidebarWidth,
                paddingHorizontal: space[4],
                paddingTop: space[8],
                gap: space[1],
                backgroundColor: colors.surface,
                borderRightWidth: 1,
                borderRightColor: colors.border,
              }
            : {
                flexDirection: 'row',
                minHeight: layout.navHeight,
                paddingHorizontal: space[2],
                paddingTop: space[2],
                // En el iPhone instalado como app, deja libre la barra de inicio.
                paddingBottom: 'max(8px, env(safe-area-inset-bottom))' as unknown as number,
                backgroundColor: colors.surface,
                borderTopWidth: 1,
                borderTopColor: colors.border,
              }
        }
      >
        {desktop ? (
          <Text
            style={{
              fontFamily: fonts.headingBold,
              fontSize: 19,
              color: colors.textPrimary,
              paddingHorizontal: 14,
              marginBottom: space[6],
              letterSpacing: -0.3,
            }}
          >
            Flash Workouts
          </Text>
        ) : null}
        {sections.map((section) => (
          <TabTrigger key={section.name} name={section.name} href={section.href} asChild>
            <NavButton
              label={section.label}
              icon={section.icon}
              iconActive={section.iconActive}
              orientation={orientation}
            />
          </TabTrigger>
        ))}
      </View>
    </TabList>
  );

  return (
    <Tabs style={{ flex: 1, flexDirection: desktop ? 'row' : 'column', backgroundColor: colors.background }}>
      {desktop ? list : null}
      <TabSlot style={{ flex: 1 }} />
      {desktop ? null : list}
    </Tabs>
  );
}
