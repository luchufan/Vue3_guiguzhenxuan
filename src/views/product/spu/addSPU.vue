<template>
  <div>
    <el-form label-width="auto">
      <el-form-item label="SPU名称">
        <el-input v-model="spuName" placeholder="请输入SPU名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="spuBrandValue" placeholder="请选择SPU品牌" filterable clearable style="width: 240px">
          <el-option v-for="item in spuBrandOptions" :key="item.id" :label="item.tmName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spuDetail" placeholder="请输入SPU描述" clearable :rows="2" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload v-model:file-list="imageList" list-type="picture-card" multiple
          action="/api/admin/product/fileUpload" :headers='uploadHeaders' :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select v-model="saleAttrValue" placeholder="请选择属性添加或者修改" filterable clearable
          style="width: 240px;margin-right: 20px;" @change="selectOptionsChange">
          <el-option v-for="item in unSeletOptions" :label="item.name" :value="item.id" :key="item.id" />
        </el-select>
        <el-button type="primary" icon="Plus" @click="addSaleAttr" :disabled="!saleAttrValue">添加销售属性</el-button>
        <el-table :data="baseSaleTable" border style="width: 100%;margin-top: 20px;">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column prop="saleAttrName" label="属性名" width="80" />
          <el-table-column prop="spuSaleAttrValueList" label="属性值">
            <el-table-column prop="spuSaleAttrValueList" label="属性值">
              <template #default="{ row }">
                <el-tag type="success" v-for="item in row.spuSaleAttrValueList" style="margin-right: 5px;" closable
                  @close="handleCloseTag(row, item)" :key="item.id">{{ item.saleAttrValueName }}</el-tag>
                <el-input v-if="inputVisible === row" ref="InputRef" v-model="inputValue.saleAttrValueName" class="w-20"
                  size="small" @keyup.enter="handleInputConfirm(row)" @blur="handleInputConfirm(row)"
                  style="width: 100px;" />
                <el-button v-else size="small" @click="showInput(row)">
                  添加新的属性值
                </el-button>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="操作" width="160" align="center">
            <template #default="{ row, $index }">
              <el-button type="danger" @click="baseSaleTable.splice($index, 1)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-button type="danger" @click="cancelSave">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, computed } from 'vue';
import { reqGetTradeMarkList, reqGetSpuImagesList, reqGetSpuSaleAttrList, reqGetBaseSaleAttrList, reqGetUpdateSpuInfo, reqGetSaveSpuInfo } from '@/api/product/spu';
import type { trademarkType, SaleAttrListType, SpuInfoRecordsType, ImageList, SaleAttrType, SaveSpuInfoType } from '@/api/product/spu/type'
import { ElMessage, type UploadProps, type UploadUserFile } from 'element-plus'

const $emit = defineEmits(['changeScream'])
//SPU名称
const spuName = ref<string>('')
//SPU品牌select value 
const spuBrandValue = ref<number>()
//SPU品牌select options 
const spuBrandOptions = ref<trademarkType[]>([])
//SPU品牌描述
const spuDetail = ref<string>('')
//销售属性select value
const saleAttrValue = ref<number>()
//销售属性select options
const saleAttrOptions = ref<SaleAttrListType[]>([])
//图片列表
const imageList = ref<ImageList[]>([])
//对应id的售卖属性
const baseSaleTable = ref<SaleAttrType[]>([])

//input的ref,用来让聚焦到input框上
const InputRef = ref<any>()
//绑定input的对象
const inputValue = reactive({
  saleAttrValueName: '',
  spuId: undefined
})

//图片上传请求头设置
const uploadHeaders = computed(() => ({
  token: localStorage.getItem('TOKEN') || ''
}))

//获取全部品牌列表

const getTradeMarkList = async () => {
  let result = await reqGetTradeMarkList()
  if (result.code == 200) {
    spuBrandOptions.value = result.data
    // console.log(spuBrandOptions);
  }
}

//获取对应id的图片信息

const getSpuImagesList = async (spuId: number) => {
  let result = await reqGetSpuImagesList(spuId)
  if (result.code == 200) {
    imageList.value = result.data.map(item => {
      return {
        name: item.imgName,
        url: item.imgUrl
      }
    })
    // console.log('获取对应id的图片信息', imageList.value);
  }
}

//获取对应id的售卖属性接口

const getSpuSaleAttrList = async (spuId: number) => {
  let result = await reqGetSpuSaleAttrList(spuId)
  if (result.code == 200) {
    baseSaleTable.value = result.data
    baseSaleTable.value.forEach((item: any) => {
      item.spuSaleAttrValueList = item.spuSaleAttrValueList.map((val: any) => ({
        ...val,
        baseSaleAttrId: item.baseSaleAttrId,

      }));
    });
    console.log(baseSaleTable.value);
  }
}
//获取所有销售属性值

const allSaleAttrOptions = ref<SaleAttrListType[]>([])
const getBaseSaleAttrList = async () => {
  let result = await reqGetBaseSaleAttrList()
  if (result.code == 200) {
    allSaleAttrOptions.value = result.data
    // console.log(result.data);
  }
}

//计算出销售属性为展示出的selet option
const unSeletOptions = computed(() => {
  return allSaleAttrOptions.value.filter((item) => {
    return baseSaleTable.value.every(element => {
      return item.name != element.saleAttrName
    })
  })
})

