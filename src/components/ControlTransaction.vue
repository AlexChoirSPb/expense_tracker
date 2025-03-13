<template>
  <div class="control-transaction">
    <form class="control-transaction__form" @submit.prevent="submitForm">
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
      <div class="form-control">
        <label class="form-control__label" for="date"> Дата </label>
        <input type="date" id="date" v-model="date" :disabled="loading" />
      </div>
      <div class="form-control">
        <label class="form-control__label" for="category"> Категория </label>
        <select name="category" id="category" v-model="category" :disabled="loading">
          <option value="">Выберите категорию</option>
          <option value="Продукты">Продукты</option>
          <option value="Развлечение">Развлечения</option>
          <option value="Обучение">Обучение</option>
        </select>
      </div>
      <button class="button" :disabled="loading">Сохранить</button>
    </form>
  </div>
</template>
<script setup>
import { inject, ref, watch } from 'vue'

const { loading } = inject('loading')
const props = defineProps({
  transactionData: {
    type: Object,
    required: false,
  },
})
const emits = defineEmits(['controlTransaction'])
const text = ref(props.transactionData?.text ?? '')
const amount = ref(props.transactionData?.amount ?? '')
const date = ref(props.transactionData?.data ?? new Date().toISOString().slice(0, 10))
const category = ref(props.transactionData?.category ?? '')

function submitForm() {
  const transactionData = {
    text: text.value,
    amount: amount.value,
    date: date.value,
    category: category.value,
  }
  emits('controlTransaction', transactionData)
}

watch(loading, (newValue) => {
  if (newValue == false) {
    text.value = ''
    amount.value = ''
  }
})
</script>
<style scoped lang="scss">
@use '@/assets/scss/components/ControlTransaction';
</style>
