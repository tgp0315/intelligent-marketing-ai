<template>
  <!-- <section
    id="svgTop"
    class="message-info-view-content"
    :class="{ 'style-MsgBox': !showMsgBox, 'stlyle-Reply': currentReplyMsg }"
  > -->
  <section
    id="svgTop"
    class="message-info-view-content"
  >
    <el-scrollbar
      ref="scrollbarRef"
      class="h-full"
      @scroll="scrollbar"
    >
      <div
        ref="messageViewRef"
        class="message-view"
      >
        <div
          v-for="item in currentMessageList"
          :key="item.ID"
        >
          <!-- 加载更多 -->
          <!-- <LoadMore :index="index" /> -->
          <div class="message-view__item--blank" />
          <!-- 时间 -->
          <div class="message-view__item--time-divider">
            {{ timeFormat(item.time, true) }}
          </div>
          <!-- 消息体 -->
          <div
            :id="`choice${item.ID}`"
            class="message-view__item"
            :class="[
              ISown(item) ? 'is-self' : 'is-other',
              showCheckbox && !item.isRevoked ? 'style-choice' : ''
            ]"
          >
            <!-- 多选框 -->
            <!-- <Checkbox
              :item="item"
              :is-revoked="item.isRevoked"
              @click.stop="handleSelect($event, item, 'initial')"
            /> -->
            <div class="picture select-none">
              <el-avatar
                v-contextmenu:contextmenu
                :size="36"
                shape="circle"
                :src="item.avatar || circleUrl"
                @error="() => true"
              >
                <img :src="circleUrl" />
              </el-avatar>
            </div>
            <div
              v-contextmenu:contextmenu
              class="message-view__item--index"
            >
              <!-- <div
              v-contextmenu:contextmenu
              :class="msgOne(item)"
            > -->
              <!-- <NameComponent :item="item" /> -->
              <span
                v-if="group && !ISown(item)"
                class="name"
                >{{ item.userName }}</span
              >
              <div
                :id="item.ID"
                :class="Megtype(item.type)"
              >
                <component
                  :is="loadMsgModule(item)"
                  :key="item.ID"
                  :message="item"
                  :status="item.status"
                  :self="ISown(item)"
                />
              </div>
            </div>
            <!-- 消息发送加载状态 -->
            <!-- <Stateful
              :item="item"
              :status="item.status"
              :isown="ISown(item)"
            /> -->
          </div>
        </div>
      </div>
    </el-scrollbar>
    <!-- 卡片 -->
    <!-- <MyPopover /> -->
    <!-- <contextmenu
      ref="contextmenu"
      :disabled="!isRight"
    >
      <contextmenu-item
        v-for="item in RIGHT_CLICK_MENU_LIST"
        :key="item.id"
        @click="handlRightClick(item)"
      >
        <p :class="['item', currentType == 'GROUP' ? 'group' : 'C2C']">
          {{ item.text }}
        </p>
      </contextmenu-item>
    </contextmenu> -->
  </section>
</template>

