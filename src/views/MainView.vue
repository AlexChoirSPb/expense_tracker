<script setup>
import {
  addCategoryApi,
  addTransactionApi,
  deleteTransactionApi,
  editTransactionApi,
  getCategoriesApi,
  getTransactionsApi,
} from '@/api/expenseApi'
import AppHeader from '@/components/AppHeader.vue'
import IncomeExpense from '@/components/IncomeExpense.vue'
import TheModal from '@/components/TheModal.vue'
import TotalBalance from '@/components/TotalBalance.vue'
import TransactionList from '@/components/TransactionList.vue'
import { useAuthStore } from '@/stores/auth.js'
import { computed, onMounted, provide, ref } from 'vue'
import { useToast } from 'vue-toastification'
import ControlTransaction from '@/components/ControlTransaction.vue'
import { useModal } from '@/composables/useModal'
import AddCategory from '@/components/AddCategory.vue'
import LoaderIcon from '@/components/icons/LoaderIcon.vue'

const toast = useToast()
const authStore = useAuthStore()

const transactionList = ref([])
const categories = ref([])

const loadingList = ref(true)
const loadingTransaction = ref(false)
const loadingCategory = ref(false)

const {
  showModal,
  isEdit,
  editTransactionData,
  openModal,
  closeModal,
  showCategoryModal,
  openCategoryModal,
  closeCategoryModal,
} = useModal(transactionList)

provide('modal', {
  closeModal,
  openModal,
  showModal,
  showCategoryModal,
  openCategoryModal,
  closeCategoryModal,
})

provide('loading', { loadingList, loadingTransaction, loadingCategory })

const categoryFilter = ref('no')

const categoryFilterTransactionList = computed(() => {
  if (categoryFilter.value == 'no') {
    return transactionList.value
  } else if (categoryFilter.value == '') {
    return transactionList.value.filter(
      (transaction) => transaction.category == categoryFilter.value,
    )
  } else {
    return transactionList.value.filter(
      (transaction) =>
        transaction.category == categories.value.find((i) => i.id == categoryFilter.value).category,
    )
  }
})

const dateFilterTransactionList = computed(() => {
  const dateFilterTransactionListObject = categoryFilterTransactionList.value.reduce(
    (acc, transaction) => {
      const { date } = transaction
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(transaction)

      return acc
    },
    {},
  )

  const sortedEntries = Object.entries(dateFilterTransactionListObject).sort((a, b) => {
    return new Date(b[0]) - new Date(a[0])
  })

  // Преобразуем отсортированный массив обратно в объект (если нужно)
  const sortedData = Object.fromEntries(sortedEntries)
  return sortedData
})

const total = computed(() => {
  return transactionList.value
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
})

const incomeTotal = computed(() => {
  return transactionList.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
})

const expenseTotal = computed(() => {
  return transactionList.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
})

async function controlTransaction(payload) {
  try {
    loadingTransaction.value = true
    let successMessage = ''
    if (isEdit.value) {
      const transactionId = editTransactionData.value.id
      await editTransactionApi(authStore.userInfo.userId, transactionId, payload)
      payload.id = transactionId

      const index = transactionList.value.findIndex(
        (transaction) => transaction.id == transactionId,
      )

      transactionList.value[index] = payload
      successMessage = 'Запись обновлена!'
    } else {
      const transactionId = await addTransactionApi(authStore.userInfo.userId, payload)
      payload.id = transactionId
      transactionList.value.push(payload)
      successMessage = 'Запись добавлена!'
    }
    toast.success(successMessage, { timeout: 2000 })
    closeModal()
  } catch (error) {
    toast.error(`${error}`, { timeout: 3000 })
  } finally {
    loadingTransaction.value = false
  }
}

async function deleteTransaction(id) {
  try {
    loadingTransaction.value = true
    await deleteTransactionApi(authStore.userInfo.userId, id)
    transactionList.value = transactionList.value.filter((transaction) => transaction.id !== id)
    toast.success('Запись удалена!', { timeout: 2000 })
  } catch (error) {
    toast.error(`${error}`, { timeout: 3000 })
  } finally {
    loadingTransaction.value = false
  }
}

async function addCategory(payload) {
  try {
    loadingCategory.value = true
    const categoryId = await addCategoryApi(authStore.userInfo.userId, payload)
    payload.id = categoryId
    categories.value.push(payload)
    toast.success('Категория сохранена!', { timeout: 2000 })
    closeCategoryModal()
  } catch (error) {
    toast.error(`${error}`, { timeout: 3000 })
  } finally {
    loadingCategory.value = false
  }
}

onMounted(async () => {
  try {
    loadingList.value = true
    transactionList.value = await getTransactionsApi(authStore.userInfo.userId)
    categories.value = await getCategoriesApi(authStore.userInfo.userId)
  } catch (error) {
    toast.error(`${error}`, { timeout: 3000 })
  } finally {
    loadingList.value = false
  }
})
</script>

<template>
  <AppHeader />
  <div class="content">
    <TotalBalance :total="+total" />
    <IncomeExpense :income="+incomeTotal" :expense="+expenseTotal" />
    <LoaderIcon type="big" v-if="loadingList" />
    <div v-else class="scrollable-content">
      <TransactionList
        :dateFilterTransactions="dateFilterTransactionList"
        :categories="categories"
        @deleteTransaction="deleteTransaction"
        v-model="categoryFilter"
      />
    </div>
  </div>
  <Teleport to="body">
    <Transition name="modal">
      <TheModal
        v-if="showModal"
        :title="isEdit ? 'Редактировать операцию' : 'Добавить операцию'"
        @closeModal="closeModal"
      >
        <ControlTransaction
          @controlTransaction="controlTransaction"
          :transactionData="editTransactionData"
          :categories="categories"
        />
      </TheModal>
    </Transition>
    <Transition name="modal">
      <TheModal
        v-if="showCategoryModal"
        title="Добавить категорию"
        @closeModal="closeCategoryModal"
      >
        <AddCategory :categories="categories" @addCategory="addCategory"></AddCategory>
      </TheModal>
    </Transition>
  </Teleport>
</template>
<style lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;

  .modal__bg {
    transition: opacity 0.3s ease;
  }
  .modal__body {
    transition: all 0.5s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  .modal__bg {
    opacity: 0;
  }
  .modal__body {
    opacity: 0;
    transform: translateY(100px);
  }
}
</style>
