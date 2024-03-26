<template>
  <div class="backgroundWhite">
    <div
      class="white"
      style="position: relative"
    >
      <div class="title">查询表格</div>
      <div class="searchForm">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="关键词">
            <el-input
              v-model="name"
              placeholder="请输入关键字"
              clearable
            />
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
      <div class="flexBtn">
        <div>
          <el-button
            :icon="Plus"
            color="#165DFF"
            @click="addAccount"
          >
            添加新账号
          </el-button>
        </div>
        <div>
          <el-button
            color="#F2F3F5"
            @click="onSubmit"
          >
            <svg-icon
              name="logOut"
              :icon-style="{ width: 15, height: 15 }"
            />
            <span
              class="btnFont"
              @click="logOutClick"
              >登出</span
            >
          </el-button>
          <el-button
            color="#F2F3F5"
            @click="onSubmit"
          >
            <svg-icon
              name="logIn_my"
              :icon-style="{ width: 15, height: 15 }"
            />
            <span
              class="btnFont"
              @click="logInClick"
              >登录</span
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
      </div>
      <div
        style="
          width: 100%;
          position: absolute;
          left: 0px;
          background: #fff;
          padding: 20px 20px 0 20px;
        "
      >
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ backgroundColor: '#F2F3F5', color: '#1D2129' }"
          max-height="calc(100vh - 160px)"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="30"
          />
          <el-table-column
            label="账户信息"
            property="name"
            min-width="60"
          />
          <el-table-column
            property="email"
            label="电子邮箱"
            min-width="100"
          />
          <el-table-column
            property="tel"
            label="电话"
            min-width="55"
          />
          <el-table-column
            property="config"
            label="账号配置"
            min-width="150"
          >
            <template #default="scope">
              <el-tag
                v-for="item in scope.row.config"
                :key="item"
                :style="{
                  color: item === 1 ? '#F53F3F' : item === 2 ? '#00B42A' : '#0FC6C2',
                  'border-color': item === 1 ? '#F53F3F' : item === 2 ? '#00B42A' : '#0FC6C2'
                }"
                effect="plain"
              >
                {{ item === 1 ? '标签1' : item === 2 ? '标签2' : '标签3' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            property="agency"
            label="代理方式"
            min-width="80"
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
          <el-table-column
            property="time"
            label="上线时间"
            min-width="110"
          />
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
                登录
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click.prevent="dialogVisibleConfig = true"
              >
                配置
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
      <el-dialog
        v-model="dialogVisible"
        width="600"
        top="25%"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :show-close="false"
      >
        <template #header>
          <div class="my-header">
            <div class="dialogTitle">扫码登录</div>
            <svg-icon
              name="closeCircle"
              :icon-style="{ width: 25, height: 25 }"
              @click="dialogVisible = false"
            />
          </div>
        </template>
        <div class="qrBody">
          <div>
            <div class="qrCode">
              <img src="" />
            </div>
            <div class="qrCodeTitle">扫描上方二维码登录</div>
          </div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              color="#165DFF"
              @click="dialogVisible = false"
            >
              关闭
            </el-button>
          </div>
        </template>
      </el-dialog>

      <el-dialog
        v-if="dialogVisibleConfig"
        v-model="dialogVisibleConfig"
        width="600"
        top="25%"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :show-close="false"
      >
        <template #header>
          <div class="my-header">
            <div class="dialogTitle">配置</div>
            <svg-icon
              name="closeCircle"
              :icon-style="{ width: 25, height: 25 }"
              @click="dialogVisibleConfig = false"
            />
          </div>
        </template>
        <div>
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline configForm"
          >
            <el-form-item label="选择账号配置">
              <el-select
                v-model="value"
                placeholder="请选择配置"
                size="small"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              color="#F2F3F5"
              @click="dialogVisibleConfig = false"
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Search, RefreshRight, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
const currentPage = ref(1)
const pageSize = ref(100)
const total = ref(100)
const dialogVisible = ref(false)
const dialogVisibleConfig = ref(false)
const value = ref('')
const idArray = ref<number[]>([])
const name = ref('')
const formInline = reactive({
  user: '',
  region: '',
  date: ''
})

const tableData = ref([
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 1,
    time: '2024-12-1 15:30:25'
  },
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 2,
    time: '2024-12-1 15:30:25'
  },
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 1,
    time: '2024-12-1 15:30:25'
  },
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 1,
    time: '2024-12-1 15:30:25'
  },
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 1,
    time: '2024-12-1 15:30:25'
  },
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 1,
    time: '2024-12-1 15:30:25'
  },
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 1,
    time: '2024-12-1 15:30:25'
  },
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 1,
    time: '2024-12-1 15:30:25'
  },
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 2,
    time: '2024-12-1 15:30:25'
  },
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 1,
    time: '2024-12-1 15:30:25'
  },
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 1,
    time: '2024-12-1 15:30:25'
  },
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 1,
    time: '2024-12-1 15:30:25'
  },
  {
    name: '张三',
    email: 'skdbskd95191811@**.com',
    tel: '16584793624',
    config: [1, 2, 3],
    agency: '本地VPN直连',
    state: 1,
    time: '2024-12-1 15:30:25'
  }
])

