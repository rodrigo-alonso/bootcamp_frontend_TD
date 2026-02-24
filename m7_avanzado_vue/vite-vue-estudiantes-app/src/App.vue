<template>
  <!--Tag viutify-->
  <v-app>
    <v-app-bar v-if="mostrarAppBar"
               color="primary"
               dark
               flat>
      <v-toolbar-title style="cursor:pointer"
                       @click="router.push('/estudiantes')">
        Gestion Estudiantil
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade-slide"
                    mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(); // Obtener la ruta actual
const router = useRouter(); // Obtener el router para poder navegar programáticamente

// Montar el router para poder navegar programáticamente
const mostrarAppBar = computed(() => route.name !== 'NotFound') // Idem: () => {} 

</script>

<style>
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