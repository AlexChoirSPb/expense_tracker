import axiosApiInstance from '@/api/axios'
import generateUUID from '@/helpers/uuidGenerate'

export async function getNameApi(userId) {
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

export async function setNameApi(userId, userName) {
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

export async function getTransactionsApi(userId) {
  try {
    let response = await axiosApiInstance.get(
      `https://expense-tracker-3e6e2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/transactions.json`,
    )

    const transactionList = []

    if (response.data) {
      Object.keys(response.data).forEach((key) => {
        let data = {
          id: key,
          ...response.data[key],
        }
        transactionList.push(data)
      })
    }

    return transactionList
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message || 'Произошла ошибка при получении данных'
    throw new Error(errorMessage)
  }
}

export async function addTransactionApi(userId, payload) {
  try {
    const transactionId = generateUUID()
    await axiosApiInstance.put(
      `https://expense-tracker-3e6e2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/transactions/${transactionId}.json`,
      {
        ...payload,
      },
    )
    return transactionId
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message || 'Произошла ошибка при сохранении записи'
    throw new Error(errorMessage)
  }
}

export async function deleteTransactionApi(userId, id) {
  try {
    await axiosApiInstance.delete(
      `https://expense-tracker-3e6e2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/transactions/${id}.json`,
    )
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message || 'Произошла ошибка при удалении записи'
    throw new Error(errorMessage)
  }
}

export async function editTransactionApi(userId, id, payload) {
  try {
    await axiosApiInstance.put(
      `https://expense-tracker-3e6e2-default-rtdb.europe-west1.firebasedatabase.app/${userId}/transactions/${id}.json`,
      {
        ...payload,
      },
    )
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message || 'Произошла ошибка при изменении записи'
    throw new Error(errorMessage)
  }
}

// export async function getCategoriesApi(userId) {}

// export async function addCategoryApi(userId) {}
