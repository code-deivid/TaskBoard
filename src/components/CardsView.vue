<script setup lang="ts">
import type { ITarea } from '@/models/tarea'

const prop = defineProps<ITarea>()
</script>

<template>
  <div>
    <h4>Nombre: {{ prop.todo }}</h4>
    <h4>Estado: {{ prop.completed }}</h4>
  </div>
</template>

<style scoped></style>
