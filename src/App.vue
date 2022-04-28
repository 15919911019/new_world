<template>
  <div id="home">
    <el-container>
      <!-- 头部区 -->
      <el-header> <Header /> </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <MenuList />
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MenuList from "@/components/Menu.vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "AppMain",
  components: {
    MenuList,
    Header,
  },
});
</script>


<style lang="scss">
html,
body,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
  height: 100%;
}

#home {
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-header {
  color: #333;
  margin: 0px -20px 0px -20px;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 100%;
}

.el-main {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 100%;
}
</style>
