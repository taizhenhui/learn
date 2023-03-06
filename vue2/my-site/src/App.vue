<template>
  <div id="app">
    <h1>APP组件</h1>
    <Icon type="arrowDown" />
    <Pager :current="current" :total="total" @pageChange="handlePageChange" />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Icon: () => import('./components/Icon.vue'),
    Pager: () => import('./components/Pager.vue'),
  },
  data() {
    return {
      current: 1,
      total: 302
    }
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
