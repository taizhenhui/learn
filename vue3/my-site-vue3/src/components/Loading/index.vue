<template>
  <div class="loading-container">
    <img :src="loadingUrl" alt="">
  </div>
</template>

<script setup lang="ts">
import loadingUrl from '@/assets/loading.svg'

</script>


<style scoped lang="less">
@import "~@/styles/mixin.less";
.loading-container{
  position: relative;
  .self-center();
}
</style>
