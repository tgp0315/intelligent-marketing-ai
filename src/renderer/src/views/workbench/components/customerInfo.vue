<template>
  <div class="customerInfo">
    <div class="pic">
      <div style="text-align: center">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          :size="120"
        />
        <div style="font-size: 28px">YYWW23453</div>
      </div>
    </div>
    <div class="personalDetails">
      <div
        v-for="(item, index) in personalDataList"
        :key="index"
        class="marginBottom"
      >
        <div class="smollText">
          {{ item.title }}
        </div>
        <div
          class="flexSpaceBetween"
          @mouseenter="mouseenterData(item, 'in')"
          @mouseleave="mouseenterData(item, 'out')"
        >
          <div
            v-if="!item.inputIsShow"
            class="bigText"
          >
            {{ item.content }}
          </div>
          <el-input
            v-else-if="item.inputIsShow && item.title !== '客户分类'"
            ref="inputRef"
            v-model="input"
            style="width: 240px"
            placeholder="请输入"
            @blur="focusInputIsShow(item)"
            @keyup.enter="focusInputIsShow(item)"
            @keyup.esc="escInputIsShow(item)"
          />
          <el-select
            v-else-if="item.inputIsShow && item.title === '客户分类'"
            ref="inputRef"
            v-model="input"
            placeholder="Select"
            style="width: 240px"
            @blur="focusInputIsShow(item)"
            @change="focusInputIsShow(item)"
          >
            <el-option
              label="客户1"
              value="客户1"
            />
            <el-option
              label="客户2"
              value="客户2"
            />
          </el-select>
          <div
            style="width: 18px; height: 35px; display: flex; align-items: center; cursor: pointer"
          >
            <svg-icon
              v-show="item.isShow"
              name="edit"
              :icon-style="{ width: 18, height: 20 }"
              @click="isShowInput(item)"
            />
          </div>
        </div>
      </div>
      <!-- <div class="marginBottom">
        <div class="smollText">
          职业
        </div>
        <div class="bigText">
          农场主
        </div>
      </div>
      <div class="marginBottom">
        <div class="smollText">
          性别
        </div>
        <div class="bigText">
          男
        </div>
      </div>
      <div class="marginBottom">
        <div class="smollText">
          年薪
        </div>
        <div class="bigText">
          200w
        </div>
      </div>
      <div class="marginBottom">
        <div class="smollText">
          地区
        </div>
        <div class="bigText">
          北美
        </div>
      </div>
      <div class="marginBottom">
        <div class="smollText">
          客户分类
        </div>
        <div class="bigText">
          吴小晖
        </div>
      </div>
      <div class="marginBottom">
        <div class="smollText">
          备注
        </div> -->
      <!-- <div class="bigText">
          吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖吴小晖
        </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
interface PersonalDataList {
  title: string
  content: string
  isShow: boolean
  inputIsShow: boolean
}
const personalDataList = ref<PersonalDataList[]>([
  {
    title: '姓名',
    content: '吴小晖',
    isShow: false,
    inputIsShow: false
  },
  {
    title: '职业',
    content: '农场主',
    isShow: false,
    inputIsShow: false
  },
  {
    title: '性别',
    content: '男',
    isShow: false,
    inputIsShow: false
  },
  {
    title: '年薪',
    content: '200W',
    isShow: false,
    inputIsShow: false
  },
  {
    title: '地区',
    content: '北美',
    isShow: false,
    inputIsShow: false
  },
  {
    title: '客户分类',
    content: '吴小晖',
    isShow: false,
    inputIsShow: false
  },
  {
    title: '备注',
    content: '这是一条备注这是一条备注这是一条备注这是一条备注这是一条备注这是一条备注',
    isShow: false,
    inputIsShow: false
  }
])
const input = ref('')
const inputRef = ref()
const oldValue = ref()
const mouseenterData = (data: any, type: string) => {
  personalDataList.value.forEach((item) => {
    if (item.title === data.title) {
      if (type === 'in') {
        item.isShow = true
      } else {
        item.isShow = false
      }
    }
  })
}

const isShowInput = (data: any) => {
  personalDataList.value.forEach((item) => {
    if (item.title === data.title) {
      item.inputIsShow = true
      input.value = data.content
      oldValue.value = data.content
      focusInput()
    }
  })
}

const focusInput = () => {
  nextTick(() => {
    inputRef.value[0].focus()
  })
}

const focusInputIsShow = (data: any) => {
  personalDataList.value.forEach((item) => {
    if (item.title === data.title) {
      item.inputIsShow = false
      data.content = input.value
    }
  })
}

const escInputIsShow = (data: any) => {
  personalDataList.value.forEach((item) => {
    if (item.title === data.title) {
      input.value = oldValue.value
    }
  })
}
</script>

<style lang="scss">
.customerInfo {
  .pic {
    height: 200px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #e8e8e8;
    text-align: center;
  }
  .personalDetails {
    padding: 22px 32px 0 39px;
    overflow-y: scroll;
    // min-height: px;
    height: 80vh;
    .marginBottom {
      margin-bottom: 15px;
      .smollText {
        font-weight: 400;
        font-size: 14px;
        color: #909194;
        line-height: 22px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        margin-bottom: 8px;
      }
      .bigText {
        font-weight: 600;
        font-size: 18px;
        color: #2c2c2c;
        line-height: 22px;
        text-align: left;
        font-style: normal;
        padding-right: 40px;
      }
      .flexSpaceBetween {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 15px;
      }
    }
  }
  .personalDetails::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    border-radius: 4px;
  }

  .personalDetails::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #c6c9d2;
    opacity: 0.9;
  }
}
</style>
