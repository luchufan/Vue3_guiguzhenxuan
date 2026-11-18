<template>
  <div class="sex-container">
    <div class="title">
      <p>性别比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="contant">
      <div class="man">
        <img src="../../images/man.png" alt="">
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="">
      </div>
    </div>
    <div class="rate">
      <p>男士占50%</p>
      <p>女士占50%</p>
    </div>
    <div class="charts" ref="chartsRef"></div>
  </div>
</template>

<script setup lang="ts">
//引入echarts
import * as echarts from 'echarts'
// import { text } from 'stream/consumers';
import { onMounted, ref } from 'vue';

const chartsRef = ref()

onMounted(() => {
  let mycharts = echarts.init(chartsRef.value)
  mycharts.setOption({
    title: {
      text: '男女比例',
      textStyle: {
        color: 'white'
      }
    },
    xAxis: {
      // type: 'category',
      show: false,//隐藏x坐标
      min: 0,//x轴的最大值设置
      max: 100
    },
    yAxis: {
      type: 'category',//
      show: false//隐藏y坐标
    },
    series: [{
      type: 'bar',
      data: [50],
      barWidth: 20,//设置柱状条宽度
      z: 3,//层级关系，默认是2
      itemStyle: {
        color: '#007AFE',
        borderRadius: 20,//设置柱状条圆角
      },

    },
    {
      type: 'bar',
      data: [100],
      barWidth: 20,
      barGap: '-100%',//设置女士那行并行

      itemStyle: {
        color: "#FF4B7A",
        borderRadius: 20,
      },

    }
    ],

    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  })
})


</script>

<style scoped lang="scss">
.sex-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;

  .title {
    flex: 0 0 auto;
    color: white;
    font-size: 20px;
    margin-left: 10px;
  }

  .contant {
    display: flex;
    flex: 0 0 auto;
    justify-content: space-evenly;
    padding-top: 15px;

    .man {
      background: url(../../images/man-bg.png);
      width: 111px;
      height: 115px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 60px;
        height: 60px;
      }
    }

    .woman {
      background: url(../../images/woman-bg.png);
      width: 111px;
      height: 115px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 60px;
        height: 60px;
      }
    }
  }

  .rate {
    display: flex;
    flex: 0 0 auto;
    justify-content: space-evenly;
    color: white;
    font-size: 18px;
    margin-top: 5px;
  }

  .charts {
    width: 80%;
    flex: 1 1 auto;
    min-height: 0;
    height: auto;
    margin: 0 auto;
  }
}
</style>