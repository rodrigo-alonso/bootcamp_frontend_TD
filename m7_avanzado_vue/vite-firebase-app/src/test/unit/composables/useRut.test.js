// Importamos las funciones necesarias para las pruebas
import { describe, it, expect } from 'vitest'
import { useRut } from '../../../composables/useRut'

describe('useRut', () => {
  // Metodos a testear
  const { validateRut, formatRut } = useRut();
  
  it ("Validar rut correcto", () => {
    // Validamos un RUT correcto
    expect(validateRut("12.345.678-5")).toBe(true); 
  });

  it ("Validar rut incorrecto", () => {
    // Validamos un RUT incorrecto
    expect(validateRut("12.345.678-6")).toBe(false); 
  });

  it ("Formatear rut", () => {
    // Formateamos un RUT sin formato
    expect(formatRut("123456785")).toBe("12.345.678-5");
  });

  it ("Validar rut correcto sin formato", () => {
    // Validamos un RUT correcto sin formato
    expect(validateRut("123456785")).toBe(true);
  });
})