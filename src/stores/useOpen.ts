import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOpen = defineStore('isOpen', () => {

  const isOpen = ref(true)
  const toggleMenu = () => (isOpen.value = !isOpen.value)

  return { isOpen, toggleMenu }
})
