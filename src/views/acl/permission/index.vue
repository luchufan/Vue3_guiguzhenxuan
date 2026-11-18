<template>
  <div>
    <el-table :data="permissionTableData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
      <el-table-column prop="name" label="名称" min-width="120" />
      <el-table-column prop="code" label="权限值" min-width="100" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作" min-width="280" width="280" align="center">
        <template #default="{ row, $index }">
          <el-button type="primary" icon="Plus" size="small" v-if="row.level == 3"
            @click="savePermissionForm(row)">添加功能</el-button>
          <el-button type="success" icon="Plus" size="small" v-else v-show="row.level != 4"
            @click="savePermissionForm(row)">添加菜单</el-button>
          <el-button type="primary" icon="Edit" size="small" v-if="row.level != 1"
            @click="updatePermission(row)">编辑</el-button>
          <el-button type="danger" icon="Delete" size="small" v-if="row.level != 1"
            @click="deleteMenu(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="addOrUpdateDialogVisible" title="Tips" width="600">
      <el-form :model="addOrUpdatePermissionForm" :rules="rules" label-width="auto" ref="formRef">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addOrUpdatePermissionForm.name" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="权限值" prop="code">
          <el-input v-model="addOrUpdatePermissionForm.code" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item class="submit">
          <el-button @click="addOrUpdateDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reqGetDeletePermission, reqGetPermission, reqGetSavePermission, reqGetUpdatePermission } from '@/api/acl/menu';
import type { ReqGetPermissionDataType, AddPermissionType } from '@/api/acl/menu/type';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';


//存放所有权限
const permissionTableData = ref<ReqGetPermissionDataType[]>([])
//添加或者修改
const addOrUpdateDialogVisible = ref<boolean>(false)
//添加或修改权限表单
const addOrUpdatePermissionForm = reactive<AddPermissionType>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
  type: 0,
  id: undefined
})

const rules = reactive({
  name: [{
    required: true, message: '请输入名称', trigger: 'blur'
  }],
  code: [{
    required: true, message: '请输入权限值', trigger: 'blur'
  }]

})
//组件挂载完毕获取所有权限
onMounted(() => {
  getAllPermissionData()
})
//获取所有权限
const getAllPermissionData = async () => {
  let result = await reqGetPermission()
  if (result.code == 200) {
    permissionTableData.value = result.data
  }
  // console.log(result);
}

//编辑
const updatePermission = (row: ReqGetPermissionDataType) => {
  //开启dialog
  addOrUpdateDialogVisible.value = true
  // console.log(row);
  //将原有的数据赋值给addOrUpdatePermissionForm
  addOrUpdatePermissionForm.name = row.name
  addOrUpdatePermissionForm.code = row.code
  addOrUpdatePermissionForm.id = row.id
  addOrUpdatePermissionForm.pid = row.pid
  addOrUpdatePermissionForm.level = row.level
  addOrUpdatePermissionForm.type = row.type
}

//添加菜单或功能
const savePermissionForm = (row: ReqGetPermissionDataType) => {
  //开启dialog
  addOrUpdateDialogVisible.value = true
  console.log('保存表单', row);
  //置空addOrUpdatePermissionForm
  addOrUpdatePermissionForm.name = ''
  addOrUpdatePermissionForm.code = ''
  addOrUpdatePermissionForm.id = undefined
  //如果是给3级菜单添加功能就将type设为2，给一级菜单或二级菜单添加菜单就将type设为1
  if (row.level == 3) {
    addOrUpdatePermissionForm.type = 2
  } else {
    addOrUpdatePermissionForm.type = 1
  }
  addOrUpdatePermissionForm.level = row.level + 1
  addOrUpdatePermissionForm.pid = row.id
  console.log(addOrUpdatePermissionForm);
}


//点击保存
const save = async () => {
  console.log(addOrUpdatePermissionForm);
  try {
    await formRef.value.validate()
    if (addOrUpdatePermissionForm.id) {
      console.log('有id');
      let result = await reqGetUpdatePermission(addOrUpdatePermissionForm)
      console.log(result);
      if (result.code == 200) {
        ElMessage({
          type: 'success',
          message: '修改成功'
        })
        addOrUpdateDialogVisible.value = false
        getAllPermissionData()
      }
    } else {
      console.log('meiid');
      let result = await reqGetSavePermission(addOrUpdatePermissionForm)
      if (result.code == 200) {
        ElMessage({
          type: 'success',
          message: '添加成功'
        })
        addOrUpdateDialogVisible.value = false
        //重新获取菜单数据
        getAllPermissionData()
      } else if (result.code == 205) {
        ElMessage({
          type: 'error',
          message: '不能重复添加重复名称'
        })
      }
    }
  } catch (error) {
    console.log(error);

  }

}
//删除菜单
const deleteMenu = async (row: ReqGetPermissionDataType) => {
  let result = await reqGetDeletePermission(row.id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
  } else if (result.code == 208) {
    ElMessage({
      type: 'error',
      message: result.message
    })
  }
  console.log(result);
  getAllPermissionData()

}

//el-form 的ref
const formRef = ref()

</script>

<style scoped></style>