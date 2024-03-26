// 功能区
<template>
  <div class="functionalDomain">
    <tabs :tab-list="tabList" />
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/tabs/index.vue'
import frequently from './frequently.vue'
import CustomerInfo from './customerInfo.vue'
import group from './group.vue'
import type { Component } from 'vue'
interface TabList {
  key: string
  label: string
  component: string | Component
}
const tabList: TabList[] = [
  {
    key: 'huihua',
    label: '常用功能',
    component: frequently
  },
  {
    key: 'tongxunlu',
    label: '客户信息',
    component: CustomerInfo
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
  width: 400px;
  background: #fff;
  height: 100%;

  .el-tabs {
    height: 100%;
    width: 100%;
  }

  .el-tabs__item {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    margin-left: 26px;
  }

  .el-tabs__nav-wrap.is-scrollable {
    padding: 0 19px;
  }

  .el-tabs__header {
    height: 60px;
  }

  .el-tabs__item {
    height: 60px;
  }
}
</style>
