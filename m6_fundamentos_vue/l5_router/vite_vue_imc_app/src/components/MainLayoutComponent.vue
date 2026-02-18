/*
 * Archivo: MainLayoutComponent.vue
 * Descripción: Componente raíz de la aplicación, que incluye la barra de navegación, el área principal para las vistas y el pie de página.
 * Autor: Rodrigo
 * Fecha: 2024-06-15
 */
<template>
  <NavBarComponent/>

  <main class="container my-4">
    <router-view v-slot="{ Component }">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view> 
  </main>

  <FooterComponent/>
</template>

<script setup>
import NavBarComponent from './components/NavBarComponent.vue'
import FooterComponent from './components/FooterComponent.vue';
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