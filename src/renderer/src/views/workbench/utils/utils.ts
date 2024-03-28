// import { nextTick } from 'vue'
// import store from "@/store/index";
// import { match } from "pinyin-pro";
// import { useClipboard } from "@vueuse/core";
// import {
//   createTextMsg,
//   createTextAtMsg,
//   // createFiletMsg,
//   // createImgtMsg,
//   // createCustomMsg,
// } from "@/api/im-sdk-api/index";
// import { placeholderMap } from "./configure";

// export const dragControllerDiv = (node) => {
//   const svgResize = document.getElementById('svgResize') //滑块
//   const svgTop = document.getElementById('svgTop') //聊天框
//   const svgDown = document.getElementById('svgDown') //编辑器
//   const svgBox = document.getElementById('svgBox') //整个盒子
//   // 按下鼠标执行
//   svgResize.onmousedown = (e) => {
//     const startY = e.clientY //鼠标按下 起始Y
//     svgResize.top = svgResize.offsetTop
//     // 事件会在鼠标指针移到指定的对象时发生。
//     document.onmousemove = (e) => {
//       const endY = e.clientY //鼠标移动 结束得y
//       //移动距离 = 原来高度+（结束y-开始y）
//       let moveLen = svgResize.top + (endY - startY)
//       // 最大移动距离 = 整个盒子高度 - 现在高度
//       const maxT = svgBox.clientHeight - svgResize.offsetHeight
//       // 控制移动最小
//       if (moveLen < 200) moveLen = 200
//       // 控制移动最大
//       if (moveLen > maxT - 200) moveLen = maxT - 200
//       svgResize.style.top = moveLen
//       svgTop.style.height = moveLen - 60 + 'px'
//       svgDown.style.height = svgBox.clientHeight - moveLen - 5 + 'px'
//     }
//     // 鼠标按键被松开时执行
//     document.onmouseup = () => {
//       document.onmousemove = null
//       document.onmouseup = null
//       svgResize.releaseCapture && svgResize.releaseCapture()
//       // 手动更新滚动条高度
//       node.updateScrollbar()
//     }
//     svgResize.setCapture && svgResize.setCapture()
//     return false
//   }
// }

export const validatelastMessage = (msglist) => {
  return (
    msglist
      .slice()
      .reverse()
      .find((msg) => msg.ID) || null
  )
}

// 复制
// export const handleCopyMsg = async (data) => {
//   const { elements } = data;
//   const { content, type } = elements[0];
//   console.log(elements[0]);
//   // 文本
//   if (type === "TIMTextElem") {
//     // const { text, copy, isSupported } = useClipboard({ source: content.text });
//     const { copy, isSupported } = useClipboard({ source: content.text });
//     if (isSupported) {
//       copy(content.text);
//       store.commit("showMessage", { message: "复制成功" });
//     } else {
//       store.commit("showMessage", { message: "您的浏览器不支持剪贴板API" });
//     }
//   }
//   // 图片
//   if (type === "TIMImageElem") {
//     const url = content.imageInfoArray[1].imageUrl;
//     const imageBlob = await getBlob(url);
//     // 创建一个空的 ClipboardItem 对象，并将图片添加到其中
//     const clipboardItem = new ClipboardItem({ "image/png": imageBlob });
//     // 将 ClipboardItem 对象添加到剪贴板
//     navigator.clipboard
//       .write([clipboardItem])
//       .then(() => {
//         store.commit("showMessage", { message: "图片复制成功" });
//       })
//       .catch((error) => {
//         console.error("写入剪贴板时出错:", error);
//       });
//   }
// };

export const GroupSystemNotice = (message) => {
  const groupName = message.payload.groupProfile.name || message.payload.groupProfile.groupID
  switch (message.payload.operationType) {
    case 1:
      return `${message.payload.operatorID} 申请加入群组：${groupName}`
    case 2:
      return `成功加入群组：${groupName}`
    case 3:
      return `申请加入群组：${groupName}被拒绝`
    case 4:
      return `你被管理员${message.payload.operatorID}踢出群组：${groupName}`
    case 5:
      return `群：${groupName} 已被${message.payload.operatorID}解散`
    case 6:
      return `${message.payload.operatorID}创建群：${groupName}`
    case 7:
      return `${message.payload.operatorID}邀请你加群：${groupName}`
    case 8:
      return `你退出群组：${groupName}`
    case 9:
      return `你被${message.payload.operatorID}设置为群：${groupName}的管理员`
    case 10:
      return `你被${message.payload.operatorID}撤销群：${groupName}的管理员身份`
    case 12:
      return `${message.payload.operatorID}邀请你加群：${groupName}`
    case 13:
      return `${message.payload.operatorID}同意加群：${groupName}`
    case 14:
      return `${message.payload.operatorID}拒接加群：${groupName}`
    case 255:
      return '自定义群系统通知: ' + message.payload.userDefinedField
    default:
      return '待开发'
  }
}

