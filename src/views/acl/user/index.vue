<template>
  <div>
    <el-card>
      <el-form label-width="auto" style="display: flex; justify-content: space-between; ">
        <div>
          <el-form-item label="用户名" style="margin-bottom: 0;">
            <el-input v-model="userNameSearch" placeholder="请输入用户名" clearable style="width: 240px;"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-button type="primary" @click="searchUser">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </div>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
      <el-button type="primary" icon="Plus" style="margin-bottom: 10px;" @click="addUser">添加用户</el-button>
      <el-popconfirm :title="`你确认要删除这些用户吗？`" placement="top" @confirm="deleteUsers">
        <template #reference>
          <el-button type="danger" icon="Delete" style="margin-bottom: 10px; margin-left: 10px;"
            :disabled="!deleteUsersId.length">批量删除</el-button>
        </template>
      </el-popconfirm>
      <el-table :data="usersTableData" style="width: 100%" border @selection-change="tableSelectionsChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column label="id" prop="id" width="150"></el-table-column>
        <el-table-column label="用户名字" prop="username" width="120"></el-table-column>
        <el-table-column label="用户昵称" prop="name" width="120"></el-table-column>
        <el-table-column label="用户角色" prop="roleName" min-width="120" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="200"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" width="200"></el-table-column>
        <el-table-column label="操作" min-width="300" width="300" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="UserFilled" @click="roleMatch(row)">角色分配</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="editUser(row)">编辑</el-button>
            <el-popconfirm :title="`你确认要删除${row.name}用户吗？`" placement="top" @confirm="deleteUser(row)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">删除角色</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :background="true"
        layout="prev, pager, next, jumper" :total="total" @change="currentPageChange"
        style="margin-top: 10px;justify-content: center;" v-show="total < 10 ? false : true" />
    </el-card>
    <!-- 添加用户侧边栏 -->
    <el-drawer v-model="drawer" title="添加用户" direction="rtl">
      <el-form :model="userForm" :rules="rules" label-width="80px" style="margin-top: 20px;" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="userForm.name" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addOrUpdateUser">提交</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 分配角色侧边栏 -->
    <el-drawer v-model="drawer2" title="角色分配" direction="rtl" @close="closeDrawer2">
      <div style="font-size: 16px;margin-bottom: 20px;">
        用户名称:{{ userName }}
      </div>
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="userRoles" style="display: flex; flex-wrap: wrap;"
        @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in allRoles" :key="item.id" :label="item.roleName" :value="item.id">
        </el-checkbox>
      </el-checkbox-group>
      <el-button type="primary" @click="saveUserRoles">保存</el-button>
      <el-button type="danger" @click="drawer2 = false">取消</el-button>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { reqGetAllUsers, reqGetSaveUser, reqGetUpdateUser, reqGetUserRole, reqGetDoAssignRole, reqGetDeleteUser, reqGetDeleteUsers } from '@/api/acl/user/index';
import type { RecordsType, UserFormType, AllRolesListType, AssignRolesType } from '@/api/acl/user/type';
const userNameSearch = ref('')

//搜索用户信息
const searchUser = () => {
  //trim() 方法用于删除字符串的头尾空格
  if (userNameSearch.value.trim() === '') {
    ElMessage({
      type: 'warning',
      message: '请输入用户名进行搜索',
    })
  } else {
    getAllUsers()
  }
  // console.log(userNameSearch.value);
}

//重置搜索框
const resetSearch = () => {
  userNameSearch.value = '';
  getAllUsers()
}

//分页器初始配置
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)

//分页器变化
const currentPageChange = (current: number) => {
  currentPage.value = current
  getAllUsers()
}

const usersTableData = ref<RecordsType[]>([])
//获取所有用户信息
const getAllUsers = async () => {
  const result = await reqGetAllUsers(currentPage.value, pageSize.value, userNameSearch.value)
  if (result.code == 200) {
    total.value = result.data.total
    // console.log(result.data);
    usersTableData.value = result.data.records
  }
}

//组件挂载完毕
onMounted(() => {
  getAllUsers()
})

//侧边栏是否显示
const drawer = ref(false)
//添加用户表单数据
const userForm = reactive<UserFormType>({
  username: '',
  name: '',
  password: ''
})
//添加用户
const addUser = async () => {
  // console.log('添加用户');
  drawer.value = true
  //重置表单数据
  userForm.username = ''
  userForm.name = ''
  userForm.password = ''
}

//编辑用户
const editUser = (row: RecordsType) => {
  // console.log('编辑用户', row);
  userForm.username = row.username
  userForm.name = row.name
  userForm.password = row.password
  userForm.id = row.id
  drawer.value = true
}

