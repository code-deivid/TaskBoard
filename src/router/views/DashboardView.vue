<script setup lang="ts">
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'
import { onMounted, ref, computed } from 'vue'
import { useOpen } from '@/stores/useOpen'

import HeaderNav from '@/components/HeaderNav.vue'
import Nav from '@/components/Nav.vue'
import CardsView from '@/components/CardsView.vue'
import Spinner from '@/components/SpinnerComponent.vue'

import type { Estado } from '@/models/estadoFiltro'
import type { ITarea } from '@/models/tarea'

const open = useOpen()
const listaTareas = ref<ITarea[]>([])
const estado = ref<Estado>('todas')
const loadingSpinner = ref(true)

const tareasFiltradas = computed(() => {
  let tareas = listaTareas.value
  switch (estado.value) {
    case 'pendientes':
      tareas = tareas.filter((tarea) => !tarea.completed)

      break
    case 'completadas':
      tareas = tareas.filter((tarea) => tarea.completed)
      break
    case 'asignadas':
      tareas = tareas.filter((tarea) => tarea.asigned)
      break
  }
  return tareas
})

const asignarTarea = async (tarea: ITarea) => {
  const user = auth.currentUser
  if (!user) return

  const uid = user.uid

  await updateDoc(doc(db, 'tareas', tarea.id), {
    asigned: true,
    asignedTo: uid,
  })

  await setDoc(doc(db, 'usuarios', uid, 'workspace', tarea.id), {
    tareaId: tarea.id,
    todo: tarea.todo,
    completed: tarea.completed,
    asigned: true,
  })

  listaTareas.value = listaTareas.value.filter((t) => t.id !== tarea.id)
}

onMounted(() => {
  open.toggleMenu()

  const cargarTareas = async () => {
    loadingSpinner.value = true
    const snap = await getDocs(collection(db, 'tareas'))

    listaTareas.value = snap.docs.map((doc) => {
      const data = doc.data()

      return {
        id: doc.id,
        todo: data.todo,
        completed: data.completed,
        asigned: data.asigned,
        userId: data.userId,
      }
    })
    loadingSpinner.value = false
  }

  cargarTareas()
})
</script>

<template>
  <main class="bg-(--background-card)">
    <HeaderNav />
    <div v-if="!open.isOpen" class="flex flex-col p-6 gap-4">
      <h1 class="text-center">Panel de Control</h1>
      <h4>Gestiona todas las tareas del equipo en un solo lugar</h4>

      <select v-model="estado" class="border rounded p-2">
        <option value="todas">Todas</option>
        <option value="pendientes">No completadas</option>
        <option value="completadas">Completadas</option>
        <option value="asignadas">Asignadas</option>
      </select>

      <Spinner v-if="loadingSpinner" />

      <div class="gap-4 flex flex-col">
        <CardsView
          v-for="(tarea, index) in tareasFiltradas"
          :key="index"
          :id="tarea.id"
          :completed="tarea.completed"
          :todo="tarea.todo"
          :asigned="tarea.asigned"
          @asignar="asignarTarea(tarea)"
        />
      </div>
    </div>

    <Nav v-if="open.isOpen"></Nav>
  </main>
</template>

<style scoped lang="scss"></style>
