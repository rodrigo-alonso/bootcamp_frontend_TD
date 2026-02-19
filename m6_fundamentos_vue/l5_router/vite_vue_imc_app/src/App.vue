/*
Aqui se define la estructura general de la aplicación, incluyendo el
NavBar, el Footer y el espacio para mostrar las vistas según la ruta
seleccionada. Además, se agrega una transición para mejorar la experiencia
visual al cambiar entre vistas.
En este caso se utiliza el componente router-view ya que se desea que la 
aplicacion tenga algunas vistas en comun y otras no. En este caso
el NavBar y el Footer se encuentran en el componente MainLayout.vue
el cual es utilizado por las vistas HomeView.vue, RegistroView.vue,
HistorialView.vue. 
NotFoundView.vue es una vista que no utiliza el MainLayout.vue por 
lo que no muestra el NavBar ni el Footer.
*/

<template>
  <router-view />
</template>