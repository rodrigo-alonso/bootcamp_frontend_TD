// Estructura if, es una estructura de control que permite tomar decisiones sobre el codigo
let edad = 8;

if (edad >= 18) {
    console.log("Es mayor de edad");
} else {
    console.log("Es menor de edad");
}

// Evaluar si una persona aprueba o reprueba una asignatura, considerando una nota minima de 4 para reprobar
let nota = 4;

if (nota >= 4) {
    console.log("Aprueba");
} else {
    console.log("Reprueba");
}

// Evaluar si el genero de una persona es masculino o femenino
let genero = "f";

if (genero.toLowerCase() === "g") {
    console.log("Genero Masculino");
} else {
    console.log("Genero Femenino");
}

// Evaluar la edad de una persona indicando si es adolescente, mayor de edad o tercera edad

let edad_actual = 60;

if (edad_actual < 18) {
    console.log("Es adolescente");
} else if (edad_actual < 60) {
    console.log("Es mayor de edad");
} else {
    console.log("Es tercera edad");
}

// Evaluar la nota ingresada por el usuario y clasificarlas segun la siguiente clasificacion
// Si nota = 7  -> genio
// Si nota >= 6 -> avanzado
// Si nota >= 5 -> del monton
// Si nota >= 4 -> reguleque
// Si nota <= 4 -> porro

let asignacion = 7;

if (asignacion == 7) {
    console.log("Eres un genio");
} else if (asignacion >= 6) {
    console.log("Eres un estudiante avanzado");
} else if (asignacion >= 5) {
    console.log("Eres un estudiante del monton");
} else if (asignacion >= 4) {
    console.log("Eres un estudiante reguleque");
} else {
    console.log("Eres un estudiante porro");
}

// Evaluar si un alumno de un bootcamp aprueba o repruega
// Se deben cumplir las siguientes condiciones para aprobar
// Horas de conexion mayor o igual a 150 hrs
// Promedio final evaluaciones mayor o igual a 4
// Porcentaje de actividades mayor o igual a 90%

// Conectore logicos -> && (AND), || (OR), ! (NOT)

let nota_final = 7;
let hrs_conexion = 150;
let porcentaje_actividades = 0.9;

if (nota_final >= 4 && porcentaje_actividades >= 0.90 && hrs_conexion >= 150) {
    console.log("Aprobado");
} else {
    console.log("Reprueba");
}

// Necesitamos verificar si una persona puede o no ingresar a una sala de clases.
// Para poder ingresar, debe cumplir que tenga 18 años, que su genero sea femenino
// Que su ciudad natal sea Santiago, Valparaiso o Rancagua.

let edad_persona = 18;
let genero_persona = "FEMENINO";
let ciudad_natal = "SaNtIaGo";

if (edad_persona >= 18 
    && genero_persona.toLowerCase() === "femenino" 
    && (ciudad_natal.toLowerCase() === "santiago" || "valparaiso" || "rancagua")) {
    console.log("Ingresa a sala de clases");
} else {
    console.log("No ingresa a sala de clases");
}

// Estructura switch

let dia = 1;

switch (dia) {
    case 1:
        console.log("Lunes");
        break;
    case 2:
        console.log("Martes");
        break;
    case 3:
        console.log("Miercoles");
        break;
    case 4:
        console.log("Jueves");
        break;
    case 5:
        console.log("Viernes");
        break;
    case 6:
        console.log("Sabado");
        break;
    case 7:
        console.log("Domingo");
        break;
    default:
        console.log("Dia no valido");
}

// Solicitar al usuario un numero entre 1 y 12 e indicar el mes al cual corresponde el valor ingresado

let numero_usuario = 7;

switch (numero_usuario) {
    case 1:
        console.log("Enero");
        break;
    case 2:
        console.log("Febrero");
        break;
    case 3:
        console.log("Marzo");
        break;
    case 4:
        console.log("Abril");
        break;
    case 5:
        console.log("Mayo");
        break;
    case 6:
        console.log("Junio");
        break;
    case 7:
        console.log("Julio");
        break;
    case 8:
        console.log("Agosto");
        break;
    case 9:
        console.log("Septiembre");
        break;
    case 10:
        console.log("Octubre");
        break;
    case 11:
        console.log("Noviembre");
        break;
    case 12:
        console.log("Diciembre");
        break;
    default:
        console.log("Numero no valido");
}

// A partir de un color ingresado por el usuario indicar que "posible" equipo de la Chilean Premier League le gusta
// a la persona.

let color = "BLANCO";

switch (color.toLowerCase()) {
    case "blanco":
        console.log("Colo Colo");
        break;
    case "azul":
        console.log("Universidad de Chile");
        break;
    case "verde":
        console.log("Wanders");
        break;
    case "lila":
        console.log("Concepcion");
        break;
    case "rojo":
        console.log("Union Española");
        break;
    case "celeste":
        console.log("Deportes Iquique");
        break;
    default:
        console.log("Color no valido");
}