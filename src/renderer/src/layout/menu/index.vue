<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>
        Navigator Two
      </template>
    </el-menu-item>
    <el-menu-item
      index="3"
    >
      <el-icon><document /></el-icon>
      <template #title>
        Navigator Three
      </template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>
        Navigator Four
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMenuStore } from '@/store/module/menu';
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
// const isCollapse = ref(true)
const store = useMenuStore()

const { isCollapse } = storeToRefs(store)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss">
.menu {
  width: 204px;
  height: 100%;
  background: linear-gradient(180deg, #81affe 0%, #5691fe 16%, #1b68ff 100%);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
