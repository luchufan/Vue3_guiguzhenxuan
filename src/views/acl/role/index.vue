<template>
  <div>
    <el-card>
      <el-form label-width="auto" style="display: flex; justify-content: space-between;">
        <el-form-item label="查找角色名称" style="margin-bottom: 0;">
          <el-input v-model="searchRoleName" placeholder="角色名称" clearable style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-button type="primary" @click="searchRole" :disabled="!searchRoleName">查找</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
      <el-button type="primary" icon="Plus" style="margin-bottom: 10px;" @click="addRole">添加角色</el-button>
      <el-table :data="roleTableData" style="width: 100%" border>
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column label="id" prop="id" width="180" align="center"></el-table-column>
        <el-table-column label="角色名称" prop="roleName" width="" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="" align="center"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" width="" align="center"></el-table-column>
        <el-table-column label="操作" width="300" align="center" min-width="300">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="UserFilled" @click="permissionBtn(row)">分配权限</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
            <el-button type="primary" size="small" icon="Delete" @click="deleteRole(row)">删除角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :background="true"
        layout="prev, pager, next, jumper" :total="total" style="margin-top: 10px;justify-content: center;"
        @change="changeCurrent" />
    </el-card>
    <el-dialog v-model="addOrUpdateRoleDialog" :title="addOrUpdateRoleTitle" width="600px">
      <el-form label-width="auto">
        <el-form-item label="角色名称">
          <el-input v-model="addOrUpdatePayload.roleName" placeholder="请输入" clearable></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addOrUpdateRoleDialog = false">取消</el-button>
          <el-button type="primary" @click="confirmDialog">保存</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 分配角色权限 -->
    <el-drawer v-model="roleDrawer" title="分配权限" direction="rtl" :before-close="handleCloseDrawer">
      <template #header>分配权限</template>
      <template #default>
        <el-tree ref="treeRef" style="max-width: 600px" :data="allPermission" show-checkbox default-expand-all
          node-key="id" highlight-current :props="defaultProps" @check="handleTreeCheck" />
      </template>
      <template #footer>
        <el-button type="primary" @click="savePermission">保存</el-button>
        <el-button type="danger" @click="cancelSavePermission">取消</el-button>
      </template>

    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reqGetAddRole, reqGetAllPermission, reqGetDoAssign, reqGetRole, reqGetUpdateRole, reqGetDeleteRole } from '@/api/acl/role';
import type { GetRoleRecordsType } from '@/api/acl/role/type';
import { ElMessage, ElMessageBox } from 'element-plus';

import { computed, onMounted, reactive, ref } from 'vue';

//搜索框绑定的值
const searchRoleName = ref<string>('')
//当前页
const currentPage = ref<number>(1)
//一页放几项数据
const pageSize = ref<number>(10)
//总共有几项数据
const total = ref<number>(0)
//展示所有角色的table
const roleTableData = ref<GetRoleRecordsType[]>([])

onMounted(() => {
  getRole()
})

//diolog标题
const addOrUpdateRoleTitle = computed(() => {
  if (addOrUpdatePayload.id) {
    return '修改角色'
  } else {
    return '编辑角色'
  }
})

//获取当前页的角色数据
const getRole = async () => {
  let result = await reqGetRole(currentPage.value, pageSize.value, searchRoleName.value)
  if (result.code == 200) {
    if (result.data.total == 0) {
      ElMessage({
        type: 'error',
        message: '找不到该角色'
      })
    }
    roleTableData.value = result.data.records
    total.value = result.data.total
  }
  // console.log(roleTableData.value);
}

//点击查找时
const searchRole = () => {
  currentPage.value = 1
  getRole()
}

//点击重置
const reset = () => {
  searchRoleName.value = ''
  getRole()
}

//添加或者修改的dialog的显示状态
const addOrUpdateRoleDialog = ref<boolean>(false)
//要添加或者修改的角色名称
const addOrUpdatePayload = reactive<GetRoleRecordsType>({
  id: undefined,
  roleName: ''
})
//addOrUpdateRoleDialog的保存
const confirmDialog = async () => {
  // console.log(addOrUpdatePayload.roleName);
  //有id就发修改的请求
  if (addOrUpdatePayload.id) {
    let result = await reqGetUpdateRole(addOrUpdatePayload)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '修改成功'
      })
      //重新获取所有角色
      getRole()
      //关闭dialog
      addOrUpdateRoleDialog.value = false
    } else {
      ElMessage({
        type: 'error',
        message: '修改失败'
      })
    }
    // console.log(result);
  } else {
    //没有id就发新增的请求
    let result = await reqGetAddRole(addOrUpdatePayload)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '添加成功'
      })
      //重新获取所有角色
      getRole()
      //关闭dialog
      addOrUpdateRoleDialog.value = false
      // console.log(result);
    } else {
      ElMessage({
        type: 'error',
        message: '添加失败'
      })
    }
  }
}
//点击添加角色时触发
const addRole = () => {
  //开启addOrUpdateRoleDialog提示框
  addOrUpdateRoleDialog.value = true
  //置空addOrUpdatePayload
  addOrUpdatePayload.roleName = ''
  addOrUpdatePayload.id = undefined
}
//点编辑时的addOrUpdateRoleDialog提示框
const updateRole = (row: GetRoleRecordsType) => {
  addOrUpdateRoleDialog.value = true
  addOrUpdatePayload.roleName = row.roleName
  addOrUpdatePayload.id = row.id
}

