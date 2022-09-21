import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vue3Fetch from './components/Vue3Fetch.vue'

const app = createApp(App)

app.use(Vue3Fetch)

app.mount('#app')
