<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据展示平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间：{{ nowTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
let timer: any = null
const nowTime = ref()
// 抽出来，既能立即执行一次，也能被定时器复用
const updateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  nowTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
//组件挂载完毕后开启获取时间的定时器
onMounted(() => {
  updateTime()               // 挂载瞬间立刻显示，不用等 1 秒
  timer = setInterval(updateTime, 1000)
})
//组件销毁时清除定时器
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

const $router = useRouter()
//返回首页
const goHome = () => {
  $router.push('/home')

}
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;

  .left {
    background: url(../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    flex: 1;

    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background: url(../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
    }
  }

  .center {
    flex: 2;
    // background: url(../images/dataScreen-header-warn-bg.png) no-repeat;
    // background-size: cover;

    .title {
      width: 100%;
      height: 74px;
      background: url(../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 74px;
      font-size: 30px;
      color: #29fcff;
    }
  }

  .right {
    flex: 1;
    background: url(../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;

    .rbtn {
      width: 150px;
      height: 40px;
      background: url(../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;

    }

    .time {
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
      margin-right: 10px;
    }
  }
}
</style>