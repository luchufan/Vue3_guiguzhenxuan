<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">左侧占位</el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginInfo" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>商品会后台</h2>
          <!-- 账号输入框 -->
          <el-form-item prop="username">
            <el-input v-model="loginInfo.username" :prefix-icon="User" />
          </el-form-item>
          <!-- 密码输入框 -->
          <el-form-item prop="password">
            <el-input v-model="loginInfo.password" type="password" show-password :prefix-icon="Lock" />
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button :loading="isLoading" type="primary" class="login_btn" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { User, Lock } from '@element-plus/icons-vue'
import { userInfo } from '@/stores/userInfo'
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import time from '@/utils/time';


let loginInfo = reactive({
  username: 'admin',
  password: '111111'
})

//控制加载效果
let isLoading = ref(false)
const uersStore = userInfo()
const $router = useRouter()

//el-form组件
const loginForms = ref()
const login = async () => {
  await loginForms.value.validate()
  //点击登录就会触发登录按钮加载效果，实现节流效果
  isLoading.value = true
  try {
    //成功登录
    await uersStore.getUserToken(loginInfo)
    $router.push('home')
    //成功登录，关闭登录按钮加载效果
    isLoading.value = false
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `Hi，${time()}好！`,
      duration: 1500,
      progress: true,
    })
  } catch (error) {
    //登录失败
    //成功失败，关闭登录按钮加载效果
    isLoading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
      progress: true,
    })
  }
}

//表单校验规则
// required 是否必填
// min 最小字符串长度 max 最大字符串长度
// message 提示信息
// trigger 验证逻辑的触发方式 change 改变时就触发 blur 失去焦点时触发
const rules = {
  username: [
    { required: true, min: 5, message: '账号不得小于5位', trigger: 'change' },
    { required: true, max: 10, message: '账号不得大于10位', trigger: 'change' }
  ],
  password: [
    { required: true, min: 6, message: '密码不得小于6位', trigger: 'change' },
  ]
}

//



</script>


<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/images/background.jpg') no-repeat;
  background-size: 100% 100%;

  .login_form {
    min-height: 320px;
    width: 600px;
    padding: 40px;
    position: relative;
    top: 35vh;
    background: url('../../assets/images/login_form.png') no-repeat;
    background-size: cover;
  }

  h1 {
    color: white;
    font-size: 40px;
  }

  h2 {
    color: white;
    font-size: 30px;
    margin: 20px 0;
  }

  .login_btn {
    width: 100%;
  }
}
</style>