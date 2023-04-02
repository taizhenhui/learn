<template>
  <div
    v-loading="loadingRef"
    class="home-container"
    ref="container"
    @wheel="handleWheel"
  >
    <ul
      class="carousel-container"
      :style="{
        marginTop: marginTopRef,
      }"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in datas" :key="item.id">
        <!-- <Carouselitem :carousel="item" /> -->
      </li>
    </ul>
    <div
      class="icon icon-up"
      @click="switchTo(indexRef - 1)"
      v-show="indexRef > 0"
    >
      <!-- <Icon type="arrowUp" /> -->
    </div>
    <div
      class="icon icon-down"
      @click="switchTo(indexRef + 1)"
      v-show="indexRef < datas.length - 1"
    >
      <!-- <Icon type="arrowDown" /> -->
    </div>

    <ul class="indicator">
      <li
        v-for="(it, i) in datas"
        :key="it.id"
        :class="{
          active: i === indexRef,
        }"
        @click="switchTo(i)"
      ></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getBanners } from '@/api/banner'
// import Carouselitem from './Carouselitem.vue'
// import Icon from '@/components/Icon'

//  获取数据 loading加载
interface IDataType {
  bigImg: string
  description: string
  id: string
  midImg: string
  title: string
  [key:string]:string
}
let loadingRef = ref<boolean>(true)
let datas = ref<Array<IDataType>>([])
datas.value = await getBanners()
loadingRef.value = false

const container = ref<any>(null)
let indexRef = ref<number>(0) // 当前显示的第几张轮播图
let containerHeightRef = ref<number>(0) // 整个容器的高度
let switchingRef = ref<boolean>(false) // 是否正在翻页中
const marginTopRef = computed(
  () => -indexRef.value * containerHeightRef.value + 'px'
)
onMounted(() => {
  containerHeightRef.value = container.value.clientHeight
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const switchTo = (i: number) => {
  indexRef.value = i
}
const handleWheel = (e: any) => {
  if (switchingRef.value) return
  // if (e.deltaY < -5 && indexRef.value > 0) {
  //   // 往上滚动
  //   switchingRef.value = true
  //   indexRef.value--
  // } else if (e.deltaY > 5 && indexRef.value < datas.length - 1) {
  //   // 往下滚动
  //   switchingRef.value = true
  //   indexRef.value++
  // }
}
const handleTransitionEnd = () => {
  switchingRef.value = false
}
const handleResize = () => {
  containerHeightRef.value = container.value.clientHeight
}
</script>

<!-- <script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('banner', ['loading', 'datas']),
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions('banner', ['fetchBanners']),
  },
}
</script> -->

<style scoped lang="less">
@import '~@/styles/mixin.less';
@import '~@/styles/var.less';

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
