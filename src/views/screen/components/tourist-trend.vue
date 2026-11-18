<template>
  <div class="trend-container">
    <div class="title">
      <p>游客趋势</p>
      <img src="../images/dataScreen-title.png" alt="">
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
      backgroundColor: 'rgba(8, 24, 48, 0.9)',
      borderColor: '#29fcff',
      textStyle: {
        color: '#ffffff'
      }
    },
    legend: {
      top: 0,
      right: 10,
      itemWidth: 14,
      itemHeight: 8,
      textStyle: {
        color: '#d9f7ff',
        fontSize: 12
      }
    },
    grid: {
      left: 55,
      right: 30,
      top: 40,
      bottom: 30
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
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
        name: '入园游客',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: [32, 28, 45, 52, 61, 70, 86, 78],
        lineStyle: {
          width: 3,
          color: '#29fcff'
        },
        itemStyle: {
          color: '#29fcff'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(41, 252, 255, 0.45)' },
            { offset: 1, color: 'rgba(41, 252, 255, 0)' }
          ])
        }
      },
      {
        name: '预约游客',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: [24, 22, 36, 43, 55, 64, 72, 69],
        lineStyle: {
          width: 3,
          color: '#ffb457'
        },
        itemStyle: {
          color: '#ffb457'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255, 180, 87, 0.35)' },
            { offset: 1, color: 'rgba(255, 180, 87, 0)' }
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
.trend-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 20px 0;
  background: url(../images/dataScreen-main-cb.png) no-repeat;
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
