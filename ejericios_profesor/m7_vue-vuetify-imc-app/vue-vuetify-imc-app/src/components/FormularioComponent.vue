<template>
    <v-card>
        <v-card-text>

            <!-- Nombre -->
            <div v-if="!nombre">
                <v-text-field label="Nombre" v-model="tempNombre" />
                <v-btn color="primary" @click="guardarNombre">
                    Guardar nombre
                </v-btn>
            </div>

            <!-- Formulario -->
            <div v-else>
                <div class="d-flex justify-space-between mb-3">
                    <h3>Hola {{ nombre }}</h3>
                    <v-btn color="error" variant="outlined" @click="eliminarNombre">
                        Cambiar nombre
                    </v-btn>
                </div>

                <v-form @submit.prevent="registrar">
                    <v-row>
                        <v-col>
                            <v-text-field label="Edad" type="number" v-model.number="edad" />
                        </v-col>
                        <v-col>
                            <v-text-field label="Peso (kg)" type="number" v-model.number="peso" />
                        </v-col>
                        <v-col>
                            <v-text-field label="Estatura (m)" type="number" v-model.number="estatura" />
                        </v-col>
                    </v-row>

                    <v-btn type="submit" color="success">
                        Calcular IMC
                    </v-btn>
                </v-form>

                <v-alert v-if="imc" class="mt-4" :type="tipoEstado" variant="tonal">
                    IMC: {{ imc }} — {{ estado }}
                </v-alert>
            </div>

        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const nombre = ref(localStorage.getItem('nombre'))
const tempNombre = ref('')
const edad = ref(null)
const peso = ref(null)
const estatura = ref(null)
const imc = ref(null)
const estado = ref('')

const guardarNombre = () => {
    localStorage.setItem('nombre', tempNombre.value)
    nombre.value = tempNombre.value
}

const eliminarNombre = () => {
    localStorage.clear()
    location.reload()
}

const registrar = () => {
    imc.value = (peso.value / (estatura.value ** 2)).toFixed(2);

    if (imc.value < 18.5) estado.value = 'Bajo peso'
    else if (imc.value < 25) estado.value = 'Normal'
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

    edad.value = peso.value = estatura.value = null
}

const tipoEstado = computed(() => {
    if (estado.value === 'Normal') return 'success'
    if (estado.value === 'Sobrepeso') return 'warning'
    if (estado.value === 'Obesidad') return 'error'
    return 'info'
})
</script>
