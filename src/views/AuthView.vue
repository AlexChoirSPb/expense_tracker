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
  try {
    loading.value = true
    let successMessage = ''

    if (isSignIn.value) {
      await authStore.signin(userData)
      successMessage = 'Успешно авторизовались!'
    } else {
      await authStore.signup(userData)
      successMessage = 'Успешно зарегистрировались!'
    }
    router.replace('/')
    toast.success(successMessage, { timeout: 2000 })
  } catch (error) {
    toast.error(`${error}`, { timeout: 3000 })
  } finally {
    loading.value = false
  }
}

provide('sign', { isSignIn, changeSignMethod, loading })
</script>

<template>
  <AuthHeader />
  <div class="content">
    <component :is="isSignIn ? SignInForm : SignUpForm" @submitForm="userAuth"></component>
  </div>
</template>
