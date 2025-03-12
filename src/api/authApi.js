import axios from 'axios'
const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

export async function signinApi(payload) {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        ...payload,
        returnSecureToken: true,
      },
    )
    const data = response.data
    return data
  } catch (error) {
    const responseMessage = error.response?.data?.error?.message
    let message = ''
    switch (responseMessage) {
      case 'EMAIL_NOT_FOUND':
        message = 'Пользователь с такой почтой не найден'
        break
      case 'INVALID_PASSWORD':
        message = 'Неправильный пароль'
        break
      case 'USER_DISABLED':
        message = 'Пользователь заблокирован'
        break
      default:
        message = 'Произошла ошибка при входе'
        break
    }

    throw new Error(message)
  }
}

export async function signupApi(payload) {
  try {
    let response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {
        ...payload,
        returnSecureToken: true,
      },
    )
    const data = response.data
    return data
  } catch (error) {
    const responseMessage = error.response?.data?.error?.message
    let message = ''
    switch (responseMessage) {
      case 'EMAIL_EXISTS':
        message = 'Пользователь с такой почтой уже существует'
        break
      case 'OPERATION_NOT_ALLOWED':
        message = 'У вас нет прав для данной операции'
        break
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        message = 'Слишном много попыток. Повторите позже'
        break
      default:
        message = 'Произошла ошибка при регистрации'
        break
    }

    throw new Error(message)
  }
}
