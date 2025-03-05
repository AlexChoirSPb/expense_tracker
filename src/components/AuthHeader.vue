<script setup>
import { inject } from 'vue'

const { isSignIn, changeSignMethod, loading } = inject('sign')
</script>
<template>
  <h2>Добро пожаловать!</h2>
  <div class="h3">
    <span>{{ isSignIn ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}</span>
    <button class="text-btn" @click="changeSignMethod" :disabled="loading">
      {{ isSignIn ? 'Создать' : 'Войти' }}
    </button>
  </div>
</template>
