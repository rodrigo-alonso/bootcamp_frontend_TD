let contador = 0;
let cantidad = prompt("Cuantas edades desean ingresar?");
let promedio = 0;

while (contador < cantidad) {
    contador++;
    let edad = prompt(`Ingrese edad Nro. ${contador}`);
    promedio += Number(edad);
}

console.log(Math.round(promedio/cantidad));
// alert(promedio/cantidad);
alert(Math.round(promedio/cantidad));

let nota = null;

do {
    nota = parseFloat(prompt(`Ingrese nota [1.0 - 7.0]: `));
    console.log(nota);
    if (nota < 1 || nota > 7) {
        alert("Nota invalida... intentelo nuevamentel");
    }
} while(nota < 1 || nota > 7);

alert(`La nota ingresada es ${nota}`);

let cantidad_notas = parseInt(prompt("Cuantas notas desea agregar: "));
let notas = []

for (let index = 1; index <= cantidad_notas; index++) {
    let nota = null;
    do {
        nota = parseFloat(prompt(`Ingrese nota Nro. ${index} entre [1.0 - 7.0]: `));
        if (nota < 1 || nota > 7) {
            alert("Nota invalida... intentelo nuevamentel");
        }
    } while (nota < 1 || nota > 7);
    notas.push(nota);
}

let promedio_notas = 0;
for (let index = 0; index < notas.length; index++) {
    const element = notas[index];
    promedio_notas += element;
}

promedio_notas = promedio_notas/notas.length;

if (promedio_notas >= 3.5) {
    alert(`Su promedio es ${promedio_notas} por lo que esta aprobado`);
} else {
    alert(`Su promedio es ${promedio_notas} por lo que NO esta aprobado`);
}