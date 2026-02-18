<template>

  <div class="card shadow-lg">
    <div class="card-body">
      <!--Nombre-->
      <div v-if="!nombre"
           class="mb-3">
        <label for="nombre"
               class="form-label">Nombre:</label>
        <input v-model="nombreTemporal"
               type="text"
               class="form-control"
               id="nombre">
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
           class="my-3">
        <div class="alert"
             :class="['alert', alertEstado]"
             role="alert"
             S>
          <h4 class="alert-heading">Resultados</h4>
          <hr>
          <p>IMC: {{ imc }}</p>

        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';

const nombre = ref(localStorage.getItem("nombre"));
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
  localStorage.removeItem('nombre');
  nombre.value = null;
  nombreTemporal.value = null; // Limpiar el campo temporal
};

const registrar = () => {
  imc.value = peso.value / ((altura.value / 100) ** 2).toFixed(2);

  if (imc.value < 18.5) {
    estado.value = 'Bajo peso';
  } else if (imc.value >= 18.5 && imc.value < 25) {
    estado.value = 'Peso normal';
  } else if (imc.value >= 25 && imc.value < 30) {
    estado.value = 'Sobrepeso';
  } else {
    estado.value = 'Obesidad';
  }

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

// Computed properties para asignar clases dinámicamente según el estado del IMC
// Computed hace que se recalculen automáticamente cuando cambie el valor de estado, 
// lo que permite actualizar las clases CSS de forma reactiva en la plantilla.
const alertEstado = computed(() => ({
  'alert-primary': estado.value === 'Bajo peso',
  'alert-success': estado.value === 'Peso normal',
  'alert-warning': estado.value === 'Sobrepeso',
  'alert-danger': estado.value === 'Obesidad'
}));

</script>