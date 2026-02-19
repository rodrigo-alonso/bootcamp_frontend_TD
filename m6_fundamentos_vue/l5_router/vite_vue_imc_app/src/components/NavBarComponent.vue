<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <div class="container">
      <span class="navbar-brand">
        <i class="bi bi-calculator me-2"></i>
        IMC App
      </span>
      <button class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse"
           id="navbarNav">
        <ul class="navbar-nav">
          <!--:class="isActiveRoute()" actualizar reactivamente cada vez q cambie la ruta-->
          <li class="nav-item">
            <RouterLink :class="isActiveRoute('/') ? 'nav-link active' : 'nav-link'"
                        to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :class="isActiveRoute('/registro') ? 'nav-link active' : 'nav-link'"
                        to="/registro">Registro</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :class="isActiveRoute('/historial') ? 'nav-link active' : 'nav-link'"
                        to="/historial">Historial</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// useRoute es un hook de Vue Router que permite acceder a la información de la ruta actual, como el path, los parámetros, etc.
import { useRoute } from 'vue-router';

const route = useRoute(); // Se obtiene la información de la ruta actual para poder determinar qué enlace está activo

// Función para asignar clases dinámicamente a los enlaces de navegación según la ruta activa
const isActiveRoute = (path) => {
  return route.path === path; // Compara la ruta actual con el path proporcionado (true si coinciden, false si no)
};
</script>

<style scoped>
.router-link-active {
  font-weight: bold;
  text-decoration: none;
}
</style>
