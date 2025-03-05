<script setup>
import { inject, ref } from 'vue'
const { loading } = inject('sign')

console.log('ПРивет!')

const emit = defineEmits(['submitForm'])

const email = ref('')
const password = ref('')
function signIn() {
  let payload = {
    email: email.value,
    password: password.value,
  }
  emit('submitForm', payload)
}
</script>
<template>
  <form id="form" @submit.prevent="signIn">
    <div class="form-control">
      <label for="login">Почта</label>
      <input
        type="text"
        id="login"
        placeholder="Введите email"
        autocomplete="email"
        v-model="email"
        :disabled="loading"
      />
    </div>
    <div class="form-control">
      <label for="password">Пароль</label>
      <input
        type="password"
        id="password"
        placeholder="Введите пароль"
        autocomplete="current-password"
        v-model="password"
        :disabled="loading"
      />
    </div>
    <button class="btn" :disabled="loading">Войти</button>
  </form>
</template>
