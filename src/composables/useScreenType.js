import { ref, onMounted, onUnmounted } from 'vue'

export function useScreenType() {
  const screenType = ref('desktop') // По умолчанию 'desktop'

  // Функция для обновления screenType
  const updateScreenType = () => {
    screenType.value = window.innerWidth > 720 ? 'desktop' : 'mobile'
  }

  // Устанавливаем начальное значение
  updateScreenType()

  // Добавляем обработчик изменения размера окна
  onMounted(() => {
    window.addEventListener('resize', updateScreenType)
  })

  // Убираем обработчик при уничтожении компонента
  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenType)
  })

  return { screenType }
}
