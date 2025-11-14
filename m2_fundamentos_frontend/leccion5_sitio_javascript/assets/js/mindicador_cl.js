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
            // uf
            document.getElementById('codigo').innerHTML = dailyIndicators.uf.codigo;
            document.getElementById('fecha').innerHTML = dailyIndicators.uf.fecha;
            console.log(dailyIndicators.uf.fecha);
            document.getElementById('nombre').innerHTML = dailyIndicators.uf.nombre;
            document.getElementById('unidad_medida').innerHTML = dailyIndicators.uf.unidad_medida;
            let uf = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 2 })
                .format(dailyIndicators.uf.valor);
            document.getElementById('valor').innerHTML = uf;

            // dolar
            document.getElementById('codigo-dolar').innerHTML = dailyIndicators.dolar.codigo;
            document.getElementById('fecha-dolar').innerHTML = dailyIndicators.dolar.fecha;
            console.log(dailyIndicators.dolar.fecha);
            document.getElementById('nombre-dolar').innerHTML = dailyIndicators.dolar.nombre;
            document.getElementById('unidad_medida-dolar').innerHTML = dailyIndicators.dolar.unidad_medida;
            let dolar = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
                .format(dailyIndicators.dolar.valor);
            document.getElementById('valor-dolar').innerHTML = dolar;

            // bitcoin
            document.getElementById('codigo-bitcoin').innerHTML = dailyIndicators.bitcoin.codigo;
            document.getElementById('fecha-bitcoin').innerHTML = dailyIndicators.bitcoin.fecha;
            console.log(dailyIndicators.bitcoin.fecha);
            document.getElementById('nombre-bitcoin').innerHTML = dailyIndicators.bitcoin.nombre;
            document.getElementById('unidad_medida-bitcoin').innerHTML = dailyIndicators.bitcoin.unidad_medida;
            let bitcoin = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
                .format(dailyIndicators.bitcoin.valor);
            document.getElementById('valor-bitcoin').innerHTML = bitcoin;

            // euro
            document.getElementById('codigo-euro').innerHTML = dailyIndicators.euro.codigo;
            document.getElementById('fecha-euro').innerHTML = dailyIndicators.euro.fecha;
            console.log(dailyIndicators.euro.fecha);
            document.getElementById('nombre-euro').innerHTML = dailyIndicators.euro.nombre;
            document.getElementById('unidad_medida-euro').innerHTML = dailyIndicators.euro.unidad_medida;
            let euro = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 })
                .format(dailyIndicators.euro.valor);
            document.getElementById('valor-euro').innerHTML = euro;

            // libra-cobre
            document.getElementById('codigo-libra-cobre').innerHTML = dailyIndicators.libra_cobre.codigo;
            document.getElementById('fecha-libra-cobre').innerHTML = dailyIndicators.libra_cobre.fecha;
            console.log(dailyIndicators.libra_cobre.fecha);
            document.getElementById('nombre-libra-cobre').innerHTML = dailyIndicators.libra_cobre.nombre;
            document.getElementById('unidad_medida-libra-cobre').innerHTML = dailyIndicators.libra_cobre.unidad_medida;
            let libraCobre = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
                .format(dailyIndicators.libra_cobre.valor);
            document.getElementById('valor-libra-cobre').innerHTML = libraCobre;

            // utm
            document.getElementById('codigo-utm').innerHTML = dailyIndicators.utm.codigo;
            document.getElementById('fecha-utm').innerHTML = dailyIndicators.utm.fecha;
            console.log(dailyIndicators.utm.fecha);
            document.getElementById('nombre-utm').innerHTML = dailyIndicators.utm.nombre;
            document.getElementById('unidad_medida-utm').innerHTML = dailyIndicators.utm.unidad_medida;
            let utm = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
                .format(dailyIndicators.utm.valor);
            document.getElementById('valor-utm').innerHTML = utm;


            /*
            dailyIndicators.forEach(e => {
                let unidad_medida = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 2 })
                    .format(e.valor);
                document.createElement
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