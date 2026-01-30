<script setup lang="ts">
import type { IAuthResponse } from '@/models/authResponse'
import { login } from '@/services/authentication'

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
    form.value?.reset()
    await router.push('/home')

    return {
      ok: true,
      mensaje: 'Has iniciado sesión enhorabuena',
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
        <h1>TaskBoard</h1>
        <p>Un lugar para adquirir tus tareas</p>
      </template>

      <template #form>
        <form
          class="p-5 max-w-125 w-full gap-5 rounded-xl p-10px bg-white text-(--label-text-color) flex flex-col"
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
        <div class="flex gap-2">
          <p>No tienes cuenta?</p>
          <!-- <router-link to="/register">Registrarse</router-link> -->
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
</style>
