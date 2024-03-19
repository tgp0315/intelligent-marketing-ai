import Store from 'electron-store'
import { ipcMain } from 'electron'
const store = new Store()

const initStore = () => {
  ipcMain.on('setStore', (_, key: string, value: any) => {
    store.set(key, value)
  })

  ipcMain.handle('getStore', (_, key) => {
    const value = store.get(key)
    return value
  })

  ipcMain.on('deleteStore', (_, key) => {
    // const value = store.delete(key)
    store.delete(key)
    // _.returnValue = value || ''
  })
}

export default initStore
