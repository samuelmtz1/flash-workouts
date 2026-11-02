import type { Level, Profile, Units } from '@/stores/preferences';
import { parseDecimal, toKg } from '@/lib/units';

export type ProfileDraft = {
  name: string;
  height: string;
  weight: string;
  level?: Level;
};

export type ProfileErrors = Partial<Record<'name' | 'height' | 'weight', string>>;

export const NAME_MAX = 40;

// Valida el formulario del perfil. Estatura y peso son opcionales, pero si se
// escriben tienen que ser números razonables.
export function validateProfile(draft: ProfileDraft, units: Units): { profile?: Profile; errors: ProfileErrors } {
  const errors: ProfileErrors = {};
  const name = draft.name.trim().replace(/\s+/g, ' ');

  if (name === '') errors.name = 'Escribe tu nombre para continuar.';
  else if (name.length > NAME_MAX) errors.name = `Usa ${NAME_MAX} caracteres o menos.`;

  const height = parseDecimal(draft.height);
  if (draft.height.trim() !== '' && (height === null || height < 100 || height > 230)) {
    errors.height = 'Escribe tu estatura en centímetros, entre 100 y 230.';
  }

  const weight = parseDecimal(draft.weight);
  const weightKg = weight === null ? null : toKg(weight, units);
  if (draft.weight.trim() !== '' && (weightKg === null || weightKg < 30 || weightKg > 250)) {
    errors.weight = units === 'kg' ? 'Escribe tu peso entre 30 y 250 kg.' : 'Escribe tu peso entre 66 y 551 lb.';
  }

  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors,
    profile: {
      name,
      heightCm: height ?? undefined,
      weightKg: weightKg === null ? undefined : Math.round(weightKg * 10) / 10,
      level: draft.level,
    },
  };
}
