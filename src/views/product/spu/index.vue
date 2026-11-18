<template>
  <div class="spu-contanier">
    <el-card body-style="padding: 20px;">
      <el-form label-width="auto">
        <el-form-item label="一级分类">
          <el-select v-model="value1" placeholder="请选择" filterable size="default" @change="changeSelect1"
            style="width: 100%;" :disabled="scream == 1 || scream == 2">
            <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="value2" placeholder="请选择" filterable size="default" @change="changeSelect2"
            style="width: 100%;" :disabled="scream == 1 || scream == 2">
            <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="value3" placeholder="请选择" filterable size="default" @change="changeSelect3"
            style="width: 100%;" :disabled="scream == 1 || scream == 2">
            <el-option v-for="item in options3" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 添加spu -->
    <el-card style="margin-top: 20px;">
      <div v-show="scream == 0">
        <!-- disabled true为不可点击，false为可点击 意为category3Id有时才可点击，没有则不可点 -->
        <el-button type="primary" icon="Plus" :disabled="value3 ? false : true" @click="addNewSpu">添加SPU</el-button>
        <el-table :data="spuTableData" style="width: 100%;margin-top: 20px;" border>
          <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName" width="120" align="center"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" prop="" width="250" align="center">
            <template #default="{ row }">
              <el-tooltip class="box-item" effect="dark" content="新增" placement="top">
                <el-button type="success" icon="Plus" @click="addSkuInfo(row)"></el-button>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="修改" placement="top">
                <el-button type="primary" icon="Edit" @click="updateSPU(row)"></el-button>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="查看" placement="top">
                <el-button icon="List" @click="showSku(row)"></el-button>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
                <el-button type="danger" icon="Delete" @click="deleteSpu(row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total" v-model:current-page="currentPage" v-model:page-size="pageSize" background
          layout="prev, pager, next, jumper,total" :total="total" style="margin-top: 20px;"
          @change="changeCurrentPage" />
      </div>
      <!-- scream=0，展示选择器3选完后出来的结果。scream=1时，展示添加SPU组件，scream=2时展示添加SKU组件 -->
      <div v-show="scream == 1">
        <addSPU @changeScream="changeScream" ref="addSPUref"></addSPU>
      </div>
      <!-- scream=0，展示选择器3选完后出来的结果。scream=1时，展示添加SPU组件，scream=2时展示添加SKU组件 -->
      <div v-show="scream == 2">
        <addSKU @changeScream="changeScream" ref="addSKUref"></addSKU>
      </div>
    </el-card>
    <el-dialog v-model="isShowSku" title="SKU列表" width="800px">
      <el-table :data="skuInfo" style="width: 100%" border>
        <el-table-column label="sku名称" prop="skuName" width=""></el-table-column>
        <el-table-column label="sku价格" prop="price" width=""></el-table-column>
        <el-table-column label="sku重量" prop="weight" width=""></el-table-column>
        <el-table-column label="sku图片" width="">
          <template #default="{ row }">
            <img :src="row.skuDefaultImg" style="height: 50px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { reqGetCategory1, reqGetCategory2, reqGetCategory3 } from '@/api/product/attr'
import { reqGetDeleteSpuInfo, reqGetSpuInfo } from '@/api/product/spu'
import { ElMessage } from 'element-plus'
import type { GetCategory1Data, GetCategory2Data, GetCategory3Data } from '@/api/product/attr/type'
import type { SpuInfoType, SpuInfoRecordsType } from '@/api/product/spu/type'
import addSKU from './addSKU.vue'
import addSPU from './addSPU.vue'
import { reqGetShowSkuInfo } from '@/api/product/sku/index.ts'

//选择器1选项的对应的值
let value1 = ref()
//选择器2选项的对应的值
let value2 = ref()
//选择器3选项的对应的值
let value3 = ref()
//选择器1选项
let options1 = ref<GetCategory1Data[]>([])
//选择器2选项
let options2 = ref<GetCategory2Data[]>([])
//选择器3选项
let options3 = ref<GetCategory3Data[]>([])

//当前页
const currentPage = ref<number>(1)

//每页显示条目个数
const pageSize = ref<number>(3)

//总条目数
const total = ref<number>(0)

//spu数据表单
let spuTableData = ref<SpuInfoType[]>([])

//scream=0，展示选择器3选完后出来的结果。scream=1时，展示添加SPU组件，scream=2时展示添加SKU组件
const scream = ref(0)

