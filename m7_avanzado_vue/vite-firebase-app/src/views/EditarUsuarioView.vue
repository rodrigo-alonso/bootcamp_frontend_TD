<template>
 <v-container>
  <UserFormComponent v-if="user" :user="user" />
 </v-container>
</template>

<script setup>
import UserFormComponent from '../components/UserFormComponent.vue';
import { useRoute } from 'vuetify/lib/composables/router.mjs';
import { useUsersStore } from '../stores/usersStore';
</script>