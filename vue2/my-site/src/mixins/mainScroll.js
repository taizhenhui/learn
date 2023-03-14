export default function (refVal) {
  return {
    methods: {
      handleMainScroll() {
        this.$bus.$emit('mainScroll', this.$refs[refVal])
      },
      handleSetMainScroll(scrollTop) {
        this.$refs[refVal].scrollTop = scrollTop
      }
    },
    mounted() {
      this.$bus.$on('setMainScroll', this.handleSetMainScroll)
      this.$refs[refVal].addEventListener('scroll', this.handleMainScroll)
    },
    beforeDestroy() {
      this.$bus.$off('setMainScroll', this.handleSetMainScroll)
      this.$bus.$emit('mainScroll')
      this.$refs[refVal].removeEventListener('scroll', this.handleMainScroll)
    },

  }
}