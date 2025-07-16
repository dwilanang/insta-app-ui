import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import './assets/main.css'

import { useAuthStore } from './store/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true 

const auth = useAuthStore()
auth.checkAuth()

app.use(router)
app.mount('#app')
