<template>
  <div>
    <el-card>
      <el-table :data="skuInfo" style="width: 100%" border>
        <el-table-column label="序号" type="index" width="60"></el-table-column>
        <el-table-column label="名称" prop="skuName" width="180"></el-table-column>
        <el-table-column label="描述" prop="skuDesc" min-width="250"></el-table-column>
        <el-table-column label="默认图片" min-width="250">
          <template #default="{ row }">
            <img :src="row.skuDefaultImg" style="width: 80px;">
          </template>
        </el-table-column>
        <el-table-column label="重量" prop="weight" width="180"></el-table-column>
        <el-table-column label="价格" prop="price" width="180"></el-table-column>
        <el-table-column label="操作" min-width="258" width="258" fixed="right" align="center">
          <template #default="{ row }">
            <el-button type="success" icon="Top" v-if="row.isSale == 0" @click="onSale(row)"></el-button>
            <el-button type="info" icon="Bottom" v-if="row.isSale == 1" @click="cancelSale(row)"></el-button>
            <el-button type="primary" icon="Edit"></el-button>
            <el-button icon="InfoFilled"></el-button>
            <el-button type="danger" icon="DeleteFilled" @click="deleteSku(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :background="true"
        layout="prev, pager, next, jumper" :total="total" @change="currentPageChange"
        style="margin-top: 10px;justify-content: center;" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqGetAllSkuInfo, reqGetCancelSale, reqGetDeleteSku, reqGetOnSale } from '@/api/product/sku';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

//当前页
const currentPage = ref<number>(1)
//一页展示几个商品
const pageSize = ref<number>(3)
//总共几件商品
const total = ref<number>(0)
//挂载完毕就要获取数据
onMounted(() => {
  getSkuInfo()
})
//接收传回来的数据
const skuInfo = ref([])
//获取对应页数的skuList
const getSkuInfo = async () => {
  let result = await reqGetAllSkuInfo(currentPage.value, pageSize.value)
  if (result.code == 200) {
    // console.log(result.data);
    total.value = result.data.total
    skuInfo.value = result.data.records
  }

}

//分页器本页变换时
const currentPageChange = (current: number) => {
  currentPage.value = current
  getSkuInfo()
}

//上架
const onSale = async (row: any) => {
  // console.log(row);

  let result = await reqGetOnSale(row.id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '商品上架成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: '商品上架失败'
    })
  }
  // console.log(result);
  getSkuInfo()
}

//下架
const cancelSale = async (row: any) => {
  // console.log(row);
  let result = await reqGetCancelSale(row.id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '商品下架成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: '商品下架失败'
    })
  }
  // console.log(result);
  getSkuInfo()
  // let result =await reqGetOnSale()
}

//商品删除
const deleteSku = async (row: any) => {
  // console.log(row.id);
  let result = await reqGetDeleteSku(row.id)
  if (result.code == 200) {
    ElMessage({
      type: 'error',
      message: '商品已删除'
    })
    getSkuInfo()
  }
}

</script>

<style scoped></style>