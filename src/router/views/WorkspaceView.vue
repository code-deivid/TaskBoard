<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import Nav from '@/components/Nav.vue'
import CardsView from '@/components/CardsView.vue'
import Spinner from '@/components/SpinnerComponent.vue'

import { useOpen } from '@/stores/useOpen'
import { onMounted, ref } from 'vue'

import { auth, db } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import type { ITarea } from '@/models/tarea'

const open = useOpen()
const tareasWorkspace = ref<ITarea[]>([])
const loadingSpinner = ref(true)

const cargarWorkspace = async () => {
  const user = auth.currentUser
  if (!user) return

  const uid = user.uid
  loadingSpinner.value = true

  const snap = await getDocs(collection(db, 'usuarios', uid, 'workspace'))

  tareasWorkspace.value = snap.docs.map((doc) => {
    const data = doc.data()

    return {
      id: doc.id,
      todo: data.todo,
      completed: data.completed,
      asigned: data.asigned,
      userId: data.userId,
    } as ITarea
  })
  loadingSpinner.value = false
}

onMounted(() => {
  open.toggleMenu()
  cargarWorkspace()
})
</script>

<template>
  <main class="bg-(--background-card)">
    <HeaderNav />

    <div v-if="!open.isOpen" class="flex flex-col p-6 gap-4">
      <h1 class="text-center">Mi Espacio</h1>
      <h4>Aquí están las tareas que te has asignado a ti mismo</h4>
      <Spinner v-if="loadingSpinner" />
      <div class="gap-4 flex flex-col">
        <CardsView
          v-for="tarea in tareasWorkspace"
          :key="tarea.id"
          :id="tarea.id"
          :completed="tarea.completed"
          :todo="tarea.todo"
          :asigned="tarea.asigned"
        />
      </div>
    </div>

    <Nav v-if="open.isOpen"></Nav>
  </main>
</template>

<style scoped lang="scss"></style>
