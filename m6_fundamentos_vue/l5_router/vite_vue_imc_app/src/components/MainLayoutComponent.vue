/*
* Componente raíz de la aplicación, que incluye la barra de
* navegación, el área principal para las vistas y el pie de página.
*/
<template>
  <!--Se agrega el componente navbar-->
  <NavBarComponent />

  <!-- Tag Main: Indica que es el contenido principal de la pagina -->
  <main class="container my-4">
    <!-- Punto de montaje para las rutas. Utiliza scoped slot que expone el componente de la ruta actual
     Permite acceder al componente antes de renderizarlo -->
    <router-view v-slot="{ Component }">
      <!-- Transición para animar el cambio entre vistas -->
      <transition name="fade-slide"
                  mode="out-in">
        <!-- Renderiza el componente de la ruta actual -->
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <!--Se agrega el componente footer-->
  <FooterComponent />
</template>

<script setup>
// Importamos los componentes de navegación y pie de página
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue';
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