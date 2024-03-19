<template>
  <div class="homepage">
    <Menu />
    <div class="content">
      <Header />
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from './menu/index.vue'
import Header from './header/index.vue'
</script>

<style lang="scss" scoped>
.homepage {
  height: 100%;
  width: 100%;
  display: flex;

  .content {
    flex: 1;
  }
}
</style>
