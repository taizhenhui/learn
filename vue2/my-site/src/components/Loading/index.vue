<template>
  <div class="loading-container">
    <img :src="loadingUrl" alt="">
  </div>
</template>

<script>
import loadingUrl from '@/assets/loading.svg'
export default {
  data(){
    return {
      loadingUrl,
    }
  }
}
</script>


<style scoped lang="less">
@import "~@/styles/mixin.less";
.loading-container{
  position: relative;
  .self-center();
}
</style>
