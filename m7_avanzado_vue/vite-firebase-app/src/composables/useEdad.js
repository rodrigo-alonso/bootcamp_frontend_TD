export function useEdad() {
  const calculateEdad = (date) => {
    if (!date) return '-';
    const dob = new Date(date); // Convertir la fecha de nacimiento a una fecha de JavaScript
    if (isNaN(dob)) return '-'; // Si la fecha no es válida, retornar '-'
    const today = new Date();  // Obtener la fecha actual
    let age = today.getFullYear() - dob.getFullYear(); // Calcular la diferencia de años
    const monthDiff = today.getMonth() - dob.getMonth(); // Calcular la diferencia de meses
    const dayDiff = today.getDate() - dob.getDate(); // Calcular la diferencia de días

    // Si el mes actual es menor que el mes de nacimiento, o si es el mismo mes pero el día actual es menor, restar un año
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age; // Retornar la edad calculada
  };
  return { calculateEdad }; // Retorna funcion q se puede usar
};