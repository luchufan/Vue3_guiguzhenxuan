<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">左侧占位</el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>商品会后台</h2>
          <!-- 账号输入框 -->
          <el-form-item>
            <el-input v-model="loginInfo.username" :prefix-icon="User" />
          </el-form-item>
          <!-- 密码输入框 -->
          <el-form-item>
            <el-input v-model="loginInfo.password" type="password" show-password :prefix-icon="Lock" />
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button type="primary" class="login_btn" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { User, Lock } from '@element-plus/icons-vue'
import { userInfo } from '@/stores/userInfo'
let loginInfo = reactive({
  username: 'admin',
  password: '111111'
})
const uersStore = userInfo()
function login() {
  uersStore.getUserToken(loginInfo)
}
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