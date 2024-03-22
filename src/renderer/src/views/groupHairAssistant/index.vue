<template>
  <div class="groupHairAssistant">
    <div class="tabsBackground">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="群发列表"
          name="massMailingList"
        />
        <el-tab-pane
          label="群发任务列表"
          name="taskList"
        />
      </el-tabs>
    </div>

    <div class="backgroundWhite">
      <div class="white">
        <mass-mailing-list v-show="activeName === 'massMailingList'" />
        <task-list v-show="activeName === 'taskList'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import  massMailingList from './components/massMailingList.vue'
import  taskList from './components/taskList.vue'

const activeName = ref('massMailingList')
console.log(activeName);

</script>

<style lang="scss" scoped>
.groupHairAssistant {
  height: 100%;
  background-color: #F7F8FA;
  .tabsBackground {
    width: 100%;
    height: 65px;
    background-color: #fff;
    padding: 12px 20px;
    :deep(.el-tabs__item) {
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      font-size: 16px;
      color: #909194;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    :deep(.el-tabs__nav-wrap::after) {
      background-color: transparent !important;
    }
    :deep(.el-tabs__item.is-active) {
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 16px;
      color: #1966FF;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    :deep(.el-tabs__active-bar) {
      height: 4px;
      background: #1966FF;
      border-radius: 6px;
    }
  }
}

</style>
