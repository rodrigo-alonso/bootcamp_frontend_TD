const { createApp, ref, reactive, watch, computed, onMounted } = Vue;

createApp({
    setup() {

        const registros = ref([]);
        const editando = ref(false);
        const indiceEditar = ref(null);

        const errores = reactive({})

        const form = reactive({
            rut: '',
            nombre: '',
            email: '',
            password: '',
            confirmPassword: '',
            edad: null,
            fechaNacimiento: '',
            pais: '',
            genero: '',
            hobbies: [],
            aceptaTerminos: false
        });

        const mostrarPassword = ref(false);

        const mostrarConfirmPassword = ref(false);

        const fuerzaPassword = reactive({
            puntos: 0,
            porcentaje: 0,
            texto: '',
            clase: 'bg-danger',
            textoClase: 'text-danger'
        });

        const checkPassword = reactive({
            largo: false,
            mayuscula: false,
            minuscula: false,
            numero: false,
            especiales: false
        });

        const evaluarPassword = () => {
            const p = form.password;

            checkPassword.largo = p.length >= 8 && p.length <= 16;
            checkPassword.mayuscula = /[A-Z]/.test(p);
            checkPassword.minuscula = /[a-z]/.test(p);
            checkPassword.numero = /\d/.test(p);
            checkPassword.especiales = /[@$!%*?&#._-]/.test(p);

            let puntos = 0;
            if (checkPassword.largo) puntos++;
            if (checkPassword.mayuscula) puntos++;
            if (checkPassword.minuscula) puntos++;
            if (checkPassword.numero) puntos++;
            if (checkPassword.especiales) puntos++;

            const textos = ['Muy debil', 'Débil', 'Buena', 'Fuerte', 'Muy fuerte'];
            const colores = ['bg-danger', 'bg-warning', 'bg-info', 'bg-primary', 'bg-success'];

            fuerzaPassword.puntos = puntos;
            fuerzaPassword.porcentaje = puntos / 5 * 100;
            fuerzaPassword.texto = textos[puntos - 1];
            fuerzaPassword.clase = colores[puntos - 1];
            fuerzaPassword.textoClase = colores[puntos - 1].replace('bg', 'text');
        };

        watch(
            () => form.password,
            (nuevo, anterior) => {
                if (form.confirmPassword && nuevo != anterior) {
                    form.confirmPassword = '';
                    errores.confirmPassword = undefined;
                }
            }
        );

        //Métodos para manejar el rut
        const formatearRut = () => {
            let rut = form.rut.replace(/[^0-9kK]/g, '').toUpperCase();
            if (rut.length < 2) {
                form.rut = rut;
                return;
            }

            let cuerpo = rut.slice(0, -1);
            let dv = rut.slice(-1);

            cuerpo = cuerpo
                .split('')
                .reverse()
                .join('')
                .replace(/(\d{3})(?=\d)/g, '$1.')
                .split('')
                .reverse()
                .join('');

            form.rut = `${cuerpo}-${dv}`;
        };

        const validarRut = () => {
            const rut = form.rut.replace(/\./g, '').replace('-', '');
            if (rut.length < 8) {
                errores.rut = true;
                return;
            }

            const cuerpo = rut.slice(0, -1);
            const dv = rut.slice(-1).toUpperCase();

            let suma = 0;
            let multiplo = 2;

            for (let i = cuerpo.length - 1; i >= 0; i--) {
                suma += multiplo * cuerpo[i];
                multiplo = multiplo < 7 ? multiplo + 1 : 2;
            }

            const dvEsperado = 11 - (suma % 11);
            const dvFinal =
                dvEsperado === 11 ? '0' :
                    dvEsperado === 10 ? 'K' :
                        dvEsperado.toString();

            errores.rut = dv !== dvFinal;
        };

        const formatearFechaPreview = (fecha) => {
            if (!fecha) return '';

            const [year, month, day] = fecha.split('-');
            return `${day}-${month}-${year}`;
        };

        const validarCampo = (c) => {
            if (c === 'nombre') errores.nombre = form.nombre.length < 3;

            if (c === 'email') {
                const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                errores.email = !regex_email.test(form.email);
            }

            if (c === 'password') errores.password = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#._-])[A-Za-z\d@$!%*?&#._-]{8,16}$/.test(form.password);

            if (c === 'confirmPassword') errores.confirmPassword = !form.confirmPassword || form.confirmPassword !== form.password;

            if (c === 'edad') errores.edad = form.edad < 18 || form.edad > 99;

            if (c === 'fechaNacimiento') errores.fechaNacimiento = !form.fechaNacimiento;

            if (c === 'pais') errores.pais = !form.pais;

        };

        const estado = (campo) => {
            if (errores[campo] === true) return 'is-invalid';
            if (errores[campo] === false) return 'is-valid';
            return '';
        };

        const hayErrores = computed(() => Object.values(errores).some(v => v === true));

        const camposObligatorios = ['rut', 'nombre', 'email', 'password', 'confirmPassword', 'edad', 'fechaNacimiento', 'pais']

        const validarCampoObligatorios = () => {
            camposObligatorios.forEach(campo => {
                const valor = form[campo];

                if (valor === null || valor === '' || Array.isArray(valor) && valor.length === 0) {
                    errores[campo] = true;
                }
            });
        };

        const permisoEnviar = computed(() => form.aceptaTerminos && !hayErrores.value);


        // LocalStorage
        const guardarLocalStorage = () => {
            localStorage.setItem('registros', JSON.stringify(registros.value));
        };

        const cargarLocalStorage = () => {
            const data = localStorage.getItem('registros');
            if (data) registros.value = JSON.parse(data);
        };

        const guardarRegistro = () => {
            if (rutExiste(form.rut)) {
                alert('El RUT ya se encuentra registrado');
                return;
            }

            if (hayErrores.value) return;

            if (editando.value) {
                registros.value[indiceEditar.value] = { ...form };
            }
            else {

                registros.value.push({ ...form });
            }

            guardarLocalStorage();
            limpiarFormulario();
        };

        const rutExiste = (rut) => {
            return registros.value.some((r, index) => {
                // Si estoy editando, ignoro el registro actual
                if (editando.value && index === indiceEditar.value) return false;

                return r.rut === rut;
            });
        };

        const editarRegistro = (i) => {
            Object.assign(form, registros.value[i]);
            editando.value = true;
            indiceEditar.value = i;
        };

        const eliminarRegistro = (i) => {
            if (confirm('¿Elimiar registro?')) {
                registros.value.splice(i,1);
                guardarLocalStorage();
            }
        };

        const limpiarFormulario = () => {
            Object.keys(form).forEach(k => {
                if (Array.isArray(form[k])) form[k] = [];
                else form[k] = null;
            });

            Object.keys(checkPassword).forEach(k => checkPassword[k] = false);
            
            fuerzaPassword.puntos= 0;
            fuerzaPassword.porcentaje= 0;
            fuerzaPassword.texto= '';
            fuerzaPassword.clase= 'bg-danger';
            fuerzaPassword.textoClase= 'text-danger';

            form.rut=form.nombre=form.email=form.password=form.confirmPassword=form.fecha=form.pais=form.genero='';
            form.aceptaTerminos = false;

            Object.keys(errores).forEach(k => errores[k] = undefined);
            editando.value = false;
        }

        const limpiarLocalStorage = () => {
            if (confirm('¿Eliminar todos los datos?')) {
                localStorage.clear();
                registros.value = [];
            }
        };

        // Metricas
        const promedioEdad = computed(() => {
            if (registros.value.length===0) return 0;

            return (registros.value.reduce((s,r)=> s + Number(r.edad),0) / registros.value.length).toFixed(1);
        });

        const contadorGenero = computed(() => ({
            Femenino: registros.value.filter(r => r.genero === 'Femenino').length,
            Masculino: registros.value.filter(r => r.genero === 'Masculino').length,
            NoResponde: registros.value.filter(r => r.genero === 'NoResponde').length,
        }));


        onMounted(cargarLocalStorage);

        //Activar todos respecto al template
        return {
            form,
            registros,
            editando,
            errores,
            mostrarPassword,
            mostrarConfirmPassword,
            fuerzaPassword,
            checkPassword,
            evaluarPassword,
            estado,
            validarRut,
            formatearRut,
            validarCampo,
            permisoEnviar,
            validarCampoObligatorios,
            formatearFechaPreview,
            promedioEdad,
            contadorGenero,
            guardarRegistro,
            editarRegistro,
            eliminarRegistro,
            limpiarLocalStorage
        };



    }
}).mount("#app");