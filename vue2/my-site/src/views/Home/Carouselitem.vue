<template>
  <div class="carouselitem-container" ref="container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="carousel-img" ref="image" :style="imagePosition">
      <ImageLoader :src="carousel.bigImg" :placeholder="carousel.midImg" @load="showWords" />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from '@/components/ImageLoader'
export default {
  name: 'carouselitem',
  components: {
    ImageLoader,
  },
  props: ["carousel"],
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, // 外层容器的尺寸
      innerSize: null, // 里层图片的尺寸
      mouseX: 0,
      mouseY: 0,
    }
  },
  computed: {
    // 得到图片宽高
    imagePosition() {
      if (!this.innerSize || !this.containerSize) return
  
      const extraWidth = this.innerSize.width - this.containerSize.width,
            extraHeight = this.innerSize.height - this.containerSize.height,
            left = -extraWidth / this.containerSize.width * this.mouseX,
            top = -extraHeight / this.containerSize.height * this.mouseY

      return {
        transform: `translate(${left}px, ${top}px)`
      }
    },
    center() {
      return {
        x: this.$refs.container.clientWidth / 2,
        y: this.$refs.container.clientHeight / 2,
      }
    }
  },
  created() {

  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth
    this.descWidth = this.$refs.desc.clientWidth
    window.addEventListener('resize', this.setSize)
    this.handleMouseLeave()
    this.setSize()
  },
  destroyed() {
    window.removeEventListener('resize', this.setSize)
  },

  methods: {
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight
      }

      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight
      }
    },
    showWords() {
      this.$refs.title.style.opacity = 1
      this.$refs.title.style.width = 0
      // 强制浏览器渲染一次
      this.$refs.title.clientWidth // reflow
      this.$refs.title.style.transition = '1s'
      this.$refs.title.style.width = this.titleWidth + 'px'

      this.$refs.desc.style.opacity = 1
      this.$refs.desc.style.width = 0
      // 强制浏览器渲染一次
      this.$refs.desc.clientWidth // reflow
      this.$refs.desc.style.transition = '2s 1s'
      this.$refs.desc.style.width = this.descWidth + 'px'
    },
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect()
      this.mouseX = e.clientX - rect.left
      this.mouseY = e.clientY - rect.top
    },
    handleMouseLeave() {
      this.mouseX = this.center.x
      this.mouseY = this.center.y
    },
  },
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.carouselitem-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
  .carousel-img {
    width: 110%;
    height: 110%;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.3s;
  }

  .title,
  .desc {
    position: absolute;
    letter-spacing: 3px;
    left: 30px;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5), 0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
  }

  .title {
    top: calc(50% - 40px);
    font-size: 2em;
  }

  .desc {
    top: calc(50% + 20px);
    color: lighten(@gray, 20%)
  }
}
</style>
