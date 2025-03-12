import { ref } from 'vue'
import { defineStore } from 'pinia'
import { signinApi, signupApi } from '@/api/authApi'
import { getName, setName } from '@/api/expenseApi'

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')) || null)
  const errorStore = ref('')

  const signin = async (payload) => {
    try {
      errorStore.value = ''

      const data = await signinApi(payload)

      userInfo.value = {
        token: data.idToken,
        userId: data.localId,
        refreshToken: data.refreshToken,
      }

      const userName = await getName(data.localId)
      userInfo.value.name = userName

      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    } catch (error) {
      errorStore.value = error
      throw error
    }
  }

  const signup = async (payload) => {
    try {
      errorStore.value = ''
      const userName = payload.name
      delete payload.name

      const data = await signupApi(payload)

      userInfo.value = {
        token: data.idToken,
        userId: data.localId,
        refreshToken: data.refreshToken,
      }

      await setName(data.localId, userName)
      userInfo.value.name = userName
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    } catch (error) {
      errorStore.value = error
      throw error
    }
  }
  const logout = () => {
    userInfo.value = null
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  }
  return { signin, signup, userInfo, errorStore, logout }
})
