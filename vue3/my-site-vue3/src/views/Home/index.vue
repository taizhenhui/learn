<template>
  <div class="home-container">
    <h1>首页</h1>
    <button @click="go('about')">go 关于</button>
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
}
</style>
