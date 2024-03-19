import { defineStore } from 'pinia'

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => {
    return {
      isCollapse: false
    }
  },
  actions: {
    setCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
})
