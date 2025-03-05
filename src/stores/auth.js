import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosApiInstance from '@/api/axios'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')) || null)
  const error = ref('')

  const signin = async (payload) => {
    error.value = ''
    try {
      let response = await axiosApiInstance.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          ...payload,
          returnSecureToken: true,
        },
      )
      console.log(response)

      let data = response.data
      userInfo.value = {
        token: data.idToken,
        userId: data.localId,
        refreshToken: data.refreshToken,
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))

      let userName = await axiosApiInstance.get(
        `https://expense-tracker-3e6e2-default-rtdb.europe-west1.firebasedatabase.app/${userInfo.value.userId}/name.json`,
      )
      userInfo.value.name = userName.data
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    } catch (e) {
      switch (e.response.data.error.message) {
        case 'INVALID_EMAIL':
          error.value = 'Неверный формат почты'
          break
        case 'EMAIL_NOT_FOUND':
          error.value = 'Нет пользователя с такой почтой'
          break
        case 'INVALID_PASSWORD':
          error.value = 'Пароль не верный'
          break
        case 'USER_DISABLED':
          error.value = 'Пользователь заблокирован'
          break
        default:
          error.value = 'Неизвестная ошибка:)'
          break
      }
    }
  }

  const signup = async (payload) => {
    error.value = ''
    const userName = payload.name
    delete payload.name
    try {
      let response = await axiosApiInstance.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        {
          ...payload,
          returnSecureToken: true,
        },
      )
      let data = response.data
      userInfo.value = {
        token: data.idToken,
        userId: data.localId,
        refreshToken: data.refreshToken,
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
      await axiosApiInstance.put(
        `https://expense-tracker-3e6e2-default-rtdb.europe-west1.firebasedatabase.app/${userInfo.value.userId}.json`,
        {
          name: userName,
        },
      )
      userInfo.value.name = userName
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    } catch (e) {
      console.log(e)

      switch (e.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Пользователь с такой почтой уже существует'
          break
        default:
          error.value = e.response.data.error.message
          break
      }
    }
  }
  const logout = async () => {
    userInfo.value = null
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  }
  return { signin, signup, userInfo, error, logout }
})
