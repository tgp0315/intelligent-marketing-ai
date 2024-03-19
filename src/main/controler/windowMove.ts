import { screen, ipcMain } from 'electron'
/**
 *窗口移动
 *
 * @param {*} win BroswerWindow
 */
function windowMove(win) {
  let winStartPosition = { x: 0, y: 0 }
  let mouseStartPosition = { x: 0, y: 0 }
  let movingInterval: number | null = null
  /**
   * 窗口移动事件
   */
  ipcMain.on('window-move-open', (_events, canMoving) => {
    if (canMoving) {
      // 读取原位置
      const winPosition = win.getPosition()
      const currentWindowSize = win.getSize()
      winStartPosition = { x: winPosition[0], y: winPosition[1] }
      mouseStartPosition = screen.getCursorScreenPoint()

      if (movingInterval) {
        clearInterval(movingInterval)
      }

      movingInterval = Number(
        setInterval(() => {
          // 实时更新位置
          const cursorPosition = screen.getCursorScreenPoint()
          const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x
          const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y
          win.setBounds({
            x,
            y,
            width: currentWindowSize[0],
            height: currentWindowSize[1]
          })
        }, 20)
      )
    } else {
      movingInterval && clearInterval(movingInterval)
      movingInterval = null
    }
  })
}

/**
 * 通过窗口事件获取发送者的窗口
 * @param event ipc发送窗口事件
 */
// function getWindowByEvent(event: IpcMainEvent): BrowserWindow | null {
//   const webContentsId = event.sender.id
//   for (const currentWin of BrowserWindow.getAllWindows()) {
//     if (currentWin.webContents.id === webContentsId) {
//       return currentWin
//     }
//   }
//   return null
// }

// function windowMove() {
//   /** 窗口移动功能封装 */
//   // 窗口移动 位置刷新定时器
//   let movingInterval: number | null = null

//   /**
//    * 窗口移动事件
//    */
//   ipcMain.on('window-move-open', (event, canMoving) => {
//     let winStartPosition = { x: 0, y: 0 }
//     let mouseStartPosition = { x: 0, y: 0 }
//     // 获取当前聚焦的窗口
//     const currentWindow: Electron.BrowserWindow | null = getWindowByEvent(event)
//     const currentWindowSize = (currentWindow as Electron.BrowserWindow).getSize()

//     if (currentWindow) {
//       if (canMoving) {
//         // 读取原位置
//         const winPosition = currentWindow.getPosition()
//         winStartPosition = { x: winPosition[0], y: winPosition[1] }
//         mouseStartPosition = screen.getCursorScreenPoint()
//         // 清除旧的定时器
//         if (movingInterval) {
//           clearInterval(movingInterval)
//         }
//         // 创建定时器，每10毫秒更新一次窗口位置，保证一致
//         movingInterval = Number(
//           setInterval(() => {
//             // 窗口销毁判断，高频率的更新有可能窗口已销毁，定时器还没结束，此时就会出现执行销毁窗口方法的错误
//             if (!currentWindow.isDestroyed()) {
//               // 如果窗口失去焦点，则停止移动
//               if (!currentWindow.isFocused()) {
//                 movingInterval && clearInterval(movingInterval)
//                 movingInterval = null
//               }
//               // 实时更新位置
//               const cursorPosition = screen.getCursorScreenPoint()
//               const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x
//               const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y
//               // 更新位置的同时设置窗口原大小， windows上设置=>显示设置=>文本缩放 不是100%时，窗口会拖拽放大
//               // currentWindow.setBounds({
//               //   x: x,
//               //   y: y,
//               //   width: currentWindowSize[0],
//               //   height: currentWindowSize[1]
//               // })
//               currentWindow.setPosition(x, y)
//             }
//           }, 10)
//         )
//       } else {
//         movingInterval && clearInterval(movingInterval)
//         movingInterval = null
//       }
//     }
//   })
// }
export default windowMove
