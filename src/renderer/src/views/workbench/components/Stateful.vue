<template>
  <div
    v-if="!item.isRevoked && item.type !== 'TIMGroupTipElem' && item.payload?.data !== 'dithering'"
    class="status-style"
    :class="{
      'isown-style': !isown,
      'single-style': item.conversationType == 'C2C'
    }"
  >
    <!-- 发送中 -->
    <el-icon
      v-show="isShow('unSend')"
      class="is-loading"
    >
      <Loading />
    </el-icon>
    <!-- 发送失败 -->
    <!-- <el-icon class="is-error" v-show="isShow('fail')"><WarningFilled /></el-icon> -->
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
// <!-- unSend(未发送)success(发送成功)fail(发送失败) -->
const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  isown: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'success'
  }
})
const { item, isown, status } = toRefs(props)

const isShow = (value) => {
  return status.value == value
}
</script>

<style lang="scss" scoped>
.status-style {
  margin: 0 8px 0 0;
  display: flex;
  align-items: center;
  :deep(.is-error) {
    color: #f44336;
    cursor: pointer;
  }
}
.isown-style {
  padding-top: 18.79px;
  margin: 0 0 0 8px;
}
.single-style {
  padding-top: 0px;
}
</style>
