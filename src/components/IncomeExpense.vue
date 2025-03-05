<template>
  <div class="inc-exp-container">
    <div>
      <h4>Пополнения</h4>
      <p id="money-plus" class="money plus">{{ income }} &#8381;</p>
    </div>
    <div>
      <h4>Расходы</h4>
      <p id="money-minus" class="money minus">{{ expense }} &#8381;</p>
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
