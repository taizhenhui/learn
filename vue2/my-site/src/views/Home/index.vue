<template>
  <div class="home-container" ref="container">
    <h1>首页</h1>
    <button @click="handleClick">Click</button>
  </div>
</template>

<script>
import { getBanners } from '@/api/banner'
export default {
  methods: {
    handleClick() {
      getBanners().then(r => {
        console.log(r, 'rrrrrrrrrrrrr');
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
