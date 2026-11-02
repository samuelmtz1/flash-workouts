import type { Units } from '@/stores/preferences';

const LB_PER_KG = 2.20462;

export function toKg(value: number, units: Units) {
  return units === 'kg' ? value : value / LB_PER_KG;
}

export function fromKg(kg: number, units: Units) {
  return units === 'kg' ? kg : kg * LB_PER_KG;
}

// Acepta coma o punto decimal ("72,5" y "72.5"). Devuelve null si no es un número.
export function parseDecimal(input: string): number | null {
  const normalized = input.trim().replace(',', '.');
  if (normalized === '') return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}
