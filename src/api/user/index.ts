//统一管理用户相关的接口
import request from "@/utils/request";
import type { LoginDataType, LoginResponseDataType, UserInfoResponseDataType } from "./type";
//统一管理接口
enum API {
  //moke数据接口
  // LOGIN_URL = '/user/login',
  // USERINFO_URL = '/user/info'
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
//moke数据接口
// //登录接口
// export const reqLogin = (data: LoginForm) => request<any, LoginResponseData>({ url: API.LOGIN_URL, data, method: 'post' })
// //获取用户信息接口方法
// export const reqUserInfo = () => request<any, UserResponseData>({ url: API.USERINFO_URL, method: 'get' })

//真实接口
//登录接口
export const reqLogin = (data: LoginDataType) => request.post<any, LoginResponseDataType>(API.LOGIN_URL, data)
//获取用户信息接口方法
export const reqUserInfo = () => request.get<any, UserInfoResponseDataType>(API.USERINFO_URL)
//用户退出登录接口
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)