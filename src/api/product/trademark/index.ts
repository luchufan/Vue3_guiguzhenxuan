//品牌管理模块接口

import request from "@/utils/request";

import type { ResTrademarkDataType } from '@/api/product/trademark/type'
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/${page}/${limit}'
}
//获取品牌信息接口
export const reqGettrademark = (page: number, limit: number) => request.get<any, ResTrademarkDataType>(`/admin/product/baseTrademark/${page}/${limit}`)
//添加品牌信息接口
export const reqAddTrademark = (data: any) => request.post<any, any>('/admin/product/baseTrademark/save', data)
//编辑品牌信息接口
export const reqUpdateTrademark = (data: any) => request.put<any, any>('/admin/product/baseTrademark/update', data)
//删除品牌信息接口
export const reqDeleteTrademark = (id: number) => request.delete<any, any>(`/admin/product/baseTrademark/remove/${id}`)