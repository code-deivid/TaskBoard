<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import Nav from '@/components/Nav.vue'
import { useOpen } from '@/stores/counter'
import { onMounted } from 'vue'

const open = useOpen()

onMounted(() => {
  open.toggleMenu()
})
</script>

<template>
  <HeaderNav />
  <div v-if="!open.isOpen">
    <h1>Soy Workspace</h1>
  </div>

  <Nav v-if="open.isOpen" />
</template>

<style scoped lang="scss"></style>