//控制分配权限侧边栏是否展示
const roleDrawer = ref<boolean>(false)
//所有权限数据
const allPermission = ref<any>()

//树形控件的ref
const treeRef = ref<any>()
//匹配上组件的要求 label是展示的文字，children是叶子
const defaultProps = {
  children: 'children',
  label: 'name',
}
//已有权限的id
const checkedId = ref<number[]>([])
//要分配权限的角色id
const permissionId = ref<number>()
//权限分配按钮
const permissionBtn = async (row: GetRoleRecordsType) => {
  //打开分配权限侧边栏
  roleDrawer.value = true
  //重置用户是否动过选择框
  isDirty.value = false
  //根据角色id获取已有的权限和所有权限数据
  let result = await reqGetAllPermission(row.id as number)
  allPermission.value = result.data
  // console.log(allPermission.value);

  //每次都要先清空上个用户已有权限的id，不然会重复上一个用户的已有权限
  checkedId.value = []
  //
  permissionId.value = row.id
  //找到最后的叶子选择的id，并收集到checkedId
  const pikeChecked = (arr: any) => {
    //遍历数组
    arr.forEach((element: any) => {
      //如果children数组的长度为0，那么说明这个就是最后的叶子选择
      if (element.children.length == 0) {
        //如果他的select为true，那么说明已经给这个角色分配了这个权限
        if (element.select) {
          //把id push进这个checkedId数组来收集已分配的权限
          checkedId.value.push(element.id)
        }
      } else {
        //如果children数组的长度不为0，那么说明这还不是最后的叶子选择，需要继续递归
        pikeChecked(element.children)
      }
    })
  };
  //先执行一次上面的方法，才能开始递归
  pikeChecked(allPermission.value)
  // console.log(checkedId.value);

  //设置目前选中的节点，使用此方法必须设置 node-key 属性 (keys, leafOnly) 接收两个参数: 1. 一个需要被选中的多节点 key 的数组 2. 布尔类型的值如果设置为 true，将只设置选中的叶子节点状态。默认值是 false.
  treeRef.value!.setCheckedKeys(checkedId.value, false)
  //

}



//分配角色保存按钮
const savePermission = async () => {
  //
  let result = await reqGetDoAssign(permissionId.value as number, treeRef.value.getCheckedKeys(true, true))
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '保存成功'
    })
    //关闭侧边栏
    roleDrawer.value = false
  } else {
    ElMessage({
      type: 'error',
      message: '保存失败'
    })
  }
  // console.log(result);
  // console.log(treeRef.value.getCheckedKeys(true, true));
}

//用户是否动过树形结构
const isDirty = ref(false)
//如果动过则将isDirty设置为true
const handleTreeCheck = () => {
  isDirty.value = true
}

//当drawer关闭前执行
const handleCloseDrawer = () => {
  // console.log(111);

  if (isDirty.value) {
    ElMessageBox({
      title: '还未保存所分配的权限',
      message: '你确认不保存就退出吗？',
      showCancelButton: true,
      cancelButtonType: 'primary',
      confirmButtonType: 'danger'
    })
      .then(() => {
        roleDrawer.value = false

      })
      .catch(() => {
        // roleDrawer.value = false
        // catch error
      })
  } else {
    roleDrawer.value = false
  }
}
const cancelSavePermission = () => {
  if (isDirty.value) {
    ElMessageBox({
      title: '还未保存所分配的权限',
      message: '你确认不保存就退出吗？',
      showCancelButton: true,
      cancelButtonType: 'primary',
      confirmButtonType: 'danger'
    })
      .then(() => {
        roleDrawer.value = false

      })
      .catch(() => {
        // roleDrawer.value = false
        // catch error
      })
  } else {
    roleDrawer.value = false
  }
}

//分页器当前页变化
const changeCurrent = (val: number) => {
  currentPage.value = val
  getRole()
}

//删除角色
const deleteRole = (row: GetRoleRecordsType) => {
  ElMessageBox({
    title: '删除角色',
    message: '你确认删除这个角色吗？',
    showCancelButton: true,
    cancelButtonType: 'primary',
    confirmButtonType: 'danger'
  })
    .then(async () => {
      let result = await reqGetDeleteRole(row.id as number)
      if (result.code == 200) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        //重新获取所有角色
        getRole()
      } else {
        ElMessage({
          type: 'error',
          message: '删除失败'
        })
      }
    })
    .catch(() => {
      // catch error
    })
}
</script>

<style scoped></style>