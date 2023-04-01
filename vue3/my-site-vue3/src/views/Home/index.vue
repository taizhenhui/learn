<template>
  <div class="home-container">
    <h1>首页</h1>
    <button @click="go('About')">go about</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const go = (name: string) => {
  router.push({ name })
}
</script>

<style lang="less" scoped>

.home-container {
  width: 100%;
  height: 100%;
}
</style>
