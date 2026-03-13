import { describe, it, expect } from 'vitest';
import { useEdad } from '../../../composables/useEdad';

describe('useEdad', () => {
  const { calculateEdad } = useEdad(); // Obtenemos la función de cálculo de edad
  const today = new Date();

  it("Calcula la edad correctamente", () => { 
    const age = calculateEdad("1990-03-11");
    expect(age).toBeGreaterThanOrEqual(36); // Ajusta el valor esperado según la fecha actual
  });

  it ("Retorna '-' para fecha no válida", () => {
    expect(calculateEdad("invalid-date")).toBe('-');
  });
  
  it ("Retorna '-' para fecha no válida (año no bisiesto)", () => {
    expect(calculateEdad("1990-02-29")).toBe('-');
  });

  it ("Retorna '-' para fecha vacía", () => {
    expect(calculateEdad("")).toBe('-');
  });
});