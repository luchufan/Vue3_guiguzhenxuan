<template>
  <div>
    <el-form :model="skuInfo" label-width="auto">
      <el-form-item label="商品名称">
        <el-input v-model="skuInfo.skuName" placeholder="请输入商品名称" clearable style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="skuInfo.price" placeholder="请输入商品价格" clearable style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label="商品重量(kg)">
        <el-input v-model="skuInfo.weight" placeholder="请输入商品重量" clearable style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="skuInfo.skuDesc" placeholder="请输入商品描述" clearable></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form-item v-for="(item, index) in attrInfoList" :label="item.attrName">
          <el-select v-model="skuAttrValueArr[index]" placeholder="请选择" filterable clearable
            style="width: 180px;margin: 5px;" :key="item.id">
            <el-option v-for="value in item.attrValueList" :label="value.valueName" :value="value.id" :key="value.id" />
          </el-select>
        </el-form-item>

      </el-form-item>
      <el-form-item label="销售属性">
        <el-form-item v-for="(item, index) in baseSaleAttrList" :label="item.saleAttrName" :key="item.id">
          <el-select v-model="skuSaleAttrValueArr[index as number]" placeholder="请选择" filterable clearable
            style="width: 180px;margin: 5px;">
            <el-option v-for="value in item.spuSaleAttrValueList" :key="value.id" :label="value.saleAttrValueName"
              :value="value.id" />
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="选择图片">
        <el-table :data="imageList" style="width: 100%" border ref="tableRef">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="图片" width="">
            <template #default="{ row }">
              <img :src="row.imgUrl" style="height: 40px;" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" width=""></el-table-column>
          <el-table-column label="操作" prop="" width="" align="center">
            <template #default="{ row }">
              <el-button type="primary" @click="setDefaultImg(row)">设置默认图片</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="canselSaveSku">取消</el-button>
    <el-button type="primary" @click="saveSkuInfo">添加</el-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { reqGetAttrInfoList } from '@/api/product/attr';
import type { ResAttrInfoListData } from '@/api/product/attr/type';
import type { skuInfoType } from '@/api/product/sku/type';
import { reqGetSpuImagesList, reqGetSpuSaleAttrList } from '@/api/product/spu';
import { reqGetSaveSkuInfo } from '@/api/product/sku';
import { ElMessage } from 'element-plus';


//获取父组组件绑定的事件
const $emit = defineEmits(['changeScream'])
//sku信息
const skuInfo = reactive<skuInfoType>({
  category3Id: undefined,
  spuID: undefined,
  tmId: undefined,
  skuName: '',
  price: '',
  weight: '',
  skuDefaultImg: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  isSale: 0
})

//收集skuAttrValue的数组
const skuAttrValueArr = ref<number[]>([])
//收集skuSaleAttrValueArr
const skuSaleAttrValueArr = ref<number[]>([])
//平台属性
const attrInfoList = ref<ResAttrInfoListData[]>([])
//销售属性
const baseSaleAttrList = ref<any>()
//图片数据
const imageList = ref()
//暴露给父组件的方法
const addSkuInfo = async (value1: number, value2: number, value3: number, spuId: number, tmId: number) => {
  //清空saveInfo
  skuInfo.category3Id = undefined
  skuInfo.price = ''
  skuInfo.skuAttrValueList = []
  skuInfo.skuDefaultImg = ''
  skuInfo.skuDesc = ''
  skuInfo.skuName = ''
  skuInfo.skuSaleAttrValueList = []
  skuInfo.spuID = undefined
  skuInfo.tmId = undefined
  skuInfo.weight = ''
  //清空select
  skuAttrValueArr.value = []
  skuSaleAttrValueArr.value = []
  //获取通用平台属性
  let result = await reqGetAttrInfoList(value1, value2, value3)
  attrInfoList.value = result.data
  // console.log(result.data);

  //根据id获取销售属性
  let result1 = await reqGetSpuSaleAttrList(spuId)
  baseSaleAttrList.value = result1.data
  // console.log(baseSaleAttrList.value);

  //根据id获取图片
  let result3 = await reqGetSpuImagesList(spuId)
  imageList.value = result3.data
  // console.log(result3);

  //将catergory3Id传给skuInfo
  skuInfo.category3Id = value3
  //spuID传给skuInfo
  skuInfo.spuID = spuId
  //将tmid传给skuInfo
  skuInfo.tmId = tmId
}

//table的ref
const tableRef = ref()

//点击设置默认图片时触发  收集图片信息
const setDefaultImg = (row: any) => {
  //清空其他行的选中信息
  tableRef.value.clearSelection()
  //点击设置默认图片后选中该行
  tableRef.value.toggleRowSelection(row, true)

  skuInfo.skuDefaultImg = row.imgUrl

}



defineExpose({ addSkuInfo })
//取消保存sku
const canselSaveSku = () => {
  // 触发父组件的changeScream
  $emit('changeScream')
}

//点击保存时触发
const saveSkuInfo = async () => {
  //将收集到的valueId重新按照{
  // attrId: 
  // valueId:
  // }这种格式存到skuInfo中
  skuInfo.skuAttrValueList = skuAttrValueArr.value.map((item, index) => {
    return {
      attrId: attrInfoList.value[index]?.id,
      valueId: item
    }
  })
  //收集skuSaleAttrValueList
  skuInfo.skuSaleAttrValueList = skuSaleAttrValueArr.value.map((item, index) => {
    return {
      saleAttrId: baseSaleAttrList.value[index]?.id,
      saleAttrValueId: item
    }
  })
  // console.log(skuInfo);

  let result = await reqGetSaveSkuInfo(skuInfo)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
    //切换回展示页面
    $emit('changeScream')
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败，请填写完整'
    })
  }

}

</script>

<style scoped></style>