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
  open.isOpen = false

  cargarWorkspace()
})
</script>

<template>
  <main class="bg-(--background-card)">
    <HeaderNav class="z-1"></HeaderNav>

    <div
      v-if="!open.isOpen"
      class="z-0 animate__animated animate__fadeInLeft contenido flex flex-col p-6 gap-4"
    >
      <h1 class="text-center">Mi Espacio</h1>
      <h4>Aquí están las tareas que te has asignado a ti mismo</h4>
      <Spinner v-if="loadingSpinner" />
      <span
        class="w-full flex justify-center text-[20px] text-[#4caae9] italic"
        v-if="tareasWorkspace.length < 1"
        >Todavía no tienes ninguna tarea</span
      >
      <div class="cards gap-4 flex flex-col">
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

<style scoped lang="scss">
main {
  @media screen and (width > 768px) {
    display: flex;
  }
}
.contenido {
  @media screen and (width > 768px) {
    display: flex;
    width: 100%;
    max-width: 80%;
    padding: 40px 200px;
    // border: 10px solid;
  }
}

.cards {
  @media screen and (width > 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (width > 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

h4 {
  @media screen and (width > 1024px) {
    text-align: center;
    width: 100%;
  }
}
</style>
