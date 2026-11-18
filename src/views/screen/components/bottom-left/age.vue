<template>
  <div class="age-container">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="charts" ref="chartsRef"></div>
  </div>
</template>

<script setup lang="ts">

import * as echarts from 'echarts'
import { onMounted, ref } from 'vue';

onMounted(() => {
  let mycharts = echarts.init(chartsRef.value)
  mycharts.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '15%',
      right: '40',
      orient: 'vertical',//图例组件的排序方向
      textStyle: {
        color: 'white'
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',

        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          text: '10',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          textStyle: {
            color: 'white',
            fontSize: 10
          }
          // formatter: '{b}'
        },
        // emphasis: {//鼠标放在图标上文字放大
        //   label: {
        //     show: true,
        //     fontSize: 20,
        //     fontWeight: 'bold'
        //   }
        // },
        labelLine: {
          show: false
        },
        data: [
          { value: 400, name: '0-10岁' },
          { value: 500, name: '11-20岁' },
          { value: 700, name: '21-30岁' },
          { value: 650, name: '31-40岁' },
          { value: 300, name: '41-50岁' },
          { value: 100, name: '51-60岁' },
        ]
      }
    ],
    grid: {//调整图形图标位置
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  })
})

const chartsRef = ref()
</script>

<style scoped lang="scss">
.age-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;

  .title {
    flex: 0 0 auto;
    color: white;
    font-size: 20px;
    margin-left: 10px;
  }

  .charts {
    width: 100%;
    flex: 1 1 auto;
    min-height: 0;
    height: auto;
  }
}
</style>