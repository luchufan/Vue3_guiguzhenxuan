<template>
  <!-- element菜单组件 -->
  <template v-for="item in props.menuList" :index="item.path">
    <!-- 没有子路由时展示 -->
    <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path" @click="goRouter">
      <el-icon>
        <!-- 动态加载那个组件 -->
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 只有一个子路由时展示 -->
    <el-menu-item v-if="item.children && item.children.length == 1 && !item.children[0].meta.hidden"
      :index="item.children[0].path" @click="goRouter">
      <el-icon>
        <!-- 动态加载那个组件 -->
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 至少有两个子路由时展示 -->
    <el-sub-menu v-if="item.children && item.children.length > 1 && !item.meta.hidden" :index="item.path">
      <template #title>
        <el-icon>
          <!-- 动态加载那个组件 -->
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const $router = useRouter()
const goRouter = (vc: any) => {
  console.log(vc);

  $router.push(vc.index)
}

const props = defineProps(['menuList'])
</script>

<script lang="ts">
export default {
  name: 'Menu'
}
</script>

<style scoped></style>