<template>
  <div class="home">
      <img width="500" src="@/assets/logo02.png" alt="">
      <h1 class="theme_color_01">一个简洁的后台结构</h1>
      <span>Vue3.0 + Ts + Antd + axios</span>
      <div class="github">
          <a target="_blank" href="https://github.com/Bulingbuling1314/vue-note-web">点我去获取源码</a>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({})
</script>

<style lang="scss" scoped>
.home {
    text-align: center;
    h1 {
        font-size: 32px;
    }
    .github {
        margin-top: 20px;
    }
}
</style>