import './assets/main.css'

import { createApp } from 'vue'

import pinia from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// element-plus全局安装
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// @ts-ignore
import App from './App.vue'
import Category from './components/Category/index.vue'
import router from './router'

const app = createApp(App)

//  全局对象
const allGloabCompontent: any = {Category}
app.use(router)
//注册仓库
app.use(pinia)
app.use(ElementPlus, {
    locale: zhCn,
  })
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

import './permisstion'

//@ts-ignore
app.component('Category', Category)

app.mount('#app')
