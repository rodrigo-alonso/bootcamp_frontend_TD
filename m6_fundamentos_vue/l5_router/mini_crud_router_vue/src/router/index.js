import { createRouter, createWebHistory } from 'vue-router'
import FormView from '@/views/FormView.vue'
import RegistrosView from '@/views/RegistrosView.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    redirect: 'formulario'
  },
  {
    path: '/formulario',
    component: FormView
  },
  {
    path: '/registros',
    name: 'registros',
    component: RegistrosView
  },
  {
    path: '/404',
    name: 'not-found',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
