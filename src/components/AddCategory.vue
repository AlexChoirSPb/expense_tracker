<template>
  <div class="add-category">
    <form class="add-category__form" @submit.prevent="submitForm">
      <div class="form-control">
        <label class="form-control__label" for="text">Категория</label>
        <input
          type="text"
          id="text"
          placeholder="Введите название категории"
          v-model="category"
          :disabled="loadingCategory"
        />
      </div>
      <button class="button" :disabled="loadingCategory">Сохранить</button>
    </form>
  </div>
</template>
<script setup>
import { inject, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const { loadingCategory } = inject('loading')
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
})
const emits = defineEmits(['addCategory'])
const category = ref('')

function submitForm() {
  if (category.value.length <= 0) {
    toast.error('Поле не может быть пустым!', { timeout: 2500 })
    return
  }
  if (props.categories.includes(category.value)) {
    toast.error('Такая категория уже существует!', { timeout: 2500 })
    return
  }
  const categoryData = {
    category: category.value,
  }
  emits('addCategory', categoryData)
}
</script>
<style scoped lang="scss">
@use '@/assets/scss/components/AddCategory';
</style>
