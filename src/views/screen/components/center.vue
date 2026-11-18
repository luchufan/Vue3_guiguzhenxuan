<template>
  <div class="center-container">
    <Map class="map"></Map>
    <TouristTrend class="trend"></TouristTrend>
  </div>
</template>

<script setup lang="ts">
import Map from './map/index.vue'
import TouristTrend from './tourist-trend.vue'
</script>

<style scoped lang="scss">
.center-container {
  width: 98%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .map {
    flex: 0 0 700px;
  }

  .trend {
    flex: 1;
    min-height: 0;

    margin: 0 10px;
  }
}
</style>