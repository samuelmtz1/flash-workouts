# Changelog

## 0.1.0 (2026-11-02)

Base del proyecto.

- Proyecto Expo SDK 58 con Expo Router, exportado como PWA web.
- Sistema de diseño del documento Premium Fitness: tokens claro y oscuro, Sora, Manrope e IBM Plex Mono, con ajustes de contraste para cumplir WCAG AA.
- Tema según el sistema, con opción manual de claro u oscuro.
- Cinco secciones (Hoy, Entrenar, Progreso, Calendario, Perfil): barra inferior en móvil y barra lateral en escritorio.
- Onboarding con nombre obligatorio y estatura, peso, nivel y unidades opcionales.
- Perfil: cambiar nombre, tema y unidades, y borrar los datos del dispositivo.
- PWA: manifest, service worker con Workbox y un icono provisional.
- Seguridad: headers con CSP estricta para Cloudflare Pages, secretlint en pre-commit, gitleaks, CodeQL y Dependabot en GitHub.
