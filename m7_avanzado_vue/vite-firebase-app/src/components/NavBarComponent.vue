<template>
	<v-app-bar color="primary"
						 density="comfortable"
						 elevation="4"
						 dark>
		<v-toolbar-title class="font-weight-bold">Vue Firebase</v-toolbar-title>
		<!-- v-spacer: Componente para generar espacios  -> btn son empujados hacia la derecha  -->
		<v-spacer />
		<!-- :variant: Define el estilo del botón según la ruta activa -->
		<v-btn :variant="route.name === 'home' ? 'tonal' : 'text'"
					 to="/"
					 color="white">Home</v-btn>
		<v-btn v-if="auth.user"
					 :variant="route.name === 'registro' ? 'tonal' : 'text'"
					 to="/registro"
					 color="white">Registro</v-btn>
		<v-btn v-if="auth.user"
					 :variant="route.name === 'usuarios' ? 'tonal' : 'text'"
					 to="/usuarios"
					 color="white">Usuarios</v-btn>
		<v-btn v-if="auth.user"
					 :variant="route.name === 'metricas' ? 'tonal' : 'text'"
					 to="/metricas"
					 color="white">Metricas</v-btn>
		<v-btn v-if="!auth.user"
					 :variant="tonal"
					 to="/login"
					 color="white">Login</v-btn>
		<v-btn v-if="!auth.user"
					 :variant="tonal"
					 to="/register"
					 color="white">Registrarse</v-btn>
		<v-btn v-if="auth.user"
					 @click="logout"
					 variant="tonal"
					 color="white">Logout</v-btn>
	</v-app-bar>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const logout = async () => {
	await auth.logout();

}
</script>