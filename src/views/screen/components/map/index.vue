<template>
  <div class="map-container" ref="mapRef"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import chinaJSON from './china.json';

const mapRef = ref<HTMLDivElement | null>(null)
let chart: ReturnType<typeof echarts.init> | null = null

echarts.registerMap('china', chinaJSON as any)

onMounted(() => {
  if (!mapRef.value) return
  chart = echarts.init(mapRef.value)
  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(8, 24, 48, 0.92)',
      borderColor: '#29fcff',
      borderWidth: 1,
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      },
      formatter: '{b}'
    },
    geo: {
      map: 'china',
      roam: true,
      left: 120,
      top: 90,
      right: 120,
      bottom: 20,
      zoom: 1.1,
      label: {
        show: true,
        color: 'rgba(214, 244, 255, 0.78)',
        fontSize: 11,
        textShadowColor: 'rgba(3, 12, 32, 0.9)',
        textShadowBlur: 6
      },
      itemStyle: {
        areaColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(24, 92, 178, 0.92)' },
          { offset: 0.55, color: 'rgba(12, 48, 108, 0.94)' },
          { offset: 1, color: 'rgba(4, 20, 52, 0.96)' }
        ]),
        borderColor: 'rgba(41, 252, 255, 0.55)',
        borderWidth: 1,
        shadowColor: 'rgba(0, 170, 255, 0.35)',
        shadowBlur: 18,
        shadowOffsetY: 8
      },
      emphasis: {
        itemStyle: {
          areaColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(41, 252, 255, 0.85)' },
            { offset: 1, color: 'rgba(18, 97, 214, 0.65)' }
          ]),
          borderColor: '#b8ffff',
          borderWidth: 2,
          shadowColor: 'rgba(41, 252, 255, 0.75)',
          shadowBlur: 24
        },
        label: {
          color: '#ffffff',
          fontSize: 13,
          textShadowColor: '#29fcff',
          textShadowBlur: 10
        }
      }
    },
    visualMap: {
      show: false,
      min: 20,
      max: 100,
      seriesIndex: 0,
      inRange: {
        color: ['#0b2d63', '#1467d4', '#29fcff']
      }
    },
    series: [
      {
        type: 'map',
        geoIndex: 0,
        itemStyle: {
          borderColor: 'rgba(41, 252, 255, 0.55)',
          borderWidth: 1,
          shadowColor: 'rgba(0, 170, 255, 0.35)',
          shadowBlur: 18,
          shadowOffsetY: 8
        },
        emphasis: {
          itemStyle: {
            borderColor: '#b8ffff',
            borderWidth: 2,
            shadowColor: 'rgba(41, 252, 255, 0.75)',
            shadowBlur: 24
          },
          label: {
            color: '#ffffff',
            fontSize: 13,
            textShadowColor: '#29fcff',
            textShadowBlur: 10
          }
        },
        data: [
          { name: '北京', value: 92 },
          { name: '上海', value: 88 },
          { name: '浙江', value: 84 },
          { name: '江苏', value: 78 },
          { name: '广东', value: 96 },
          { name: '四川', value: 70 },
          { name: '湖北', value: 66 },
          { name: '福建', value: 62 },
          { name: '陕西', value: 58 },
          { name: '云南', value: 52 }
        ]
      },
      {
        name: '游客航线',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        effect: {
          show: true,
          period: 5,
          trailLength: 0.35,
          symbol: 'circle',
          symbolSize: 5,
          color: '#eaffff'
        },
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(41, 252, 255, 0.15)' },
            { offset: 0.5, color: 'rgba(41, 252, 255, 0.95)' },
            { offset: 1, color: 'rgba(41, 252, 255, 0.15)' }
          ]),
          width: 1.6,
          opacity: 0.85,
          curveness: 0.25
        },
        data: [
          { coords: [[116.405285, 39.904989], [119.306239, 26.075302]] },
          { coords: [[116.405285, 39.904989], [114.298572, 30.584355]] },
          { coords: [[116.405285, 39.904989], [120.15507, 30.274084]] },
          { coords: [[116.405285, 39.904989], [104.066541, 30.572269]] },
          { coords: [[116.405285, 39.904989], [113.264434, 23.129162]] },
          { coords: [[121.473701, 31.230416], [116.405285, 39.904989]] }
        ]
      },
      {
        name: '热门城市',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        data: [
          { name: '北京', value: [116.405285, 39.904989, 92] },
          { name: '福州', value: [119.306239, 26.075302, 62] },
          { name: '武汉', value: [114.298572, 30.584355, 66] },
          { name: '杭州', value: [120.15507, 30.274084, 84] },
          { name: '成都', value: [104.066541, 30.572269, 70] },
          { name: '广州', value: [113.264434, 23.129162, 96] },
          { name: '上海', value: [121.473701, 31.230416, 88] }
        ],
        symbolSize: (value: number[]) => 6 + (value[2] ?? 0) / 18,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 4,
          period: 3
        },
        itemStyle: {
          color: '#29fcff',
          shadowBlur: 16,
          shadowColor: '#29fcff'
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          color: '#d9f7ff',
          fontSize: 12,
          textShadowColor: 'rgba(3, 12, 32, 0.9)',
          textShadowBlur: 6
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
.map-container {
  width: 100%;
  height: 100%;
  background:
    radial-gradient(ellipse at 50% 45%, rgba(41, 252, 255, 0.1), rgba(3, 12, 32, 0) 68%),
    linear-gradient(rgba(41, 252, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(41, 252, 255, 0.03) 1px, transparent 1px);
  background-size: 100% 100%, 44px 44px, 44px 44px;
}
</style>
