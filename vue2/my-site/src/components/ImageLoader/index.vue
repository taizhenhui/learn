<template>
  <div class="image-loader-container">
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" alt="" />
    <img 
      @load="handleLoad" 
      :src="src" alt="" 
      :style="{ 
        opacity: originOpacity, 
        transition: duration + 'ms'
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'ImageLoader',
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      originLoaded: false, // 原图是否加载完成
      everythingDone: false, // 是否都加载完成
    }
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0
    }
  },
  methods: {
    handleLoad() {
      this.originLoaded = true
      setTimeout(() => {
        this.$emit("load");
        this.everythingDone = true
      },this.duration)
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";

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
    filter: blur(2vw)
  }
}
</style>
