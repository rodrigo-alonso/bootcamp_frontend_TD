<template>
  <v-container v-if="estudiante">
    <v-row justify="center">
      <v-col cols="12"
             md="6">
        <v-card class="pa-6">
          <v-btn @click="router.push('/estudiantes')"
                 variant="tonal"
                 prepend-icon="mdi-arrow-left"
                 class="mb-4">Volver al listado</v-btn>
          <h2 class="mb-4">Editar estudiante</h2>
          <v-form @submit.prevent="guardarEstudiante">
            <v-text-field v-model="estudiante.nombre"
                          label="Nombre"
                          type="text"
                          required />
            <v-text-field v-model="estudiante.email"
                          label="Email"
                          type="email"
                          required />
            <v-text-field v-model="estudiante.fechaNacimiento"
                          label="Fecha de nacimiento"
                          type="date"
                          required />
            <v-text-field v-model="estudiante.direccion"
                          label="Dirección"
                          type="text"
                          required />
            <v-select v-model="estudiante.genero"
                      :items="generos"
                      label="Género"
                      required />
            <v-select v-model="estudiante.hobbies"
                      :items="hobbiesDisponibles"
                      label="Hobbies"
                      multiple
                      chips />
            <v-btn @click="guardarEstudiante"
                   type="submit"
                   color="success"
                   prepend-icon="mdi-content-save"
                   variant="tonal"
                   class="mt-4">Guardar cambios</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Potencialmente un codigo con composable para reutilizar esta logica en EstudiantesDetailView y aqui
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const estudiante = ref(null);

const generos = ['Masculino', 'Femenino', 'Otro'];
const hobbiesDisponibles = ['Leer', 'Musica', 'Deporte', 'Viajar', 'Pintar', 'Cine', 'Fotografia', 'Running', 
'Yoga', 'Cocina', 'Pesca', 'Danza', 'Surf', 'Escritura', 'Videojuegos', 'Manualidades', 'Ciclismo',
'Fotografia', 'Ajedrez', 'Escalada', 'Piano', 'Natacion', 'Ilustracion', 'Astronomia'];

const cargarEstudiante = () => {
  const data = JSON.parse(localStorage.getItem('estudiantes')) || [];
  estudiante.value = data.find(e => e.id === Number(route.params.id));

  if (!estudiante.value) {
    router.push('/404'); // Si no se encuentra el estudiante, redirigir a una página de error 404
  };
}

const guardarEstudiante = () => {
  const data = JSON.parse(localStorage.getItem('estudiantes')) || [];
  const index = data.findIndex(e => e.id === estudiante.value.id); // Busca el elemento y obtiene posicion en listado

  if (index !== -1) {
    data[index] = estudiante.value; // Guarda el nuevo estudiante en la posicion original
    localStorage.setItem('estudiantes', JSON.stringify(data)); // Actualiza el localStorage
  }

  router.push('/estudiantes')

}

watch(
  () => route.params.id,
  () => {
    cargarEstudiante()
  }
);

watch(estudiante, (nuevo) => {
  if (nuevo && nuevo.nombre) {
    document.title = `Editar Estudiante | ${nuevo.nombre}`;
  }
})

// Cargar los datos del estudiante cuando se monta el componente
onMounted(() => {
  cargarEstudiante();
})

onBeforeUnmount(() => {
  document.title = 'Estudiantes App'; // Restablecer el título del documento al salir de la vista de detalles
})

</script>