<template>
    <v-card class="mb-6">
        <v-card-title class="d-flex justify-space-between align-center">
            <span>Historial IMC</span>

            <v-btn color="error" variant="outlined" size="small" @click="eliminarTodos">
                Eliminar todos
            </v-btn>
        </v-card-title>

        <v-data-table :headers="headers" :items="registros" item-value="fecha" class="elevation-1">
            <!-- IMC -->
            <template #item.imc="{ value }">
                {{ Number(value).toFixed(2) }}
            </template>

            <!-- Estado -->
            <template #item.estado="{ value }">
                <v-chip size="small" :color="colorEstado(value)" text-color="white">
                    {{ value }}
                </v-chip>
            </template>

            <!-- Acciones -->
            <template #item.acciones="{ index }">
                <v-btn icon size="small" color="error" @click="eliminarUno(index)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<script setup>
const props = defineProps({
    registros: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['actualizar'])

const headers = [
    { title: 'Fecha', key: 'fecha' },
    { title: 'Peso (kg)', key: 'peso' },
    { title: 'Estatura (m)', key: 'estatura' },
    { title: 'IMC', key: 'imc' },
    { title: 'Estado', key: 'estado' },
    { title: 'Acciones', key: 'acciones', sortable: false }
]

const eliminarUno = (index) => {
    props.registros.splice(index, 1)
    localStorage.setItem('registros', JSON.stringify(props.registros))
    emit('actualizar')
}

const eliminarTodos = () => {
    localStorage.removeItem('registros')
    emit('actualizar')
}

const colorEstado = (estado) => {
    if (estado === 'Normal') return 'green'
    if (estado === 'Sobrepeso') return 'orange'
    if (estado === 'Obesidad') return 'red'
    return 'blue'
}
</script>
