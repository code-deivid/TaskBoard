<script setup lang="ts">
import type { IAuthResponse } from '@/models/authResponse'
import { login } from '@/services/authentication'
import Swal from 'sweetalert2'

import FormLayout from '@/components/FormLayout.vue'
import { useRouter } from 'vue-router'
import { computed, ref, useTemplateRef } from 'vue'

const router = useRouter()

const form = useTemplateRef('FORM_ELEMENT')

const email = ref<string>('')
const password = ref<string>('')

const puedeEnviar = computed(() => {
  return email.value.trim().length > 0 && password.value.trim().length > 0
})

const iniciarSesion = async (): Promise<IAuthResponse> => {
  try {
    const perfil = await login(email.value, password.value)
    if (perfil.ok) {
      form.value?.reset()
      await router.push('/dashboard')
      await Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión correcto',
        text: 'Se ha iniciado sesión correctamente',
        timer: 1500,
        showConfirmButton: false,
      })
      return {
        ok: true,
        mensaje: 'Has iniciado sesión enhorabuena',
        usuario: perfil.usuario,
      }
    }

    await Swal.fire({
      icon: 'error',
      title: 'No se ha podido iniciar sesión',
      text: 'Error usuario/contraseña',
    })
    return {
      ok: false,
      mensaje: 'No has podido iniciado sesión enhorabuena',
      usuario: perfil.usuario,
    }
  } catch (error) {
    form.value?.reset()
    return {
      ok: false,
      mensaje: `No se ha podido inicar sesión, ${error}`,
      usuario: null,
    }
  }
}
</script>

<template>
  <main>
    <FormLayout
      class="p-4 bg-(--background-card) gap-2 h-dvh w-full flex flex-col items-center justify-center"
    >
      <template #subtitle>
        <div
          class="animate__animated animate__bounceInDown max-w-125 w-full gap-5 flex flex-col items-center justify-center"
        >
          <h1>TaskBoard</h1>
          <p class="animate__animated animate__bounceInDown text-(--label-text-color)">
            Un lugar para solventar tus tareas
          </p>
        </div>
      </template>

      <template #form>
        <form
          class="animate__animated animate__bounceInDown p-5 max-w-125 w-full gap-5 rounded-xl p-10px bg-white text-(--label-text-color) flex flex-col"
          ref="FORM_ELEMENT"
          @submit.prevent="iniciarSesion"
        >
          <label>
            <p>Correo electrónico</p>
            <input v-model="email" placeholder="email@example.com" type="text" />
          </label>

          <label>
            <p>Contraseña</p>
            <input v-model="password" placeholder="contraseña" type="password" />
          </label>

          <button type="submit" :disabled="!puedeEnviar">Iniciar sesión</button>
        </form>
      </template>

      <template #card-footer>
        <div class="animate__animated animate__bounceInDown flex gap-2">
          <p>No tienes cuenta?</p>
          <router-link to="/register">Registrarse</router-link>
        </div>
      </template>
    </FormLayout>
  </main>
</template>

<style scoped lang="scss">
button {
  color: white;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background-color: var(--button);
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    color: var(--disabled-text);
    background-color: var(--disabled-button);

    &:hover {
      cursor: not-allowed;
    }
  }
}
a {
  color: var(--button);
  text-decoration: none;
  display: flex;
  font-weight: bold;
}

label {
  color: var(--label-text-color);
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 13px;
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 600;

  input {
    outline: none;
    padding: 12px;
    font-size: 0.9rem;
    border: 1px solid var(--label-text-color);
    border-radius: 10px;

    &::placeholder {
      color: var(--label-text-color);
    }
    &:focus {
      border: 1px solid var(--input-focus);
    }
  }
}
</style>
