<template>
  <div class="home-container" ref="container">
    <h1>首页</h1>
    <button @click="handleClick">Click</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      const container = this.$refs.container
      this.$showMessage({
        content:'hello world',
        type:'success',
        duration: 1000,
        container,
        callback: ()=>{
          console.log('h w');
        }
      })
    },
  },
};
</script>

<style scoped>
.home-container {
  background: lightblue;
  width: 300px;
  height: 500px;
  border: 1px solid;
  margin: 50px auto;
}
</style>
