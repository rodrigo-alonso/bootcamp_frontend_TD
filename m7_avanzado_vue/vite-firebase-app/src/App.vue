<template>
  <v-app>
    <NavBarComponent v-if="showLayout" />
    <v-main class="main-background">
      <!-- Barra de progreso al iniciar sesion -->
      <v-progress-linear v-if="auth.loading"
                         indeterminate
                         color="primary" />
      <router-view v-else
                   v-slot="{ Component }">
        <transition name="fade-slide"
                    mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    <FooterComponent v-if="showLayout" />
    <!-- Snackbar para mostrar mensajes de notificación -->
    <v-snackbar v-model="ui.snackbar"
                :color="ui.color"
                timeout="2000">
      {{ ui.message }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { useRoute } from 'vue-router';
import { useUiStore } from './stores/uiStore';
import { computed } from 'vue';
import { useAuthStore } from './stores/authStore';

const route = useRoute();
const ui = useUiStore();
const auth = useAuthStore();

// Computed property que determina si se debe mostrar el layout (NavBar y Footer) en función de 
// la ruta actual. Si la ruta es 'notFound', no se muestra el layout.
const showLayout = computed(() => {
  return route.name !== 'notFound';
});
</script>

<style>
.main-background {
  background: #e1e4e7;
  min-height: 90vh;
}

.border-flag {
  border: 1px solid #ddd;
  border-radius: 3px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>