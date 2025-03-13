import { ref } from 'vue'

export function useModal(transactionList) {
  const showModal = ref(false)
  const isEdit = ref(false)
  const editTransactionData = ref()

  function openModal(type, id) {
    isEdit.value = type == 'edit'
    editTransactionData.value = transactionList.value.find((transaction) => transaction.id == id)
    showModal.value = true
  }
  function closeModal() {
    showModal.value = false
  }

  return { showModal, isEdit, editTransactionData, openModal, closeModal }
}
