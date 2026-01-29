const {createApp} = Vue; // Importa la función createApp desde el objeto Vue

createApp({
    data() { // Define la función data que retorna el estado reactivo de la aplicación
        return { // Retorna un objeto con las propiedades reactivas
            nombre: '',
            peso: null,
            estatura: null,
            imc: null,
            estado: '',
            claseEstado: '',
            error:''
        }
    },
    methods: {
        calcularIMC() {
            this.error = ''; // Reinicia el mensaje de error
            this.imc = null; // Reinicia el IMC
            
            // Validaciones básicas
            if (!this.nombre) {
                this.error = 'Por favor, ingresa tu nombre.';
                return;
            }
        
            if (!this.peso || !this.estatura) {
                this.error = 'Por favor, ingresa tu peso y estatura.';
                return;
            }

            if (this.peso <= 0 || this.estatura <= 0) {
                this.error = 'El peso y la estatura deben ser valores positivos.';
                return;
            }

            // Cálculo del IMC
            this.imc = (this.peso / Math.pow(this.estatura, 2)).toFixed(2)

            if (this.imc < 18.5) {
                this.estado = 'Bajo peso';
                this.claseEstado = 'alert-warning';
            } else if (this.imc < 25) {
                this.estado = 'Peso normal';
                this.claseEstado = 'alert-success';
            } else if (this.imc < 30) {
                this.estado = 'Sobrepeso';
                this.claseEstado = 'alert-warning';
            } else {
                this.estado = 'Obesidad';
                this.claseEstado = 'alert-danger';
            }
        },

        limpiarFormulario() {
            this.nombre = '';
            this.peso = null;
            this.estatura = null;
            this.imc = null;
            this.estado = '';
            this.claseEstado = '';
            this.error = '';
            return;
        }
    }

}).mount('#app'); // Monta la aplicación Vue en el elemento con id "app"