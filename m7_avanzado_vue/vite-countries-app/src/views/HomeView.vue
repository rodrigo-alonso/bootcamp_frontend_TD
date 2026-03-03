<template>
  <v-container>
    <h1 class="mb-4">Listado Países</h1>
    <CountriesTableComponent :countries="countries" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCountries } from '../services/countrieService';
import CountriesTableComponent from '../components/CountriesTableComponent.vue';

const countries = ref([])

onMounted(async () => {
  countries.value = await getCountries()
})

</script>