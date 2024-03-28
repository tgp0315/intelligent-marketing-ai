<template>
  <div
    id="svgDown"
    class="wangeditor"
  >
    <!-- 自定义工具栏 -->
    <RichToolbar @set-toolbar="setToolbar" />
    <Editor
      v-model="html"
      class="editor-content"
      :default-config="editorConfig"
      :mode="mode"
      @drop="dropHandler"
      @on-created="handleEditor"
      @keyup.enter="handleEnter"
    />
    <!-- @ mention弹框 -->
    <!-- <mention-modal
      ref="mentionRef"
      v-if="isShowModal"
      :pinyinSearch="true"
      :isOwner="isOwner"
      @insertMention="insertMention"
    /> -->
    <el-tooltip
      effect="dark"
      :content="placeholderMap[systemOs]"
    >
      <el-button
        class="btn-send"
        type="primary"
        @click="handleEnter()"
      >
        发送
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup>
import '../utils/custom-menu'
import '@wangeditor/editor/dist/css/style.css'
import { Editor } from '@wangeditor/editor-for-vue'
import RichToolbar from './RichToolbar.vue'
import { getOperatingSystem } from '@/utils/getOperatingSystem'
import { isEmpty } from 'lodash-es'
import { shallowRef, onBeforeUnmount } from 'vue'
const systemOs = getOperatingSystem()
const placeholderMap = () => {
  return {
    Windows: '按Enter发送消息, Ctrl + Enter 换行',
    macOS: '按Enter发送消息, Meta⌘ + Enter 换行'
  }
}
const editorConfig = {
  placeholder: placeholderMap[systemOs],
  MENU_CONF: {},
  EXTEND_CONF: {
    mentionConfig: {
      pinyinSearch: true
    }
  },
  hoverbarKeys: {
    link: {
      // 重写 link 元素的 hoverbar
      menuKeys: ['editLink', 'unLink', 'viewLink']
    },
    image: {
      // 清空 image 元素的 hoverbar
      // menuKeys: [],
    }
  }
}
// import {
//   sendChatMessage,
//   customAlert,
//   // parseHTMLToArr,
//   extractFilesInfo,
//   // extractAitInfo,
//   getOperatingSystem,
//   handleToggleLanguage,
//   filterMentionList,
//   handleEditorKeyDown,
// } from "../utils/utils";
// // import { useStore } from "vuex";
// // import { useState, useGetters } from "@/utils/hooks/useMapper";
// import MentionModal from "./MentionModal.vue";
// import { debounce, isEmpty } from "lodash-es";

const editorRef = shallowRef() // 编辑器实例，必须用 shallowRef
const mode = 'simple' // 'default' 或 'simple'

// const { dispatch, commit } = useStore();
// const { isOwner, toAccount } = useGetters(["isOwner", "toAccount"]);
// const {
//   lang,
//   currentConversation,
//   showMsgBox,
//   showCheckbox,
//   isShowModal,
//   currentReplyMsg,
//   sessionDraftMap,
// } = useState({
//   lang: (state) => state.settings.lang,
//   sessionDraftMap: (state) => state.conversation.sessionDraftMap,
//   currentConversation: (state) => state.conversation.currentConversation,
//   showCheckbox: (state) => state.conversation.showCheckbox,
//   showMsgBox: (state) => state.conversation.showMsgBox,
//   isShowModal: (state) => state.conversation.isShowModal,
//   currentReplyMsg: (state) => state.conversation.currentReplyMsg,
// });

const handleEditor = (editor, created = true) => {
  if (created) {
    editorRef.value = editor
  } else {
    if (editor == null) return
    // 组件销毁时，及时销毁编辑器
    editor.destroy()
  }
}

// const insertMention = ({ id, name, backward = true, deleteDigit = 0 }) => {
//   const editor = editorRef.value;
//   const mentionNode = {
//     type: "mention", // 必须是 'mention'
//     value: `${name} `, // 文本
//     info: { id }, // 其他信息，自定义
//     children: [{ text: "" }], // 必须有一个空 text 作为 children
//   };
//   editor?.restoreSelection(); // 恢复选区
//   if (deleteDigit) {
//     for (let i = 0; i < deleteDigit; i++) {
//       editor.deleteBackward("character");
//     }
//   } else if (backward) {
//     editor.deleteBackward("character"); // 删除 '@'
//   }
//   editor.insertNode(mentionNode); // 插入 mention
//   editor.move(1); // 移动光标
// };
const setToolbar = (item) => {
  const { data } = item
  // switch (key) {
  //   case "setEmoj":
  setEmoj(data.url, data.item)
  //     break;
  //   case "setPicture":
  //     setPicture(data.files);
  //     break;
  //   case "setParsefile":
  //     setParsefile(data.files);
  //     break;
  //   case "shake":
  //     console.log("shake");
  //     break;
  // }
}
// // 插入草稿
// const insertDraft = (value) => {
//   if (!value) return;
//   const editor = editorRef.value;
//   editor && editor.focus(true);
//   const { conversationID: ID } = value;
//   const draftMap = sessionDraftMap.value;
//   const draft = draftMap.get(ID);
//   clearInputInfo();
//   draft?.forEach((item) => {
//     editor.insertNode(item.children);
//   });
// };

