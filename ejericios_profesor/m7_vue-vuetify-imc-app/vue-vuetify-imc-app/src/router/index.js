import { createRouter, createWebHistory } from "vue-router";

import MainLayoutComponent from "../components/MainLayoutComponent.vue";
import HomeView from "../views/HomeView.vue";
import HistoricView from "../views/HistoricView.vue"
import NotFoundView from "../views/NotFoundView.vue";
import RegistroView from "../views/RegistroView.vue";


const routes = [
  {
    path: '/',
    component: MainLayoutComponent,
    children: [
      {
        path: '/',
        name: 'Home',
        component: HomeView
      },
      {
        path: '/registro',
        name: 'Registro',
        component: RegistroView
      },
      {
        path: '/historial',
        name: 'Historial',
        component: HistoricView
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})