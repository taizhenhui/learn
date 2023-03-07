<template>
  <div id="app">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      main
      <template #right>
        右边
      </template>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Empty: () => import('./components/Empty'),
    ImageLoader: () => import('./components/ImageLoader'),
    SiteAside: () => import('./components/SiteAside'),
    Layout: () => import('./components/Layout'),
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
#app{
  .self-fill(fixed);
  width: 100%;
  height: 100vh;
}

.aside {
  width: 250px;
  height: 100%;
}
</style>

