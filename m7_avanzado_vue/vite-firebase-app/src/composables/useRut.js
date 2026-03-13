export function useRut() {
  // Función para limpiar el RUT de caracteres no numéricos
  const cleanRut = (rut) => {
    return rut.replace(/[^0-9kK]/g, "");
  }

  // Función para formatear el RUT con puntos y guion
  const formatRut = (rut) => {
    const cleaned = cleanRut(rut)
    if (cleaned.length <= 1) return cleaned
    const cuerpo = cleaned.slice(0, -1)
    const dv = cleaned.slice(-1)
    let formatted = ""
    let i = cuerpo.length
    let count = 0
    while (i > 0) {
      formatted = cuerpo.charAt(i - 1) + formatted
      i--
      count++
      if (count === 3 && i !== 0) {
        formatted = "." + formatted
        count = 0
      }
    }
    return formatted + "-" + dv
  }

  // Función para validar el RUT utilizando el algoritmo de validación
  const validateRut = (rut) => {
    const cleaned = cleanRut(rut)
    if (cleaned.length < 8) return false
    const cuerpo = cleaned.slice(0, -1)
    const dv = cleaned.slice(-1).toUpperCase()
    let suma = 0
    let multiplo = 2
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += multiplo * cuerpo.charAt(i)
      multiplo = multiplo < 7 ? multiplo + 1 : 2
    }
    const dvEsperado = 11 - (suma % 11)
    let dvFinal = ""
    if (dvEsperado === 11) dvFinal = "0"
    else if (dvEsperado === 10) dvFinal = "K"
    else dvFinal = dvEsperado.toString()
    return dvFinal === dv
  }

  return { formatRut, validateRut }; // Retorna las funciones para formatear y validar el RUT
}