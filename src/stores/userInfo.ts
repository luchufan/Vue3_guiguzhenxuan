
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import type { LoginForm, LoginResponseData } from '@/api/user/type'
import type { UserState } from './types/tpyes'
import { defineStore } from 'pinia'

//引入路由（常量路由）
import constantRouter from '@/router/routers'

export const userInfo = defineStore('userInfo', {
  actions: {

    //获取用户token
    async getUserToken(data: any) {
      let result: any = await reqLogin(data)
      if (result.code == 200) {
        this.$state.token = result.data as string
        localStorage.setItem('TOKEN', (result.data as string))
        //成功获取用户token后就要通过token获取用户信息
        // await this.getUserInfo()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //利用用户token获取用户信息
    async getUserInfo() {
      let result = await reqUserInfo()
      if (result.code == 200) {
        this.$state.userInfo = result.data
      } else {
        throw new Error('无法获取用户信息')
      }
    },
    //用户退出
    async getUserLogout() {
      let result = await reqLogout()
      if (result.code == 200) {
        localStorage.removeItem('TOKEN')
        this.token = ''
        this.userInfo = {}
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
