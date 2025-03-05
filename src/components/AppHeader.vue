<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>
<template>
  <h2>Трекер расходов</h2>
  <h3 class="h3">
    <span>Привет, {{ authStore.userInfo?.name ?? 'noname!' }}!</span>
    <RouterLink class="text-btn" to="/auth" @click="authStore.logout"> Выйти </RouterLink>
  </h3>
</template>
