<template>
  <v-container>
    <v-card elevation="3">
      <v-card-title>Usuarios Registrados</v-card-title>
      <v-data-table :headers="headers"
                    :items="store.users">
        <!-- Por cada template se puede modificar los datos que se quieran -->
        <template v-slot:item.foto="{ item }">
          <v-avatar size="40">
            <v-img :src="item.foto" />
          </v-avatar>
        </template>
        <template v-slot:item.nombre="{ item }">
          {{ item.nombre }} {{ item.apellido }}
        </template>
        <template v-slot:item.edad="{ item }">
          {{ calculateEdad(item.dob) }} años
        </template>
        <template v-slot:item.hobbies="{ item }">
          <v-chip v-for="hobby in item.hobbies"
                  :key="hobby"
                  size="small"
                  class="ma-1"
                  color="primary">
            {{ hobby }}
          </v-chip>
        </template>
        <template v-slot:item.acciones="{ item }">
          <v-btn @click="verUsuario(item.id)"
                 class="ma-1"
                 icon="mdi-eye"
                 color="secondary"
                 small />
          <v-btn @click="editarUsuario(item.id)"
                 class="ma-1"
                 icon="mdi-pencil"
                 color="warning"
                 small />
          <v-btn @click="eliminarUsuario(item.id)"
                 class="ma-1"
                 icon="mdi-delete"
                 color="error"
                 small />
        </template>
      </v-data-table>
    </v-card>
  </v-container>

</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { useUsersStore } from '../stores/usersStore';
import { useEdad } from '../composables/useEdad'; // Composable para calcular edad a partir de la fecha de nacimiento
import { useUiStore } from '../stores/uiStores';

const store = useUsersStore();
const router = useRouter();
const ui = useUiStore();
const { calculateEdad } = useEdad(); // Desestructurar la función calculateEdad del composable

const headers = [
  { title: "Foto", key: "foto" },
  { title: "Rut", key: "rut" },
  { title: "Nombre", key: "nombre" },
  { title: "énero", key: "genero" },
  { title: "País", key: "pais" },
  { title: "Edad", key: "edad" },
  { title: "Hobbies", key: "hobbies" },
  { title: "Acciones", key: "acciones" }
];

const verUsuario = (id) => {
  router.push(`/usuario/${id}`);
}

const editarUsuario = (id) => {
  router.push(`/usuario/${id}/editar`);
};

const eliminarUsuario = async (id) => {
  const result = await Swal.fire ({
    title: "Elimianar usuario?",
    text: "Esta accion no se puede desahacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Eliminar"
  })
  if (result.isConfirmed) {
    await store.deleteUser(id);
    ui.showSuccess("Usario eliminado satisfactoriamente");
  }
};

onMounted(() => {
  store.loadUsers();
});

</script>