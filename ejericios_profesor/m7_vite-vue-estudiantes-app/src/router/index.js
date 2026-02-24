import { createRouter, createWebHistory } from 'vue-router'

import EstudiantesView from '../views/EstudiantesView.vue'
import EstudiantesDetalleView from '../views/EstudiantesDetalleView.vue'
import EstudiantesEditarView from '../views/EstudiantesEditarView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
    {
        path: '/',
        redirect: '/estudiantes'
    },
    {
        path: '/estudiantes',
        component: EstudiantesView
    },
    {
        path: '/estudiantes/:id',
        component: EstudiantesDetalleView,
        props: true
    },
    {
        path: '/estudiantes/:id/editar',
        component: EstudiantesEditarView, 
        props: true
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