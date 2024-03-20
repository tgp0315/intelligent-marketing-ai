import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
interface Api {
  [prop: string]: any
}
// Custom APIs for renderer
const api: Api = {
  windowMove: (content) => ipcRenderer.send('window-move-open', content),
  minimize: () => ipcRenderer.send('window-min'),
  maximize: () => ipcRenderer.send('window-max'),
  close: () => ipcRenderer.send('window-close'),
  setStore: (key, value) => ipcRenderer.send('setStore', key, value),
  getStore: (key) => ipcRenderer.invoke('getStore', key),
  deleteStore: (key) => ipcRenderer.send('deleteStore', key)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
console.log(process.contextIsolated, 'process.contextIsolated')
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
