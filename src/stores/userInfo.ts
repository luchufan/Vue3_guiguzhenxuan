
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import type { LoginDataType, LoginResponseDataType, UserInfoResponseDataType } from '@/api/user/type'
import type { UserState } from './types/tpyes'
import { defineStore } from 'pinia'

//引入路由（常量路由）
import constantRouter from '@/router/routers'

export const userInfo = defineStore('userInfo', {
  actions: {
    //获取用户token
    async getUserToken(data: LoginDataType) {
      let result: LoginResponseDataType = await reqLogin(data)
      if (result.code == 200) {
        this.$state.token = result.data
        localStorage.setItem('TOKEN', (result.data))
        //成功获取用户token后就要通过token获取用户信息
        // await this.getUserInfo()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //利用用户token获取用户信息
    async getUserInfo() {
      let result: UserInfoResponseDataType = await reqUserInfo()
      if (result.code == 200) {
        this.$state.userInfo = result.data
      } else {
        throw new Error('无法获取用户信息')
      }
    },
    //用户退出
    async getUserLogout() {
      let result: any = await reqLogout()
      if (result.code == 200) {
        localStorage.removeItem('TOKEN')
        this.token = ''
        this.userInfo = {}
        return '退出登录成功'
      } else {
        throw new Error(result.message)
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
