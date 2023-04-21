<template>
  <div class="container">
    <div class="header-sty">
      <Header />
    </div>
    <div class="content-sty">
      <el-container>
        <AsideBar />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import AsideBar from "./AsideBar.vue";
</script>

<style scoped lang="less">
@import '~@/styles/mixin.less';
.container {
  
  .self-fill();
  height: 100%;
  background: #f5f5f5;
  // background-color:red;
  // display: flex;
}
</style>