// // 更新草稿
// const updateDraft = debounce((data) => {
//   commit("SET_SESSION_DRAFT", {
//     ID: currentConversation?.value?.conversationID,
//     payload: data,
//   });
// }, 300);

// const handleAt = debounce((editor) => {
//   filterMentionList(editor.getText(), editor.getHtml());
// }, 150);

// const onChange = (editor) => {
//   const content = editor.children;
//   messages.value = content;
//   updateDraft(content);
//   handleAt(editor);
// };

// const handleFile = (item) => {
//   const type = item.type;
//   let pasteFile = item.getAsFile();
//   if (type.match("^image/")) {
//     parsepicture(pasteFile);
//   } else {
//     parsefile(pasteFile);
//   }
// };

// const handleString = (item, editor) => {
//   item.getAsString((str) => {
//     parsetext(str, editor);
//   });
// };

// const kindHandlers = {
//   file: handleFile,
//   string: handleString,
// };

const customPaste = (editor, event, callback) => {
  console.log('ClipboardEvent 粘贴事件对象', event)
  const text = event.clipboardData?.getData('text/plain') // 获取粘贴的纯文本
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent DragEvent 拖拽
  // https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent ClipboardEvent 粘贴
  const items = event?.clipboardData?.items ?? event?.dataTransfer?.items
  for (const item of items) {
    const { kind } = item
    const handler = kindHandlers[kind]
    handler && handler(item, editor)
  }
  text && editor.insertText(text)
  event.preventDefault()
  callback?.(false)
}
// 拖拽事件
const dropHandler = (event) => {
  customPaste(editorRef.value, event)
}
// // 插入文件
// const parsefile = async (file) => {
//   try {
//     const { size, name } = file;
//     const fileSize = bytesToSize(size);
//     const base64Url = await fileImgToBase64Url(file);
//     const FileElement = {
//       type: "attachment",
//       fileName: name,
//       fileSize: fileSize,
//       link: base64Url,
//       children: [{ text: "" }], // void 元素必须有一个 children ，其中只有一个空字符串，重要！！！
//     };
//     editorRef.value.restoreSelection(); // 恢复选区
//     editorRef.value.insertNode(FileElement);
//     editorRef.value.move(1); // 移动光标
//   } catch (error) {
//     console.log(error);
//   }
// };
// const parsetext = (item) => {
//   console.log(item);
// };
const setEmoj = (url, item) => {
  const ImageElement = {
    type: 'image',
    class: 'EmoticonPack',
    src: url,
    alt: item,
    href: '',
    style: { width: '26px' },
    children: [{ text: '' }]
  }

  editorRef.value.restoreSelection()
  editorRef.value.insertNode(ImageElement)
  editorRef.value.focus(true)
  // editorRef.value.showProgressBar(100); // 进度条
}
// const setPicture = (data) => {
//   parsepicture(data);
//   const editor = editorRef.value;
//   editor && editor.focus();
// };
// const setParsefile = (data) => {
//   parsefile(data);
// };
// // 插入图片
// const parsepicture = async (file) => {
//   const base64Url = await fileImgToBase64Url(file);
//   const ImageElement = {
//     type: "image",
//     class: "img",
//     src: base64Url,
//     alt: "",
//     href: "",
//     style: { width: "125px" },
//     children: [{ text: "" }],
//   };
//   editorRef.value.insertNode(ImageElement);
// };
// // 回车
const handleEnter = (event) => {
  if (event?.ctrlKey) return
  // if (isShowModal.value) {
  //   mentionRef.value.inputKeyupHandler(event);
  //   return;
  // }
  const editor = editorRef.value
  const empty = editor.isEmpty() // 判断当前编辑器内容是否为空
  const { textMsg, aitStr, files, image } = sendMsgBefore()
  if ((!empty && !isEmpty(textMsg)) || image || aitStr || files) {
    sendMessage()
  } else {
    clearInputInfo()
  }
}
// // 清空输入框
const clearInputInfo = () => {
  // commit("setReplyMsg", null);
  const editor = editorRef.value
  editor && editor.clear()
}

