<template>
  <v-container>
    <v-card>
      <v-card-tex>Registrar usuario</v-card-tex>
      <v-text-field v-model="email"
                    type="email"
                    label="Email"
                    class="mb-2" />
      <v-text-field v-model="password"
                    type="password"
                    label="Password"
                    class="mb-2" />
      <v-btn @click="register"
             color="primary"
             variant="tonal">Registrarse
      </v-btn>
    </v-card>
  </v-container>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { useUiStore } from '../stores/uiStore'

const router = useRouter();
const auth = useAuthStore();
const ui = useUiStore();

const email = ref('');
const password = ref('');

// Metodod para registrar usuario
const register = async () => {
  try {
    await auth.register(email.value, password.value);
    ui.showSuccess("Te has registrado satisfactoriamente");
    router.push('/'); // Si se autentifica va a la raiz
  } catch (error) {
    ui.showError("Se ha producido un error al registrar usuario")
    console.error(error);
  }
}
</script>