/* Pilares de la POO 
1. Abstraccion
2. Encapsulamiento
*/
let persona = {
    rut : "1111111-1",
    nombre : "Elba",
    apellido : "Lazo",
    email : function() {return (this.nombre + "." + this.apellido + "@empresa.com").toLowerCase()}, // this hace referencia a la variable de este objeto
    sueldo : 1800000,
    colores_favoritos : ["Rojo", "azul", "morado"],
    saludar : function () {return `Hola me llamo ${this.nombre} ${this.apellido} y tengo ${this.edad} años.`}
}

console.log(persona.nombre + " " + persona.apellido);
persona.apellido = "Lazito";
console.log(persona.nombre + " " + persona.apellido);
console.log(persona.saludar());
console.log(persona.email());
console.log(persona.saludar());

// Clase nula
let vehiculo = {

}
console.log(typeof(vehiculo));

// Agregar atributos despues de definir una clase vacia
vehiculo.marca = "Ferrari";
vehiculo.modelo = "F50";
vehiculo.precio = "250000";

// Agregar metodos 
vehiculo.informacion = function () {
    return "Marca: " + this.marca + " | Modelo: " + this.modelo + "| Valor: USD " + this.precio;
}

console.log(vehiculo.informacion());
 
// Metodo de la clase Object que retorna los atributos de la clase
console.log(Object.keys(vehiculo));
