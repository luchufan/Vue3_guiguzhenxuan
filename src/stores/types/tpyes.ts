//小仓库userInfo的类型
//router的类型
import type { RouteRecordRaw } from "vue-router"
export interface UserState {
  token: string | null,
  menuRouters: RouteRecordRaw[]
  userInfo: any
}
