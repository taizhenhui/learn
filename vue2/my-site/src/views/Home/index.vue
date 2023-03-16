<template>
  <div v-loading="loading" class="home-container" ref="container" @wheel="handleWheel">

    <ul class="carousel-container" :style="{
      marginTop: marginTop
    }" @transitionend="handleTransitionEnd">
      <li v-for="item in datas" :key="item.id">
        <Carouselitem :carousel="item" />
      </li>
    </ul>
    <div class="icon icon-up" @click="switchTo(index - 1)" v-show="index > 0">
      <Icon type="arrowUp" />
    </div>
    <div class="icon icon-down" @click="switchTo(index + 1)" v-show="index < datas.length - 1">
      <Icon type="arrowDown" />
    </div>

    <ul class="indicator">
      <li v-for="(it, i) in datas" :key="it.id" :class="{
        active: i === index
      }" @click="switchTo(i)">
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  components: {
    Carouselitem: () => import('./Carouselitem.vue'),
    Icon: () => import('@/components/Icon'),
  },
  data() {
    return {
      index: 0, // 当前显示的第几张轮播图
      containerHeight: 0, // 整个容器的高度
      switching: false, // 是否正在翻页中
    }
  },
  computed: {
    ...mapState('banner', ['loading','datas']),
    marginTop() {
      return -this.index * this.containerHeight + 'px'
    }
  },
  created(){
    this.fetchBanners()
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions('banner', ['fetchBanners']),

    switchTo(i) {
      this.index = i
    },
    handleWheel(e) {
      if (this.switching) return
      if (e.deltaY < -5 && this.index > 0) {
        // 往上滚动
        this.switching = true
        this.index--
      } else if (e.deltaY > 5 && this.index < this.datas.length - 1) {
        // 往下滚动
        this.switching = true
        this.index++
      }
    },
    handleTransitionEnd() {
      this.switching = false
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";

.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 0.5s;

    li {
      width: 100%;
      height: 100%;
    }
  }

  .icon {
    .self-center();
    font-size: 30px;
    @gap: 25px;
    color: @gray;
    cursor: pointer;
    transform: translateX(-50%);

    &.icon-up {
      top: @gap;
      animation: jump-up 2s infinite;
    }

    &.icon-down {
      top: auto;
      bottom: @gap;
      animation: jump-down 2s infinite;
    }

    @jump: 5px;

    @keyframes jump-up {
      0% {
        transform: translate(-50%, @jump);
      }

      50% {
        transform: translate(-50%, -@jump);
      }

      100% {
        transform: translate(-50%, @jump);
      }
    }

    @keyframes jump-down {
      0% {
        transform: translate(-50%, -@jump);
      }

      50% {
        transform: translate(-50%, @jump);
      }

      100% {
        transform: translate(-50%, -@jump);
      }
    }
  }

  .indicator {
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 20px;

    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: @words;
      cursor: pointer;
      margin-bottom: 10px;
      border: 1px solid #fff;
      box-sizing: border-box;
      transition: 0.5s;

      &.active {
        background-color: #fff;
      }
    }
  }
}
</style>
