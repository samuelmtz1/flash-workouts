import { describe, expect, it } from '@jest/globals';

import { validateProfile } from '@/lib/profileForm';
import { fromKg, parseDecimal, toKg } from '@/lib/units';

describe('validateProfile', () => {
  it('pide el nombre', () => {
    const { profile, errors } = validateProfile({ name: '   ', height: '', weight: '' }, 'kg');
    expect(profile).toBeUndefined();
    expect(errors.name).toBe('Escribe tu nombre para continuar.');
  });

  it('acepta solo el nombre y limpia espacios', () => {
    const { profile } = validateProfile({ name: '  Sam   Martínez ', height: '', weight: '' }, 'kg');
    expect(profile).toEqual({ name: 'Sam Martínez', heightCm: undefined, weightKg: undefined, level: undefined });
  });

  it('acepta coma decimal y convierte libras a kilos', () => {
    const { profile } = validateProfile({ name: 'Sam', height: '175', weight: '143,3', level: 'beginner' }, 'lb');
    expect(profile?.heightCm).toBe(175);
    expect(profile?.weightKg).toBe(65);
    expect(profile?.level).toBe('beginner');
  });

  it('rechaza estatura y peso fuera de rango o no numéricos', () => {
    const { errors } = validateProfile({ name: 'Sam', height: '17.5', weight: 'abc' }, 'kg');
    expect(errors.height).toBeDefined();
    expect(errors.weight).toBe('Escribe tu peso entre 30 y 250 kg.');
  });
});

describe('units', () => {
  it('convierte ida y vuelta', () => {
    expect(fromKg(toKg(100, 'lb'), 'lb')).toBeCloseTo(100);
    expect(toKg(80, 'kg')).toBe(80);
  });

  it('parseDecimal', () => {
    expect(parseDecimal('72,5')).toBe(72.5);
    expect(parseDecimal('')).toBeNull();
    expect(parseDecimal('12kg')).toBeNull();
  });
});
