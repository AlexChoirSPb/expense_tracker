<script setup>
import { validateEmail, validatePassword } from '@/helpers/validators'
import { inject, ref } from 'vue'
const { loading } = inject('sign')
import { useToast } from 'vue-toastification'

const toast = useToast()
const emit = defineEmits(['submitForm'])

const email = ref('')
const password = ref('')
function signIn() {
  if (!validateEmail(email.value)) {
    toast.error('Введите корректный email!', { timeout: 2000 })
    return
  }

  if (!validatePassword(password.value)) {
    toast.error(
      'Пароль должен быть минимум 8 симоволов, содержать одну заглавную букву и одну цифру',
      { timeout: 3500 },
    )
    return
  }

  let payload = {
    email: email.value,
    password: password.value,
  }
  emit('submitForm', payload)
}
</script>
<template>
  <form class="auth-form" @submit.prevent="signIn">
    <div class="form-control">
      <label class="form-control__label" for="login">Почта</label>
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
      <label class="form-control__label" for="password">Пароль</label>
      <input
        type="password"
        id="password"
        placeholder="Введите пароль"
        autocomplete="current-password"
        v-model="password"
        :disabled="loading"
      />
    </div>
    <button class="button" :disabled="loading">Войти</button>
  </form>
</template>
<style scoped lang="scss">
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
