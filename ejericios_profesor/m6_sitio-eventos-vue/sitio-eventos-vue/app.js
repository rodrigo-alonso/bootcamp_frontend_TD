const { createApp, ref } = Vue;

createApp({

    setup() {

        const eventos = ref([])
        const nombre = ref('')
        const pais = ref('')

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
                `Input: ${e.target.value}`
            )
        }

        const enviarFormulario = () => {
            registrarEvento(`submit formulario(Nombre: ${nombre.value}, País: ${pais.value})`)
            nombre.value = ''
            pais.value = ''
        }

        const eventoChange = (e) => {
            eventos.value.unshift(
                `Change: ${e.target.value}`
            )
        }

        const seleccionarTodo = (e) => {
            e.preventDefault()
            e.target.select()
            eventos.value.unshift(
                `CTRL + m -> texto seleccionado`
            )
        }


        return {
            eventos,
            registrarEvento,
            registrarTecla,
            registrarEventoInput,
            enviarFormulario,
            seleccionarTodo,
            eventoChange
        }
    },

}).mount('#app');