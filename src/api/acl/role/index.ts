import request from "@/utils/request";
import type { GetRoleType, GetRoleRecordsType } from "./type";

//获取角色接口
export const reqGetRole = (page: number, limit: number, roleName: string) => request.get<any, GetRoleType>(`/admin/acl/role/${page}/${limit}?roleName=${roleName}`)
//添加新角色接口
export const reqGetAddRole = (data: GetRoleRecordsType) => request.post<any, any>(`/admin/acl/role/save`, data)
//更新已有角色接口
export const reqGetUpdateRole = (data: GetRoleRecordsType) => request.put<any, any>('/admin/acl/role/update', data)
//获取根据角色id的所有权限的数据
export const reqGetAllPermission = (id: number) => request.get<any, any>(`/admin/acl/permission/toAssign/${id}`)
//给角色分配权限的接口
export const reqGetDoAssign = (roleId: number, permissionId: number[]) => request.post<any, any>(`/admin/acl/permission/doAssign?roleId=${roleId}&permissionId=${permissionId}`)
//删除已有角色接口
export const reqGetDeleteRole = (id: number) => request.delete<any, any>(`/admin/acl/role/remove/${id}`)