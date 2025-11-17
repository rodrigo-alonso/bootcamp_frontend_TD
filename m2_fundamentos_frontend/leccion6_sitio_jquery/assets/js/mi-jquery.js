// Uso de jQuery para manipular el DOM
$(function() {

    // Crear la funcion que obtenga la fecha y la despliegue en el parrafo con id "fecha-actual"
    function mostrarFechaActualizableJquery() {
        let fecha = new Date();
        $('#fecha').text('Hola hoy es ' + fecha);
    };

    // Invocamos a la funcion
    mostrarFechaActualizableJquery();

    // Para que la fecha se actualice
    setInterval(mostrarFechaActualizableJquery, 1000);
});

// mouseover = mouseenter y mouseout = mouseleave
$(function() {
    $('#pilares').mouseover(function() {
        //$(this) = hace referencia a este mismo objeto #pilares
        $(this).prop('src', 'assets/img/tanjiro.jpg').prop('alt', 'Cazadores');
    });

    $('#pilares').mouseout(function() {
        $(this).prop('src', 'assets/img/pilares.jpg').prop('alt', 'Pilares');
    });

    $('#btn1').on('click', function(){
        // $('#pilares') hace referencia al objeto pilares
        $('#pilares').prop('src', 'assets/img/tanjiro.jpg').prop('alt', 'Cazadores');
    });

    $('#btn2').on('click', function(){
        $('#pilares').prop('src', 'assets/img/pilares.jpg').prop('alt', 'Pilares');
    });

    $('#parrafo1').on({
        'mouseover': function() {
            // Se quita una clase y agrega otra (no es necesario)
            $(this).removeClass('text-dark').addClass('text-danger');
        },
        'mouseout': function() {
            // Se quita la clase agregada y se vuelve a la anterior
            $(this).removeClass('text-danger').addClass('text-dark');
        }
    });

    $('#parrafo2').on('click', function() {
        $(this).toggleClass('bg-dark text-white');
    }); 

    $('#btn3').on('click', function() {
        $('#parrafo3').hide(2000);
    });

    $('#btn4').on('click', function() {
        $('#parrafo3').show(2000);
    });

    // Toggle combina hide y show
    $('#btn5').on('click', function() {
        $('#parrafo3').toggle(2000);
    });

    $('#btn6').on('click', function() {
        $('#cazadores2').slideUp(2000);
    });

    $('#btn7').on('click', function() {
        $('#cazadores2').slideDown(2000);
    });

    // Toggle combina hide y show
    $('#btn8').on('click', function() {
        $('#cazadores2').slideToggle(2000);
    });

    $('#btn9').on('click', function() {
        $('#paises').slideToggle(2000);
    });

    $('#btn10').on('click', function() {
        $('#parrafo4').before('<p>Este es un párrafo agregado antes del párrafo 4.</p>');
    });

    $('#btn11').on('click', function() {
        $('#parrafo5').after('<p>Este es un párrafo agregado después del párrafo 5.</p>');
    });

    $('#btn12').on('click', function() {
        $('#parrafo6').append('<p>Este es un párrafo agregado al final del párrafo 6.</p>');
    });

    $('#btn13').on('click', function() {
        $('#parrafo7').html('<p>Este es un párrafo que reemplaza el contenido del párrafo 7.</p>');
    });


});