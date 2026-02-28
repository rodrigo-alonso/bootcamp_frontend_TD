<template>
  <v-card>
    <v-card-text class="text-center">
      <v-avatar size="120"
                class="mb-3">
        <v-img :src="estudiante.imagen"
               alt="Avatar del estudiante" />
      </v-avatar>
      <h3>{{ estudiante.nombre }}</h3>
      <p>{{ estudiante.email }}</p>
    </v-card-text>
    <v-card-actions class="justify-center">
      <!--Enrutamiento dinamico con id a EstudianteDetailView-->
      <v-btn @click="router.push(`/estudiantes/${estudiante.id}`)"
             variant="tonal"
             color="primary">Ver</v-btn>
      <v-btn @click="emit('eliminar', estudiante.id)"
             variant="tonal"
             color="error">Eliminar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

// Definir las propiedades que el componente recibirá
const props = defineProps({
  estudiante: { // La propiedad "estudiante" es un objeto que se requiere para el componente
    type: Object,
    required: true
  }
});

// Definir el evento "eliminar" que el componente emitirá cuando se haga clic en el botón de eliminar
const emit = defineEmits(['eliminar']);

const router = useRouter(); // Obtener el router para navegar a otras vistas

</script>