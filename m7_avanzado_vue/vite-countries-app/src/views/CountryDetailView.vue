<template>
  <v-container v-if="loading">
    <v-progress-circular indeterminate />
  </v-container>

  <v-container v-else-if="!country">
    <v-card class="pa-4">
      <v-row>
        <v-col cols="12"
               md="4"
               class="d-flex justify-center">
          <v-img :src="country.flags.svg"
                 :alt="country.flags.alt"
                 class="w-25" />
        </v-col>
        <v-col cols="12"
               md="4"
               class="d-flex justify-center">
          <v-img :src="country.coatOfArms.svg"
                 :alt="country.coatOfArms.alt"
                 class="w-25" />
        </v-col>
        <v-col cols="12"
               md="4"
               class="d-flex justify-center">
          <h1>{{ country.translations.spa.common }}</h1>
          <p><strong>Capital:</strong> {{ country.capital[0] }}</p>
          <p><strong>Region:</strong> {{ country.region }}</p>
          <p><strong>Moneda:</strong> {{ currency }}</p>
          <p><strong>Simbolo Moneda:</strong> {{ symbol }}</p>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getCountries } from '../services/countrieService';

const route = useRoute();
const router = useRouter();
const country = ref(null); // Objeto reactivo
const loading = ref(true); // Estado de carga

// Funcion asincrona para obtener data de countries
onMounted(async () => {
  const countries = await getCountries();
  country.value = countries.find(e => e.cca3 === route.params.cca3);

  if (!country.value) {
    router.replace('/404');
  }
  loading.value = false;
});

const currency = computed(() => {
  if (!country.value?.currencies) return 'N/A';
  return Object.values(country.value.currencies)[0].name;
});

const symbol = computed(() => {
  if (!country.value?.currencies) return 'N/A';
  return Object.values(country.value.currencies)[0].symbol;
});

</script>