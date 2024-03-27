<template>
  <div class="massMailingList">
    <el-row>
      <el-col :span="10">
        <div class="title">选择群发账号</div>
        <el-table
          ref="multipleTableRef"
          :data="leftTableData"
          style="width: 100%; border: 1px solid #e5e6eb"
          :header-cell-style="{ backgroundColor: '#F2F3F5', color: '#1D2129' }"
          max-height="205px"
          @selection-change="leftHandleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="30"
          />
          <el-table-column
            label="账号信息"
            property="accountInfo"
            min-width="50"
          />
          <el-table-column
            property="accountClass"
            label="账号类别"
            min-width="60"
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
                {{ scope.row.state === 1 ? '已上线' : '离线' }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="4">
        <div class="flexCenter">
          <div>
            <div class="iconSpacing">
              <svg-icon
                name="leftArrow"
                :icon-style="{ width: 30, height: 30 }"
                @click="leftArrowClick"
              />
            </div>
            <svg-icon
              name="rightArrow"
              :icon-style="{ width: 30, height: 30 }"
              @click="rightArrowClick"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="title">已确定的群发账号</div>
        <el-table
          ref="multipleTableRef"
          :data="rightTableData"
          style="width: 100%; border: 1px solid #e5e6eb"
          :header-cell-style="{ backgroundColor: '#F2F3F5', color: '#1D2129' }"
          max-height="205px"
          @selection-change="rightHandleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="30"
          />
          <el-table-column
            label="账号信息"
            property="accountInfo"
            min-width="50"
          />
          <el-table-column
            property="accountClass"
            label="账号类别"
            min-width="60"
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
                {{ scope.row.state === 1 ? '已上线' : '离线' }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="richText">
      <div class="title">编辑群发内容</div>
      <div style="border: 1px solid #ccc">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :default-config="toolbarConfig"
        />
        <Editor
          v-model="valueHtml"
          style="height: 125px; overflow-y: hidden"
          :default-config="editorConfig"
          @on-created="handleCreated"
        />
      </div>
    </div>
    <div class="bottom">
      <el-button
        color="#165DFF"
        @click="dialogVisibleTemplate = true"
      >
        选择话术模板
      </el-button>
      <el-button color="#94BFFF"> 保存为新话术模板 </el-button>
      <el-button
        color="#F2F3F5"
        style="color: #4e5969"
      >
        清空
      </el-button>
      <div style="margin-top: 5px">
        <el-radio-group
          v-model="radio1"
          class="ml-4"
        >
          <el-radio
            value="1"
            size="large"
          >
            顺序发送
          </el-radio>
          <el-radio
            value="2"
            size="large"
          >
            随机发送
          </el-radio>
        </el-radio-group>
      </div>
      <div class="bottomInput">
        <div class="bottomTitle">群发间隔(秒)</div>
        <el-input
          v-model="name"
          style="width: 260px"
          placeholder="请输入关键字"
          clearable
        />
        <div class="inputCenter">~</div>
        <el-input
          v-model="name"
          style="width: 260px"
          placeholder="请输入关键字"
          clearable
        />
      </div>
      <div class="flexEnd">
        <el-button
          :icon="Plus"
          color="#165DFF"
          @click="dialogVisibleAccount = true"
        >
          创建营销任务
        </el-button>
      </div>
    </div>
    <el-dialog
      v-if="dialogVisibleAccount"
      v-model="dialogVisibleAccount"
      width="600"
      top="25%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      class="dialog"
    >
      <template #header>
        <div class="my-header">
          <div class="dialogTitle">营销任务名称</div>
          <svg-icon
            name="closeCircle"
            :icon-style="{ width: 25, height: 25 }"
            @click="dialogVisibleAccount = false"
          />
        </div>
      </template>
      <div style="margin: 25px 0 50px 0">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline configForm"
        >
          <el-form-item label="营销任务名称">
            <el-input
              v-model="formInline.name"
              style="width: 440px"
              placeholder="请输入关键字"
              clearable
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            color="#F2F3F5"
            @click="dialogVisibleAccount = false"
          >
            取消
          </el-button>
          <el-button
            color="#165DFF"
            @click="onSubmitConfig"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-if="dialogVisibleTemplate"
      v-model="dialogVisibleTemplate"
      width="960px"
      top="15%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      class="dialog"
    >
      <template #header>
        <div class="my-header">
          <div class="dialogTitle">选择话术模板</div>
          <svg-icon
            name="closeCircle"
            :icon-style="{ width: 25, height: 25 }"
            @click="dialogVisibleTemplate = false"
          />
        </div>
      </template>
      <div style="margin: 10px 0 0px 0">
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%"
          max-height="350px"
          :header-cell-style="{ backgroundColor: '#F2F3F5', color: '#1D2129' }"
        >
          <el-table-column
            label="内容"
            property="content"
            min-width="230"
          />
          <el-table-column
            property="pic"
            label="图片/视频"
            min-width="230"
          />
          <el-table-column
            property="account"
            label="名片账号"
            min-width="230"
          />
          <el-table-column
            fixed="right"
            label="操作"
            min-width="230"
          >
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click.prevent="selectAccount(scope.row.id)"
              >
                选用
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="flexRight">
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
      <template #footer>
        <div class="dialog-footer">
          <el-button
            color="#F2F3F5"
            @click="dialogVisibleTemplate = false"
          >
            取消
          </el-button>
          <el-button
            color="#165DFF"
            @click="onSubmitConfig"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, reactive } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IToolbarConfig, DomEditor, Toolbar as WTEditorToolBar } from '@wangeditor/editor'
