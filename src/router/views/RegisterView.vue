<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue'
import { registrar } from '@/services/authentication'
import type { IAuthResponse } from '@/models/authResponse'
import FormLayout from '@/components/FormLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = useTemplateRef('FORM_ELEMENT')
const email = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')

const coinciden = computed((): boolean => confirmPassword.value === password.value)

const puedeEnviar = computed(
  (): boolean =>
    email.value.trim().length > 0 &&
    password.value.trim().length > 0 &&
    confirmPassword.value.trim().length > 0 &&
    coinciden.value,
)

const register = async (): Promise<IAuthResponse> => {
  try {
    if (!coinciden.value) {
      return {
        ok: false,
        mensaje: 'Las contraseñas no coinciden',
        usuario: null,
      }
    }

    const res = await registrar(email.value, password.value)

    if (!res.ok) {
      return res
    }

    form.value?.reset()
    await router.push('/dashboard')

    return {
      ok: true,
      mensaje: 'Se ha registrado correctamente',
      usuario: res.usuario,
    }
  } catch (error) {
    console.error('❌ Error inesperado al registrar:', error)
    form.value?.reset()

    return {
      ok: false,
      mensaje: 'Ha habido un error al crear un usuario',
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
        <div class="max-w-125 w-full gap-5 flex flex-col items-center justify-center">
          <h1>TaskBoard</h1>
          <p class="text-(--label-text-color)">Un lugar para solventar tus tareas</p>
        </div>
      </template>

      <template #form>
        <form
          class="p-5 max-w-125 w-full gap-5 rounded-xl p-10px bg-white text-(--label-text-color) flex flex-col"
          ref="FORM_ELEMENT"
          @submit.prevent="register"
        >
          <label>
            <p>Correo electrónico</p>
            <input v-model="email" placeholder="email@example.com" type="text" />
          </label>

          <label>
            <p>Contraseña</p>
            <input v-model="password" placeholder="contraseña" type="password" />
          </label>
          <label>
            <p>Confirmar contraseña</p>
            <input v-model="confirmPassword" placeholder="repite tu contraseña" type="password" />
          </label>

          <button type="submit" :disabled="!puedeEnviar">Registrarse</button>
        </form>
      </template>

      <template #card-footer>
        <div class="flex gap-2">
          <p>¿Ya tienes cuenta?</p>
          <router-link to="/login">Inicia sesión</router-link>
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
