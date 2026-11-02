// Genera dist/sw.js después de `expo export -p web` (npm run build:web).
// Precachea el shell de la app para que abra sin conexión en el gimnasio.
module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{js,html,css,ttf,ico,json,png,svg,woff2}'],
  globIgnores: ['_headers', '_redirects'],
  swDest: 'dist/sw.js',
  navigateFallback: '/index.html',
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
};
