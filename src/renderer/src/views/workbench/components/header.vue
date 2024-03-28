<template>
  <div
    v-if="chat"
    class="message-info-view-header"
  >
    <div class="message-info-views">
      <el-avatar
        :size="40"
        :src="chat.avatar"
      />
      <span class="font name">{{ chat.name }}</span>
      <svg-icon name="group" />
      <span class="font amount">({{ chat.amount }})</span>
    </div>
    <div class="message-info-views">
      <el-switch v-model="isOpen" />
      <span class="translation">自动翻译</span>
      <el-dropdown @command="command">
        <span class="el-dropdown-link">
          {{ language }}
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="en"> 英语 </el-dropdown-item>
            <el-dropdown-item command="cn"> 中文 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button @click="addRecord"> 添加跟进记录 </el-button>
    </div>
    <el-dialog
      v-if="recordVisible"
      v-model="recordVisible"
      width="700"
      :close-on-click-modal="false"
      append-to-body
      :show-close="false"
      class="record_dialog"
    >
      <template #header="{ close }">
        <span class="el-dialog__title">跟进记录</span>
        <svg-icon
          class="icon"
          name="closeCircle"
          @click="close"
        />
      </template>
      <div class="list">
        <div
          v-for="(item, index) in recordList"
          :key="item.id"
          class="sub"
          :class="[JadgeOddEven(index) ? 'right' : 'left']"
        >
          <span class="content">{{ item.content }}</span>
          <span class="date">{{ item.date }}</span>
          <span class="followPerson">跟进人：{{ item.followPerson }}</span>
        </div>
      </div>
      <el-form
        ref="recordFormRef"
        :model="recordForm"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item
          label="添加跟进记录"
          prop="content"
        >
          <el-input
            v-model="recordForm.content"
            placeholder="详细说明更新信息"
            rows="3"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog"> 取消 </el-button>
        <el-button
          type="primary"
          @click="submitForm"
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
interface Chat {
  type: string
  avatar?: string
  name?: string
  amount?: number
}

interface Record {
  content: string
  followPerson: string
  date: string
  id: number
}

interface Props {
  chat?: Chat
}

defineProps<Props>()
const isOpen = ref(false)
const language = ref('英语')
const recordVisible = ref(false)
const formSize = ref('default')
interface RecordForm {
  content: string
}

const recordList = ref<Record[]>([
  {
    content: '主要更加信息内容主要更加信息内容主要更加信息内容',
    followPerson: '吴晓辉',
    date: '2024-03-12',
    id: 1
  },
  {
    content: '主要更加信息内容主要更加信息内容主要更加信息内容',
    followPerson: '吴晓辉',
    date: '2024-03-12',
    id: 2
  },
  {
    content: '主要更加信息内容主要更加信息内容主要更加信息内容',
    followPerson: '吴晓辉',
    date: '2024-03-12',
    id: 3
  },
  {
    content: '主要更加信息内容主要更加信息内容主要更加信息内容',
    followPerson: '吴晓辉',
    date: '2024-03-12',
    id: 4
  },
  {
    content: '主要更加信息内容主要更加信息内容主要更加信息内容',
    followPerson: '吴晓辉',
    date: '2024-03-12',
    id: 5
  }
])
const recordFormRef = ref()
const recordForm = ref<RecordForm>({
  content: ''
})
const command = (val) => {
  language.value = val === 'en' ? '英语' : '中文'
}

const addRecord = () => {
  recordVisible.value = true
}

const JadgeOddEven = (index) => {
  return index % 2 === 0
}

const closeDialog = () => {
  recordVisible.value = false
}

const submitForm = () => {
  closeDialog()
}
</script>

<style lang="scss">
.message-info-view-header {
  height: 80px;
  background: #ffffff;
  padding: 0 20px 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;

  .message-info-views {
    display: flex;
    align-items: center;
  }

  .font {
    font-weight: 400;
    font-size: 22px;
    color: #2c2c2c;
    line-height: 22px;
  }

  .name {
    margin-left: 20px;
  }

  .svg-icon {
    margin-left: 24px;
  }

  .amount {
    margin-left: 10px;
  }

  .el-switch__core {
    height: 24px;
  }

  .translation {
    font-weight: 400;
    font-size: 14px;
    color: #4e5969;
    line-height: 22px;
    margin: 0 12px;
  }

  .el-button {
    border: 1px solid #165dff;
    color: #165dff;
    border-radius: 2px 2px 2px 2px;
    margin-left: 20px;
  }
}
.record_dialog {
  padding: 0 0 16px 0;
  .center {
    text-align: center;
  }

  .el-dialog__title {
    font-weight: 500;
    font-size: 20px;
    color: #1d2129;
    line-height: 28px;
  }

  .icon {
    cursor: pointer;
  }

  .el-dialog__header {
    padding: 16px 20px;
    border-bottom: 1px solid #e5e6eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-dialog__body {
    padding: 30px 50px 37px;
    border-bottom: 1px solid #e5e6eb;
  }

  .list {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-height: 300px;
    overflow: auto;
    margin-bottom: 30px;

    @include scrollBar;
  }

  .sub {
    display: flex;
    // align-items: start;
    flex-direction: column;
    position: relative;
    padding: 10px 0;
    font-weight: 400;
    font-size: 12px;
    color: #86909c;
    line-height: 20px;

    &.right {
      // align-self: flex-end;
      margin-left: 226px;
      padding-left: 18px;
      border-left: 1px solid #e5e6eb;

      &::before {
        content: ' ';
        width: 6px;
        height: 6px;
        background: #165dff;
        position: absolute;
        left: -3px;
        top: 18px;
        border-radius: 100px 100px 100px 100px;
      }
    }

    &.left {
      margin-right: 226px;
      text-align: right;
      padding-right: 18px;
      border-right: 1px solid #e5e6eb;

      &::before {
        content: ' ';
        width: 6px;
        height: 6px;
        background: #165dff;
        position: absolute;
        right: -3px;
        top: 18px;
        border-radius: 100px 100px 100px 100px;
      }
    }

    .content {
      width: 208px;
      font-size: 14px;
      color: #1d2129;
      line-height: 22px;
    }
  }

  .el-dialog__footer {
    padding-right: 20px;
  }

  .el-button--primary {
    background: #165dff;
  }

  .el-textarea__inner {
    background: $textareaBgColor;

    @include scrollBar;
  }
}
</style>
