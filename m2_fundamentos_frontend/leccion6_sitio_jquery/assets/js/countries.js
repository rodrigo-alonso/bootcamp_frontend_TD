$(function () {
    let urlRestCountries = 'https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,translations,region,coatOfArms';
    $.getJSON(urlRestCountries, function (dataCountries) {
        console.log(dataCountries);
        let table_body = '';

        for (let i = 0; i < dataCountries.length; i++) {
            const element = dataCountries[i];
            table_body +=
                ` 
                <tr>
                    <td>${element.translations.spa.common}</td>
                    <td>${element.capital}</td>
                    <td>${element.region}</td>
                    <td>${element.currencies ? Object.keys(element.currencies)[0] : 'N/A'}</td>
                    <td>
                    <img id="img-country" src="${element.flags.svg}" alt="Bandera de ${element.translations.spa.common}" width="50">
                    </td>
                    <td>
                    <img src="${element.coatOfArms.png ? element.coatOfArms.png : 'assets/img/missing-image-svgrepo-com.svg'}" alt="Escudo de ${element.translations.spa.common}" width="50">
                    </td>
                </tr>
                `
        }
        $('#table_body').append(table_body);

    }).fail(function () {
        Swal.fire({
            title: "Ups!",
            text: "Al parecer tenemos problemitas con la conexion a la API de Countries.",
            icon: "error"
        });
    });
});

$(function(){
    // Cuando escribo una letra y al subir el keycup se ejecuta la funcion
    $('#filtro').on('keyup', function() {
        let texto = $(this).val().toLowerCase();
        // seleccion el table_body y sus tr (filas) para filtrar
        $('#table_body tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(texto) > -1)
        });
    })
});