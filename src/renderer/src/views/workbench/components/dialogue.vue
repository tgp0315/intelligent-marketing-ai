<template>
  <div class="dialogue">
    <el-input
      v-model="value"
      style="width: 300px"
      placeholder="请输入关键词"
      :suffix-icon="Search"
    />
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const value = ref('')
</script>

<style lang="scss">
.dialogue {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-input {
    margin-top: 10px;
  }

  .el-input__wrapper {
    height: 32px;
    background: #f2f3f5;
    border-radius: 24px 24px 24px 24px;
  }
}
</style>
