<template>
  <h4>Итоговый баланс:</h4>
  <h1 id="balance">&#8381; {{ total }}</h1>
</template>
<script setup>
defineProps({
  total: {
    type: Number,
    required: true,
  },
})
</script>
