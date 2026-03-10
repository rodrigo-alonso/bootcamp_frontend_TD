// Importar Vue y otros módulos necesarios
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { vuetify } from '../src/plugins/vuetify';
import Toast from 'vue-toastification'; // No se uso en este prouyecto 
import 'vue-toastification/dist/index.css';
import '@mdi/font/css/materialdesignicons.css';
import { useAuthStore } from './stores/authStore';

// Idem a usar la forma createApp(App).use(router).use(vuetify).mount('#app')
const app = createApp(App);
const pinia = createPinia();

// Configurar Vue para usar Pinia, Router, Vuetify y Toast
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(Toast);

const authStore = useAuthStore();
authStore.initAuth(); // Inicializar la autenticación para detectar si el usuario ya está logeado

// Montar la aplicación en el elemento con id 'app'
app.mount('#app');
