import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { useProgressStore } from './stores/progress'
import { trackVisit } from './utils/api'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

// 启动后异步同步服务端进度（不阻塞渲染）
const progress = useProgressStore()
progress.syncFromServer()

// 访客埋点（静默失败）
trackVisit().catch(() => {})
