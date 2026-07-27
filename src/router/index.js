import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/lessons', name: 'lessons', component: () => import('../views/LessonsView.vue') },
  { path: '/fengshui', name: 'fengshui', component: () => import('../views/FengshuiView.vue') },
  { path: '/divination', name: 'divination', component: () => import('../views/DivinationView.vue') },
  { path: '/quiz', name: 'quiz', component: () => import('../views/QuizView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({ history: createWebHistory(), routes })
