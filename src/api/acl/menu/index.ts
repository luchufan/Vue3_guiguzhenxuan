import request from "@/utils/request";

import type { ReqGetPermissionType, AddPermissionType } from "./type";

//获取菜单信息接口
export const reqGetPermission = () => request.get<any, ReqGetPermissionType>('/admin/acl/permission')
//新增菜单接口
export const reqGetSavePermission = (data: AddPermissionType) => request.post<any, any>('/admin/acl/permission/save', data)
//更新菜单接口
export const reqGetUpdatePermission = (data: AddPermissionType) => request.put<any, any>('/admin/acl/permission/update', data)
//删除菜单
export const reqGetDeletePermission = (id: number) => request.delete<any, any>(`/admin/acl/permission/remove/${id}`)