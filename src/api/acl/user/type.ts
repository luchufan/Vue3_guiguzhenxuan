interface normal {
  code: number
  message: string
  ok: boolean
}

//获取所有用户接口返回数据类型
export interface ReqGetAllUsersType extends normal {
  data: {
    current: number
    pages: number
    size: number
    total: number
    records: RecordsType[]
  }
}

//records
export interface RecordsType {
  createTime: string
  updateTime: string
  id: number
  name: string
  password: string
  roleName: string
  username: string
}

//新增或修改用户信息提交表单类型
export interface UserFormType {
  id?: number
  name: string
  username: string
  password: string
}

//获取所有角色的数据类型
export interface ReqGetUserRoleType extends normal {
  data: {
    allRolesList: AllRolesListType[]
    assignRoles: AssignRolesType[]
  }
}

export interface AllRolesListType {
  createTime: string
  id: number
  remark: string
  roleName: string
  updateTime: string
}

export interface AssignRolesType {
  createTime?: string
  id: number
  remark?: string
  roleName: string
  updateTime?: string
}