<template>
  <div class="inc-exp">
    <div class="inc-exp__item">
      <h3 class="inc-exp__title">Пополнения</h3>
      <div class="inc-exp__value inc-exp__value--income text">{{ income }} &#8381;</div>
    </div>
    <div class="inc-exp__item">
      <h3 class="inc-exp__title">Расходы</h3>
      <div class="inc-exp__value inc-exp__value--expense text">{{ expense }} &#8381;</div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  income: {
    type: Number,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
})
</script>
<style scoped lang="scss">
@use '@/assets/scss/components/IncomeExpense';
</style>
