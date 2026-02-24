import { createRouter, createWebHistory } from "vue-router";

// Importamos las vistas
import EstudiantesView from "../views/EstudiantesView.vue";
import EstudiantesDetailView from "../views/EstudiantesDetailView.vue";
import EstudiantesEditView from "../views/EstudiantesEditView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  {
    path: "/",
    redirect: "/estudiantes",
  },
  {
    path: "/estudiantes",
    component: EstudiantesView,
  },
  {
    path: "/estudiantes/:id",
    component: EstudiantesDetailView,
    props: true
  },
  {
    path: "/estudiantes/:id/editar",
    component: EstudiantesEditView,
    props: true
  },
  {
    path: "/404",
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404"
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});