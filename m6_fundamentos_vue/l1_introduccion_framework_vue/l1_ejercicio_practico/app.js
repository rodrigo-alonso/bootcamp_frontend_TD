// Option API

const { createApp } = Vue;

createApp({
    data () {
        return {
            nombre: '',
            datosJson: null
        }
    },
    async mounted() {
        try {
            const response = await fetch('info.json')
            this.datosJson = await response.json();
            console.log(this.datosJson)
        } catch (error) {
            console.error("Error al leer el JSON")
        }
    },

    methods: {
        cargarPirata() {
            const data = datosJson;
            
        }
    }
}).mount('#app');