<template>
  <div class="app-container">
    <!-- <Suspense> -->
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
    <!-- </Suspense> -->
  </div>
</template>

<script setup lang="ts">
//中文包
import zhCn from "element-plus/lib/locale/lang/zh-cn";

</script>

<style scoped lang="less"></style>
