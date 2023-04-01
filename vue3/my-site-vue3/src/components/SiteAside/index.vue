<template>
  <div class="site-aside-container">
    <Avatar :url="url" :size="150" />
    <h1 class="title">用户名称</h1>
    <Menu></Menu>
    <Contact />
    <p class="footer">
      黑ICP备17001719号
    </p>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/Avatar/index.vue'
import Menu from '@/components/SiteAside/Menu/index.vue'
import Contact from '@/components/SiteAside/Contact/index.vue'
const url: string =
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F09%2F20210609081952_51ef5.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682921186&t=8d91e34b33a95390054168eb917cb201'

</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}

.avatar-container {
  margin: 0 auto;
}

.footer {
  text-align: center;
  font-size: 12px;
}

.title {
  font-size: 1.2em;
  color: #fff;
  text-align: center;
}
</style>
