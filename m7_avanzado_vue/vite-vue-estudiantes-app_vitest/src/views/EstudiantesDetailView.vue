<template>
  <v-container v-if="estudiante"
               class="fill-height"
               fluid>
    <v-row justify="center"
           align="center">
      <v-col cols="12"
             md="8">
        <v-card class="pa-6">
          <v-btn @click="router.push('/estudiantes')"
                 variant="tonal"
                 prepend-icon="mdi-arrow-left"
                 class="mb-4">Volver al listado</v-btn>
          <v-row>
            <v-col cols="12"
                   md="4"
                   class="text-center"
                   align="center"
                   justify="center">
              <v-avatar size="150">
                <v-img :src="estudiante.imagen" />
              </v-avatar>
            </v-col>
            <v-col cols="12"
                   md="8">
              <h2>{{ estudiante.nombre }}</h2>
              <p><strong>Email: </strong>{{ estudiante.email }}</p>
              <p><strong>Edad: </strong>{{ estudiante.fechaNacimiento }}</p>
              <p><strong>Direccion: </strong>{{ estudiante.direccion }}</p>
              <p><strong>Genero: </strong>{{ estudiante.genero }}</p>
              <!-- join(', ') muestra todos los datos del array y los separa con coma -->
              <p><strong>Hobbies: </strong>{{ estudiante.hobbies.join(', ') }}</p>
              <v-btn @click="router.push(`/estudiantes/${estudiante.id}/editar`)"
                     color="warning"
                     class="mt-4"
                     variant="tonal">Editar</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(); // Obtener la ruta actual para acceder a los parámetros de la URL
const router = useRouter(); // Obtener el router para navegar a otras vistas
const estudiante = ref(null); // Variable reactiva para almacenar los datos del estudiante que se mostrarán en la vista

// Función para cargar los datos del estudiante desde el localStorage utilizando el ID obtenido de los parámetros de la ruta
const cargarEstudiante = () => {
  const data = JSON.parse(localStorage.getItem('estudiantes')) || []; // Obtener los estudiantes del localStorage || vacio
  estudiante.value = data.find(e => e.id === Number(route.params.id)); // Obtiene el parametro del push y filtra al estudiante
  
  if (!estudiante.value) {
        router.push('/404') // Si no se encuentra el estudiante, redirigir a una página de error 404
    }
}

// Observar cambios en el parámetro de la ruta para recargar los datos del estudiante si se navega a otro ID
watch(
  () => route.params.id,
  () => {
    cargarEstudiante()
  },
);

// Funcion para cambiar el título del documento dinámicamente según el nombre del estudiante
watch(estudiante, (nuevo) => {
  if (nuevo && nuevo.nombre) {
    document.title = `Detalle Estudiante | ${nuevo.nombre}`;
  }
});

// Cargar los datos del estudiante cuando se monta el componente
onMounted(() => {
  cargarEstudiante();
});

onBeforeUnmount(() => {
  document.title = 'Estudiantes App'; // Restablecer el título del documento al salir de la vista de detalles
});
</script>