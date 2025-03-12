import axiosApiInstance from '@/api/axios'

export async function getName(userId) {
  try {
    const response = await axiosApiInstance.get(
      `https://expense-tracker-3e6e2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/name.json`,
    )
    const userName = response.data
    return userName
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message || 'Произошла ошибка при получении имени'
    throw new Error(errorMessage)
  }
}

export async function setName(userId, userName) {
  try {
    await axiosApiInstance.put(
      `https://expense-tracker-3e6e2-default-rtdb.europe-west1.firebasedatabase.app/${userId}.json`,
      {
        name: userName,
      },
    )
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message || 'Произошла ошибка при сохранении имени'
    throw new Error(errorMessage)
  }
}
