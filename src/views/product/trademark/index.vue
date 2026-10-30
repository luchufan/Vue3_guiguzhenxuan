<template>
  <div>
    <el-card style="min-width: 960px" v-loading="loading">
      <!-- 添加品牌按钮 -->
      <el-button type="primary" icon="Plus" @click="addLogo">添加品牌</el-button>
      <!-- 展示卡片 -->
      <!-- el-table 中的
     stripe：用来设置斑马纹
     border：用来设置纵向是否有边框
     -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="tmName" label="品牌名称" align="center" />
        <el-table-column label="品牌Logo" align="center">
          <template #default="{ row }">
            <img :src="row.logoUrl" style="width:80px;height:80px;object-fit:contain" />
            <!-- {{ row.logoUrl }} -->
            <!-- 图片存放地址：C:\Users\85306\Desktop\后台\guiguzhenxuan_JAVA-master\static\img\sph -->
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center" width="180">
          <template #default="{ row }">
            <!-- 修改Logo -->
            <el-tooltip class="box-item" effect="dark" content="编辑商品信息" placement="top">
              <el-button type="primary" icon="Edit" circle @click="changeLogo(row)" />
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="删除商品信息" placement="top">
              <el-button type="danger" icon="Delete" circle @click="deleteLogo(row.id)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <div class="main-pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size='pageSize' size="default" background
        layout="prev, pager, next, jumper,total" :total='total' @current-change="changePage"></el-pagination>
    </div>
    <!-- 添加/修改Logo dailog -->
    <!-- v-model属性，它接收 Boolean，当为 true 时显示 Dialog -->
    <!-- title 左上角的标题 -->
    <!-- width dialog宽度 -->
    <el-dialog v-model="handleLogoDialogForm" title="添加品牌" width="600" :before-close="handleClose">
      <el-form style="width: 86%;" :rules="rules" :model="trademarkData" ref="ruleFormRef">
        <!-- label标签文本 -->
        <el-form-item label="品牌名称" :label-width="100" prop="tmName">
          <el-input v-model="trademarkData.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌图片" :label-width="100" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :headers='uploadHeaders'
            :show-file-list="false" :on-success="successUpload" :before-upload="beforeUpload">
            <img v-if="trademarkData.logoUrl" :src="trademarkData.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue';
import { reqDeleteTrademark, reqGettrademark, reqUpdateTrademark } from '@/api/product/trademark';
import { ElNotification, ElMessage, ElMessageBox } from 'element-plus';
import type { ResTrademarkDataType, RecordsDataType, AddOrUpdateDataType } from '@/api/product/trademark/type'
import { reqAddTrademark } from '@/api/product/trademark';
//引入Elupload类型
import type { UploadProps } from 'element-plus'


//当前页
const currentPage = ref(1)
//每页展示个数
const pageSize = ref(5)
//总共数量
const total = ref(0)
//加载动画
const loading = ref(true)
const tableData = ref<RecordsDataType[]>([])

const ruleFormRef = ref()
//获取品牌数据
const firstReqGettrademark = async () => {
  loading.value = true
  let result: ResTrademarkDataType = await reqGettrademark(currentPage.value, pageSize.value)
  if (result.code == 200) {
    // console.log(result);
    total.value = result.data.total
    tableData.value = result.data.records
    loading.value = false
  } else {
    ElNotification({
      type: 'error',
      message: '无法获取数据',
      progress: true,
    })
  }
}
onMounted(() => {
  firstReqGettrademark()
})
//选择页数
const changePage = () => {
  firstReqGettrademark()
}

//dailog是否展示
const handleLogoDialogForm = ref(false)
let trademarkData: AddOrUpdateDataType = reactive({
  // 品牌名称
  tmName: '',
  //图片地址
  logoUrl: '',

})
// let LogoName = ref('')
// let imageUrl = ref('')

//添加品牌Logo
const addLogo = () => {
  // 开启dailog
  handleLogoDialogForm.value = true
  // 将品牌名置空
  trademarkData.tmName = ''
  trademarkData.logoUrl = ''
}
//修改logo
const changeLogo = (props: any) => {
  // 开启dailog
  handleLogoDialogForm.value = true
  // 将获取到品牌名称传给trademarkData.tmName
  trademarkData.tmName = props.tmName
  trademarkData.logoUrl = props.logoUrl
  trademarkData.id = props.id
  // console.log(trademarkData);
  // console.log(props);
}
//删除logo
const deleteLogo = (id: number) => {
  // console.log(id);
  ElMessageBox.confirm(
    '你确定要删除该商品信息?',
    '删除商品',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await reqDeleteTrademark(id)
      if (result.code == 200) {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        firstReqGettrademark()
      } else {
        ElMessage({
          message: result.message,
          type: 'error',
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

//dialog对话框的取消按钮
const cancel = () => {
  handleLogoDialogForm.value = false
  //将form里的信息清空并且重置校验
  ruleFormRef.value.resetFields()
}
//dialog对话框的确认按钮
const confirm = async () => {
  //等表单验证完后才会执行下面的请求
  try {
    await ruleFormRef.value.validate()
  } catch {
    // 校验未通过，直接返回，不继续发请求
    return
  }
  // 发起修改品牌信息请求
  if (trademarkData.id) {
    let result = await reqUpdateTrademark(trademarkData)
    if (result.code == 200) {
      handleLogoDialogForm.value = false
      ElMessage({
        message: '成功上传品牌信息',
        type: 'success',
      })
      firstReqGettrademark()
    } else {
      ElMessage({
        message: result.message,
        type: 'error',
      })
    }
  } else {
    //添加商品信息
    let result = await reqAddTrademark(trademarkData)
    if (result.code == 200) {
      handleLogoDialogForm.value = false
      ElMessage({
        message: '成功上传品牌信息',
        type: 'success',
      })
      firstReqGettrademark()
    } else {
      ElMessage({
        message: result.message,
        type: 'error',
      })
    }
  }
}
//dialog关闭前的回调
const handleClose = () => {
  //关闭dialog对话框
  handleLogoDialogForm.value = false
  //将form里的信息清空并且重置校验
  ruleFormRef.value.resetFields()
}
//图片上传请求头设置
const uploadHeaders = computed(() => ({
  token: localStorage.getItem('TOKEN') || ''
}))
//图片上传之前检测图片是否符合格式
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // console.log(rawFile);
  if (!rawFile.type.startsWith('image/')) {
    ElMessage.error('请上传图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('文件大小不能超过5MB!')
    return false
  } else {
    return true
  }
}
//成功上传图片
//on-sussecc 收到的第一个参数response,收到的第二个参数uploadFile,收到的第三个参数 uploadFiles
const successUpload = (res: any) => {
  trademarkData.logoUrl = res.data
  //图片上传成功后会要清除未验证通过的信息
  ruleFormRef.value.clearValidate('logoUrl')
  // console.log(trademarkData);
  // console.log(res);
}
//表单规则
const rules = reactive({
  tmName: [
    { required: true, message: '请输入品牌名称', trigger: 'blur' },
    { min: 2, message: '品牌名必须大于两个字符', trigger: 'blur' },
  ],
  logoUrl: [
    { required: true, message: '请上传图片', trigger: 'blur' },
  ]
})
</script>

<style scoped>
.el-table {
  margin-top: 10px;
}

.el-card {
  margin: 20px 0;
}

.el-pagination {
  justify-content: center;
}

.main-pagination {
  transition: all .3s;
}

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