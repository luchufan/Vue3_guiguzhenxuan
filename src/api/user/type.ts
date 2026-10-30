//登录接口需要携带参数ts类型
export interface LoginDataType {
  username: string,
  password: string
}

//定义全部接口返回的类型
export interface ResponseDataType {
  code: number,
  message: string,
  ok: boolean
}

//登陆成功返回的类型，继承全部接口返回的类型再加上data(token)
export interface LoginResponseDataType extends ResponseDataType {
  data: string
}
//定义获取用户信息返回的类型
export interface UserInfoResponseDataType extends ResponseDataType {
  data: {
    routers: string[],
    buttons: string[],
    roles: string[],
    name: string,
    avatar: string
  }
}
//定义退出返回的类型
export interface LogoutResponseDataType extends ResponseDataType {
  data: null
}
