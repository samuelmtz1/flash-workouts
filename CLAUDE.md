# CLAUDE.md: Flash Workouts

Contexto para cualquier sesión nueva de Claude en este repo. Léelo completo antes de tocar código. Lee también `AGENTS.md` (reglas de Expo: la API cambia en cada SDK, consulta la documentación de la versión instalada).

## Qué es
PWA para seguir rutinas de gimnasio. Lee una rutina (PDF o texto, sin formato estándar) y muestra qué toca hoy, la ficha de cada ejercicio (mapa muscular, indicaciones y video), un contador por serie con temporizador, un calendario mensual con una foto por día, y métricas y objetivos. La usan Samuel y otras personas, cada quien en su teléfono.

Plan completo y decisiones: `/Users/samuel/.claude/plans/tengo-un-proyecto-de-merry-meadow.md`.

## Reglas no negociables
- **$0** de desarrollo, hosting y mantenimiento. Nada que requiera tarjeta o plan de pago.
- **Local-first:** los datos y las fotos nunca salen del dispositivo. Sin servidor, cuentas, analítica ni cookies.
- **Prohibidos los emojis** en la interfaz, el código, los datos, los commits y la documentación.
- **Sin secretos en el repo** (es público). Ver `docs/SECURITY.md`. Las rutinas reales (PDFs) nunca se suben.
- **Antislop en modo during:** el diseño sigue `docs/DESIGN.md`; cada versión cierra con el Delivery Gate.
- Sin em dash en el texto de la interfaz. Sentence case en botones.

## Cómo trabajar con Samuel
- Habla en **español**. La UI va en español; los nombres de ejercicios en español con el inglés como alias.
- **Claude es el responsable del contenido** (biblioteca de ejercicios, indicaciones, videos). Samuel pide cambios en la conversación; nunca le pidas editar TypeScript.
- El contenido técnico sale de fuentes verificables (NSCA, ExRx, ACE) y se cita en `sources`. Nunca inventes datos.
- Antes de mover algo grande, pregunta. Cada versión cierra con una revisión de Samuel en su teléfono.

## Stack
Expo SDK 58 (web, `web.output: "single"`), Expo Router con pestañas sin estilo propio (`expo-router/ui`), TypeScript strict, react-native-web, react-native-svg, zustand, Jest (`jest-expo/web`). Workbox genera el service worker. Hosting en Cloudflare Workers con archivos estáticos (`wrangler.jsonc`, headers en `public/_headers`). Cada push a `main` despliega solo.

```bash
export PATH="$HOME/.local/node/bin:$PATH"   # Node no está en el PATH por defecto
npm run web          # desarrollo
npm run check        # tipos + lint + tests + secretos
npm run build:web    # dist/ con service worker
npm run audit        # vulnerabilidades altas en dependencias de producción
npx wrangler dev --local-protocol https   # sirve dist/ con los headers reales de Cloudflare
```

## Estructura
- `src/app/`: rutas. `(tabs)/` son las 5 secciones (Hoy, Entrenar, Progreso, Calendario, Perfil).
- `src/components/ui/`: primitivas (Typography, Button, Field, Segmented, Layout, EmptyState, Hatch).
- `src/theme/`: tokens del documento de diseño y `ThemeProvider` (sistema, claro u oscuro).
- `src/stores/preferences.ts`: perfil y preferencias (localStorage). Los datos de entrenamiento irán a IndexedDB (`src/lib/db`, v0.2).
- `src/lib/`: lógica pura con tests en `__tests__/`.
- `docs/`: `DESIGN.md`, `SECURITY.md`. `docs/source/` está en `.gitignore` (material real de Samuel).

## Entorno (Mac de Samuel)
- macOS 13 Intel, sin Homebrew. Node 22 en `~/.local/node` (antepón el PATH de arriba). No hay `gh`.
- El nombre de la carpeta termina en espacio: `gym routine app `. Usa comillas.
- Verificación visual: `playwright-core` en el scratchpad con `chromium.launch({ channel: 'chrome' })`, sirviendo `dist/`. Espera a que carguen las fuentes antes de tomar capturas.

## Roadmap
| Versión | Contenido | Estado |
|---|---|---|
| v0.1 | Base: tokens, fuentes, tema, 5 secciones con barra lateral en escritorio, onboarding, PWA, headers, CI, docs | Construida |
| v0.2 | Modelo de datos, IndexedDB, importación PDF/texto, lector con tests, editor, formato Flash, biblioteca de ~100 ejercicios, mapa muscular, fichas, videos, links de rutina | |
| v0.3 | Pantalla Hoy, modo entreno (contador de series, temporizador por ejercicio, peso opcional, la vez pasada), check-in | |
| v0.4 | Calendario mensual con fotos (sin EXIF), detalle del día, collage | |
| v0.5 | Progreso: peso con promedio de 7 días, medidas y pruebas opcionales, récords, racha | |
| v1.0 | Respaldo `.flash`, accesibilidad, auditoría completa, pulido | |

## Pendientes de Samuel
- Confirmar mayúsculas o sentence case en botones (hoy: sentence case).
- Logo propio (opcional; hoy hay un icono "FW" provisional).
- Aprobar la lista de canales de YouTube (v0.2).
