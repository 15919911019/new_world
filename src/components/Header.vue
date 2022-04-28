<template>
  <div class="header">
    <div class="logo">
      <el-image style="width: 50px; height: 50px" :src="url" />
      <h1>管理系统</h1>
    </div>
    <div class="login"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
  data() {
    return {
      url: "https://t7.baidu.com/it/u=3841143302,78496789&fm=74&app=80&size=f256,256&n=0&f=PNG?sec=1650646800&t=0022574f37df9131b95effe029d5640b",
    };
  },
});
</script>

<style lang="scss">
.header {
  height: 60px;
  display: flex;
  align-items: center;

  .logo {
    display: flex;
    width: 200px;
    background: #545c64;
    color: white;
    el-image {
      display: flex;
      justify-content: space-around;
    }

    h1 {
      color: black;
      margin: 0px 20px;
    }
  }

  .login {
    background: red;
  }
}
</style>