<script setup>
import AuthHeader from '@/components/AuthHeader.vue'
import SignInForm from '@/components/SignInForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import { provide, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const isSignIn = ref(true)
const loading = ref(false)
const changeSignMethod = () => {
  isSignIn.value = !isSignIn.value
}

async function userAuth(userData) {
  loading.value = true
  if (isSignIn.value) {
    await authStore.signin(userData)
  } else {
    await authStore.signup(userData)
  }
  loading.value = false
  router.replace('/')
  toast.success('Успешно авторизовались!', { timeout: 2000 })
}
provide('sign', { isSignIn, changeSignMethod, loading })
</script>

<template>
  <AuthHeader />
  <div class="container">
    <component :is="isSignIn ? SignInForm : SignUpForm" @submitForm="userAuth"></component>
  </div>
</template>
