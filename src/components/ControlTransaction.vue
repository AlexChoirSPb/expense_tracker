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
          :disabled="loadingTransaction"
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
          :disabled="loadingTransaction"
        />
      </div>
      <div class="form-control">
        <label class="form-control__label" for="date"> Дата </label>
        <input
          type="date"
          id="date"
          v-model="date"
          :disabled="loadingTransaction"
          :max="getCurrentDate()"
        />
      </div>
      <div class="form-control">
        <div class="form-control__label-inner">
          <label class="form-control__label" for="category"> Категория </label>
          <button class="text-button" @click.prevent="openCategoryModal">Добавить категорию</button>
        </div>
        <FilterSelect
          v-if="categories.length > 0"
          :initCategoryId="category"
          @updateFilterValue="updateFilterValue"
          :list="categories"
        ></FilterSelect>
        <div class="text text--center" v-else>Вы пока не создали ни одну категорию.</div>
      </div>
      <button class="button" :disabled="loadingTransaction">Сохранить</button>
    </form>
  </div>
</template>
<script setup>
import { getCurrentDate } from '@/helpers/dateFormatter'
import { inject, ref } from 'vue'
import { useToast } from 'vue-toastification'
import FilterSelect from './FilterSelect.vue'

const toast = useToast()
const { loadingTransaction } = inject('loading')
const { openCategoryModal } = inject('modal')

const props = defineProps({
  transactionData: {
    type: Object,
    required: false,
  },
  categories: {
    type: Array,
    required: true,
  },
})
const emits = defineEmits(['controlTransaction'])
const text = ref(props.transactionData?.text ?? '')
const amount = ref(props.transactionData?.amount ?? '')
const date = ref(props.transactionData?.data ?? new Date().toISOString().slice(0, 10))
const category = ref(
  props.categories.find((i) => i.category == props.transactionData?.category)?.id ?? '',
)

function submitForm() {
  if (text.value.length <= 0) {
    toast.error('Поле "Текст" не может быть пустым')
    return
  }
  if (amount.value == 0) {
    toast.error('Поле "Сумма" не может быть пустым')
    return
  }
  if (amount.value > 10000000 || amount.value < -10000000) {
    toast.error('Кажется сумма слишком большая:)')
    return
  }
  const transactionData = {
    text: text.value,
    amount: amount.value,
    date: date.value,
    category: props.categories.find((i) => i.id == category.value)?.category ?? '',
  }
  emits('controlTransaction', transactionData)
}

function updateFilterValue(id) {
  category.value = id
}
</script>
<style scoped lang="scss">
@use '@/assets/scss/components/ControlTransaction';
</style>
