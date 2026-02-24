<template>
    <div>
        <TableComponent v-if="registros.length" :registros="registros" @actualizar="cargarRegistros" />

        <ChartComponent v-if="registros.length" :registros="registros" />

        <v-alert v-else type="info" variant="tonal">
            No hay registros almacenados
        </v-alert>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TableComponent from '../components/TableComponent.vue'
import ChartComponent from '../components/ChartComponent.vue'

const registros = ref([])

const cargarRegistros = () => {
    registros.value = JSON.parse(localStorage.getItem('registros')) || []
}

onMounted(cargarRegistros)
</script>
