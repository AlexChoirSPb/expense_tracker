<script setup lang="ts">
import axiosApiInstance from '@/api/axios'
import AddTransaction from '@/components/AddTransaction.vue'
import AppHeader from '@/components/AppHeader.vue'
import IncomeExpense from '@/components/IncomeExpense.vue'
import TotalBalance from '@/components/TotalBalance.vue'
import TransactionList from '@/components/TransactionList.vue'
import generateUUID from '@/helpers/uuidGenerate'
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted, provide, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const authStore = useAuthStore()

const transactionList = ref([])

const loading = ref(false)

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

async function addTransaction(payload) {
  loading.value = true
  const transactionId = generateUUID()
  await axiosApiInstance.put(
    `https://expense-tracker-3e6e2-default-rtdb.europe-west1.firebasedatabase.app/${authStore.userInfo.userId}/transactions/${transactionId}.json`,
    {
      ...payload,
    },
  )
  payload.id = transactionId
  transactionList.value.push(payload)
  toast.success('Запись добавлена!', { timeout: 2000 })
  loading.value = false
}

async function deleteTransaction(id) {
  await axiosApiInstance.delete(
    `https://expense-tracker-3e6e2-default-rtdb.europe-west1.firebasedatabase.app/${authStore.userInfo.userId}/transactions/${id}.json`,
  )
  transactionList.value = transactionList.value.filter((transaction) => transaction.id !== id)
}

onMounted(async () => {
  let response = await axiosApiInstance.get(
    `https://expense-tracker-3e6e2-default-rtdb.europe-west1.firebasedatabase.app/${authStore.userInfo.userId}/transactions.json`,
  )
  if (response.data) {
    Object.keys(response.data).forEach((key) => {
      let data = {
        id: key,
        ...response.data[key],
      }
      transactionList.value.push(data)
    })
  }
})
</script>

<template>
  <AppHeader />

  <div class="container">
    <TotalBalance :total="+total" />
    <IncomeExpense :income="+incomeTotal" :expense="+expenseTotal" />
    <AddTransaction @addTransaction="addTransaction" />
    <TransactionList :transactions="transactionList" @deleteTransaction="deleteTransaction" />
  </div>
</template>
