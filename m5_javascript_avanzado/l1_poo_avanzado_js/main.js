import { Docente } from "./docente.js";
import { Alumno } from "./alumno.js";
import { Persona } from "./persona.js";

const persona = new Persona("11.111.111-1", "Alan", "Brito", "juan.perez@mail.com", "30");
const alumno = new Alumno("12345678-9", "Juan", "Perez", "juan.perez@example.com", 25, "Ingeniería", 1998);
const docente = new Docente("98765432-1", "Ana", "Gomez", "ana.gomez@example.com", 40, "Doctorado en Matemáticas", 4000000);

// console.log(persona.saludar());
// console.log(alumno.saludar());
// console.log(docente.saludar());

let listaPersona = [];
listaPersona.push(persona);
listaPersona.push(alumno);
listaPersona.push(docente);

listaPersona.forEach(persona => {
    console.log(persona.saludar());
});