import { Plus } from '@element-plus/icons-vue'
const radio1 = ref('1')
const dialogVisibleAccount = ref(false)
const dialogVisibleTemplate = ref(false)
interface LeftTableData {
  accountInfo: string
  accountClass: string
  state: number
}
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const infoList = ref<LeftTableData[]>([])
const leftTableData = ref<LeftTableData[]>([
  {
    accountInfo: 'left-1张*三',
    accountClass: '通讯录好友',
    state: 1
  },
  {
    accountInfo: 'left-2李*四',
    accountClass: '陌生人',
    state: 2
  },
  {
    accountInfo: 'left-3张*三',
    accountClass: '通讯录好友',
    state: 1
  },
  {
    accountInfo: 'left-4李*四',
    accountClass: '陌生人',
    state: 2
  },
  {
    accountInfo: 'left-5张*三',
    accountClass: '通讯录好友',
    state: 1
  },
  {
    accountInfo: 'left-6李*四',
    accountClass: '陌生人',
    state: 2
  },
  {
    accountInfo: 'left-7张*三',
    accountClass: '通讯录好友',
    state: 1
  },
  {
    accountInfo: 'left-8李*四',
    accountClass: '陌生人',
    state: 2
  },
  {
    accountInfo: 'right-9张*三',
    accountClass: '通讯录好友',
    state: 1
  },
  {
    accountInfo: 'right-10李*四',
    accountClass: '陌生人',
    state: 2
  },
  {
    accountInfo: 'right-11张*三',
    accountClass: '通讯录好友',
    state: 1
  },
  {
    accountInfo: 'right-12李*四',
    accountClass: '陌生人',
    state: 2
  },
  {
    accountInfo: 'right-13张*三',
    accountClass: '通讯录好友',
    state: 1
  },
  {
    accountInfo: 'right-14李*四',
    accountClass: '陌生人',
    state: 2
  },
  {
    accountInfo: 'right-15张*三',
    accountClass: '通讯录好友',
    state: 1
  },
  {
    accountInfo: 'right-16李*四',
    accountClass: '陌生人',
    state: 2
  }
])
interface FormInline {
  name: string
}

const name = ref('')
const rightTableData = ref<Array<LeftTableData>>([])
const formInline = reactive<FormInline>({
  name: ''
})
const leftHandleSelectionChange = (val: any) => {
  infoList.value = val
}

const rightHandleSelectionChange = (val: any) => {
  infoList.value = val
}

const leftArrowClick = () => {
  filterInfo(rightTableData)
  leftTableData.value.push(...infoList.value)
}

const rightArrowClick = () => {
  filterInfo(leftTableData)
  rightTableData.value.push(...infoList.value)
}

