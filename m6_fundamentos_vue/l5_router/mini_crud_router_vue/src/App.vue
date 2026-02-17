<template>
  <!-- Incluir el componente NavBarComponent en la plantilla principal -->
  <NavBarComponent />

  <div class="container mt-4">
    <!-- v-solt  -->
    <router-view v-slot="{ Component }">
      <transition name="fade-slide"
                  mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
// Importar componentes a utilizar en la aplicación
import NavBarComponent from './components/NavBarComponent.vue'; // Componente de navegación

</script>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
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