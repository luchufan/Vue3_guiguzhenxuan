//统一管理用户相关的接口
import request from "@/utils/request";
import type { LoginForm, LoginResponseData, UserResponseData } from "./type";
//统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info'
}
//登录接口
export const reqLogin = (data: LoginForm) => request<any, LoginResponseData>({ url: API.LOGIN_URL, data, method: 'post' })
//获取用户信息接口方法
export const reqUserInfo = () => request<any, UserResponseData>({ url: API.USERINFO_URL, method: 'get' })