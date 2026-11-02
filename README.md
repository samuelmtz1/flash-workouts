# Flash Workouts

Una app web para seguir tu rutina de gimnasio: qué toca hoy, cómo se hace cada ejercicio y cuánto llevas. Funciona en el teléfono como app instalada y sin conexión.

- Sin cuentas ni servidores: tus datos y fotos se quedan en tu dispositivo.
- Gratis, sin anuncios ni analítica.

Estado: v0.1 (base). La importación de rutinas llega en v0.2.

## Desarrollo

Requiere Node 22.

```bash
npm install
git config core.hooksPath .githooks   # activa el escaneo de secretos antes de cada commit
npm run web                           # servidor de desarrollo
npm run check                         # tipos, lint, tests y secretos
npm run build:web                     # build estático en dist/ con service worker
```

## Publicación (Cloudflare Pages)

- Comando de build: `npm run build:web`
- Directorio de salida: `dist`
- Variable de entorno: `NODE_VERSION=22`

Los headers de seguridad están en `public/_headers`. Ver `docs/SECURITY.md`.

## Documentación

- `docs/DESIGN.md`: sistema de diseño.
- `docs/SECURITY.md`: modelo de amenazas, headers y checklist.
