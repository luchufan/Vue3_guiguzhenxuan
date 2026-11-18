import request from '@/utils/request'
import type { ReqGetAllUsersType, ReqGetUserRoleType } from './type'
//获取所有用户接口
export const reqGetAllUsers = (page: number, limit: number, username: string) => request.get<any, ReqGetAllUsersType>(`/admin/acl/user/${page}/${limit}?username=${username}`)
//新增用户信息接口
export const reqGetSaveUser = (data: any) => request.post<any, any>('/admin/acl/user/save', data)
//修改用户信息接口
export const reqGetUpdateUser = (data: any) => request.put<any, any>('/admin/acl/user/update', data)
//获取所有职位信息且用户已有职位
export const reqGetUserRole = (userId: number) => request.get<any, ReqGetUserRoleType>(`/admin/acl/user/toAssign/${userId}`)
//用户角色更新
export const reqGetDoAssignRole = (data: any) => request.post<any, any>('/admin/acl/user/doAssignRole', data)
//删除用户接口
export const reqGetDeleteUser = (id: number) => request.delete<any, any>(`/admin/acl/user/remove/${id}`)
//批量删除用户接口
export const reqGetDeleteUsers = (idList: number[]) => request.delete<any, any>('/admin/acl/user/batchRemove', { data: idList })