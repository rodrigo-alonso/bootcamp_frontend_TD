import saludar from "./saludar.js";
import suma from "./suma.js";
import sustraccion from "./sustraccion.js";
import multiplicacion from "./multiplicacion.js";
import division from "./division.js";
import './style.css'

console.log(saludar("Rodrigo"))
document.getElementById("saludito").innerHTML = `${saludar("Rodrigo")}`;

const n1 = document.querySelector("#n1");
const n2 = Document.querySelector("#n2");
const op = document.querySelector("#op");
const btn = document.querySelector("#btn");
const resultado = document.querySelector("#resultado");

btn.addEventListener('click', e => {
    switch(op.value) {
        case '+': resultado.textContent = suma(n1.value, n2.value); break;
        case '-': resultado.textContent = sustraccion(n1.value, n2.value); break;
        case '*': resultado.textContent = multiplicacion(n1.value, n2.value); break;
        case '/': resultado.textContent = division(n1.value, n2.value); break;
    }
});

btn.addEventListener('mouseover', e => {
    btn.style.backgroundColor = 'lightblue';
});

btn.addEventListener('mouseout', e => {
    btn.style.backgroundColor = '';
});