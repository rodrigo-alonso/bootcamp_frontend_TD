<script setup>
import { ref, computed, onMounted } from "vue";

// Constantes para clases de alerta y estados de salud
const alert_warning = "alert-warning";
const alert_success = "alert-success";
const alert_danger = "alert-danger";
const bajo_peso = "Bajo peso";
const peso_normal = "Peso normal";
const sobrepeso = "Sobrepeso";
const obesidad = "Obesidad";

// A diferencia de vue cli, en Vite no es necesario exportar un objeto con la función data,
// sino que se pueden definir las variables reactivas directamente en el script
// usando ref() o reactive().

// Datos
const doctor = ref("");
const doctorInput = ref("");

// Variables reactivas: se definen con ref() o reactive() para que Vue pueda detectar los cambios y actualizar la interfaz
// TIP: La elección entre ref() y reactive() depende de la estructura de los datos que quieras manejar:
// - ref(): Valores simples, más común cuando estás empezando
// - reactive(): Cuando tienes varios valores relacionados que quieres agrupar

// Datos del paciente
const nombre = ref("");
const peso = ref(null);
const estatura = ref(null);
const imc = ref(null);
const estado = ref("");
const claseEstado = ref("");
const error = ref("");

// Datos en Local Storage
const pacientes = ref([]);
const modoEdicion = ref(false);
const indiceEdicion = ref(null);

// OnMounted: hook del ciclo de vida que se ejecuta cuando la aplicación está montada
onMounted(() => {
  cargarPaciente(); // Llama al método para cargar los pacientes desde Local Storage
  cargarDoctor(); // Llama al método para cargar el nombre del doctor desde la cookie
});

// TIP: Para acceder a las variables reactivas dentro de los métodos, se utiliza el 
// valor de la referencia con .value (ejemplo: doctor.value, pacientes.value, etc.)

// Computed: propiedades computadas para cálculos basados en el estado reactivo
const promedioIMC = computed(() => {
  // Propiedad computada para calcular el promedio de IMC de los pacientes
  if (pacientes.value.length === 0) return 0; // Si no hay pacientes, retorna 0
  const suma = pacientes.value.reduce((total, p) => {
    return (total += parseFloat(p.imc));
  }, 0);
  return (suma / pacientes.value.length).toFixed(2);
});

//TODO: Corroborar el uso o eliminacion de return
const contarEstados = computed(() => {
  // Propiedad computada para contar los pacientes en cada estado de salud
  return {
    bajo_peso: pacientes.value.filter((p) => p.estado === bajo_peso).length,
    peso_normal: pacientes.value.filter((p) => p.estado === peso_normal).length,
    sobrepeso: pacientes.value.filter((p) => p.estado === sobrepeso).length,
    obesidad: pacientes.value.filter((p) => p.estado === obesidad).length,
  };
});

// Cookies: métodos para guardar, cargar y eliminar el nombre del doctor usando cookies
function guardarDoctor() {
  // Método para guardar el nombre del doctor en una cookie
  if (!doctorInput.value) return; // Si el input está vacío, no hace nada
  // max-age en segundos
  document.cookie = `doctorNombre=${doctorInput.value}; max-age=60; path=/`; // Guardado de datos doctor en cookie por 1 minuto
  doctor.value = doctorInput.value;
  doctorInput.value = "";
}

function cargarDoctor() {
  // Método para cargar el nombre del doctor desde la cookie
  const cookie = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("doctorNombre"));
  if (cookie) {
    doctor.value = cookie.split("=")[1];
  }
}

function eliminarDoctor() {
  // Método para eliminar la cookie del doctor
  document.cookie = "doctorNombre=; max-age=0; path=/"; // Elimina la cookie del doctor
  doctor.value = "";
  doctorInput.value = "";
}

function definirAccionFormulario() {
  // Método para definir la acción del formulario (calcular o actualizar)
  modoEdicion.value ? actualizarPaciente() : calcularIMC();
}

// Metodos CRUD pacientes
function calcularIMC() {
  // Método para calcular el IMC
  error.value = ""; // Reinicia el mensaje de error
  imc.value = null; // Reinicia el IMC

  // Validaciones básicas
  if (!nombre.value) {
    error.value = "Por favor, ingresa tu nombre.";
    return;
  }

  if (!peso.value || !estatura.value) {
    error.value = "Por favor, ingresa tu peso y estatura.";
    return;
  }

  if (peso.value <= 0 || estatura.value <= 0) {
    error.value = "El peso y la estatura deben ser valores positivos.";
    return;
  }

  // Cálculo del IMC
  imc.value = (peso.value / Math.pow(estatura.value, 2)).toFixed(2);

  definirEstado(); // Llama al método para definir el estado de salud basado en el IMC
  guardarPaciente(); // Llama al método para guardar el paciente con los datos calculados
}

