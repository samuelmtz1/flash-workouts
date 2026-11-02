// Registra el service worker generado por Workbox en el build (dist/sw.js).
// Vive en un archivo aparte, no en línea, para que la CSP no necesite 'unsafe-inline' en scripts.
if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {
      // Sin service worker la app funciona igual, solo que sin modo offline.
    });
  });
}
