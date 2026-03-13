import { describe, it, expect } from 'vitest';
import { useEmail } from '../../../composables/useEmail';

describe('useEmail', () => {
  const { validateEmail } = useEmail(); // Obtenemos la función de validación de email

  it('Valida un email correcto', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  it('Rechaza un email incorrecto', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});