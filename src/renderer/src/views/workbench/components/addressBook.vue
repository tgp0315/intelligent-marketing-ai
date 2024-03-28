<template>
  <div class="addressBook">
    <el-input
      v-model="value"
      style="width: 290px"
      placeholder="请输入关键词"
      :suffix-icon="Search"
    />
    <el-button
      link
      @click="clickAll"
    >
      全部收起
    </el-button>
    <div class="collapse">
      <el-collapse
        v-model="activeNames"
        @change="handleChange"
      >
        <el-collapse-item
          v-for="(item, t) in accountList"
          :key="item.account"
          :name="item.account"
        >
          <template #title>
            <div class="title">
              <svg-icon
                class="user"
                :icon-style="iconStyle"
                :name="activeNames.includes(item.account) ? 'user' : 'unselecteduser'"
              />
              <span
                class="account"
                :class="{ selected: activeNames.includes(item.account) }"
                >{{ item.account }}</span
              >
            </div>
            <svg-icon
              :icon-style="iconStyle"
              :name="activeNames.includes(item.account) ? 'up' : 'down'"
            />
          </template>
          <template v-if="item.children">
            <div
              v-for="(info, index) in item.children"
              :key="`${item.account}-${info.account}`"
              class="personage"
              :class="{ selected: info.isSelected }"
              @click="selectedUser(t, index)"
            >
              <div class="info">
                <el-avatar
                  :size="40"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                />
                <div class="user">
                  {{ info.nickname }}
                </div>
              </div>
            </div>
          </template>
          <!-- <div>
            Consistent with real life: in line with the process and logic of real
            life, and comply with languages and habits that the users are used to;
          </div>
          <div>
            Consistent within interface: all elements should be consistent, such
            as: design style, icons and texts, position of elements, etc.
          </div> -->
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
// import Svguser from '@/assets/icons/user.svg'
import { ref, reactive } from 'vue'
const value = ref('')
const activeNames = ref(['flb1116@gmail.com'] as Array<string>)
const accountList = reactive([
  {
    account: 'flb1116@gmail.com',
    isCollapse: false,
    unread: 1,
    children: [
      {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        account: 'flb1116@gmail.com',
        nickname: '张三',
        isSelected: false,
        chatId: 1711078211014
      },
      {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        account: 'flb1116@gmail.com',
        nickname: '张三',
        isSelected: false,
        chatId: 1711078211014
      },
      {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        account: 'flb1116@gmail.com',
        nickname: '张三',
        isSelected: false,
        chatId: 1711078211014
      },
      {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        account: 'flb1116@gmail.com',
        nickname: '张三',
        isSelected: false,
        chatId: 1711078211014
      }
    ]
  },
  {
    account: 'flb1117@gmail.com',
    isCollapse: false,
    children: [
      {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        account: 'flb1116@gmail.com',
        nickname: '张三',
        isSelected: false,
        chatId: 1711078211014
      },
      {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        account: 'flb1116@gmail.com',
        nickname: '张三',
        isSelected: false,
        chatId: 1711078211014
      },
      {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        account: 'flb1116@gmail.com',
        nickname: '张三',
        isSelected: false,
        chatId: 1711078211014
      },
      {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        account: 'flb1116@gmail.com',
        nickname: '张三',
        isSelected: false,
        chatId: 1711078211014
      },
      {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        account: 'flb1116@gmail.com',
        nickname: '张三',
        isSelected: false,
        chatId: 1711078211014
      },
      {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        account: 'flb1116@gmail.com',
        nickname: '张三',
        isSelected: false,
        chatId: 1711078211014
      }
    ]
  }
])
const iconStyle = {
  width: 18,
  height: 18
}
const handleChange = (val: string[]) => {
  console.log(val)
}

const selectedUser = (t: number, n: number): void => {
  accountList.forEach((item) => {
    const { children } = item
    if (children && children.length) {
      children.forEach((item) => {
        item.isSelected = false
      })
    }
  })
  accountList[t].children[n].isSelected = true
}

const clickAll = () => {
  activeNames.value = []
}
</script>

<style lang="scss">
.addressBook {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;

  .el-input {
    margin-top: 10px;
    height: 32px;
  }

  .el-input__wrapper {
    height: 32px;
    background: #f2f3f5;
    border-radius: 24px 24px 24px 24px;
  }

  .is-link {
    height: 28px;
    margin: 8px 22px 8px 0;
    align-self: self-end;
    font-weight: 400;
    font-size: 14px;
    color: #2c2c2c;
    line-height: 22px;
    text-align: left;
    font-style: normal;
  }

  .el-collapse-item__arrow {
    display: none;
  }

  .collapse {
    width: 100%;
    flex: 1;
    height: 100%;
  }

  .el-collapse {
    border: none;
    height: 100%;
    overflow: auto;

    @include scrollBar;
  }

  .el-collapse-item__content {
    padding: 0;
  }

  .el-collapse-item__wrap {
    border: none;
  }

  .el-collapse-item__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border: none;
    padding: 0 20px 0 12px;

    .title {
      display: flex;
      align-items: center;
    }

    .account {
      margin-left: 16px;
      font-weight: 400;
      font-size: 14px;
      color: #2c2c2c;
      line-height: 22px;
      text-align: left;

      &.selected {
        color: #165dff;
      }
    }
  }
  .unread {
    width: 16px;
    height: 16px;
    background: #ff4433;
    border-radius: 50px 50px 50px 50px;
    font-weight: 500;
    font-size: 11px;
    color: #ffffff;
    line-height: 16px;
    text-align: center;
    margin-left: 8px;
  }

  .personage {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 17px 21px;
    border-radius: 2px 2px 2px 2px;
    cursor: pointer;

    &.selected {
      background: #f7f8fa;
    }

    &:hover {
      background: #f7f8fa;
    }
  }

  .info {
    display: flex;
    align-items: center;

    .user {
      color: #2c2c2c;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      font-weight: 400;
      font-size: 16px;
    }
  }
  .other {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }

  .time {
    font-size: 14px;
    color: #9f9f9f;
    line-height: 22px;
    margin-bottom: 6px;
  }
}
</style>