// 动态class
export const Megtype = (elem_type) => {
  let resp = ''
  switch (elem_type) {
    case 'TIMTextElem':
      resp = 'message-view__text' // 文本
      break
    case 'TIMGroupTipElem':
      resp = 'message-view__tips-elem' // 群消息提示
      break
    case 'TIMImageElem':
      resp = 'message-view__img' // 图片消息
      break
    case 'TIMFileElem':
      resp = 'message-view__file' // 文件消息
      break
    case 'TIMGroupSystemNoticeElem':
      resp = 'message-view__system' // 系统通知
      break
    case 'TIMCustomElem':
      resp = 'message-view__text message-view__custom' // 自定义消息
      break
    default:
      resp = ''
      break
  }
  return resp
}

export const msgOne = (item) => {
  const { isRevoked, type, payload } = item
  if (isRevoked || type === 'TIMGroupTipElem' || payload?.data === 'dithering') {
    return 'message-view__tips-elem'
  } else {
    return 'message-view__item--index'
  }
}

/**
 * 将字符串中的特殊字符进行 HTML 转义
 * @param {string} str - 待转义的字符串
 * @returns {string} - 转义后的字符串
 */
export const html2Escape = (str) => {
  // 使用对象映射，避免多个 if/else 分支
  const map = {
    '<': '&lt;',
    '>': '&gt;',
    // "&": "&amp;",
    '"': '&quot;'
  }
  return str.replace(/[<>&"]/g, function (c) {
    return map[c]
  })
}

/**
 * 发送聊天消息
 * @param {string} convId - 会话ID
 * @param {string} convType - 会话类型（单聊/群聊）
 * @param {Object} options - 消息选项
 * @param {string} [options.textMsg] - 文本消息内容（可选）
 * @param {string[]} [options.aitlist] - 艾特用户列表（可选）
 * @param {Object[]} [options.files] - 文件（可选）
 * @param {string} [options.files.fileName] - 文件名（可选）
 * @param {string} [options.files.src] - 文件数据URL（可选）
 * @param {Object[]} [options.image] - 图片（可选）
 * @param {string} [options.image.src] - 图片数据URL（可选）
 * @returns {Promise<Object>} - 返回聊天消息对象
 *
 */
export async function sendChatMessage(options) {
  let TextMsg
  // const flag = true;
  // const { convType, textMsg, aitStr, aitlist } = options;
  console.log(options)
  // 如果包含文件，则创建相应的文件消息
  // if (files) {
  //   const { fileName, src } = files;
  //   const file = dataURLtoFile(src, fileName);
  //   TextMsg = await createFiletMsg({
  //     convId: convId,
  //     convType: convType,
  //     files: file,
  //   });
  //   flag = false;
  // }
  // 如果包含图片，则创建相应的图片消息
  // if (image) {
  //   const file = dataURLtoFile(image[0].src);
  //   TextMsg = await createImgtMsg({
  //     convId: convId,
  //     convType: convType,
  //     image: file,
  //   });
  //   flag = false;
  // }
  // 如果包含艾特，则创建相应的艾特消息
  // if (aitStr) {
  //   TextMsg = await createTextAtMsg({
  //     // convId: convId,
  //     convType: convType,
  //     textMsg: aitStr,
  //     atUserList: aitlist,
  //     // reply,
  //   });
  // }
  // // 否则创建文本消息
  // else if (flag) {
  //   TextMsg = await createTextMsg({
  //     // convId: convId,
  //     convType: convType,
  //     textMsg: textMsg,
  //     // reply,
  //   });
  // }
  TextMsg.status = 'unSend'
  return TextMsg
}

// export const customAlert = (s, t) => {
//   console.log(s, t)
//   switch (t) {
//     case 'success':
//       console.log('success')
//       break
//     case 'info':
//       console.log('info')
//       break
//     case 'warning':
//       console.log('warning')
//       break
//     case 'error':
//       console.log('error')
//       break
//     default:
//       console.log('default')
//       break
//   }
// }

// export const chatName = (item) => {
//   switch (item.type) {
//     case 'C2C':
//       return item.userProfile.nick || item.userProfile.userID
//     case 'GROUP':
//       return item.groupProfile.name
//     case '@TIM#SYSTEM':
//       return '系统通知'
//     default:
//       return ''
//   }
// }
// 是否全员群
// export const isallStaff = (item, field = 'all_staff') => {
//   return item?.groupProfile?.groupCustomField?.[0]?.value == field
// }
/**
 * 将给定的 HTML 字符串解析为 数组
 * @param {string} html - 要解析的 HTML 字符串
 * @returns {Array} - 解析后的 数组
 */
