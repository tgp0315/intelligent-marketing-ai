<template>
  <div
    class="header"
    @dblclick="sizeBtn"
    @mousedown.prevent.stop="mousedown"
    @mouseup="mouseup"
  >
    <div class="collapse">
      <svg-icon
        class="collapse_btn"
        name="menufold"
        @click="setMenuFold"
      />
      <div class="current_menu">
        <svg-icon name="gongzuotailink" />
        <span class="line">/</span>
        <span class="title">工作台</span>
      </div>
    </div>
    <div class="button">
      <template
        v-for="item in icons"
        :key="item"
      >
        <svg-icon
          class="icon"
          :name="item"
          @click.stop.prevent="clickIcon(item)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import { useMenuStore } from '@/store/module/menu';
const icons: Array<string> = ['zuixiaohua', 'zuidahua', 'guangbi']
const store = useMenuStore()
/**鼠标按压 */
const mousedown = (e: Event) => {
  if (e.target instanceof SVGElement) {
    return
  }
  console.log(1)
  window.api.windowMove(true)
}

/**鼠标释放 */
const mouseup = () => {
  window.api.windowMove(false)
}

const sizeBtn = () => {
  window.api.maximize()
}

const clickIcon = (type): void => {
  switch (type) {
    case 'zuixiaohua':
      window.api.minimize()
      break
    case 'zuidahua':
      window.api.maximize()
      break
    default:
      window.api.close()
  }
}

const setMenuFold = () => {
  store.setCollapse()
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  background: #c4d3f0;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  display: flex;
  justify-content: space-between;

  .button {
    display: flex;
    align-items: center;
  }

  .icon {
    margin-right: 12px;
  }

  .collapse {
    display: flex;
    align-items: center;
    margin: 0 24px;
  }

  .current_menu {
    display: flex;
    align-items: center;
    padding-left: 24px;

    &::before {
      content: '';
      width: 1px;
      height: 22px;
      background: #FFFFFF;
      border-radius: 0px 0px 0px 0px;
      opacity: 1;
      margin-right: 24px;
    }
  }
  .line {
    font-size: 14px;
    color: #fff;
    padding: 0 6px;
  }
  .title {
    font-size: 16px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #1D2129;
  }
}
</style>
