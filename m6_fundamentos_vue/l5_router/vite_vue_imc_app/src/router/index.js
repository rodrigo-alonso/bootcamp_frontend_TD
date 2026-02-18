import { createRouter, createWebHistory } from 'vue-router' // Importacion de las vistas
import MainLayoutComponent from '../components/MainLayoutComponent.vue'
import HomeView from '../views/HomeView.vue'
import RegistroView from '../views/RegistroView.vue'
import HistorialView from '../views/HistorialView.vue'
import NotFoundView from '../views/NotFoundView.vue'

// Definicion de las rutas asociadas a cada vista que se mostrará al usuario 
// dependiendo de la URL que visite
// children: Permite definir rutas anidadas, donde las rutas hijas se 
// renderizan dentro del componente padre (MainLayoutComponent en este caso). 
// Esto es útil para mantener una estructura de diseño consistente 
// (como una barra de navegación y un pie de página) mientras se cambian 
// las vistas principales.
const routes = [
  {
    path: '/',
    component: MainLayoutComponent,
    children: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/registro',
        name: 'registro',
        component: RegistroView
      },
      {
        path: '/historial',
        name: 'historial',
        component: HistorialView
      },
    ]
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFoundView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});