function definirEstado() {
  // Método para definir el estado de salud basado en el IMC
  if (imc.value < 18.5) {
    estado.value = bajo_peso;
    claseEstado.value = alert_warning;
  } else if (imc.value >= 18.5 && imc.value < 24.9) {
    estado.value = peso_normal;
    claseEstado.value = alert_success;
  } else if (imc.value >= 25 && imc.value < 29.9) {
    estado.value = sobrepeso;
    claseEstado.value = alert_warning;
  } else {
    estado.value = obesidad;
    claseEstado.value = alert_danger;
  }
}

function guardarPaciente() {
  // Método para guardar el paciente en el array y en Local Storage
  const paciente = {
    // Crea un objeto paciente con los datos actuales
    nombre: nombre.value,
    peso: peso.value,
    estatura: estatura.value,
    imc: imc.value,
    estado: estado.value,
    fechaRegistro: new Date().toLocaleDateString(),
    doctor: doctor.value,
  };
  pacientes.value.push(paciente); // Agrega el paciente al array
  localStorage.setItem("pacientes", JSON.stringify(pacientes.value)); // Guarda el array en Local Storage como un string JSON
  limpiarFormulario(); // Limpia el formulario
}

function cargarPaciente() {
  // Método para cargar los pacientes desde Local Storage
  const data = localStorage.getItem("pacientes"); // Obtiene los datos del Local Storage
  if (data) {
    // Si hay datos, los parsea y los asigna al array de pacientes
    pacientes.value = JSON.parse(data); // Convierte el string JSON a un array de objetos
  }
}

function editarPaciente(index) {
  // Método para editar un paciente existente
  const p = pacientes.value[index]; // Obtiene el paciente del array por su índice
  nombre.value = p.nombre;
  peso.value = p.peso;
  estatura.value = p.estatura;
  imc.value = p.imc;
  estado.value = p.estado;
  claseEstado.value = ""; // Reinicia la clase del estado
  modoEdicion.value = true; // Activa el modo edición
  indiceEdicion.value = index; // Guarda el índice del paciente que se está editando
}

function actualizarPaciente() {
  // Método para actualizar los datos de un paciente editado
  imc.value = (peso.value / Math.pow(estatura.value, 2)).toFixed(2); // Recalcula el IMC
  definirEstado(); // Redefine el estado basado en el nuevo IMC
  pacientes.value[indiceEdicion.value] = {
    // Actualiza el paciente en el array con los nuevos datos
    ...pacientes.value[indiceEdicion.value], // Mantiene los datos existentes (No entiendo)
    nombre: nombre.value,
    peso: peso.value,
    estatura: estatura.value,
    imc: imc.value,
    estado: estado.value,
    claseEstado: claseEstado.value,
    fechaRegistro: new Date().toLocaleDateString(),
    doctor: doctor.value,
  };
  localStorage.setItem("pacientes", JSON.stringify(pacientes.value)); // Actualiza el Local Storage con el array modificado
  limpiarFormulario(); // Limpia el formulario
}

function eliminarPaciente(index) {
  // Método para eliminar un paciente del array y del Local Storage
  if (!confirm("¿Estás seguro de que deseas eliminar este paciente?")) return; // Confirma la acción con el usuario
  pacientes.value.splice(index, 1); // Elimina el paciente del array (splice busca por índice y elimina 1 elemento)
  localStorage.setItem("pacientes", JSON.stringify(pacientes.value)); // Actualiza el Local Storage con el array modificado
}

// Método para limpiar Local Storage y el array de pacientes

function limpiarLocalStorage() { // Método para limpiar Local Storage y el array de pacientes
  localStorage.removeItem("pacientes"); // Elimina los datos del Local Storage
  pacientes.value = []; // Limpia el array de pacientes
  limpiarFormulario(); // Limpia el formulario
}

function limpiarFormulario() { // Método para limpiar el formulario
  nombre.value = "";
  peso.value = null;
  estatura.value = null;
  imc.value = null;
  estado.value = "";
  claseEstado.value = "";
  error.value = "";
  modoEdicion.value = false;
  indiceEdicion.value = null;
  return;
}

function claseFila(estado) { // Método para asignar clases CSS a las filas de la tabla según el estado de salud
  return (
    {
      "Bajo peso": "table-warning",
      "Peso normal": "table-success",
      "Sobrepeso": "table-warning",
      "Obesidad": "table-danger",
    }[estado] || ""
  );
}
</script>

