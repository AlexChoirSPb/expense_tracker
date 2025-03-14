<template>
  <div class="custom-select">
    <input
      class="custom-select__search"
      type="text"
      :value="inputValue"
      @input="filterHandler"
      @click="openList = true"
      placeholder="Поиск категории"
      :disabled="loading"
    />
    <div class="custom-select__list-inner" ref="listRef" v-show="openList">
      <ul class="custom-select__list">
        <template v-if="filteredList.length > 0">
          <li
            class="custom-select__list-item"
            :class="{
              'custom-select__list-item--selected': item.id == selectIdValue,
            }"
            v-for="item in filteredList"
            :key="item.id"
            @click="selectValue(item)"
          >
            <span class="custom-select__item">{{ item.category }}</span>
          </li>
        </template>
        <template v-else>
          <li class="custom-select__list-item custom-select__list-item--default">
            Ничего не найдено
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, useTemplateRef, inject } from 'vue'
import { onClickOutside } from '@vueuse/core'
const { loading } = inject('loading')

const emits = defineEmits(['updateFilterValue'])
const props = defineProps({
  list: {
    type: Object,
    required: true,
  },
  initCategoryId: {
    type: String,
    required: false,
  },
})

const listRef = useTemplateRef('listRef')
const openList = ref(false)

const inputValue = ref(props.list.find((item) => item.id == props?.initCategoryId)?.category ?? '')
const selectIdValue = ref('')
const filterListValue = ref('')
onClickOutside(listRef, (event) => {
  if (!event.target.classList.contains('custom-select__search')) {
    openList.value = false
  }
})

function filterHandler(event) {
  inputValue.value = event.target.value
  filterListValue.value = inputValue.value

  if (event.target.value == '') {
    selectIdValue.value = ''
    emits('updateFilterValue', 'no')
  }
}

const filteredList = computed(() => {
  return props.list.filter((item) => item.category.includes(filterListValue.value))
})

function selectValue(value) {
  inputValue.value = value.category
  selectIdValue.value = value.id
  openList.value = false
  filterListValue.value = ''

  emits('updateFilterValue', selectIdValue.value)
}
</script>
<style scoped lang="scss">
@use '@/assets/scss/components/FilterSelect';
</style>
