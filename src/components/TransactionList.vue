<template>
  <div class="transactions">
    <div class="transactions__header">
      <h3 class="transactions__title">История</h3>
      <button class="text-button" @click="openModal('add')">Добавить операцию</button>
    </div>
    <div class="form-control form-control--row" v-if="categories.length > 0">
      <label class="form-control__label form-control__label--tiny" for="category">
        Фильтр по катерогии:
      </label>
      <select
        class="small"
        name="category"
        id="category"
        v-model="categoryFilter"
        :disabled="loading"
      >
        <option value="no">Без фильтра</option>
        <option value="">Без категории</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.category }}
        </option>
      </select>
    </div>
    <TransitionGroup
      name="list"
      tag="ul"
      class="transactions__list"
      v-if="Object.keys(dateFilterTransactions).length > 0"
    >
      <template v-for="(transitionDateGroup, date) in dateFilterTransactions" :key="date">
        <li class="transactions__list-date">
          <h4>{{ formatDate(date) }}</h4>
        </li>
        <TransactionItem
          class="transactions__list-item"
          v-for="transaction in transitionDateGroup"
          :key="transaction.id"
          :transaction="transaction"
          @deleteTransaction="deleteTransaction"
        ></TransactionItem>
      </template>
    </TransitionGroup>
    <div class="text" v-else>Записей пока нет!</div>
  </div>
</template>
<script setup>
import { formatDate } from '@/helpers/dateFormatter'
import TransactionItem from './TransactionItem.vue'
import { inject } from 'vue'

defineProps({
  dateFilterTransactions: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
})
const { openModal } = inject('modal')
const { loading } = inject('loading')

const emits = defineEmits(['deleteTransaction'])
const categoryFilter = defineModel()

function deleteTransaction(id) {
  emits('deleteTransaction', id)
}
</script>
<style scoped lang="scss">
@use '@/assets/scss/components/TransactionList';

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
