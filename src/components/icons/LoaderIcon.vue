<template>
  <span class="loader-icon" :class="{ 'loader-icon--big': type == 'big' }">
    <span class="material-symbols-outlined"> progress_activity </span>
  </span>
</template>
<script setup>
defineProps({
  type: {
    type: String,
  },
})
</script>
<style scoped lang="scss">
.loader-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #856dfd;
  animation: spin 1s linear infinite;

  &--big {
    .material-symbols-outlined {
      font-size: 50px;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg); /* Начальное положение */
  }
  to {
    transform: rotate(360deg); /* Конечное положение (полный оборот) */
  }
}
</style>
