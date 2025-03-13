<script setup>
import {
  addTransactionApi,
  deleteTransactionApi,
  editTransactionApi,
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

const toast = useToast()
const authStore = useAuthStore()

const transactionList = ref([])

const loading = ref(false)

const { showModal, isEdit, editTransactionData, openModal, closeModal } = useModal(transactionList)

provide('modal', { closeModal, openModal, showModal })

provide('loading', { loading })

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
    loading.value = true
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
    loading.value = false
  }
}

async function deleteTransaction(id) {
  try {
    loading.value = true
    await deleteTransactionApi(authStore.userInfo.userId, id)
    transactionList.value = transactionList.value.filter((transaction) => transaction.id !== id)
    toast.success('Запись удалена!', { timeout: 2000 })
  } catch (error) {
    toast.error(`${error}`, { timeout: 3000 })
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    loading.value = true
    transactionList.value = await getTransactionsApi(authStore.userInfo.userId)
  } catch (error) {
    toast.error(`${error}`, { timeout: 3000 })
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page">
    <AppHeader />
    <div class="content">
      <TotalBalance :total="+total" />
      <IncomeExpense :income="+incomeTotal" :expense="+expenseTotal" />
      <div class="scrollable-content">
        <TransactionList :transactions="transactionList" @deleteTransaction="deleteTransaction" />
      </div>
    </div>
  </div>
  <Teleport to="body">
    <TheModal v-if="showModal" :title="isEdit ? 'Редактировать операцию' : 'Добавить операцию'">
      <ControlTransaction
        @controlTransaction="controlTransaction"
        :transactionData="editTransactionData"
      />
    </TheModal>
  </Teleport>
</template>
