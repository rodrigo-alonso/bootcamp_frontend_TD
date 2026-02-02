const { createApp } = Vue; // Importa la función createApp desde el objeto Vue
const alert_warning = 'alert-warning';
const alert_success = 'alert-success';
const alert_danger = 'alert-danger';
const bajo_peso = 'Bajo peso';
const peso_normal = 'Peso normal';
const sobrepeso = 'Sobrepeso';
const obesidad = 'Obesidad';

// TODO: Coockie, crud

createApp({
    // Funcion data: retorna el estado reactivo de la aplicación
    data() { // Define la función data de la aplicación
        return { // Retorna un objeto con las propiedades reactivas
            // Datos doctor (cookie)
            doctor: '',
            doctorInput: '',

            // Datos del paciente
            nombre: '',
            peso: null,
            estatura: null,
            imc: null,
            estado: '',
            claseEstado: '',
            error: '',

            // Datos en Local Storage
            pacientes: [],
            modoEdicion: false,
            indiceEdicion: null
        }
    },

    mounted() { // Hook del ciclo de vida que se ejecuta cuando la aplicación está montada
        this.cargarPaciente(); // Llama al método para cargar los pacientes desde Local Storage
        this.cargarDoctor(); // Llama al método para cargar el nombre del doctor desde la cookie
    },

    computed: { // Define las propiedades computadas de la aplicación sin tener que recargar el sistema
        promedioIMC() { // Propiedad computada para calcular el promedio de IMC de los pacientes
            if (this.pacientes.lenth === 0) return 0; // Si no hay pacientes, retorna 0
            const suma = this.pacientes.reduce((total, p) => {
                return total += parseFloat(p.imc);
            }, 0);
            return (suma / this.pacientes.length).toFixed(2);
        },

        contarEstados() { // Propiedad computada para contar los pacientes en cada estado de salud
            return {
                bajo_peso: this.pacientes.filter(p => p.estado === bajo_peso).length,
                peso_normal: this.pacientes.filter(p => p.estado === peso_normal).length,
                sobrepeso: this.pacientes.filter(p => p.estado === sobrepeso).length,
                obesidad: this.pacientes.filter(p => p.estado === obesidad).length,
            }
        }

    },

    methods: { // Define los métodos de la aplicación
        // Metodos doctor (cookie)
        guardarDoctor() { // Método para guardar el nombre del doctor en una cookie
            if (!this.doctorInput) return; // Si el input está vacío, no hace nada
            // max-age en segundos
            document.cookie = `doctorNombre=${this.doctorInput}; max-age=60; path=/`; // Guardado de datos doctor en cookie por 1 minuto
            this.doctor = this.doctorInput;
            this.doctorInput = '';
        },

        cargarDoctor() { // Método para cargar el nombre del doctor desde la cookie
            const cookie = document.cookie.split().find(c => c.startsWith('doctorNombre'));
            if (cookie) {
                this.doctor = cookie.split('=')[1];
            }
        },

        eliminarDoctor() { // Método para eliminar la cookie del doctor
            document.cookie = 'doctorNombre=; max-age=0; path=/'; // Elimina la cookie del doctor
            this.doctor = '';
            this.doctorInput = '';
        },

        definirAccionFormulario() { // Método para definir la acción del formulario (calcular o actualizar)
            this.modoEdicion ? this.actualizarPaciente() : this.calcularIMC();
        },

        // Metodos CRUD pacientes
        calcularIMC() { // Método para calcular el IMC
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

            this.definirEstado(); // Llama al método para definir el estado de salud basado en el IMC
            this.guardarPaciente(); // Llama al método para guardar el paciente con los datos calculados  
        },

        definirEstado() { // Método para definir el estado de salud basado en el IMC
            if (this.imc < 18.5) {
                this.estado = bajo_peso;
                this.claseEstado = alert_warning;
            } else if (this.imc >= 18.5 && this.imc < 24.9) {
                this.estado = peso_normal;
                this.claseEstado = alert_success;
            } else if (this.imc >= 25 && this.imc < 29.9) {
                this.estado = sobrepeso;
                this.claseEstado = alert_warning;
            } else {
                this.estado = obesidad;
                this.claseEstado = alert_danger;
            }
        },

        limpiarFormulario() { // Método para limpiar el formulario
            this.nombre = '';
            this.peso = null;
            this.estatura = null;
            this.imc = null;
            this.estado = '';
            this.claseEstado = '';
            this.error = '';
            this.modoEdicion = false;
            this.indiceEdicion = null;
            return;
        },

        guardarPaciente() { // Método para guardar el paciente en el array y en Local Storage
            const paciente = { // Crea un objeto paciente con los datos actuales
                nombre: this.nombre,
                peso: this.peso,
                estatura: this.estatura,
                imc: this.imc,
                estado: this.estado,
                fechaRegistro: new Date().toLocaleDateString(),
                doctor: this.doctor
            };
            this.pacientes.push(paciente); // Agrega el paciente al array
            localStorage.setItem('pacientes', JSON.stringify(this.pacientes)) // Guarda el array en Local Storage como un string JSON
            this.limpiarFormulario(); // Limpia el formulario
        },

        cargarPaciente() { // Método para cargar los pacientes desde Local Storage
            const data = localStorage.getItem('pacientes'); // Obtiene los datos del Local Storage
            if (data) { // Si hay datos, los parsea y los asigna al array de pacientes
                this.pacientes = JSON.parse(data); // Convierte el string JSON a un array de objetos
            }
        },

        editarPaciente(index) { // Método para editar un paciente existente
            const p = this.pacientes[index]; // Obtiene el paciente del array por su índice
            this.nombre = p.nombre;
            this.peso = p.peso;
            this.estatura = p.estatura;
            this.imc = p.imc;
            this.estado = p.estado;
            this.claseEstado = ''; // Reinicia la clase del estado
            this.modoEdicion = true; // Activa el modo edición
            this.indiceEdicion = index; // Guarda el índice del paciente que se está editando
        },

        actualizarPaciente() { // Método para actualizar los datos de un paciente editado
            this.imc = (this.peso / Math.pow(this.estatura, 2)).toFixed(2); // Recalcula el IMC
            this.definirEstado(); // Redefine el estado basado en el nuevo IMC
            this.pacientes[this.indiceEdicion] = { // Actualiza el paciente en el array con los nuevos datos
                ...this.pacientes[this.indiceEdicion], // Mantiene los datos existentes (No entiendo)
                nombre: this.nombre,
                peso: this.peso,
                estatura: this.estatura,
                imc: this.imc,
                estado: this.estado,
                claseEstado: this.claseEstado,
                fechaRegistro: new Date().toLocaleDateString(),
                doctor: this.doctor
            };
            localStorage.setItem('pacientes', JSON.stringify(this.pacientes)) // Actualiza el Local Storage con el array modificado
            this.limpiarFormulario(); // Limpia el formulario
        },

        eliminarPaciente(index) { // Método para eliminar un paciente del array y del Local Storage
            if (!confirm('¿Estás seguro de que deseas eliminar este paciente?')) return; // Confirma la acción con el usuario
            this.pacientes.splice(index, 1); // Elimina el paciente del array (splice busca por índice y elimina 1 elemento)
            localStorage.setItem('pacientes', JSON.stringify(this.pacientes)) // Actualiza el Local Storage con el array modificado
        },

        // Método para limpiar Local Storage y el array de pacientes
        limpiarLocalStorage() { // Método para limpiar Local Storage y el array de pacientes
            localStorage.removeItem('pacientes'); // Elimina los datos del Local Storage
            this.pacientes = []; // Limpia el array de pacientes
            this.limpiarFormulario(); // Limpia el formulario
        },

        claseFila(estado) { // Método para asignar clases CSS a las filas de la tabla según el estado de salud
            return {
                'Bajo peso': 'table-warning',
                'Peso normal': 'table-success',
                'Sobrepeso': 'table-warning',
                'Obesidad': 'table-danger'
            }[estado] || '';
        }
    }
}).mount('#app'); // Monta la aplicación Vue en el elemento con id "app"