const dialogImageUrl = ref('')
//预览图片的dailog状态
const dialogVisible = ref(false)
//点击文件列表中已上传的文件时的钩子
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile);
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
//文件列表移除文件时的钩子
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const selectedValue = ref<number>()
//添加销售属性的select改变时触发
const selectOptionsChange = (value: number) => {
  selectedValue.value = value
}

//添加销售属性

const addSaleAttr = () => {
  console.log(saleAttrValue.value);
  // console.log(unSeletOptions.value.find(item => {
  //   if (item.id == selectedValue.value) {
  //     return item.name
  //   }
  // }),);

  baseSaleTable.value.push({
    baseSaleAttrId: saleAttrValue.value,
    saleAttrName: unSeletOptions.value.find(item => {
      if (item.id == selectedValue.value) {
        return item.name
      }
    })?.name,
    spuSaleAttrValueList: []
  })


  //清空选项值
  saleAttrValue.value = undefined
  // console.log(unSeletOptions);
  // console.log(baseSaleTable.value);
}

// 从 boolean 改成「记录当前正在编辑的行」
const inputVisible = ref<SaleAttrType | null>(null)

// 点击哪一行，就把哪一行记录下来
const showInput = (row: SaleAttrType) => {
  inputVisible.value = row
  inputValue.saleAttrValueName = ''          // 每次打开先清空
  nextTick(() => {
    InputRef.value?.input?.focus()
  })
}
// 添加属性值后按键盘的enter或者input失焦都会触发
const handleInputConfirm = (row: any) => {
  inputVisible.value = null
  console.log(row);
  baseSaleTable.value.find(item => {
    if (item == row)
      if (inputValue.saleAttrValueName == '') {
        alert('请输入需要添加的属性值')
      } else {
        item.spuSaleAttrValueList?.push({
          saleAttrValueName: inputValue.saleAttrValueName,
          baseSaleAttrId: row.baseSaleAttrId
        })
      }
  })
  // console.log(baseSaleTable.value);

}

//关闭一个tag时触发

const handleCloseTag = (row: any, item: any) => {
  // console.log(row);
  // console.log(item);
  console.log(row.spuSaleAttrValueList.indexOf(item));
  row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(item), 1)
}

//当父组件点击修改按钮时，子组件要 获取全部品牌列表、对应id的图片展示、对应id的售卖属性、所有销售属性值

const getAllSPUInfo = (row: any) => {
  // console.log(row);

  spuName.value = row.spuName //展示spu名称
  spuDetail.value = row.description//展示spu描述
  spuBrandValue.value = row.tmId//展示spu品牌

  saveSpuData.tmId = row.tmId
  saveSpuData.id = row.id
  saveSpuData.category3Id = row.category3Id
  getTradeMarkList()
  getSpuImagesList(row.id) //获得相应id的图片
  getSpuSaleAttrList(row.id)//获得对应id的售卖属性
  getBaseSaleAttrList()
}

//点击新增时触发的方法

const addNewSpuInfo = (value3: number) => {
  getTradeMarkList()
  getBaseSaleAttrList()
  saveSpuData.category3Id = value3
  //清空表单
  spuName.value = ''
  spuDetail.value = ''
  spuBrandValue.value = undefined
  imageList.value = []
  baseSaleTable.value = []
  saveSpuData.id = undefined
  saveSpuData.tmId = undefined
}

//需要手动暴露上面的方法,不然父组件的addSPU实例里没有这个方法
defineExpose({ getAllSPUInfo, addNewSpuInfo })

//保存时要发请求带的data

const saveSpuData: SaveSpuInfoType = {
  category3Id: 0,
  id: undefined,
  spuName: '',
  tmId: undefined,
  description: '',
  spuImageList: [],
  spuSaleAttrList: []
}

//点击保存时触发
const save = async () => {
  if (saveSpuData.id) {
    saveSpuData.spuName = spuName.value
    saveSpuData.description = spuDetail.value
    saveSpuData.spuSaleAttrList = baseSaleTable.value
    saveSpuData.spuImageList = imageList.value.map((item: any) => {
      return {
        imgName: item.name,
        imgUrl: (item.response && item.response.data) ? item.response.data : item.url
      }
    })

    // console.log(saveSpuData);

    let result = await reqGetUpdateSpuInfo(saveSpuData)
    if (result.code == 200) {
      ElMessage({
        message: '保存成功',
        type: 'success',
      })
      $emit('changeScream')
    }
    // console.log(result);
  } else {

    saveSpuData.spuName = spuName.value
    saveSpuData.description = spuDetail.value
    saveSpuData.spuSaleAttrList = baseSaleTable.value
    saveSpuData.spuImageList = imageList.value.map((item: any) => {
      return {
        imgName: item.name,
        imgUrl: (item.response && item.response.data) ? item.response.data : item.url
      }
    })
    saveSpuData.tmId = spuBrandValue.value
    console.log(saveSpuData);

    let result = await reqGetSaveSpuInfo(saveSpuData)
    if (result.code == 200) {
      ElMessage({
        message: '添加成功',
        type: 'success',
      })
      $emit('changeScream')
    } else {
      ElMessage({
        message: '添加失败,请填写完整信息',
        type: 'error',
      })
    }
    // console.log(result);

  }



}

//点击取消按钮时chufa
const cancelSave = () => {
  $emit('changeScream')
}




</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>