const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]

const resettingClick = () => {
  name.value = ''
}

// 二维码关闭
const addAccount = () => {
  dialogVisible.value = true
}

const logOutClick = () => {}

const logInClick = () => {}

const onSubmit = () => {}

const handleSizeChange = () => {}

const handleCurrentChange = () => {}

// 配置
const onSubmitConfig = async () => {
  try {
    // await post()
    dialogVisibleConfig.value = false
  } catch (e) {
    console.log(e)
  }
}

const handleSelectionChange = (val: any) => {
  console.log(val)
  const ids: Array<number> = []
  val.forEach((item) => {
    ids.push(item.id as number)
  })
  idArray.value = ids
}

// 删除&批量删除
const deleteAccount = (id?: number) => {
  try {
    ElMessageBox.confirm('您确定要删除吗?', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        if (idArray.value.length) {
          console.log(id)
          // await delete(idArray.value.join(','))
        } else {
          // await delete(id)
        }
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消'
        })
      })
  } catch (e) {
    console.log(e)
  }
}
</script>

<style lang="scss" scoped>
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
}

.line {
  width: 100%;
  height: 0px;
  border-radius: 0px 0px 0px 0px;
  border: 1px solid #e5e6eb;
  margin-bottom: 20px;
}

.flexBtn {
  display: flex;
  justify-content: space-between;
  :deep(.el-button) {
    border-radius: 8px;
  }
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

:deep(.el-table__row) {
  height: 41px;
  border: 1px solid #e5e6eb;
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
  .el-tag {
    height: 28px;
    border-radius: 2px 2px 2px 2px;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 14px;
    margin-left: 5px;
    margin-bottom: 5px;
  }
}

.flexRight {
  display: flex;
  justify-content: flex-end;
  // width: 100%;
  padding: 10px 0;
  .el-pagination {
    // width: 400px;
    // zoom: 1;
  }
}

::v-deep {
  .el-dialog__header {
    border-bottom: 1px solid #e5e6eb;
    font-weight: 600;
    color: #1d2129;
    // padding: 20px !important;
  }
  .my-header {
    display: flex;
    justify-content: space-between;
    padding: 5px;
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
  .qrBody {
    display: flex;
    justify-content: center;
    align-items: center;
    .qrCode {
      width: 200px;
      height: 200px;
      background: #4e5969;
      margin-top: 50px;
    }
    .qrCodeTitle {
      // display: flex;
      // justify-content: center;
      margin-top: 10px;
      margin-bottom: 50px;
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      font-size: 18px;
      color: #2c2c2c;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }
  }
}

:deep(.el-dialog__body) {
  border-bottom: 1px solid #e5e6eb !important;
}

.configForm {
  margin-top: 36px;
  margin-bottom: 60px;
  margin: 36px 0 60px 25px;
  :deep(.el-select--small .el-select__wrapper) {
    width: 400px !important;
    height: 24px;
    background: #f2f3f5 !important;
  }
  :deep(.el-select__wrapper) {
    box-shadow: none;
  }
}
</style>
