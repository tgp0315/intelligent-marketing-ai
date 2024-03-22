// 功能区
<template>
  <div class="functionalDomain">
    <tabs :tab-list="tabList" />
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/tabs/index.vue'
import dialogue from './dialogue.vue'
import addressBook from './addressBook.vue'
import group from './group.vue'
const tabList = [
  {
    key: 'huihua',
    label: '常用功能',
    component: dialogue
  },
  {
    key: 'tongxunlu',
    label: '客户信息',
    component: addressBook
  },
  {
    key: 'qunzu',
    label: '群组营销',
    component: group
  }
]
</script>

<style lang="scss">
.functionalDomain {
  width: 415px;
  background: #fff;

  .el-tabs__item {
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;
    margin-left: 22px;
  }
}
</style>
