<template>
  <div class="workbench">
    <tabs
      class="message_tabs"
      :tab-list="tabList"
    />
    <div
      id="svgBox"
      class="chat"
    >
      <header-com :chat="chat" />
      <chat-win />
      <div class="svgResize" />
      <editor />
    </div>
    <FunctionalDomain />
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/tabs/index.vue'
import dialogue from './components/dialogue.vue'
import addressBook from './components/addressBook.vue'
import group from './components/group.vue'
import FunctionalDomain from './components/functionalDomain.vue'
import HeaderCom from './components/header.vue'
import ChatWin from './components/chatwin.vue'
import Editor from './components/editor.vue'
import { reactive, type Component } from 'vue'
interface TabList {
  key: string
  label: string
  component: Component | string
}
interface Chat {
  type: string
  avatar?: string
  name?: string
  amount?: number
}
// const config = reactive({
//   content: 'Element Plus',
//   font: {
//     fontSize: 16,
//     color: 'rgba(0, 0, 0, 0.15)',
//   },
//   zIndex: 0,
//   rotate: -22,
//   gap: [100, 100] ,
//   offset: [],
// })
const chat = reactive<Chat>({
  type: 'personal',
  avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  name: '张三',
  amount: 100
})
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
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .svgResize {
    position: relative;
    height: 5px;
    width: 100%;
    cursor: row-resize;
    font-size: 12px;
    background: reg(27, 27, 27);
  }
}
</style>
