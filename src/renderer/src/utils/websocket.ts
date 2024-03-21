export interface WebSocket {
  [prop: string]: any
}
//暴露自定义websocket对象
// class Socket {
//   url: string
//   websocket: WebSocket | undefined
//   websocketState: boolean
//   reconnectNum: number
//   lockReconnect: boolean
//   timeout: NodeJS.Timeout | undefined
//   clientTimeout: NodeJS.Timeout | undefined
//   serverTimeout: NodeJS.Timeout | undefined
//   private heart_time: number = 3000 //心跳时间
//   private check_time: number = 3000 //检查链接状态时间
//   private lock_time: number = 4000 //重连时间
//   constructor() {
//     // 后台请求路径
//     this.url = ''
//     // websocket对象
//     this.websocket = void 0
//     // websocket状态
//     this.websocketState = false
//      // 重新连接次数
//     this.reconnectNum = 0
//     // 重连锁状态，保证重连按顺序执行
//     this.lockReconnect = false

//     this.timeout = void 0
//     this.clientTimeout = void 0
//     this.serverTimeout = void 0
//   }

//   initWebSocket(url) {
//     this.url = url
//     this.websocket = new WebSocket(this.url)
//     this.websocket.onopen = this.websocketOnOpen
//     this.websocket.onerror = this.websocketOnError
//     this.websocket.onclose = this.websocketOnClose
//     this.resetHeartbeat()
//   }

//   reconnect() {
//     //判断连接状态
//     if (this.lockReconnect) return
//     this.reconnectNum += 1
//     //重新连接三次还未成功调用连接关闭方法
//     if (this.reconnectNum === 3) {
//       this.reconnectNum = 0;
//       this.websocket.onclose()
//       return
//     }
//     //等待本次重连完成后再进行下一次
//     this.lockReconnect = true
//     //5s后进行重新连接
//     this.timeout && clearTimeout(this.timeout)
//     this.timeout = setTimeout(() => {
//       this.initWebSocket(this.url)
//       this.lockReconnect = false
//     }, this.lock_time)
//   }
//   //重置心跳检测
//   resetHeartbeat() {
//     this.heartbeat()
//   }
//   //心跳检测
//   heartbeat() {
//     this.clientTimeout && clearTimeout(this.clientTimeout)
//     this.serverTimeout && clearTimeout(this.serverTimeout)
//     this.clientTimeout = setTimeout(() => {
//       if (this.websocket) {
//         //向后台发送消息进行心跳检测
//         this.websocket.send(JSON.stringify({ type: 'heartbeat' }))
//         this.websocketState = false
//         //一分钟内服务器不响应则关闭连接
//         this.serverTimeout = setTimeout(() => {
//           if (!this.websocketState) {
//             if (this.websocket !== null) {
//                this.websocket.onclose()
//             }
//           } else {
//             this.resetHeartbeat()
//           }
//         }, this.check_time)
//       }
//     }, this.heart_time)
//   }
//   //发送消息
//   sendMsg(message) {
//     this.websocket.send(message)
//   }
//   websocketOnOpen() {
//     //连接开启后向后台发送消息进行一次心跳检测
//     this.sendMsg(JSON.stringify({ type: 'heartbeat' }))
//   }
//   websocketOnError(error) {
//     console.log(error)
//     this.reconnect()
//   }
//   websocketOnClose() {
//     this.websocket.close()
//   }

// }
