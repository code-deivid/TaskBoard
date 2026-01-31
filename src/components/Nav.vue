<script setup lang="ts">
import { logout } from '@/services/authentication'
import { useRouter } from 'vue-router'

const router = useRouter()

const cerrarSesion = async () => {
  try {
    await logout()
    await router.push('/login')

    console.log('Se ha cerrado sesion correctamente')
  } catch (error) {
    console.log('Error al cerrar sesion')
  }
}
</script>
<template>
  <nav class="w-full flex flex-col justify-center items-center">
    <RouterLink to="/dashboard" active-class="active"> Dashboard </RouterLink>
    <RouterLink to="/workspace" active-class="active"> Workspace </RouterLink>
    <button class="text-red-600" @click="cerrarSesion">Cerrar sesión</button>
  </nav>
</template>

<style lang="scss" scoped>
a,
button {
  width: 100%;
  padding: 20px;
  text-align: center;
  background: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  color: #93a1b9;
  border-bottom: 1px solid #e9e9e9;
  transition: all;

  &:hover {
    transition: all 0.1s ease-in;
    background-color: #f5f7fa;
    color: #0f172a;
  }
}

.active {
  color: #0f172a;
  font-weight: 600;
}

button {
  color: #dc2626;

  &:hover {
    background-color: #fee2e2;
    color: #b91c1c;
  }
}

nav{
  @media screen and (width > 768px) {
    visibility: hidden;
  }
}
</style>
