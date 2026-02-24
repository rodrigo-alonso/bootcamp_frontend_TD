<template>
    <v-card>
        <v-card-title>Evolución del IMC</v-card-title>
        <v-card-text>
            <canvas ref="canvas"></canvas>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
    registros: {
        type: Array,
        required: true
    }
})

const canvas = ref(null)
let chart = null

const obtenerColor = () => {
    if (!props.registros.length) return '#9e9e9e'

    const estado = props.registros[props.registros.length - 1].estado

    if (estado === 'Normal') return '#4caf50'
    if (estado === 'Sobrepeso') return '#fb8c00'
    if (estado === 'Obesidad') return '#e53935'
    return '#1e88e5'
}

const crearGrafico = () => {
    if (!canvas.value) return

    if (chart) {
        chart.destroy()
        chart = null
    }

    chart = new Chart(canvas.value, {
        type: 'line',
        data: {
            labels: props.registros.map(r => r.fecha),
            datasets: [{
                label: 'IMC',
                data: props.registros.map(r => r.imc),
                borderColor: obtenerColor(),
                backgroundColor: 'transparent',
                tension: 0.35
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    })
}

onMounted(crearGrafico)

watch(
    () => props.registros,
    () => crearGrafico(),
    { deep: true }
)
</script>
