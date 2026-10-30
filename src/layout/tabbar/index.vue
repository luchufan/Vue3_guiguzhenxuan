<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <el-icon @click="collapseMenu" v-if="!homeStore.$state.collapseMenu">
        <Expand />
      </el-icon>
      <el-icon @click="showMenu" v-if="homeStore.$state.collapseMenu">
        <Fold />
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in $route.matched" :to="{ path: item.path }" :index="item.path"
          v-show="item.meta.title">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          {{ item.meta.title }}

        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar-right">
      <!-- 刷新按钮 -->
      <el-button icon="Refresh" circle @click="reFlash"></el-button>
      <!-- 全屏按钮 -->
      <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
      <!-- 设置按钮 -->
      <el-button icon="Setting" circle></el-button>
      <!-- 用户头像 -->
      <img :src="userInfoStore.$state.userInfo.avatar" style="width: 30px; height: 30px;">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfoStore.$state.userInfo.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

</template>

<script setup lang="ts">
import { home } from '@/stores/home';
import { userInfo } from '@/stores/userInfo';
// import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
const homeStore = home()
const userInfoStore = userInfo()
const $router = useRouter()
// 折叠菜单栏
const collapseMenu = () => {
  homeStore.collapseMenu()
}
// 展开菜单栏
const showMenu = () => {
  homeStore.showMenu()
}
//获取路由
const $route = useRoute()
//每次点刷新都会改变homeStore.$state.reFlash的状态
const reFlash = () => {
  homeStore.$state.reFlash = !homeStore.$state.reFlash
}
//全屏模式切换
const fullScreen = () => {
  //获取当前是否是全屏模式，不是则返回 null，是则返回 fullscreen
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
//退出登录
const logout = async () => {
  try {
    await userInfoStore.getUserLogout()
    // localStorage.removeItem('TOKEN')
    // userInfoStore.$state.token = ''
    // userInfoStore.$state.userInfo = {}
    ElNotification({
      type: 'success',
      message: '退出登录成功',
      duration: 1500,
      progress: true,
    })
    $router.push('/login')
  } catch (error: any) {
    console.log(error);

    // ElNotification({
    //   type: 'Error',
    //   message: '退出登录失败',
    //   title: error.message,
    //   duration: 1500,
    //   progress: true,
    // })
  }



}
//使用userInfoStore中的getUserInfo获取用户信息
// onBeforeMount(() => {
//   userInfoStore.getUserInfo()
// })
</script>

<style scoped>
.tabbar {
  height: 100%;
  width: 100%;
  display: flex;
  font-size: 18px;
  justify-content: space-between;

  .tabbar-left {
    display: flex;
    align-items: center;

    .el-breadcrumb {
      margin-left: 10px;
    }
  }

  .tabbar-right {
    display: flex;
    align-items: center;

    img {
      margin: 0 12px;
      border-radius: 50%;
    }
  }
}
</style>