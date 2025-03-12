<template>
  <div class="balance">
    <h2 class="balance__title">Итоговый баланс:</h2>
    <div class="balance__value h1">&#8381; {{ total }}</div>
  </div>
</template>
<script setup>
defineProps({
  total: {
    type: Number,
    required: true,
  },
})
</script>
<style scoped lang="scss">
@use '@/assets/scss/components/TotalBalance';
</style>
