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

<style>
label {
  color: var(--label-text-color);
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 13px;
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 600;

  input {
    outline: none;
    padding: 12px;
    font-size: 0.9rem;
    border: 1px solid var(--label-text-color);
    border-radius: 10px;

    &::placeholder {
      color: var(--label-text-color);
    }
    &:focus {
      border: 1px solid var(--input-focus);
    }
  }
}

.subtitle {
  justify-content: center;
  width: 100%;
  gap: 20px;
  max-width: 500px;
  align-items: center;
  display: flex;
  flex-direction: column;
  p {
    color: var(--label-text-color);
  }
}
.card-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5px;
  color: var(--label-text-color);
  a {
    color: var(--button);
    text-decoration: none;
    display: flex;
    flex-direction: row-reverse;
    font-weight: bold;
  }
}
</style>
