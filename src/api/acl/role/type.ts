interface normal {
  code: number
  message: string
  ok: boolean
}
//获取角色返回的数据类型
export interface GetRoleType extends normal {
  data: {
    current: number
    pages: number
    records: GetRoleRecordsType[]
    searchCount: boolean
    size: number
    total: number
  }
}

export interface GetRoleRecordsType {
  createTime?: string
  id?: number
  remark?: string
  roleName: string
  updateTime?: string
}