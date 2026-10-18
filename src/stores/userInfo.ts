
import { reqLogin, reqUserInfo } from '@/api/user'
import type { LoginForm, LoginResponseData } from '@/api/user/type'
import type { UserState } from './types/tpyes'
import { defineStore } from 'pinia'

//引入路由（常量路由）
import constantRouter from '@/router/routers'
export const userInfo = defineStore('userInfo', {

  actions: {
    //获取用户token
    async getUserToken(data: LoginForm) {
      let result: LoginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.$state.token = result.data.token as string
        localStorage.setItem('TOKEN', (result.data.token as string))
        //成功获取用户token后就要通过token获取用户信息
        this.getUserInfo()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    //利用用户token获取用户信息
    async getUserInfo() {
      let result = await reqUserInfo()
      if (result.code == 200) {
        this.$state.userInfo = result.data.checkUser
      }
    }
  },
  state(): UserState {
    return {
      token: localStorage.getItem('TOKEN'),
      menuRouters: constantRouter,//仓库存储生成菜单需要数组（路由）
      userInfo: {}
    }
  },
  getters: {}
})
