import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/situation',
    name: 'Situation',
    component: () => import(/* webpackChunkName: "about" */ '../views/Situation.vue')
  },
  {
    path: '/apply',
    name: 'Apply',
    component: () => import(/* webpackChunkName: "about" */ '../views/Apply.vue')
  },
  {
    path: '/management',
    name: 'Management',
    component: () => import(/* webpackChunkName: "about" */ '../views/Management.vue')
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import(/* webpackChunkName: "about" */ '../views/Details.vue')
  },
  {
    path: '/tracking',
    name: 'Tracking',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tracking.vue')
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import(/* webpackChunkName: "about" */ '../views/Help.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
