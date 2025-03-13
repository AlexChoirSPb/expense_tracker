<template>
  <div class="modal">
    <div class="modal__bg" @click="closeModal"></div>
    <div class="modal__wrapper">
      <div class="modal__body">
        <div class="modal__header">
          <h3 class="modal__title">{{ title }}</h3>
          <button class="text-button" @click="closeModal">
            <span class="material-symbols-outlined"> close </span>
          </button>
        </div>
        <div class="modal__inner">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue'

defineProps({
  title: {
    type: String,
  },
})

const { closeModal } = inject('modal')
</script>
<style scoped lang="scss">
@use '@/assets/scss/components/TheModal';
</style>
