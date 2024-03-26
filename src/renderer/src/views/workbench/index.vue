<template>
  <div class="workbench">
    <tabs
      class="message_tabs"
      :tab-list="tabList"
    />
    <div class="chat">对话区</div>
    <FunctionalDomain />
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/tabs/index.vue'
import dialogue from './components/dialogue.vue'
import addressBook from './components/addressBook.vue'
import group from './components/group.vue'
import FunctionalDomain from './components/functionalDomain.vue'
import { Component } from 'vue'
interface TabList {
  key: string
  label: string
  component: Component | string
}
const tabList: TabList[] = [
  {
    key: 'huihua',
    label: '会话',
    component: dialogue
  },
  {
    key: 'tongxunlu',
    label: '通讯录',
    component: addressBook
  },
  {
    key: 'qunzu',
    label: '群组',
    component: group
  }
]
</script>

<style lang="scss">
.workbench {
  flex: 1;
  display: flex;
  background: #f7f8fa;
  height: calc(100vh - 60px);

  .message_tabs {
    width: 320px;
    height: 100%;
    border: 1px solid #e8e8e8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;

    .el-tabs__item {
      // width: 112px;
      margin-left: 35px;
      &.is-active {
        font-weight: 600;
      }
    }
  }
  .chat {
    flex: 1;
  }
}
</style>
