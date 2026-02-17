<template>
  <div class="card shadow-lg">
    <div class="card-header">
      <h5 class="card-title">
        {{ editando ? "Editar Registro" : "Nuevo Registro" }}
      </h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="guardar">
        <div class="mb-3">
          <label for="nombre"
                 class="form-laber">Nombre</label>
          <input class="form-control"
                 type="text"
                 name="nombre"
                 v-model="form.nombre"
                 required />
        </div>
        <div class="mb-3">
          <label for="email"
                 class="form-laber">Email</label>
          <input class="form-control"
                 type="email"
                 name="email"
                 v-model="form.email"
                 required />
        </div>
        <button class="btn btn-primary">
          {{ editando ? 'Actualizar' : 'Guardar' }}
        </button>
        <button v-if="editando"
                type="button"
                class="btn btn-secondary ms-2"
                @click="cancelar">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const editando = ref(false);

const form = reactive({
  id: null,
  nombre: '',
  email: '',
});

onMounted(() => {
  const edit = localStorage.getItem("editRegistro");
  if (edit) {
    Object.assign(form, JSON.parse(edit));
    editando.value = true;
  }
});

const guardar = () => {
  const registros = JSON.parse(localStorage.getItem("registros")) || []; // Si no hay registros, se inicializa como un array vacío
  if (editando.value) {
    const index = registros.findIndex(r => r.id === form.id);
    registros[index] = { ...form }; // ... spread operator para crear un nuevo objeto con los datos actualizados
    localStorage.removeItem("editRegistro");
  } else {
    registros.push({
      id: Date.now(),
      nombre: form.nombre,
      email: form.email,
    });
  }
  localStorage.setItem("registros", JSON.stringify(registros));
  router.push("/registros");
};

const cancelar = () => {
  localStorage.removeItem("editRegistro");
  router.push("/registros");
};
</script>
