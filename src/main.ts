import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// 创建 Pinia 实例
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
