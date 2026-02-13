import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ServicesView from '../views/ServicesView.vue'
import ContactView from '../views/ContactView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    alias: ['/home', '/inicio', '/index'] // Rutas alternativas para acceder a la misma vista
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    alias: ['/about-us', '/nosotros']
  },
  {
    path: '/services',
    name: 'Services',
    component: ServicesView,
    alias: ['/servicios']
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView,
    alias: ['/contacto']
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundView,
    alias: ['/not-found']
  },
  {
    path: '/:pathMatch(.*)*', // Ruta comodín para capturar cualquier ruta no definida
    redirect: '/404' // Redirige a la página de error 404
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
