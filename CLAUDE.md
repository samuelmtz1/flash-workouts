# CLAUDE.md: Flash Workouts

Contexto para cualquier sesión nueva de Claude en este repo. Léelo completo antes de tocar código. Lee también `AGENTS.md` (reglas de Expo: la API cambia en cada SDK, consulta la documentación de la versión instalada, no la memoria).

## Qué es
PWA para seguir rutinas de gimnasio. Lee una rutina (PDF o texto, sin formato estándar) y muestra qué toca hoy, la ficha de cada ejercicio (mapa muscular, indicaciones y video), un contador por serie con temporizador, un calendario mensual con una foto por día, y métricas y objetivos. La usan Samuel y otras personas, cada quien en su teléfono.

- App: https://flash-workouts.samymartinez01.workers.dev
- Repo (público): https://github.com/samuelmtz1/flash-workouts
- Plan original: `/Users/samuel/.claude/plans/tengo-un-proyecto-de-merry-meadow.md` (solo existe en la Mac de Samuel; las decisiones clave están abajo).

## Reglas no negociables
- **$0** de desarrollo, hosting y mantenimiento. Nada que requiera tarjeta o plan de pago.
- **Local-first:** los datos y las fotos nunca salen del dispositivo. Sin servidor, cuentas, analítica ni cookies.
- **Prohibidos los emojis** en la interfaz, el código, los datos, los commits y la documentación. Para estados usa iconos lineales (Ionicons).
- **Sin secretos en el repo** (es público). Ver `docs/SECURITY.md`. Las rutinas reales (PDFs) nunca se suben; los tests usan versiones anonimizadas.
- **Antislop en modo during:** el diseño sigue `docs/DESIGN.md`; cada versión cierra con el Delivery Gate (reporte PASS/FAIL con evidencia).
- Sin em dash en el texto de la interfaz. Sentence case en botones. Nada de números, testimonios ni contenido inventado.

## Cómo trabajar con Samuel
- Habla en **español**. La UI va en español; los nombres de ejercicios en español con el inglés como alias.
- Le gustan las decisiones en rondas numeradas con una recomendación cada una; responde "si" para aceptar.
- **Claude es el responsable del contenido** (biblioteca de ejercicios, indicaciones, videos). Samuel pide cambios en la conversación; nunca le pidas editar TypeScript.
- El contenido técnico sale de fuentes verificables (NSCA, ExRx, ACE) y se cita en `sources`.
- Antes de mover algo grande, pregunta. Cada versión cierra con una revisión de Samuel en su teléfono.

## Decisiones de producto cerradas
- **Usuarios:** cada persona en su teléfono. Las rutinas se comparten por link (fragmento `#` comprimido) o archivo. Sin panel de coach en v1.
- **Importación:** PDF (pdf.js en el navegador) o texto pegado, un lector local por reglas y un editor de revisión con lo dudoso en ámbar. Plan B: "Copiar instrucciones para tu IA", que devuelve el formato Flash (texto simple, `docs/IMPORT-FORMAT.md`).
- **Modelo:** calendario por rotación (Día 1..N) o semanal con fecha de inicio; fases/bloques con prescripción propia y descargas; módulos reutilizables (M1–M3); bloques de cardio. Biblioteca, rutina (plantilla) y sesión (ejecución) son entidades separadas.
- **"Etapa x3" (rutina Hydrax):** series seguidas por ejercicio; las biseries "A - B" se alternan por ronda; cualquier bloque se puede marcar como circuito.
- **Entreno:** contador **por serie** ("Serie 1 de 3", un toque = una serie), temporizador de descanso por ejercicio con ±15 s que recuerda el valor, cuenta regresiva en ejercicios por tiempo, peso opcional con "La vez pasada". Check-in omitible en una sola hoja: dolor (semáforo con icono de forma distinta, color y texto), sueño, ánimo y nota.
- **Ficha:** mapa muscular SVG propio (primario relleno, secundario con trama), fotos de free-exercise-db (dominio público) en duotono, 3–4 indicaciones, errores comunes, video curado en `youtube-nocookie.com` (los canales los aprueba Samuel).
- **Progreso:** peso con promedio de 7 días; medidas y pruebas **opcionales**; récords automáticos; racha semanal. Sin nutrición. Insignias y PIN/cifrado quedan para después de v1.
- **Calendario:** vista mensual con miniatura de la foto del día (recomprimida y sin EXIF/GPS) y collage del mes.
- **Imágenes:** sin fotos de stock; las únicas fotos editoriales son las del usuario.
- **Salud:** nota "orientativo" en onboarding y fichas; un rojo en el check-in muestra el criterio de detenerse y consultar.

