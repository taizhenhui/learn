<template>
  <div class='about-container'>
    <h1>关于</h1>
    <button @click="goBack">返回</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()
const goBack = ()=>{
  router.back()
}

</script>

<style lang="less" scoped>
.about-container {

}
</style>  