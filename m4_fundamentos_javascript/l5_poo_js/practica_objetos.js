/** Crear los siguientes objetos
 * Vehiculo: marca, modelo, año, color, velocidad | acelerar, arrancar, detenerse
 * Usuario: nombre, apellido, direccion (calle, depto, comuna), deportes | informacion
 * Paciente: nombre, peso, estatura | calcularIMC, estadoPaciente
 * 
 * Crear una lista de varios objetos de las clases creadas.
 */

let vehiculo = {
    marca:"Mazda",
    modelo:"CX-3",
    anio:2025,
    color:"plata",
    velocidad: 0,
    arrancar : function() {
        this.velocidad = 0;
        return `El vehiculo ${this.marca} ${this.modelo} arranco y su velocidad es ${this.velocidad}`
    },
    acelerar : function() {
        this.velocidad++;
        return `El vehiculo ${this.marca} ${this.modelo} aumento su velocidad y ahora es ${this.velocidad}`
    },
    detenerse : function() {
        this.velocidad = 0;
        return `El vehiculo ${this.marca} ${this.modelo} se detuvo y su velocidad es ${this.velocidad}`
    }
}

console.log(vehiculo.arrancar());

let usuario = {
    nombre : "Ana",
    apellido : "Gonzalez",
    direccion : {
        calle : "Av. Siempre Viva 123",
        depto : "5B",
        comuna : "Springfield"
    },
    deportes : ["futbol", "tenis", "natacion"],
    informacion : function() {
        return `Usuario: ${this.nombre} ${this.apellido}, Direccion: ${this.direccion.calle}, Depto: ${this.direccion.depto}, Comuna: ${this.direccion.comuna}, Deportes: ${this.deportes.join(", ")}`
    }   
}

console.log(usuario.informacion());

let paciente = {
    nombre : "Luis",
    peso : 80, // kg
    estatura : 1.75, // metros
    calcularIMC : function() {
        return this.peso / (this.estatura * this.estatura);
    },
    estadoPaciente : function() {
        let imc = this.calcularIMC();
        if (imc < 18.5) {
            return "Bajo peso";
        } else if (imc >= 18.5 && imc < 24.9) {
            return "Peso normal";
        } else if (imc >= 25 && imc < 29.9) {
            return "Sobrepeso";
        } else {
            return "Obesidad";
        }
    }
}

console.log(`IMC: ${paciente.calcularIMC().toFixed(2)}, Estado: ${paciente.estadoPaciente()}`);

// Lista de objetos vehiculos
let vehiculos = [
    {marca: "Toyota", modelo: "Corolla", anio: 2020, color: "blanco"},
    {marca: "Honda", modelo: "Civic", anio: 2019, color: "negro"},
    {marca: "Ford", modelo: "Focus", anio: 2018, color: "azul"}
];

console.log("Lista de Vehiculos:");
vehiculos.forEach(v => {
    console.log(`${v.marca} ${v.modelo} - Año: ${v.anio}, Color: ${v.color}`);
});

// Lista de objetos usuarios
let usuarios = [
    {nombre: "Carlos", apellido: "Perez", direccion: {calle: "Calle 1", depto: "1A", comuna: "Comuna1"}, deportes: ["basketball", "voley"]},
    {nombre: "Maria", apellido: "Lopez", direccion: {calle: "Calle 2", depto: "2B", comuna: "Comuna2"}, deportes: ["tenis", "golf"]},
    {nombre: "Jorge", apellido: "Ramirez", direccion: {calle: "Calle 3", depto: "3C", comuna: "Comuna3"}, deportes: ["futbol", "natacion"]}
];

console.log("Lista de Usuarios:");
usuarios.forEach(u => {
    console.log(`${u.nombre} ${u.apellido} - Direccion: ${u.direccion.calle}, Depto: ${u.direccion.depto}, Comuna: ${u.direccion.comuna}, Deportes: ${u.deportes.join(", ")}`);
});

// Lista de objetos pacientes
let pacientes = [
    {nombre: "Ana", peso: 60, estatura: 1.65},
    {nombre: "Pedro", peso: 90, estatura: 1.80},
    {nombre: "Sofia", peso: 70, estatura: 1.70}
];

console.log("Lista de Pacientes:");
pacientes.forEach(p => {
    let imc = p.peso / (p.estatura * p.estatura);
    let estado = "";
    if (imc < 18.5) {
        estado = "Bajo peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        estado = "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        estado = "Sobrepeso";
    } else {
        estado = "Obesidad";
    }
    console.log(`${p.nombre} - IMC: ${imc.toFixed(2)}, Estado: ${estado}`);
}); 