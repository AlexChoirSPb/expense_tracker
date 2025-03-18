<script setup>
import { validateEmail, validatePassword } from '@/helpers/validators'
import { inject, ref } from 'vue'
import { useToast } from 'vue-toastification'
import LoaderIcon from './icons/LoaderIcon.vue'

const toast = useToast()
const emit = defineEmits(['submitForm'])
const { loading } = inject('sign')

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
      <div class="form-control__label-inner">
        <label class="form-control__label" for="login"> Почта </label>
        <span class="material-symbols-outlined" v-tippy="'test@test.com'"> info </span>
      </div>
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
      <div class="form-control__label-inner">
        <label class="form-control__label" for="login"> Пароль </label>
        <span class="material-symbols-outlined" v-tippy="'Qwert1234'"> info </span>
      </div>
      <input
        type="password"
        id="password"
        placeholder="Введите пароль"
        autocomplete="current-password"
        v-model="password"
        :disabled="loading"
      />
    </div>
    <button class="button" :disabled="loading">Войти <LoaderIcon v-if="loading" /></button>
  </form>
</template>
<style scoped lang="scss">
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
