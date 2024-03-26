<template>
  <el-tabs
    v-model="activeName"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.key"
      :label="item.label"
      :name="item.key"
    >
      <component :is="item.component" />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { Component } from 'vue'
import type { TabsPaneContext } from 'element-plus'
interface Params {
  key: string
  label: string
  component: string | Component
}
interface Props {
  tabList: Params[]
}
const props = defineProps<Props>()
const activeName = ref(props.tabList[0].key)

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style lang="scss">
.demo-tabs {
  .el-tabs__content {
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
    background: #fff;
    flex: 1;
  }

  .el-tabs__header {
    margin: 0;
    background: #fff;
    height: 39px;
  }

  .el-tab-pane {
    height: 100%;
  }
}
</style>
