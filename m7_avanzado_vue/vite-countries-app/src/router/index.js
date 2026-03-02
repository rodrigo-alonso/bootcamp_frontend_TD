import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import CountriesDetailView from '../views/CountryDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/pais/:cca3',
    name: 'Pais',
    component: CountriesDetailView,
  },
  {
    path:'/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
]

export default createRouter ()