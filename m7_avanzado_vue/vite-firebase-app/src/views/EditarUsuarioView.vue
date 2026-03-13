<template>
  <v-container>
    <!-- Si existe un usuario con el ID proporcionado -->
    <!-- :user Le pasa al componente hijo una prop llamada user -->
    <!-- Como user viene de un computed(), cuando cambia la prop se actualiza auto. -->
    <!-- Se usa user y no user.value ya que template hace auto-unwrapping de refs y computed -->
    <UserFormComponent v-if="user"
                       :user="user" />
  </v-container>
</template>

<script setup>
import UserFormComponent from '../components/UserFormComponent.vue';
import { useRoute } from 'vuetify/lib/composables/router.mjs';
import { computed } from 'vue';
import { useUsersStore } from '../stores/usersStore';

const route = useRoute();
const usersStore = useUsersStore();

const user = computed(() => {
  return usersStore.users.find(u => u.id === route.params.id);
});
</script>