
//通用数据接口返回类型
export interface normoal {
  code: number
  message: string
  ok: string
}


//提交保存skuInfo的数据类型
export interface skuInfoType {
  category3Id: number | undefined
  spuID: number | undefined
  tmId: number | undefined
  skuName: string
  price: string | number
  weight: string | number
  skuDefaultImg: string
  skuDesc: string
  skuAttrValueList: SkuAttrValueListType[] | [] //平台属性的数据收集
  skuSaleAttrValueList: SkuSaleAttrValueListType[]
  isSale: number
}

interface SkuAttrValueListType {
  attrId?: string | number
  valueId?: string | number
}

interface SkuSaleAttrValueListType {
  saleAttrId?: string | number    //销售属性id
  saleAttrValueId?: string | number  //销售属性值id
}


//新增sku post所带的参数
// {
//   catergory3Id: number
//   spuid: number
//   tmId: number
//   skuName: string
//   price: string | number
//   weight: string | number
//   skuDesc: string

//   skuAttrValueList: [//平台属性的数据收集
//     {
//       attrId:   属性的id
//       valueId:  属性值的id
//     }
//   ]
//   skuSaleAttrValueList:[
//     {
//       saleAttrId:     //销售属性id
//       saleValueID :   //销售属性值id
//     }
//   ]
//   skuDefaultImg:string
// }