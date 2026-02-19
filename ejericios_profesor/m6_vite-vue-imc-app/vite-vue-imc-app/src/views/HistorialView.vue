<template>
    <div>
        <h3 class="mb-3">Historial IMC</h3>

        <div v-if="registros.length">
            <TablaComponent :registros="registros" @actualizar="cargarRegistros" />
        </div>

        <div v-else class="alert alert-warning"> 
            No hay registros almacenados
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TablaComponent from '../components/TablaComponent.vue'

const registros = ref([])

const cargarRegistros = () => {
    registros.value = JSON.parse(localStorage.getItem('registros')) || []
}

onMounted(() => {
    cargarRegistros()
})
</script>