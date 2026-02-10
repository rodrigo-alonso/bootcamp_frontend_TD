/**
 * 1. Clases
 * Definir una clase que modele a un alumno de una institución educacional.
 * Incluya todos los atributos que sean necesarios para describirlo
 * correctamente, como, por ejemplo: carrera. Agregue un método que
 * muestre ordenadamente todos sus atributos.
 */
class Alumno {
    #nombre;
    #apellido;
    #rut;
    #email;
    #carrera;

    constructor(nombre, apellido, rut, email, carrera) {
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#rut = rut;
        this.#email = email;
        this.#carrera = carrera;
    }

    toString() {
        return `
        nombre: ${this.#nombre}
        apellido: ${this.#apellido}
        rut: ${this.#rut}
        email: ${this.#email}
        carrera: ${this.#carrera}`
    }
}

const alumno = new Alumno("Tanjiro", "Kamado", "11.111.111-1", "kamado.tanjiro@mail.com", "Cazador de demonios");
console.log(alumno);

/**
 * 2. Clases y objetos
 * Definir una clase que modele a una banda musical. Incluya todos los
 * atributos que sean necesarios para describirlo correctamente, como por
 * ejemplo: número de integrantes. Agregue un método muestre
 * ordenadamente todos sus atributos y otro para listar solo los discos
 * publicados.
 * Para probar su clase, instancie un objeto de la clase BandaMusical y llénelo
 * con los datos de su banda favorita.
 */

// class BandaMusical {
//     #nombre
//     #genero
//     #numero_integrantes
//     #discos

//     constructor(nombre, genero, numero_integrantes, discos) {
//         this.#nombre = nombre;
//         this.#genero = genero;
//         this.#numero_integrantes = numero_integrantes;
//         this.discos = discos;
//     }

//     to_string() {
//         return `
//         nombre`
//     }
// }