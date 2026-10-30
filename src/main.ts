// import './assets/main.css'

import 'virtual:svg-icons-register'
import { createApp } from 'vue'
//引入pinia大仓库
import pinia from './stores/index.ts'

import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
//引入element样式
import 'element-plus/dist/index.css'
//引入element中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
//引入组件SvgIcons
import SvgIcons from './components/SvgIcons.vue'
//引入全局样式
//引入所有element图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
//安装仓库
app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale: zhCn })
//注册全局组件SvgIcons
app.component('SvgIcons', SvgIcons)
//注册element-plus图标全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
