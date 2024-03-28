<template>
  <div class="toolbar">
    <div class="action">
      <!-- 图片 -->
      <!-- <span
        data-title="图片"
        class="icon"
        @click="SendImageClick"
      >
        <svg-icon
          name="icontupian"
          class="icon-hover"
        />
      </span> -->
      <el-upload
        ref="uploadRef"
        class="upload-demo"
        accept=".jpg, .jpeg, .png, .gif, .bmp"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :auto-upload="false"
        :show-file-list="false"
      >
        <template #trigger>
          <span
            data-title="图片"
            class="icon"
            @click="SendImageClick"
          >
            <svg-icon
              name="icontupian"
              class="icon-hover"
            />
          </span>
        </template>
      </el-upload>
      <!-- 文件 -->
      <span
        data-title="超链接"
        class="icon"
        @click="SendFileClick"
      >
        <svg-icon
          name="hyperlinks"
          class="icon-hover"
        />
      </span>
      <!-- 表情包 -->
      <span
        data-title="表情"
        class="emoticon icon"
        @click="sendEmojiClick"
      >
        <svg-icon
          name="iconxiaolian"
          class="icon-hover"
        />
      </span>
      <!-- 截图 -->
      <!-- <span
        data-title="截图"
        class="icon"
        @click="clickCscreenshot"
      >
        <svg-icon
          icon-class="iconjietu"
          class="icon-hover"
        />
      </span> -->
    </div>
    <div class="tags">
      <div
        v-for="item in tags"
        :key="item"
        class="tag"
      >
        <span>{{ item }}</span>
        <svg-icon name="cancle" />
      </div>
      <el-button
        :icon="Plus"
        type="primary"
      >
        添加
      </el-button>
    </div>

    <!-- 机器人配置 -->
    <!-- <span
      v-show="isRobot(toAccount)"
      :data-title="$t('chat.configuration')"
      class="icon"
      @click="openRobotBox"
    >
      <svg-icon iconClass="robot" class="icon-hover robot" />
    </span> -->
    <!-- 窗口抖动 -->
    <!-- <span
      v-show="currentType == 'C2C' && false"
      :data-title="$t('chat.windowJitter')"
      class="icon"
      @click="onShake"
    >
      <el-icon class="icon-hover"><Iphone /></el-icon>
    </span> -->
    <!-- 滚动到底部 -->
    <!-- <span
      :data-title="$t('chat.scrollToTheBottom')"
      class="chat_vot icon"
      @click="onTobBottom"
      v-show="tobottom"
    >
      <el-icon class="svg-left icon-hover">
        <DArrowLeft />
      </el-icon>
    </span>
    <input
      type="file"
      id="imagePicker"
      ref="imagePicker"
      accept=".jpg, .jpeg, .png, .gif, .bmp"
      @change="sendImage"
      hidden
    />
    <input type="file" id="filePicker" ref="filePicker" @change="sendFile" hidden />
    <RobotOptions v-if="isRobot(toAccount)" />
    <EmotionPackBox @setEmoji="setEmoji" ref="emjRef" /> -->
    <EmotionPackBox
      ref="emjRef"
      @set-emoji="setEmoji"
    />
  </div>
</template>

<script setup>
// import emitter from "@/utils/mitt-bus";
import EmotionPackBox from './EmotionPackBox.vue'
// import RobotOptions from "./RobotOptions.vue";
// import { useStore } from "vuex";
import { ref } from 'vue'
import { getImageUrl } from '@/utils/getImageUrl'
import { emojiMap } from '@/utils/emoji/emoji-map-qq'
// const emojiDouyin = require("@/utils/emoji/emoji-map-douyin");
// import { createCustomMsg } from "@/api/im-sdk-api/message";
// const { production } = require("@/config/vue.custom.config");
import { Plus } from '@element-plus/icons-vue'
const emjRef = ref()
// const tobottom = ref()
// const imagePicker = ref()
// const filePicker = ref()
const tags = ref(['标签001', '标签002', '标签003'])
// const { commit, dispatch } = useStore();

