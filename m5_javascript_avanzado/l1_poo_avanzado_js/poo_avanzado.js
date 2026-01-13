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

    get area() {                           // <- Metodos de instancia
        return this.calcArea();
    }

    calcArea() {
        return this.alto * this.ancho;
    }
}

const cuadrado = new Rectangulo(10, 10);
console.log(cuadrado.area);