//获取一级分类列表数据

const getCategory1 = async () => {
  let result = await reqGetCategory1()
  if (result.code == 200) {
    options1.value = result.data
    // console.log(result);
  } else {
    ElMessage({
      message: result.message,
      type: 'error',
    })
  }
}

//当组件挂载后，获取一级分类列表数据

onBeforeMount(async () => {
  await getCategory1()
  // console.log(options1);
})

//获取二级分类数据

const getCategory2 = async (id: number) => {
  let result = await reqGetCategory2(id)
  if (result.code == 200) {
    //清空选择器2
    value2.value = ''
    //清空选择器3
    value3.value = ''
    options2.value = result.data
    // console.log(result);
  } else {
    ElMessage({
      message: '获取数据失败',
      type: 'error',
    })
  }
}

//select1选择器1内容改变时触发

const changeSelect1 = async (value1: number) => {
  getCategory2(value1)
  //清空下面属性展示
  spuTableData.value = []

}

//获取三级分类数据

const getCategory3 = async (id: number) => {
  let result = await reqGetCategory3(id)
  if (result.code == 200) {
    value3.value = ''
    options3.value = result.data
    // console.log(result);
  } else {
    ElMessage({
      message: '获取数据失败',
      type: 'error',
    })
  }
}

//select2选择器2内容改变时触发

const changeSelect2 = async (value2: number) => {
  getCategory3(value2)
  //清空下面属性展示
  spuTableData.value = []

}

const spuInfo = ref()
//获取spu展示信息

const getSpuInfo = async () => {
  let result = await reqGetSpuInfo(currentPage.value, pageSize.value, value3.value)
  if (result.code == 200) {
    spuInfo.value = result.data
    spuTableData.value = spuInfo.value.records
    // console.log(spuInfo.value);
    total.value = result.data.total
  } else {
    ElMessage({
      message: '获取数据失败',
      type: 'error',
    })
  }
}

//select3选择器3内容改变时触发

const changeSelect3 = () => {
  getSpuInfo()
}

//分页器当前页改变

const changeCurrentPage = () => {
  //重新获取spuInfo信息
  getSpuInfo()
}

//addSPU组件的实例对象
const addSPUref = ref<any>()
//addSKU组件的实例对象
const addSKUref = ref<any>()
//点击修改SPU按钮时触发

const updateSPU = (row: SpuInfoRecordsType) => {
  // 子组件主动暴露的里面的getAllSPUInfo，父组件获取子组件实例后可直接调用此方法，还可以实现组件通信
  addSPUref.value.getAllSPUInfo(row)
  scream.value = 1
}

//点击添加Spu按钮触发
const addNewSpu = () => {
  // 子组件主动暴露的里面的getAllSPUInfo，父组件获取子组件实例后可直接调用此方法，还可以实现组件通信
  addSPUref.value.addNewSpuInfo(value3.value)
  scream.value = 1


}

//绑定事件changeScream，当修改/新增组件里点击取消时触发
const changeScream = () => {

  // console.log('我被触发');

  scream.value = 0
  getSpuInfo()
}

//删除Spu
const deleteSpu = async (row: any) => {
  let result = await reqGetDeleteSpuInfo(row.id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getSpuInfo()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
//点击新增一个sku

const addSkuInfo = (row: any) => {
  scream.value = 2
  // console.log(row);
  //这个是子组件里的addSkuInfo方法不是这个组件的addSkuInfo方法
  addSKUref.value.addSkuInfo(value1.value, value2.value, value3.value, row.id, row.tmId)
}

//是否展示sku,开始默认不展示
const isShowSku = ref<boolean>(false)
//sku信息
const skuInfo = ref<any>([])
//点击查看sku信息时触发
const showSku = async (row: any) => {
  //展示sku信息
  isShowSku.value = true
  // console.log(row);
  let result = await reqGetShowSkuInfo(row.id)
  if (result.code == 200) {
    skuInfo.value = result.data
  } else {
    ElMessage({
      type: 'error',
      message: '获取sku信息失败'
    })
  }
  // console.log(result);

}
</script>

<style scoped>
.spu-contanier {
  .el-card {
    width: 100%;

    .el-form {
      display: flex;
      justify-content: space-around;
      gap: 16px;


      .el-form-item {
        width: 260px;
        min-width: 0;

        .el-select {
          width: 80%;

        }
      }
    }
  }
}
</style>