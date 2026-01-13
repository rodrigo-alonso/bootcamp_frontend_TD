class Alumno {
    /** Importante: Los atributos de clase no es necesario agregarlos a menos que se quiera
     * encapsular (dejar como privado) los atributos
    */ 
    // Atributos de clase vacios
    rut;
    #nombreReal;
    #apellidoReal;
    email;
    carrera;
    matriculado = true; // Atributos x defecto 

    //#rut //Atributo privado 

    // Constructor vacio (una clase solo puede tener un constructor vacio o con atributos)
    //constructor() {};
    
    // Constructor con atributos
    constructor(rut, nombre, apellido, email, carrera, edad=null, anio_nacimiento) {
        // Atributos de instancia
        //this.#rut = rut // Atributo de instancia para atributo de clase privado -> Para visualizar se debe crear metodo especifico
        this.rut = rut;
        this.#nombreReal = nombre;
        this.#apellidoReal = apellido;
        this.email = email;
        this.carrera = carrera;
        this.edad = edad;
        this.anio_nacimiento = anio_nacimiento;
    };
    
    /** Accesadores y Mutadores 
     * ¿Cuándo y Cómo usarlos? (Casos de uso reales)
     * Caso A: Validación de Datos (Protección)
     * Caso B: Propiedades Computadas (Calculadas)
     * Caso C: Encapsulamiento y Compatibilidad
     * Caso D: Propiedades de solo lectura (Read-Only)
    */


    // Accesador
    get nombre() {
        return this.#nombreReal;
    }

    // Mutador
    // Uso para validar datos
    set nombre(nuevoNombre) {
        if (nuevoNombre.length > 0 && nuevoNombre.length <= 30){
            this.#nombreReal = nuevoNombre;
        } 
        console.log("Debes ingresar un nombre de tamaño mayor a 0 y menor a 30 caracteres");
        return;
    }

    set edad(edad) {
        if (!Number.isInteger(edad) || edad < 0 || edad > 100) {
            throw new Error("La edad debe ser un numero entre 1 y 100");
        }
        this.edad = edad;
    }

}

const alumno1 = new Alumno();
console.log(alumno1.nombre);
const alumno2 = new Alumno("19.876.654-k", "Elba", "Lazo", "elba.lazo@mail.com", "Ingenieria Civil", 26 ,2000);
console.log(alumno2.nombre);
console.log(alumno2.matriculado);
console.log(alumno2.anio_nacimiento);
alumno2.nombre = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalan";
alumno2.edad(120);