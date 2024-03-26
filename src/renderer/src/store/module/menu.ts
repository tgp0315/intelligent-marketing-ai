import { defineStore } from 'pinia'

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => {
    return {
      isCollapse: true,
      changeColorIndex: 1
    }
  },
  actions: {
    setCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setChangeColorIndex(index: any) {
      this.changeColorIndex = index * 1
    }
  }
})