## Stack
Expo SDK 58 (web, `web.output: "single"`), Expo Router con pestañas sin estilo propio (`expo-router/ui`), TypeScript strict con `noUncheckedIndexedAccess`, react-native-web, react-native-svg, zustand, Jest (`jest-expo/web`). Workbox genera el service worker después del export.

```bash
export PATH="$HOME/.local/node/bin:$PATH"   # Node no está en el PATH por defecto
npm run web          # desarrollo
npm run check        # tipos + lint + tests + secretos (correr antes de cada commit)
npm run build:web    # dist/ con service worker
npm run audit        # vulnerabilidades altas en dependencias de producción
npx wrangler dev --local-protocol https   # sirve dist/ con los headers reales de Cloudflare
npx expo install <paquete>                # siempre así, no npm install (versiones del SDK)
```

## Estructura
- `src/app/`: rutas. `(tabs)/` son las 5 secciones (Hoy, Entrenar, Progreso, Calendario, Perfil); `planner.tsx` es Calendario. `onboarding.tsx` y `+not-found.tsx` fuera de las pestañas.
- `src/components/ui/`: primitivas (Typography, Button, Field, Segmented, Layout, EmptyState, Hatch). `src/components/nav/NavButton.tsx`: botón de la navegación.
- `src/theme/`: `tokens.ts` (colores, fuentes, escala, espaciado) y `ThemeProvider` (sistema, claro u oscuro; en web también pinta el fondo del documento y `--focus-ring`).
- `src/stores/preferences.ts`: perfil y preferencias en localStorage. Los datos de entrenamiento y las fotos irán a IndexedDB (`src/lib/db`, v0.2).
- `src/lib/`: lógica pura con tests en `__tests__/` (importa `describe/it/expect` de `@jest/globals`).
- `public/`: `index.html` propio, `_headers`, `manifest.json`, `register-sw.js`, iconos.
- `docs/`: `DESIGN.md`, `SECURITY.md`. `docs/source/` está en `.gitignore` (material real de Samuel).

## Despliegue
- **Cloudflare Workers con archivos estáticos** (no Pages). Worker `flash-workouts`, conectado a GitHub con Workers Builds: cada push a `main` despliega solo.
- Build command `npm run build:web`, deploy command `npx wrangler deploy`. `wrangler.jsonc` sirve `dist/` como SPA; `.node-version` fija Node 22.
- `public/_headers` se copia a `dist/` y Cloudflare lo aplica (CSP, HSTS, X-Frame-Options, etc.). Verificado en producción el 2026-11-02.

## Git y dependencias
- Rama `main`; ramas `release/x.y.z` para cada versión desde la v0.2, con tag `vx.y.z` al cerrarla.
- El hook `.githooks/pre-commit` corre secretlint y bloquea PDFs, `docs/source/` y `.env`. En un clon nuevo actívalo con `git config core.hooksPath .githooks`.
- CI en GitHub: `ci.yml` (check, audit, build, gitleaks) y `codeql.yml`. No hay `gh`: los PRs se fusionan con `git merge --no-ff` de la rama remota y push a `main` (GitHub los marca como fusionados). Borrar ramas remotas requiere permiso explícito.
- Dependabot ignora los saltos mayores de npm: Expo fija TypeScript, ESLint y React Native por SDK. Los saltos mayores se hacen al actualizar el SDK con `npx expo install --fix`.

