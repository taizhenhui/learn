<template>
  <div class="app-container">
    <Suspense>
      <router-view />
    </Suspense>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.app-container {
}
</style>
