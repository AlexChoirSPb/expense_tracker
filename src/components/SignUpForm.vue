<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submitForm'])

const email = ref('')
const password = ref('')
const name = ref('')
function signUp() {
  let payload = {
    email: email.value,
    password: password.value,
    name: name.value,
  }
  emit('submitForm', payload)
}
</script>
<template>
  <form id="form" @submit.prevent="signUp">
    <div class="form-control">
      <label for="login">Email</label>
      <input
        type="text"
        id="login"
        placeholder="Введите email"
        autocomplete="email"
        v-model="email"
      />
    </div>
    <div class="form-control">
      <label for="password">Пароль</label>
      <input
        type="password"
        id="password"
        placeholder="Введите пароль"
        autocomplete="new-password"
        v-model="password"
      />
    </div>
    <div class="form-control">
      <label for="repeatPassword">Повторите пароль</label>
      <input
        type="password"
        id="repeatPassword"
        placeholder="Повторите пароль"
        autocomplete="new-password"
      />
    </div>
    <div class="form-control">
      <label for="name">Ваше имя</label>
      <input
        type="text"
        id="name"
        placeholder="Как вас зовут?"
        autocomplete="name"
        v-model="name"
      />
    </div>
    <button class="btn">Зарегистрироваться</button>
  </form>
</template>
