<template>
  <div class="ranking-container">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="charts" ref="chartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref<HTMLDivElement | null>(null)
let chart: ReturnType<typeof echarts.init> | null = null

onMounted(() => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  chart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(8, 24, 48, 0.9)',
      borderColor: '#29fcff',
      textStyle: {
        color: '#ffffff'
      }
    },
    grid: {
      left: 110,
      right: 55,
      top: 10,
      bottom: 10
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: '#a0d8ff',
        fontSize: 12
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(41, 252, 255, 0.12)'
        }
      }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: ['故宫博物院', '西湖风景区', '黄山风景区', '张家界森林公园', '八达岭长城', '九寨沟景区'],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#ffffff',
        fontSize: 13
      }
    },
    series: [
      {
        name: '游客量',
        type: 'bar',
        data: [96, 88, 76, 68, 61, 54],
        barWidth: 12,
        label: {
          show: true,
          position: 'right',
          color: '#29fcff',
          fontSize: 12,
          formatter: '{c}万'
        },
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#1261d6' },
            { offset: 1, color: '#29fcff' }
          ])
        }
      }
    ]
  })
})

onBeforeUnmount(() => {
  chart?.dispose()
  chart = null
})
</script>

<style scoped lang="scss">
.ranking-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 10px 0;
  background: url(../../images/dataScreen-main-rt.png) no-repeat;
  background-size: 100% 100%;

  .title {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #ffffff;
    font-size: 20px;

    p {
      margin: 0;
    }

    img {
      width: 68px;
      height: 7px;
    }
  }

  .charts {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>
