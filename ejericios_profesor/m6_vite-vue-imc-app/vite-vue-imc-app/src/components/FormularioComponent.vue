<template>
    <div class="card shadow-lg">
        <div class="card-body">

            <!--Nombre-->
            <div v-if="!nombre">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" v-model="nombreTemporal" class="form-control" />
                <button class="btn btn-primary mt-2" @click="guardarNombre">Guardar Nombre</button>
            </div>

            <!--Formulario-->
            <div v-else>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5>Hola {{ nombre }}</h5>
                    <button class="btn btn-sm btn-outline-danger" @click="eliminarNombre">Eliminar nombre</button>
                </div>

                <form @submit.prevent="registrar">
                    <div class="row">
                        <div class="col-md-4">
                            <input type="number" v-model.number="edad" class="form-control" placeholder="Edad"
                                required />
                        </div>
                        <div class="col-md-4">
                            <input type="number" v-model.number="peso" class="form-control" step="0.1"
                                placeholder="Peso (kg)" required />
                        </div>
                        <div class="col-md-4">
                            <input type="number" v-model.number="estatura" class="form-control" step="0.01"
                                placeholder="Estatura (mt)" required />
                        </div>
                    </div>
                    <button class="btn btn-success mt-3">Calcular IMC</button>
                </form>
            </div>

            <!--Resaultado-->
            <div v-if="imc" class="my-3">
                <div class="alert" :class="alertEstado" role="alert">
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
import { computed, ref } from 'vue'

const nombre = ref(localStorage.getItem('nombre'))
const nombreTemporal = ref('')

const edad = ref(null)
const peso = ref(null)
const estatura = ref(null)

const imc = ref(null)
const estado = ref('')

const guardarNombre = () => {
    localStorage.setItem('nombre', nombreTemporal.value)
    nombre.value = nombreTemporal.value
}


const eliminarNombre = () => {
    localStorage.removeItem('nombre')
    localStorage.removeItem('registros')
    nombre.value = null
    nombreTemporal.value = null
    imc.value = null
}

const registrar = () => {
    imc.value = (peso.value / (estatura.value ** 2)).toFixed(2)

    if (imc.value < 18.5) estado.value = 'Bajo peso'
    else if (imc.value < 25) estado.value = 'Peso normal'
    else if (imc.value < 30) estado.value = 'Sobrepeso'
    else estado.value = 'Obesidad'

    const registros = JSON.parse(localStorage.getItem('registros')) || []

    registros.push({
        fecha: new Date().toLocaleDateString(),
        peso: peso.value,
        estatura: estatura.value,
        imc: imc.value,
        estado: estado.value
    })

    localStorage.setItem('registros', JSON.stringify(registros))

    edad.value = null
    peso.value = null
    estatura.value = null
}

const alertEstado = computed(() => ({
    'alert-primary': estado.value === 'Bajo peso',
    'alert-success': estado.value === 'Peso normal',
    'alert-warning text-danger': estado.value === 'Sobrepeso',
    'alert-danger': estado.value === 'Obesidad'
}))



</script>