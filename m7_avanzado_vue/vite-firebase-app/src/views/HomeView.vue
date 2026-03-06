<template>
  <v-container>
    <v-carrousel>
      <!-- Carrusel que muestra 6 imágenes -->
      <v-carrousel-item v-for="n in 6"
                        :key="n">
        <v-img src="https://picsum.photos/1500/500"
               cover />
      </v-carrousel-item>
    </v-carrousel>
  </v-container>
</template>