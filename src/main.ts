import './assets/main.css'

import { createApp } from 'vue'

import pinia from './store'

// element-plus全局安装
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// @ts-ignore
import App from './App.vue'

import router from './router'

const app = createApp(App)

app.use(router)
//注册仓库
app.use(pinia)
app.use(ElementPlus, {
    locale: zhCn,
  })

app.mount('#app')