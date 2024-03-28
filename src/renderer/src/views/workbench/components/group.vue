// 群组
<template>
  <div class="groupMarketing">
    <div class="box">
      <div class="verbaltrick">
        <span class="title">选择客户</span>
      </div>
      <el-table
        v-if="clientList.length"
        :data="clientList"
        style="width: 100%"
        max-height="220"
        :cell-class-name="cellClassName"
      >
        <el-table-column
          type="selection"
          width="30"
        />
        <el-table-column
          type="index"
          class="serial"
          width="50"
        />
        <el-table-column
          prop="account"
          width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="content"
          width="160"
          show-overflow-tooltip
        />
      </el-table>
    </div>
    <div class="box">
      <div class="verbaltrick">
        <span class="title">选择我的账号</span>
      </div>
      <el-table
        v-if="clientList.length"
        :data="clientList"
        style="width: 100%"
        max-height="220"
        :cell-class-name="cellClassName"
      >
        <el-table-column
          type="selection"
          width="30"
        />
        <el-table-column
          type="index"
          class="serial"
          width="50"
        />
        <el-table-column
          prop="account"
          width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="content"
          width="160"
          show-overflow-tooltip
        />
      </el-table>
    </div>
    <div class="box">
      <div class="verbaltrick">
        <span class="title">确定群组名称</span>
      </div>
      <div class="new_chat">
        <el-input
          v-model="confirmName"
          :rows="2"
          placeholder="请输入群组名称"
        />
        <el-button type="primary"> 添加群组 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const confirmName = ref('')
const clientList = reactive([
  {
    id: 1,
    account: '客户账号a',
    content: '客户来源描述'
  },
  {
    id: 1,
    account: '客户账号a',
    content: '客户来源描述'
  },
  {
    id: 1,
    account: '客户账号a',
    content: '客户来源描述'
  },
  {
    id: 1,
    account: '客户账号a',
    content: '客户来源描述'
  },
  {
    id: 1,
    account: '客户账号a',
    content: '客户来源描述'
  },
  {
    id: 1,
    account: '客户账号a',
    content: '客户来源描述'
  },
  {
    id: 1,
    account: '客户账号a',
    content: '客户来源描述'
  }
])

const cellClassName = ({ columnIndex }) => {
  if (columnIndex === 1) {
    return 'serial'
  }
  return ''
}
</script>

<style lang="scss">
.groupMarketing {
  .box {
    padding: 0 20px 20px;
    border-bottom: 1px solid #e8e8e8;

    &.last {
      border: none;
    }
    .verbaltrick {
      padding: 20px 0 0 0;
    }
  }

  .el-table__header-wrapper {
    display: none;
  }
  .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border: none;
  }

  .el-table__inner-wrapper::before {
    height: 0;
  }

  .el-table {
    transform: scale(1);
    transform-origin: 0 0;
    margin-top: 10px;
  }

  .el-tab-pane {
    padding: 0;
  }

  .serial {
    .cell {
      div {
        background: #e8f3ff;
        border-radius: 2px 2px 2px 2px;
        text-align: center;
        font-weight: 500;
        font-size: 12px;
        color: #165dff;
      }
    }
  }

  .title {
    font-weight: 500;
    font-size: 16px;
    color: #1d2129;
    line-height: 24px;
    display: flex;
    align-items: center;

    &::before {
      content: ' ';
      height: 20px;
      padding: 2px;
      background: linear-gradient(180deg, #81affe 0%, #5691fe 16%, #1b68ff 100%);
      border-radius: 99px 99px 99px 99px;
      margin-right: 4px;
    }
  }
  .new_chat {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .el-button--primary {
      margin-left: 20px;
    }
  }

  .el-input__wrapper {
    box-shadow: none;
    background-color: #f2f3f5;
  }
}
</style>
