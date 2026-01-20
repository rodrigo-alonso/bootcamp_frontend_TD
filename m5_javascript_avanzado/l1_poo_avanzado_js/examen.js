/**
 * Conceptos de encapsulamiento moderno de JavaScript (ES6+).
 * 3 pilares de una clase robusto:
 * - Encapsulamiento real: Usar #nota, lo que impide que alguien haga examen.#nota = -10 desde fuera.
 * - Validación centralizada: Al usar this.nota = valor dentro del constructor, garantizas que ningún 
 *      objeto nazca inválido.
 * - Abstracción: Usar el getter dentro del toString, lo que desacopla la representación interna de la externa.
 */
class Examen {
    #nota;

    constructor(valor) {
        // Esto dispara la función set, valida el dato y luego guarda en #nota.
        this.nota = valor; // Se usa un atributo publico
    } 

    set nota(valor) {
        if (valor < 0) {
            console.log("¡Error! Se asignó 0 por defecto.");
            this.#nota = 0;
            return;
        }
        this.#nota = valor;
    }

    get nota() {
        return this.#nota;
    }

    toString() {
        return `Nota: ${this.nota}`;
    }
}
const e1 = new Examen(-10); // Imprime "Error..." y pone la nota en 0.
const e2 = new Examen(10); // Guarda 10

console.log(`e1 -> ${e1}`); // Usando toString como metodo no necesito llamarlo ya que js lo reconoce automaticamente
console.log(`e2 -> ${e2}`);