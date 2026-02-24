<template>
    <v-container class="fill-height">
        <v-row align="center" justify="center">
            <v-col cols="12" md="6" class="text-center">
                <h1 class="text-h2 mb-4">404</h1>
                <p class="mb-6">La página que buscas no existe</p>

                <v-btn color="primary" @click="router.push('/estudiantes')">
                    Volver al listado
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
