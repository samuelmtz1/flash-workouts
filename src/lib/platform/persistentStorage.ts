import { Platform } from 'react-native';

// Pide al navegador que no borre los datos de la app cuando falte espacio.
// Sin esto, Safari puede limpiar IndexedDB tras semanas sin abrir la app.
export async function requestPersistentStorage(): Promise<boolean> {
  if (Platform.OS !== 'web' || typeof navigator === 'undefined' || !navigator.storage?.persist) return false;
  try {
    if (await navigator.storage.persisted()) return true;
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}