const filterInfo = (arr: any) => {
  const new_arr = arr.value.filter(
    (x) => !infoList.value.some((item) => x.accountInfo === item.accountInfo)
  )
  arr.value = new_arr
}

const onSubmitConfig = () => {
  console.log('提交')
}
// 选用
const selectAccount = () => {}

const handleSizeChange = () => {}

const handleCurrentChange = () => {}
//--------------------------富文本-------------------------------

const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('<p></p>')
onMounted(() => {
  setTimeout(() => {
    const toolbar = DomEditor.getToolbar(editorRef.value) as WTEditorToolBar
    const curToolbarConfig = toolbar.getConfig()
    console.log(curToolbarConfig.toolbarKeys)
  }, 1500)
})

const toolbarConfig: Partial<IToolbarConfig> = {
  // TS 语法
  // const toolbarConfig = {                        // JS 语法
  /* 工具栏配置 */
}

toolbarConfig.toolbarKeys = [
  'bold', // 粗体
  'italic', // 斜体
  'underline', // 下划线
  // "header1", // 标题1
  // "header2", // 标题2
  // "header3", // 标题3
  // "header4", // 标题4
  // "header5", // 标题5
  'lineHeight', // 行高
  'justifyCenter', // 居中对齐
  'justifyJustify', // 两端对齐
  'justifyLeft', // 左对齐
  'justifyRight', // 右对齐
  'indent', // 增加缩进
  'delIndent', // 减少缩进
  'bulletedList', // 无序列表
  'numberedList', // 有序列表
  'uploadImage', // 上传图片
  'insertLink', // 插入链接
  'redo', // 重做
  'undo' // 撤销
]

// 编辑器配置
const editorConfig = {
  placeholder: '请输入...',
  MENU_CONF: {
    /* 菜单配置，下文解释 */
  }
}

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

//--------------------------富文本-------------------------------
</script>

<style lang="scss" scoped>
.massMailingList {
  .title {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: bold;
    font-size: 16px;
    color: #1d2129;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-bottom: 13px;
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
  .flexCenter {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconSpacing {
      margin-bottom: 10px;
    }
    .svg-icon {
      cursor: pointer;
    }
  }
  .richText {
    margin-top: 20px;
  }

  :deep(.w-e-toolbar) {
    /* 改为透明 */
    // background-color: rgba(220, 19, 19, 0)!important;
    /* 改为红色 */
    background-color: #e5e6eb !important;
  }
  .bottom {
    margin-top: 20px;
    :deep(.el-button) {
      color: #fff;
      border-radius: 8px;
    }
    :deep(.el-radio__input.is-checked .el-radio__inner) {
      width: 16px;
      height: 16px;
      border-radius: 8px;
      border: 5px solid #165dff;
      background-color: transparent;
    }
    :deep(.el-radio__inner) {
      border: 2px solid #e5e6eb;
    }
    .bottomInput {
      display: flex;
      align-items: center;
      margin-top: 8px;
      .inputCenter {
        font-size: 18px;
        color: black;
        padding: 0 5px;
      }
      .bottomTitle {
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #000000;
        line-height: 22px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        margin-right: 8px;
      }
    }
    .flexEnd {
      display: flex;
      justify-content: flex-end;
    }
  }

  // :deep(.el-dialog__header) {
  //   border-bottom: 1px solid #e5e6eb;
  //   font-weight: 600;
  //   color: #1d2129;
  //   // padding: 20px !important;
  // }
  .my-header {
    padding: 16px 20px;
    border-bottom: 1px solid #e5e6eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dialogTitle {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 500;
      font-size: 20px;
      color: #1d2129;
      line-height: 28px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    .svg-icon {
      cursor: pointer;
    }
  }
  :deep(.el-input__wrapper) {
    height: 32px;
    background: #f2f3f5;
    border-radius: 4px;
    border: none !important;
    box-shadow: none;
  }

  .flexRight {
    display: flex;
    justify-content: flex-end;
    padding: 15px 0;
  }
}

:deep(.dialog) {
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

  .el-dialog__body {
    padding: 20px 30px;
    border-bottom: 1px solid #e5e6eb;
  }

  .el-dialog__footer {
    padding-right: 20px;
  }
}

</style>
