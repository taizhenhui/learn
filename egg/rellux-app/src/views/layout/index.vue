<template>
  <div class="layout-container">
    <div class="header-sty">
      <Header />
    </div>
    <!-- <div class="content-sty"> -->
    <div class="content-sty">
      <AsideBar />
      <!-- <div class="main-sty"> -->
      <el-card class="card-sty">
        <router-view />
      </el-card>
      <!-- </div> -->
    </div>
    <!-- <el-container>
      <AsideBar />
      <el-main class="main-sty">
        <el-card class="card-sty">
          <router-view />
        </el-card>
      </el-main>
    </el-container> -->
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import AsideBar from "./AsideBar.vue";
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";

@marginSize: 15px;
.layout-container {
  .self-fill(fixed);
  height: 100%;
  background: #f5f5f5;
  .content-sty {
    .flex-common(flex-start, flex-start);
    height: calc(100% - @headerHeight);
    .card-sty {
      flex: 1;
      margin: @marginSize;
      box-sizing: border-box;
      height: calc(100% - @marginSize*2);
    }
  }
}
</style>
