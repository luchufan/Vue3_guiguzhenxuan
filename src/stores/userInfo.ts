
import { reqLogin, reqUserInfo } from '@/api/user'
import type { LoginForm } from '@/api/user/type'
import { defineStore } from 'pinia'

export const userInfo = defineStore('userInfo', {

  actions: {
    //获取用户token
    async getUserToken(data: LoginForm) {
      let result = await reqLogin(data)
      if (result.code == 200) {
        this.$state.token = result.data.token
        localStorage.setItem('TOKEN', result.data.token)
        this.getUserInfo()
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
  state() {
    return {
      token: localStorage.getItem('TOKEN'),
      userInfo: {}
    }
  },
  getters: {}
})
