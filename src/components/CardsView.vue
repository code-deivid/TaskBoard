<script setup lang="ts">
import type { ITarea } from '@/models/tarea'

const prop = defineProps<ITarea>()

const emit = defineEmits<{
  (e: 'asignar'): void
}>()
</script>

<template>
  <div
    :class="[
      prop.completed
        ? 'border-[#b0b0b042]'
        : !prop.asigned
          ? 'border-[#3dc000]'
          : 'border-[#008cff]',
    ]"
    class="w-full card gap-5 border-2 rounded-2xl p-4 flex flex-col"
  >
    <p :class="prop.completed ? 'line-through text-[#c4c4c4] italic ' : ''">{{ prop.todo }}</p>
    <div class="flex justify-between">
      <span
        :class="prop.completed ? ' text-[#c4c4c4] italic ' : ''"
        class="text-[#7b7b7b] text-[.8rem]"
        >{{ prop.asigned ? 'Asignada' : 'Sin asignar' }}</span
      >
      <button
        class="asign border-0 rounded-2xl p-4 bg-[#efefef]"
        v-if="!prop.completed && !prop.asigned"
        @click="emit('asignar')"
      >
        <i class="fa-solid fa-user"></i>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.asign {
  @media screen and (width > 768px) {
    
    transition: all 0.2s ease;
    &:hover {
      cursor: pointer;
      background: #a1d38a;

      scale: 1.1;
    }
  }
}
</style>
