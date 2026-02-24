<template>
    <v-card>
        <v-card-text class="text-center">
            <v-avatar size="120" class="mb-3">
                <v-img :src="estudiante.imagen" />
            </v-avatar>
            <h3>{{ estudiante.nombre }}</h3>
            <p>{{ estudiante.email }}</p>
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn variant="tonal"  color="primary">Ver</v-btn>
            <v-btn variant="tonal" color="error" @click="emit('eliminar',estudiante.id)">Eliminar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    estudiante: Object
})

const emit = defineEmits(['eliminar'])

</script>