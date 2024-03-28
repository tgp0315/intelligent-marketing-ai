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
      <el-button>添加跟进记录</el-button>
    </div>
    <!-- <div class="message-info-views">
      <p v-if="currentType">
        <span
          v-if="chatType('C2C')"
          class="single"
          @click="openUser"
        >
          {{ chatNick("C2C", chat) }}
        </span>
        <span
          v-else-if="chatType('GROUP')"
          class="group"
          @click="openSetup"
        >
          {{ chatNick("GROUP", chat) }}
        </span>
        <span
          v-else-if="chatType('@TIM#SYSTEM')"
          class="system"
        > 系统通知 </span>
      </p>
    </div>
    <div class="flex">
      <div
        v-show="chat.type == 'GROUP' && false"
        class="message-info-add"
        title="添加成员"
      >
        <svg-icon
          name="group"
        />
      </div> -->
    <!-- <div
        v-show="chat.type == 'GROUP'"
        class="message-info-setup"
        title="设置"
        @click="openSetup"
      >
        <FontIcon
          icon-name="MoreFilled"
          class="icon-hover"
        />
      </div> -->
    <!-- </div> -->
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

interface Props {
  chat?: Chat
}

defineProps<Props>()
const isOpen = ref(false)
const language = ref('英语')

const command = (val) => {
  language.value = val === 'en' ? '英语' : '中文'
}
// import { useState, useGetters } from "@/utils/hooks/useMapper";
// import { useStore } from "vuex";

// const { commit } = useStore();
// const { currentType } = useGetters(["currentType"]);
// const { chat, groupProfile } = useState({
//   groupProfile: (state) => state.groupinfo.groupProfile,
//   chat: (state) => state.conversation.currentConversation,
// });

// const chatType = (type) => {
//   return currentType.value === type;
// };

// const chatNick = (type, chat) => {
//   if (type === "C2C") {
//     return chat.userProfile.nick || chat.userProfile.userID || chat.remark;
//   } else if (type === "GROUP") {
//     const {
//       groupProfile: { name, groupID, memberCount },
//     } = chat;
//     const count = memberCount ? `(${memberCount})` : "";
//     return `${name || groupID} ${count}`;
//   }
// };

// const openSetup = () => {
//   commit("EMITTER_EMIT", { key: "onGroupDrawer", value: true });
// };
// const openUser = () => {};
</script>

<style lang="scss" scoped>
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
</style>
