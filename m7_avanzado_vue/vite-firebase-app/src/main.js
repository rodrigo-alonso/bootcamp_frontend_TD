// 
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { vuetify } from '../src/plugins/vuetify';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import '@mdi/font/css/materialdesignicons.css';

// Idem a usar la forma createApp(App).use(router).use(vuetify).mount('#app')
const app = createApp(App);

app.use(createPinia);
app.use(router);
app.use(vuetify);
app.use(Toast);

app.mount('#app');
