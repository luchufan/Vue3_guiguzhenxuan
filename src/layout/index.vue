<template>
  <!-- 侧边栏导航栏 -->
  <div class="layout-silder">
    <div class="logo">
      <img src="../../public/favicon.ico">
      <div>商品会后台</div>
    </div>
    <el-scrollbar height="400px">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </el-scrollbar>
  </div>
  <!-- 顶部面包屑 -->
  <div class="layout-topbar">
    123
  </div>

  <!-- 内容区 -->
  <div class="layout-container">
    <p>123</p>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
// 侧边栏导航栏
.layout-silder {
  width: $layout-menu-width;
  height: 100vh;
  color: white;
  background-color: $layout-menu-background-color;
  padding: 20px;

  .logo {
    height: 50px;
    width: 100%;
    display: flex;
    font-size: 25px;
    align-items: center;

    img {
      height: 50px;
      margin-right: 10px;
    }
  }
}

// 顶部面包屑
.layout-topbar {
  position: fixed;
  top: 0;
  left: $layout-menu-width;
  width: calc(100vw - $layout-menu-width);
  height: $layout-top-height;
  background-color: skyblue;
  padding: 20px;
}

// 内容区
.layout-container {
  position: absolute;
  width: calc(100vw - $layout-menu-width);
  height: calc(100vh - $layout-top-height);
  left: $layout-menu-width;
  top: $layout-top-height;
  background-color: green;
  overflow: auto;
  padding: 20px;

  p {
    height: 10000px;
  }
}
</style>