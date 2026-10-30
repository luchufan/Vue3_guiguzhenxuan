<template>
  <!-- 侧边栏导航栏 -->
  <div class="layout-silder" :class="{ fold: foldMenu }">
    <div class="logo">
      <img src="../../public/favicon.ico">
      <div>商品会后台</div>
    </div>
    <!-- element滚动组件 -->
    <el-scrollbar class="scrollbar">
      <el-menu active-text-color="#ffd04b" background-color="#001529" text-color="#fff" :default-active="$route.path"
        :collapse="foldMenu">
        <Menu :menuList="userInfoStore.menuRouters"></Menu>
      </el-menu>
    </el-scrollbar>
  </div>
  <!-- 顶部导航 -->
  <div class="layout-topbar" :class="{ fold: foldMenu }">
    <Tabbar></Tabbar>
  </div>

  <!-- 内容区 -->
  <div class="layout-container" :class="{ fold: foldMenu }" v-if="reFlash">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
// 引入菜单组件
import Menu from './menu/index.vue'
//引入tabbar组件
import Tabbar from './tabbar/index.vue'
import { useRoute } from 'vue-router';
import { userInfo } from '@/stores/userInfo.ts';
import { home } from '@/stores/home.ts';

let userInfoStore = userInfo()
const homeStore = home()
const $route = useRoute()
// 是否折叠菜单
let foldMenu = computed(() => {
  return homeStore.$state.collapseMenu
})


let reFlash = ref(true)
watch(() => homeStore.$state.reFlash, () => {
  reFlash.value = false
  nextTick(() => {
    reFlash.value = true
    console.log('shuaxin');

  })
})
</script>

<style scoped lang="scss">
// 侧边栏导航栏
.layout-silder {
  width: $layout-menu-width;
  height: 100vh;
  color: white;
  background-color: $layout-menu-background-color;
  padding: 20px;
  overflow: hidden;
  transition: all 0.3s;

  // 侧边栏导航栏同时又.layout-silder和.fold这两个类时，导航栏宽度变为80px
  &.fold {
    width: $layout-menu-fold-width;
  }

  .logo {
    height: 45px;
    width: 100%;
    display: flex;
    margin-left: 8px;
    font-size: 25px;
    align-items: center;

    img {
      height: 50px;
      margin-right: 10px;
    }

    // 防止文字换行
    div {
      white-space: nowrap;
    }
  }

  .scrollbar {
    width: 100%;
    height: calc(100vh - 90px);

    .el-menu {
      border-right: none;
    }
  }
}



// 顶部导航栏
.layout-topbar {
  position: fixed;
  top: 0;
  left: $layout-menu-width;
  width: calc(100vw - $layout-menu-width);
  height: $layout-top-height;
  padding: 10px;
  transition: all 0.3s;

  // 顶部导航栏同时又.layout-topbar和.fold这两个类时，顶部导航栏宽度变为80px，在视口左边80px的位置
  &.fold {
    width: calc(100vw - $layout-menu-fold-width);
    left: $layout-menu-fold-width;
  }
}

// 内容区
.layout-container {
  position: absolute;
  width: calc(100vw - $layout-menu-width);
  height: calc(100vh - $layout-top-height);
  left: $layout-menu-width;
  top: $layout-top-height;
  overflow: auto;
  padding: 20px;
  border-top: 1px solid gray;
  transition: all .3s;

  // 内容区同时又.layout-topbar和.fold这两个类时，内容区宽度变为80px，在视口左边80px的位置
  &.fold {
    width: calc(100vw - $layout-menu-fold-width);
    left: $layout-menu-fold-width;
  }
}

//layout路由下的子路由加载动画
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>