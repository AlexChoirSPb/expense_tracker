<script setup>
import { validateEmail, validatePassword } from '@/helpers/validators'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const emit = defineEmits(['submitForm'])

const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const name = ref('')
function signUp() {
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

  if (password.value !== repeatPassword.value) {
    toast.error('Пароли не совпадают!', { timeout: 2000 })
    return
  }

  if (!name.value) {
    toast.error('Укажите ваше имя', { timeout: 2000 })
    return
  }

  let payload = {
    email: email.value,
    password: password.value,
    name: name.value,
  }
  emit('submitForm', payload)
}
</script>
<template>
  <form class="auth-form" @submit.prevent="signUp">
    <div class="form-control">
      <label class="form-control__label" for="login">Email</label>
      <input
        type="text"
        id="login"
        placeholder="Введите email"
        autocomplete="email"
        v-model="email"
      />
    </div>
    <div class="form-control">
      <label class="form-control__label" for="password">Пароль</label>
      <input
        type="password"
        id="password"
        placeholder="Введите пароль"
        autocomplete="new-password"
        v-model="password"
      />
    </div>
    <div class="form-control">
      <label class="form-control__label" for="repeatPassword">Повторите пароль</label>
      <input
        type="password"
        id="repeatPassword"
        placeholder="Повторите пароль"
        autocomplete="new-password"
        v-model="repeatPassword"
      />
    </div>
    <div class="form-control">
      <label class="form-control__label" for="name">Ваше имя</label>
      <input
        type="text"
        id="name"
        placeholder="Как вас зовут?"
        autocomplete="name"
        v-model="name"
      />
    </div>
    <button class="button">Зарегистрироваться</button>
  </form>
</template>
<style scoped lang="scss">
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
