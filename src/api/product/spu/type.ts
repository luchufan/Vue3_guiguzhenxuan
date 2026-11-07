//通用数据类型
interface ResDataType {
  code: number,
  message: string,
  ok: boolean
}

//SpuInfoType里records数组的数据类型
export interface SpuInfoRecordsType {
  category3Id: number,
  description: string,
  id?: number,
  spuImageList: null | ImageList[]
  spuName: string,
  spuSaleAttrList: null | SaleAttrListType[]
  tmId: number,
}

//SpuInfo的数据类型
export interface SpuInfoType extends ResDataType {
  data: {
    current: number,
    pages: number,
    records: SpuInfoRecordsType[],
    searchCount: boolean,
    size: number,
    total: number
  }
}

//trademarkList的data的数组对象类型
export interface trademarkType {
  id: number,
  tmName: string,
  logoUrl: string
}

//trademarkList的数据类型
export interface TrademarkListType extends ResDataType {
  data: trademarkType[]
}

//获取SPU照片链接data里数据对象的数据类型
export interface ImageList {
  id?: number
  imgName?: string
  imgUrl?: string
  spuId?: number
  name?: string
  url?: string
}

//获取SPU照片链接数组对象的数据类型
export interface ImageListType extends ResDataType {
  data: ImageList[]
}

//获取对应id的售卖属性里data的数组对象数据类型
export interface SaleAttrType {
  baseSaleAttrId?: number | string
  id?: number | string
  saleAttrName?: string
  spuId?: number | string
  spuSaleAttrValueList?: SpuSaleAttrValueListType[]
}

//SaleAttrType里的spuSaleAttrValueList数组对象的数据类型
export interface SpuSaleAttrValueListType {
  baseSaleAttrId: number,
  id?: number
  saleAttrValueName: string
  spuId?: number
}

//获取对应id的售卖属性的数据类型
export interface SpuSaleAttrListType extends ResDataType {
  data: SaleAttrType[]
}

//获取所有销售属性里data的数组对象数据类型
export interface SaleAttrListType {
  id: number
  name: string
}

//获取所有销售属性的数据类型
export interface BaseSaleAttrListType extends ResDataType {
  data: SaleAttrListType[]
}



//添加添加一个SPU发请求的数据类型
export interface SaveSpuInfoType {
  id?: number,
  spuName: string,
  tmId: number | undefined,
  description: string,
  category3Id?: number,
  spuImageList: ImageList[] | null
  spuSaleAttrList?: SaleAttrType[] | null
}

//新增或修改发送的data数据类型
