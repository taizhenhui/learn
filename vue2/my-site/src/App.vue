<template>
  <div id="app">
    <h1>APP组件</h1>
    <Icon type="arrowDown"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Icon: () => import('./components/Icon.vue')
  },
  data(){
    return {
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
