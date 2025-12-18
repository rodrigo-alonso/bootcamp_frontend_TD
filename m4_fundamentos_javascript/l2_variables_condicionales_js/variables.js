PI = 3.1415
console.log(PI); // 3.1415

var nombre = "Juan"; // Ya no se recomienda usar 'var'
let edad = 30; // Variable dinamica 
const ciudad = "Madrid"; // Variable constante

// variables de tipo texto, se puede usar comillas dobles o simples
let pregunta;
let respuesta;

pregunta = "Es la variable tipo 'String'";
respuesta = 'Si es tipo "String"'

let pais = "España"
let cadenaFormateada = `Vivo en la ciudad de ${ciudad}, en el pais de ${pais}`; // Cadena formateada usa comillas invertidas `
console.log(cadenaFormateada);

// Enteros
let a = 15; // Variable numerica
let b = "15"; // Variable de tipo string
console.log(typeof(a)); // typeof -> Obtiene el tipo de dato que contiene una variable
console.log(typeof(b));

// Objetos
let auto;

// Inicializar un objeto
auto = {
    modelo: "BME X3",
    color: "Rojo",
    patente: "XL TR 96"
}

// Array
let colores = ["Rojo", "Blanco", "Azul", "Amarillo", "Morado"]

console.log(colores);
console.log(typeof(colores));

// Scope
let variable = 2 // Variable de scope global
function funcion() {
    let variable = 3; // Variable de scope local
    console.log(variable);
};

console.log(variable); // Imprime 2 ya que toma la 'variable' dentro de su scope
funcion();

// Operadores aritmeticos
let c = 4;
let d = 2;

console.log(c+d); // 6
console.log(c-d); // 2
console.log(c*d); // 8
console.log(c/d); // 2
console.log(c%d); // 0 -> Modulo o resto de la division

// Precedencia de operadores
console.log(a * b / c); // 56,25 -> Primero se realiza la multiplicacion
console.log(c + b / a); // 6.75 -> Primero se realiza la division por los parentesis

// Operadors de incremento y decremento
let numero = 5;
console.log(++numero); // 6 -> Incrementa en 1 antes de usar la variable
console.log(numero++); // 6 -> Usa la variable y luego incrementa en 1
console.log(numero);   // 7 -> Valor actual de la variable

console.log(--numero); // 6 -> Decrementa en 1 antes de usar la variable
console.log(numero--); // 6 -> Usa la variable y luego decrementa en 1
console.log(numero);   // 5 -> Valor actual de la variable

// Operadores de comparacion
let f = 3;

console.log(f == "3"); // true -> Igualdad de valor, no de tipo (caracteristico de JS)
console.log(f === "3"); // false -> Igualdad de valor y tipo
console.log(f != 4); // true -> Diferente de valor
console.log(f !== '3'); // true -> Diferente de valor o tipo
console.log(f > 2); // true -> Mayor que
console.log(f < 5); // true -> Menor que
console.log(f >= 3); // true -> Mayor o igual que
console.log(f <= 4); // true -> Menor o igual que   


// Cadena de caracteres
const string1 = "Una cadena primitiva";
const string2 = "Tambien una cadena primitiva";

