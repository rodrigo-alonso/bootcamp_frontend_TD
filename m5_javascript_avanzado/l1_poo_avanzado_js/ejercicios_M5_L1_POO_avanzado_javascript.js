/** 
 * Codigo de lectura de clase 
 * M5_L1_POO_avanzado_javascript.pdf
*/

// Clase rectangulo
class Rectangulo {
    constructor(alto, ancho) {             // <- Propiedades
        this.alto = alto;                  // Atributos de instancia
        this.ancho = ancho;
    }

    area() {                           // <- Metodos de instancia
        return this.calcArea();
    }

    calcArea() {
        return this.alto * this.ancho;
    }

    get perimetro() {                         // <- Getter (metodo accesadora)
        return 2 * (this.alto + this.ancho);
    }

    /**Metodo estatico
     * Pertenece a la clase misma, no a los objetos (instancias) que creas con esa clase. 
     * Se usan principalmente para 3 cosas:
     * A. Funciones de Utilidad (Herramientas)
     * B. Validadores (validar rut por ejemplo)
     * C. Comparadores (Para comparar dos instancias entre sí.)
    */
    static cuadrado(lado) {                   // <- Metodo estatico (no requiere instancia)
        return new Rectangulo(lado, lado);
    }
}

const cuadrado = new Rectangulo(10, 10); // Usando el constructor
const c2 = Rectangulo.cuadrado(10); // Usando metodo estatico
console.log(cuadrado.area); //100

/** Prototype 
 * JavaScript usa herencia basada en prototipos.
 * Cuando intentas acceder a una propiedad o método en un objeto, JavaScript realiza una búsqueda en cadena de prototipos.
 * Si la propiedad o método no se encuentra en el objeto mismo, JavaScript busca en el prototipo del objeto, 
 * y así sucesivamente hasta llegar al final de la cadena de prototipos, seguiría subiendo hasta llegar 
 * a Object.prototype (el "Adán" de todos los objetos) y finalmente devolvería undefined si no lo encuentra.
 * 
 * En JavaScript moderno, las clases son esencialmente "azúcar sintáctico" sobre el sistema de prototipos existente.
 * Esto significa que cuando defines una clase y sus métodos, esos métodos se agregan al prototipo de la clase.
 * 
 * En el JavaScript "antiguo" (ES5), no existía diferencia visual entre una función normal y una clase.
*/

function RectanguloProto(alto, ancho) {
    this.alto = alto;
    this.ancho = ancho;
}

RectanguloProto.prototype.calcArea = function calcArea() {
    return this.alto * this.ancho;
}   

const rectProto = new RectanguloProto(5, 10);

console.log(typeof RectanguloProto); // function
console.log(typeof rectProto); // object
console.log(typeof Rectangulo); // function
console.log(typeof cuadrado); // object

// Una clase en JavaScript es en realidad una función especial.

class Auto {
  constructor(marca) { 
    this.marca = marca; 
  }
}

console.log(typeof Auto); // function

/** Objeto Literales 
 * Son básicamente listas de datos organizados por "Clave: Valor" encerrados entre llaves {}.
 * En JS no necesitas una Clase para tener un Objeto. Puedes crear el objeto directamente "de la nada".
*/

let perro = {
    nombre: 'Firulais',
    raza: 'Labrador',
    edad: 3,
    ladrar: function() {
        console.log('Guau Guau');
    }
}; // Objeto literal

console.log(perro.nombre); // Firulais
perro.ladrar(); // Guau Guau

// Caracteristicas de los objetos literales:

// 1. Son dinámicos: Puedes agregar, modificar o eliminar propiedades y métodos en cualquier momento.
perro.color = 'Marrón'; // Agregar propiedad
console.log(perro.color); // Marron
perro.edad = 4; // Modificar propiedad
console.log(perro.edad) // 4
delete perro.raza; // Eliminar propiedad
console.log(perro.raza); //undefined

// 2. Pueden contener cualquier tipo de dato: números, cadenas, booleanos, arreglos, otros objetos, funciones, etc.
perro.habilidades = ['Correr', 'Saltar']; // Agregar arreglo como propiedad
console.log(perro.habilidades); //['Correr', 'Saltar']

// 3. No tienen un "molde" o "plantilla" fija: Cada objeto literal es único y no está vinculado a una clase o prototipo específico.
let gato = {
    nombre: 'Misu',
    raza: 'Siames',
    edad: 2,
    maullar: function() {
        console.log('Miau Miau');
    }
}; // Otro objeto literal diferente

console.log(gato.nombre); // Misu
gato.maullar(); // Miau Miau

// 4. Anidamiento: Los objetos literales pueden contener otros objetos literales como propiedades.
let persona = {
    nombre: 'Juan',
    direccion: {
        calle: 'Calle Falsa 123',
        ciudad: 'Springfield',
        pais: 'USA'
    },
    saludar: function() {
        console.log(`Hola, mi nombre es ${this.nombre} y vivo en la ciudad de ${this.direccion.ciudad}`);
    }
};

persona.saludar(); // Hola, mi nombre es Juan y vivo en la ciudad de Springfield

// 5. Atajo moderno (ES6) -> "Shortand Properties"
const nombre = "Ana";
const edad = 25;

const persona2 = {nombre, edad}; // Definir una clase que tenga atributos y variables de igual nombre
console.log(persona2.nombre);

const gato_casero = {
    nombre: "Michi",
    // Definicion de metodos mas rapidos
    maullar() { // Definicion de funciones sin usar function, ni dos puntos (:)
        console.log("Miau");
    }
}