<template>
  <div ref="toTop" v-show="show" @click="handleClick"  class="to-top-container">
    Top
  </div>
</template>

<script>
export default {
  name: 'ToTop',
  components: {

  },
  data() {
    return {
      show: false
    }
  },
  created(){
    this.$bus.$on('mainScroll', this.handleScroll)
  },
  destroyed(){
    this.$bus.$off('mainScroll', this.handleScroll)
  },
  methods: {
    handleScroll(dom){
      if(!dom) {
        this.show = false
        return
      }
      const distance = 1500
      this.show = dom.scrollTop > distance
    },
    handleClick(){
      this.$bus.$emit('setMainScroll', 0)
    }
  },
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.to-top-container{
  background-color: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  right: 50px;
  bottom: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  z-index: 999;
  cursor: pointer;
}
</style>
