<template>
  <div
    class="message-view__item--text"
    :class="self ? 'is-text-self' : 'is-text-other'"
    @click="onClick(message)"
  >
    <!-- {{ message.content }} -->
    <span>{{ message.content }}</span>
    <span
      v-if="message.translation"
      class="line"
    />
    <span
      v-if="message.translation"
      class="translation"
      >{{ message.translation }}</span
    >
    <!-- <template v-if="(message?.conversationType || msgType) == 'GROUP' || 'C2C'"> -->
    <!-- 回复消息 -->
    <!-- <ReplyElem
        v-if="message.cloudCustomData"
        :originalMsg="message.cloudCustomData && JSON.parse(message.cloudCustomData)"
      />
      <DynamicContent islink :text="message.payload.text" />
    </template> -->
  </div>
</template>

<script setup>
// import ReplyElem from "./ReplyElem.vue";
// import DynamicContent from "../components/DynamicContent.vue";
defineProps({
  msgType: {
    type: String,
    default: ''
  },
  message: {
    type: Object,
    default: null
  },
  self: {
    type: Boolean,
    default: false
  }
})

const onClick = (data) => {
  console.log(data)
}
</script>

<style lang="scss" scoped>
.is-text-self {
  background: #e1efff;
}
.is-text-other {
  background: #ffffff;
}
.emoji {
  width: 23px;
  vertical-align: sub;
}

.line {
  height: 1px;
  background: #d9d9d9;
  border-radius: 0px 0px 0px 0px;
  margin: 4px 0;
}
.message-view__item--text {
  width: fit-content;
  padding: 10px 14px;
  // max-width: 360px;
  box-sizing: border-box;
  border-radius: 10px 10px 10px 10px;
  word-break: break-all;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 16px;
  color: #2c2c2c;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  ::selection {
    background-color: rgb(193, 203, 244);
  }
}
</style>
