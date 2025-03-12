import '@/assets/scss/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import './api/axios'
import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: 'AIzaSyAm-z0DVh9CHYG3YHhPJQwoFEGkg1vEGAQ',
  authDomain: 'expense-tracker-3e6e2.firebaseapp.com',
  projectId: 'expense-tracker-3e6e2',
  storageBucket: 'expense-tracker-3e6e2.firebasestorage.app',
  messagingSenderId: '254400603873',
  appId: '1:254400603873:web:25d62fa4379e59703739a0',
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)

app.mount('#app')
