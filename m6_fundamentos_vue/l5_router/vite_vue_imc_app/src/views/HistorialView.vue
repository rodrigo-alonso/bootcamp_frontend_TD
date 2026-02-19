<template>
  <div class="">
    <h3 class="mb-3">Historial IMC</h3>
    <div v-if="registros.length">
      <!--Props es una propiedad que permite la comunicacion entre padre e hijo -->
      <TablaComponent :registros="registros"
                      @actualizar="cargarRegistros" />
    </div>
    <div v-else
         class="alert alert-warning">
      No hay registros almacenados.
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import TablaComponent from '../components/TablaComponent.vue'; // Importar el componente TablaComponent para mostrar los registros

const registros = ref([]); // Variable reactiva para almacenar los registros del historial

// Función para cargar los registros desde localStorage
const cargarRegistros = () => {
  registros.value = JSON.parse(localStorage.getItem('registros')) || []; // Cargar los registros desde localStorage o inicializar un array vacío si no hay registros
};

// Cargar los registros al montar el componente
onMounted(() => {
  cargarRegistros(); // Llamar a la función para cargar los registros cuando el componente se monte
});

</script>