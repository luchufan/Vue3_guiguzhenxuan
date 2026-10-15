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
//引入组件SvgIcons
import SvgIcons from './components/SvgIcons.vue'
//引入全局样式

const app = createApp(App)
//安装仓库
app.use(pinia)
app.use(router)

//注册全局组件SvgIcons
app.component('SvgIcons', SvgIcons)

app.mount('#app')
