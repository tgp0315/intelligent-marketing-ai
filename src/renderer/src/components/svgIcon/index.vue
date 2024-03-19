<script lang="ts" setup>
import { computed } from 'vue'

interface IconStyle {
  width?: number
  height?: number
}

interface Props {
  prefix?: string
  name: string
  iconStyle?: IconStyle
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  iconStyle: () => {
    return {
      width: 24,
      height: 24
    }
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
    :style="{ width: props.iconStyle?.width + 'px', height: props.iconStyle?.height + 'px' }"
  >
    <use :href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  // width: 1em;
  // height: 1em;
  // fill: currentColor;
  // overflow: hidden;
}
</style>
