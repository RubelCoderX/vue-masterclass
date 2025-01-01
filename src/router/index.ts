// import HomeView from '@/views/HomeView.vue'
// import ProjectsView from '@/views/ProjectsView.vue'
// import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async(to,form) =>{
  const authStore = useAuthStore()
  await authStore.getSession()
  const isAuthPage= ['/login','/register'].includes(to.path)
  if(!authStore.user && !isAuthPage){
    return{
      name:'/login'
    }
  }

  if(authStore.user && isAuthPage){
    return {
      name:'/'
    }
  }
})

export default router
