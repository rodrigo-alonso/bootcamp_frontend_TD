<template>
  <v-container>
    <h1 class="mb-4">Listado Paises</h1>
    <!-- Componente para listar paises usando props -->
    <CountriesTableComponent :countries="countries"/> 

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCountries } from '../services/countrieService';
import CountriesTableComponent from '../components/CountriesTableComponent.vue';

const countries = ref([]); // Estado para almacenar la lista de países

onMounted(async () => {
  countries.value = await getCountries(); // Carga la lista de países al montar el componente
});
</script>