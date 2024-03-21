<template>
  <div class="workbench">
    <tabs
      class="message_tabs"
      :tab-list="tabList"
    />
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/tabs/index.vue'
import dialogue from './components/dialogue.vue'
const tabList = [
  {
    key: 'huihua',
    label: '会话',
    component: dialogue
  },
  {
    key: 'tongxunlu',
    label: '通讯录',
    component: dialogue
  },
  {
    key: 'qunzu',
    label: '群组',
    component: dialogue
  }
]
</script>

<style lang="scss">
.workbench {
  flex: 1;
  display: flex;
  background: #f7f8fa;

  .message_tabs {
    width: 340px;
    border: 1px solid #e8e8e8;

    .el-tabs__item {
      // width: 112px;
      margin-left: 38px;
      &.is-active {
        font-weight: 600;
      }
    }
  }
}
</style>
