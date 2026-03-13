<template>
  <v-container v-if="user">
    <v-card hover
            class="mx-auto"
            max-width="800">
      <v-img :src="user.foto"
             cover
             height="400px" />

      <v-card-title> {{ user.nombre }} {{ user.apellido }} </v-card-title>

      <v-card-subtitle> {{ calculateEdad(user.dob) }} años </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange-lighten-2"
               text="Explorar"></v-btn>
        <!-- v-spacer: Genera espacio flexible entre elementos -->
        <v-spacer />

        <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
               @click="show = !show"></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider />
          <v-card-text>Email: {{ user.email }}</v-card-text>
          <v-card-text>Rut: {{ user.rut }}</v-card-text>
          <v-card-text>Pais: {{ user.pais }}</v-card-text>
          <v-card-text>Genero: {{ user.genero }}</v-card-text>
          <v-card-text>
            <v-chip v-for="hobby in user.hobbies"
                    :key="hobby"
                    size="small"
                    class="ma-1"
                    color="primary">
              {{ hobby }}
            </v-chip>
          </v-card-text>
        </div>
      </v-expand-transition>
      <!-- 
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
       -->
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useUsersStore } from "../stores/usersStore";
import { useEdad } from "../composables/useEdad";

const show = ref(false); // Controla la visibilidad de los detalles del usuario
const route = useRoute();
const userStore = useUsersStore();
const { calculateEdad } = useEdad();

const user = userStore.users.find(u => u.id === route.params.id);
</script>
