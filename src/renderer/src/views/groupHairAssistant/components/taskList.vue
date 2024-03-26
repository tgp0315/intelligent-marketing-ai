<template>
  <div class="taskList">
    <div class="title">查询表格</div>
    <div class="searchForm">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="任务编号">
          <el-input
            v-model="formInline.name"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item label="任务名称">
          <el-input
            v-model="formInline.task"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="formInline.createdTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="defaultTime"
            @change="createTimeList"
          />
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select
            v-model="formInline.state"
            placeholder="请选择"
            style="width: 295px"
          >
            <el-option
              label="进行中"
              value="1"
            />
            <el-option
              label="已停止"
              value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="formLine" />
        </el-form-item>
        <el-form-item style="margin-left: -18px">
          <el-button
            :icon="Search"
            color="#165DFF"
            @click="onSubmit"
          >
            查询
          </el-button>
          <el-button
            style="margin-left: 20px"
            :icon="RefreshRight"
            color="#F2F3F5"
            @click="resettingClick"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="line" />
    <div class="relative">
      <div class="flexEnd">
        <el-button
          color="#F2F3F5"
          @click="onSubmit"
        >
          <svg-icon
            name="startTask"
            :icon-style="{ width: 15, height: 15 }"
          />
          <span
            class="btnFont"
            @click="logOutClick"
            >开始任务</span
          >
        </el-button>
        <el-button
          color="#F2F3F5"
          @click="onSubmit"
        >
          <svg-icon
            name="stopTask"
            :icon-style="{ width: 15, height: 15 }"
          />
          <span
            class="btnFont"
            @click="logInClick"
            >停止任务</span
          >
        </el-button>
        <el-button
          color="#F2F3F5"
          @click="onSubmit"
        >
          <svg-icon
            name="delete"
            :icon-style="{ width: 15, height: 15 }"
          />
          <span
            class="btnFont"
            @click="deleteAccount()"
            >删除</span
          >
        </el-button>
      </div>
      <div style="width: 100%; position: absolute; left: 0px; background: #fff; padding: 20px 0">
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%; margin-bottom: 15px"
          :header-cell-style="{ backgroundColor: '#F2F3F5', color: '#1D2129' }"
          max-height="calc(100vh - 250px)"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="30"
          />
          <el-table-column
            label="任务编号"
            property="taskNumber"
            min-width="50"
          />
          <el-table-column
            property="taskName"
            label="任务名称"
            min-width="100"
          />
          <el-table-column
            property="friendsNum"
            label="会话/通讯录好友数量"
            min-width="100"
          />
          <el-table-column
            property="strangersNum"
            label="陌生人数量"
            min-width="80"
          />
          <el-table-column
            property="createTime"
            label="创建时间"
            min-width="120"
          />
          <el-table-column
            property="state"
            label="状态"
            min-width="80"
          >
            <template #default="scope">
              <div class="flexState">
                <div
                  class="cricle"
                  :style="{ background: scope.row.state === 1 ? '#00B42A' : '#F53F3F' }"
                />
                {{ scope.row.state === 1 ? '进行中' : '已停止' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="120"
          >
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click.prevent="logInClick()"
              >
                {{ scope.row.state === 1 ? '停止任务' : '开始任务' }}
              </el-button>
              <el-button
                link
                type="danger"
                size="small"
                @click.prevent="deleteAccount(scope.row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="flexEnd">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            small
            background
            :teleported="false"
            popper-class="select_bottom"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const currentPage = ref(1)
const pageSize = ref(100)
const total = ref(100)
const formInline = reactive({})
const tableData = ref([
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 1
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 2
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 1
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 2
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 1
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 2
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 1
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 2
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 1
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 2
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 1
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 2
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 1
  },
  {
    taskNumber: 21,
    taskName: '任务名称001',
    friendsNum: 10,
    strangersNum: 8,
    createTime: '2024-03-25 18:32:18',
    state: 2
  }
])
</script>

<style lang="scss" scoped>
.taskList {
  background: #fff;
  height: 100%;
  .title {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #1d2129;
    line-height: 24px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .searchForm {
    padding-left: 22px;
    padding: 20px 0 0 22px;
    :deep(.el-form-item__label) {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #4e5969;
      text-align: right;
      font-style: normal;
      text-transform: none;
    }
    :deep(.el-input__wrapper) {
      width: 295px;
      height: 32px;
      background: #f2f3f5;
      border-radius: 4px;
      border: none !important;
      box-shadow: none;
    }
    .el-button {
      width: 82px;
      height: 32px;
      border-radius: 8px 8px 8px 8px;
      font-size: 14px;
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
    }
    .formLine {
      width: 0px;
      height: 32px;
      border-radius: 0px 0px 0px 0px;
      border: 1px solid #e5e6eb;
      margin-left: -10px;
    }
    :deep(.el-select__wrapper) {
      box-shadow: none;
      background: #f2f3f5;
    }
  }

  .line {
    width: 100%;
    height: 0px;
    border-radius: 0px 0px 0px 0px;
    border: 1px solid #e5e6eb;
    margin-bottom: 20px;
  }

  .relative {
    position: relative;
    background: #fff;
    width: 100%;
    height: calc(100vh - 150px);
    .flexEnd {
      display: flex;
      justify-content: flex-end;
      .btnFont {
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #4e5969;
        line-height: 22px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        margin-left: 5px;
      }
    }
    .flexState {
      display: flex;
      align-items: center;
      .cricle {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        margin-right: 10px;
      }
    }
  }
  .relative::after {
    content: '';
    display: block !important;
    clear: both !important;
  }
}
</style>
