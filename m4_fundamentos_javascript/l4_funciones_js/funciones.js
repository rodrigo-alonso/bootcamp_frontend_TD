// Parametros en las funciones (Funciones parametrizadas)
function saludar(valor1) {
    console.log("Hola " + valor1);
}

saludar("Rodrigo");

function saludar(valor1, valor2) {
    //console.log("Hola " + valor1 + " " + valor2);
    console.log(`Hola ${valor1} ${valor2}`);
}

// Funciones con n parametros no definidos
function saludar(...valores) {
    let valor = "";
    for (let val of valores) {
        valor += (val + " ");
    }
    console.log(`Hola ${valor}`)
}


saludar("Elba");
saludar("Elba", "Lazo");
saludar("Elba", "Lazo", "Gatillo");
saludar("Elba", "Lazo", "Gatillo", "Facil");

function areaCircunferencia(radio) {
    let area = (Math.PI * Math.pow(radio, 2)).toFixed(3);
    console.log(`Area: ${area}`);
}

areaCircunferencia(3);

// Funciones que retornan valores

function calcularImc(peso, estatura) {
    let imc = (peso / Math.pow(estatura, 2)).toFixed(2);

    function estadoIMC(imc) { // Funcion anidada
        if (imc < 18,5) {
            return "Bajo peso";
        } else if (imc >= 18.5 && imc <= 24.9) {
            return "Peso normal";
        } else if (imc >= 25 && imc < 29.9) {
            return "Sobrepeso";
        } else {
            return "Obesidad";
        }
    }

    return `Segun peso ${peso} kg y estatura ${estatura} cm su IMC es ${imc} y su estado es ${estadoIMC(imc)}`; 
}

console.log(calcularImc(82, 192));

