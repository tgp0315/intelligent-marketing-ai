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
        :name="isCollapse ? 'menufoldRight' : 'menufold'"
        @click="setMenuFold"
      />
      <div class="current_menu">
        <svg-icon
          :name="
            changeColorIndex === 1
              ? 'console'
              : changeColorIndex === 2
                ? 'myAccount'
                : 'groupHairAssistant'
          "
        />
        <span class="line">/</span>
        <span class="title">{{
          changeColorIndex === 1 ? '工作台' : changeColorIndex === 2 ? '我的账号' : '群发助手'
        }}</span>
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
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/store/module/menu'
const icons: Array<string> = ['zuixiaohua', 'zuidahua', 'close']
const store = useMenuStore()

const { changeColorIndex, isCollapse } = storeToRefs(store)

/**鼠标按压 */
const mousedown = (e: Event) => {
  if (e.target instanceof SVGElement || e.target instanceof HTMLSpanElement) {
    return
  }
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
    cursor: pointer;
  }

  .collapse {
    display: flex;
    align-items: center;
    margin: 0 24px;
    .collapse_btn {
      cursor: pointer;
    }
  }

  .current_menu {
    display: flex;
    align-items: center;
    padding-left: 24px;

    &::before {
      content: '';
      width: 1px;
      height: 22px;
      background: #ffffff;
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
    font-weight: 500;
    color: #1d2129;
  }
}
</style>
