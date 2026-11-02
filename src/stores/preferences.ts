import { useSyncExternalStore } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Preferencias pequeñas del dispositivo. Los datos de entrenamiento y las
// fotos viven en IndexedDB (lib/db, a partir de v0.2), no aquí.

export type ThemePreference = 'system' | 'light' | 'dark';
export type Units = 'kg' | 'lb';
export type Level = 'beginner' | 'intermediate' | 'advanced';

export type Profile = {
  name: string;
  heightCm?: number;
  weightKg?: number;
  level?: Level;
};

type PreferencesState = {
  profile: Profile | null;
  theme: ThemePreference;
  units: Units;
  completeOnboarding: (profile: Profile) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  setTheme: (theme: ThemePreference) => void;
  setUnits: (units: Units) => void;
};

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      profile: null,
      theme: 'system',
      units: 'kg',
      completeOnboarding: (profile) => set({ profile }),
      updateProfile: (patch) => set((state) => (state.profile ? { profile: { ...state.profile, ...patch } } : state)),
      setTheme: (theme) => set({ theme }),
      setUnits: (units) => set({ units }),
    }),
    {
      name: 'flash-workouts:preferences',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ profile, theme, units }) => ({ profile, theme, units }),
    },
  ),
);

// true cuando las preferencias ya se leyeron del almacenamiento. En web la
// lectura es síncrona, pero se respeta la API por si el almacenamiento cambia.
export function usePreferencesHydrated() {
  return useSyncExternalStore(
    (onChange) => usePreferences.persist.onFinishHydration(onChange),
    () => usePreferences.persist.hasHydrated(),
    () => false,
  );
}
