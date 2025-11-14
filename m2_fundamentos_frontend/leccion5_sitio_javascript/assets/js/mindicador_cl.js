/*
Llamada a la API sin necesidad de ser invocado por una llamada a una funcion
DRY segun este patron, si necesito llamara a la api nuevamente, tendria q volver a escribir la llamada
rompiendo el principio de este patron.
*/
/*
fetch('https://mindicador.cl/api')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Aquí puedes agregar código para mostrar los datos en tu página
    })
    .catch(error => console.error('Error:', error));
*/

function indicadoresEconomicos() {
    fetch('https://mindicador.cl/api')
        .then(function (response) { // then es la promesa (promises) en JS
            return response.json();
        })
        .then(function (dailyIndicators) {
            console.log(dailyIndicators);
            document.getElementById('codigo').innerHTML = dailyIndicators.uf.codigo;
            document.getElementById('nombre').innerHTML = dailyIndicators.uf.nombre;
            document.getElementById('unidad_medida').innerHTML = dailyIndicators.uf.unidad_medida;
            document.getElementById('fecha').innerHTML = dailyIndicators.uf.fecha;
            let uf = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 2 })
                .format(dailyIndicators.uf.valor);
            document.getElementById('valor').innerHTML = uf;

            /*
            dailyIndicators.forEach(e => {
                let unidad_medida = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 2 })
                    .format(e.valor);
                document.getElementById('nombre').innerHTML = e.nombre;
                document.getElementById('unidad_medida').innerHTML = unidad_medida;
            });
            */
        })
        .catch(function (error) {
            console.error('RequestFailed: ', error);
        })
        .finally(function () {
            console.log('Desconectandome de la API');
        })
}