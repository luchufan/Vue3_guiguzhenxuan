<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { reqLogin, reqUserInfo } from './api/user';

import { onMounted } from 'vue';
onMounted(() => {
  // reqUserInfo().then(res => {
  //   console.log('111', res.data);

  // })
  // reqLogin({
  //   username: 'admin',
  //   password: '111111'
  // }).then(res => {
  //   console.log(res.data);
  // })
})
</script>

<style scoped lang="scss"></style>