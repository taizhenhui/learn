<template>
  <div class="container">
    <!-- <Suspense> -->
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
    <!-- </Suspense> -->
  </div>
</template>

<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";
</script>

<style scoped lang="less">
// @import "~@/styles/mixin.less";
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
