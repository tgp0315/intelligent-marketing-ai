<script setup lang="ts">
console.log(import.meta.env)
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
