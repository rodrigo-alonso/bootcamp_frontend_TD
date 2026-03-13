<template>
  <v-container>
    <v-row>
      <v-col cols="12"
             md="4">
        <v-card>
          <v-card-tex text-display->Login</v-card-tex>
          <v-text-field v-model="email"
                        type="email"
                        label="Email"
                        class="mb-2" />
          <v-text-field v-model="password"
                        type="password"
                        label="Password"
                        class="mb-2" />
          <v-btn @click="login"
                 color="primary"
                 class="me-2"
                 variant="tonal">Iniciar Sesion</v-btn>
          <v-btn color="secondary"
                 variant="tonal"
                 to="/register"
                 class="pa-2">Registrarse</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { useUiStore } from '../stores/uiStore';

const email = ref('');
const password = ref('');
const auth = useAuthStore();
const ui = useUiStore();
const route = useRoute();
const router = useRouter();

const login = async () => {
  try {
    await auth.login(email.value, password.value);
    const redirect = route.query.redirect || '/';
    ui.showMessage("Sesion iniciada con exito", "success", 3000, "bottom", "tonal", true, false);
    router.push(redirect);
  } catch {
    ui.showMessage("Credenciales incorrectas...", "error", 3000, "bottom", "tonal", true, false);
  }
}
</script>