// export function parseHTMLToArr(html) {
//   const parser = new DOMParser()
//   const doc = parser.parseFromString(html, 'text/html')
//   const elements = Array.from(doc.body.children[0].childNodes)
//   const arr = elements.map((element) => {
//     const obj = {}
//     if (element.tagName === 'IMG') {
//       obj.elem_type = 1
//       obj.image_path = element.getAttribute('src')
//     } else {
//       obj.elem_type = 0
//       obj.text_content = element.textContent.trim()
//     }
//     return obj
//   })
//   return arr
// }

// export function parseContentFromHTML(html) {
//   const parser = new DOMParser()
//   const doc = parser.parseFromString(html, 'text/html')
//   const content = doc.body.textContent // trim()
//   return content
// }

/**
 * 从 HTML 中提取文件信息
 * @param {string} html - 包含文件信息的 HTML 字符串
 * @returns {Object} - 包含文件名和链接的对象
 */
// export const extractFilesInfo = (html) => {
//   const matchStr = html.match(/data-link="([^"]*)"/)
//   const matchStrName = html.match(/data-fileName="([^"]*)"/)
//   const fileName = matchStrName?.[1]
//   const link = matchStr?.[1]
//   return { fileName, link }
// }

/**
 * 从编辑器中提取 Ait 信息
 * @param {Object} editor - 编辑器对象，包含编辑器的内容和方法
 * @returns {Object} - 包含提及字符串和提及的 id 列表的对象
 */
// export const extractAitInfo = (editor) => {
//   let aitStr = ''
//   let aitlist = []
//   const html = editor.getHtml()
//   if (html.includes('mention')) {
//     aitStr = html.replace(/<[^>]+>/g, '').replace(/&nbsp;/gi, '')
//     const paragraph = editor.children[0].children
//     const newmsg = paragraph.filter((t) => t.type === 'mention')
//     newmsg.forEach((t) => aitlist.push(t.info.id))
//     aitlist = Array.from(new Set(aitlist))
//   }
//   return { aitStr, aitlist }
// }

/**
 * 比较两个用户的 userID，用于排序
 * @param {Object} a - 第一个用户对象
 * @param {Object} b - 第二个用户对象
 * @returns {number} - 返回比较结果，-1 表示 a 在 b 前面，1 表示 b 在 a 前面，0 表示相等
 */
// export const compareUserID = (a, b) => {
//   const aHasRBT = a.userID.includes('@RBT#')
//   const bHasRBT = b.userID.includes('@RBT#')
//   return aHasRBT && !bHasRBT ? -1 : bHasRBT && !aHasRBT ? 1 : 0
// }

/**
 * 根据拼音搜索当前成员列表中的匹配项。
 * @param {string} searchStr - 要搜索的拼音字符串。
 * @returns {Array} - 匹配项的数组。
 */
// export function searchByPinyin(searchStr) {
//   // debugger;
//   // 获取当前成员列表
//   const memberList = store.state?.groupinfo?.currentMemberList;
//   // 过滤掉当前用户的信息
//   const filteredList = memberList.filter(
//     (member) => member.userID !== store.state?.user.userProfile.userID
//   );
//   // 如果过滤后的列表为空，触发空结果的事件并返回
//   if (!filteredList || filteredList.length === 0) {
//     store.commit("EMITTER_EMIT", {
//       key: "setMentionModal",
//       value: { type: "empty" },
//     });
//     return "empty";
//   }
//   // 存储匹配项的索引
//   const indices = [];
//   // 遍历过滤后的成员列表
//   filteredList.forEach((item) => {
//     // 使用 match 函数进行拼音匹配
//     const nickPinyin = match(item.nick, searchStr);
//     // 如果拼音匹配结果长度大于 0，将当前项添加到索引数组中
//     if (nickPinyin?.length > 0) {
//       indices.push(item);
//     }
//   });
//   const isShowModal = store.state?.conversation.isShowModal;
//   console.log("isShowModal:", isShowModal);
//   // 触发相应的事件根据匹配结果触发不同的操作
//   const eventType = indices.length === 0 ? "empty" : "success";
//   if (!isShowModal && eventType === "success") {
//     // store.commit("SET_MENTION_MODAL", true);
//   }
//   store.commit("EMITTER_EMIT", {
//     key: "setMentionModal",
//     value: {
//       content: indices,
//       type: eventType,
//       searchlength: searchStr.length + 1, // +1 包含@长度
//     },
//   });
//   return eventType;
// }

