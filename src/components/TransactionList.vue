<template>
  <div class="transactions">
    <div class="transactions__inner">
      <div class="transactions__header">
        <h2 class="transactions__title">История</h2>
        <button class="text-button" @click="openModal('add')">Добавить операцию</button>
      </div>
      <div class="form-control form-control--row" v-if="categories.length > 0">
        <label
          class="transactions__filter-label form-control__label form-control__label--tiny"
          for="category"
        >
          Фильтр по катерогии:
        </label>
        <FilterSelect
          class="transactions__filter-select"
          @updateFilterValue="updateFilterValue"
          :list="categories"
        ></FilterSelect>
      </div>
    </div>
    <Transition name="fade" mode="out-in">
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
    </Transition>
  </div>
</template>
<script setup>
import { formatDate } from '@/helpers/dateFormatter'
import TransactionItem from './TransactionItem.vue'
import { inject } from 'vue'
import FilterSelect from './FilterSelect.vue'

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

const emits = defineEmits(['deleteTransaction'])
const categoryFilter = defineModel()

function deleteTransaction(id) {
  emits('deleteTransaction', id)
}

function updateFilterValue(id) {
  categoryFilter.value = id
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
