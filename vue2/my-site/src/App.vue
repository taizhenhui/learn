<template>
  <div id="app">
    <h1>APP组件</h1>
    <SiteAside />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Empty: () => import('./components/Empty'),
    ImageLoader: () => import('./components/ImageLoader'),
    SiteAside: () => import('./components/SiteAside'),
  },
  methods:{
  }
}
</script>

<style>
#app{
  width: 300px;
  min-height: 400px;
  border: 1px solid #333;
}
</style>

