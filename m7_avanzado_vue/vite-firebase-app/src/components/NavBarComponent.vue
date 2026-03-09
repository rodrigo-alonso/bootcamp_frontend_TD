<template>
	<v-app-bar color="primary"
						 density="comfortable"
						 elevation="4"
						 dark>
		<v-toolbar-title class="font-weight-bold">Vue Firebase</v-toolbar-title>
		<!-- v-spacer: Componente para generar espacios  -> btn son empujados hacia la derecha  -->
		<v-spacer />
		<!-- :variant: Define el estilo del botón según la ruta activa -->
		<v-btn to="/"
					 :variant="route.name === 'home' ? 'tonal' : 'text'"
					 color="white">Home</v-btn>
		<v-btn to="/"
					 :variant="route.name === 'registro' ? 'tonal' : 'text'"
					 color="white">Registro</v-btn>
		<v-btn to="/"
					 :variant="route.name === 'usuarios' ? 'tonal' : 'text'"
					 color="white">Usuarios</v-btn>
		<v-btn to="/"
					 :variant="route.name === 'metricas' ? 'tonal' : 'text'"
					 color="white">Metricas</v-btn>
	</v-app-bar>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>