function sumar() {
    let valor1 = document.getElementById('num1').value;
    let valor2 = document.getElementById('num2').value;
    try {
        if (valor1 === "" || isNaN(valor1) || valor2 === "" || isNaN(valor2))
            throw "Entrada no válida: Por favor, ingrese números válidos.";

        let resultado = parseFloat(valor1) + parseFloat(valor2);
        document.getElementById('error').style.display = 'none';
        document.getElementById('resultado').style.display = 'block';
        document.getElementById('resultado').innerHTML = resultado;

    } catch (error) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('resultado').style.display = 'none';
        document.getElementById('error').innerHTML = error;
        return;
    }
}

function restar() {
    let valor1 = document.getElementById('num1').value;
    let valor2 = document.getElementById('num2').value;
    try {
        if (valor1 === "" || isNaN(valor1) || valor2 === "" || isNaN(valor2))
            throw "Entrada no válida: Por favor, ingrese números válidos.";

        let resultado = parseFloat(valor1) - parseFloat(valor2);
        document.getElementById('error').style.display = 'none';
        document.getElementById('resultado').style.display = 'block';
        document.getElementById('resultado').innerHTML = resultado;

    } catch (error) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('resultado').style.display = 'none';
        document.getElementById('error').innerHTML = error;
        return;
    }
}

function multiplicar() {
    let valor1 = document.getElementById('num1').value;
    let valor2 = document.getElementById('num2').value;
    try {
        if (valor1 === "" || isNaN(valor1) || valor2 === "" || isNaN(valor2))
            throw "Entrada no válida: Por favor, ingrese números válidos.";

        let resultado = parseFloat(valor1) * parseFloat(valor2);
        document.getElementById('error').style.display = 'none';
        document.getElementById('resultado').style.display = 'block';
        document.getElementById('resultado').innerHTML = resultado;

    } catch (error) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('resultado').style.display = 'none';
        document.getElementById('error').innerHTML = error;
        return;
    }
}

function dividir() {
    let valor1 = document.getElementById('num1').value;
    let valor2 = document.getElementById('num2').value;
    try {
        if (valor1 === "" || isNaN(valor1) || valor2 === "" || isNaN(valor2))
            throw "Entrada no válida: Por favor, ingrese números válidos.";
        if (parseFloat(valor2) === 0)
            throw "Error: División por cero no está permitida.";

        let resultado = parseFloat(valor1) / parseFloat(valor2);
        document.getElementById('error').style.display = 'none';
        document.getElementById('resultado').style.display = 'block';
        document.getElementById('resultado').innerHTML = resultado;

    } catch (error) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('resultado').style.display = 'none';
        document.getElementById('error').innerHTML = error;
        return;
    }
}

function limpiar() {
    document.getElementById('num1').value = "0";
    document.getElementById('num2').value = "0";
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('error').style.display = 'none';
}