<template>
  <v-app>
    <NavBarComponent v-if="!is404"/>
    <v-main>
      <router-view v-slot="{Component}">
        <transition name="fade" mode="out-in">
          component is/>
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, ref,  } from 'vue';
import {useRoute} from 'vue-router';
import NavbarComponent from './components/NavbarComponent.vue';

const route = useRoute();
const is404 = computed(() => route.name === 'NotFound');

</script>

<style>
.fade-enter-active,
.fade.leave.active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  transition: opacity;
}
</style>