/**
 * 根据输入的字符串过滤提及列表并触发相关操作。
 * @param {string} inputStr - 输入的字符串。
 */
// export function filterMentionList(Str, Html) {
//   // debugger;
//   // 如果当前类型不是群聊
//   if (store.getters.currentType !== "GROUP") return;
//   const inputStr = Str;
//   // 如果输入字符串为空，关闭提及模态框并返回
//   if (inputStr === "") {
//     store.commit("SET_MENTION_MODAL", false);
//     return;
//   }
//   // 如果输入字符串中没有 "@" 符号，直接返回
//   if (inputStr.lastIndexOf("@") == -1) {
//     store.commit("SET_MENTION_MODAL", false);
//     return;
//   }
//   const inputHtml = parseContentFromHTML(Html);
//   console.log("inputStr:", Str);
//   // console.log("inputHtml:", inputHtml);
//   const isShowModal = store.state?.conversation.isShowModal;
//   // console.log("isShowModal:", isShowModal);
//   // console.log("inputStr:", inputStr);
//   // console.log("endsWith@:", inputStr.endsWith("@"));
//   // 如果输入字符串仅包含 "@" 符号，或则字符结尾，触发 setMentionModal 操作并返回
//   if (inputStr === "@" && inputStr.endsWith("@")) {
//     // if (!isShowModal) {
//     //   store.commit("SET_MENTION_MODAL", true);
//     // }
//     // store.commit("EMITTER_EMIT", {
//     //   key: "setMentionModal",
//     //   value: {
//     //     type: "all",
//     //     searchValue: inputStr,
//     //   },
//     // });
//     return "all";
//   }
//   store.commit("EMITTER_EMIT", {
//     key: "setMentionModal",
//     value: { type: "updata" },
//   });
//   // 获取最后一个 "@" 符号的索引位置
//   const lastAtIndex = inputStr.lastIndexOf("@");
//   // 如果找不到 "@" 符号，关闭提及模态框并返回
//   if (lastAtIndex === -1) {
//     store.commit("SET_MENTION_MODAL", false);
//     return;
//   }
//   const text = inputStr.substring(lastAtIndex);
//   const searchValue = text.substring(1);
//   console.log("searchValue:", searchValue);
//   if (!searchValue) return;
//   // 执行根据拼音搜索的操作
//   return searchByPinyin(searchValue);
// }

/**
 * 根据图片的宽度和高度计算展示图片的样式
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 * @returns {Object} - 包含展示图片的宽度和高度的样式对象
 */
// export const showIMPic = (width, height) => {
//   let picStyle = {}
//   if (width >= 140) {
//     picStyle = {
//       width: 140 + 'px',
//       height: Math.round((140 / width) * height) + 'px'
//     }
//   } else if (width <= 35) {
//     picStyle = {
//       width: 45 + 'px',
//       height: Math.round((45 / width) * height) + 'px'
//     }
//   } else {
//     picStyle = {
//       width: width + 'px',
//       height: height + 'px'
//     }
//   }
//   return picStyle
// }

/**
 * 获取图片的宽度和高度属性
 * @param {string} imageUrl - 图片地址
 * @returns {Promise<{width: number, height: number}>} - 包含图片宽度和高度的 Promise 对象
 * 'blob:http://localhost:8080/98f11c82-d402-4d7d-b49f-07a05bb75e89';
 */
// export function getImageSize(imageUrl) {
//   return new Promise((resolve, reject) => {
//     const img = new Image()
//     img.onload = function () {
//       const width = this.width
//       const height = this.height
//       resolve({ width, height })
//     }
//     img.onerror = function () {
//       reject(new Error('Failed to load image'))
//     }
//     img.src = imageUrl
//   })
// }

// export function getOperatingSystem(userAgent = navigator.userAgent) {
//   if (userAgent.includes('Windows')) {
//     return 'Windows'
//   } else if (userAgent.includes('Macintosh')) {
//     return 'macOS'
//   } else {
//     return ''
//   }
// }

// export const handleToggleLanguage = () => {
//   const systemOs = getOperatingSystem();
//   const placeholder = document.querySelector(".w-e-text-placeholder");
//   placeholder.innerHTML = placeholderMap.value[systemOs];
// };

// export const handleEditorKeyDown = async () => {
//   await nextTick()
//   // 解决@好友上键切换光标移动问题
//   const container = document.querySelector('.w-e-text-container')
//   if (!container) return
//   container.onkeydown = (e) => {
//     // 键盘上下键
//     if (store.state?.conversation.isShowModal) {
//       if ([38, 40].includes(e.keyCode)) {
//         return false
//       }
//     }
//   }
// }
