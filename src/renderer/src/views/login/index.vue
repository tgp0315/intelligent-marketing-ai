<template>
  <div
    class="login"
    @mousedown.prevent.stop="mousedown"
    @mouseup="mouseup"
  >
    <div class="logo">
      <Svglogin class="svg" />
    </div>
    <div class="form" />
  </div>
</template>

<script setup lang="ts">
import Svglogin from '@/assets/icons/login.svg?component'
/**鼠标按压 */
const mousedown = (e: Event) => {
  if (e.target instanceof SVGElement) {
    return
  }
  window.api.windowMove(true)
}

/**鼠标释放 */
const mouseup = () => {
  window.api.windowMove(false)
}
</script>

<style lang="scss">
.login {
  height: 100%;
  width: 100%;
  display: flex;

  .logo {
    flex: 3;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    .svg {
      width: 600px;
    }
  }

  .form {
    flex: 2;
  }
}
</style>
