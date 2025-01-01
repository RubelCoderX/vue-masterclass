// import HomeView from '@/views/HomeView.vue'
// import ProjectsView from '@/views/ProjectsView.vue'
// import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
