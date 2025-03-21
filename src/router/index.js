import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import MainView from '@/views/MainView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      meta: { auth: true },
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      meta: { auth: false },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.auth && !authStore.userInfo?.token) {
    next('/auth')
  } else if (!to.meta.auth && authStore.userInfo?.token) {
    next('/')
  } else {
    next()
  }
})

export default router
