<template>
  <!--Tag viutify-->
  <v-app>
    <v-app-bar v-if="mostrarAppBar"
               color="primary"
               dark
               flat>
      <v-toolbar-title style="cursor:pointer"
                       @click="router.push('/')">
        Gestion Estudiantil
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <transition name="fade-slide"
                  mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const mostrarAppBar = computed(() => routeLocationKey.name != 'NotFound');

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>