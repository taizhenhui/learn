<template>
  <div id="app">
    <h1>APP组件</h1>
    <ImageLoader
      @load="handleLoaded"
      src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
      placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100" />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Empty: () => import('./components/Empty'),
    ImageLoader: () => import('./components/ImageLoader')
  },
  methods:{
    handleLoaded(){
      console.log('图片加载完成');
    }
  }
}
</script>

<style>
#app{
  width: 500px;
  height: 400px;
  border: 1px solid #333;

}
</style>

