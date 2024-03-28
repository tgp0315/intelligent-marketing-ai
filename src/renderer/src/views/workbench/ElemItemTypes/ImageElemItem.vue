<template>
  <div
    class="image_preview select-none"
    :class="self ? 'is-text-self' : 'is-text-other'"
    @click="geiPic(url)"
  >
    <el-image
      :src="url"
      :style="imgStyle"
      :preview-src-list="showCheckbox ? null : imgUrlList"
      :hide-on-click-modal="true"
      :initial-index="index"
      :infinite="false"
      fit="cover"
      @load="loadImg"
    />
  </div>
</template>

<script setup>
// import { ref, toRefs } from "vue";
import { ref } from 'vue'
// import { useState, useGetters } from "@/utils/hooks/useMapper";
// import { showIMPic, getImageSize } from "../utils/utils";

const props = defineProps({
  message: {
    type: Object,
    default: null
  },
  self: {
    type: Boolean,
    default: false
  }
})
const imgStyle = ref({})
const index = ref(0)
// const { message, self } = toRefs(props);
// const imgUrlList = ref([])
// const url =
//   'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const imgUrlList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
]
// const { imgUrlList } = useGetters(["imgUrlList"]);
// const { showCheckbox } = useState({
//   showCheckbox: (state) => state.conversation.showCheckbox,
// });

function getImageProperties() {
  try {
    // const {
    //   payload: { imageInfoArray },
    // } = message.value;
    // const imageInfo = imageInfoArray[num];
    return props.message
  } catch (error) {
    return null
  }
}
const getImageSize = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      const width = this.width
      const height = this.height
      resolve({ width, height })
    }
    img.onerror = function () {
      reject(new Error('Failed to load image'))
    }
    img.src = imageUrl
  })
}
const showIMPic = (width, height) => {
  let picStyle = {}
  if (width >= 140) {
    picStyle = {
      width: 140 + 'px',
      height: Math.round((140 / width) * height) + 'px'
    }
  } else if (width <= 35) {
    picStyle = {
      width: 45 + 'px',
      height: Math.round((45 / width) * height) + 'px'
    }
  } else {
    picStyle = {
      width: width + 'px',
      height: height + 'px'
    }
  }
  return picStyle
}
// index.value = imgUrlList.value.findIndex((item) => {
//   return item == getImageProperties(0)?.url;
// });

const url = getImageProperties()?.imgUrl
console.log(url)
async function initImageSize() {
  try {
    let width = getImageProperties()?.width || 0
    let height = getImageProperties()?.height || 0
    if (width <= 0 || height <= 0) {
      const { width: newWidth, height: newHeight } = await getImageSize(url)
      width = newWidth
      height = newHeight
    }
    const { width: finalWidth, height: finalHeight } = showIMPic(width, height)
    imgStyle.value = { width: finalWidth, height: finalHeight }
  } catch (error) {
    const { width, height } = await getImageSize(url)
    imgStyle.value = { width: width + 'px', height: height + 'px' }
  }
}

initImageSize()
// const geiPic = async () => {
//   console.log(message.value);
//   console.log(imgStyle.value);
// };
const loadImg = () => {}
</script>

<style lang="scss" scoped>
.is-text-self {
  background: var(--self-msg-color);
}
.is-text-other {
  background: var(--other-msg-color);
}
.image_preview {
  width: fit-content;
  // max-width: 140px;
  // padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid rgb(208, 221, 215);
  :deep(.el-image) {
    border-radius: 5px;
    vertical-align: bottom;
  }
}
</style>
