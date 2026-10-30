//通用数据类型
interface ResDataType {
  code: number,
  message: string,
  ok: string
}
//Category1 第一个选择器里的data里的数组数据类型
export interface GetCategory1Data {
  id: number,
  name: string
}
//Category1 第一个选择器里的数据类型
export interface ResGetCategory1 extends ResDataType {
  data: GetCategory1Data[]
}
//Category2 第二个选择器里的data里的数组数据类型
export interface GetCategory2Data {
  category1Id: number,
  id: number,
  name: string
}
//Category2 第二个选择器里的数据类型
export interface ResGetCategory2 extends ResDataType {
  data: GetCategory2Data[]
}
//Category3 第三个选择器里的data里的数组数据类型
export interface GetCategory3Data {
  category2Id: number,
  id: number,
  name: string
}
//Category3 第三个选择器里的数据类型
export interface ResGetCategory3 extends ResDataType {
  data: GetCategory3Data[]
}
//三个选择器选完后，需要展示属性的数据类型里的 data 的数据类型
export interface ResAttrInfoListData {
  attrName: string,
  attrValueList: attrValueListType[],
  categoryId: number,
  categoryLevel: number,
  id: number
}
//三个选择器选完后，需要展示属性的数据类型里的 data 里的attrValueList数组的数据类型
export interface attrValueListType {
  attrId: number,
  id: number,
  valueName: string
}
//三个选择器选完后，需要展示属性的数据类型
export interface ResAttrInfoList extends ResDataType {
  data: ResAttrInfoListData[]
}
//添加平台属性数据类型
export interface AddAttrInfoType {
  attrName: string,
  attrValueList: string[],
  categoryId: number,
  categoryLevel: number
}
//最终添加平台属性数据类型
export interface PayloadType {
  attrName: string,
  attrValueList: { valueName: string }[],
  categoryId: number,
  categoryLevel: number
}
//修改平台属性里的attrValueList数组的数据类型
export interface attrValueList {
  attrId?: number,
  id?: number,
  valueName: string
}
//修改平台属性数据类型
export interface UpdateAttrInfoType {
  id?: number,
  attrName: string,
  attrValueList: attrValueList[]
  categoryId: number,
  categoryLevel: number
}