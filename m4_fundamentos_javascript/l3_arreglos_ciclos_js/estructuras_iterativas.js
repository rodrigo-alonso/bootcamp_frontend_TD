/* while, for, do while */

// WHILE

// Estructura basica que permita contar de 1 a 5
let contador_while = 0;
while (contador_while < 5) {
    contador_while++;
    console.log(contador_while);
}

console.log("\n****************************************\n");

// DO WHILE

let contador_do_while = 10;

do {
    contador_do_while++;
    console.log(contador_do_while);
} while (contador_do_while < 5);

console.log("\n****************************************\n");

// FOR 

let edades = [15, 24, 64, 23, 12]
let promedio_edad = 0;

for (let index = 0; index < edades.length; index++) { // se usa la propiedad .length no el metodo .length()
    promedio_edad += edades[index]; 
}

console.log(`El promedio de edad es: ${promedio_edad/edades.length}`);

// Loop infinito
// for (;;) {
//     console.log("Loop Infinito");
// }
