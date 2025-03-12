import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '../router'
const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

const axiosApiInstance = axios.create()

axiosApiInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  let params = new URLSearchParams()
  params.append('auth', authStore.userInfo.token)
  config.params = params
  return config
})

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const authStore = useAuthStore()
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newTokens = await axiosApiInstance.post(
          `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
          {
            grant_type: 'refresh_token',
            refresh_token: authStore.userInfo.refreshToken,
          },
        )
        const data = newTokens.data
        authStore.userInfo.token = data.id_token
        authStore.userInfo.refreshToken = data.refresh_token
        localStorage.setItem('userInfo', JSON.stringify(authStore.userInfo))
      } catch (e) {
        localStorage.removeItem('userInfo')
        router.push('/auth')
        authStore.userInfo = null
        const errorMessage =
          e.response?.data?.error?.message ||
          'Произошла ошибка отправки запроса. Требуется повторная авторизация'
        throw new Error(errorMessage)
      }
    }
  },
)

export default axiosApiInstance
