<template>
  <el-scrollbar class="scrollabar">
    <!-- element菜单组件 -->
    <el-menu active-text-color="#ffd04b" background-color="$layout-menu-background-color" text-color="#fff">
      <template v-for="item in props.menuList">
        <!-- 没有子路由时展示 -->
        <el-menu-item v-if="!item.children" :index="item.path">
          <template #title>
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
        <!-- 只有一个子路由时展示 -->
        <el-menu-item v-if="item.children && item.children.length == 1" :index="item.children[0].path">
          <template #title>
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
        <!-- 至少有两个子路由时展示 -->
        <!-- <el-sub-menu v-if="item.children.length > 1" :index="item.children.path"> -->
        <el-sub-menu v-else>
          <template #title>
            <el-icon>
              <Lock />
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
      </template>


      <!-- 折叠菜单 -->
      <!-- <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <Lock />
          </el-icon>
          <span>权限管理</span>
        </template>
        <el-menu-item index="3-1">用户管理</el-menu-item>
        <el-menu-item index="3-2">角色管理</el-menu-item>
        <el-menu-item index="3-3">菜单管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon>
            <ShoppingCartFull />
          </el-icon>
          <span>商品管理</span>
        </template>
        <el-menu-item index="4-1">item one</el-menu-item>
        <el-menu-item index="4-2">item two</el-menu-item>
        <el-menu-item index="4-3">item three</el-menu-item>
      </el-sub-menu> -->
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
// element图标
import {
  ShoppingCartFull,
  DataLine,
  HomeFilled,
  Lock
} from '@element-plus/icons-vue'

const props = defineProps(['menuList'])
console.log(props.menuList);
console.log(props.menuList);

</script>

<script lang="ts">
export default {
  name: 'Menu'
}
</script>

<style scoped></style>