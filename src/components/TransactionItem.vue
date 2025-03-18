<template>
  <li
    class="transaction"
    :class="transaction.amount > 0 ? 'transaction--income' : 'transaction--expense'"
  >
    <span class="transaction__text text"
      >{{ transaction.text }}
      <span class="transaction__category" v-if="transaction.category">
        {{ transaction.category }}</span
      ></span
    >
    <div class="transaction__wrapper">
      <span class="transaction__amount">{{ transaction.amount }} &#8381;</span>
      <button class="text-button open-menu" @click="isMenuOpen = !isMenuOpen">
        <span class="material-symbols-outlined"> more_vert </span>
      </button>
    </div>
    <div
      v-if="screenType == 'desktop'"
      class="transaction__actions"
      v-show="isMenuOpen"
      ref="menuRef"
    >
      <ul class="transaction__actions-list">
        <li class="transaction__actions-item text">
          <button class="text-button" @click="deleteTransaction(transaction.id)">Удалить</button>
        </li>
        <li class="transaction__actions-item text">
          <button class="text-button" @click="editTransaction(transaction.id)">
            Редактировать
          </button>
        </li>
      </ul>
    </div>
    <Transition name="modal" v-else>
      <Teleport to="body">
        <TheModal v-show="isMenuOpen" @closeModal="isMenuOpen = !isMenuOpen" position="bottom">
          <div class="transaction__actions">
            <ul class="transaction__actions-list">
              <li class="transaction__actions-item">
                <button
                  class="text-button transaction__actions-button"
                  @click="deleteTransaction(transaction.id)"
                >
                  Удалить
                </button>
              </li>
              <li class="transaction__actions-item">
                <button
                  class="text-button transaction__actions-button"
                  @click="editTransaction(transaction.id)"
                >
                  Редактировать
                </button>
              </li>
            </ul>
          </div>
        </TheModal>
      </Teleport>
    </Transition>
  </li>
</template>
<script setup>
import { ref, inject, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useScreenType } from '@/composables/useScreenType'
import TheModal from './TheModal.vue'

const { openModal } = inject('modal')

const { screenType } = useScreenType()

defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['deleteTransaction'])

const isMenuOpen = ref(false)
const menuRef = useTemplateRef('menuRef')

onClickOutside(menuRef, (event) => {
  if (!event.target.closest('.open-menu')) {
    isMenuOpen.value = false
  }
})

function deleteTransaction(id) {
  isMenuOpen.value = false
  emits('deleteTransaction', id)
}

function editTransaction(id) {
  isMenuOpen.value = false
  openModal('edit', id)
}
</script>
<style scoped lang="scss">
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
