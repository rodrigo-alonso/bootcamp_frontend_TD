let numeros = [1, 2, 3, 4, 5];
console.log("Array original: ", numeros);

let nombres = ["Ana", "Luis", "Carlos"];
console.log("Array de nombres: ", nombres);

let mezclados = [1, "Hola", true, null, 5.6];
console.log("Array mezclado: ", mezclados);

console.log(`Tercer numero: ${numeros[2]}`);
console.log(`Segundo nombre: ${nombres[1]}`);
console.log(`Cuarto nombre: ${nombres[3]}`); // Elemento que no existe en la posicion -> undefined

// Agregar elemento a un arreglo
numeros[5] = 7;
console.log(`Nuevo arreglo de numero: ${numeros}`);
numeros[3] = 10;
console.log(`Nuevo arreglo de numero: ${numeros}`);
numeros[10] = 1;
console.log(`Nuevo arreglo de numero: ${numeros}`); // Agrega valores undefined hasta posicion indicada -> 1,2,3,10,5,7,,,,,1
console.log("Nuevo arreglo de numero: ", numeros);

nombres.push("Juanito"); // Agrega valor al final
console.log(`Nuevo arreglo de nombres: ${nombres}`);

console.log(`Obtener la cantidad de elementos del arreglo de nombres: ${nombres.length}`) // Propiedad no es un metodo x lo tanto no usa ()
nombres[nombres.length] = "Pedrito";
console.log(`Nuevo arreglo de nombres: ${nombres}`);

// Elimina el ultimo y se queda con el
let nombre_eliminado = nombres.pop();
console.log(`Nuevo arreglo de nombres: ${nombres}`);
console.log(`Nombre eliminado: ${nombre_eliminado}`);

// Elimina el primero y se queda con el
nombre_eliminado = nombres.shift();
console.log(`Nuevo arreglo de nombres: ${nombres}`);
console.log(`Nombre eliminado: ${nombre_eliminado}`);

// Elimina el elemento de la posicion indicada en el arreglo
delete nombres[0];
console.log(`Nuevo arreglo de nombres: ${nombres}`);
console.log("Nuevo arreglo de nombres: ", nombres);

// Ordenar arreglo en este caso por orden alfabetico
nombres.sort();
console.log("Nuevo arreglo de nombres: ", nombres);
numeros.sort(); // Ordena por defecto caracteres
console.log("Nuevo arreglo de numeros: ", numeros);
numeros.sort(function(a,b){return b-a}); // Ordena de forma descendente
console.log("Nuevo arreglo de numeros ordenado descendente: ", numeros);
numeros.sort(function(a,b){return a-b}); // Ordena de forma ascendente
console.log("Nuevo arreglo de numeros ordenado descendente: ", numeros);
primer_nombre = nombres.at();
console.log(`Primer nombre sin borrar: ${primer_nombre}`);
console.log("Nuevo arreglo de nombres: ", nombres);

// Concatenar
let apellidos_1 = ['Perez', 'Lazo', 'Mochas', 'Dido'];
let apellidos_2 = new Array('Brito', 'Casas', 'Oria');
let apellidos_3 = apellidos_1.concat(apellidos_2);
console.log(apellidos_1);
console.log(apellidos_2);
console.log(apellidos_3);