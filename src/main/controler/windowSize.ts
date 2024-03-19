import { ipcMain } from 'electron'

function windowSize(win) {
  //接收最小化命令
  ipcMain.on('window-min', () => {
    win.minimize()
  })
  //接收最大化命令
  ipcMain.on('window-max', () => {
    if (win.isMaximized()) {
      win.unmaximize()
      // win.focus()
    } else {
      win.maximize()
    }
  })
  //接收关闭命令
  ipcMain.on('window-close', () => {
    win.close()
  })
}

export default windowSize
