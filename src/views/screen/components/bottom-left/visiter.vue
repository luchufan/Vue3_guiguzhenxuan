<template>
  <div class="visiter-container">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>99999人</span></p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts">
      123
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
//引入echarts
import * as echarts from 'echarts'
//引入水晶球
import 'echarts6-liquidfill'
const people = ref('215908人')
const charts = ref()
// console.log(echarts);
onMounted(() => {
  let mycharts = echarts.init(charts.value)
  // charts.value
  // console.log(mycharts);
  mycharts.setOption({

    series: [{
      type: 'liquidFill',
      radius: '75%',                    // 稍微调小一点，给边框和阴影留出空间
      center: ['50%', '50%'],

      // 1. 多层波浪，制造流动的层次感
      data: [
        0.62,                           // 主水位
        0.55,                           // 第二层波浪
        0.48,                           // 第三层波浪
        0.42                            // 第四层，增加深度
      ],

      // 2. 波浪颜色：使用渐变替代纯色，更有质感
      color: [
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#38B8FF' },   // 顶部浅蓝
          { offset: 1, color: '#1E5EFF' }    // 底部深蓝
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#5AD8FF' },
          { offset: 1, color: '#2A7BFF' }
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#87E5FF' },
          { offset: 1, color: '#4A9EFF' }
        ]),
        'rgba(100, 180, 255, 0.3)'       // 最底层用半透明色，增加纵深感
      ],

      // 3. 波浪动态：让流动更自然
      waveAnimation: true,
      animationDuration: 2000,
      animationDurationUpdate: 1000,
      waveLength: '80%',                // 波长，让波浪更舒展
      waveHeight: '15',                 // 波高，适当降低显得更柔和
      amplitude: 8,                     // 振幅，适度让水面微微起伏

      // 4. 外轮廓与背景边框：打造精致感
      outline: {
        show: true,
        borderDistance: 6,              // 外圈与球体的间距
        itemStyle: {
          borderColor: '#4FC3F7',       // 外圈颜色，与波浪呼应
          borderWidth: 2,
          shadowColor: 'rgba(79, 195, 247, 0.6)',
          shadowBlur: 15                // 外圈光晕，非常提气
        }
      },
      backgroundStyle: {
        color: 'rgba(10, 30, 60, 0.6)', // 球体内部底色，深色显质感
        borderWidth: 1,
        borderColor: 'rgba(79, 195, 247, 0.3)',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 20
      },

      // 5. 中心文字：用富文本让信息层级分明
      label: {
        show: true,
        formatter: `{a|实时游客}\n{b|${people.value}}`, // 富文本模板，上标题下数值
        rich: {
          a: {
            fontSize: 14,
            color: '#A0D8FF',
            fontWeight: 400,
            lineHeight: 24
          },
          b: {
            fontSize: 32,
            color: '#FFFFFF',
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 150, 255, 0.8)',
            textShadowBlur: 10         // 文字发光，大屏上很醒目
          }
        }
      },

      // 6. 文字颜色随水位变化（关键细节）
      insideColor: '#FFFFFF',           // 水波浸没部分的文字颜色
      // 注意：ECharts 5+ 中 label.color 控制水波上方文字颜色，insideColor 控制水波下方
    }]
  })
})


</script>

<style scoped lang="scss">
.visiter-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;

  .top {
    flex: 0 0 auto;

    .title {
      color: white;
      font-size: 20px;
      margin-left: 10px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-left: 10px;
      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 20px;
    }
  }

  .number {
    display: flex;
    flex: 0 0 auto;
    margin-top: 10px;
    padding: 0 15px;

    span {
      flex: 1;
      height: 50px;
      font-size: 24px;
      text-align: center;
      line-height: 50px;
      background: url(../../images/total.png) no-repeat;
      background-size: cover;
      color: white;
    }
  }

  .charts {
    width: 100%;
    flex: 1 1 auto;
    min-height: 0;
    height: auto;
  }
}
</style>