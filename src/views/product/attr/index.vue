<template>
  <div class="attr-contanier">
    <el-card body-style="display: flex;justify-content: space-around;">
      <el-form style="width: 100%;">
        <el-form-item label="一级分类">
          <el-select v-model="value1" placeholder="请选择" filterable size="default" @change="changeSelect1"
            :disabled="showSelct" style="width: 100%;">
            <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="value2" placeholder="请选择" filterable size="default" @change="changeSelect2"
            :disabled="showSelct" style="width: 100%;">
            <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="value3" placeholder="请选择" filterable size="default" @change="changeSelect3"
            :disabled="showSelct" style="width: 100%;">
            <el-option v-for="item in options3" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 20px;">
      <el-button type="primary" icon="Plus" @click="addAttr" :disabled="canAddBtn">添加平台属性</el-button>
      <el-table :data="tableData" border style="width: 100%;margin-top: 20px;">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column label="属性名称" width="160">
          <template #default="{ row }">
            <el-input v-model="updateAttrName" placeholder="Please Input" clearable
              v-if="updateAttrId == row.id"></el-input>
            <span v-else>{{ row.attrName }}</span>
          </template>

        </el-table-column>
        <el-table-column label="属性值名称">
          <template #default="{ row }">
            <el-input-tag v-model="updateAttrValueName" placeholder="请输入属性值名称"
              aria-label="Please click the Enter key after input" v-if="updateAttrId === row.id" />
            <el-tag type="primary" v-for="item in row.attrValueList" style="margin: 5px;" v-else>{{ item.valueName
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <!-- 当前行正在编辑：显示保存/取消 -->
            <template v-if="updateAttrId === row.id">
              <el-button type="primary" @click="saveUpdateAttr">保存</el-button>
              <el-button type="danger" @click="cancelUpdateAttr">取消</el-button>
            </template>
            <!-- 非编辑态：显示编辑/删除 -->
            <template v-else>
              <el-button type="primary" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="Delete" @click="deleteAttrBtn(row.id)"></el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加属性的table -->
      <el-table :data="tableData2" border style="width: 100%;margin-top: 20px;" :show-header="false"
        v-show="showTable2">
        <el-table-column type="index" label="序号" width="60" align="center" :index="indexMethod"></el-table-column>
        <el-table-column label="属性名称" width="160">
          <template #default="{ row }">
            <el-input v-model="addAttrInfo.attrName" placeholder="请输入属性名" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="属性值名称">
          <template #default="{ row }">
            <el-input-tag v-model="addAttrInfo.attrValueList" placeholder="请输入属性值名称"
              aria-label="Please click the Enter key after input" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <el-button type="primary" @click="saveAttr">保存</el-button>
            <el-button type="danger" @click="cancelSaveAttr">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加平台属性时展示的卡片 -->
    <!-- <el-card style="margin-top: 20px;" v-show="showCard == 2">
      <el-button type="primary" @cilck="saveAttr">保存</el-button>
      <el-button type="default" @click="cancelSaveAttr">取消</el-button>
    </el-card> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import { reqGetCategory1, reqGetCategory2, reqGetCategory3, reqGetAttrInfoList, reqGetAddAttr, reqGetDeleteAttr, reqGetUpdateAttr } from '@/api/product/attr'
import { ElMessage } from 'element-plus'
import type { GetCategory1Data, GetCategory2Data, GetCategory3Data, ResAttrInfoListData, AddAttrInfoType, attrValueList } from '@/api/product/attr/type'
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
//表单数据
let tableData = ref<ResAttrInfoListData[]>([])
//table2的假数据，目的是为了点击添加按钮时让table2显示
let tableData2 = ref([
  {
    // paixu: tableData.value.length + 1
    // attrName: '',
    // attrValueList: []
  }])
//展示table2，也就是点添加平台属性后展示要添加那一栏，开始是false不展示，true是展示
const showTable2 = ref(false)
//是否让select可点击,true是不可点，false是可点
const showSelct = ref(false)
//添加属性请求参数的对象
const addAttrInfo = reactive<AddAttrInfoType>({
  //属性名称
  attrName: '',
  //属性值名称 input-tag
  attrValueList: [],
  categoryId: -1,
  categoryLevel: 3
})
//添加按钮是否可点
let canAddBtn = ref(true)
//新增平台属性的序号
const indexMethod = (index: number) => {
  return tableData.value.length + index + 1
}


//获取一级分类数据
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
  tableData.value = []
  //让添加平台属性按钮可点，false:可点击，true:不可点击
  canAddBtn.value = true
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
  tableData.value = []
  //让添加平台属性按钮可点，false:可点击，true:不可点击
  canAddBtn.value = true
}
//当第三个选择器选择完后，需要获取商品基础属性AttrInfoList
const getAttrInfoList = async (id1: number, id2: number, id3: number) => {
  let result = await reqGetAttrInfoList(id1, id2, id3)
  if (result.code == 200) {
    // console.log(result.data);
    //让添加平台属性按钮可点，false:可点击，true:不可点击
    canAddBtn.value = false
    tableData.value = result.data
    console.log(result.data);

    //
    addAttrInfo.categoryId = id3
  } else {
    ElMessage({
      message: result.message,
      type: 'error',
    })
  }
}
//select3选择器3内容改变时触发
const changeSelect3 = async () => {
  getAttrInfoList(value1.value, value2.value, value3.value)
}

//点击添加平台属性
const addAttr = () => {
  showTable2.value = true
  //是否让select可点击,true是不可点，false是可点
  showSelct.value = true
  //置空addAttrInfo中的attrName和attrValueList
  addAttrInfo.attrName = ''
  addAttrInfo.attrValueList = []
  //让添加平台属性按钮可点，false:可点击，true:不可点击
  canAddBtn.value = true
}

//保存attr按钮
const saveAttr = async () => {
  // console.log(addAttrInfo);
  const payload = {
    ...addAttrInfo,
    attrValueList: addAttrInfo.attrValueList.map(valueName => ({ valueName }))
  }
  if (payload.attrName == '') {
    ElMessage({
      message: '属性名称不能为空',
      type: 'error',
    })
  } else if (payload.attrValueList.length == 0) {
    ElMessage({
      message: '属性值名称不能为空',
      type: 'error',
    })
  }
  else {
    //添加平台属性请求
    let result = await reqGetAddAttr(payload)
    // console.log(result);
    if (result.code == 200) {
      //是否让select可点击,true是不可点，false是可点
      showSelct.value = false
      //再次发请求查询展示列表
      getAttrInfoList(value1.value, value2.value, value3.value)
      //隐藏添加的table
      showTable2.value = false
      //让添加平台属性按钮可点，false:可点击，true:不可点击
      canAddBtn.value = false
      ElMessage({
        message: '添加成功',
        type: 'success',
      })
    } else {
      ElMessage({
        message: result.message,
        type: 'error',
      })
    }
  }
  // console.log(addAttrInfo);
}
//取消保存attr按钮
const cancelSaveAttr = () => {
  showTable2.value = false
  //让添加平台属性按钮可点，false:可点击，true:不可点击
  canAddBtn.value = false
  //是否让select可点击,true是不可点，false是可点
  showSelct.value = false
}
//删除按钮
const deleteAttrBtn = async (id: number) => {
  let result = await reqGetDeleteAttr(id)
  if (result.code == 200) {
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
  } else {
    ElMessage({
      message: result.code,
      type: 'error',
    })
  }
  // console.log(result);
  //再次发请求查询展示列表
  getAttrInfoList(value1.value, value2.value, value3.value)

}
//编辑那一行的Id
const updateAttrId = ref<number>()
//编辑那一行的属性名称
const updateAttrName = ref<string>('')
//编辑那一行的属性值名称
const updateAttrValueName = ref<string[]>([])
// 当前正在编辑的原始行（用于对比保留attrValueList里的 id）
const originalAttrRow = ref<ResAttrInfoListData>()
//编辑按钮
const updateAttr = (row: ResAttrInfoListData) => {
  //是否让select可点击,true是不可点，false是可点
  showSelct.value = true
  //让添加平台属性按钮可点，false:可点击，true:不可点击
  canAddBtn.value = true
  // console.log(row);
  //要编辑那一行的id
  updateAttrId.value = row.id
  //属性名称
  updateAttrName.value = row.attrName
  //属性值名称要展示那一串数组
  updateAttrValueName.value = row.attrValueList.map(item => item.valueName)
  //当前正在编辑的原始行（用于对比保留attrValueList里的 id）
  originalAttrRow.value = row
  // console.log(updateAttrValueName);
  // console.log(updateAttrId);

}
//编辑后操作列表展示的保存按钮
const saveUpdateAttr = async () => {
  if (updateAttrName.value == '') {
    ElMessage({
      message: '属性名称不能为空',
      type: 'error',
    })
  } else if (updateAttrValueName.value?.length == 0) {
    ElMessage({
      message: '属性值名称不能为空',
      type: 'error',
    })
  }
  else {
    //最后要发情求的的attrValueList
    const newAttrValueList: attrValueList[] = []
    //让updateAttrValueName遍历里面的valueName
    updateAttrValueName.value?.forEach(valueName => {
      //如果和原始attrValueList里的valueName对的上，则保留他的id和attrId还有valueName
      const oldItem = originalAttrRow.value?.attrValueList.find(item => item.valueName == valueName)
      if (oldItem) {
        //将原来的id，attrId，valueName，一个个放进新数组
        newAttrValueList.push({
          id: oldItem.id,
          attrId: oldItem.attrId,
          valueName: oldItem.valueName,
        })
      } else {
        //如果和原始attrValueList里的valueName对不上，则只会将他们呢的valueName放进数组对象里
        newAttrValueList.push({ valueName: valueName })
      }
    });
    //最终发请求的data
    const payload = {
      id: updateAttrId.value,
      attrName: updateAttrName.value,
      attrValueList: newAttrValueList,
      categoryId: value3.value,
      categoryLevel: 3
    }
    // console.log(payload);
    //向后端发请求
    let result = await reqGetUpdateAttr(payload)
    // console.log(result);
    if (result.code == 200) {
      //是否让select可点击,true是不可点，false是可点
      showSelct.value = false
      //将updateAttrId设置成undefined，就会让编辑那一行变回原始只能查看状态
      updateAttrId.value = undefined
      //再次发请求查询展示列表
      getAttrInfoList(value1.value, value2.value, value3.value)
    } else {
      ElMessage({
        message: result.message,
        type: 'error',
      })
    }
  }
}
//编辑后操作列表展示的取消按钮
const cancelUpdateAttr = () => {
  //是否让select可点击,true是不可点，false是可点
  showSelct.value = false

  //让添加平台属性按钮可点，false:可点击，true:不可点击
  canAddBtn.value = false
  //将updateAttrId设置成undefined，就会让编辑那一行变回原始只能查看状态
  updateAttrId.value = undefined

}
// attrName: "手机一级"
// attrValueList: (4) [{…}, {…}, {…}, {…}]
// categoryId: 61
// categoryLevel: 3
// id: 4944215272329216
</script>

<style scoped>
.attr-contanier {
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