const sendMsgBefore = () => {
  const editor = editorRef.value
  const text = editor.getText() // 纯文本内容
  const HtmlText = editor.getHtml() // 非格式化的 html
  const image = editor.getElemsByType('image') // 所有图片
  const { aitStr, aitlist } = extractAitInfo(editor)
  // const { fileName, link } = extractFilesInfo(HtmlText);
  const emoticons = convertEmoji(HtmlText, image)
  // const ElementArray = parseHTMLToArr(HtmlText);
  return {
    // convId: toAccount.value,
    // convType: currentConversation.value.type,
    textMsg: emoticons || text,
    image: image?.length > 0 && !emoticons ? image : null,
    aitStr: emoticons || aitStr,
    aitlist
    // files: link ? { fileName, src: link } : null,
    // reply: currentReplyMsg.value,
  }
}

const extractAitInfo = (editor) => {
  let aitStr = ''
  let aitlist = []
  const html = editor.getHtml()
  if (html.includes('mention')) {
    aitStr = html.replace(/<[^>]+>/g, '').replace(/&nbsp;/gi, '')
    const paragraph = editor.children[0].children
    const newmsg = paragraph.filter((t) => t.type === 'mention')
    newmsg.forEach((t) => aitlist.push(t.info.id))
    aitlist = Array.from(new Set(aitlist))
  }
  return { aitStr, aitlist }
}

// const extractFilesInfo = (html) => {
//   const matchStr = html.match(/data-link="([^"]*)"/);
//   const matchStrName = html.match(/data-fileName="([^"]*)"/);
//   const fileName = matchStrName?.[1];
//   const link = matchStr?.[1];
//   return { fileName, link };
// }

function convertEmoji(html, emojiMap) {
  if (!html || !emojiMap || !Array.isArray(emojiMap)) return ''
  const filteredData = emojiMap.filter((item) => item.class === 'EmoticonPack')
  if (filteredData.length == 0) return false
  const convertedData = filteredData.map((item) => ({
    [item.src]: item.alt
  }))
  const emojiMapExtended = {
    ...Object.assign(...convertedData)
  }
  const regex = /<img src="([^"]+)"[^>]+>/g
  const result = html.replace(regex, (match, src) => {
    const emojiText = emojiMapExtended[src] || ''
    return emojiText
  })
  const text = result.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '')
  return text
}

// 发送消息
const sendMessage = async () => {
  const data = sendMsgBefore()
  console.log('sendMsgBefore:', data)
  // const message = await sendChatMessage(data);
  // const message = await createCustomMsg({
  //   convId: toAccount.value,
  //   convType: currentConversation.value.type,
  //   customType: "dithering",
  // });
  // console.log("sendChatMessage:", message);
  clearInputInfo()
  // dispatch("SESSION_MESSAGE_SENDING", {
  //   payload: {
  //     convId: currentConversation.value.conversationID,
  //     message,
  //   },
  // });
}
// const setEditHtml = (text) => {
//   const editor = editorRef.value;
//   editor.setHtml(`<p>${text}</p>`);
//   editor.focus(true);
// };
// const onEmitter = () => {
//   emitter.on("handleAt", ({ id, name }) => {
//     insertMention({ id, name, backward: false });
//   });
//   emitter.on("handleSetHtml", (text) => {
//     text && setEditHtml(text);
//   });
//   emitter.on("handleInsertDraft", (value) => {
//     value && insertDraft(value);
//   });
// };
// function offEmitter() {
//   emitter.off("handleAt");
//   emitter.off("handleSetHtml");
//   emitter.off("handleInsertDraft");
// }

// watch(showMsgBox, () => {
//   handleEditorKeyDown();
// });
// watch(lang, () => {
//   handleToggleLanguage();
// });
// onActivated(() => {
//   handleEditorKeyDown();
// });
// onDeactivated(() => {
//   offEmitter();
// });
// onMounted(() => {
//   onEmitter();
// });
onBeforeUnmount(() => {
  handleEditor(editorRef.value, false)
})
</script>

<style lang="scss" scoped>
.wangeditor {
  word-break: break-all;
  height: 246px;
  margin: 0 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  .editor-content {
    height: calc(100% - 40px) !important;
    overflow-y: hidden;
    :deep(.w-e-text-container p) {
      margin: 0;
    }
    :deep(.w-e-image-dragger) {
      display: none;
    }
    :deep(.w-e-text-placeholder) {
      font-style: normal;
      font-size: 15px;
      top: 5px;
    }
    :deep(.w-e-selected-image-container) {
      overflow: visible;
    }
    :deep(.w-e-scroll) {
      @include scrollBar;
    }
  }
}
.btn-send {
  width: 70px;
  height: 32px;
  background: #165dff;
  border-radius: 8px 8px 8px 8px;
  line-height: 32px;
  position: absolute;
  bottom: 20px;
  right: 16px;
}
</style>
