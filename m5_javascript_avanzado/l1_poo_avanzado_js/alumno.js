import { Persona } from "./persona.js";

export class Alumno extends Persona {
    #carrera;
    #anio_nacimiento;
    
    constructor(rut, nombre, apellido, email, edad, carrera, anio_nacimiento) {
        super(rut, nombre, apellido, email, edad); // Llamada al constructor de la clase padre Persona
        this.#carrera = carrera;
        this.#anio_nacimiento = anio_nacimiento;
    }

    get carrera() {
        return this.#carrera;
    }

    set carrera(nuevaCarrera) {
        if (nuevaCarrera.length === 0) {
            throw new Error("La carrera no puede estar vacía");
        }
        this.#carrera = nuevaCarrera;
    }

    get anio_nacimiento() {
        return this.#anio_nacimiento;
    }

    set anio_nacimiento(nuevoAnio) {
        const currentYear = new Date().getFullYear();
        if (!Number.isInteger(nuevoAnio) || nuevoAnio < 1900 || nuevoAnio > currentYear) {
            throw new Error("El año de nacimiento debe ser un número válido entre 1900 y el año actual");
        }
        this.#anio_nacimiento = nuevoAnio;
    }

    // Sobrescribir el metodo, llamando a su implementacion inicial y agregar mas datos
    saludar() {
        return `${super.saludar()} y estoy estudiando ${this.carrera}`;
    }
}

// const alumno = new Alumno("12345678-9", "Juan", "Perez", "juan.perez@example.com", 25, "Ingeniería", 1998);
// console.log(alumno.saludar());
// alumno.carrera = "Medicina";
// console.log(alumno.carrera);

// // Intento de asignar un valor inválido
// try {
//     alumno.anio_nacimiento = 1800; // Esto lanzará un error
// } catch (error) {
//     console.error(error.message);
// }