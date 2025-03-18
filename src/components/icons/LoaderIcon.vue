<template>
  <span class="loader-icon">
    <span class="material-symbols-outlined"> progress_activity </span>
  </span>
</template>
<style scoped lang="scss">
.loader-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #856dfd;
  animation: spin 1s linear infinite;
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
