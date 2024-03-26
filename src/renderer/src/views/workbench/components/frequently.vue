// 常用功能
<template>
  <div class="frequently">
    <div class="box">
      <div class="verbaltrick">
        <span class="title">常用话术</span>
        <el-tabs
          v-if="tabList.length"
          v-model="activeName"
          type="card"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-for="item in tabList"
            :key="item.name"
            :label="item.label"
            :name="item.name"
          />
        </el-tabs>
      </div>
      <el-table
        v-if="verbaltrickList.length"
        :data="verbaltrickList"
        style="width: 100%"
        max-height="217"
        :cell-class-name="cellClassName"
      >
        <el-table-column
          type="index"
          class="serial"
          width="50"
        />
        <el-table-column
          prop="title"
          width="90"
          show-overflow-tooltip
        />
        <el-table-column
          prop="content"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="right"
          width="60"
        >
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              link
              @click="selected(scope.$index, scope.row)"
            >
              选用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="button">
        <el-button
          class="verbaltrick_btn"
          @click="addClassify"
        >
          添加分类
        </el-button>
        <el-button class="verbaltrick_btn"> 添加话术 </el-button>
        <el-button class="verbaltrick_btn"> 导入话术 </el-button>
      </div>
    </div>
    <div class="box">
      <div class="verbaltrick">
        <span class="title">翻译引擎</span>
      </div>
      <el-input
        v-model="textarea"
        :rows="2"
        type="textarea"
        placeholder="多行文本输入框"
      />
      <div class="action">
        <div class="left">
          <span class="translate">自动翻译</span>
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
        </div>
        <el-button type="primary"> 翻&nbsp;&nbsp;译 </el-button>
      </div>
      <el-input
        v-model="translation"
        :rows="2"
        type="textarea"
        disabled
        placeholder="翻译后的内容"
      />
    </div>
    <div class="box last">
      <div class="verbaltrick">
        <span class="title">新会话</span>
      </div>
      <div class="new_chat">
        <el-input
          v-model="translation"
          :rows="2"
          disabled
          placeholder="请输入手机号"
        />
        <el-button type="primary"> 确&nbsp;&nbsp;定 </el-button>
      </div>
    </div>
    <el-dialog
      v-if="classifyVisible"
      v-model="classifyVisible"
      width="600"
      :close-on-click-modal="false"
      title="添加分类"
      append-to-body
      :show-close="false"
      class="workspace_dialog"
    >
      <template #header="{ close }">
        <span class="el-dialog__title">添加分类</span>
        <svg-icon
          class="icon"
          name="closeCircle"
          @click="close"
        />
      </template>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item
          label="分类"
          prop="name"
        >
          <el-input v-model="ruleForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog('分类')"> 取消 </el-button>
        <el-button
          type="primary"
          @click="submitForm('分类')"
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
interface TabList {
  label: string
  name: number
}
const tabList = ref<TabList[]>([
  {
    label: '分类1',
    name: 1
  },
  {
    label: '分类2',
    name: 2
  },
  {
    label: '分类3',
    name: 3
  },
  {
    label: '分类4',
    name: 4
  },
  {
    label: '分类5',
    name: 5
  }
])

const formSize = ref('default')

interface RuleForm {
  name: string
}

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive<RuleForm>({
  name: ''
})

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
})
const activeName = ref(1)
const language = ref('英语')
const textarea = ref('')
const classifyVisible = ref(false)
const translation = ref('')
const verbaltrickList = reactive([
  {
    title: '标题就这么长',
    content: '我是话术内容话术内容话术十多个点',
    id: 1
  },
  {
    title: '标题就这么长',
    content: '我是话术内容话术内容话术十多个点',
    id: 2
  },
  {
    title: '标题就这么长',
    content: '我是话术内容话术内容话术十多个点',
    id: 3
  }
])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cellClassName = ({ columnIndex }) => {
  if (columnIndex === 0) {
    return 'serial'
  }
  return ''
}

const addClassify = () => {
  classifyVisible.value = true
}

const command = (val) => {
  language.value = val === 'en' ? '英语' : '中文'
}

const closeDialog = (type) => {
  switch (type) {
    case '分类':
      classifyVisible.value = false
  }
}

const submitForm = async (type) => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      closeDialog(type)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleClick = () => {
  console.log('点击了tabs')
}

const selected = (index, row) => {
  console.log(index, row, 111)
}
</script>

<style lang="scss">
.frequently {
  .box {
    padding: 0 20px 20px;
    border-bottom: 1px solid #e8e8e8;

    &.last {
      border: none;
    }
  }

  .verbaltrick {
    display: flex;
    justify-content: space-between;
    padding: 20px 0 0 0;

    .el-tabs {
      max-width: 260px;
      width: auto !important;
    }
  }

  .el-tabs__header {
    height: 24px !important;
    font-weight: 400;
    font-size: 12px;
    color: #4e5969;
    line-height: 20px;
    border: none;
  }

  .el-tabs__item {
    height: 24px !important;
    font-weight: 400 !important;
    font-size: 12px !important;
    color: #4e5969;
    line-height: 20px;
    padding: 0 12px;
    margin-left: 0 !important;
    background: #f2f3f5;

    &.is-active {
      color: #165dff;
      background: #fff;
    }
  }

  .el-tabs__nav-next,
  .el-tabs__nav-prev {
    line-height: 26px;
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
  }

  .el-tab-pane {
    padding: 0;
  }

  .serial {
    .cell {
      padding-left: 0;

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

  .verbaltrick_content {
    max-height: 217px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 5px;
    }
  }

  .verbaltrick_btn {
    border-radius: 2px 2px 2px 2px;
    border: 1px solid #165dff;
    font-weight: 400;
    font-size: 14px;
    color: #165dff;
  }

  .el-textarea {
    margin-top: 20px;
  }

  .el-textarea__inner {
    background: #f2f3f5;
    border-radius: 8px 8px 8px 8px;
    height: 76px;
    box-shadow: 0 0 0 0px !important;
  }

  .action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .left {
      display: flex;
      align-items: center;

      .translate {
        font-weight: 400;
        font-size: 14px;
        color: #4e5969;
        line-height: 22px;
      }
    }
  }

  .el-dropdown {
    margin-left: 20px;
  }

  .el-button--primary {
    background: #165dff;
    border-radius: 8px 8px 8px 8px;

    &.is-link {
      background: transparent;
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
}

.workspace_dialog {
  padding: 0 0 16px 0;

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
    padding: 40px 60px;
    border-bottom: 1px solid #e5e6eb;
  }

  .el-overlay-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-dialog__footer {
    padding-right: 20px;
  }

  .el-button--primary {
    background: #165dff;
  }
}
</style>
