import request from "@/utils/request";

// 添加一个sku接口
export const reqGetSaveSkuInfo = (data: any) => request.post<any, any>('/admin/product/saveSkuInfo', data)