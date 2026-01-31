<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import Nav from '@/components/Nav.vue'
import { useOpen } from '@/stores/useOpen'
import { onMounted, ref } from 'vue'
import type { ITarea } from '@/models/tarea'
import axios from 'axios'
import CardsView from '@/components/CardsView.vue'

const open = useOpen()

const listaTareas = ref<ITarea[]>([])

onMounted(() => {
  open.toggleMenu()

  const getData = async (): Promise<ITarea[]> => {
    const res = await axios.get('https://dummyjson.com/todos')
    listaTareas.value = res.data.todos
    return res.data.todos
  }
  getData()
})
</script>

<template>
  <HeaderNav />
  <div v-if="!open.isOpen">
    <h1>Soy Dashboard</h1>

    <CardsView
      v-for="(tarea, index) in listaTareas"
      :key="index"
      :completed="tarea.completed"
      :todo="tarea.todo"
    />
  </div>

  <Nav v-if="open.isOpen"></Nav>
</template>

<style scoped lang="scss"></style>
