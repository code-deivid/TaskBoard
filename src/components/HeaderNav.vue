<script setup lang="ts">
import { useOpen } from '@/stores/useOpen'
import { logout } from '@/services/authentication'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const cerrarSesion = async () => {
  try {
    await logout()
    await Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Se ha cerrado sesión correctamente',
      timer: 1500,
      showConfirmButton: false,
    })

    await router.push('/login')
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'Error al cerrar sesión',
      text: 'No se ha podido cerrar sesión',
      timer: 1500,
      showConfirmButton: false,
    })
  }
}

const open = useOpen()
</script>
<template>
  <header class="bg-white sticky top-0 flex w-full items-center justify-between p-2 shadow-xl">
    <h3 class="text-xl font-bold">TaskBoard</h3>
    <nav class="hidden">
      <div>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/workspace">Workspace</RouterLink>
      </div>
      <button class="text-red-600" @click="cerrarSesion">Cerrar sesión</button>
    </nav>
    <nav class="nav-bar">
      <button class="text-2xl font-bold border-0 p-2 rounded-xl" @click="open.toggleMenu">
        ☰
      </button>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.nav-bar {
  transition: all 0.1s ease-in;

  .card-hidden {
    transition: all 1s ease-in;
    // transform: translate(-200px);
  }
}
header {
  @media screen and (width > 768px) {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 100vh;
    justify-content: left;
  }
}
.nav-bar {
  @media screen and (width > 768px) {
    visibility: hidden;
  }
}

nav {
  @media screen and (width > 768px) {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  div {
    @media screen and (width > 768px) {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  button {
    @media screen and (width > 768px) {
      position: absolute;
      bottom: 20px;
      width: 100%;
      left: 0;
      background: var(--button-logout);
      border: none;
      padding: 10px;
      transition: all 0.2s ease;
      &:hover {
        cursor: pointer;
        background: none;

        scale: 1.1;
      }
    }
  }

  a {
    @media screen and (width > 768px) {
      text-decoration: none;
      color: black;
      transition: all 0.2s ease;
      &:hover {
        cursor: pointer;
        color: var(--button);
        scale: 1.1;
      }
    }
  }
}
</style>
