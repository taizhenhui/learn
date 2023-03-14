<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import {debounce} from '@/utils'
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      activeAnchor: ''
    }
  },
  computed: {
    // 根据toc属性得到带有isSelect数组的toc数组
    tocWithSelect() {
      const getTOC = (toc = []) => {
        return toc.map(t => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getTOC(t.children)
        }))
      }
      return getTOC(this.toc)
    },

    // 根据toc得到他们对应的元素数组
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
  created() {
    this.setSelectDebounce = debounce(this.setSelect, 100)
    this.$bus.$on('mainScroll', this.setSelectDebounce)
  },
  destroyed(){
    this.$bus.$off('mainScroll', this.setSelectDebounce)
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    setSelect(scrollDom) {
      if(!scrollDom) return
      this.activeAnchor = ''
      const range = 200
      for (const dom of this.doms) {
        if (!dom) {
          continue;
        }

        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          // 在规定范围内
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          // 在规定范围之下
          return;
        } else {
          // 在规定范围之上
          this.activeAnchor = dom.id;
        }
      }
    }
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
