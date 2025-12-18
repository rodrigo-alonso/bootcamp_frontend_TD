let nombre = prompt("Ingresa tu nombre: ");
let edad = prompt("Ingrese su edad: ");
edad++;

if (!Number.isNaN(edad)) {
    alert(`Hola ${nombre} el proximo año cumpliras ${edad}`);
} else {
    alert(`Hola ${nombre} la edad ingresada no es valida`);
}

const { stdin } = require('process');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 

let nombre_2 = null;

rl.question("Como te llamas: ", (nombre_2) => {
    name = nombre_2;
    rl.close;
});

/*
Desarrollar un programa que solicite el peso (kg) y la estatura (mts) de una persona,
que calcula el IMC e indique en que categoria se encuentra segun IMC.

Interpretacion (Adultos)
< 18.5: bajo Bajo peso
18.5 - 24.9: peso normal
24.9 - 29.9: sobrepeso
29.9 - 34.9: obesidad grado I
34.9 - 39.9: obesidad grado II
> 39.9: bajo obesidad grado III
*/

let nombre_persona = prompt("Ingrese su nombre: ");
let peso = prompt("Ingrese su peso: ");
let estatura = prompt("Ingrese su estatura: ");
let estado;

let imc = peso / Math.pow(estatura, 2);

if (imc <= 18.5) {
    estado = "Bajo peso";
} else if (imc > 18.5 && imc <= 24.9) {
    estado = "Peso Normal";
} else if (imc > 24.9 && imc <= 29.9) {
    estado = "Sobrepeso";
} else if (imc > 29.9 && imc <= 34.9) {
    estado = "Obesidad grado I";
} else if (imc > 24.9 && imc <= 29.9) {
    estado = "Obesidad grado II";
} else {
    estado = "Obesidad grado III"
}

alert(`Hola ${nombre_persona} su IMC es: ${imc} lo que indica que es ${estado}`);