const addOrUpdateUser = async () => {
  try {
    //检查表单是否验证，返回的是promise对象，需要async await接住或者.then()接住
    await formRef.value.validate()
    if (userForm.id) {
      // console.log('编辑用户');
      let result = await reqGetUpdateUser(userForm)
      if (result.code == 200) {
        ElMessage({
          type: 'success',
          message: '编辑用户成功',
        })
        drawer.value = false
        getAllUsers()
      } else {
        ElMessage({
          type: 'error',
          message: result.message,
        })
      }
    } else {
      // 添加用户
      let result = await reqGetSaveUser(userForm)
      if (result.code == 200) {
        ElMessage({
          type: 'success',
          message: '添加用户成功',
        })
        drawer.value = false
        getAllUsers()
      } else {
        ElMessage({
          type: 'error',
          message: result.message,
        })
      }
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '提交失败，请检查输入',
    })
    return
  }
}

//逐个删除用户
const deleteUser = async (row: any) => {

  let result = await reqGetDeleteUser(row.id)
  console.log(result);
  getAllUsers()

}


//表单引用
const formRef = ref()

//表单验证规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 10, message: '用户名长度在6-10个字符之间', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 6, max: 10, message: '用户昵称长度在6-10个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' }
  ]
})


//角色分配侧边栏是否显示
const drawer2 = ref(false)
//所有角色
const allRoles = ref<AllRolesListType[]>([])
//要给哪一位用户分配的角色
const userName = ref('')
//某位用户已有的角色
const assignRoles = ref<AssignRolesType[]>([])
//
const userRoles = ref<number[]>([])
//角色分配
const roleMatch = async (row: any) => {
  // console.log('角色分配');
  //将用户id分配以后发请求需要整理的数据
  payload.userId = row.id
  userName.value = row.username
  //打开用户角色编辑侧边栏
  drawer2.value = true
  //根据用户id获取所有的角色信息和用户的职位
  let result = await reqGetUserRole(row.id)
  if (result.code == 200) {
    // console.log('用户角色信息', result.data);
    allRoles.value = result.data.allRolesList
    assignRoles.value = result.data.assignRoles
    userRoles.value = assignRoles.value.map(item => item.id)
    // console.log(allRoles.value);
    //初始化用户已有角色的选择框的状态（勾选|未勾选）

    //如果用户已有的角色数量大于0，则半选状态开启
    if (userRoles.value.length > 0) {
      isIndeterminate.value = true
    } else if (userRoles.value.length == allRoles.value.length) {//如果用户已有角色数量等于所有角色数量则勾上全选选择框
      checkAll.value = true
    } else if (userRoles.value.length == 0) {//如果用户已有的角色数量=0，则关闭半选，也不勾全选
      isIndeterminate.value = false
      checkAll.value = false
    }
  } else {
    ElMessage({
      type: 'error',
      message: result.message,
    })
  }
}

//全选框状态
const checkAll = ref(false)
//全选框是否为半选状态 
const isIndeterminate = ref(false)
//全选框变化
const handleCheckAllChange = (val: boolean) => {
  if (val) {
    userRoles.value = allRoles.value.map(item => item.id)
  } else {
    userRoles.value = []
  }
  isIndeterminate.value = false
}

//角色选项框发生改变时触发
const handleCheckedCitiesChange = (val: any) => {

  isIndeterminate.value = true
  //如果选项里的数量和所有角色数量相同，那全选就会勾上，半选状态关闭
  if (val.length == allRoles.value.length) {
    isIndeterminate.value = false
    checkAll.value = true
  } else if (val.length == 0) {
    //如果选项里的数量为0，那就是全不选，全选的选择框会灭掉，半选状态页关闭
    checkAll.value = false
    isIndeterminate.value = false
  }
}

//整理用户已有角色的数据
const payload = {
  roleIdList: [] as number[],
  userId: 0
}
//点击保存角色时触发
const saveUserRoles = async () => {
  payload.roleIdList = userRoles.value
  // console.log(payload);
  let result = await reqGetDoAssignRole(payload)
  if (result.code == 200) {
    getAllUsers()
    ElMessage({
      type: 'success',
      message: '保存成功'
    })
    drawer2.value = false
  }
  else {
    ElMessage({
      type: 'success',
      message: '保存失败' + result.message
    })
  }
  // console.log(result);

}
//关闭角色分配侧边栏
const closeDrawer2 = () => {
  // console.log('关闭角色分配侧边栏');
  // console.log(assignRoles.value);
}


//批量选择用户的id，用于批量删除
const deleteUsersId = ref<number[]>([])
//table表格的选择框选择时触发
const tableSelectionsChange = (newSelection: RecordsType[]) => {
  // 整理好要批量删除的用户的id
  deleteUsersId.value = newSelection.map(item => item.id)
  // console.log(deleteUsersId.value);
}

//批量删除用户
const deleteUsers = async () => {
  console.log('批量删除用户');
  let result = await reqGetDeleteUsers(deleteUsersId.value)
  if (result.code == 200) {
    ElMessage({
      type: 'error',
      message: '删除成功'
    })
    getAllUsers()
  }
  // console.log(result);

}
</script>

<style scoped></style>