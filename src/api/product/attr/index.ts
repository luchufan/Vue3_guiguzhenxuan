import request from "@/utils/request";
import type { ResGetCategory1, ResGetCategory2, ResGetCategory3, ResAttrInfoList, PayloadType, UpdateAttrInfoType } from './type'
//获取一级分类数据接口
export const reqGetCategory1 = () => request.get<any, ResGetCategory1>('/admin/product/getCategory1')
//获取二级分类数据接口
export const reqGetCategory2 = (id: number) => request.get<any, ResGetCategory2>(`/admin/product/getCategory2/${id}`)
//获取三级分类数据接口
export const reqGetCategory3 = (id: number) => request.get<any, ResGetCategory3>(`/admin/product/getCategory3/${id}`)
//获取商品基础属性接口
export const reqGetAttrInfoList = (id1: number, id2: number, id3: number) => request.get<any, ResAttrInfoList>(`/admin/product/attrInfoList/${id1}/${id2}/${id3}`)
//添加商品基础属性接口
export const reqGetAddAttr = (data: PayloadType) => request.post<any, any>('/admin/product/saveAttrInfo', data)
//修改商品基础属性接口
export const reqGetUpdateAttr = (data: UpdateAttrInfoType) => request.post<any, any>('/admin/product/saveAttrInfo', data)

//删除商品基础属性接口
export const reqGetDeleteAttr = (id: number) => request.delete<any, any>(`/admin/product/deleteAttr/${id}`)