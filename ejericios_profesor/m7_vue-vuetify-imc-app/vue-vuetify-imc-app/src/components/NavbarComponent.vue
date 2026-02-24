<template>
    <v-app-bar color="secondary" dark :elevation="2">
        <v-app-bar-title>
            IMC App
            <span v-if="nombre" class="text-caption ms-2">
                | Hola {{ nombre }}
            </span>
        </v-app-bar-title>

        <v-spacer />

        <v-btn to="/" variant="outlined">Inicio</v-btn>
        <v-btn to="/registro" variant="text">Registro</v-btn>
        <v-btn to="/historial" variant="text">Historial</v-btn>
    </v-app-bar>
    
</template>

<script setup>
defineProps({
    nombre: {
        type: String,
        default: null
    }
})
</script>
