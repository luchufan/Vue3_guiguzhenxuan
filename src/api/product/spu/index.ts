import request from "@/utils/request";
import type { SpuInfoType, TrademarkListType, ImageListType, SpuSaleAttrListType, BaseSaleAttrListType } from './type'

//获取SPU品牌信息接口
export const reqGetSpuInfo = (page: number, limit: number, category3Id: string | number) => request.get<any, SpuInfoType>(`/admin/product/${page}/${limit}?category3Id=${category3Id}`)

//获取全部品牌列表接口
export const reqGetTradeMarkList = () => request.get<any, TrademarkListType>('/admin/product/baseTrademark/getTrademarkList')

//获取对应id的图片展示接口
export const reqGetSpuImagesList = (spuId: number) => request.get<any, ImageListType>(`/admin/product/spuImageList/${spuId}`)

//获取对应id的售卖属性接口
export const reqGetSpuSaleAttrList = (spuId: number) => request.get<any, SpuSaleAttrListType>(`/admin/product/spuSaleAttrList/${spuId}`)

//获取所有销售属性值接口
export const reqGetBaseSaleAttrList = () => request.get<any, BaseSaleAttrListType>('/admin/product/baseSaleAttrList')

//添加一个SPU接口
export const reqGetSaveSpuInfo = (data: any) => request.post<any, any>('/admin/product/saveSpuInfo', data)
//修改一个SPU接口
export const reqGetUpdateSpuInfo = (data: any) => request.post<any, any>('/admin/product/updateSpuInfo', data)
//删除一个SPU接口
export const reqGetDeleteSpuInfo = (spuId: number) => request.delete<any, any>(`/admin/product/deleteSpu/${spuId}`)