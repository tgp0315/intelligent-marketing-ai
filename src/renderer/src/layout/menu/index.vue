<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    @select="selectMenu"
  >
    <div class="profile_picture">
      <img
        src="C:\Users\17795\Desktop\intelligent-marketing-ai\src\renderer\src\assets\icons\image.png"
        style="width: 48px; height: 48px; border-radius: 24px;"
      >
      <div class="tip"></div>
    </div>
    <el-menu-item index="1">
      <div :class="{'blue_box': true, 'active_blue': changeColorIndex === 1}">
        <svg-icon
          name="console"
          :icon-style="{ width: 32, height: 32 }"
        />
      </div>
      <template #title>
        <span :class="{'menu_font': true, 'active_font': changeColorIndex === 1}">控制台</span>
      </template>
    </el-menu-item>
    <el-menu-item
      index="2"
    >
      <div :class="{'blue_box': true, 'active_blue': changeColorIndex === 2}">
        <svg-icon
          name="myAccount"
          :icon-style="{ width: 32, height: 32 }"
        />
      </div>
      <template #title>
        <span :class="{'menu_font': true, 'active_font': changeColorIndex === 2}">我的账号</span>
      </template>
    </el-menu-item>
    <el-menu-item index="3">
      <div :class="{'blue_box': true, 'active_blue': changeColorIndex === 3}">
        <svg-icon
          name="groupHairAssistant"
          :icon-style="{ width: 32, height: 32 }"
        />
      </div>
      <template #title>
        <span :class="{'menu_font': true, 'active_font': changeColorIndex === 3}">群发助手</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMenuStore } from '@/store/module/menu';
// import { ref } from 'vue';
// const isCollapse = ref(true)
const store = useMenuStore()

// const changeColorIndex = ref(1)

const { isCollapse, changeColorIndex } = storeToRefs(store)
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }

const selectMenu = (index: number) => {
  store.setChangeColorIndex(index)
}
</script>

<style lang="scss">
.menu {
  width: 204px;
  height: 100%;
  background: linear-gradient(180deg, #81affe 0%, #5691fe 16%, #1b68ff 100%);
}
.el-menu--collapse {
    width: 84px;
    background: linear-gradient(180deg, #81AFFE 0%, #5691FE 16%, #1B68FF 100%);
    opacity: 1;
}
// .el-menu--collapse.is-hover {
//   background-color: none;
// }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  opacity: 1;
  background:  linear-gradient(180deg, #81AFFE 0%, #5691FE 16%, #1B68FF 100%);
}
.el-menu-item:hover {
  background-color: transparent !important;
}
.el-menu-item .el-menu-tooltip__trigger {
  padding: 0 !important;
  // position: none !important;
  // left: 27px !important;
    left:50%;
    margin-left:-25px;/*宽度的一半*/
}
.profile_picture {
  width: 52px;
  height: 52px;
  margin: 18px 0 20px 20px;
  position: relative;
  .tip {
    position: absolute;
    right: 4px;
    bottom: 2px;
    width: 16px;
    height: 16px;
    background: #00BF80;
    border-radius: 50px 50px 50px 50px;
    opacity: 1;
  }
}
.blue_box {
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
}
.active_blue {
  opacity: 1;
  background: #1966FF;
  border-radius: 10px 10px 10px 10px;
}

.menu_font {
  font-size: 16px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 22px;
}

.active_font {
  font-size: 18px;
  font-weight: 800;
  line-height: 22px;
}

</style>
