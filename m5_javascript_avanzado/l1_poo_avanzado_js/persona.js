export class Persona {
    #rut;
    #nombre;
    #apellido;
    #email;
    #edad;

    constructor(rut, nombre, apellido, email, edad) {
        this.#rut = rut;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#email = email;
        this.#edad = edad;
    }

    get rut() {
        return this.rut;
    }

    set rut(nuevoRut) {
        // Validar formato de RUT chileno (simplificado)
        const rutRegex = /^\d{7,8}-[0-9kK]$/;
        if (!rutRegex.test(nuevoRut)) {
            throw new Error("Formato de RUT inválido");
        }
        this.#rut = nuevoRut;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nuevoNombre) {
        if (!this.#validaString(nuevoNombre, 50)) {
            throw new Error("El nombre debe tener entre 1 y 50 caracteres");
        }
        this.#nombre = nuevoNombre;
    }

    get apellido() {
        return this.#apellido;
    }

    set apellido(nuevoApellido) {
        if (!this.#validaString(nuevoApellido, 50)) {
            throw new Error("El apellido debe tener entre 1 y 50 caracteres");
        }
        this.#apellido = nuevoApellido;
    }

    get email() {
        return this.#email;
    }

    set email(nuevoEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(nuevoEmail)) {
            throw new Error("Formato de email inválido");
        }
        this.#email = nuevoEmail;
    }

    get edad() {
        return this.#edad;
    }

    set edad(nuevaEdad) {
        if (!Number.isInteger(nuevaEdad) || nuevaEdad < 0 || nuevaEdad > 120) {
            throw new Error("La edad debe ser un número entero entre 0 y 120");
        }
        this.#edad = nuevaEdad;
    }

    // Metodo privado para validar cadenas
    #validaString(cadena, longitudMaxima) {
        return cadena.length > 0 && cadena.length <= longitudMaxima;
    }

    saludar() {
        return `Hola me llamo ${this.nombre} ${this.apellido}`;
    }
}

// const persona = new Persona("11.111.111-1", "Alan", "Brito", "juan.perez@mail.com", "30");
// console.log(persona.saludar());