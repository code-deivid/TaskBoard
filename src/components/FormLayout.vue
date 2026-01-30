<script setup lang="ts"></script>

<template>
  <main>
    <div class="subtitle">
      <slot name="subtitle"></slot>
    </div>

    <slot class="flex" name="form"></slot>

    <footer>
      <slot name="card-footer"></slot>
    </footer>
  </main>
</template>

<style></style>
