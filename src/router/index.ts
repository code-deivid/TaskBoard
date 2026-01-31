import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/firebase/config'

import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import DashboardView from './views/DashboardView.vue'
import Workspace from './views/WorkspaceView.vue'

export const usuarioActual = ref<User | null>(null)
export const authCargado = ref(false)
export const isAutenticado = () => usuarioActual.value !== null

let authReady: Promise<void> | null = null

const esperarAuth = () => {
  if (!authReady) {
    authReady = new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        usuarioActual.value = user
        authCargado.value = true
        resolve()
      })
    })
  }
  return authReady
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    redirect: "/login"
  }, {
    path: "/login",
    component: LoginView
  }, {
    path: "/register",
    component: RegisterView
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { authRequired: true }
  },
  {
    path: '/workspace',
    component: Workspace,
    meta: { authRequired: true }
  }],
})

router.beforeEach(async (to, from, next) => {
  await esperarAuth()

  if (to.meta.authRequired && !isAutenticado()) {
    return next('/login')

  }
  return next()


})


export default router
