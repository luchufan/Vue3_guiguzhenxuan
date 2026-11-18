<<template>
  <div>
    <el-card>
      <div class="home-container">
        <img :src="userInfoStore.userInfo.avatar" alt="用户图片">
        <div class="hello">{{ time() }}好{{ userInfoStore.userInfo.name }}
        </div>
      </div>
    </el-card>
    <SvgIcons name="welcome" width="600" height="600" style="text-align: center;"></SvgIcons>
  </div>
</template>


  <script setup lang="ts">

  import { userInfo } from '@/stores/userInfo';
  import time from '@/utils/time';
  import SvgIcons from '@/components/SvgIcons.vue';
  const userInfoStore = userInfo()
  console.log(userInfoStore.userInfo);

</script>


  <style scoped>
  .home-container {
    display: flex;

    img {
      border-radius: 50%;
      height: 150px;
      width: 150px;
      margin-right: 20px;
    }

    .hello {
      font-size: 20px;
      font-weight: 600;
      line-height: 150px;
    }
  }
</style>