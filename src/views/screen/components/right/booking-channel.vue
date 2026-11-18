<template>
  <div class="channel-container">
    <div class="title">
      <p>预约渠道数据统计</p>
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
      trigger: 'item',
      backgroundColor: 'rgba(8, 24, 48, 0.9)',
      borderColor: '#29fcff',
      textStyle: {
        color: '#ffffff'
      },
      formatter: '{b}: {c}万 ({d}%)'
    },
    legend: {
      bottom: 0,
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#d9f7ff',
        fontSize: 12
      }
    },
    series: [
      {
        name: '预约渠道',
        type: 'pie',
        radius: ['38%', '68%'],
        center: ['50%', '46%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
          borderColor: 'rgba(8, 24, 48, 0.8)',
          borderWidth: 2
        },
        label: {
          show: true,
          color: '#ffffff',
          fontSize: 12,
          formatter: '{b}\n{d}%'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(41, 252, 255, 0.5)'
          }
        },
        data: [
          { value: 15.8, name: '微信小程序' },
          { value: 10.6, name: '官方网站' },
          { value: 6.4, name: '旅行社' },
          { value: 3.8, name: '现场窗口' },
          { value: 2, name: '其他渠道' }
        ],
        color: ['#29fcff', '#3b82f6', '#ffb457', '#a855f7', '#22c55e']
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
.channel-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 10px 0;
  background: url(../../images/dataScreen-main-rb.png) no-repeat;
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
