import { Persona } from "./persona.js";

export class Docente extends Persona {
    #titulo;
    #sueldo;
    
    constructor(rut, nombre, apellido, email, edad, titulo, sueldo) {
        super(rut, nombre, apellido, email, edad); // Llamada al constructor de la clase padre Persona
        this.#titulo = titulo;
        this.#sueldo = sueldo;
    }

    get titulo() {
        return this.#titulo;
    }

    set titulo(nuevoTitulo) {
        if (nuevoTitulo.length === 0) {
            throw new Error("El título no puede estar vacío");
        }
        this.#titulo = nuevoTitulo;
    }

    get sueldo() {
        return this.#sueldo;
    }

    set sueldo(nuevoSueldo) {
        if (typeof nuevoSueldo !== 'number' || nuevoSueldo < 0) {
            throw new Error("El sueldo debe ser un número positivo");
        }
        this.#sueldo = nuevoSueldo;
    }

    saludar() {
        return `${super.saludar()} profesor(a) universitario y mi titulo es ${this.titulo}`;
    }
}

// const docente = new Docente("98765432-1", "Ana", "Gomez", "ana.gomez@example.com", 40, "Doctorado en Matemáticas", 4000000);
// console.log(docente.saludar());
// docente.sueldo = 4600000;
// console.log(docente.sueldo);

// // Intento de asignar un valor inválido
// try {
//     docente.titulo = ""; // Esto lanzará un error
// } catch (error) {
//     console.error(error.message);
// }