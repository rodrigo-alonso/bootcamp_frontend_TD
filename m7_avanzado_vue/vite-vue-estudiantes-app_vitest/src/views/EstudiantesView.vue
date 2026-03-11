<template>
  <!-- Contenedor principal para la vista de estudiantes -->
  <v-container>
    <!-- Fila para contener las tarjetas de los estudiantes -->
    <v-row>
      <!-- Renderizar una tarjeta por cada estudiante en la lista -->
      <!-- cols=12 -> movil ocupa 100% -->
      <!-- md=3 en pantallas medianas ocupa 12/3 = 4 columnas x fila -->
      <v-col cols="12"
             md="3"
             v-for="estudiante in estudiantes"
             :key="estudiante.id">
        <!-- Aquí se renderizará el componente EstudianteCardComponent para cada estudiante -->
        <!-- :estudiante Envia datos de estudiantte al hijo (EstudiantesView -> EstudianteCardComponenet) -->
        <!-- @eliminar="eliminar" Escucha evento que lanza hijo y ejecuta funcion eliminar (EstudianteCardComponenet -> EstudiantesView)  -->
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
import { es } from 'vuetify/locale'; // Importar el idioma español para Vuetify

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
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  });

  if (resultado.isConfirmed) { // Si el usuario confirma la eliminación
    estudiantes.value = estudiantes.value.filter(e => e.id != id); // Filtrar el estudiante eliminado de la lista
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes.value)); // Actualizar el localStorage con la nueva lista de estudiantes 

    Swal.fire({ // Mostrar una alerta de éxito después de eliminar el estudiante
      title: 'Eliminado',
      text: 'El estudiante ha sido eliminado correctamente',
      icon: 'success',
      timer: 1000,
      showConfirmButton: false
    });
  };
};
</script>