## Lecciones técnicas (no repetir)
- **Hidratación de zustand:** con localStorage rehidrata de forma síncrona dentro de `create()`. No uses `onRehydrateStorage` para tocar el store; usa `usePreferencesHydrated()` (`persist.hasHydrated` y `onFinishHydration`).
- **`TabList` con `asChild`** aplica por defecto `flexDirection: 'row'` y `justifyContent: 'space-between'`. Fija ambos en la barra lateral.
- **Tamaño del build:** importa cada fuente por peso (`@expo-google-fonts/sora/700Bold`) e Ionicons como `@expo/vector-icons/Ionicons`. Importar los paquetes completos empaqueta todas las fuentes (el precache pasó de 9 MB a 2.4 MB).
- **Foco:** el anillo es CSS `:focus-visible` en `public/index.html`, no el estado `focused` de Pressable (aparece también con clic).
- **Contraste:** en modo claro usa los tokens `*Text` (`accentText`, `warningText`, etc.) para texto; el champagne `#B18B48` solo en rellenos con texto oscuro encima.
- **Pruebas locales de headers:** la CSP incluye `upgrade-insecure-requests`, así que sobre `http://` Chrome intenta cargar recursos por HTTPS y fallan. Prueba con `wrangler dev --local-protocol https` e `ignoreHTTPSErrors`. Con `curl -I` sin headers de navegación (`Sec-Fetch-Mode: navigate`), las rutas SPA parecen no tener CSP: es un falso negativo.

## Entorno (Mac de Samuel)
- macOS 13 Intel, sin Homebrew. Node 22 en `~/.local/node` (antepón el PATH de arriba). No hay `gh`; `git push` usa la credencial de GitHub ya guardada.
- El nombre de la carpeta termina en espacio: `gym routine app `. Usa comillas.
- Verificación visual: `playwright-core` en el scratchpad con `chromium.launch({ channel: 'chrome' })`. Espera a que carguen las fuentes (por ejemplo, `getByText('Antes de empezar').waitFor()`) antes de tomar capturas; si no, salen en blanco.
- Para que Samuel la vea en su teléfono sin desplegar: servir `dist/` en el puerto 8787 y abrir `http://<IP de la Mac>:8787` en la misma red Wi-Fi.

## Estado actual
- **v0.1.0 publicada** (2026-11-02, tag `v0.1.0`): tokens y fuentes del documento de diseño con ajustes de contraste AA, tema sistema/claro/oscuro, 5 secciones (barra inferior en móvil, lateral desde 1024 px) con estados vacíos honestos, onboarding (solo el nombre es obligatorio), perfil (nombre, tema, unidades, borrar datos), PWA instalable y offline, headers de seguridad, CI, CodeQL, Dependabot y secretlint.
- Después del tag: fusionados los PRs de Dependabot (acciones de CI y Expo dentro del SDK 58), despliegue en Cloudflare Workers y documentación.

## Roadmap
| Versión | Contenido | Estado |
|---|---|---|
| v0.1 | Base: tokens, fuentes, tema, 5 secciones con barra lateral en escritorio, onboarding, PWA, headers, CI, docs | Publicada (2026-11-02), falta revisión de Samuel en el teléfono |
| v0.2 | Modelo de datos, IndexedDB, importación PDF/texto, lector con tests, editor, formato Flash más instrucciones para IA, biblioteca de ~100 ejercicios, mapa muscular, fichas, videos (abrir `frame-src` a youtube-nocookie), links de rutina, rutina demo | Siguiente |
| v0.3 | Pantalla Hoy, modo entreno (contador de series, temporizador por ejercicio, peso opcional, la vez pasada), check-in | |
| v0.4 | Calendario mensual con fotos (sin EXIF), detalle del día, collage | |
| v0.5 | Progreso: peso con promedio de 7 días, medidas y pruebas opcionales, récords, racha | |
| v1.0 | Respaldo `.flash` y avisos, accesibilidad, auditoría completa (seguridad, Delivery Gate, web-interface-guidelines), pulido | |

## Pendientes de Samuel
- Revisar la v0.1 en su teléfono (instalada con "Añadir a pantalla de inicio").
- Confirmar mayúsculas o sentence case en botones (hoy: sentence case).
- Logo propio (opcional; hoy hay un icono "FW" provisional).
- Aprobar la lista de canales de YouTube (al arrancar la v0.2).
