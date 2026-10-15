import { createRouter, createWebHistory } from 'vue-router'

import constantsRouter from './routers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantsRouter,

  //滚动行为，每次路由跳转都会回到页面顶部
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

export default router
