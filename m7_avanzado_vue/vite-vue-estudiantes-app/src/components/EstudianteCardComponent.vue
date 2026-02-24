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
      <v-btn variant="tonal"
             color="primary">Ver</v-btn>
      <v-btn @click="emit('eliminar', estudiante.id)"
             variant="tonal"
             color="error">Eliminar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Definir las propiedades que el componente recibirá
const props = defineProps({
  estudiante: { // La propiedad "estudiante" es un objeto que se requiere para el componente
    type: Object,
    required: true
  }
});

const emit = defineEmits(['eliminar'])

</script>