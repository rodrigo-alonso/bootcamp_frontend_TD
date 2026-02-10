const { createApp } = Vue;

createApp({
    data() {
        return  {
            nombre: '',
            peso: null,
            estatura: null,
            imc: null,
            estado:  '',
            claseEstado: '',
            error: '',
            pacientes: []
        }      
    },

    mounted() {
        this.cargarPacientes();
    },

    computed: {
        promedioIMC() {
            if (this.pacientes.length === 0) return 0;

            const suma = this.pacientes.reduce((total,p) => {
                return total += parseFloat(p.imc);
            },0);

            return (suma / this.pacientes.length).toFixed(2);
        },
        contarEstados() {
            return {
                bajo_peso : this.pacientes.filter(p => p.estado === 'Bajo peso').length,
                peso_normal : this.pacientes.filter(p => p.estado === 'Peso normal').length,
                sobrepeso : this.pacientes.filter(p => p.estado === 'Sobrepeso').length,
                obesidad : this.pacientes.filter(p => p.estado === 'Obesidad').length,
            };
        }

    },

    methods: {
        calcularIMC() {
            this.error = '';
            this.imc = null;

            if (!this.nombre) {
                this.error = "Por favor, ingrese su nombre";
                return;
            }

            if (!this.peso || !this.estatura) {
                this.error = "Debes ingresar todos los valores solicitados";
                return;
            }

            if (this.peso <= 0 || this.estatura <= 0) {
                this.error = "Todos los valores deben ser mayores a 0 (cero)";
                return;
            }

            this.imc = (this.peso / Math.pow(this.estatura,2)).toFixed(2);

            
            this.definirEstado();
            this.guardarPaciente();
        },
        definirEstado() {
            if (this.imc < 18.5) {
                this.estado = 'Bajo peso';
                this.claseEstado = "alert-warning";
            }
            else if (this.imc < 25) {
                this.estado = 'Peso normal';
                this.claseEstado = "alert-success";
            }
            else if (this.imc < 30) {
                this.estado = 'Sobrepeso';
                this.claseEstado = "alert-warning";
            }
            else {
                this.estado = 'Obesidad';
                this.claseEstado = "alert-danger";
            }
        },
        limpiarFormulario() {
            this.nombre = '';
            this.peso = null;
            this.estatura = null;
            this.estado = '';
            this.claseEstado = '';
            this.imc = null;
            this.error = ''
        },
        guardarPaciente(){
            const paciente = {
                nombre : this.nombre,
                peso : this.peso,
                estatura : this.estatura,
                imc : this.imc,
                estado : this.estado,
                fecha : new Date().toLocaleString()
            };

            this.pacientes.push(paciente);
            localStorage.setItem('pacientes',JSON.stringify(this.pacientes));
        },
        cargarPacientes() {
            const data = localStorage.getItem('pacientes');
            if (data) {
                this.pacientes = JSON.parse(data);
            }
        },
        limpiarLocalStorage() {
            localStorage.removeItem('pacientes');

            this.pacientes = [];
        },
        claseFila(estado){
            return {
                'Bajo peso': 'table-warning',
                'Peso normal': 'table-success',
                'Sobrepeso': 'table-warning',
                'Obesidad': 'table-danger'
            }[estado] || '';
        }
    }



}).mount('#app');