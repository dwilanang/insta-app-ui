import { createRouter, createWebHistory, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'

const routes = [
 {
    path: '/',
    component: () => import('../pages/Feed.vue'),
    beforeEnter: async (to, from, next) => {
      const auth = useAuthStore()
      await auth.checkAuth()
      if (auth.user) {
        return next('/feed')
      }
      next()
    }
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('../pages/Feed.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/register', 
    name: 'Register',
    component: () => import('../pages/Register.vue'),
    beforeEnter: async (to, from, next) => {
      const auth = useAuthStore()
      await auth.checkAuth()
      if (auth.user) {
        return next('/feed')
      }
      next()
    }
  },
  { 
    path: '/login', 
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    beforeEnter: async (to, from, next) => {
      const auth = useAuthStore()
      await auth.checkAuth()
      if (auth.user) {
        return next('/feed')
      }
      next()
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const route = useRoute()

// Global guard: redirect jika belum login
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  if (!auth.user) {
    await auth.checkAuth()
  }

  if (to.meta.requiresAuth && !auth.user) {
    return next('/login')
  }

  next()
})

export default router