/*
console.log("¡Hola, mundo!");
let nombre = "Rodrigo";
console.log("Mi nombre es " + nombre);
document.getElementById("saludo").innerHTML = "¡Hola, " + nombre + "! Bienvenido a mi sitio web.";
*/

function mostrarFechaActualizable() {
    let nombre = "Rodrigo";
    let fecha = new Date();
    // El uso de ` ` (template literals) para insertar variables en la cadena
    document.getElementById('saludo').innerHTML = `Hola, ${nombre}.`;
    document.getElementById('fecha').innerHTML = `Hola, ${nombre}. 
    La fecha y hora actual es: ${fecha.toLocaleString()}`;

    // Llama a la función de nuevo después de 1 segundo (1000 ms)
    // setInterval() es otra forma de hacerlo
    setTimeout(mostrarFechaActualizable, 1000);
    /*
    setInterval(function() {
        mostrarFechaActualizable()
    }, 1000);
    */
}

function cazadores() {
    document.getElementById('pilares').src='assets/img/tanjiro.jpg';
    document.getElementById('pilares').alt='Tanjiro Kamado';
}

function pilares() {
    document.getElementById('pilares').src='assets/img/pilares.jpg';
    document.getElementById('pilares').alt='Pilares de Demon Slayer';
}