const emit = defineEmits(['setToolbar'])
// const { toAccount, currentType } = useGetters(["toAccount", "currentType"]);
// const { currentConversation } = useState({
//   currentConversation: (state) => state.conversation.currentConversation,
// });

const sendEmojiClick = () => {
  console.log(2)
  emjRef.value.setFlag(true)
}
// function openRobotBox() {
//   emitter.emit("onRobotBox", true);
// }
const setEmoji = (item) => {
  let url = ''
  // if (table == "QQ") {
  // url = emojiQq.emojiUrl + emojiQq.emojiMap[item];
  url = getImageUrl(emojiMap[item])
  // } else {
  //   // url = emojiDouyin.emojiUrl + emojiDouyin.emojiMap[item];
  //   url = require("@/assets/emoji/" + emojiDouyin.emojiMap[item]);
  // }
  console.log(url)
  emit('setToolbar', { data: { url, item }, key: 'setEmoj' })
}
// const SendImageClick = () => {
//   const $el = imagePicker.value;
//   $el.value = null;
//   $el.click();
// };
// const SendFileClick = () => {
//   const $el = filePicker.value;
//   $el.value = null;
//   $el.click();
// };
// 截图
// const clickCscreenshot = () => {
//   const element = document.body;
//   // html2canvas(element, {
//   //   allowTaint: true,
//   //   useCORS: true,
//   //   dpi: 150,
//   //   scale: 2,
//   // }).then((canvas) => {
//   //   const image = canvas.toDataURL();
//   //   const File = dataURLtoFile(image);
//   //   console.log(File);
//   //   emit("setToolbar", {
//   //     data: {
//   //       files: File,
//   //     },
//   //     key: "setPicture",
//   //   });
//   // });
// };
// const onShake = () => {
//   const message = createCustomMsg({
//     convId: toAccount.value,
//     convType: currentType.value,
//     customType: "dithering",
//   });
//   dispatch("SESSION_MESSAGE_SENDING", {
//     payload: { convId: currentConversation.value.conversationID, message },
//   });
// };

// async function sendImage(e) {
//   emit("setToolbar", {
//     data: {
//       files: e.target.files[0],
//     },
//     key: "setPicture",
//   });
// }
// async function sendFile(e) {
//   emit("setToolbar", {
//     data: {
//       files: e.target.files[0],
//     },
//     key: "setParsefile",
//   });
// }
// const onTobBottom = () => {
//   commit("EMITTER_EMIT", { key: "updataScroll" });
// };
// emitter.on("onisbot", (state) => {
//   tobottom.value = !state;
// });
</script>
<style lang="scss" scoped>
.toolbar {
  height: 40px;
  padding: 0 5px;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  // background: #fff;
  .action {
    display: flex;

    & > span {
      width: 42px;
      align-items: center;
      justify-content: center;
      display: flex;
      // height: 40px;
      padding: 4px;
      position: relative;
      text-align: center;
      color: #808080;
      cursor: pointer;
    }
  }

  :deep(.el-upload) {
    padding-top: 8px;
  }

  .tags {
    flex: 1;
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }

  .tag {
    width: 67px;
    height: 28px;
    border-radius: 8px 8px 8px 8px;
    border: 1px solid #0fc6c2;
    color: #0fc6c2;
    position: relative;
    margin-right: 20px;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    line-height: 28px;

    .svg-icon {
      position: absolute;
      right: -10px;
      top: -10px;
      cursor: pointer;
    }
  }

  .el-button--primary {
    width: 82px;
    height: 28px;
    @include buttonStyle;
  }
  .robot {
    stroke: unset;
    cursor: pointer;
  }
  & > .icon:hover:after {
    font-size: 13px;
    display: inline-block;
    content: attr(data-title);
    text-align: center;
    color: rgba(0, 0, 0, 0.75);
    position: absolute;
    left: 17px;
    top: 38px;
    border-radius: 3px;
    // border: 1px solid #e9e9e9;
    background-color: #eaeaea;
    white-space: nowrap;
    padding: 2px 5px;
    z-index: 9999;
  }
}
.chat_vot {
  cursor: pointer;
  animation: chat_top 0.3s ease;
  .svg-left {
    transform: rotate(-90deg);
  }
}

@keyframes chat_top {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
