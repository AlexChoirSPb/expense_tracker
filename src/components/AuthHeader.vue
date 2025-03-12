<script setup>
import { inject } from 'vue'

const { isSignIn, changeSignMethod, loading } = inject('sign')
</script>
<template>
  <header class="header">
    <h1>{{ isSignIn ? 'Авторизация' : 'Регистрация' }}</h1>
    <div class="header__actions">
      <span>{{ isSignIn ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}</span>
      <button class="text-button" @click="changeSignMethod" :disabled="loading">
        {{ isSignIn ? 'Создать' : 'Войти' }}
      </button>
    </div>
  </header>
</template>
