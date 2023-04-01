<template>
  <div class="image-loader-container">
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" alt="" />
    <img
      @load="handleLoad"
      :src="src"
      alt=""
      :style="{
        opacity: originOpacity,
        transition: duration + 'ms',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 500,
  },
})
const emit = defineEmits(['load'])

let everythingDone = ref<boolean>(false)
let originLoaded = false // 原图是否加载完成

const originOpacity = computed(() => (originLoaded ? 1 : 0))
const handleLoad = () => {
  originLoaded = true
  setTimeout(() => {
    emit('load')
    everythingDone.value = true
  }, props.duration)
}
</script>

<style lang="less" scoped>
@import '~@/styles/mixin.less';

.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  img {
    .self-fill();
    object-fit: cover;
  }

  .placeholder {
    filter: blur(2vw);
  }
}
</style>
