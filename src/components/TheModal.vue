<template>
  <div class="modal" :class="{ 'modal--bottom': position == 'bottom' }">
    <div class="modal__bg" @click="emit('closeModal')"></div>
    <div class="modal__wrapper">
      <div class="modal__body">
        <div class="modal__header" v-if="position !== 'bottom'">
          <h3 class="modal__title">{{ title }}</h3>
          <button class="text-button" @click="emit('closeModal')">
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
defineProps({
  title: {
    type: String,
  },
  position: {
    type: String,
  },
})

const emit = defineEmits(['closeModal'])
</script>
<style scoped lang="scss">
@use '@/assets/scss/components/TheModal';
</style>
