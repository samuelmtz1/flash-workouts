# Sistema de diseño: Premium Fitness

Transcripción del documento de dirección visual de Samuel ("Design System, Premium Fitness"). Es la fuente de verdad del diseño. Los cambios respecto al documento están en la sección "Ajustes aplicados", cada uno con su motivo.

## Idea central

Entrena con intención. Mide tu progreso. Construye tu rendimiento.

Identidad de *premium performance*: sofisticada, profesional y moderna, pero accesible para alguien que apenas empieza en el gimnasio. Ni agresiva (rojo, negro, efectos) ni clínica. Concepto de marca: una herramienta personal de rendimiento, no un contador de repeticiones.

| Característica | Dirección |
|---|---|
| Personalidad | Premium, disciplinada, inteligente |
| Estética | Minimalismo deportivo |
| Sensación | Exclusividad sin intimidar |
| Formas | Esquinas suaves y geometría limpia |
| Iconografía | Lineal, sencilla y consistente |
| Fotografía | Alto contraste, deportiva editorial |
| Animaciones | Sutiles, rápidas y funcionales |
| Densidad visual | Espacios amplios, información organizada |

## Color

Base de carbón, marfil y champagne gold. El dorado es acento de identidad, no domina. Se reserva para elementos destacados, progreso, indicadores y acciones principales. El fondo nunca compite con el contenido.

Paleta: Obsidian `#111111`, Graphite `#252525`, Champagne `#D6B878`, Ivory `#F5F1E8`, White `#FFFFFF`, Silver `#777777`.

| Token | Light | Dark |
|---|---|---|
| Background | `#F5F1E8` | `#111111` |
| Surface | `#FFFFFF` | `#1C1C1C` |
| Surface elevated | `#F0EDE5` | `#252525` |
| Primary (texto) | `#171717` | `#F5F1E8` |
| Accent | `#B18B48` | `#D6B878` |
| Accent soft | `#E9DCC0` | `#403722` |
| Secondary text | `#77736C` | `#A5A5A5` |
| Border | `#E4DED2` | `#343434` |
| Success | `#52765C` | `#8DBB8D` |
| Warning | `#A66B28` | `#E2AE60` |
| Error | `#A64B45` | `#E17B73` |

## Tipografía

| Familia | Uso |
|---|---|
| Sora | Títulos, nombres de rutinas, encabezados |
| Manrope | Botones, descripciones, menús, instrucciones, navegación |
| IBM Plex Mono | Pesos, tiempos, estadísticas, cronómetros, registros |

| Elemento | Tamaño | Peso |
|---|---|---|
| Hero | 32–36 px | Sora Bold |
| Título de página | 26–30 px | Sora Semibold |
| Título de sección | 20–22 px | Sora Semibold |
| Título de card | 16–18 px | Manrope Bold |
| Cuerpo | 14–16 px | Manrope Regular |
| Caption | 12–13 px | Manrope Medium |
| Métricas | 22–32 px | IBM Plex Mono Medium |
| Etiquetas pequeñas | 10–11 px | Manrope Semibold |

No más de tres pesos por familia.

## Componentes

- **Navegación:** inferior de cinco secciones en móvil, con icono y texto. El activo va en champagne, sobre un fondo sólido separado del contenido. En escritorio pasa a barra lateral. El botón de acción principal destaca solo dentro del entrenamiento.
- **Workout card:** nombre, grupo muscular, duración estimada, número de ejercicios, dificultad y botón de inicio.
- **Exercise card:** imagen, nombre, músculo principal, equipo, series y repeticiones, peso registrado y acceso a instrucciones.
- **Progress card:** peso levantado, volumen, récord personal, evolución semanal e indicador de progreso.
- **Botones:** primario (relleno champagne), secundario (superficie elevada), con contorno e icono.

## Dashboard

Debe responder: qué entreno hoy, cómo voy con mis objetivos, qué he conseguido, qué sigue y cómo evoluciona mi rendimiento. **El bloque "Plan de hoy" es el protagonista**: el usuario empieza a entrenar sin navegar por varias pantallas.

## Ficha del ejercicio y entrenamiento en vivo

La ficha sirve para aprender el movimiento, ejecutarlo y registrar. El tracker en vivo lleva menos decoración y más ejecución: ejercicio actual, media, series completadas, peso, repeticiones, descanso automático, **registro de la sesión anterior**, notas y siguiente ejercicio, todo con pocos toques.

## Reglas del sistema

| Propiedad | Valor |
|---|---|
| Base de espaciado | 4 px (habitual 8, 12, 16, 24, 32) |
| Radio de card | 14–18 px |
| Radio de botón | 10–12 px |
| Radio de modal | 20 px |
| Alto de input | 48–52 px |
| Alto de navegación | 68–76 px |
| Ancho máximo | 1200 px |
| Margen lateral | 20 px móvil, 32 px escritorio |
| Animación | 150–250 ms |

Accesibilidad: contraste WCAG AA (4.5:1 en texto normal), no depender solo del color, áreas táctiles de al menos 44 × 44 px, texto escalable, evitar animaciones innecesarias.

Arquitectura de producto: la biblioteca de ejercicios, las rutinas (plantillas) y las sesiones (ejecuciones reales) son entidades separadas.

## Ajustes aplicados

| Ajuste | Motivo |
|---|---|
| Texto secundario claro `#6B675F` (no `#77736C`) | `#77736C` da 4.18:1 sobre el fondo marfil; el documento exige 4.5:1 |
| Token `accentText` claro `#7F612F` | El champagne `#B18B48` da 2.8:1 como texto. Se usa solo para rellenos, con texto `#111111` encima (5.68:1) |
| `warningText` `#8F5A1E`, `successText` `#4A6B53`, `errorText` `#93433D` en claro | Los originales no llegan a 4.5:1 como texto sobre fondo y superficie elevada |
| Botones en sentence case ("Crear mi perfil") y no en mayúsculas ("START WORKOUT") | Las mayúsculas leen peor en español y son un patrón genérico. Pendiente de confirmar por Samuel |
| Sin fotografía de stock | Decisión de producto: las únicas fotos editoriales son las del usuario en el calendario |
| Iconos Ionicons en versión outline, rellenos al estar activos | El documento pide iconografía lineal; el relleno marca el estado activo sin depender solo del color |

## Decisiones propias de Flash Workouts

- **Design Read:** PWA de entrenamiento personal para cualquier nivel. Dial ENERGY 2 / RHYTHM 2 / MOTION 1: el movimiento solo responde a acciones (contar una serie, abrir una hoja, el temporizador).
- **Motivo de identidad:** la trama diagonal (`components/ui/Hatch.tsx`) significa "parcial, secundario o pendiente" en toda la app: músculo secundario, semana de descarga, día de descanso, sección que aún no tiene datos.
- **Un foco por pantalla:** la sesión en Hoy, el botón de serie en el entrenamiento, el mapa muscular en la ficha, el mes en Calendario.
- **Logo:** no existe todavía. El icono "FW" en Sora sobre obsidiana es provisional.
- **Sin emojis** en la interfaz, el código, los datos ni la documentación.
