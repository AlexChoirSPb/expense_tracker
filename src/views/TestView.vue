<script setup></script>

<template>
  <div class="page">
    <header class="header">Шапка страницы</header>
    <main class="content">
      <form id="form" @submit.prevent="submitForm">
        <div class="form-control">
          <label for="text">Текст</label>
          <input
            type="text"
            id="text"
            placeholder="Введите описание операции"
            v-model="text"
            :disabled="loading"
          />
        </div>
        <div class="form-control">
          <label for="amount">
            Сумма <br />
            <span class="amount-description">
              (отрицательная - расход, положительная - пополнение)
            </span>
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Введите сумму"
            v-model="amount"
            :disabled="loading"
          />
        </div>
        <button class="btn" :disabled="loading">Добавить операцию</button>
      </form>
      <div class="scrollable-content">
        <p>Этот элемент может быть очень длинным.</p>
        <p>Он будет занимать всю доступную высоту, и скролл будет внутри него.</p>
        <p v-for="i in 40" :key="i">Линия {{ i }}</p>
        <p>Линия 2</p>
        <p>Линия 3</p>
        <p>Линия 4</p>
        <p>Линия 5</p>
        <p>Линия 6</p>
        <p>Линия 7</p>
        <p>Линия 8</p>
        <p>Линия 9</p>
        <p>Линия 10</p>
        <p>Линия 11</p>
        <p>Линия 12</p>
        <p>Линия 13</p>
        <p>Линия 14</p>
        <p>Линия 15</p>
        <p>Линия 16</p>
        <p>Линия 17</p>
        <p>Линия 18</p>
        <p>Линия 19</p>
        <p>Линия 20</p>
      </div>
    </main>
    <footer class="footer">Подвал страницы</footer>
  </div>
</template>
