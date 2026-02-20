<template>

  <div class="card shadow-lg">
    <div class="card-body">

      <!--Nombre-->
      <div v-if="!nombre">
        <label for="nombre"
               class="form-label">Nombre:</label>
        <input v-model="nombreTemporal"
               type="text"
               class="form-control" />
        <button @click="guardarNombre"
                class="btn btn-primary mt-2">Guardar Nombre</button>
      </div>

      <!--Formulario-->
      <div v-else>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5>Hola {{ nombre }}</h5>
          <button @click="eliminarNombree"
                  class="btn btn-small btn-outline-danger">Eliminar paciente</button>
        </div>
        <form @submit.prevent="registrar">
          <div class="row">
            <div class="col-md-4">
              <!--v-model.number se usa para convertir el valor a número y no dejarlos como string-->
              <input v-model.number="edad"
                     type="number"
                     class="form-control"
                     placeholder="Edad"
                     required />
            </div>
            <div class="col-md-4">
              <input v-model.number="peso"
                     type="number"
                     step="0.1"
                     class="form-control"
                     placeholder="Peso (kg)"
                     required />
            </div>
            <div class="col-md-4">
              <input v-model.number="altura"
                     type="number"
                     step="0.01"
                     class="form-control"
                     placeholder="Altura (cm)"
                     required />
            </div>
          </div>
          <button class="btn btn-success mt-3">Calcular IMC</button>
        </form>
      </div>

      <!--Resultado-->
      <div v-if="imc"
           class="my-3 text-center">
        <div class="alert"
             :class="[alertEstado]"
             role="alert">
          <h4 class="alert-heading">Resultados</h4>
          <hr>
          <p>IMC: {{ imc }}</p>
          <p class="mb-0">Estado: {{ estado }}</p>
        </div>
      </div>
      
    </div>
  </div>

</template>

<script setup>
// - Ref: es una función de Vue que permite crear variables reactivas, es decir, variables que cuando cambian su valor, 
// la interfaz de usuario se actualiza automáticamente para reflejar ese cambio. 
// - Computed: es otra función de Vue que permite crear propiedades computadas, que son valores derivados de otras variables 
// reactivas y se recalculan automáticamente cuando esas variables cambian.
import { ref, computed } from 'vue';

// Constantes para uso interno del componente
const IMC_BAJO_PESO = 18.5;
const IMC_PESO_NORMAL = 25;
const IMC_SOBREPESO = 30;
const BAJO_PESO = 'Bajo peso';
const PESO_NORMAL = 'Peso normal';
const SOBREPESO = 'Sobrepeso';
const OBESIDAD = 'Obesidad';

// Variables reactivas para almacenar los datos del formulario, el resultado del IMC y el estado del IMC
const nombre = ref(localStorage.getItem("nombre")); // Se inicializa con el valor del localStorage para mantener el estado al recargar la página
const nombreTemporal = ref(''); // Al ser un string se inicializa con cadena vacía para evitar problemas de tipo

const edad = ref(null); // Al ser numero se inicializa con null para evitar problemas de tipo
const peso = ref(null);
const altura = ref(null);

const imc = ref(null);
const estado = ref('');

// Función para guardar el nombre en localStorage y actualizar la variable reactiva
const guardarNombre = () => {
  localStorage.setItem('nombre', nombreTemporal.value);
  nombre.value = nombreTemporal.value;
};

// Función para eliminar el nombre del localStorage y actualizar la variable reactiva
const eliminarNombree = () => {
  localStorage.removeItem('nombre'); // Eliminar el nombre del localStorage
  localStorage.removeItem('registros'); // Eliminar también los registros asociados al paciente
  nombre.value = null;
  nombreTemporal.value = null; // Limpiar el campo temporal
  imc.value = null; // Limpiar el resultado del IMC
  estado.value = null; // Limpiar el estado del IMC
};

// Función para calcular el IMC, determinar el estado y guardar el registro en localStorage
const registrar = () => {
  imc.value = (peso.value / (altura.value ** 2)).toFixed(2); // Se calcula el IMC y se redondea a 2 decimales

  // Determinar el estado del IMC según los rangos establecidos
  if (imc.value < IMC_BAJO_PESO) estado.value = BAJO_PESO;
  else if (imc.value < IMC_PESO_NORMAL) estado.value = PESO_NORMAL;
  else if (imc.value < IMC_SOBREPESO) estado.value = SOBREPESO;
  else estado.value = OBESIDAD;

  // Obtener los registros existentes del localStorage o inicializar un array vacío si no hay registros
  const registros = JSON.parse(localStorage.getItem('registros')) || [];

  // Agregar el nuevo registro al array de registros
  registros.push(
    {
      fecha: new Date().toLocaleString(),
      peso: peso.value,
      altura: altura.value,
      imc: imc.value.toFixed(2),
      estado: estado.value
    }
  )

  // Guardar el nuevo registro en localStorage
  localStorage.setItem('registros', JSON.stringify(registros));

  // Limpiar los campos después de registrar
  edad.value = null;
  peso.value = null;
  altura.value = null;
};

// Computed hace que se recalculen automáticamente cuando cambie el valor de estado, 
// lo que permite actualizar las clases CSS de forma reactiva en la plantilla.

// Funcion para asignar clases alert dinámicamente según el estado del IMC
const alertEstado = computed(() => ({
  'alert-warning': estado.value === BAJO_PESO,
  'alert-success': estado.value === PESO_NORMAL,
  'alert-warning text-danger': estado.value === SOBREPESO,
  'alert-danger': estado.value === OBESIDAD
}));

</script>