// Composition API 
const { createApp, ref } = Vue;

// Implementacion escencial de Composition API
// createApp({
//     setup() {
//         return{

//         }
//     },
// }).mount('#app');

createApp({
    setup() {

        const eventos = ref([]);
        const nombre = ref('');
        const pais = ref('');

        const registrarEvento = (tipo) => {
            eventos.value.unshift(
                `Evento: ${tipo} - ${new Date().toLocaleTimeString()}`
            )
        }

        const registrarTecla = (e) => {
            eventos.value.unshift(
                `Tecla: ${e.key} (${e.type}) - ${new Date().toLocaleTimeString()}`
            )
        }

        const registrarEventoInput = (e) => {
            eventos.value.unshift(
                `Input: ${e.target.value} - ${new Date().toLocaleTimeString()}`
            )
        }

        const enviarFormulario = (e) => {
            registrarEvento(`Submit formulario (Nombre: ${nombre.value}, Pais: ${pais.value})`);
            nombre.value = ''; // Limpia el input del nombre
            pais.value = ''; // Limpia el input del pais
        }

        const seleccionarTodo = (e) => {
            e.preventDefault(); // Evento x defecto prevenido
            e.target.select(); // Evento que permite seleccionar todo el texto
            eventos.value.unshift( // Evento que muestra el mensaje de que se ha seleccionado el texto
                `CTRL + m -> texto seleccionado - ${new Date().toLocaleTimeString()}`
            );
        }

        // Se usa cuando se selecciona un combobox, radiobutton, select
        const eventoChange = (e) => {
            eventos.value.unshift(
                `Change: ${e.target.value} - ${new Date().toLocaleTimeString()}` //Selecciona el value elejido x usuario y lo muestra
            )
        }

        return {
            eventos,
            nombre,
            pais,
            registrarEvento,
            registrarTecla,
            registrarEventoInput,
            enviarFormulario,
            seleccionarTodo,
            eventoChange
        }
    },
}).mount('#app');