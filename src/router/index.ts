import { createRouter, createWebHistory } from 'vue-router'

import constantsRouter from './routers'

import { userInfo } from '@/stores/userInfo'
import pinia from '@/stores'
const userInfoStore = userInfo(pinia)

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantsRouter,

  //滚动行为，每次路由跳转都会回到页面顶部
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

router.beforeEach(async (to, from) => {
  nprogress.start()
  if (userInfoStore.$state.token) {//已登录
    if (to.path == '/login') {//已登录访问登录页 不放行
      return '/'
      // return true
    } else {
      if (userInfoStore.$state.userInfo.name) {//已登录且已通过token获取到用户信息然后访问除login的其他路由，可以放行
        return true
      } else {//已登录，但通过tonken获取不到用户信息，可能token过期
        try {//尝试通过token获取用户信息
          await userInfoStore.getUserInfo()
          return true
        } catch (error: any) {//已经尝试过获取用户信息，但无法获取，可能token过期
          //清空用户数据，并跳转到登录页
          // await userInfoStore.getUserLogout()
          localStorage.removeItem('TOKEN')
          userInfoStore.$state.token = ''
          userInfoStore.$state.userInfo = {}
          console.log(error.message);
          return '/login'
        }
      }
    }
  } else {//未登录
    if (to.path == '/login') {//未登录访问登录页 允许放行
      return true
    } else {
      return '/login'
    }
  }


})
router.afterEach((to, from) => {
  nprogress.done()
  document.title = `商品后台管理系统-${to.meta.title}`
})
export default router
