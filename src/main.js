import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import { initCloudBase } from './utils/tcb'
import './assets/style.css'

const app = createApp(App)

// 全局注册 Element Plus（中文语言包）
app.use(ElementPlus, { locale: zhCn })
app.use(router)

// 初始化腾讯云 CloudBase（匿名登录）
initCloudBase().catch((err) => {
  console.warn('[CloudBase] 初始化失败，请检查 VITE_TCB_ENV_ID 配置', err)
})

app.mount('#app')
