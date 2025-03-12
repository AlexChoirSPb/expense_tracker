<template>
  <div class="add-transaction">
    <h3 class="add-transaction__title">Добавить новую операцию</h3>
    <form class="add-transaction__form" @submit.prevent="submitForm">
      <div class="form-control">
        <label class="form-control__label" for="text">Текст</label>
        <input
          type="text"
          id="text"
          placeholder="Введите описание операции"
          v-model="text"
          :disabled="loading"
        />
      </div>
      <div class="form-control">
        <label class="form-control__label" for="amount"> Сумма </label>
        <span class="form-control__description">
          (отрицательная - расход, положительная - пополнение)
        </span>
        <input
          type="number"
          id="amount"
          placeholder="Введите сумму"
          v-model="amount"
          :disabled="loading"
        />
      </div>
      <button class="button" :disabled="loading">Добавить операцию</button>
    </form>
  </div>
</template>
<script setup>
import { inject, ref, watch } from 'vue'

const { loading } = inject('loading')

const emits = defineEmits(['addTransaction'])
const text = ref('')
const amount = ref('')

function submitForm() {
  const transactionData = {
    text: text.value,
    amount: amount.value,
  }
  emits('addTransaction', transactionData)
}

watch(loading, (newValue) => {
  if (newValue == false) {
    text.value = ''
    amount.value = ''
  }
})
</script>
<style scoped lang="scss">
@use '@/assets/scss/components/AddTransaction';
</style>
