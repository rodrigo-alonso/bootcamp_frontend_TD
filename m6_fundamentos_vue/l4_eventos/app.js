// Composition API 
const {createApp, ref} = Vue;

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
                `Evento: ${tipo} - ${new Date().toLocaleDateString()}`
            )
        }

        const registrarTecla = (e) => {
            eventos.value.unshift(
                `Tecla: ${e.key} (${e.type}) - ${new Date().toLocaleDateString()}`
            )
        }

        const registrarEventoInput = (e) => {
            eventos.value.unshift(
                `Input: ${e.target.value}`
            )
        }

        return{
            eventos,
            registrarEvento,
            registrarTecla,
            registrarEventoInput
        }
    },
}).mount('#app');