<template>
  <div id="app" class="container my-5">
    <!--Formulario Datos de Doctor usando cookie-->
    <div class="card shadow mb-4">
      <div class="card-header text-center">
        <h2 class="card-title">Doctor (cookie)</h2>
      </div>
      <div class="card-body text-center">
        <div v-if="!doctor">
          <input
            v-model="doctorInput"
            type="text"
            name="doctor"
            id="doctor"
            class="form-control mb-3 text-center"
            placeholder="Ingresa el nombre del doctor"
          />
          <button class="btn btn-success w-100" @click="guardarDoctor">
            Guardar
          </button>
        </div>
        <div v-else class="alert alert-primary">
          🧑‍⚕️ Doctor: <strong>{{ doctor }}</strong>
          <button
            class="btn btn-outline-secondary w-100 mt-3"
            @click="eliminarDoctor"
          >
            Eliminar doctor de turno (eliminar cookie)
          </button>
        </div>
      </div>
    </div>

    <!-- Formulario ingreso de datos paciente -->
    <div class="card shadow">
      <div class="card-header">
        <h2 class="text-center card-title">Calculadora IMC</h2>
      </div>
      <div class="card-body">
        <div v-if="nombre" class="alert alert-primary text-center mb-4">
          <p>
            Complete los datos del paciente <strong>{{ nombre }}</strong
            >, para calcular su IMC
          </p>
        </div>
        <div v-if="error" class="alert alert-danger text-center mb-4">
          <p>{{ error }}</p>
        </div>
        <div class="mb-3">
          <input
            v-model="nombre"
            type="text"
            id="nombre"
            name="nombre"
            class="form-control text-center my-3"
            placeholder="Ingresa tu nombre"
          />
          <input
            v-model="peso"
            type="number"
            id="peso"
            name="peso"
            class="form-control text-center my-3"
            placeholder="Ingresa tu peso"
            step="0.1"
          />
          <input
            v-model="estatura"
            type="number"
            id="estatura"
            name="estatura"
            class="form-control text-center my-3"
            placeholder="Ingresa tu estatura"
            step="0.01"
          />
        </div>
      </div>
      <div class="card-footer text-center">
        <button
          v-on:click="definirAccionFormulario"
          class="btn btn-primary w-100"
        >
          {{ modoEdicion ? "Actualizar Paciente" : "Calcular IMC" }}
        </button>
        <button @click="limpiarFormulario" class="btn btn-secondary w-100 mt-2">
          Limpiar
        </button>
      </div>
    </div>

    <!-- Resultado IMC -->
    <div v-if="imc" :class="['alert mt-4 text-center', claseEstado]">
      <p class="mb-2">
        <strong>{{ nombre }}</strong
        >, tu IMC es: <strong>{{ imc }}</strong>
      </p>
      <p class="mb-2">
        Estado de salud: <strong>{{ estado }}</strong>
      </p>
    </div>

    <!-- Historial de pacientes -->
    <div v-if="pacientes.length" class="mt-5">
      <div class="table-responsive">
        <table class="table table-bordered text-center">
          <thead class="table-dark">
            <tr>
              <th>Paciente</th>
              <th>Peso [Kg]</th>
              <th>Estatura [m]</th>
              <th>IMC</th>
              <th>Estado</th>
              <th>Fecha Registro</th>
              <th>Doctor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(p, index) in pacientes"
              :key="index"
              :class="claseFila(p.estado)"
            >
              <td>{{ p.nombre }}</td>
              <td>{{ p.peso }}</td>
              <td>{{ p.estatura }}</td>
              <td>{{ p.imc }}</td>
              <td>{{ p.estado }}</td>
              <td>{{ p.fechaRegistro }}</td>
              <td>{{ p.doctor }}</td>
              <td>
                <button
                  class="btn btn-sm btn-warning me-1"
                  @click="editarPaciente(index)"
                >
                  Editar
                </button>
                <button
                  class="btn btn-sm btn-danger me-1"
                  @click="eliminarPaciente(index)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!--Estadisticas-->
      <div class="alert alert-info text-center">
        <p class="mb-1"><strong>Promedio IMC: </strong> {{ promedioIMC }}</p>
        <p class="mb-1">
          <strong>Total Pacientes: </strong> {{ pacientes.length }}
        </p>
      </div>

      <div class="row text-center mt-4">
        <div class="col-md-3">
          <div class="alert alert-warning">
            <p>Bajo Peso: {{ contarEstados.bajo_peso }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="alert alert-success">
            <p>Peso Normal: {{ contarEstados.peso_normal }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="alert alert-warning">
            <p>Sobrepeso: {{ contarEstados.sobrepeso }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="alert alert-danger">
            <p>Obesidad: {{ contarEstados.obesidad }}</p>
          </div>
        </div>
      </div>

      <button @click="limpiarLocalStorage" class="btn btn-danger w-100 mt-3">
        Limpiar Historial
      </button>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
