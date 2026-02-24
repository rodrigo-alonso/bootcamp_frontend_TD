<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="3" v-for="estudiante in estudiantes" :key="estudiante.id">
                <EstudianteCardComponent :estudiante="estudiante" @eliminar="eliminar"  />
            </v-col>
        </v-row>
        
        <v-alert v-if="estudiantes.length === 0" type="info" variant="tonal" class="mt-5">
            No hay estudiantes registrados
        </v-alert>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { estudiantesMock } from '../data/estudiantes';
import EstudianteCardComponent from '../components/EstudianteCardComponent.vue'
import Swal from 'sweetalert2';
import { es } from 'vuetify/locale';

const estudiantes = ref([])

onMounted(() => {
    const data = localStorage.getItem('estudiantes')

    if (!data) {
        localStorage.setItem('estudiantes', JSON.stringify(estudiantesMock))
        estudiantes.value = estudiantesMock
    }
    else {
        estudiantes.value = JSON.parse(data)
    }
})

const eliminar = async (id) => {
    const resultado = await Swal.fire({
        title: '¿Eliminar estudiante?',
        text: 'Esta acción no se puede desahacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#646cff',
        cancelButtonColor: '#900505',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
    })

    if (resultado.isConfirmed) {
        estudiantes.value = estudiantes.value.filter(e => e.id !== id)
        localStorage.setItem('estudiantes',JSON.stringify(estudiantes.value))

        Swal.fire({
            title: 'Eliminado',
            text: 'El estudiante ha sido eliminado correctamente',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false
        })
    }


}


</script>