const app = Vue.createApp({
    data() {
        return {
            mensaje: 'Hola Mundo, esta es mi primera aplicacion en Vue',
            nombre: 'Juan'
        }
    }
});

app.mount('#app');