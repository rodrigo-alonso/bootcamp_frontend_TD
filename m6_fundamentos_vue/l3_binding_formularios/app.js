// Composition API: Binding de formularios 
const { createApp, ref, reactive } = Vue;

createApp({
    setup() {
        const errores = reactive({}); // Objeto reactivo para manejar errores de validación

        const form = reactive({ // Objeto reactivo para el formulario
            rut: ''
        });

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

        const estado = (campo) => {
            if (errores[campo] === true) return 'is-invalid'; // is-invalid es una clase de Bootstrap que marca el input en rojo
            if (errores[campo] === false) return 'is-valid'; // is-valid es una clase de Bootstrap que marca el input en verde con ticket
            return '';
        };

        // Activar todo respecto al template
        return {
            form,
            errores,
            estado,
            validarRut,
            formatearRut
        };
    },
}).mount('#app');