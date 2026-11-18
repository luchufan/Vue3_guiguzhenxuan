<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <Visiter class="visiter"></Visiter>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">
          <Center></Center>
        </div>
        <div class="right">
          <ScenicRanking class="ranking"></ScenicRanking>
          <AnnualVisitors class="annual"></AnnualVisitors>
          <BookingChannel class="channel"></BookingChannel>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Top from './components/top.vue';

import Visiter from './components/bottom-left/visiter.vue';
import Sex from './components/bottom-left/sex.vue';
import Age from './components/bottom-left/age.vue';

//中间的组件
import Center from './components/center.vue';

import ScenicRanking from './components/right/scenic-ranking.vue';
import AnnualVisitors from './components/right/annual-visitors.vue';
import BookingChannel from './components/right/booking-channel.vue';
// 获取screen的dom元素
const screen = ref()
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

//定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

//视口放大缩小时也要
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    // background-color: red;
    top: 50%;
    left: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;

    }

    .bottom {
      display: flex;

      .left {
        flex: 1;
        height: 1040px;
        // background-color: red;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .visiter,
        .sex,
        .age {
          flex: 1 1 0;
          min-height: 0;
          margin: 0;
        }
      }

      .center {
        flex: 2;
        width: 100%;
        height: 1040px;
      }

      .right {
        flex: 1;
        height: 1040px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding-right: 10px;

        .ranking,
        .annual,
        .channel {
          flex: 1;
          min-height: 0;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
