<template>
  <div class="container">
    <!-- <Suspense> -->
      <router-view />
    <!-- </Suspense> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
