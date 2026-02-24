<template>
    <v-app>
        <NavbarComponent :nombre="nombre" />

        <v-main>
            <v-container>
                <router-view v-slot="{ Component }">
                    <v-fade-transition mode="out-in">
                        <component :is="Component" />
                    </v-fade-transition>
                </router-view>
            </v-container>
        </v-main>

        <FooterComponent />
    </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

const nombre = ref(null)

onMounted(() => {
    nombre.value = localStorage.getItem('nombre')
})
</script>
