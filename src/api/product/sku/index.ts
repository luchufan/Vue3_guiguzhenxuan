import request from "@/utils/request";

// 添加一个sku接口
export const reqGetSaveSkuInfo = (data: any) => request.post<any, any>('/admin/product/saveSkuInfo', data)

//展示对应的spuId的sku接口
export const reqGetShowSkuInfo = (spuId: number) => request.get<any, any>(`/admin/product/findBySpuId/${spuId}`)

//展示全部sku接口
export const reqGetAllSkuInfo = (page: number, limit: number) => request.get<any, any>(`/admin/product/list/${page}/${limit}`)

//商品上架接口
export const reqGetCancelSale = (skuId: number) => request.get<any, any>(`/admin/product/cancelSale/${skuId}`)

//商品下架接口
export const reqGetOnSale = (skuId: number) => request.get<any, any>(`/admin/product/onSale/${skuId}`)

//商品删除接口
export const reqGetDeleteSku = (skuId: number) => request.delete<any, any>(`/admin/product/deleteSku/${skuId}`)