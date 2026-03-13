import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsuariosView from "../views/UsuariosView.vue";
import UsuarioDetailView from "../views/UsuarioDetailView.vue";
import EditarUsuarioView from "../views/EditarUsuarioView.vue";
import RegistroUsuarioView from "../views/RegistroUsuarioView.vue";
import MetricasView from "../views/MetricasView.vue";
import NotFoundView from "../views/NotFoundView.vue";

// Importar vista de login y registrar
import LoginView from "../views/loginView.vue";
import RegisterView from "../views/RegisterView.vue";

import { useAuthStore } from "../stores/authStore";

// Configuración de rutas para la aplicación, definiendo los caminos y los componentes asociados a cada ruta.
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: LoginView
  // },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: RegisterView
  // },
  {
    path: '/registro',
    name: 'registro',
    component: RegistroUsuarioView,
    meta: { requiresAuth: true } // Se aseguran las rutas con inicio de sesion requerido
  },
  {
    path: '/usuario',
    name: 'usuarios',
    component: UsuariosView,
    meta: { requiresAuth: true}
  },
  {
    path: '/usuario/:id',
    name: 'detalle',
    component: UsuarioDetailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/usuario/:id/editar',
    name: 'editar',
    component: EditarUsuarioView,
    meta: { requiresAuth: true }
  },
  {
    path: '/metricas',
    name: 'metricas',
    component: MetricasView,
    meta: { requiresAuth: true }
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

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Proteger las rutas que requieren autentificacion.
// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore();
//   if (auth.loading) {
//     const unwatch = auth.$subscribe(() => {
//       if (!auth.loading) {
//         unwatch();
//         handleRoute();
//       }
//     });
//   } else {
//     handleRoute();
//   };

//   function handleRoute() {
//     if (auth.user && (to.name === 'login' || to.name === 'register')) {
//       next(from.fullPath || '/');
//       return;
//     };

//     if (to.meta.requiredAuth && !auth.user) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath}
//       });
//     };
//   };
// });

export default router;