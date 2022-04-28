<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    router
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><platform /></el-icon>
        <span>设备管理</span>
      </template>
      <el-menu-item index="/">设备信息</el-menu-item>
      <el-menu-item index="/device/unit">运行单元</el-menu-item>
      <el-menu-item index="/device/site">站点信息</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><copyDocument /></el-icon>
        <span>模型数据</span>
      </template>
      <el-menu-item index="/model/image">照片采集</el-menu-item>
      <el-menu-item index="/model/drill">模型训练</el-menu-item>
      <el-menu-item index="/model/list">模型列表</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/farmer">
      <el-icon><icon-menu /></el-icon>
      <span>农户信息</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <el-icon><avatar /></el-icon>
      <span>用户信息</span>
    </el-menu-item>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>基础数据</span>
      </template>
      <el-menu-item index="/basedata/area">地区管理</el-menu-item>
      <el-menu-item index="/basedata/price">价格信息</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  Menu as IconMenu,
  Platform,
  Setting,
  Avatar,
  CopyDocument,
} from "@element-plus/icons-vue";

export default defineComponent({
  name: "MenuList",
  components: {
    IconMenu,
    Platform,
    Setting,
    Avatar,
    CopyDocument,
  },
});

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
</style>
