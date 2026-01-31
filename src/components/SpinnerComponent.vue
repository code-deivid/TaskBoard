<script setup lang="ts"></script>

<template>
  <div class="flex items-center justify-center py-10">
    <div class="spinner"></div>
  </div>
</template>

<style scoped lang="scss">
.spinner {
  width: 36px;
  height: 36px;
  border: 4px solid #a11a1a1a;
  border-left-color: var(--button);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
