<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>
<template>
  <header class="header">
    <h1>Трекер расходов</h1>
    <div class="header__actions">
      <span class="h3">Привет, {{ authStore.userInfo?.name ?? 'noname' }}!</span>
      <RouterLink class="text-button" to="/auth" @click="authStore.logout"> Выйти </RouterLink>
    </div>
  </header>
</template>
