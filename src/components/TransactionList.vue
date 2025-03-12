<template>
  <div class="transactions">
    <h3 class="transactions__title">История</h3>
    <TransitionGroup name="list" tag="ul" class="transactions__list" v-if="transactions.length > 0">
      <TransactionItem
        class="transactions__list-item"
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
        @deleteTransaction="deleteTransaction"
      ></TransactionItem>
    </TransitionGroup>
    <div class="text" v-else>Записей пока нет!</div>
  </div>
</template>
<script setup>
import TransactionItem from './TransactionItem.vue'

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
<style scoped lang="scss">
@use '@/assets/scss/components/TransactionList';
@use '@/assets/scss/components/Transaction';

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
