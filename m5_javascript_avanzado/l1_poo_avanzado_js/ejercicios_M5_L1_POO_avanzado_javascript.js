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
 * y así sucesivamente hasta llegar al final de la cadena de prototipos.
 * 
 * En JavaScript moderno , las clases son esencialmente azúcar sintáctico sobre el sistema de prototipos existente.
 * Esto significa que cuando defines una clase y sus métodos,
 * esos métodos se agregan al prototipo de la clase.
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

class Auto {
  constructor(marca) { 
    this.marca = marca; 
  }
}

console.log(typeof Auto); // function