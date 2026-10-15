<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="prefix + name" :fill="fill"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  //前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  //父组件通过props传入svg图标名
  name: {
    type: String
  },
  //父组件通过props传入颜色
  fill: {
    type: String
  },
  //父组件通过props传入的高和宽
  width: {
    type: String,
    default: '16px'
  },
  height: {
    type: String,
    default: '16px'
  }
})


</script>

<style scoped></style>