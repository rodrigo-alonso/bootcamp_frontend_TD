// Composition API

const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        const personajes = ref([]); // Variable reactiva

        // Función para obtener los personajes desde el archivo JSON
        const fetchPersonajes = async () => {
            const response = await fetch('./info.json');
            const data = await response.json();
            personajes.value = data.personajes;
        };

        const frutaDiablo = computed((p) => {
            if (!p.fruta_del_diablo.tiene_fruta) return 'No tiene fruta del diablo';
            return p.fruta_del_diablo.nombre;
        });

        // Hook para ejecutar la función al montar el componente
        onMounted(() => {
            fetchPersonajes();
        });
        
        return {
            personajes,
            frutaDiablo
        };
    },
}).mount('#app');