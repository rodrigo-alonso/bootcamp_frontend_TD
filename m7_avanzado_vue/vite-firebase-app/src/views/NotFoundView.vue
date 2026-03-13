<template>
  <v-empty-state headline="Whoops, 404"
                 title="Pagina no encontrada"
                 text="La pagina no ha sido encontrada. Por favor, revisa la URL o regresa a la página de inicio.">
    <!-- #icon => v-slot:icon -->
    <template #icon>
      <v-icon size="64"
              color="primary">mdi-alert-circle-outline</v-icon>
    </template>
    <template #actions>
      <v-btn color="primary"
             to="/">Volver al inicio</v-btn>
    </template>
  </v-empty-state>
</template>