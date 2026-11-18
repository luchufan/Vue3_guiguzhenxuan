interface ResponseType {
  code: number
  message: string
  ok: boolean
}

export interface ReqGetPermissionType extends ResponseType {
  data: ReqGetPermissionDataType[]
}

export interface ReqGetPermissionDataType {
  createTime: string
  updateTime: string
  name: string
  pid: number
  code: string,
  toCode: string,
  type: number,
  status: string,
  level: number,
  children?: ReqGetPermissionDataType[]
  select: boolean,
  id: number
}

//添加权限要带参数的数据类型
export interface AddPermissionType {
  code: string
  level: number
  name: string
  pid: number
  id?: number
  type: number
}

