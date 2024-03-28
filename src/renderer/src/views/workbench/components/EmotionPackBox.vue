<template>
  <div
    v-show="flag"
    v-click-outside="onClickOutside"
    class="emjio-tion"
  >
    <div class="emojis">
      <el-scrollbar
        wrap-class="custom-scrollbar-wrap"
        always
      >
        <!-- QQ表情包 -->
        <div :class="['emoji_QQ', systemOs]">
          <!-- <p class="title" v-show="recentlyUsed.length">最近使用</p> -->
          <!-- <span v-for="item in recentlyUsed" class="emoji" :key="item" @click="setEmoji(item)">
            <img :src="getImageUrl(emojiMap[item])" :title="item" />
          </span> -->
          <!-- <p class="title">小黄脸表情</p> -->
          <!-- <template v-if="!rolling"> -->
          <span
            v-for="item in emojiName"
            :key="item"
            class="emoji"
            @click="setEmoji(item)"
          >
            <!-- <img
                :src="`../emoji/${emojiMap[item]}`"
                :title="item"
              > -->
            <img
              :src="getImageUrl(emojiMap[item])"
              :title="item"
            />
          </span>
          <!-- </template> -->
          <!-- 二维数组 css 滚动贴合 -->
          <!-- <template v-else>
            <div
              v-for="emoji in EmotionPackGroup"
              :key="emoji"
              class="scroll-snap"
            >
              <span
                v-for="item in emoji"
                :key="item"
                class="emoji scroll-content"
                @click="setEmoji(item)"
              >
                <img
                  :src="getImageUrl(emojiMap[item])"
                  :title="item"
                >
              </span>
            </div>
          </template> -->
        </div>
        <!-- 抖音表情包 -->
        <!-- <div class="emoji_Tiktok" v-show="table == 'Tiktok'">
          <span
            v-for="item in emojiDouyin.emojiName"
            class="emoji scroll-content"
            :key="item"
            @click="setEmoji(item)"
          >
            <img :src="require('@/assets/emoji/' + emojiDouyin.emojiMap[item])" :title="item" />
          </span>
        </div> -->
      </el-scrollbar>
    </div>
    <!-- <div class="tool">
      <div
        :class="item.type == table ? 'isHover' : ''"
        v-for="item in toolDate"
        :key="item.icon"
        @click="table = item.type"
      >
        <svg-icon :iconClass="item.icon" />
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { getOperatingSystem } from '@/utils/getOperatingSystem'
import { getImageUrl } from '@/utils/getImageUrl'
import { emojiMap, emojiName } from '@/utils/emoji/emoji-map-qq'
const flag = ref(false)
const systemOs = ref('')
const emit = defineEmits(['setEmoji'])

const setClose = () => {
  flag.value = false
}

const setFlag = () => {
  flag.value = true
}

const getParser = () => {
  systemOs.value = getOperatingSystem()
}

const setEmoji = (item) => {
  console.log(111, item)
  emit('setEmoji', item)
  setClose()
}

const onClickOutside = () => {
  setClose()
}

onMounted(() => {
  getParser()
})

defineExpose({ setFlag })
</script>

<style lang="scss" scoped>
.emjio-tion {
  position: absolute;
  border-radius: 5px;
  bottom: 55px;
  background: #fff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  :deep(.custom-scrollbar-wrap) {
    scroll-snap-type: y mandatory;
  }
}
.emojis {
  width: 400px;
  height: 180px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .title {
    font-size: 12px;
    padding: 12px 0 6px;
  }
  .emoji_QQ,
  .emoji_Tiktok {
    padding: 0 10px 0 15px;
  }

  .emoji {
    cursor: pointer;
    display: inline-block;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
.tool {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: #fff;
  border-radius: 0 0 5px 5px;
  border-top: 1px solid #cccccc4a;
  div:not(:nth-child(1)) {
    margin-left: 10px;
  }
  div {
    border-radius: 5px;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: #e6e6e6a8;
    }
  }
}
.isHover {
  background: #e6e6e6a8 !important;
  // color: var(--color-icon-hover) !important;
}
.scroll-snap {
  // scroll-snap-align: start;
  height: 180px;
}
</style>
