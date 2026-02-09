// Option API de Vue (antiguo)
/* 
const app = Vue.createApp({}).mount('#app');
*/

// Composition API: Nueva forma de trabajar con Vue 3 
const { createApp, ref, reactive, watch, computed } = Vue;
/* Parametros importados de Vue:
- createApp: crear la aplicación Vue
- ref: crear variables reactivas simples
- reactive: crear objetos reactivos
- watch: observar cambios en variables reactivas
- computed: propiedades computadas 
*/
createApp({
    setup() {
        const errores = reactive({}); // Objeto reactivo para manejar errores de validación

        const form = reactive({ // Objeto reactivo para el formulario
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
            aceptaTerminos: false,
            permisoEnviar: false
        });

        const mostrarPassword = ref(false); // Ref para manejar la visibilidad del password

        const mostrarConfirmPassword = ref(false); // Ref para manejar la visibilidad del confirm password

        const fuerzaPassword = reactive({ // Objeto reactivo para la fuerza del password
            puntos: 0,
            porcentaje: 0,
            texto: '',
            clase: 'bg-danger',
            textoClase: 'text-danger'
        });

        const checkPassword = reactive({ // Objeto reactivo para los checks del password
            largo: false,
            mayuscula: false,
            minuscula: false,
            numero: false,
            especiales: false
        });

        const evaluarPassword = () => {
            const p = form.password; // Obtener el password del formulario

            checkPassword.largo = p.length >= 8 && p.length <= 16; // Verificar largo entre 8-16 caracteres
            checkPassword.mayuscula = /[A-Z]/.test(p); // Verificar al menos una mayúscula
            checkPassword.minuscula = /[a-z]/.test(p); // Verificar al menos una minúscula
            checkPassword.numero = /\d/.test(p); // Verificar al menos un número
            checkPassword.especiales = /[@$!%*?&#._-]/.test(p); // Verificar al menos un carácter especial

            let puntos = 0;
            if (checkPassword.largo) puntos++;
            if (checkPassword.mayuscula) puntos++;
            if (checkPassword.minuscula) puntos++;
            if (checkPassword.numero) puntos++;
            if (checkPassword.especiales) puntos++;

            const textos = ['Muy débil', 'Débil', 'Aceptable', 'Fuerte', 'Muy fuerte'];
            const colores = ['bg-danger', 'bg-warning', 'bg-info', 'bg-primary', 'bg-success'];

            fuerzaPassword.puntos = puntos;
            fuerzaPassword.porcentaje = (puntos / 5) * 100;
            fuerzaPassword.texto = textos[puntos - 1];
            fuerzaPassword.clase = colores[puntos - 1];
            fuerzaPassword.textoClase = colores[puntos - 1].replace('bg', 'text');
        };

        // Watchers para resetear confirmPassword si password cambia
        watch(
            () => form.password,
            (nuevo, anterior) => {
                if (form.confirmPassword && nuevo != anterior) {
                    form.confirmPassword = ''; // Resetear confirmPassword 
                    errores.confirmPassword = undefined;
                }
            }
        );

        // Metodos para manejar el RUT
        const formatearRut = () => {
            // Solo permitir números y K/k
            let rut = form.rut.replace(/[^0-9kK]/g, '').toUpperCase(); // Eliminar puntos y guiones, mantener K mayúscula
            if (rut.length < 2) { // Mínimo 2 caracteres para formatear
                form.rut = rut;
                return;
            }

            let cuerpo = rut.slice(0, -1); // Obtener el cuerpo del RUT
            let dv = rut.slice(-1); // Obtener el dígito verificador

            // Formatear el cuerpo del RUT
            cuerpo = cuerpo
                .split('') // Convertir a array
                .reverse() // Invertir para facilitar el formateo
                .join('') // Volver a unir
                .replace(/(\d{3})(?=\d)/g, '$1.') // Agregar puntos cada 3 dígitos
                .split('') // Convertir a array nuevamente
                .reverse() // Volver a invertir
                .join(''); // Unir nuevamente

            form.rut = `${cuerpo}-${dv}`; // Unir cuerpo y dígito verificador con guion
        };

        const validarRut = () => {
            const rut = form.rut.replace(/\./g, '').replace('-', ''); // Eliminar puntos y guion
            if (rut.length < 8) {
                errores.rut = true; // Devuelve error=true si es inválido y usa invalid-feedback de Bootstrap
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
            const dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

            errores.rut = dv !== dvFinal;
        };

        // Función para validar campos individuales, se llama al hacer blur
        const validarCampo = (campo) => {
            // Validaciones específicas por campo, si hay error se crea la propiedad en el objeto errores y se asigna true, sino false (para mostrar feedback en el template)
            if (campo === 'nombre')
                errores.nombre = form.nombre.length < 3; // Nombre debe tener al menos 3 caracteres
            if (campo === 'email')
                errores.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email); // Validar formato de email text@text.text
            if (campo === 'password')
                errores.password = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#._-])[A-Za-z\d@$!%*?&#._-]{8,16}$/.test(form.password); // Validar password con regex (8-16 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial)
            if (campo === 'confirmPassword') 
                errores.confirmPassword = !form.confirmPassword || form.confirmPassword !== form.password; // ConfirmPassword debe coincidir con password y no estar vacío
            if (campo === 'edad')
                errores.edad = form.edad < 18 || form.edad > 99; // Edad entre 18 y 99
            if (campo === 'fechaNacimiento')
                errores.fechaNacimiento = !form.fechaNacimiento; // Fecha de nacimiento obligatoria
            if (campo === 'pais')
                errores.pais = !form.pais; // País obligatorio
            if (campo === 'genero')
                errores.genero = !form.genero; // Género obligatorio
            if (campo === 'aceptaTerminos')
                errores.aceptaTerminos = !form.aceptaTerminos; // Aceptar términos obligatorio
        };

        // Función para determinar la clase de validación de un campo, se usa en el template para agregar clases de Bootstrap (is-valid o is-invalid)
        const estado = (campo) => {
            if (errores[campo] === true) return 'is-invalid'; // is-invalid es una clase de Bootstrap que marca el input en rojo
            if (errores[campo] === false) return 'is-valid'; // is-valid es una clase de Bootstrap que marca el input en verde con ticket
            return '';
        };

        // hayErrores no se envia a formulario, solo se usa en .js
        const hayErrores = computed(() => Object.values(errores).some(v => v === true)); // Verifica si hay errores en el formulario (retorna true/false)

        const permisoEnviar = computed(() => form.aceptaTerminos && !hayErrores.value);

        // Activar todo respecto al template
        return { // Retornar todo lo que se usará en el template
            form,
            errores,
            mostrarPassword,
            mostrarConfirmPassword,
            fuerzaPassword,
            checkPassword, // No es necesario retornarlo pq no es usado por la pagina
            evaluarPassword,
            estado,
            validarRut,
            formatearRut,
            validarCampo,
            permisoEnviar
        };
    },
}).mount('#app');