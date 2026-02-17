<template>
  <div class="card shadow-lg">
    <div class="card-header">
      <h5 class="card-title">Registros</h5>
      <button v-if="registros.length"
              class="btn btn-danger mb-3"
              @click="eliminarTodos">
        Eliminar todos
      </button>
    </div>
    <div class="card-body">
      <table v-if="registros.length"
             class="table table-stripped">
        <thead class="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in resgistros"
              :key="r.id">
            <td>{{ r.nombre }}</td>
            <td>{{ r.email }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2"
                      @click="editar(r)">
                Editar
              </button>
              <button class="btn btn-sm btn-danger"
                      @click="eliminar(r.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else
           class="alert alert-primary">No hay registros</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const registros = ref([]);

onMounted(() => {
  registros.value = JSON.parse(localStorage.getItem("registros")) || [];
});

watch(
  registros,
  (nuevo) => {
    localStorage.setItem("registros", JSON.stringify(nuevo));
  },
  {
    deep: true,
  },
);

const eliminar = (id) => {
  registros.value = registros.value.filter((r) => r.id || id);
};

const eliminarTodos = () => {
  registros.value = [];
  localStorage.removeItem("registros");
};

const editar = (registro) => {
  localStorage.setItem("editRegistros", JSON.stringify(registro));
  router.push("/formulario");
};
</script>