<script setup>
import {
  // h,
  ref,
  // watch,
  reactive,
  nextTick,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue'
import { Megtype } from '../utils/utils'
// import { validatelastMessage, Megtype, msgOne } from "../utils/utils";
// import { handleCopyMsg, validatelastMessage, Megtype, msgOne } from "../utils/utils";
import { circleUrl } from '../utils/menu'
// import { circleUrl, MENU_LIST, RIGHT_CLICK_MENU_LIST } from "../utils/menu";
// import { useStore } from "vuex";
// import { showConfirmationBox } from "@/utils/message";

// import { debounce } from "lodash-es";
// import { useState, useGetters } from "@/utils/hooks/useMapper";
// import Checkbox from "../components/Checkbox.vue";
// import Stateful from "./Stateful.vue"
// import LoadMore from "./LoadMore.vue";
// import MyPopover from "@/views/components/MyPopover/index.vue";
// import { HISTORY_MESSAGE_COUNT } from "@/store/constants";
// import { HISTORY_MESSAGE_COUNT, MULTIPLE_CHOICE_MAX } from "@/store/constants";
// import { getMsgList } from "@/api/im-sdk-api/index";
// import { deleteMsgList, revokeMsg, translateText, getMsgList } from "@/api/im-sdk-api/index";
import emitter from '@/utils/mitt-bus'

const group = true
// import NameComponent from "./NameComponent.vue"
import { timeFormat } from '@/utils/chat/index'

import TextElemItem from '../ElemItemTypes/TextElemItem.vue'
// import RelayElemItem from "../ElemItemTypes/RelayElemItem.vue";
// import TipsElemItem from "../ElemItemTypes/TipsElemItem.vue";
import ImageElemItem from '../ElemItemTypes/ImageElemItem.vue'
// import FileElemItem from "../ElemItemTypes/FileElemItem.vue";
// import CustomElemItem from "../ElemItemTypes/CustomElemItem.vue";
// import groupTipElement from "../ElemItemTypes/groupTipElement.vue";
// import GroupSystemNoticeElem from "../ElemItemTypes/GroupSystemNoticeElem.vue";

// const timeout = ref(false);
// const isRight = ref(true);
// const MenuItemInfo = ref([]);

const scrollbarRef = ref(null)
const messageViewRef = ref(null)
const currentMessageList = reactive([
  {
    ID: '1',
    time: 1711518614024,
    from: 1,
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    userName: '张三',
    type: 'TIMTextElem',
    content: '试试客户极度愤怒苏',
    translation: 'hdkfuifnufnsdknvksj'
  },
  {
    ID: '2',
    time: 1711528614024,
    from: 2,
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    userName: '李四',
    type: 'TIMTextElem',
    content: '试试客户极度愤怒苏',
    translation: 'hdkfuifnufnsdknvksj'
  },
  {
    ID: '3',
    time: 1711528614024,
    from: 1,
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    userName: '张三',
    type: 'TIMImageElem',
    imgUrl: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
    // content: '试试客户极度愤怒苏',
    // translation: 'hdkfuifnufnsdknvksj'
  },
  {
    ID: '4',
    time: 1711528614024,
    from: 2,
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    userName: '李四',
    type: 'TIMImageElem',
    imgUrl: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
    // content: '试试客户极度愤怒苏',
    // translation: 'hdkfuifnufnsdknvksj'
  }
])

const userID = 2
// const { dispatch, commit } = useStore();
// const { isOwner, currentType } = useGetters(["isOwner", "currentType"]);
// const {
//   noMore,
//   showMsgBox,
//   forwardData,
//   showCheckbox,
//   needScrollDown,
//   currentReplyMsg,
//   userProfile,
//   currentMessageList,
//   currentConversation,
// } = useState({
//   noMore: (state) => state.conversation.noMore,
//   showMsgBox: (state) => state.conversation.showMsgBox,
//   forwardData: (state) => state.conversation.forwardData,
//   showCheckbox: (state) => state.conversation.showCheckbox,
//   needScrollDown: (state) => state.conversation.needScrollDown,
//   userProfile: (state) => state.user.userProfile,
//   currentReplyMsg: (state) => state.conversation.currentReplyMsg,
//   currentMessageList: (state) => state.conversation.currentMessageList,
//   currentConversation: (state) => state.conversation.currentConversation,
// });

// const updateLoadMore = (newValue) => {
//   nextTick(() => {
//     const ViewRef = messageViewRef.value;
//     const elRef = ViewRef?.children?.[newValue - 1];
//     if (newValue > 0) {
//       elRef?.scrollIntoView({
//         block: "start",
//       });
//     } else {
//       elRef?.scrollIntoViewIfNeeded();
//     }
//   });
// };

// const showAvatar = (item) => {
//   return !item.isRevoked && item.type !== "TIMGroupTipElem" && item?.payload?.data !== "dithering";
// };

// const getElementById = (ID) => {
//   return document.getElementById(`choice${ID}`);
// };
// const setSelect = (el) => {
//   el.classList.toggle("style-select");
// };
// const handleSelect = (e, item, type = "initial") => {
//   // tip消息 撤回消息 抖动消息
//   if (
//     !showCheckbox.value ||
//     item.type == "TIMGroupTipElem" ||
//     item.isRevoked ||
//     item.payload?.data === "dithering"
//   ) {
//     return;
//   }
//   const _el = getElementById(item.ID);
//   const el = _el.getElementsByClassName("check-btn")[0];
//   if (!el.checked && forwardData.value.size >= MULTIPLE_CHOICE_MAX) {
//     commit("showMessage", {
//       message: `最多只能选择${MULTIPLE_CHOICE_MAX}条`,
//       type: "error",
//     });
//     return;
//   }
//   setSelect(_el.parentNode);
//   // 点击input框
//   if (type == "initial" && e.target.tagName !== "INPUT") {
//     const el = getElementById(item.ID);
//     setSelect(el.parentNode);
//   }
//   // 首次右键打开多选 默认选中当前
//   if (type == "choice") {
//     el.checked = true;
//     commit("SET_FORWARD_DATA", {
//       type: "set",
//       payload: item,
//     });
//   } else {
//     el.checked = !el.checked;
//     commit("SET_FORWARD_DATA", {
//       type: el.checked ? "set" : "del",
//       payload: item,
//     });
//   }
// };

// const isTime = (item) => {
//   return item?.isTimeDivider;
// };
const ISown = (item) => {
  return item.from === userID
}

// const onclickavatar = (e, item) => {
//   const isSelf = ISown(item);
//   if (isSelf || showCheckbox.value) return;
//   emitter.emit("setPopoverStatus", { status: true, seat: e, cardData: item });
// };
const scrollBottom = () => {
  try {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { scrollTop, clientHeight, scrollHeight } = scrollbarRef.value?.wrapRef
    const height = scrollTop + clientHeight
    const isbot = scrollHeight - height < 1
    isbot && console.log('到底部')
    return isbot
  } catch (error) {
    return false
  }
}
// const loadMoreFn = () => {
//   // if (!noMore.value) {
//   const current = currentMessageList.value?.length - 1;
//   // 第一条消息 加载更多 节点
//   const offsetTopScreen = messageViewRef.value?.children?.[current];
//   const top = offsetTopScreen?.getBoundingClientRect().top;
//   const canLoadData = top > 50; //滚动到顶部
//   canLoadData && getMoreMsg();
//   // }
//   const isbot = scrollBottom();
//   emitter.emit("onisbot", isbot);
// };
// const debouncedFunc = debounce(loadMoreFn, 250); //防抖处理

const scrollbar = () => {
  // debouncedFunc();
  console.log(111111)
}

const updateScrollBarHeight = (data) => {
  if (data == 'instantly') {
    scrollbarRef.value?.scrollTo(0, messageViewRef.value?.scrollHeight)
  } else {
    nextTick(() => {
      // messageViewRef.value?.firstElementChild?.scrollIntoView();
      scrollbarRef.value?.scrollTo(0, messageViewRef.value?.scrollHeight)
    })
  }
}

// const updateScrollbar = () => {
//   nextTick(() => {
//     scrollbarRef.value.update();
//   });
// };

// const getMoreMsg = async () => {
//   try {
//     // 获取指定会话的消息列表
//     const Conv = currentConversation.value;
//     const msglist = currentMessageList.value;
//     const { conversationID } = Conv;
//     // const { conversationID, toAccount } = Conv;
//     const { ID } = validatelastMessage(msglist);
//     const result = await getMsgList({
//       conversationID: conversationID,
//       nextReqMessageID: ID,
//     });
//     // const { isCompleted, messageList, nextReqMessageID } = result;
//     const { isCompleted, messageList } = result;
//     let noMore = true;
//     const Loadmore = messageList.length < HISTORY_MESSAGE_COUNT;
//     if (messageList.length > 0) noMore = Loadmore;
//     if (isCompleted || messageList.length == 0) {
//       console.log("[chat] 没有更多消息了 getMoreMsg:");
//       commit("SET_HISTORYMESSAGE", {
//         type: "UPDATE_NOMORE",
//         payload: noMore,
//       });
//       return;
//     }
//     const Response = messageList;
//     const payload = {
//       convId: conversationID,
//       messages: Response,
//     };
//     commit("SET_HISTORYMESSAGE", {
//       type: "ADD_MORE_MESSAGE",
//       payload,
//     });
//     commit("SET_CONVERSATION", {
//       type: "UPDATE_SCROLL_DOWN",
//       payload: msglist.length,
//     });
//   } catch (e) {
//     // 解析报错 关闭加载动画
//     commit("SET_HISTORYMESSAGE", {
//       type: "UPDATE_NOMORE",
//       payload: true,
//     });
//   }
// };
// 动态组件
const loadMsgModule = (item) => {
  const { type } = item
  // const { type, isRevoked, payload } = item;
  const CompMap = {
    TIMTextElem: TextElemItem, //文本消息
    // TIMRelayElem: RelayElemItem, // 合并转发消息
    TIMImageElem: ImageElemItem // 图片消息
    // TIMFileElem: FileElemItem, // 文件消息
    // TIMCustomElem: CustomElemItem, // 自定义消息
    // TIMGroupTipElem: groupTipElement, // 群消息提示
    // TIMGroupSystemNoticeElem: GroupSystemNoticeElem, // 系统通知
  }
  // if (isRevoked) return TipsElemItem;
  // if (type === "TIMCustomElem" && payload.data === "dithering") {
  //   return TipsElemItem;
  // }
  return CompMap[type] || null
}

// const handleContextAvatarMenuEvent = (event, item) => {
//   const { flow } = item;
//   const type = currentType.value;
//   if (type == "C2C" || flow == "out") {
//     isRight.value = false;
//     return;
//   }
//   isRight.value = true;
//   MenuItemInfo.value = item;
//   RIGHT_CLICK_MENU_LIST.value = AVATAR_LIST;
// };
// const handleContextMenuEvent = (event, item) => {
//   const { isRevoked, time, type, payload } = item;
//   console.log(item, "右键菜单数据");
//   const isTip = type == "TIMGroupTipElem";
//   const isFile = type == "TIMFileElem";
//   const isRelay = type == "TIMRelayElem";
//   const isDithering = payload?.data === "dithering";
//   const isCheckStatus = showCheckbox.value; // 多选状态
//   // 撤回消息 提示类型消息
//   if (isRevoked || isTip || isCheckStatus || isDithering) {
//     isRight.value = false;
//     return;
//   }
//   timeout.value = false;
//   isRight.value = true;
//   const nowtime = parseInt(new Date().getTime() / 1000);
//   MenuItemInfo.value = item;
//   const relinquish = nowtime - time < 120 ? true : false;
//   const self = ISown(item);
//   RIGHT_CLICK_MENU_LIST.value = MENU_LIST;
//   // 对方消息
//   if (!self) {
//     RIGHT_CLICK_MENU_LIST.value = MENU_LIST.filter((t) => t.id !== "revoke");
//   }
//   // 超过撤回时间
//   if (!relinquish) {
//     timeout.value = true;
//     RIGHT_CLICK_MENU_LIST.value = MENU_LIST.filter((t) => t.id !== "revoke");
//   }
//   // 群主 & 群聊 & 撤回时间不限制2分钟
//   if (isOwner.value && currentType.value === TIM.TYPES.CONV_GROUP) {
//     // if (!self)
//     RIGHT_CLICK_MENU_LIST.value = MENU_LIST;
//   }
//   // 合并消息
//   if (isRelay) {
//     RIGHT_CLICK_MENU_LIST.value = RIGHT_CLICK_MENU_LIST.value.filter((t) => t.id !== "copy");
//   }
//   // 非文件消息
//   if (!isFile) {
//     RIGHT_CLICK_MENU_LIST.value = RIGHT_CLICK_MENU_LIST.value.filter((t) => t.id !== "saveAs");
//   } else {
//     RIGHT_CLICK_MENU_LIST.value = RIGHT_CLICK_MENU_LIST.value.filter((t) => t.id !== "copy");
//   }
// };
// const handlRightClick = (data) => {
//   const info = MenuItemInfo.value;
//   const { id, text } = data;
//   switch (id) {
//     case "send": // 发起会话
//       handleSendMessage(info);
//       break;
//     case "ait": // @对方
//       handleAt(info);
//       break;
//     case "copy": //复制
//       handleCopyMsg(info);
//       break;
//     case "translate": // 翻译
//       handleTranslate(info);
//       break;
//     case "revoke": //撤回
//       handleRevokeMsg(info);
//       break;
//     case "forward": // 转发
//       handleForward(info);
//       break;
//     case "saveAs": //另存为
//       handleSave(info);
//       break;
//     case "reply": // 回复
//       handleReplyMsg(info);
//       break;
//     case "multiSelect": //多选
//       handleMultiSelectMsg(info);
//       break;
//     case "delete": //删除
//       handleDeleteMsg(info);
//       break;
//   }
// };
// const handleAt = (data) => {
//   const { from, nick, conversationType: type } = data;
//   if (type == "C2C") return;
//   emitter.emit("handleAt", { id: from, name: nick });
// };
// const handleSendMessage = (data) => {
//   dispatch("CHEC_OUT_CONVERSATION", { convId: `C2C${data.from}` });
// };
// 另存为
// const handleSave = (data) => {
//   const {
//     payload: { fileName, fileUrl },
//   } = data;
//   download(fileUrl, fileName);
// };

// const handleTranslate = (data) => {
//   const data1 = translateText({ textList: data.payload.text });
//   console.log(data1);
// };
// 转发
// const handleForward = (data) => {};
// // 回复消息
// const handleReplyMsg = (data) => {
//   commit("setReplyMsg", data);
//   !ISown(data) && handleAt(data);
// };
// 删除消息
// const handleDeleteMsg = async (data) => {
//   try {
//     const message = { message: "确定删除?", iconType: "warning" };
//     const result = await showConfirmationBox(message);
//     if (result == "cancel") return;
//     const { code } = await deleteMsgList([data]);
//     if (code !== 0) return;
//     const { conversationID, toAccount, to } = data;
//     const payload = { convId: conversationID, message: data };
//     commit("SET_HISTORYMESSAGE", {
//       type: "DELETE_MESSAGE",
//       payload,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// // 多选
// const handleMultiSelectMsg = (item) => {
//   commit("SET_CHEC_BOX", true);
//   handleSelect(null, item, "choice");
// };
// const handleRevokeChange = (msg, type) => {
//   if (msg.type !== "TIMTextElem") return;
//   commit("setRevokeMsg", { data: msg, type: type });
// };
// 撤回消息
// const handleRevokeMsg = async (data) => {
//   if (timeout.value) {
//     const result = await showConfirmationBox({ message: "确定撤回这条消息?", iconType: "warning" });
//     if (result == "cancel") return;
//   }
//   const { code, message } = await revokeMsg(data);
//   if (code !== 0) return;
//   if (message.flow !== "out") return;
//   handleRevokeChange(message, "set");
//   setTimeout(() => {
//     handleRevokeChange(message, "delete");
//   }, 60000);
// };

// watch(
//   needScrollDown,
//   (data) => {
//     updateLoadMore(data);
//   },
//   {
//     deep: true, //深度监听
//     immediate: true,
//   }
// );
// watch(currentReplyMsg, () => {
//   updateScrollbar();
// });

emitter.on('updataScroll', (data) => {
  if (data == 'bottom') {
    scrollBottom() && updateScrollBarHeight()
  } else {
    updateScrollBarHeight(data)
  }
})

onMounted(() => {})
onUnmounted(() => {})
onUpdated(() => {})
onBeforeUpdate(() => {})
onBeforeUnmount(() => {})

// eslint-disable-next-line no-undef
defineExpose({ updateScrollBarHeight })
// defineExpose({ updateScrollbar, updateScrollBarHeight });
</script>

<style lang="scss" scoped>
@import url('../style/elemType.scss');
.message-info-view-content {
  height: calc(100% - 320px) !important;
}
.style-MsgBox {
  height: calc(100% - 60px) !important;
}
.stlyle-Reply {
  height: calc(100% - 70px - 206px - 60px) !important;
}
.message-view__item--time-divider {
  user-select: none;
  position: relative;
  top: 8px;
  margin: 20px 0;
  max-height: 20px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  color: #9f9f9f;
}
.message-view {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  overflow-y: overlay;
  overflow-x: hidden;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
  .picture {
    --el-border-radius-base: 6px;
    cursor: pointer;
  }
}
.style-select {
  border-radius: 3px;
  background: var(--color-multiple-choice);
}
.reset-select {
  border-radius: 3px;
}
.style-choice {
  padding-left: 35px;
}
.message-view__item {
  display: flex;
  flex-direction: row;
  margin: 8px 0;
  position: relative;
}
.is-other {
  .picture {
    margin-left: 0;
    margin-right: 8px;
  }
  .message-view__img {
    margin-bottom: 5px;
    width: fit-content;
  }

  .message-view__file {
    margin-bottom: 5px;
  }

  .message-view__text {
    width: fit-content;
    margin-bottom: 5px;
  }
}

.name {
  font-weight: 400;
  font-size: 16px;
  color: #909194;
  line-height: 22px;
}
.is-self {
  flex-direction: row-reverse;
  display: flex;
  .picture {
    margin-right: 0;
    margin-left: 8px;
    width: 36px;
    height: 36px;
  }
  .message_name {
    display: none;
  }
  .message-view__img {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .message-view__file {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .message-view__text {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.v-contextmenu {
  width: 200px;
  .item {
    margin: 0;
  }
}
</style>
