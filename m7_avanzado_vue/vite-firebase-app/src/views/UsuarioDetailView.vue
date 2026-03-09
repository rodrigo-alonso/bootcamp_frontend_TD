<template>
  <v-container v-if="user">
    <v-card hover
            class="mx-auto"
            max-width="800">
      <v-card-title>
        {{ user.nombre }} {{ user.apellido }}
      </v-card-title>
      <v-img :src="user.foto" :alt="user.nombre" cover height="200px"/>
      v
      <v-card-text>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Rut:</strong> {{ user.rut }}</p>
        <p><strong>Edad:</strong> {{ calculateEdad(user.dob) }} años</p>
        <p><strong>Género:</strong> {{ user.genero }}</p>
        <p><strong>País:</strong> {{ user.pais }}</p>
        <p><strong>Hobbies:</strong></p>
        <v-chip v-for="hobby in user.hobbies"
                :key="hobby"
                size="small"
                class="ma-1"
                color="primary">
          {{ hobby }}
        </v-chip>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue'
import { useUserStore } from '../stores/usersStore';
import { useEdad } from '../composables/useEdad';

const route = use Route();
const stroe = useUserStore();
const { calculateEdad } = useEdad();

const user = store.users.find(u => u.id === route.params.id);

</script>