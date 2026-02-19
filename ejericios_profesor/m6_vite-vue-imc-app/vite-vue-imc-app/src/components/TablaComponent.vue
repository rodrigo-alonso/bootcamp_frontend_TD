<template>
    <div class="card shadow-lg">
        <div class="card-header">
            
        </div>
        <div class="card-body">
            <button class="btn btn-outline-danger mb-2" @click="eliminarTodos">Eliminar todos los registros</button>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead class="table-dark">
                        <tr class="text-center">
                            <th>Fecha Registro</th>
                            <th>Peso (kg)</th>
                            <th>Estatura (mt)</th>
                            <th>IMC</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody v-for="(r, i) in registros" :key="i">
                        <tr class="text-center">
                            <td>{{ r.fecha }}</td>
                            <td>{{ r.peso }}</td>
                            <td>{{ r.estatura }}</td>
                            <td>{{ r.imc }}</td>
                            <td>
                                <span class="badge p-1" :class="badgeEstado(r.estado)">
                                    {{ r.estado }}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-outline-danger btn-sm" @click="eliminarUnRegistro(i)">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['registros', 'nombre'])

const emit = defineEmits(['actualizar'])

const eliminarUnRegistro = (index) => {
    props.registros.splice(index,1)
    localStorage.setItem('registros',JSON.stringify(props.registros))
    emit('actualizar')
}

const eliminarTodos = () => {
    localStorage.removeItem('registros')
    emit('actualizar')
}

const badgeEstado = (estado) => ({
    'bg-primary': estado === 'Bajo peso',
    'bg-success': estado === 'Peso normal',
    'bg-warning text-danger': estado === 'Sobrepeso',
    'bg-danger': estado === 'Obesidad'
})



</script>