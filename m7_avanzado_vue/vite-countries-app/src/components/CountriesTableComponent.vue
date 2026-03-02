<template>
  <!--  -->
  <v-data-table :headers="headers"
                :items="countries"
                item.key="cca3">
    <template #item.flags="{ item }">
      <v-img :src="item.flags.svg"
             width="40"
             :alt="item.alt" />
    </template>
    <template #item.coatOfArms="{ item }">
      <v-img :src="item.coatOfArms.svg"
             width="40" />
    </template>
    <template #item.name="{ item }">
      <RouterLink :to="`/pais/${item.cca3}`">
        {{ item.translations.spa.common }}
      </RouterLink>
    </template>
    <template #item.region="{ item }">
      {{ item.region }}
    </template>
    <template #item.capital="{ item }">
      {{ item.capital ? item.capital[0] : 'N/A' }}
    </template>
  </v-data-table>

</template>

<script setup>
import { useRouter } from 'vue-router';

// Definimos las props que el componente recibirá, en este caso una lista de países
const props = defineProps({
  countries: Array
})

// Obtenemos el router para poder navegar a la vista de detalle de cada país
const router = useRouter();

// Definimos la estructura del encabezado de la tabla
const header = [
  { title: 'Bandera', key: 'flags' },
  { title: 'Escudo de Armas', key: 'coatOfArms' },
  { title: 'Pais', key: 'name' },
  { title: 'Capital', key: 'capital' },
  { title: 'Region', key: 'region' },
]
</script>