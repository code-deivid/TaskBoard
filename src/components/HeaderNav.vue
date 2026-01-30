<script setup lang="ts">
import { useOpen } from '@/stores/counter'

const open = useOpen()
</script>
<template>
  <header class="bg-white sticky top-0 flex w-full items-center justify-between p-2 shadow-xl">
    <h3 class="text-xl font-bold">TaskBoard</h3>
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
</style>
