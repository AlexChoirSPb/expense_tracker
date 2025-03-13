<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>
<template>
  <header class="header">
    <h1 class="header__title">Трекер расходов</h1>
    <div class="header__actions">
      <span>Привет, {{ authStore.userInfo?.name ?? 'noname' }}!</span>
      <RouterLink class="text-button" to="/auth" @click="authStore.logout"> Выйти </RouterLink>
    </div>
  </header>
</template>
