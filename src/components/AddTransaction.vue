<template>
  <h3>Добавить новую операцию</h3>
  <form id="form" @submit.prevent="submitForm">
    <div class="form-control">
      <label for="text">Текст</label>
      <input
        type="text"
        id="text"
        placeholder="Введите описание операции"
        v-model="text"
        :disabled="loading"
      />
    </div>
    <div class="form-control">
      <label for="amount">
        Сумма <br />
        <span class="amount-description">
          (отрицательная - расход, положительная - пополнение)
        </span>
      </label>
      <input
        type="number"
        id="amount"
        placeholder="Введите сумму"
        v-model="amount"
        :disabled="loading"
      />
    </div>
    <button class="btn" :disabled="loading">Добавить операцию</button>
  </form>
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
