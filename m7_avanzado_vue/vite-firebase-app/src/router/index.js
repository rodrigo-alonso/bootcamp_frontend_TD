import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsuariosView from "../views/UsuariosView.vue";
import UsuarioDetailView from "../views/UsuarioDetailView.vue";
import EditarUsuarioView from "../views/EditarUsuarioView.vue";
import RegistroUsuarioView from "../views/RegistroUsuarioView.vue";
import MetricasView from "../views/MetricasView.vue";
import NotFoundView from "../views/NotFoundView.vue";

// Configuración de rutas para la aplicación, definiendo los caminos y los componentes asociados a cada ruta.
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/registro',
    name: 'registro',
    component: RegistroUsuarioView
  },
  {
    path: '/usuario',
    name: 'usuarios',
    component: UsuariosView
  },
  {
    path: '/usuario/:id',
    name: 'detalle',
    component: UsuarioDetailView
  },
  {
    path: '/usuarios/:id/editar',
    name: 'editar',
    component: EditarUsuarioView
  },
  {
    path: '/metricas',
    name: 'metricas',
    component: MetricasView
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFoundView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
];

export default createRouter({
  history: createWebHistory(),
  routes
});