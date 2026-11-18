<template>
  <div class="annual-container">
    <div class="title">
      <p>年度游客量对比</p>
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
    legend: {
      top: 0,
      right: 10,
      itemWidth: 12,
      itemHeight: 8,
      textStyle: {
        color: '#d9f7ff',
        fontSize: 12
      }
    },
    grid: {
      left: 45,
      right: 20,
      top: 40,
      bottom: 25
    },
    xAxis: {
      type: 'category',
      data: ['一季度', '二季度', '三季度', '四季度'],
      axisLine: {
        lineStyle: {
          color: 'rgba(41, 252, 255, 0.35)'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#a0d8ff',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      name: '万人次',
      nameTextStyle: {
        color: '#a0d8ff',
        fontSize: 12
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
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
    series: [
      {
        name: '2023年',
        type: 'bar',
        barWidth: 14,
        data: [62, 78, 91, 70],
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#29fcff' },
            { offset: 1, color: '#1261d6' }
          ])
        }
      },
      {
        name: '2024年',
        type: 'bar',
        barWidth: 14,
        data: [75, 88, 106, 84],
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#5b8cff' },
            { offset: 1, color: '#2546c4' }
          ])
        }
      },
      {
        name: '2025年',
        type: 'bar',
        barWidth: 14,
        data: [88, 102, 125, 96],
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#ffd166' },
            { offset: 1, color: '#f0782c' }
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
.annual-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 10px 0;
  background: url(../../images/dataScreen-main-rc.png) no-repeat;
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
