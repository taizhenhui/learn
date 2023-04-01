<template>
  <div class="app-container">
    <Suspense>
      <Layout>
        <template #left>
          <div class="aside">
            <SiteAside />
          </div>
        </template>
        <template #main>
          <router-view />
        </template>
      </Layout>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import Layout from '@/components/Layout/index.vue'
import SiteAside from '@/components/SiteAside/index.vue'
</script>

<style lang="less" scoped>
@import '~@/styles/mixin.less';
.app-container {
  .self-fill(fixed);
  height: 100%;
}
.aside {
  width: 250px;
  height: 100%;
}
</style>
