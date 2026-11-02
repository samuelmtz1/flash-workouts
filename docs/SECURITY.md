# Seguridad

Flash Workouts es una PWA estática y local-first: no tiene servidor, cuentas, base de datos remota ni llaves de API. La seguridad se centra en tres cosas: que el código público nunca contenga secretos, que el sitio no se pueda usar para ejecutar código ajeno y que los datos del usuario (incluidas fotos corporales) nunca salgan de su dispositivo.

Este documento se revisa al cerrar cada versión, junto con `/security-review`.

## Modelo de amenazas

| Activo | Amenaza | Mitigación |
|---|---|---|
| Datos y fotos del usuario | Fuga a terceros | Todo vive en el dispositivo (IndexedDB y localStorage). Sin analítica, cookies ni peticiones a terceros. CSP `connect-src 'self'` |
| Datos y fotos del usuario | Pérdida | `navigator.storage.persist()` al terminar el onboarding. Respaldo exportable antes de v1.0 |
| Fotos | Ubicación en EXIF/GPS | Se recomprimen y se borran los metadatos al guardarlas (v0.4) |
| Repositorio público | Secretos subidos por error | `.gitignore`, hook `pre-commit` con secretlint, gitleaks en CI y push protection de GitHub |
| Repositorio público | Rutinas reales o datos personales | `*.pdf` y `docs/source/` bloqueados en `.gitignore` y en el hook. Los tests usan rutinas anonimizadas |
| Sitio | XSS o inyección | CSP estricta sin `unsafe-inline` ni `unsafe-eval` en scripts. React escapa el texto. Nunca `dangerouslySetInnerHTML` |
| Sitio | Clickjacking | `frame-ancestors 'none'` y `X-Frame-Options: DENY` |
| Imports (PDF, texto, respaldos, links) | Archivos maliciosos | Validación con zod, límites de tamaño y pdf.js con `isEvalSupported: false` (v0.2) |
| Dependencias | Paquete vulnerable o comprometido | Lockfile, `npm audit` en CI, Dependabot, CodeQL y pocas dependencias |

## Headers (`public/_headers`, Cloudflare Workers)

- `Content-Security-Policy`: `default-src 'self'`, `script-src 'self'`, `style-src 'self' 'unsafe-inline'`, `img-src 'self' blob: data:`, `font-src 'self'`, `connect-src 'self'`, `worker-src 'self'`, `frame-src 'none'`, `object-src 'none'`, `base-uri 'none'`, `form-action 'none'`, `frame-ancestors 'none'`, `upgrade-insecure-requests`.
- `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Permissions-Policy` (cámara solo en el propio sitio; micrófono, ubicación y pagos desactivados), `Cross-Origin-Opener-Policy: same-origin`.

Cuando lleguen los videos (v0.2), `frame-src` se abre solo a `https://www.youtube-nocookie.com`.

### Riesgos aceptados

- **`style-src 'unsafe-inline'`:** react-native-web inyecta estilos en `<style>` en tiempo de ejecución. El riesgo es bajo porque los scripts siguen restringidos a `'self'`, y CSS por sí solo no ejecuta código.
- **Vulnerabilidades moderadas en herramientas de build** (`minimatch`/`glob` dentro de la cadena del CLI de Expo): son ReDoS en código que corre en la máquina de desarrollo o en CI, no en el navegador del usuario. La CI falla con vulnerabilidades **altas** en dependencias de producción (`npm run audit`). Se revisan con cada actualización de Expo.

## Secretos

- La app no necesita ninguna llave. Si algún día una función la necesitara, no va en el código del cliente: se rediseña la función o se usa un servicio sin llave.
- `npm run secrets` escanea todo el repositorio con secretlint. El hook `.githooks/pre-commit` (activo con `git config core.hooksPath .githooks`) escanea los archivos preparados y rechaza PDFs, `docs/source/` y archivos `.env`.
- En GitHub: activar **Secret scanning** y **Push protection** en Settings > Code security.

## Checklist por versión (basado en OWASP ASVS nivel 1, adaptado a una PWA sin servidor)

- [ ] `npm run check` pasa (tipos, lint, tests, secretos).
- [ ] `npm run audit` sin vulnerabilidades altas en producción.
- [ ] Build sin scripts en línea en `dist/index.html`; la consola no muestra violaciones de CSP.
- [ ] Ningún dato sale del dispositivo: la pestaña Network solo muestra el propio dominio (y youtube-nocookie al reproducir un video, desde v0.2).
- [ ] Toda entrada externa (archivo, texto, link) pasa por validación con esquema y límite de tamaño.
- [ ] Sin `dangerouslySetInnerHTML`, `eval` ni `new Function`.
- [ ] Headers verificados en el deploy (por ejemplo, con securityheaders.com).
- [ ] `/security-review` sin hallazgos abiertos.

## Reportar un problema

Abre un issue privado (Security advisory) en el repositorio de GitHub.
