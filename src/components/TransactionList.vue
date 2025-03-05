<template>
  <h3>История</h3>
  <TransitionGroup name="list" tag="ul" class="list" v-if="transactions.length > 0">
    <li
      v-for="transaction in transactions"
      :key="transaction.id"
      :class="transaction.amount > 0 ? 'plus' : 'minus'"
    >
      {{ transaction.text }} <span>{{ transaction.amount }} &#8381;</span
      ><button class="delete-btn" @click="deleteTransaction(transaction.id)">x</button>
    </li>
  </TransitionGroup>
  <div class="text" v-else>Записей пока нет!</div>
</template>
<script setup>
defineProps({
  transactions: {
    type: Array,
    required: true,
  },
})
const emits = defineEmits(['deleteTransaction'])

function deleteTransaction(id) {
  emits('deleteTransaction', id)
}
</script>
<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
