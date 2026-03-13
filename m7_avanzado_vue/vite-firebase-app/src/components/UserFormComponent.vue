<template>
  <v-card class="pa-4">
    <v-card-title>
      {{ props.user ? "Actualizar Usuario" : "Registrar nuevo usuario" }}
    </v-card-title>
    <v-form ref="formRef">
      <v-text-field
        v-model="form.rut"
        @input="handleRutInput"
        :rules="[rules.required, rules.rutRule]"
        label="RUT"
        variant="outlined"
      />

      <v-text-field v-model="form.nombre" :rules="[rules.required]" label="Nombre" variant="outlined" />

      <v-text-field v-model="form.apellido" :rules="[rules.required]" label="Apellido" variant="outlined" />

      <v-text-field v-model="form.dob" :rules="[rules.required]" label="Fecha Nacimiento" type="date" variant="outlined" />

      <v-select
        :items="['Femenino', 'Masculino', 'Otro']"
        v-model="form.genero"
        :rules="[rules.required]"
        label="Genero"
        variant="outlined"
      />
      <!-- :rules="[rules.required, rules.emailRule]" -> Reglas de validación para el campo de email -->
      <v-text-field v-model="form.email" :rules="[rules.required, rules.emailRule]" label="Email" variant="outlined" />

      <v-text-field
        v-model="form.password"
        :rules="[rules.required, rules.password]"
        label="Password"
        type="password"
        variant="outlined"
      />

      <v-file-input @change="handleFile" label="Foto perfil" accept="image/*" />
      <!-- item-title="name" === item.name -->
      <v-autocomplete
        :items="countries"
        v-model="form.pais"
        :rules="[rules.required]"
        label="País"
        clearable
        density="comfortable"
        menu-icon="mdi-earth"
        item-title="name"
        item-value="name"
        variant="outlined"
      >
        <!-- ITEM DEL DROPDOWN -->
        <!-- #item: Personaliza cada opcion del dropdown -->
        <!-- props: Es un objeto interno de vuetify que contiene las propiedades del item -->
        <template #item="{ props, item }">
          <!-- v-list-item: subcomponente de v-list usado para mostrar un solo item -->
          <!-- v-bind="props" aplica las propiedades en v-list-item -->
          <v-list-item v-bind="props">
            <!-- #prepend: Personaliza la parte izquierda del item (antepone en v-list-item) -->
            <!-- Existe tambien el #append que es la parte derecha del v-list-item -->
            <template #prepend>
              <!-- item.raw...= es un wrapper de vuetify que envuelve objeto original -->
              <v-img :src="item.raw?.flag || item.flag" width="28" height="18" cover class="mr-2 border-flag" />
            </template>
          </v-list-item>
        </template>

        <!-- ITEM SELECCIONADO -->
        <!-- #selection personaliza como se ve el valor seleccionado, se ejecuta al seleccionar un pais -->
        <template #selection="{ item }">
          <!-- Muestra un chip con la bandera y el nombre del país seleccionado -->
          <v-chip>
            <v-img :src="item.raw?.flag || item.flag" width="24" height="16" class="mr-2 border-flag" />
            {{ item.raw?.name || item.name }}
          </v-chip>
        </template>
      </v-autocomplete>

      <v-select v-model="form.hobbies" :items="hobbiesOptions" label="Hobbies" multiple chips />

      <v-switch v-model="form.terminos" :rules="[rules.required]" label="Aceptar términos y condiciones" variant="outlined" />

      <v-btn @click="submit" color="primary" class="mt-4">
        {{ props.user ? "Actualizar Usuario" : "Registrar Usuario" }}
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
  import { ref, defineProps, onMounted } from "vue";
  import { useUsersStore } from "../stores/usersStore";
  import { useUiStore } from "../stores/uiStore";
  import { getCountries } from "../services/countriesService";
  import { useRouter } from "vue-router";
  import { useEmail } from "../composables/useEmail"; // Composable para validar email
  import { useRut } from "../composables/useRut"; // Composable para validar rut

  // Sin {}: el valor devuelto es lo que se necesita
  const router = useRouter();
  const store = useUsersStore();
  const ui = useUiStore();
  // Con {}: el valor devuelto es un objeto del que solo se usa una parte.
  const { validateEmail } = useEmail(); //
  const { validateRut, formatRut } = useRut();

  /* Funcion que declara que datos puede recibir el componenente desde su componente padre

Cuando otro componente (el padre) usa <UserFormComponent>, le puede pasar un usuario así:
<!-- Modo EDICIÓN: pasa el usuario -->
<UserFormComponent :user="usuarioSeleccionado" />

<!-- Modo REGISTRO: no pasa nada -->
<UserFormComponent />

TIPS: Aqui se usa props para poder reutilizar el mismo componente tanto para registrar un 
nuevo usuario (sin pasar datos) como para editar un usuario existente (pasando un objeto con 
los datos del usuario a editar). El componente detecta si se le pasaron datos o no y se 
comporta en consecuencia.
*/
  const props = defineProps({
    user: Object,
  });

  const countries = ref([]);

  // Opciones de hobbies disponibles para el formulario de registro o edición de usuario.
  const hobbiesOptions = ["Deportes", "Lectura", "Teatro", "Cine", "Viajes", "Comer"];

  const formRef = ref(null);

  // Reglas de validacion para los campos del formulario
  const rules = {
    required: (v) => !!v || "Campo obligatorio", // !!v = convierte a booleano
    emailRule: (v) => validateEmail(v) || "Email o formato inválido",
    rutRule: (v) => validateRut(v) || "RUT inválido",
    password: (v) => v.length >= 6 || "Minimo 6 caracteres",
  };

  // Función que se ejecuta al ingresar un valor en el campo RUT, encargada de formatear el RUT
  const handleRutInput = () => {
    form.value.rut = formatRut(form.value.rut);
  };

  // Objeto reactivo: si tiene datos -> formulario de edición, si no tiene datos -> formulario de registro
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
    terminos: props.user?.terminos || "",
  });

  // Función que convierte un archivo de imagen a formato base64, lo que permite almacenar la imagen
  // como una cadena de texto en el formulario y posteriormente en la base de datos y evita usar
  // archivos .blob
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataUrl(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Función que se ejecuta al seleccionar un archivo de imagen, encargada de convertir la imagen a
  // formato base64 y almacenarla en el formulario reactivo.
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    form.value.foto = await fileToBase64(file); // Transforma la imagen y la serializa en base64
  };

  const submit = async () => {
    // .validate() -> método de Vuetify que valida los campos del formulario según las reglas definidas
    const { valid } = await formRef.value.validate();
    if (!valid) {
      ui.showMessage("Debe corregir los campos del formulario", "error", 3000, "bottom", "tonal", true, false);
      return;
    }
    if (!form.value.terminos) {
      ui.showMessage("Debe aceptar los términos", "error", 3000, "bottom", "tonal", true, false);
      return;
    }

    try {
      // Verificacion de email o rut duplicados en store de pinia
      const exists = store.userExists(
        form.value.email,
        form.value.rut,
        props.user ? props.user.id : null, // null si es registro nuevo
      );
      if (exists.emailExists) {
        ui.showMessage("El email ya está registrado", "error", 3000, "bottom", "tonal", true, false);
        return;
      }
      if (exists.rutExists) {
        ui.showMessage("El RUT ya está registrado", "error", 3000, "bottom", "tonal", true, false);
        return;
      }
      // Logica principal
      if (props.user) {
        // EDITAR USUARIO
        await store.updateUser(props.user.id, form.value); // Actauliza el usuario
        ui.showMessage("Usuario actualizado correctamente", "success", 3000, "bottom", "tonal", true, false);
        router.push("/usuarios");
      } else {
        // REGISTRAR USUARIO
        await store.addUser(form.value);
        ui.showMessage("Usuario registrado correctamente", "success", 3000, "bottom", "tonal", true, false);
        resetForm(); // Limpia el formulario para registrar otro usuario si se desea
        router.push("/usuarios");
      }
    } catch (error) {
      console.error(error);
      ui.showMessage("Error al guardar usuario", "error", 3000, "bottom", "tonal", true, false);
    }
  };

  // Funcion que limpia el formulario
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
      terminos: false,
    };
  };

  // Cuando se monta el componente, se pide de forma asincronica la lista de paises al servicio getCountries
  onMounted(async () => {
    countries.value = await getCountries();
  });
</script>
