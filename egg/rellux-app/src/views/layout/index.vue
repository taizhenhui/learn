<template>
  <div class="layout-container">
    <div class="header-sty">
      <Header />
    </div>
    <div class="content-sty">
      <AsideBar />
      <div class="card-sty">
        <router-view />
      </div>
    </div>
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
    height: calc(100vh - @headerHeight);
    .card-sty {
      flex: 1;
      height: calc(100vh - @headerHeight - @marginSize*2);
      margin: @marginSize;
      padding: @marginSize;
      border-radius: 4px;
      border: 1px solid var(--el-card-border-color);
      box-shadow: var(--el-box-shadow-light);
      background-color: #fff;
      overflow: hidden;
      :deep(.page) {
        height: 100%;
      }
    }
  }
}
</style>
