<template>
  <div class="card-shadow-lg">
    <div class="table-responsive">
      <div class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Fecha Registro</th>
            <th>Peso (kg)</th>
            <th>Altura (cm)</th>
            <th>IMC</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody v-for="(r, i) in registros"
               :key="i">
          <td>{{ r.fecha }}</td>
          <td>{{ r.peso }}</td>
          <td>{{ r.altura }}</td>
          <td>{{ r.imc }}</td>
          <td>
            <span :class="['badge', badgeEstado(r.estado)]">{{ r.estado }}</span>
          </td>
          <td>
            <button class="btn btn-outline btn-sm">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tbody>
      </div>
    </div>
  </div>

</template>

<script setup>
const props = defineProps(['registros']); // Definir la propiedad 'registros' para recibir los datos desde el componente padre
const emit = defineEmits(['actualizar']) // Definir el evento 'actualizar' para emitir cambios al componente padre

//
const eliminarUnRegisro = () => {
  
};

// Función para eliminar todos los registros del localStorage y emitir el evento de actualización al componente padre
const eliminarTodos = () => {
  localStorage.removeItem('registros'); // Eliminar todos los registros del localStorage
  emit('actualizar'); // Emitir el evento para que el componente padre actualice la lista de registros
};

const badgeEstado = computed(() => ({
  'bg-warning': estado.value === 'Bajo peso',
  'bg-success': estado.value === 'Peso normal',
  'bg-warning text-danger': estado.value === 'Sobrepeso',
  'bg-danger': estado.value === 'Obesidad'
}));
</script>