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
      <!-- {{ item.component }} -->
      <component :is="item.component" />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
interface Params {
  key: string
  label: string
  name: string
  component: string
}
interface Props {
  tabList: Array<Params>
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
  }

  .el-tabs__header {
    margin: 0;
  }
}
</style>
