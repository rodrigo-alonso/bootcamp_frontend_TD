const { createApp, ref, reactive } = Vue;

createApp({
    setup () {

        const errores = reactive({})

        const form = reactive( {
            rut: ''
        });

        //Métodos para manejar el rut
        const formatearRut = () => {
            let rut = form.rut.replace(/[^0-9kK]/g,'').toUpperCase();
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
                .replace(/(\d{3})(?=\d)/g,'$1.')
                .split('')
                .reverse()
                .join('');

            form.rut = `${cuerpo}-${dv}`;
        };

        const validarRut = () => {
            const rut = form.rut.replace(/\./g,'').replace('-','');
            if (rut.length < 8) {
                errores.rut = true;
                return;
            }

            const cuerpo = rut.slice(0,-1);
            const dv = rut.slice(-1).toUpperCase();

            let suma = 0;
            let multiplo = 2;

            for(let i=cuerpo.length -1; i >= 0; i--){
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

        const estado = (campo) => {
            if (errores[campo]=== true) return 'is-invalid';
            if (errores[campo]=== false) return 'is-valid';
            return '';
        }
        

        //Activar todos respecto al template
        return {
            form,
            errores,
            estado,
            validarRut,
            formatearRut
        };
        
        

    }
}).mount("#app");