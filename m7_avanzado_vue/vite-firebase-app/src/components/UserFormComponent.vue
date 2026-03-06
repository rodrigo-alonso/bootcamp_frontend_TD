<template>
  <v-car class="pa-4">
    <v-form>  
      <v-text-field label="Nombre" v-model="form.nombre"/>
      <v-text-field label="Apellido" v-model="form.apellido"/>
      <v-text-field label="Fecha Nacimiento" type="date" v-model="form.dob"/>
      <v-select label="Género" :items="['Feminino', 'Masculino', 'Otro']" v-model="form.genero"/>
      <v-text-field label="Email" type="email" v-model="form.email"/>
      <v-text-field label="Password" type="password" v-model="form.password"/>
      <v-file-input label="Foto" accept="image/*"  @change="handleFile"/>
      <v-select label="País" :items="countries" item-title="name" item-value="name" v-model="form.pais"/>
      <!-- multiple= Elejir mas de uno en formato chip -->
      <v-select label="Hobbies" :items="hobbiesOptions" multiple chips v-model="form.hobbies"/>
      <v-switch label="Aceptar terminos y condiciones" v-model="form.terminos" />
      <v-btn color="primary" class="mt-4" @click="submint">
      {{ props.user ? 'Actualizar' : 'Registrar' }}
        </v-btn>
    </v-form>
  </v-car>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import { useUsersStore } from '../stores/usersStore';
import { useUiStore } from '../stores/uiStore';
import { getCountries } from '../services/countriesServices';
import { useRouter } from 'vue-router';
import { useEmail } from '../composables/useEmail';

const router = useRouter();
const store = useUsersStore();
const ui = useUiStore();
const validateEmail = useEmail();

const props = defineProps({
  user: Object
});

const countries = ref([]);
// Opciones de hobbies disponibles para el formulario de registro o edición de usuario.
const hobbiesOptions = [
  "Deportes",
  "Lectura",
  "Teatro",
  "Cine",
  "Viajes",
  "Comer"
];

// Formulario reactivo que se utiliza para almacenar los datos del usuario 
// que se está registrando o editando.
const form = ref({
  nombre: props.user?.nombre || "",
  apellido: props.user?.apellido || "",
  dob: props.user?.dob || "",
  genero: props.user?.genero || "",
  email: props.user?.email || "",
  password: props.user?.password || "",
  foto: props.user?.foto || "",
  pais: props.user?.pais || "",
  hobbies: props.user?.hobbies || [],
  terminos: props.user?.terminos || ""
});

// Función que convierte un archivo de imagen a formato base64, lo que permite almacenar la imagen 
// como una cadena de texto en el formulario y posteriormente en la base de datos y evita usar
// archivos .blob 
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataUrl(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Función que se ejecuta al seleccionar un archivo de imagen, encargada de convertir la imagen a 
// formato base64 y almacenarla en el formulario reactivo.
const handleFile = async (e) => {
  const file = e.target.files[0];
  if (!file) return
  form.value.foto = await fileToBase64(file) // Transforma la imagen y la serializa en base64
};

const submit = async () => {
  try {
    // Validacion del email
    if (!validateEmail(form.value.email)) {
      ui.showError("Formato de email no valido");
      return
    }

    // Validacion de terminos y condiciones
    if (!form.value.terminos) {
      ui.showError("Debes aceptar los terminos y condiciones")
      return
    }

    // Actualizar usuario
    if (props.user) {
      await store.updateUser(props.user.id, form.value);
      ui.showSuccess('Usuario actualizado correctamente');
      router.push('/usuario');
    } else {
      await store.addUser(form.value);
      ui.showSuccess('Usuario registrado correctamente');
      resetForm();
      router.push('/usuario');
    }
  } catch(e) {
    console.error(e);
    ui.showError('Error al registrar/actualizar el usuario');
  }
};

const resetForm = () => {
  form.value = {
    nombre: "",
    apellido: "",
    dob: "",
    genero: "",
    email: "",
    password: "",
    foto: "",
    pais: "",
    hobbies: [],
    terminos: false
  }
};

// Función que se ejecuta al enviar el formulario, encargada de validar los datos y 
// llamar a la acción correspondiente del store para registrar o actualizar el usuario.
onMounted(async () => {
  countries.value = await getCountries();
});


</script>