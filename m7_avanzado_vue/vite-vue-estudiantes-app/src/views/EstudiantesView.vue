<template>
  <!-- Contenedor principal para la vista de estudiantes -->
  <v-container>
    <!-- Fila para contener las tarjetas de los estudiantes -->
    <v-row>
      <!-- Renderizar una tarjeta por cada estudiante en la lista -->
      <v-col cols="12"
             md="3"
             v-for="estudiante in estudiantes"
             :key="estudiante.id">
        <!-- Aquí se renderizará el componente EstudianteCardComponent para cada estudiante -->
        <EstudianteCardComponent :estudiante="estudiante"
                                 @eliminar="eliminar" />
      </v-col>
    </v-row>
    <v-alert v-if="estudiantes.length === 0"
             type="info"
             variant="tonal"
             class="mt-5">No hay estudiantes registrados</v-alert>
  </v-container>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { estudiantesMock } from '../data/estudiantes';
import EstudianteCardComponent from '../components/EstudianteCardComponent.vue';
import Swal from 'sweetalert2';

const estudiantes = ref([]);

onMounted(() => {
  const data = localStorage.getItem('estudiantes'); // Obtener datos del localStorage
  if (!data) {
    localStorage.setItem('estudiantes', JSON.stringify(estudiantesMock)); // Si no hay datos, inicializar con el mock
    estudiantes.value = estudiantesMock; // Asignar el mock a la variable reactiva
  } else {
    estudiantes.value = JSON.parse(data); // Si hay datos, parsearlos y asignarlos a la variable reactiva
  }
});

const eliminar = async (id) => {
  const resultado = await Swal.fire({
    title: '¿Eliminar estudiante?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (resultado.isConfirmed) {
    estudiantes.value = estudiantes.value.filter(e => e.id != id);
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes.value));

    Swal.fire({
      title: 'Eliminado',
      Text: 'El estudiante ha sido eliminado',
      icon: 'success',
      timer: 1000,
      showConfirmButton: true
    });
  };
};
</script>