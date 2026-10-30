//通用数据类型
export interface ResDataType {
  code: number,
  message: string,
  ok: boolean
}

//records数组里的数据类型
export interface RecordsDataType {
  createTime: string
  id?: number
  logoUrl: string
  tmName: string
  updateTime: string
}
//新增或更新品牌信息数据类型
export interface AddOrUpdateDataType {
  id?: number
  logoUrl: string
  tmName: string
}

//整个trademark返回的类型
export interface ResTrademarkDataType extends ResDataType {
  data: {
    records: RecordsDataType[]
    current: number
    pages: number
    searchCount: boolean
    size: number
    total: number
  }

}