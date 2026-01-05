/* Crear las siguientes funciones */

/* Calcular el promedio de edad de una x cantidad de valores. */
function promedioEdad(...edades) {
    let suma_edad = 0;
    let count = 0;
    for (let edad of edades) {
        suma_edad += edad
        count++;
    }
    return suma_edad/count; 
}

console.log(`El promedio de edad es: ${promedioEdad(1,2,3,4,5,6,7)}`);

/* Calcular el sueldo de una persona a partir de la cantidad de horas trabajadas y su valor hora. 
Considera que si la persona trabajo 160 horas, cada hora extra debe ser pagada al doble
Investigue como definir el valor hora por defecto (valor hora por defecto $10.000) */

function sueldo(horas, valor = 10000) {
    const HORAS_MAXIMAS = 160;
    if (horas >= 160) {
        let horas_extras = horas - HORAS_MAXIMAS; 
        return (HORAS_MAXIMAS * valor) + (horas_extras * (valor * 2));
    } else {
        return horas * valor
    }
    
}

console.log(`Sueldo por 15 horas trabajadas a $20.000 pesos es: ${sueldo(15, 20000)} pesos`);
console.log(`Sueldo por 175 horas trabajadas a $20.000 pesos es: ${sueldo(175, 20000)} pesos`);
console.log(`Sueldo por 175 horas trabajadas a valor hora por defecto es: ${sueldo(175)} pesos`);

/* Obtener el email de una persona a partir de las siguientes reglas.
- Las tres primeras letras del nombre, concatendao con el apellido
- Si es alumno: Concatenado con @alumno.sustantiva.com 
- Si es relator: Concatenado con @sustantiva.com */
//cadena.slice(inicioTrozo[, finTrozo])

function crearEmail(nombre, apellido, tipo = "Relator") {
    return tipo == "Relator" ? nombre.toLowerCase().slice(0, 3) + "." + apellido.toLowerCase() + "@sustantiva.com" : nombre.toLowerCase().slice(0, 3) + "." + apellido.toLowerCase() + "@alumno.sustantiva.com";
}

console.log(`Me llamo Rodrigo Pereira y soy alumno, mi mail es: ${crearEmail("Rodrigo", "Pereira", "Alumno")}`);
console.log(`Me llamo Rodrigo Pereira y soy relator, mi mail es: ${crearEmail("Rodrigo", "Pereira")}`);